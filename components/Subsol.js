import Link from "next/link";
import Image from "next/image";
import Todo from "./Todo";
import { categorii, paginiProduse } from "@/data/proiecte";
import { adresaText, contact, site, linkTelefon, linkWhatsapp } from "@/lib/site";
import styles from "./Subsol.module.css";

const linkuriSite = [
  { href: "/mobila-la-comanda", eticheta: "Mobilă la comandă" },
  { href: "/proiecte", eticheta: "Proiecte" },
  { href: "/ghiduri", eticheta: "Ghiduri" },
  { href: "/despre", eticheta: "Despre" },
  { href: "/contact", eticheta: "Contact" },
  { href: "/cerere-oferta", eticheta: "Cere ofertă" },
];

export default function Subsol() {
  const social = Object.entries(contact.social).filter(([, url]) => url);
  const numeSocial = { tiktok: "TikTok", instagram: "Instagram", facebook: "Facebook" };
  // În producție, coloana de contact apare doar după ce există date în lib/site.js.
  const areContact = Boolean(
    contact.telefon || contact.email || contact.adresaShowroom || social.length,
  );

  return (
    <footer className={`inchis ${styles.subsol}`} data-ascunde-cta>
      <div className={`container ${styles.grila}`}>
        <div className={styles.firma}>
          <Image
            src="/brand/amber-logo-pe-inchis.svg"
            alt="Amber"
            width={195}
            height={30}
            unoptimized
            className={styles.logo}
          />
          <p>
            Producător de mobilier la comandă, cu fabrică proprie și showroom în {site.oras}. Lucrăm
            cu clienți din toată țara.
          </p>
        </div>

        <nav aria-label="Categorii" className={styles.coloana}>
          <h2 className={`eticheta ${styles.titlu}`}>Mobilă la comandă</h2>
          <ul>
            {[...categorii, ...paginiProduse].map((c) => (
              <li key={c.slug}>
                <Link href={c.pagina}>{c.nume}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Pagini" className={styles.coloana}>
          <h2 className={`eticheta ${styles.titlu}`}>Site</h2>
          <ul>
            {linkuriSite.map((l) => (
              <li key={l.href}>
                <Link href={l.href}>{l.eticheta}</Link>
              </li>
            ))}
          </ul>
        </nav>

        {areContact || process.env.NODE_ENV !== "production" ? (
          <div className={styles.coloana}>
            <h2 className={`eticheta ${styles.titlu}`}>Contact</h2>
            <ul>
              {contact.telefon ? (
                <li>
                  <a href={linkTelefon(contact.telefon)}>{contact.telefon}</a>
                </li>
              ) : (
                <Todo ca="li">telefon</Todo>
              )}
              {contact.whatsapp ? (
                <li>
                  <a href={linkWhatsapp(contact.whatsapp)}>WhatsApp</a>
                </li>
              ) : null}
              {contact.email ? (
                <li>
                  <a href={`mailto:${contact.email}`}>{contact.email}</a>
                </li>
              ) : (
                <Todo ca="li">email</Todo>
              )}
              {contact.adresaShowroom ? (
                <li className={styles.adresa}>
                  <span className={styles.etichetaAdresa}>Showroom</span>
                  {adresaText(contact.adresaShowroom)}
                </li>
              ) : null}
              {contact.adresaFabrica ? (
                <li className={styles.adresa}>
                  <span className={styles.etichetaAdresa}>Fabrică</span>
                  {adresaText(contact.adresaFabrica)}
                </li>
              ) : null}
              {!contact.program ? <Todo ca="li">programul showroom-ului</Todo> : null}
              {social.map(([retea, url]) => (
                <li key={retea}>
                  <a href={url} rel="noopener">
                    {numeSocial[retea]}
                  </a>
                </li>
              ))}
              {social.length === 0 ? <Todo ca="li">linkuri TikTok, Instagram, Facebook</Todo> : null}
            </ul>
          </div>
        ) : null}
      </div>

      <div className={`container ${styles.jos}`}>
        <p>
          © {new Date().getFullYear()} {site.numeLegal}
          {contact.cui ? `, CUI ${contact.cui}` : null}
          {contact.regCom ? `, Nr. Reg. Com. ${contact.regCom}` : null}
          {contact.sediuSocial ? `, sediu social: ${contact.sediuSocial}` : null}
        </p>
        {!contact.cui ? <Todo>CUI, Nr. Reg. Com., sediu social</Todo> : null}
        <ul className={styles.legale}>
          <li>
            <Link href="/politica-de-confidentialitate">Politica de confidențialitate</Link>
          </li>
          <li>
            <Link href="/cookies">Cookies</Link>
          </li>
          <li>
            <a href="https://reclamatiisal.anpc.ro/" rel="noopener">
              ANPC, soluționarea alternativă a litigiilor
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
