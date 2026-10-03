"use client";

import Image from "next/image";
import { useRef } from "react";
import Eticheta3D from "./Eticheta3D";
import styles from "./Comparator.module.css";

// Comparator randare / realizat. Controlul e un <input type="range"> nativ, deci merge cu tastatura
// (săgeți, Home, End, PageUp/PageDown) și cu cititoarele de ecran. Dezvăluirea folosește doar
// transform: un cadru se deplasează spre stânga, iar imaginea din el, invers, cu aceeași distanță.
export default function Comparator({ randare, realizat, sizes }) {
  const cadru = useRef(null);

  function muta(e) {
    const v = Number(e.target.value);
    cadru.current?.style.setProperty("--p", v);
    e.target.setAttribute("aria-valuetext", `${v}% randare, ${100 - v}% mobila realizată`);
  }

  return (
    <div className={styles.comparator} ref={cadru} style={{ "--p": 50 }}>
      <div className={styles.strat}>
        <Image src={realizat.src} alt={realizat.alt} fill sizes={sizes} className={styles.img} />
        <span className={`eticheta ${styles.etichetaDreapta}`}>Realizat</span>
      </div>
      <div className={styles.stratRandare}>
        <div className={styles.contra}>
          <Image src={randare.src} alt={randare.alt} fill sizes={sizes} className={styles.img} />
        </div>
      </div>
      <Eticheta3D />
      <div className={styles.maner} aria-hidden="true">
        <span className={styles.linie} />
        <span className={styles.sertar} />
      </div>
      <input
        type="range"
        min="0"
        max="100"
        step="1"
        defaultValue="50"
        onInput={muta}
        className={styles.control}
        aria-label="Compară randarea cu mobila realizată"
        aria-valuetext="50% randare, 50% mobila realizată"
      />
    </div>
  );
}
