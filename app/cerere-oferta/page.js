import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import Todo from "@/components/Todo";
import FormularOferta from "./FormularOferta";
import { tipuriMobila } from "@/lib/cerere";
import { adresaText, contact, linkTelefon, linkWhatsapp } from "@/lib/site";
import styles from "./page.module.css";
import { og } from "@/lib/metadata";

export const metadata = {
  title: "Cere ofertă pentru mobilă la comandă",
  description:
    "Cere o ofertă estimativă pentru mobilă la comandă: trimite dimensiunile aproximative, poze sau planul locuinței. Prețul final se confirmă după măsurători.",
  alternates: { canonical: "/cerere-oferta" },
  openGraph: og("/cerere-oferta"),
};

// /cerere-oferta?mobila=Bucătărie preselectează tipul de mobilă (de pe paginile de categorie).
export default async function CerereOferta({ searchParams }) {
  const { mobila } = await searchParams;
  const preselectate = [mobila].flat().filter((m) => tipuriMobila.includes(m));

  return (
    <section className={`container ${styles.pagina}`}>
      <Breadcrumb pasi={[{ nume: "Cere ofertă", href: "/cerere-oferta" }]} />
      <div className={styles.grila}>
        <div className={styles.text}>
          <h1>Cere ofertă</h1>
          <span className={styles.sertar} aria-hidden="true" />
          <p>
            Spune-ne ce vrei să mobilezi. Ne ajung numele, telefonul și tipul de mobilă. Cu cât ne
            trimiți mai multe date (dimensiuni aproximative, poze, planul locuinței), cu atât oferta
            estimativă e mai aproape de prețul final.
          </p>
        </div>
        <div className={styles.formular}>
          <FormularOferta mobilaPreselectata={preselectate} />
        </div>
        <div className={styles.dupa}>
          <div className={styles.urmeaza}>
            <h2 className={styles.titluUrmeaza}>Ce urmează după ce trimiți</h2>
            <ol className={styles.pasi}>
              <li>
                <span className={styles.numar} aria-hidden="true">
                  1
                </span>
                <div>
                  <h3>Primești o ofertă estimativă</h3>
                  <p>Pe baza datelor trimise. Dacă ne lipsește ceva, te sunăm înainte.</p>
                </div>
              </li>
              <li>
                <span className={styles.numar} aria-hidden="true">
                  2
                </span>
                <div>
                  <h3>Contract și măsurători exacte</h3>
                  <p>După semnarea contractului venim să măsurăm exact spațiul.</p>
                </div>
              </li>
              <li>
                <span className={styles.numar} aria-hidden="true">
                  3
                </span>
                <div>
                  <h3>Proiect 3D și preț final</h3>
                  <p>Le confirmăm pe baza măsurătorilor. Producția începe după ce validezi proiectul.</p>
                </div>
              </li>
            </ol>
          </div>
          <div className={styles.alternativ}>
            <h2 className={styles.titluAlternativ}>Vrei să discutăm în detaliu?</h2>
            <p>
              Te așteptăm în showroom
              {contact.adresaShowroom ? `, pe ${adresaText(contact.adresaShowroom)}` : null}. Acolo
              putem vorbi pe larg despre spațiu, materiale și finisaje.{" "}
              <Link href="/contact" className="link">
                Detalii de contact
              </Link>
            </p>
          </div>
          {contact.telefon || process.env.NODE_ENV !== "production" ? (
            <div className={styles.alternativ}>
              <h2 className={styles.titluAlternativ}>Preferi să vorbim direct?</h2>
              {contact.telefon ? (
                <p>
                  Sună-ne la{" "}
                  <a href={linkTelefon(contact.telefon)} className="link">
                    {contact.telefon}
                  </a>
                  {contact.whatsapp ? (
                    <>
                      {" "}
                      sau scrie-ne pe{" "}
                      <a href={linkWhatsapp(contact.whatsapp)} className="link">
                        WhatsApp
                      </a>
                    </>
                  ) : null}
                  .
                </p>
              ) : (
                <Todo>telefon și WhatsApp</Todo>
              )}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
