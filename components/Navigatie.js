"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { CaretDown, List, X } from "@phosphor-icons/react/dist/ssr";
import { navigatie, linkTelefon } from "@/lib/site";
import styles from "./Navigatie.module.css";

const SELECTOR_FOCUS = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

function esteActiv(pathname, href) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

const faraAbonare = () => () => {};

// Blochează derularea paginii, inclusiv pe iOS (unde overflow: hidden pe body nu ajunge).
// Idempotentă: un al doilea apel cât pagina e deja blocată nu mai citește poziția (ar fi 0).
let blocare = null;
function blocheazaDerularea() {
  if (blocare) {
    blocare.utilizatori += 1;
  } else {
    const y = window.scrollY;
    const { body, documentElement: html } = document;
    const latimeBara = window.innerWidth - html.clientWidth;
    Object.assign(body.style, { position: "fixed", top: `-${y}px`, left: "0", right: "0", paddingRight: `${latimeBara}px` });
    html.style.overflow = "hidden";
    blocare = { y, utilizatori: 1 };
  }
  let eliberat = false;
  return () => {
    if (eliberat || !blocare) return;
    eliberat = true;
    blocare.utilizatori -= 1;
    if (blocare.utilizatori > 0) return;
    const { y } = blocare;
    blocare = null;
    const { body, documentElement: html } = document;
    Object.assign(body.style, { position: "", top: "", left: "", right: "", paddingRight: "" });
    html.style.overflow = "";
    window.scrollTo({ top: y, behavior: "instant" });
  };
}

