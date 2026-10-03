import Link from "next/link";
import CardProiect from "@/components/CardProiect";
import BandaOferta from "@/components/BandaOferta";
import Breadcrumb from "@/components/Breadcrumb";
import ListaTreptata from "@/components/ListaTreptata";
import { categorii, proiectePublicate } from "@/data/proiecte";
import { areCuloarea, familiiCuloare } from "@/lib/culori";
import { og } from "@/lib/metadata";
import styles from "./page.module.css";

export const metadata = {
  title: "Proiecte de mobilă la comandă",
  description:
    "Bucătării, dormitoare, dressinguri, living, hol, baie și spații comerciale: proiecte de mobilă la comandă, cu poze reale și randări 3D marcate separat.",
  alternates: { canonical: "/proiecte" },
  openGraph: og("/proiecte"),
};

function ordoneaza(lista) {
  // Pozele reale întâi; proiectele care au doar randări la final.
  return [...lista].sort((a, b) => Number(a.proiect3d) - Number(b.proiect3d));
}

function inCategorie(p, slug) {
  return p.categorie === slug || p.categoriiSecundare?.includes(slug);
}

function link({ categorie, culoare }) {
  const q = new URLSearchParams();
  if (categorie) q.set("categorie", categorie);
  if (culoare) q.set("culoare", culoare);
  const s = q.toString();
  return s ? `/proiecte?${s}` : "/proiecte";
}

export default async function Proiecte({ searchParams }) {
  const sp = await searchParams;
  const activa = categorii.find((c) => c.slug === sp.categorie);
  const culoare = familiiCuloare.find((c) => c.slug === sp.culoare);

  const dupaCategorie = activa ? proiectePublicate.filter((p) => inCategorie(p, activa.slug)) : proiectePublicate;
  const lista = ordoneaza(culoare ? dupaCategorie.filter((p) => areCuloarea(p.slug, culoare.slug)) : dupaCategorie);

  return (
    <>
      <section className={`container ${styles.antet}`}>
        <Breadcrumb pasi={[{ nume: "Proiecte", href: "/proiecte" }]} />
        <h1 className={styles.titlu}>Proiecte</h1>
        <p className={`text-lung ${styles.intro}`}>
          Mobilă făcută pe comandă pentru case, apartamente și spații comerciale. Proiectele care au
          doar randări sunt marcate „Proiect 3D”.
        </p>

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
              const n = proiectePublicate.filter(
                (p) => inCategorie(p, c.slug) && (!culoare || areCuloarea(p.slug, culoare.slug)),
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
            {familiiCuloare.map((c) => {
              const n = dupaCategorie.filter((p) => areCuloarea(p.slug, c.slug)).length;
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
              <Link href="/proiecte" scroll={false} className="link">
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

      <div className={styles.spatiu} />
      <BandaOferta />
    </>
  );
}
