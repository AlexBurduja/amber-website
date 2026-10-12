<?php
// Primește cererea de ofertă de pe /cerere-oferta/ și o trimite pe email, prin SMTP (PHPMailer).
// Regulile sunt aceleași cu cele din lib/cerere.js (verificate și în browser): ține-le la fel.
// Datele SMTP stau în afara public_html: ../amber-privat/config.php (model: server/config.exemplu.php).
// Răspunsul e JSON, în forma așteptată de formular:
//   { "stare": "trimis" }  sau  { "stare": "eroare", "erori": {...}, "mesaj": "...", "valori": {...} }

declare(strict_types=1);
mb_internal_encoding('UTF-8');

const MB = 1048576;
const TIPURI_MOBILA = ['Bucătărie', 'Dressing', 'Dormitor', 'Living', 'Hol', 'Baie', 'Comercial', 'Altceva'];
const DOMENII = ['o-camera' => 'O cameră', 'mai-multe' => 'Mai multe camere', 'toata-locuinta' => 'Toată locuința'];
const FORME_BUCATARIE = [
    'liniara' => ['inText' => 'liniară', 'pereti' => ['a'], 'insula' => false],
    'l' => ['inText' => 'în L', 'pereti' => ['a', 'b'], 'insula' => false],
    'u' => ['inText' => 'în U', 'pereti' => ['a', 'b', 'c'], 'insula' => false],
    'insula' => ['inText' => 'cu insulă', 'pereti' => ['a', 'b'], 'insula' => true],
];
const TIPURI_CU_PERETI = ['Dormitor', 'Living', 'Hol', 'Baie'];
const BUGETE = ['Sub 10.000 lei', '10.000 – 20.000 lei', '20.000 – 35.000 lei', '35.000 – 60.000 lei', '60.000 – 100.000 lei', 'Peste 100.000 lei', 'Nu știu încă'];
const LIMITE = ['poze' => 5, 'mbTotal' => 4, 'mbPdf' => 2];
const TIPURI_IMAGINE = ['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'image/heif'];
const RATA_FEREASTRA = 3600; // secunde
const RATA_MAXIM = 5;        // cereri pe fereastră, de la aceeași adresă
const MESAJ_TEHNIC = 'Cererea nu a putut fi trimisă din cauza unei probleme tehnice. Încearcă din nou peste câteva minute sau sună-ne.';

function raspunde(array $date, int $cod = 200): never
{
    http_response_code($cod);
    header('Content-Type: application/json; charset=utf-8');
    header('Cache-Control: no-store');
    header('X-Robots-Tag: noindex');
    echo json_encode($date, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

function text(string $nume): string
{
    $v = $_POST[$nume] ?? '';
    return is_string($v) ? trim($v) : '';
}

function telefon_valid(string $telefon): bool
{
    $cifre = preg_replace('/[\s().-]/', '', $telefon);
    return (bool) preg_match('/^(\+40|0040|0)[237]\d{8}$/', $cifre);
}

// Câmpurile de dimensiuni (în cm) pentru o cameră, după tipul de mobilă și forma aleasă.
function campuri_dimensiuni(string $domeniu, ?string $tip, ?string $forma, int $nrPereti): array
{
    $lungime = ['min' => 20, 'max' => 2000];
    $inaltime = ['nume' => 'inaltime', 'eticheta' => 'Înălțimea până la tavan', 'min' => 100, 'max' => 600];
    if ($domeniu !== 'o-camera') return [];
    if ($tip === 'Bucătărie') {
        $f = FORME_BUCATARIE[$forma ?? ''] ?? FORME_BUCATARIE['liniara'];
        $campuri = [];
        foreach ($f['pereti'] as $p) {
            $campuri[] = ['nume' => "perete_$p", 'eticheta' => 'Peretele ' . strtoupper($p)] + $lungime;
        }
        if ($f['insula']) {
            $campuri[] = ['nume' => 'insula_lungime', 'eticheta' => 'Lungimea insulei'] + $lungime;
            $campuri[] = ['nume' => 'insula_latime', 'eticheta' => 'Lățimea insulei', 'min' => 40, 'max' => 400];
        }
        $campuri[] = $inaltime;
        return $campuri;
    }
    if ($tip === 'Dressing') {
        return [
            ['nume' => 'latime', 'eticheta' => 'Lățimea disponibilă'] + $lungime,
            $inaltime,
            ['nume' => 'adancime', 'eticheta' => 'Adâncimea disponibilă', 'min' => 20, 'max' => 400],
        ];
    }
    if (in_array($tip, TIPURI_CU_PERETI, true)) {
        $campuri = [];
        for ($i = 1; $i <= $nrPereti; $i++) {
            $campuri[] = ['nume' => "perete_$i", 'eticheta' => $nrPereti === 1 ? 'Lungimea peretelui' : "Peretele $i"] + $lungime;
        }
        $campuri[] = $inaltime;
        return $campuri;
    }
    return [];
}

// Dimensiunile sunt opționale, dar dacă sunt scrise trebuie să fie numere plauzibile, în cm.
function valideaza_dimensiune(string $text, array $camp): array
{
    $t = str_replace(',', '.', trim($text));
    if ($t === '') return ['valoare' => null];
    if (!preg_match('/^\d+(\.\d+)?$/', $t)) return ['eroare' => 'Scrie doar cifre, în centimetri.'];
    $v = (int) round((float) $t);
    if ($v < $camp['min'] || $v > $camp['max']) {
        return ['eroare' => "Valoarea pare neobișnuită ({$camp['min']}–{$camp['max']} cm). Verifică dacă e în centimetri."];
    }
    return ['valoare' => $v];
}

function formateaza_marime(int $octeti): string
{
    if ($octeti < MB) return max(1, (int) round($octeti / 1024)) . ' KB';
    return str_replace('.', ',', number_format($octeti / MB, 1, '.', '')) . ' MB';
}

// Fișierele unui câmp, ca listă de ['name', 'type', 'tmp_name', 'size'], fără cele goale.
function fisiere(string $camp): array
{
    $f = $_FILES[$camp] ?? null;
    if (!$f) return [];
    $lista = [];
    $n = is_array($f['name']) ? count($f['name']) : 1;
    for ($i = 0; $i < $n; $i++) {
        $unul = [];
        foreach (['name', 'type', 'tmp_name', 'size', 'error'] as $k) {
            $unul[$k] = is_array($f[$k]) ? $f[$k][$i] : $f[$k];
        }
        if ($unul['error'] === UPLOAD_ERR_NO_FILE || (int) $unul['size'] === 0 && $unul['error'] === UPLOAD_ERR_OK) continue;
        $lista[] = $unul;
    }
    return $lista;
}

function extensie(string $nume): string
{
    return preg_match('/\.([a-z0-9]{2,5})$/i', $nume, $m) ? '.' . strtolower($m[1]) : '';
}

// Limitare simplă de rată: cel mult RATA_MAXIM cereri pe oră de la aceeași adresă IP.
// Ține câte un fișier mic pe adresă, în folderul privat. Dacă folderul nu se poate scrie, nu limitează.
function prea_multe(string $dir, string $ip): bool
{
    if (!is_dir($dir) && !@mkdir($dir, 0700, true)) return false;
    $fisier = $dir . '/' . sha1($ip) . '.json';
    $acum = time();
    $lista = [];
    if (is_file($fisier)) {
        $vechi = json_decode((string) @file_get_contents($fisier), true);
        if (is_array($vechi)) $lista = array_values(array_filter($vechi, fn ($t) => is_int($t) && $acum - $t < RATA_FEREASTRA));
    }
    $lista[] = $acum;
    @file_put_contents($fisier, json_encode($lista), LOCK_EX);
    // Din când în când, șterge fișierele adreselor care n-au mai trimis nimic de o oră.
    if (random_int(1, 20) === 1) {
        foreach (glob($dir . '/*.json') ?: [] as $f) {
            if ($acum - (int) @filemtime($f) > RATA_FEREASTRA) @unlink($f);
        }
    }
    return count($lista) > RATA_MAXIM;
}

function e(string $text): string
{
    return htmlspecialchars($text, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

// Conținutul emailului, în secțiuni (același ca înainte de mutarea pe hosting).
function compune_email(array $c): array
{
    $domeniu = DOMENII[$c['domeniu']] ?? '-';
    $mobila = $c['formaEticheta'] && ($c['mobila'][0] ?? '') === 'Bucătărie' ? 'Bucătărie ' . $c['formaEticheta'] : implode(', ', $c['mobila']);

    // Atașamentele primesc nume scurte și ordonate (plan.pdf, poza-1.jpg…); numele original apare în listă.
    $atasamente = [];
    if ($c['plan']) $atasamente[] = ['fisier' => $c['plan'], 'nume' => 'plan' . extensie($c['plan']['name']), 'rol' => 'Plan'];
    foreach ($c['poze'] as $i => $p) {
        $atasamente[] = ['fisier' => $p, 'nume' => 'poza-' . ($i + 1) . extensie($p['name']), 'rol' => 'Poza ' . ($i + 1)];
    }

    $sectiuni = [
        ['Contact', [
            ['Nume', $c['nume']],
            ['Telefon', $c['telefon'], 'tel:' . preg_replace('/[^\d+]/', '', $c['telefon'])],
            ['Localitate', $c['localitate'] !== '' ? $c['localitate'] : 'nu a completat'],
        ]],
        ['Proiect', array_merge(
            [['Ce mobilează', $domeniu], ['Mobilă', $mobila]],
            $c['numarPereti'] ? [['Pereți cu mobilă', (string) $c['numarPereti']]] : [],
            [['Buget orientativ', $c['buget'] !== '' ? $c['buget'] : 'nu a ales']],
        )],
        ['Dimensiuni (cm, aproximative)', $c['dimensiuni']
            ? array_map(fn ($d) => [$d['eticheta'], $d['valoare'] . ' cm'], $c['dimensiuni'])
            : [['', $c['domeniu'] === 'o-camera' ? 'Nu a trimis dimensiuni.' : 'Pentru mai multe camere nu se cer pe pereți: vezi planul la atașamente, dacă a fost trimis.']]],
        ['Alte detalii', [['', $c['detalii'] !== '' ? $c['detalii'] : 'nu a completat']]],
        ['Atașamente (' . count($atasamente) . ')', $atasamente
            ? array_map(fn ($a) => [$a['rol'], $a['nume'] . ' · ' . formateaza_marime((int) $a['fisier']['size']) . ' (trimis ca „' . $a['fisier']['name'] . '”)'], $atasamente)
            : [['', 'Fără atașamente.']]],
    ];

    $subiect = 'Cerere de ofertă: ' . $mobila . ' · ' . mb_strtolower($domeniu) . ' · ' . $c['nume'];
    $rezumat = implode(' · ', array_filter([$domeniu, $mobila, $c['buget']]));
    $celula = 'padding:6px 12px 6px 0;vertical-align:top;font-size:15px;line-height:1.45;';

    $html = '<!doctype html><html lang="ro"><body style="margin:0;padding:24px;background:#FAF8F4;font-family:Arial,Helvetica,sans-serif;color:#111111;">' . "\n"
        . '<div style="max-width:640px;margin:0 auto;background:#FFFFFF;border:1px solid #E6E1D8;">' . "\n"
        . '<div style="height:6px;width:96px;background:#FFD100;margin-left:24px;"></div>' . "\n"
        . '<div style="padding:20px 24px 8px;">' . "\n"
        . '<h1 style="margin:0 0 4px;font-size:20px;">Cerere de ofertă nouă</h1>' . "\n"
        . '<p style="margin:0;color:#5E5A55;font-size:15px;">' . e($rezumat) . '</p>' . "\n</div>\n";
    $textSimplu = ['Cerere de ofertă nouă', $rezumat, ''];
    foreach ($sectiuni as [$titlu, $randuri]) {
        $html .= '<div style="padding:16px 24px;border-top:1px solid #E6E1D8;">' . "\n"
            . '<h2 style="margin:0 0 8px;font-size:12px;letter-spacing:0.12em;text-transform:uppercase;color:#5E5A55;">' . e($titlu) . '</h2>' . "\n"
            . '<table cellpadding="0" cellspacing="0" style="border-collapse:collapse;width:100%;">';
        $textSimplu[] = mb_strtoupper($titlu);
        foreach ($randuri as $r) {
            [$k, $v] = $r;
            $valoare = isset($r[2]) ? '<a href="' . e($r[2]) . '" style="color:#111111;">' . e($v) . '</a>' : nl2br(e($v), false);
            $html .= $k !== ''
                ? '<tr><td style="' . $celula . 'color:#5E5A55;width:42%;">' . e($k) . '</td><td style="' . $celula . 'font-weight:bold;">' . $valoare . '</td></tr>'
                : '<tr><td colspan="2" style="' . $celula . '">' . $valoare . '</td></tr>';
            $textSimplu[] = $k !== '' ? "$k: $v" : $v;
        }
        $html .= "</table>\n</div>\n";
        $textSimplu[] = '';
    }
    $html .= "</div>\n</body></html>";

    return ['subiect' => $subiect, 'html' => $html, 'text' => implode("\n", $textSimplu), 'atasamente' => $atasamente];
}

// ---------- cererea ----------

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    raspunde(['stare' => 'eroare', 'mesaj' => 'Metodă nepermisă.'], 405);
}
// Când cererea depășește post_max_size, PHP golește $_POST și $_FILES.
if (!$_POST && (int) ($_SERVER['CONTENT_LENGTH'] ?? 0) > 0) {
    raspunde(['stare' => 'eroare', 'erori' => ['atasamente' => 'Fișierele pot avea împreună cel mult ' . LIMITE['mbTotal'] . ' MB.']]);
}
// Câmp-capcană: oamenii nu îl văd, roboții îl completează.
if (text('site_web') !== '') {
    raspunde(['stare' => 'trimis']);
}

$domeniu = isset(DOMENII[text('domeniu')]) ? text('domeniu') : 'o-camera';
$mobila = array_values(array_filter((array) ($_POST['mobila'] ?? []), fn ($m) => is_string($m) && in_array($m, TIPURI_MOBILA, true)));
if ($domeniu === 'o-camera') $mobila = array_slice($mobila, 0, 1);
$tip = $domeniu === 'o-camera' ? ($mobila[0] ?? null) : null;
$forma = isset(FORME_BUCATARIE[text('forma')]) ? text('forma') : null;
$nrPereti = min(3, max(1, (int) text('nr_pereti') ?: 1));
$campuri = campuri_dimensiuni($domeniu, $tip, $forma, $nrPereti);

$valori = [
    'nume' => text('nume'),
    'telefon' => text('telefon'),
    'localitate' => mb_substr(text('localitate'), 0, 120),
    'detalii' => text('detalii'),
    'buget' => in_array(text('buget'), BUGETE, true) ? text('buget') : '',
    'acord' => text('acord') === 'da',
    'domeniu' => $domeniu,
    'mobila' => $mobila,
    'forma' => $forma,
    'nrPereti' => $nrPereti,
    'dim' => new stdClass(),
];
foreach ($campuri as $c) $valori['dim']->{$c['nume']} = text('dim_' . $c['nume']);

$erori = [];
if (mb_strlen($valori['nume']) < 2) $erori['nume'] = 'Scrie-ne numele tău.';
if ($valori['telefon'] === '') $erori['telefon'] = 'Scrie-ne un număr de telefon la care te putem suna.';
elseif (!telefon_valid($valori['telefon'])) $erori['telefon'] = 'Numărul nu pare corect. Folosește formatul 07xx xxx xxx sau +40 7xx xxx xxx.';
if (!$mobila) $erori['mobila'] = 'Alege tipul de mobilă.';
if (!$valori['acord']) $erori['acord'] = 'Avem nevoie de acordul tău ca să folosim datele pentru ofertă.';

$dimensiuni = [];
foreach ($campuri as $c) {
    $r = valideaza_dimensiune($valori['dim']->{$c['nume']}, $c);
    if (isset($r['eroare'])) $erori['dim_' . $c['nume']] = $r['eroare'];
    elseif ($r['valoare'] !== null) $dimensiuni[] = ['eticheta' => $c['eticheta'], 'valoare' => $r['valoare']];
}
if (mb_strlen($valori['detalii']) > 3000) $erori['detalii'] = 'Detaliile au peste 3000 de caractere. Scurtează-le puțin.';

$poze = fisiere('poze');
$planuri = fisiere('plan');
$cerePlan = $domeniu !== 'o-camera' || $tip === 'Comercial';
$plan = $cerePlan && $planuri ? $planuri[0] : null;
$toate = array_merge($poze, $plan ? [$plan] : []);
$total = array_sum(array_map(fn ($f) => (int) $f['size'], $toate));

if (count($poze) > LIMITE['poze']) $erori['poze'] = 'Poți trimite cel mult ' . LIMITE['poze'] . ' poze.';
elseif (array_filter($poze, fn ($p) => $p['type'] !== '' && !in_array($p['type'], TIPURI_IMAGINE, true))) $erori['poze'] = 'Trimite pozele ca JPG, PNG, WEBP sau HEIC.';
if ($plan) {
    if ($plan['type'] === 'application/pdf') {
        if ($plan['size'] > LIMITE['mbPdf'] * MB) $erori['plan'] = 'Planul PDF poate avea cel mult ' . LIMITE['mbPdf'] . ' MB.';
    } elseif (!in_array($plan['type'], TIPURI_IMAGINE, true)) {
        $erori['plan'] = 'Trimite planul ca PDF sau ca imagine (JPG, PNG).';
    }
}
// Fișiere respinse de PHP (peste upload_max_filesize) sau peste limita totală.
$respinse = array_filter($toate, fn ($f) => $f['error'] !== UPLOAD_ERR_OK || !is_uploaded_file($f['tmp_name']));
if ($total > LIMITE['mbTotal'] * MB || $respinse) {
    $erori['atasamente'] = 'Fișierele pot avea împreună cel mult ' . LIMITE['mbTotal'] . ' MB.';
}

$aveaFisiere = (bool) $toate;
if ($erori) {
    raspunde(['stare' => 'eroare', 'erori' => $erori, 'valori' => $valori, 'aveaFisiere' => $aveaFisiere]);
}

// Configurarea: în afara public_html. AMBER_CONFIG e doar pentru teste locale.
$caleConfig = getenv('AMBER_CONFIG') ?: dirname(rtrim($_SERVER['DOCUMENT_ROOT'], '/\\')) . '/amber-privat/config.php';
$config = is_file($caleConfig) ? require $caleConfig : null;
if (!is_array($config) || empty($config['smtp_gazda']) || empty($config['de_la']) || empty($config['catre'])) {
    error_log('[cerere-oferta] Lipsește sau e incomplet fișierul de configurare: ' . $caleConfig);
    raspunde(['stare' => 'eroare', 'mesaj' => MESAJ_TEHNIC, 'valori' => $valori, 'aveaFisiere' => $aveaFisiere]);
}

if (prea_multe(dirname($caleConfig) . '/rata', $_SERVER['REMOTE_ADDR'] ?? 'necunoscut')) {
    raspunde([
        'stare' => 'eroare',
        'mesaj' => 'Am primit deja mai multe cereri de la tine în ultima oră. Încearcă mai târziu sau sună-ne.',
        'valori' => $valori,
        'aveaFisiere' => $aveaFisiere,
    ]);
}

$email = compune_email([
    'nume' => $valori['nume'],
    'telefon' => $valori['telefon'],
    'localitate' => $valori['localitate'],
    'detalii' => $valori['detalii'],
    'buget' => $valori['buget'],
    'domeniu' => $domeniu,
    'mobila' => $mobila,
    'formaEticheta' => $tip === 'Bucătărie' && $forma ? FORME_BUCATARIE[$forma]['inText'] : null,
    'numarPereti' => in_array($tip, TIPURI_CU_PERETI, true) ? $nrPereti : null,
    'dimensiuni' => $dimensiuni,
    'plan' => $plan,
    'poze' => $poze,
]);

require __DIR__ . '/lib/PHPMailer/Exception.php';
require __DIR__ . '/lib/PHPMailer/PHPMailer.php';
require __DIR__ . '/lib/PHPMailer/SMTP.php';

try {
    $mail = new PHPMailer\PHPMailer\PHPMailer(true);
    $mail->isSMTP();
    $mail->CharSet = 'UTF-8';
    $mail->Host = $config['smtp_gazda'];
    $mail->Port = (int) ($config['smtp_port'] ?? 465);
    $securizare = $config['smtp_securizare'] ?? 'ssl'; // 'ssl' (465), 'tls' (587) sau '' (doar teste locale)
    if ($securizare === '') {
        $mail->SMTPSecure = '';
        $mail->SMTPAutoTLS = false;
    } else {
        $mail->SMTPSecure = $securizare;
    }
    if (!empty($config['smtp_utilizator'])) {
        $mail->SMTPAuth = true;
        $mail->Username = $config['smtp_utilizator'];
        $mail->Password = $config['smtp_parola'] ?? '';
    }
    $mail->Timeout = 20;
    $mail->setFrom($config['de_la'], $config['de_la_nume'] ?? 'Site Amber');
    $mail->addAddress($config['catre']);
    $mail->Subject = $email['subiect'];
    $mail->isHTML(true);
    $mail->Body = $email['html'];
    $mail->AltBody = $email['text'];
    foreach ($email['atasamente'] as $a) {
        // Tipul vine din formular și a fost verificat mai sus (imagine sau PDF).
        $mail->addAttachment($a['fisier']['tmp_name'], $a['nume'], 'base64', $a['fisier']['type'] ?: 'application/octet-stream');
    }
    $mail->send();
} catch (Throwable $ex) {
    error_log('[cerere-oferta] Cererea nu a putut fi trimisă: ' . $ex->getMessage());
    raspunde(['stare' => 'eroare', 'mesaj' => MESAJ_TEHNIC, 'valori' => $valori, 'aveaFisiere' => $aveaFisiere]);
}

raspunde(['stare' => 'trimis']);
