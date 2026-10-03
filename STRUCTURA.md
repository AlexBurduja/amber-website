# Structura propusă pentru ambermob.ro

Propunere de confirmat de Alex înainte de construcție. Sursele: CLAUDE.md (brand, reguli, SEO), `data/proiecte.js` (64 de proiecte publicate) și skill-urile de design instalate. Unde skill-urile contrazic CLAUDE.md, am respectat CLAUDE.md (detalii în DECIZII.md, secțiunea 9).

Tot ce e marcat **TODO** depinde de date pe care doar tu le poți da: telefon, adresă, program, ce servicii oferiți efectiv, adresare cu „tu” sau „dumneavoastră”. Textele propuse mai jos evită pronumele de adresare până decizi.

---

## 1. Direcția

**Cum citesc brief-ul:** site de prezentare care trebuie să convingă (modul *Persuade*). Publicul: oameni care își amenajează casa sau un spațiu comercial și caută „mobilă la comandă” pe Google sau ajung din social media. Ritmul e de atelier, cu materiale reale. Fotografiile sunt produsul.

**Ideea centrală: sertarul tras în afară.** Logo-ul are un sertar galben scos din șir. Pe site, același gest marchează un singur lucru: *unde ești* și *ce poți deschide*. Bara galbenă decalată apare în trei locuri și nicăieri altundeva:

1. sub titlul din hero, unde iese o dată la încărcarea paginii, ca în `amber-logo-animat.svg`;
2. ca stare activă în meniu;
3. la marginea de jos a cardului de proiect, la hover sau focus.

**Momentul memorabil** de pe homepage e secțiunea „Randare și realizat”: proiectul 3D pus lângă bucătăria montată, din același unghi. E o dovadă concretă, pe care un șablon generic n-o poate imita.

**Ce evităm:**
- carduri identice cu umbre gri;
- trei coloane egale de „beneficii”;
- supratitluri cu majuscule deasupra fiecărei secțiuni;
- etichete peste poze (singura excepție e „PROIECT 3D”, cerută de CLAUDE.md);
- cifre inventate („500+ proiecte”);
- animații de intrare pe fiecare secțiune.

---

## 2. Sistemul vizual

### Culori
Doar cele din CLAUDE.md, definite ca variabile în `:root`. Cum le folosim:

| Rol | Variabilă |
| --- | --- |
| Fundal pagină | `--paper` |
| Secțiuni alternative, bandă „Cum lucrăm” | `--sand` |
| Formulare, panouri peste `--paper` | `--white` |
| Hero, footer | `--ink`; textul alb, accentele `--amber` |
| Text principal / secundar | `--ink` / `--stone` |
| Borduri, separatoare | `--line` |
| Accent: buton principal, bara-sertar, focus | `--amber`, hover `--amber-hover` |
| Singura secțiune galbenă pe pagină | banda „Cere ofertă” |

Linkurile pe fundal deschis sunt `--ink`, subliniate cu `--amber` (2px, decalat 3px). Nu folosim niciodată text galben pe fundal deschis.

### Tipografie
- **Montserrat 600** pentru H1 și H2, **500** pentru H3 și butoane. Fără 700+.
- **DM Sans 400/500** pentru text, la 17px pe mobil și 18px pe desktop, `line-height: 1.6`, cel mult 68 de caractere pe rând.
- **Scara de mărimi:**

  | Element | Mobil | Desktop | Interlinie | Litere |
  | --- | --- | --- | --- | --- |
  | H1 | 36px | 60px | 1.1 | −0,01em |
  | H2 | 28px | 40px | 1.15 | normal |
  | H3 | 20px | 24px | normal | normal |
  | Text mic | 14px | 14px | normal | normal |
  | Etichete | 12px | 13px | normal | majuscule, 0,12em |

- **Etichetele cu majuscule** se folosesc doar pentru informație reală: categoria unui proiect, „PROIECT 3D”. Ca supratitlu de secțiune apar de cel mult două ori pe homepage.
- **Diacriticele** (ș, ț cu virgulă) se verifică vizual în ambele fonturi la primul build.

