// Regulile formularului de cerere de ofertă, verificate în browser.
// Scriptul de pe server, public/api/cerere.php, le repetă în PHP: ține-le la fel.

export const tipuriMobila = [
  "Bucătărie",
  "Dressing",
  "Dormitor",
  "Living",
  "Hol",
  "Baie",
  "Comercial",
  "Altceva",
];

export const domenii = [
  { valoare: "o-camera", eticheta: "O cameră" },
  { valoare: "mai-multe", eticheta: "Mai multe camere" },
  { valoare: "toata-locuinta", eticheta: "Toată locuința" },
];

export function domeniuValid(v) {
  return domenii.some((d) => d.valoare === v) ? v : "o-camera";
}

// Formele de bucătărie. Pereții sunt notați A, B, C, la fel ca în schițele din formular.
export const formeBucatarie = [
  { valoare: "liniara", eticheta: "Liniară", inText: "liniară", pereti: ["a"] },
  { valoare: "l", eticheta: "În L", inText: "în L", pereti: ["a", "b"] },
  { valoare: "u", eticheta: "În U", inText: "în U", pereti: ["a", "b", "c"] },
  { valoare: "insula", eticheta: "Cu insulă", inText: "cu insulă", pereti: ["a", "b"], insula: true },
];

export const tipuriCuPereti = ["Dormitor", "Living", "Hol", "Baie"];

// Planul se cere pentru mai multe camere, toată locuința sau un spațiu comercial.
export function cerePlan(domeniu, tip) {
  return domeniu !== "o-camera" || tip === "Comercial";
}

const lungime = { min: 20, max: 2000, exemplu: "320" };
const inaltime = { min: 100, max: 600, exemplu: "260" };

// Etichetele din formular sunt scurte (câte două câmpuri pe rând, pe mobil);
// `complet` e varianta lungă, folosită în email.
const campInaltime = { nume: "inaltime", eticheta: "Înălțime", complet: "Înălțimea până la tavan", ...inaltime };

// Câmpurile de dimensiuni (în cm) pentru o cameră, după tipul de mobilă și forma aleasă.
// nume = numele câmpului din formular (fără prefixul „dim_”).
export function campuriDimensiuni({ domeniu, tip, forma, nrPereti }) {
  if (domeniu !== "o-camera") return [];
  if (tip === "Bucătărie") {
    const f = formeBucatarie.find((x) => x.valoare === forma) ?? formeBucatarie[0];
    const campuri = f.pereti.map((p) => ({
      nume: `perete_${p}`,
      eticheta: `Peretele ${p.toUpperCase()}`,
      ...lungime,
    }));
    if (f.insula) {
      campuri.push(
        { nume: "insula_lungime", eticheta: "Insula: lungime", complet: "Lungimea insulei", ...lungime, exemplu: "180" },
        { nume: "insula_latime", eticheta: "Insula: lățime", complet: "Lățimea insulei", min: 40, max: 400, exemplu: "90" },
      );
    }
    campuri.push(campInaltime);
    return campuri;
  }
  if (tip === "Dressing") {
    return [
      { nume: "latime", eticheta: "Lățime", complet: "Lățimea disponibilă", ...lungime, exemplu: "240" },
      campInaltime,
      { nume: "adancime", eticheta: "Adâncime", complet: "Adâncimea disponibilă", min: 20, max: 400, exemplu: "60" },
    ];
  }
  if (tipuriCuPereti.includes(tip)) {
    const n = Math.min(3, Math.max(1, Number(nrPereti) || 1));
    return [
      ...Array.from({ length: n }, (_, i) => ({
        nume: `perete_${i + 1}`,
        eticheta: n === 1 ? "Lungime" : `Peretele ${i + 1}`,
        complet: n === 1 ? "Lungimea peretelui" : undefined,
        ...lungime,
      })),
      campInaltime,
    ];
  }
  return [];
}

// Intervale orientative pentru tot proiectul, în lei, cu TVA. De verificat de Alex (DECIZII.md).
export const bugete = [
  "Sub 10.000 lei",
  "10.000 – 20.000 lei",
  "20.000 – 35.000 lei",
  "35.000 – 60.000 lei",
  "60.000 – 100.000 lei",
  "Peste 100.000 lei",
  "Nu știu încă",
];

// Atașamentele împreună au cel mult 4 MB. Aceleași limite sunt verificate și în public/api/cerere.php;
// dacă le schimbi aici, schimbă-le și acolo (și în public/api/.user.ini).
// Pozele se micșorează în browser înainte de trimitere (latura mare 1600 px, JPEG), iar planurile
// trimise ca imagine la 2400 px, ca textul de pe ele să rămână lizibil. PDF-ul nu se poate micșora.
export const limiteFisiere = {
  poze: 5,
  mbTotal: 4,
  mbPdf: 2,
  pxPoza: 1600,
  pxPlan: 2400,
  tipuriImagine: ["image/jpeg", "image/png", "image/webp", "image/heic", "image/heif"],
};

export const MB = 1024 * 1024;

export function formateazaMarime(octeti) {
  if (octeti < MB) return `${Math.max(1, Math.round(octeti / 1024))} KB`;
  return `${(octeti / MB).toFixed(1).replace(".", ",")} MB`;
}

export function telefonValid(telefon) {
  const cifre = telefon.replace(/[\s().-]/g, "");
  // Mobil sau fix românesc (07…, 02…, 03…), cu sau fără +40 / 0040.
  return /^(\+40|0040|0)[237]\d{8}$/.test(cifre);
}

export const mesajTelefon = "Numărul nu pare corect. Folosește formatul 07xx xxx xxx sau +40 7xx xxx xxx.";

// Validarea câmpurilor obligatorii, aceeași în browser (înainte de trimitere) și pe server.
export function valideazaDeBaza({ nume, telefon, mobila, acord }) {
  const erori = {};
  if (!nume || nume.trim().length < 2) erori.nume = "Scrie-ne numele tău.";
  if (!telefon?.trim()) erori.telefon = "Scrie-ne un număr de telefon la care te putem suna.";
  else if (!telefonValid(telefon)) erori.telefon = mesajTelefon;
  if (!mobila?.length) erori.mobila = "Alege tipul de mobilă.";
  if (!acord) erori.acord = "Avem nevoie de acordul tău ca să folosim datele pentru ofertă.";
  return erori;
}

// Dimensiunile: opționale, dar dacă sunt scrise trebuie să fie numere plauzibile, în cm.
export function valideazaDimensiune(text, camp) {
  const t = String(text ?? "").trim().replace(",", ".");
  if (!t) return { valoare: null };
  if (!/^\d+(\.\d+)?$/.test(t)) return { eroare: "Scrie doar cifre, în centimetri." };
  const v = Math.round(Number(t));
  if (v < camp.min || v > camp.max) {
    return { eroare: `Valoarea pare neobișnuită (${camp.min}–${camp.max} cm). Verifică dacă e în centimetri.` };
  }
  return { valoare: v };
}
