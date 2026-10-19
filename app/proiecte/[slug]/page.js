import Link from "next/link";
import { ViewTransition } from "react";
import Image from "@/components/Imagine";
import { notFound } from "next/navigation";
import Breadcrumb from "@/components/Breadcrumb";
import Buton from "@/components/Buton";
import Eticheta3D from "@/components/Eticheta3D";
import CardProiect, { numeTranzitie } from "@/components/CardProiect";
import PerecheRandare from "@/components/PerecheRandare";
import BandaOferta from "@/components/BandaOferta";
import { Galerie, ButonImagine } from "@/components/Galerie";
import { proiectePublicate } from "@/data/proiecte";
import { categorie, perechi, proiectDupaSlug } from "@/lib/proiecte";
import { scurteaza, primaPropozitie } from "@/lib/text";
import styles from "./page.module.css";

export const dynamicParams = false;

export function generateStaticParams() {
  return proiectePublicate.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const proiect = proiectDupaSlug(slug);
  if (!proiect) return {};
  return {
    title: scurteaza(proiect.titlu, 52),
    description: scurteaza(primaPropozitie(proiect.descriere), 155),
    alternates: { canonical: `/proiecte/${slug}` },
    // Imaginea de share e generată la build de scripts/dupa-build.mjs.
    openGraph: {
      type: "article",
      locale: "ro_RO",
      siteName: "Amber Creativity",
      url: `/proiecte/${slug}`,
      images: [{ url: `/og/${slug}.jpg`, width: 1200, height: 630, alt: proiect.imagini[0].alt }],
    },
  };
}

export default async function PaginaProiect({ params }) {
  const { slug } = await params;
  const proiect = proiectDupaSlug(slug);
  if (!proiect) notFound();

  const cat = categorie(proiect.categorie);
  const listaPerechi = perechi(proiect);
  const randariInPereche = new Set(listaPerechi.map((p) => p.randare.src));
  // Galeria: poze reale întâi, apoi randările care nu apar deja alăturat cu poza reală.
  const galerie = proiect.imagini.filter((i) => !randariInPereche.has(i.src));
  const [principala, ...restul] = galerie;

  const inrudite = proiectePublicate
    .filter((p) => p.categorie === proiect.categorie && p.slug !== proiect.slug)
    .sort((a, b) => Number(a.proiect3d) - Number(b.proiect3d))
    .slice(0, 3);

  return (
    <>
      <Galerie imagini={galerie}>
        <section className={`container ${styles.antet}`}>
          <Breadcrumb
            pasi={[
              { nume: "Proiecte", href: "/proiecte" },
              { nume: cat.nume, href: cat.pagina },
              { nume: proiect.titlu, href: `/proiecte/${proiect.slug}` },
            ]}
          />
          <div className={styles.grila}>
            <ButonImagine index={0} alt={principala.alt} className={styles.principala}>
              <ViewTransition name={numeTranzitie(proiect.slug)} share="morf" default="none">
              <Image
                src={principala.src}
                alt={principala.alt}
                width={principala.latime}
                height={principala.inaltime}
                loading="eager"
                fetchPriority="high"
                sizes="(min-width: 1024px) 760px, 100vw"
                className={styles.imgPrincipala}
              />
              </ViewTransition>
              {principala.tip === "randare" ? <Eticheta3D /> : null}
            </ButonImagine>

            <div className={styles.info}>
              <p className={`eticheta ${styles.categorie}`}>
                <Link href={cat.pagina}>{cat.nume}</Link>
              </p>
              <h1 className={styles.titlu}>{proiect.titlu}</h1>
              {proiect.proiect3d ? (
                <p className={styles.nota3d}>
                  <Eticheta3D pozitie="inLinie" /> Imaginile sunt randări ale proiectului, nu poze ale
                  mobilei realizate.
                </p>
              ) : null}
              <p className={styles.descriere}>{proiect.descriere}</p>
              {proiect.colaborare ? (
                <p className={styles.colaborare}>
                  Design interior:{" "}
                  <a href={proiect.colaborare.url} rel="noopener" className="link">
                    {proiect.colaborare.nume}
                  </a>
                </p>
              ) : null}
              <h2 className={styles.subtitlu}>Materiale și finisaje</h2>
              <ul className={styles.materiale}>
                {proiect.materiale.map((m) => (
                  <li key={m}>{m}</li>
                ))}
              </ul>
              <p className={styles.notaMateriale}>Descrise după cum se văd în imagini.</p>
              <div className={styles.actiuni}>
                <Buton href="/cerere-oferta">Cere ofertă</Buton>
                <Link href={cat.pagina} className="link">
                  Vezi toate proiectele din {cat.nume.toLowerCase()}
                </Link>
              </div>
            </div>
          </div>
        </section>

        {restul.length ? (
          <section className={`container ${styles.galerie}`} aria-labelledby="galerie-titlu">
            <h2 id="galerie-titlu" className="ascuns-vizual">
              Mai multe imagini
            </h2>
            <ul className={styles.galerieGrila}>
              {restul.map((img, i) => (
                <li key={img.src}>
                  <ButonImagine index={i + 1} alt={img.alt} className={styles.miniatura}>
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      sizes="(min-width: 1024px) 620px, 50vw"
                      className={styles.imgMiniatura}
                    />
                    {img.tip === "randare" ? <Eticheta3D /> : null}
                  </ButonImagine>
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </Galerie>

      {listaPerechi.length ? (
        <PerecheRandare
          id={proiect.slug}
          titlu="Randare și realizat"
          text="Randarea proiectului alături de mobila realizată, în același spațiu."
          perechi={listaPerechi.map((p, i) => ({
            ...p,
            eticheta: listaPerechi.length > 1 ? `Imaginea ${i + 1}` : undefined,
          }))}
          arataLinkProiect={false}
        />
      ) : null}

      {inrudite.length ? (
        <section className={`container ${styles.inrudite}`} aria-labelledby="inrudite-titlu">
          <h2 id="inrudite-titlu">Alte proiecte: {cat.nume.toLowerCase()}</h2>
          <ul className={styles.inruditeGrila}>
            {inrudite.map((p) => (
              <li key={p.slug}>
                <CardProiect proiect={p} arataCategoria={false} />
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <BandaOferta titlu="Vrei ceva asemănător pentru spațiul tău?" />
    </>
  );
}
