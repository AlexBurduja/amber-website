import BandaOferta from "@/components/BandaOferta";
import Breadcrumb from "@/components/Breadcrumb";
import ListaProiecte from "./ListaProiecte";
import { categorii, proiectePublicate } from "@/data/proiecte";
import { areCuloarea, familiiCuloare } from "@/lib/culori";
import { inCategorie } from "@/lib/proiecte";
import { og } from "@/lib/metadata";
import styles from "./page.module.css";

export const metadata = {
  title: "Proiecte de mobilă la comandă",
  description:
    "Bucătării, dormitoare, dressinguri, living, hol, baie și spații comerciale: proiecte de mobilă la comandă, cu poze reale și randări 3D marcate separat.",
  alternates: { canonical: "/proiecte" },
  openGraph: og("/proiecte"),
};

// Lista trimisă în browser, pentru filtre: doar ce le trebuie cardurilor.
// Pozele reale întâi; proiectele care au doar randări la final.
const proiecte = [...proiectePublicate]
  .sort((a, b) => Number(a.proiect3d) - Number(b.proiect3d))
  .map((p) => ({
    slug: p.slug,
    titlu: p.titlu,
    categorie: p.categorie,
    categorii: categorii.filter((c) => inCategorie(p, c.slug)).map((c) => c.slug),
    culori: familiiCuloare.filter((c) => areCuloarea(p.slug, c.slug)).map((c) => c.slug),
    // Cardul folosește prima poză și, la hover, următoarea poză reală.
    imagini: [p.imagini[0], p.imagini.find((i, n) => n > 0 && i.tip === "foto_reala")].filter(Boolean),
  }));

export default function Proiecte() {
  return (
    <>
      <section className={`container ${styles.antet}`}>
        <Breadcrumb pasi={[{ nume: "Proiecte", href: "/proiecte" }]} />
        <h1 className={styles.titlu}>Proiecte</h1>
        <p className={`text-lung ${styles.intro}`}>
          Mobilă făcută pe comandă pentru case, apartamente și spații comerciale. Proiectele care au
          doar randări sunt marcate „Proiect 3D”.
        </p>
      </section>

      <ListaProiecte proiecte={proiecte} categorii={categorii} familii={familiiCuloare} />

      <div className={styles.spatiu} />
      <BandaOferta />
    </>
  );
}
