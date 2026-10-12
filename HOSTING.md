# Ce are nevoie site-ul ca să ruleze pe alt server decât Vercel

> **DEPĂȘIT (octombrie 2026).** Site-ul e acum un export static, găzduit pe Datahost. Vezi `DEPLOY-DATAHOST.md`. Ce urmează descrie varianta veche, cu server Node.

Notițe pentru mutarea pe ambermob.ro. **Nimic din ce e mai jos nu a fost schimbat în cod;** e doar inventarul. Starea descrisă e cea de la 11 octombrie 2026 (Next.js 16.3.8, React 19.2.8).

## Pe scurt

- Site-ul are nevoie de **un server Node.js care rulează permanent** (`next start`). Nu merge ca site static exportat (`output: "export"`) și nici pe hosting doar cu PHP sau doar cu fișiere.
- În cod **nu există nimic specific Vercel:** niciun pachet `@vercel/*`, nicio variabilă `VERCEL_*`, niciun `vercel.json`. Singura legătură e limita de 4,5 MB pe cerere, pe care formularul o respectă oriunde.
- Ce trebuie făcut în plus față de Vercel: un reverse proxy cu HTTPS în fața aplicației, variabilele de mediu pentru email și o limită de mărime a cererilor de cel puțin 5 MB în proxy.

## 1. Node și comenzi

| | |
| --- | --- |
| Node.js | minimum **20.9** (cerut de Next 16). Dezvoltat și testat pe **22.23.3**; recomand Node 22 LTS. |
| Instalare | `npm ci` (cu tot cu devDependencies, vezi mai jos) |
| Build | `npm run build` |
| Pornire | `npm start` (adică `next start`; portul implicit e 3000, se schimbă cu `-p` sau cu variabila `PORT`) |

De știut la build:

- **`npm run build` rulează întâi `npm run paleta`** (`prebuild`). Scriptul citește pozele din `public/proiecte/` cu `sharp` și scrie `data/paleta.js` (etichetele pentru filtrul după culoare). `sharp` e în `devDependencies`, deci build-ul are nevoie de ele: `npm ci`, nu `npm ci --omit=dev`.
- **Build-ul are nevoie de internet:** `next/font` descarcă Montserrat și DM Sans de la Google Fonts în timpul build-ului. După build fonturile sunt servite de pe server, fără cereri către Google.
- **`node_modules` nu se copiază de pe Windows pe Linux.** `sharp` are binare diferite pe fiecare sistem; se rulează `npm ci` pe server (sau într-un container cu același sistem).
- Nu e configurat `output: "standalone"`. Dacă serverul primește doar rezultatul build-ului, trebuie copiate `.next/`, `public/`, `node_modules/`, `package.json` și `next.config.mjs`. Varianta `standalone` ar micșora pachetul, dar e o schimbare de făcut și testat separat.

## 2. Variabile de mediu

| Variabilă | Obligatorie | Rol |
| --- | --- | --- |
| `RESEND_API_KEY` | da, pentru formular | Cheia API Resend (resend.com), prin care pleacă emailurile cu cereri de ofertă. |
| `CERERI_EMAIL_DE_LA` | da, pentru formular | Adresa expeditorului, de pe un domeniu verificat în Resend (ex. `cereri@ambermob.ro`). Verificarea cere înregistrări DNS (SPF, DKIM) pe ambermob.ro. |
| `CERERI_EMAIL_CATRE` | nu | Unde ajung cererile. Implicit `vanzari@ambermob.ro` (din `lib/site.js`). |
| `RESEND_API_URL` | nu | Doar pentru teste locale cu un server care imită Resend. **În producție nu se setează.** |
| `PORT` | nu | Portul pe care ascultă `next start`. |

- `NODE_ENV` e pus automat pe `production` de `next build` și `next start`.
- **Fără primele două variabile, formularul afișează vizitatorului un mesaj de eroare** și cererea nu ajunge nicăieri. Restul site-ului merge.
- Nu există fișiere `.env` în proiect; variabilele se setează pe server (sau într-un `.env.production.local` care nu se pune în git).
- Dacă alegeți alt furnizor de email decât Resend (de exemplu SMTP-ul firmei de hosting), se schimbă un singur fișier: `lib/email.js`.

## 3. Ce depinde de server

