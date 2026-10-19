import { faraLinkuri } from "@/lib/text";
import { adresaPagina, site, contact } from "@/lib/site";

function adresa(a) {
  if (!a) return undefined;
  const date = {
    "@type": "PostalAddress",
    streetAddress: a.strada,
    addressLocality: a.localitate,
    addressRegion: "București",
    addressCountry: "RO",
  };
  if (a.codPostal) date.postalCode = a.codPostal;
  return date;
}

// Două entități legate între ele:
// - organizația, ca producător de mobilier cu fabrică proprie (adresa fabricii);
// - showroom-ul, ca FurnitureStore deschis publicului (adresa showroom-ului).
// Câmpurile necompletate în lib/site.js nu apar. Fără recenzii și fără prețuri.
export function schemaFirma() {
  const profile = [contact.googleBusiness, ...Object.values(contact.social)].filter(Boolean);

  const firma = {
    "@type": "Organization",
    "@id": `${site.url}/#firma`,
    name: site.numeComplet,
    legalName: site.numeLegal,
    url: site.url,
    logo: `${site.url}/brand/amber-logo-color.svg`,
    image: `${site.url}/opengraph-image.png`,
    description:
      "Producător de mobilier la comandă, cu fabrică proprie în București: proiectare 3D, debitare și cantuire, vopsitorie, frezare CNC, structuri metalice, printare, tapițerie, montaj și service cu echipă proprie.",
    knowsAbout: [
      "mobilă la comandă",
      "producție de mobilier",
      "vopsitorie MDF",
      "frezare CNC",
      "structuri metalice",
      "tapițerie",
    ],
    areaServed: { "@type": "Country", name: "România" },
    address: adresa(contact.adresaFabrica),
    location: [
      {
        "@type": "Place",
        name: "Fabrica Amber Creativity",
        address: adresa(contact.adresaFabrica),
      },
    ],
  };

  const showroom = {
    "@type": "FurnitureStore",
    "@id": `${site.url}/#showroom`,
    name: `${site.numeComplet}, showroom`,
    url: site.url,
    image: `${site.url}/opengraph-image.png`,
    description:
      "Showroom de mobilier la comandă, deschis publicului, pentru consultanță în detaliu despre proiect, materiale și finisaje. Mobila e produsă în fabrica proprie Amber Creativity.",
    address: adresa(contact.adresaShowroom),
    parentOrganization: { "@id": `${site.url}/#firma` },
    areaServed: { "@type": "Country", name: "România" },
  };

  // Serviciul, cu procesul real: ofertă estimativă din datele clientului, măsurători exacte doar după
  // contract, proiect 3D și preț final pe baza măsurătorilor. Fără prețuri, fără garanție, fără transport.
  const serviciu = {
    "@type": "Service",
    "@id": `${site.url}/#serviciu`,
    name: "Mobilă la comandă",
    serviceType: "Proiectare, producție și montaj de mobilier la comandă",
    provider: { "@id": `${site.url}/#firma` },
    areaServed: { "@type": "Country", name: "România" },
    url: adresaPagina("/mobila-la-comanda"),
    description:
      "Oferta inițială e estimativă, pe baza dimensiunilor aproximative, a pozelor și, pentru proiecte mari, a planului trimise de client. După semnarea contractului se fac măsurătorile exacte; proiectul 3D și prețul final se confirmă pe baza lor. Producția se face în fabrica proprie, iar montajul și service-ul cu echipa proprie.",
    availableChannel: [
      {
        "@type": "ServiceChannel",
        name: "Cerere de ofertă online",
        serviceUrl: adresaPagina("/cerere-oferta"),
      },
      {
        "@type": "ServiceChannel",
        name: "Consultanță în showroom",
        serviceLocation: { "@id": `${site.url}/#showroom` },
      },
    ],
  };

  for (const entitate of [firma, showroom]) {
    if (contact.telefon) entitate.telephone = contact.telefon;
    if (contact.email) entitate.email = contact.email;
    if (profile.length) entitate.sameAs = profile;
  }
  // TODO: openingHoursSpecification pe showroom, după ce programul e completat în lib/site.js.

  return {
    "@context": "https://schema.org",
    "@graph": [firma, showroom, serviciu],
  };
}

export function schemaBreadcrumb(pasi) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: pasi.map((pas, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: pas.nume,
      item: adresaPagina(pas.href),
    })),
  };
}

// Întrebări frecvente: răspunsurile pot fi un șir sau o listă de paragrafe, fără linkuri markdown.
export function schemaFaq(intrebari) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: intrebari.map((q) => ({
      "@type": "Question",
      name: q.intrebare,
      acceptedAnswer: {
        "@type": "Answer",
        text: (Array.isArray(q.raspuns) ? q.raspuns : [q.raspuns]).map(faraLinkuri).join(" "),
      },
    })),
  };
}

// Pagină de categorie: lista proiectelor afișate, fără prețuri și fără recenzii.
export function schemaColectie({ nume, descriere, pagina, proiecte }) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: nume,
    description: descriere,
    url: adresaPagina(pagina),
    isPartOf: { "@id": `${site.url}/#firma` },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: proiecte.length,
      itemListElement: proiecte.map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: adresaPagina(`/proiecte/${p.slug}`),
        name: p.titlu,
      })),
    },
  };
}

// Articol de ghid. Autorul și editorul sunt firma; data e a publicării (și a ultimei revizuiri, dacă diferă).
export function schemaArticol({ titlu, descriere, pagina, imagine, publicat, actualizat, cuvinte }) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: titlu,
    description: descriere,
    inLanguage: "ro",
    mainEntityOfPage: adresaPagina(pagina),
    image: imagine ? [`${site.url}${imagine}`] : undefined,
    datePublished: publicat,
    dateModified: actualizat ?? publicat,
    wordCount: cuvinte,
    author: { "@type": "Organization", "@id": `${site.url}/#firma`, name: site.numeComplet },
    publisher: {
      "@type": "Organization",
      "@id": `${site.url}/#firma`,
      name: site.numeComplet,
      logo: { "@type": "ImageObject", url: `${site.url}/brand/amber-logo-color.svg` },
    },
  };
}
