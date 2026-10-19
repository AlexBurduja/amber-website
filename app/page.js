import Link from "next/link";
import Image from "@/components/Imagine";
import HeroImagini from "@/components/HeroImagini";
import Buton from "@/components/Buton";
import CardProiect from "@/components/CardProiect";
import RandProiecte from "@/components/RandProiecte";
import PerecheRandare from "@/components/PerecheRandare";
import CumLucram from "@/components/CumLucram";
import Fabrica from "@/components/Fabrica";
import ToataTara from "@/components/ToataTara";
import BandaOferta from "@/components/BandaOferta";
import { categorii } from "@/data/proiecte";
import { imagineDupaNumar, numarProiecte, perechi, proiectDupaSlug } from "@/lib/proiecte";
import styles from "./page.module.css";
import { og } from "@/lib/metadata";

export const metadata = {
  title: { absolute: "Mobilă la comandă din fabrica proprie, București | Amber" },
  description:
    "Producător de mobilier la comandă: bucătării, dressinguri, dormitoare și living, făcute în fabrica noastră din București. Proiect 3D și montaj propriu.",
  alternates: { canonical: "/" },
  openGraph: og("/"),
};

// Trei poze reale, din trei camere diferite. Prima e imaginea principală a paginii (LCP).
const slideuriHero = [
  ["bucatarie-verde-salvie-peninsula-lamele", 1],
  ["perete-tv-alb-stejar-lamele", 1],
  ["dormitor-crem-tablie-capitonata", 1],
].map(([slug, nr]) => ({ slug, titlu: proiectDupaSlug(slug).titlu, imagine: imagineDupaNumar(slug, nr) }));

const mozaic = [
  { categorie: "bucatarii", zona: "a", imagine: ["bucatarie-verde-inchis-riflaj-insula", 1] },
  { categorie: "dormitoare", zona: "b", imagine: ["dormitor-mansarda-dulapuri-crem", 1] },
  { categorie: "living", zona: "c", imagine: ["perete-tv-alb-nisa-neagra", 1] },
  { categorie: "hol", zona: "d", imagine: ["hol-dulapuri-bej-nisa-stejar-etajera-colt", 1] },
  { categorie: "baie", zona: "e", imagine: ["baie-bej-riflaj-blat-lemn", 1] },
  { categorie: "dressinguri", zona: "f", imagine: ["dressing-birou-masa-machiaj", 2] },
  { categorie: "comercial", zona: "g", imagine: ["birou-executiv-alb-lucios-furnir", 1] },
];

const proiecteAlese = [
  "bucatarie-verde-inchis-riflaj-insula",
  "perete-tv-alb-nisa-neagra",
  "dormitor-mansarda-dulapuri-crem",
  "camera-fetita-roz-pat-casuta",
  "baie-alba-blat-suspendat-oglinda",
  "dressing-birou-masa-machiaj",
];

// Doar perechile cu unghiuri apropiate (comparator: true în date), afișate cu slider.
const perechiAlese = [
  ["bucatarie-bej-mat-lemn-masiv", "Bucătărie bej"],
  ["bucatarie-cappuccino-lucios-alb", "Bucătărie cappuccino"],
  ["living-comoda-tv-alb-negru", "Living alb și negru"],
  ["bucatarie-gri-albastru-lamele-lemn", "Bucătărie gri-albastru"],
];

const detalii = [
  { zona: "a", slug: "masa-lemn-rasina-albastra", nr: 2, text: "Lemn masiv cu rășină turnată în golurile naturale." },
  { zona: "c", slug: "bucatarie-verde-inchis-riflaj-insula", nr: 4, text: "Front riflat verde, cu buton negru." },
  { zona: "b", slug: "baie-bej-riflaj-blat-lemn", nr: 3, text: "Sertare riflate într-o baie bej." },
  { zona: "d", slug: "dormitor-mansarda-impletitura-turcoaz", nr: 4, text: "Mască de calorifer cu panouri din împletitură." },
  { zona: "e", slug: "bucatarie-verde-menta-clasica", nr: 3, text: "Sertar verde mentă cu front cu ramă." },
];

