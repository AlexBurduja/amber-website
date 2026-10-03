"use server";

import { headers } from "next/headers";
import {
  MB,
  bugete,
  campuriDimensiuni,
  cerePlan,
  domeniuValid,
  formeBucatarie,
  limiteFisiere,
  tipuriCuPereti,
  tipuriMobila,
  valideazaDeBaza,
  valideazaDimensiune,
} from "@/lib/cerere";
import { trimiteCererea } from "@/lib/email";

// Limitare simplă de rată, în memoria procesului: 5 cereri pe oră de la aceeași adresă.
// TODO: la alegerea hosting-ului, de mutat într-un depozit comun dacă rulează mai multe instanțe.
const cereriRecente = new Map();
const FEREASTRA = 60 * 60 * 1000;
const MAXIM = 5;

function preaMulte(ip) {
  const acum = Date.now();
  const lista = (cereriRecente.get(ip) ?? []).filter((t) => acum - t < FEREASTRA);
  lista.push(acum);
  cereriRecente.set(ip, lista);
  return lista.length > MAXIM;
}

function text(formData, nume) {
  return String(formData.get(nume) ?? "").trim();
}

export async function trimiteCerere(stareAnterioara, formData) {
  // Câmp-capcană: oamenii nu îl văd, roboții îl completează.
  if (text(formData, "site_web").length > 0) {
    return { stare: "trimis" };
  }

  const domeniu = domeniuValid(text(formData, "domeniu"));
  let mobila = formData.getAll("mobila").map(String).filter((m) => tipuriMobila.includes(m));
  if (domeniu === "o-camera") mobila = mobila.slice(0, 1);
  const tip = domeniu === "o-camera" ? mobila[0] : null;
  const forma = formeBucatarie.find((f) => f.valoare === text(formData, "forma"))?.valoare ?? null;
  const nrPereti = Math.min(3, Math.max(1, Number(text(formData, "nr_pereti")) || 1));
  const campuri = campuriDimensiuni({ domeniu, tip, forma, nrPereti });

  const valori = {
    nume: text(formData, "nume"),
    telefon: text(formData, "telefon"),
    localitate: text(formData, "localitate").slice(0, 120),
    detalii: text(formData, "detalii"),
    buget: bugete.includes(text(formData, "buget")) ? text(formData, "buget") : "",
    acord: formData.get("acord") === "da",
    domeniu,
    mobila,
    forma,
    nrPereti,
    dim: Object.fromEntries(campuri.map((c) => [c.nume, text(formData, `dim_${c.nume}`)])),
  };

  const erori = valideazaDeBaza(valori);
  const dimensiuni = [];
  for (const c of campuri) {
    const r = valideazaDimensiune(valori.dim[c.nume], c);
    if (r.eroare) erori[`dim_${c.nume}`] = r.eroare;
    else if (r.valoare !== null) dimensiuni.push({ eticheta: c.eticheta, valoare: r.valoare });
  }
  if (valori.detalii.length > 3000) erori.detalii = "Detaliile au peste 3000 de caractere. Scurtează-le puțin.";

  const fisier = (f) => f && typeof f === "object" && f.size > 0;
  const poze = formData.getAll("poze").filter(fisier);
  const planTrimis = formData.get("plan");
  const plan = cerePlan(domeniu, tip) && fisier(planTrimis) ? planTrimis : null;
  const total = poze.reduce((s, p) => s + p.size, 0) + (plan?.size ?? 0);

  if (poze.length > limiteFisiere.poze) erori.poze = `Poți trimite cel mult ${limiteFisiere.poze} poze.`;
  else if (poze.some((p) => p.type && !limiteFisiere.tipuriImagine.includes(p.type)))
    erori.poze = "Trimite pozele ca JPG, PNG, WEBP sau HEIC.";
  if (plan) {
    if (plan.type === "application/pdf") {
      if (plan.size > limiteFisiere.mbPdf * MB) erori.plan = `Planul PDF poate avea cel mult ${limiteFisiere.mbPdf} MB.`;
    } else if (!limiteFisiere.tipuriImagine.includes(plan.type)) {
      erori.plan = "Trimite planul ca PDF sau ca imagine (JPG, PNG).";
    }
  }
  if (total > limiteFisiere.mbTotal * MB) {
    erori.atasamente = `Fișierele pot avea împreună cel mult ${limiteFisiere.mbTotal} MB.`;
  }

  const aveaFisiere = poze.length > 0 || Boolean(plan);
  if (Object.keys(erori).length) {
    return { stare: "eroare", erori, valori, aveaFisiere };
  }

  const antete = await headers();
  const ip = antete.get("x-forwarded-for")?.split(",")[0].trim() || "necunoscut";
  if (preaMulte(ip)) {
    return {
      stare: "eroare",
      mesaj: "Am primit deja mai multe cereri de la tine în ultima oră. Încearcă mai târziu sau sună-ne.",
      valori,
      aveaFisiere,
    };
  }

  try {
    await trimiteCererea({
      ...valori,
      formaEticheta: tip === "Bucătărie" && forma ? formeBucatarie.find((f) => f.valoare === forma).inText : null,
      numarPereti: tipuriCuPereti.includes(tip) ? nrPereti : null,
      dimensiuni,
      plan,
      poze,
    });
    return { stare: "trimis" };
  } catch (e) {
    console.error("Cererea de ofertă nu a putut fi trimisă:", e);
    return {
      stare: "eroare",
      mesaj: "Cererea nu a putut fi trimisă din cauza unei probleme tehnice. Încearcă din nou peste câteva minute sau sună-ne.",
      valori,
      aveaFisiere,
    };
  }
}
