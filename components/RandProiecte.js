"use client";

import { useRef } from "react";
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react/dist/ssr";
import styles from "./RandProiecte.module.css";

// Rând derulabil orizontal (scroll-snap nativ). Săgețile sunt doar un ajutor pe desktop.
export default function RandProiecte({ eticheta, children }) {
  const lista = useRef(null);

  function deruleaza(directie) {
    const el = lista.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: directie * el.clientWidth * 0.8, behavior: reduce ? "auto" : "smooth" });
  }

  return (
    <div className={styles.cadru}>
      <div className={styles.lista} ref={lista} role="region" aria-label={eticheta} tabIndex={0}>
        {children}
      </div>
      <div className={styles.sageti}>
        <button type="button" className={styles.sageata} onClick={() => deruleaza(-1)}>
          <ArrowLeft size={20} aria-hidden="true" />
          <span className="ascuns-vizual">Proiectele anterioare</span>
        </button>
        <button type="button" className={styles.sageata} onClick={() => deruleaza(1)}>
          <ArrowRight size={20} aria-hidden="true" />
          <span className="ascuns-vizual">Proiectele următoare</span>
        </button>
      </div>
    </div>
  );
}
