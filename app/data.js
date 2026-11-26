// Auralia in numbers. Auralia is a fictional country; every figure below is the
// site's own internally consistent dataset, compiled by its National Statistics
// Office for this site. Years run 2015-2025 unless a table says otherwise.

export const YEARS = [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025];

// Headline indicators, latest year first, with the previous year for the change.
export const HEADLINE = [
  { id: 'population', label: 'Population', value: '8.42m', change: '+0.8%', note: 'mid-2025 estimate', unit: 'people' },
  { id: 'gdp', label: 'GDP', value: '$612.4bn', change: '+3.1%', note: '2025, current prices', unit: 'US dollars' },
  { id: 'gdp-pc', label: 'GDP per capita', value: '$72,700', change: '+2.3%', note: '2025', unit: 'US dollars' },
  { id: 'unemployment', label: 'Unemployment rate', value: '4.1%', change: '-0.2 pts', note: 'Oct 2026, seasonally adjusted', unit: 'percent' },
  { id: 'cpi', label: 'Consumer prices', value: '+2.3%', change: '-0.5 pts', note: 'Oct 2026, year on year', unit: 'percent' },
  { id: 'income', label: 'Median household income', value: '$68,900', change: '+1.5%', note: '2025', unit: 'US dollars' },
  { id: 'life', label: 'Life expectancy', value: '82.4 yrs', change: '+0.3 yrs', note: '2024, at birth', unit: 'years' },
  { id: 'trade', label: 'Trade balance', value: '+$17.3bn', change: '+$2.1bn', note: '2025, goods', unit: 'US dollars' },
];

// Annual series, 2015-2025.
export const SERIES = {
  gdp:        [412.1, 428.6, 447.3, 469.8, 488.2, 472.6, 501.9, 536.4, 571.2, 593.8, 612.4],
  gdpGrowth:  [2.4, 4.0, 4.4, 5.0, 3.9, -3.2, 6.2, 6.9, 6.5, 3.9, 3.1],
  cpi:        [0.9, 1.2, 1.8, 2.1, 1.7, 0.8, 2.9, 6.1, 4.4, 2.8, 2.3],
  unemployment: [6.8, 6.4, 5.9, 5.4, 5.1, 7.9, 6.6, 5.3, 4.6, 4.3, 4.1],
  population: [7.71, 7.78, 7.85, 7.93, 8.01, 8.06, 8.12, 8.20, 8.28, 8.35, 8.42],
  income:     [54.2, 55.6, 57.1, 58.9, 60.4, 59.8, 62.3, 65.1, 66.8, 67.9, 68.9],
  exports:    [148.2, 156.7, 168.9, 181.4, 189.6, 171.2, 198.5, 219.8, 228.4, 233.1, 238.6],
  imports:    [139.5, 147.1, 158.3, 172.0, 180.9, 166.4, 188.2, 205.6, 213.9, 217.9, 221.3],
};

// Share of gross value added by sector, 2025 (%). Sums to 100.0.
export const SECTORS = [
  { name: 'Services', share: 68.4, note: 'finance, health, education, retail' },
  { name: 'Manufacturing', share: 14.8, note: 'food, machinery, electronics' },
  { name: 'Construction', share: 6.7, note: 'housing and infrastructure' },
  { name: 'Mining & energy', share: 4.9, note: 'copper, lithium, hydro power' },
  { name: 'Agriculture', share: 3.2, note: 'grain, dairy, wine' },
  { name: 'Other', share: 2.0, note: 'arts, utilities, other' },
];

// Goods trade by partner, 2025 (% of exports). Sums to 100.0.
export const PARTNERS = [
  { name: 'Nordland', exports: 18.2, imports: 15.9 },
  { name: 'Kestrel Isles', exports: 12.4, imports: 11.8 },
  { name: 'Vardonia', exports: 11.1, imports: 13.2 },
  { name: 'Ostara', exports: 9.6, imports: 8.7 },
  { name: 'Talamar', exports: 8.3, imports: 9.1 },
  { name: 'Other partners', exports: 40.4, imports: 41.3 },
];

// The eight regions. Populations sum to 8.42m, the national total.
export const REGIONS = [
  { name: 'Capital Region', pop: 2.41, gdpPc: 96400, unemp: 3.2, income: 78400, density: 412 },
  { name: 'North Coast', pop: 1.38, gdpPc: 74200, unemp: 4.0, income: 70200, density: 86 },
  { name: 'Eastern Plains', pop: 1.12, gdpPc: 61800, unemp: 4.8, income: 63100, density: 21 },
  { name: 'Southern Hills', pop: 0.98, gdpPc: 58300, unemp: 5.1, income: 59800, density: 34 },
  { name: 'Western Valleys', pop: 0.87, gdpPc: 63900, unemp: 4.4, income: 65400, density: 47 },
  { name: 'Lake District', pop: 0.72, gdpPc: 59700, unemp: 4.9, income: 61200, density: 58 },
  { name: 'Far North', pop: 0.54, gdpPc: 66100, unemp: 5.6, income: 58900, density: 4 },
  { name: 'Island Territories', pop: 0.40, gdpPc: 52400, unemp: 6.2, income: 55300, density: 12 },
];

