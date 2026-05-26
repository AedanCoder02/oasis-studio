// src/views/services.js

let tweens = [];

const SERVICES = [
  {
    num: '01',
    name: 'Web Pages',
    tag: 'Digital Experiences',
    desc: 'Sites conceived as a product, not a brochure. We design and build websites that operate as your highest-performing sales asset — immersive aesthetics, flawless performance, and conversion architecture deployed on modern infrastructure that scales.',
    deliverables: ['UI/UX Design', 'Custom Development', 'Shopify & E-Commerce', 'CMS Integration', 'Performance Optimization'],
  },
  {
    num: '02',
    name: 'Social Media',
    tag: 'Organic & Paid',
    desc: 'Organic growth and Meta Ads operating as a single engine. We build accounts that grow with discernment, not with dashboards — editorial systems that earn attention and convert it into community.',
    deliverables: ['Content Strategy', 'Community Management', 'Meta Ads', 'Analytics & Reporting', 'Brand Voice'],
  },
  {
    num: '03',
    name: 'Editorial Direction',
    tag: 'Multi-Platform',
    desc: 'Sustained content systems built for longevity. Voice, rhythm, and narrative — no one-off campaigns. We build editorial frameworks that distribute your message across every relevant channel with the precision your brand deserves.',
    deliverables: ['Content Roadmapping', 'Copywriting & Editing', 'SEO Content', 'Visual Direction', 'Brand Guidelines'],
  },
  {
    num: '04',
    name: 'Digital Infrastructure',
    tag: 'Revenue Optimization',
    desc: 'The technical base that supports all of the above. Stable, measurable, proprietary. We instrument your digital presence with the data infrastructure needed to make every decision confidently — optimization loops that compound month over month.',
    deliverables: ['Analytics Setup', 'SEO Strategy', 'Conversion Rate Optimization', 'A/B Testing', 'Performance Reporting'],
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
      <div class="view-page-inner">

        <div class="view-hero-text">
          <span class="section-eyebrow">What We Do</span>
          <h1>Engineered<br>for Impact</h1>
          <p class="section-sub">Four fronts that work together as a single system.</p>
        </div>

        <div class="services-list services-list--page">
          ${items}
        </div>

        <div class="svc-page-cta">
          <h2>Ready to start a project?</h2>
          <p>Tell us about your vision and we'll tell you exactly how we'll bring it to life.</p>
          <a href="#contact" data-route="#contact" class="btn-main">Transform My Business</a>
        </div>

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
