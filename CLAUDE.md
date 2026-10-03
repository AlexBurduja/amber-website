@AGENTS.md
# Amber Creativity – site de prezentare

Site nou pentru **Amber Creativity SRL** (București), firmă de mobilă la comandă. Domeniu: **ambermob.ro**.
Firma are sediul în București și **lucrează în toată țara**. Scopul site-ului: să aducă cereri de ofertă prin Google și social media.

Citește tot fișierul înainte de orice modificare. Înainte să construiești ceva, propune structura și așteaptă confirmarea lui Alex.

---

## 1. Reguli absolute

1. **Numele firmei vechi nu apare nicăieri.** Nici „Mabis”, „Mabi's”, „mabis.ro” sau variante, nicăieri: texte, cod, comentarii, nume de fișiere, alt text, metadate, commit-uri, date structurate. Dacă îl găsești într-o imagine (logo, watermark, text), imaginea nu se folosește.
2. **Nu copia texte de pe site-ul vechi.** `pagini.json` și `manifest.json` sunt doar referințe interne. Toate textele de pe site se scriu de la zero.
3. **Fără redirecționări sau linkuri** către sau dinspre domeniul vechi. Site-ul pornește SEO de la zero, intenționat.
4. **Nu inventa date.** Telefon, adresă, ani de experiență, număr de proiecte, recenzii, prețuri, termene, garanții: dacă nu sunt în acest fișier, pune `TODO: de completat de Alex` și adaugă-le în lista de la final.
5. **Tot conținutul public e în limba română,** cu diacritice corecte (ș, ț cu virgulă dedesubt). URL-urile sunt fără diacritice.

---

## 2. Brand

### Culori
Definite o singură dată, ca variabile CSS în `:root`, și folosite doar prin variabile.

| Variabilă | Cod | Folosire |
| --- | --- | --- |
| `--amber` | `#FFD100` | Accent: butoane principale, linii, detalii, iconițe. Culoarea din logo. |
| `--amber-hover` | `#F2C200` | Hover și stare activă pe elementele galbene. |
| `--ink` | `#111111` | Text principal, butoane secundare, secțiuni închise (hero, footer). |
| `--graphite` | `#2B2B2B` | Fundal secundar închis, carduri pe fundal închis. |
| `--stone` | `#5E5A55` | Text secundar, descrieri, etichete. |
| `--line` | `#E6E1D8` | Borduri, separatoare. |
| `--sand` | `#EFEAE2` | Fundal pentru secțiuni alternative. |
| `--paper` | `#FAF8F4` | Fundalul principal al site-ului (alb cald, nu alb pur). |
| `--white` | `#FFFFFF` | Carduri, formulare, zone peste fundal `--paper`. |

Reguli:
- Galbenul e accent, nu fundal general. Maximum o secțiune mare cu fundal galben pe pagină (ex. banda de cerere ofertă).
- **Niciodată text galben pe fundal deschis** (contrast insuficient). Pe fundal deschis, linkurile sunt `--ink` cu subliniere `--amber`.
- Pe galben, textul e întotdeauna `--ink`. Pe `--ink`/`--graphite`, textul e alb sau `--amber`.
- Tonurile calde de neutru (`--paper`, `--sand`) fac legătura cu lemnul și materialele; nu le înlocui cu gri reci.

### Fonturi
Ambele din Google Fonts, prin `next/font/google`, cu subseturile `latin` și `latin-ext` (necesare pentru ș, ț, ă, î, â).

- **Titluri: Montserrat**, greutăți 500 și 600. E fontul cel mai apropiat de logo. Titlurile mari la 600, fără bold excesiv (700+). Etichetele mici (categorii, „PROIECT 3D”, supratitluri) cu majuscule și `letter-spacing: 0.12em`, ca „AMBER” din logo.
- **Text: DM Sans**, greutăți 400 și 500. Corp de text 17–18px pe desktop, `line-height: 1.6`, rânduri de maximum ~70 de caractere.
- Verifică vizual că diacriticele (ș, ț cu virgulă) se afișează corect în ambele fonturi.

