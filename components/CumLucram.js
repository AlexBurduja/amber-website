import Link from "next/link";
import styles from "./CumLucram.module.css";

// Procesul real, confirmat de Alex: oferta inițială e estimativă, pe baza datelor trimise de client.
// Măsurătorile exacte se fac doar după semnarea contractului; proiectul 3D și prețul final
// se confirmă pe baza lor. Nu există măsurători gratuite sau înainte de contract.
// Transportul și garanția nu sunt confirmate și nu apar aici.
export const pasiStandard = [
  {
    titlu: "Ne trimiți datele",
    text: "Dimensiunile aproximative, câteva poze ale spațiului și, pentru proiecte mari, planul locuinței. Le poți trimite direct din formularul de ofertă.",
  },
  {
    titlu: "Primești o ofertă estimativă",
    text: "O calculăm pe baza datelor tale, ca să știi de la început în ce zonă de preț se încadrează proiectul.",
  },
  {
    titlu: "Contract și măsurători exacte",
    text: "După ce semnăm contractul, venim să măsurăm exact spațiul în care se montează mobila.",
  },
  {
    titlu: "Proiect 3D și preț final",
    text: "Pe baza măsurătorilor confirmăm proiectul 3D și prețul final. Producția începe după ce validezi proiectul.",
  },
  {
    titlu: "Producție și montaj",
    text: "Mobila se face în fabrica noastră și o montează echipa noastră. Pentru reglaje ulterioare avem și service.",
  },
];

export const notaEstimare =
  "Oferta inițială e estimativă, pentru că pornește de la dimensiunile tale. Prețul final îl confirmăm după măsurători. Dacă vrei să discutăm proiectul în detaliu, te așteptăm în showroom.";

export default function CumLucram({
  titlu = "Cum lucrăm",
  intro,
  pasi = pasiStandard,
  fundal = "paper",
  nota = notaEstimare,
}) {
  return (
    <section className={`${styles.sectiune} ${styles[fundal]}`} aria-labelledby="cum-lucram-titlu">
      <div className="container">
        <h2 id="cum-lucram-titlu">{titlu}</h2>
        {intro ? <p className={`text-lung ${styles.intro}`}>{intro}</p> : null}
        <ol className={styles.pasi}>
          {pasi.map((pas, i) => (
            <li key={pas.titlu} className={styles.pas}>
              <span className={styles.numar} aria-hidden="true">
                {i + 1}
              </span>
              <h3 className={styles.titluPas}>{pas.titlu}</h3>
              <p>{pas.text}</p>
            </li>
          ))}
        </ol>
        {nota ? (
          <p className={styles.nota}>
            {nota}{" "}
            <Link href="/contact" className="link">
              Adresa showroom-ului
            </Link>
          </p>
        ) : null}
      </div>
    </section>
  );
}
