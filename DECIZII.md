# Decizii luate autonom (de verificat de Alex)

Unde am avut de ales, am mers pe varianta cea mai sigură: **în dubiu, nu se publică**. Fiecare punct de mai jos se poate inversa ușor. Clasificarea completă, cu motivul pentru fiecare imagine, e în câmpul `nota` din `export-complet/manifest.json` (și în `manifest.csv`, regenerat din el).

Legendă: **[V]** = trebuie verificat de tine; **[i]** = doar informativ.

---

## 1. Brand vechi și conținut intern

- **[V] Watermark-ul firmei vechi** apare pe 3 fotografii reale, toate din proiectul de hol cu lamele: #57, #58, #293. Sunt excluse. Am verificat toată arhiva automat (căutare după forma și culorile siglei) și n-am mai găsit altele. Scorurile celorlalte imagini sunt la nivel de zgomot.
- **[i] Excluse pentru că aparțin firmei vechi:** documentele legale scanate (#363–367), portretele echipei (#356–359), showroom-ul propriu (#25, #26), bannerul cu text și numele firmei peste imagine (#362) și imaginile de stoc de pe pagina de servicii.
- **[i] Numele vechi mai apărea în numele unor fișiere** (proiectul cu accente din lemn). Toate imaginile publicate au fost redenumite, iar metadatele au fost șterse. Am verificat după procesare: niciun fișier din `public/proiecte/` nu mai are EXIF, IPTC, XMP sau ICC.
- **[i] Legătura proiect ↔ folder din arhivă** e în `export-complet/mapare-proiecte.json`, care e ignorat de git. În `data/proiecte.js` nu există nicio adresă sau denumire de pe site-ul vechi.

## 2. Deciziile tale pentru bucătării (aplicate)

- #0 și #92 nu se folosesc. #72 nu se folosește. #258 e desen tehnic.
- #278 se folosește ca pereche cu #29 (eticheta „Proiect 3D”).
- **#83:** ramele cu fotografii din dreapta se văd destul de clar ca să fie recunoscute, așa că au fost decupate (rămâne 86% din lățime). Pe rafturile rămase sunt doar căni și vase.
- **Colaje decupate** (doar în proiectele cu sub 3 poze reale și doar unde iese un cadru curat): #6 (bucătăria neagră mat), #109, #101, #82 la bucătării, #76 (baie), #122 și #210 (dormitoare), #55 (hol).
  - **[V] #6** e singura poză a bucătăriei negre. Chiar și decupată, proiectul are o singură imagine, deci rămâne `publicat: false`.
  - Colajele #86 (are perete cu fotografii) și #100 (doar detalii de balamale) n-au fost decupate.

## 3. Persoane, fotografii personale, mărci

- **[V] Fotografii personale decupate:** #223 (ramă cu fotografie de familie pe comodă) și #297 (ramă pe perete). În #161 am decupat marginea unui ecran publicitar.
- **[i] Excluse pentru fotografii personale:** #301 (fotografie de nuntă pe perete), #379 (uși imprimate cu fotbaliști reali și poze de familie cu copii) și #176 (care oricum are rezoluție mică).
- **[V] Mărci și logo-uri ale clienților:** am exclus cadrele în care domină logo-ul clientului sau mărci terțe (#70 și #247 logo de firmă, #68 reclamă cu telefon și site, cadrele cu mărci de șampanie din spațiul pentru vinuri). Din proiectele respective au rămas doar cadrele curate. **Pentru proiectele comerciale ar fi bine să ai acordul clientului înainte de publicare**, chiar și fără logo vizibil.

## 4. Randări și imagini nesigure

- **[V] #38** (living cu perete mov): nu e clar dacă e randare sau foto. Am marcat-o ca randare, deci apare cu eticheta „Proiect 3D”. Varianta asta nu poate prezenta o randare drept lucrare realizată.
- **[i] Schițele SketchUp nefotorealiste #280 și #286** nu se publică. Diferența față de #278: #278 a fost aprobat explicit de tine.
- **[V] Cabinele acustice (19 imagini, 3 pagini sursă):** toate sunt randări de catalog (fundal negru, scene de prezentare), cu aspect de material de producător. Nu le-am publicat. Dacă firma le-a produs efectiv, se pot transforma într-un proiect „Proiect 3D”.
- **[i] Bannerele #1 și #2** (bucătărie albă, 1920×640) nu au proiect asociat. N-au fost publicate.
- **[i] Proiectele doar cu randări** se publică cu `proiect3d: true`: 3 bucătării și cafeneaua. Titlurile încep cu „Proiect 3D: …”.

## 5. Blog

- **[i]** Imaginile din articolele de blog nu au devenit proiecte. Aproape toate sunt duplicate ale pozelor din proiecte (unele exacte, altele aproape identice) sau imagini de stoc.
- **[V]** Două imagini reale de blog nu sunt duplicate: #372 (comodă TV antracit pe perete cu lamele) și #373 (separator din lamele cu blat). Nu au proiect propriu, așa că n-au fost folosite. Pot ilustra textul despre lamele de pe pagina de living, dacă vrei.
- **[i] #380** (birou) e aproape identică cu #166. S-a păstrat originalul din proiect.

## 6. Calitate

- **[i]** Imaginile sub ~600px pe latura mare sunt marcate `slaba` și excluse (#139, #165, #175, #176, #213, #220, #230, #252, #256, #257, #260, bannerele de 850×300).
- **[V] Rezoluție:** majoritatea pozelor din arhivă au **1200px lățime**. Doar câteva ajung la 2400px. De asta, STRUCTURA.md limitează lățimea la care se afișează imaginile. Pozele noi ar trebui să aibă minimum 2400px pe latura mare.
- **[i] Procesare:** JPEG calitate 84, convertit în sRGB, cel mult 2400px. Next.js le servește apoi ca AVIF/WebP.

## 7. Proiecte și categorii

- **[i]** Un proiect corespunde unei pagini sursă (folder), cum e cerut. 73 de proiecte în total, dintre care **64 publicate**:

  | Categorie | Publicate | Nepublicate (o singură imagine) |
  | --- | --- | --- |
  | Bucătării | 20 (dintre care 3 doar proiect 3D) | 2 |
  | Dormitoare | 16 | 2 |
  | Hol și baie | 12 | 3 |
  | Living | 10 | 2 |
  | Comercial | 5 (dintre care 1 doar proiect 3D) | 0 |
  | Dressinguri | 1 | 0 |

- **[V] Încadrarea în categorii** (unde nu era evidentă):
  - Paturile tapițate merg la Dormitoare.
  - Biroul executiv merge la Comercial.
  - Structurile metalice s-au împărțit: balustrada la Hol și baie, măsuța și biblioteca metalică la Living.
  - Bucătăria din open space (#343) rămâne în proiectul de living din același apartament.
- **[V] Trei proiecte de hol cu o singură poză** (dulap gri-lila, dulapuri încastrate, hol alb cu ventilație) par din același apartament cu livingul alb cu vitrină și cu baia bej cu riflaj. Le-am lăsat separate și nepublicate, cum cere regula „un proiect = o pagină sursă”. Dacă îmi confirmi că e aceeași locuință, le pot uni într-un singur proiect.
- **[V] Materialele** sunt descrise **doar după aspect** („fronturi mate verde salvie”, „blat cu aspect de stejar”). Nu am scris MDF, PAL sau compozit, pentru că din poză nu se pot distinge sigur. Dacă îmi confirmi materialele reale, le completez. Nici „onix” nu apare. La recepție am scris „piatră translucidă”.
- **[V] Dressinguri:** există un singur proiect (4 poze reale). Am propus totuși pagina `/dressinguri-la-comanda`, pentru că e o căutare importantă. Pe pagină pot apărea și dulapurile din dormitoare (detalii în STRUCTURA.md). Dacă preferi să nu existe pagina până nu sunt mai multe proiecte, o scot.

## 8. Tehnic

- **[i] AVIF:** `next.config.mjs` are acum `images.formats: ["image/avif", "image/webp"]`.
- **[i] `npm run raport-arhiva`** rulează Node cu `--disable-warning=MODULE_TYPELESS_PACKAGE_JSON`, pentru că `data/proiecte.js` e modul ES într-un proiect fără `"type": "module"`. Alternativa ar fi `"type": "module"` în `package.json`, dar n-am vrut să schimb comportamentul proiectului.
- **[i] Câmpuri noi în manifest:** `categorie_noua`, `decupaj` (fracțiuni x1, y1, x2, y2), `fisier_publicat`. Copia de dinainte de clasificare e `manifest.backup-inainte-clasificare.json`.
- **[i] Titluri fără liniuță:** proiectele 3D se numesc „Proiect 3D: …”, nu „… – proiect 3D”.

## 9. Design și skill-uri

- **[i] Conflictele dintre skill-uri și CLAUDE.md** s-au rezolvat în favoarea CLAUDE.md:
  - fundalul `--paper` cald și `--ink` #111111 (skill-urile le consideră clișee);
  - etichetele cu majuscule și spațiere 0,12em (folosite cu măsură);
  - CSS Modules, fără Tailwind și fără biblioteci de animație;
  - secțiunile închise doar pentru hero și footer.
- **[V] Mod întunecat:** CLAUDE.md nu îl definește. Am propus un site numai luminos, cu hero și footer închise la culoare, cum cere brandul.
- **[i] impeccable:** interviul de descoperire și PRODUCT.md au fost sărite, pentru că ai cerut lucru fără întrebări. CLAUDE.md a ținut loc de brief.
- **[V] Date structurate:** propun tipul `HomeAndConstructionBusiness` (firmă care execută lucrări în casă). `FurnitureStore` se potrivește doar dacă există un showroom deschis publicului.
- **[V] Formularul de ofertă:** pe lângă câmpurile din CLAUDE.md am adăugat „Localitate” (opțional, util pentru transport la nivel național) și bifa de acord GDPR (obligatorie legal când trimiți date).
- **[V] Pagini legale:** politică de confidențialitate, cookies, plus linkurile ANPC/SOL în footer. Sunt necesare pentru un site comercial din România. Conținutul îl aduci tu sau un jurist.

---

## 10. Construcția site-ului (după răspunsurile tale)

### Răspunsurile tale, aplicate
- **[i] Adresare cu „tu”.** Ton cald și concret, fără formulări de reclamă. Toate textele publice sunt scrise de la zero.
- **[i] Fără promisiuni de servicii.** Proiectul 3D, măsurătorile, transportul, montajul și garanția nu apar nicăieri ca servicii oferite.
  - „Cum lucrăm” are 4 pași care sunt adevărați oricum: cererea, discuția, oferta, execuția. Locurile în care se vor adăuga pașii confirmați sunt marcate cu TODO în `components/CumLucram.js`.
  - „Randare și realizat” spune doar că *unele proiecte pornesc de la o randare*. Nu promite că vei primi una.
  - „În toată țara” descrie doar cum pornește cererea de la distanță (TODO în `components/ToataTara.js`).
  - În textele proiectelor, „montat/montată” a devenit „realizat/realizată”, ca să nu sugereze montaj inclus.
- **[i] Dressinguri:** câmpul `categoriiSecundare: ["dressinguri"]` e pus pe 3 proiecte de dormitor cu dulapuri pe toată înălțimea. Pe pagina de dressinguri apar sub „Dulapuri pe toată înălțimea”.
- **[i] Câmpul nou `grup`** din `data/proiecte.js` împarte categoriile în subgrupuri: Dormitoare / Camere de copii / Paturi tapițate, Băi / Holuri și scări, Pereți TV / Mese și piese din metal.
- **[V] Holurile unite.** Am unit doar *holul alb cu dulap încastrat și grile de ventilație* (#61) cu *dulapul gri-lila* (#62), în proiectul `hol-alb-dulap-incastrat-gri-lila`. Am comparat pozele și sunt sigur că e același apartament: același tapet alb-negru cu copaci, același parchet în spic, aceleași uși albe cu panouri. *Holul cu dulapuri albe încastrate* (#60) pare din aceeași locuință (parchet în spic, mânere lungi negre ca la dulapul gri-lila), dar nu sunt sigur, așa că a rămas separat și nepublicat. Dacă îmi confirmi, îl adaug în același proiect. Acum sunt 72 de proiecte, dintre care 65 publicate (Hol și baie: 13).
- **[i] Showroom:** tipul din datele structurate e `FurnitureStore`. Pagina de contact are o secțiune separată pentru showroom, cu adresa și programul (TODO). Showroom-ul apare și în textele de pe homepage, Despre și subsol.
- **[i] Cabinele acustice** nu se publică.

### Decizii luate la construcție
- **[V] TODO-urile vizibile doar în dezvoltare.** Componenta `Todo` arată marcaje punctate cu „TODO: …” doar cu `npm run dev`. În producție nu afișează nimic, iar rândurile goale (telefon, email, adresă, program) dispar complet. Am verificat build-ul de producție: niciun „TODO” în HTML.
- **[i] Toate datele lipsă stau într-un singur fișier,** `lib/site.js` (telefon, WhatsApp, email, adresa showroom-ului, program, Google Business, CUI, rețele). Când le completezi acolo, apar automat în antet, subsol, contact, banda de ofertă și datele structurate.
- **[V] Trimiterea formularului.**
  - Cererea pleacă pe email prin Resend (API simplu, fără dependențe noi). E nevoie de 3 variabile de mediu: `RESEND_API_KEY`, `CERERI_EMAIL_DE_LA`, `CERERI_EMAIL_CATRE` (detalii în `lib/email.js`).
  - Fără ele, în dezvoltare cererea se afișează în consolă. În producție vizitatorul vede un mesaj de eroare care îl îndrumă să sune.
  - Dacă alegi alt furnizor sau alt hosting, se schimbă doar `lib/email.js`.
  - Am testat cap-coadă: validare, eroare de telefon, focus pe primul câmp greșit, încărcare de poze, confirmare.
- **[V] Limitele pentru poze.** Cel mult 5 poze, de până la 5 MB fiecare. Am setat `bodySizeLimit: "26mb"` în `next.config.mjs`. Unele hostinguri (de ex. funcțiile serverless Vercel) acceptă cereri mult mai mici, în jur de 4,5 MB. La alegerea hosting-ului, poate fi nevoie de încărcare directă în spațiul de stocare.
- **[i] Protecție contra spamului,** fără captcha: un câmp-capcană invizibil și maximum 5 cereri pe oră de la aceeași adresă (în memorie; TODO pentru hosting cu mai multe instanțe).
- **[i] Preselecție în formular.** Butonul „Cere ofertă” de pe paginile de categorie bifează deja tipul de mobilă (ex. `/cerere-oferta?mobila=Bucătărie`).
- **[V] Paginile legale** (politica de confidențialitate și cookie-uri) sunt *ciorne* care descriu ce face efectiv site-ul: doar formularul și nicio analiză de trafic. **Trebuie verificate de un jurist** și completate cu CUI, adresă, furnizorul de email, hosting-ul și durata de păstrare.
- **[i] Harta Google** de pe contact se încarcă doar la click („Arată harta”) și doar după ce există adresa. Așa nu apar cookie-uri terțe la încărcarea paginii și nu e nevoie de banner de cookie-uri.
- **[i] Imagini de share.**
  - Paginile generale folosesc `app/opengraph-image.png`.
  - Fiecare proiect are o imagine generată din prima lui poză, cu sertarul galben. Dacă proiectul are doar randări, imaginea poartă și eticheta „PROIECT 3D”.
- **[i] Imagini.**
  - Cele de pe pagini nu depășesc ~900px lățime afișată, din cauza rezoluției pozelor din arhivă.
  - Imaginea principală a fiecărei pagini folosește `loading="eager"` și `fetchPriority="high"`, cum recomandă Next 16 în locul lui `priority`/`preload`.
  - Restul se încarcă lazy, cu dimensiuni fixe.
- **[i] `/proiecte`** se generează la cerere, nu static, pentru că filtrul pe categorii e în URL (`?categorie=`). Filtrul merge fără JavaScript. Paginile de categorie rămân cele canonice pentru SEO.
- **[i] O singură dependență nouă:** `@phosphor-icons/react`, pentru iconițe (o singură familie, linie subțire). Fără Tailwind și fără biblioteci de animație: CSS Modules și variabilele din `globals.css`, cum cere CLAUDE.md.
- **[i] Mișcare.**
  - Un singur moment animat: bara galbenă care iese din hero la încărcare, ca sertarul din logo.
  - În rest, mișcarea doar răspunde la acțiuni: bara sub carduri la hover și focus, meniul, întrebările, galeria.
  - Totul se oprește cu `prefers-reduced-motion`.
- **[i] Gestul „sertar”** (bara galbenă decalată) apare în meniu (pagina activă), sub titlurile principale, la hover pe carduri și ca separator. Nu e pe fiecare element.
- **[i] Fără mod întunecat,** cum ai aprobat. `theme-color` e `--paper`.
- **[i] Pagina 404** e în română, cu linkuri spre proiecte și categorii.
- **[i] Butonul de alegere a fișierelor** e făcut în română („Alege pozele”, „2 poze alese”). Butonul nativ al browserului apărea în engleză.

### Verificări făcute
- **Vizual cu playwright-cli,** la 1440px și 390px:
  - homepage, `/mobila-la-comanda`, categorii, proiecte, un proiect cu poze reale și unul doar 3D, galeria pe tot ecranul, formularul (gol, cu erori, trimis), contact, despre, 404;
  - meniul de pe mobil (focus pe primul link, Esc închide) și lista de categorii de pe desktop.
- **web-design-guidelines:**
  - am adăugat `overscroll-behavior` și `safe-area` la meniul mobil, `touch-action` și culoarea de tap, `theme-color` potrivit cu fundalul;
  - am pus erorile formularului lângă câmpuri, cu focus pe prima;
  - regula „Title Case” nu se aplică în română, unde titlurile se scriu cu literă mică după primul cuvânt.
- **impeccable detect:** curat, după corectarea unei borduri colorate pe caseta de confirmare.
- **`npm run lint`** curat, **`next build`** reușit (153 de pagini).
- **Metadate în producție:** `title` ≤ 60 și `description` ≤ 155 pe toate paginile, un singur H1, `lang="ro"`, canonical, `og:image`, JSON-LD (`FurnitureStore` peste tot, `BreadcrumbList` pe paginile interne).

---

## 11. Corecturi și îmbunătățiri după capturi

### Probleme rezolvate
- **[i] Grile fără goluri.** Am ales același raport pentru toate cardurile (4:3, `object-fit: cover`), nu un mozaic.
  - De ce: pozele din arhivă au proporții foarte diferite. Un mozaic real ar fi amestecat cadre verticale de 533px cu panorame, iar titlurile sub poze s-ar fi aliniat greu.
  - Poza întreagă se vede pe pagina proiectului și în vizualizatorul pe tot ecranul.
  - Aceeași regulă se aplică în galeria de pe pagina de proiect. Acolo, cu număr impar de poze, prima ocupă toată lățimea (16:9), ca să nu rămână o celulă goală.
- **[i] Spațiu sub galerie,** înainte de „Randare și realizat”: 64–112px.
- **[i] /cerere-oferta.** În coloana din stânga a apărut „Ce urmează după ce trimiți”, cu 3 pași: primim cererea, te sunăm, primești oferta. Fără termene și fără servicii neconfirmate. Pe mobil, pașii apar *după* formular, ca formularul să rămână sus.
- **[i] /proiecte pe mobil.**
  - Grila are 2 coloane, iar filtrele stau pe un singur rând derulabil orizontal.
  - Se văd primele 12 proiecte, plus butonul „Arată mai multe” (câte 12).
  - Toate cardurile rămân în HTML, deci linkurile sunt vizibile pentru Google. Cele ascunse au `hidden`, așa că pozele lor nu se descarcă.
  - Focusul trece pe primul card nou.
  - Paginile de categorie au tot 2 coloane pe mobil.

### Îmbunătățiri
- **[V] Comparatorul cu slider** e folosit doar la cele 4 perechi cu unghiuri apropiate (câmpul `comparator: true` în `data/proiecte.js`): bucătăria bej, cea cappuccino, livingul alb-negru și bucătăria gri-albastru.
  - Restul perechilor rămân alăturate (bucătăria albă și gri, cea albastru petrol, camera turcoaz, dormitorul, peretele TV, biblioteca), pentru că randarea e din alt unghi.
  - Pe homepage, „Randare și realizat” arată acum doar perechile cu slider.
  - **Controlul** e un `input type="range"` nativ: merge cu săgețile, Home/End și cu cititoarele de ecran, iar `aria-valuetext` se actualizează.
  - **Mânerul** e sertarul galben din logo, cu mâner negru.
  - **Animația** dezvăluirii folosește doar `transform` (un cadru se mută, imaginea din el se mută invers), fără `clip-path`.
- **[V] Paleta proiectului** e generată de `scripts/paleta.mjs`, care rulează automat înainte de build (`prebuild`) și scrie `data/paleta.js`.
  - Ia primele 4 poze reale ale proiectului, le micșorează și grupează culorile (k-means determinist). Păstrează 5 culori, cu nume aproximative în română: gri, bej, lemn, verde salvie etc. Când un nume se repetă, adaugă „deschis/închis”.
  - Sub mostrar scrie că sunt culori extrase automat și că lumina le poate schimba. **Nu sunt codurile reale ale finisajelor.**
  - Am adăugat `sharp` ca devDependency. Era deja instalat de Next, l-am fixat doar ca să fie folosit explicit de script.
- **[V] Filtrul după culoare** pe /proiecte are 8 familii: verde, alb, bej și crem, gri, negru, lemn, albastru, culori vii. Se combină cu filtrul pe categorii prin URL (`?categorie=…&culoare=…`) și merge fără JavaScript.
  - Etichetele vin din titlu și materiale (sigure) și din paletă, dar doar pentru culorile vii (verde, albastru, galben etc.) și doar când ocupă cel puțin 12% din imagini.
  - Albul, griul și lemnul nu se deduc din paletă: pereții albi și parchetul ar fi etichetat aproape orice proiect.
  - Combinațiile goale nu apar. Dacă se ajunge totuși la una, apare un mesaj cu link de ieșire.
- **[i] Tranziții între pagini** cu `<ViewTransition>` din React. E stabil în Next 16.3 (App Router), fără configurare.
  - Poza din card devine poza principală a proiectului, cu o animație de 420ms. Am verificat că navigarea pornește tranziția.
  - În browserele fără suport, navigarea merge normal, fără animație.
  - La `prefers-reduced-motion`, animațiile sunt oprite.
- **[i] A doua poză la hover** apare doar cu mouse (`hover: hover` și `pointer: fine`) și doar dacă proiectul are încă o poză reală. Randările nu apar așa, pentru că n-ar avea etichetă. Poza se descarcă abia la primul hover, deci grilele nu încarcă de două ori mai multe imagini.
- **[i] Logo-ul din antet** e acum inline, cu formele copiate exact din `amber-logo-color.svg`, nu redesenate.
  - Sertarul galben iese o singură dată pe sesiune: un script mic, rulat înainte de afișare, pune o clasă pe `<html>` și o reține în `sessionStorage`.
  - Nu există ecran de încărcare. Animația durează 0,9s și pornește după 0,35s.
- **[V] Hero-ul** alternează 3 poze reale, din 3 camere diferite: bucătăria verde salvie, peretele TV cu lamele și dormitorul crem, la 7 secunde.
  - Fiecare poză are un zoom foarte lent (7% în 14s), doar cu `transform`.
  - Numele proiectului apare discret în colț și duce la pagina lui. Am pus și un buton de pauză, necesar pentru mișcarea automată de peste 5 secunde.
  - Alternanța se oprește când fila nu e vizibilă.
  - Prima poză e imaginea principală (LCP). Celelalte se încarcă abia la ~1,2s după încărcarea paginii.
  - La `prefers-reduced-motion`: o singură poză, fără zoom, fără alternanță.
- **[V] Butonul „Cere ofertă” fix pe mobil.**
  - **Când apare:** doar sub 768px, după primul ecran, în dreapta jos. Lângă el e și butonul de telefon, după ce numărul e completat.
  - **Când dispare:** când pe ecran se vede banda galbenă sau subsolul, care au deja butonul, ca să nu se dubleze.
  - **Unde lipsește:** pe /cerere-oferta.
  - Folosește doar IntersectionObserver, fără ascultători de scroll.

### Ce am ales să nu fac
- **Mozaic real (masonry)** în grile: am ales raportul fix. Motivul e mai sus.
- **Slider pe toate perechile:** la 7 dintre ele randarea e din alt unghi și glisarea ar fi arătat două camere diferite suprapuse.
- **Coduri de finisaj** (RAL, NCS, coduri de decor) în paletă: culorile din poze nu sunt fiabile, deci n-am vrut să sugerez potriviri exacte.
- **Încărcare automată la derulare** pe /proiecte: am ales butonul explicit „Arată mai multe”. Lasă subsolul accesibil și nu are nevoie de ascultători de scroll.
- **Tranziții direcționale** între pagini (alunecare înainte/înapoi): ar fi fost mișcare în plus, fără informație nouă. Am păstrat doar tranziția pozei.

### Verificări
- **Interacțiuni testate cu playwright-cli:**
  - comparatorul: 20 de apăsări pe săgeată duc valoarea la 70 și actualizează textul pentru cititoare;
  - hover-ul: a doua poză se încarcă și apare;
  - navigarea din grilă spre proiect: pornește View Transition;
  - „Arată mai multe”: 12, apoi 24, cu focus pe primul card nou;
  - butonul fix de pe mobil: ascuns pe primul ecran, vizibil după, ascuns la subsol;
  - logo-ul: animația rulează la prima vizită și nu mai rulează la a doua pagină;
  - `prefers-reduced-motion`: o singură poză, fără zoom, fără animație la logo.
- **Performanță,** măsurată în producție cu rețea încetinită (1,6 Mbps, 150ms latență) și, pe mobil, procesor încetinit de 4 ori:

  | Pagină | LCP mobil | LCP desktop | CLS maxim |
  | --- | --- | --- | --- |
  | Homepage | 1,65s | 1,27s | 0,006 |
  | Categorie | 1,57s | 1,18s | 0,002 |
  | Proiect | 1,68s | 1,27s | 0 |
  | /proiecte | 1,04s | 1,49s | 0,001 |
  | /cerere-oferta | 0,99s | 0,78s | 0,016 |

  Toate sub LCP 2,5s și CLS 0,1.
- **Calitate:** `npm run lint` curat, `npm run build` reușit (153 de pagini).
- **[i] Capturi:** cele din `capturi/` sunt refăcute pe build-ul de producție. Sunt făcute ca a doua vizită, ca logo-ul să apară complet.

---

## 12. Meniu mobil, fabrica proprie, date și servicii confirmate

### Meniul mobil (reparat)
- **[i] Cauza.** Antetul are `backdrop-filter`. În WebKit (Safari pe iPhone), proprietatea asta face ca un element `position: fixed` din antet să fie poziționat față de antet, nu față de ecran. Panoul meniului avea astfel **înălțimea 0** și nu se vedea nimic.
  - În Chrome mergea, de aceea nu apăruse în testele anterioare.
  - Am instalat WebKit pentru playwright-cli și am reprodus problema.
- **[i] Reparația:** panoul se randează direct în `<body>` (portal React).
  - **Deschidere și închidere:** `aria-expanded` e corect. Meniul se închide la Esc, la butonul de închidere și la click pe orice link, inclusiv pe linkul paginii curente.
  - **Derularea paginii:** e blocată cât meniul e deschis, cu metoda care merge și pe iOS (`body` fix, cu poziția păstrată), și revine exact unde era la închidere.
  - **Focusul:** circulă doar între butonul de închidere și linkurile din meniu. Restul paginii devine `inert`, iar butonul fix „Cere ofertă” se ascunde.
  - **Lista de categorii de pe desktop** se închide și ea la click pe link.
- **[i] Testat** cu playwright-cli la 390px, în Chromium și în WebKit (iPhone 13), pe toate cele 16 tipuri de pagini (inclusiv 404). Toate verificările au trecut.
- **[i] Notă despre test:** `locator.click()` din Playwright derula pagina în sus din cauza antetului fix și a lui `scroll-padding-top`, ceea ce un deget real nu face. Testele apasă la coordonate.
- **[V] Fontul în WebKit.** În WebKit-ul de Windows din Playwright, titlurile Montserrat apar foarte subțiri, pentru că fonturile variabile nu au suport complet acolo. Pe un iPhone real n-ar trebui să apară, dar **verifică o dată pe telefon**. Dacă titlurile apar subțiri, se poate încărca Montserrat în variante statice.

### Fabrica proprie
- **[i] Mesajul principal:**
  - **Hero:** „Mobilă la comandă, produsă în fabrica noastră”, cu „Producător de mobilier la comandă, cu fabrică proprie în București”.
  - **Alte locuri:** descrierea din subsol, meta descrieri, manifest.
- **[i] Secțiunea „Totul se face în fabrica noastră”** apare pe homepage (după „Ce facem”), pe /despre și pe /mobila-la-comanda.
  - **Conținut:** cele 8 etape confirmate, numerotate, pentru că sunt o succesiune reală; 3 poze din fabrică; 6 modele de frezare.
  - **Fundal:** închis (`--ink`), ca să aibă greutate.
  - **Pe mobil:** pozele sunt într-un rând derulabil.
- **[V] Pozele din fabrică și modelele de frezare.** `materiale/prezentare.pptx` nu există, dar există `materiale/Amber Creativity - Portofoliu de proiecte.pdf`, care e prezentarea firmei. Am folosit din el **doar**:
  - **pagina 25:** vopsitorie, debitare, frezare CNC;
  - **pagina 27:** 6 modele de frezare.
- **[i] Ce am exclus din PDF și de ce:**
  - **pagina 2:** persoane identificabile;
  - **pagina 26 și pagina 29:** poze de proiecte, nu din fabrică;
  - **paginile 30–31:** siglele furnizorilor;
  - **pagina 32:** nume de clienți și colaboratori;
  - **paginile cu proiecte:** nume de clienți și de branduri ale clienților.
- **[i] Procesarea pozelor:**
  - **Pe utilaje:** sigla producătorului mașinii de debitat și un text de brand de pe CNC au fost **reconstruite (inpainting), nu estompate**.
  - **Metadate:** șterse.
  - **Fișiere:** redenumite în `public/fabrica/`.
  - **Text alternativ:** scris în română.
  - **Verificări:** fără numele vechi; fără persoane identificabile (la vopsitorie se vede doar un braț).
- **[V] Rezoluție mică:** pozele de fabrică au 593px, iar modelele de frezare 288px. Le afișez la cel mult ~400px, respectiv ~130px. **Merită poze noi, la rezoluție mare**, din fabrică.

### Experiența
- **[i]** Nu apare nicăieri anul înființării și nici „2013”. Pe homepage și pe /mobila-la-comanda apare formularea ta: „peste 12 ani de experiență în producția de mobilier”. Pe /despre, propoziția exactă: „Echipa noastră lucrează împreună de peste 12 ani, în aceeași fabrică, cu aceleași standarde.”
- **[i]** PDF-ul conține „DIN 2013” și „2013, anul înființării”. Nu le-am preluat.

### Date confirmate
- **[i]** În `lib/site.js` sunt acum telefonul de vânzări (+40 773 371 044), emailul (vanzari@ambermob.ro), fabrica (Șos. Andronache nr. 183, Sector 2, București) și showroom-ul (Șos. Colentina 447-449, București). Apar în antet (telefonul doar de la 1200px în sus, ca să nu aglomereze meniul), subsol, contact, /despre, banda galbenă, butonul fix de pe mobil, /cerere-oferta și datele structurate.
- **[i] Rămân TODO:** program, WhatsApp, Google Business, rețele sociale, CUI. Codul poștal nu l-am completat, pentru că nu îl aveam.
- **[i] Cererile de ofertă** ajung implicit la vanzari@ambermob.ro. Mai e nevoie doar de cheia Resend și de adresa expeditorului.
- **[i] Contact:** harta pentru showroom se încarcă la click, iar pentru ambele adrese există și link direct spre Google Maps.

### Date structurate
- **[i]** Un `@graph` cu două entități legate:
  - `Organization` (producătorul, cu adresa fabricii, descriere de producător și etapele interne);
  - `FurnitureStore` (showroom-ul deschis publicului, cu `parentOrganization`).
- **[i]** schema.org nu are un tip dedicat pentru „producător”, așa că rolul e descris prin `description` și `knowsAbout`.

### Servicii confirmate
- **[i] „Cum lucrăm”** are 5 pași: cererea, măsurători la fața locului, proiect 3D și ofertă înainte de orice angajament, producție în fabrica proprie, montaj cu echipa proprie și service.
- **[i] Întrebări frecvente:** noi întrebări pe /mobila-la-comanda și două comune pe fiecare categorie (măsurători, producție și montaj). La bucătării se adaugă blaturile.
- **[i] „Randare și realizat”:** spune acum că primești proiectul 3D înainte de producție.
- **[i] „Ce urmează după ce trimiți”:** pașii includ măsurătorile, proiectul 3D și oferta.
- **[V] Transportul și garanția nu apar.** Pentru proiectele din afara Bucureștiului scrie doar că „stabilim împreună cum se fac măsurătorile și montajul”. Dacă montajul cu echipa proprie e valabil în toată țara, se poate scrie direct.
- **[V] Showroom:** am scris doar că e deschis publicului și „sună-ne înainte să vii”. Nu am promis ce se poate vedea acolo.

### Materiale și feronerie
- **[i] Secțiunea „Materiale și feronerie”** apare pe /mobila-la-comanda și pe paginile de categorie, cu grupurile potrivite:
  - **toate grupurile** (PAL, MDF, blaturi, feronerie): bucătării și comercial;
  - **fără blaturi:** dressinguri, dormitoare, living, hol și baie.
- **[i]** Apar doar numele, fără siglele producătorilor, și nu sunt atribuite unor proiecte. Proiectele rămân descrise după aspect.

### Verificări
- **Calitate:** `npm run lint` curat, `npm run build` reușit (153 de pagini), detectorul impeccable fără probleme.
- **Performanță,** cu rețea încetinită (și procesor încetinit pe mobil):

  | Pagină | LCP | CLS |
  | --- | --- | --- |
  | Homepage | 1,62s | 0,003 |
  | /despre | 1,23s | 0,011 |
  | /mobila-la-comanda | 1,38s | 0 |
  | /contact | 1,09s | 0,041 |
  | /bucatarii-la-comanda | 1,68s | 0,002 |

  Pe /despre, CLS era 0,128 din cauza schimbării fontului (lista de categorii se rupea altfel). L-am corectat cu o grilă fixă.
- **Capturi noi în `capturi/`:** `acasa-1440.png`, `acasa-390.png`, `meniu-deschis-390.png` (Chromium) și `meniu-deschis-390-iphone-webkit.png`.

---

## 13. Procesul real de ofertă și formularul nou

### Corectura de proces
- **[i] Procesul descris peste tot:**
  1. Clientul trimite dimensiunile aproximative, poze și, pentru proiecte mari, planul.
  2. Primește o ofertă estimativă.
  3. După contract venim să măsurăm exact.
  4. Pe baza măsurătorilor se confirmă proiectul 3D și prețul final.
  5. Urmează producția în fabrica proprie și montajul cu echipa proprie.
- **[i] Unde e actualizat:**
  - **„Cum lucrăm”:** 5 pași, plus o notă despre estimare și invitația în showroom.
  - **Întrebări frecvente:** pe /mobila-la-comanda și pe toate categoriile („Prețul din ofertă e cel final?”, „Când veniți să măsurați?”, „Pot discuta proiectul în detaliu înainte de ofertă?”). Răspunsurile la „Ce informații trimit” sunt scrise pe fiecare categorie.
  - **Notele despre preț** de pe categorii și de pe /mobila-la-comanda.
  - **Alte pagini și secțiuni:** /despre, „În toată țara”, /cerere-oferta, „Ce urmează după ce trimiți” (3 pași: ofertă estimativă, contract și măsurători, proiect 3D și preț final), meta descrierile.
- **[i] Ce am scos:** toate formulările care sugerau măsurători gratuite sau înainte de contract („Măsurăm la fața locului”, „Te sunăm și venim să măsurăm”, „Veniți să măsurați? Da…”, „oferta înainte de orice angajament”). Am verificat cu căutare în tot codul.
- **[i] Ton:** spunem clar că prima ofertă e estimativă, fără să sune descurajant („cu cât datele sunt mai exacte, cu atât estimarea e mai aproape de prețul final”). Invitația în showroom apare pentru discuții în detaliu.
- **[i] Date structurate:** am adăugat un `Service` („Mobilă la comandă”) cu procesul real în descriere și două canale: cererea online și consultanța în showroom. Showroom-ul e descris ca loc pentru consultanță în detaliu. Fără prețuri, garanție sau transport.

### Formularul /cerere-oferta
- **[i] Structura:**
  - **Datele tale:** nume, telefon, localitate.
  - **Ce vrei să mobilezi:** o cameră / mai multe camere / toată locuința, plus tipul de mobilă (o singură alegere pentru o cameră, mai multe în celelalte cazuri).
  - **Dimensiuni:** doar pentru o cameră, după tip.
  - **Plan și poze.**
  - **Buget și detalii.**
  - **Acord.**

  Obligatorii rămân doar numele, telefonul și tipul de mobilă. Scrie asta și în capul formularului.
- **[i] Dimensiunile, după tip:**
  - **Bucătărie:** forma (liniară, în L, în U, cu insulă), cu schițe văzute de sus și pereții notați A/B/C, la fel ca în câmpuri. Numărul de câmpuri urmează forma; „cu insulă” are peretele A, peretele B opțional și lungimea și lățimea insulei. Plus înălțimea până la tavan.
  - **Dressing:** lățime, înălțime, adâncime.
  - **Dormitor, living, hol, baie:** „pe câți pereți vine mobila” (1–3), lungimea fiecăruia și înălțimea.
  - **Comercial:** planul în loc de pereți.
  - **Altceva:** doar detalii.
- **[i] Validarea dimensiunilor:** sunt în cm, acceptă și zecimale cu virgulă și au limite de bun-simț. De exemplu, 25 cm pentru înălțime dă eroarea „Verifică dacă e în centimetri”.
- **[i] Ghidul „Cum măsori”:** o schiță SVG a unui perete văzut din față (lungime, înălțime, geam, ușă, prize, țevi, distanța de la colț) și 4 indicații, inclusiv pozele cu ruleta întinsă pe perete. Pe desktop stă lângă câmpuri, pe mobil sub ele.
- **[i] Mai multe camere sau toată locuința:** în loc de dimensiuni pe pereți se cere planul (PDF sau imagine), plus poze.
- **[V] Bugetul orientativ** e pentru tot proiectul, în lei, cu intervalele: sub 10.000 / 10.000–20.000 / 20.000–35.000 / 35.000–60.000 / 60.000–100.000 / peste 100.000 / „Nu știu încă”.
  - Le-am propus după prețurile obișnuite pentru mobilă la comandă în România (o bucătărie medie cade de regulă între 20.000 și 60.000 lei, o locuință întreagă trece des de 60.000).
  - **Verifică-le cu prețurile voastre** și ajustează-le în `lib/cerere.js` (`bugete`).
- **[i] Micșorarea pozelor în browser.**
  - **Nu exista înainte.** Formularul trimitea pozele originale, iar limita serverului era 26 MB, prea mare pentru Vercel. Am implementat-o acum.
  - **Pozele:** micșorate la 1600 px pe latura mare, JPEG. În test, 5 poze de telefon de 3,1–3,5 MB (16,5 MB în total) au ajuns la 958 KB.
  - **Planurile trimise ca imagine:** micșorate la 2400 px, ca textul să rămână lizibil.
  - **Metadatele:** reîncodarea șterge EXIF și GPS. Am scris asta și în politica de confidențialitate.
- **[V] Limitele de mărime, ținute sub limita Vercel de ~4,5 MB pe cerere:**
  - atașamentele împreună: cel mult 4 MB;
  - planul PDF: cel mult 2 MB (un PDF nu se poate micșora în browser);
  - poze: cel mult 5.

  Formularul arată „Atașamente: X din 4 MB” și explică clar ce depășește, iar pe server limita e setată tot la 4,5 MB (`next.config.mjs`). Cea mai mare cerere din teste (plan PDF de 1,8 MB și 5 poze) a avut 2,7 MB.
- **[V] Cazuri-limită rămase:**
  - **HEIC în Chrome sau Firefox:** pozele HEIC nu se pot decoda în aceste browsere, așa că pleacă necomprimate. Safari pe iPhone le decodează, iar iOS oricum le convertește de obicei în JPEG.
  - **Fără JavaScript:** formularul se trimite fără micșorare, iar poze mari ar depăși limita.

  Ambele sunt rare. Dacă vor conta, soluția e încărcarea directă în spațiul de stocare al hosting-ului.
- **[i] Trimiterea:**
  - **Validare:** câmpurile obligatorii și dimensiunile se verifică în browser înainte de trimitere, cu focus pe primul câmp greșit.
  - **Fără reset:** cererea pleacă printr-o tranziție, nu prin `action`, ca să nu mai golească React formularul după o eroare. Dacă emailul nu poate fi trimis, omul vede un mesaj clar, iar alegerile, dimensiunile, bugetul și pozele rămân completate (testat).
  - **Fără JavaScript:** formularul merge mai departe prin `action`.
- **[i] Emailul primit de voi:**
  - **Conținut:** un rezumat sus (de ex. „O cameră · Bucătărie în U · 35.000 – 60.000 lei”), apoi secțiunile Contact (telefon cu link), Proiect, Dimensiuni (cm), Alte detalii și Atașamente (numele original și mărimea fiecărui fișier).
  - **Atașamentele:** se numesc ordonat `plan.pdf`, `poza-1.jpg`…
  - **Formate:** HTML și text simplu.
  - **Subiectul** include mobila, forma, domeniul și numele.
- **[i] Pentru testare:** variabila opțională `RESEND_API_URL` permite un server local care imită Resend. În producție nu se setează.

### Teste (playwright-cli, build de producție, email prin serverul de imitație)
- **[i] Toate variantele, la 1440px și 390px, 22 de trimiteri reușite:** bucătărie în U, bucătărie cu insulă, dressing, dormitor pe 2 pereți, living, hol pe 3 pereți, baie, comercial cu plan, altceva, mai multe camere (plan PDF și 5 poze), toată locuința (plan PNG și poze). Pentru fiecare am verificat emailul primit și atașamentele.
- **[i] Erori testate:**
  - lipsa câmpurilor obligatorii: erori afișate, nicio cerere trimisă, pozele rămân;
  - 6 poze: se păstrează primele 5, cu mesaj;
  - plan PDF de 2,9 MB: refuzat, cu explicație;
  - dimensiune scrisă în litere sau absurdă: eroare și focus pe câmp;
  - căderea serviciului de email: mesaj clar, nimic nu se pierde.
- **[i] Performanță** pe /cerere-oferta: LCP 1,14s pe mobil și 0,79s pe desktop, CLS cel mult 0,024.
- **[i] Calitate:** `npm run lint` curat, `npm run build` reușit, detectorul impeccable curat. A semnalat o bordură laterală pe nota din „Cum lucrăm”, pe care am înlocuit-o cu gestul sertarului.
- **[i] Capturi noi în `capturi/`:** `cerere-oferta-{1440,390}.png` (gol), `cerere-oferta-bucatarie-*.png` (bucătărie în U completată), `cerere-oferta-dressing-*.png` și `cerere-oferta-toata-locuinta-*.png` (cu plan și poze).

---

## 14. /cerere-oferta mai scurt pe mobil

- **[i] Ghidul „Cum măsor?”** e acum un `<details>`, închis implicit.
  - **Pe desktop:** stă lângă câmpuri și se deschide singur doar dacă încape în înălțimea lor, ca să nu lungească pagina. Decizia se ia înainte de afișare, deci fără clipire, și nu se mai schimbă după ce omul l-a deschis sau închis.
  - **De fapt:** cu câmpurile pe două coloane, ghidul (~400px) e mai înalt decât ele la toate tipurile, așa că rămâne închis și pe desktop.
- **[i] Dimensiunile** stau câte două pe rând, la toate lățimile: Peretele A + B, Peretele C + Înălțime; la dressing Lățime + Înălțime, apoi Adâncime.
  - **Etichete:** sunt scurte acum („Înălțime”, „Lățime”, „Adâncime”, „Insula: lungime”), ca să nu se rupă. Unde etichetele ajung totuși pe două rânduri, câmpurile se aliniază jos.
  - **În email** rămân etichetele complete („Înălțimea până la tavan”, „Adâncimea disponibilă”), prin câmpul `complet` din `lib/cerere.js`.
  - **Explicația pentru înălțime** („de la podea până la tavan”) e în ghid.
- **[i] Nota „Obligatorii sunt doar…”** a fost scoasă. Rămân marcajele „(opțional)” și textul de intro.
- **[i] Fișierele:**
  - **Textele de ajutor nu mai au cifre:** „Cel mult 5 poze. Le micșorăm automat.” și „Planul poate fi PDF sau o poză clară.”
  - **Contorul „Atașamente: X din 4 MB”** și mărimile de lângă fișierele alese au dispărut. În timp ce se micșorează pozele apare doar „Pregătim fișierele…”.
  - **Limitele exacte** (2 MB pentru PDF, 4 MB în total, 5 poze) apar doar în mesajul de eroare. Validarea a rămas neschimbată.
- **[i] Rezultat,** pentru varianta bucătărie în U cu 3 poze (înălțimea paginii):

  | Lățime | Pagina înainte | Pagina după | Formularul înainte | Formularul după |
  | --- | --- | --- | --- | --- |
  | 390px | 5832px | 4988px (−844px, −14%) | 3456px | 2612px (−24%) |
  | 1440px | 3256px | 2814px | 2534px | 2092px |

- **[i] Teste:**
  - 22/22 trimiteri reușite, cu emailurile verificate;
  - toate cazurile de eroare se comportă ca înainte;
  - lint curat, build reușit, detectorul impeccable fără probleme.
- **[i] Capturi noi în `capturi/`:** `cerere-oferta-*` refăcute, plus `cerere-oferta-ghid-deschis-390.png`.
