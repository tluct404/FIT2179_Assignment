/* ============================================================
   How Australia Plays - chart loader
   Embeds each external Vega-Lite spec by URL into its container.
   Specs are kept as separate, human-readable JSON files in /specs
   so they are easy to browse on GitHub.
   ============================================================ */

const embedOptions = {
  renderer: 'svg',
  actions: false,        // presentation, not an exploration tool
  config: { background: null }
};

// container id  ->  spec file  (distinct idioms; several custom-built)
const charts = [
  ['vis-funnel',      'specs/01_participation_funnel.vl.json'], // funnel (derived)
  ['vis-sports',      'specs/02_top_sports_lollipop.vl.json'],  // lollipop
  ['vis-where',       'specs/03_where_active_bar.vl.json'],     // bar
  ['vis-stateactive', 'specs/04_state_active_symbols.vl.json'], // proportional-symbol map
  ['vis-statearc',    'specs/05_state_arc.vl.json'],            // donut / arc
  ['vis-vicchoro',    'specs/06_vic_choropleth.vl.json'],       // choropleth map
  ['vis-vicscatter',  'specs/07_vic_bubble_scatter.vl.json'],   // bubble scatter (size = population)
  ['vis-vicbeeswarm', 'specs/08_vic_beeswarm.vl.json'],         // beeswarm / jittered strip
  ['vis-age',         'specs/09_age_line.vl.json'],             // line
  ['vis-strength',    'specs/10_strength_waffle.vl.json'],      // waffle / unit chart
  ['vis-income',      'specs/11_income_dumbbell.vl.json']       // dumbbell
];

charts.forEach(([id, spec]) => {
  const el = document.getElementById(id);
  if (!el) return;
  vegaEmbed('#' + id, spec, embedOptions).catch((err) => {
    console.error('Failed to render', spec, err);
    el.innerHTML =
      '<p style="color:#8a6400;background:#fff7e6;border:1px dashed #DD9A2B;' +
      'border-radius:8px;padding:12px 14px;font-size:0.9rem;margin:0;">' +
      'This chart could not load. If you are viewing the file locally, serve it over ' +
      'HTTP (charts fetch JSON, which browsers block on <code>file://</code>). ' +
      'On GitHub Pages it loads normally.</p>';
  });
});
