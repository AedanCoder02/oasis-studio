// --- src/main.js ---
// Application entry point
// Orchestrates: CSS imports, router, mesh gradient, i18n

// Import all CSS modules (Vite bundles them automatically)
import './styles/base.css';
import './styles/nav.css';
import './styles/layout.css';
import './styles/bento.css';
import './styles/cta.css';
import './styles/mesh-gradient.css';
import './styles/responsive.css';

// Import core modules
import { initRouter } from './router.js';
import { initMeshGradient } from './mesh-gradient.js';
import { initI18n } from './i18n.js';

/**
 * Boot the application when DOM is ready.
 */
// ---------------------------------------------------------------------------
// Mouse-follow spotlight (premium cursor glow effect)
// ---------------------------------------------------------------------------
function initSpotlight() {
  if (window.matchMedia('(pointer: coarse)').matches) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const el = document.createElement('div');
  el.className = 'mouse-spotlight';
  document.body.appendChild(el);

  let cx = window.innerWidth / 2, cy = window.innerHeight / 2;
  let tx = cx, ty = cy;

  document.addEventListener('mousemove', e => { tx = e.clientX; ty = e.clientY; });

  const tick = () => {
    cx += (tx - cx) * 0.07;
    cy += (ty - cy) * 0.07;
    el.style.transform = `translate(calc(${cx}px - 50%), calc(${cy}px - 50%))`;
    requestAnimationFrame(tick);
  };
  tick();
}

function boot() {
  const appRoot = document.getElementById('app-root');

  if (!appRoot) {
    console.error('[Oasis] #app-root not found in DOM');
    return;
  }

  // 1. Initialize i18n (binds toggle, applies default lang)
  initI18n();

  // 2. Initialize persistent mesh gradient background
  initMeshGradient();

  // 3. Initialize router (reads hash, mounts first view)
  initRouter(appRoot);

  // 4. Global mouse spotlight (premium cursor glow)
  initSpotlight();

  // 5. Mobile hamburger menu
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.querySelector('.nav-links');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('open');
    });

    // Close menu when a nav link is clicked
    navLinks.querySelectorAll('a[data-route]').forEach((link) => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('open');
      });
    });
  }

  // 5. Bind footer SPA navigation links
  document.querySelector('.site-footer')?.querySelectorAll('a[data-route]').forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      window.location.hash = link.getAttribute('data-route');
    });
  });

  console.log('[Oasis Studio] Booted successfully ✦');
}

// Wait for DOM
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}
