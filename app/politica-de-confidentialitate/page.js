import Link from "next/link";
import PaginaText from "@/components/PaginaText";
import Todo from "@/components/Todo";
import { contact, site } from "@/lib/site";

export const metadata = {
  title: "Politica de confidențialitate",
  description: "Cum folosește Amber Creativity SRL datele trimise prin formularul de cerere de ofertă.",
  alternates: { canonical: "/politica-de-confidentialitate" },
};

// TODO: de completat de Alex. Ciornă care descrie ce face efectiv site-ul (formularul de ofertă,
// fără cookie-uri de analiză sau publicitate). Trebuie verificată de un jurist înainte de lansare
// și completată cu CUI, adresă, email, furnizorul de email și durata de păstrare.
export default function PoliticaConfidentialitate() {
  return (
    <PaginaText titlu="Politica de confidențialitate" href="/politica-de-confidentialitate">
      <p>
        <Todo>text de verificat de un jurist înainte de lansare</Todo>
      </p>

      <h2>Cine prelucrează datele</h2>
      <p>
        Operatorul datelor este {site.numeLegal}
        {contact.cui ? `, CUI ${contact.cui}` : ""}, cu sediul în {site.oras}. <Todo>CUI și adresa sediului</Todo>
      </p>

      <h2>Ce date colectăm</h2>
      <p>Prin formularul de cerere de ofertă ne trimiți:</p>
      <ul>
        <li>numele și numărul de telefon;</li>
        <li>tipul de mobilă care te interesează;</li>
        <li>
          opțional: localitatea, dimensiunile aproximative ale spațiului, un buget orientativ, alte
          detalii, poze ale spațiului și planul locuinței.
        </li>
      </ul>
      <p>
        Pozele se micșorează în browserul tău înainte de trimitere; atunci se șterg și metadatele din
        ele (EXIF), inclusiv eventuala locație GPS. Planurile PDF se trimit așa cum sunt.
      </p>
      <p>Nu cerem și nu folosim alte date personale prin acest site.</p>

      <h2>De ce le folosim</h2>
      <p>
        Folosim datele doar ca să te contactăm în legătură cu cererea ta și ca să pregătim oferta.
        Temeiul este acordul tău, dat prin bifa din formular, și pașii făcuți la cererea ta înainte de
        încheierea unui contract.
      </p>

      <h2>Cui le transmitem</h2>
      <p>
        Cererea ajunge la noi pe email, printr-un furnizor de servicii de email care acționează în
        numele nostru. <Todo>numele furnizorului de email și al firmei de hosting</Todo> Nu vindem și
        nu închiriem datele tale.
      </p>

      <h2>Cât timp le păstrăm</h2>
      <p>
        <Todo>durata de păstrare a cererilor</Todo>
      </p>

      <h2>Drepturile tale</h2>
      <p>
        Poți cere oricând acces la datele tale, corectarea sau ștergerea lor, restricționarea
        prelucrării sau portarea lor și îți poți retrage acordul. Ne poți scrie
        {contact.email ? (
          <>
            {" "}la <a href={`mailto:${contact.email}`}>{contact.email}</a>
          </>
        ) : (
          <> <Todo>email de contact pentru date personale</Todo></>
        )}
        . Ai și dreptul să depui o plângere la Autoritatea Națională de Supraveghere a Prelucrării
        Datelor cu Caracter Personal (
        <a href="https://www.dataprotection.ro/" rel="noopener">
          dataprotection.ro
        </a>
        ).
      </p>

      <h2>Cookie-uri</h2>
      <p>
        Detalii pe pagina despre <Link href="/cookies">cookie-uri</Link>.
      </p>
    </PaginaText>
  );
}
