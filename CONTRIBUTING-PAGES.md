# Adding or editing a page

One page = one file `src/content/pages/<id>.ts` exporting `definePage({...})` (types in
`src/lib/guide-types.ts`). The file name must equal `id`. Model: `free-government-phone.ts`. The page is built
at `/en/<en.slug>/`; menus, footer, home lists and sitemap follow by themselves. English only (en-US).

## Fields

- `group`: `qualify`, `benefit`, `apply` or `states`; `order`: position (qualify 1–19, benefit 20–39, apply 40–59, states 60–79).
- `tool`: the main tool, shown right under the H1:
  - `{ kind: 'elig', props?: { state, size, income, program } }` (eligibility checker; program: none, snap, medicaid, ssi, fpha, vets, tribal)
  - `{ kind: 'providers', props?: { state } }` (approved companies by state and ZIP code, USAC data)
  - `{ kind: 'recert' }` (recertification calendar)
  - `{ kind: 'steps' }` (application timeline)
  - `{ kind: 'mini:<spec>' }`, specs in `src/lib/mini-specs.ts`, always computed by `src/lib/engine/lifeline.ts`.
- `mini`: a second tool under the citable block (same kinds).
- In a body, `<!--tool:mini:mss-->` or `<!--tool:elig|{"state":"TX"}-->` places a tool between paragraphs.
- `related`: 3–5 page ids. `sources`: keys of `src/data/params-2026.json` → `sources`.
- `demarche: true` on pages about the official procedure (adds the "independent, not the FCC or USAC" line).

## Text rules (checked by `npx vitest run tests/pages.test.ts`, then `npm run check`)

- `title` 50–60 characters, key term first, never "How…", "What…", "US…" first.
- `description` 150–160 characters.
- `resume(h)`: ONE paragraph (no tags but links) of at least 120 words answering the page's query with figures.
- `faqs(h)`: 3–5 questions unique across the site, each answer 42–88 words, plain text.
- `body(h)`: HTML with at least three `<h2>` sections; resume + body at least 650 words. No `<h1>`.
- No em dash; US spelling; dates in words ("November 30, 2027").
- Pages must read differently (check-unique): no shared boilerplate paragraph.
- Links only to official sources (`h.src(key, text)`) and internal pages (`h.a(id, text)`). Never a phone company,
  an enrollment site, a lead seller or a forum; never mention a search engine or another site.
- Never recommend or rank a company: company names appear only in the USAC lists.

## Figures

Never type a limit, an amount or a date: read them through `h` (`src/lib/helpers.ts`): `h.lim(size, area)`,
`h.limitTable`, `h.fpg`, `h.lim200`, `h.caLim`, `h.support('broadband'|'voice', tribal)`, `h.S`, `h.R`, `h.MSS`,
`h.ACP`, `h.CA`, `h.TX`, `h.companyCount(st)`, `h.topCompanies`, `h.companyTable`, `h.subs(st)`, `h.subsRank`,
`h.date(iso)`, `h.table(headers, rows, caption, align)`. A fact that is not in an official publication is not written.

## Data

- `src/data/params-2026.json`: rules, limits, amounts and sources (date in `retrieved_at`), read by hand.
- `src/data/providers.json`, `public/data/zip/<ST>.json`, `src/data/subscribers.json`, `src/data/state-counts.json`:
  built by `python3 scripts/update-data.py` from USAC open data (exit code 2 when the company list changed).
  Run by hand for now; the workflow `.github/workflows/update-data.yml` runs it monthly once the site is online.
