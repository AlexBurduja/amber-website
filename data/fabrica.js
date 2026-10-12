// Etapele de producție din fabrica proprie și materialele folosite (confirmate de Alex).
// Pozele din fabrică și mostrele de fronturi sunt fotografii din arhiva foto (ședința din fabrică),
// procesate în public/fabrica/: metadate șterse, sRGB, fără numele sau siglele vreunui producător.

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
    alt: "O placă de PAL împinsă sub apărătoarea circularului de debitat",
    eticheta: "Debitare",
    latime: 2000,
    inaltime: 1333,
  },
  {
    src: "/fabrica/fabrica-vopsitorie.jpg",
    alt: "Vopsirea unei piese de MDF cu pistolul, în cabina de vopsit",
    eticheta: "Vopsitorie",
    latime: 2000,
    inaltime: 1333,
  },
  {
    src: "/fabrica/fabrica-frezare-cnc.jpg",
    alt: "Capul unui utilaj CNC, cu perie de aspirare, frezând o placă albă",
    eticheta: "Frezare CNC",
    latime: 2000,
    inaltime: 1215,
  },
];

// Mostre de fronturi din fabrică. `alt` descrie ce se vede în fotografie.
export const modeleFrezare = [
  { src: "/fabrica/frezare-rama-clasica-trei-nuante.jpg", nume: "Ramă clasică, în trei nuanțe", alt: "Trei fronturi MDF cu ramă clasică frezată, vopsite taupe, crem și alb" },
  { src: "/fabrica/frezare-medalion-oval.jpg", nume: "Medalion oval", alt: "Fronturi MDF cu medalion oval frezat, unul cu contur auriu" },
  { src: "/fabrica/frezare-model-geometric.jpg", nume: "Model geometric", alt: "Două fronturi MDF cu modele geometrice frezate, vopsite galben și crem" },
  { src: "/fabrica/frezare-rama-in-trepte-verde-menta.jpg", nume: "Ramă în trepte, verde mentă", alt: "Front MDF verde mentă cu ramă frezată în trepte" },
  { src: "/fabrica/frezare-maner-in-front.jpg", nume: "Mâner frezat în front", alt: "Fronturi cu mâner frezat direct în muchie, unul verde petrol" },
  { src: "/fabrica/frezare-panou-decupat.jpg", nume: "Panou decupat", alt: "Panou MDF decupat cu model de linii, vopsit crem" },
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
