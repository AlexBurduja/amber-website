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

// Text cu linkuri interne scrise ca [text](/cale/). Întoarce o listă de bucăți: șir sau { text, href }.
export function bucatiLinkuri(text) {
  const bucati = [];
  const re = /\[([^\]]+)\]\(([^)]+)\)/g;
  let ultimul = 0;
  for (const m of text.matchAll(re)) {
    if (m.index > ultimul) bucati.push(text.slice(ultimul, m.index));
    bucati.push({ text: m[1], href: m[2] });
    ultimul = m.index + m[0].length;
  }
  if (ultimul < text.length) bucati.push(text.slice(ultimul));
  return bucati;
}

// Același text, fără marcajul linkurilor (pentru meta, date structurate, numărătoarea de cuvinte).
export function faraLinkuri(text) {
  return text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1");
}

export function numarCuvinte(text) {
  return text.trim().split(/\s+/).filter(Boolean).length;
}
