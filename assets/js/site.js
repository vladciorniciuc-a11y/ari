'use strict';
(() => {
  const $ = selector => document.querySelector(selector);
  const escape = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const status = {past:'DESFĂȘURAT',next:'URMEAZĂ · GRATUIT',idea:'PROPUNERE'};
  const list = $('#event-list');
  const dialog = $('#event-dialog');
  let opener;
  function render(filter = 'all') {
    list.innerHTML = window.ARI_EVENTS.filter(event => filter === 'all' || (filter === 'future' ? event.status !== 'past' : event.status === filter)).map(event => `<button class="event-row ${event.status}" data-event="${event.id}" aria-haspopup="dialog"><span class="event-date">${escape(event.date)}<br>${escape(event.place)}</span><span class="event-description"><span class="event-title">${escape(event.title)}</span><span class="event-summary">${escape(event.summary)}</span></span><span class="event-status">${status[event.status]}</span><span class="event-open" aria-hidden="true">↗</span></button>`).join('');
  }
  function openDialog(html, source, variant = '') {
    if (!dialog.open) opener = source;
    dialog.dataset.variant = variant;
    $('#dialog-content').innerHTML = html;
    if (!dialog.open) dialog.showModal();
    dialog.scrollTop = 0;
    document.body.classList.add('modal-open');
  }
  function showEvent(id, source) {
    const event = window.ARI_EVENTS.find(item => item.id === id);
    if (!event) return;
    openDialog(`<p class="dialog-meta">${status[event.status]} · ${escape(event.date)} · ${escape(event.place)}</p><h2 id="dialog-title">${escape(event.title)}</h2><p>${escape(event.description)}</p><h3>${event.status === 'past' ? 'Activități și obiective' : 'Ce exersezi'}</h3><ul>${event.activities.map(item => `<li>${escape(item)}</li>`).join('')}</ul><h3>Cine organizează</h3><p>${escape(event.organizer)}</p>${event.audience ? `<h3>Cui se adresează</h3><p>${escape(event.audience)}</p>` : ''}${event.note ? `<p class="dialog-note">${escape(event.note)}</p>` : ''}${event.status === 'idea' ? '<p class="dialog-note">Concept de eveniment. Nu există încă o dată, o locație sau înscrieri deschise.</p>' : ''}<div class="actions">${event.status === 'next' ? '<a class="button" href="#inscriere" data-close-dialog>Solicită înscrierea ↗</a><a class="text-link" href="#echipament" data-close-dialog>Lista de echipament ↓</a>' : ''}${event.source ? `<a class="text-link" target="_blank" rel="noopener noreferrer" href="${escape(event.source)}">Vezi proiectul pe site-ul ARI ↗</a>` : ''}<a class="text-link" target="_blank" rel="noopener noreferrer" href="https://wa.me/40753137728?text=${encodeURIComponent('Bună! Aș dori detalii despre ' + event.title + '.')}">${event.status === 'idea' ? 'Mă interesează acest atelier' : 'Întreabă organizatorii'} ↗</a></div>`, source);
  }
  const information = {
    privacy:'<h2 id="dialog-title">Despre datele tale</h2><p>Această variantă nu folosește cookie-uri de urmărire și nu stochează date personale pe server. Bifele din lista de echipament sunt salvate doar local în browserul tău.</p><p>Formularul compune un mesaj cu numele, localitatea, numărul de WhatsApp, experiența și întrebările completate de tine. La apăsarea butonului, mesajul se deschide direct în aplicația WhatsApp pe telefonul sau computerul tău, de unde îl trimiți către numărul oficial ARI (+40 753 137 728). Nu folosim e-mail.</p><p>Pentru orice întrebare despre confidențialitate sau activitatea asociației, contactează instructorii direct pe WhatsApp la +40 753 137 728.</p><p class="dialog-note">Toată comunicarea operativă ARI se desfășoară exclusiv prin WhatsApp.</p>',
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
  dialog.addEventListener('close', () => { document.body.classList.remove('modal-open'); dialog.querySelectorAll('video').forEach(video => video.pause()); opener?.focus({preventScroll:true}); });
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
    for (const name of ['name', 'city', 'phone']) {
      form.elements[name].setCustomValidity(value(name) ? '' : 'Completează acest câmp.');
    }
    if (!form.reportValidity()) return;
    const message = `Bună! Doresc să solicit înscrierea la LANDNAV 02-26, Codlea, 8–9 noiembrie.\n\nNume: ${value('name')}\nLocalitate: ${value('city')}\nNumăr WhatsApp: ${value('phone')}\nExperiență orientare: ${value('experience')}${value('message') ? '\nÎntrebări / Mențiuni: ' + value('message') : ''}\n\nConfirm că am citit condițiile și solicit confirmarea locului pe WhatsApp.`;
    $('#request-text').textContent = message;
    $('#send-whatsapp').href = 'https://wa.me/40753137728?text=' + encodeURIComponent(message);
    $('#copy-status').textContent = '';
    $('#request-preview').hidden = false;
    $('#request-preview').scrollIntoView({block:'nearest',behavior:matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant':'smooth'});
  });
  form.addEventListener('input', () => {$('#request-preview').hidden = true;form.elements.name.setCustomValidity('');form.elements.city.setCustomValidity('');form.elements.phone.setCustomValidity('');});
  $('#copy-request').addEventListener('click', async () => {
    try {await navigator.clipboard.writeText($('#request-text').textContent);$('#copy-status').textContent = 'Mesaj copiat. Îl poți trimite prin canalul preferat.';}
    catch {const range = document.createRange();range.selectNodeContents($('#request-text'));const selection = window.getSelection();selection.removeAllRanges();selection.addRange(range);$('#copy-status').textContent = 'Mesaj selectat. Folosește opțiunea Copiază a browserului.';}
  });
  $('#year').textContent = new Date().getFullYear();
  window.ARI_UI = {openDialog, closeDialog: () => dialog.close(), escape};
  render('future');
})();
