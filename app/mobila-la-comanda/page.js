import Link from "next/link";
import Image from "next/image";
import Breadcrumb from "@/components/Breadcrumb";
import Buton from "@/components/Buton";
import CumLucram from "@/components/CumLucram";
import ToataTara from "@/components/ToataTara";
import Fabrica from "@/components/Fabrica";
import MaterialeFeronerie from "@/components/MaterialeFeronerie";
import IntrebariFrecvente from "@/components/IntrebariFrecvente";
import BandaOferta from "@/components/BandaOferta";
import { categorii } from "@/data/proiecte";
import { continutCategorii } from "@/data/categorii";
import { imagineDupaNumar, numarProiecte } from "@/lib/proiecte";
import styles from "./page.module.css";
import { og } from "@/lib/metadata";

export const metadata = {
  title: "Mobilă la comandă: bucătării, dormitoare, living",
  description:
    "Mobilă la comandă din fabrica noastră din București: ofertă estimativă din dimensiunile tale, proiect 3D, producție proprie și montaj cu echipa noastră.",
  alternates: { canonical: "/mobila-la-comanda" },
  openGraph: og("/mobila-la-comanda"),
};

const rezumate = {
  bucatarii:
    "Bucătării în L, în U, liniare sau cu insulă, făcute în jurul electrocasnicelor și al racordurilor.",
  dressinguri:
    "Dressinguri și dulapuri pe toată înălțimea, organizate după ce ai de pus în ele.",
  dormitoare:
    "Dulapuri, paturi tapițate, noptiere, camere de copii și paturi rabatabile pentru camere mici.",
  living:
    "Pereți TV, comode, biblioteci, vitrine încastrate, mese din lemn masiv și piese din metal.",
  "hol-si-baie":
    "Dulapuri de hol, mobilier sub scară, cuiere și mobilier de baie cu blat suspendat.",
  comercial: "Birouri, recepții, showroom-uri și rafturi pentru spații de vânzare.",
};

const intrebari = [
  {
    intrebare: "Ce înseamnă mobilă la comandă?",
    raspuns:
      "Mobilă făcută pentru un spațiu anume, după dimensiunile lui reale, nu aleasă din module standard. Culorile, finisajele și organizarea interioară se aleg pentru fiecare proiect.",
  },
  {
    intrebare: "Cine produce mobila?",
    raspuns:
      "Noi. Tot mobilierul e realizat în fabrica noastră din București, fără subcontractori: proiectare 3D, debitare și cantuire, vopsitorie, frezare CNC, structuri metalice, printare și tapițerie.",
  },
  {
    intrebare: "Cum se face oferta?",
    raspuns:
      "Pe baza datelor pe care ni le trimiți: dimensiunile aproximative, câteva poze ale spațiului și, pentru proiecte mari, planul locuinței. Din ele facem o ofertă estimativă.",
  },
  {
    intrebare: "Prețul din ofertă e cel final?",
    raspuns: [
      "Oferta inițială e estimativă. Prețul final îl confirmăm după ce măsurăm exact spațiul, odată cu proiectul 3D.",
      "Cu cât dimensiunile și pozele trimise sunt mai exacte, cu atât estimarea e mai aproape de prețul final.",
    ],
  },
  {
    intrebare: "Când veniți să măsurați?",
    raspuns:
      "După semnarea contractului. Atunci venim să măsurăm exact, iar pe baza măsurătorilor confirmăm proiectul 3D și prețul final.",
  },
  {
    intrebare: "Văd mobila înainte să fie produsă?",
    raspuns:
      "Da. După măsurători primești proiectul 3D, cu randări și schițe. Producția începe doar după ce îl validezi.",
  },
  {
    intrebare: "Pot discuta proiectul în detaliu înainte de ofertă?",
    raspuns:
      "Da, te așteptăm în showroom-ul de pe Șos. Colentina 447-449, București. Acolo putem discuta în detaliu despre spațiu, materiale și finisaje.",
  },
  {
    intrebare: "Cine montează mobila?",
    raspuns:
      "Echipa noastră. Montajul îl fac oamenii noștri, iar dacă după montaj e nevoie de reglaje, revenim pentru service.",
  },
  {
    intrebare: "Ce informații trimit pentru o ofertă?",
    raspuns:
      "Numele, telefonul și tipul de mobilă sunt suficiente ca să te contactăm. Pentru o ofertă estimativă mai exactă, adaugă dimensiunile aproximative și câteva poze; pentru mai multe camere sau toată locuința, planul.",
  },
  {
    intrebare: "Lucrați și în afara Bucureștiului?",
    raspuns:
      "Da, lucrăm cu clienți din toată țara. Oferta estimativă o primești la fel, pe baza dimensiunilor și a pozelor. Pentru proiectele din afara Bucureștiului stabilim împreună, după contract, cum se fac măsurătorile și montajul.",
  },
  {
    intrebare: "Pot vizita showroom-ul?",
    raspuns:
      "Da, showroom-ul nostru de pe Șos. Colentina 447-449, București, e deschis publicului. Detaliile sunt pe pagina de contact.",
  },
];

