import Link from "next/link";
import Navigatie from "./Navigatie";
import LogoAntet from "./LogoAntet";
import Buton from "./Buton";
import { categorii } from "@/data/proiecte";
import { contact, linkTelefon } from "@/lib/site";
import styles from "./Antet.module.css";

export default function Antet() {
  const linkuriCategorii = [
    ...categorii.map((c) => ({ href: c.pagina, eticheta: c.nume })),
    { href: "/mobila-la-comanda", eticheta: "Toată mobila la comandă" },
  ];

  return (
    <header className={styles.antet}>
      <div className={`container ${styles.rand}`}>
        <Link href="/" className={styles.logo} aria-label="Amber, pagina principală">
          <LogoAntet />
        </Link>

        <Navigatie categorii={linkuriCategorii} telefon={contact.telefon} />

        <div className={styles.actiuni}>
          {contact.telefon ? (
            <a href={linkTelefon(contact.telefon)} className={styles.telefon}>
              {contact.telefon}
            </a>
          ) : null}
          <Buton href="/cerere-oferta" marime="mic" className={styles.oferta}>
            Cere ofertă
          </Buton>
        </div>
      </div>
    </header>
  );
}
