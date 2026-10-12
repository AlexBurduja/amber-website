# Urcarea site-ului pe Datahost (ambermob.ro)

Site-ul e un export static: `npm run build` scrie totul în `out/`, iar conținutul lui `out/` ajunge în `public_html/`. Singurul cod care rulează pe server e `api/cerere.php`, care trimite cererile de ofertă pe email.

## 1. În cPanel, o singură dată

1. **Domeniu și SSL.** `ambermob.ro` trebuie să ducă la `public_html`. La **SSL/TLS Status**, rulează AutoSSL pentru `ambermob.ro` și `www.ambermob.ro`. Fără certificat valid pe amândouă, redirecționarea spre `https://ambermob.ro` dă eroare în browser.
2. **PHP.** La **MultiPHP Manager**, alege PHP 8.1 sau mai nou pentru domeniu. Extensiile `openssl` și `mbstring` trebuie să fie active (sunt, în mod normal).
3. **Conturi de email.** La **Email Accounts**, creează `cereri@ambermob.ro` (de pe el pleacă cererile) și verifică să existe `vanzari@ambermob.ro` (unde ajung). Datele SMTP sunt la **Connect Devices**.
4. **Livrarea emailurilor.** La **Email Deliverability**, repară SPF și DKIM dacă apar cu probleme.
5. **Configurarea formularului.** În **File Manager**, în folderul de acasă (`/home/UTILIZATOR/`, lângă `public_html`, nu în el), creează folderul `amber-privat`. Urcă în el `server/config.exemplu.php` din proiect, redenumit `config.php`, și completează parola contului `cereri@ambermob.ro`. Pune permisiunile 700 pe folder și 600 pe fișier.
6. **Cont FTP.** Folosește contul principal de cPanel sau un cont FTP care vede folderul de acasă (cel care conține `public_html`).

## 2. Pe calculatorul tău, o singură dată

1. Copiază `ftp.exemplu.json` ca `ftp.local.json` și completează gazda, utilizatorul și parola FTP. Fișierul nu intră în git.
2. Dacă serverul nu acceptă FTP securizat, pune `"securizat": false`.

## 3. Urcarea

```
npm run urca
```

- Face build-ul, apoi urcă `out/` în `public_html/`.
- **Prima rulare** descarcă întâi tot ce e acum în `public_html` în `backup-public_html/`, apoi urcă în jur de 7.700 de fișiere (470 MB). Durează mult, posibil peste o oră. Dacă se întrerupe, rulează din nou: continuă de unde a rămas.
- Scriptul nu șterge nimic din ce era deja în `public_html`. Dacă acolo e un site vechi sau o pagină implicită (`index.php`, `default.html`), șterge-le tu din File Manager.

## 4. Verificare după urcare

- `http://www.ambermob.ro/despre` ajunge la `https://ambermob.ro/despre/`.
- `https://ambermob.ro/robots.txt` conține `Allow: /`, iar `https://ambermob.ro/sitemap.xml` se deschide.
- O adresă inexistentă arată pagina 404 a site-ului.
- **Trimite o cerere de test cu o poză** de pe `/cerere-oferta/` și verifică emailul în `vanzari@ambermob.ro`, inclusiv în Spam.

Dacă formularul arată „problemă tehnică”: motivul e în jurnalul de erori PHP (**Errors** în cPanel sau `public_html/api/error_log`). De obicei lipsește `amber-privat/config.php` sau parola e greșită.

Dacă o cerere cu poze e respinsă: limitele PHP vin din `public_html/api/.user.ini` (4 MB pe fișier, 6 MB pe cerere). Dacă serverul nu le ia de acolo, pune aceleași valori la **MultiPHP INI Editor** (`upload_max_filesize`, `post_max_size`).

## 5. Actualizări

Schimbi ce ai de schimbat (texte, proiecte în `data/proiecte.js`, poze în `public/`), apoi rulezi din nou `npm run urca`. Urcă doar fișierele schimbate și șterge de pe server doar fișierele urcate de el care nu mai există.

- **Poză înlocuită sub același nume:** browserele o țin 30 de zile. Dacă trebuie să se vadă imediat, dă-i alt nume.
- **Calculator nou sau `.urcare.json` șters:** scriptul consideră că e prima rulare, face din nou copia de siguranță și urcă tot.

## Ce conține `out/`

| | |
| --- | --- |
| `index.html`, `despre/`, `proiecte/…` | paginile, câte un folder cu `index.html` |
| `_next/` | codul și stilurile generate de build |
| `imagini/` | variantele AVIF și WebP ale pozelor |
| `proiecte/`, `fabrica/`, `brand/` | pozele originale (rezerva JPEG) și logo-urile |
| `og/` | imaginile de share ale proiectelor |
| `api/cerere.php`, `api/lib/` | scriptul formularului și PHPMailer |
| `.htaccess` | redirecționări, 404, cache, fișiere blocate |
| `sitemap.xml`, `robots.txt` | generate la build |
