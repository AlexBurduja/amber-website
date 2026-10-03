"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Phone } from "@phosphor-icons/react/dist/ssr";
import { linkTelefon } from "@/lib/site";
import styles from "./CtaMobil.module.css";

// Butonul „Cere ofertă” fix, doar pe mobil. Apare după primul ecran (pragul din layout)
// și se ascunde lângă elementele marcate cu data-ascunde-cta: banda galbenă, subsolul, formularul.
// Fără ascultători de scroll: doar IntersectionObserver.
export default function CtaMobil({ telefon }) {
  const pathname = usePathname();
  const [pestePrag, setPestePrag] = useState(false);
  const [ascunzatoare, setAscunzatoare] = useState(0);

  useEffect(() => {
    const prag = document.getElementById("prag-cta");
    if (!prag) return;
    const obsPrag = new IntersectionObserver(([e]) => setPestePrag(!e.isIntersecting));
    obsPrag.observe(prag);

    const vizibile = new Set();
    const obsAscunde = new IntersectionObserver((intrari) => {
      for (const e of intrari) {
        if (e.isIntersecting) vizibile.add(e.target);
        else vizibile.delete(e.target);
      }
      setAscunzatoare(vizibile.size);
    });
    document.querySelectorAll("[data-ascunde-cta]").forEach((el) => obsAscunde.observe(el));

    return () => {
      obsPrag.disconnect();
      obsAscunde.disconnect();
    };
  }, [pathname]);

  if (pathname === "/cerere-oferta") return null;
  const vizibil = pestePrag && ascunzatoare === 0;

  return (
    <div id="cta-mobil" className={styles.bara} data-vizibil={vizibil ? "da" : undefined} inert={!vizibil}>
      {telefon ? (
        <a href={linkTelefon(telefon)} className={styles.telefon} aria-label={`Sună la ${telefon}`}>
          <Phone size={22} aria-hidden="true" />
        </a>
      ) : null}
      <Link href="/cerere-oferta" className={styles.oferta}>
        Cere ofertă
      </Link>
    </div>
  );
}
