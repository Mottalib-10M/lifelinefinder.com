/**
 * Lifeline engine: every rule reads src/data/params-2026.json, which cites its source.
 * 47 CFR 54.400 (household, income), 54.403 (support amount), 54.405 and 54.407 (usage, de-enrollment),
 * 54.408 (minimum service standards), 54.409 (qualification), USAC 2026 income table.
 * Pure functions, tested in tests/engine.test.ts.
 */
import P from '../../data/params-2026.json';

export type Area = 'contiguous' | 'alaska' | 'hawaii';
export type Program = 'none' | 'snap' | 'medicaid' | 'ssi' | 'fpha' | 'vets' | 'tribal';
export type Service = 'broadband' | 'bundle' | 'voice';

export const STATE_NAMES: Record<string, string> = {
  AL: 'Alabama', AK: 'Alaska', AZ: 'Arizona', AR: 'Arkansas', CA: 'California', CO: 'Colorado', CT: 'Connecticut', DE: 'Delaware',
  DC: 'District of Columbia', FL: 'Florida', GA: 'Georgia', HI: 'Hawaii', ID: 'Idaho', IL: 'Illinois', IN: 'Indiana', IA: 'Iowa',
  KS: 'Kansas', KY: 'Kentucky', LA: 'Louisiana', ME: 'Maine', MD: 'Maryland', MA: 'Massachusetts', MI: 'Michigan', MN: 'Minnesota',
  MS: 'Mississippi', MO: 'Missouri', MT: 'Montana', NE: 'Nebraska', NV: 'Nevada', NH: 'New Hampshire', NJ: 'New Jersey',
  NM: 'New Mexico', NY: 'New York', NC: 'North Carolina', ND: 'North Dakota', OH: 'Ohio', OK: 'Oklahoma', OR: 'Oregon',
  PA: 'Pennsylvania', RI: 'Rhode Island', SC: 'South Carolina', SD: 'South Dakota', TN: 'Tennessee', TX: 'Texas', UT: 'Utah',
  VT: 'Vermont', VA: 'Virginia', WA: 'Washington', WV: 'West Virginia', WI: 'Wisconsin', WY: 'Wyoming', PR: 'Puerto Rico',
  VI: 'U.S. Virgin Islands', GU: 'Guam', AS: 'American Samoa', MP: 'Northern Mariana Islands',
};
/** States first (alphabetical by name), then territories. */
export const STATE_CODES = Object.keys(STATE_NAMES).sort((a, b) => {
  const t = (c: string) => (['PR', 'VI', 'GU', 'AS', 'MP'].includes(c) ? 1 : 0);
  return t(a) - t(b) || STATE_NAMES[a].localeCompare(STATE_NAMES[b]);
});

export const PROGRAM_LABEL: Record<Program, string> = {
  none: 'None of these', snap: 'SNAP (food stamps)', medicaid: 'Medicaid', ssi: 'Supplemental Security Income (SSI)',
  fpha: 'Federal Public Housing Assistance', vets: 'Veterans or Survivors Pension', tribal: 'Tribal program (BIA, Tribal TANF, Head Start, FDPIR)',
};
export const PROGRAMS: Program[] = ['none', 'snap', 'medicaid', 'ssi', 'fpha', 'vets', 'tribal'];

/** Alaska and Hawaii have their own poverty guidelines; DC and the territories use the 48-state table (USAC). */
export const areaOf = (state: string): Area => (state === 'AK' ? 'alaska' : state === 'HI' ? 'hawaii' : 'contiguous');
export const AREA_LABEL: Record<Area, string> = { contiguous: '48 states, DC and territories', alaska: 'Alaska', hawaii: 'Hawaii' };

