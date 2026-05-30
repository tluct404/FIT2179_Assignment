# How Australia Plays - A Sport Participation Story

An interactive, single-page data-visualisation story about how Australia plays sport:
**who** is active, **where**, in **what**, and how activity changes across a lifetime.
Built with **Vega-Lite** for Monash **FIT2179 Data Visualisation 2** (Semester 1, 2026).

- **Author:** tluct404 *(replace with your full name before submitting)*
- **Created:** May 2026
- **Live site:** https://tluct404.github.io/FIT2179_Assignment/ *(after you enable GitHub Pages - see below)*

> **Domain note:** This submission's domain (Australian sport participation) is deliberately
> distinct from the Data Visualisation 1 domain (the video game *Valorant*).

## What's here

**11 Vega-Lite visualisations across distinct idioms** (funnel · lollipop · bar · proportional-symbol
map · donut · bubble scatter · choropleth map · beeswarm · line · waffle · dumbbell), including **2 maps**,
telling a four-chapter story:

1. **How active are we, really?** - the participation funnel (84→66→48%), most-played sports (lollipop), where people are active (bar).
2. **Where the active millions are** - estimated weekly-active people by state (proportional-symbol map) + population share (donut).
3. **Victoria up close** - per-capita facilities (choropleth map), a population-sized bubble scatter of advantage vs access, and a beeswarm of all 79 councils.
4. **Who keeps moving through life** - guidelines by age (line), the strength-training gap (waffle), the income gap (dumbbell); the gender gap is described in the text.

**Custom-built / hard-to-automate elements** (HD criterion): the derived estimated-weekly-active
population (population times the national activity rate), the centred-bar participation funnel, the
population-sized bubble scatter and beeswarm, and the per-capita facility choropleth.

Each Vega-Lite spec is a separate, human-readable JSON file under [`/specs`](./specs) so it can be
browsed directly on GitHub.

## Data sources (two combined, all real)

| Source | Used for | Link |
| --- | --- | --- |
| **AusPlay** (Australian Sports Commission) | National participation rates, top sports, settings, income gap | https://www.clearinghouseforsport.gov.au/research/ausplay/results |
| **ABS - State & territory population** (Jun 2024) | Population maps + derived "estimated active people" | https://www.abs.gov.au/statistics/people/population/national-state-and-territory-population/jun-2024 |
| **ABS - Physical activity** (National Health Survey 2022) | Meeting the guidelines by age and sex; the muscle-strengthening gap | https://www.abs.gov.au/statistics/health/health-conditions-and-risks/physical-activity/latest-release |
| **ABS - SEIFA 2021** | Victorian socio-economic disadvantage (advantage-vs-access scatter) | https://www.abs.gov.au/statistics/people/people-and-communities/socio-economic-indexes-areas-seifa-australia/latest-release |
| **rowanhogan/australian-states** | State/territory boundaries (GeoJSON) | https://github.com/rowanhogan/australian-states |
| **Victorian LGA boundaries** (ABS ASGS 2023, simplified TopoJSON) | VIC council maps | https://github.com/sherwinzxw/australian-spatial-data |

**Derived data** (the "custom-built" elements): estimated weekly-active population
(`population × 66%` national rate), facilities per 1,000 people, and the SEIFA-vs-access relationship.
Total downloaded data is ≈ 0.4 MB - well under the "few MB" limit.

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

- **Windows (no Node/Python needed):** `powershell -ExecutionPolicy Bypass -File serve.ps1`, then open `http://localhost:8000`
- **VS Code:** right-click `index.html` → *Open with Live Server*
- any static server (`npx serve`, `python -m http.server`, etc.)

(On GitHub Pages it just works.)

## Deploy to GitHub Pages

```bash
git remote add origin https://github.com/tluct404/FIT2179_Assignment.git
git push -u origin main
```

Then on GitHub: **Settings → Pages → Source: Deploy from a branch → `main` / root → Save.**
The site appears at `https://tluct404.github.io/FIT2179_Assignment/` within a minute or two.

## ✅ Before you submit

- [x] **Victorian data filled.** `data/vic_lga.json` now includes `seifa_irsd_decile`, `lat` and `lon`,
      so the VIC choropleth (06), bubble scatter (07) and beeswarm (08) all render.
- [ ] **Confirm/cite the Victorian facilities dataset** source in this README (the facility counts in
      `data/vic_lga.json` came from your earlier file - add its original source URL).
- [ ] **Replace `tluct404`** with your full name in `index.html`, `README.md` and chart bylines.
- [ ] **Add your hand-drawn sketch** as `sketch/sketch.pdf` (≥ 4 clearly labelled sections) and link
      its GitHub URL on Moodle. *(The sketch is worth 2% and must be hand-drawn, not digital.)*
- [ ] **Verify the live URL** loads, no chart 404s, and every `specs/*.json` is publicly browsable.

## Acknowledgement of AI use

Generative AI (Claude) assisted with authoring and refining the Vega-Lite specifications, the page
layout/CSS, and the grammar and style of the narrative text. All data sourcing, chart-design
decisions and the analytical story are the author's own; data values were taken from the public
sources listed above and were not generated by AI.
