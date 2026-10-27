'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const $ = selector => document.querySelector(selector);
  const content = window.ARI_RESOURCES;
  const {openDialog, escape} = window.ARI_UI;
  const dialog = $('#event-dialog');
  // Display and copy the same bank record to avoid divergent payment details.
  $('#bank-iban').textContent = content.bank.iban.match(/.{1,4}/g).join(' ');
  $('#bank-beneficiary').textContent = content.bank.beneficiary;
  $('#bank-institution').textContent = content.bank.bank + ' / ' + content.bank.swift;
  const storageKey = 'ari-equipment-v1';
  let profile = 'night';
  let saved = {};
  let canSave = true;
  let undoReset = null;

  try {
    const value = JSON.parse(localStorage.getItem(storageKey) || '{}');
    if (value && typeof value === 'object' && !Array.isArray(value)) saved = value;
  } catch { canSave = false; }

  function currentItems() { return content.profiles[profile].groups.flatMap(group => group.items); }
  function checkedIds() {
    const valid = new Set(currentItems().map(item => item[0]));
    return new Set((Array.isArray(saved[profile]) ? saved[profile] : []).filter(id => valid.has(id)));
  }
  function saveKit(ids) {
    saved[profile] = [...ids];
    try { localStorage.setItem(storageKey, JSON.stringify(saved)); }
    catch { canSave = false; }
    $('#kit-storage').textContent = canSave ? 'Bifele se păstrează doar în acest browser.' : 'Bifele sunt disponibile în această sesiune. Descarcă lista pentru a le păstra.';
  }
  function updateKitProgress() {
    const checked = checkedIds();
    const total = currentItems().length;
    $('#kit-progress').max = total;
    $('#kit-progress').value = checked.size;
    $('#kit-count').textContent = `${checked.size} / ${total} elemente pregătite`;
    document.querySelectorAll('[data-group-count]').forEach(element => {
      const group = content.profiles[profile].groups[Number(element.dataset.groupCount)];
      element.textContent = `${group.items.filter(item => checked.has(item[0])).length}/${group.items.length}`;
    });
  }
  function renderKit() {
    const kit = content.profiles[profile];
    const checked = checkedIds();
    $('#kit-title').textContent = kit.title;
    $('#kit-note').textContent = kit.note;
    $('#kit-groups').innerHTML = kit.groups.map((group, index) => `<details class="kit-group"${index === 0 ? ' open' : ''}><summary><span>${escape(group.title)}</span><span class="group-count" data-group-count="${index}"></span></summary><div class="kit-items">${group.items.map(([id, title, description]) => `<label class="kit-item"><input type="checkbox" data-kit-item="${escape(id)}"${checked.has(id) ? ' checked' : ''}><span><strong>${escape(title)}</strong><small>${escape(description)}</small></span></label>`).join('')}</div></details>`).join('');
    document.querySelectorAll('[data-kit]').forEach(button => {
      const active = button.dataset.kit === profile;
      button.classList.toggle('active', active);
      button.setAttribute('aria-pressed', String(active));
    });
    $('#kit-storage').textContent = canSave ? 'Bifele se păstrează doar în acest browser.' : 'Bifele sunt disponibile în această sesiune. Descarcă lista pentru a le păstra.';
    updateKitProgress();
  }
  function setKit(next) {
    if (!content.profiles[next]) return;
    profile = next;
    undoReset = null;
    $('#undo-kit-reset').hidden = true;
    $('#kit-action-status').textContent = '';
    renderKit();
  }
  const undoButton = document.createElement('button');
  undoButton.type = 'button';
  undoButton.id = 'undo-kit-reset';
  undoButton.className = 'text-link';
  undoButton.textContent = 'Anulează resetarea';
  undoButton.hidden = true;
  $('.kit-tools').append(undoButton);
  $('#kit-groups').addEventListener('change', event => {
    if (!event.target.matches('[data-kit-item]')) return;
    const checked = checkedIds();
    if (event.target.checked) checked.add(event.target.dataset.kitItem);
    else checked.delete(event.target.dataset.kitItem);
    saveKit(checked);
    updateKitProgress();
  });
  document.querySelectorAll('[data-kit]').forEach(button => button.addEventListener('click', () => setKit(button.dataset.kit)));
  $('#reset-kit').addEventListener('click', () => {
    undoReset = checkedIds();
    saveKit(new Set());
    renderKit();
    undoButton.hidden = undoReset.size === 0;
    $('#kit-action-status').textContent = 'Lista curentă a fost resetată.';
  });
  undoButton.addEventListener('click', () => {
    if (undoReset) saveKit(undoReset);
    undoReset = null;
    renderKit();
    undoButton.hidden = true;
    $('#kit-action-status').textContent = 'Bifele au fost restaurate.';
  });
  function downloadText(text, name) {
    const url = URL.createObjectURL(new Blob(['\uFEFF' + text], {type:'text/plain;charset=utf-8'}));
    const link = document.createElement('a');
    link.href = url; link.download = name; document.body.append(link); link.click(); link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  $('#download-kit').addEventListener('click', () => {
    const kit = content.profiles[profile];
    const checked = checkedIds();
    const text = ['ARI — ' + kit.title, kit.note, '', ...kit.groups.flatMap(group => [group.title.toUpperCase(), ...group.items.map(([id, title, description]) => `${checked.has(id) ? '[x]' : '[ ]'} ${title}\n    ${description}`), '']), 'Contact ARI: contact@ariromania.ro · +40 753 137 728'].join('\n');
    downloadText(text, `ARI-lista-${profile}.txt`);
    $('#kit-action-status').textContent = 'Lista cu bifele curente este pregătită pentru descărcare.';
  });
  let previousDetails = [];
  function finishPrint() {
    document.body.classList.remove('print-kit');
    previousDetails.forEach(([detail, wasOpen]) => detail.open = wasOpen);
  }
  $('#print-kit').addEventListener('click', () => {
    previousDetails = [...document.querySelectorAll('.kit-group')].map(detail => [detail, detail.open]);
    previousDetails.forEach(([detail]) => detail.open = true);
    document.body.classList.add('print-kit');
    window.print();
    finishPrint();
  });
  window.addEventListener('afterprint', finishPrint);

  $('#guide-list').innerHTML = content.guides.map((guide, index) => `<button class="guide-card" data-guide="${guide.id}" aria-haspopup="dialog"><span class="guide-number">0${index + 1}</span><span class="guide-content"><span class="eyebrow">${escape(guide.category)}</span><strong>${escape(guide.title)}</strong><span>${escape(guide.summary)}</span></span><span class="guide-open" aria-hidden="true">↗</span></button>`).join('');
  document.querySelectorAll('[data-guide]').forEach(button => button.addEventListener('click', () => {
    const guide = content.guides.find(item => item.id === button.dataset.guide);
    openDialog(`<p class="eyebrow">GHID PRACTIC / ${escape(guide.category)}</p><h2 id="dialog-title">${escape(guide.title)}</h2><p>${escape(guide.intro)}</p><ol class="guide-steps">${guide.steps.map(([title, description]) => `<li><h3>${escape(title)}</h3><p>${escape(description)}</p></li>`).join('')}</ol>${guide.note ? `<p class="dialog-note">${escape(guide.note)}</p>` : ''}${guide.source ? `<a class="text-link" href="${guide.source}" target="_blank" rel="noopener noreferrer">${escape(guide.sourceLabel)} ↗</a>` : ''}<div class="actions"><a href="#echipament" class="button secondary" data-close-dialog>Lista de echipament ↓</a><a href="#inscriere" class="text-link" data-close-dialog>Exersează alături de ARI ↗</a></div>`, button, 'guide');
  }));

  let galleryFilter = 'all';
  let mediaIndex = 0;
  const filteredMedia = () => content.gallery.filter(item => galleryFilter === 'all' || item.type === galleryFilter);
  const placeholder = item => `<div class="media-placeholder ${item.type}" aria-hidden="true"><svg viewBox="0 0 120 80" fill="none">${item.type === 'video' ? '<rect x="20" y="16" width="80" height="48" rx="3"/><path d="M20 28h80M20 52h80M35 16v12m25-12v12m25-12v12M35 52v12m25-12v12m25-12v12"/>' : '<rect x="20" y="12" width="80" height="56" rx="3"/><circle cx="78" cy="29" r="6"/><path d="m20 58 23-22 24 22 14-13 19 19"/>'}</svg><span>${item.type === 'video' ? 'VIDEO' : 'FOTO'} / ${item.src ? 'ARI' : 'ÎN PREGĂTIRE'}</span></div>`;
  function renderGallery() {
    const items = filteredMedia();
    $('#gallery-grid').innerHTML = items.map(item => `<button class="gallery-card${item.src ? '' : ' pending'}" data-media="${item.id}" aria-haspopup="dialog" aria-label="${escape(item.title)}${item.src ? (item.type === 'photo' ? ' — deschide fotografia' : ' — deschide video') : ' — material în pregătire'}"><span class="media-cover">${item.src && (item.type === 'photo' || item.poster) ? `<img src="${escape(item.poster || item.src)}" alt="${escape(item.alt || item.title)}" width="900" height="600" loading="lazy">` : placeholder(item)}<span class="media-badge">${item.src ? (item.type === 'photo' ? 'FOTO' : 'VIDEO') : 'ÎN PREGĂTIRE'}</span></span><span class="media-meta"><span><small>${escape(item.label)}</small><strong>${escape(item.title)}</strong></span><span aria-hidden="true">↗</span></span></button>`).join('');
    const live = items.filter(item => item.src).length;
    $('#gallery-count').textContent = `${live} materiale disponibile · ${items.length - live} în pregătire`;
  }
  function openMedia(id, source) {
    const items = filteredMedia();
    mediaIndex = items.findIndex(item => item.id === id);
    if (mediaIndex < 0) return;
    const item = items[mediaIndex];
    const media = !item.src ? `<div class="lightbox-placeholder">${placeholder(item)}<p>Materialul va fi adăugat aici.</p></div>` : item.type === 'video' ? `<video controls playsinline preload="metadata"${item.poster ? ` poster="${escape(item.poster)}"` : ''} src="${escape(item.src)}" aria-label="${escape(item.title)}">Browserul nu poate reda acest video.</video><p class="media-error" role="status" hidden>Materialul nu a putut fi încărcat. Încearcă din nou mai târziu.</p>` : `<img class="lightbox-image" src="${escape(item.src)}" alt="${escape(item.alt)}">`;
    openDialog(`<div class="media-heading"><p class="eyebrow">${escape(item.label)}</p><h2 id="dialog-title">${escape(item.title)}</h2></div>${media}<p class="media-description">${escape(item.description)}</p><div class="lightbox-controls"><button class="button secondary" type="button" data-media-step="-1" aria-label="Materialul anterior">← Înapoi</button><span aria-live="polite">${mediaIndex + 1} / ${items.length}</span><button class="button secondary" type="button" data-media-step="1" aria-label="Materialul următor">Înainte →</button></div>`, source, 'media');
    dialog.querySelector('video')?.addEventListener('error', () => {dialog.querySelector('.media-error').hidden = false;});
  }
  $('#gallery-grid').addEventListener('click', event => {
    const button = event.target.closest('[data-media]');
    if (button) openMedia(button.dataset.media, button);
  });
  document.querySelectorAll('[data-gallery-filter]').forEach(button => button.addEventListener('click', () => {
    galleryFilter = button.dataset.galleryFilter;
    document.querySelectorAll('[data-gallery-filter]').forEach(item => {item.classList.toggle('active', item === button); item.setAttribute('aria-pressed', String(item === button));});
    renderGallery();
  }));
  function stepMedia(step) {
    const items = filteredMedia();
    const next = (mediaIndex + step + items.length) % items.length;
    openMedia(items[next].id);
    dialog.querySelector(`[data-media-step="${step}"]`)?.focus();
  }
  dialog.addEventListener('click', event => {
    const button = event.target.closest('[data-media-step]');
    if (button) stepMedia(Number(button.dataset.mediaStep));
  });
  dialog.addEventListener('keydown', event => {
    if (dialog.dataset.variant !== 'media' || event.target.closest('video')) return;
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {event.preventDefault();stepMedia(event.key === 'ArrowLeft' ? -1 : 1);}
  });

  const donationTabs = [...document.querySelectorAll('[data-donation-tab]')];
  function activateDonationTab(tab, focus = false) {
    donationTabs.forEach(button => {
      const selected = button === tab;
      button.setAttribute('aria-selected', String(selected));
      button.tabIndex = selected ? 0 : -1;
      document.getElementById(button.getAttribute('aria-controls')).hidden = !selected;
    });
    if (focus) tab.focus();
  }
  donationTabs.forEach((tab, index) => {
    tab.addEventListener('click', () => activateDonationTab(tab));
    tab.addEventListener('keydown', event => {
      let next;
      if (event.key === 'ArrowRight') next = (index + 1) % donationTabs.length;
      if (event.key === 'ArrowLeft') next = (index - 1 + donationTabs.length) % donationTabs.length;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = donationTabs.length - 1;
      if (next !== undefined) {event.preventDefault();activateDonationTab(donationTabs[next], true);}
    });
  });
  let amountChoice = '100';
  function donationAmount() {
    return Number(amountChoice === 'custom' ? $('#custom-amount').value : amountChoice);
  }
  function amountValid() {const value = donationAmount();return Number.isInteger(value) && value >= 1 && value <= 1000000;}
  function updateAmount() {
    $('#donation-total').textContent = amountValid() ? donationAmount().toLocaleString('ro-RO') + ' lei' : 'Alege suma';
    $('#amount-error').hidden = true;
    $('#bank-status').textContent = '';
    $('#bank-copy-fallback').hidden = true;
  }
  document.querySelectorAll('[data-amount]').forEach(button => button.addEventListener('click', () => {
    amountChoice = button.dataset.amount;
    document.querySelectorAll('[data-amount]').forEach(item => {item.classList.toggle('active', item === button);item.setAttribute('aria-pressed', String(item === button));});
    $('#custom-amount-label').hidden = amountChoice !== 'custom';
    if (amountChoice === 'custom') $('#custom-amount').focus();
    updateAmount();
  }));
  $('#custom-amount').addEventListener('input', updateAmount);
  function bankText() {
    const bank = content.bank;
    return `DONAȚIE ARI\n\nBeneficiar: ${bank.beneficiary}\nIBAN RON: ${bank.iban}\nBanca: ${bank.bank}\nBIC/SWIFT: ${bank.swift}\nSuma: ${donationAmount()} lei\nDetalii plată: Donație pentru programele ARI\n\nTransferul se finalizează în aplicația băncii tale. Verifică beneficiarul și suma înainte de confirmare.\nSursa datelor: ${bank.source}`;
  }
  function validateAmount() {
    if (amountValid()) return true;
    $('#amount-error').hidden = false;
    $('#custom-amount').focus();
    return false;
  }
  async function copyBank(text, message) {
    try {await navigator.clipboard.writeText(text);$('#bank-status').textContent = message;$('#bank-copy-fallback').hidden = true;}
    catch {const fallback = $('#bank-copy-fallback');fallback.value = text;fallback.hidden = false;fallback.focus();fallback.select();$('#bank-status').textContent = 'Selectează Copiază din browser pentru textul de mai jos.';}
  }
  $('#copy-bank-iban').addEventListener('click', () => copyBank(content.bank.iban, 'IBAN copiat. Îl poți lipi în aplicația băncii.'));
  $('#copy-bank-all').addEventListener('click', () => {if (validateAmount()) copyBank(bankText(), 'Datele și suma au fost copiate. Transferul se confirmă în aplicația băncii.');});
  $('#download-bank').addEventListener('click', () => {if (validateAmount()) {downloadText(bankText(), 'ARI-date-transfer.txt');$('#bank-status').textContent = 'Datele de transfer sunt pregătite pentru descărcare.';}});

  const topicForm = $('#topic-form');
  topicForm.addEventListener('submit', event => {
    event.preventDefault();
    const data = new FormData(topicForm);
    const topics = data.getAll('topic');
    const idea = String(data.get('idea') || '').trim();
    const city = String(data.get('city') || '').trim();
    if (!topics.length && !idea) {$('#topic-error').hidden = false;topicForm.querySelector('input[name="topic"]').focus();return;}
    if (!city) {topicForm.elements.city.setCustomValidity('Completează localitatea.');topicForm.elements.city.reportValidity();return;}
    const message = `Bună! Aș dori să propun un atelier ARI.\nLocalitate: ${city}\nSubiecte: ${[...topics, idea].filter(Boolean).join(', ')}\nVă rog să îmi spuneți dacă aceste teme pot fi incluse într-o ediție viitoare.`;
    $('#topic-message').textContent = message;
    $('#topic-whatsapp').href = 'https://wa.me/40753137728?text=' + encodeURIComponent(message);
    $('#topic-email').href = 'mailto:contact@ariromania.ro?subject=Propunere%20atelier%20ARI&body=' + encodeURIComponent(message);
    $('#topic-preview').hidden = false;
  });
  topicForm.addEventListener('input', () => {$('#topic-preview').hidden = true;$('#topic-error').hidden = true;topicForm.elements.city.setCustomValidity('');});

  renderKit();
  renderGallery();
});