export default function Acasa() {
  const perechiHome = perechiAlese.map(([slug, eticheta]) => {
    const proiect = proiectDupaSlug(slug);
    return { ...perechi(proiect)[0], proiect, eticheta };
  });

  return (
    <>
      <section className={`inchis ${styles.hero}`}>
        <div className={styles.heroText}>
          <h1>Mobilă la comandă, produsă în fabrica noastră</h1>
          <span className={styles.sertar} aria-hidden="true" />
          <p className={styles.heroSub}>
            Producător de mobilier la comandă, cu fabrică proprie în București. Proiectăm, producem
            și montăm cu echipa noastră. Lucrăm în toată țara.
          </p>
          <div className={styles.heroActiuni}>
            <Buton href="/cerere-oferta">Cere ofertă</Buton>
            <Link href="/proiecte" className={`link ${styles.heroLink}`}>
              Vezi proiectele
            </Link>
          </div>
        </div>
        <div className={styles.heroMedia}>
          <HeroImagini slideuri={slideuriHero} />
        </div>
      </section>

      <section className={styles.categorii} aria-labelledby="categorii-titlu">
        <div className="container">
          <h2 id="categorii-titlu">Ce facem</h2>
          <ul className={styles.mozaic}>
            {mozaic.map((m) => {
              const c = categorii.find((x) => x.slug === m.categorie);
              const img = imagineDupaNumar(...m.imagine);
              const n = numarProiecte(m.categorie);
              return (
                <li
                  key={m.categorie}
                  className={`${styles.celula} ${m.zona === "a" ? styles.celulaMare : ""}`}
                  style={{ gridArea: m.zona }}
                >
                  <Link href={c.pagina} className={styles.celulaLink}>
                    <div className={styles.celulaMedia}>
                      <Image
                        src={img.src}
                        alt=""
                        fill
                        sizes={
                          m.zona === "a"
                            ? "(min-width: 1024px) 640px, 100vw"
                            : "(min-width: 1024px) 320px, 50vw"
                        }
                        className={styles.celulaImg}
                      />
                    </div>
                    <span className={styles.celulaText}>
                      <span className={styles.celulaNume}>{c.nume}</span>
                      <span className={styles.celulaNumar}>
                        {n} {n === 1 ? "proiect" : "proiecte"}
                      </span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <Fabrica cuLink />

      <section className={styles.proiecte} aria-labelledby="proiecte-titlu">
        <div className={`container ${styles.proiecteAntet}`}>
          <h2 id="proiecte-titlu">Proiecte realizate</h2>
          <Link href="/proiecte" className="link">
            Vezi proiectele
          </Link>
        </div>
        <RandProiecte eticheta="Proiecte realizate">
          {proiecteAlese.map((slug) => {
            const p = proiectDupaSlug(slug);
            return (
              <CardProiect
                key={slug}
                proiect={p}
                mod="rand"
                sizes="(min-width: 768px) 640px, 82vw"
              />
            );
          })}
        </RandProiecte>
      </section>

      <PerecheRandare
        id="acasa"
        titlu="Randare și realizat"
        text="Înainte de producție primești proiectul 3D: randări și schițe pe care le validezi. Aici vezi câteva randări lângă mobila realizată după ele."
        perechi={perechiHome}
      />

      <CumLucram />

      <section className={styles.detalii} aria-labelledby="detalii-titlu">
        <div className="container">
          <h2 id="detalii-titlu">Detaliile se văd de aproape</h2>
          <p className={`text-lung ${styles.detaliiIntro}`}>
            Riflaj, împletitură, lemn masiv, fronturi cu ramă. Câteva detalii din proiectele
            realizate.
          </p>
          <ul className={styles.detaliiGrila}>
            {detalii.map((d) => {
              const img = imagineDupaNumar(d.slug, d.nr);
              const p = proiectDupaSlug(d.slug);
              return (
                <li key={d.slug} style={{ gridArea: d.zona }} className={styles.detaliu}>
                  <Link href={`/proiecte/${d.slug}`} className={styles.detaliuLink}>
                    <div className={styles.detaliuMedia}>
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        sizes="(min-width: 1024px) 600px, 50vw"
                        className={styles.detaliuImg}
                      />
                    </div>
                    <p className={styles.detaliuText}>
                      {d.text} <span className={styles.detaliuProiect}>Din proiectul: {p.titlu}</span>
                    </p>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <ToataTara />

      <BandaOferta />
    </>
  );
}
