import { categorii, paginiProduse, proiectePublicate } from "@/data/proiecte";
import { ghiduri } from "@/data/ghiduri";
import { adresaPagina, site } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap() {
  const pagini = [
    { url: "/", priority: 1 },
    { url: "/mobila-la-comanda", priority: 0.9 },
    ...categorii.map((c) => ({ url: c.pagina, priority: 0.9 })),
    ...paginiProduse.map((c) => ({ url: c.pagina, priority: 0.8 })),
    { url: "/proiecte", priority: 0.8 },
    { url: "/ghiduri", priority: 0.7 },
    ...ghiduri.map((g) => ({ url: `/ghiduri/${g.slug}`, priority: 0.6 })),
    { url: "/cerere-oferta", priority: 0.7 },
    { url: "/contact", priority: 0.6 },
    { url: "/despre", priority: 0.5 },
    { url: "/politica-de-confidentialitate", priority: 0.2 },
    { url: "/cookies", priority: 0.2 },
  ];

  return [
    ...pagini.map((p) => ({ url: adresaPagina(p.url), priority: p.priority })),
    ...proiectePublicate.map((p) => ({
      url: adresaPagina(`/proiecte/${p.slug}`),
      priority: 0.6,
      images: p.imagini.slice(0, 3).map((i) => `${site.url}${i.src}`),
    })),
  ];
}
