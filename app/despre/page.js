import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import Todo from "@/components/Todo";
import Fabrica from "@/components/Fabrica";
import BandaOferta from "@/components/BandaOferta";
import { categorii } from "@/data/proiecte";
import { adresaText, contact, site } from "@/lib/site";
import { og } from "@/lib/metadata";
import styles from "./page.module.css";

export const metadata = {
  title: "Despre Amber Creativity, producător de mobilă",
  description:
    "Amber Creativity e producător de mobilier la comandă, cu fabrică proprie în București și o echipă cu peste 12 ani de experiență în producția de mobilier.",
  alternates: { canonical: "/despre" },
  openGraph: og("/despre"),
};

// Experiența e a echipei, nu vechimea firmei: fără an de înființare (decizia lui Alex).
export default function Despre() {
  return (
    <>
      <section className={`container ${styles.antet}`}>
        <Breadcrumb pasi={[{ nume: "Despre", href: "/despre" }]} />
        <h1 className={styles.titlu}>Despre Amber</h1>
        <span className={styles.sertar} aria-hidden="true" />
        <p className={styles.lead}>
          {site.numeLegal} e producător de mobilier la comandă. Proiectăm, producem și montăm totul
          noi, în fabrica noastră din {site.oras}, fără subcontractori.
        </p>
      </section>

      <section className={`container ${styles.continut}`}>
        <div className={styles.bloc}>
          <h2>Echipa</h2>
          <p>
            Echipa noastră lucrează împreună de peste 12 ani, în aceeași fabrică, cu aceleași
            standarde.
          </p>
        </div>

        <div className={styles.bloc}>
          <h2>Ce facem</h2>
          <p>
            Bucătării, dressinguri, dormitoare, mobilier de living, de hol și de baie, plus mobilier
            pentru birouri, recepții și spații de vânzare. Fiecare piesă se face pe comandă, după
            dimensiunile reale ale spațiului.
          </p>
          <ul className={styles.categorii}>
            {categorii.map((c) => (
              <li key={c.slug}>
                <Link href={c.pagina} className="link">
                  {c.nume}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.bloc}>
          <h2>Cum lucrăm cu tine</h2>
          <p>
            Pornim de la dimensiunile și pozele pe care ni le trimiți și îți facem o ofertă estimativă.
            După semnarea contractului venim să măsurăm exact, iar pe baza măsurătorilor confirmăm
            proiectul 3D și prețul final. Mobila se produce la noi și o montează echipa noastră. Dacă
            vrei să discutăm în detaliu, te așteptăm în showroom.{" "}
            <Link href="/mobila-la-comanda" className="link">
              Pașii, pe larg
            </Link>
            .
          </p>
        </div>

        <div className={styles.bloc}>
          <h2>Fabrica și showroom-ul</h2>
          <dl className={styles.adrese}>
            {contact.adresaFabrica ? (
              <div>
                <dt>Fabrica</dt>
                <dd>{adresaText(contact.adresaFabrica)}</dd>
              </div>
            ) : null}
            {contact.adresaShowroom ? (
              <div>
                <dt>Showroom, deschis publicului</dt>
                <dd>{adresaText(contact.adresaShowroom)}</dd>
              </div>
            ) : null}
          </dl>
          <p className={styles.notaAdrese}>
            Telefonul și harta sunt pe{" "}
            <Link href="/contact" className="link">
              pagina de contact
            </Link>
            .
          </p>
        </div>

        <Todo ca="div" className={styles.bloc}>
          poze cu echipa și cu showroom-ul (sursa: „amber”)
        </Todo>
      </section>

      <Fabrica nivelTitlu={2} id="fabrica-despre" />

      <BandaOferta />
    </>
  );
}
