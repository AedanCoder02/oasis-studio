// --- src/router.js ---
// Hash-based SPA Router
// Keeps #app-root as the dynamic injection target
// Emits CustomEvent('route-change') for mesh-gradient (decoupled)

import { applyTranslation } from './i18n.js';

/**
 * Route registry — lazy imports for code splitting.
 */
const routes = {
  '#home': () => import('./views/home.js'),
  '#services': () => import('./views/services.js'),
  '#about': () => import('./views/about.js'),
  '#contact': () => import('./views/contact.js'),
};

const DEFAULT_ROUTE = '#home';

let currentView = null;
let appRoot = null;

function hideSkeleton() {
  document.getElementById('skeleton-screen')?.classList.add('sk-done');
}

/**
 * Navigate to a route hash.
 * Fades out existing content while loading the next module in parallel,
 * then fades in the new view. On first load, dismisses the skeleton screen.
 */
async function navigate(hash) {
  if (!hash || !routes[hash]) hash = DEFAULT_ROUTE;

  const hasContent = appRoot.children.length > 0;

  // Fade out current content and load next module simultaneously
  if (hasContent) appRoot.style.opacity = '0';
  const viewModule = await routes[hash]();
  // Wait for the CSS fade-out to complete (matches #app-root transition: 0.22s)
  if (hasContent) await new Promise((r) => setTimeout(r, 230));

  if (currentView?.unmount) currentView.unmount();
  appRoot.innerHTML = '';
  currentView = viewModule;
  viewModule.mount(appRoot);

  // Fade in new content
  requestAnimationFrame(() => { appRoot.style.opacity = '1'; });

  // Dismiss skeleton on first navigation
  hideSkeleton();

  applyTranslation();

  window.dispatchEvent(
    new CustomEvent('route-change', { detail: { route: hash } })
  );

  updateActiveNavLink(hash);
}

/**
 * Highlight the currently active nav link.
 */
function updateActiveNavLink(hash) {
  document.querySelectorAll('.nav-links a[data-route]').forEach((a) => {
    a.classList.toggle('active', a.getAttribute('data-route') === hash);
  });
}

/**
 * Handle hash changes from URL bar or back/forward.
 */
function onHashChange() {
  const hash = window.location.hash || DEFAULT_ROUTE;
  navigate(hash);
}

/**
 * Initialize the router.
 * @param {HTMLElement} root — the #app-root element
 */
export function initRouter(root) {
  appRoot = root;

  // Listen for hash changes
  window.addEventListener('hashchange', onHashChange);

  // Intercept nav clicks for SPA behavior
  document.querySelectorAll('a[data-route]').forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const route = link.getAttribute('data-route');
      window.location.hash = route;
    });
  });

  // Initial route
  const hash = window.location.hash || DEFAULT_ROUTE;
  if (hash !== window.location.hash) {
    window.location.hash = hash;
  } else {
    navigate(hash);
  }
}
