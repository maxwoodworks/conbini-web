"use strict";

// The sun and moon keep changing expression once per second.
const MASCOT_INTERVAL_MS = 1000;
const artboard = document.querySelector(".artboard");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
let mascotFrame = 0;
let mascotTimer;

function updateMotion() {
  clearInterval(mascotTimer);
  if (reducedMotion.matches || document.hidden) return;
  mascotTimer = setInterval(() => {
    mascotFrame = 1 - mascotFrame;
    artboard.dataset.mascotFrame = String(mascotFrame);
  }, MASCOT_INTERVAL_MS);
}

reducedMotion.addEventListener("change", updateMotion);
document.addEventListener("visibilitychange", updateMotion);
updateMotion();

// Start halfway through the small scroll cushion, leaving room in both directions.
const navigation = performance.getEntriesByType("navigation")[0];
if (!window.location.hash && navigation?.type !== "back_forward") {
  requestAnimationFrame(() => {
    const buffer = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--scroll-buffer"));
    window.scrollTo(0, buffer);
  });
}
