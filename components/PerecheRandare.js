import Link from "next/link";
import Image from "next/image";
import Eticheta3D from "./Eticheta3D";
import Comparator from "./Comparator";
import styles from "./PerecheRandare.module.css";

// Randarea alături de poza reală a aceluiași spațiu. Comutatorul folosește butoane radio
// native, deci merge fără JavaScript și se folosește de la tastatură.
export default function PerecheRandare({ id, titlu, text, perechi, arataLinkProiect = true, nivelTitlu = 2 }) {
  if (!perechi.length) return null;
  const Titlu = `h${nivelTitlu}`;
  const nume = `pereche-${id}`;

  return (
    <section className={styles.sectiune} aria-labelledby={`${nume}-titlu`}>
      <div className="container">
        <Titlu id={`${nume}-titlu`} className={styles.titlu}>
          {titlu}
        </Titlu>
        {text ? <p className={`text-lung ${styles.intro}`}>{text}</p> : null}

        {perechi.length > 1 ? (
          <fieldset className={styles.comutator}>
            <legend className="ascuns-vizual">Alege proiectul</legend>
            {perechi.map((p, i) => (
              <label key={p.randare.src} className={styles.optiune}>
                <input
                  type="radio"
                  name={nume}
                  value={i}
                  defaultChecked={i === 0}
                  className={styles.radio}
                />
                <span>{p.eticheta ?? p.proiect?.titlu}</span>
              </label>
            ))}
          </fieldset>
        ) : null}

        <div className={styles.scena}>
          {perechi.map((p, i) => (
            <div key={p.randare.src} className={styles.pereche} data-pereche={i}>
              {p.randare.comparator ? (
                <figure className={styles.figuraComparator}>
                  <Comparator
                    randare={p.randare}
                    realizat={p.realizat}
                    sizes="(min-width: 1024px) 900px, 100vw"
                  />
                  <figcaption className={styles.legenda}>
                    Trage sertarul galben: în stânga e randarea, în dreapta mobila realizată.
                  </figcaption>
                </figure>
              ) : (
              <div className={styles.imagini}>
                <figure className={styles.figura}>
                  <div className={styles.media}>
                    <Image
                      src={p.randare.src}
                      alt={p.randare.alt}
                      fill
                      sizes="(min-width: 1024px) 620px, (min-width: 640px) 50vw, 100vw"
                      className={styles.img}
                    />
                    <Eticheta3D />
                  </div>
                  <figcaption className={styles.legenda}>Randarea</figcaption>
                </figure>
                <figure className={styles.figura}>
                  <div className={styles.media}>
                    <Image
                      src={p.realizat.src}
                      alt={p.realizat.alt}
                      fill
                      sizes="(min-width: 1024px) 620px, (min-width: 640px) 50vw, 100vw"
                      className={styles.img}
                    />
                  </div>
                  <figcaption className={styles.legenda}>Mobila realizată</figcaption>
                </figure>
              </div>
              )}
              {arataLinkProiect && p.proiect ? (
                <p className={styles.proiect}>
                  {p.proiect.titlu}.{" "}
                  <Link href={`/proiecte/${p.proiect.slug}`} className="link">
                    Vezi proiectul
                  </Link>
                </p>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
