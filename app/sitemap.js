import { categorii, proiectePublicate } from "@/data/proiecte";
import { site } from "@/lib/site";

export default function sitemap() {
  const pagini = [
    { url: "/", priority: 1 },
    { url: "/mobila-la-comanda", priority: 0.9 },
    ...categorii.map((c) => ({ url: c.pagina, priority: 0.9 })),
    { url: "/proiecte", priority: 0.8 },
    { url: "/cerere-oferta", priority: 0.7 },
    { url: "/contact", priority: 0.6 },
    { url: "/despre", priority: 0.5 },
    { url: "/politica-de-confidentialitate", priority: 0.2 },
    { url: "/cookies", priority: 0.2 },
  ];

  return [
    ...pagini.map((p) => ({ url: `${site.url}${p.url}`, priority: p.priority })),
    ...proiectePublicate.map((p) => ({
      url: `${site.url}/proiecte/${p.slug}`,
      priority: 0.6,
      images: p.imagini.slice(0, 3).map((i) => `${site.url}${i.src}`),
    })),
  ];
}
