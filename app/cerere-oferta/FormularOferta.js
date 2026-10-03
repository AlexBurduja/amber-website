"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { CheckCircle, WarningCircle } from "@phosphor-icons/react/dist/ssr";
import { trimiteCerere } from "./actions";
import { limitePoze, telefonValid, tipuriMobila } from "@/lib/cerere";
import styles from "./FormularOferta.module.css";

const ordineCampuri = ["nume", "telefon", "mobila", "detalii", "poze", "acord"];

export default function FormularOferta({ mobilaPreselectata = [] }) {
  const [stare, trimite, seTrimite] = useActionState(trimiteCerere, { stare: "nou" });
  const [eroriClient, setEroriClient] = useState({});
  const [numarPoze, setNumarPoze] = useState(0);
  const formular = useRef(null);
  const confirmare = useRef(null);

  const erori = { ...(stare.erori ?? {}), ...eroriClient };
  const valori = stare.valori ?? {};

  // După un răspuns cu erori, focusul merge pe primul câmp greșit; după trimitere, pe confirmare.
  useEffect(() => {
    if (stare.stare === "trimis") {
      confirmare.current?.focus();
      return;
    }
    if (stare.stare !== "eroare") return;
    const primul = ordineCampuri.find((c) => stare.erori?.[c]);
    if (primul) formular.current?.querySelector(`[name="${primul}"]`)?.focus();
  }, [stare]);

  function verificaPoze(e) {
    const fisiere = [...e.target.files];
    setNumarPoze(fisiere.length);
    let mesaj;
    if (fisiere.length > limitePoze.numar) mesaj = `Poți trimite cel mult ${limitePoze.numar} poze.`;
    else if (fisiere.some((f) => f.size > limitePoze.mbPerPoza * 1024 * 1024))
      mesaj = `Fiecare poză poate avea cel mult ${limitePoze.mbPerPoza} MB.`;
    setEroriClient((v) => ({ ...v, poze: mesaj }));
    e.target.setCustomValidity(mesaj ?? "");
  }

  function verificaTelefon(e) {
    const t = e.target.value.trim();
    setEroriClient((v) => ({
      ...v,
      telefon: t && !telefonValid(t) ? "Numărul nu pare corect. Folosește formatul 07xx xxx xxx sau +40 7xx xxx xxx." : undefined,
    }));
  }

  if (stare.stare === "trimis") {
    return (
      <div className={styles.succes} ref={confirmare} tabIndex={-1} role="status">
        <CheckCircle size={40} weight="fill" aria-hidden="true" className={styles.iconSucces} />
        <h2>Am primit cererea ta</h2>
        <p>
          Îți mulțumim. Te contactăm la numărul de telefon pe care ni l-ai dat, ca să vorbim despre
          detalii și despre ofertă.
        </p>
        <p>
          Între timp, poți să te uiți prin{" "}
          <Link href="/proiecte" className="link">
            proiectele realizate
          </Link>
          .
        </p>
      </div>
    );
  }

  const bifate = valori.mobila ?? mobilaPreselectata;

  return (
    <form ref={formular} action={trimite} className={styles.formular} noValidate>
      {stare.mesaj ? (
        <p className={styles.mesajEroare} role="alert">
          <WarningCircle size={22} weight="fill" aria-hidden="true" />
          {stare.mesaj}
        </p>
      ) : null}

      <div className={styles.camp}>
        <label htmlFor="nume">Nume</label>
        <input
          id="nume"
          name="nume"
          type="text"
          autoComplete="name"
          required
          defaultValue={valori.nume}
          aria-invalid={erori.nume ? true : undefined}
          aria-describedby={erori.nume ? "nume-eroare" : undefined}
        />
        {erori.nume ? <p id="nume-eroare" className={styles.eroare}>{erori.nume}</p> : null}
      </div>

      <div className={styles.camp}>
        <label htmlFor="telefon">Telefon</label>
        <input
          id="telefon"
          name="telefon"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          required
          placeholder="07xx xxx xxx…"
          defaultValue={valori.telefon}
          onBlur={verificaTelefon}
          aria-invalid={erori.telefon ? true : undefined}
          aria-describedby={erori.telefon ? "telefon-eroare" : undefined}
        />
        {erori.telefon ? <p id="telefon-eroare" className={styles.eroare} aria-live="polite">{erori.telefon}</p> : null}
      </div>

      <fieldset
        className={styles.camp}
        aria-invalid={erori.mobila ? true : undefined}
        aria-describedby={erori.mobila ? "mobila-eroare" : undefined}
      >
        <legend>Ce mobilă îți trebuie?</legend>
        <p className={styles.ajutor}>Poți alege mai multe.</p>
        <div className={styles.optiuni}>
          {tipuriMobila.map((t) => (
            <label key={t} className={styles.optiune}>
              <input type="checkbox" name="mobila" value={t} defaultChecked={bifate.includes(t)} />
              <span>{t}</span>
            </label>
          ))}
        </div>
        {erori.mobila ? <p id="mobila-eroare" className={styles.eroare}>{erori.mobila}</p> : null}
      </fieldset>

      <div className={styles.camp}>
        <label htmlFor="localitate">
          Localitatea <span className={styles.optional}>(opțional)</span>
        </label>
        <input
          id="localitate"
          name="localitate"
          type="text"
          autoComplete="address-level2"
          defaultValue={valori.localitate}
        />
      </div>

      <div className={styles.camp}>
        <label htmlFor="detalii">
          Dimensiuni sau alte detalii <span className={styles.optional}>(opțional)</span>
        </label>
        <p id="detalii-ajutor" className={styles.ajutor}>
          De exemplu: lungimea pereților, înălțimea până la tavan, ce trebuie să încapă.
        </p>
        <textarea
          id="detalii"
          name="detalii"
          rows={5}
          maxLength={3000}
          autoComplete="off"
          defaultValue={valori.detalii}
          aria-invalid={erori.detalii ? true : undefined}
          aria-describedby={erori.detalii ? "detalii-ajutor detalii-eroare" : "detalii-ajutor"}
        />
        {erori.detalii ? <p id="detalii-eroare" className={styles.eroare}>{erori.detalii}</p> : null}
      </div>

      <div className={styles.camp}>
        <label htmlFor="poze">
          Poze ale spațiului <span className={styles.optional}>(opțional)</span>
        </label>
        <p id="poze-ajutor" className={styles.ajutor}>
          Cel mult {limitePoze.numar} poze, de până la {limitePoze.mbPerPoza}&nbsp;MB fiecare.
          {stare.aveaPoze ? " Pozele trebuie alese din nou." : null}
        </p>
        <div className={styles.fisiere}>
          <input
            id="poze"
            name="poze"
            type="file"
            accept="image/*"
            multiple
            onChange={verificaPoze}
            className={styles.inputFisiere}
            aria-invalid={erori.poze ? true : undefined}
            aria-describedby={erori.poze ? "poze-ajutor poze-stare poze-eroare" : "poze-ajutor poze-stare"}
          />
          <span className={styles.butonFisiere} aria-hidden="true">
            Alege pozele
          </span>
          <span id="poze-stare" className={styles.stareFisiere} aria-live="polite">
            {numarPoze === 0 ? "Nicio poză aleasă" : numarPoze === 1 ? "1 poză aleasă" : `${numarPoze} poze alese`}
          </span>
        </div>
        {erori.poze ? <p id="poze-eroare" className={styles.eroare} aria-live="polite">{erori.poze}</p> : null}
      </div>

      {/* Câmp-capcană pentru roboți; ascuns pentru oameni și pentru cititoarele de ecran. */}
      <div className={styles.capcana} aria-hidden="true">
        <label htmlFor="site_web">Nu completa acest câmp</label>
        <input id="site_web" name="site_web" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className={styles.camp}>
        <label className={styles.acord}>
          <input
            type="checkbox"
            name="acord"
            value="da"
            required
            defaultChecked={valori.acord}
            aria-invalid={erori.acord ? true : undefined}
            aria-describedby={erori.acord ? "acord-eroare" : undefined}
          />
          <span>
            Sunt de acord ca datele mele să fie folosite pentru a primi o ofertă, conform{" "}
            <Link href="/politica-de-confidentialitate" className="link">
              politicii de confidențialitate
            </Link>
            .
          </span>
        </label>
        {erori.acord ? <p id="acord-eroare" className={styles.eroare}>{erori.acord}</p> : null}
      </div>

      <button type="submit" className={styles.trimite} disabled={seTrimite}>
        {seTrimite ? "Se trimite…" : "Trimite cererea"}
      </button>
    </form>
  );
}
