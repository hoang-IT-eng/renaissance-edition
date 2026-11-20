# The RenAIssance Edition — Recreation Study

A study recreation of [Shopify Editions · Winter '26](https://www.shopify.com/editions/winter2026)
("The RenAIssance Edition"), built with the **creative-web-replicator** skill
at **Tier C+**: a DOM/CSS/GSAP rebuild (typography, palette, layout, section
flow, scroll choreography) plus a parallax painting engine — not a mirror of
Shopify's production bundle or artwork.

## What was studied from the original
- Black opening, then a full-screen painting as a book's title page
  (Creation-of-Adam composition remixed with modern props: pink coffee cup,
  pink shopping bags, skateboard, white sneakers)
- A fixed left contents rail: wordmark with script "ai", chapters I–XII in
  Roman numerals with dotted leaders, clickable at any time
- Every chapter = full-screen painting with a giant grotesque title, then a
  warm-paper page: headline updates as browser-chrome cards, minor updates
  in two columns of small print
- Script swash drop caps opening serif group headlines
- Torn-paper / brushstroke edges between night and paper
- Hidden surprises: the shoppable pink beanie in the Checkout painting
  ($14.52 — Leonardo's birth year, 1452) and a floating key that unlocks a
  graffiti layer

## Techniques (per the skill)
- `--u: min(calc(100vw / 1600), calc(100vh / 900))` mathematical layout unit
- Lenis on the GSAP ticker, every effect behind one `motionDisabled()` gate
- Procedural Web Audio (sub-bass drone + glass taps), off by default
- CSS film grain + vignette as the "post-processing" grade
- All paintings are original AI-generated works in a classical style.
  No assets, code or copy were taken from the original site; feature names
  and counts are factual changelog data. Not affiliated with Shopify.

## Run locally
```bash
node ~/workspace/custom-skills/creative-web-replicator/scripts/serve-mirror.mjs web 4177
# → http://127.0.0.1:4177  (COOP/COEP headers included, per the skill)
```
