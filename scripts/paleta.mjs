// Extrage 4–5 culori dominante din pozele fiecărui proiect și etichetele de culoare pentru filtru.
// Rulează automat înainte de build (npm run prebuild) și scrie data/paleta.js.
// Rulare manuală: npm run paleta
import sharp from "sharp";
import { writeFile } from "node:fs/promises";
import { join } from "node:path";
import { proiecte } from "../data/proiecte.js";

const RADACINA = join(import.meta.dirname, "..");

// ---------- culori ----------

function hexDin([r, g, b]) {
  return `#${[r, g, b].map((v) => Math.round(v).toString(16).padStart(2, "0")).join("")}`.toUpperCase();
}

function hexInRgb(hex) {
  return [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));
}

function hsl([r, g, b]) {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  if (max === min) return { h: 0, s: 0, l };
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h;
  if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) * 60;
  else if (max === g) h = ((b - r) / d + 2) * 60;
  else h = ((r - g) / d + 4) * 60;
  return { h, s, l };
}

// Nume aproximativ, în română, pentru o culoare. Familia e folosită de filtrul pe culori.
export function numeCuloare(rgb) {
  const { h, s, l } = hsl(rgb);
  if (l > 0.9 && s < 0.35) return { nume: "alb", familie: "alb" };
  if (l < 0.13) return { nume: "negru", familie: "negru" };
  if (s < 0.1 || (s < 0.14 && l < 0.3)) {
    if (l > 0.75) return { nume: "gri deschis", familie: "gri" };
    if (l < 0.3) return { nume: "antracit", familie: "gri" };
    return { nume: "gri", familie: "gri" };
  }
  if (h >= 15 && h < 50 && s > 0.75 && l > 0.4) {
    return { nume: h < 35 ? "portocaliu" : "galben", familie: "vii" };
  }
  if (h >= 15 && h < 50) {
    if (l > 0.82) return { nume: "crem", familie: "bej" };
    if (l > 0.68) return { nume: "bej", familie: "bej" };
    if (s < 0.25) return { nume: "taupe", familie: "bej" };
    if (l < 0.3) return { nume: "maro închis", familie: "lemn" };
    return { nume: "lemn", familie: "lemn" };
  }
  if (h >= 50 && h < 75) {
    if (l > 0.75) return { nume: "crem", familie: "bej" };
    if (s < 0.35) return { nume: "oliv", familie: "verde" };
    return { nume: "galben", familie: "vii" };
  }
  if (h >= 70 && h < 170) {
    if (l > 0.72) return { nume: "verde mentă", familie: "verde" };
    if (s < 0.3) return { nume: "verde salvie", familie: "verde" };
    if (l < 0.3) return { nume: "verde închis", familie: "verde" };
    return { nume: "verde", familie: "verde" };
  }
  if (h >= 170 && h < 255) {
    if (l > 0.72) return { nume: "bleu", familie: "albastru" };
    if (h < 200) return { nume: "turcoaz", familie: "albastru" };
    if (l < 0.35) return { nume: "albastru închis", familie: "albastru" };
    return { nume: "albastru", familie: "albastru" };
  }
  if (h >= 255 && h < 330) return { nume: l > 0.7 ? "roz" : "mov", familie: "vii" };
  if (l > 0.7) return { nume: "roz", familie: "vii" };
  return { nume: s > 0.5 ? "roșu" : "coral", familie: "vii" };
}

// ---------- k-means simplu ----------

function distanta(a, b) {
  // Distanță ponderată, mai apropiată de percepție decât RGB simplu.
  const rm = (a[0] + b[0]) / 2;
  const dr = a[0] - b[0];
  const dg = a[1] - b[1];
  const db = a[2] - b[2];
  return (2 + rm / 256) * dr * dr + 4 * dg * dg + (2 + (255 - rm) / 256) * db * db;
}

function kmeans(pixeli, k, iteratii = 12) {
  // Inițializare deterministă (k-means++ fără aleator): cel mai depărtat punct, pe rând.
  const centre = [pixeli[Math.floor(pixeli.length / 2)]];
  while (centre.length < k) {
    let maxD = -1;
    let ales = pixeli[0];
    for (let i = 0; i < pixeli.length; i += 7) {
      const d = Math.min(...centre.map((c) => distanta(c, pixeli[i])));
      if (d > maxD) {
        maxD = d;
        ales = pixeli[i];
      }
    }
    centre.push(ales);
  }
  let atribuiri = new Array(pixeli.length).fill(0);
  for (let it = 0; it < iteratii; it++) {
    atribuiri = pixeli.map((p) => {
      let best = 0;
      let bestD = Infinity;
      centre.forEach((c, j) => {
        const d = distanta(c, p);
        if (d < bestD) {
          bestD = d;
          best = j;
        }
      });
      return best;
    });
    const sume = centre.map(() => [0, 0, 0, 0]);
    pixeli.forEach((p, i) => {
      const s = sume[atribuiri[i]];
      s[0] += p[0];
      s[1] += p[1];
      s[2] += p[2];
      s[3]++;
    });
    sume.forEach((s, j) => {
      if (s[3]) centre[j] = [s[0] / s[3], s[1] / s[3], s[2] / s[3]];
    });
  }
  const numar = centre.map(() => 0);
  atribuiri.forEach((a) => numar[a]++);
  return centre.map((c, j) => ({ rgb: c, procent: numar[j] / pixeli.length }));
}

