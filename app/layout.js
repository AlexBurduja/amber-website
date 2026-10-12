import { Montserrat, DM_Sans } from "next/font/google";
import Antet from "@/components/Antet";
import Subsol from "@/components/Subsol";
import JsonLd from "@/components/JsonLd";
import CtaMobil from "@/components/CtaMobil";
import { contact, gazdeIndexabile, site } from "@/lib/site";
import { schemaFirma } from "@/lib/schema";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-titluri",
  subsets: ["latin", "latin-ext"],
  weight: ["500", "600"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-text",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Mobilă la comandă în București și în toată țara | Amber",
    template: "%s | Amber",
  },
  description:
    "Producător de mobilier la comandă, cu fabrică proprie în București: bucătării, dressinguri, dormitoare, living, hol și baie. Lucrăm în toată țara.",
  applicationName: site.numeComplet,
  openGraph: {
    type: "website",
    locale: "ro_RO",
    siteName: site.numeComplet,
  },
  formatDetection: { telephone: false },
};

export const viewport = {
  themeColor: "#FAF8F4",
};

// Pe alte gazde decât ambermob.ro adaugă și eticheta meta robots (antetul X-Robots-Tag din proxy.js
// e mecanismul principal). Apoi marchează prima încărcare din sesiune, pentru sertarul din logo.
const scriptLogo = `try{if(${JSON.stringify(gazdeIndexabile)}.indexOf(location.hostname)<0){var m=document.createElement("meta");m.name="robots";m.content="noindex, nofollow";document.head.appendChild(m)}}catch(e){}try{if(!sessionStorage.getItem("amber-logo")){document.documentElement.classList.add("logo-prima");sessionStorage.setItem("amber-logo","1")}}catch(e){}`;

export default function RootLayout({ children }) {
  return (
    <html lang="ro" className={`${montserrat.variable} ${dmSans.variable}`} suppressHydrationWarning>
      <body>
        {/* Rulează înainte de prima afișare: noindex pe alte gazde decât ambermob.ro și marcajul
            primei încărcări din sesiune, ca sertarul din logo să iasă o singură dată. */}
        <script dangerouslySetInnerHTML={{ __html: scriptLogo }} />
        <a href="#continut" className="sari-la-continut">
          Sari la conținut
        </a>
        <Antet />
        <main id="continut" className="principal">
          <div id="prag-cta" aria-hidden="true" />
          {children}
        </main>
        <Subsol />
        <CtaMobil telefon={contact.telefon} />
        <JsonLd date={schemaFirma()} />
      </body>
    </html>
  );
}
