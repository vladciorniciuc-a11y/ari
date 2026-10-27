from pathlib import Path

root = Path(__file__).resolve().parents[1]
page = root / 'index.html'
html = page.read_text(encoding='utf-8-sig')
assert 'assets/js/experience.js' not in html, 'Upgrade already applied'
html = html.replace('<script src="assets/js/events.js"', '<link rel="stylesheet" href="assets/css/experience.css"><script src="assets/js/resources.js" defer></script><script src="assets/js/experience.js" defer></script><script src="assets/js/events.js"')
# experience.js initializes on DOMContentLoaded, after all deferred scripts have executed.
start = html.index('<nav id="navigation"')
end = html.index('</nav>', start) + len('</nav>')
html = html[:start] + '''<nav id="navigation" aria-label="Navigație principală">
  <a href="#despre">Inițiativa</a><a href="#roadmap">Roadmap</a><a href="#echipament">Echipament</a><a href="#galerie">Galerie</a><a href="#echipa">Echipa</a>
  <a class="button small" href="#sustine">Susține ARI <span aria-hidden="true">↗</span></a>
</nav>''' + html[end:]
html = html.replace('<a class="button" href="#roadmap">Explorează roadmap-ul', '<a class="button" href="#landnav">Participă la LANDNAV')
html = html.replace('<a class="text-link" href="#despre">Cunoaște ARI <span aria-hidden="true">↓</span></a>', '<a class="text-link" href="#sustine">Susține o ediție <span aria-hidden="true">↗</span></a>')
html = html.replace('Inițiativă privată non-profit · România</div>', 'Inițiativă privată non-profit · Activități gratuite</div>')

quick_routes = '''
<nav class="quick-routes wrap" aria-label="Alege ce te interesează">
  <a href="#echipament"><span>VIN LA UN EVENIMENT</span><strong>Îmi pregătesc rucsacul <b aria-hidden="true">↗</b></strong></a>
  <a href="#galerie"><span>VREAU SĂ CUNOSC ARI</span><strong>Văd oamenii și activitățile <b aria-hidden="true">↗</b></strong></a>
  <a href="#sustine"><span>VREAU SĂ AJUT</span><strong>Susțin următoarea ediție <b aria-hidden="true">↗</b></strong></a>
</nav>
'''
html = html.replace('<section class="section wrap about"', quick_routes + '<section class="section wrap about"', 1)
html = html.replace('<button class="filter active" data-filter="all" aria-pressed="true">Toate</button>', '<button class="filter active" data-filter="future" aria-pressed="true">La orizont</button><button class="filter" data-filter="all" aria-pressed="false">Toate reperele</button>')
html = html.replace('Deschide un eveniment pentru obiective, activități și organizare.', 'Începe cu ediția următoare și propunerile de ateliere sau explorează arhiva. Fiecare reper are obiective, activități și detalii de organizare.')

