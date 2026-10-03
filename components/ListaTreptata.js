"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./ListaTreptata.module.css";

// Toate cardurile sunt în HTML (linkurile rămân vizibile pentru motoarele de căutare),
// dar pe ecran apar câte `pas` odată. Elementele ascunse au `hidden`, deci pozele lor nu se descarcă.
export default function ListaTreptata({ children, pas = 12, className, eticheta = "proiecte" }) {
  const elemente = Array.isArray(children) ? children : [children];
  const [vizibile, setVizibile] = useState(pas);
  const primulNou = useRef(null);
  const ramase = elemente.length - vizibile;

  useEffect(() => {
    primulNou.current?.querySelector("a")?.focus({ preventScroll: true });
  }, [vizibile]);

  return (
    <>
      <ul className={className}>
        {elemente.map((el, i) => (
          <li key={el.key ?? i} hidden={i >= vizibile} ref={i === vizibile - pas && i > 0 ? primulNou : null}>
            {el}
          </li>
        ))}
      </ul>
      {ramase > 0 ? (
        <div className={styles.maiMulte}>
          <p className={styles.stare} aria-live="polite">
            Vezi {Math.min(vizibile, elemente.length)} din {elemente.length} {eticheta}.
          </p>
          <button type="button" className={styles.buton} onClick={() => setVizibile((v) => v + pas)}>
            Arată mai multe
          </button>
        </div>
      ) : null}
    </>
  );
}
