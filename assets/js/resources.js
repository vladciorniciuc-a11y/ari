'use strict';

// Content is independent of UI. Local media paths work when index.html is opened directly.
window.ARI_RESOURCES = {
  bank: {
    beneficiary: 'Asociația Active Resilience Initiative',
    iban: 'RO89BREL0002005371400100',
    bank: 'Libra Internet Bank',
    swift: 'BRELROBU',
    source: 'https://ariromania.ro/donatii/index.html'
  },
  profiles: {
    night: {
      title: 'Orientare nocturnă · LANDNAV',
      note: 'Listă orientativă pentru pregătire, nu lista obligatorie a ediției. Confirmă cu ARI echipamentul, durata și ce materiale sunt oferite.',
      groups: [
        {title:'Orientare & lumină', items:[
          ['map','Hartă și busolă','Confirmă dacă sunt oferite de organizatori; protejează harta de umezeală.'],
          ['light','Lanternă frontală funcțională','Verifică funcționarea înainte de plecare.'],
          ['batteries','Baterii sau acumulator de rezervă','Compatibile cu lanterna și încărcate.'],
          ['phone','Telefon încărcat și baterie externă','Păstrează contactele organizatorilor și informațiile traseului.']
        ]},
        {title:'Îmbrăcăminte & protecție', items:[
          ['boots','Încălțăminte potrivită terenului','Cu aderență, deja purtată și confortabilă.'],
          ['layers','Straturi pentru frig și pauze','Adaptează îmbrăcămintea la vreme și efort.'],
          ['rain','Protecție pentru vânt și ploaie','Include protecție pentru conținutul rucsacului.'],
          ['gloves','Căciulă, mănuși și șosete de schimb','Păstrează schimburile într-un săculeț uscat.']
        ]},
        {title:'Apă, hrană & îngrijire', items:[
          ['water','Apă pentru durata activității','Verifică durata și posibilitățile reale de reaprovizionare.'],
          ['food','Hrană ușor de transportat','Alege alimente cunoscute, potrivite nevoilor tale.'],
          ['firstaid','Trusă personală de prim ajutor','Include consumabile de bază și medicația personală prescrisă.'],
          ['blanket','Folie de supraviețuire și fluier','Păstrează-le într-un loc ușor accesibil.']
        ]},
        {title:'Înainte să pleci', items:[
          ['brief','Participare și punct de întâlnire confirmate','Solicită programul și cerințele exacte ale ediției.'],
          ['weather','Prognoză și echipament verificate','Adaptează planul la condițiile comunicate de organizatori.'],
          ['contact','O persoană apropiată cunoaște planul','Comunică zona, organizatorii și ora estimată de revenire.'],
          ['pack','Rucsac verificat și deșeuri pregătite de colectare','Distribuie greutatea și nu lua lucruri pe care nu le poți căra.']
        ]}
      ]
    },
    day: {
      title: 'Ieșire de zi · pădure',
      note: 'Punct de plecare pentru o ieșire de zi. Adaptează lista la traseu, prognoză, durată și experiența grupului.',
      groups: [
        {title:'Traseu & comunicare', items:[
          ['route','Traseu și oră de întoarcere stabilite','Alege dificultatea după capacitatea întregului grup.'],
          ['map','Hartă, busolă și traseu disponibil offline','Cunoaște punctele de acces și variantele de retragere.'],
          ['phone','Telefon și baterie externă încărcate','Salvează contactele grupului.'],
          ['light','Lanternă și baterii de rezervă','Întoarcerea se poate prelungi după lăsarea serii.']
        ]},
        {title:'Confort & resurse', items:[
          ['boots','Încălțăminte cu aderență','Potrivită terenului și deja testată.'],
          ['rain','Strat călduros și protecție de ploaie','Vremea se poate schimba în timpul ieșirii.'],
          ['water','Apă și hrană','Planificate pentru durata traseului și nevoile personale.'],
          ['sun','Protecție față de soare','Acoperământ pentru cap, ochelari și protecție potrivită.'],
          ['firstaid','Trusă personală, folie și fluier','Ușor accesibile, cu produsele în termen.'],
          ['waste','Pungă pentru deșeuri','Lasă locul curat și respectă traseele permise.']
        ]}
      ]
    },
    emergency: {
      title: 'Rucsac de urgență · 72 h',
      note: 'Listă de organizare pentru gospodărie. Adaptează cantitățile la numărul de persoane, nevoile lor și recomandările autorităților; verifică periodic conținutul.',
      groups: [
        {title:'Nevoi de bază', items:[
          ['water','Apă potabilă','Planifică rezervele gospodăriei și ce poate transporta fiecare.'],
          ['food','Alimente neperisabile','Include un desfăcător manual dacă ambalajele îl necesită.'],
          ['clothes','Haine de schimb și protecție termică','Adaptează-le sezonului și fiecărui membru al familiei.'],
          ['hygiene','Articole de igienă','Produse personale și saci pentru deșeuri.']
        ]},
        {title:'Informare & documente', items:[
          ['light','Lanternă și baterii de rezervă','Verifică periodic bateriile și funcționarea.'],
          ['radio','Radio portabil și sursă de alimentare','Pentru informații când accesul la internet lipsește.'],
          ['power','Baterie externă și cabluri','Compatibile cu dispozitivele familiei.'],
          ['documents','Copii ale documentelor esențiale','Protejate de umezeală și păstrate în siguranță.'],
          ['contacts','Contacte și plan de reunire pe hârtie','Include un punct de întâlnire stabilit cu familia.'],
          ['cash','O rezervă de numerar','Adaptată posibilităților și nevoilor gospodăriei.']
        ]},
        {title:'Nevoi personale', items:[
          ['firstaid','Trusă de prim ajutor','Verifică produsele și datele de expirare.'],
          ['medicine','Medicație prescrisă și informații utile','Planifică necesarul cu medicul sau farmacistul.'],
          ['dependents','Produse pentru copii și persoane dependente','Include nevoi de alimentație, mobilitate și îngrijire.'],
          ['pets','Resurse pentru animalele de companie','Hrană, apă și mijloace de transport adecvate, dacă este cazul.']
        ]}
      ]
    }
  },
  guides: [
    {id:'planning', category:'ÎNAINTE DE PLECARE', title:'Un plan bun începe acasă.', summary:'Traseu, vreme, contacte și puncte de revenire.', intro:'Pregătirea începe înainte să închizi rucsacul. Folosește aceste repere pentru discuția cu grupul și cu organizatorii.', steps:[['Clarifică traseul','Verifică lungimea, dificultatea, durata și punctele de acces. Alege un traseu potrivit celui mai puțin experimentat membru.'],['Verifică vremea','Consultă prognoza și starea traseului. Modifică sau amână planul când condițiile o cer.'],['Comunică planul','Lasă unei persoane apropiate traseul și ora estimată de revenire. Stabilește cum anunți schimbările.'],['Fă verificarea de plecare','Controlează lumina, telefonul, apa și îmbrăcămintea. La un eveniment, urmează briefingul și traseul stabilit de organizatori.']], source:'https://www.salvamontromania.ro/recomandari-turist-montan.php',sourceLabel:'Recomandările Salvamont România'},
    {id:'team', category:'LUCRU ÎN ECHIPĂ', title:'Mai mulți oameni. Un plan comun.', summary:'Roluri, ritm și comunicare în grup.', intro:'Stabiliți dinainte cum luați deciziile. O echipă pregătită știe atât cine conduce, cât și cum sunt ascultați ceilalți.', steps:[['Împărțiți rolurile','Clarificați coordonarea, orientarea, comunicarea și cine verifică prezența grupului.'],['Stabiliți punctele de regrupare','La schimbările de direcție și la pauze, verificați că toată lumea este prezentă.'],['Faceți loc pentru semnalarea problemelor','Spuneți din timp când cineva are nevoie de pauză, apă sau schimbarea planului.'],['Reevaluați împreună','Dacă ritmul sau condițiile se schimbă, opriți-vă pentru o decizie comună. La activitățile ARI, urmați indicațiile instructorilor.']]},
    {id:'bleeding', category:'PRIM AJUTOR', title:'Sângerare gravă: primii pași.', summary:'Siguranță, apel de urgență și ajutor până la sosirea echipajului.', intro:'O sângerare continuă, abundentă sau în jet necesită ajutor medical urgent. În România, sună la 112 sau cere unei persoane să sune.', steps:[['Verifică siguranța locului','Protejează-te și folosește mănuși, dacă sunt disponibile.'],['Aplică presiune directă','Apasă ferm pe rană cu un pansament sau material curat.'],['Folosește instruirea pe care o ai','Pentru o hemoragie amenințătoare de viață la un membru, un garou comercial poate fi folosit dacă ești instruit. Urmează instrucțiunile dispecerului.'],['Rămâi alături de persoană','Urmărește respirația și starea ei până sosește ajutorul. Protejeaz-o de frig.']], note:'Acest rezumat nu înlocuiește un curs practic. Tehnica aplicării garoului se învață și se exersează cu un instructor.', source:'https://www.redcross.org/take-a-class/resources/learn-first-aid/bleeding-life-threatening-external',sourceLabel:'Ghidul American Red Cross'},
    {id:'range', category:'SIGURANȚĂ ÎN POLIGON', title:'Patru reguli care se respectă mereu.', summary:'Repere de siguranță pentru activități supravegheate.', intro:'La poligon, instructajul personalului autorizat este obligatoriu. Aceste repere te ajută să înțelegi disciplina de siguranță.', steps:[['Tratează orice armă ca fiind încărcată','Nu presupune că este sigură doar pentru că altcineva spune că a verificat-o.'],['Păstrează o direcție sigură','Nu îndrepta arma spre persoane sau spre ceva ce nu trebuie lovit.'],['Ține degetul în afara trăgaciului','Până când ești pregătit să tragi și instructorul permite acest lucru.'],['Cunoaște ținta și ce se află dincolo de ea','Respectă limitele și direcția de tragere stabilite în poligon.']],note:'Manipularea și verificarea se fac exclusiv conform instructajului și regulilor poligonului autorizat.'}
  ],
  gallery: [
    {id:'field',type:'photo',title:'Orientare, pas cu pas',label:'ACTIVITĂȚI ARI',src:'assets/images/ari-field.webp',alt:'Participanți ARI lucrând cu hărți în pădure',description:'Fotografie din activitățile ARI, publicată pe website-ul organizației. Ediția exactă nu este atribuită în această galerie.'},
    {id:'team',type:'photo',title:'Oamenii din spatele pregătirii',label:'ECHIPA ARI',src:'assets/images/ari-team.webp',alt:'Echipă de instruire ARI în teren',description:'Fotografie publică ARI. Experiența și colaborarea sunt parte din fiecare activitate.'},
    {id:'instructor',type:'photo',title:'Briefing înainte de practică',label:'INSTRUIRE',src:'assets/images/ari-instructor.webp',alt:'Reprezentant ARI la o activitate de pregătire',description:'Fotografie publică ARI cu un reprezentant al organizației.'},
    {id:'film',type:'video',title:'Din teren, în mișcare',label:'VIDEO DE PREZENTARE',src:null,description:'Spațiu pregătit pentru filmul de prezentare ARI. Materialul video nu a fost încă adăugat.'},
    {id:'landnav-film',type:'video',title:'LANDNAV · jurnal de teren',label:'VIDEO LANDNAV',src:null,description:'Spațiu pregătit pentru un material video LANDNAV. Nu există încă un fișier video în această versiune.'},
    {id:'future-album',type:'photo',title:'Următoarele cadre',label:'ALBUM ÎN PREGĂTIRE',src:null,description:'Spațiu pregătit pentru fotografiile următoarei ediții. Imaginile vor fi adăugate după selecție și confirmarea dreptului de publicare.'}
  ]
};
