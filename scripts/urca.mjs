// Urcă exportul static (out/) pe hosting, prin FTP. Rulare: npm run urca  (face întâi build-ul).
//
// - Datele FTP se citesc din ftp.local.json (model: ftp.exemplu.json); fișierul nu intră în git.
// - Lucrează doar în directorul din `director` (implicit public_html) și nu iese din el.
// - La prima rulare descarcă o copie a ce e acum în public_html, în backup-public_html/.
// - Urcă doar fișierele noi sau schimbate față de ultima urcare (evidența e în .urcare.json)
//   și șterge de pe server doar fișiere pe care tot el le-a urcat și care nu mai există în out/.
//   Orice alt fișier din public_html (pus de tine sau de cPanel) rămâne neatins.
import { Client } from "basic-ftp";
import { createHash } from "node:crypto";
import { existsSync } from "node:fs";
import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import { join, posix } from "node:path";

const RADACINA = join(import.meta.dirname, "..");
const OUT = join(RADACINA, "out");
const CONFIG = join(RADACINA, "ftp.local.json");
const EVIDENTA = join(RADACINA, ".urcare.json");

function opreste(mesaj) {
  console.error(mesaj);
  process.exit(1);
}

async function fisiereLocale(dir, prefix = "") {
  const rez = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const rel = prefix ? `${prefix}/${e.name}` : e.name;
    if (e.isDirectory()) rez.push(...(await fisiereLocale(join(dir, e.name), rel)));
    else rez.push(rel);
  }
  return rez;
}

if (!existsSync(join(OUT, "index.html"))) opreste("Lipsește out/index.html. Rulează întâi `npm run build`.");
if (!existsSync(CONFIG)) opreste("Lipsește ftp.local.json. Copiază ftp.exemplu.json ca ftp.local.json și completează datele FTP.");

const cfg = JSON.parse(await readFile(CONFIG, "utf8"));
const director = String(cfg.director ?? "public_html").replace(/^\/+|\/+$/g, "");
// Directorul-țintă trebuie să fie public_html sau un folder din el.
if (!/^public_html(\/[A-Za-z0-9._-]+)*$/.test(director) || director.split("/").includes("..")) {
  opreste(`„director” trebuie să fie public_html sau un folder din el (acum: „${cfg.director}”).`);
}

const evidenta = existsSync(EVIDENTA) ? JSON.parse(await readFile(EVIDENTA, "utf8")) : null;
const urcate = evidenta?.fisiere ?? {};

// Starea locală: fiecare fișier din out/, cu amprenta conținutului.
const locale = {};
for (const rel of await fisiereLocale(OUT)) {
  locale[rel] = createHash("sha1").update(await readFile(join(OUT, rel))).digest("hex");
}
// Paginile HTML la final: când apar ele, fișierele de care au nevoie sunt deja pe server.
const deUrcat = Object.keys(locale)
  .filter((rel) => urcate[rel] !== locale[rel])
  .sort((a, b) => Number(a.endsWith(".html")) - Number(b.endsWith(".html")) || a.localeCompare(b));
const deSters = Object.keys(urcate).filter((rel) => !(rel in locale));

const client = new Client(60000);
try {
  await client.access({
    host: cfg.gazda,
    port: cfg.port ?? 21,
    user: cfg.utilizator,
    password: cfg.parola,
    secure: cfg.securizat !== false,
  });
  await client.cd(director);
  const baza = await client.pwd();
  if (!baza.replace(/\/+$/, "").endsWith(director)) opreste(`Serverul a deschis „${baza}”, nu „${director}”. Mă opresc.`);
  // Toate căile de pe server trec pe aici: mereu în interiorul directorului-țintă.
  const peServer = (rel) => {
    if (rel.split("/").some((p) => p === ".." || p === "")) throw new Error(`Cale nepermisă: ${rel}`);
    return posix.join(baza, rel);
  };
  console.log(`Conectat la ${cfg.gazda}, în ${baza}.`);

  if (!evidenta) {
    const stampila = new Date().toISOString().slice(0, 19).replace(/[:T]/g, "-");
    const copie = join(RADACINA, "backup-public_html", stampila);
    await mkdir(copie, { recursive: true });
    console.log(`Prima rulare: descarc conținutul actual din ${baza} în backup-public_html/${stampila}/ …`);
    await client.downloadToDir(copie, baza);
    console.log("Copia de siguranță e gata.");
  }

  console.log(`De urcat: ${deUrcat.length} fișiere. De șters: ${deSters.length}. Neschimbate: ${Object.keys(locale).length - deUrcat.length}.`);
  const salveaza = () => writeFile(EVIDENTA, JSON.stringify({ gazda: cfg.gazda, director, fisiere: urcate }));

  let dirCurent = null;
  for (const [i, rel] of deUrcat.entries()) {
    const dir = posix.dirname(rel);
    if (dir !== dirCurent) {
      await client.ensureDir(dir === "." ? baza : peServer(dir));
      dirCurent = dir;
    }
    await client.uploadFrom(join(OUT, rel), peServer(rel));
    urcate[rel] = locale[rel];
    // Evidența se salvează pe parcurs: o urcare întreruptă se reia de unde a rămas.
    if ((i + 1) % 100 === 0) {
      await salveaza();
      console.log(`  ${i + 1} / ${deUrcat.length}`);
    }
  }
  for (const rel of deSters) {
    await client.remove(peServer(rel), true);
    delete urcate[rel];
  }
  await salveaza();
  console.log("Gata. Site-ul de pe server e la zi cu out/.");
} catch (e) {
  opreste(`Urcarea s-a oprit: ${e.message}\nRulează din nou; continuă de unde a rămas.`);
} finally {
  client.close();
}
