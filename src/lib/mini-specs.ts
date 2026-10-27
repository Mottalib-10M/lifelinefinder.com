/**
 * Mini-tools of the pages (RECETTE §9.3): one subject = one calculation, always through the Lifeline
 * engine (`lib/engine/lifeline.ts`) and params-2026.json, never a second formula.
 */
import type { MiniSpec } from './mini-types';
import P from '../data/params-2026.json';
import SC from '../data/state-counts.json';
import SB from '../data/subscribers.json';
import { money, formatNumberL, pct, monthL } from './format-l';
import {
  limit135, limit200, fpg, shareOfFpg, support, eligibility, caLimit, caEligible, planSupport, usageStatus, linkUp, acpVsLifeline,
  STATE_CODES, STATE_NAMES, AREA_LABEL, PROGRAM_LABEL, type Area, type Program, type Service,
} from './engine/lifeline';

const n0 = (v: number) => formatNumberL(v);
const clamp = (x: number, a: number, b: number) => Math.max(a, Math.min(b, Math.round(Number.isFinite(x) ? x : a)));
const yn = [{ value: '0', label: 'No' }, { value: '1', label: 'Yes' }];
const AREAS: Area[] = ['contiguous', 'alaska', 'hawaii'];
const areaOpts = AREAS.map((a, i) => ({ value: String(i), label: AREA_LABEL[a] }));
const stateOpts = STATE_CODES.map((c, i) => ({ value: String(i), label: STATE_NAMES[c] }));
const stIdx = (c: string) => STATE_CODES.indexOf(c);
const SERVICES: Service[] = ['broadband', 'bundle', 'voice'];
const serviceOpts = [{ value: '0', label: 'Internet or phone with data' }, { value: '1', label: 'Bundle meeting the data standard' }, { value: '2', label: 'Voice only' }];
const PROG_ON: Program[] = ['snap', 'medicaid', 'ssi', 'fpha', 'vets'];
const progOpts = PROG_ON.map((p, i) => ({ value: String(i), label: PROGRAM_LABEL[p] }));
const sizeIn = (def = 3) => ({ id: 's', label: 'People in the household', def, min: 1, max: 20, year: true, help: 'Everyone at your address who shares income and expenses' });
const incomeIn = (def = 30000) => ({ id: 'i', label: 'Gross household income per year', def, unit: '$', max: 1_000_000, help: 'Before taxes, all adults together' });
const autoLabel = (a: string) => (a === 'auto' ? 'Checked automatically by the National Verifier' : a === 'manual' ? 'Upload or mail a document' : a === 'unclear' ? 'Table unclear: keep a document ready' : 'Handled by the state');
const SUBS_MONTH = monthL(SB.support_month);
const counts = SC as Record<string, { m: number; h: number; z: number; s: number; tr: number }>;

