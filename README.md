# Handoff: Rudhira Website Redesign

## Overview
Professional redesign of the Rudhira hackathon pitch site (soaked1.github.io/rudhira/website/). All 10 sections, sourced copy/numbers, and functionality (unit-economics calculator, live wastage counter, EN/HI toggle, dark/light theme) are preserved; the FAQ section was removed per request.

## About these files
These are **production-ready static files**, not references to reimplement — vanilla HTML/CSS/JS matching the repo's existing stack, no build step. The task is simply to commit them into the repo.

## What to do
Repo: `SoAkeD1/rudhira`, branch `main`, target folder `website/`.

1. Clone/pull the repo.
2. Copy these 5 files into `website/`, **overwriting** the existing `website/index.html`:
   - index.html
   - styles.css (new)
   - script.js (new)
   - translations.js (new)
   - image-slot.js (new — powers the hero photo drag-and-drop slot; outside this app's preview environment it just renders the `src` already set on `#hero-photo` in index.html as a static image, so no runtime change needed)
3. Leave `website/join.html` and `website/og-image.png` as-is — index.html still links to them.
4. Commit and push to `main` (or open a PR — whichever the user prefers).

## Notes
- The hero photo currently points at a placeholder Unsplash URL with credit set on `#hero-photo` (image-slot.js). Swap the `src` attribute for the project's own photography when available.
- Fonts load from Google Fonts (Source Serif 4, Libre Franklin, IBM Plex Mono) via `<link>` in `<head>` — no local font files needed.
- No other repo files need to change.
