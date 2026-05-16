// --- src/views/about.js ---
// About view — clean functional layout per design.md
// Semantic HTML, ARIA, keyboard-accessible cards, CSS classes (no inline styles)

let tweens = [];

/**
 * Mount the About view.
 */
export function mount(container) {
  window.scrollTo(0, 0);

  container.innerHTML = `
    <div class="services-page" role="main" aria-label="About Us">
      <div class="section-header about-hero">
        <h1 data-i18n="aboutPageTitle">About Us</h1>
        <p data-i18n="aboutPageSub">We are a boutique creative studio that transforms brands into memorable experiences.</p>
      </div>

      <div class="about-grid">
        <!-- Mission -->
        <article class="bento-card about-card" tabindex="0" role="article" aria-labelledby="about-mission">
          <div class="about-icon about-icon--desert" aria-hidden="true">🎯</div>
          <h3 id="about-mission" data-i18n="aboutMission">Mission</h3>
          <p data-i18n="aboutMissionText">Build digital experiences that captivate, convert and scale, merging premium design with cutting-edge technology.</p>
        </article>

        <!-- Vision -->
        <article class="bento-card about-card" tabindex="0" role="article" aria-labelledby="about-vision">
          <div class="about-icon about-icon--oasis" aria-hidden="true">🔭</div>
          <h3 id="about-vision" data-i18n="aboutVision">Vision</h3>
          <p data-i18n="aboutVisionText">To be the go-to studio for companies seeking an extraordinary digital presence in Latin America.</p>
        </article>

        <!-- Values -->
        <article class="bento-card about-card" tabindex="0" role="article" aria-labelledby="about-values">
          <div class="about-icon about-icon--tech" aria-hidden="true">✦</div>
          <h3 id="about-values" data-i18n="aboutValues">Values</h3>
          <ul class="values-list" role="list">
            <li>
              <span class="value-dot value-dot--desert" aria-hidden="true"></span>
              <span data-i18n="aboutValue1">Visual Excellence</span>
            </li>
            <li>
              <span class="value-dot value-dot--oasis" aria-hidden="true"></span>
              <span data-i18n="aboutValue2">Technological Innovation</span>
            </li>
            <li>
              <span class="value-dot value-dot--tech" aria-hidden="true"></span>
              <span data-i18n="aboutValue3">Measurable Impact</span>
            </li>
          </ul>
        </article>
      </div>
    </div>
  `;

  // Stagger entrance
  requestAnimationFrame(() => {
    const { gsap } = window;
    if (!gsap) return;

    const cards = container.querySelectorAll('.about-card');
    const tween = gsap.from(cards, {
      y: 40,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power3.out',
    });
    tweens.push(tween);
  });
}

/**
 * Unmount — kill GSAP tweens.
 */
export function unmount() {
  const { gsap } = window;
  if (gsap) {
    tweens.forEach((t) => t.kill());
  }
  tweens = [];
}
