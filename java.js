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
