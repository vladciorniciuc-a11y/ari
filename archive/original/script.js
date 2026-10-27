// script.js — Interactive Controller for Active Resilience Initiative (ARI) Mockup

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Lucide Icons
  if (window.lucide) {
    lucide.createIcons();
  }

  // 2. Setup Canvas Tactical Scroll-Controlled Video Simulator
  initCanvasVideoScrubber();

  // 3. Setup Roadmap & Guide Modals
  initModals();

  // 4. Setup Community Suggestion & Voting Form
  initSuggestionForm();

  // 5. Setup Donation Tabs & Copy IBAN
  initDonationTabs();

  // 6. Setup Mobile Drawer Navigation
  initMobileDrawer();
});

/* ==========================================================================
   CANVAS VIDEO CONTROLLER (GSAP SCROLLTRIGGER SCRUBBING)
   ========================================================================== */
function initCanvasVideoScrubber() {
  const canvas = document.getElementById('scrubCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const progressLabel = document.getElementById('scrubProgressLabel');

  function resizeCanvas() {
    canvas.width = window.innerWidth * (window.devicePixelRatio || 1);
    canvas.height = window.innerHeight * (window.devicePixelRatio || 1);
  }
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  // Animation state driven by scroll [0..1]
  const state = { progress: 0 };

  // Render procedural tactical training telemetry & simulation scenes
  function renderFrame(p) {
    const w = canvas.width;
    const h = canvas.height;

    // Clear background
    ctx.fillStyle = '#080A0D';
    ctx.fillRect(0, 0, w, h);

    // Grid pattern
    const gridSize = 60 * (window.devicePixelRatio || 1);
    ctx.strokeStyle = 'rgba(31, 38, 48, 0.4)';
    ctx.lineWidth = 1;
    for (let x = 0; x < w; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }
    for (let y = 0; y < h; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }

    const cx = w / 2;
    const cy = h / 2;

    // Scene 1: Emergency & Trauma Protocol (0 - 0.3)
    if (p < 0.33) {
      const pulsePhase = (p / 0.33);
      // Concentric tactical circles
      ctx.strokeStyle = 'rgba(255, 85, 0, ' + (0.3 + 0.4 * Math.sin(pulsePhase * Math.PI)) + ')';
      ctx.lineWidth = 2 * (window.devicePixelRatio || 1);

      ctx.beginPath();
      ctx.arc(cx, cy, 140 * (1 + 0.2 * pulsePhase), 0, Math.PI * 2);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(cx, cy, 80, 0, Math.PI * 2);
      ctx.stroke();

      // Crosshair lines
      ctx.strokeStyle = '#FF5500';
      ctx.beginPath();
      ctx.moveTo(cx - 180, cy); ctx.lineTo(cx - 90, cy);
      ctx.moveTo(cx + 90, cy); ctx.lineTo(cx + 180, cy);
      ctx.moveTo(cx, cy - 180); ctx.lineTo(cx, cy - 90);
      ctx.moveTo(cx, cy + 90); ctx.lineTo(cx, cy + 180);
      ctx.stroke();

      // Medical Heartbeat / Trauma monitor wave
      ctx.strokeStyle = '#00E599';
      ctx.lineWidth = 3;
      ctx.beginPath();
      for (let i = 0; i < 200; i++) {
        const px = cx - 200 + i * 2;
        const py = cy + 120 + Math.sin(i * 0.15 + p * 20) * 15 * (i > 80 && i < 120 ? 3 : 0.5);
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.stroke();

      // Telemetry text
      ctx.fillStyle = '#FF5500';
      ctx.font = `${14 * (window.devicePixelRatio || 1)}px "JetBrains Mono", monospace`;
      ctx.fillText('CRITICAL RESPONSE // HEMORRHAGE CONTROL PROTOCOL', cx - 180, cy - 150);
      ctx.fillStyle = 'rgba(255,255,255,0.7)';
      ctx.fillText(`STOP-THE-BLEED TIMER: ${(p * 180).toFixed(1)}s // STRESS LEVEL HIGH`, cx - 180, cy + 170);
    }
    // Scene 2: Authorized Range & Ballistic Accuracy (0.33 - 0.66)
    else if (p < 0.66) {
      const rangePhase = (p - 0.33) / 0.33;
      ctx.strokeStyle = '#FF9900';
      ctx.lineWidth = 2;

      // Precision target reticle
      ctx.beginPath();
      ctx.arc(cx, cy, 180 * (1 - rangePhase * 0.2), 0, Math.PI * 2);
      ctx.stroke();

      // Angle ticks
      for (let a = 0; a < Math.PI * 2; a += Math.PI / 8) {
        const x1 = cx + Math.cos(a) * 160;
        const y1 = cy + Math.sin(a) * 160;
        const x2 = cx + Math.cos(a) * 180;
        const y2 = cy + Math.sin(a) * 180;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      }

      ctx.fillStyle = '#FF9900';
      ctx.font = `${14 * (window.devicePixelRatio || 1)}px "JetBrains Mono", monospace`;
      ctx.fillText('AUTHORIZED RANGE SIMULATION // POLIGONUL JOIȚA / GUNPRO', cx - 200, cy - 140);
      ctx.fillStyle = 'rgba(255,255,255,0.8)';
      ctx.fillText(`TRIGGER SAFETY ENGAGED // AZIMUTH: ${(rangePhase * 360).toFixed(0)}°`, cx - 200, cy + 160);
    }
    // Scene 3: Mountain Land Navigation & Night Ops 36h (0.66 - 1.0)
    else {
      const navPhase = (p - 0.66) / 0.34;
      ctx.strokeStyle = '#00E599';
      ctx.lineWidth = 1.5;

      // Topographic contour lines
      for (let r = 50; r < 240; r += 35) {
        ctx.beginPath();
        for (let th = 0; th <= Math.PI * 2; th += 0.2) {
          const wobble = Math.sin(th * 3 + navPhase * 5) * 12 + Math.cos(th * 2) * 8;
          const px = cx + (r + wobble) * Math.cos(th);
          const py = cy + (r + wobble) * Math.sin(th);
          if (th === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.stroke();
      }

      // Compass needle
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(navPhase * Math.PI * 1.5);
      ctx.strokeStyle = '#FF5500';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(0, 0); ctx.lineTo(0, -90);
      ctx.stroke();
      ctx.fillStyle = '#FF5500';
      ctx.beginPath();
      ctx.moveTo(0, -105); ctx.lineTo(-8, -85); ctx.lineTo(8, -85);
      ctx.closePath();
      ctx.fill();
      ctx.restore();

      ctx.fillStyle = '#00E599';
      ctx.font = `${14 * (window.devicePixelRatio || 1)}px "JetBrains Mono", monospace`;
      ctx.fillText('LAND NAVIGATION 36H // NIGHT SIMULATION // NO GPS ACTIVE', cx - 200, cy - 150);
      ctx.fillStyle = 'rgba(255,255,255,0.8)';
      ctx.fillText(`COORDINATES LOCKED // GRID REF 26.91 // ELEVATION: 1140M`, cx - 200, cy + 170);
    }
  }

  // Initial draw
  renderFrame(0);

  // Register GSAP ScrollTrigger
  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);

    ScrollTrigger.create({
      trigger: '#hero',
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.5,
      onUpdate: (self) => {
        state.progress = self.progress;
        renderFrame(self.progress);

        if (progressLabel) {
          progressLabel.textContent = `SCROLL: ${Math.round(self.progress * 100)}%`;
        }

        // Switch dynamic captions cleanly
        const p = self.progress;
        updateHeroCaptions(p);
      }
    });
  }
}

function updateHeroCaptions(p) {
  const t1 = document.getElementById('heroText1');
  const t2 = document.getElementById('heroText2');
  const t3 = document.getElementById('heroText3');
  const t4 = document.getElementById('heroText4');
  if (!t1 || !t2 || !t3 || !t4) return;

  const steps = [
    { el: t1, min: 0, max: 0.25 },
    { el: t2, min: 0.25, max: 0.52 },
    { el: t3, min: 0.52, max: 0.78 },
    { el: t4, min: 0.78, max: 1.01 }
  ];

  steps.forEach(s => {
    if (p >= s.min && p < s.max) {
      s.el.classList.remove('hidden');
      s.el.style.opacity = '1';
      s.el.style.transition = 'opacity 0.4s ease';
    } else {
      s.el.style.opacity = '0';
      s.el.classList.add('hidden');
    }
  });
}

/* ==========================================================================
   INTERACTIVE ROADMAP & GUIDE MODALS (SLIDE-IN DRAWER)
   ========================================================================== */
const ROADMAP_DATA = {
  buhusi: {
    tag: 'EDIȚIA I — PROIECT PILOT',
    title: 'Ediția I — Buhuși (Poligon Hunting Fun)',
    date: '7 Iunie 2025 // Buhuși, Județul Bacău',
    participants: '~100 de participanți civili',
    summary: 'Prima ediție a reprezentat punctul de plecare al inițiativei ARI. Participanții au testat pentru prima oară formatul de educație nonformală aplicată.',
    bullets: [
      'Atelier prim ajutor de bază: poziția laterală de siguranță, hemostază de primă intenție',
      'Orientare în teren cu hartă topografică și busolă',
      'Lucru în echipă sub limită de timp',
      'Combaterea dezinformării și igiena știrilor în timp de criză',
      'Confirmarea interesului civic: peste 100 de oameni dornici să învețe gratuit'
    ],
    partners: 'Poligon Hunting Fun Buhuși, comunitatea locală de voluntari.'
  },
  joita: {
    tag: 'EDIȚIA A II-A — DECIZII ÎN CRIZĂ',
    title: 'Ediția a II-a — Joița (Poligonul Joița)',
    date: 'Iulie 2025 // Joița, Județul Giurgiu',
    participants: 'Participanți selectați pe echipe',
    summary: 'Aprofundarea scenariilor practice: cum reacționează o echipă când resursele și timpul sunt drastic limitate.',
    bullets: [
      'Scenarii simulate de accident și evacuare în mediu izolat',
      'Gestionarea resurselor minime de supraviețuire',
      'Coordonare prin comunicare directă și semnale convenite',
      'Stabilirea priorităților când factorul stres este crescut'
    ],
    partners: 'Poligonul Joița (Anatolie Sălceanu).'
  },
  'info-war': {
    tag: 'EDIȚIA A III-A — RĂZBOI HIBRID',
    title: 'Ediția a III-a — Reziliență Informațională',
    date: 'Septembrie 2025 // Poligonul Joița',
    participants: 'Comunitate civică și invitați speciali',
    summary: 'Conectarea pregătirii tactice cu reziliența cognitivă și lupta împotriva războiului hibrid modern.',
    bullets: [
      'Sesiune condusă alături de corespondentul de război Radu Hossu',
      'Deconstrucția mecanismelor de manipulare și război psihologic',
      'Analiza cazurilor reale de panică indusă prin dezinformare',
      'Tehnici de verificare din surse multiple înainte de a distribui pe rețele',
      'Rolul cetățeanului calm ca filtru sanitar informațional'
    ],
    partners: 'Poligonul Joița, Radu Hossu, formatori civici independenți.'
  },
  brasov: {
    tag: 'EDIȚIA A IV-A — 36H ANDURANȚĂ',
    title: 'Ediția a IV-a — Brașov (Exercițiu de 36 de Ore)',
    date: 'Decembrie 2025 // Zona Montană Brașov',
    participants: 'Format extins non-stop (zi și noapte)',
    summary: 'Cel mai solicitant exercițiu ARI: 36 de ore continue pe trasee montane, pe timp de iarnă, testând limitele fizice și mentale.',
    bullets: [
      'Marș pe azimut și navigație exclusivă pe timp de noapte fără GPS',
      'Gestionarea hipotermiei, a apei și a efortului susținut',
      'Menținerea coeziunii echipei în condiții de privare de somn',
      'Validarea capacității logistice a instructorilor ARI de a susține exerciții complexe'
    ],
    partners: 'Voluntari locali montani, instructori independenți.'
  },
  asociatie: {
    tag: 'PAS JURIDIC OFICIAL',
    title: 'Constituirea Asociației Active Resilience Initiative',
    date: '18 Martie 2026 // Sediul: Bacău',
    participants: 'Membri fondatori & echipă de bază',
    summary: 'După 4 ediții de succes livrate pe teren ca inițiativă civică, asociația a dobândit personalitate juridică oficială.',
    bullets: [
      'Transformarea inițiativei într-un cadru stabil, legal și transparent',
      'Capacitatea legală de a încheia contracte de sponsorizare cu companii (20% impozit)',
      'Deschiderea colectării prin Formularul 230 (3.5%)',
      'Misiune asumată în statut: pregătirea practică gratuită a populației civile'
    ],
    partners: 'Fondatori, avocați colaboratori (AMZ Law Office).'
  },
  bsda: {
    tag: 'EXPOZIȚIE & APĂRARE',
    title: 'Participarea ARI la BSDA 2026',
    date: '13–15 Mai 2026 // ROMAERO Băneasa, București',
    participants: 'Stand propriu în cadrul expoziției Black Sea Defense & Aerospace',
    summary: 'Prezența la cel mai important eveniment regional de apărare și tehnologii strategice a consolidat poziția ARI în fața profesioniștilor.',
    bullets: [
      'Promovarea modelului de reziliență civilă în fața specialiștilor din apărare și securitate',
      'Dialog direct cu producători de echipamente medicale și tactice',
      'Consolidarea vizibilității naționale pentru viitoarele ediții comunitare'
    ],
    partners: 'ROMAERO, parteneri din industria de apărare și echipamente de protecție.'
  },
  leo: {
    tag: 'GRATUIT PENTRU STRUCTURILE STATULUI',
    title: 'LAW ENFORCEMENT ONLY 2026',
    date: '25 Iulie 2026 // GunPro Shooting Range, Otopeni',
    participants: '40 de cadre active din sistemul de apărare și ordine publică',
    summary: 'Un eveniment de elită oferit complet gratuit cadrelor militare și polițiștilor, cu sprijinul partenerilor privați.',
    bullets: [
      'Fiecare participant a beneficiat gratuit de 50 de cartușe și linie de tragere',
      'Seminar de regim juridic și uz de armă susținut de avocatul Adrian Zamfir (AMZ Law Office)',
      'Medicină tactică avansată conform ghidurilor TECC',
      'Atelier practic de gestionare a atacurilor cu armă albă (cuțit) susținut de Pontica Selfdefense',
      'Echipamente și întreținere oferite de GunPro, Pistoale GLOCK, Weicon, Strategic Defense România'
    ],
    partners: 'GunPro Shooting Range, GLOCK, Strategic Defense România, AMZ Law Office, Weicon, Pontica Selfdefense.'
  }
};

const GUIDE_DATA = {
  garou: {
    title: 'Protocol: Cum aplici un garou (CAT / SOFTT) în sub 60 secunde',
    tag: 'STOP THE BLEED // PROTOCOL SALVATOR',
    content: `
      <div class="space-y-4 text-slate-300 text-sm leading-relaxed">
        <p class="font-medium text-white">Hemoragia masivă dintr-un vas arterial mare poate duce la deces în 90-180 de secunde. Un garou aplicat corect oprește hemoragia instant.</p>
        
        <div class="space-y-3 font-mono text-xs">
          <div class="p-3 bg-brand-dark rounded-lg border border-brand-border">
            <span class="text-brand-orange font-bold block mb-1">PASUL 1: EVALUARE ȘI SIGURANȚĂ</span>
            Asigură-te că zona e sigură pentru tine. Expune rana dacă e posibil și identifică sursa de sângerare arterială în jet sau bălțare continuă.
          </div>
          
          <div class="p-3 bg-brand-dark rounded-lg border border-brand-border">
            <span class="text-brand-orange font-bold block mb-1">PASUL 2: PLASAREA GAROULUI</span>
            Așază garoul la <strong>5-7 cm deasupra plăgii</strong> (între rană și inimă). Nu pune niciodată garoul direct peste o articulație (genunchi, cot) sau peste o fractură deschisă.
          </div>

          <div class="p-3 bg-brand-dark rounded-lg border border-brand-border">
            <span class="text-brand-orange font-bold block mb-1">PASUL 3: ELIMINAREA JOCULUI</span>
            Trage banda de velcro extrem de strâns înainte de a răsuci tija. Dacă intră două degete sub bandă, nu e destul de strâns.
          </div>

          <div class="p-3 bg-brand-dark rounded-lg border border-brand-border">
            <span class="text-brand-orange font-bold block mb-1">PASUL 4: RĂSUCIREA TIJEI DE TORSIUNE</span>
            Răsucește tija metalică/compozit până când sângerarea se oprește complet și pulsul distal dispare. Blochează tija în clipsul de siguranță.
          </div>

          <div class="p-3 bg-brand-dark rounded-lg border border-brand-border">
            <span class="text-brand-accent font-bold block mb-1">PASUL 5: NOTAREA TIMPULUI</span>
            Scrie ora exactă pe banda albă a garoului (ex: 14:35). Medicii de la spital au nevoie de acest reper critic.
          </div>
        </div>

        <div class="p-3 bg-brand-orange/15 border border-brand-orange/30 rounded-xl text-xs text-brand-orange font-mono">
          ATENȚIE: Garoul doare când este pus corect. Nu îl slăbi niciodată pe teren fără personal medical specializat!
        </div>
      </div>
    `
  },
  rucsac72: {
    title: 'Checklist Complet: Rucsacul de Urgență pentru 72 de Ore (Go-Bag)',
    tag: 'AUTONOMIE & SUPRAVIEȚUIRE CIVILĂ',
    content: `
      <div class="space-y-4 text-slate-300 text-sm leading-relaxed">
        <p class="font-medium text-white">În caz de catastrofă, ai la dispoziție maxim 15 minute pentru a părăsi locuința. Fiecare membru al familiei trebuie să aibă un rucsac pregătit.</p>
        
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
          <div class="p-3 bg-brand-dark rounded-lg border border-brand-border">
            <span class="text-brand-amber font-bold block mb-1">1. APĂ &amp; HRANĂ</span>
            • 2 litri apă/zi/om în recipiente rezistente<br>
            • Filtru mecanic de apă (Sawyer Mini / Katadyn)<br>
            • Pastile de purificare cu clor/ioni argint<br>
            • Batoane calorice compacte (Seven Oceans / NRG-5)
          </div>

          <div class="p-3 bg-brand-dark rounded-lg border border-brand-border">
            <span class="text-brand-amber font-bold block mb-1">2. TRUSĂ TRAUMĂ &amp; MEDICAMENTE</span>
            • Garou CAT omologat (evită fake-urile de pe net)<br>
            • Pansament compresiv tip israelian<br>
            • Bandaj hemostatic cu caolin<br>
            • Medicație cronică personală pentru minim 7 zile
          </div>

          <div class="p-3 bg-brand-dark rounded-lg border border-brand-border">
            <span class="text-brand-amber font-bold block mb-1">3. COMUNICAȚII &amp; LUMINĂ</span>
            • Radio de urgență cu încărcare la manivelă/solar<br>
            • Lanternă frontală cu lumină albă și roșie<br>
            • Baterie externă 20.000 mAh încărcată<br>
            • Stație radio portabilă PMR/UHF
          </div>

          <div class="p-3 bg-brand-dark rounded-lg border border-brand-border">
            <span class="text-brand-amber font-bold block mb-1">4. ADĂPOST &amp; DOCUMENTE</span>
            • Folie de supraviețuire / Sac Bivy termic<br>
            • Copii laminate după CI, pașaport, acte proprietate<br>
            • Bani cash în bancnote mici (rețeaua POS pică)<br>
            • Cuțit robust full-tang și brichetă anti-vânt
          </div>
        </div>
      </div>
    `
  },
  'reguli-arme': {
    title: 'Cele 4 Reguli Cardinale ale Armamentului (Siguranță Absolută)',
    tag: 'POLIGON & MÂNUIRE RESPONSABILĂ',
    content: `
      <div class="space-y-4 text-slate-300 text-sm leading-relaxed">
        <p class="font-medium text-white">Siguranța nu este o opțiune, ci o stare de reflex necondiționat. Aceste 4 reguli formulate de Col. Jeff Cooper guvernează fiecare secundă în poligon:</p>
        
        <div class="space-y-3 font-mono text-xs">
          <div class="p-3 bg-brand-dark rounded-lg border border-brand-border">
            <span class="text-blue-400 font-bold block mb-1">REGULA 1: TOATE ARMELE SUNT ÎNTOTDEAUNA ÎNCĂRCATE</span>
            Chiar dacă ai descărcat-o personal acum 10 secunde, trateaz-o întotdeauna ca și cum un cartuș se află pe țeavă. Verifică vizual și tactil camera cartușului de fiecare dată când iei arma în mână.
          </div>

          <div class="p-3 bg-brand-dark rounded-lg border border-brand-border">
            <span class="text-blue-400 font-bold block mb-1">REGULA 2: NU ORIENTA NICIODATĂ ȚEAVA SPRE CEVA CE NU VREI SĂ DISTRUGI</span>
            Controlul absolut al gurii țevii (muzzle awareness). În poligon, țeava stă orientată exclusiv înspre aliniamentul de ținte, niciodată spre lateral sau înapoi.
          </div>

          <div class="p-3 bg-brand-dark rounded-lg border border-brand-border">
            <span class="text-blue-400 font-bold block mb-1">REGULA 3: DEGETUL RĂMÂNE ÎN AFARA GĂRZII TRĂGACIULUI</span>
            Degetul arătător stă întins pe corpul armei (index finger high and straight). Degetul atinge trăgaciul doar în fracțiunea de secundă în care aparatele de ochire sunt aliniate pe țintă și ai luat decizia de a trage.
          </div>

          <div class="p-3 bg-brand-dark rounded-lg border border-brand-border">
            <span class="text-blue-400 font-bold block mb-1">REGULA 4: FII CONȘTIENT DE ȚINTĂ ȘI DE CE SE AFLĂ ÎN SPATELE EI</span>
            Un proiectil poate traversa o țintă sau o barieră subțire. Nu executa foc fără să știi exact unde se va opri glonțul (backstop sigur).
          </div>
        </div>
      </div>
    `
  }
};

function initModals() {
  const overlay = document.getElementById('infoModalOverlay');
  const modalBody = document.getElementById('modalBody');
  const closeBtn = document.getElementById('closeInfoModal');
  if (!overlay || !modalBody || !closeBtn) return;

  function closeModal() {
    overlay.classList.remove('active');
  }

  closeBtn.addEventListener('click', closeModal);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
  });

  // Event cards clicks in roadmap
  document.querySelectorAll('.event-card').forEach(card => {
    card.addEventListener('click', () => {
      const eventId = card.getAttribute('data-event-id');
      const data = ROADMAP_DATA[eventId];
      if (!data) return;

      modalBody.innerHTML = `
        <span class="inline-block px-2.5 py-1 bg-brand-orange/20 border border-brand-orange/40 text-brand-orange text-[10px] font-mono uppercase tracking-widest rounded mb-3">
          ${data.tag}
        </span>
        <h3 class="font-tactical font-black text-2xl text-white uppercase">${data.title}</h3>
        <p class="font-mono text-xs text-slate-400 mt-1">${data.date} • <span class="text-brand-accent">${data.participants}</span></p>
        
        <p class="text-slate-300 text-sm mt-4 leading-relaxed font-sans">${data.summary}</p>
        
        <div class="mt-6 border-t border-brand-border/60 pt-4">
          <h4 class="font-tactical font-bold text-sm text-white uppercase mb-2">Activități Desfășurate:</h4>
          <ul class="space-y-2 text-xs font-mono text-slate-300">
            ${data.bullets.map(b => `<li class="flex items-start gap-2"><i data-lucide="check" class="w-4 h-4 text-brand-orange shrink-0 mt-0.5"></i><span>${b}</span></li>`).join('')}
          </ul>
        </div>

        <div class="mt-6 p-3 bg-brand-dark rounded-xl border border-brand-border text-xs font-mono text-slate-400">
          <strong class="text-white block mb-0.5">Parteneri &amp; Infrastructură:</strong>
          ${data.partners}
        </div>
      `;

      if (window.lucide) lucide.createIcons();
      overlay.classList.add('active');
    });
  });

  // Guide cards clicks
  document.querySelectorAll('.open-guide-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const guideId = btn.getAttribute('data-guide-id');
      const data = GUIDE_DATA[guideId];
      if (!data) return;

      modalBody.innerHTML = `
        <span class="inline-block px-2.5 py-1 bg-brand-accent/20 border border-brand-accent/40 text-brand-accent text-[10px] font-mono uppercase tracking-widest rounded mb-3">
          ${data.tag}
        </span>
        <h3 class="font-tactical font-black text-2xl text-white uppercase mb-4">${data.title}</h3>
        ${data.content}
        <div class="mt-8 pt-4 border-t border-brand-border flex items-center justify-between">
          <span class="text-[11px] font-mono text-slate-400">Vrei să înveți asta pe viu? Vino la o ediție ARI.</span>
          <a href="https://wa.me/40753137728?text=Salut!%20Vreau%20să%20aflu%20când%20se%20face%20un%20curs%20practic%20despre:%20${encodeURIComponent(data.title)}" target="_blank" class="px-4 py-2 bg-[#25D366] text-black font-tactical font-bold text-xs rounded-lg flex items-center gap-1.5">
            <i data-lucide="message-circle" class="w-3.5 h-3.5"></i>
            <span>Întreabă pe WhatsApp</span>
          </a>
        </div>
      `;

      if (window.lucide) lucide.createIcons();
      overlay.classList.add('active');
    });
  });
}

