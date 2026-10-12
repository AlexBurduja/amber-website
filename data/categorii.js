// Textele paginilor de categorie, scrise de la zero.
// Procesul confirmat de Alex: ofertă estimativă pe baza datelor trimise de client; măsurători exacte doar
// după semnarea contractului; proiectul 3D și prețul final pe baza măsurătorilor; producție în fabrica
// proprie, montaj și service cu echipă proprie. Transportul și garanția nu se promit.
// grupuriMateriale: grupurile din data/fabrica.js afișate pe pagină (doar unde se potrivesc).

const factoriComuni = [
  "Dimensiunile: lungimea, înălțimea și adâncimea corpurilor.",
  "Materialul și finisajul fronturilor: mat, lucios, cu ramă, riflat.",
  "Tipul blatului sau al suprafețelor de lucru.",
  "Feroneria: balamale, glisiere, mecanisme de deschidere.",
  "Accesoriile din interior: organizatoare, coșuri, iluminare.",
];

const intrebariComune = [
  {
    intrebare: "Prețul din ofertă e cel final?",
    raspuns:
      "Prima ofertă e estimativă: o facem pe baza dimensiunilor aproximative și a pozelor pe care ni le trimiți. După semnarea contractului venim să măsurăm exact, iar pe baza măsurătorilor confirmăm proiectul 3D și prețul final.",
  },
  {
    intrebare: "Cine produce și cine montează mobila?",
    raspuns:
      "Noi. Mobila se face în fabrica noastră din București, fără subcontractori, iar montajul îl face echipa noastră. Pentru reglaje ulterioare avem și service.",
  },
];

