"use client";

import Image from "next/image";
import { useState } from "react";
import styles from "./CardProiect.module.css";

// A doua poză apare la hover doar pe desktop (mouse). Se încarcă abia la primul hover,
// ca grilele să nu descarce dublul imaginilor.
export default function CardMedia({ secundara, sizes, children }) {
  const [montata, setMontata] = useState(false);
  const [incarcata, setIncarcata] = useState(false);

  return (
    <div
      className={styles.media}
      data-hover={incarcata ? "gata" : undefined}
      onPointerEnter={(e) => {
        if (secundara && e.pointerType === "mouse") setMontata(true);
      }}
    >
      {children}
      {montata ? (
        <Image
          src={secundara.src}
          alt=""
          aria-hidden="true"
          fill
          sizes={sizes}
          className={styles.imgSecundara}
          onLoad={() => setIncarcata(true)}
        />
      ) : null}
    </div>
  );
}
