"use client";

import Link from "next/link";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import CardProiect from "@/components/CardProiect";
import ListaTreptata from "@/components/ListaTreptata";
import styles from "./page.module.css";

function link({ categorie, culoare }) {
  const q = new URLSearchParams();
  if (categorie) q.set("categorie", categorie);
  if (culoare) q.set("culoare", culoare);
  const s = q.toString();
  return s ? `/proiecte/?${s}` : "/proiecte/";
}

// proiecte: [{ slug, titlu, categorie, categorii: [...], culori: [...], imagini }], deja ordonate.
function Continut({ proiecte, categorii, familii, categorie, culoare: culoareAleasa }) {
  const activa = categorii.find((c) => c.slug === categorie);
  const culoare = familii.find((c) => c.slug === culoareAleasa);
  const inCategorie = (p, slug) => p.categorii.includes(slug);

  const dupaCategorie = activa ? proiecte.filter((p) => inCategorie(p, activa.slug)) : proiecte;
  const lista = culoare ? dupaCategorie.filter((p) => p.culori.includes(culoare.slug)) : dupaCategorie;

  return (
    <>
      <section className="container">
        <nav aria-label="Filtrează după categorie" className={styles.filtre}>
          <ul>
            <li>
              <Link
                href={link({ culoare: culoare?.slug })}
                scroll={false}
                className={styles.filtru}
                aria-current={!activa ? "page" : undefined}
              >
                Toate
              </Link>
            </li>
            {categorii.map((c) => {
              const n = proiecte.filter(
                (p) => inCategorie(p, c.slug) && (!culoare || p.culori.includes(culoare.slug)),
              ).length;
              return (
                <li key={c.slug}>
                  <Link
                    href={link({ categorie: c.slug, culoare: culoare?.slug })}
                    scroll={false}
                    className={styles.filtru}
                    aria-current={activa?.slug === c.slug ? "page" : undefined}
                  >
                    {c.nume} <span className={styles.numar}>{n}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <nav aria-label="Filtrează după culoare" className={styles.filtreCuloare}>
          <p className={styles.etichetaFiltru}>Culoare</p>
          <ul>
            {familii.map((c) => {
              const n = dupaCategorie.filter((p) => p.culori.includes(c.slug)).length;
              const aleasa = culoare?.slug === c.slug;
              if (!n && !aleasa) return null;
              return (
                <li key={c.slug}>
                  <Link
                    href={link({ categorie: activa?.slug, culoare: aleasa ? undefined : c.slug })}
                    scroll={false}
                    className={`${styles.filtru} ${styles.filtruCuloare}`}
                    aria-current={aleasa ? "true" : undefined}
                    aria-label={aleasa ? `${c.nume}, filtru activ. Elimină filtrul` : `${c.nume}, ${n} proiecte`}
                  >
                    <span className={styles.mostra} style={{ backgroundColor: c.mostra }} aria-hidden="true" />
                    {c.nume}
                    <span className={styles.numar}>{n}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </section>

      <section className="container" aria-label="Lista de proiecte">
        <p className={styles.rezultat} aria-live="polite">
          {lista.length} {lista.length === 1 ? "proiect" : "proiecte"}
          {activa ? `: ${activa.nume.toLowerCase()}` : ""}
          {culoare ? `, culoare: ${culoare.nume.toLowerCase()}` : ""}.
          {activa || culoare ? (
            <>
              {" "}
              <Link href="/proiecte/" scroll={false} className="link">
                Elimină filtrele
              </Link>
            </>
          ) : null}
        </p>
        {activa ? (
          <p className={styles.legatura}>
            Despre {activa.nume.toLowerCase()} la comandă, materiale și ce influențează prețul:{" "}
            <Link href={activa.pagina} className="link">
              pagina {activa.nume}
            </Link>
            .
          </p>
        ) : null}
        {lista.length ? (
          <ListaTreptata key={`${activa?.slug}-${culoare?.slug}`} className={styles.grila}>
            {lista.map((p) => (
              <CardProiect key={p.slug} proiect={p} nivelTitlu={2} />
            ))}
          </ListaTreptata>
        ) : (
          <p className={styles.gol}>
            Nu avem încă proiecte publicate cu această combinație.{" "}
            <Link href={link({ categorie: activa?.slug })} scroll={false} className="link">
              Vezi toate culorile
            </Link>
            .
          </p>
        )}
      </section>
    </>
  );
}

function CuFiltreDinAdresa(props) {
  const sp = useSearchParams();
  return <Continut {...props} categorie={sp.get("categorie")} culoare={sp.get("culoare")} />;
}

// Filtrele se citesc din adresă (?categorie=, ?culoare=) în browser. HTML-ul static conține
// lista completă, nefiltrată, deci toate proiectele rămân vizibile pentru motoarele de căutare.
export default function ListaProiecte(props) {
  return (
    <Suspense fallback={<Continut {...props} />}>
      <CuFiltreDinAdresa {...props} />
    </Suspense>
  );
}
