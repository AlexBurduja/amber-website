import Link from "next/link";
import Image from "@/components/Imagine";
import Breadcrumb from "@/components/Breadcrumb";
import BandaOferta from "@/components/BandaOferta";
import { ghiduri } from "@/data/ghiduri";
import { imagineDupaNumar } from "@/lib/proiecte";
import { og } from "@/lib/metadata";
import styles from "./page.module.css";

export const metadata = {
  title: "Ghiduri despre mobila la comandă",
  description:
    "Ghiduri practice despre mobila la comandă: cum măsori pentru o ofertă, ce material alegi, ce influențează prețul unei bucătării și cum planifici un dressing.",
  alternates: { canonical: "/ghiduri" },
  openGraph: og("/ghiduri"),
};

export default function Ghiduri() {
  return (
    <>
      <section className={`container ${styles.antet}`}>
        <Breadcrumb pasi={[{ nume: "Ghiduri", href: "/ghiduri" }]} />
        <h1 className={styles.titlu}>Ghiduri despre mobila la comandă</h1>
        <span className={styles.sertar} aria-hidden="true" />
        <p className={`text-lung ${styles.intro}`}>
          Texte practice, scrise de echipa din fabrică: cum iei dimensiunile, ce material alegi, ce
          influențează prețul și cum planifici o încăpere. Ele te ajută să ceri o{" "}
          <Link href="/cerere-oferta" className="link">
            ofertă
          </Link>{" "}
          cu date potrivite.
        </p>
      </section>

      <section className={`container ${styles.lista}`} aria-labelledby="lista-titlu">
        <h2 id="lista-titlu" className="ascuns-vizual">
          Toate ghidurile
        </h2>
        <ul className={styles.grila}>
          {ghiduri.map((g) => {
            const img = imagineDupaNumar(...g.imagine);
            return (
              <li key={g.slug}>
                <article className={styles.card}>
                  <Link href={`/ghiduri/${g.slug}`} className={styles.link}>
                    <div className={styles.media}>
                      <Image
                        src={img.src}
                        alt=""
                        fill
                        sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
                        className={styles.img}
                      />
                    </div>
                    <p className={`eticheta ${styles.eticheta}`}>Ghid</p>
                    <h3 className={styles.cardTitlu}>{g.titlu}</h3>
                    <p className={styles.cardText}>{g.descriere}</p>
                  </Link>
                </article>
              </li>
            );
          })}
        </ul>
      </section>

      <BandaOferta />
    </>
  );
}
