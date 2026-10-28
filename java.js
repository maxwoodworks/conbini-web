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

// Use the logo's animation event so the sound follows the shared CSS timing.
const logo = document.querySelector(".logo");
const logoSound = document.querySelector("#logo-sound");
let logoSoundPending = false;

function removeSoundFallback() {
  document.removeEventListener("click", retryLogoSound);
  document.removeEventListener("keydown", retryLogoSound);
}

function playLogoSound() {
  logoSoundPending = false;
  logoSound.play().then(removeSoundFallback).catch((error) => {
    if (error.name === "NotAllowedError") {
      // If autoplay is blocked, the first click, tap or key can start the sound.
      logoSoundPending = true;
      document.addEventListener("click", retryLogoSound);
      document.addEventListener("keydown", retryLogoSound);
    }
  });
}

function retryLogoSound(event) {
  if (!event.isTrusted || !logoSoundPending || document.hidden) return;
  if (event.type === "keydown" && (event.repeat || event.metaKey || event.ctrlKey || event.altKey)) return;
  playLogoSound();
}

function onLogoAppear(event) {
  if (event.animationName !== "logo-appear") return;
  logo.removeEventListener("animationstart", onLogoAppear);
  playLogoSound();
}

logo.addEventListener("animationstart", onLogoAppear);

// Start halfway through the small scroll cushion, leaving room in both directions.
const navigation = performance.getEntriesByType("navigation")[0];
if (!window.location.hash && navigation?.type !== "back_forward") {
  requestAnimationFrame(() => {
    const buffer = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--scroll-buffer"));
    window.scrollTo(0, buffer);
  });
}
