/**
 * Annual recertification calendar: enrollment date (and, if received, the date of USAC's notice) →
 * the next anniversary, the end of the 60-day window and the de-enrollment date five business days
 * later (USAC recertification page, 47 CFR 54.405(e)(4)). First render uses __BUILD_DAY__ (RECETTE §17.5).
 */
import { useEffect, useMemo, useState } from 'react';
import { DateField, isIso, PRIVACY } from './fields';
import Toggle from '../ui/Toggle';
import { recertDates, addMonths } from '../../lib/engine/lifeline';
import { dateL, formatNumberL } from '../../lib/format-l';
import { readParams, str, updateURL } from '../../lib/url-state';
import P from '../../data/params-2026.json';

interface Props { idPrefix?: string; primary?: boolean }

export default function RecertCalc({ idPrefix = 'rc', primary = false }: Props) {
  const [today, setToday] = useState<string>(__BUILD_DAY__);
  const [enr, setEnr] = useState<string>(addMonths(__BUILD_DAY__, -10));
  const [hasNotice, setHasNotice] = useState('0');
  const [notice, setNotice] = useState<string>(__BUILD_DAY__);
  useEffect(() => {
    const now = new Date().toISOString().slice(0, 10);
    setToday(now);
    const u = readParams(window.location.search);
    const e = str(u, 'e', ''); setEnr(isIso(e) ? e : addMonths(now, -10));
    const n = str(u, 'n', ''); if (isIso(n)) { setNotice(n); setHasNotice('1'); } else setNotice(now);
  }, []);
  const r = useMemo(() => recertDates(enr, today, hasNotice === '1' ? notice : undefined), [enr, today, hasNotice, notice]);
  useEffect(() => { updateURL({ e: enr, n: hasNotice === '1' ? notice : undefined }); }, [enr, hasNotice, notice]);
  const id = (k: string) => `${idPrefix}-${k}`;
  const left = r.daysLeft;
  return (
    <div data-chrome className={`not-prose rounded-xl border border-accent-200 bg-white p-4 sm:p-5 ${primary ? 'my-2' : 'my-8'}`}>
      <div className="grid gap-5 lg:grid-cols-2">
        <form className="grid content-start gap-3 sm:grid-cols-2" onSubmit={(e) => e.preventDefault()} {...(primary ? {} : { 'data-simulateur-secondaire': '' })}>
          <DateField id={id('e')} label="Date you enrolled" value={enr} onChange={setEnr} help="Or your last recertification" />
          <Toggle id={id('h')} label="Notice already received" value={hasNotice} onChange={setHasNotice} options={[{ value: '0', label: 'No' }, { value: '1', label: 'Yes' }]} />
          {hasNotice === '1' && <DateField id={id('n')} label="Date of the notice" value={notice} onChange={setNotice} help="Letter, email or text from USAC" />}
        </form>
        <div aria-live="polite" {...(primary ? { 'data-resultat': '' } : {})} className="rounded-lg bg-navy-50 p-4">
          <p className="text-sm font-medium text-navy-600">Recertify by</p>
          <p className="tabular-nums mt-1 text-3xl font-bold text-navy-900">{dateL(r.windowEnd)}</p>
          <table className="mt-3 w-full text-sm"><tbody className="divide-y divide-navy-200">
            <tr><td className="py-1.5 pr-3 text-navy-600">{hasNotice === '1' ? 'Window opened' : 'Anniversary of enrollment'}</td><td className="py-1.5 text-right text-navy-900">{dateL(hasNotice === '1' ? notice : r.due)}</td></tr>
            <tr><td className="py-1.5 pr-3 text-navy-600">Length of the window</td><td className="py-1.5 text-right text-navy-900">{P.rules.recertWindowDays} days</td></tr>
            <tr><td className="py-1.5 pr-3 text-navy-600">De-enrollment if no answer</td><td className="py-1.5 text-right text-navy-900">{dateL(r.deEnroll)}</td></tr>
            <tr><td className="py-1.5 pr-3 text-navy-600">Days left</td><td className="tabular-nums py-1.5 text-right text-navy-900">{left >= 0 ? formatNumberL(left) : 'window closed'}</td></tr>
          </tbody></table>
          <p className="mt-2 text-xs text-navy-600">Without a notice, the date is an estimate: the window opens when USAC writes to you. Many subscribers pass an automatic check and have nothing to do. De-enrollment date counts weekdays; a federal holiday adds a day.</p>
        </div>
      </div>
      <p className="mt-3 text-xs text-navy-500">{PRIVACY}</p>
    </div>
  );
}
