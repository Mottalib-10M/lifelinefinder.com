/**
 * Lifeline eligibility checker: state, household size, gross yearly income, benefit received and
 * Tribal lands → eligible or not, by which route, the 2026 income limit (USAC), the monthly discount,
 * where to apply and whether the National Verifier checks the benefit automatically in that state.
 * First render = build defaults (RECETTE §17.5); the URL is read after hydration and written only after
 * an interaction. Nothing typed leaves the browser.
 */
import { useEffect, useMemo, useState } from 'react';
import NumberField from '../ui/NumberField';
import SelectField from '../ui/SelectField';
import Toggle from '../ui/Toggle';
import { eligibility, STATE_CODES, STATE_NAMES, PROGRAMS, PROGRAM_LABEL, AREA_LABEL, caEligible, caLimit, type Program } from '../../lib/engine/lifeline';
import { money, pct } from '../../lib/format-l';
import { readParams, num, str, updateURL } from '../../lib/url-state';
import { PRIVACY } from './fields';
import P from '../../data/params-2026.json';

interface Props { idPrefix?: string; primary?: boolean; state?: string; size?: number; income?: number; program?: Program; links?: Record<string, string> }

const AUTO: Record<string, string> = {
  auto: 'checked automatically against government records in this state',
  manual: 'not in the automated checks of this state: upload a copy of your letter or card',
  unclear: 'USAC’s table is unclear for this state: keep a document ready',
  'n/a': '',
};

