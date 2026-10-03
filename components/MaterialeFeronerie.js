import { materiale } from "@/data/fabrica";
import styles from "./MaterialeFeronerie.module.css";

// Materialele și feroneria cu care lucrăm. Doar numele producătorilor, fără siglele lor.
// grupuri: ce se afișează pe pagina curentă (ex. fără blaturi pe dormitoare).
export default function MaterialeFeronerie({ grupuri = ["pal", "mdf", "blaturi", "feronerie"], fundal = "paper" }) {
  return (
    <section className={`${styles.sectiune} ${styles[fundal]}`} aria-labelledby="materiale-titlu">
      <div className="container">
        <h2 id="materiale-titlu">Materiale și feronerie</h2>
        <p className={`text-lung ${styles.intro}`}>
          Lucrăm cu materiale și feronerie de la producători cunoscuți. Pentru fiecare proiect le
          alegem împreună cu tine, după cum va fi folosită mobila.
        </p>
        <dl className={styles.grupuri}>
          {grupuri.map((cheie) => {
            const g = materiale[cheie];
            return (
              <div key={cheie} className={styles.grup}>
                <dt className={styles.titlu}>{g.titlu}</dt>
                <dd className={styles.text}>{g.text}</dd>
                <dd>
                  <ul className={styles.nume}>
                    {g.nume.map((n) => (
                      <li key={n} translate="no">
                        {n}
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
            );
          })}
        </dl>
      </div>
    </section>
  );
}
