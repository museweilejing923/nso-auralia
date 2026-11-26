// Pages for the NSO Auralia site. Hash routing, no framework: each route renders
// into #app. Every control on a page does what it says: tabs switch the chart,
// the year buttons re-cut the series, table headers sort, downloads save a CSV.
import { YEARS, HEADLINE, SERIES, SECTORS, PARTNERS, REGIONS, PYRAMID, DEMOGRAPHY, RELEASES, CALENDAR, INDICATORS, ABOUT } from './data.js';
import { barChart, lineChart, hbarChart, donutChart, pyramidChart, PALETTE } from './charts.js';

const shortYears = YEARS.map((y) => String(y).slice(2));

function kpiCards() {
  return '<section class="kpis">' + HEADLINE.map((k) => `
    <article class="kpi">
      <h3>${k.label}</h3>
      <p class="kpi-value">${k.value}</p>
      <p class="kpi-change">${k.change} <span>${k.note}</span></p>
    </article>`).join('') + '</section>';
}

function releaseList(items) {
  return '<ol class="releases">' + items.map((r) => `
    <li><span class="rel-date">${r.date}</span>
      <div><a href="#/releases">${r.title}</a>
      <p>${r.summary}</p><span class="tag">${r.theme}</span></div></li>`).join('') + '</ol>';
}

function themeCards() {
  const themes = [
    { page: '#/economy', title: 'Economy', text: 'GDP, prices, trade and the labour market.', stat: 'GDP $612.4bn' },
    { page: '#/population', title: 'Population', text: 'Age, sex, births, deaths and migration.', stat: '8.42m people' },
    { page: '#/regions', title: 'Regions', text: 'How the eight regions compare.', stat: 'GDP pc $52,400 – $96,400' },
    { page: '#/releases', title: 'Releases & data', text: 'Release calendar, methods and downloads.', stat: 'Next: CPI, 4 Dec' },
  ];
  return '<section class="cards">' + themes.map((t) => `
    <a class="card" href="${t.page}"><h3>${t.title} →</h3><p>${t.text}</p><p class="card-stat">${t.stat}</p></a>`).join('') + '</section>';
}

// ---- Home ----
function homeView(range = 'all') {
  const cut = range === '5' ? 6 : range === '3' ? 8 : 0;
  const years = YEARS.slice(cut);
  const labels = years.map((y) => String(y).slice(2));
  const gdp = SERIES.gdp.slice(cut);
  const growth = SERIES.gdpGrowth.slice(cut);
  const cpi = SERIES.cpi.slice(cut);
  return `
  <section class="hero">
    <p class="eyebrow">Official statistics · Updated ${ABOUT.updated}</p>
    <h1>Auralia in numbers</h1>
    <p class="lede">The National Statistics Office publishes the figures the country runs on:
    the economy, prices, jobs, people and the regions — free for everyone, with the
    methods behind every number.</p>
  </section>
  ${kpiCards()}
  <section class="panel">
    <div class="panel-head">
      <div><h2>Gross domestic product</h2><p class="sub">$ billion, current prices · 2015–2025</p></div>
      <div class="seg" role="group" aria-label="Year range">
        <button data-range="all" class="${range === 'all' ? 'on' : ''}">2015–25</button>
        <button data-range="5" class="${range === '5' ? 'on' : ''}">Last 5 yrs</button>
        <button data-range="3" class="${range === '3' ? 'on' : ''}">Last 3 yrs</button>
      </div>
    </div>
    ${barChart(gdp, labels, { label: 'GDP by year', format: 'money', highlight: gdp.length - 1 })}
    <p class="caption">GDP grew 3.1% in 2025 to $612.4bn. The 2020 dip (−3.2%) is the pandemic year;
    growth averaged 4.6% a year in 2021–2023.</p>
  </section>
  <div class="two-col">
    <section class="panel">
      <h2>Growth and prices</h2>
      <p class="sub">Annual change, % · 2015–2025</p>
      ${lineChart([
        { name: 'GDP growth', values: SERIES.gdpGrowth, color: PALETTE.teal },
        { name: 'Consumer prices', values: SERIES.cpi, color: PALETTE.amber },
      ], shortYears, { label: 'GDP growth and CPI', format: 'pct', min: -4 })}
      <p class="legend"><span class="sw teal"></span>GDP growth <span class="sw amber"></span>Consumer prices</p>
    </section>
    <section class="panel">
      <h2>Latest releases</h2>
      <p class="sub">Newest first · <a href="#/releases">Full calendar →</a></p>
      ${releaseList(RELEASES.slice(0, 4))}
    </section>
  </div>
  <h2 class="section-title">Explore by theme</h2>
  ${themeCards()}`;
}

