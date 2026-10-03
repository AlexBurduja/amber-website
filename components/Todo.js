// Marcaj vizibil doar în dezvoltare, pentru datele care lipsesc încă (CLAUDE.md §6).
// În producție nu afișează nimic, ca pe site să nu apară texte de lucru.
export default function Todo({ children }) {
  if (process.env.NODE_ENV === "production") return null;
  return (
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
}
