// Small deterministic SVG charts. No libraries, no network, no randomness:
// the same data always draws the same picture.
const NAVY = '#12395e';
const TEAL = '#0e7c7b';
const AMBER = '#d98a1f';
const SLATE = '#5b6b7a';
const LIGHT = '#e8eef3';
const RED = '#b3402e';

function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');
}

function niceMax(values) {
  const m = Math.max(...values.map(Math.abs));
  if (m <= 0) return 1;
  const p = Math.pow(10, Math.floor(Math.log10(m)));
  const n = m / p;
  const step = n <= 1 ? 1 : n <= 1.5 ? 1.5 : n <= 2 ? 2 : n <= 2.5 ? 2.5 : n <= 3 ? 3 : n <= 4 ? 4 : n <= 5 ? 5 : n <= 6 ? 6 : n <= 8 ? 8 : 10;
  return step * p;
}

function frame(w, h, pad) {
  return { w, h, x0: pad.l, x1: w - pad.r, y0: pad.t, y1: h - pad.b };
}

// Vertical bars with value labels. values: numbers, labels: strings.
export function barChart(values, labels, opts = {}) {
  const w = opts.width || 640, h = opts.height || 260;
  const f = frame(w, h, { l: 44, r: 8, t: 14, b: 26 });
  const max = niceMax(values);
  const min = opts.min !== undefined ? opts.min : Math.min(0, ...values);
  const span = max - min;
  const bw = (f.x1 - f.x0) / values.length;
  const y = (v) => f.y1 - ((v - min) / span) * (f.y1 - f.y0);
  let s = `<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(opts.label || 'Bar chart')}">`;
  for (let i = 0; i <= 4; i++) {
    const v = min + (span * i) / 4;
    const yy = y(v);
    s += `<line x1="${f.x0}" y1="${yy}" x2="${f.x1}" y2="${yy}" stroke="${LIGHT}" stroke-width="1"/>`;
    s += `<text x="${f.x0 - 6}" y="${yy + 4}" text-anchor="end" font-size="11" fill="${SLATE}">${fmtTick(v, opts.format)}</text>`;
  }
  values.forEach((v, i) => {
    const x = f.x0 + i * bw + bw * 0.18;
    const bw2 = bw * 0.64;
    const color = v < 0 ? RED : (opts.highlight === i ? AMBER : (opts.color || TEAL));
    s += `<rect x="${x.toFixed(1)}" y="${y(Math.max(v, 0)).toFixed(1)}" width="${bw2.toFixed(1)}" height="${Math.abs(y(v) - y(0)).toFixed(1)}" rx="2" fill="${color}"/>`;
    s += `<text x="${(x + bw2 / 2).toFixed(1)}" y="${(y(v) - 5).toFixed(1)}" text-anchor="middle" font-size="11" font-weight="600" fill="${NAVY}">${fmtTick(v, opts.format)}</text>`;
    s += `<text x="${(x + bw2 / 2).toFixed(1)}" y="${h - 8}" text-anchor="middle" font-size="11" fill="${SLATE}">${esc(labels[i])}</text>`;
  });
  return s + '</svg>';
}

function fmtTick(v, format) {
  if (format === 'pct') return `${v}%`;
  if (format === 'money') return `$${v}`;
  if (format === 'int') return String(Math.round(v));
  if (Math.abs(v) >= 100) return String(Math.round(v));
  return String(Math.round(v * 10) / 10);
}