| Funcționalitate | De ce are nevoie de server | Ce se întâmplă fără |
| --- | --- | --- |
| **Formularul de ofertă** (`app/cerere-oferta/actions.js`) | Server Action: validează datele, limitează cererile și trimite emailul prin Resend. | Formularul nu trimite nimic. |
| **Optimizarea imaginilor** (`next/image`, ruta `/_next/image`) | Redimensionează și convertește pozele la cerere (AVIF, WebP), cu `sharp`. | Imaginile nu se încarcă. Alternativa ar fi `images.unoptimized` sau un serviciu extern de imagini, cu impact pe viteză. |
| **/proiecte** | Pagină randată la cerere: filtrele sunt în URL (`?categorie=…&culoare=…`). | Filtrele nu merg. |
| **Regula de indexare** (`proxy.js`) | Rulează la fiecare cerere și pune `noindex` pe orice gazdă în afară de ambermob.ro. | Copiile de test ale site-ului ar putea fi indexate. |
| **Limitarea cererilor** din formular | 5 cereri pe oră de la aceeași adresă IP, ținute în memoria procesului. | Vezi „Mai multe instanțe” mai jos. |

Ce **nu** depinde de server la rulare, fiind generat la build:

- toate celelalte pagini (homepage, categorii, cele 65 de pagini de proiect, despre, contact, paginile legale);
- **imaginile de share:** `app/opengraph-image.png` e un fișier, iar cele 65 de imagini pe proiect (`app/proiecte/[slug]/opengraph-image.js`) se generează la build cu `next/og`, citind pozele din `public/` de pe disc. Build-ul trebuie deci rulat din rădăcina proiectului, cu `public/` prezent;
- `sitemap.xml`, `robots.txt` (varianta pentru ambermob.ro), `manifest.webmanifest`, iconițele.

Servicii externe folosite: Resend (email), Google Fonts (doar la build) și Google Maps (harta de pe /contact, încărcată doar când vizitatorul apasă „Arată harta”). Nu există bază de date, analiză de trafic sau stocare de fișiere.

## 4. Mărimea cererilor

- Formularul trimite poze și, opțional, un plan. Pozele se micșorează în browser, iar atașamentele au împreună **cel mult 4 MB** (`lib/cerere.js`).
- Next acceptă cereri de cel mult **4,5 MB** (`experimental.serverActions.bodySizeLimit` în `next.config.mjs`).
- **Reverse proxy-ul trebuie să accepte cel puțin 5 MB.** nginx acceptă implicit doar 1 MB (`client_max_body_size`), ceea ce ar respinge cererile cu poze cu eroarea 413, înainte să ajungă la aplicație. Recomand `client_max_body_size 5m;`. La Apache, `LimitRequestBody` trebuie să fie cel puțin la fel.
- Cea mai mare cerere din teste (plan PDF de 1,8 MB și 5 poze) a avut 2,7 MB.

## 5. Reverse proxy, HTTPS și antete

`next start` nu se expune direct pe internet; în față stă nginx, Caddy, Apache sau proxy-ul firmei de hosting.

