import styles from "./Eticheta3D.module.css";

// Randările nu se prezintă niciodată ca lucrări realizate (CLAUDE.md §4, pasul 2).
export default function Eticheta3D({ pozitie = "peImagine" }) {
  return <span className={`eticheta ${styles.eticheta} ${styles[pozitie]}`}>Proiect 3D</span>;
}
