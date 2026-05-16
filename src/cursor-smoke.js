// --- src/cursor-smoke.js ---
// KOTA-style fluid smoke trail using GSAP quickTo
// Durations mapped to design.md motion tokens:
// instant=200ms, fast=250ms, normal=300ms, slow=400ms, slower=500ms

let quickTos = [];
let moveHandler = null;

/**
 * Initialize the cursor smoke trail.
 * 7 wisps with durations derived from design.md motion scale.
 */
export function initCursorSmoke() {
  const { gsap } = window;
  if (!gsap) return;

  const tails = [
    document.querySelector('.tail-1'),
    document.querySelector('.tail-2'),
    document.querySelector('.tail-3'),
    document.querySelector('.tail-4'),
    document.querySelector('.tail-5'),
    document.querySelector('.tail-6'),
    document.querySelector('.tail-7'),
  ];

  if (tails.some((t) => !t)) return;

  gsap.set(tails, { xPercent: -50, yPercent: -50 });

  // Motion token mapping (design.md → seconds)
  // Head wisps use instant/fast, far wisps extend beyond the scale
  const config = [
    { dur: 0.20, ease: 'power2' },   // motion.instant
    { dur: 0.25, ease: 'power2' },   // motion.fast
    { dur: 0.40, ease: 'power3' },   // motion.slow
    { dur: 0.50, ease: 'power3' },   // motion.slower
    { dur: 0.80, ease: 'power3' },   // extended
    { dur: 1.10, ease: 'power4' },   // extended
    { dur: 1.50, ease: 'power4' },   // extended (atmospheric)
  ];

  const drivers = tails.map((el, i) => ({
    x: gsap.quickTo(el, 'x', { duration: config[i].dur, ease: config[i].ease }),
    y: gsap.quickTo(el, 'y', { duration: config[i].dur, ease: config[i].ease }),
  }));

  quickTos = drivers;

  moveHandler = (e) => {
    const { clientX, clientY } = e;
    for (const d of drivers) {
      d.x(clientX);
      d.y(clientY);
    }
  };

  window.addEventListener('mousemove', moveHandler);
}

/**
 * Destroy cursor smoke (cleanup).
 */
export function destroyCursorSmoke() {
  if (moveHandler) {
    window.removeEventListener('mousemove', moveHandler);
    moveHandler = null;
  }
  quickTos = [];
}
