// Rulează după `next build` (npm run build) și completează exportul static din out/:
//   out/imagini/…   variantele AVIF și WebP ale pozelor din public/proiecte, public/fabrica și public/showroom,
//                   la lățimile din lib/imagini.js (fără mărire peste original);
//   out/og/…        imaginile de share (1200×630) ale proiectelor publicate;
//   copii ale fișierelor de preîncărcare a paginilor, sub numele cerut de browser.
// Variantele se păstrează în .cache-imagini/ și se refac doar când poza sursă se schimbă,
// deci primul build durează în jur de 10 minute, iar următoarele câteva secunde.
import sharp from "sharp";
import { cp, mkdir, readdir, rename, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { adresaVarianta, formate, latimi } from "../lib/imagini.js";
import { proiecte } from "../data/proiecte.js";

const RADACINA = join(import.meta.dirname, "..");
const PUBLIC = join(RADACINA, "public");
const CACHE = join(RADACINA, ".cache-imagini");
const OUT = join(RADACINA, "out");
const CALITATE = { avif: 55, webp: 76 };

async function fisiereJpg(dir) {
  const rez = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const cale = join(dir, e.name);
    if (e.isDirectory()) rez.push(...(await fisiereJpg(cale)));
    else if (/\.jpe?g$/i.test(e.name)) rez.push(cale);
  }
  return rez;
}

// Varianta din cache e bună dacă există și e mai nouă decât sursa.
async function invechit(sursa, tinta) {
  if (!existsSync(tinta)) return true;
  return (await stat(tinta)).mtimeMs < (await stat(sursa)).mtimeMs;
}

// sharp își împarte singur lucrul pe nuclee; patru imagini în paralel sunt de ajuns.
async function inParalel(sarcini, n = 4) {
  let i = 0;
  await Promise.all(Array.from({ length: n }, async () => {
    while (i < sarcini.length) await sarcini[i++]();
  }));
}

if (!existsSync(OUT)) {
  console.error("Lipsește out/. Rulează întâi `next build`.");
  process.exit(1);
}
const sarcini = [];
let facute = 0;

for (const dir of ["proiecte", "fabrica", "showroom"]) {
  for (const sursa of await fisiereJpg(join(PUBLIC, dir))) {
    const src = sursa.slice(PUBLIC.length).replaceAll("\\", "/");
    for (const latime of latimi) {
      for (const format of formate) {
        const tinta = join(CACHE, adresaVarianta(src, latime, format));
        sarcini.push(async () => {
          if (!(await invechit(sursa, tinta))) return;
          await mkdir(dirname(tinta), { recursive: true });
          // Scris întâi sub alt nume: un build întrerupt nu lasă în cache o variantă pe jumătate.
          await sharp(sursa).resize({ width: latime, withoutEnlargement: true })[format]({ quality: CALITATE[format], effort: 3 }).toFile(`${tinta}.tmp`);
          await rename(`${tinta}.tmp`, tinta);
          facute++;
        });
      }
    }
  }
}

// Imaginea de share: prima poză a proiectului, decupată la 1200×630, cu sertarul galben din logo.
// Randările primesc eticheta „Proiect 3D” și aici.
for (const p of proiecte.filter((x) => x.publicat)) {
  const img = p.imagini[0];
  const sursa = join(PUBLIC, img.src);
  const tinta = join(CACHE, "og", `${p.slug}.jpg`);
  sarcini.push(async () => {
    if (!(await invechit(sursa, tinta))) return;
    await mkdir(dirname(tinta), { recursive: true });
    const eticheta =
      img.tip === "randare"
        ? `<rect x="40" y="40" width="226" height="56" fill="#111111"/><text x="58" y="78" font-family="Arial, Helvetica, sans-serif" font-size="26" letter-spacing="3" fill="#FFFFFF">PROIECT 3D</text>`
        : "";
    const strat = Buffer.from(
      `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">${eticheta}<rect x="0" y="568" width="180" height="14" fill="#FFD100"/></svg>`,
    );
    await sharp(sursa).resize(1200, 630, { fit: "cover" }).composite([{ input: strat }]).jpeg({ quality: 82, progressive: true }).toFile(tinta);
    facute++;
  });
}

// Datele pentru preîncărcarea paginilor: exportul le scrie în subfoldere
// (pagina/__next.proiecte/$d$slug/__PAGE__.txt), dar browserul le cere cu puncte
// (pagina/__next.proiecte.$d$slug.__PAGE__.txt). Le copiem și sub numele cerut, ca să meargă
// pe orice server, fără reguli de rescriere.
async function aplatizeaza(dir) {
  let n = 0;
  for (const e of await readdir(dir, { withFileTypes: true })) {
    if (!e.isDirectory()) continue;
    const cale = join(dir, e.name);
    if (!e.name.startsWith("__next.")) {
      n += await aplatizeaza(cale);
      continue;
    }
    for (const f of await readdir(cale, { recursive: true, withFileTypes: true })) {
      if (!f.isFile()) continue;
      const rel = join(f.parentPath, f.name).slice(cale.length + 1).replaceAll("\\", "/");
      await cp(join(f.parentPath, f.name), join(dir, `${e.name}.${rel.replaceAll("/", ".")}`));
      n++;
    }
  }
  return n;
}
const preincarcari = await aplatizeaza(OUT);

const start = Date.now();
await inParalel(sarcini);
await cp(join(CACHE, "imagini"), join(OUT, "imagini"), { recursive: true, filter: (f) => !f.endsWith(".tmp") });
await cp(join(CACHE, "og"), join(OUT, "og"), { recursive: true });
console.log(`Preîncărcări: ${preincarcari} fișiere copiate sub numele cerut de browser.`);
console.log(`Imagini: ${sarcini.length} variante (${facute} generate acum, restul din .cache-imagini) în ${Math.round((Date.now() - start) / 1000)} s.`);
