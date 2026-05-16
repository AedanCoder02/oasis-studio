// --- src/views/contact.js ---

let tweens = [];

export function mount(container) {
  window.scrollTo(0, 0);

  container.innerHTML = `
    <div class="view-page contact-view" role="main" aria-label="Contact">
      <div class="view-page-inner">

        <div class="section-header view-page-header">
          <p class="section-eyebrow" data-i18n="contactEyebrow">Get In Touch</p>
          <h1 data-i18n="contactTitle">Let's Build Something Extraordinary</h1>
          <p class="section-sub" data-i18n="contactSub">Tell us about your project. We respond within 24 hours.</p>
        </div>

        <div class="contact-layout">

          <!-- Form -->
          <form class="contact-form" id="contact-form" novalidate>
            <div class="form-row">
              <div class="form-group">
                <label for="contact-name" data-i18n="formName">Full Name</label>
                <input type="text" id="contact-name" name="name" required autocomplete="name" placeholder="Your name">
              </div>
              <div class="form-group">
                <label for="contact-email" data-i18n="formEmail">Email</label>
                <input type="email" id="contact-email" name="email" required autocomplete="email" placeholder="you@company.com">
              </div>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label for="contact-company" data-i18n="formCompany">Company</label>
                <input type="text" id="contact-company" name="company" autocomplete="organization" placeholder="Company name">
              </div>
              <div class="form-group">
                <label for="contact-service" data-i18n="formService">Service</label>
                <select id="contact-service" name="service">
                  <option value="" data-i18n="formSelectDefault">Select a service</option>
                  <option value="branding" data-i18n="serv1">Branding</option>
                  <option value="web-design" data-i18n="serv2">Web Design</option>
                  <option value="content" data-i18n="serv3">Content Managing</option>
                  <option value="full-package">Full Package</option>
                </select>
              </div>
            </div>
            <div class="form-group">
              <label for="contact-message" data-i18n="formMessage">Message</label>
              <textarea id="contact-message" name="message" rows="5" required placeholder="Tell us about your project..."></textarea>
            </div>
            <div class="form-actions">
              <button type="submit" class="btn-main btn-large" data-i18n="formSubmit">Send Message</button>
              <p class="form-status" id="form-status" aria-live="polite"></p>
            </div>
          </form>

          <!-- Sidebar -->
          <aside class="contact-sidebar">

            <div class="contact-info-card">
              <div class="contact-info-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
              </div>
              <div>
                <p class="contact-info-label" data-i18n="infoEmailTitle">Email</p>
                <a href="mailto:hello@oasisstudio.co" class="contact-info-value">hello@oasisstudio.co</a>
              </div>
            </div>

            <div class="contact-info-card">
              <div class="contact-info-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
              </div>
              <div>
                <p class="contact-info-label" data-i18n="infoLocationTitle">Location</p>
                <p class="contact-info-value">Caracas, Venezuela<br>Remote Worldwide</p>
              </div>
            </div>

            <div class="contact-info-card">
              <div class="contact-info-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
                  <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
                  <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
                </svg>
              </div>
              <div>
                <p class="contact-info-label" data-i18n="infoSocialTitle">Connect</p>
                <div class="contact-social">
                  <a href="#" aria-label="Instagram" class="contact-social-link">Instagram</a>
                  <a href="#" aria-label="LinkedIn" class="contact-social-link">LinkedIn</a>
                  <a href="#" aria-label="Behance" class="contact-social-link">Behance</a>
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
        status.textContent = 'Message sent. We\'ll be in touch!';
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
    tweens.push(gsap.from(els, { y: 25, opacity: 0, duration: 0.6, stagger: 0.12, ease: 'power3.out' }));
  });
}

export function unmount() {
  const { gsap } = window;
  if (gsap) tweens.forEach(t => t.kill());
  tweens = [];
}
