/* ============================================================
   How Australia Plays — chart loader
   Embeds each external Vega-Lite spec by URL into its container.
   Specs are kept as separate, human-readable JSON files in /specs
   so they are easy to browse on GitHub.
   ============================================================ */

const embedOptions = {
  renderer: 'svg',
  actions: false,        // presentation, not an exploration tool
  config: { background: null }
};

// container id  ->  spec file
const charts = [
  ['vis-kpi',          'specs/01_kpi_strip.vl.json'],
  ['vis-sports',       'specs/02_top_sports_lollipop.vl.json'],
  ['vis-where',        'specs/03_where_active_bar.vl.json'],
  ['vis-statepop',     'specs/04_state_pop_choropleth.vl.json'],
  ['vis-stateactive',  'specs/05_state_active_symbols.vl.json'],
  ['vis-linked',       'specs/06_state_linked_bar.vl.json'],
  ['vis-vicchoro',     'specs/07_vic_choropleth.vl.json'],
  ['vis-vicsymbol',    'specs/08_vic_symbol_seifa.vl.json'],
  ['vis-vicscatter',   'specs/09_vic_scatter_seifa.vl.json'],
  ['vis-age',          'specs/10_age_line.vl.json'],
  ['vis-sex',          'specs/11_sex_bars.vl.json'],
  ['vis-income',       'specs/12_income_dumbbell.vl.json']
];

charts.forEach(([id, spec]) => {
  const el = document.getElementById(id);
  if (!el) return;
  vegaEmbed('#' + id, spec, embedOptions).catch((err) => {
    console.error('Failed to render', spec, err);
    el.innerHTML =
      '<p style="color:#8a6400;background:#fff7e6;border:1px dashed #F2A900;' +
      'border-radius:8px;padding:12px 14px;font-size:0.9rem;margin:0;">' +
      'This chart could not load. If you are viewing the file locally, serve it over ' +
      'HTTP (charts fetch JSON, which browsers block on <code>file://</code>). ' +
      'On GitHub Pages it loads normally.</p>';
  });
});
