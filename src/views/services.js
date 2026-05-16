// --- src/views/services.js ---
import servicesData from '../data/services.json';

let tweens = [];

const ICONS = {
  'branding': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1" fill="currentColor" stroke="none"/><line x1="12" y1="2" x2="12" y2="5"/><line x1="12" y1="19" x2="12" y2="22"/><line x1="2" y1="12" x2="5" y2="12"/><line x1="19" y1="12" x2="22" y2="12"/></svg>`,
  'web-design': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="18" rx="2"/><line x1="2" y1="8" x2="22" y2="8"/><polyline points="7 13 10 16 7 19"/><line x1="13" y1="19" x2="17" y2="19"/></svg>`,
  'content-managing': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>`,
  'solutions': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>`,
};

const NUMS = ['01', '02', '03', '04'];

function renderCard(service, i) {
  return `
    <div class="feature-card" tabindex="0" role="article" aria-labelledby="svc-${service.id}">
      <div class="feature-card-top">
        <span class="feature-number">${NUMS[i]}</span>
        <div class="feature-icon">${ICONS[service.id] || ''}</div>
      </div>
      <h3 id="svc-${service.id}" data-i18n="${service.titleKey}">${service.titleKey}</h3>
      <p data-i18n="${service.descKey}">${service.descKey}</p>
      <span class="feature-badge">${service.tag}</span>
    </div>
  `;
}

export function mount(container) {
  window.scrollTo(0, 0);

  const cards = servicesData.services.map(renderCard).join('');

  container.innerHTML = `
    <div class="view-page" role="main" aria-label="Services">
      <div class="view-page-inner">
        <div class="section-header view-page-header">
          <p class="section-eyebrow" data-i18n="servicesEyebrow">What We Do</p>
          <h1 data-i18n="servicesPageTitle">Our Services</h1>
          <p class="section-sub" data-i18n="servicesPageSub">Comprehensive solutions designed to elevate your digital presence.</p>
        </div>
        <div class="services-feature-grid">
          ${cards}
        </div>
      </div>
    </div>
  `;

  requestAnimationFrame(() => {
    const { gsap } = window;
    if (!gsap) return;
    const els = container.querySelectorAll('.feature-card');
    tweens.push(gsap.from(els, { y: 30, opacity: 0, duration: 0.5, stagger: 0.1, ease: 'power3.out' }));
  });
}

export function unmount() {
  const { gsap } = window;
  if (gsap) tweens.forEach(t => t.kill());
  tweens = [];
}