// Line chart with dots and a filled area. series: [{name, values, color}].
export function lineChart(series, labels, opts = {}) {
  const w = opts.width || 640, h = opts.height || 260;
  const f = frame(w, h, { l: 44, r: 10, t: 14, b: 26 });
  const all = series.flatMap((s) => s.values);
  const max = niceMax(all);
  const min = opts.min !== undefined ? opts.min : Math.min(0, ...all);
  const span = max - min;
  const x = (i) => f.x0 + (i / (labels.length - 1)) * (f.x1 - f.x0);
  const y = (v) => f.y1 - ((v - min) / span) * (f.y1 - f.y0);
  let s = `<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(opts.label || 'Line chart')}">`;
  for (let i = 0; i <= 4; i++) {
    const v = min + (span * i) / 4;
    const yy = y(v);
    s += `<line x1="${f.x0}" y1="${yy}" x2="${f.x1}" y2="${yy}" stroke="${LIGHT}" stroke-width="1"/>`;
    s += `<text x="${f.x0 - 6}" y="${yy + 4}" text-anchor="end" font-size="11" fill="${SLATE}">${fmtTick(v, opts.format)}</text>`;
  }
  series.forEach((ser) => {
    const pts = ser.values.map((v, i) => `${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(' ');
    s += `<polyline points="${pts}" fill="none" stroke="${ser.color}" stroke-width="2.5" stroke-linejoin="round"/>`;
    ser.values.forEach((v, i) => {
      s += `<circle cx="${x(i).toFixed(1)}" cy="${y(v).toFixed(1)}" r="3" fill="#fff" stroke="${ser.color}" stroke-width="2"/>`;
    });
  });
  labels.forEach((lb, i) => {
    s += `<text x="${x(i).toFixed(1)}" y="${h - 8}" text-anchor="middle" font-size="11" fill="${SLATE}">${esc(lb)}</text>`;
  });
  return s + '</svg>';
}

// Horizontal bars, good for ranking regions. rows: [{label, value}].
export function hbarChart(rows, opts = {}) {
  const rowH = opts.rowHeight || 30;
  const w = opts.width || 640;
  const h = rowH * rows.length + 14;
  const max = niceMax(rows.map((r) => r.value));
  const labelW = opts.labelWidth || 150;
  let s = `<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(opts.label || 'Horizontal bar chart')}">`;
  rows.forEach((r, i) => {
    const y = 7 + i * rowH;
    const bw = ((w - labelW - 70) * r.value) / max;
    s += `<text x="0" y="${y + 15}" font-size="12" fill="${NAVY}">${esc(r.label)}</text>`;
    s += `<rect x="${labelW}" y="${y + 2}" width="${bw.toFixed(1)}" height="16" rx="2" fill="${r.color || TEAL}"/>`;
    s += `<text x="${labelW + bw + 8}" y="${y + 15}" font-size="12" font-weight="600" fill="${NAVY}">${fmtTick(r.value, opts.format)}</text>`;
  });
  return s + '</svg>';
}

// Donut chart with a centre label. parts: [{name, share, color}].
export function donutChart(parts, opts = {}) {
  const size = opts.size || 240;
  const c = size / 2, r = size / 2 - 14, ir = r * 0.62;
  const total = parts.reduce((a, p) => a + p.share, 0);
  let a0 = -Math.PI / 2;
  let s = `<svg viewBox="0 0 ${size} ${size}" role="img" aria-label="${esc(opts.label || 'Donut chart')}">`;
  parts.forEach((p) => {
    const a1 = a0 + (p.share / total) * Math.PI * 2;
    const large = a1 - a0 > Math.PI ? 1 : 0;
    const x0 = c + r * Math.cos(a0), y0 = c + r * Math.sin(a0);
    const x1 = c + r * Math.cos(a1), y1 = c + r * Math.sin(a1);
    const x2 = c + ir * Math.cos(a1), y2 = c + ir * Math.sin(a1);
    const x3 = c + ir * Math.cos(a0), y3 = c + ir * Math.sin(a0);
    s += `<path d="M ${x0.toFixed(1)} ${y0.toFixed(1)} A ${r} ${r} 0 ${large} 1 ${x1.toFixed(1)} ${y1.toFixed(1)} L ${x2.toFixed(1)} ${y2.toFixed(1)} A ${ir} ${ir} 0 ${large} 0 ${x3.toFixed(1)} ${y3.toFixed(1)} Z" fill="${p.color}"/>`;
    a0 = a1;
  });
  s += `<text x="${c}" y="${c - 4}" text-anchor="middle" font-size="22" font-weight="700" fill="${NAVY}">${esc(opts.centre || '')}</text>`;
  s += `<text x="${c}" y="${c + 16}" text-anchor="middle" font-size="11" fill="${SLATE}">${esc(opts.centreSub || '')}</text>`;
  return s + '</svg>';
}

// Population pyramid: men left, women right, one row per age group.
export function pyramidChart(groups, opts = {}) {
  const w = opts.width || 640;
  const rowH = 34;
  const h = rowH * groups.length + 30;
  const max = Math.max(...groups.flatMap((g) => [g.men, g.women]));
  const mid = w / 2;
  const half = w / 2 - 96;
  const gap = 46;
  let s = `<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="Population pyramid 2025">`;
  s += `<text x="${mid - gap}" y="14" text-anchor="end" font-size="12" font-weight="700" fill="${NAVY}">Men</text>`;
  s += `<text x="${mid + gap}" y="14" font-size="12" font-weight="700" fill="${NAVY}">Women</text>`;
  groups.forEach((g, i) => {
    const y = 22 + i * rowH;
    const mw = (g.men / max) * half;
    const ww = (g.women / max) * half;
    s += `<rect x="${(mid - gap - mw).toFixed(1)}" y="${y}" width="${mw.toFixed(1)}" height="22" rx="2" fill="${NAVY}"/>`;
    s += `<rect x="${(mid + gap).toFixed(1)}" y="${y}" width="${ww.toFixed(1)}" height="22" rx="2" fill="${TEAL}"/>`;
    s += `<text x="${mid}" y="${y + 15}" text-anchor="middle" font-size="11" fill="${SLATE}">${esc(g.group)}</text>`;
    s += `<text x="${(mid - gap - 6).toFixed(1)}" y="${y + 15}" text-anchor="end" font-size="11" font-weight="600" fill="#fff">${g.men}</text>`;
    s += `<text x="${(mid + gap + 6).toFixed(1)}" y="${y + 15}" font-size="11" font-weight="600" fill="#fff">${g.women}</text>`;
  });
  s += `<text x="${mid}" y="${h - 4}" text-anchor="middle" font-size="11" fill="${SLATE}">Thousands of people, 2025</text>`;
  return s + '</svg>';
}

export const PALETTE = { navy: NAVY, teal: TEAL, amber: AMBER, slate: SLATE, red: RED };
