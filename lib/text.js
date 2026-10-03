// Scurtează la limita dată, la granița unui cuvânt, cu „…” la final.
export function scurteaza(text, limita) {
  if (text.length <= limita) return text;
  const taiat = text.slice(0, limita - 1);
  return `${taiat.slice(0, taiat.lastIndexOf(" ")).replace(/[,.;:]$/, "")}…`;
}

export function primaPropozitie(text) {
  const m = text.match(/^.+?[.!?](\s|$)/);
  return (m ? m[0] : text).trim();
}
