import "server-only";
import { domenii, formateazaMarime } from "@/lib/cerere";
import { contact } from "@/lib/site";

// Trimiterea cererilor de ofertă prin email.
// TODO: de completat de Alex, odată cu hosting-ul. Varianta pregătită folosește Resend (resend.com)
// prin API, fără dependențe în plus. Variabile de mediu:
//   RESEND_API_KEY        cheia API
//   CERERI_EMAIL_DE_LA    adresa expeditorului, de pe un domeniu verificat (ex. „cereri@ambermob.ro”)
//   CERERI_EMAIL_CATRE    opțional; implicit vanzari@ambermob.ro (contact.email)
//   RESEND_API_URL        opțional; doar pentru teste locale cu un server care imită Resend
// Fără cheie: în dezvoltare cererea se afișează în consolă; în producție trimiterea eșuează
// și formularul îi arată vizitatorului un mesaj de eroare.

function escape(text) {
  return String(text).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
}

// Atașamentele primesc nume scurte și ordonate (plan.pdf, poza-1.jpg…); numele original apare în listă.
function extensie(nume) {
  const m = /\.([a-z0-9]{2,5})$/i.exec(String(nume || ""));
  return m ? `.${m[1].toLowerCase()}` : "";
}

// Conținutul emailului, în secțiuni. Exportat separat ca să poată fi verificat fără trimitere.
export function compuneEmail(cerere) {
  const domeniu = domenii.find((d) => d.valoare === cerere.domeniu)?.eticheta ?? "-";
  const mobila =
    cerere.formaEticheta && cerere.mobila[0] === "Bucătărie"
      ? `Bucătărie ${cerere.formaEticheta}`
      : cerere.mobila.join(", ");

  const atasamente = [
    ...(cerere.plan ? [{ fisier: cerere.plan, nume: `plan${extensie(cerere.plan.name)}`, rol: "Plan" }] : []),
    ...cerere.poze.map((p, i) => ({ fisier: p, nume: `poza-${i + 1}${extensie(p.name)}`, rol: `Poza ${i + 1}` })),
  ];

  const sectiuni = [
    {
      titlu: "Contact",
      randuri: [
        ["Nume", cerere.nume],
        ["Telefon", cerere.telefon, `tel:${cerere.telefon.replace(/[^\d+]/g, "")}`],
        ["Localitate", cerere.localitate || "nu a completat"],
      ],
    },
    {
      titlu: "Proiect",
      randuri: [
        ["Ce mobilează", domeniu],
        ["Mobilă", mobila],
        ...(cerere.numarPereti ? [["Pereți cu mobilă", String(cerere.numarPereti)]] : []),
        ["Buget orientativ", cerere.buget || "nu a ales"],
      ],
    },
    {
      titlu: "Dimensiuni (cm, aproximative)",
      randuri: cerere.dimensiuni.length
        ? cerere.dimensiuni.map((d) => [d.eticheta, `${d.valoare} cm`])
        : [["", cerere.domeniu === "o-camera" ? "Nu a trimis dimensiuni." : "Pentru mai multe camere nu se cer pe pereți: vezi planul la atașamente, dacă a fost trimis."]],
    },
    {
      titlu: "Alte detalii",
      randuri: [["", cerere.detalii || "nu a completat"]],
    },
    {
      titlu: `Atașamente (${atasamente.length})`,
      randuri: atasamente.length
        ? atasamente.map((a) => [a.rol, `${a.nume} · ${formateazaMarime(a.fisier.size)} (trimis ca „${a.fisier.name}”)`])
        : [["", "Fără atașamente."]],
    },
  ];

  const subiect = `Cerere de ofertă: ${mobila} · ${domeniu.toLowerCase()} · ${cerere.nume}`;

  const rezumat = [domeniu, mobila, cerere.buget].filter(Boolean).join(" · ");
  const celula = "padding:6px 12px 6px 0;vertical-align:top;font-size:15px;line-height:1.45;";
  const html = `<!doctype html><html lang="ro"><body style="margin:0;padding:24px;background:#FAF8F4;font-family:Arial,Helvetica,sans-serif;color:#111111;">
<div style="max-width:640px;margin:0 auto;background:#FFFFFF;border:1px solid #E6E1D8;">
<div style="height:6px;width:96px;background:#FFD100;margin-left:24px;"></div>
<div style="padding:20px 24px 8px;">
<h1 style="margin:0 0 4px;font-size:20px;">Cerere de ofertă nouă</h1>
<p style="margin:0;color:#5E5A55;font-size:15px;">${escape(rezumat)}</p>
</div>
${sectiuni
  .map(
    (s) => `<div style="padding:16px 24px;border-top:1px solid #E6E1D8;">
<h2 style="margin:0 0 8px;font-size:12px;letter-spacing:0.12em;text-transform:uppercase;color:#5E5A55;">${escape(s.titlu)}</h2>
<table cellpadding="0" cellspacing="0" style="border-collapse:collapse;width:100%;">${s.randuri
      .map(([k, v, link]) => {
        const valoare = link
          ? `<a href="${escape(link)}" style="color:#111111;">${escape(v)}</a>`
          : escape(v).replace(/\n/g, "<br>");
        return k
          ? `<tr><td style="${celula}color:#5E5A55;width:42%;">${escape(k)}</td><td style="${celula}font-weight:bold;">${valoare}</td></tr>`
          : `<tr><td colspan="2" style="${celula}">${valoare}</td></tr>`;
      })
      .join("")}</table>
</div>`,
  )
  .join("\n")}
</div>
</body></html>`;

  const textSimplu = [
    "Cerere de ofertă nouă",
    rezumat,
    "",
    ...sectiuni.flatMap((s) => [
      s.titlu.toUpperCase(),
      ...s.randuri.map(([k, v]) => (k ? `${k}: ${v}` : v)),
      "",
    ]),
  ].join("\n");

  return { subiect, html, text: textSimplu, atasamente };
}

export async function trimiteCererea(cerere) {
  const { RESEND_API_KEY, CERERI_EMAIL_DE_LA } = process.env;
  // Implicit, cererile ajung la adresa de vânzări din lib/site.js.
  const CERERI_EMAIL_CATRE = process.env.CERERI_EMAIL_CATRE || contact.email;
  const email = compuneEmail(cerere);

  if (!RESEND_API_KEY || !CERERI_EMAIL_DE_LA || !CERERI_EMAIL_CATRE) {
    if (process.env.NODE_ENV !== "production") {
      console.info(`[cerere-oferta] Email neconfigurat. Cererea primită:\n${email.subiect}\n\n${email.text}`);
      return;
    }
    throw new Error("Trimiterea pe email nu e configurată (lipsesc variabilele de mediu).");
  }

  const attachments = await Promise.all(
    email.atasamente.map(async (a) => ({
      filename: a.nume,
      content: Buffer.from(await a.fisier.arrayBuffer()).toString("base64"),
    })),
  );

  const raspuns = await fetch(process.env.RESEND_API_URL || "https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: CERERI_EMAIL_DE_LA,
      to: [CERERI_EMAIL_CATRE],
      subject: email.subiect,
      html: email.html,
      text: email.text,
      attachments,
    }),
  });

  if (!raspuns.ok) {
    throw new Error(`Resend a răspuns ${raspuns.status}: ${await raspuns.text()}`);
  }
}