// ---- Economy ----
let econTab = 'gdp';
function economyView() {
  const tab = econTab;
  let chart = '', note = '';
  if (tab === 'gdp') {
    chart = lineChart([{ name: 'GDP', values: SERIES.gdp, color: PALETTE.navy }], shortYears, { label: 'GDP 2015-2025', format: 'money', min: 350, height: 170 });
    note = 'GDP in current prices. Real GDP (adjusted for prices) grew 2.6% in 2025.';
  } else if (tab === 'prices') {
    chart = barChart(SERIES.cpi, shortYears, { label: 'CPI by year', format: 'pct', highlight: 7 });
    note = 'Consumer price index, annual change. The 2022 peak of 6.1% was energy-led; inflation has eased every year since.';
  } else {
    chart = lineChart([
      { name: 'Exports', values: SERIES.exports, color: PALETTE.teal },
      { name: 'Imports', values: SERIES.imports, color: PALETTE.amber },
    ], shortYears, { label: 'Exports and imports', format: 'money', min: 120 });
    note = 'Goods trade, $ billion. The 2025 surplus of $17.3bn is the largest on record.';
  }
  const sectorColors = [PALETTE.navy, PALETTE.teal, '#7fb3a8', PALETTE.amber, '#c9a86a', '#9aa8b5'];
  const donut = donutChart(SECTORS.map((s, i) => ({ ...s, color: sectorColors[i] })), { centre: '68.4%', centreSub: 'services share', size: 180 });
  const legend = SECTORS.map((s, i) => `<li><span class="sw" style="background:${sectorColors[i]}"></span>${s.name} <b>${s.share}%</b> — ${s.note}</li>`).join('');
  const partners = PARTNERS.map((p) => `<tr><td>${p.name}</td><td>${p.exports}%</td><td>${p.imports}%</td></tr>`).join('');
  return `
  <section class="hero slim"><p class="eyebrow">Theme · Economy</p><h1>The economy</h1>
  <p class="lede">Output, prices and trade for Auralia, 2015–2025. All series are seasonally
  adjusted where the release says so; the full tables are downloadable as CSV.</p></section>
  <section class="panel">
    <div class="tabs" role="tablist">
      <button data-tab="gdp" class="${tab === 'gdp' ? 'on' : ''}">Output</button>
      <button data-tab="prices" class="${tab === 'prices' ? 'on' : ''}">Prices</button>
      <button data-tab="trade" class="${tab === 'trade' ? 'on' : ''}">Trade</button>
    </div>
    ${chart}
    <p class="caption">${note}</p>
    <p><button class="btn" data-csv="economy">Download the economy series (CSV)</button></p>
  </section>
  <div class="two-col">
    <section class="panel"><h2>What the economy makes</h2>
      <p class="sub">Share of gross value added, 2025</p>
      <div class="donut-wrap">${donut}</div>
      <ul class="legend-list">${legend}</ul></section>
    <section class="panel"><h2>Trade by partner</h2>
      <p class="sub">Share of goods trade, 2025 (%)</p>
      <table class="data"><thead><tr><th>Partner</th><th>Exports</th><th>Imports</th></tr></thead>
      <tbody>${partners}</tbody></table>
      <p class="caption">Nordland is the largest partner both ways; the top five take 59.6% of exports.</p></section>
  </div>
  <section class="panel"><h2>Labour market</h2>
    <p class="sub">Unemployment rate, % · 2015–2025</p>
    ${barChart(SERIES.unemployment, shortYears, { label: 'Unemployment by year', format: 'pct' })}
    <p class="caption">Unemployment fell from 6.8% in 2015 to 4.1% in 2025. The 2020 spike to 7.9%
    unwound within two years; employment reached 4.21m people in October 2026.</p></section>`;
}

