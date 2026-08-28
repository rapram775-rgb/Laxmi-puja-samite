'use strict';

/*
 * CONTENT CONFIGURATION
 * Replace demo/placeholder records with the committee's verified information
 * before publishing the site as an official public website.
 */
const committee = [
  ['Committee Member 01', 'अध्यक्ष'],
  ['Committee Member 02', 'उपाध्यक्ष'],
  ['Committee Member 03', 'सचिव'],
  ['Committee Member 04', 'कोषाध्यक्ष'],
  ['Committee Member 05', 'कार्यक्रम संयोजक'],
  ['Committee Member 06', 'पूजा संयोजक'],
  ['Committee Member 07', 'सांस्कृतिक संयोजक'],
  ['Committee Member 08', 'स्वयंसेवक संयोजक'],
  ['Committee Member 09', 'सम्पर्क संयोजक'],
  ['Committee Member 10', 'समिति सदस्य']
];

const donors = [
  ['Donor Name 01', 'महालक्ष्मी'],
  ['Donor Name 02', 'गणेश'],
  ['Donor Name 03', 'सरस्वती'],
  ['Donor Name 04', 'शिव'],
  ['Donor Name 05', 'विष्णु'],
  ['Donor Name 06', 'दुर्गा'],
  ['Donor Name 07', 'हनुमान'],
  ['Donor Name 08', 'कृष्ण'],
  ['Donor Name 09', 'राम'],
  ['Donor Name 10', 'सीता'],
  ['Donor Name 11', 'पार्वती'],
  ['Donor Name 12', 'काली'],
  ['Donor Name 13', 'नारायण'],
  ['Donor Name 14', 'राधा'],
  ['Donor Name 15', 'कार्तिकेय']
];

const programs = [
  ['DAY 01', 'तयारी तथा सरसफाइ', 'पूजा स्थल सरसफाइ, सजावट, सामग्री तयारी र स्वयंसेवक समन्वय।', 'PREPARATION'],
  ['DAY 02', 'कलश तथा संकल्प', 'शुभारम्भ, कलश स्थापना, संकल्प तथा सामूहिक प्रार्थना।', 'OPENING'],
  ['DAY 03', 'भजन तथा सांस्कृतिक साँझ', 'भजन, धार्मिक संगीत, बाल सहभागिता तथा सांस्कृतिक प्रस्तुति।', 'CULTURE'],
  ['DAY 04', 'लक्ष्मी पूजा तयारी', 'अन्तिम सजावट, प्रसाद, पूजा सामग्री र दीप प्रज्वलनको तयारी।', 'PUJA PREP'],
  ['DAY 05', 'मुख्य लक्ष्मी पूजा', 'विशेष पूजा, आरती, प्रार्थना तथा प्रसाद वितरण।', 'MAIN PUJA'],
  ['DAY 06', 'समुदाय तथा धन्यवाद', 'सामुदायिक सेवा, भजन, दाता सम्मान र धन्यवाद कार्यक्रम।', 'GRATITUDE'],
  ['DAY 07', 'समापन तथा आशीर्वाद', 'अन्तिम आरती, धन्यवाद, व्यवस्थापन समीक्षा र समापन।', 'CLOSING']
];

const memoryCategories = ['puja', 'community', 'culture', 'puja', 'community', 'puja', 'culture', 'puja', 'community', 'culture', 'puja', 'community'];

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

// Committee cards
const committeeGrid = $('#committeeGrid');
committee.forEach(([name, role]) => {
  committeeGrid.insertAdjacentHTML('beforeend', `
    <article class="person-card">
      <div class="person-photo" aria-label="Committee member photo placeholder">PHOTO</div>
      <div class="person-info">
        <h3>${escapeHtml(name)}</h3>
        <p>${escapeHtml(role)}</p>
      </div>
    </article>`);
});

// Donor cards
const donorGrid = $('#donorGrid');
donors.forEach(([name, deity], i) => {
  donorGrid.insertAdjacentHTML('beforeend', `
    <article class="donor-card ${i < 10 ? 'visible' : ''}" data-deity="${escapeHtml(deity)}">
      <div class="donor-photo deity-${i + 1}">
        <span>DONOR</span>
        <strong>${escapeHtml(deity)}</strong>
      </div>
      <div class="donor-info">
        <h3>${escapeHtml(name)}</h3>
        <p>Verified donor record required</p>
      </div>
    </article>`);
});

const donorMore = $('#donorMore');
donorMore.addEventListener('click', () => {
  const hidden = $$('.donor-card:not(.visible)');
  const opening = hidden.length > 0;
  $$('.donor-card').forEach((card, i) => card.classList.toggle('visible', opening || i < 10));
  donorMore.innerHTML = opening ? 'Show Fewer Donors <b>↑</b>' : 'See More Donors <b>→</b>';
});