const SPECS: Record<string, () => MiniSpec> = {
  limit: () => ({
    title: 'Lifeline income limit for your household', cta: 'Full eligibility check', ctaPage: 'lifeline-eligibility',
    inputs: [{ id: 'a', label: 'Where you live', def: 0, options: areaOpts }, sizeIn(3), incomeIn(32000)],
    run: (v) => {
      const a = AREAS[clamp(v.a, 0, 2)], s = clamp(v.s, 1, 20), lim = limit135(a, s), inc = Math.max(0, v.i || 0);
      return { head: ['2026 limit (135% of the guideline)', money(lim)], rows: [
        ['Your income', money(inc)], [inc <= lim ? 'Room under the limit' : 'Over the limit by', money(Math.abs(lim - inc))],
        ['Your income as a share of the guideline', pct(shareOfFpg(a, s, inc))], ['Monthly equivalent of the limit', money(Math.floor(lim / 12))],
      ], note: inc <= lim ? 'Under the limit: the income route is open.' : 'Over the limit: a benefit such as SNAP or Medicaid can still qualify you.' };
    },
  }),
  benefit: () => ({
    title: 'What the Lifeline discount is worth', cta: 'Check if you qualify', ctaPage: 'free-government-phone',
    inputs: [{ id: 'v', label: 'Type of service', def: 0, options: serviceOpts }, { id: 't', label: 'Home on qualifying Tribal lands', def: 0, options: yn }, { id: 'm', label: 'Months', def: 12, min: 1, max: 60, year: true }],
    run: (v) => {
      const sv = SERVICES[clamp(v.v, 0, 2)], t = v.t === 1, m = clamp(v.m, 1, 60), mo = support(sv, t);
      return { head: ['Discount per month', money(mo)], rows: [[`Over ${m} months`, money(mo * m)], ['Standard part', money(support(sv, false))], ['Tribal lands extra', money(t ? P.support.tribalExtra : 0)]], note: 'The discount comes off the bill of the company you choose; it is never paid to you in cash.' };
    },
  }),
  proof: () => ({
    title: 'Will your benefit be checked automatically?', cta: 'Documents checklist', ctaPage: 'lifeline-documents',
    inputs: [{ id: 'st', label: 'State', def: stIdx('FL'), options: stateOpts }, { id: 'p', label: 'Benefit you receive', def: 0, options: progOpts }],
    run: (v) => {
      const st = STATE_CODES[clamp(v.st, 0, STATE_CODES.length - 1)], prog = PROG_ON[clamp(v.p, 0, PROG_ON.length - 1)];
      const r = eligibility({ state: st, size: 1, income: 0, program: prog, tribal: false });
      const via = r.applyVia === 'state' ? `Apply through the ${st === 'TX' ? 'Texas' : 'Oregon'} state process` : 'Apply through the National Verifier';
      return { head: ['In ' + STATE_NAMES[st], autoLabel(r.autoCheck)], rows: [['Benefit', PROGRAM_LABEL[prog]], ['Where to apply', via], ['A document must be dated', `within ${P.rules.docMonths} months`]], note: 'From USAC’s table of automated data sources by state.' };
    },
  }),
  household: () => ({
    title: 'One Lifeline per household: how many at your address?', cta: 'Check your eligibility', ctaPage: 'lifeline-eligibility',
    inputs: [{ id: 'h', label: 'Separate households at the address', def: 2, min: 1, max: 20, year: true, help: 'Groups that do not share income and expenses' }, { id: 'l', label: 'Lifeline accounts already at the address', def: 1, min: 0, max: 20, year: true }],
    run: (v) => {
      const h = clamp(v.h, 1, 20), l = clamp(v.l, 0, 20), free = Math.max(0, h - l);
      return { head: ['Benefits still possible', n0(free)], rows: [['Households (economic units)', n0(h)], ['Already enrolled', n0(l)], ['Worksheet needed', h > 1 || l > 0 ? 'Yes, the household worksheet' : 'No']], note: free === 0 ? 'Every household here already has a benefit: a new one would be duplicate support.' : 'Each economic unit may hold one benefit, after the worksheet.' };
    },
  }),
  iphone: () => ({
    title: 'Phone price against what Lifeline pays', cta: 'What Lifeline pays', ctaPage: 'lifeline-program',
    inputs: [{ id: 'p', label: 'Price of the phone', def: 429, unit: '$', max: 5000 }, { id: 'b', label: 'Plan price per month', def: 25, unit: '$', max: 500 }, { id: 't', label: 'Home on qualifying Tribal lands', def: 0, options: yn }],
    run: (v) => {
      const p = Math.max(0, v.p || 0), b = Math.max(0, v.b || 0), d = Math.min(b, support('broadband', v.t === 1));
      return { head: ['You pay the first year', money(p + (b - d) * 12)], rows: [['Lifeline off the plan, per year', money(d * 12)], ['Lifeline toward the phone', money(0)], ['Plan after discount, per month', money(b - d)]], note: 'The FCC does not subsidize any hardware: a phone offered with Lifeline is the company’s own offer.' };
    },
  }),
  tablet: () => ({
    title: 'Tablet discount then and now', cta: 'The ACP and what replaced it', ctaPage: 'affordable-connectivity-program',
    inputs: [{ id: 'p', label: 'Price of the tablet', def: 150, unit: '$', max: 3000 }],
    run: (v) => {
      const p = Math.max(0, v.p || 0);
      return { head: ['Federal device discount today', money(0)], rows: [['ACP device discount before June 1, 2024', `up to ${money(Math.min(P.acp.device, p))}`], ['Lifeline toward a device', money(0)], ['You pay today', money(p)]], note: 'The ACP device discount (up to $100, with a contribution of more than $10 and less than $50) ended with the program.' };
    },
  }),
  internet: () => ({
    title: 'Home internet bill with Lifeline', cta: 'Check if you qualify', ctaPage: 'lifeline-eligibility',
    inputs: [{ id: 'b', label: 'Internet bill per month', def: 50, unit: '$', max: 1000 }, { id: 't', label: 'Home on qualifying Tribal lands', def: 0, options: yn }],
    run: (v) => {
      const b = Math.max(0, v.b || 0), d = Math.min(b, support('broadband', v.t === 1));
      return { head: ['You pay per month', money(b - d)], rows: [['Lifeline discount', money(d)], ['Saved per year', money(d * 12)], ['Plan must offer at least', `${P.mss.fixedDown}/${P.mss.fixedUp} Mbps, ${n0(P.mss.fixedDataGB)} GB`]], note: 'Fixed broadband minimum service standard in force until December 1, 2027.' };
    },
  }),
  acp: () => ({
    title: 'Your internet bill: ACP then, Lifeline now', cta: 'Lifeline against the ACP', ctaPage: 'lifeline-vs-acp',
    inputs: [{ id: 'b', label: 'Internet bill per month', def: 50, unit: '$', max: 1000 }, { id: 't', label: 'Home on qualifying Tribal lands', def: 0, options: yn }],
    run: (v) => {
      const r = acpVsLifeline(v.b, v.t === 1);
      return { head: ['Lost support per year', money(r.lostPerYear)], rows: [['With the ACP (to May 2024)', `${money(r.payAcp)} / month`], ['With Lifeline today', `${money(r.payLifeline)} / month`], ['Difference per month', money(r.acp - r.lifeline)]], note: 'Lifeline still runs; the ACP ended on June 1, 2024 for lack of funding.' };
    },
  }),
  mss: () => ({
    title: 'Does this plan earn the full discount?', cta: 'Lifeline phones and plans', ctaPage: 'lifeline-phone',
    inputs: [{ id: 'k', label: 'Plan', def: 0, options: [{ value: '0', label: 'Mobile phone plan' }, { value: '1', label: 'Home internet' }] }, { id: 'n', label: 'Voice minutes per month', def: 1000, max: 100000, year: true }, { id: 'g', label: 'Data per month', def: 4.5, unit: 'GB', max: 100000, decimals: 1 }],
    run: (v) => {
      const kind = v.k === 1 ? 'fixed' : 'mobile';
      const r = planSupport({ kind, minutes: v.n || 0, dataGB: v.g || 0, down: kind === 'fixed' ? P.mss.fixedDown : 0, up: kind === 'fixed' ? P.mss.fixedUp : 0 });
      return { head: ['Federal support', money(r.monthly)], rows: [['Data standard', kind === 'mobile' ? `${P.mss.mobileDataGB} GB` : `${n0(P.mss.fixedDataGB)} GB`], ['Meets the broadband standard', r.broadbandOk ? 'Yes' : 'No'], ['Meets the voice standard', r.voiceOk ? 'Yes' : 'No']], note: r.level === 'voice' ? `Voice-only support stays at ${money(P.support.voiceOnly)} through November 30, 2027.` : r.level === 'none' ? 'Below both standards: no Lifeline support.' : 'Full support of $9.25.' };
    },
  }),
  nonusage: () => ({
    title: 'Free Lifeline service: days without use', cta: 'Keep your Lifeline', ctaPage: 'lifeline-recertification',
    inputs: [{ id: 'd', label: 'Days since you last called, texted or used data', def: 20, max: 365, year: true }],
    run: (v) => {
      const r = usageStatus(v.d);
      return { head: ['Status', r.state === 'active' ? 'Active' : r.state === 'notice' ? 'Notice period' : 'Can be ended'], rows: [['Days left to use it', n0(r.daysLeft)], ['Rule', `${P.rules.nonUsageDays} days, then ${P.rules.cureDays} days of notice`], ['What counts as use', 'a call, a text, data, or answering the company']], note: 'Applies only to service with no monthly fee; a paid plan is not cut for non-use.' };
    },
  }),
  docs: () => ({
    title: 'Which proof do you need?', cta: 'How to apply', ctaPage: 'how-to-get-a-free-government-phone',
    inputs: [{ id: 'r', label: 'You qualify through', def: 0, options: [{ value: '0', label: 'A benefit (SNAP, Medicaid…)' }, { value: '1', label: 'Income, yearly document' }, { value: '2', label: 'Income, pay stubs' }] }],
    run: (v) => {
      const r = clamp(v.r, 0, 2);
      if (r === 0) return { head: ['Proof of benefit', '1 letter or card'], rows: [['Must show', 'name, program, issuing agency'], ['Dated', `within ${P.rules.docMonths} months or not expired`], ['Plus', 'identity proof if the check fails']] };
      if (r === 1) return { head: ['Proof of income', '1 yearly document'], rows: [['Examples', 'tax return, benefit statement'], ['Covers', 'the full year'], ['Plus', 'identity proof if the check fails']] };
      return { head: ['Proof of income', `${P.rules.payStubMonths} months in a row`], rows: [['Examples', 'pay stubs of the same type'], ['Within', `the previous ${P.rules.docMonths} months`], ['Plus', 'identity proof if the check fails']] };
    },
  }),
  tribal: () => ({
    title: 'Enhanced Tribal benefit and Link Up', cta: 'Check if you qualify', ctaPage: 'free-government-phone',
    inputs: [{ id: 'v', label: 'Type of service', def: 0, options: serviceOpts }, { id: 'c', label: 'Set-up charge for home phone', def: 150, unit: '$', max: 5000 }],
    run: (v) => {
      const sv = SERVICES[clamp(v.v, 0, 2)], lu = linkUp(v.c);
      return { head: ['Monthly discount', money(support(sv, true))], rows: [['Link Up off the set-up charge', money(lu.discount)], ['Deferred without interest', money(lu.deferrable)], ['Due at set-up', money(lu.dueNow)]], note: 'Link Up applies to voice service from a company that receives High Cost support, once per address.' };
    },
  }),
  ca: () => ({
    title: 'California LifeLine plus federal Lifeline', cta: 'California page', ctaPage: 'free-government-phone-california',
    inputs: [sizeIn(2), incomeIn(30000), { id: 'p', label: 'Someone gets Medi-Cal, CalFresh, SSI, WIC, LIHEAP…', def: 0, options: yn }],
    run: (v) => {
      const s = clamp(v.s, 1, 20), i = Math.max(0, v.i || 0), prog = v.p === 1;
      const ca = caEligible(s, i, prog ? 'medicaid' : 'none');
      const fed = eligibility({ state: 'CA', size: s, income: i, program: prog ? 'medicaid' : 'none', tribal: false }).eligible;
      return { head: ['Monthly discounts', money((ca ? P.ca.discount : 0) + (fed ? P.support.broadband : 0))], rows: [['California LifeLine (limit ' + money(caLimit(s)) + ')', ca ? `up to ${money(P.ca.discount)}` : 'not eligible'], ['Federal Lifeline (limit ' + money(limit135('contiguous', s)) + ')', fed ? `up to ${money(P.support.broadband)}` : 'not eligible'], ['Apply', 'separately to each program']], note: 'California amounts from the CPUC fact sheet of May 2026; the October 8, 2026 decision changes them once in effect.' };
    },
  }),
  tx: () => ({
    title: 'Texas: income test and where to apply', cta: 'Texas page', ctaPage: 'free-government-phone-texas',
    inputs: [sizeIn(3), incomeIn(40000), { id: 'p', label: 'Someone gets SNAP, Medicaid, SSI, public housing or a VA pension', def: 0, options: yn }],
    run: (v) => {
      const s = clamp(v.s, 1, 20), i = Math.max(0, v.i || 0), fed = limit135('contiguous', s), ok = v.p === 1 || i <= fed;
      return { head: ['Texas Lifeline', ok ? 'You qualify' : 'Income too high'], rows: [['Limit on the Texas form (135%)', money(fed)], ['Your income', money(i)], ['Apply through', 'the Texas Lifeline administrator, not the National Verifier']], note: 'Texas runs its own application for the Public Utility Commission of Texas; the federal amounts and rules apply.' };
    },
  }),
  statefacts: () => ({
    title: 'Lifeline in your state', cta: 'Find companies by ZIP code', ctaPage: 'free-government-phone-providers',
    inputs: [{ id: 'st', label: 'State', def: stIdx('NY'), options: stateOpts }],
    run: (v) => {
      const st = STATE_CODES[clamp(v.st, 0, STATE_CODES.length - 1)], c = counts[st] ?? { m: 0, h: 0, z: 0, s: 0, tr: 0 };
      return { head: [`Subscribers claimed, ${SUBS_MONTH}`, n0(c.s)], rows: [['Mobile companies listed', n0(c.m)], ['Home phone or internet companies', n0(c.h)], ['ZIP codes covered', n0(c.z)], ['Apply through', P.rules.optOutStates.includes(st) ? 'the state process' : 'the National Verifier']], note: `USAC open data; claims for ${SUBS_MONTH} can still be revised by late filings.` };
    },
  }),
  scam: () => ({
    title: 'Is this Lifeline offer a scam? Three questions', cta: 'Lifeline scams', ctaPage: 'lifeline-scams',
    inputs: [{ id: 'a', label: 'Asked to pay to enroll or for a “free” phone?', def: 0, options: yn }, { id: 'b', label: 'Asked for your SSN or card by phone call or text?', def: 0, options: yn }, { id: 'c', label: 'Promised a free new iPhone or cash?', def: 0, options: yn }],
    run: (v) => {
      const k = (v.a === 1 ? 1 : 0) + (v.b === 1 ? 1 : 0) + (v.c === 1 ? 1 : 0);
      return { head: ['Warning signs', `${k} of 3`], rows: [['Lifeline enrollment fee', 'none in the rules'], ['Applications by phone', 'not accepted by the National Verifier'], ['Phones', 'not paid for by the FCC']], note: k ? `Report it to the FCC Lifeline fraud tip line, ${P.rules.fraudTipLine}.` : 'No warning sign: still apply only on the official National Verifier or through a listed company.' };
    },
  }),
  survivor: () => ({
    title: 'Survivor emergency support: income test', cta: 'Lifeline eligibility', ctaPage: 'lifeline-eligibility',
    inputs: [{ id: 'a', label: 'Where you live', def: 0, options: areaOpts }, sizeIn(2), incomeIn(40000)],
    run: (v) => {
      const a = AREAS[clamp(v.a, 0, 2)], s = clamp(v.s, 1, 20), lim = limit200(a, s), i = Math.max(0, v.i || 0);
      return { head: ['200% limit', money(lim)], rows: [['Your income', money(i)], ['Under the limit', i <= lim ? 'Yes' : 'No'], ['Support', `up to ${money(P.support.survivor)} for ${P.support.survivorMonths} months`]], note: 'Also requires a line separation request under the Safe Connections Act.' };
    },
  }),
};

export function getSpec(kind: string): MiniSpec {
  const f = SPECS[kind];
  if (!f) throw new Error(`Unknown mini-tool: ${kind}`);
  return f();
}
export const MINI_KINDS = Object.keys(SPECS);
