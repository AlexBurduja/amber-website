import Link from "next/link";
import {
  Phone,
  WhatsappLogo,
  EnvelopeSimple,
  MapPin,
  Clock,
  Factory,
} from "@phosphor-icons/react/dist/ssr";
import Breadcrumb from "@/components/Breadcrumb";
import Buton from "@/components/Buton";
import Todo from "@/components/Todo";
import Harta from "./Harta";
import Image from "@/components/Imagine";
import { pozeShowroom } from "@/data/showroom";
import {
  adresaText as formateazaAdresa,
  contact,
  linkTelefon,
  linkWhatsapp,
  site,
} from "@/lib/site";
import styles from "./page.module.css";
import { og } from "@/lib/metadata";

export const metadata = {
  title: "Contact și showroom",
  description:
    "Contact Amber Creativity: +40 773 371 044, vanzari@ambermob.ro. Showroom pe Șos. Colentina 447-449 și fabrică pe Șos. Andronache 183, București.",
  alternates: { canonical: "/contact" },
  openGraph: og("/contact"),
};

function Rand({ icon: Icon, eticheta, children }) {
  return (
    <div className={styles.rand}>
      <dt>
        <Icon size={22} aria-hidden="true" className={styles.icon} />
        {eticheta}
      </dt>
      <dd>{children}</dd>
    </div>
  );
}

// În producție, rândurile fără date nu se afișează (în dezvoltare apar ca TODO).
const dev = process.env.NODE_ENV !== "production";

export default function Contact() {
  const adresaText = contact.adresaShowroom ? formateazaAdresa(contact.adresaShowroom) : null;
  const adresaFabrica = contact.adresaFabrica ? formateazaAdresa(contact.adresaFabrica) : null;
  const linkHarta = (a) =>
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(a)}`;

  return (
    <>
      <section className={`container ${styles.antet}`}>
        <Breadcrumb pasi={[{ nume: "Contact", href: "/contact" }]} />
        <h1 className={styles.titlu}>Contact</h1>
        <span className={styles.sertar} aria-hidden="true" />
        <p className={styles.intro}>
          Ne poți suna, ne poți scrie sau poți trece pe la showroom-ul nostru din {site.oras}, care
          e deschis publicului. Dacă știi deja ce mobilă îți trebuie, cel mai simplu e să{" "}
          <Link href="/cerere-oferta" className="link">
            trimiți o cerere de ofertă
          </Link>
          .
        </p>
      </section>

      <section className={`container ${styles.grila}`} aria-label="Date de contact">
        <div>
          <dl className={styles.date}>
            {(contact.telefon || dev) && (
              <Rand icon={Phone} eticheta="Telefon vânzări">
                {contact.telefon ? (
                  <a href={linkTelefon(contact.telefon)} className={styles.valoareMare}>
                    {contact.telefon}
                  </a>
                ) : (
                  <Todo>telefon</Todo>
                )}
              </Rand>
            )}
            {(contact.whatsapp || dev) && (
              <Rand icon={WhatsappLogo} eticheta="WhatsApp">
                {contact.whatsapp ? (
                  <a href={linkWhatsapp(contact.whatsapp)} className="link">
                    Scrie-ne pe WhatsApp
                  </a>
                ) : (
                  <Todo>WhatsApp</Todo>
                )}
              </Rand>
            )}
            {(contact.email || dev) && (
              <Rand icon={EnvelopeSimple} eticheta="Email">
                {contact.email ? (
                  <a href={`mailto:${contact.email}`} className="link">
                    {contact.email}
                  </a>
                ) : (
                  <Todo>email</Todo>
                )}
              </Rand>
            )}
          </dl>

          {adresaFabrica ? (
            <div className={styles.fabrica}>
              <h2 className={styles.titluFabrica}>
                <Factory size={22} aria-hidden="true" className={styles.icon} />
                Fabrica
              </h2>
              <p>{adresaFabrica}</p>
              <p className={styles.notaFabrica}>
                Aici se produce toată mobila, de la debitare la tapițerie.
              </p>
              <a href={linkHarta(adresaFabrica)} className="link" rel="noopener">
                Vezi pe hartă
              </a>
            </div>
          ) : null}
        </div>

        <div className={styles.showroom}>
          <h2>Showroom în {site.oras}</h2>
          <p className={styles.showroomText}>
            Showroom-ul e deschis publicului. Sună-ne înainte să vii, ca să ne putem face timp pentru tine.
          </p>
          <dl className={styles.date}>
            {(adresaText || dev) && (
              <Rand icon={MapPin} eticheta="Adresa">
                {adresaText ?? <Todo>adresa showroom-ului, exact ca în Google Business</Todo>}
              </Rand>
            )}
            {(contact.program || dev) && (
              <Rand icon={Clock} eticheta="Program">
                {contact.program ? (
                  <ul className={styles.program}>
                    {contact.program.map((p) => (
                      <li key={p.zile}>
                        <span>{p.zile}</span>
                        <span>{p.ore}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <Todo>programul showroom-ului</Todo>
                )}
              </Rand>
            )}
          </dl>
          {adresaText && !contact.googleBusiness ? (
            <p className={styles.google}>
              <a href={linkHarta(adresaText)} className="link" rel="noopener">
                Deschide în Google Maps
              </a>
            </p>
          ) : null}
          {contact.googleBusiness ? (
            <p className={styles.google}>
              <a href={contact.googleBusiness} className="link" rel="noopener">
                Deschide în Google Maps
              </a>
            </p>
          ) : null}
          <ul className={styles.pozeShowroom}>
            {pozeShowroom.map((p, i) => (
              <li key={p.src}>
                <Image
                  src={p.src}
                  alt={p.alt}
                  width={p.latime}
                  height={p.inaltime}
                  loading={i < 2 ? "eager" : "lazy"}
                  sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
                  className={styles.pozaShowroom}
                />
              </li>
            ))}
          </ul>
          {adresaText ? <Harta adresa={adresaText} /> : null}
        </div>
      </section>

      <section className={styles.banda} aria-labelledby="contact-oferta">
        <div className={`container ${styles.bandaRand}`}>
          <div>
            <h2 id="contact-oferta">Vrei o ofertă?</h2>
            <p>Formularul cere doar numele, telefonul și tipul de mobilă. Restul e opțional.</p>
          </div>
          <Buton href="/cerere-oferta">Cere ofertă</Buton>
        </div>
      </section>
    </>
  );
}
