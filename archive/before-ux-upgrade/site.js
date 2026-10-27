'use strict';
(() => {
  const $ = selector => document.querySelector(selector);
  const escape = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const status = {past:'DESFĂȘURAT',next:'URMEAZĂ · GRATUIT',idea:'PROPUNERE'};
  const list = $('#event-list');
  const dialog = $('#event-dialog');
  let opener;
  function render(filter = 'all') {
    list.innerHTML = window.ARI_EVENTS.filter(event => filter === 'all' || event.status === filter).map(event => `<button class="event-row ${event.status}" data-event="${event.id}" aria-haspopup="dialog"><span class="event-date">${escape(event.date)}<br>${escape(event.place)}</span><span class="event-description"><span class="event-title">${escape(event.title)}</span><span class="event-summary">${escape(event.summary)}</span></span><span class="event-status">${status[event.status]}</span><span class="event-open" aria-hidden="true">↗</span></button>`).join('');
  }
  function openDialog(html, source) {
    opener = source;
    $('#dialog-content').innerHTML = html;
    dialog.showModal();
    dialog.scrollTop = 0;
    document.body.classList.add('modal-open');
  }
  function showEvent(id, source) {
    const event = window.ARI_EVENTS.find(item => item.id === id);
    if (!event) return;
    openDialog(`<p class="dialog-meta">${status[event.status]} · ${escape(event.date)} · ${escape(event.place)}</p><h2 id="dialog-title">${escape(event.title)}</h2><p>${escape(event.description)}</p><h3>${event.status === 'past' ? 'Activități și obiective' : 'Ce exersezi'}</h3><ul>${event.activities.map(item => `<li>${escape(item)}</li>`).join('')}</ul><h3>Cine organizează</h3><p>${escape(event.organizer)}</p>${event.audience ? `<h3>Cui se adresează</h3><p>${escape(event.audience)}</p>` : ''}${event.note ? `<p class="dialog-note">${escape(event.note)}</p>` : ''}${event.status === 'idea' ? '<p class="dialog-note">Concept de eveniment. Nu există încă o dată, o locație sau înscrieri deschise.</p>' : ''}<div class="actions">${event.status === 'next' ? '<a class="button" href="#inscriere" data-close-dialog>Solicită înscrierea ↗</a>' : ''}${event.source ? `<a class="text-link" target="_blank" rel="noopener noreferrer" href="${escape(event.source)}">Vezi proiectul pe site-ul ARI ↗</a>` : ''}<a class="text-link" target="_blank" rel="noopener noreferrer" href="https://wa.me/40753137728?text=${encodeURIComponent('Bună! Aș dori detalii despre ' + event.title + '.')}">${event.status === 'idea' ? 'Mă interesează acest atelier' : 'Întreabă organizatorii'} ↗</a></div>`, source);
  }
  const information = {
    privacy:'<h2 id="dialog-title">Despre datele tale</h2><p>Această variantă locală nu folosește servicii de analiză, cookie-uri sau baze de date și nu salvează conținutul formularului.</p><p>Formularul compune un mesaj cu numele, localitatea, e-mailul, telefonul, experiența și întrebările completate de tine. După ce verifici mesajul, poți deschide WhatsApp sau aplicația de e-mail pentru a-l trimite către ARI.</p><p>Deschiderea WhatsApp transferă mesajul pregătit către serviciul WhatsApp. Dacă preferi, poți copia mesajul și folosi canalul ales de tine. ARI primește solicitarea când o trimiți.</p><p>Pentru întrebări despre prelucrarea datelor: <a href="mailto:contact@ariromania.ro">contact@ariromania.ro</a>.</p><p class="dialog-note">Informare pentru versiunea locală. Politica completă și condițiile de participare trebuie revizuite de organizatori înainte de publicare.</p>',
    terms:'<h2 id="dialog-title">Participarea la evenimente</h2><p>Trimiterea unei cereri nu reprezintă rezervarea unui loc. Organizatorii confirmă disponibilitatea, criteriile de participare, programul și echipamentul necesar.</p><p>Evenimentele marcate „Propunere” sunt concepte de program și nu au înscrieri deschise.</p><p>Pentru LANDNAV Codlea, participarea este gratuită. Informațiile operaționale complete și condițiile ediției se solicită echipei ARI înainte de participare.</p>'
  };
  document.addEventListener('click', event => {
    const eventButton = event.target.closest('[data-event]');
    if (eventButton) showEvent(eventButton.dataset.event, eventButton);
    const infoButton = event.target.closest('[data-info]');
    if (infoButton) openDialog(information[infoButton.dataset.info], infoButton);
    if (event.target.closest('[data-close-dialog]')) dialog.close();
  });
  $('#close-dialog').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const box = dialog.getBoundingClientRect();
    if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) dialog.close();
  });
  dialog.addEventListener('close', () => { document.body.classList.remove('modal-open'); opener?.focus({preventScroll:true}); });
  document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => {
    document.querySelectorAll('[data-filter]').forEach(item => {item.classList.toggle('active', item === button);item.setAttribute('aria-pressed', String(item === button));});
    render(button.dataset.filter);
  }));
  const toggle = $('.menu-toggle');
  const nav = $('#navigation');
  function closeMenu() {nav.classList.remove('open');toggle.setAttribute('aria-expanded','false');}
  toggle.addEventListener('click', () => {const open = nav.classList.toggle('open');toggle.setAttribute('aria-expanded', String(open));});
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => {if (event.key === 'Escape' && nav.classList.contains('open')) {closeMenu();toggle.focus();}});
  const form = $('#registration-form');
  form.addEventListener('submit', event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const value = name => String(data.get(name) || '').trim();
    if (!value('name') || !value('city')) { alert('Completează numele și localitatea.'); return; }
    const message = `Bună! Doresc să solicit înscrierea la LANDNAV 02-26, Codlea, 8–9 noiembrie.\n\nNume: ${value('name')}\nLocalitate: ${value('city')}\nE-mail: ${value('email')}\nTelefon: ${value('phone')}\nExperiență: ${value('experience')}${value('message') ? '\nÎntrebări: ' + value('message') : ''}\n\nVă rog să confirmați disponibilitatea și condițiile de participare.`;
    $('#request-text').textContent = message;
    $('#send-whatsapp').href = 'https://wa.me/40753137728?text=' + encodeURIComponent(message);
    $('#send-email').href = 'mailto:contact@ariromania.ro?subject=' + encodeURIComponent('Cerere înscriere LANDNAV Codlea') + '&body=' + encodeURIComponent(message);
    $('#copy-status').textContent = '';
    $('#request-preview').hidden = false;
    $('#request-preview').scrollIntoView({block:'nearest',behavior:matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant':'smooth'});
  });
  form.addEventListener('input', () => {$('#request-preview').hidden = true;});
  $('#copy-request').addEventListener('click', async () => {
    try {await navigator.clipboard.writeText($('#request-text').textContent);$('#copy-status').textContent = 'Mesaj copiat. Îl poți trimite prin canalul preferat.';}
    catch {const range = document.createRange();range.selectNodeContents($('#request-text'));const selection = window.getSelection();selection.removeAllRanges();selection.addRange(range);$('#copy-status').textContent = 'Mesaj selectat. Folosește opțiunea Copiază a browserului.';}
  });
  $('#year').textContent = new Date().getFullYear();
  render();
})();