async function pixeliDin(cale) {
  const { data, info } = await sharp(cale)
    .resize(72, 72, { fit: "inside" })
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const out = [];
  for (let i = 0; i < data.length; i += info.channels) out.push([data[i], data[i + 1], data[i + 2]]);
  return out;
}

// ---------- etichete pentru filtru ----------

const cuvinteCheie = {
  verde: /verde|mentă|salvie|fistic/,
  alb: /\balb[aăe]?\b|albe\b/,
  bej: /\bbej\b|crem|cappuccino|taupe/,
  gri: /\bgri\b|antracit/,
  negru: /negr[uăe]|neagr/,
  lemn: /lemn|stejar|nuc\b|furnir/,
  albastru: /albastr|bleu|petrol|turcoaz/,
  vii: /galben|portocaliu|roz|coral|roșu|rosu|mov|burgund/,
};

function etichete(proiect, paleta) {
  const text = `${proiect.titlu} ${proiect.materiale.join(" ")}`.toLowerCase();
  const set = new Set(Object.keys(cuvinteCheie).filter((f) => cuvinteCheie[f].test(text)));
  // Din paletă se iau doar familiile colorate și numai dacă ocupă o parte vizibilă din imagini.
  // Albul și griul pereților, ca și lemnul parchetului, ar eticheta altfel aproape orice proiect,
  // așa că pentru ele contează doar titlul și materialele.
  for (const c of paleta) {
    if (["verde", "albastru", "vii"].includes(c.familie) && c.procent >= 0.12) set.add(c.familie);
  }
  return [...set];
}

// ---------- rulare ----------

const palete = {};
const culori = {};

for (const p of proiecte) {
  const reale = p.imagini.filter((i) => i.tip === "foto_reala");
  const surse = (reale.length ? reale : p.imagini).slice(0, 4);
  const pixeli = (await Promise.all(surse.map((i) => pixeliDin(join(RADACINA, "public", i.src))))).flat();
  const grupuri = kmeans(pixeli, 7)
    .filter((g) => g.procent >= 0.03)
    .sort((a, b) => b.procent - a.procent);

  // Comasăm culorile foarte apropiate, apoi păstrăm primele 5.
  const comasate = [];
  for (const g of grupuri) {
    const aproape = comasate.find((c) => distanta(c.rgb, g.rgb) < 1800);
    if (aproape) aproape.procent += g.procent;
    else comasate.push({ ...g });
  }
  const paleta = comasate.slice(0, 5).map((g) => {
    const { nume, familie } = numeCuloare(g.rgb);
    return { hex: hexDin(g.rgb), nume, familie, procent: Math.round(g.procent * 100) / 100 };
  });

  // Nume repetate în aceeași paletă (inclusiv „gri” și „gri deschis”): le deosebim după luminozitate.
  const baza = (n) => n.replace(/ (deschis|închis)$/, "");
  for (const nume of new Set(paleta.map((c) => baza(c.nume)))) {
    const la = paleta.filter((c) => baza(c.nume) === nume);
    if (la.length < 2) continue;
    la.sort((a, b) => hsl(hexInRgb(b.hex)).l - hsl(hexInRgb(a.hex)).l);
    const sufixe = {
      2: ["deschis", "închis"],
      3: ["deschis", "mediu", "închis"],
      4: ["foarte deschis", "deschis", "închis", "foarte închis"],
      5: ["foarte deschis", "deschis", "mediu", "închis", "foarte închis"],
    }[la.length];
    la.forEach((c, i) => {
      c.nume = `${nume} ${sufixe[Math.min(i, sufixe.length - 1)]}`;
    });
  }

  palete[p.slug] = paleta;
  culori[p.slug] = etichete(p, paleta);
}

const continut = `// Generat de scripts/paleta.mjs (npm run paleta, rulează automat la build). Nu edita manual.
// palete: culorile dominante din pozele fiecărui proiect, aproximative.
// culori: familiile de culoare folosite de filtrul de pe /proiecte.

export const palete = ${JSON.stringify(palete, null, 2)};

export const culori = ${JSON.stringify(culori, null, 2)};
`;

await writeFile(join(RADACINA, "data", "paleta.js"), continut);
console.log(`Paleta generată pentru ${proiecte.length} proiecte.`);