### Restul brandului
- **Logo:** cuvântul „AMBER” în care litera E e desenată din trei sertare stivuite, cel din mijloc galben și tras în afară. Simbolul separat (pentru spații mici, favicon, avatar) sunt doar cele trei sertare. Kit-ul complet e în `Amber-logo/`, cu README; nu redesena logo-ul și nu-l scrie cu text, folosește mereu fișierele SVG.
  - Antet: `public/brand/amber-logo-color.svg` (pe fundal închis: `amber-logo-pe-inchis.svg`). Raport lățime/înălțime ≈ 6,5:1. Înălțime 30px pe desktop, 22px pe mobil. Sub ~100px lățime: `amber-simbol-color.svg`.
  - Favicon, iconițe și imaginea de share sunt în `app/` (`favicon.ico`, `icon.svg`, `apple-icon.png`, `opengraph-image.png`); iconițele de manifest în `public/`.
  - `amber-logo-animat.svg` (sertarul se deschide) doar pentru încărcare sau intro, nu în antet.
  - Gestul „sertar tras în afară” (o bară galbenă decalată) poate fi folosit discret ca element grafic: separatoare, starea activă din meniu, hover pe carduri. Cu măsură, nu pe fiecare element.
- **Ton:** sigur pe el, cald, concret. Vorbim despre materiale, finisaje, măsurători, montaj, nu despre „visuri” și „excelență”. Propoziții scurte. Adresare cu „tu” sau „dumneavoastră”: TODO, de confirmat cu Alex.
- **Fotografiile sunt produsul.** Layout aerisit, imagini mari, puțin text peste ele.

Skill-urile de design instalate (`frontend-design`, `design-taste-frontend`, `impeccable`, `web-design-guidelines`) se aplică în limitele acestui brand. Unde se contrazic, are prioritate acest fișier.

---

## 3. Stack

- Next.js (App Router), React, CSS Modules, **JavaScript (fără TypeScript)**.
- Imagini prin `next/image` (AVIF/WebP, `sizes` corecte, `priority` doar pe imaginea principală a paginii).
- Hosting: TODO.
- Verifică vizual cu `playwright-cli` pe desktop (1440px) și mobil (390px) după fiecare pagină nouă.

---

## 4. Imaginile din arhivă (`export-complet/`)

### Context
Folderul `export-complet/` conține pozele proiectelor realizate anterior, descărcate de pe un site vechi care va fi șters. Sunt portofoliul **temporar**: vor fi înlocuite treptat cu poze noi din proiectele Amber. Tot sistemul trebuie gândit ca înlocuirea să fie ușoară și să nu schimbe URL-urile paginilor.

- `manifest.json`: pentru fiecare imagine, categoria, pagina sursă, breadcrumb, alt text vechi, dacă e original sau copie micșorată.
- `pagini.json`: paginile site-ului vechi (doar referință internă).
- **Folderul nu se publică și nu intră în `public/`.** Se pune în `.gitignore`.

### Pasul 1: Clasificare (uită-te la fiecare imagine)
Lucrează pe categorii, nu pe toate deodată. Adaugă în manifest:
- `tip_imagine`: `foto_reala` | `randare` | `desen_tehnic` | `altele`
- `sigur`: `true` / `false` (dacă ezitezi între randare și foto reală → `false`)
- `brand_vechi_vizibil`: `true` dacă se vede logo, watermark sau text cu numele vechi
- `calitate`: `buna` | `acceptabila` | `slaba` (blur, rezoluție mică, încadrare proastă)
- `de_folosit`: propunerea ta, `true`/`false`, cu motivul într-un câmp `nota`

La final, raport pe categorii: câte imagini de fiecare tip, plus lista celor nesigure și a celor cu brand vechi, pentru verificare manuală.

### Pasul 2: Ce se publică
- `foto_reala` de calitate bună sau acceptabilă: da, e baza portofoliului.
- `randare`: da, se publică, dar **marcată vizibil** pe imagine ca „Proiect 3D” (etichetă mică, discretă). Nu se prezintă niciodată ca lucrare realizată. Într-un proiect care are și poze reale, pozele reale apar primele. Formatul „randare vs realizat” (aceeași cameră) e un punct forte: pune-le alăturat când există amândouă.
- `desen_tehnic`: **nu se publică** (sunt planuri ale unor clienți). Rămân doar intern.
- `altele`, `brand_vechi_vizibil: true`, `calitate: slaba`: nu se publică.

### Pasul 3: Proiecte
Grupează imaginile în proiecte. Un proiect = o pagină sursă din manifest (de verificat vizual dacă imaginile chiar sunt din același spațiu). Datele stau într-un singur loc (ex. `data/proiecte.js`):

```js
{
  slug: "bucatarie-mdf-verde-mat",       // nou, descriptiv, fără numele vechi și fără numele din site-ul vechi
  categorie: "bucatarii",
  titlu: "Bucătărie din MDF vopsit verde mat",
  descriere: "...",                       // text nou, 2–4 propoziții concrete: materiale, finisaj, spațiu
  materiale: ["MDF vopsit mat", "blat compozit"], // doar ce se vede sau ce confirmă Alex
  imagini: [
    { src: "...", alt: "...", tip: "foto_reala", sursa: "arhiva", latime: 2400, inaltime: 1600 },
  ],
  publicat: true,
}
```

