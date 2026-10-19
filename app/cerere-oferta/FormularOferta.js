"use client";

import { startTransition, useActionState, useEffect, useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import { CheckCircle, WarningCircle } from "@phosphor-icons/react/dist/ssr";
import { trimiteCerere } from "@/lib/trimite-cerere";
import { eveniment } from "@/components/Statistici";
import {
  MB,
  bugete,
  campuriDimensiuni,
  cerePlan,
  domenii,
  formateazaMarime,
  formeBucatarie,
  limiteFisiere,
  mesajTelefon,
  telefonValid,
  tipuriCuPereti,
  tipuriMobila,
  valideazaDeBaza,
  valideazaDimensiune,
} from "@/lib/cerere";
import { micsoreazaImagine, puneFisiere } from "@/lib/micsoreaza";
import { SchitaForma, SchitaPerete } from "./Schite";
import styles from "./FormularOferta.module.css";

function Eroare({ id, children }) {
  if (!children) return null;
  return (
    <p id={id} className={styles.eroare} aria-live="polite">
      {children}
    </p>
  );
}

// Legătura dintre un câmp și textele lui de ajutor / eroare.
function descris(...ids) {
  const lista = ids.filter(Boolean);
  return lista.length ? lista.join(" ") : undefined;
}

export default function FormularOferta() {
  const [stare, trimite, seTrimite] = useActionState(trimiteCerere, { stare: "nou" });
  const valori = stare.valori ?? {};

  const [domeniu, setDomeniu] = useState("o-camera");
  const [mobila, setMobila] = useState([]);

  // /cerere-oferta/?mobila=Bucătărie preselectează tipul de mobilă (de pe paginile de categorie).
  // Pagina e statică, deci adresa se citește în browser, după încărcare.
  useEffect(() => {
    const cerute = new URLSearchParams(window.location.search).getAll("mobila").filter((m) => tipuriMobila.includes(m));
    if (!cerute.length) return;
    // Adresa există doar în browser, deci starea se poate seta abia aici, o singură dată.
    /* eslint-disable react-hooks/set-state-in-effect */
    setDomeniu(cerute.length > 1 ? "mai-multe" : "o-camera");
    setMobila(cerute);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);
  const [forma, setForma] = useState(null);
  const [nrPereti, setNrPereti] = useState(1);
  const [poze, setPoze] = useState([]);
  const [plan, setPlan] = useState(null);
  const [lucreaza, setLucreaza] = useState(0);
  const [eroriClient, setEroriClient] = useState({});

  const formular = useRef(null);
  const confirmare = useRef(null);
  const inputPoze = useRef(null);
  const inputPlan = useRef(null);
  const ghid = useRef(null);
  const coloanaCampuri = useRef(null);
  const ghidAtins = useRef(false);

  const tip = domeniu === "o-camera" ? mobila[0] : null;
  const campuri = campuriDimensiuni({ domeniu, tip, forma, nrPereti });
  const arataPlan = cerePlan(domeniu, tip);
  const totalFisiere = poze.reduce((s, f) => s + f.size, 0) + (arataPlan && plan ? plan.size : 0);
  const pestePrag = totalFisiere > limiteFisiere.mbTotal * MB;

  // Ghidul „Cum măsor?” e închis implicit. Pe ecrane late, unde stă lângă câmpuri, se deschide
  // singur doar dacă încape în înălțimea câmpurilor (nu lungește pagina). Rulează înainte de
  // afișare, deci nu se vede nicio clipire; după ce omul îl deschide sau închide, nu mai intervenim.
  const cheieCampuri = campuri.map((c) => c.nume).join(",");
  useLayoutEffect(() => {
    const d = ghid.current;
    const col = coloanaCampuri.current;
    if (!d || !col || ghidAtins.current) return;
    const alaturat = getComputedStyle(d.parentElement).gridTemplateColumns.split(" ").length > 1;
    if (!alaturat) {
      d.open = false;
      return;
    }
    d.open = true;
    d.open = d.getBoundingClientRect().height <= col.getBoundingClientRect().height + 24;
  }, [cheieCampuri]);

  const erori = { ...(stare.erori ?? {}), ...eroriClient };
  if (pestePrag) {
    erori.atasamente = `Fișierele au împreună ${formateazaMarime(totalFisiere)}, iar limita e ${limiteFisiere.mbTotal} MB. Renunță la câteva poze sau trimite un plan mai mic.`;
  }

  useEffect(() => {
    if (stare.stare === "trimis") {
      eveniment("cerere-trimisa");
      confirmare.current?.focus();
      return;
    }
    if (stare.stare !== "eroare" || !stare.erori) return;
    const primul = Object.keys(stare.erori)[0];
    if (primul) formular.current?.querySelector(`[name="${primul}"], [data-camp="${primul}"]`)?.focus();
  }, [stare]);

  function stergeEroare(nume) {
    if (erori[nume]) setEroriClient((v) => ({ ...v, [nume]: undefined }));
  }

  function alegeDomeniu(v) {
    setDomeniu(v);
    // O cameră = un singur tip de mobilă.
    if (v === "o-camera") setMobila((m) => m.slice(0, 1));
    stergeEroare("mobila");
  }

  function alegeMobila(t, bifat) {
    if (domeniu === "o-camera") setMobila([t]);
    else setMobila((m) => (bifat ? [...m, t] : m.filter((x) => x !== t)));
    stergeEroare("mobila");
  }

  async function laPoze(e) {
    const input = e.target;
    let fisiere = [...input.files];
    let mesaj;
    if (fisiere.some((f) => !f.type.startsWith("image/"))) {
      mesaj = "Aici merg doar poze (JPG, PNG, HEIC). Planul în PDF îl poți adăuga la „Planul locuinței”.";
      fisiere = fisiere.filter((f) => f.type.startsWith("image/"));
    }
    if (fisiere.length > limiteFisiere.poze) {
      mesaj = `Poți trimite cel mult ${limiteFisiere.poze} poze. Le-am păstrat pe primele ${limiteFisiere.poze}.`;
      fisiere = fisiere.slice(0, limiteFisiere.poze);
    }
    setLucreaza((n) => n + 1);
    const micsorate = await Promise.all(fisiere.map((f) => micsoreazaImagine(f, limiteFisiere.pxPoza)));
    puneFisiere(input, micsorate);
    setPoze(micsorate);
    setLucreaza((n) => n - 1);
    setEroriClient((v) => ({ ...v, poze: mesaj, atasamente: undefined }));
  }

  async function laPlan(e) {
    const input = e.target;
    const f = input.files[0];
    let mesaj;
    let rezultat = null;
    if (f) {
      if (f.type === "application/pdf") {
        if (f.size > limiteFisiere.mbPdf * MB) {
          mesaj = `Planul PDF are ${formateazaMarime(f.size)}, iar limita e ${limiteFisiere.mbPdf} MB. Exportă-l mai mic sau trimite o poză clară a planului.`;
        } else rezultat = f;
      } else if (f.type.startsWith("image/")) {
        setLucreaza((n) => n + 1);
        rezultat = await micsoreazaImagine(f, limiteFisiere.pxPlan, 0.86);
        setLucreaza((n) => n - 1);
      } else {
        mesaj = "Trimite planul ca PDF sau ca imagine (JPG, PNG).";
      }
    }
    puneFisiere(input, rezultat ? [rezultat] : []);
    setPlan(rezultat);
    setEroriClient((v) => ({ ...v, plan: mesaj, atasamente: undefined }));
  }

  function renunta(input, setter, camp) {
    if (input.current) puneFisiere(input.current, []);
    setter(camp === "plan" ? null : []);
    setEroriClient((v) => ({ ...v, [camp]: undefined }));
  }

  // Cererea pleacă de aici, nu prin `action`: așa React nu golește formularul după
  // un răspuns cu eroare, iar alegerile și fișierele rămân.
  // Înainte de trimitere, câmpurile obligatorii și dimensiunile se verifică în browser.
  function laTrimitere(e) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const err = valideazaDeBaza({
      nume: String(fd.get("nume") ?? ""),
      telefon: String(fd.get("telefon") ?? ""),
      mobila: fd.getAll("mobila"),
      acord: fd.get("acord") === "da",
    });
    for (const c of campuri) {
      const r = valideazaDimensiune(fd.get(`dim_${c.nume}`), c);
      if (r.eroare) err[`dim_${c.nume}`] = r.eroare;
    }
    if (lucreaza) err.atasamente = "Mai așteaptă o clipă: pregătim fișierele pentru trimitere.";
    if (pestePrag) err.atasamente = erori.atasamente;

    if (Object.keys(err).length) {
      setEroriClient(err);
      const ordine = [...formular.current.querySelectorAll("[name], [data-camp]")];
      const primul = ordine.find((el) => err[el.getAttribute("name")] || err[el.dataset.camp]);
      primul?.focus();
      return;
    }
    // Erorile vechi de la server nu mai sunt valabile.
    setEroriClient(Object.fromEntries(Object.keys(stare.erori ?? {}).map((k) => [k, undefined])));
    startTransition(() => trimite(fd));
  }

  if (stare.stare === "trimis") {
    return (
      <div className={styles.succes} ref={confirmare} tabIndex={-1} role="status">
        <CheckCircle size={40} weight="fill" aria-hidden="true" className={styles.iconSucces} />
        <h2>Am primit cererea ta</h2>
        <p>
          Îți mulțumim. Ne uităm peste datele trimise și te contactăm la numărul de telefon pe care
          ni l-ai dat, cu oferta estimativă sau cu întrebări, dacă mai avem nevoie de ceva.
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

  const formaAleasa = formeBucatarie.find((f) => f.valoare === forma);

  return (
    <form
      ref={formular}
      action={trimite}
      onSubmit={laTrimitere}
      onChange={(e) => e.target.name && stergeEroare(e.target.name)}
      className={styles.formular}
      noValidate
    >
      {stare.mesaj ? (
        <p className={styles.mesajEroare} role="alert">
          <WarningCircle size={22} weight="fill" aria-hidden="true" />
          {stare.mesaj}
        </p>
      ) : null}

      {/* 1. Datele tale */}
      <section className={styles.sectiune} aria-labelledby="sectiune-date">
        <h2 id="sectiune-date" className={styles.titluSectiune}>
          Datele tale
        </h2>
        <div className={styles.randDoua}>
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
              aria-describedby={descris(erori.nume && "nume-eroare")}
            />
            <Eroare id="nume-eroare">{erori.nume}</Eroare>
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
              onBlur={(e) => {
                const t = e.target.value.trim();
                setEroriClient((v) => ({ ...v, telefon: t && !telefonValid(t) ? mesajTelefon : undefined }));
              }}
              aria-invalid={erori.telefon ? true : undefined}
              aria-describedby={descris(erori.telefon && "telefon-eroare")}
            />
            <Eroare id="telefon-eroare">{erori.telefon}</Eroare>
          </div>
        </div>
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
            className={styles.inputScurt}
          />
        </div>
      </section>

      {/* 2. Ce vrei să mobilezi */}
      <section className={styles.sectiune} aria-labelledby="sectiune-ce">
        <h2 id="sectiune-ce" className={styles.titluSectiune}>
          Ce vrei să mobilezi
        </h2>
        <fieldset className={styles.camp}>
          <legend className="ascuns-vizual">Cât de mare e proiectul</legend>
          <div className={`${styles.segmente} ${styles.segmenteDomeniu}`}>
            {domenii.map((d) => (
              <label key={d.valoare} className={styles.segment}>
                <input
                  type="radio"
                  name="domeniu"
                  value={d.valoare}
                  checked={domeniu === d.valoare}
                  onChange={() => alegeDomeniu(d.valoare)}
                />
                <span>{d.eticheta}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset
          className={styles.camp}
          data-camp="mobila"
          tabIndex={-1}
          aria-invalid={erori.mobila ? true : undefined}
          aria-describedby={descris("mobila-ajutor", erori.mobila && "mobila-eroare")}
        >
          <legend>Ce mobilă îți trebuie?</legend>
          <p id="mobila-ajutor" className={styles.ajutor}>
            {domeniu === "o-camera" ? "Alege una." : "Poți alege mai multe."}
          </p>
          <div className={styles.optiuni}>
            {tipuriMobila.map((t) => (
              <label key={t} className={styles.optiune}>
                <input
                  type={domeniu === "o-camera" ? "radio" : "checkbox"}
                  name="mobila"
                  value={t}
                  checked={mobila.includes(t)}
                  onChange={(e) => alegeMobila(t, e.target.checked)}
                />
                <span>{t}</span>
              </label>
            ))}
          </div>
          <Eroare id="mobila-eroare">{erori.mobila}</Eroare>
        </fieldset>
      </section>

      {/* 3. Dimensiuni (o cameră) */}
      {campuri.length ? (
        <section className={styles.sectiune} aria-labelledby="sectiune-dimensiuni">
          <h2 id="sectiune-dimensiuni" className={styles.titluSectiune}>
            Dimensiuni <span className={styles.optional}>(opțional, dar ne ajută mult)</span>
          </h2>
          <p className={styles.ajutorSectiune}>
            Ajung valori aproximative, în centimetri. Cu ele îți putem face o estimare mai apropiată
            de prețul final. Măsurătorile exacte le facem noi, după semnarea contractului.
          </p>

          {tip === "Bucătărie" ? (
            <fieldset className={styles.camp}>
              <legend>Forma bucătăriei</legend>
              <div className={styles.forme}>
                {formeBucatarie.map((f) => (
                  <label key={f.valoare} className={styles.forma}>
                    <input
                      type="radio"
                      name="forma"
                      value={f.valoare}
                      checked={forma === f.valoare}
                      onChange={() => setForma(f.valoare)}
                    />
                    <SchitaForma forma={f.valoare} />
                    <span>{f.eticheta}</span>
                  </label>
                ))}
              </div>
              {!formaAleasa ? (
                <p className={styles.ajutor}>Alege forma și îți arătăm câte lungimi de perete să scrii.</p>
              ) : null}
            </fieldset>
          ) : null}

          {tipuriCuPereti.includes(tip) ? (
            <fieldset className={styles.camp}>
              <legend>Pe câți pereți vine mobila?</legend>
              <div className={styles.segmente}>
                {[1, 2, 3].map((n) => (
                  <label key={n} className={`${styles.segment} ${styles.segmentMic}`}>
                    <input
                      type="radio"
                      name="nr_pereti"
                      value={n}
                      checked={nrPereti === n}
                      onChange={() => setNrPereti(n)}
                    />
                    <span>{n === 1 ? "Un perete" : `${n} pereți`}</span>
                  </label>
                ))}
              </div>
            </fieldset>
          ) : null}

          <div className={styles.dimensiuniCuGhid}>
            <div className={styles.dimensiuni} ref={coloanaCampuri}>
              {campuri.map((c) => {
                const nume = `dim_${c.nume}`;
                return (
                  <div key={nume} className={styles.campDimensiune}>
                    <label htmlFor={nume}>{c.eticheta}</label>
                    <div className={styles.cuUnitate}>
                      <input
                        id={nume}
                        name={nume}
                        type="text"
                        inputMode="decimal"
                        autoComplete="off"
                        placeholder={`ex. ${c.exemplu}`}
                        defaultValue={valori.dim?.[c.nume]}
                        aria-invalid={erori[nume] ? true : undefined}
                        aria-describedby={descris(erori[nume] && `${nume}-eroare`)}
                      />
                      <span aria-hidden="true">cm</span>
                    </div>
                    <Eroare id={`${nume}-eroare`}>{erori[nume]}</Eroare>
                  </div>
                );
              })}
            </div>

            <details
              ref={ghid}
              className={styles.ghid}
            >
              <summary className={styles.titluGhid} onClick={() => (ghidAtins.current = true)}>
                Cum măsor?
              </summary>
              <SchitaPerete />
              <ul className={styles.pasiGhid}>
                <li>Lungimea: de la un colț la celălalt, de-a lungul peretelui pe care vine mobila.</li>
                <li>Înălțimea: de la podea până la tavan.</li>
                <li>
                  Geamul, ușa, țevile, prizele și caloriferul: notează la „Alte detalii” cât sunt de
                  departe de colț și de podea.
                </li>
                <li>Fă poze cu ruleta întinsă pe perete. Din ele vedem și spațiul, și dimensiunile.</li>
              </ul>
            </details>
          </div>
        </section>
      ) : null}

      {/* 4. Plan și poze */}
      <section className={styles.sectiune} aria-labelledby="sectiune-fisiere">
        <h2 id="sectiune-fisiere" className={styles.titluSectiune}>
          {arataPlan ? "Plan și poze" : "Poze ale spațiului"}{" "}
          <span className={styles.optional}>(opțional)</span>
        </h2>
        {arataPlan ? (
          <p className={styles.ajutorSectiune}>
            Pentru mai multe camere, planul ne ajută mai mult decât dimensiunile fiecărui perete.
          </p>
        ) : null}

        {arataPlan ? (
          <div className={styles.camp}>
            <label htmlFor="plan">Planul locuinței sau al spațiului</label>
            <p id="plan-ajutor" className={styles.ajutor}>
              Planul poate fi PDF sau o poză clară.
            </p>
            <div className={styles.fisiere}>
              <input
                ref={inputPlan}
                id="plan"
                name="plan"
                type="file"
                accept="application/pdf,image/*"
                onChange={laPlan}
                className={styles.inputFisiere}
                aria-invalid={erori.plan ? true : undefined}
                aria-describedby={descris("plan-ajutor", "plan-stare", erori.plan && "plan-eroare")}
              />
              <span className={styles.butonFisiere} aria-hidden="true">
                Alege planul
              </span>
              <span id="plan-stare" className={styles.stareFisiere} aria-live="polite">
                {plan ? plan.name : "Niciun plan ales"}
              </span>
            </div>
            {plan ? (
              <button type="button" className={styles.renunta} onClick={() => renunta(inputPlan, setPlan, "plan")}>
                Renunță la plan
              </button>
            ) : null}
            <Eroare id="plan-eroare">{erori.plan}</Eroare>
          </div>
        ) : null}

        <div className={styles.camp}>
          <label htmlFor="poze">Poze</label>
          <p id="poze-ajutor" className={styles.ajutor}>
            Cel mult {limiteFisiere.poze} poze. Le micșorăm automat.
          </p>
          <div className={styles.fisiere}>
            <input
              ref={inputPoze}
              id="poze"
              name="poze"
              type="file"
              accept="image/*"
              multiple
              onChange={laPoze}
              className={styles.inputFisiere}
              aria-invalid={erori.poze ? true : undefined}
              aria-describedby={descris("poze-ajutor", "poze-stare", erori.poze && "poze-eroare")}
            />
            <span className={styles.butonFisiere} aria-hidden="true">
              Alege pozele
            </span>
            <span id="poze-stare" className={styles.stareFisiere} aria-live="polite">
              {poze.length === 0 ? "Nicio poză aleasă" : poze.length === 1 ? "1 poză aleasă" : `${poze.length} poze alese`}
            </span>
          </div>
          {poze.length ? (
            <button type="button" className={styles.renunta} onClick={() => renunta(inputPoze, setPoze, "poze")}>
              Renunță la poze
            </button>
          ) : null}
          <Eroare id="poze-eroare">{erori.poze}</Eroare>
        </div>

        {/* Limitele exacte apar doar în mesajul de eroare, când sunt depășite. */}
        <p className={styles.total} data-camp="atasamente" tabIndex={-1} aria-live="polite">
          {lucreaza ? "Pregătim fișierele…" : null}
        </p>
        <Eroare id="atasamente-eroare">{erori.atasamente}</Eroare>
        {stare.aveaFisiere && !poze.length && !plan ? (
          <p className={styles.ajutor}>Fișierele trebuie alese din nou.</p>
        ) : null}
      </section>

      {/* 5. Buget și detalii */}
      <section className={styles.sectiune} aria-labelledby="sectiune-detalii">
        <h2 id="sectiune-detalii" className={styles.titluSectiune}>
          Buget și detalii <span className={styles.optional}>(opțional)</span>
        </h2>
        <div className={styles.camp}>
          <label htmlFor="buget">Buget orientativ</label>
          <p id="buget-ajutor" className={styles.ajutor}>
            Pentru tot proiectul. Ne ajută să propunem materiale potrivite.
          </p>
          <select
            id="buget"
            name="buget"
            defaultValue={valori.buget ?? ""}
            className={styles.inputScurt}
            aria-describedby="buget-ajutor"
          >
            <option value="">Alege un interval</option>
            {bugete.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.camp}>
          <label htmlFor="detalii">Alte detalii</label>
          <p id="detalii-ajutor" className={styles.ajutor}>
            {arataPlan
              ? "Ce camere vrei să mobilezi, ce trebuie să încapă, culori sau materiale care îți plac."
              : "Unde sunt geamul, ușa, țevile și prizele, ce trebuie să încapă, culori sau materiale care îți plac."}
          </p>
          <textarea
            id="detalii"
            name="detalii"
            rows={4}
            maxLength={3000}
            autoComplete="off"
            defaultValue={valori.detalii}
            aria-invalid={erori.detalii ? true : undefined}
            aria-describedby={descris("detalii-ajutor", erori.detalii && "detalii-eroare")}
          />
          <Eroare id="detalii-eroare">{erori.detalii}</Eroare>
        </div>
      </section>

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
            aria-describedby={descris(erori.acord && "acord-eroare")}
          />
          <span>
            Sunt de acord ca datele mele să fie folosite pentru a primi o ofertă, conform{" "}
            <Link href="/politica-de-confidentialitate" className="link">
              politicii de confidențialitate
            </Link>
            .
          </span>
        </label>
        <Eroare id="acord-eroare">{erori.acord}</Eroare>
      </div>

      <div className={styles.final}>
        <button type="submit" className={styles.trimite} disabled={seTrimite || lucreaza > 0}>
          {seTrimite ? "Se trimite…" : lucreaza ? "Pregătim fișierele…" : "Trimite cererea"}
        </button>
        <p className={styles.notaEstimare}>
          Prima ofertă e estimativă, pe baza datelor de mai sus. Prețul final îl confirmăm după
          măsurătorile exacte, făcute după semnarea contractului.
        </p>
      </div>
    </form>
  );
}
