// --- src/views/home.js ---
// Landing page: Hero → Clients → Portfolio → Stats → Services Grid → Process → Testimonials → CTA

let observers = [];

function getTemplate() {
  return `
    <!-- Hero Section -->
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
      <div class="scroll-indicator" aria-hidden="true">
        <div class="scroll-line"></div>
      </div>
    </section>

    <!-- Trusted By / Client Logos -->
    <section class="clients-section" id="clients">
      <div class="section-inner reveal">
        <p class="clients-label" data-i18n="clientsLabel">Trusted by forward-thinking brands</p>
        <div class="clients-track">
          <div class="client-logo">Nextera</div>
          <div class="client-logo">Velora</div>
          <div class="client-logo">Centris</div>
          <div class="client-logo">Meridian</div>
          <div class="client-logo">Ascendio</div>
        </div>
      </div>
    </section>

    <!-- Portfolio Preview Section -->
    <section class="portfolio-section" id="portfolio">
      <div class="portfolio-header section-inner">
        <p class="section-eyebrow" data-i18n="portfolioEyebrow">Selected Work</p>
        <h2 data-i18n="portfolioHeading">Built for the Bold</h2>
      </div>
      <div class="portfolio-track-wrap">
        <div class="portfolio-track">

          <div class="portfolio-card">
            <div class="preview-frame">
              <div class="frame-chrome">
                <div class="chrome-dots"><span></span><span></span><span></span></div>
                <div class="chrome-bar"><span class="chrome-url-text">link coming soon</span></div>
              </div>
              <div class="frame-viewport fp-gradient-1">
                <div class="fp-overlay"></div>
                <div class="fp-hero-content">
                  <div class="fp-line fp-line--eyebrow"></div>
                  <div class="fp-line fp-line--h1"></div>
                  <div class="fp-line fp-line--h1 fp-line--short"></div>
                  <div class="fp-line fp-line--sub"></div>
                  <div class="fp-line fp-line--cta"></div>
                </div>
              </div>
            </div>
            <div class="portfolio-meta">
              <div class="portfolio-info">
                <p class="portfolio-name">Project One</p>
                <p class="portfolio-tags">Branding · Web Design</p>
              </div>
              <a href="#" class="portfolio-visit" aria-label="Visit project" tabindex="-1">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/>
                </svg>
              </a>
            </div>
          </div>

          <div class="portfolio-card">
            <div class="preview-frame">
              <div class="frame-chrome">
                <div class="chrome-dots"><span></span><span></span><span></span></div>
                <div class="chrome-bar"><span class="chrome-url-text">link coming soon</span></div>
              </div>
              <div class="frame-viewport fp-gradient-2">
                <div class="fp-overlay"></div>
                <div class="fp-hero-content">
                  <div class="fp-line fp-line--eyebrow"></div>
                  <div class="fp-line fp-line--h1"></div>
                  <div class="fp-line fp-line--h1 fp-line--short"></div>
                  <div class="fp-line fp-line--sub"></div>
                  <div class="fp-line fp-line--cta"></div>
                </div>
              </div>
            </div>
            <div class="portfolio-meta">
              <div class="portfolio-info">
                <p class="portfolio-name">Project Two</p>
                <p class="portfolio-tags">Content · Strategy</p>
              </div>
              <a href="#" class="portfolio-visit" aria-label="Visit project" tabindex="-1">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/>
                </svg>
              </a>
            </div>
          </div>

          <div class="portfolio-card">
            <div class="preview-frame">
              <div class="frame-chrome">
                <div class="chrome-dots"><span></span><span></span><span></span></div>
                <div class="chrome-bar"><span class="chrome-url-text">link coming soon</span></div>
              </div>
              <div class="frame-viewport fp-gradient-3">
                <div class="fp-overlay"></div>
                <div class="fp-hero-content">
                  <div class="fp-line fp-line--eyebrow"></div>
                  <div class="fp-line fp-line--h1"></div>
                  <div class="fp-line fp-line--h1 fp-line--short"></div>
                  <div class="fp-line fp-line--sub"></div>
                  <div class="fp-line fp-line--cta"></div>
                </div>
              </div>
            </div>
            <div class="portfolio-meta">
              <div class="portfolio-info">
                <p class="portfolio-name">Project Three</p>
                <p class="portfolio-tags">E-Commerce · UX</p>
              </div>
              <a href="#" class="portfolio-visit" aria-label="Visit project" tabindex="-1">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/>
                </svg>
              </a>
            </div>
          </div>

          <div class="portfolio-card">
            <div class="preview-frame">
              <div class="frame-chrome">
                <div class="chrome-dots"><span></span><span></span><span></span></div>
                <div class="chrome-bar"><span class="chrome-url-text">link coming soon</span></div>
              </div>
              <div class="frame-viewport fp-gradient-4">
                <div class="fp-overlay"></div>
                <div class="fp-hero-content">
                  <div class="fp-line fp-line--eyebrow"></div>
                  <div class="fp-line fp-line--h1"></div>
                  <div class="fp-line fp-line--h1 fp-line--short"></div>
                  <div class="fp-line fp-line--sub"></div>
                  <div class="fp-line fp-line--cta"></div>
                </div>
              </div>
            </div>
            <div class="portfolio-meta">
              <div class="portfolio-info">
                <p class="portfolio-name">Project Four</p>
                <p class="portfolio-tags">Web App · Branding</p>
              </div>
              <a href="#" class="portfolio-visit" aria-label="Visit project" tabindex="-1">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/>
                </svg>
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>

    <!-- Stats Section -->
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

    <!-- Services Feature Grid -->
    <section class="home-services-section" id="home-services">
      <div class="section-inner">
        <div class="section-header">
          <p class="section-eyebrow" data-i18n="servicesEyebrow">What We Do</p>
          <h2 data-i18n="servicesHeading">Engineered for Impact</h2>
        </div>
        <div class="services-feature-grid">

          <div class="feature-card">
            <div class="feature-card-top">
              <span class="feature-number">01</span>
              <div class="feature-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <circle cx="12" cy="12" r="5"/>
                  <circle cx="12" cy="12" r="1" fill="currentColor" stroke="none"/>
                  <line x1="12" y1="2" x2="12" y2="5"/>
                  <line x1="12" y1="19" x2="12" y2="22"/>
                  <line x1="2" y1="12" x2="5" y2="12"/>
                  <line x1="19" y1="12" x2="22" y2="12"/>
                </svg>
              </div>
            </div>
            <h3 data-i18n="bentoTitle1">Branding</h3>
            <p data-i18n="bentoDesc1">Identify market needs with precision through our brand radar analysis.</p>
          </div>

          <div class="feature-card">
            <div class="feature-card-top">
              <span class="feature-number">02</span>
              <div class="feature-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="2" y="3" width="20" height="18" rx="2"/>
                  <line x1="2" y1="8" x2="22" y2="8"/>
                  <polyline points="7 13 10 16 7 19"/>
                  <line x1="13" y1="19" x2="17" y2="19"/>
                </svg>
              </div>
            </div>
            <h3 data-i18n="bentoTitle2">Web Design</h3>
            <p data-i18n="bentoDesc2">Immersive and performing code environments to elevate your app.</p>
          </div>

          <div class="feature-card">
            <div class="feature-card-top">
              <span class="feature-number">03</span>
              <div class="feature-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="18" cy="5" r="3"/>
                  <circle cx="6" cy="12" r="3"/>
                  <circle cx="18" cy="19" r="3"/>
                  <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
                  <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
                </svg>
              </div>
            </div>
            <h3 data-i18n="bentoTitle3">Content Managing</h3>
            <p data-i18n="bentoDesc3">Interconnected nodes to distribute your message on every platform.</p>
          </div>

          <div class="feature-card">
            <div class="feature-card-top">
              <span class="feature-number">04</span>
              <div class="feature-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  <polyline points="9 12 11 14 15 10"/>
                </svg>
              </div>
            </div>
            <h3 data-i18n="bentoTitle4">Our Solutions</h3>
            <p data-i18n="bentoDesc4">Guaranteed workflows that generate real impact.</p>
            <ul class="feature-list">
              <li data-i18n="check1">Scalable Architecture</li>
              <li data-i18n="check2">SEO Optimization</li>
              <li data-i18n="check3">Conversion Rate</li>
            </ul>
          </div>

        </div>
      </div>
    </section>

    <!-- Process Section -->
    <section class="process-section" id="process">
      <div class="section-inner">
        <div class="section-header reveal">
          <p class="section-eyebrow" data-i18n="processEyebrow">How We Work</p>
          <h2 data-i18n="processHeading">From Vision to Reality</h2>
        </div>
        <div class="process-timeline">
          <div class="process-step reveal">
            <div class="step-number">01</div>
            <div class="step-content">
              <h3 data-i18n="processStep1Title">Discovery</h3>
              <p data-i18n="processStep1Desc">We immerse ourselves in your brand, your market, and your audience to identify every strategic opportunity.</p>
            </div>
          </div>
          <div class="process-step reveal">
            <div class="step-number">02</div>
            <div class="step-content">
              <h3 data-i18n="processStep2Title">Strategy</h3>
              <p data-i18n="processStep2Desc">We craft a tailored roadmap that aligns your business goals with measurable digital outcomes.</p>
            </div>
          </div>
          <div class="process-step reveal">
            <div class="step-number">03</div>
            <div class="step-content">
              <h3 data-i18n="processStep3Title">Design & Build</h3>
              <p data-i18n="processStep3Desc">Our team engineers immersive experiences with cutting-edge technology and premium aesthetics.</p>
            </div>
          </div>
          <div class="process-step reveal">
            <div class="step-number">04</div>
            <div class="step-content">
              <h3 data-i18n="processStep4Title">Launch & Scale</h3>
              <p data-i18n="processStep4Desc">We deploy, monitor, and optimize continuously so your digital presence keeps growing.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials Section -->
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
              <div>
                <strong>María López</strong>
                <span>CEO, Nextera Digital</span>
              </div>
            </div>
          </article>
          <article class="testimonial-card">
            <div class="testimonial-stars" aria-label="5 stars">★★★★★</div>
            <blockquote data-i18n="testimonial2">"They don't just build websites — they engineer experiences. Our conversion rate increased 340% in the first quarter."</blockquote>
            <div class="testimonial-author">
              <div class="author-avatar">CR</div>
              <div>
                <strong>Carlos Restrepo</strong>
                <span>CTO, Velora Tech</span>
              </div>
            </div>
          </article>
          <article class="testimonial-card">
            <div class="testimonial-stars" aria-label="5 stars">★★★★★</div>
            <blockquote data-i18n="testimonial3">"Working with Oasis felt like partnering with a team that truly understands brand storytelling at the highest level."</blockquote>
            <div class="testimonial-author">
              <div class="author-avatar">AP</div>
              <div>
                <strong>Ana Pereira</strong>
                <span>Director, Meridian Group</span>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta-section" id="cta">
      <div class="cta-content reveal">
        <h2 class="cta-title" data-i18n="ctaTitle">Welcome to<br>the Oasis</h2>
        <p class="cta-subtitle" data-i18n="ctaSub">Your business is ready to flourish. Let's build the future together.</p>
        <a href="#contact" data-route="#contact" class="btn-main btn-large" data-i18n="ctaBtn">Transform My Business</a>
      </div>
    </section>
  `;
}

function animateStats(container) {
  container.querySelectorAll('.stat-number').forEach(el => {
    const target = parseInt(el.dataset.target, 10);
    const duration = 2000;
    const start = performance.now();
    function step(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target);
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  });
}

function setupScrollReveal(container) {
  const revealElements = container.querySelectorAll('.reveal');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        if (entry.target.closest('.stats-section')) {
          animateStats(entry.target);
        }
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

  revealElements.forEach(el => observer.observe(el));
  observers.push(observer);
}

export function mount(container) {
  window.scrollTo(0, 0);
  container.innerHTML = getTemplate();

  container.querySelectorAll('a[data-route]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      window.location.hash = link.getAttribute('data-route');
    });
  });

  requestAnimationFrame(() => setupScrollReveal(container));
}

export function unmount() {
  observers.forEach(obs => obs.disconnect());
  observers = [];
}