### Formă, spațiu, mișcare
- **Colțuri:** o singură regulă, 2px peste tot (imagini, butoane, câmpuri). Mobila are muchii drepte, deci și site-ul.
- **Umbre:** practic nu există. Ierarhia se face prin spațiu, linii `--line` și fundaluri `--sand`/`--white`.
- **Spațiere:** grilă de 8px. Secțiunile au 96–128px pe verticală pe desktop și 64px pe mobil. Conținutul are maximum 1280px lățime și margini laterale de 16px pe mobil.
- **Mișcare:** un singur moment orchestrat, sertarul din hero (bara galbenă iese în 600ms, `cubic-bezier(.16,1,.3,1)`). În rest, doar feedback la acțiuni: bara de pe card, deschiderea întrebărilor frecvente, trimiterea formularului. Toate se opresc cu `prefers-reduced-motion`. Animăm doar `transform` și `opacity`.
- **Mod întunecat:** nu (vezi DECIZII.md). Site-ul e luminos, cu hero și footer închise la culoare.
- **Iconițe:** o singură familie, Phosphor (`@phosphor-icons/react`), cu linie de 1,5. Se instalează la construcție. Iconițele sunt negre, iar pe fundal închis albe sau `--amber`.

### Imaginile
- **Rezoluție.** Majoritatea pozelor din arhivă au 1200px lățime. Regula de afișare: nicio imagine nu se întinde pe mai mult decât jumătate din lățimea sursei în pixeli CSS. O sursă de 1200px se afișează cel mult la ~600px pe ecrane retina și ~900px pe ecrane normale. Pe toată lățimea paginii merg doar sursele de 2400px.
- **Încărcare.** `next/image` cu `sizes` corecte, `priority` doar pe imaginea principală, restul lazy. Dimensiunile sunt cunoscute din `latime`/`inaltime`, deci nu apare layout shift.
- **Randări.** Eticheta „PROIECT 3D” e mică, în colțul din stânga sus: fundal `--ink`, text alb, 12px, majuscule. Randările apar după pozele reale. Când o randare are pereche, se afișează alăturat cu poza reală (pe mobil, una sub alta).

### Componente
Componentele de bază: `Antet`, `Meniu` (cu sertarul activ), `Buton` (principal galben / secundar ink / text), `CardProiect`, `GalerieProiect`, `PerecheRandare`, `BandaOferta`, `IntrebariFrecvente` (cu `<details>` nativ), `FormularOferta`, `Subsol`, `Breadcrumb`, `JsonLd`.

Același tip de cerere are aceeași etichetă peste tot:

| Intenție | Etichetă |
| --- | --- |
| Cerere de ofertă | „Cere ofertă” |
| Portofoliu | „Vezi proiectele” |
| Telefon | numărul afișat (TODO) |
| WhatsApp | „WhatsApp” (TODO) |

---

## 3. Harta site-ului

| URL | Ce e | H1 propus | `title` (≤ 60) |
| --- | --- | --- | --- |
| `/` | Acasă | Mobilă la comandă, pe măsura spațiului | Mobilă la comandă în București și în toată țara \| Amber |
| `/mobila-la-comanda` | Pagina principală de servicii | Mobilă la comandă | Mobilă la comandă: bucătării, dormitoare, living \| Amber |
| `/bucatarii-la-comanda` | Categorie (20 proiecte) | Bucătării la comandă | Bucătării la comandă, proiectate pe măsură \| Amber |
| `/dressinguri-la-comanda` | Categorie (1 proiect + dulapuri) | Dressinguri la comandă | Dressinguri și dulapuri la comandă \| Amber |
| `/dormitoare-la-comanda` | Categorie (16) | Dormitoare la comandă | Dormitoare și paturi tapițate la comandă \| Amber |
| `/living-la-comanda` | Categorie (10) | Mobilier de living la comandă | Mobilier living la comandă: pereți TV, biblioteci \| Amber |
| `/mobilier-hol-si-baie` | Categorie (12) | Mobilier de hol și baie la comandă | Mobilier hol și baie la comandă \| Amber |
| `/mobilier-comercial` | Categorie (5) | Mobilier comercial la comandă | Mobilier comercial la comandă: birouri, recepții \| Amber |
| `/proiecte` | Toate proiectele | Proiecte | Proiecte de mobilă la comandă \| Amber |
| `/proiecte/[slug]` | 64 de pagini de proiect | titlul proiectului | `{titlu} \| Amber` (scurtat la 60) |
| `/despre` | Despre firmă | Despre Amber | Despre Amber Creativity, mobilă la comandă |
| `/contact` | Contact | Contact | Contact \| Amber, mobilă la comandă |
| `/cerere-oferta` | Formular | Cere ofertă | Cere ofertă pentru mobilă la comandă \| Amber |
| `/politica-de-confidentialitate`, `/cookies` | Pagini legale (TODO conținut) | — | — |

