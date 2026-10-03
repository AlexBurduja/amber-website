// Raport de înlocuire: câte imagini din arhivă și câte noi are fiecare proiect.
// Rulare: npm run raport-arhiva
import { categorii, proiecte } from "../data/proiecte.js";

const rânduri = proiecte.map((p) => {
  const arhiva = p.imagini.filter((i) => i.sursa === "arhiva").length;
  const amber = p.imagini.filter((i) => i.sursa === "amber").length;
  return { ...p, arhiva, amber };
});

const lățime = Math.max(...rânduri.map((r) => r.slug.length));
let totalArhiva = 0;
let totalAmber = 0;

for (const c of categorii) {
  const dinCategorie = rânduri.filter((r) => r.categorie === c.slug);
  if (!dinCategorie.length) continue;
  console.log(`\n${c.nume.toUpperCase()}`);
  console.log(`  ${"proiect".padEnd(lățime)}  arhivă  amber  stare`);
  for (const r of dinCategorie) {
    const stare = !r.publicat
      ? "nepublicat"
      : r.arhiva === 0
        ? "înlocuit complet"
        : r.amber === 0
          ? "doar arhivă"
          : "parțial";
    console.log(
      `  ${r.slug.padEnd(lățime)}  ${String(r.arhiva).padStart(6)}  ${String(r.amber).padStart(5)}  ${stare}`,
    );
    totalArhiva += r.arhiva;
    totalAmber += r.amber;
  }
}

const publicate = rânduri.filter((r) => r.publicat);
const curate = publicate.filter((r) => r.arhiva === 0).length;
console.log(
  `\nTotal: ${rânduri.length} proiecte (${publicate.length} publicate), ` +
    `${totalArhiva} imagini din arhivă, ${totalAmber} imagini noi. ` +
    `Proiecte publicate fără imagini din arhivă: ${curate}/${publicate.length}.`,
);
