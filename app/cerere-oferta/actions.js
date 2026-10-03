"use server";

import { headers } from "next/headers";
import { limitePoze, telefonValid, tipuriMobila } from "@/lib/cerere";
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

export async function trimiteCerere(stareAnterioara, formData) {
  const valori = {
    nume: String(formData.get("nume") ?? "").trim(),
    telefon: String(formData.get("telefon") ?? "").trim(),
    mobila: formData.getAll("mobila").map(String).filter((m) => tipuriMobila.includes(m)),
    localitate: String(formData.get("localitate") ?? "").trim(),
    detalii: String(formData.get("detalii") ?? "").trim(),
    acord: formData.get("acord") === "da",
  };

  // Câmp-capcană: oamenii nu îl văd, roboții îl completează.
  if (String(formData.get("site_web") ?? "").length > 0) {
    return { stare: "trimis" };
  }

  const erori = {};
  if (valori.nume.length < 2) erori.nume = "Scrie-ne numele tău.";
  if (!valori.telefon) erori.telefon = "Scrie-ne un număr de telefon la care te putem suna.";
  else if (!telefonValid(valori.telefon))
    erori.telefon = "Numărul nu pare corect. Folosește formatul 07xx xxx xxx sau +40 7xx xxx xxx.";
  if (!valori.mobila.length) erori.mobila = "Alege cel puțin un tip de mobilă.";
  if (valori.detalii.length > 3000) erori.detalii = "Detaliile au peste 3000 de caractere. Scurtează-le puțin.";
  if (!valori.acord) erori.acord = "Avem nevoie de acordul tău ca să folosim datele pentru ofertă.";

  const poze = formData.getAll("poze").filter((f) => f && typeof f === "object" && f.size > 0);
  if (poze.length > limitePoze.numar) {
    erori.poze = `Poți trimite cel mult ${limitePoze.numar} poze.`;
  } else if (poze.some((p) => p.size > limitePoze.mbPerPoza * 1024 * 1024)) {
    erori.poze = `Fiecare poză poate avea cel mult ${limitePoze.mbPerPoza} MB.`;
  } else if (poze.some((p) => p.type && !limitePoze.tipuri.includes(p.type))) {
    erori.poze = "Trimite pozele ca JPG, PNG, WEBP sau HEIC.";
  }

  if (Object.keys(erori).length) {
    return { stare: "eroare", erori, valori, aveaPoze: poze.length > 0 };
  }

  const antete = await headers();
  const ip = antete.get("x-forwarded-for")?.split(",")[0].trim() || "necunoscut";
  if (preaMulte(ip)) {
    return {
      stare: "eroare",
      mesaj: "Am primit deja mai multe cereri de la tine în ultima oră. Încearcă mai târziu sau sună-ne.",
      valori,
    };
  }

  try {
    await trimiteCererea({ ...valori, poze });
    return { stare: "trimis" };
  } catch (e) {
    console.error("Cererea de ofertă nu a putut fi trimisă:", e);
    return {
      stare: "eroare",
      mesaj: "Cererea nu a putut fi trimisă din cauza unei probleme tehnice. Încearcă din nou peste câteva minute sau sună-ne.",
      valori,
      aveaPoze: poze.length > 0,
    };
  }
}
