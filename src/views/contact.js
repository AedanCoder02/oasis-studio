// src/views/contact.js

let tweens = [];

export function mount(container) {
  window.scrollTo(0, 0);

  container.innerHTML = `
    <div class="view-page contact-view" role="main" aria-label="Contact">
      <div class="view-page-inner">

        <div class="view-page-header">
          <span class="section-eyebrow">Start here</span>
          <h1>Let's build something<br><em class="ed-em">extraordinary.</em></h1>
          <p class="section-sub">Tell us about your project. We respond within 24 hours.</p>
        </div>

        <div class="contact-layout">

          <form class="contact-form" id="contact-form" novalidate>
            <div class="form-row">
              <div class="form-group">
                <label for="contact-name">Full Name</label>
                <input type="text" id="contact-name" name="name" required autocomplete="name" placeholder="Your name">
              </div>
              <div class="form-group">
                <label for="contact-email">Email</label>
                <input type="email" id="contact-email" name="email" required autocomplete="email" placeholder="you@company.com">
              </div>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label for="contact-company">Company</label>
                <input type="text" id="contact-company" name="company" autocomplete="organization" placeholder="Company name">
              </div>
              <div class="form-group">
                <label for="contact-service">Service</label>
                <select id="contact-service" name="service">
                  <option value="">Select a service</option>
                  <option value="web">Web Pages</option>
                  <option value="social">Social Media</option>
                  <option value="editorial">Editorial Direction</option>
                  <option value="infrastructure">Digital Infrastructure</option>
                  <option value="full">Full System</option>
                </select>
              </div>
            </div>
            <div class="form-group">
              <label for="contact-message">Message</label>
              <textarea id="contact-message" name="message" rows="5" required placeholder="Tell us about your project..."></textarea>
            </div>
            <div class="form-actions">
              <button type="submit" class="btn-main">Send Message</button>
              <p class="form-status" id="form-status" aria-live="polite"></p>
            </div>
          </form>

          <aside class="contact-sidebar">

            <div class="contact-info-card">
              <div class="contact-info-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
              </div>
              <div>
                <p class="contact-info-label">Email</p>
                <a href="mailto:contact@oasistudio.us" class="contact-info-value">contact@oasistudio.us</a>
              </div>
            </div>

            <div class="contact-info-card">
              <div class="contact-info-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
              </div>
              <div>
                <p class="contact-info-label">Based in</p>
                <p class="contact-info-value">Miami, United States<br>Remote Worldwide</p>
              </div>
            </div>

            <div class="contact-info-card">
              <div class="contact-info-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
                  <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
                  <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
                </svg>
              </div>
              <div>
                <p class="contact-info-label">Connect</p>
                <div class="contact-social">
                  <a href="https://www.instagram.com/oasistudio_/" target="_blank" rel="noopener noreferrer" class="contact-social-link">Instagram</a>
                  <a href="#" class="contact-social-link">LinkedIn</a>
                  <a href="#" class="contact-social-link">Behance</a>
                </div>
              </div>
            </div>

          </aside>
        </div>

      </div>
    </div>
  `;

  const form = container.querySelector('#contact-form');
  const status = container.querySelector('#form-status');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      status.textContent = '';
      status.className = 'form-status';
      const btn = form.querySelector('button[type="submit"]');
      const originalText = btn.textContent;
      btn.disabled = true;
      btn.textContent = '...';
      setTimeout(() => {
        status.textContent = 'Message sent. We\'ll be in touch.';
        status.classList.add('form-status--success');
        btn.disabled = false;
        btn.textContent = originalText;
        form.reset();
      }, 1500);
    });
  }

  requestAnimationFrame(() => {
    const { gsap } = window;
    if (!gsap) return;
    const els = container.querySelectorAll('.view-page-header, .contact-form, .contact-sidebar');
    tweens.push(gsap.from(els, { y: 24, opacity: 0, duration: 0.7, stagger: 0.12, ease: 'power3.out' }));
  });
}

export function unmount() {
  const { gsap } = window;
  if (gsap) tweens.forEach(t => t.kill());
  tweens = [];
}
