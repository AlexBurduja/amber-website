import "server-only";
import { contact } from "@/lib/site";

// Trimiterea cererilor de ofertă prin email.
// TODO: de completat de Alex, odată cu hosting-ul. Varianta pregătită folosește Resend (resend.com)
// prin API, fără dependențe în plus. Variabile de mediu necesare:
//   RESEND_API_KEY        cheia API
//   CERERI_EMAIL_DE_LA    adresa expeditorului, de pe un domeniu verificat (ex. „cereri@ambermob.ro”)
//   CERERI_EMAIL_CATRE    opțional; implicit vanzari@ambermob.ro (contact.email)
// Fără ele: în dezvoltare cererea se afișează în consolă; în producție trimiterea eșuează
// și formularul îi arată vizitatorului un mesaj de eroare.

function escape(text) {
  return text.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
}


export async function trimiteCererea(cerere) {
  const { RESEND_API_KEY, CERERI_EMAIL_DE_LA } = process.env;
  // Implicit, cererile ajung la adresa de vânzări din lib/site.js.
  const CERERI_EMAIL_CATRE = process.env.CERERI_EMAIL_CATRE || contact.email;

  const randuri = [
    ["Nume", cerere.nume],
    ["Telefon", cerere.telefon],
    ["Mobilă", cerere.mobila.join(", ")],
    ["Localitate", cerere.localitate || "-"],
    ["Detalii", cerere.detalii || "-"],
    ["Poze atașate", String(cerere.poze.length)],
  ];

  if (!RESEND_API_KEY || !CERERI_EMAIL_DE_LA || !CERERI_EMAIL_CATRE) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[cerere-oferta] Email neconfigurat. Cererea primită:\n" + randuri.map((r) => r.join(": ")).join("\n"));
      return;
    }
    throw new Error("Trimiterea pe email nu e configurată (lipsesc variabilele de mediu).");
  }

  const atasamente = await Promise.all(
    cerere.poze.map(async (p, i) => ({
      filename: p.name || `poza-${i + 1}.jpg`,
      content: Buffer.from(await p.arrayBuffer()).toString("base64"),
    })),
  );

  const html = `<table cellpadding="6">${randuri
    .map(([k, v]) => `<tr><td><strong>${k}</strong></td><td>${escape(v).replace(/\n/g, "<br>")}</td></tr>`)
    .join("")}</table>`;

  const raspuns = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: CERERI_EMAIL_DE_LA,
      to: [CERERI_EMAIL_CATRE],
      subject: `Cerere de ofertă: ${cerere.mobila.join(", ")} (${cerere.nume})`,
      html,
      attachments: atasamente,
    }),
  });

  if (!raspuns.ok) {
    throw new Error(`Resend a răspuns ${raspuns.status}: ${await raspuns.text()}`);
  }
}