**Fișiere generate automat:** `sitemap.xml` (din pagini și din `proiectePublicate`), `robots.txt`, `manifest` (există deja) și imagini Open Graph. Paginile principale folosesc `app/opengraph-image.png`. Fiecare proiect folosește prima lui poză reală (sau prima randare), decupată la 1200×630 la build.

**Fără** pagini pe orașe și fără redirecționări de pe domeniul vechi.

---

## 4. Homepage, secțiune cu secțiune

Sunt 9 blocuri, cu 7 tipuri de layout diferite. Titlurile de mai jos sunt propuneri de text, scrise de la zero.

### 4.1 Antet (fix sus, 72px desktop / 60px mobil, fundal `--paper`)
```
[AMBER logo]      Mobilă la comandă ▾   Proiecte   Despre   Contact     [TODO telefon]  [Cere ofertă]
```
- **Logo:** `amber-logo-color.svg`, 30px înălțime pe desktop și 22px pe mobil.
- **Meniul „Mobilă la comandă”** deschide o listă cu cele 6 categorii și pagina generală. Pagina activă e marcată cu bara-sertar galbenă sub link, decalată 4px spre dreapta.
- **Pe mobil:** logo, buton „Cere ofertă” compact și meniu tip hamburger care se deschide pe tot ecranul.
- Antetul stă pe un singur rând pe desktop.

### 4.2 Hero (fundal `--ink`, cel puțin 88vh pe desktop, fără să depășească ecranul)
```
┌──────────────────────────────┬─────────────────────────────────────────┐
│                              │                                         │
│  Mobilă la comandă,          │                                         │
│  pe măsura spațiului         │      [foto: bucătărie verde salvie      │
│  ▬▬▬▬▬▬▬▬  ←bara-sertar     │       cu peninsulă și lamele, 01]       │
│                              │       iese până la marginea paginii     │
│  Bucătării, dormitoare,      │                                         │
│  dressinguri și living,      │                                         │
│  proiectate după măsurători. │                                         │
│  Sediu în București, lucrăm  │                                         │
│  în toată țara.              │                                         │
│                              │                                         │
│  [Cere ofertă]  Vezi proiectele                                        │
└──────────────────────────────┴─────────────────────────────────────────┘
```
- **Împărțire asimetrică:** 5/12 text, 7/12 imagine. Imaginea iese până la marginea din dreapta a paginii.
- **Imaginea:** `bucatarie-verde-salvie-peninsula-lamele-01.jpg` (2400px, cea mai bună poză reală la rezoluție mare), cu `priority`.
- **Textul:** H1 alb pe 2 rânduri. Bara-sertar galbenă (8px înălțime, 96px lățime) iese o dată din stânga, la încărcare. Subtextul are 19 cuvinte. Butonul principal e galben cu text `--ink`, cel secundar e un link alb subliniat cu galben.
- **Pe mobil:** imaginea sus (raport 4:3), textul dedesubt, tot pe `--ink`.
- **În hero nu intră** cifre, logo-uri de clienți sau liste de beneficii.

### 4.3 Categorii (fundal `--paper`): mozaic asimetric, nu coloane egale
```
┌───────────────────────────┬──────────────┬──────────────┐
│                           │  Dormitoare  │   Living     │
│        Bucătării          │   (16)       │   (10)       │
│          (20)             ├──────────────┼──────────────┤
│                           │ Hol și baie  │ Dressinguri  │
│                           │   (12)       ├──────────────┤
│                           │              │ Comercial(5) │
└───────────────────────────┴──────────────┴──────────────┘
```
- **H2:** „Ce facem”.
- **Celule:** 6 categorii, deci exact 6 celule. Bucătăriile ocupă un dreptunghi mare, pentru că sunt cea mai importantă categorie.
- **Conținutul unei celule:** poza, apoi sub ea numele categoriei (Montserrat 500) și numărul de proiecte, calculat din date. Textul e sub imagine, nu peste ea.
- **Imagini:**

  | Categorie | Imagine |
  | --- | --- |
  | Bucătării | `bucatarie-verde-inchis-riflaj-insula-01` |
  | Dormitoare | `dormitor-mansarda-dulapuri-crem-01` (2400px) |
  | Living | `perete-tv-alb-nisa-neagra-01` (2400px) |
  | Hol și baie | `baie-bej-riflaj-blat-lemn-01` |
  | Dressinguri | `dressing-birou-masa-machiaj-02` |
  | Comercial | `birou-executiv-alb-lucios-furnir-01` |

