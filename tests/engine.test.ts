/** Lifeline engine checked against figures read by hand in the USAC table, HHS guidelines and 47 CFR Part 54. */
import { describe, expect, it } from 'vitest';
import { eligibility, limit135, fpg, limit200, support, caLimit, caEligible, planSupport, usageStatus, recertDates, addWeekdays, linkUp, acpVsLifeline, areaOf } from '../src/lib/engine/lifeline';

describe('income limits 2026 (USAC table, 135% of HHS guidelines)', () => {
  it('48 states: 1 person $21,546, 4 people $44,550, 8 people $75,222', () => {
    expect(limit135('contiguous', 1)).toBe(21546); expect(limit135('contiguous', 4)).toBe(44550); expect(limit135('contiguous', 8)).toBe(75222);
  });
  it('each extra person adds $7,668', () => expect(limit135('contiguous', 10)).toBe(75222 + 2 * 7668));
  it('Alaska and Hawaii have their own columns', () => { expect(limit135('alaska', 1)).toBe(26933); expect(limit135('hawaii', 4)).toBe(51233); });
  it('135% of the HHS guideline, within a dollar', () => { for (let n = 1; n <= 8; n++) expect(Math.abs(limit135('contiguous', n) - fpg('contiguous', n) * 1.35)).toBeLessThanOrEqual(1); });
  it('DC and territories use the 48-state column', () => { expect(areaOf('DC')).toBe('contiguous'); expect(areaOf('PR')).toBe('contiguous'); expect(areaOf('AK')).toBe('alaska'); });
  it('survivor limit 200%: one person $31,920', () => expect(limit200('contiguous', 1)).toBe(31920));
});
describe('eligibility (47 CFR 54.409)', () => {
  const base = { state: 'TX', size: 3, income: 50000, program: 'none' as const, tribal: false };
  it('at the limit qualifies, a dollar over does not', () => {
    expect(eligibility({ ...base, income: 36882 }).eligible).toBe(true);
    expect(eligibility({ ...base, income: 36883 }).eligible).toBe(false);
  });
  it('a benefit qualifies whatever the income', () => expect(eligibility({ ...base, program: 'medicaid' }).route).toBe('program'));
  it('Tribal programs count only on Tribal lands', () => {
    expect(eligibility({ ...base, program: 'tribal' }).route).toBe('tribal-only');
    expect(eligibility({ ...base, program: 'tribal', tribal: true }).eligible).toBe(true);
  });
  it('one benefit per household', () => expect(eligibility({ ...base, program: 'snap', hasLifeline: true }).eligible).toBe(false));
  it('Oregon and Texas apply through the state', () => { expect(eligibility(base).applyVia).toBe('state'); expect(eligibility({ ...base, state: 'OH' }).applyVia).toBe('nv'); });
  it('Tribal benefit $34.25 a month', () => expect(eligibility({ ...base, program: 'snap', tribal: true }).monthly).toBe(34.25));
});
describe('amounts (47 CFR 54.403)', () => {
  it('$9.25 broadband, $5.25 voice only, +$25 Tribal', () => { expect(support('broadband', false)).toBe(9.25); expect(support('voice', false)).toBe(5.25); expect(support('broadband', true)).toBe(34.25); });
  it('mobile plan with 4.5 GB earns $9.25; 1,000 minutes and 1 GB earns $5.25', () => {
    expect(planSupport({ kind: 'mobile', minutes: 1000, dataGB: 4.5 }).monthly).toBe(9.25);
    expect(planSupport({ kind: 'mobile', minutes: 1000, dataGB: 1 }).monthly).toBe(5.25);
    expect(planSupport({ kind: 'mobile', minutes: 500, dataGB: 1 }).level).toBe('none');
  });
  it('home internet needs 25/3 Mbps and 1,280 GB', () => {
    expect(planSupport({ kind: 'fixed', minutes: 0, dataGB: 1280, down: 25, up: 3 }).broadbandOk).toBe(true);
    expect(planSupport({ kind: 'fixed', minutes: 0, dataGB: 1280, down: 20, up: 3 }).broadbandOk).toBe(false);
  });
  it('Link Up: $100 off, the rest of a $180 charge deferrable', () => expect(linkUp(180)).toEqual({ discount: 100, deferrable: 80, dueNow: 0 }));
  it('ACP $30 against Lifeline $9.25 on a $40 bill', () => expect(acpVsLifeline(40, false).lostPerYear).toBeCloseTo(249, 6));
});
describe('California LifeLine (CPUC 2026-27)', () => {
  it('4 people $50,800, 5 people $59,500', () => { expect(caLimit(4)).toBe(50800); expect(caLimit(5)).toBe(59500); });
  it('above the limit without a program: no', () => expect(caEligible(1, 24601, 'none')).toBe(false));
});
describe('dates', () => {
  it('30 days without use, then 15 days of notice', () => {
    expect(usageStatus(10).state).toBe('active'); expect(usageStatus(31).state).toBe('notice'); expect(usageStatus(45).state).toBe('ended');
  });
  it('5 business days skip the weekend', () => expect(addWeekdays('2026-10-30', 5)).toBe('2026-11-06'));
  it('recertification: notice + 60 days, then 5 business days', () => {
    const r = recertDates('2025-12-01', '2026-10-27', '2026-11-02');
    expect(r.windowEnd).toBe('2027-01-01'); expect(r.deEnroll).toBe('2027-01-08');
  });
});
