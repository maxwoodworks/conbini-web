# Conbini

A buildless HTML, CSS and JavaScript website based on `CONBINI WEB.ai`.

Live site: https://maxwoodworks.github.io/conbini-web/

Open this CONBINI folder in Visual Studio Code. Open `index.html` directly in a browser, or use the VS Code Live Server extension. There are no dependencies or build steps.

- `index.html` — artwork and the two repeating ticker phrases: “@conbini.nz” and “open 7 days!”.
- `style.css` — the plain pink, single-screen layout, opening fade and widely spaced scrolling ticker.
- `java.js` — the sun and moon’s one-second expression changes, logo sound and the initial scroll-cushion position.
- `assets/konbini-intro.mp3` — the sound that plays once when the centre logo reappears, with a 49% volume reduction from the original source applied to the audio file.
- `assets/` — original Illustrator artwork and outlined Bodoni lettering.

The updated logo is extracted directly from the Illustrator source. Each page load opens with the oversized logo on pink and waits for a click, tap or keyboard activation. Hovering the opening logo with a mouse enlarges it by 2%. Activating it unlocks the audio and immediately begins the five-second fade into the page. The centre logo stays hidden throughout that fade and for 0.5 more seconds afterward, then appears in place with the sound, 5.5 seconds after activation. `assets/konbini-intro.mp3` is preloaded and its volume is reduced to 51% of the local `KONBINI.mp3` source, with the reduction applied directly to the audio so it also works on phones. Audio is enabled during the opening click and starts from the centre logo's appearance event. On portrait phones up to 600px wide, the opening wordmark runs vertically down almost the full screen, with a small margin around it. Reduced-motion visitors go straight to the complete page without the intro sound. The fade duration and centre logo wait share timing variables at the top of `style.css`.

The original artwork retains its proportions within a layout that fits the viewport. Portrait screens use a separate layout that also fits into one screen. The blue description box, grain, play/pause control, and falling logo effect are removed. Our Menu and About us are artwork labels with no popups.

The artwork, footer lettering, scrolling lettering, and ticker height are reduced by 15%, with the corner positions preserved.

A tiny 2px vertical scroll cushion in each direction adds a small amount of movement around the starting position. The whole page—including the ticker, artwork and footer—scrolls together, with the scrollbar hidden and natural browser overscroll bounce enabled.

The ticker uses matching type sizes and baselines, with equal spacing between every item and at the loop boundary. Four identical pairs keep the shorter sequence filled throughout the loop. Each loop takes 24 seconds on desktop and 28 seconds on portrait screens. The bar sits close to the top corners. Our Menu, Great Food, Great Days! and About us share one horizontal baseline in a single row close to the bottom edge, including on phones. Reduced-motion preferences are respected.

To change the mascot interval, edit `MASCOT_INTERVAL_MS` in `java.js`. The lettering is outlined SVG artwork, so visitors do not need the original fonts. The two current ticker graphics are `assets/ticker-web-address.svg` and `assets/ticker-hours.svg`.

GitHub Pages publishes `main` from `/ (root)`. `.nojekyll` keeps the site buildless. Keep the Illustrator source and temporary files local.