export default function EligibilityCheck({ idPrefix = 'el', primary = false, state = 'CA', size = 3, income = 30000, program = 'none', links = {} }: Props) {
  const [st, setSt] = useState(state);
  const [s, setS] = useState(size);
  const [inc, setInc] = useState(income);
  const [pg, setPg] = useState<Program>(program);
  const [tr, setTr] = useState('0');
  useEffect(() => {
    const u = readParams(window.location.search);
    const x = str(u, 'st', state); if (STATE_CODES.includes(x)) setSt(x);
    setS(Math.max(1, Math.min(20, Math.round(num(u, 'n', size)))));
    setInc(Math.max(0, num(u, 'inc', income)));
    const p = str(u, 'p', program) as Program; if (PROGRAMS.includes(p)) setPg(p);
    setTr(str(u, 't', '0') === '1' ? '1' : '0');
  }, []);
  const size1 = Math.max(1, Math.min(20, Math.round(s || 1)));
  const r = useMemo(() => eligibility({ state: st, size: size1, income: inc, program: pg, tribal: tr === '1' }), [st, size1, inc, pg, tr]);
  useEffect(() => { updateURL({ st, n: size1, inc, p: pg === 'none' ? undefined : pg, t: tr === '1' ? 1 : undefined }); }, [st, size1, inc, pg, tr]);
  const id = (k: string) => `${idPrefix}-${k}`;
  const head = r.route === 'program' ? 'You qualify through your benefit'
    : r.route === 'income' ? 'Your income qualifies'
    : r.route === 'tribal-only' ? 'Tribal programs count only on Tribal lands'
    : 'Not eligible on these figures';
  const ca = st === 'CA' ? caEligible(size1, inc, pg) : false;
  return (
    <div data-chrome className={`not-prose rounded-xl border border-accent-200 bg-white p-4 sm:p-5 ${primary ? 'my-2' : 'my-8'}`}>
      <div className="grid gap-5 lg:grid-cols-2">
        <form className="grid content-start gap-3 sm:grid-cols-2" onSubmit={(e) => e.preventDefault()} {...(primary ? {} : { 'data-simulateur-secondaire': '' })}>
          <SelectField id={id('st')} label="State or territory" value={st} onChange={setSt} options={STATE_CODES.map((c) => ({ value: c, label: STATE_NAMES[c] }))} />
          <NumberField id={id('n')} label="People in the household" value={s} onChange={setS} min={1} max={20} grouping={false} tag="en-US" help="Sharing income and expenses" />
          <NumberField id={id('inc')} label="Gross household income per year" value={inc} onChange={setInc} unit="$" max={1_000_000} tag="en-US" help="Before taxes, all adults" />
          <SelectField id={id('p')} label="Someone in the household gets" value={pg} onChange={(x) => setPg(x as Program)} options={PROGRAMS.map((k) => ({ value: k, label: PROGRAM_LABEL[k] }))} />
          <Toggle id={id('t')} label="Home on Tribal lands" value={tr} onChange={setTr} options={[{ value: '0', label: 'No' }, { value: '1', label: 'Yes' }]} />
        </form>
        <div aria-live="polite" {...(primary ? { 'data-resultat': '' } : {})} className="rounded-lg bg-navy-50 p-4">
          <p className="text-sm font-medium text-navy-600">{head}</p>
          <p className="tabular-nums mt-1 text-3xl font-bold text-navy-900">{r.eligible ? `${money(r.monthly)} off per month` : 'No discount'}</p>
          <table className="mt-3 w-full text-sm"><tbody className="divide-y divide-navy-200">
            <tr><td className="py-1.5 pr-3 text-navy-600">2026 income limit, {size1} {size1 === 1 ? 'person' : 'people'}</td><td className="tabular-nums py-1.5 text-right text-navy-900">{money(r.limit)}</td></tr>
            <tr><td className="py-1.5 pr-3 text-navy-600">{r.margin >= 0 ? 'Your income is under it by' : 'Your income is over it by'}</td><td className="tabular-nums py-1.5 text-right text-navy-900">{money(Math.abs(r.margin))}</td></tr>
            <tr><td className="py-1.5 pr-3 text-navy-600">Share of the poverty guideline</td><td className="tabular-nums py-1.5 text-right text-navy-900">{pct(r.share)}</td></tr>
            {r.eligible && <tr><td className="py-1.5 pr-3 text-navy-600">Discount over a year</td><td className="tabular-nums py-1.5 text-right text-navy-900">{money(r.yearly)}</td></tr>}
            <tr><td className="py-1.5 pr-3 text-navy-600">Where to apply</td><td className="py-1.5 text-right text-navy-900">{r.applyVia === 'state' ? (st === 'TX' ? 'Texas state Lifeline process' : 'Oregon state Lifeline process') : 'National Verifier (USAC)'}</td></tr>
          </tbody></table>
          <ul className="mt-2 list-disc space-y-1 pl-4 text-xs text-navy-600">
            {r.route === 'program' && AUTO[r.autoCheck] && <li>{PROGRAM_LABEL[pg]}: {AUTO[r.autoCheck]}.</li>}
            {r.route === 'income' && <li>Income route: proof of a full year of income, or {P.rules.payStubMonths} consecutive months of pay stubs.</li>}
            {r.route === 'none' && <li>Over the limit and no qualifying benefit. Enrolling in SNAP, Medicaid or SSI later opens Lifeline.</li>}
            {r.route === 'tribal-only' && <li>BIA General Assistance, Tribal TANF, Head Start and FDPIR qualify residents of Tribal lands only.</li>}
            {tr === '1' && r.eligible && <li>On qualifying Tribal lands the discount rises to {money(P.support.tribalMax)}; the address is checked on USAC’s Tribal lands map.</li>}
            {st === 'CA' && <li>California LifeLine (limit {money(caLimit(size1))}): {ca ? `you also look eligible for up to ${money(P.ca.discount)} more` : 'not eligible on these figures'}.</li>}
            <li>One Lifeline per household ({AREA_LABEL[r.area]} table). {links.apply ? <a className="underline" href={links.apply}>How to apply</a> : null}</li>
          </ul>
        </div>
      </div>
      <p className="mt-3 text-xs text-navy-500">{PRIVACY} This is an estimate from the published rules; the decision is made by the National Verifier or your state.</p>
    </div>
  );
}