const sizeOf = (n: number) => Math.max(1, Math.min(20, Math.round(n || 1)));
const fromTable = (t: { base: number[]; add: number }, size: number) => {
  const s = sizeOf(size);
  return s <= t.base.length ? t.base[s - 1] : t.base[t.base.length - 1] + (s - t.base.length) * t.add;
};
/** HHS poverty guideline for the household size (annual dollars). */
export const fpg = (area: Area, size: number) => fromTable(P.fpg[area], size);
/** Lifeline income limit: 135% of the guideline, as published by USAC (annual gross income). */
export const limit135 = (area: Area, size: number) => fromTable(P.income135[area], size);
/** Survivor benefit (Safe Connections Act): 200% of the guideline (47 CFR 54.400(s)(1)). */
export const limit200 = (area: Area, size: number) => Math.round(fpg(area, size) * P.support.survivorIncomePct / 100);
/** Income as a share of the poverty guideline (1.35 = 135%). */
export const shareOfFpg = (area: Area, size: number, income: number) => (income > 0 ? income / fpg(area, size) : 0);

/** Monthly federal support for a service (47 CFR 54.403; voice-only $5.25 kept to November 30, 2027 by DA 26-651). */
export function support(service: Service, tribal: boolean): number {
  const base = service === 'voice' ? P.support.voiceOnly : P.support.broadband;
  return base + (tribal ? P.support.tribalExtra : 0);
}

export interface EligIn { state: string; size: number; income: number; program: Program; tribal: boolean; hasLifeline?: boolean }
export interface EligOut {
  eligible: boolean;
  route: 'program' | 'income' | 'none' | 'duplicate' | 'tribal-only';
  area: Area; limit: number; margin: number; share: number;
  monthly: number; yearly: number;
  applyVia: 'nv' | 'state';
  /** Will the National Verifier check this program automatically in this state? */
  autoCheck: 'auto' | 'manual' | 'unclear' | 'n/a';
}
export function eligibility(i: EligIn): EligOut {
  const area = areaOf(i.state);
  const limit = limit135(area, i.size);
  const income = Math.max(0, i.income || 0);
  const share = shareOfFpg(area, i.size, income);
  const byIncome = income <= limit;
  let route: EligOut['route'] = 'none';
  if (i.hasLifeline) route = 'duplicate';
  else if (i.program === 'tribal') route = i.tribal ? 'program' : (byIncome ? 'income' : 'tribal-only');
  else if (i.program !== 'none') route = 'program';
  else if (byIncome) route = 'income';
  const eligible = route === 'program' || route === 'income';
  const monthly = eligible ? support('broadband', i.tribal) : 0;
  const nv = (P.nv as Record<string, { auto: string[]; unclear?: string[] }>)[i.state];
  let autoCheck: EligOut['autoCheck'] = 'n/a';
  if (P.rules.optOutStates.includes(i.state)) autoCheck = 'n/a';
  else if (route === 'program' && nv) {
    const key = i.program === 'tribal' ? 'tribalTanf' : i.program;
    autoCheck = nv.unclear?.includes(key) ? 'unclear' : nv.auto.includes(key) ? 'auto' : 'manual';
  } else if (route === 'income' && nv) autoCheck = nv.auto.includes('income') ? 'auto' : 'manual';
  return {
    eligible, route, area, limit, margin: limit - income, share, monthly, yearly: monthly * 12,
    applyVia: P.rules.optOutStates.includes(i.state) ? 'state' : 'nv', autoCheck,
  };
}

/** California LifeLine (CPUC): its own income table (June 1, 2026 to May 31, 2027) and a wider list of programs. */
export const caLimit = (size: number) => fromTable({ base: P.ca.base, add: P.ca.add }, size);
export type CaProgram = Program | 'liheap' | 'wic' | 'nslp' | 'tanf';
export function caEligible(size: number, income: number, program: CaProgram): boolean {
  return program !== 'none' || Math.max(0, income || 0) <= caLimit(size);
}

