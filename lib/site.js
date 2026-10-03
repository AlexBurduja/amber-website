// Date generale despre firmă. Câmpurile cu null nu apar pe site până nu sunt completate.

export const site = {
  url: "https://ambermob.ro",
  nume: "Amber",
  numeComplet: "Amber Creativity",
  numeLegal: "Amber Creativity SRL",
  oras: "București",
};

// Date confirmate de Alex. Câmpurile cu null rămân TODO și nu apar pe site până nu sunt completate.
export const contact = {
  telefon: "+40 773 371 044", // vânzări
  whatsapp: null, // TODO: număr în format internațional, fără spații, ex. "407xxxxxxxx"
  email: "vanzari@ambermob.ro",
  // Showroom-ul e deschis publicului.
  adresaShowroom: { strada: "Șos. Colentina 447-449", localitate: "București", codPostal: null },
  adresaFabrica: { strada: "Șos. Andronache nr. 183", sector: "Sector 2", localitate: "București", codPostal: null },
  program: null, // TODO: ex. [{ zile: "Luni - Vineri", ore: "09:00 - 18:00" }], exact ca în Google Business
  googleBusiness: null, // TODO
  cui: null, // TODO
  social: {
    tiktok: null, // TODO
    instagram: null, // TODO
    facebook: null, // TODO
  },
};

export function adresaText(a) {
  return [a.strada, a.sector, a.localitate].filter(Boolean).join(", ");
}

// Formulări confirmate de Alex. Experiența e a echipei, nu vechimea firmei: fără an de înființare.
export const experienta = "peste 12 ani de experiență în producția de mobilier";

export function linkTelefon(telefon) {
  return `tel:${telefon.replace(/[^\d+]/g, "")}`;
}

export function linkWhatsapp(numar) {
  return `https://wa.me/${numar}`;
}

export const navigatie = [
  { href: "/proiecte", eticheta: "Proiecte" },
  { href: "/despre", eticheta: "Despre" },
  { href: "/contact", eticheta: "Contact" },
];
