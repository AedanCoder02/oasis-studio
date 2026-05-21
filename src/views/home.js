// src/views/home.js
// Hero → Marquee → Stats → Services (new numbered grid) → Work Showcase (3×2 grid) → Process Timeline → Testimonials → CTA

let observers = [];
let dragCleanup = null;
let timelineCleanup = null;
let tiltCleanup = null;
let colorJourneyCleanup = null;

const TECH_TAGS = [
  'Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Node.js',
  'Shopify', 'Framer', 'Figma', 'Vercel', 'Prisma', 'PostgreSQL', 'AWS',
];

const CAPABILITY_TAGS = [
  'Web Design', 'Branding Systems', 'E-Commerce', 'Content Strategy',
  'SEO Mastery', 'UI / UX', 'Digital Strategy', 'Performance', 'Analytics', 'CRO',
];

function buildMarqueeRow(tags, cls) {
  return [...tags, ...tags].map(t => `<span class="${cls}">${t}</span>`).join('');
}

// ---------------------------------------------------------------------------
// SVG icon set (line-art, 24×24 viewBox)
// ---------------------------------------------------------------------------
const ICONS = {
  radar: `<svg class="bcn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/><line x1="12" y1="2" x2="12" y2="4"/><line x1="22" y1="12" x2="20" y2="12"/></svg>`,
  code: `<svg class="bcn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="3" width="20" height="15" rx="2"/><line x1="2" y1="8" x2="22" y2="8"/><polyline points="7,13 9.5,15.5 7,18"/><line x1="12" y1="15" x2="16" y2="15"/></svg>`,
  nodes: `<svg class="bcn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>`,
  shield: `<svg class="bcn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9,12 11,14 15,10"/></svg>`,
};

// ---------------------------------------------------------------------------
// Work project helper
// ---------------------------------------------------------------------------
function workCard(url, name, cats, accentHex) {
  const rgba = hexToRgba(accentHex, 0.18);
  return `
    <article class="work-grid-card reveal">
      <div class="wgc-frame">
        <div class="wgc-chrome" aria-hidden="true">
          <span class="bc-dot bc-red"></span>
          <span class="bc-dot bc-yellow"></span>
          <span class="bc-dot bc-green"></span>
          <span class="wgc-url">${url}</span>
        </div>
        <div class="wgc-screen">
          <div class="wgc-glow" style="background:radial-gradient(ellipse at 50% 110%,${rgba},transparent 65%)"></div>
          <div class="wgc-line wgc-line--accent" style="background:${accentHex};opacity:.5"></div>
          <div class="wgc-line" style="width:70%"></div>
          <div class="wgc-line" style="width:50%"></div>
          <div class="wgc-line" style="width:82%"></div>
          <div class="wgc-btn"></div>
        </div>
      </div>
      <div class="wgc-meta">
        <div>
          <h3 class="wgc-name">${name}</h3>
          <p class="wgc-cats">${cats}</p>
        </div>
        <span class="wgc-arrow" aria-hidden="true">↗</span>
      </div>
    </article>`;
}

function hexToRgba(hex, alpha) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

function hexToRgb(hex) {
  return [parseInt(hex.slice(1,3),16), parseInt(hex.slice(3,5),16), parseInt(hex.slice(5,7),16)];
}

function lerpRgb(a, b, t) {
  return [
    Math.round(a[0] + (b[0]-a[0])*t),
    Math.round(a[1] + (b[1]-a[1])*t),
    Math.round(a[2] + (b[2]-a[2])*t),
  ];
}