export const continutCategorii = {
  bucatarii: {
    grupuriMateriale: ["pal", "mdf", "blaturi", "feronerie"],
    h1: "Bucătării la comandă",
    title: "Bucătării la comandă, făcute pe măsură",
    description:
      "Bucătării la comandă în L, în U, liniare sau cu insulă, făcute după dimensiunile camerei. Vezi proiectele realizate și cere ofertă. Showroom în București.",
    intro:
      "O bucătărie la comandă pornește de la pereții tăi: de unde vin apa și curentul, unde e fereastra, cât spațiu rămâne între corpuri și masă. Pe aceste date se așază corpurile, electrocasnicele și blatul.",
    imagine: ["bucatarie-verde-inchis-riflaj-insula", 1],
    filtru3d: true,
    cumLucram: {
      titlu: "Cum se gândește o bucătărie",
      paragrafe: [
        "Primul pas e planul camerei. Lungimea pereților, înălțimea până la tavan și poziția racordurilor decid dacă bucătăria merge pe un perete, în L, în U sau cu insulă.",
        "Electrocasnicele se aleg devreme. Cuptorul, plita, hota, frigiderul și mașina de spălat vase au dimensiuni fixe, iar corpurile se fac în jurul lor.",
        "Între chiuvetă, plită și frigider contează distanțele: dacă sunt prea mari, faci mulți pași, iar dacă sunt prea mici, nu ai unde lucra. Blatul liber dintre ele e locul în care se gătește de fapt.",
        "Corpurile înalte până la tavan adună mult spațiu de depozitare pe o suprafață mică și nu lasă loc de praf deasupra.",
      ],
    },
    materiale: {
      titlu: "Fronturi și blaturi",
      paragrafe: [
        "Fronturile mate ascund amprentele mai bine decât cele lucioase. Cele lucioase reflectă lumina și fac o bucătărie mică să pară mai mare.",
        "Fronturile cu ramă dau un aer clasic. Cele drepte, fără mâner, sunt pentru bucătăriile minimaliste. Fronturile riflate adaugă textură fără să încarce spațiul.",
        "Blatul se alege după cum gătești: unele suprafețe rezistă mai bine la căldură, altele la zgârieturi sau la pete. În proiectele de mai sus vezi blaturi cu aspect de lemn, de piatră și în culori închise.",
      ],
    },
    factori: [...factoriComuni, "Forma bucătăriei și numărul de corpuri înalte."],
    intrebari: [
      ...intrebariComune,
      {
        intrebare: "Ce informații trimit pentru o ofertă?",
        raspuns:
          "Numele, telefonul și tipul de mobilă ajung ca să te contactăm. Pentru o ofertă estimativă cât mai apropiată de prețul final, adaugă forma bucătăriei, lungimea pereților, înălțimea până la tavan și câteva poze. Formularul te ghidează.",
      },
      {
        intrebare: "Pot alege eu culorile și finisajele?",
        raspuns:
          "Da. Mobila se face pe comandă, deci culoarea fronturilor, tipul blatului și mânerele se aleg pentru fiecare bucătărie în parte.",
      },
      {
        intrebare: "Se poate face o bucătărie pentru un spațiu mic sau cu pereți strâmbi?",
        raspuns:
          "Da, tocmai pentru asta există mobila la comandă. Corpurile se fac după dimensiunile reale, nu după module standard, așa că se pot folosi și colțurile și spațiul de până la tavan.",
      },
      {
        intrebare: "Ce înseamnă eticheta „Proiect 3D” de pe unele imagini?",
        raspuns:
          "Marchează randările, adică imaginile generate pe calculator înainte de execuție. Pozele fără etichetă arată mobila realizată. Pentru bucătăria ta primești și tu randări, înainte de producție.",
      },
      {
        intrebare: "Ce blaturi folosiți?",
        raspuns:
          "Lucrăm cu blaturi Kaindl, Cressent și quartz compozit. Blaturile din quartz se croiesc și se montează la fața locului. Tipul potrivit îl alegem împreună, după cum gătești.",
      },
    ],
  },

  dressinguri: {
    grupuriMateriale: ["pal", "mdf", "feronerie"],
    h1: "Dressinguri la comandă",
    title: "Dressinguri și dulapuri la comandă",
    description:
      "Dressinguri și dulapuri la comandă, făcute pe toată înălțimea camerei, inclusiv la mansardă. Vezi proiectele realizate și cere ofertă.",
    intro:
      "Un dressing bun se face după ce ai de pus în el: haine lungi, haine scurte, încălțăminte, genți, lenjerie. Pe asta se calculează câte bare, rafturi și sertare îți trebuie și la ce înălțime.",
    imagine: ["dressing-birou-masa-machiaj", 2],
    titluSecundare: "Dulapuri pe toată înălțimea",
    textSecundare:
      "Dulapuri din proiectele de dormitor și de living: pe toată lungimea peretelui, adaptate la panta mansardei sau combinate cu rafturi deschise.",
    cumLucram: {
      titlu: "Cum se gândește un dressing",
      paragrafe: [
        "Se pornește de la inventar. Hainele lungi cer o zonă cu bară la înălțime mare, cele scurte pot sta pe două bare suprapuse, iar împăturitele merg pe rafturi sau în sertare.",
        "Dulapul până la tavan folosește tot peretele. Partea de sus, mai greu accesibilă, rămâne pentru lucrurile de sezon.",
        "La mansardă, corpurile se taie după panta acoperișului, ca să nu rămână colțuri nefolosite.",
        "Un dressing poate include și altceva: un birou, o masă de machiaj sau rafturi deschise pentru încălțăminte, ca în proiectul de mai sus.",
      ],
    },
    materiale: {
      titlu: "Uși, rafturi și interior",
      paragrafe: [
        "Ușile pot fi batante, glisante sau lipsi cu totul, la un dressing deschis. Ușile glisante nu au nevoie de spațiu în fața dulapului.",
        "Fronturile deschise la culoare fac un dressing mare să pară mai ușor. Rafturile deschise lasă lucrurile la vedere și se folosesc pentru ce porți des.",
      ],
    },
    factori: [...factoriComuni, "Tipul ușilor: batante, glisante sau dressing deschis."],
    intrebari: [
      ...intrebariComune,
      {
        intrebare: "Ce informații trimit pentru o ofertă?",
        raspuns:
          "Numele, telefonul și tipul de mobilă ajung ca să te contactăm. Pentru o estimare mai exactă, adaugă lățimea, înălțimea și adâncimea disponibilă, plus câteva poze ale spațiului.",
      },
      {
        intrebare: "Se poate face un dulap la mansardă?",
        raspuns:
          "Da. Corpurile se fac după panta acoperișului. Vezi mai sus dulapurile din dormitorul la mansardă.",
      },
      {
        intrebare: "Pot combina dressingul cu un birou sau o masă de machiaj?",
        raspuns:
          "Da, mobila se proiectează pentru toată camera. Proiectul de mai sus are în aceeași încăpere dressing, birou și masă de machiaj.",
      },
    ],
  },

  dormitoare: {
    grupuriMateriale: ["pal", "mdf", "feronerie"],
    h1: "Dormitoare la comandă",
    title: "Dormitoare, camere de copii și paturi tapițate",
    description:
      "Dormitoare la comandă: dulapuri, paturi tapițate, noptiere, camere de copii și paturi rabatabile, făcute după dimensiunile camerei. Vezi proiectele.",
    intro:
      "În dormitor, mobila se gândește în jurul patului: cât loc rămâne pe laterale, unde încape dulapul, ce se întâmplă cu peretele din spatele tăbliei. În proiectele de mai jos vezi dormitoare, camere de copii și paturi tapițate.",
    imagine: ["dormitor-mansarda-dulapuri-crem", 1],
    cumLucram: {
      titlu: "Cum se gândește un dormitor",
      paragrafe: [
        "Patul ocupă cea mai mare suprafață, așa că poziția lui se stabilește prima. Tăblia poate rămâne o piesă separată sau poate acoperi tot peretele, cu noptiere și aplice integrate.",
        "Dulapul se face pe toată înălțimea, pe peretele cel mai lung, sau se împarte în corpuri mai mici dacă ai ferestre și uși pe drum.",
        "În camerele de copii, mobila trebuie să țină pasul cu copilul: un pat-căsuță, un pat supraetajat care eliberează podeaua, rafturi joase pentru jucării.",
        "Într-o cameră mică, un pat rabatabil eliberează spațiul ziua și îl transformă în dormitor seara.",
      ],
    },
    materiale: {
      titlu: "Tapițerie, fronturi și culori",
      paragrafe: [
        "Paturile tapițate pot avea ladă de depozitare sub saltea, cu mecanism de ridicare. Tăblia poate fi capitonată, din panouri verticale sau dreaptă.",
        "Pentru dulapuri, fronturile mate în tonuri deschise liniștesc camera. Accentele de culoare se pun pe piese mici: nișe, butoni, tăblie.",
      ],
    },
    factori: [...factoriComuni, "Tapițeria și mecanismul patului, dacă e cazul."],
    intrebari: [
      ...intrebariComune,
      {
        intrebare: "Ce informații trimit pentru o ofertă?",
        raspuns:
          "Numele, telefonul și tipul de mobilă ajung ca să te contactăm. Pentru o estimare mai exactă, adaugă lungimea pereților pe care vine mobila, înălțimea camerei și câteva poze.",
      },
      {
        intrebare: "Faceți și paturi tapițate separat?",
        raspuns:
          "În proiectele de mai sus sunt paturi tapițate făcute ca piese separate, cu tăblii și ladă de depozitare. Spune-ne în cerere ce pat îți dorești.",
      },
      {
        intrebare: "Se poate face mobilă pentru o cameră de copil?",
        raspuns:
          "Da. Vezi mai sus camerele de copii: paturi-căsuță, pat supraetajat, dulapuri cu forme și culori alese pentru copii.",
      },
    ],
  },

  living: {
    grupuriMateriale: ["pal", "mdf", "feronerie"],
    h1: "Mobilier de living la comandă",
    title: "Mobilier living la comandă: pereți TV, biblioteci",
    description:
      "Mobilier de living la comandă: pereți TV, comode, biblioteci, vitrine, mese din lemn masiv și piese din metal. Vezi proiectele realizate și cere ofertă.",
    intro:
      "În living, mobila stă la vedere toată ziua. Un perete TV, o bibliotecă sau o vitrină încastrată dau caracter camerei și ascund cablurile, aparatele și lucrurile mărunte.",
    imagine: ["perete-tv-alb-nisa-neagra", 1],
    cumLucram: {
      titlu: "Cum se gândește un living",
      paragrafe: [
        "Peretele TV se proiectează în jurul televizorului: mărimea ecranului, înălțimea la care îl privești și locul în care ajung cablurile.",
        "Corpurile suspendate lasă podeaua liberă și camera pare mai mare. Corpurile de la podea la tavan adună mai mult spațiu de depozitare.",
        "Lamelele din lemn, nișele iluminate sau un panou de altă culoare fac din peretele TV punctul central al camerei.",
        "O masă din lemn masiv sau o bibliotecă din metal pot completa livingul ca piese de sine stătătoare.",
      ],
    },
    materiale: {
      titlu: "Lemn, metal și finisaje",
      paragrafe: [
        "Furnirul și decorurile cu aspect de lemn încălzesc un living cu pereți albi. Fronturile albe mate se potrivesc cu aproape orice canapea.",
        "Structurile din metal negru sunt subțiri și lasă vizibil peretele din spate. Lemnul masiv păstrează desenul natural al fibrei, cu noduri și crăpături.",
      ],
    },
    factori: [...factoriComuni, "Iluminarea integrată și trecerile pentru cabluri."],
    intrebari: [
      ...intrebariComune,
      {
        intrebare: "Ce informații trimit pentru o ofertă?",
        raspuns:
          "Numele, telefonul și tipul de mobilă ajung ca să te contactăm. Pentru o estimare mai exactă, adaugă lungimea peretelui, înălțimea și câteva poze ale camerei.",
      },
      {
        intrebare: "Se pot ascunde cablurile televizorului?",
        raspuns:
          "Peretele TV se proiectează cu treceri pentru cabluri și cu loc pentru aparate, astfel încât să rămână la vedere cât mai puțin.",
      },
      {
        intrebare: "Faceți și piese din lemn masiv sau metal?",
        raspuns:
          "Vezi mai sus masa din lemn masiv cu rășină, măsuța cu picioare metalice și bibliotecile din structură metalică.",
      },
    ],
  },

  "hol-si-baie": {
    grupuriMateriale: ["pal", "mdf", "feronerie"],
    h1: "Mobilier de hol și baie la comandă",
    title: "Mobilier hol și baie la comandă",
    description:
      "Mobilier de hol și baie la comandă: dulapuri încastrate, cuiere, mobilier sub scară, mobilier de baie cu lavoar pe blat. Vezi proiectele realizate.",
    intro:
      "Holul și baia sunt spații mici, în care fiecare centimetru contează. Mobila făcută pe măsură folosește nișele, spațiul de sub scară și pereții de lângă ușă.",
    imagine: ["baie-bej-riflaj-blat-lemn", 1],
    cumLucram: {
      titlu: "Cum se gândesc holul și baia",
      paragrafe: [
        "Pe hol, primul lucru e trecerea: dulapul nu trebuie să încurce ușile. Adâncimea corpurilor se alege după ce stă în ele: haine, încălțăminte, aspiratorul.",
        "Spațiul de sub scară poate deveni sertare mari pe role sau un dulap cu uși glisante.",
        "În baie, mobila se așază după racordurile de apă. Un blat suspendat lasă podeaua liberă și se curăță ușor.",
        "Lavoarul pe blat, oglinda iluminată și coloana înaltă de lângă ele adună tot ce ai nevoie la îndemână.",
      ],
    },
    materiale: {
      titlu: "Finisaje pentru spații mici",
      paragrafe: [
        "Fronturile deschise la culoare fac un hol îngust să pară mai larg. Oglinda pe ușa dulapului ajută la fel.",
        "În baie, suprafețele sunt expuse la umezeală și se aleg ținând cont de asta. În proiectele de mai sus vezi fronturi mate, lucioase și riflate.",
      ],
    },
    factori: [...factoriComuni, "Tipul lavoarului și al oglinzii, în baie."],
    intrebari: [
      ...intrebariComune,
      {
        intrebare: "Ce informații trimit pentru o ofertă?",
        raspuns:
          "Numele, telefonul și tipul de mobilă ajung ca să te contactăm. Pentru o estimare mai exactă, adaugă lungimea peretelui, înălțimea și câteva poze ale spațiului.",
      },
      {
        intrebare: "Se poate folosi spațiul de sub scară?",
        raspuns:
          "Da. Vezi mai sus sertarele mari pe role și dulapul cu uși glisante făcute sub scară.",
      },
      {
        intrebare: "Faceți și balustrade sau piese din metal?",
        raspuns:
          "Vezi mai sus balustrada din profile metalice negre făcută pentru o scară interioară.",
      },
    ],
  },

  comercial: {
    grupuriMateriale: ["pal", "mdf", "blaturi", "feronerie"],
    h1: "Mobilier comercial la comandă",
    title: "Mobilier comercial la comandă: birouri, recepții",
    description:
      "Mobilier comercial la comandă pentru birouri, recepții, showroom-uri și spații de vânzare. Vezi proiectele realizate și cere ofertă.",
    intro:
      "Într-un spațiu comercial, mobila lucrează pentru firmă: primește clienții la recepție, pune produsele în valoare, ține biroul în ordine. Se face după planul spațiului și după cum circulă oamenii prin el.",
    imagine: ["birou-executiv-alb-lucios-furnir", 1],
    cumLucram: {
      titlu: "Cum se gândește un spațiu comercial",
      paragrafe: [
        "Se pornește de la planul spațiului și de la ce se întâmplă în el: unde intră clienții, unde se așază, unde se expun produsele.",
        "Recepția e primul lucru pe care îl vede un client, așa că finisajele de acolo contează cel mai mult.",
        "Rafturile și vitrinele se fac după produsele expuse: sticle, haine, accesorii, mostre.",
      ],
    },
    materiale: {
      titlu: "Finisaje pentru folosire intensă",
      paragrafe: [
        "Mobila dintr-un spațiu comercial e folosită de mulți oameni, în fiecare zi. Suprafețele se aleg să reziste și să se curețe ușor.",
        "Iluminarea integrată în recepții și rafturi pune în valoare produsele și materialele.",
      ],
    },
    factori: [...factoriComuni, "Iluminarea integrată și elementele decorative."],
    intrebari: [
      ...intrebariComune,
      {
        intrebare: "Ce informații trimit pentru o ofertă?",
        raspuns:
          "Numele, telefonul și tipul de mobilă ajung ca să te contactăm. Pentru un spațiu comercial, ajută mult planul spațiului și câteva poze.",
      },
      {
        intrebare: "Lucrați și cu firme?",
        // TODO: de completat de Alex: facturare, contracte, termene pentru firme.
        raspuns:
          "Da, proiectele de mai sus sunt pentru birouri, recepții și spații de vânzare. Trimite-ne o cerere cu detaliile spațiului.",
      },
    ],
  },
};
