/**
 * Lifeline companies by state and ZIP code, from USAC's public "Companies Near Me" data (public domain).
 * Neutral list: alphabetical or by coverage, no link, no ranking by offer, no form. The ZIP code stays
 * in the browser: the tool downloads the public list of the chosen state from this site and filters it.
 * First render = the state given at build (RECETTE §17.5).
 */
import { useEffect, useMemo, useState } from 'react';
import SelectField from '../ui/SelectField';
import { STATE_CODES, STATE_NAMES } from '../../lib/engine/lifeline';
import { formatNumberL } from '../../lib/format-l';
import { readParams, str, updateURL } from '../../lib/url-state';
import { inputCls } from './fields';

type Row = [string, string, string, string];
interface Props { idPrefix?: string; primary?: boolean; state?: string; initial: { c: Row[]; counts: number[] }; readAt: string }
interface StateFile { c: Row[]; z: Record<string, number[]> }

export default function ProviderFinder({ idPrefix = 'pf', primary = false, state = 'CA', initial, readAt }: Props) {
  const [st, setSt] = useState(state);
  const [zip, setZip] = useState('');
  const [kind, setKind] = useState('all');
  const [all, setAll] = useState(false);
  const [file, setFile] = useState<StateFile | null>(null);
  const [err, setErr] = useState(false);
  useEffect(() => {
    const u = readParams(window.location.search);
    const x = str(u, 'st', state); if (STATE_CODES.includes(x)) setSt(x);
  }, []);
  useEffect(() => {
    let live = true; setErr(false);
    fetch(`/data/zip/${st}.json`).then((r) => (r.ok ? r.json() : Promise.reject())).then((j: StateFile) => { if (live) setFile(j); }).catch(() => { if (live) setErr(true); });
    return () => { live = false; };
  }, [st]);
  useEffect(() => { updateURL({ st }); }, [st]);
  const z5 = zip.replace(/\D/g, '').slice(0, 5);
  const view = useMemo(() => {
    let rows: Array<{ r: Row; n: number }>;
    if (file) {
      const cnt = new Array(file.c.length).fill(0);
      for (const ids of Object.values(file.z)) for (const i of ids) cnt[i]++;
      const pick = z5.length === 5 ? (file.z[z5] ?? null) : null;
      rows = (pick ?? file.c.map((_, i) => i)).map((i) => ({ r: file.c[i], n: cnt[i] }));
      if (z5.length === 5 && !pick) rows = [];
    } else rows = initial.c.map((r, i) => ({ r, n: initial.counts[i] }));
    if (kind !== 'all') rows = rows.filter((x) => x.r[1] === kind);
    return rows.sort((a, b) => b.n - a.n || a.r[0].localeCompare(b.r[0]));
  }, [file, z5, kind, initial]);
  const zipUnknown = file && z5.length === 5 && !file.z[z5];
  const shown = all ? view : view.slice(0, 12);
  const id = (k: string) => `${idPrefix}-${k}`;
  return (
    <div data-chrome className={`not-prose rounded-xl border border-accent-200 bg-white p-4 sm:p-5 ${primary ? 'my-2' : 'my-8'}`}>
      <form className="grid content-start gap-3 sm:grid-cols-3" onSubmit={(e) => e.preventDefault()} {...(primary ? {} : { 'data-simulateur-secondaire': '' })}>
        <SelectField id={id('st')} label="State or territory" value={st} onChange={(x) => { setSt(x); setZip(''); }} options={STATE_CODES.map((c) => ({ value: c, label: STATE_NAMES[c] }))} />
        <div className="grid grid-rows-subgrid row-span-3 content-start gap-y-0">
          <label htmlFor={id('zip')} className="mb-1 block text-sm font-medium text-navy-700">ZIP code (optional)</label>
          <input id={id('zip')} type="text" inputMode="numeric" autoComplete="postal-code" value={zip} onChange={(e) => setZip(e.target.value.replace(/[^\d]/g, '').slice(0, 5))} placeholder="5 digits" className={inputCls} />
          <p className="mt-1 text-xs text-navy-500">Stays in your browser</p>
        </div>
        <SelectField id={id('k')} label="Type of service" value={kind} onChange={setKind} options={[{ value: 'all', label: 'Mobile and home' }, { value: 'M', label: 'Mobile phone' }, { value: 'H', label: 'Home phone or internet' }]} />
      </form>
      <div aria-live="polite" {...(primary ? { 'data-resultat': '' } : {})} className="mt-4 rounded-lg bg-navy-50 p-4">
        <p className="text-sm font-medium text-navy-600">{z5.length === 5 ? `Companies listed for ZIP ${z5}` : `Companies listed in ${STATE_NAMES[st]}`}</p>
        <p className="tabular-nums mt-1 text-3xl font-bold text-navy-900">{formatNumberL(view.length)} {view.length === 1 ? 'company' : 'companies'}</p>
        {zipUnknown && <p className="mt-2 text-sm text-navy-700">This ZIP code is not in USAC’s list for {STATE_NAMES[st]}. Check the state, or call a company of the state to confirm service at your address.</p>}
        {err && <p className="mt-2 text-sm text-navy-700">The ZIP list could not be loaded; the state list below is from the build.</p>}
        {shown.length > 0 && (
          <div className="mt-3 overflow-x-auto"><table className="w-full text-sm"><thead><tr className="text-left text-xs uppercase tracking-wide text-navy-600"><th className="py-1.5 pr-3">Company</th><th className="py-1.5 pr-3">Service</th><th className="py-1.5 pr-3">Phone</th><th className="py-1.5 pr-3">Website</th><th className="py-1.5 text-right">ZIPs</th></tr></thead>
            <tbody className="divide-y divide-navy-200">{shown.map((x) => (
              <tr key={x.r[0] + x.r[1]}><td className="py-1.5 pr-3 text-navy-900">{x.r[0]}</td><td className="py-1.5 pr-3 text-navy-700">{x.r[1] === 'M' ? 'Mobile' : 'Home'}</td><td className="tabular-nums whitespace-nowrap py-1.5 pr-3 text-navy-700">{x.r[2] || '–'}</td><td className="py-1.5 pr-3 text-navy-700">{x.r[3] || '–'}</td><td className="tabular-nums py-1.5 text-right text-navy-700">{formatNumberL(x.n)}</td></tr>
            ))}</tbody></table></div>
        )}
        {view.length > 12 && <button type="button" onClick={() => setAll(!all)} className="mt-3 text-sm font-medium text-accent-700 underline">{all ? 'Show the first 12' : `Show all ${formatNumberL(view.length)}`}</button>}
        <p className="mt-3 text-xs text-navy-600">Source: USAC open data “Lifeline Companies Near Me” (public domain), read on {readAt}. Listed by the number of ZIP codes covered, then by name; no company pays to be here and none is recommended. Websites are shown as text, not links. A company listed without ZIP codes appears in the state list only.</p>
      </div>
    </div>
  );
}
