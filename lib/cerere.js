// Reguli comune pentru formularul de cerere de ofertă (folosite pe server și în client).

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

export const limitePoze = {
  numar: 5,
  mbPerPoza: 5,
  tipuri: ["image/jpeg", "image/png", "image/webp", "image/heic", "image/heif"],
};

export function telefonValid(telefon) {
  const cifre = telefon.replace(/[\s().-]/g, "");
  // Mobil sau fix românesc (07…, 02…, 03…), cu sau fără +40 / 0040.
  return /^(\+40|0040|0)[237]\d{8}$/.test(cifre);
}
