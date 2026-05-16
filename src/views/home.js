// --- src/views/home.js ---
// Landing page: Hero → Clients → Services Grid → Process → Testimonials → CTA
// Standard vertical flow with scroll-reveal animations

let observers = [];

/**
 * Generate the Home view HTML.
 */
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

    <!-- Services Bento Grid -->
    <section class="home-services-section" id="home-services">
      <div class="section-inner">
        <div class="section-header reveal">
          <p class="section-eyebrow" data-i18n="servicesEyebrow">What We Do</p>
          <h2 data-i18n="servicesHeading">Engineered for Impact</h2>
        </div>
        <div class="bento-grid reveal">
          <!-- Card 1: Branding -->
          <div class="bento-card">
            <h3 data-i18n="bentoTitle1">Branding</h3>
            <p data-i18n="bentoDesc1">Identify market needs with precision through our brand radar analysis.</p>
            <div class="mic-radar"></div>
          </div>
          <!-- Card 2: Web Design -->
          <div class="bento-card">
            <h3 data-i18n="bentoTitle2">Web Design</h3>
            <p data-i18n="bentoDesc2">Immersive and performing code environments to elevate your app.</p>
            <div class="mic-terminal">
              <div><span class="line-1">const</span> <span class="line-2">elevateBrand</span> = <span class="line-1">async</span> () =&gt; {</div>
              <div style="padding-left:15px">await <span class="line-2">design</span>({ <br>&nbsp;&nbsp;ux: <span class="line-3">"premium"</span><br>});</div>
              <div>} <span class="cursor"></span></div>
            </div>
          </div>
          <!-- Card 3: Content -->
          <div class="bento-card">
            <h3 data-i18n="bentoTitle3">Content Managing</h3>
            <p data-i18n="bentoDesc3">Interconnected nodes to distribute your message on every platform.</p>
            <div class="mic-nodes">
              <svg viewBox="0 0 300 100">
                <path class="node-path" fill="none" stroke-width="2" d="M30,50 Q100,10 150,50 T270,50" />
                <circle class="node-circle" cx="30" cy="50" r="6" />
                <circle class="node-circle nc2" cx="150" cy="50" r="6" />
                <circle class="node-circle nc3" cx="270" cy="50" r="6" />
              </svg>
            </div>
          </div>
          <!-- Card 4: Solutions -->
          <div class="bento-card">
            <h3 data-i18n="bentoTitle4">Our Solutions</h3>
            <p data-i18n="bentoDesc4">Guaranteed workflows that generate real impact.</p>
            <div class="mic-checks">
              <div class="checks-track">
                <div class="check-item">
                  <svg class="check-icon" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
                  <span data-i18n="check1">Scalable Architecture</span>
                </div>
                <div class="check-item">
                  <svg class="check-icon" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
                  <span data-i18n="check2">SEO Optimization</span>
                </div>
                <div class="check-item">
                  <svg class="check-icon" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
                  <span data-i18n="check3">Conversion Rate</span>
                </div>
                <div class="check-item">
                  <svg class="check-icon" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
                  <span data-i18n="check1">Scalable Architecture</span>
                </div>
              </div>
            </div>
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

/**
 * Animate stat numbers counting up
 */
function animateStats(container) {
  container.querySelectorAll('.stat-number').forEach(el => {
    const target = parseInt(el.dataset.target, 10);
    const duration = 2000;
    const start = performance.now();
    function step(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      el.textContent = Math.floor(eased * target);
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  });
}

/**
 * Set up IntersectionObserver for scroll-reveal animations
 */
function setupScrollReveal(container) {
  const revealElements = container.querySelectorAll('.reveal');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        // If stats section, trigger counter animation
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

/**
 * Mount the Home view into a container.
 */
export function mount(container) {
  window.scrollTo(0, 0);
  container.innerHTML = getTemplate();

  // Bind SPA navigation for any data-route links inside this view
  container.querySelectorAll('a[data-route]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      window.location.hash = link.getAttribute('data-route');
    });
  });

  // Setup scroll-reveal animations
  requestAnimationFrame(() => setupScrollReveal(container));
}

/**
 * Unmount the Home view.
 */
export function unmount() {
  observers.forEach(obs => obs.disconnect());
  observers = [];
}
