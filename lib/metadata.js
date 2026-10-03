import { site } from "@/lib/site";

// Când o pagină își setează propriul `openGraph`, Next nu mai moștenește câmpurile din layout,
// așa că le repetăm aici, inclusiv imaginea de share generală (app/opengraph-image.png).
export function og(url, extra = {}) {
  return {
    type: "website",
    locale: "ro_RO",
    siteName: site.numeComplet,
    url,
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Logo Amber, mobilă la comandă",
      },
    ],
    ...extra,
  };
}
