import Image from "@/components/Imagine";
import Link from "next/link";
import Breadcrumb from "./Breadcrumb";
import Buton from "./Buton";
import CardProiect from "./CardProiect";
import IntrebariFrecvente from "./IntrebariFrecvente";
import MaterialeFeronerie from "./MaterialeFeronerie";
import BandaOferta from "./BandaOferta";
import { continutCategorii } from "@/data/categorii";
import JsonLd from "./JsonLd";
import TextCuLinkuri from "./TextCuLinkuri";
import { grupeaza, imagineDupaNumar, paginaCategorie, proiectePentruCategorie } from "@/lib/proiecte";
import { schemaColectie } from "@/lib/schema";
import styles from "./PaginaCategorie.module.css";
import { og } from "@/lib/metadata";

const tipCerere = {
  bucatarii: "?mobila=Bucătărie",
  dressinguri: "?mobila=Dressing",
  dormitoare: "?mobila=Dormitor",
  living: "?mobila=Living",
  hol: "?mobila=Hol",
  baie: "?mobila=Baie",
  comercial: "?mobila=Comercial",
  "paturi-tapitate": "?mobila=Dormitor",
  "bucatarii-insula": "?mobila=Bucătărie",
};

export function metadataCategorie(slug) {
  const c = continutCategorii[slug];
  const cat = paginaCategorie(slug);
  return {
    title: c.title,
    description: c.description,
    alternates: { canonical: cat.pagina },
    openGraph: og(cat.pagina),
  };
}

function GrilaProiecte({ proiecte }) {
  return (
    <ul className={styles.grila}>
      {proiecte.map((p) => (
        <li key={p.slug}>
          <CardProiect proiect={p} arataCategoria={false} />
        </li>
      ))}
    </ul>
  );
}

export default function PaginaCategorie({ slug }) {
  const c = continutCategorii[slug];
  const cat = paginaCategorie(slug);
  const { proprii, secundare } = proiectePentruCategorie(slug);
  const reale = proprii.filter((p) => !p.proiect3d);
  const doar3d = proprii.filter((p) => p.proiect3d);
  // Paginile pe tip de piesă adună proiecte din mai multe categorii: fără subgrupurile lor.
  const grupuri = cat.proiecte ? [] : grupeaza(reale);
  const img = imagineDupaNumar(...c.imagine);

  return (
    <>
      <section className={`container ${styles.antet}`}>
        <Breadcrumb
          pasi={[
            { nume: "Mobilă la comandă", href: "/mobila-la-comanda" },
            { nume: cat.nume, href: cat.pagina },
          ]}
        />
        <div className={styles.antetGrila}>
          <div className={styles.antetText}>
            <h1>{c.h1}</h1>
            <span className={styles.sertar} aria-hidden="true" />
            <p className={styles.intro}>{c.intro}</p>
            <div className={styles.actiuni}>
              <Buton href={`/cerere-oferta${tipCerere[slug] ?? ""}`}>Cere ofertă</Buton>
              <a href="#proiecte" className="link">
                Vezi {proprii.length + secundare.length}{" "}
                {proprii.length + secundare.length === 1 ? "proiect" : "proiecte"}
              </a>
            </div>
          </div>
          <div className={styles.antetMedia}>
            <Image
              src={img.src}
              alt={img.alt}
              width={img.latime}
              height={img.inaltime}
              loading="eager"
              fetchPriority="high"
              sizes="(min-width: 1024px) 620px, 100vw"
              className={styles.antetImg}
            />
          </div>
        </div>
      </section>

      <section id="proiecte" className={`container ${styles.proiecte}`} aria-labelledby="proiecte-titlu">
        <h2 id="proiecte-titlu">Proiecte realizate</h2>
        {grupuri.length > 1 ? (
          grupuri.map((g) => (
            <div key={g.nume} className={styles.grup}>
              <h3 className={styles.titluGrup}>{g.nume}</h3>
              <GrilaProiecte proiecte={g.proiecte} />
            </div>
          ))
        ) : (
          <div className={styles.grup}>
            <GrilaProiecte proiecte={reale} />
          </div>
        )}

        {secundare.length ? (
          <div className={styles.grup}>
            <h3 className={styles.titluGrup}>{c.titluSecundare}</h3>
            {c.textSecundare ? <p className={`text-lung ${styles.textGrup}`}>{c.textSecundare}</p> : null}
            <GrilaProiecte proiecte={secundare} />
          </div>
        ) : null}

        {doar3d.length ? (
          <div className={styles.grup}>
            <h3 className={styles.titluGrup}>Proiecte 3D</h3>
            <p className={`text-lung ${styles.textGrup}`}>
              Randări ale unor proiecte, fără poze ale mobilei realizate.
            </p>
            <GrilaProiecte proiecte={doar3d} />
          </div>
        ) : null}
      </section>

      <section className={styles.ghid} aria-labelledby="ghid-titlu">
        <div className={`container ${styles.ghidGrila}`}>
          <div>
            <h2 id="ghid-titlu">{c.cumLucram.titlu}</h2>
            <div className={styles.paragrafe}>
              {c.cumLucram.paragrafe.map((p) => (
                <p key={p}>
                  <TextCuLinkuri text={p} />
                </p>
              ))}
            </div>
          </div>
          <div>
            <h2>{c.materiale.titlu}</h2>
            <div className={styles.paragrafe}>
              {c.materiale.paragrafe.map((p) => (
                <p key={p}>
                  <TextCuLinkuri text={p} />
                </p>
              ))}
            </div>
            <h3 className={styles.titluFactori}>Ce influențează prețul</h3>
            <ul className={styles.factori}>
              {c.factori.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
            <p className={styles.notaPret}>
              Prima ofertă e estimativă, pe baza dimensiunilor și pozelor tale. Prețul final îl
              confirmăm după măsurătorile făcute după contract.{" "}
              <Link href="/cerere-oferta" className="link">
                Cere ofertă
              </Link>
            </p>
          </div>
        </div>
      </section>

      {c.grupuriMateriale ? <MaterialeFeronerie grupuri={c.grupuriMateriale} fundal="white" /> : null}

      <IntrebariFrecvente intrebari={c.intrebari} schema />

      <section className={`container ${styles.legaturi}`} aria-labelledby="legaturi-titlu">
        <h2 id="legaturi-titlu">Vezi și</h2>
        <ul className={styles.listaLegaturi}>
          {(c.vezi ?? []).map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="link">
                {l.text}
              </Link>
            </li>
          ))}
        </ul>
        <p className={`text-lung ${styles.contactNota}`}>
          Preferi să vorbim direct? Pe pagina de{" "}
          <Link href="/contact" className="link">
            contact
          </Link>{" "}
          găsești telefonul și adresa showroom-ului.
        </p>
      </section>

      <BandaOferta />
      <JsonLd
        date={schemaColectie({
          nume: c.h1,
          descriere: c.description,
          pagina: cat.pagina,
          proiecte: [...proprii, ...secundare],
        })}
      />
    </>
  );
}
