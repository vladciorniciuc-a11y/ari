# ARI — website local

Deschide `index.html` în browser. Nu este necesară instalarea unui program sau o conexiune pentru afișarea paginii și interacțiunile locale.

## Structură

- `index.html` — landing page complet.
- `assets/css/tokens.css` — paleta și regulile de identitate.
- `assets/css/site.css` — aspect adaptabil pentru desktop și telefon.
- `assets/css/experience.css` — echipament, ghiduri, galerie, donații și afișare pentru tipărire.
- `assets/css/hero-cinematic.css` — hero pe toată lățimea, încadrare mobilă și animație de intrare; respectă preferința pentru mișcare redusă.
- `assets/js/events.js` — evenimentele și conținutul ferestrelor.
- `assets/js/site.js` — filtre, ferestre, meniu și cerere de înscriere.
- `assets/js/resources.js` — listele de echipament, ghidurile, galeria și datele bancare.
- `assets/js/experience.js` — liste bifabile, export, galerie, donații și propuneri de ateliere.
- `assets/images/` — logo și fotografii publice ARI, salvate local.
- `assets/images/ari-cinematic-hero.png` — imagine conceptuală originală, generată AI; nu reprezintă un participant sau o locație confirmată a evenimentului.
- `assets/media/` — locul pregătit pentru viitoarele fișiere video.
- `archive/original/` — copia versiunii inițiale.
- `archive/before-ux-upgrade/` — copia anterioară extinderii UX.
- `docs/EDITORIAL.md` — surse și verificări înainte de publicare.

## Înscrieri

Formularul validează datele și pregătește un mesaj. Utilizatorul verifică și trimite cererea prin WhatsApp sau aplicația de e-mail. Pagina nu salvează datele formularelor și nu confirmă automat locuri. Doar bifele de echipament se păstrează în browser, cu opțiune de resetare. WhatsApp, e-mailul și legăturile externe necesită conexiune și aplicația corespunzătoare. Pentru colectare automată într-o bază de date este necesar un serviciu separat.

## Pregătire și susținere

Listele pentru LANDNAV/noapte, ieșire de zi și rucsac de urgență pot fi bifate, descărcate în text și tipărite. Sunt orientative și nu înlocuiesc cerințele organizatorilor.

Donațiile folosesc transfer bancar, cu selectarea unei sume, copierea IBAN-ului sau descărcarea datelor. Pagina nu inițiază plăți. Taburile pentru companii și formularul 230 deschid solicitări către ARI. Datele bancare au fost confruntate cu pagina publică oficială.

Galeria include trei fotografii existente și trei spații pregătite (două video și un album foto). Filtrele și vizualizarea mărită funcționează offline. Pentru înlocuirea placeholderelor, vezi `assets/media/README.md`.

## Editare

Actualizează evenimentele în `assets/js/events.js`. Stările sunt `past` (desfășurat), `next` (urmează), `idea` (propunere). Adaugă numai informații confirmate. Datele LANDNAV din pagina principală și din mesajul formularului trebuie actualizate împreună cu evenimentul.

Număr WhatsApp: +40 753 137 728. Contact: contact@ariromania.ro. Nu a fost publicat sau trimis nimic în numele ARI.
