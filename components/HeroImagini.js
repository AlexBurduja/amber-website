"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Pause, Play } from "@phosphor-icons/react/dist/ssr";
import styles from "./HeroImagini.module.css";

const INTERVAL = 7000;

// Alternanță între poze reale din proiecte, cu zoom foarte lent pe poza activă.
// Prima poză e cea principală (LCP); celelalte se încarcă abia după ce pagina s-a încărcat.
// Cu prefers-reduced-motion: o singură poză, fără zoom și fără alternanță.
export default function HeroImagini({ slideuri }) {
  const [activ, setActiv] = useState(0);
  const [pregatite, setPregatite] = useState(false);
  const [pauza, setPauza] = useState(false);
  const [miscareRedusa, setMiscareRedusa] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const actualizeaza = () => setMiscareRedusa(mq.matches);
    actualizeaza();
    mq.addEventListener("change", actualizeaza);

    const pregateste = () => setTimeout(() => setPregatite(true), 1200);
    if (document.readyState === "complete") pregateste();
    else window.addEventListener("load", pregateste, { once: true });
    return () => {
      mq.removeEventListener("change", actualizeaza);
      window.removeEventListener("load", pregateste);
    };
  }, []);

  const ruleaza = pregatite && !pauza && !miscareRedusa && slideuri.length > 1;

  useEffect(() => {
    if (!ruleaza) return;
    let id = setInterval(() => setActiv((i) => (i + 1) % slideuri.length), INTERVAL);
    function laVizibilitate() {
      clearInterval(id);
      if (!document.hidden) id = setInterval(() => setActiv((i) => (i + 1) % slideuri.length), INTERVAL);
    }
    document.addEventListener("visibilitychange", laVizibilitate);
    return () => {
      clearInterval(id);
      document.removeEventListener("visibilitychange", laVizibilitate);
    };
  }, [ruleaza, slideuri.length]);

  const curent = slideuri[activ];

  return (
    <div className={styles.hero} data-zoom={miscareRedusa ? undefined : "da"}>
      {slideuri.map((s, i) => {
        if (i > 0 && !pregatite) return null;
        return (
          <div key={s.imagine.src} className={styles.slide} data-activ={i === activ ? "da" : undefined} aria-hidden={i !== activ}>
            <Image
              src={s.imagine.src}
              alt={i === activ ? s.imagine.alt : ""}
              fill
              sizes="(min-width: 1024px) 58vw, 100vw"
              loading={i === 0 ? "eager" : "lazy"}
              fetchPriority={i === 0 ? "high" : "auto"}
              className={styles.img}
            />
          </div>
        );
      })}

      <div className={styles.legenda}>
        <Link href={`/proiecte/${curent.slug}`} className={styles.proiect}>
          <span className="ascuns-vizual">Proiectul din imagine: </span>
          {curent.titlu}
        </Link>
        {pregatite && !miscareRedusa && slideuri.length > 1 ? (
          <button
            type="button"
            className={styles.pauza}
            onClick={() => setPauza((p) => !p)}
            aria-label={pauza ? "Pornește prezentarea" : "Oprește prezentarea"}
          >
            {pauza ? <Play size={16} weight="fill" aria-hidden="true" /> : <Pause size={16} weight="fill" aria-hidden="true" />}
          </button>
        ) : null}
      </div>
    </div>
  );
}