export default function MobilaLaComanda() {
  return (
    <>
      <section className={`container ${styles.antet}`}>
        <Breadcrumb pasi={[{ nume: "Mobilă la comandă", href: "/mobila-la-comanda" }]} />
        <h1 className={styles.titlu}>Mobilă la comandă</h1>
        <span className={styles.sertar} aria-hidden="true" />
        <div className={styles.intro}>
          <p>
            Mobila la comandă se face pentru un spațiu anume. Pornește de la dimensiunile reale ale
            camerei, de la pereții care nu sunt perfect drepți, de la fereastra pusă unde nu te
            aștepți și de la ce trebuie să încapă înăuntru.
          </p>
          <p>
            Noi suntem producători: proiectăm în 3D, producem în fabrica noastră din București și
            montăm cu echipa noastră. Corpurile se fac pe măsura peretelui, până la tavan
            dacă e nevoie, iar culorile, fronturile și organizarea din interior le alegi tu.
          </p>
        </div>
        <div className={styles.actiuni}>
          <Buton href="/cerere-oferta">Cere ofertă</Buton>
          <Link href="/proiecte" className="link">
            Vezi proiectele
          </Link>
        </div>
      </section>

      <section className={`container ${styles.categorii}`} aria-labelledby="categorii-titlu">
        <h2 id="categorii-titlu">Ce mobilă facem</h2>
        <ul className={styles.lista}>
          {categorii.map((c) => {
            const img = imagineDupaNumar(...continutCategorii[c.slug].imagine);
            const n = numarProiecte(c.slug);
            return (
              <li key={c.slug} className={styles.rand}>
                <Link href={c.pagina} className={styles.randLink}>
                  <div className={styles.randMedia}>
                    <Image
                      src={img.src}
                      alt=""
                      fill
                      sizes="(min-width: 768px) 360px, 100vw"
                      className={styles.randImg}
                    />
                  </div>
                  <div className={styles.randText}>
                    <h3>{continutCategorii[c.slug].h1}</h3>
                    <p>{rezumate[c.slug]}</p>
                    <span className={styles.randNumar}>
                      {n} {n === 1 ? "proiect" : "proiecte"}
                    </span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      <CumLucram
        fundal="sand"
        intro="Pașii sunt aceiași pentru orice tip de mobilă, de la o bucătărie la un dulap de hol."
      />

      <section className={`container ${styles.pret}`} aria-labelledby="pret-titlu">
        <h2 id="pret-titlu">Ce influențează prețul</h2>
        <p className={`text-lung ${styles.pretIntro}`}>
          Fiecare mobilă la comandă are alt preț, pentru că fiecare spațiu e altfel. Contează în
          principal:
        </p>
        <dl className={styles.factori}>
          <div>
            <dt>Dimensiunile</dt>
            <dd>Cât de lungi, înalte și adânci sunt corpurile și câte sunt.</dd>
          </div>
          <div>
            <dt>Fronturile</dt>
            <dd>Materialul și finisajul: mat, lucios, cu ramă, riflat.</dd>
          </div>
          <div>
            <dt>Blaturile și suprafețele</dt>
            <dd>Tipul de blat, mai ales la bucătărie și baie.</dd>
          </div>
          <div>
            <dt>Feroneria și accesoriile</dt>
            <dd>Balamale, glisiere, mecanisme, organizatoare, iluminare.</dd>
          </div>
        </dl>
        <p className={styles.pretNota}>
          Prima ofertă e estimativă, pe baza dimensiunilor tale. Prețul final îl confirmăm după
          măsurătorile făcute după contract.{" "}
          <Link href="/cerere-oferta" className="link">
            Cere ofertă
          </Link>
        </p>
      </section>

      <Fabrica id="fabrica-servicii" />

      <MaterialeFeronerie />

      <ToataTara />

      <IntrebariFrecvente intrebari={intrebari} />

      <BandaOferta />
    </>
  );
}