gear = '''
<section class="equipment-band" id="echipament">
  <div class="section wrap equipment-layout">
    <div class="equipment-intro">
      <p class="eyebrow">PREGĂTIREA TA / LISTĂ INTERACTIVĂ</p>
      <h2>Un rucsac pregătit.<br>O grijă în minus.</h2>
      <p>Alege tipul activității. Bifează ce ai pregătit și păstrează lista cu tine, pe telefon sau pe hârtie.</p>
      <div class="pack-illustration" aria-hidden="true"><svg viewBox="0 0 260 240" fill="none"><path d="M99 52V36q31-18 62 0v16M76 82q0-29 28-29h52q28 0 28 29v112q0 17-17 17H93q-17 0-17-17Z"/><path d="M76 108H59v77h17m108-77h17v77h-17M99 53v46m62-46v46M76 114h108M91 150h78v45H91zM117 70h26v20h-26z"/><path class="pack-accent" d="M106 172h48M130 160v24"/><path class="pack-guide" d="M30 211h200M40 30v190M220 30v190"/></svg><span>VĂZUT. VERIFICAT. PREGĂTIT.</span></div>
      <p class="caption">Lista ajută la organizare. Pentru LANDNAV, cerințele finale și materialele oferite se confirmă cu organizatorii.</p>
      <a class="text-link" href="https://wa.me/40753137728?text=Bun%C4%83!%20Ce%20echipament%20este%20necesar%20la%20LANDNAV%20Codlea%3F" target="_blank" rel="noopener noreferrer">Întreabă despre echipament ↗</a>
    </div>
    <div class="kit-panel">
      <div class="kit-profiles" role="group" aria-label="Tipul listei de echipament"><button type="button" class="choice active" data-kit="night" aria-pressed="true">Noapte / LANDNAV</button><button type="button" class="choice" data-kit="day" aria-pressed="false">Pădure / zi</button><button type="button" class="choice" data-kit="emergency" aria-pressed="false">Urgență / 72 h</button></div>
      <h3 id="kit-title">Orientare nocturnă · LANDNAV</h3><p class="caption" id="kit-note"></p>
      <div class="kit-progress"><span id="kit-count" role="status">0 obiecte pregătite</span><progress id="kit-progress" value="0" max="16" aria-label="Progresul listei de echipament"></progress></div>
      <div id="kit-groups"></div>
      <p id="kit-storage" class="caption">Bifele se păstrează doar în acest browser.</p>
      <div class="kit-tools"><button class="button" id="download-kit" type="button">Descarcă lista ↓</button><button class="text-link" id="print-kit" type="button">Tipărește</button><button class="text-link" id="reset-kit" type="button">Resetează</button></div>
      <p id="kit-action-status" class="caption" role="status"></p>
    </div>
  </div>
</section>
<section class="section wrap guides" id="ghiduri">
  <div class="section-head"><div><p class="eyebrow">BIBLIOTECA PRACTICĂ</p><h2>Lucruri utile.<br>Chiar înainte de primul curs.</h2></div><p>Ghiduri scurte, pe care le poți consulta și offline. Citește reperele, apoi exersează alături de instructori.</p></div>
  <div class="guide-grid" id="guide-list"></div>
  <p class="caption resource-source">Pentru pregătirea în natură: <a href="https://www.salvamontromania.ro/recomandari-turist-montan.php" target="_blank" rel="noopener noreferrer">Salvamont România</a>. Pentru pregătirea gospodăriei: <a href="https://fiipregatit.ro/" target="_blank" rel="noopener noreferrer">platforma DSU Fii pregătit</a>.</p>
</section>
'''
html = html.replace('<section class="section wrap organizers"', gear + '<section class="section wrap organizers"', 1)
html = html.replace('<button class="text-link" data-event="landnav">Detalii eveniment <span aria-hidden="true">+</span></button>', '<button class="text-link" data-event="landnav">Detalii eveniment <span aria-hidden="true">+</span></button><a class="text-link" href="#echipament">Ce pun în rucsac? ↓</a>')

gallery = '''
<section class="gallery-band" id="galerie"><div class="section wrap">
  <div class="section-head"><div><p class="eyebrow">DIN TEREN / FOTO & VIDEO</p><h2>Pregătirea are<br>chipuri și povești.</h2></div><p>Oameni care învață, explică și lucrează împreună. Explorează fotografiile ARI și spațiile pregătite pentru următoarele materiale.</p></div>
  <div class="gallery-toolbar"><div class="filters" role="group" aria-label="Filtrează galeria"><button class="filter active" data-gallery-filter="all" aria-pressed="true">Toate</button><button class="filter" data-gallery-filter="photo" aria-pressed="false">Fotografii</button><button class="filter" data-gallery-filter="video" aria-pressed="false">Video</button></div><span id="gallery-count" class="caption" role="status"></span></div>
  <div id="gallery-grid" class="gallery-grid"></div>
  <div class="gallery-caption"><p class="caption">Fotografii din arhiva publică ARI. Spațiile „În pregătire” vor fi completate cu materiale reale.</p><a class="text-link" href="https://www.facebook.com/profile.php?id=61577849437974" target="_blank" rel="noopener noreferrer">Urmărește activitățile pe Facebook ↗</a></div>
</div></section>
'''
html = html.replace('<section class="registration-band"', gallery + '<section class="registration-band"', 1)