- `sursa: "arhiva"` pentru imaginile vechi, `sursa: "amber"` pentru cele noi. Asta permite raportul de înlocuire.
- Numele proiectelor de pe site-ul vechi (ex. „Verde Fistic”, „Midnight Blue”) nu se refolosesc. Titlurile se scriu nou, descriptiv.

### Pasul 4: Procesare
- **Șterge toate metadatele** (EXIF, IPTC, XMP): pot conține numele firmei vechi, autorul sau coordonatele GPS ale casei clientului.
- Redimensionează la maximum 2400px pe latura mare; originalele rămân în arhivă.
- Redenumește descriptiv: `bucatarie-mdf-verde-mat-01.jpg` (fără diacritice, fără numele vechi).
- **Alt text nou, în română, specific:** ce se vede, material, culoare, cameră. Ex: „Bucătărie în L cu fronturi MDF verde mat și blat alb”. Fără înșiruire de cuvinte cheie.

### Pasul 5: Înlocuire treptată
- Fă un script (`npm run raport-arhiva`) care listează proiectele și câte imagini din arhivă vs noi au.
- Înlocuirea = adaugi imagini `sursa: "amber"` la proiect și le scoți sau ascunzi pe cele din arhivă. Slug-ul și URL-ul proiectului nu se schimbă.
- Proiectele noi se adaugă în același format.

---

## 5. SEO

Site-ul pornește de la zero în Google. Ținta principală: **„mobilă la comandă”**, cu variantele pe produse („bucătării la comandă”, „dressing la comandă” etc.) și pe București, unde e sediul. Firma lucrează în toată țara, deci textele nu se limitează la București.

### Structura propusă (de confirmat)
- `/` – acasă
- `/mobila-la-comanda` – pagina principală de servicii
- `/bucatarii-la-comanda`, `/dressinguri-la-comanda`, `/dormitoare-la-comanda`, `/living-la-comanda`, `/mobilier-hol-si-baie`, `/mobilier-comercial` – câte o pagină pe tip de produs, doar pentru categoriile cu proiecte reale
- `/proiecte` și `/proiecte/[slug]`
- `/despre`, `/contact`, `/cerere-oferta`

Fiecare pagină de categorie are text util și original (cum lucrăm, materiale, ce influențează prețul, întrebări frecvente) plus proiectele din categoria respectivă. Fără pagini goale sau duplicate (ex. câte o pagină pentru fiecare oraș din țară cu același text). Livrarea și montajul în toată țara se explică într-o secțiune clară, nu prin pagini clonate.

### Tehnic
- `title` unic (max ~60 caractere) și `description` unică (max ~155) pe fiecare pagină, prin Metadata API din Next.js.
- Un singur `h1` pe pagină; ierarhie corectă de headings.
- `lang="ro"`, URL-uri canonice, `sitemap.xml` și `robots.txt` generate automat.
- Open Graph și imagini de share pentru fiecare pagină și proiect.
- Date structurate JSON-LD: `LocalBusiness` (sau subtipul potrivit) cu nume, adresă, telefon, program **exact ca în profilul Google Business** (TODO), `areaServed: România`, plus `BreadcrumbList`. Fără `Product` cu prețuri și fără recenzii în schema dacă nu sunt reale.
- Core Web Vitals: imaginea principală cu `priority`, restul lazy, `sizes` corecte, fără layout shift (dimensiuni fixe pentru imagini).
- Linkuri interne: categorie ↔ proiecte ↔ cerere ofertă.

### Conversie
- Pe fiecare pagină, un CTA clar spre cerere de ofertă și telefon/WhatsApp (TODO).
- Formularul de ofertă cere doar esențialul: nume, telefon, ce mobilă, eventual dimensiuni și poze ale spațiului.

---

## 6. Date de completat de Alex (TODO)

- [ ] Telefon, email, WhatsApp
- [ ] Adresa sediului sau a atelierului (zona deservită: toată țara)
- [ ] Program
- [ ] Link profil Google Business
- [ ] Linkuri TikTok / Instagram / Facebook
- [ ] Adresare: „tu” sau „dumneavoastră”
- [ ] Ce oferim efectiv: proiect 3D, măsurători, transport, montaj, garanție (doar ce e adevărat)
- [ ] Hosting