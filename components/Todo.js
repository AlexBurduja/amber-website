// Marcaj vizibil doar în dezvoltare, pentru datele care lipsesc încă (CLAUDE.md §6).
// În producție nu afișează nimic, ca pe site să nu apară texte de lucru.
// `ca` = elementul în care stă marcajul (ex. "li", "p", "div"). Învelișul face parte din marcaj,
// deci dispare și el în producție și nu rămân elemente goale în pagină.
export default function Todo({ children, ca: Invelis, className }) {
  if (process.env.NODE_ENV === "production") return null;
  const marcaj = (
    <span
      style={{
        display: "inline-block",
        padding: "2px 8px",
        border: "1px dashed currentColor",
        borderRadius: 2,
        fontSize: "0.8125rem",
        opacity: 0.75,
      }}
    >
      TODO: {children}
    </span>
  );
  return Invelis ? <Invelis className={className}>{marcaj}</Invelis> : marcaj;
}
