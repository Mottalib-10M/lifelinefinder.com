/** Writing helpers handed to every page: links, figures read from params-2026.json and the USAC data, tables. */
import { route, ROUTES, type Locale } from '../i18n/routes';
import { formatNumberL, money, pct, dateL, monthL } from './format-l';
import { limit135, fpg, limit200, support, caLimit, STATE_NAMES, STATE_CODES, type Area } from './engine/lifeline';
import P from '../data/params-2026.json';
import PV from '../data/providers.json';
import SB from '../data/subscribers.json';

export type SourceKey = keyof typeof P.sources;
const esc = (s: string | number) => String(s).replace(/&(?!(?:[a-z]+|#\d+);)/g, '&amp;').replace(/</g, '&lt;');
export function table(headers: string[], rows: Array<Array<string | number>>, caption: string | undefined, align: Array<'l' | 'r'>) {
  const al = (i: number) => (align[i] === 'r' ? 'text-right' : 'text-left');
  return `<div class="not-prose my-6 overflow-x-auto"><table class="journal w-full text-sm">${caption ? `<caption class="mb-2 text-left text-sm text-navy-600">${caption}</caption>` : ''}<thead><tr>${headers.map((h, i) => `<th scope="col" class="px-3 py-2 text-xs font-semibold uppercase tracking-wide text-navy-700 ${al(i)}">${h}</th>`).join('')}</tr></thead><tbody>${rows.map((r) => `<tr>${r.map((c, i) => `<td class="tabular-nums border-b border-navy-100 px-3 py-2 text-navy-800 ${al(i)}">${typeof c === 'number' ? esc(formatNumberL(c)) : c}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
}

/** Every page id of the plan: a link to a planned page not written yet renders as text. */
export const PLANNED = [
  'free-government-phone', 'lifeline-eligibility', 'lifeline-income-limits', 'free-phone-with-medicaid', 'free-phone-with-food-stamps', 'tribal-lifeline',
  'lifeline-program', 'lifeline-phone', 'free-iphone-government', 'free-tablet-with-ebt', 'free-internet-for-low-income', 'affordable-connectivity-program', 'lifeline-vs-acp',
  'how-to-get-a-free-government-phone', 'free-government-phone-providers', 'lifeline-documents', 'lifeline-recertification', 'lifeline-non-usage', 'lifeline-transfer', 'lifeline-scams',
  'free-government-phone-california', 'free-government-phone-texas', 'free-government-phone-florida', 'free-government-phone-new-york', 'lifeline-by-state',
  'free-phone-for-seniors', 'free-phone-with-ssi', 'free-phone-for-veterans', 'free-phone-with-section-8', 'free-phone-for-homeless', 'national-verifier', 'lifeline-household-worksheet', 'lifeline-for-survivors', 'lifeline-application-denied',
];

type Pv = { name: string; zips: number; companies: Array<{ n: string; t: string; p: string; w: string; z: number }> };
const PVS = PV.states as Record<string, Pv>;
const SBS = SB.states as Record<string, { total: number; tribal: number }>;
const NV = P.nv as Record<string, { auto: string[]; unclear?: string[] }>;
const NV_LABEL: Record<string, string> = { snap: 'SNAP', medicaid: 'Medicaid', ssi: 'SSI', fpha: 'Federal Public Housing Assistance', vets: 'the Veterans Pension', income: 'income', tribalTanf: 'Tribal TANF' };
const list = (xs: string[]) => (xs.length < 2 ? xs.join('') : `${xs.slice(0, -1).join(', ')} and ${xs[xs.length - 1]}`);

export function helpers(lang: Locale = 'en', strict = false) {
  const a = (id: string, text: string) => {
    if (!ROUTES.some((r) => r.id === id)) { if (strict && !PLANNED.includes(id) && id !== 'home') throw new Error(`Unknown page id in a link: ${id}`); return text; }
    return `<a href="${route(id, lang)}">${text}</a>`;
  };
  const ext = (url: string, text: string) => `<a href="${url}" target="_blank" rel="nofollow noopener noreferrer">${text}</a>`;
  const src = (k: SourceKey, text: string) => ext(P.sources[k].url, text);
  const num = (n: number, d = 0) => formatNumberL(n, 'en', d);
  const usd = (n: number) => money(n);
  /** 135% income limit, formatted. */
  const lim = (size: number, area: Area = 'contiguous') => money(limit135(area, size));
  const limN = (size: number, area: Area = 'contiguous') => limit135(area, size);
  /** Table of the USAC 2026 limits for sizes 1..n in the three areas. */
  const limitTable = (n = 8, caption?: string) => table(['Household', '48 states, DC, territories', 'Alaska', 'Hawaii'],
    Array.from({ length: n }, (_, i) => [`${i + 1} ${i ? 'people' : 'person'}`, money(limit135('contiguous', i + 1)), money(limit135('alaska', i + 1)), money(limit135('hawaii', i + 1))])
      .concat([['Each extra person', `+${money(P.income135.contiguous.add)}`, `+${money(P.income135.alaska.add)}`, `+${money(P.income135.hawaii.add)}`]]),
    caption, ['l', 'r', 'r', 'r']);
  /** Companies of a state (USAC data), sorted by ZIP codes covered. */
  const companies = (st: string) => PVS[st]?.companies ?? [];
  const companyCount = (st: string, t?: 'M' | 'H') => companies(st).filter((c) => !t || c.t === t).length;
  const topCompanies = (st: string, k = 5, t?: 'M' | 'H') => companies(st).filter((c) => !t || c.t === t).slice(0, k).map((c) => c.n);
  const companyTable = (st: string, k = 10, caption?: string) => table(['Company', 'Service', 'Customer line', 'ZIP codes listed'],
    companies(st).slice(0, k).map((c) => [esc(c.n), c.t === 'M' ? 'Mobile' : 'Home', c.p || '–', c.z]), caption, ['l', 'l', 'l', 'r']);
  const zipsOf = (st: string) => PVS[st]?.zips ?? 0;
  const subs = (st: string) => SBS[st]?.total ?? 0;
  const subsTribal = (st: string) => SBS[st]?.tribal ?? 0;
  const subsTotal = Object.values(SBS).reduce((s, x) => s + x.total, 0);
  const subsRank = (st: string) => Object.entries(SBS).sort((x, y) => y[1].total - x[1].total).findIndex(([k]) => k === st) + 1;
  return {
    lang, a, ext, src, num, usd, money, pct: (x: number, d = 0) => pct(x, 'en', d), P,
    S: P.support, R: P.rules, MSS: P.mss, ACP: P.acp, CA: P.ca, TX: P.tx, FPG: P.fpg, BUDGET: P.budget,
    lim, limN, limitTable, fpg: (size: number, area: Area = 'contiguous') => money(fpg(area, size)), fpgN: (size: number, area: Area = 'contiguous') => fpg(area, size),
    lim200: (size: number, area: Area = 'contiguous') => money(limit200(area, size)),
    lim200N: (size: number, area: Area = 'contiguous') => limit200(area, size),
    caLim: (size: number) => money(caLimit(size)), caLimN: (size: number) => caLimit(size), support: (s: 'broadband' | 'bundle' | 'voice', t = false) => money(support(s, t)),
    companies, companyCount, topCompanies, companyTable, zipsOf, subs, subsTribal, subsTotal, subsRank,
    stateName: (st: string) => STATE_NAMES[st] ?? st,
    /** Programs the National Verifier checks automatically in a state (USAC table), as words; '' in opt-out states. */
    nvAuto: (st: string) => list((NV[st]?.auto ?? []).map((k) => NV_LABEL[k] ?? k)),
    nvChecks: (st: string, k: string) => (NV[st]?.auto ?? []).includes(k),
    optOut: (st: string) => P.rules.optOutStates.includes(st),
    /** Index of a state in the state selects of the mini tools: `<!--tool:mini:proof|{"st":${h.stIdx('NY')}}-->`. */
    stIdx: (st: string) => STATE_CODES.indexOf(st),
    states: STATE_CODES,
    list,
    providersReadAt: dateL(PV.read_at), providersRows: PV.rows as number, subsMonth: monthL(SB.support_month), subsReadAt: dateL(SB.read_at),
    date: (iso: string) => dateL(iso),
    month: (ym: string) => monthL(ym),
    table: (h: string[], r: Array<Array<string | number>>, c?: string, al: Array<'l' | 'r'> = []) => table(h, r, c, al),
  };
}
export type Helpers = ReturnType<typeof helpers>;
