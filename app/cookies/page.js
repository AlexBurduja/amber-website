import Link from "next/link";
import PaginaText from "@/components/PaginaText";
import Todo from "@/components/Todo";

export const metadata = {
  title: "Cookie-uri",
  description: "Ce cookie-uri folosește site-ul ambermob.ro.",
  alternates: { canonical: "/cookies" },
};

// TODO: de actualizat dacă se adaugă analiză cu cookie-uri (ex. Google Analytics) sau pixeli de social media.
// În acel caz e nevoie și de un banner de consimțământ înainte de încărcarea lor.
export default function Cookies() {
  return (
    <PaginaText titlu="Cookie-uri" href="/cookies">
      <Todo ca="p">text de verificat de un jurist înainte de lansare</Todo>
      <p>
        Site-ul nu folosește cookie-uri de analiză a traficului sau de publicitate și nu urmărește
        vizitatorii de la un site la altul.
      </p>
      <p>
        Folosim Umami pentru statistici anonime de vizitare. Umami nu folosește cookie-uri și nu
        colectează date personale.
      </p>

      <h2>Harta de pe pagina de contact</h2>
      <p>
        Harta Google de pe <Link href="/contact">pagina de contact</Link> se încarcă doar dacă apeși
        „Arată harta”. Din acel moment, Google poate seta propriile cookie-uri, conform politicii sale
        de confidențialitate.
      </p>

      <h2>Cum controlezi cookie-urile</h2>
      <p>
        Poți șterge sau bloca cookie-urile din setările browserului tău. Site-ul funcționează și fără
        ele.
      </p>
    </PaginaText>
  );
}
