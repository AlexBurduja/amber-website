"use client";

import { useEffect } from "react";

// Evenimente Umami pentru linkurile de contact. Un singur ascultător pe document, ca să prindă
// toate linkurile tel:, mailto: și WhatsApp, inclusiv cele din componente viitoare.
// `window.umami?.` nu dă eroare dacă scriptul e blocat de browser.
export function eveniment(nume) {
  window.umami?.track(nume);
}

export default function Statistici() {
  useEffect(() => {
    function laClick(e) {
      const href = e.target.closest?.("a[href]")?.getAttribute("href") ?? "";
      if (href.startsWith("tel:")) eveniment("click-telefon");
      else if (href.startsWith("mailto:")) eveniment("click-email");
      else if (/^https?:\/\/(wa\.me|api\.whatsapp\.com)\//.test(href)) eveniment("click-whatsapp");
    }
    document.addEventListener("click", laClick);
    return () => document.removeEventListener("click", laClick);
  }, []);
  return null;
}
