# Conbini

A plain HTML, CSS and JavaScript website based on `CONBINI WEB.ai`.

## Open in Visual Studio Code

Open this CONBINI folder. The main files are:

- `index.html` — page content, scrolling phrases and menu/about dialogs.
- `style.css` — layout, colours, responsive styling, grain and logo entrance.
- `java.js` — the synchronised one-second mascot/grain changes and animation pause control.
- `assets/` — original artwork exported as SVGs, plus a small grain texture.

Open `index.html` directly in a browser, or use the VS Code Live Server extension. There are no build steps, packages, external fonts, or third-party scripts.

## Layout and animation

The desktop canvas is **1920 × 1080 (16:9)** and scales proportionally up to the original size. Below 640px, a separate mobile layout keeps the artwork and controls readable.

Both original and off-artboard mascot expressions were extracted from the Illustrator file. `MASCOT_INTERVAL_MS` in `java.js` controls their interval (1000 = one second). The grain shifts at the same moment. The main logo drops in with a small bounce on page load. The top bar loops continuously with even gaps between phrases.

The small pause control in the bottom-right corner stops the animations. Reduced-motion settings are respected.

The Illustrator lettering is preserved as outlined SVG artwork, so the page does not depend on visitors having the original fonts installed. Update the matching SVG to replace that lettering.

## Content still to add

The supplied artwork does not include a full menu, prices, or a verified Instagram profile URL. The Our Menu dialog clearly says the full menu is coming soon. No prices or social profile have been invented.

## GitHub Pages

Publish the `main` branch from `/ (root)` in the repository’s **Settings → Pages**. `.nojekyll` keeps the site buildless. All asset references are relative, so the website works at a GitHub Pages project URL.

Only website files need to be published. Keep the Illustrator source and Illustrator temporary files local.