- **La hover/focus:** imaginea se mărește discret (scale 1.02), iar bara-sertar apare sub numele categoriei.
- **Pe mobil:** Bucătării pe toată lățimea, restul în 2 coloane.

### 4.4 Proiecte alese (fundal `--paper`): rând orizontal derulabil
- **H2:** „Proiecte realizate”, iar în dreapta, aliniat cu titlul, linkul „Vezi proiectele”.
- **Rândul:** 6 carduri cu derulare orizontală nativă (`scroll-snap`), fără scroll automat. Imaginile au 4:5 sau 3:2, după cadrul fiecărei poze, pentru un ritm variat.
- **Proiectele alese** sunt doar cu poze reale, unul din fiecare zonă:
  1. `bucatarie-verde-inchis-riflaj-insula`
  2. `perete-tv-alb-nisa-neagra`
  3. `dormitor-mansarda-dulapuri-crem`
  4. `camera-fetita-roz-pat-casuta`
  5. `baie-alba-blat-suspendat-oglinda`
  6. `dressing-birou-masa-machiaj`
- **Cardul:** imaginea, eticheta categoriei (majuscule mici, `--stone`) și titlul. La hover/focus, bara-sertar galbenă iese de sub card cu 6px, decalată spre dreapta.
- **Pe desktop** se pot folosi și săgeți vizibile, ca butoane, pentru cine nu derulează orizontal.

### 4.5 Randare și realizat (fundal `--sand`): momentul memorabil
```
   Randare și realizat
   Înainte de execuție, spațiul se vede în 3D. [TODO: confirmă că oferiți proiect 3D]

   ┌─────────────────────────┐ ┌─────────────────────────┐
   │ PROIECT 3D              │ │                         │
   │   [randare]             │ │   [foto reală]          │
   └─────────────────────────┘ └─────────────────────────┘
     Bucătărie albă și gri cu accente de stejar  ·  Vezi proiectul

   (●) Bucătărie bej     ( ) Bucătărie albă și gri    ( ) Perete TV cu lamele
```
- **Imaginile:** două, alăturate și egale. Randarea are eticheta „PROIECT 3D”.
- **Comutatorul de sub imagini** schimbă perechea. E un grup de butoane radio accesibil de la tastatură, iar schimbarea e o tranziție de opacitate.
- **Perechi disponibile în date** (câmpul `pereche`):

  | Proiect | Randare | Foto reală |
  | --- | --- | --- |
  | `bucatarie-bej-mat-lemn-masiv` | 04 | 01 |
  | `bucatarie-alb-gri-accente-stejar` | 06 | 01 |
  | `perete-tv-alb-stejar-lamele` | 08 | 01 |
  | `bucatarie-cappuccino-lucios-alb` | 04 | 01 |

- **Condiție:** dacă nu confirmi că oferiți proiect 3D, titlul rămâne „Randare și realizat”, iar textul descrie doar perechea, fără să promită serviciul.
- **Pe mobil:** imaginile una sub alta, cu comutatorul deasupra.

### 4.6 Cum lucrăm (fundal `--paper`): o secvență reală, deci numerotată
```
 1 ──────── 2 ──────── 3 ──────── 4 ──────── 5
 Discuție   Măsurători  Proiect    Execuție   Transport
 și ofertă              [TODO 3D]             și montaj [TODO]
```
- **H2:** „Cum lucrăm”.
- **Linia cu pași:** 5 pași pe o linie orizontală (`--line`), cu numerele în Montserrat 600. Fiecare pas are un rând scurt de text concret.
- **Pași care trebuie confirmați:** măsurătorile la fața locului, proiectul 3D, transportul și montajul (vezi CLAUDE.md §6). Până la confirmare, pașii nesiguri stau în cod ca TODO și nu apar pe site.
- **Pe mobil:** pașii devin o listă verticală, cu linia pe stânga.

