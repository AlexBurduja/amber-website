import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumb from "@/components/Breadcrumb";
import BandaOferta from "@/components/BandaOferta";
import CardProiect from "@/components/CardProiect";
import JsonLd from "@/components/JsonLd";
import TextCuLinkuri from "@/components/TextCuLinkuri";
import { ghiduri, ghidDupaSlug } from "@/data/ghiduri";
import { imagineDupaNumar, proiectDupaSlug } from "@/lib/proiecte";
import { schemaArticol } from "@/lib/schema";
import { faraLinkuri, numarCuvinte } from "@/lib/text";
import { og } from "@/lib/metadata";
import styles from "./page.module.css";

export const dynamicParams = false;

export function generateStaticParams() {
  return ghiduri.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const g = ghidDupaSlug(slug);
  if (!g) return {};
  const pagina = `/ghiduri/${g.slug}`;
  return {
    title: g.title,
    description: g.descriere,
    alternates: { canonical: pagina },
    openGraph: og(pagina, { type: "article", publishedTime: g.publicat }),
  };
}

const luni = [
  "ianuarie",
  "februarie",
  "martie",
  "aprilie",
  "mai",
  "iunie",
  "iulie",
  "august",
  "septembrie",
  "octombrie",
  "noiembrie",
  "decembrie",
];

function dataText(iso) {
  const [an, luna, zi] = iso.split("-").map(Number);
  return `${zi} ${luni[luna - 1]} ${an}`;
}

function textGhid(g) {
  return [
    ...g.intro,
    ...g.sectiuni.flatMap((s) => [s.titlu, ...s.paragrafe, ...(s.lista ?? [])]),
  ]
    .map(faraLinkuri)
    .join(" ");
}

export default async function PaginaGhid({ params }) {
  const { slug } = await params;
  const g = ghidDupaSlug(slug);
  if (!g) notFound();

  const pagina = `/ghiduri/${g.slug}`;
  const proiecte = g.proiecte.map(proiectDupaSlug).filter(Boolean);
  const imagine = imagineDupaNumar(...g.imagine);

  return (
    <>
      <article className={`container ${styles.pagina}`}>
        <Breadcrumb
          pasi={[
            { nume: "Ghiduri", href: "/ghiduri" },
            { nume: g.titlu, href: pagina },
          ]}
        />
        <p className={`eticheta ${styles.eticheta}`}>Ghid</p>
        <h1 className={styles.titlu}>{g.titlu}</h1>
        <p className={styles.data}>
          Publicat pe <time dateTime={g.publicat}>{dataText(g.publicat)}</time>
        </p>

        <div className={styles.text}>
          <div className={styles.intro}>
            {g.intro.map((p) => (
              <p key={p}>
                <TextCuLinkuri text={p} />
              </p>
            ))}
          </div>

          {g.sectiuni.map((s) => (
            <section key={s.titlu}>
              <h2>{s.titlu}</h2>
              {s.paragrafe.map((p) => (
                <p key={p}>
                  <TextCuLinkuri text={p} />
                </p>
              ))}
              {s.lista?.length ? (
                <ul>
                  {s.lista.map((li) => (
                    <li key={li}>
                      <TextCuLinkuri text={li} />
                    </li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}
        </div>

        {proiecte.length ? (
          <section className={styles.proiecte} aria-labelledby="proiecte-titlu">
            <h2 id="proiecte-titlu">Din proiectele noastre</h2>
            <ul className={styles.grila}>
              {proiecte.map((p) => (
                <li key={p.slug}>
                  <CardProiect proiect={p} arataCategoria={false} tranzitie={false} />
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <section className={styles.legaturi} aria-labelledby="legaturi-titlu">
          <h2 id="legaturi-titlu">Pagini utile</h2>
          <ul className={styles.listaLegaturi}>
            {g.legaturi.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="link">
                  {l.text}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/ghiduri" className="link">
                Toate ghidurile
              </Link>
            </li>
          </ul>
        </section>
      </article>

      <BandaOferta
        titlu="Ai dimensiunile? Cere o ofertă."
        text="Formularul te ghidează dimensiune cu dimensiune. Pentru o ofertă ne ajung numele, telefonul și tipul de mobilă; restul îl poți adăuga pe parcurs."
      />

      <JsonLd
        date={schemaArticol({
          titlu: g.titlu,
          descriere: g.descriere,
          pagina,
          imagine: imagine?.src,
          publicat: g.publicat,
          cuvinte: numarCuvinte(textGhid(g)),
        })}
      />
    </>
  );
}