donation = '''
<section class="donation-band" id="sustine"><div class="section wrap donation-layout">
  <div class="donation-story">
    <p class="eyebrow">PREGĂTIREA CONTINUĂ CU TINE</p>
    <h2>Gratuit pentru participanți.<br><span>Posibil prin oameni ca tine.</span></h2>
    <p class="intro">Un exercițiu începe cu o hartă, un instructor și oameni care aleg să se implice.</p>
    <p>ARI organizează activități gratuite. Materialele, echipamentele, transportul și organizarea au însă costuri. Contribuția ta ajută echipa să pregătească următoarele ediții și să ducă educația practică în comunități.</p>
    <figure class="donation-photo"><img src="assets/images/ari-donations.webp" alt="Materiale ARI pentru orientare și pregătire practică" loading="lazy" width="1024" height="768"><figcaption>Resurse concrete pentru învățare practică.</figcaption></figure>
    <div class="funding-uses"><h3>Ce poate susține contribuția ta</h3><dl><div><dt>Materiale & echipamente</dt><dd>Hărți, materiale educaționale și resurse pentru exerciții.</dd></div><div><dt>Logistică & organizare</dt><dd>Transport și pregătirea spațiilor în care se desfășoară activitățile.</dd></div><div><dt>Programe accesibile</dt><dd>Dezvoltarea unor noi activități gratuite pentru comunități.</dd></div></dl></div>
    <p class="caption">Acestea sunt direcții de utilizare, nu echivalențe fixe între o sumă și un rezultat. Pentru o contribuție dedicată unui proiect, discută cu ARI.</p>
    <a class="text-link" href="https://ariromania.ro/donatii/index.html" target="_blank" rel="noopener noreferrer">Datele oficiale de susținere ARI ↗</a>
  </div>
  <div class="donation-panel">
    <p class="eyebrow">ALEGE CUM TE IMPLICI</p>
    <div class="donation-tabs" role="tablist" aria-label="Modalitate de susținere"><button id="tab-transfer" role="tab" aria-selected="true" aria-controls="panel-transfer" tabindex="0" data-donation-tab="transfer">Donează</button><button id="tab-company" role="tab" aria-selected="false" aria-controls="panel-company" tabindex="-1" data-donation-tab="company">Companii</button><button id="tab-tax" role="tab" aria-selected="false" aria-controls="panel-tax" tabindex="-1" data-donation-tab="tax">Formular 230</button></div>
    <div id="panel-transfer" role="tabpanel" aria-labelledby="tab-transfer" tabindex="0">
      <h3>O contribuție pentru următoarea ediție.</h3><p class="caption">Alege suma și copiază datele pentru transfer. Donația se finalizează în aplicația băncii tale.</p>
      <div class="amount-options" role="group" aria-label="Alege suma donației"><button class="choice" data-amount="50" aria-pressed="false">50 lei</button><button class="choice active" data-amount="100" aria-pressed="true">100 lei</button><button class="choice" data-amount="250" aria-pressed="false">250 lei</button><button class="choice" data-amount="custom" aria-pressed="false">Altă sumă</button></div>
      <label id="custom-amount-label" hidden>Suma în lei<input id="custom-amount" type="number" min="1" max="1000000" step="1" inputmode="numeric" placeholder="De exemplu, 150"></label>
      <p id="amount-error" class="form-error" role="alert" hidden>Introdu o sumă între 1 și 1.000.000 lei, fără zecimale.</p>
      <div class="donation-total"><span>Contribuția aleasă</span><output id="donation-total" aria-live="polite">100 lei</output></div>
      <dl class="bank-details"><div><dt>Beneficiar</dt><dd>Asociația Active Resilience Initiative</dd></div><div><dt>IBAN · RON</dt><dd id="bank-iban">RO89 BREL 0002 0053 7140 0100</dd></div><div><dt>Banca / SWIFT</dt><dd>Libra Internet Bank / BRELROBU</dd></div><div><dt>Detalii plată</dt><dd>Donație pentru programele ARI</dd></div></dl>
      <div class="donation-actions"><button type="button" class="button" id="copy-bank-iban">Copiază IBAN</button><button type="button" class="button secondary" id="copy-bank-all">Copiază toate datele</button></div><button type="button" class="text-link" id="download-bank">Descarcă datele de transfer ↓</button><p id="bank-status" class="caption" role="status"></p><textarea id="bank-copy-fallback" readonly aria-label="Date de transfer pentru copiere manuală" hidden></textarea>
      <ol class="transfer-steps"><li>Copiază datele în aplicația băncii.</li><li>Introdu suma și verifică beneficiarul.</li><li>Confirmă transferul în aplicația ta.</li></ol>
      <details class="donation-question"><summary>Vreau să susțin constant</summary><p>Poți configura un transfer recurent în aplicația băncii tale, folosind aceste date. Tu alegi suma și frecvența și le gestionezi direct la bancă.</p></details>
    </div>
    <div id="panel-company" role="tabpanel" aria-labelledby="tab-company" tabindex="0" hidden><h3>Resursele companiei tale pot deveni pregătire pentru comunitate.</h3><p>Poți contribui cu fonduri, materiale, transport, spații sau servicii. Stabiliți împreună cu ARI proiectul, necesarul și forma de colaborare.</p><ul class="partner-steps"><li>Spune-ne ce tip de sprijin poți oferi.</li><li>Discutăm nevoile și proiectul potrivit.</li><li>Solicită documentele și condițiile colaborării.</li></ul><a class="button" href="mailto:contact@ariromania.ro?subject=Sponsorizare%20ARI&body=Bun%C4%83%20ziua%2C%0A%0ACompania%3A%20%0APersoana%20de%20contact%3A%20%0ATipul%20sprijinului%3A%20%0AProiectul%20vizat%3A%20%0A%0AV%C4%83%20rog%20s%C4%83%20ne%20transmite%C8%9Bi%20necesarul%20%C8%99i%20documentele%20pentru%20colaborare.">Discută o sponsorizare ↗</a><p class="caption">Pentru condițiile fiscale aplicabile companiei tale, consultă persoana care se ocupă de contabilitate.</p></div>
    <div id="panel-tax" role="tabpanel" aria-labelledby="tab-tax" tabindex="0" hidden><p class="tax-number" aria-hidden="true">230</p><h3>Solicită formularul și detaliile campaniei curente.</h3><p>Dacă dorești să susții ARI prin redirecționarea a până la 3,5% din impozitul pe venit, cere echipei formularul completat cu datele asociației și informațiile aplicabile situației tale.</p><a class="button" href="mailto:contact@ariromania.ro?subject=Formular%20230%20ARI&body=Bun%C4%83%20ziua%2C%0A%0ADoresc%20s%C4%83%20sus%C8%9Bin%20ARI.%20V%C4%83%20rog%20s%C4%83%20%C3%AEmi%20trimite%C8%9Bi%20formularul%20230%20%C8%99i%20detaliile%20campaniei%20curente%3A%20eligibilitate%2C%20termen%20%C8%99i%20modalitate%20de%20depunere.%0A%0AMul%C8%9Bumesc!">Cere formularul ARI ↗</a><p class="caption">Eligibilitatea, termenul și modalitatea de depunere trebuie confirmate pentru anul fiscal relevant.</p></div>
  </div>
</div></section>
<section class="section wrap community" id="implicare"><div><p class="eyebrow">AI ȘI ALTE MODURI DE A AJUTA</p><h2>Timp. Experiență.<br>Idei pentru comunitate.</h2><p>Poți contribui la logistică, comunicare sau pregătirea activităților. Spune-ne ce experiență ai și unde ai vrea să te implici.</p><a class="button secondary" href="mailto:contact@ariromania.ro?subject=Voluntariat%20ARI">Vreau să fiu voluntar ↗</a></div><form id="topic-form"><h3>Ce ai vrea să înveți la următorul atelier?</h3><p>Alege subiectele utile pentru tine. Vom pregăti propunerea pentru a o trimite echipei ARI.</p><fieldset class="topic-options"><legend class="sr-only">Subiectele propuse</legend><label><input type="checkbox" name="topic" value="Prim ajutor pediatric">Prim ajutor pediatric</label><label><input type="checkbox" name="topic" value="Pregătire pentru cutremur">Pregătire pentru cutremur</label><label><input type="checkbox" name="topic" value="Comunicații de urgență">Comunicații de urgență</label><label><input type="checkbox" name="topic" value="Orientare și autonomie">Orientare și autonomie</label><label><input type="checkbox" name="topic" value="Siguranță digitală">Siguranță digitală</label></fieldset><label>Altă idee <span class="optional">(opțional)</span><input name="idea" maxlength="300"></label><label>Localitatea în care ai participa<input name="city" maxlength="100" required></label><p id="topic-error" role="alert" class="form-error" hidden>Alege cel puțin un subiect sau scrie o idee.</p><button class="button" type="submit">Pregătește propunerea ↗</button><div id="topic-preview" hidden><p>Propunerea este pregătită. Trimite mesajul prin canalul preferat.</p><pre id="topic-message"></pre><div class="actions"><a class="text-link" id="topic-whatsapp" target="_blank" rel="noopener noreferrer">WhatsApp ↗</a><a class="text-link" id="topic-email">E-mail ↗</a></div></div></form></section>
<section class="section wrap faq" id="intrebari"><div><p class="eyebrow">BINE DE ȘTIUT</p><h2>Înainte să alegi<br>următorul pas.</h2></div><div>
<details><summary>Pot participa dacă sunt începător?</summary><p>Experiența necesară diferă de la un eveniment la altul. Menționează nivelul tău în cererea de înscriere; organizatorii confirmă dacă ediția este potrivită și ce pregătire cere.</p></details>
<details><summary>Ce echipament trebuie să aduc?</summary><p>Pornește de la lista interactivă și confirmă cu ARI cerințele ediției și materialele oferite. Pentru LANDNAV, ora de plecare, durata, vremea și traseul influențează echipamentul.</p><a href="#echipament" class="text-link">Deschide lista de echipament ↓</a></details>
<details><summary>Înscrierea este confirmată imediat?</summary><p>Nu. Formularul pregătește o cerere pe care o trimiți prin WhatsApp sau e-mail. Echipa ARI confirmă disponibilitatea și condițiile participării.</p></details>
<details><summary>Trebuie să donez ca să particip?</summary><p>Nu. Activitățile ARI sunt gratuite, iar donațiile sunt voluntare. O donație nu rezervă un loc și nu înlocuiește confirmarea organizatorilor.</p></details>
<details><summary>Pot oferi echipamente sau servicii?</summary><p>Da, poți discuta cu ARI despre materiale, transport, spații sau servicii. Contactează echipa înainte, pentru a verifica necesarul și condițiile colaborării.</p></details>
<details><summary>Unde ajung banii și cum aflu mai multe?</summary><p>Transferul se face în contul Asociației Active Resilience Initiative. Pagina oficială menționează materiale educaționale, echipamente, transport, logistică și organizare. Pentru documente sau utilizarea într-un proiect anume, contactează echipa.</p><a href="mailto:contact@ariromania.ro?subject=Informa%C8%9Bii%20despre%20sus%C8%9Binerea%20ARI" class="text-link">Cere detalii despre susținere ↗</a></details>
</div></section>
'''
start = html.index('<section class="section wrap support"')
end = html.index('<section class="contact wrap"', start)
html = html[:start] + donation + html[end:]
mobile = '''<nav class="mobile-actions" aria-label="Acțiuni rapide"><a class="button secondary" href="#inscriere">Participă la LANDNAV</a><a class="button" href="#sustine">Susține ARI ↗</a></nav>'''
html = html.replace('</body>', mobile + '</body>')
html = html.replace('Datele nu sunt salvate de această pagină. Le transmiți către ARI numai când trimiți mesajul în WhatsApp sau în aplicația de e-mail.', 'Datele formularului nu sunt salvate. Deschiderea WhatsApp transmite mesajul pregătit către acest serviciu; ARI îl primește după ce îl trimiți.')
# Improve source readability without changing structure or deleting existing sections.
page.write_text(html.replace('><', '>\n<'), encoding='utf-8')

