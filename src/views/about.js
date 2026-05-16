// --- src/views/about.js ---

let tweens = [];

export function mount(container) {
  window.scrollTo(0, 0);

  container.innerHTML = `
    <div class="view-page" role="main" aria-label="About Us">
      <div class="view-page-inner">
        <div class="section-header view-page-header">
          <p class="section-eyebrow" data-i18n="aboutEyebrow">Who We Are</p>
          <h1 data-i18n="aboutPageTitle">About Us</h1>
          <p class="section-sub" data-i18n="aboutPageSub">A boutique creative studio transforming brands into memorable digital experiences.</p>
        </div>

        <div class="about-feature-grid">

          <div class="feature-card" tabindex="0" role="article">
            <div class="feature-card-top">
              <span class="feature-number">01</span>
              <div class="feature-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12 6 12 12 16 14"/>
                </svg>
              </div>
            </div>
            <h3 data-i18n="aboutMission">Mission</h3>
            <p data-i18n="aboutMissionText">Build digital experiences that captivate, convert and scale, merging premium design with cutting-edge technology.</p>
          </div>

          <div class="feature-card" tabindex="0" role="article">
            <div class="feature-card-top">
              <span class="feature-number">02</span>
              <div class="feature-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                  <circle cx="12" cy="12" r="3"/>
                </svg>
              </div>
            </div>
            <h3 data-i18n="aboutVision">Vision</h3>
            <p data-i18n="aboutVisionText">To be the go-to studio for companies seeking an extraordinary digital presence in Latin America and beyond.</p>
          </div>

          <div class="feature-card" tabindex="0" role="article">
            <div class="feature-card-top">
              <span class="feature-number">03</span>
              <div class="feature-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                </svg>
              </div>
            </div>
            <h3 data-i18n="aboutValues">Values</h3>
            <ul class="feature-values-list">
              <li data-i18n="aboutValue1">Visual Excellence</li>
              <li data-i18n="aboutValue2">Technological Innovation</li>
              <li data-i18n="aboutValue3">Measurable Impact</li>
            </ul>
          </div>

        </div>
      </div>
    </div>
  `;

  requestAnimationFrame(() => {
    const { gsap } = window;
    if (!gsap) return;
    const els = container.querySelectorAll('.feature-card');
    tweens.push(gsap.from(els, { y: 30, opacity: 0, duration: 0.5, stagger: 0.12, ease: 'power3.out' }));
  });
}

export function unmount() {
  const { gsap } = window;
  if (gsap) tweens.forEach(t => t.kill());
  tweens = [];
}
