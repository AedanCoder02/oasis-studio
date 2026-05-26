// src/views/home.js
// Editorial home — ink/bone/sand palette, 8 sections

let observers = [];
let tiltCleanup = null;
let heroMorphCleanup = null;

// ---------------------------------------------------------------------------
// Work card helper
// ---------------------------------------------------------------------------
function workCard(url, name, cats, accentHex) {
  const rgba = hexToRgba(accentHex, 0.12);
  const displayUrl = url.replace(/^https?:\/\//, '').replace(/\/$/, '');
  const screenshot = `https://image.thum.io/get/viewportWidth/1280/width/1280/crop/720/${url}`;
  return `
    <article class="work-grid-card reveal">
      <a class="wgc-link" href="${url}" target="_blank" rel="noopener noreferrer" aria-label="Open ${name}">
        <div class="wgc-frame">
          <div class="wgc-chrome" aria-hidden="true">
            <span class="bc-dot bc-red"></span>
            <span class="bc-dot bc-yellow"></span>
            <span class="bc-dot bc-green"></span>
            <span class="wgc-url">${displayUrl}</span>
          </div>
          <div class="wgc-screen">
            <img class="wgc-screenshot" src="${screenshot}" alt="${name} website preview" loading="lazy" />
            <div class="wgc-screen-tint" style="background:linear-gradient(to top,${rgba} 0%,transparent 55%)"></div>
          </div>
        </div>
        <div class="wgc-meta">
          <div>
            <h3 class="wgc-name">${name}</h3>
            <p class="wgc-cats">${cats}</p>
          </div>
          <span class="wgc-arrow" aria-hidden="true">↗</span>
        </div>
      </a>
    </article>`;
}

function hexToRgba(hex, alpha) {
  const r = parseInt(hex.slice(1,3),16);
  const g = parseInt(hex.slice(3,5),16);
  const b = parseInt(hex.slice(5,7),16);
  return `rgba(${r},${g},${b},${alpha})`;
}

// ---------------------------------------------------------------------------
// Hero logo morph
// ---------------------------------------------------------------------------
function setupHeroLogoMorph() {
  const heroLogo = document.querySelector('.hero-logo-large');
  const navLogoWrap = document.querySelector('nav a.logo');
  const heroSection = document.querySelector('.hero-section');
  if (!heroLogo || !navLogoWrap || !heroSection) return () => {};

  navLogoWrap.style.opacity = '0';
  navLogoWrap.style.transition = 'opacity 0.3s ease';
  navLogoWrap.style.pointerEvents = 'none';

  let raf = null;
  let dirty = true;

  const onScroll = () => { dirty = true; };

  const tick = () => {
    if (dirty) {
      dirty = false;
      const heroH = heroSection.offsetHeight;
      const t = Math.max(0, Math.min(1, window.scrollY / (heroH * 0.55)));
      heroLogo.style.opacity = String(Math.max(0, 1 - t * 2));
      heroLogo.style.transform = `translateY(${-t * 30}px) scale(${1 - t * 0.1})`;
      const navT = Math.max(0, (t - 0.45) / 0.55);
      navLogoWrap.style.opacity = String(navT);
      navLogoWrap.style.pointerEvents = navT > 0.5 ? 'auto' : 'none';
    }
    raf = requestAnimationFrame(tick);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  raf = requestAnimationFrame(tick);

  return () => {
    window.removeEventListener('scroll', onScroll);
    cancelAnimationFrame(raf);
    navLogoWrap.style.opacity = '';
    navLogoWrap.style.transition = '';
    navLogoWrap.style.pointerEvents = '';
    if (heroLogo) { heroLogo.style.opacity = ''; heroLogo.style.transform = ''; }
  };
}

// ---------------------------------------------------------------------------
// Scroll reveal
// ---------------------------------------------------------------------------
function setupScrollReveal(container) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  container.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  observers.push(observer);
}

// ---------------------------------------------------------------------------
// Bar chart animations
// ---------------------------------------------------------------------------
function setupBarAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.querySelectorAll('.hbar-fill[data-pct]').forEach(bar => {
        requestAnimationFrame(() => { bar.style.width = bar.dataset.pct; });
      });
      entry.target.querySelectorAll('.vbar-bar[data-h]').forEach(bar => {
        requestAnimationFrame(() => { bar.style.height = bar.dataset.h; });
      });
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.35 });

  document.querySelectorAll('.dashboard-grid').forEach(el => observer.observe(el));
  observers.push(observer);
}