js_file = root / 'assets/js/site.js'
js = js_file.read_text(encoding='utf-8-sig')
js = js.replace("filter === 'all' || event.status === filter", "filter === 'all' || (filter === 'future' ? event.status !== 'past' : event.status === filter)")
js = js.replace('function openDialog(html, source) {\n    opener = source;', "function openDialog(html, source, variant = '') {\n    if (!dialog.open) opener = source;\n    dialog.dataset.variant = variant;")
js = js.replace('    dialog.showModal();', '    if (!dialog.open) dialog.showModal();')
js = js.replace('document.body.classList.remove(\'modal-open\'); opener?.focus({preventScroll:true});', "document.body.classList.remove('modal-open'); dialog.querySelectorAll('video').forEach(video => video.pause()); opener?.focus({preventScroll:true});")
js = js.replace("'<a class=\"button\" href=\"#inscriere\" data-close-dialog>Solicită înscrierea ↗</a>'", "'<a class=\"button\" href=\"#inscriere\" data-close-dialog>Solicită înscrierea ↗</a><a class=\"text-link\" href=\"#echipament\" data-close-dialog>Lista de echipament ↓</a>'")
js = js.replace('nu folosește servicii de analiză, cookie-uri sau baze de date și nu salvează conținutul formularului.', 'nu folosește servicii de analiză sau cookie-uri și nu salvează conținutul formularelor. Doar bifele listei de echipament sunt păstrate local în browser; le poți șterge cu butonul Resetează.')
js = js.replace('  render();\n})();', "  window.ARI_UI = {openDialog, closeDialog: () => dialog.close(), escape};\n  render('future');\n})();")
js_file.write_text(js, encoding='utf-8')
print('Landing page extended; original sections retained, support section expanded.')
