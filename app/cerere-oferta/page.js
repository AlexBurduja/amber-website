import Breadcrumb from "@/components/Breadcrumb";
import Todo from "@/components/Todo";
import FormularOferta from "./FormularOferta";
import { tipuriMobila } from "@/lib/cerere";
import { contact, linkTelefon, linkWhatsapp } from "@/lib/site";
import styles from "./page.module.css";
import { og } from "@/lib/metadata";

export const metadata = {
  title: "Cere ofertă pentru mobilă la comandă",
  description:
    "Trimite o cerere de ofertă pentru mobilă la comandă: nume, telefon și ce mobilă îți trebuie. Poți adăuga dimensiuni și poze ale spațiului.",
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
            Spune-ne ce mobilă îți trebuie. Ne ajung numele, telefonul și tipul de mobilă. Dacă ai
            dimensiunile spațiului sau câteva poze, adaugă-le: ne ajută să înțelegem de la început
            ce ai în minte.
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
                  <h3>Primim cererea</h3>
                  <p>Datele tale, dimensiunile și pozele ajung direct la noi.</p>
                </div>
              </li>
              <li>
                <span className={styles.numar} aria-hidden="true">
                  2
                </span>
                <div>
                  <h3>Te sunăm și venim să măsurăm</h3>
                  <p>Vorbim despre ce îți trebuie, apoi facem măsurătorile la fața locului.</p>
                </div>
              </li>
              <li>
                <span className={styles.numar} aria-hidden="true">
                  3
                </span>
                <div>
                  <h3>Primești proiectul 3D și oferta</h3>
                  <p>
                    Randări, schițe și ofertă, înainte de orice angajament. Producția începe doar după
                    ce le validezi.
                  </p>
                </div>
              </li>
            </ol>
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
