// Date structurate JSON-LD. Escapăm „<” ca să nu poată închide tag-ul <script>.
export default function JsonLd({ date }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(date).replace(/</g, "\\u003c"),
      }}
    />
  );
}
