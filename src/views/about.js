// src/views/about.js

let tweens = [];

export function mount(container) {
  window.scrollTo(0, 0);

  container.innerHTML = `
    <div class="view-page about-page" role="main" aria-label="About Oasis Studio">
      <div class="view-page-inner">

        <div class="about-hero">
          <span class="section-eyebrow">Who We Are</span>
          <h1 class="about-statement">We build the<br><em class="ed-em">future of digital.</em></h1>
        </div>

        <div class="about-manifesto">
          <p>Oasis Studio is a boutique creative studio specializing in premium digital experiences. We partner with ambitious brands to engineer websites, systems, and strategies that don't just look exceptional — they perform exceptionally. Every pixel is intentional. Every decision is strategic. Every project is a landmark.</p>
        </div>

        <div class="about-stats-strip">
          <div class="ast-item">
            <span class="ast-num">120+</span>
            <span class="ast-label">Projects Delivered</span>
          </div>
          <div class="ast-divider" aria-hidden="true"></div>
          <div class="ast-item">
            <span class="ast-num">45+</span>
            <span class="ast-label">Active Clients</span>
          </div>
          <div class="ast-divider" aria-hidden="true"></div>
          <div class="ast-item">
            <span class="ast-num">98%</span>
            <span class="ast-label">Satisfaction Rate</span>
          </div>
          <div class="ast-divider" aria-hidden="true"></div>
          <div class="ast-item">
            <span class="ast-num">8+</span>
            <span class="ast-label">Years of Excellence</span>
          </div>
        </div>

        <div class="about-pillars">
          <div class="about-pillar">
            <span class="pillar-num">01</span>
            <div class="pillar-body">
              <h3 class="pillar-title">Mission</h3>
              <p class="pillar-desc">Build digital experiences that captivate, convert and scale — merging premium design with cutting-edge technology to create genuine, measurable business impact.</p>
            </div>
          </div>
          <div class="about-pillar">
            <span class="pillar-num">02</span>
            <div class="pillar-body">
              <h3 class="pillar-title">Vision</h3>
              <p class="pillar-desc">To be the definitive creative studio for companies seeking an extraordinary digital presence — across Latin America and beyond. We don't follow trends. We set them.</p>
            </div>
          </div>
          <div class="about-pillar">
            <span class="pillar-num">03</span>
            <div class="pillar-body">
              <h3 class="pillar-title">Values</h3>
              <ul class="pillar-values">
                <li>Visual Excellence</li>
                <li>Technological Innovation</li>
                <li>Measurable Impact</li>
                <li>Radical Transparency</li>
              </ul>
            </div>
          </div>
        </div>

        <div class="about-cta-strip">
          <p class="about-cta-label">Ready to build something extraordinary?</p>
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
    tweens.push(gsap.from('.about-statement', { y: 40, opacity: 0, duration: 0.8, ease: 'power3.out' }));
    tweens.push(gsap.from('.about-manifesto p', { y: 24, opacity: 0, duration: 0.7, delay: 0.2, ease: 'power3.out' }));
    tweens.push(gsap.from('.ast-item', { y: 20, opacity: 0, duration: 0.5, stagger: 0.1, delay: 0.3, ease: 'power3.out' }));
    tweens.push(gsap.from('.about-pillar', { y: 28, opacity: 0, duration: 0.6, stagger: 0.12, delay: 0.45, ease: 'power3.out' }));
  });
}

export function unmount() {
  const { gsap } = window;
  if (gsap) tweens.forEach(t => t.kill());
  tweens = [];
}