// Program list
const programList = $('#programList');
programs.forEach(([day, title, desc, tag]) => {
  programList.insertAdjacentHTML('beforeend', `
    <article class="program-item">
      <div class="day">${escapeHtml(day)}</div>
      <div><h3>${escapeHtml(title)}</h3><p>${escapeHtml(desc)}</p></div>
      <div class="program-tag">${escapeHtml(tag)}</div>
    </article>`);
});

// Memories filter
const memoryGrid = $('#memoryGrid');
memoryCategories.forEach((category, index) => {
  memoryGrid.insertAdjacentHTML('beforeend', `
    <div class="memory-item" data-category="${escapeHtml(category)}" aria-label="Memory photo placeholder ${index + 1}">
      <span>PHOTO</span>
    </div>`);
});

$$('.filters button').forEach(button => button.addEventListener('click', () => {
  $$('.filters button').forEach(item => item.classList.remove('active'));
  button.classList.add('active');
  const filter = button.dataset.filter;
  $$('.memory-item').forEach(item => {
    item.classList.toggle('hidden', filter !== 'all' && item.dataset.category !== filter);
  });
}));

// Mobile navigation
const nav = $('#mainNav');
const menu = $('.menu-btn');
menu.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menu.setAttribute('aria-expanded', String(open));
});

$$('.nav a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menu.setAttribute('aria-expanded', 'false');
}));

// Front-end-only donation demo storage. This is intentionally not presented as a backend.
const form = $('#donationForm');
const status = $('#formStatus');
form.addEventListener('submit', event => {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(form).entries());

  try {
    const raw = localStorage.getItem('shreeLaxmiDonations');
    const saved = raw ? JSON.parse(raw) : [];
    if (!Array.isArray(saved)) throw new Error('Invalid storage format');
    saved.push({ ...data, createdAt: new Date().toISOString() });
    localStorage.setItem('shreeLaxmiDonations', JSON.stringify(saved));
    status.textContent = 'धन्यवाद। विवरण यो browser मा demo का लागि सुरक्षित भयो। वास्तविक submission का लागि backend जोड्नुहोस्।';
    form.reset();
  } catch (error) {
    console.error('Donation demo storage failed:', error);
    status.textContent = 'विवरण सुरक्षित गर्न सकिएन। कृपया फेरि प्रयास गर्नुहोस्।';
  }
});

// Modal
const backdrop = $('#modalBackdrop');
const modalBody = $('#modalBody');
const modalTitle = $('#modalTitle');
const modalClose = $('#modalClose');
let lastFocusedElement = null;

function closeModal() {
  backdrop.hidden = true;
  if (lastFocusedElement) lastFocusedElement.focus();
}

function showModal(type, trigger) {
  lastFocusedElement = trigger || document.activeElement;
  backdrop.hidden = false;

  if (type === 'donors') {
    modalTitle.textContent = 'Donor Name List';
    modalBody.innerHTML = `
      <p>प्रकाशित गर्नु अघि सबै donor records समितिबाट verify गर्नुहोस्।</p>
      <div class="table-wrap"><table class="modal-table">
        <thead><tr><th>#</th><th>Donor Name</th><th>Reference</th></tr></thead>
        <tbody>${donors.map((d, i) => `
          <tr><td>${String(i + 1).padStart(2, '0')}</td><td>${escapeHtml(d[0])}</td><td>${escapeHtml(d[1])}</td></tr>`).join('')}</tbody>
      </table></div>`;
  } else {
    modalTitle.textContent = 'View Puja Expense';
    const rows = [
      ['Venue & Decoration', 'To be updated'],
      ['Puja Materials', 'To be updated'],
      ['Prasad & Community Meal', 'To be updated'],
      ['Cultural Program', 'To be updated'],
      ['Lighting & Sound', 'To be updated'],
      ['Other Expenses', 'To be updated']
    ];
    modalBody.innerHTML = `
      <p>समितिको verified हिसाब उपलब्ध भएपछि मात्र वास्तविक रकम प्रकाशित गर्नुहोस्।</p>
      <div class="table-wrap"><table class="modal-table">
        <thead><tr><th>Category</th><th>Amount</th></tr></thead>
        <tbody>${rows.map(([label, amount]) => `<tr><td>${escapeHtml(label)}</td><td>${escapeHtml(amount)}</td></tr>`).join('')}</tbody>
      </table></div>`;
  }

  modalClose.focus();
}

$$('[data-modal]').forEach(button => button.addEventListener('click', () => showModal(button.dataset.modal, button)));
modalClose.addEventListener('click', closeModal);
backdrop.addEventListener('click', event => { if (event.target === backdrop) closeModal(); });
document.addEventListener('keydown', event => {
  if (backdrop.hidden) return;
  if (event.key === 'Escape') closeModal();
  if (event.key === 'Tab') {
    const focusable = $$('button, a, input, textarea, [tabindex]:not([tabindex="-1"])', backdrop).filter(el => !el.disabled);
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  }
});

// Prevent stale hash navigation from leaving the mobile menu open on initial load.
window.addEventListener('pageshow', () => {
  nav.classList.remove('open');
  menu.setAttribute('aria-expanded', 'false');
});