### 4.7 Detalii de execuție (fundal `--paper`): mozaic de detalii
- **H2:** „Detaliile contează”.
- **Imaginile** sunt 5 decupaje de aproape din poze reale existente. Fiecare imagine e link spre proiectul ei:
  - front riflat verde: `bucatarie-verde-inchis-riflaj-insula-04`
  - panou din împletitură: `dormitor-mansarda-impletitura-turcoaz-04`
  - lemn masiv cu rășină: `masa-lemn-rasina-albastra-02`
  - sertar verde mentă: `bucatarie-verde-menta-clasica-03`
  - riflaj de baie cu buton negru: `baie-bej-riflaj-blat-lemn-03`
- **Grila** are cinci celule de mărimi diferite (2 mari, 3 mici), fără celule goale.
- **Text:** o propoziție sub fiecare imagine, care descrie *ce se vede* (finisaj, mâner, îmbinare). Nimic despre calitate „premium”.

### 4.8 În toată țara (fundal `--white`, bloc de text îngust)
- **H2:** „Sediul e în București. Lucrăm în toată țara.”
- **Text:** 2–3 propoziții despre cum se lucrează la distanță: cererea pornește de la dimensiuni și poze trimise prin formular, iar restul pașilor depinde de ce confirmi (măsurători, transport, montaj).
- **Fără hartă desenată** și fără liste de orașe. E un singur bloc de text, cu o linie galbenă de 4px pe stânga (bara-sertar pe verticală).
- **De ce contează:** acoperă căutările din alte orașe fără pagini clonate, cum cere CLAUDE.md.

### 4.9 Banda „Cere ofertă” (singura secțiune galbenă, `--amber`, text `--ink`)
```
  Spune-ne ce mobilă îți trebuie.          [Cere ofertă]   [TODO telefon]   [WhatsApp]
  Ajung nume, telefon și, dacă le ai, dimensiuni și poze.
```
- **Formulare:** textul de mai sus e propunerea pentru adresarea cu „tu”. Varianta neutră, până decizi: „Cererea de ofertă cere doar nume, telefon și tipul de mobilă.”
- **Butoane:** cel principal e `--ink` cu text alb (pe galben, butonul galben nu se vede). Telefonul și WhatsApp sunt butoane secundare cu contur `--ink`.

### 4.10 Subsol (fundal `--ink`)
- **Coloana 1:** `amber-logo-pe-inchis.svg` și o propoziție despre firmă (Amber Creativity SRL, București, lucrează în toată țara).
- **Coloana 2:** categoriile.
- **Coloana 3:** Proiecte, Despre, Contact, Cere ofertă.
- **Coloana 4:** telefon, email, program, adresă (TODO, exact ca în profilul Google Business), TikTok, Instagram și Facebook (TODO).
- **Rândul de jos:** © Amber Creativity SRL, CUI (TODO), Politica de confidențialitate, Cookies, ANPC, SOL.

---

## 5. Celelalte pagini

### 5.1 `/mobila-la-comanda`, pagina principală de servicii
Ținta e expresia generală „mobilă la comandă”. Pagina ține legătura între categorii și nu repetă textul lor.
1. **H1 și intro** (2 paragrafe): ce înseamnă mobila la comandă, adică făcută după măsurile spațiului și cu materiale alese.
2. **Categoriile:** 6 rânduri, fiecare cu o imagine, un paragraf de 2 propoziții și link spre pagina categoriei.
3. **Cum lucrăm:** varianta completă a pașilor de pe homepage (TODO pentru pașii neconfirmați).
4. **Ce influențează prețul:** factori generali (dimensiuni, materialul fronturilor, tipul blatului, feronerie, accesorii, montaj). Fără cifre și fără „de la X lei”.
5. **Livrare și montaj în toată țara:** secțiunea detaliată (TODO cu ce e adevărat).
6. **Întrebări frecvente:** 5–6 întrebări generale. Răspunsurile despre termene, garanții și prețuri rămân TODO.
7. **Banda „Cere ofertă”.**

