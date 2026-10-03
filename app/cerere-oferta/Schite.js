import styles from "./FormularOferta.module.css";

// Schițe simple, desenate în cod (fără imagini descărcate). Culorile vin din variabilele brandului.

// Peretele văzut din față: ce înseamnă lungimea, înălțimea și ce merită notat.
export function SchitaPerete() {
  return (
    <svg
      viewBox="0 0 300 214"
      className={styles.schitaPerete}
      role="img"
      aria-label="Schiță a unui perete: lungimea se măsoară de la un colț la celălalt, înălțimea de la podea la tavan. Pe perete sunt marcate un geam, o ușă, prize și țevi, cu distanța lor față de colț."
    >
      {/* peretele */}
      <rect x="34" y="14" width="250" height="150" fill="var(--paper)" stroke="var(--ink)" strokeWidth="1.5" />
      <line x1="26" y1="164" x2="292" y2="164" stroke="var(--ink)" strokeWidth="3" />

      {/* geam */}
      <rect x="74" y="38" width="64" height="54" fill="var(--white)" stroke="var(--ink)" strokeWidth="1.5" />
      <line x1="106" y1="38" x2="106" y2="92" stroke="var(--ink)" strokeWidth="1" />
      <text x="106" y="106" textAnchor="middle" className={styles.schitaText}>geam</text>
      {/* distanța de la colț până la geam */}
      <line x1="36" y1="30" x2="72" y2="30" stroke="var(--stone)" strokeWidth="1" strokeDasharray="3 2" />
      <text x="54" y="26" textAnchor="middle" className={styles.schitaTextMic}>de la colț</text>

      {/* ușă */}
      <rect x="230" y="62" width="42" height="102" fill="var(--white)" stroke="var(--ink)" strokeWidth="1.5" />
      <circle cx="237" cy="116" r="2" fill="var(--ink)" />
      <text x="251" y="56" textAnchor="middle" className={styles.schitaText}>ușă</text>

      {/* prize */}
      <rect x="160" y="128" width="9" height="9" fill="var(--white)" stroke="var(--ink)" strokeWidth="1.2" />
      <rect x="172" y="128" width="9" height="9" fill="var(--white)" stroke="var(--ink)" strokeWidth="1.2" />
      <text x="171" y="122" textAnchor="middle" className={styles.schitaText}>prize</text>

      {/* țevi */}
      <circle cx="198" cy="148" r="4" fill="var(--white)" stroke="var(--ink)" strokeWidth="1.2" />
      <circle cx="210" cy="148" r="4" fill="var(--white)" stroke="var(--ink)" strokeWidth="1.2" />
      <text x="204" y="140" textAnchor="middle" className={styles.schitaText}>țevi</text>

      {/* lungimea */}
      <line x1="34" y1="184" x2="284" y2="184" stroke="var(--ink)" strokeWidth="2" />
      <line x1="34" y1="177" x2="34" y2="191" stroke="var(--ink)" strokeWidth="2" />
      <line x1="284" y1="177" x2="284" y2="191" stroke="var(--ink)" strokeWidth="2" />
      <rect x="112" y="176" width="94" height="16" fill="var(--amber)" />
      <text x="159" y="188" textAnchor="middle" className={styles.schitaEticheta}>lungimea, cm</text>

      {/* înălțimea */}
      <line x1="14" y1="14" x2="14" y2="164" stroke="var(--ink)" strokeWidth="2" />
      <line x1="7" y1="14" x2="21" y2="14" stroke="var(--ink)" strokeWidth="2" />
      <line x1="7" y1="164" x2="21" y2="164" stroke="var(--ink)" strokeWidth="2" />
      <g transform="translate(14 89) rotate(-90)">
        <rect x="-44" y="-8" width="88" height="16" fill="var(--amber)" />
        <text x="0" y="4" textAnchor="middle" className={styles.schitaEticheta}>înălțimea, cm</text>
      </g>

      <text x="159" y="208" textAnchor="middle" className={styles.schitaTextMic}>de la un colț la celălalt</text>
    </svg>
  );
}

// Formele de bucătărie, văzute de sus. Corpurile sunt marcate cu negru, pereții cu literele din formular.
const forme = {
  liniara: (
    <>
      <rect x="8" y="8" width="44" height="9" />
      <text x="30" y="32">A</text>
    </>
  ),
  l: (
    <>
      <rect x="8" y="8" width="44" height="9" />
      <rect x="8" y="17" width="9" height="35" />
      <text x="36" y="32">A</text>
      <text x="26" y="44">B</text>
    </>
  ),
  u: (
    <>
      <rect x="8" y="8" width="44" height="9" />
      <rect x="8" y="17" width="9" height="35" />
      <rect x="43" y="17" width="9" height="35" />
      <text x="30" y="31">A</text>
      <text x="23" y="47">B</text>
      <text x="37" y="47">C</text>
    </>
  ),
  insula: (
    <>
      <rect x="8" y="8" width="44" height="9" />
      <rect x="8" y="17" width="9" height="35" className={styles.formaOptionala} />
      <rect x="25" y="36" width="22" height="10" />
      <text x="36" y="30">A</text>
      <text x="13" y="34" className={styles.formaLiteraMica}>B</text>
    </>
  ),
};

export function SchitaForma({ forma }) {
  return (
    <svg viewBox="0 0 60 60" className={styles.schitaForma} aria-hidden="true">
      <rect x="4" y="4" width="52" height="52" className={styles.formaCamera} />
      <g className={styles.formaCorpuri}>{forme[forma]}</g>
    </svg>
  );
}
