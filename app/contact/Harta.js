"use client";

import { useState } from "react";
import { MapTrifold } from "@phosphor-icons/react/dist/ssr";
import styles from "./page.module.css";

// Harta Google se încarcă doar la cerere: fără cookie-uri terțe și fără cost de încărcare până la click.
export default function Harta({ adresa }) {
  const [vizibila, setVizibila] = useState(false);

  if (!vizibila) {
    return (
      <button type="button" className={styles.butonHarta} onClick={() => setVizibila(true)}>
        <MapTrifold size={22} aria-hidden="true" />
        Arată harta
        <span className={styles.notaHarta}>Se încarcă de la Google Maps.</span>
      </button>
    );
  }

  return (
    <iframe
      className={styles.harta}
      title={`Harta showroom-ului: ${adresa}`}
      src={`https://www.google.com/maps?q=${encodeURIComponent(adresa)}&output=embed`}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    />
  );
}
