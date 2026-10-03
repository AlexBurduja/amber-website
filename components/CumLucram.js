import styles from "./CumLucram.module.css";

// Pașii confirmați de Alex: măsurători la fața locului, proiect 3D, oferta înaintea oricărui angajament,
// producție în fabrica proprie, montaj cu echipă proprie, service.
// Transportul și garanția nu sunt confirmate și nu apar aici.
export const pasiStandard = [
  {
    titlu: "Trimiți cererea",
    text: "Ne spui ce mobilă îți trebuie și cum te putem contacta. Dacă ai dimensiuni sau poze ale spațiului, le adaugi în cerere.",
  },
  {
    titlu: "Măsurăm la fața locului",
    text: "Venim să măsurăm spațiul, ca proiectul să pornească de la dimensiunile reale ale pereților, nu de la estimări.",
  },
  {
    titlu: "Proiect 3D și ofertă",
    text: "Primești randările, schițele și oferta înainte de orice angajament. Mergem mai departe doar după ce le validezi.",
  },
  {
    titlu: "Producem în fabrica noastră",
    text: "Debitare, vopsitorie, frezare, tapițerie: fiecare etapă se face la noi, fără subcontractori.",
  },
  {
    titlu: "Montăm cu echipa noastră",
    text: "Mobila o montează echipa proprie. Dacă după montaj e nevoie de reglaje, revenim pentru service.",
  },
];

export default function CumLucram({ titlu = "Cum lucrăm", intro, pasi = pasiStandard, fundal = "paper" }) {
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
      </div>
    </section>
  );
}
