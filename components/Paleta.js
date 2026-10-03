import { palete } from "@/data/paleta";
import styles from "./Paleta.module.css";

// Mostrar cu culorile dominante din pozele proiectului (extrase la build, vezi scripts/paleta.mjs).
export default function Paleta({ slug }) {
  const paleta = palete[slug];
  if (!paleta?.length) return null;
  return (
    <div className={styles.paleta}>
      <h2 className={styles.titlu}>Paleta din imagini</h2>
      <ul className={styles.mostre}>
        {paleta.map((c) => (
          <li key={c.hex} className={styles.mostra}>
            <span className={styles.culoare} style={{ backgroundColor: c.hex }} aria-hidden="true" />
            <span className={styles.nume}>{c.nume}</span>
            <span className={styles.hex}>{c.hex}</span>
          </li>
        ))}
      </ul>
      <p className={styles.nota}>
        Culori extrase automat din fotografii. Lumina le poate schimba față de finisajul real.
      </p>
    </div>
  );
}