// ---------------------------------------------------------------------------
// Card tilt (desktop)
// ---------------------------------------------------------------------------
function setupCardTilt(container) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (window.matchMedia('(pointer: coarse)').matches) return;
  const cleanupFns = [];
  container.querySelectorAll('.work-grid-card').forEach(card => {
    const frame = card.querySelector('.wgc-frame');
    if (!frame) return;
    const onMove = (e) => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      frame.style.transition = 'transform 0.05s linear';
      frame.style.transform = `perspective(900px) rotateX(${y*-4}deg) rotateY(${x*4}deg) translateY(-4px)`;
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
// Template
// ---------------------------------------------------------------------------
function getTemplate() {
  return `
    <!-- HERO -->
    <section class="hero-section" id="hero">
      <div class="hero-content reveal">
        <div class="hero-logo-wrap">
          <img src="/logo-white.png" alt="Oasis Studio" class="hero-logo-large" />
        </div>
        <p class="subtitle">Find the definitive solutions for your business.</p>
        <div class="hero-actions">
          <a href="#contact" data-route="#contact" class="btn-main">Transform My Business</a>
          <a href="#services" data-route="#services" class="btn-ghost">Explore Services</a>
        </div>
      </div>
      <div class="scroll-indicator" aria-hidden="true"><div class="scroll-line"></div></div>
    </section>

    <!-- ABOUT -->
    <section class="ed-section ed-section--ink-deep" id="about-home">
      <div class="ed-inner">
        <span class="ed-label">About the Studio</span>
        <h2 class="ed-h2 reveal">A studio that designs for brands that already know what to say.</h2>
        <p class="ed-p reveal" style="margin-top:2rem">We work with brands in the United States, Latin America, and Europe on websites, social media, editorial direction, and digital infrastructure. Few clients at a time. By choice.</p>
      </div>
    </section>

    <!-- WHAT WE DO -->
    <section class="ed-section" id="what-we-do">
      <div class="ed-inner">
        <span class="ed-label">What We Do</span>
        <h2 class="ed-h2 reveal">We build <em class="ed-em">measurable reach</em> around brands with something real to say.</h2>
        <p class="ed-p reveal" style="margin-top:2rem">We operate across four fronts that work together: websites, social media, editorial direction, and digital infrastructure. We do not offer standalone services — we offer the discernment that makes them function as a single system.</p>
      </div>
    </section>

    <!-- PILLARS -->
    <section class="ed-section ed-section--ink-deep" id="pillars">
      <div class="ed-inner">
        <span class="ed-label">Pillars</span>
        <ul class="pillars-list">
          <li class="pillar-row reveal">
            <h3 class="pillar-name">Web Pages</h3>
            <p class="pillar-desc">— Sites conceived as a product, not a brochure. Performance, clarity, and narrative in a single piece.</p>
          </li>
          <li class="pillar-row reveal">
            <h3 class="pillar-name">Social Media</h3>
            <p class="pillar-desc">— Organic growth and Meta Ads operating as a single engine. Accounts that grow with discernment, not with dashboards.</p>
          </li>
          <li class="pillar-row reveal">
            <h3 class="pillar-name">Editorial Direction</h3>
            <p class="pillar-desc">— Sustained content systems. Voice, rhythm, and narrative. No one-off campaigns.</p>
          </li>
          <li class="pillar-row reveal" style="border-bottom:1px solid var(--rule)">
            <h3 class="pillar-name">Digital Infrastructure</h3>
            <p class="pillar-desc">— The technical base that supports all of the above. Stable, measurable, proprietary.</p>
          </li>
        </ul>
      </div>
    </section>

    <!-- WORK / PORTFOLIO -->
    <section class="ed-section work-section" id="work">
      <div class="ed-inner">
        <span class="ed-label">Selected Work</span>
        <h2 class="ed-h2 reveal" style="margin-bottom:3rem">Built for the bold.</h2>
        <div class="work-grid">
          ${workCard('https://kimonatelier.com/', 'Kimona Telier', 'E-Commerce · Shopify', '#f2b880')}
          ${workCard('https://www.thelegacyholding.com/', 'The Legacy Holding', 'Corporate · Real Estate', '#B1D5F7')}
          ${workCard('https://by0gch-qd.myshopify.com/', 'Oasis Yacht Club', 'Luxury · Marine', '#ffd2fc')}
          ${workCard('https://universe-media-two.vercel.app/', 'Universe Media', 'News · Digital Media', '#B1D5F7')}
          ${workCard('https://ishinacademy.framer.website/', 'Ishin Academy', 'Education · Framer', '#f2b880')}
          ${workCard('https://glimmerandglow.lovable.app/', 'Glimmer &amp; Glow', 'Beauty · Lifestyle', '#ffd2fc')}
        </div>
      </div>
    </section>

    <!-- MIAMI DIARIO — PROFILE -->
    <section class="ed-section ed-section--ink-deep case-section" id="case-miami">
      <div class="ed-inner">
        <div class="case-layout">
          <div class="case-left">
            <span class="ed-label">Case · @miamidiario</span>
            <h2 class="case-h2 reveal">Miami Diario</h2>
            <p class="case-scope">Social Media · Editorial</p>
            <p class="case-one-liner reveal">Digital media outlet from Miami. We operate their organic growth and paid campaigns on Meta as a single system. Consolidated audience over 250k followers and sustained monthly reach in the millions.</p>
            <a href="https://www.instagram.com/miamidiario/" target="_blank" rel="noopener noreferrer" class="case-link">View on Instagram ↗</a>
          </div>
          <div class="case-right">
            <div class="ig-frame">
              <iframe
                src="https://www.instagram.com/miamidiario/embed"
                loading="lazy"
                scrolling="no"
                allow="encrypted-media"
                class="ig-embed"
                title="@miamidiario on Instagram"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- MIAMI DIARIO — DASHBOARD -->
    <section class="ed-section ed-section--ink-deep dash-section" id="dash-miami" style="padding-top:0">
      <div class="ed-inner">
        <div class="dash-header">
          <div>
            <span class="ed-label" style="margin-bottom:16px">Results · @miamidiario</span>
            <h3 class="dash-h3 reveal">Consolidated audience with over 7M monthly reach.</h3>
            <p class="dash-subtitle">Viral spike in February, sustained floor in the millions. Spikes of 15–16M in peak months.</p>
          </div>
          <span class="dash-pill">FEB — MAY · 2026</span>
        </div>
        <div class="kpi-row">
          <div class="kpi-item">
            <span class="kpi-value">7.9M</span>
            <span class="kpi-label">Visualizations · 30d</span>
            <span class="kpi-delta">Current month</span>
          </div>
          <div class="kpi-item">
            <span class="kpi-value">38.2M</span>
            <span class="kpi-label">Cumulative · 4 months</span>
            <span class="kpi-delta">Feb – May</span>
          </div>
          <div class="kpi-item">
            <span class="kpi-value">+4,921</span>
            <span class="kpi-label">New followers · 30d</span>
            <span class="kpi-delta">+6.2%</span>
          </div>
          <div class="kpi-item">
            <span class="kpi-value">250k+</span>
            <span class="kpi-label">Total community</span>
            <span class="kpi-delta">Consolidated base</span>
          </div>
        </div>
        <div class="dashboard-grid">
          <div class="dash-card">
            <span class="dash-card-title">By Type (30D)</span>
            <div class="hbar-item">
              <span class="hbar-label">Reels</span>
              <div class="hbar-track"><div class="hbar-fill" data-pct="78%"></div></div>
              <span class="hbar-value">78%</span>
            </div>
            <div class="hbar-item">
              <span class="hbar-label">Posts</span>
              <div class="hbar-track"><div class="hbar-fill" data-pct="14%"></div></div>
              <span class="hbar-value">14%</span>
            </div>
            <div class="hbar-item">
              <span class="hbar-label">Stories</span>
              <div class="hbar-track"><div class="hbar-fill" data-pct="8%"></div></div>
              <span class="hbar-value">8%</span>
            </div>
          </div>
          <div class="dash-card">
            <span class="dash-card-title">Audience · Countries</span>
            <div class="hbar-item">
              <span class="hbar-label">USA</span>
              <div class="hbar-track"><div class="hbar-fill" data-pct="62%"></div></div>
              <span class="hbar-value">62%</span>
            </div>
            <div class="hbar-item">
              <span class="hbar-label">Venezuela</span>
              <div class="hbar-track"><div class="hbar-fill" data-pct="14%"></div></div>
              <span class="hbar-value">14%</span>
            </div>
            <div class="hbar-item">
              <span class="hbar-label">Colombia</span>
              <div class="hbar-track"><div class="hbar-fill" data-pct="9%"></div></div>
              <span class="hbar-value">9%</span>
            </div>
            <div class="hbar-item">
              <span class="hbar-label">Mexico</span>
              <div class="hbar-track"><div class="hbar-fill" data-pct="7%"></div></div>
              <span class="hbar-value">7%</span>
            </div>
            <div class="hbar-item">
              <span class="hbar-label">Spain</span>
              <div class="hbar-track"><div class="hbar-fill" data-pct="4%"></div></div>
              <span class="hbar-value">4%</span>
            </div>
          </div>
          <div class="dash-card">
            <span class="dash-card-title">Views / Month (2026)</span>
            <div class="stat-big">
              <span class="stat-big-num">7.9M</span>
              <span class="stat-big-label">May</span>
            </div>
            <div class="dash-card-footer">
              38.2M Cumulative 4 Months &nbsp;·&nbsp; 9.55M Monthly Average
            </div>
          </div>
        </div>
        <p class="case-source">Source · Instagram Insights · @miamidiario account</p>
      </div>
    </section>

    <!-- KIMONA — PROFILE -->
    <section class="ed-section case-section" id="case-kimona">
      <div class="ed-inner">
        <div class="case-layout">
          <div class="case-left">
            <span class="ed-label">Case · @kimonatelier</span>
            <h2 class="case-h2 reveal">Kimona Telier</h2>
            <p class="case-scope">Editorial · Digital · Brand</p>
            <p class="case-one-liner reveal">House of kimonos and contemporary garments. We assumed management of the account in March 2026: editorial direction, content system, and shop functioning as a single piece.</p>
            <a href="https://www.instagram.com/kimonatelier/" target="_blank" rel="noopener noreferrer" class="case-link">View on Instagram ↗</a>
          </div>
          <div class="case-right">
            <div class="ig-frame">
              <iframe
                src="https://www.instagram.com/kimonatelier/embed"
                loading="lazy"
                scrolling="no"
                allow="encrypted-media"
                class="ig-embed"
                title="@kimonatelier on Instagram"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- KIMONA — DASHBOARD -->
    <section class="ed-section dash-section" id="dash-kimona" style="padding-top:0">
      <div class="ed-inner">
        <div class="dash-header">
          <div>
            <span class="ed-label" style="margin-bottom:16px">Results · @kimonatelier</span>
            <h3 class="dash-h3 reveal">Before and after Oasis. <em class="ed-em">March</em> marked the turning point.</h3>
            <p class="dash-subtitle">Take-over in March 2026. +82.9% in the first month. May 6x vs historic average.</p>
          </div>
          <span class="dash-pill">MAR — MAY · 2026</span>
        </div>
        <div class="kpi-row">
          <div class="kpi-item">
            <span class="kpi-value">222,653</span>
            <span class="kpi-label">Views · Mar – May</span>
            <span class="kpi-delta">Cumulative</span>
          </div>
          <div class="kpi-item">
            <span class="kpi-value">+95%</span>
            <span class="kpi-label">Avg. monthly reach</span>
            <span class="kpi-delta">vs Before</span>
          </div>
          <div class="kpi-item">
            <span class="kpi-value">+82.9%</span>
            <span class="kpi-label">Reach · March</span>
            <span class="kpi-delta">Turning point month</span>
          </div>
          <div class="kpi-item">
            <span class="kpi-value">18.2%</span>
            <span class="kpi-label">Follower conv. spike</span>
            <span class="kpi-delta">March 2026</span>
          </div>
        </div>
        <div class="dashboard-grid">
          <div class="dash-card dash-card--ink">
            <span class="dash-card-title">Views / Month (2026)</span>
            <div class="vbar-chart">
              <div class="vbar-col">
                <div class="vbar-bar" data-h="26px"></div>
                <span class="vbar-bar-label">Mar</span>
              </div>
              <div class="vbar-col">
                <div class="vbar-bar" data-h="33px"></div>
                <span class="vbar-bar-label">Apr</span>
              </div>
              <div class="vbar-col">
                <div class="vbar-bar vbar-bar--active" data-h="140px"></div>
                <span class="vbar-bar-label">May</span>
              </div>
            </div>
            <div class="dash-card-footer">222.6K Cumulative Mar–May &nbsp;·&nbsp; 6x May vs average</div>
          </div>
          <div class="dash-card dash-card--ink">
            <span class="dash-card-title">Before / After · Accounts Reached</span>
            <div style="margin:20px 0">
              <p style="font-family:var(--font-mono);font-size:10px;letter-spacing:0.15em;text-transform:uppercase;color:var(--dim);margin-bottom:10px">Before Jan–Feb</p>
              <div class="hbar-track" style="height:6px;margin-bottom:20px">
                <div class="hbar-fill" data-pct="51%" style="background:rgba(237,227,208,0.2)"></div>
              </div>
              <p style="font-family:var(--font-mono);font-size:10px;letter-spacing:0.15em;text-transform:uppercase;color:var(--sand);margin-bottom:10px">After Mar–May</p>
              <div class="hbar-track" style="height:6px">
                <div class="hbar-fill hbar-fill--sand" data-pct="100%"></div>
              </div>
            </div>
            <div class="dash-card-footer">Net growth · +95% monthly reach</div>
          </div>
          <div class="dash-card dash-card--ink">
            <span class="dash-card-title">By Type (MAR)</span>
            <div class="hbar-item">
              <span class="hbar-label">Posts</span>
              <div class="hbar-track"><div class="hbar-fill" data-pct="77.9%"></div></div>
              <span class="hbar-value">77.9%</span>
            </div>
            <div class="hbar-item">
              <span class="hbar-label">Reels</span>
              <div class="hbar-track"><div class="hbar-fill" data-pct="13.9%"></div></div>
              <span class="hbar-value">13.9%</span>
            </div>
            <div class="hbar-item">
              <span class="hbar-label">Stories</span>
              <div class="hbar-track"><div class="hbar-fill" data-pct="8.2%"></div></div>
              <span class="hbar-value">8.2%</span>
            </div>
            <div class="dash-card-footer">Editorial first · video scales reach</div>
          </div>
        </div>
        <p class="case-source">Source · Instagram Insights · @kimonatelier · Oasis Studio since Mar 2026</p>
      </div>
    </section>

    <!-- CTA / CLOSING -->
    <section class="ed-section ed-section--ink-deep cta-close" id="cta">
      <div class="ed-inner">
        <span class="ed-label">Start here</span>
        <h2 class="ed-h1 reveal" style="max-width:14ch">It starts with a <em class="ed-em">decision.</em></h2>
        <div class="cta-close-actions">
          <a href="mailto:contact@oasistudio.us?subject=Schedule%20a%20call" class="btn-main">Contact Us</a>
          <a href="mailto:contact@oasistudio.us" class="cta-close-email">contact@oasistudio.us</a>
        </div>
      </div>
    </section>
  `;
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

  setupScrollReveal(container);
  setupCardTilt(container);
  heroMorphCleanup = setupHeroLogoMorph();
  requestAnimationFrame(() => setupBarAnimations());
}

export function unmount() {
  observers.forEach(ob => ob.disconnect());
  observers = [];
  if (tiltCleanup) { tiltCleanup(); tiltCleanup = null; }
  if (heroMorphCleanup) { heroMorphCleanup(); heroMorphCleanup = null; }
}