- **HTTPS** și certificatul (de exemplu Let's Encrypt) se configurează în proxy. Aplicația nu face nimic în privința asta.
- **Redirecționările de domeniu** (http → https, `www.ambermob.ro` → `ambermob.ro`) se fac tot în proxy. În cod nu există. Adresele canonice și sitemap-ul folosesc `https://ambermob.ro`, fără www.
- **Antetul `Host` trebuie transmis aplicației** (sau `X-Forwarded-Host`). `proxy.js` hotărăște după el dacă pagina se indexează. Dacă proxy-ul trimite `Host: localhost:3000`, **tot site-ul va primi `noindex`**, inclusiv pe ambermob.ro. La nginx: `proxy_set_header Host $host;`.
- **Antetul `X-Forwarded-For`** trebuie transmis, ca limitarea cererilor din formular să vadă adresa reală a vizitatorului. Fără el, toți vizitatorii împart aceeași limită de 5 cereri pe oră. La nginx: `proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;`.
- Verificare după mutare: `curl -I https://ambermob.ro/` **nu** trebuie să conțină `x-robots-tag`, iar `https://ambermob.ro/robots.txt` trebuie să conțină `Allow: /`. Pe orice altă adresă a serverului (IP, subdomeniu de test) trebuie să apară `x-robots-tag: noindex, nofollow` și `Disallow: /`.

## 6. Disc, memorie, procese

- **Disc cu drept de scriere:** Next ține imaginile optimizate în `.next/cache/images`. Fără drept de scriere, fiecare imagine se reoptimizează la fiecare cerere. Pe hosting cu disc efemer (containere repornite des), memoria cache se pierde la fiecare repornire.
- **Înlocuirea unei poze sub același nume:** varianta optimizată veche rămâne în `.next/cache/images`, pentru că memoria cache ține cont de adresă, nu de conținut. După înlocuire: șterge `.next/cache/images` și repornește aplicația. Browserele vizitatorilor păstrează și ele imaginea cel mult 4 ore (`Cache-Control: max-age=14400`). Un CDN pus în față trebuie golit separat.
- **Blocarea optimizatorului de imagini (de hotărât înainte de mutare):**
  - **Ce se întâmplă:** când clientul întrerupe cereri către `/_next/image` în timp ce serverul generează prima dată acele variante, unele rămân agățate în server. De atunci, varianta respectivă (imagine + lățime) nu mai răspunde nimănui, până la repornirea aplicației. Celelalte imagini merg normal.
  - **Cât de des:** la o singură cerere întreruptă am prins-o o dată din 60 de încercări. La 120 de cereri simultane întrerupte s-au blocat aproape 100. Fără întreruperi, 117 cereri simultane au mers toate.
  - **Și la navigare obișnuită:** imediat după golirea memoriei cache, am trecut repede de pe o pagină pe alta într-un browser, iar pagina următoare a rămas cu două imagini care nu s-au mai încărcat. Cu memoria cache deja umplută nu s-a mai întâmplat.
  - **Ce nu știu:** mecanismul exact. Am stabilit doar legătura cu cererile întrerupte, nu și cauza din codul Next.
  - **Unde am văzut-o:** pe mașina de dezvoltare (Windows, Next 16.3.8, sharp 0.35.5). Nu am testat pe Linux și nici pe altă versiune de Next. Pe Vercel nu se aplică, acolo imaginile sunt optimizate de platformă.
  - **Cum se reproduce:** `node E:\dev\amber-media-noi\lucru\test-intreruperi.mjs` cu serverul pornit pe portul 3001; `test-blocate.mjs` listează apoi imaginile care nu mai răspund.
  - **Până la o decizie:** după fiecare pornire a aplicației, memoria cache se poate umple dinainte, cerând pe rând toate imaginile (`test-blocate.mjs` face asta pentru o lățime). Reduce riscul, nu îl elimină: variantele se regenerează după ce expiră (4 ore).
  - **Variante:** (1) variantele de imagine generate la build, servite ca fișiere statice, fără optimizator la rulare — cea mai sigură, de estimat ca spațiu; (2) o actualizare de Next, testată cu scriptul de mai sus; (3) provizoriu, repornire periodică a aplicației și un CDN care păstrează `/_next/image`. Nu am schimbat nimic în cod.
- **Spațiu:** `public/` are 144 MB (octombrie 2026, după lotul 2 de proiecte; 68 MB după lotul 1, 33 MB la început). Memoria cache de imagini crește odată cu numărul de poze: pentru 448 de imagini, cu cele 9 lățimi generate într-un singur format (AVIF), are 127 MB. Browserele fără AVIF primesc WebP, ceea ce poate dubla cifra. Folderul `.next/` are acum 726 MB pe mașina de dezvoltare, din care 490 MB sunt memoria cache a serverului de dezvoltare (`.next/dev`), care nu există pe server. Build-ul propriu-zis are în jur de 110 MB, plus memoria cache de imagini, care crește în timp (acum 128 MB).
- **Memorie:** optimizarea imaginilor e partea cea mai costisitoare. Nu am măsurat consumul; un server cu 1 GB de memorie ar trebui să ajungă pentru traficul unui site de prezentare, dar e de verificat după mutare.
- **Proces permanent:** e nevoie de un manager de procese (systemd, pm2 sau containerul firmei de hosting) care repornește aplicația dacă se oprește.
- **Mai multe instanțe:** limitarea cererilor din formular e în memoria procesului. Cu o singură instanță e în regulă. Cu mai multe (sau pe platforme care pornesc procese la cerere), fiecare are propria numărătoare; atunci ar trebui mutată într-un depozit comun. E notat cu TODO în `app/cerere-oferta/actions.js`.

## 7. Ce nu se urcă pe server

Aceste foldere sunt în proiect, dar nu țin de site și conțin materiale interne:

| Folder | Ce conține | Stare |
| --- | --- | --- |
| `export-complet/` | Arhiva de poze de pe site-ul vechi, inclusiv planuri ale unor clienți. | E în `.gitignore`. |
| `materiale/` | Prezentarea firmei (PDF), cu nume de clienți și colaboratori. | **Nu e în `.gitignore`.** |
| `capturi/` | Capturi de ecran de lucru (~30 MB). | **Nu e în `.gitignore`.** |
| `Amber-logo/` | Kit-ul de logo. | Nu e nevoie de el la rulare (fișierele folosite sunt în `public/brand/`). |

Niciunul nu e în `public/`, deci nu sunt servite vizitatorilor. Recomand totuși ca `materiale/` și `capturi/` să fie puse în `.gitignore` înainte de primul commit care le-ar include.

## 8. Dacă rămâne pe Vercel

Nu trebuie schimbat nimic în cod. De făcut doar: variabilele de mediu din secțiunea 2 și legarea domeniului ambermob.ro. Adresele `*.vercel.app` primesc automat `noindex`.
