// src/views/services.js

let tweens = [];

const SERVICES = [
  {
    num: '01',
    name: 'Branding',
    tag: 'Identity Systems',
    desc: 'We craft visual identities that are impossible to ignore. From strategy and naming to logo systems and brand guidelines — every element engineered to resonate with your audience and outlast trends.',
    deliverables: ['Brand Strategy', 'Logo & Visual Identity', 'Typography & Color Systems', 'Brand Guidelines', 'Collateral Design'],
  },
  {
    num: '02',
    name: 'Web Design & Dev',
    tag: 'Digital Experiences',
    desc: 'We design and build websites that operate as your highest-performing sales asset. Immersive aesthetics, flawless performance, and conversion architecture — deployed on modern infrastructure that scales.',
    deliverables: ['UI/UX Design', 'Custom Development', 'Shopify & E-Commerce', 'CMS Integration', 'Performance Optimization'],
  },
  {
    num: '03',
    name: 'Content Strategy',
    tag: 'Multi-Platform',
    desc: 'Content that earns attention and keeps it. We build editorial systems, produce high-value assets, and distribute your message across every relevant channel with the precision your brand deserves.',
    deliverables: ['Content Roadmapping', 'Copywriting & Editing', 'SEO Content', 'Social Media Systems', 'Video & Visual Production'],
  },
  {
    num: '04',
    name: 'Growth & Analytics',
    tag: 'Revenue Optimization',
    desc: 'We instrument your digital presence with the data infrastructure needed to make every decision confidently. Continuous optimization loops that compound improvements month over month.',
    deliverables: ['Analytics Setup & Audit', 'SEO Strategy', 'Conversion Rate Optimization', 'A/B Testing', 'Performance Reporting'],
  },
];

export function mount(container) {
  window.scrollTo(0, 0);

  const items = SERVICES.map(s => `
    <div class="svc-item svc-item--page">
      <span class="svc-num">${s.num}</span>
      <div class="svc-body">
        <div class="svc-head-row">
          <h2 class="svc-name">${s.name}</h2>
          <span class="svc-tag">${s.tag}</span>
        </div>
        <p class="svc-desc">${s.desc}</p>
        <ul class="svc-deliverables">
          ${s.deliverables.map(d => `<li>${d}</li>`).join('')}
        </ul>
      </div>
    </div>
  `).join('');

  container.innerHTML = `
    <div class="view-page services-page" role="main" aria-label="Services">

      <!-- ── HERO TEXT ── -->
      <div class="view-hero-text">
        <p class="section-eyebrow" data-i18n="servicesEyebrow">What We Do</p>
        <h1 data-i18n="servicesPageTitle">Engineered<br>for Impact</h1>
        <p class="section-sub" data-i18n="servicesPageSub">Comprehensive solutions designed to elevate your digital presence and drive measurable business growth.</p>
      </div>

      <!-- ── SERVICES LIST ── -->
      <div class="services-list services-list--page">
        ${items}
      </div>

      <!-- ── CTA ── -->
      <div class="svc-page-cta">
        <h2 data-i18n="svcCtaTitle">Ready to start a project?</h2>
        <p data-i18n="svcCtaSub">Tell us about your vision and we'll tell you exactly how we'll bring it to life.</p>
        <a href="#contact" data-route="#contact" class="btn-main" data-i18n="ctaBtn">Transform My Business</a>
      </div>

    </div>
  `;

  container.querySelectorAll('a[data-route]').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      window.location.hash = link.getAttribute('data-route');
    });
  });

  requestAnimationFrame(() => {
    const { gsap } = window;
    if (!gsap) return;
    tweens.push(gsap.from('.view-hero-text h1', { y: 40, opacity: 0, duration: 0.8, ease: 'power3.out' }));
    tweens.push(gsap.from('.svc-item--page', { y: 30, opacity: 0, duration: 0.6, stagger: 0.12, delay: 0.2, ease: 'power3.out' }));
  });
}

export function unmount() {
  const { gsap } = window;
  if (gsap) tweens.forEach(t => t.kill());
  tweens = [];
}
