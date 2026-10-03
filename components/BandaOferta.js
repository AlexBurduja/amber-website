import Buton from "./Buton";
import { contact, linkTelefon, linkWhatsapp } from "@/lib/site";
import styles from "./BandaOferta.module.css";

// Singura secțiune cu fundal galben de pe pagină (CLAUDE.md §2).
export default function BandaOferta({
  titlu = "Spune-ne ce mobilă îți trebuie.",
  text = "Pentru o ofertă ne ajung numele, telefonul și tipul de mobilă. Dacă ai dimensiunile sau câteva poze ale spațiului, trimite-le și pe ele.",
}) {
  return (
    <section className={styles.banda} aria-labelledby="banda-oferta-titlu" data-ascunde-cta>
      <div className={`container ${styles.rand}`}>
        <div className={styles.text}>
          <h2 id="banda-oferta-titlu">{titlu}</h2>
          <p>{text}</p>
        </div>
        <div className={styles.butoane}>
          <Buton href="/cerere-oferta" varianta="ink">
            Cere ofertă
          </Buton>
          {contact.telefon ? (
            <Buton href={linkTelefon(contact.telefon)} varianta="contur">
              {contact.telefon}
            </Buton>
          ) : null}
          {contact.whatsapp ? (
            <Buton href={linkWhatsapp(contact.whatsapp)} varianta="contur">
              WhatsApp
            </Buton>
          ) : null}
        </div>
      </div>
    </section>
  );
}
