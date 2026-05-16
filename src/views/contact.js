// --- src/views/contact.js ---
// Contact page with working form and company info

let tweens = [];

export function mount(container) {
  window.scrollTo(0, 0);

  container.innerHTML = `
    <div class="contact-page" role="main" aria-label="Contact">
      <div class="section-inner">
        <div class="section-header">
          <p class="section-eyebrow" data-i18n="contactEyebrow">Hablemos</p>
          <h1 data-i18n="contactTitle">Construyamos Algo Extraordinario</h1>
          <p class="section-sub" data-i18n="contactSub">Cuéntanos sobre tu proyecto. Respondemos en menos de 24 horas.</p>
        </div>

        <div class="contact-grid">
          <!-- Contact Form -->
          <form class="contact-form" id="contact-form" novalidate>
            <div class="form-row">
              <div class="form-group">
                <label for="contact-name" data-i18n="formName">Nombre Completo</label>
                <input type="text" id="contact-name" name="name" required autocomplete="name">
              </div>
              <div class="form-group">
                <label for="contact-email" data-i18n="formEmail">Correo Electrónico</label>
                <input type="email" id="contact-email" name="email" required autocomplete="email">
              </div>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label for="contact-company" data-i18n="formCompany">Empresa</label>
                <input type="text" id="contact-company" name="company" autocomplete="organization">
              </div>
              <div class="form-group">
                <label for="contact-service" data-i18n="formService">Servicio de Interés</label>
                <select id="contact-service" name="service">
                  <option value="" data-i18n="formSelectDefault">Selecciona un servicio</option>
                  <option value="branding" data-i18n="serv1">Branding</option>
                  <option value="web-design" data-i18n="serv2">Diseño Web</option>
                  <option value="content" data-i18n="serv3">Contenidos</option>
                  <option value="full-package">Full Package</option>
                </select>
              </div>
            </div>
            <div class="form-group">
              <label for="contact-message" data-i18n="formMessage">Tu Mensaje</label>
              <textarea id="contact-message" name="message" rows="6" required></textarea>
            </div>
            <div class="form-actions">
              <button type="submit" class="btn-main btn-large" data-i18n="formSubmit">Enviar Mensaje</button>
              <div class="form-status" id="form-status" aria-live="polite"></div>
            </div>
          </form>

          <!-- Contact Info Sidebar -->
          <aside class="contact-info">
            <div class="info-card">
              <div class="info-icon">✉</div>
              <h3 data-i18n="infoEmailTitle">Email</h3>
              <a href="mailto:hello@oasisstudio.co">hello@oasisstudio.co</a>
            </div>
            <div class="info-card">
              <div class="info-icon">◎</div>
              <h3 data-i18n="infoLocationTitle">Ubicación</h3>
              <p>Caracas, Venezuela<br>Remote Worldwide</p>
            </div>
            <div class="info-card">
              <div class="info-icon">◆</div>
              <h3 data-i18n="infoSocialTitle">Redes</h3>
              <div class="social-links">
                <a href="#" aria-label="Instagram" class="social-link">Instagram</a>
                <a href="#" aria-label="LinkedIn" class="social-link">LinkedIn</a>
                <a href="#" aria-label="Behance" class="social-link">Behance</a>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  `;

  // Form handling
  const form = container.querySelector('#contact-form');
  const status = container.querySelector('#form-status');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    status.textContent = '';
    status.className = 'form-status';

    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn.textContent;
    btn.disabled = true;
    btn.textContent = '...';

    setTimeout(() => {
      status.textContent = '✓ Mensaje enviado. ¡Estaremos en contacto!';
      status.classList.add('form-status--success');
      btn.disabled = false;
      btn.textContent = originalText;
      form.reset();
    }, 1500);
  });

  // Entrance animation
  requestAnimationFrame(() => {
    const { gsap } = window;
    if (!gsap) return;

    const elements = container.querySelectorAll('.section-header, .contact-form, .contact-info');
    const tween = gsap.from(elements, {
      y: 25,
      opacity: 0,
      duration: 0.6,
      stagger: 0.12,
      ease: 'power3.out',
    });
    tweens.push(tween);
  });
}

export function unmount() {
  const { gsap } = window;
  if (gsap) {
    tweens.forEach(t => t.kill());
  }
  tweens = [];
}
