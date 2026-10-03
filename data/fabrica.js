// Etapele de producție din fabrica proprie și materialele folosite (confirmate de Alex).
// Pozele din fabrică și modelele de frezare provin din prezentarea firmei (materiale/*.pdf),
// procesate în public/fabrica/: metadate șterse, siglele utilajelor reconstruite.

export const etape = [
  {
    titlu: "Proiectare 3D",
    text: "Randări și schițe pe care le validezi înainte să intre ceva în producție.",
  },
  {
    titlu: "Debitare și cantuire",
    text: "Plăcile se taie la dimensiunea exactă din proiect, iar muchiile se cantuiesc.",
  },
  {
    titlu: "Vopsitorie",
    text: "MDF vopsit mat, lucios sau metalizat, în orice nuanță.",
  },
  {
    titlu: "Frezare CNC",
    text: "Fronturi frezate după model sau după desenul tău.",
  },
  {
    titlu: "Structuri metalice",
    text: "Cadre și picioare metalice, vopsite în câmp electrostatic.",
  },
  {
    titlu: "Printare",
    text: "Grafică printată pe sticlă, PAL și MDF.",
  },
  {
    titlu: "Tapițerie",
    text: "Paturi, tăblii și panouri decorative tapițate.",
  },
  {
    titlu: "Montaj și service",
    text: "Montajul îl face echipa noastră. Tot ea revine pentru service.",
  },
];

export const pozeFabrica = [
  {
    src: "/fabrica/fabrica-debitare.jpg",
    alt: "Mașină de debitat panouri în fabrica Amber, cu o placă albă pe masa de lucru",
    eticheta: "Debitare",
    latime: 593,
    inaltime: 326,
  },
  {
    src: "/fabrica/fabrica-vopsitorie.jpg",
    alt: "Vopsirea unui front MDF cu pistolul, în cabina de vopsit",
    eticheta: "Vopsitorie",
    latime: 593,
    inaltime: 396,
  },
  {
    src: "/fabrica/fabrica-frezare-cnc.jpg",
    alt: "Utilaj CNC frezând fronturi dintr-o placă de MDF",
    eticheta: "Frezare CNC",
    latime: 593,
    inaltime: 292,
  },
];

export const modeleFrezare = [
  { src: "/fabrica/frezare-rama-clasica-albastru.jpg", nume: "Ramă clasică, vopsit albastru" },
  { src: "/fabrica/frezare-panou-tesit.jpg", nume: "Panou cu margini teșite" },
  { src: "/fabrica/frezare-arcada-dubla.jpg", nume: "Arcadă cu umeri" },
  { src: "/fabrica/frezare-arcada.jpg", nume: "Arcadă" },
  { src: "/fabrica/frezare-riflaj.jpg", nume: "Riflaj vertical" },
  { src: "/fabrica/frezare-rama-simpla.jpg", nume: "Ramă simplă" },
];

// Materiale și feronerie. Doar nume, fără siglele furnizorilor.
// Nu se atribuie unor proiecte anume: în galerie materialele sunt descrise după aspect.
export const materiale = {
  pal: {
    titlu: "PAL melaminat 18 mm",
    text: "Pentru corpuri și fronturi în decoruri lemn, uni sau piatră.",
    nume: ["EGGER", "Kronospan", "Kastamonu", "Cleaf (PAL termo-structurat)"],
  },
  mdf: {
    titlu: "MDF",
    text: "Vopsit mat, lucios sau metalizat, frezat, riflat sau printat.",
    nume: ["MDF vopsit", "MDF frezat", "MDF riflat", "MDF printat", "MDF AGT"],
  },
  blaturi: {
    titlu: "Blaturi",
    text: "Blaturile din quartz compozit se croiesc și se montează la fața locului.",
    nume: ["Kaindl", "Quartz compozit", "Cressent"],
  },
  feronerie: {
    titlu: "Feronerie",
    text: "Balamale, glisiere și sisteme de ridicare cu închidere lină.",
    nume: ["Blum Tandem", "Blum Legrabox", "Blum Aventos", "Blum Servodrive", "Push-to-open", "Häfele", "Hettich", "FGV"],
  },
};