// Age structure, 2025. Group totals in thousands sum to 8,420; men 4,130, women 4,290.
export const PYRAMID = [
  { group: '0–14', men: 724, women: 691 },
  { group: '15–24', men: 512, women: 490 },
  { group: '25–34', men: 578, women: 567 },
  { group: '35–44', men: 551, women: 552 },
  { group: '45–54', men: 516, women: 528 },
  { group: '55–64', men: 492, women: 518 },
  { group: '65–74', men: 425, women: 468 },
  { group: '75+', men: 332, women: 476 },
];

export const DEMOGRAPHY = [
  { label: 'Births, 2025', value: '86,400', note: '10.3 per 1,000 people' },
  { label: 'Deaths, 2025', value: '71,200', note: '8.5 per 1,000 people' },
  { label: 'Net migration, 2025', value: '+52,300', note: 'arrivals minus departures' },
  { label: 'Median age', value: '41.6 years', note: 'up from 39.8 in 2015' },
  { label: 'Share aged 65+', value: '20.2%', note: '1.70m people' },
  { label: 'Share aged under 15', value: '16.8%', note: '1.42m people' },
  { label: 'Fertility rate', value: '1.62', note: 'children per woman' },
  { label: 'Urban population', value: '78.4%', note: '6.60m people' },
];

// Latest releases, newest first.
export const RELEASES = [
  { date: '26 Nov 2026', title: 'Labour Force, October 2026', theme: 'Labour', summary: 'Unemployment steady at 4.1%; employment up 18,000 on the month; participation 66.8%.' },
  { date: '20 Nov 2026', title: 'Consumer Price Index, October 2026', theme: 'Prices', summary: 'Annual inflation eases to 2.3%; food up 3.1%, energy down 1.4% on the year.' },
  { date: '13 Nov 2026', title: 'Gross Domestic Product, Q3 2026', theme: 'Economy', summary: 'GDP grows 0.7% on the quarter; services lead, construction recovers, mining softens.' },
  { date: '6 Nov 2026', title: 'Trade in Goods, September 2026', theme: 'Trade', summary: 'Goods surplus $1.6bn in the month; exports of machinery at a record high.' },
  { date: '30 Oct 2026', title: 'Population Estimates, mid-2026', theme: 'Population', summary: 'Population 8.46m at 30 June 2026; net migration adds 52,300 over the year.' },
  { date: '23 Oct 2026', title: 'Regional Accounts, 2025', theme: 'Regions', summary: 'Capital Region GDP per capita $96,400; Island Territories grow fastest at 4.6%.' },
];

export const CALENDAR = [
  { date: '4 Dec 2026', title: 'Consumer Price Index, November 2026', theme: 'Prices' },
  { date: '11 Dec 2026', title: 'Labour Force, November 2026', theme: 'Labour' },
  { date: '18 Dec 2026', title: 'Gross Domestic Product, Q3 2026 (revised)', theme: 'Economy' },
  { date: '15 Jan 2027', title: 'Household Income and Spending, 2025', theme: 'Living standards' },
  { date: '29 Jan 2027', title: 'Population by Age and Sex, 2026', theme: 'Population' },
  { date: '12 Feb 2027', title: 'Gross Domestic Product, Q4 2026', theme: 'Economy' },
];

// Indicator index for the search box and the data page.
export const INDICATORS = [
  { name: 'Gross domestic product (GDP)', theme: 'Economy', latest: '$612.4bn', page: '#/economy' },
  { name: 'GDP per capita', theme: 'Economy', latest: '$72,700', page: '#/economy' },
  { name: 'Consumer price index (CPI)', theme: 'Prices', latest: '+2.3% y/y', page: '#/economy' },
  { name: 'Unemployment rate', theme: 'Labour', latest: '4.1%', page: '#/economy' },
  { name: 'Employment', theme: 'Labour', latest: '4.21m people', page: '#/economy' },
  { name: 'Population', theme: 'Population', latest: '8.42m', page: '#/population' },
  { name: 'Population by age and sex', theme: 'Population', latest: 'Median age 41.6', page: '#/population' },
  { name: 'Net migration', theme: 'Population', latest: '+52,300', page: '#/population' },
  { name: 'Life expectancy at birth', theme: 'Health', latest: '82.4 years', page: '#/population' },
  { name: 'Median household income', theme: 'Living standards', latest: '$68,900', page: '#/regions' },
  { name: 'Exports of goods', theme: 'Trade', latest: '$238.6bn', page: '#/economy' },
  { name: 'Imports of goods', theme: 'Trade', latest: '$221.3bn', page: '#/economy' },
  { name: 'Regional GDP per capita', theme: 'Regions', latest: '$52,400 – $96,400', page: '#/regions' },
  { name: 'Regional unemployment', theme: 'Regions', latest: '3.2% – 6.2%', page: '#/regions' },
  { name: 'Fertility rate', theme: 'Population', latest: '1.62', page: '#/population' },
  { name: 'Housing completions', theme: 'Housing', latest: '41,200 dwellings', page: '#/regions' },
];

export const ABOUT = {
  country: 'Auralia',
  office: 'National Statistics Office of Auralia',
  short: 'NSO Auralia',
  updated: '26 November 2026',
  note: 'Figures on this site are the Office’s own published estimates for Auralia. '
    + 'Methods, definitions and revisions are documented on the Releases page.',
};
