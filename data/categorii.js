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

  hol: {
    grupuriMateriale: ["pal", "mdf", "feronerie"],
    h1: "Mobilier de hol la comandă",
    title: "Mobilier de hol la comandă: dulapuri, cuiere",
    description:
      "Mobilier de hol la comandă: dulapuri până la tavan, bănci cu pantofar, cuiere, mobilier sub scară și balustrade. Vezi proiectele realizate și cere ofertă.",
    intro:
      "Holul e prima cameră în care intri și ultima din care ieși, deci mobila lui ține haine, încălțăminte, chei și uneori chiar mașina de spălat. Facem dulapuri, bănci, cuiere și mobilier sub scară pe măsura holului tău, în fabrica noastră din București.",
    imagine: ["hol-dulapuri-bej-nisa-stejar-etajera-colt", 1],
    cumLucram: {
      titlu: "Cum se gândește un hol",
      paragrafe: [
        "Primul lucru pe care îl verificăm e trecerea. Dulapul nu trebuie să încurce ușile, iar între el și peretele opus trebuie să rămână loc să te încalți fără să te lovești de ceva.",
        "Adâncimea corpurilor se alege după ce ține fiecare. Hainele pe umerașe cer un corp mai adânc, încălțămintea merge în corpuri mai puțin adânci, iar pe un hol îngust ușile glisante sau cele cu deschidere prin apăsare nu mai cer loc în față.",
        "Un hol bun are și un loc unde te așezi și lași geanta: o banchetă, o nișă sau un cuier cu raft. În proiectele de mai jos vezi bănci tapițate, nișe în decor de stejar și pantofare integrate în dulap.",
        "Dacă ai scară în casă, spațiul de sub ea poate deveni sertare mari pe role sau un dulap cu uși glisante. Tot noi facem și balustrada din profile metalice sau mâna curentă iluminată.",
      ],
    },
    materiale: {
      titlu: "Finisaje pentru un spațiu mic",
      paragrafe: [
        "Fronturile deschise la culoare fac un hol îngust să pară mai larg. Ușile din oglindă pe un perete întreg dublează lumina, ca în holul cu dulapuri gri din proiectele de mai jos.",
        "Un hol se folosește zilnic, cu geci ude și încălțăminte, deci contează feroneria cu închidere lină și fronturile ușor de curățat. Dulapurile care ascund o mașină de spălat primesc grile de ventilație.",
        "Într-un hol deschis spre living, un paravan din lamele separă zonele fără să oprească lumina.",
      ],
    },
    factori: [
      "Dimensiunile: lungimea peretelui, înălțimea până la tavan și adâncimea corpurilor.",
      "Tipul ușilor: batante, glisante, cu deschidere prin apăsare sau cu oglindă.",
      "Finisajul fronturilor: PAL, MDF vopsit mat, frezat sau riflat.",
      "Elementele de ședere și depozitare: banchetă, pantofar, cuier, rafturi.",
      "Feroneria și accesoriile: balamale, glisiere, bare, iluminare.",
      "Elementele speciale: grile de ventilație, nișe, mobilier sub scară, balustradă.",
    ],
    intrebari: [
      {
        intrebare: "Se poate folosi spațiul de sub scară?",
        raspuns:
          "Da. În proiectele de mai sus sunt sertare mari pe role și un dulap cu uși glisante, făcute sub scară. Forma corpurilor urmează treptele, iar dimensiunile exacte se iau la măsurătorile de după contract.",
      },
      {
        intrebare: "Ce adâncime are un dulap de hol?",
        raspuns:
          "Depinde de ce ține. Pentru haine pe umerașe, un corp de 55–60 cm e confortabil. Pentru încălțăminte sunt suficiente corpuri mai puțin adânci, așa că într-un hol îngust dulapul poate avea părți de adâncimi diferite.",
      },
      {
        intrebare: "Se poate ascunde în dulap mașina de spălat?",
        raspuns:
          "Da. Într-unul dintre proiectele de mai sus, dulapurile albe de hol ascund mașina de spălat și uscătorul, unul peste altul. Spune-ne în cerere ce aparate ai, ca să prevedem nișa și ventilația.",
      },
      {
        intrebare: "Ce trimit pentru o ofertă la un hol?",
        raspuns:
          "Lungimea pereților pe care vine mobila, înălțimea până la tavan, poziția ușilor și câteva poze. Cum se măsoară pas cu pas găsești în [ghidul de măsurare](/ghiduri/cum-masori-pentru-oferta-de-mobila-la-comanda/).",
      },
      intrebariComune[0],
    ],
    vezi: [
      { href: "/dulapuri-la-comanda", text: "Dulapuri la comandă" },
      { href: "/mobilier-baie-la-comanda", text: "Mobilier de baie la comandă" },
      { href: "/dressinguri-la-comanda", text: "Dressinguri la comandă" },
      { href: "/ghiduri/cum-masori-pentru-oferta-de-mobila-la-comanda", text: "Ghid: cum măsori pentru o ofertă" },
    ],
  },

  baie: {
    grupuriMateriale: ["pal", "mdf", "feronerie"],
    h1: "Mobilier de baie la comandă",
    title: "Mobilier de baie la comandă, cu blat și lavoar",
    description:
      "Mobilier de baie la comandă: corpuri suspendate, blat pentru lavoar, oglinzi iluminate și coloane înalte, făcute după dimensiunile băii. Vezi proiectele.",
    intro:
      "Într-o baie fiecare centimetru contează, iar țevile nu se mută după cum ne-ar conveni mobila. De aceea mobilierul se face pe măsura băii tale: corpuri sub lavoar, coloane înalte, oglinzi iluminate și rafturi, produse în fabrica noastră din București.",
    imagine: ["baie-bej-riflaj-blat-lemn", 1],
    cumLucram: {
      titlu: "Cum se gândește o baie",
      paragrafe: [
        "Pornim de la racorduri. Poziția scurgerii și a țevilor de apă decide unde poate sta corpul de sub lavoar și cum se decupează sertarele, ca sifonul să aibă loc.",
        "Lavoarul se alege înaintea mobilei. Un lavoar pe blat, unul încastrat sau unul din piatră cer blaturi și decupaje diferite, iar bateria de perete sau de blat schimbă înălțimea oglinzii.",
        "Corpurile suspendate lasă podeaua liberă, se curăță ușor și fac o baie mică să pară mai mare. Corpurile pe picioare sau pe soclu sunt o alternativă pentru un aer mai clasic.",
        "Oglinda iluminată și coloana înaltă de lângă lavoar adună la îndemână ce folosești zilnic. Într-o baie cu două lavoare, un blat continuu și sertare separate evită îngrămădeala de dimineață.",
      ],
    },
    materiale: {
      titlu: "Finisaje pentru umezeală",
      paragrafe: [
        "Baia e cea mai umedă cameră din casă, așa că materialele, muchiile și finisajele se aleg ținând cont de asta. Varianta potrivită pentru baia ta o stabilim împreună, în proiect.",
        "Fronturile mate se întrețin ușor, cele lucioase măresc lumina, iar cele riflate adaugă textură. În proiectele de mai jos vezi băi cu mobilier maro mat, galben lucios, bej riflat și alb cu butoni negri.",
        "Cum se compară materialele găsești în [ghidul PAL, MDF sau lemn masiv](/ghiduri/pal-mdf-sau-lemn-masiv/).",
      ],
    },
    factori: [
      "Dimensiunile băii și ale fiecărui corp.",
      "Tipul lavoarului și al blatului: pe blat, încastrat, din piatră.",
      "Forma corpurilor: suspendate, pe picioare sau pe soclu.",
      "Finisajul fronturilor: mat, lucios, riflat, cu ramă.",
      "Feroneria: glisiere cu închidere lină, sertare decupate pentru sifon.",
      "Accesoriile: oglindă iluminată, coloană înaltă, rafturi deschise.",
    ],
    intrebari: [
      {
        intrebare: "Cum rezistă mobilierul din baie la umezeală?",
        raspuns:
          "Materialele și finisajul se aleg ținând cont de umezeală, iar detaliile le stabilim în proiect. În proiectele de mai sus sunt băi cu fronturi mate, lucioase și riflate.",
      },
      {
        intrebare: "Cine alege lavoarul și bateria?",
        raspuns:
          "De obicei tu, înainte de proiect, pentru că blatul și sertarele se decupează după ele. Dacă nu ai ales încă, spune-ne în cerere și discutăm opțiunile.",
      },
      {
        intrebare: "Se poate face mobilier pentru o baie mică?",
        raspuns:
          "Da. Corpurile suspendate, o coloană îngustă și o oglindă cu raft folosesc înălțimea peretelui și lasă podeaua liberă. Adâncimea corpurilor se adaptează la lățimea trecerii.",
      },
      {
        intrebare: "Ce trimit pentru o ofertă la o baie?",
        raspuns:
          "Dimensiunile pereților, poziția lavoarului și a racordurilor, înălțimea până la tavan și câteva poze. Cum se măsoară găsești în [ghidul de măsurare](/ghiduri/cum-masori-pentru-oferta-de-mobila-la-comanda/).",
      },
    ],
    vezi: [
      { href: "/mobilier-hol-la-comanda", text: "Mobilier de hol la comandă" },
      { href: "/dulapuri-la-comanda", text: "Dulapuri la comandă" },
      { href: "/ghiduri/pal-mdf-sau-lemn-masiv", text: "Ghid: PAL, MDF sau lemn masiv" },
      { href: "/ghiduri/cum-masori-pentru-oferta-de-mobila-la-comanda", text: "Ghid: cum măsori pentru o ofertă" },
    ],
  },

  dulapuri: {
    grupuriMateriale: ["pal", "mdf", "feronerie"],
    h1: "Dulapuri la comandă",
    title: "Dulapuri la comandă: pe toată înălțimea camerei",
    description:
      "Dulapuri la comandă cu uși batante sau glisante, făcute pe măsura peretelui, până la tavan. Producție proprie în București. Vezi proiectele și cere ofertă.",
    intro:
      "Un dulap la comandă se face pentru peretele pe care stă: ține cont de calorifer, de priza din colț și de tavanul care poate fi înclinat. Corpurile se produc în fabrica noastră din București, după desenul aprobat de tine, și se montează cu echipa noastră.",
    imagine: ["dulap-usi-glisante-tip-shoji", 1],
    cumLucram: {
      titlu: "Cum se gândește un dulap",
      paragrafe: [
        "Pornim de la ce trebuie să încapă. Hainele lungi cer o zonă înaltă cu bară, cele scurte pot sta pe două bare suprapuse, iar restul merge pe rafturi și în sertare. Din această împărțire rezultă lățimea fiecărui corp.",
        "Apoi alegem ușile. Cele batante se deschid larg și arată tot interiorul, dar au nevoie de loc în fața dulapului. Cele glisante nu iau spațiu în cameră, deci merg bine în dormitoare înguste, iar un perete întreg poate arăta ca un singur panou, ca în dulapul cu uși tip shoji.",
        "Dulapul până la tavan folosește tot peretele și nu lasă loc de praf deasupra. La mansardă, corpurile se taie după panta acoperișului, iar colțurile se rezolvă cu un corp special, ca să nu rămână spațiu mort.",
        "Un dulap poate include și altceva: o masă de machiaj, o nișă pentru televizor sau un pat rabatabil care dispare ziua în perete. Pentru o încăpere întreagă cu zonă de îmbrăcat, vezi [dressingurile la comandă](/dressinguri-la-comanda/).",
      ],
    },
    materiale: {
      titlu: "Corpuri, uși și interior",
      paragrafe: [
        "Corpurile se fac din PAL melaminat de 18 mm, în decoruri uni, lemn sau piatră. Ușile pot fi din același PAL sau din MDF vopsit mat ori lucios, frezat sau riflat, ca să se potrivească cu restul camerei.",
        "Mânerele pot lipsi: deschiderea se face prin apăsare sau cu un profil frezat direct în front. Balamalele și glisierele cu închidere lină se simt zilnic, mai ales la ușile mari și la sertarele încărcate.",
        "În interior contează organizarea: bare, rafturi, sertare, o bară rabatabilă pentru partea înaltă. O oglindă pe o ușă ajută într-o cameră mică și dublează lumina.",
      ],
    },
    factori: [
      "Dimensiunile: lățimea peretelui, înălțimea și adâncimea corpurilor.",
      "Tipul ușilor: batante sau glisante, cu sau fără oglindă.",
      "Materialul și finisajul fronturilor: PAL, MDF vopsit mat sau lucios, frezat, riflat.",
      "Organizarea interioară: numărul de bare, rafturi și sertare.",
      "Feroneria: balamale, glisiere, deschidere prin apăsare.",
      "Accesoriile: iluminare în interior, organizatoare, bară rabatabilă.",
    ],
    intrebari: [
      {
        intrebare: "Cât de adânc trebuie să fie un dulap?",
        raspuns:
          "Pentru haine pe umerașe, un corp de 55–60 cm e confortabil. Rafturile și sertarele pot fi mai puțin adânci. Adâncimea finală depinde de cât loc ai în cameră și o stabilim în proiect.",
      },
      {
        intrebare: "Uși glisante sau uși batante?",
        raspuns:
          "Ușile glisante nu cer loc în fața dulapului, dar deschid doar o parte din interior odată. Cele batante arată tot interiorul, dar au nevoie de spațiu liber în față. Alegerea depinde de cameră.",
      },
      {
        intrebare: "Se poate face un dulap la mansardă sau într-o nișă neregulată?",
        raspuns:
          "Da. Corpurile se fac după dimensiunile reale, inclusiv după panta acoperișului, ca în dormitorul la mansardă de mai sus. Colțurile și nișele se folosesc și ele.",
      },
      {
        intrebare: "Ce trimit pentru o ofertă la un dulap?",
        raspuns:
          "Lungimea peretelui, înălțimea până la tavan, adâncimea disponibilă și câteva poze ale camerei. Cum se măsoară găsești în [ghidul de măsurare](/ghiduri/cum-masori-pentru-oferta-de-mobila-la-comanda/).",
      },
      {
        intrebare: "Cine montează dulapul?",
        raspuns:
          "Echipa noastră. Dacă după montaj e nevoie de reglaje la uși sau la sertare, revenim pentru service.",
      },
    ],
    vezi: [
      { href: "/dressinguri-la-comanda", text: "Dressinguri la comandă" },
      { href: "/dormitoare-la-comanda", text: "Dormitoare la comandă" },
      { href: "/mobilier-hol-la-comanda", text: "Mobilier de hol la comandă" },
      { href: "/ghiduri/cum-planifici-un-dressing", text: "Ghid: cum planifici un dressing" },
    ],
  },

  "paturi-tapitate": {
    grupuriMateriale: ["pal", "mdf", "feronerie"],
    h1: "Paturi tapițate la comandă",
    title: "Paturi tapițate la comandă, cu ladă și tăblie",
    description:
      "Paturi tapițate la comandă, cu tăblie capitonată sau din panouri și ladă de depozitare. Tapițerie în fabrica noastră din București. Vezi proiectele.",
    intro:
      "Un pat tapițat se face în jurul saltelei și al tăbliei pe care o vrei: joasă și simplă, capitonată sau pe tot peretele. Tapițăm în fabrica noastră din București, iar patul, noptierele și panourile din jur se proiectează împreună, ca să arate ca un singur ansamblu.",
    imagine: ["pat-tapitat-catifea-verde", 1],
    cumLucram: {
      titlu: "Cum se gândește un pat tapițat",
      paragrafe: [
        "Pornim de la salteaua pe care o ai sau pe care o vei cumpăra, pentru că patul se face după ea: lungime, lățime și grosime. Din ea rezultă dimensiunea patului și locul rămas pe laterale.",
        "Tăblia decide aspectul camerei. Poate fi o piesă înaltă și capitonată, un șir de panouri verticale care acoperă tot peretele sau o formă jucăușă, ca tăblia în formă de căsuță dintr-un pat de copil. Noptierele pot fi suspendate de tăblie sau așezate separat.",
        "Sub saltea se poate face o ladă de depozitare cu mecanism de ridicare, ca în mai multe proiecte de mai jos. Ea cere un pat puțin mai înalt și loc liber lângă pat, ca să se ridice salteaua.",
        "Dacă patul face parte dintr-un dormitor întreg, îl proiectăm împreună cu dulapurile și comoda, ca tonurile să se potrivească. Vezi și [dormitoarele la comandă](/dormitoare-la-comanda/).",
      ],
    },
    materiale: {
      titlu: "Tapițerie și structură",
      paragrafe: [
        "Structura patului se face din plăci, iar tapițeria se aplică peste ea, tot în fabrica noastră. Țesătura o alegi după aspect: catifeaua dă o culoare adâncă, ca verdele smarald dintr-unul dintre proiecte, iar o țesătură cu textură ascunde mai ușor urmele de folosire.",
        "Tăblia capitonată are un model de cute repetate, iar panourile verticale dau o linie mai dreaptă și se pot continua pe perete. Culorile se potrivesc cu restul mobilierului: crem și bej pentru o cameră liniștită, albastru sau verde pentru un accent.",
      ],
    },
    factori: [
      "Dimensiunea saltelei, deci a patului.",
      "Tipul și înălțimea tăbliei: capitonată, din panouri, pe tot peretele.",
      "Țesătura și culoarea tapițeriei.",
      "Lada de depozitare cu mecanism de ridicare, dacă o vrei.",
      "Noptierele și panourile tapițate suplimentare.",
      "Mobilierul din jur: dulapuri, comodă, masă de toaletă.",
    ],
    intrebari: [
      {
        intrebare: "Pot alege țesătura și culoarea?",
        raspuns:
          "Da, patul se face pe comandă. Spune-ne în cerere ce culoare și ce aspect îți dorești, iar materialul exact îl stabilim în proiect.",
      },
      {
        intrebare: "Patul poate avea ladă de depozitare?",
        raspuns:
          "Da. Mai multe paturi de mai sus au sub saltea o ladă cu mecanism de ridicare. Spune-ne în cerere dacă o vrei.",
      },
      {
        intrebare: "Tăblia poate acoperi tot peretele?",
        raspuns:
          "Da. Vezi patul bej cu tăblie din panouri verticale pe tot peretele sau peretele îmbrăcat în panouri tapițate albastre. Lățimea panourilor se stabilește după perete.",
      },
      {
        intrebare: "Faceți și paturi tapițate pentru copii?",
        raspuns:
          "Da. Vezi patul de copil tapițat cu tăblie în formă de căsuță, făcut în același fel ca unul pentru adulți.",
      },
      {
        intrebare: "Ce trimit pentru o ofertă la un pat?",
        raspuns:
          "Dimensiunea saltelei, tipul de tăblie dorit, culoarea și câteva poze ale camerei. Dacă patul vine într-un dormitor întreg, adaugă și dimensiunile pereților.",
      },
    ],
    vezi: [
      { href: "/dormitoare-la-comanda", text: "Dormitoare la comandă" },
      { href: "/dulapuri-la-comanda", text: "Dulapuri la comandă" },
      { href: "/ghiduri/pal-mdf-sau-lemn-masiv", text: "Ghid: PAL, MDF sau lemn masiv" },
    ],
  },

  "bucatarii-insula": {
    grupuriMateriale: ["pal", "mdf", "blaturi", "feronerie"],
    h1: "Bucătării cu insulă la comandă",
    title: "Bucătării cu insulă la comandă, pe măsura camerei",
    description:
      "Bucătării cu insulă la comandă, gândite după spațiul din jur și instalații. Blat, fronturi și feronerie alese de tine, producție proprie. Vezi proiectele.",
    intro:
      "O insulă schimbă felul în care se folosește bucătăria: devine loc de gătit, de pregătit și de servit masa. Ca să funcționeze, are nevoie de spațiu în jur și de instalații duse până la ea, așa că o gândim din proiect, nu o adăugăm la sfârșit.",
    imagine: ["bucatarie-verde-inchis-riflaj-insula", 1],
    titluSecundare: "Peninsulă, pentru camere mai înguste",
    textSecundare:
      "Peninsula e o insulă prinsă de perete sau de un corp înalt. Ocupă mai puțin loc și păstrează zona de servit masa.",
    cumLucram: {
      titlu: "Cum se gândește o insulă",
      paragrafe: [
        "Prima întrebare e spațiul. În jurul insulei trebuie să încapă deschiderea ușilor, a sertarelor și trecerea, în general cam un metru liber pe fiecare latură. Dacă bucătăria nu are loc pentru asta, o peninsulă se potrivește mai bine.",
        "A doua e ce pui pe ea. O insulă cu suprafață de lucru și corpuri de depozitare e simplu de făcut. Dacă vrei plită sau chiuvetă pe insulă, țevile, scurgerea și curentul trebuie duse prin podea, ceea ce se hotărăște înainte de a termina pardoseala.",
        "Insula poate avea și o parte de servit masa: un blat prelungit, cu scaune, sau o masă care pleacă din ea, ca în proiectul cu insula cu aspect de marmură. Pentru scaune, blatul iese în afară, iar corpul de dedesubt se retrage.",
        "Iluminatul și prizele se prevăd tot din proiect, ca să nu rămână cabluri la vedere.",
      ],
    },
    materiale: {
      titlu: "Blat, fronturi și detalii",
      paragrafe: [
        "Blatul insulei e cel mai vizibil element din cameră. Lucrăm cu blaturi Kaindl, Cressent și din quartz compozit; cel din quartz se croiește și se montează la fața locului. În proiectele de mai jos vezi blaturi cu aspect de stejar, de piatră și de marmură.",
        "Fronturile insulei pot fi la fel cu ale restului bucătăriei sau pot contrasta: verde riflat peste fronturi mate, bleu cu alb, fronturi cu ramă. Insula poate include un suport pentru sticle de vin, rafturi deschise sau sertare largi.",
        "Despre formele bucătăriilor și celelalte alegeri găsești mai mult pe pagina de [bucătării la comandă](/bucatarii-la-comanda/).",
      ],
    },
    factori: [
      "Dimensiunea insulei și a bucătăriei.",
      "Ce include insula: doar depozitare sau și chiuvetă, plită.",
      "Tipul blatului: Kaindl, Cressent sau quartz compozit.",
      "Finisajul fronturilor: mat, lucios, cu ramă, riflat.",
      "Zona de servit masa: blat prelungit, scaune sau masă atașată.",
      "Feroneria și accesoriile: sertare largi, suport pentru vin, iluminare.",
    ],
    intrebari: [
      {
        intrebare: "Cât spațiu trebuie să am pentru o insulă?",
        raspuns:
          "Depinde de dimensiunea ei și de cum se deschid corpurile din jur. Ca regulă, lasă cam un metru liber în jurul insulei. Dacă nu ai atât loc, o peninsulă e alternativa. Planul camerei ne arată varianta potrivită.",
      },
      {
        intrebare: "Insula poate avea chiuvetă sau plită?",
        raspuns:
          "Da, dacă instalațiile pot fi duse până la ea. Se hotărăște la început, odată cu proiectul, pentru că scurgerea și curentul trec prin podea.",
      },
      {
        intrebare: "Care e diferența dintre insulă și peninsulă?",
        raspuns:
          "Insula stă liberă în cameră și se ocolește pe toate laturile. Peninsula e prinsă pe o latură de perete sau de un corp înalt, deci ocupă mai puțin loc.",
      },
      {
        intrebare: "Pot avea scaune la insulă?",
        raspuns:
          "Da. Blatul se prelungește peste corp, iar corpul se retrage. Spune-ne în cerere câte scaune vrei, ca să calculăm lungimea.",
      },
      intrebariComune[0],
    ],
    vezi: [
      { href: "/bucatarii-la-comanda", text: "Toate bucătăriile la comandă" },
      { href: "/ghiduri/ce-influenteaza-pretul-unei-bucatarii-la-comanda", text: "Ghid: ce influențează prețul unei bucătării" },
      { href: "/ghiduri/cum-masori-pentru-oferta-de-mobila-la-comanda", text: "Ghid: cum măsori pentru o ofertă" },
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

// Linkuri interne către pagini înrudite, afișate la finalul fiecărei pagini de categorie.
const vezi = {
  bucatarii: [
    { href: "/bucatarii-cu-insula", text: "Bucătării cu insulă" },
    { href: "/ghiduri/ce-influenteaza-pretul-unei-bucatarii-la-comanda", text: "Ghid: ce influențează prețul unei bucătării" },
    { href: "/ghiduri/pal-mdf-sau-lemn-masiv", text: "Ghid: PAL, MDF sau lemn masiv" },
  ],
  dressinguri: [
    { href: "/dulapuri-la-comanda", text: "Dulapuri la comandă" },
    { href: "/ghiduri/cum-planifici-un-dressing", text: "Ghid: cum planifici un dressing" },
    { href: "/dormitoare-la-comanda", text: "Dormitoare la comandă" },
  ],
  dormitoare: [
    { href: "/dulapuri-la-comanda", text: "Dulapuri la comandă" },
    { href: "/paturi-tapitate-la-comanda", text: "Paturi tapițate la comandă" },
    { href: "/dressinguri-la-comanda", text: "Dressinguri la comandă" },
  ],
  living: [
    { href: "/dulapuri-la-comanda", text: "Dulapuri la comandă" },
    { href: "/ghiduri/pal-mdf-sau-lemn-masiv", text: "Ghid: PAL, MDF sau lemn masiv" },
    { href: "/mobilier-hol-la-comanda", text: "Mobilier de hol la comandă" },
  ],
  comercial: [
    { href: "/mobila-la-comanda", text: "Mobilă la comandă" },
    { href: "/ghiduri/cum-masori-pentru-oferta-de-mobila-la-comanda", text: "Ghid: cum măsori pentru o ofertă" },
  ],
};
for (const [slug, lista] of Object.entries(vezi)) continutCategorii[slug].vezi = lista;