### 5.2 Paginile de categorie (șablon comun, text propriu pe fiecare)
Toate cele 6 au aceeași structură și text scris separat:
1. **Breadcrumb** (Acasă › Mobilă la comandă › Bucătării), cu `BreadcrumbList` în JSON-LD.
2. **H1, un paragraf și „Cere ofertă”.** Imaginea principală e prima poză reală a primului proiect din categorie.
3. **Proiectele categoriei:** grilă cu toate proiectele publicate. Cele cu poze reale apar primele, cele doar 3D la final, cu eticheta lor. Pe desktop sunt 3 coloane cu înălțimi variabile, după cadrul pozelor.
4. **Cum lucrăm pentru categoria respectivă:** 3–4 paragrafe concrete (exemplu la bucătării: măsurarea pereților și a racordurilor, alegerea electrocasnicelor înainte de proiect).
5. **Materiale și finisaje:** text educativ, general și adevărat (diferențele dintre fronturi mate, lucioase, cu ramă, riflate; tipuri de blat). Fără promisiunea că firma lucrează cu un anumit material, până confirmi.
6. **Ce influențează prețul** pentru categorie.
7. **Întrebări frecvente:** 4–6 întrebări, cu `<details>`. Nu folosim `FAQPage` în JSON-LD decât dacă răspunsurile sunt complete și adevărate.
8. **Banda „Cere ofertă”.**

**Ce se schimbă de la o categorie la alta:**
- **Bucătării:** 20 de proiecte, cu filtru simplu „Realizate / Proiecte 3D”.
- **Dormitoare:** proiectele se grupează în „Dormitoare”, „Camere de copii” și „Paturi tapițate”. Gruparea se face din `slug`/titlu la build, fără câmp nou în date.
- **Dressinguri:** are un singur proiect. Propun o secțiune în plus, „Dulapuri pe toată înălțimea”, care arată proiectele de dormitor cu dulapuri: `dormitor-mansarda-dulapuri-crem`, `camera-fetita-roz-pat-casuta`, `camera-copii-menta-pat-supraetajat`. Asta cere un câmp opțional `categoriiSecundare` în `data/proiecte.js`, pe care îl adaug la construcție dacă ești de acord.
- **Living:** grupuri „Pereți TV” și „Mese și piese din metal”.
- **Hol și baie:** grupuri „Băi” și „Holuri și scări”.
- **Comercial:** 5 proiecte, plus un paragraf despre lucrul cu firme (TODO: facturare, termene).

### 5.3 `/proiecte`
- **H1** și o propoziție.
- **Filtru pe categorii:** pastile (Toate, Bucătării, …), linkuri cu `?categorie=`, fără JavaScript obligatoriu. Paginile de categorie rămân canonice pentru SEO, deci `/proiecte?categorie=…` are `canonical` spre `/proiecte`.
- **Grila:** toate cele 64 de proiecte, cu carduri ca la 4.4 și raportul real al pozelor. Mai întâi proiectele cu poze reale, apoi cele 3D.

### 5.4 `/proiecte/[slug]` (generată static pentru fiecare proiect publicat)
```
Acasă › Proiecte › Bucătării › Bucătărie gri-oliv cu insulă și blat de stejar

[ imaginea principală, max ~900px lățime ]          H1 titlu
                                                    [PROIECT 3D] dacă proiect3d
                                                    descriere (2–4 propoziții)
                                                    Materiale și finisaje: listă scurtă
                                                    [Cere ofertă]   Vezi categoria

[ galerie: restul pozelor reale, grilă 2 coloane ]
[ Randare și realizat: perechile, alăturat ]
[ Alte proiecte din categorie: 3 carduri ]
```
- **Galeria** se deschide într-un vizualizator pe tot ecranul (`<dialog>` nativ, cu tastatură și Esc).
- **`proiect3d: true`:** eticheta e lângă H1 și pe fiecare imagine. Butonul spune tot „Cere ofertă”, fără promisiuni.
- **Metadate:** `title` din titlu, `description` din prima propoziție a descrierii (scurtată la 155), imagine OG din prima poză, canonical, `BreadcrumbList`. Fără `Product` și fără prețuri.

### 5.5 `/despre`
Tot ce ar fi poveste inventată rămâne TODO. Structura propusă:
1. **Cine suntem:** Amber Creativity SRL, București, lucrează în toată țara. Ani de activitate și echipă: TODO.
2. **Atelierul:** poze noi (TODO, `sursa: "amber"`). Pagina nu folosește poze din arhivă.
3. **Cum lucrăm:** link spre pagina de servicii.
4. **Banda „Cere ofertă”.**

