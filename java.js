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

// The opening click unlocks audio; the logo's animation event starts the sound.
const intro = document.querySelector(".intro");
const introTrigger = document.querySelector(".intro__trigger");
const logo = document.querySelector(".logo");
const logoSound = document.querySelector("#logo-sound");
let introStarted = false;
let logoSoundReady = Promise.resolve(null);

function prepareLogoSound() {
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) return;
  try {
    const context = new AudioContextClass();
    // Resume synchronously within the click, keeping playback available later.
    const resumed = context.resume();
    const data = fetch(logoSound.src).then((response) => {
      if (!response.ok) throw new Error("Unable to load the intro sound.");
      return response.arrayBuffer();
    });
    logoSoundReady = Promise.all([resumed, data])
      .then(([, bytes]) => context.decodeAudioData(bytes))
      .then((buffer) => ({ context, buffer }))
      .catch(() => {
        context.close().catch(() => {});
        return null;
      });
  } catch {
    // The audio element remains available if Web Audio is unavailable.
  }
}

async function playLogoSound() {
  const prepared = await logoSoundReady;
  if (!prepared) {
    logoSound.play().catch(() => {});
    return;
  }
  const source = prepared.context.createBufferSource();
  source.buffer = prepared.buffer;
  source.connect(prepared.context.destination);
  source.onended = () => prepared.context.close().catch(() => {});
  source.start();
}

function startIntro() {
  if (introStarted || reducedMotion.matches) return;
  introStarted = true;
  prepareLogoSound();
  introTrigger.disabled = true;
  document.body.classList.add("intro-started");
}

function onLogoAppear(event) {
  if (event.animationName !== "logo-appear" || !introStarted) return;
  logo.removeEventListener("animationstart", onLogoAppear);
  playLogoSound();
}

function skipIntroForReducedMotion() {
  if (!reducedMotion.matches) return;
  intro.hidden = true;
  introTrigger.disabled = true;
  document.body.classList.add("intro-complete");
}

introTrigger.addEventListener("click", startIntro, { once: true });
intro.addEventListener("animationend", (event) => {
  if (event.animationName === "intro-fade") intro.hidden = true;
});
logo.addEventListener("animationstart", onLogoAppear);
reducedMotion.addEventListener("change", skipIntroForReducedMotion);
skipIntroForReducedMotion();

// Start halfway through the small scroll cushion, leaving room in both directions.
const navigation = performance.getEntriesByType("navigation")[0];
if (!window.location.hash && navigation?.type !== "back_forward") {
  requestAnimationFrame(() => {
    const buffer = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--scroll-buffer"));
    window.scrollTo(0, buffer);
  });
}
