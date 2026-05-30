# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Static, client-side data-visualisation site for Monash **FIT2179 Data Visualisation 2** - a sport-
participation story ("How Australia Plays"). Plain `index.html` + `style.css` + one embed script;
**Vega-Lite v5** charts loaded as external JSON specs via vega-embed (all from CDN). No build step,
package manager, framework, or tests.

## Running / verifying

No Node or Python is available in this environment, so there is **no local server and no
Vega-Lite render check here**. Charts fetch JSON, which browsers block on `file://`, so the real
verification path is **GitHub Pages** (or the user's own Live Server). JSON specs can still be
validated as parseable via PowerShell:

```powershell
Get-ChildItem specs,data -Filter *.json -Recurse | ForEach-Object {
  try { Get-Content $_.FullName -Raw | ConvertFrom-Json | Out-Null; "OK $($_.Name)" }
  catch { "FAIL $($_.Name): $($_.Exception.Message)" } }
```

## Architecture

`js/charts.js` holds the single source of truth: a `charts` array mapping each `#vis-*` container id
(in `index.html`) to its `specs/NN_*.vl.json` file, embedded with `{renderer:'svg', actions:false}`.
**To add/change a chart, edit the `charts` array AND the matching `<div id="vis-…">` card in
`index.html`.** Errors render an inline "serve over HTTP" hint rather than failing silently.

The page is a single scrollable narrative: hero → 4 chapters (cards in a `.grid-2` or `.full`) →
takeaway → metadata footer. Layout is responsive CSS grid that collapses to one column ≤820px;
`overflow-x:hidden` on `body` guarantees no horizontal scroll (a rubric hard requirement).

### Data model - two real sources, combined (rubric requirement)

- **AusPlay** (Australian Sports Commission): national rates, top sports, settings, income gap.
- **ABS**: state/territory population (ERP Jun 2024) + physical activity by age/sex (NHS 2022) + SEIFA.

All data lives in small `data/*.json` files. **No fabricated data** - the brief is strict, and the
mark is 0 for fabrication. Notably, per-state participation *rates* were not publicly retrievable, so
the national maps deliberately use only real population (ABS) plus a clearly-labelled *derived*
metric: estimated weekly-active people = `population × 0.66` (AusPlay's national weekly rate).

### Maps (5 total)

- National maps (`04`,`05`,`06`) use `geo/au-states.geojson` (FeatureCollection, name field
  `properties.STATE_NAME`) read via `format:{type:"json",property:"features"}`, conicEqualArea
  projection auto-fitted to the data. State tabular data joins by `STATE_NAME ↔ state`.
- Victorian maps (`07`,`08`) use `geo/LGA_2023_VIC_GDA2020.json` (TopoJSON, feature
  `LGA_2023_AUST_GDA2020`, name `properties.LGA_NAME23`, includes suffixes like `"Bayside (Vic.)"`),
  mercator. They join `data/vic_lga.json` by `LGA_NAME23 ↔ lga`.
- `06` is a custom **linked map+bar** (hconcat) coordinated by a top-level point-selection param
  `sel` on field `state`; default empty-selection-means-all keeps everything full-opacity until a
  state is clicked.

### Known scaffolding state

`data/vic_lga.json` has real `facilities`/`population`/`facilities_per_1k` (so the VIC choropleth
`07` works) but `seifa_irsd_decile`/`lat`/`lon` are `null`. Specs `08` (symbol map) and `09`
(scatter) filter out null rows, so they render empty until the user supplies those three columns.
This is intentional and documented in README "Before you submit".

## Conventions

- Every spec: v5 `$schema`, a meaningful `"description"` (doubles as the marking rationale),
  `"width":"container"` for responsiveness (except `06`'s fixed-width hconcat), 2-space indent.
- Palette in `style.css` `:root`: turf green `#2E8B57`/`#1F5F3A` + Australian gold `#F2A900`.
  Charts hard-code the same hex values. Sequential green schemes for ordered map quantities.
- Fonts (Google Fonts in `index.html`): Anton (hero), Poppins (headings), Inter (body + chart text).
