// src/views/about.js

let tweens = [];

export function mount(container) {
  window.scrollTo(0, 0);

  container.innerHTML = `
    <div class="view-page about-page" role="main" aria-label="About Oasis Studio">

      <!-- ── HERO STATEMENT ── -->
      <div class="about-hero">
        <p class="section-eyebrow" data-i18n="aboutEyebrow">Who We Are</p>
        <h1 class="about-statement" data-i18n="aboutStatement">We build the<br>future of digital.</h1>
      </div>

      <!-- ── MANIFESTO ── -->
      <div class="about-manifesto">
        <p data-i18n="aboutManifesto">Oasis Studio is a boutique creative studio specializing in premium digital experiences. We partner with ambitious brands to engineer websites, systems, and strategies that don't just look exceptional — they perform exceptionally. Every pixel is intentional. Every decision is strategic. Every project is a landmark.</p>
      </div>

      <!-- ── STATS STRIP ── -->
      <div class="about-stats-strip">
        <div class="ast-item">
          <span class="ast-num">120+</span>
          <span class="ast-label" data-i18n="statProjects">Projects Delivered</span>
        </div>
        <div class="ast-divider" aria-hidden="true"></div>
        <div class="ast-item">
          <span class="ast-num">45+</span>
          <span class="ast-label" data-i18n="statClients">Active Clients</span>
        </div>
        <div class="ast-divider" aria-hidden="true"></div>
        <div class="ast-item">
          <span class="ast-num">98%</span>
          <span class="ast-label" data-i18n="statSatisfaction">Satisfaction Rate</span>
        </div>
        <div class="ast-divider" aria-hidden="true"></div>
        <div class="ast-item">
          <span class="ast-num">8+</span>
          <span class="ast-label" data-i18n="statYears">Years of Excellence</span>
        </div>
      </div>

      <!-- ── PILLARS ── -->
      <div class="about-pillars">

        <div class="about-pillar">
          <span class="pillar-num">01</span>
          <div class="pillar-body">
            <h3 class="pillar-title" data-i18n="aboutMission">Mission</h3>
            <p class="pillar-desc" data-i18n="aboutMissionText">Build digital experiences that captivate, convert and scale — merging premium design with cutting-edge technology to create genuine, measurable business impact.</p>
          </div>
        </div>

        <div class="about-pillar">
          <span class="pillar-num">02</span>
          <div class="pillar-body">
            <h3 class="pillar-title" data-i18n="aboutVision">Vision</h3>
            <p class="pillar-desc" data-i18n="aboutVisionText">To be the definitive creative studio for companies seeking an extraordinary digital presence — across Latin America and beyond. We don't follow trends. We set them.</p>
          </div>
        </div>

        <div class="about-pillar">
          <span class="pillar-num">03</span>
          <div class="pillar-body">
            <h3 class="pillar-title" data-i18n="aboutValues">Values</h3>
            <ul class="pillar-values">
              <li data-i18n="aboutValue1">Visual Excellence</li>
              <li data-i18n="aboutValue2">Technological Innovation</li>
              <li data-i18n="aboutValue3">Measurable Impact</li>
              <li>Radical Transparency</li>
            </ul>
          </div>
        </div>

      </div>

      <!-- ── CTA STRIP ── -->
      <div class="about-cta-strip">
        <p class="about-cta-label" data-i18n="aboutCtaLabel">Ready to build something extraordinary?</p>
        <a href="#contact" data-route="#contact" class="btn-main" data-i18n="ctaBtn">Transform My Business</a>
      </div>

    </div>
  `;

  // Wire SPA links
  container.querySelectorAll('a[data-route]').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      window.location.hash = link.getAttribute('data-route');
    });
  });

  requestAnimationFrame(() => {
    const { gsap } = window;
    if (!gsap) return;
    tweens.push(gsap.from('.about-statement', { y: 40, opacity: 0, duration: 0.8, ease: 'power3.out' }));
    tweens.push(gsap.from('.about-manifesto p', { y: 24, opacity: 0, duration: 0.7, delay: 0.2, ease: 'power3.out' }));
    tweens.push(gsap.from('.ast-item', { y: 20, opacity: 0, duration: 0.5, stagger: 0.1, delay: 0.35, ease: 'power3.out' }));
    tweens.push(gsap.from('.about-pillar', { y: 30, opacity: 0, duration: 0.6, stagger: 0.15, delay: 0.5, ease: 'power3.out' }));
  });
}

export function unmount() {
  const { gsap } = window;
  if (gsap) tweens.forEach(t => t.kill());
  tweens = [];
}
