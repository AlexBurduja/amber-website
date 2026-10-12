import { categorii, proiectePublicate } from "@/data/proiecte";

export function categorie(slug) {
  return categorii.find((c) => c.slug === slug);
}

export function categorieDupaPagina(pagina) {
  return categorii.find((c) => c.pagina === pagina);
}

// Proiectele care apar pe pagina unei categorii: ale ei, plus cele care o au ca secundară.
export function proiectePentruCategorie(slug) {
  const proprii = proiectePublicate.filter((p) => p.categorie === slug);
  const secundare = proiectePublicate.filter((p) => p.categoriiSecundare?.includes(slug));
  return { proprii, secundare };
}

// Aceeași regulă peste tot (homepage, /mobila-la-comanda, /proiecte, paginile de categorie):
// proiectele categoriei, plus cele care o au ca secundară.
export function inCategorie(proiect, slug) {
  return proiect.categorie === slug || Boolean(proiect.categoriiSecundare?.includes(slug));
}

export function numarProiecte(slug) {
  return proiectePublicate.filter((p) => inCategorie(p, slug)).length;
}

export function proiectDupaSlug(slug) {
  return proiectePublicate.find((p) => p.slug === slug);
}

export function imagineDupaNumar(slug, numar) {
  const p = proiectDupaSlug(slug);
  return p?.imagini.find((i) => i.src.endsWith(`-${String(numar).padStart(2, "0")}.jpg`));
}

export function imaginiReale(proiect) {
  return proiect.imagini.filter((i) => i.tip === "foto_reala");
}

export function randari(proiect) {
  return proiect.imagini.filter((i) => i.tip === "randare");
}

export function perechi(proiect) {
  return randari(proiect)
    .filter((r) => r.pereche)
    .map((r) => ({ randare: r, realizat: proiect.imagini.find((i) => i.src === r.pereche) }))
    .filter((p) => p.realizat);
}

export function grupeaza(proiecte) {
  const grupuri = new Map();
  for (const p of proiecte) {
    const cheie = p.grup ?? "";
    if (!grupuri.has(cheie)) grupuri.set(cheie, []);
    grupuri.get(cheie).push(p);
  }
  return [...grupuri.entries()].map(([nume, lista]) => ({ nume, proiecte: lista }));
}
