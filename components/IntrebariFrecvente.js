import { Plus } from "@phosphor-icons/react/dist/ssr";
import JsonLd from "./JsonLd";
import TextCuLinkuri from "./TextCuLinkuri";
import { schemaFaq } from "@/lib/schema";
import styles from "./IntrebariFrecvente.module.css";

// schema: adaugă și datele structurate FAQPage (pentru paginile de categorie).
export default function IntrebariFrecvente({ intrebari, titlu = "Întrebări frecvente", schema = false }) {
  if (!intrebari?.length) return null;
  return (
    <section className={styles.sectiune} aria-labelledby="intrebari-titlu">
      <div className={`container ${styles.grila}`}>
        <h2 id="intrebari-titlu">{titlu}</h2>
        <div className={styles.lista}>
          {intrebari.map((q) => (
            <details key={q.intrebare} className={styles.intrebare}>
              <summary>
                <span>{q.intrebare}</span>
                <Plus size={20} weight="bold" aria-hidden="true" className={styles.icon} />
              </summary>
              <div className={styles.raspuns}>
                {(Array.isArray(q.raspuns) ? q.raspuns : [q.raspuns]).map((p) => (
                  <p key={p}>
                    <TextCuLinkuri text={p} />
                  </p>
                ))}
              </div>
            </details>
          ))}
        </div>
      </div>
      {schema ? <JsonLd date={schemaFaq(intrebari)} /> : null}
    </section>
  );
}
