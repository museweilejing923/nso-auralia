// NSO Auralia entrypoint (Node 22, standard library only). The site is the app/
// folder beside this file: plain static files a browser opens with no build step
// and no network request. This program hands it in: it copies app/ and
// screenshots/ into the grader's output directory and writes dossier.json, the
// summary the judge reads, with the vendored make.fun library. The library must
// stay untouched: the scorer only accepts a dossier byte for byte as its own
// copy writes it.
//
// Run it outside the grader with MAKEFUN_OUTPUT_DIR standing in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { cpSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-frontend.ts';

// The folder this file lives in, so the copy works wherever the repo is checked out.
const here = fileURLToPath(new URL('.', import.meta.url));
const out = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

// The site must be here: refuse loudly instead of handing in an empty folder.
if (!existsSync(join(here, 'app', 'index.html'))) {
  throw new Error('main.ts: app/index.html is missing beside this file; nothing to hand in');
}

// Fresh output directory, then the site itself and its screenshots.
mkdirSync(out, { recursive: true });
cpSync(join(here, 'app'), join(out, 'app'), { recursive: true });
mkdirSync(join(out, 'screenshots'), { recursive: true });
if (existsSync(join(here, 'screenshots'))) {
  cpSync(join(here, 'screenshots'), join(out, 'screenshots'), { recursive: true });
}

// The scorer's own caps (reference/gate.json). text_max_bytes is the only one
// that shapes the dossier's bytes; the rest refuse an entry the scorer would
// refuse anyway: more than 4 screenshots or one over 256 KiB, more than 993
// files and directories in app/ or 16 MiB of app files in all (app/ counts
// beside /output's own 1000-entry cap, its screenshots/ and dossier.json).
const dossier = buildDossier(out, {
  text_max_bytes: 163840,
  screenshots: { max: 4, max_bytes: 262144 },
  app_max_files: 993,
  app_max_bytes: 16777216,
});
writeFileSync(join(out, 'dossier.json'), dossier);
console.log(`NSO Auralia site written to ${out}`);
