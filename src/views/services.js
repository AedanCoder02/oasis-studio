// --- src/views/services.js ---
// Data-driven Bento Grid — clean functional layout per design.md
// Cards with proper ARIA, keyboard support, and semantic states

import servicesData from '../data/services.json';
import { t } from '../i18n.js';

let tweens = [];
let hoverListeners = [];

/**
 * Generate the micro-interaction HTML for a given type.
 */
function getMicroInteraction(type) {
  switch (type) {
    case 'radar':
      return `<div class="mic-radar" aria-hidden="true"></div>`;

    case 'terminal':
      return `
        <div class="mic-terminal" aria-hidden="true">
          <div><span class="line-1">const</span> <span class="line-2">elevateBrand</span> = <span class="line-1">async</span> () =&gt; {</div>
          <div style="padding-left:15px">await <span class="line-2">design</span>({ <br>&nbsp;&nbsp;ux: <span class="line-3">"premium"</span><br>});</div>
          <div>} <span class="cursor"></span></div>
        </div>`;

    case 'nodes':
      return `
        <div class="mic-nodes" aria-hidden="true">
          <svg viewBox="0 0 300 100">
            <path class="node-path" fill="none" stroke-width="2" d="M30,50 Q100,10 150,50 T270,50" />
            <circle class="node-circle" cx="30" cy="50" r="6" />
            <circle class="node-circle nc2" cx="150" cy="50" r="6" />
            <circle class="node-circle nc3" cx="270" cy="50" r="6" />
          </svg>
        </div>`;

    case 'checks':
      return `
        <div class="mic-checks" aria-hidden="true">
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
        </div>`;

    default:
      return '';
  }
}

/**
 * Render a single service card with ARIA attributes.
 */
function renderCard(service, index) {
  return `
    <article
      class="bento-card"
      id="service-${service.id}"
      data-accent="${service.accent}"
      tabindex="0"
      role="article"
      aria-labelledby="service-title-${service.id}"
    >
      <div class="service-icon" style="background: ${service.accent}15; color: ${service.accent};">
        ${service.icon}
      </div>
      <h3 id="service-title-${service.id}" data-i18n="${service.titleKey}">${service.titleKey}</h3>
      <p data-i18n="${service.descKey}">${service.descKey}</p>
      ${getMicroInteraction(service.microInteraction)}
      <span class="service-tag">${service.tag}</span>
    </article>
  `;
}

/**
 * Mount the Services view.
 */
export function mount(container) {
  window.scrollTo(0, 0);

  const cards = servicesData.services.map(renderCard).join('');

  container.innerHTML = `
    <div class="services-page" role="main" aria-label="Services">
      <div class="section-header">
        <h1 data-i18n="servicesPageTitle">Our Services</h1>
        <p data-i18n="servicesPageSub">Comprehensive solutions designed to boost your digital presence.</p>
      </div>
      <div class="services-bento">
        ${cards}
      </div>
    </div>
  `;

  // Entrance stagger animation
  requestAnimationFrame(() => {
    const { gsap } = window;
    if (!gsap) return;

    const cardEls = container.querySelectorAll('.bento-card');
    const tween = gsap.from(cardEls, {
      y: 40,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power3.out',
    });
    tweens.push(tween);

    // Subtle glow hover per card accent
    cardEls.forEach((card) => {
      const accent = card.dataset.accent;
      const onEnter = () => {
        gsap.to(card, {
          boxShadow: `0 8px 40px ${accent}22, inset 0 0 0 1px ${accent}33`,
          duration: 0.3,
        });
      };
      const onLeave = () => {
        gsap.to(card, {
          boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
          duration: 0.3,
        });
      };
      card.addEventListener('mouseenter', onEnter);
      card.addEventListener('mouseleave', onLeave);
      // Also trigger on focus for keyboard users
      card.addEventListener('focus', onEnter);
      card.addEventListener('blur', onLeave);
      hoverListeners.push({ el: card, onEnter, onLeave });
    });
  });
}

/**
 * Unmount — kill GSAP tweens and remove listeners.
 */
export function unmount() {
  const { gsap } = window;
  if (gsap) {
    tweens.forEach((t) => t.kill());
  }
  tweens = [];

  // Clean up hover/focus listeners
  hoverListeners.forEach(({ el, onEnter, onLeave }) => {
    el.removeEventListener('mouseenter', onEnter);
    el.removeEventListener('mouseleave', onLeave);
    el.removeEventListener('focus', onEnter);
    el.removeEventListener('blur', onLeave);
  });
  hoverListeners = [];
}