function setupScrollColorJourney() {
  // Drive .ambient-background color directly — no injected divs, no new compositing
  // layers, so mix-blend-mode on the grain overlay is unaffected.
  // Hero stop matches the CSS default #BCA478 so there is zero visual change at load.
  const STOPS = [
    { sel: '.hero-section',          hex: '#BCA478' },
    { sel: '.marquee-section',       hex: '#130622' },
    { sel: '.home-services-section', hex: '#130622' },
    { sel: '.work-section',          hex: '#071510' },
    { sel: '.process-section',       hex: '#170508' },
    { sel: '.testimonials-section',  hex: '#060c1c' },
    { sel: '.cta-section',           hex: '#060c1c' },
  ];

  const ambientBg = document.querySelector('.ambient-background');
  if (!ambientBg) return () => {};

  const resolved = STOPS
    .map(s => ({ el: document.querySelector(s.sel), rgb: hexToRgb(s.hex) }))
    .filter(s => s.el);

  if (resolved.length < 2) return () => {};

  let raf = null;
  let dirty = false;

  const onScroll = () => { dirty = true; };

  const tick = () => {
    if (dirty) {
      dirty = false;
      const sample = window.scrollY + window.innerHeight * 0.5;
      let color = resolved[0].rgb;

      for (let i = 0; i < resolved.length - 1; i++) {
        const a = resolved[i];
        const b = resolved[i + 1];
        const aTop = a.el.offsetTop;
        const bTop = b.el.offsetTop;
        if (sample <= aTop) { color = a.rgb; break; }
        if (sample >= bTop) { color = b.rgb; continue; }
        const t = Math.max(0, Math.min(1, (sample - aTop) / (bTop - aTop)));
        color = lerpRgb(a.rgb, b.rgb, t);
        break;
      }

      const rgb = `rgb(${color[0]},${color[1]},${color[2]})`;
      ambientBg.style.background = rgb;
      document.documentElement.style.setProperty('--marquee-edge', rgb);
    }
    raf = requestAnimationFrame(tick);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  dirty = true;
  raf = requestAnimationFrame(tick);

  return () => {
    window.removeEventListener('scroll', onScroll);
    cancelAnimationFrame(raf);
    ambientBg.style.background = '';
    document.documentElement.style.removeProperty('--marquee-edge');
  };
}

// ---------------------------------------------------------------------------
// Template
// ---------------------------------------------------------------------------
function getTemplate() {
  const techRow = buildMarqueeRow(TECH_TAGS, 'marquee-tag');
  const capRow  = buildMarqueeRow(CAPABILITY_TAGS, 'marquee-tag marquee-tag--warm');

  return `
    <!-- ===================== HERO ===================== -->
    <section class="hero-section" id="hero">
      <div class="hero-content reveal">
        <p class="hero-eyebrow" data-i18n="heroEyebrow">Creative Studio</p>
        <h1 class="title-main" data-i18n="heroTitle">Navigate<br>Your Desert</h1>
        <p class="subtitle" data-i18n="heroSub">Find the definitive solutions for your business.</p>
        <div class="hero-actions">
          <a href="#contact" data-route="#contact" class="btn-main" data-i18n="ctaBtn">Transform My Business</a>
          <a href="#services" data-route="#services" class="btn-ghost" data-i18n="heroExplore">Explore Services</a>
        </div>
      </div>
      <div class="scroll-indicator" aria-hidden="true"><div class="scroll-line"></div></div>
    </section>

    <!-- ===================== MARQUEE ===================== -->
    <section class="marquee-section" aria-label="Technologies and capabilities">
      <div class="marquee-row">
        <div class="marquee-track marquee-track--fwd" aria-hidden="true">${techRow}</div>
      </div>
      <div class="marquee-row">
        <div class="marquee-track marquee-track--rev" aria-hidden="true">${capRow}</div>
      </div>
    </section>

    <!-- ===================== STATS ===================== -->
    <section class="stats-section" id="stats">
      <div class="stats-grid reveal">
        <div class="stat-item">
          <span class="stat-number" data-target="120">0</span><span class="stat-suffix">+</span>
          <span class="stat-label" data-i18n="statProjects">Projects Delivered</span>
        </div>
        <div class="stat-item">
          <span class="stat-number" data-target="45">0</span><span class="stat-suffix">+</span>
          <span class="stat-label" data-i18n="statClients">Active Clients</span>
        </div>
        <div class="stat-item">
          <span class="stat-number" data-target="98">0</span><span class="stat-suffix">%</span>
          <span class="stat-label" data-i18n="statSatisfaction">Client Satisfaction</span>
        </div>
        <div class="stat-item">
          <span class="stat-number" data-target="8">0</span><span class="stat-suffix">+</span>
          <span class="stat-label" data-i18n="statYears">Years of Experience</span>
        </div>
      </div>
    </section>

    <!-- ===================== SERVICES — NUMBERED GRID ===================== -->
    <section class="home-services-section" id="home-services">
      <div class="section-inner">
        <div class="section-header reveal">
          <p class="section-eyebrow" data-i18n="servicesEyebrow">What We Do</p>
          <h2 data-i18n="servicesHeading">Engineered for Impact</h2>
        </div>
      </div>
      <div class="bento-grid-n reveal">

        <div class="bento-card-n">
          <div class="bcn-top">
            <span class="bcn-num">0 1</span>
            ${ICONS.radar}
          </div>
          <h3 data-i18n="bentoTitle1">Branding</h3>
          <p data-i18n="bentoDesc1">Identify market needs with precision through our advanced brand radar analysis.</p>
        </div>

        <div class="bento-card-n">
          <div class="bcn-top">
            <span class="bcn-num">0 2</span>
            ${ICONS.code}
          </div>
          <h3 data-i18n="bentoTitle2">Web Design</h3>
          <p data-i18n="bentoDesc2">Immersive and performing code environments to elevate your digital product.</p>
        </div>

        <div class="bento-card-n">
          <div class="bcn-top">
            <span class="bcn-num">0 3</span>
            ${ICONS.nodes}
          </div>
          <h3 data-i18n="bentoTitle3">Content Managing</h3>
          <p data-i18n="bentoDesc3">Interconnected nodes to effortlessly distribute your message on every platform.</p>
        </div>

        <div class="bento-card-n">
          <div class="bcn-top">
            <span class="bcn-num">0 4</span>
            ${ICONS.shield}
          </div>
          <h3 data-i18n="bentoTitle4">Our Solutions</h3>
          <p data-i18n="bentoDesc4">Guaranteed enterprise workflows that generate true scalable impact.</p>
          <ul class="bcn-list">
            <li data-i18n="check1">Scalable Architecture</li>
            <li data-i18n="check2">SEO Optimization</li>
            <li data-i18n="check3">Conversion Rate</li>
            <li>Analytics & Insights</li>
          </ul>
        </div>

      </div>
    </section>

    <!-- ===================== WORK — 3×2 GRID ===================== -->
    <section class="work-section" id="work">
      <div class="section-inner">
        <div class="section-header reveal">
          <p class="section-eyebrow">Selected Work</p>
          <h2>Built for the Bold</h2>
          <p class="section-sub">Real projects. Real results. Built with the technology that scales.</p>
        </div>
        <div class="work-grid">
          ${workCard('link coming soon', 'Nextera Digital Store', 'E-Commerce · Shopify', '#B1D5F7')}
          ${workCard('link coming soon', 'Velora Analytics', 'SaaS · Dashboard', '#f2b880')}
          ${workCard('link coming soon', 'Meridian Brand System', 'Branding · Identity', '#ffd2fc')}
          ${workCard('link coming soon', 'Centris Media Hub', 'Content · SEO', '#38f9d7')}
          ${workCard('link coming soon', 'Ascendio Platform', 'Web Design · UX', '#B1D5F7')}
          ${workCard('link coming soon', 'Universe Media Co.', 'Digital · Strategy', '#f2b880')}
        </div>
      </div>
    </section>

    <!-- ===================== PROCESS — VERTICAL TIMELINE ===================== -->
    <section class="process-section" id="process">
      <div class="section-inner">
        <div class="section-header reveal">
          <p class="section-eyebrow" data-i18n="processEyebrow">How We Work</p>
          <h2 data-i18n="processHeading">From Vision to Reality</h2>
        </div>
        <div class="process-timeline-v">
          <div class="timeline-rail-bg" aria-hidden="true"></div>
          <div class="timeline-fill-line" id="timelineFill" aria-hidden="true"></div>

          <div class="timeline-step reveal">
            <div class="step-num-v" aria-hidden="true">01</div>
            <div class="timeline-dot" aria-hidden="true"></div>
            <div class="timeline-step-content">
              <h3 data-i18n="processStep1Title">Discovery</h3>
              <p data-i18n="processStep1Desc">We immerse ourselves in your brand, your market, and your audience to identify every strategic opportunity.</p>
            </div>
          </div>
          <div class="timeline-step reveal">
            <div class="step-num-v" aria-hidden="true">02</div>
            <div class="timeline-dot" aria-hidden="true"></div>
            <div class="timeline-step-content">
              <h3 data-i18n="processStep2Title">Strategy</h3>
              <p data-i18n="processStep2Desc">We craft a tailored roadmap that aligns your business goals with measurable digital outcomes.</p>
            </div>
          </div>
          <div class="timeline-step reveal">
            <div class="step-num-v" aria-hidden="true">03</div>
            <div class="timeline-dot" aria-hidden="true"></div>
            <div class="timeline-step-content">
              <h3 data-i18n="processStep3Title">Design &amp; Build</h3>
              <p data-i18n="processStep3Desc">Our team engineers immersive experiences with cutting-edge technology and premium aesthetics.</p>
            </div>
          </div>
          <div class="timeline-step reveal">
            <div class="step-num-v" aria-hidden="true">04</div>
            <div class="timeline-dot" aria-hidden="true"></div>
            <div class="timeline-step-content">
              <h3 data-i18n="processStep4Title">Launch &amp; Scale</h3>
              <p data-i18n="processStep4Desc">We deploy, monitor, and optimize continuously so your digital presence keeps growing.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ===================== TESTIMONIALS — 3-COL EQUAL ===================== -->
    <section class="testimonials-section" id="testimonials">
      <div class="section-inner">
        <div class="section-header reveal">
          <p class="section-eyebrow" data-i18n="testimonialsEyebrow">Client Voices</p>
          <h2 data-i18n="testimonialsHeading">What They Say About Us</h2>
        </div>
        <div class="testimonials-grid reveal">
          <article class="testimonial-card">
            <div class="testimonial-stars" aria-label="5 stars">★★★★★</div>
            <blockquote data-i18n="testimonial1">"Oasis Studio transformed our entire digital identity. The attention to detail and the immersive design exceeded every expectation."</blockquote>
            <div class="testimonial-author">
              <div class="author-avatar">ML</div>
              <div><strong>María López</strong><span>CEO, Nextera Digital</span></div>
            </div>
          </article>
          <article class="testimonial-card">
            <div class="testimonial-stars" aria-label="5 stars">★★★★★</div>
            <blockquote data-i18n="testimonial2">"They don't just build websites — they engineer experiences. Our conversion rate increased 340% in the first quarter."</blockquote>
            <div class="testimonial-author">
              <div class="author-avatar" style="background:var(--light-caramel);color:#000">CR</div>
              <div><strong>Carlos Restrepo</strong><span>CTO, Velora Tech</span></div>
            </div>
          </article>
          <article class="testimonial-card">
            <div class="testimonial-stars" aria-label="5 stars">★★★★★</div>
            <blockquote data-i18n="testimonial3">"Working with Oasis felt like partnering with a team that truly understands brand storytelling at the highest level."</blockquote>
            <div class="testimonial-author">
              <div class="author-avatar" style="background:var(--petal-frost);color:#000">AP</div>
              <div><strong>Ana Pereira</strong><span>Director, Meridian Group</span></div>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- ===================== CTA ===================== -->
    <section class="cta-section" id="cta">
      <div class="cta-glow" aria-hidden="true"></div>
      <div class="cta-content reveal">
        <h2 class="cta-title" data-i18n="ctaTitle">Welcome to<br>the Oasis</h2>
        <p class="cta-subtitle" data-i18n="ctaSub">Your business is ready to flourish. Let's build the future together.</p>
        <a href="#contact" data-route="#contact" class="btn-main btn-large" data-i18n="ctaBtn">Transform My Business</a>
      </div>
    </section>
  `;
}

// ---------------------------------------------------------------------------
// Stat counter
// ---------------------------------------------------------------------------
function animateStats(container) {
  container.querySelectorAll('.stat-number').forEach(el => {
    const target = parseInt(el.dataset.target, 10);
    const duration = 2000;
    const start = performance.now();
    function step(now) {
      const p = Math.min((now - start) / duration, 1);
      el.textContent = Math.floor((1 - Math.pow(1 - p, 3)) * target);
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  });
}

// ---------------------------------------------------------------------------
// Scroll reveal
// ---------------------------------------------------------------------------
function setupScrollReveal(container) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        if (entry.target.closest('.stats-section')) animateStats(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  container.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  observers.push(observer);
}

// ---------------------------------------------------------------------------
// 3D card tilt — bento cards + work grid frames
// ---------------------------------------------------------------------------
function setupCardTilt(container) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (window.matchMedia('(pointer: coarse)').matches) return;

  const cleanupFns = [];

  // Bento numbered cards
  container.querySelectorAll('.bento-card-n').forEach(card => {
    const onMove = (e) => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      card.style.transition = 'transform 0.05s linear, box-shadow 0.05s linear';
      card.style.transform = `perspective(1100px) rotateX(${y * -6}deg) rotateY(${x * 6}deg) translateZ(6px)`;
    };
    const onLeave = () => {
      card.style.transition = 'transform 0.5s cubic-bezier(0.16,1,0.3,1), box-shadow 0.5s ease';
      card.style.transform = '';
    };
    card.addEventListener('mousemove', onMove);
    card.addEventListener('mouseleave', onLeave);
    cleanupFns.push(() => {
      card.removeEventListener('mousemove', onMove);
      card.removeEventListener('mouseleave', onLeave);
    });
  });

  // Work grid frames
  container.querySelectorAll('.work-grid-card').forEach(card => {
    const frame = card.querySelector('.wgc-frame');
    if (!frame) return;
    const onMove = (e) => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      frame.style.transition = 'transform 0.05s linear';
      frame.style.transform = `perspective(900px) rotateX(${y * -5}deg) rotateY(${x * 5}deg) translateY(-6px)`;
    };
    const onLeave = () => {
      frame.style.transition = 'transform 0.5s cubic-bezier(0.16,1,0.3,1)';
      frame.style.transform = '';
    };
    card.addEventListener('mousemove', onMove);
    card.addEventListener('mouseleave', onLeave);
    cleanupFns.push(() => {
      card.removeEventListener('mousemove', onMove);
      card.removeEventListener('mouseleave', onLeave);
    });
  });

  tiltCleanup = () => cleanupFns.forEach(fn => fn());
}

