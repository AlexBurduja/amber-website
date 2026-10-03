import Breadcrumb from "./Breadcrumb";
import styles from "./PaginaText.module.css";

// Șablon pentru paginile de text (legale).
export default function PaginaText({ titlu, href, actualizat, children }) {
  return (
    <article className={`container ${styles.pagina}`}>
      <Breadcrumb pasi={[{ nume: titlu, href }]} />
      <h1 className={styles.titlu}>{titlu}</h1>
      {actualizat ? <p className={styles.actualizat}>Ultima actualizare: {actualizat}</p> : null}
      <div className={styles.text}>{children}</div>
    </article>
  );
}
