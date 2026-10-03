import Link from "next/link";
import styles from "./ToataTara.module.css";

// Transportul nu e confirmat: secțiunea nu promite livrare sau montaj în afara Bucureștiului.
// TODO: de completat de Alex când condițiile pentru proiectele din afara Bucureștiului sunt stabilite.
export default function ToataTara({ nivelTitlu = 2 }) {
  const Titlu = `h${nivelTitlu}`;
  return (
    <section className={styles.sectiune} aria-labelledby="toata-tara-titlu">
      <div className={`container ${styles.continut}`}>
        <span className={styles.sertar} aria-hidden="true" />
        <Titlu id="toata-tara-titlu">Fabrica e în București. Lucrăm în toată țara.</Titlu>
        <div className={styles.text}>
          <p>
            Fabrica noastră e pe Șos. Andronache, iar showroom-ul, deschis publicului, pe Șos.
            Colentina. Dacă ești din alt oraș, cererea pornește la fel: ne spui ce mobilă îți trebuie
            și, dacă le ai, ne trimiți dimensiunile și câteva poze ale spațiului.
          </p>
          <p>
            Pentru proiectele din afara Bucureștiului stabilim împreună cum se fac măsurătorile și
            montajul.{" "}
            <Link href="/cerere-oferta" className="link">
              Trimite o cerere de ofertă
            </Link>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