// ---------------------------------------------------------------------------
// Timeline fill driven by scroll position
// ---------------------------------------------------------------------------
function setupTimelineFill(container) {
  const fillLine = container.querySelector('#timelineFill');
  const section  = container.querySelector('#process');
  if (!fillLine || !section) return;

  const update = () => {
    const rect = section.getBoundingClientRect();
    const vh = window.innerHeight;
    const progress = Math.max(0, Math.min(1,
      (vh * 0.6 - rect.top) / (rect.height - vh * 0.3),
    ));
    fillLine.style.height = `${progress * 100}%`;
  };

  window.addEventListener('scroll', update, { passive: true });
  update();
  timelineCleanup = () => window.removeEventListener('scroll', update);
}

// ---------------------------------------------------------------------------
// Mount / Unmount
// ---------------------------------------------------------------------------
export function mount(container) {
  window.scrollTo(0, 0);
  container.innerHTML = getTemplate();

  container.querySelectorAll('a[data-route]').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      window.location.hash = link.getAttribute('data-route');
    });
  });

  requestAnimationFrame(() => {
    setupScrollReveal(container);
    setupCardTilt(container);
    setupTimelineFill(container);
    colorJourneyCleanup = setupScrollColorJourney();
  });
}

export function unmount() {
  observers.forEach(obs => obs.disconnect());
  observers = [];
  if (dragCleanup)         { dragCleanup();         dragCleanup = null; }
  if (timelineCleanup)     { timelineCleanup();     timelineCleanup = null; }
  if (tiltCleanup)         { tiltCleanup();         tiltCleanup = null; }
  if (colorJourneyCleanup) { colorJourneyCleanup(); colorJourneyCleanup = null; }
}
