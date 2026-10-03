import { culori } from "@/data/paleta";

// Familiile de culoare din filtrul de pe /proiecte. Mostra e doar orientativă.
export const familiiCuloare = [
  { slug: "verde", nume: "Verde", mostra: "#6E8B6A" },
  { slug: "alb", nume: "Alb", mostra: "#FFFFFF" },
  { slug: "bej", nume: "Bej și crem", mostra: "#D8C7B0" },
  { slug: "gri", nume: "Gri", mostra: "#8C8C8A" },
  { slug: "negru", nume: "Negru", mostra: "#1C1C1C" },
  { slug: "lemn", nume: "Lemn", mostra: "#B7864F" },
  { slug: "albastru", nume: "Albastru", mostra: "#3F6E8C" },
  { slug: "vii", nume: "Culori vii", mostra: "#E8A23A" },
];

export function areCuloarea(slug, familie) {
  return culori[slug]?.includes(familie) ?? false;
}