/* ==========================================================================
   COMMUNITY SUGGESTION & VOTING FORM
   ========================================================================== */
function initSuggestionForm() {
  const form = document.getElementById('suggestionForm');
  const tagsContainer = document.getElementById('topicTagsContainer');
  const successMsg = document.getElementById('formSuccessMessage');
  if (!form || !tagsContainer) return;

  const selectedTopics = new Set();

  tagsContainer.querySelectorAll('.topic-tag').forEach(tag => {
    tag.addEventListener('click', () => {
      const val = tag.getAttribute('data-value');
      if (selectedTopics.has(val)) {
        selectedTopics.delete(val);
        tag.classList.remove('selected');
      } else {
        selectedTopics.add(val);
        tag.classList.add('selected');
      }
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const custom = document.getElementById('customTopic').value.trim();
    if (custom) selectedTopics.add(custom);

    const city = document.getElementById('citySelect').value;
    const contact = document.getElementById('userContact').value.trim();

    // Prepare proposal payload
    const payload = {
      topics: Array.from(selectedTopics),
      city,
      contact,
      date: new Date().toISOString()
    };

    console.log('Propunere modul înregistrată:', payload);

    // Save locally
    try {
      const existing = JSON.parse(localStorage.getItem('ari_topic_suggestions') || '[]');
      existing.push(payload);
      localStorage.setItem('ari_topic_suggestions', JSON.stringify(existing));
    } catch(err) {}

    // Show success feedback
    if (successMsg) {
      successMsg.classList.remove('hidden');
      form.reset();
      selectedTopics.clear();
      tagsContainer.querySelectorAll('.topic-tag').forEach(t => t.classList.remove('selected'));

      setTimeout(() => {
        successMsg.classList.add('hidden');
      }, 7000);
    }
  });
}

/* ==========================================================================
   DONATION TABS & COPY IBAN
   ========================================================================== */
function initDonationTabs() {
  const tab230Btn = document.getElementById('tab230Btn');
  const tabCorporateBtn = document.getElementById('tabCorporateBtn');
  const tabDirectBtn = document.getElementById('tabDirectBtn');

  const tab230Content = document.getElementById('tab230Content');
  const tabCorporateContent = document.getElementById('tabCorporateContent');
  const tabDirectContent = document.getElementById('tabDirectContent');

  if (!tab230Btn || !tabCorporateBtn || !tabDirectBtn) return;

  const buttons = [tab230Btn, tabCorporateBtn, tabDirectBtn];
  const contents = [tab230Content, tabCorporateContent, tabDirectContent];

  function activateTab(index) {
    buttons.forEach((btn, i) => {
      if (i === index) {
        btn.className = 'px-5 py-2 rounded-lg font-bold bg-brand-orange text-white transition';
      } else {
        btn.className = 'px-5 py-2 rounded-lg text-slate-400 hover:text-white transition';
      }
    });

    contents.forEach((c, i) => {
      if (i === index) {
        c.classList.remove('hidden');
      } else {
        c.classList.add('hidden');
      }
    });
  }

  tab230Btn.addEventListener('click', () => activateTab(0));
  tabCorporateBtn.addEventListener('click', () => activateTab(1));
  tabDirectBtn.addEventListener('click', () => activateTab(2));

  // Copy IBAN Button
  const copyBtn = document.getElementById('copyIbanBtn');
  const ibanText = document.getElementById('ibanText');
  const copyLabel = document.getElementById('copyBtnLabel');

  if (copyBtn && ibanText) {
    copyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(ibanText.innerText.trim()).then(() => {
        if (copyLabel) copyLabel.textContent = 'Copiat cu succes!';
        copyBtn.classList.add('bg-brand-accent', 'text-black');
        setTimeout(() => {
          if (copyLabel) copyLabel.textContent = 'Copiază IBAN';
          copyBtn.classList.remove('bg-brand-accent', 'text-black');
        }, 3000);
      });
    });
  }
}

/* ==========================================================================
   MOBILE DRAWER NAVIGATION
   ========================================================================== */
function initMobileDrawer() {
  const openBtn = document.getElementById('mobileMenuBtn');
  const closeBtn = document.getElementById('closeMobileDrawer');
  const drawer = document.getElementById('mobileDrawer');
  if (!openBtn || !closeBtn || !drawer) return;

  openBtn.addEventListener('click', () => drawer.classList.add('active'));
  closeBtn.addEventListener('click', () => drawer.classList.remove('active'));

  drawer.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', () => drawer.classList.remove('active'));
  });
}