export default function Navigatie({ categorii, telefon }) {
  const pathname = usePathname();
  // Meniurile rețin pagina pe care au fost deschise; la navigare se închid singure.
  const [listaDeschisaPe, setListaDeschisaPe] = useState(null);
  const [mobilDeschisPe, setMobilDeschisPe] = useState(null);
  const listaDeschisa = listaDeschisaPe === pathname;
  const mobilDeschis = mobilDeschisPe === pathname;
  // Panoul mobil se randează în <body>, nu în antet: antetul are backdrop-filter, iar în WebKit
  // (Safari pe iPhone) asta face ca un element position: fixed din el să aibă înălțimea antetului.
  const montat = useSyncExternalStore(faraAbonare, () => true, () => false);

  const listaRef = useRef(null);
  const butonMobilRef = useRef(null);
  const panouRef = useRef(null);
  const revinePeButon = useRef(true);

  const inCategorii = categorii.some((c) => esteActiv(pathname, c.href));

  function inchideMobil({ focusPeButon = true } = {}) {
    revinePeButon.current = focusPeButon;
    setMobilDeschisPe(null);
  }

  useEffect(() => {
    if (!listaDeschisa) return;
    function laClick(e) {
      if (listaRef.current && !listaRef.current.contains(e.target)) setListaDeschisaPe(null);
    }
    function laTasta(e) {
      if (e.key === "Escape") {
        setListaDeschisaPe(null);
        listaRef.current?.querySelector("button")?.focus();
      }
    }
    document.addEventListener("pointerdown", laClick);
    document.addEventListener("keydown", laTasta);
    return () => {
      document.removeEventListener("pointerdown", laClick);
      document.removeEventListener("keydown", laTasta);
    };
  }, [listaDeschisa]);

  useEffect(() => {
    if (!mobilDeschis) return;
    const buton = butonMobilRef.current;
    const panou = panouRef.current;
    const deblocheaza = blocheazaDerularea();
    revinePeButon.current = true;

    // Restul paginii devine inert: nu se poate focusa și nu e citit de cititoarele de ecran.
    const inerte = [document.getElementById("continut"), document.querySelector("footer")].filter(Boolean);
    inerte.forEach((el) => el.setAttribute("inert", ""));

    panou?.querySelector("a")?.focus();

    function laTasta(e) {
      if (e.key === "Escape") {
        e.preventDefault();
        setMobilDeschisPe(null);
        return;
      }
      if (e.key !== "Tab" || !panou) return;
      // Focusul circulă doar între butonul de închidere și linkurile din meniu.
      e.preventDefault();
      const elemente = [buton, ...panou.querySelectorAll(SELECTOR_FOCUS)].filter(Boolean);
      const i = elemente.indexOf(document.activeElement);
      const urmator = i === -1 ? 0 : (i + (e.shiftKey ? -1 : 1) + elemente.length) % elemente.length;
      elemente[urmator].focus();
    }
    document.addEventListener("keydown", laTasta);

    return () => {
      document.removeEventListener("keydown", laTasta);
      inerte.forEach((el) => el.removeAttribute("inert"));
      deblocheaza();
      if (revinePeButon.current) buton?.focus({ preventScroll: true });
    };
  }, [mobilDeschis]);

  const panouMobil = (
    <div
      id="meniu-mobil"
      className={styles.panou}
      hidden={!mobilDeschis}
      ref={panouRef}
      role="dialog"
      aria-modal="true"
      aria-label="Meniu"
    >
      <nav className={styles.panouInterior} aria-label="Navigare principală (mobil)">
        <p className={`eticheta ${styles.titluGrup}`}>Mobilă la comandă</p>
        <ul className={styles.listaMobil}>
          {categorii.map((c) => (
            <li key={c.href}>
              <Link
                href={c.href}
                className={`${styles.linkMobil} ${pathname === c.href ? styles.activ : ""}`}
                aria-current={pathname === c.href ? "page" : undefined}
                onClick={() => inchideMobil({ focusPeButon: false })}
              >
                {c.eticheta}
              </Link>
            </li>
          ))}
        </ul>
        <ul className={`${styles.listaMobil} ${styles.listaSecundara}`}>
          {navigatie.map((n) => (
            <li key={n.href}>
              <Link
                href={n.href}
                className={`${styles.linkMobil} ${esteActiv(pathname, n.href) ? styles.activ : ""}`}
                aria-current={pathname === n.href ? "page" : undefined}
                onClick={() => inchideMobil({ focusPeButon: false })}
              >
                {n.eticheta}
              </Link>
            </li>
          ))}
        </ul>
        {telefon ? (
          <a href={linkTelefon(telefon)} className={styles.telefonMobil}>
            {telefon}
          </a>
        ) : null}
      </nav>
    </div>
  );

  return (
    <nav className={styles.nav} aria-label="Navigare principală">
      <ul className={styles.listaDesktop}>
        <li className={styles.cuLista} ref={listaRef}>
          <button
            type="button"
            className={`${styles.link} ${inCategorii ? styles.activ : ""}`}
            aria-expanded={listaDeschisa}
            aria-controls="lista-categorii"
            onClick={() => setListaDeschisaPe(listaDeschisa ? null : pathname)}
          >
            Mobilă la comandă
            <CaretDown size={14} weight="bold" aria-hidden="true" className={styles.sageata} />
          </button>
          <ul id="lista-categorii" className={styles.lista} hidden={!listaDeschisa}>
            {categorii.map((c) => (
              <li key={c.href}>
                <Link
                  href={c.href}
                  className={styles.linkLista}
                  aria-current={pathname === c.href ? "page" : undefined}
                  onClick={() => setListaDeschisaPe(null)}
                >
                  {c.eticheta}
                </Link>
              </li>
            ))}
          </ul>
        </li>
        {navigatie.map((n) => (
          <li key={n.href}>
            <Link
              href={n.href}
              className={`${styles.link} ${esteActiv(pathname, n.href) ? styles.activ : ""}`}
              aria-current={pathname === n.href ? "page" : undefined}
            >
              {n.eticheta}
            </Link>
          </li>
        ))}
      </ul>

      <button
        type="button"
        ref={butonMobilRef}
        className={styles.butonMobil}
        aria-expanded={mobilDeschis}
        aria-controls="meniu-mobil"
        aria-label={mobilDeschis ? "Închide meniul" : "Deschide meniul"}
        onClick={() => (mobilDeschis ? inchideMobil() : setMobilDeschisPe(pathname))}
      >
        {mobilDeschis ? <X size={26} aria-hidden="true" /> : <List size={26} aria-hidden="true" />}
      </button>

      {montat ? createPortal(panouMobil, document.body) : null}
    </nav>
  );
}