/** Minimum service standards (47 CFR 54.408, DA 26-796): which support a plan earns. */
export interface PlanIn { kind: 'mobile' | 'fixed'; minutes: number; dataGB: number; down?: number; up?: number }
export function planSupport(p: PlanIn, tribal = false): { broadbandOk: boolean; voiceOk: boolean; monthly: number; level: 'broadband' | 'voice' | 'none' } {
  const broadbandOk = p.kind === 'mobile'
    ? p.dataGB >= P.mss.mobileDataGB
    : p.dataGB >= P.mss.fixedDataGB && (p.down ?? 0) >= P.mss.fixedDown && (p.up ?? 0) >= P.mss.fixedUp;
  const voiceOk = p.kind === 'mobile' ? p.minutes >= P.mss.mobileVoiceMinutes : p.minutes > 0;
  const level = broadbandOk ? 'broadband' : voiceOk ? 'voice' : 'none';
  const monthly = level === 'none' ? 0 : support(level === 'broadband' ? 'broadband' : 'voice', tribal);
  return { broadbandOk, voiceOk, monthly, level };
}

/** Free-service usage rule (54.405(e)(3), 54.407(c)): 30 days without use, then a 15-day notice. */
export function usageStatus(daysSinceUse: number): { state: 'active' | 'notice' | 'ended'; daysLeft: number } {
  const d = Math.max(0, Math.round(daysSinceUse || 0));
  const { nonUsageDays: a, cureDays: b } = P.rules;
  if (d < a) return { state: 'active', daysLeft: a + b - d };
  if (d < a + b) return { state: 'notice', daysLeft: a + b - d };
  return { state: 'ended', daysLeft: 0 };
}

/** Dates in ISO (UTC, no time zone shift). */
export const addDays = (iso: string, n: number) => { const d = new Date(`${iso}T00:00:00Z`); d.setUTCDate(d.getUTCDate() + n); return d.toISOString().slice(0, 10); };
export const addMonths = (iso: string, n: number) => { const d = new Date(`${iso}T00:00:00Z`); const day = d.getUTCDate(); d.setUTCDate(1); d.setUTCMonth(d.getUTCMonth() + n); const last = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth() + 1, 0)).getUTCDate(); d.setUTCDate(Math.min(day, last)); return d.toISOString().slice(0, 10); };
/** Weekdays only: a federal holiday inside the span adds one more day. */
export function addWeekdays(iso: string, n: number) {
  let d = iso; let k = 0;
  while (k < n) { d = addDays(d, 1); const w = new Date(`${d}T00:00:00Z`).getUTCDay(); if (w !== 0 && w !== 6) k++; }
  return d;
}
export const daysBetween = (a: string, b: string) => Math.round((Date.parse(`${b}T00:00:00Z`) - Date.parse(`${a}T00:00:00Z`)) / 86400000);

/** Annual recertification: due each year from the enrollment date; 60-day window from the notice; de-enrollment 5 business days after. */
export function recertDates(enrolled: string, today: string, noticeOn?: string) {
  let due = addMonths(enrolled, 12);
  while (daysBetween(today, due) < -P.rules.recertWindowDays) due = addMonths(due, 12);
  const start = noticeOn ?? due;
  const windowEnd = addDays(start, P.rules.recertWindowDays);
  const deEnroll = addWeekdays(windowEnd, P.rules.deEnrollBusinessDays);
  return { due, windowEnd, deEnroll, daysLeft: daysBetween(today, windowEnd) };
}

/** Link Up (Tribal lands, voice set-up): up to $100 off; up to $200 of charges can be deferred a year without interest. */
export function linkUp(charge: number): { discount: number; deferrable: number; dueNow: number } {
  const c = Math.max(0, charge || 0);
  const discount = Math.min(P.support.linkUpMax, c);
  const rest = c - discount;
  const deferrable = c <= P.support.linkUpDeferredMax ? rest : 0;
  return { discount, deferrable, dueNow: rest - deferrable };
}

/** ACP (ended June 1, 2024) against Lifeline today, for one monthly internet bill. */
export function acpVsLifeline(bill: number, tribal: boolean) {
  const b = Math.max(0, bill || 0);
  const acp = Math.min(b, tribal ? P.acp.tribal : P.acp.monthly);
  const lifeline = Math.min(b, support('broadband', tribal));
  return { acp, lifeline, payAcp: b - acp, payLifeline: b - lifeline, lostPerYear: (acp - lifeline) * 12 };
}
