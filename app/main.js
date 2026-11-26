// Boot and routing for the NSO Auralia site. Hash routes: #/ #/economy #/population
// #/regions #/releases. Unknown hashes fall back to the home page.
import { VIEWS, csvFor, setEconTab, setRegionSort } from './views.js';
import { ABOUT } from './data.js';

const app = document.getElementById('app');
const NAV = [
  ['#/', 'Home'], ['#/economy', 'Economy'], ['#/population', 'Population'],
  ['#/regions', 'Regions'], ['#/releases', 'Releases & data'],
];

function route() {
  const hash = location.hash || '#/';
  const key = hash.replace('#/', '').split('/')[0] || 'home';
  const view = VIEWS[key] || VIEWS.home;
  app.innerHTML = view();
  document.querySelectorAll('nav a').forEach((a) => {
    a.classList.toggle('on', a.getAttribute('href') === '#/' + (key === 'home' ? '' : key));
  });
  window.scrollTo(0, 0);
}

function downloadCsv(kind) {
  const blob = new Blob([csvFor(kind)], { type: 'text/csv' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `auralia-${kind}.csv`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}

// One delegated listener covers every control the pages render.
document.addEventListener('click', (e) => {
  const range = e.target.closest('[data-range]');
  if (range) {
    app.innerHTML = VIEWS.home(range.dataset.range);
    return;
  }
  const tab = e.target.closest('[data-tab]');
  if (tab) {
    setEconTab(tab.dataset.tab);
    app.innerHTML = VIEWS.economy();
    return;
  }
  const sort = e.target.closest('[data-sort]');
  if (sort) {
    setRegionSort(sort.dataset.sort);
    app.innerHTML = VIEWS.regions();
    return;
  }
  const csv = e.target.closest('[data-csv]');
  if (csv) {
    downloadCsv(csv.dataset.csv);
  }
});

// The finder re-renders the releases page live as you type.
document.addEventListener('input', (e) => {
  if (e.target.id === 'finder') {
    const pos = e.target.selectionStart;
    app.innerHTML = VIEWS.releases(e.target.value);
    const again = document.getElementById('finder');
    again.focus();
    again.setSelectionRange(pos, pos);
  }
});

document.querySelector('nav').innerHTML = NAV.map(([h, t]) => `<a href="${h}">${t}</a>`).join('');
document.getElementById('updated').textContent = `Updated ${ABOUT.updated}`;
window.addEventListener('hashchange', route);
route();