// ---- Population ----
function populationView() {
  const demo = DEMOGRAPHY.map((d) => `<tr><td>${d.label}</td><td><b>${d.value}</b></td><td>${d.note}</td></tr>`).join('');
  return `
  <section class="hero slim"><p class="eyebrow">Theme · Population</p><h1>People of Auralia</h1>
  <p class="lede">8.42 million people at mid-2025 — growing by about 70,000 a year, mostly from
  migration, and getting older: the median age is 41.6, up from 39.8 in 2015.</p></section>
  <div class="two-col">
    <section class="panel"><h2>Age and sex, 2025</h2>
      <p class="sub">Population pyramid · thousands</p>
      ${pyramidChart(PYRAMID)}
      <p class="caption">Women outnumber men from age 35 up; above 75 there are 476,000 women
      to 332,000 men.</p></section>
    <section class="panel"><h2>Population growth</h2>
      <p class="sub">Millions · 2015–2025</p>
      ${lineChart([{ name: 'Population', values: SERIES.population, color: PALETTE.teal }], shortYears, { label: 'Population 2015-2025', min: 7.5 })}
      <p class="caption">Growth averaged 0.9% a year. Natural increase (births minus deaths) added
      15,200 people in 2025; net migration added 52,300.</p>
      <p><button class="btn" data-csv="population">Download the population series (CSV)</button></p></section>
  </div>
  <section class="panel"><h2>Demography in brief</h2>
    <table class="data"><thead><tr><th>Measure</th><th>Latest</th><th>Note</th></tr></thead>
    <tbody>${demo}</tbody></table></section>`;
}

// ---- Regions ----
let regionSort = { key: 'pop', dir: -1 };
function regionsView() {
  const rows = [...REGIONS].sort((a, b) => (a[regionSort.key] - b[regionSort.key]) * regionSort.dir);
  const arrow = (k) => regionSort.key === k ? (regionSort.dir === -1 ? ' ▼' : ' ▲') : '';
  const body = rows.map((r) => `<tr><td>${r.name}</td><td>${r.pop.toFixed(2)}m</td><td>$${r.gdpPc.toLocaleString('en-US')}</td><td>${r.unemp.toFixed(1)}%</td><td>$${r.income.toLocaleString('en-US')}</td><td>${r.density}/km²</td></tr>`).join('');
  const chart = hbarChart([...REGIONS].sort((a, b) => b.gdpPc - a.gdpPc).map((r) => ({ label: r.name, value: r.gdpPc, color: r.name === 'Capital Region' ? PALETTE.amber : PALETTE.teal })), { label: 'GDP per capita by region', format: 'money', labelWidth: 140 });
  return `
  <section class="hero slim"><p class="eyebrow">Theme · Regions</p><h1>Eight regions, one country</h1>
  <p class="lede">The Capital Region holds 29% of the people and the highest output per head;
  the Island Territories are smallest and grow fastest. Click a column heading to sort.</p></section>
  <section class="panel"><h2>GDP per capita by region, 2025</h2>
    <p class="sub">US dollars per person</p>${chart}
    <p class="caption">The gap between the richest and poorest region is $44,000 per person —
    narrower than in 2015, when it was $51,000.</p></section>
  <section class="panel"><h2>Regional table, 2025</h2>
    <p class="sub">Click a heading to sort · <button class="btn small" data-csv="regions">Download as CSV</button></p>
    <table class="data sortable"><thead><tr>
      <th data-sort="name">Region${arrow('name')}</th><th data-sort="pop">Population${arrow('pop')}</th>
      <th data-sort="gdpPc">GDP per capita${arrow('gdpPc')}</th><th data-sort="unemp">Unemployment${arrow('unemp')}</th>
      <th data-sort="income">Median income${arrow('income')}</th><th data-sort="density">Density${arrow('density')}</th>
    </tr></thead><tbody>${body}</tbody></table>
    <p class="caption">Sources: Regional Accounts 2025; Population Estimates mid-2026; Labour Force October 2026.</p></section>`;
}

