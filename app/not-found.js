import Link from "next/link";
import Buton from "@/components/Buton";
import { categorii } from "@/data/proiecte";
import styles from "./not-found.module.css";

export const metadata = {
  title: "Pagina nu există",
  robots: { index: false },
};

export default function NuExista() {
  return (
    <section className={`container ${styles.pagina}`}>
      <span className={styles.sertar} aria-hidden="true" />
      <h1>Pagina nu există</h1>
      <p className={styles.text}>
        Adresa e greșită sau pagina a fost mutată. De aici poți ajunge la proiecte sau la mobila care
        te interesează.
      </p>
      <div className={styles.actiuni}>
        <Buton href="/proiecte">Vezi proiectele</Buton>
        <Link href="/" className="link">
          Pagina principală
        </Link>
      </div>
      <ul className={styles.categorii}>
        {categorii.map((c) => (
          <li key={c.slug}>
            <Link href={c.pagina} className="link">
              {c.nume}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
