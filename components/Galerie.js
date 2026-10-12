"use client";

import Image from "@/components/Imagine";
import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, X } from "@phosphor-icons/react/dist/ssr";
import styles from "./Galerie.module.css";

const ContextGalerie = createContext(null);

// Vizualizator pe tot ecranul pentru imaginile unui proiect. Imaginile rămân randate pe server;
// butoanele doar deschid dialogul la poziția lor.
export function Galerie({ imagini, children }) {
  const dialog = useRef(null);
  const [index, setIndex] = useState(0);
  const [deschis, setDeschis] = useState(false);
  const total = imagini.length;

  const deschide = useCallback((i) => {
    setIndex(i);
    setDeschis(true);
    dialog.current?.showModal();
  }, []);

  const muta = useCallback((pas) => setIndex((i) => (i + pas + total) % total), [total]);

  useEffect(() => {
    const el = dialog.current;
    if (!el) return;
    function laTasta(e) {
      if (!el.open) return;
      if (e.key === "ArrowRight") muta(1);
      if (e.key === "ArrowLeft") muta(-1);
    }
    function laClick(e) {
      if (e.target === el) el.close();
    }
    function laInchidere() {
      setDeschis(false);
    }
    document.addEventListener("keydown", laTasta);
    el.addEventListener("click", laClick);
    el.addEventListener("close", laInchidere);
    return () => {
      document.removeEventListener("keydown", laTasta);
      el.removeEventListener("click", laClick);
      el.removeEventListener("close", laInchidere);
    };
  }, [muta]);

  const img = imagini[index];

  return (
    <ContextGalerie.Provider value={deschide}>
      {children}
      <dialog ref={dialog} className={styles.dialog} aria-label="Imaginile proiectului">
        <div className={styles.scena}>
          {deschis && img ? (
            <figure className={styles.figura}>
              <div className={styles.media}>
                <Image
                  key={img.src}
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="100vw"
                  className={styles.img}
                />
                {img.tip === "randare" ? <span className={`eticheta ${styles.eticheta}`}>Proiect 3D</span> : null}
              </div>
              <figcaption className={styles.legenda}>
                <span>{img.alt}</span>
                <span className={styles.contor} aria-live="polite">
                  {index + 1} din {total}
                </span>
              </figcaption>
            </figure>
          ) : null}
        </div>
        <form method="dialog">
          <button type="submit" className={`${styles.buton} ${styles.inchide}`} aria-label="Închide">
            <X size={24} aria-hidden="true" />
          </button>
        </form>
        {total > 1 ? (
          <>
            <button
              type="button"
              className={`${styles.buton} ${styles.inapoi}`}
              onClick={() => muta(-1)}
              aria-label="Imaginea anterioară"
            >
              <ArrowLeft size={24} aria-hidden="true" />
            </button>
            <button
              type="button"
              className={`${styles.buton} ${styles.inainte}`}
              onClick={() => muta(1)}
              aria-label="Imaginea următoare"
            >
              <ArrowRight size={24} aria-hidden="true" />
            </button>
          </>
        ) : null}
      </dialog>
    </ContextGalerie.Provider>
  );
}

export function ButonImagine({ index, alt, className, children }) {
  const deschide = useContext(ContextGalerie);
  return (
    <button
      type="button"
      className={className}
      onClick={() => deschide?.(index)}
      aria-label={`Mărește imaginea: ${alt}`}
    >
      {children}
    </button>
  );
}