// ---- Releases ----
function releasesView(filter = '') {
  const q = filter.trim().toLowerCase();
  const rel = RELEASES.filter((r) => !q || (r.title + r.summary + r.theme).toLowerCase().includes(q));
  const ind = INDICATORS.filter((i) => !q || (i.name + i.theme).toLowerCase().includes(q));
  return `
  <section class="hero slim"><p class="eyebrow">Releases &amp; data</p><h1>Releases, methods, downloads</h1>
  <p class="lede">Every release lands at 09:30 on its day, free to read and reuse. Search below
  to find a release or an indicator.</p></section>
  <section class="panel"><h2>Find a release or indicator</h2>
    <input id="finder" type="search" placeholder="Try “inflation”, “migration” or “trade”…" value="${filter.replace(/"/g, '&quot;')}" aria-label="Search releases and indicators">
    <p class="sub">${rel.length} release${rel.length === 1 ? '' : 's'} · ${ind.length} indicator${ind.length === 1 ? '' : 's'} match${q ? ` “${filter}”` : ''}</p>
    ${releaseList(rel)}
    <h3 class="subhead">Indicator index</h3>
    <table class="data"><thead><tr><th>Indicator</th><th>Theme</th><th>Latest</th></tr></thead>
    <tbody>${ind.map((i) => `<tr><td><a href="${i.page}">${i.name}</a></td><td>${i.theme}</td><td><b>${i.latest}</b></td></tr>`).join('') || '<tr><td colspan="3">Nothing matches — try a shorter word.</td></tr>'}</tbody></table></section>
  <div class="two-col">
    <section class="panel"><h2>Coming up</h2>
      <ol class="releases">${CALENDAR.map((c) => `<li><span class="rel-date">${c.date}</span><div><b>${c.title}</b><p>${c.theme}</p></div></li>`).join('')}</ol></section>
    <section class="panel"><h2>Methods &amp; revisions</h2>
      <p>Figures are estimates from surveys and administrative records. Each release notes its
      sample, its seasonal adjustment and its revision policy; GDP is revised twice, prices never.</p>
      <p>Counts use the resident population at 30 June. Money is in US dollars at current prices
      unless a table says “real”. Small areas are suppressed where fewer than 50 people are counted.</p>
      <p class="caption">${ABOUT.note}</p>
      <p><button class="btn" data-csv="all">Download all headline series (CSV)</button></p></section>
  </div>`;
}

function csvFor(kind) {
  const head = 'year,gdp_usd_bn,gdp_growth_pct,cpi_pct,unemployment_pct,population_m,median_income_usd,exports_usd_bn,imports_usd_bn\n';
  const rows = YEARS.map((y, i) => [y, SERIES.gdp[i], SERIES.gdpGrowth[i], SERIES.cpi[i], SERIES.unemployment[i], SERIES.population[i], SERIES.income[i] * 1000, SERIES.exports[i], SERIES.imports[i]].join(',')).join('\n');
  if (kind === 'regions') {
    return 'region,population_m,gdp_per_capita_usd,unemployment_pct,median_income_usd,density_per_km2\n'
      + REGIONS.map((r) => [r.name, r.pop, r.gdpPc, r.unemp, r.income, r.density].join(',')).join('\n');
  }
  if (kind === 'population') {
    return 'age_group,men_thousands,women_thousands\n' + PYRAMID.map((g) => [g.group, g.men, g.women].join(',')).join('\n');
  }
  return head + rows;
}

export const VIEWS = { home: homeView, economy: economyView, population: populationView, regions: regionsView, releases: releasesView };
export { csvFor };
export function setEconTab(t) { econTab = t; }
export function setRegionSort(k) {
  if (regionSort.key === k) regionSort.dir *= -1;
  else regionSort = { key: k, dir: k === 'name' ? 1 : -1 };
}
