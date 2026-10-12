// Trimite cererea de ofertă către scriptul PHP de pe hosting (public/api/cerere.php).
// Are forma unei acțiuni pentru useActionState: primește starea anterioară și datele formularului
// și întoarce starea nouă ({ stare: "trimis" } sau { stare: "eroare", erori, mesaj, valori }).
const ADRESA = "/api/cerere.php";
const MESAJ_TEHNIC =
  "Cererea nu a putut fi trimisă din cauza unei probleme tehnice. Încearcă din nou peste câteva minute sau sună-ne.";

export async function trimiteCerere(stareAnterioara, formData) {
  // PHP păstrează toate valorile unui câmp repetat doar dacă numele se termină în „[]”.
  const date = new FormData();
  for (const [nume, valoare] of formData.entries()) {
    date.append(nume === "mobila" || nume === "poze" ? `${nume}[]` : nume, valoare);
  }
  try {
    const raspuns = await fetch(ADRESA, { method: "POST", body: date, headers: { Accept: "application/json" } });
    const stare = await raspuns.json();
    if (stare?.stare === "trimis" || stare?.stare === "eroare") return stare;
  } catch {
    // răspuns care nu e JSON sau rețea indisponibilă: mesajul de mai jos
  }
  return { stare: "eroare", mesaj: MESAJ_TEHNIC };
}
