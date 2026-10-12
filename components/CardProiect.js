import Link from "next/link";
import Image from "@/components/Imagine";
import { ViewTransition } from "react";
import CardMedia from "./CardMedia";
import Eticheta3D from "./Eticheta3D";
import { categorie } from "@/lib/proiecte";
import styles from "./CardProiect.module.css";

export function numeTranzitie(slug) {
  return `proiect-${slug}`;
}

// mod "grila": raport fix 4:3, ca grilele să nu aibă goluri.
// mod "rand": înălțime fixă, lățimea urmează proporția pozei (rândul derulabil de pe homepage).
export default function CardProiect({
  proiect,
  imagine = proiect.imagini[0],
  sizes = "(min-width: 1024px) 400px, (min-width: 640px) 50vw, 50vw",
  mod = "grila",
  nivelTitlu = 3,
  arataCategoria = true,
  tranzitie = true,
}) {
  const Titlu = `h${nivelTitlu}`;
  const cat = categorie(proiect.categorie);
  const stilRand = mod === "rand" ? { "--raport": `${imagine.latime / imagine.inaltime}` } : undefined;
  // A doua poză pentru hover: următoarea poză reală, ca randările să nu apară fără etichetă.
  const secundara = proiect.imagini.find((i) => i.src !== imagine.src && i.tip === "foto_reala");

  const img = (
    <Image
      src={imagine.src}
      alt={imagine.alt}
      fill
      sizes={sizes}
      className={styles.img}
    />
  );

  return (
    <article className={`${styles.card} ${styles[mod]}`} style={stilRand}>
      <Link href={`/proiecte/${proiect.slug}`} className={styles.link}>
        <CardMedia secundara={secundara} sizes={sizes}>
          {tranzitie ? (
            <ViewTransition name={numeTranzitie(proiect.slug)} share="morf" default="none">
              <div className={styles.cadruImg}>{img}</div>
            </ViewTransition>
          ) : (
            <div className={styles.cadruImg}>{img}</div>
          )}
          {imagine.tip === "randare" ? <Eticheta3D /> : null}
        </CardMedia>
        <div className={styles.text}>
          {arataCategoria && cat ? <p className={`eticheta ${styles.categorie}`}>{cat.nume}</p> : null}
          <Titlu className={styles.titlu}>{proiect.titlu}</Titlu>
        </div>
      </Link>
    </article>
  );
}