### 5.6 `/contact`
- **Date:** telefon, WhatsApp, email, program și adresă (TODO, identice cu Google Business). Linkul spre profilul Google Business (TODO).
- **Hartă:** doar după ce există adresa. Se încarcă la click („Arată harta”), ca să nu afecteze performanța și cookie-urile.
- **Formular scurt:** link spre `/cerere-oferta`, nu un al doilea formular.
- **JSON-LD `LocalBusiness`** (propun `HomeAndConstructionBusiness`, vezi DECIZII.md), cu `areaServed: România`.

### 5.7 `/cerere-oferta`
Un formular pe `--white`, cu etichetele deasupra câmpurilor și erorile sub ele.

| Câmp | Obligatoriu | Note |
| --- | --- | --- |
| Nume | da | |
| Telefon | da | `type="tel"`, validare pentru format românesc |
| Ce mobilă | da | butoane de selecție multiplă: Bucătărie, Dressing, Dormitor, Living, Hol, Baie, Comercial, Altceva |
| Localitate | nu | util pentru transport, vezi DECIZII.md |
| Dimensiuni sau detalii | nu | câmp de text liber |
| Poze ale spațiului | nu | până la 6 imagini, cel mult 10 MB fiecare; limitele se stabilesc odată cu hosting-ul |
| Acord pentru prelucrarea datelor | da | link spre politica de confidențialitate |

- **Trimiterea:** server action din Next.js, plus un serviciu de email. Ce serviciu depinde de hosting (TODO).
- **Stări:**
  - Se trimite: butonul e dezactivat și scrie „Se trimite…”.
  - Succes: mesaj pe pagină cu ce urmează, fără termen promis.
  - Eroare: mesaj concret și varianta de a suna (TODO telefon).
- **Fără captcha vizibil.** Folosim un câmp-capcană ascuns și limitare de rată pe server.
- **Lângă formular,** pe desktop: telefon și WhatsApp, pentru cine preferă să sune.

---

## 6. Ce proiect intră unde

Toate proiectele publicate apar pe `/proiecte`, pe pagina categoriei lor și pe pagina proprie. Pe homepage apar doar cele de la 4.3–4.7. Ordinea din fiecare categorie e cea din `data/proiecte.js`: întâi poze reale, apoi proiecte 3D.

- **Bucătării (20):**
  - cu poze reale:
    - `bucatarie-gri-oliv-insula-stejar`
    - `bucatarie-alba-peninsula-blat-antracit`
    - `bucatarie-bej-mat-lemn-masiv`
    - `bucatarie-alb-gri-accente-stejar`
    - `bucatarie-verde-inchis-riflaj-insula`
    - `bucatarie-gri-albastru-lamele-lemn`
    - `bucatarie-alba-mat-perete-stejar`
    - `bucatarie-alba-liniara`
    - `bucatarie-bleu-alb-insula`
    - `bucatarie-bej-mat-insula-blat-piatra`
    - `bucatarie-albastru-petrol-alb`
    - `bucatarie-cappuccino-lucios-alb`
    - `bucatarie-portocaliu-lucios-crem`
    - `bucatarie-verde-salvie-peninsula-lamele`
    - `bucatarie-alba-cu-rama-insula`
    - `bucatarie-verde-menta-clasica`
    - `bucatarie-crem-cu-rama-blat-lemn`
  - doar proiect 3D:
    - `bucatarie-verde-salvie-proiect-3d`
    - `bucatarie-neagra-insula-lemn-proiect-3d`
    - `bucatarie-coral-lemn-proiect-3d`
- **Dressinguri (1):** `dressing-birou-masa-machiaj`, plus secțiunea de dulapuri de la 5.2.
- **Dormitoare (16):**
  - dormitoare:
    - `dormitor-mansarda-dulapuri-crem`
    - `dormitor-crem-tablie-capitonata`
    - `dormitor-mansarda-impletitura-turcoaz`
    - `dormitor-tablie-alba-comoda-lucioasa`
    - `dormitor-stejar-tablie-gri`
    - `pat-rabatabil-dulap-alb-negru`
    - `pat-rabatabil-dulapuri-benzi-colorate`
  - camere de copii:
    - `camera-fetita-roz-pat-casuta`
    - `camera-copil-pat-casuta-stejar`
    - `camera-copii-menta-pat-supraetajat`
    - `camera-copil-alba-pat-canapea`
    - `camera-tineret-turcoaz-picioare-strunjite`
    - `pat-copil-tapitat-casuta`
  - paturi tapițate:
    - `pat-tapitat-catifea-verde`
    - `pat-tapitat-perete-albastru`
    - `pat-tapitat-bej-tablie-lata`
