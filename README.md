# How Australia Plays — A Sport Participation Story

An interactive, single-page data-visualisation story about how Australia plays sport:
**who** is active, **where**, in **what**, and how activity changes across a lifetime.
Built with **Vega-Lite** for Monash **FIT2179 Data Visualisation 2** (Semester 1, 2026).

- **Author:** tluct404 *(replace with your full name before submitting)*
- **Created:** May 2026
- **Live site:** https://tluct404.github.io/FIT2179_Assignment/ *(after you enable GitHub Pages — see below)*

> **Domain note:** This submission's domain (Australian sport participation) is deliberately
> distinct from the Data Visualisation 1 domain (the video game *Valorant*).

## What's here

12 Vega-Lite visualisations, including **5 maps**, telling a four-chapter story:

1. **How active are we, really?** — headline activity rates, most-played sports, where people are active.
2. **Where the active millions are** — national choropleth + proportional-symbol map + a linked map-and-bar.
3. **Victoria up close** — per-capita facility choropleth, SEIFA symbol map, advantage-vs-access scatter.
4. **Who keeps moving through life** — activity by age, sex and income.

Each Vega-Lite spec is a separate, human-readable JSON file under [`/specs`](./specs) so it can be
browsed directly on GitHub.

## Data sources (two combined, all real)

| Source | Used for | Link |
| --- | --- | --- |
| **AusPlay** (Australian Sports Commission) | National participation rates, top sports, settings, income gap | https://www.clearinghouseforsport.gov.au/research/ausplay/results |
| **ABS — State & territory population** (Jun 2024) | Population maps + derived "estimated active people" | https://www.abs.gov.au/statistics/people/population/national-state-and-territory-population/jun-2024 |
| **ABS — Physical activity** (National Health Survey 2022) | Meeting-the-guidelines by age and sex | https://www.abs.gov.au/statistics/health/health-conditions-and-risks/physical-activity/latest-release |
| **ABS — SEIFA 2021** | Victorian socio-economic disadvantage (symbol map + scatter) | https://www.abs.gov.au/statistics/people/people-and-communities/socio-economic-indexes-areas-seifa-australia/latest-release |
| **rowanhogan/australian-states** | State/territory boundaries (GeoJSON) | https://github.com/rowanhogan/australian-states |
| **ABS ASGS 2023** | Victorian LGA boundaries (TopoJSON, simplified) | https://www.abs.gov.au/statistics/standards/australian-statistical-geography-standard-asgs-edition-3 |

**Derived data** (the "custom-built" elements): estimated weekly-active population
(`population × 66%` national rate), facilities per 1,000 people, and the SEIFA-vs-access relationship.
Total downloaded data is ≈ 0.4 MB — well under the "few MB" limit.

## Project structure

```
index.html              Single-page story
style.css               Typography, layout, colour
js/charts.js            Embeds each spec by URL with vega-embed
specs/*.vl.json         One readable Vega-Lite spec per visualisation
data/*.json             Small, pre-aggregated data files
geo/au-states.geojson   State/territory boundaries
geo/LGA_2023_VIC_GDA2020.json   Victorian LGA boundaries (TopoJSON)
sketch/                 Your hand-drawn sketch PDF goes here
```

## Running locally

Charts fetch JSON, which browsers block on `file://`. Serve over HTTP, e.g.:

- **VS Code:** right-click `index.html` → *Open with Live Server*, or
- any static server (`npx serve`, `python -m http.server`, etc.)

Then open the served URL. (On GitHub Pages it just works.)

## Deploy to GitHub Pages

```bash
git remote add origin https://github.com/tluct404/FIT2179_Assignment.git
git push -u origin main
```

Then on GitHub: **Settings → Pages → Source: Deploy from a branch → `main` / root → Save.**
The site appears at `https://tluct404.github.io/FIT2179_Assignment/` within a minute or two.

## ✅ Before you submit

- [ ] **Fill the Victorian data.** `data/vic_lga.json` has `seifa_irsd_decile`, `lat`, `lon` set to
      `null`. The choropleth (chart 07) already works; the symbol map (08) and scatter (09) render
      once you add those three columns from your SEIFA + LGA-centroid export. LGA names already match.
- [ ] **Confirm/cite the Victorian facilities dataset** source in this README (the facility counts in
      `data/vic_lga.json` came from your earlier file — add its original source URL).
- [ ] **Replace `tluct404`** with your full name in `index.html`, `README.md` and chart bylines.
- [ ] **Add your hand-drawn sketch** as `sketch/sketch.pdf` (≥ 4 clearly labelled sections) and link
      its GitHub URL on Moodle. *(The sketch is worth 2% and must be hand-drawn, not digital.)*
- [ ] **Verify the live URL** loads, no chart 404s, and every `specs/*.json` is publicly browsable.

## Acknowledgement of AI use

Generative AI (Claude) assisted with authoring and refining the Vega-Lite specifications, the page
layout/CSS, and the grammar and style of the narrative text. All data sourcing, chart-design
decisions and the analytical story are the author's own; data values were taken from the public
sources listed above and were not generated by AI.
