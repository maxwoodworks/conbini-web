"use strict";

// Change this value to adjust the sun/moon AND grain interval together.
const MASCOT_INTERVAL_MS = 1000;
const artboard = document.querySelector(".artboard");
const motionToggle = document.querySelector(".motion-toggle");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
let isPaused = reducedMotion.matches;
let mascotFrame = 0;
let mascotTimer;

function changeMascotsAndGrain() {
  mascotFrame = 1 - mascotFrame;
  artboard.dataset.mascotFrame = String(mascotFrame);
  // Both changes happen in the same frame; the grain never drifts independently.
  document.documentElement.style.setProperty("--grain-x", `${Math.floor(Math.random() * 180)}px`);
  document.documentElement.style.setProperty("--grain-y", `${Math.floor(Math.random() * 180)}px`);
}

function updateMotion() {
  clearInterval(mascotTimer);
  document.body.classList.toggle("is-paused", isPaused);
  motionToggle.setAttribute("aria-pressed", String(isPaused));
  const label = isPaused ? "Resume animations" : "Pause animations";
  motionToggle.setAttribute("aria-label", label);
  motionToggle.title = label;
  if (!isPaused && !document.hidden) {
    mascotTimer = setInterval(changeMascotsAndGrain, MASCOT_INTERVAL_MS);
  }
}

motionToggle.addEventListener("click", () => {
  isPaused = !isPaused;
  updateMotion();
});
reducedMotion.addEventListener("change", event => {
  isPaused = event.matches;
  updateMotion();
});
document.addEventListener("visibilitychange", updateMotion);
updateMotion();

// Native dialogs provide Escape-to-close and keyboard focus management.
document.querySelectorAll("[data-open-dialog]").forEach(button => {
  button.addEventListener("click", () => {
    document.getElementById(button.dataset.openDialog).showModal();
  });
});
document.querySelectorAll("dialog").forEach(dialog => {
  dialog.addEventListener("click", event => {
    if (event.target !== dialog) return;
    const box = dialog.getBoundingClientRect();
    if (event.clientX < box.left || event.clientX > box.right ||
        event.clientY < box.top || event.clientY > box.bottom) dialog.close();
  });
});