- **Living (10):**
  - pereți TV:
    - `perete-tv-alb-stejar-lamele`
    - `perete-tv-alb-nisa-neagra`
    - `perete-tv-furnir-nuc-vitrina`
    - `living-dining-alb-cu-rama-vitrina`
    - `comoda-tv-semineu-electric`
    - `mobilier-tv-taupe-stejar-suspendat`
    - `living-comoda-tv-alb-negru`
  - mese și piese din metal:
    - `masa-lemn-rasina-albastra`
    - `masuta-stejar-picioare-metalice`
    - `biblioteca-structura-metalica-neagra`
- **Hol și baie (12):**
  - băi:
    - `baie-alba-blat-suspendat-oglinda`
    - `baie-bej-riflaj-blat-lemn`
    - `baie-crem-mat-lavoar-piatra`
    - `baie-gri-antracit-lavoar-piatra`
    - `baie-maro-mat-doua-lavoare`
    - `baie-galben-lucios`
  - holuri și scări:
    - `dulapuri-sub-scara`
    - `hol-dulap-alb-picioare-strunjite`
    - `hol-comoda-bar-scara-lemn`
    - `hol-cuier-cosuri-impletite`
    - `biblioteca-riflaj-masca-calorifer`
    - `balustrada-metalica-scara`
- **Comercial (5):**
  - `birou-executiv-alb-lucios-furnir`
  - `receptie-gri-placare-iluminata`
  - `showroom-insula-stejar-antracit`
  - `spatiu-comercial-vinuri-rafturi-aurii`
  - `cafenea-caramida-mobilier-negru-proiect-3d` (doar 3D)
- **Nepublicate (9, câte o singură imagine):** rămân în date cu `publicat: false` și nu apar nicăieri.

**Linkuri interne:** fiecare proiect trimite spre categoria lui și spre „Cere ofertă”. Fiecare categorie trimite spre proiectele ei, spre `/mobila-la-comanda` și spre „Cere ofertă”. Homepage-ul trimite spre toate categoriile.

---

## 7. SEO tehnic (la construcție)

- **Pagini:** `lang="ro"`, Metadata API cu `title`/`description` unice, `alternates.canonical` pe fiecare pagină, un singur H1, ierarhie H2/H3 corectă.
- **JSON-LD pe tot site-ul:** `HomeAndConstructionBusiness` (nume, adresă, telefon, program, `areaServed: România`; câmpurile neconfirmate lipsesc până se completează).
- **JSON-LD pe pagini:** `BreadcrumbList` pe pagini interne. Fără `Product`, fără `AggregateRating`.
- **Fișiere:** `sitemap.xml` din toate paginile publice și proiectele publicate; `robots.txt` care permite tot și indică sitemap-ul.
- **Performanță:** imaginea principală cu `priority`, restul lazy, `sizes` exacte, dimensiuni fixe, fonturi prin `next/font` cu `latin-ext`. Ținte: LCP < 2,5s, CLS < 0,1.
- **Verificare** cu `playwright-cli` la 1440px și 390px după fiecare pagină.

---

## 8. Ordinea de construcție propusă

1. Layout global: fonturi, variabile, antet, subsol, componentele de bază.
2. Homepage.
3. Șablonul de proiect și `/proiecte`.
4. Șablonul de categorie, cu textul pentru Bucătării; apoi restul categoriilor.
5. `/mobila-la-comanda`.
6. `/cerere-oferta`, cu trimiterea reală după alegerea hosting-ului.
7. `/contact`, `/despre`, paginile legale.
8. Sitemap, robots, JSON-LD, imagini OG, verificare finală.

## 9. Ce trebuie să decizi înainte de construcție

1. Confirmi structura de pagini și homepage-ul de mai sus?
2. „Tu” sau „dumneavoastră”?
3. Ce oferiți efectiv: proiect 3D, măsurători, transport, montaj, garanție? De asta depind 4.5, 4.6 și 4.8.
4. Pagina de dressinguri cu un singur proiect plus dulapurile din dormitoare: da sau nu?
5. Telefon, WhatsApp, email, adresă, program, Google Business, rețele sociale, hosting (lista din CLAUDE.md §6).
