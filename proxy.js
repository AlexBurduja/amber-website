import { NextResponse } from "next/server";
import { gazdaIndexabila } from "@/lib/site";

// Doar ambermob.ro se indexează. Pe orice altă gazdă (previzualizări *.vercel.app, localhost,
// IP-ul serverului, domenii de test) fiecare răspuns primește `X-Robots-Tag: noindex, nofollow`,
// iar robots.txt devine `Disallow: /`. Antetul are pentru motoarele de căutare același efect ca
// eticheta meta robots și acoperă și imaginile; paginile rămân statice (o etichetă meta pusă pe
// server după gazdă ar fi obligat randarea fiecărei pagini la fiecare cerere).
// Eticheta meta robots e adăugată în plus, în browser, de scriptul din app/layout.js.
export function proxy(request) {
  const gazda = request.headers.get("x-forwarded-host") ?? request.headers.get("host") ?? "";
  if (gazdaIndexabila(gazda)) return NextResponse.next();

  if (request.nextUrl.pathname === "/robots.txt") {
    return new NextResponse("User-agent: *\nDisallow: /\n", {
      headers: { "Content-Type": "text/plain; charset=utf-8", "X-Robots-Tag": "noindex, nofollow" },
    });
  }

  const raspuns = NextResponse.next();
  raspuns.headers.set("X-Robots-Tag", "noindex, nofollow");
  return raspuns;
}
