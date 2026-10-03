import Image from "next/image";
import Link from "next/link";
import { etape, modeleFrezare, pozeFabrica } from "@/data/fabrica";
import { experienta } from "@/lib/site";
import styles from "./Fabrica.module.css";

// „Totul se face în fabrica noastră”: pozele din fabrică, cele 8 etape interne și modelele de frezare.
export default function Fabrica({ nivelTitlu = 2, cuLink = false, id = "fabrica" }) {
  const Titlu = `h${nivelTitlu}`;
  const Subtitlu = `h${nivelTitlu + 1}`;
  return (
    <section className={`inchis ${styles.sectiune}`} aria-labelledby={`${id}-titlu`}>
      <div className="container">
        <div className={styles.antet}>
          <Titlu id={`${id}-titlu`} className={styles.titlu}>
            Totul se face în fabrica noastră
          </Titlu>
          <p className={styles.lead}>
            Suntem producători. Mobila se proiectează, se taie, se vopsește, se frezează și se
            tapițează în fabrica noastră din București, apoi o montează echipa noastră. Fără
            subcontractori, cu {experienta}.
          </p>
        </div>

        <ul className={styles.poze}>
          {pozeFabrica.map((p) => (
            <li key={p.src} className={styles.poza}>
              <div className={styles.media}>
                <Image src={p.src} alt={p.alt} fill sizes="(min-width: 768px) 400px, 80vw" className={styles.img} />
              </div>
              <p className={`eticheta ${styles.etichetaPoza}`}>{p.eticheta}</p>
            </li>
          ))}
        </ul>

        <ol className={styles.etape}>
          {etape.map((e, i) => (
            <li key={e.titlu} className={styles.etapa}>
              <span className={styles.numar} aria-hidden="true">
                {i + 1}
              </span>
              <Subtitlu className={styles.titluEtapa}>{e.titlu}</Subtitlu>
              <p>{e.text}</p>
            </li>
          ))}
        </ol>

        <div className={styles.frezare}>
          <div className={styles.frezareText}>
            <Subtitlu className={styles.titluFrezare}>Modele de frezare</Subtitlu>
            <p>
              Câteva dintre fronturile frezate și vopsite în fabrică. Frezăm și după un model
              existent sau după desenul tău.
            </p>
            {cuLink ? (
              <Link href="/despre" className={`link ${styles.linkDespre}`}>
                Despre fabrică și echipă
              </Link>
            ) : null}
          </div>
          <ul className={styles.modele}>
            {modeleFrezare.map((m) => (
              <li key={m.src}>
                <div className={styles.model}>
                  <Image src={m.src} alt={`Front MDF frezat: ${m.nume.toLowerCase()}`} fill sizes="150px" className={styles.img} />
                </div>
                <p className={styles.numeModel}>{m.nume}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
