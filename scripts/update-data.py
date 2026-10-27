#!/usr/bin/env python3
"""Rebuild the provider and subscriber data from USAC open data (public domain).

- Lifeline Companies Near Me (opendata.usac.org, dataset kjtb-4uf7): company, type of service,
  state, ZIP code, phone, website. -> src/data/providers.json (per state summary)
  and public/data/zip/<ST>.json (ZIP -> companies, loaded by the ZIP tool for one state).
- Lifeline Disbursements (dataset tfxa-gt3x): subscribers claimed per state for one support
  month. -> src/data/subscribers.json

Usage: python3 scripts/update-data.py [--month 2026-06]
Exit code 2 when the provider list changed (a person reads the diff before publishing).
"""
import csv, io, json, os, sys, urllib.parse, urllib.request, datetime, collections

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
API = 'https://opendata.usac.org/resource/'
UA = {'User-Agent': 'us-lifeline data refresh (Radif Partners)', 'Accept-Encoding': 'identity'}

def get(url):
    with urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=300) as r:
        return r.read().decode('utf-8')

STATE_NAMES = {
 'AL':'Alabama','AK':'Alaska','AZ':'Arizona','AR':'Arkansas','CA':'California','CO':'Colorado','CT':'Connecticut','DE':'Delaware',
 'DC':'District of Columbia','FL':'Florida','GA':'Georgia','HI':'Hawaii','ID':'Idaho','IL':'Illinois','IN':'Indiana','IA':'Iowa',
 'KS':'Kansas','KY':'Kentucky','LA':'Louisiana','ME':'Maine','MD':'Maryland','MA':'Massachusetts','MI':'Michigan','MN':'Minnesota',
 'MS':'Mississippi','MO':'Missouri','MT':'Montana','NE':'Nebraska','NV':'Nevada','NH':'New Hampshire','NJ':'New Jersey',
 'NM':'New Mexico','NY':'New York','NC':'North Carolina','ND':'North Dakota','OH':'Ohio','OK':'Oklahoma','OR':'Oregon',
 'PA':'Pennsylvania','RI':'Rhode Island','SC':'South Carolina','SD':'South Dakota','TN':'Tennessee','TX':'Texas','UT':'Utah',
 'VT':'Vermont','VA':'Virginia','WA':'Washington','WV':'West Virginia','WI':'Wisconsin','WY':'Wyoming','PR':'Puerto Rico',
 'VI':'U.S. Virgin Islands','GU':'Guam','AS':'American Samoa','MP':'Northern Mariana Islands'}

def domain(u):
    u = (u or '').strip()
    if not u: return ''
    if '://' not in u: u = 'http://' + u
    h = urllib.parse.urlparse(u).netloc.lower()
    return h[4:] if h.startswith('www.') else h

def providers():
    q = urllib.parse.urlencode({'$select': 'company,carrier_type,carrier_state,zip_code,customer_service,website', '$limit': '2000000'})
    rows = list(csv.DictReader(io.StringIO(get(f'{API}kjtb-4uf7.csv?{q}'))))
    if len(rows) < 100000: sys.exit(f'Only {len(rows)} rows: refusing to overwrite')
    by_state = collections.defaultdict(dict)   # st -> (company,type) -> info
    zips = collections.defaultdict(lambda: collections.defaultdict(set))
    for r in rows:
        st = r['carrier_state'].strip().upper()
        if st not in STATE_NAMES: continue
        name = ' '.join(r['company'].split())
        t = 'M' if r['carrier_type'].startswith('Mobile') else 'H'
        key = (name, t)
        d = by_state[st].setdefault(key, {'n': name, 't': t, 'p': r['customer_service'].strip(), 'w': domain(r['website']), 'zips': set()})
        z = r['zip_code'].strip()[:5]
        if z.isdigit():
            d['zips'].add(z)
    out = {}
    for st, comp in by_state.items():
        lst = sorted(comp.values(), key=lambda c: (-len(c['zips']), c['n'].lower(), c['t']))
        idx = {}
        arr = []
        for i, c in enumerate(lst):
            arr.append([c['n'], c['t'], c['p'], c['w']])
            idx[(c['n'], c['t'])] = i
            for z in c['zips']: zips[st][z].add(i)
        allz = set().union(*[c['zips'] for c in lst]) if lst else set()
        out[st] = {'name': STATE_NAMES[st], 'zips': len(allz),
                   'companies': [{'n': c['n'], 't': c['t'], 'p': c['p'], 'w': c['w'], 'z': len(c['zips'])} for c in lst]}
        zfile = {'c': arr, 'z': {z: sorted(v) for z, v in sorted(zips[st].items())}}
        with open(os.path.join(ROOT, 'public', 'data', 'zip', f'{st}.json'), 'w') as f:
            json.dump(zfile, f, separators=(',', ':'), ensure_ascii=False)
    return dict(sorted(out.items())), len(rows)

def subscribers(month):
    q = urllib.parse.urlencode({
        '$select': 'state,support_type,sum(subscriber_count) as subs',
        '$where': f"support_month_date_format='{month}-01T00:00:00.000' and submission_type='CLAIM'",
        '$group': 'state,support_type', '$limit': '1000'})
    data = json.loads(get(f'{API}tfxa-gt3x.json?{q}'))
    res = collections.defaultdict(lambda: {'total': 0, 'tribal': 0})
    for r in data:
        st = r['state']; n = int(float(r.get('subs') or 0))
        res[st]['total'] += n
        if r['support_type'].upper() == 'TRIBAL': res[st]['tribal'] += n
    return dict(sorted(res.items()))

def main():
    month = '2026-06'
    if '--month' in sys.argv: month = sys.argv[sys.argv.index('--month') + 1]
    today = datetime.date.today().isoformat()
    prov, n = providers()
    p_path = os.path.join(ROOT, 'src', 'data', 'providers.json')
    old = json.load(open(p_path))['states'] if os.path.exists(p_path) else None
    json.dump({'read_at': today, 'rows': n, 'dataset': 'kjtb-4uf7', 'states': prov}, open(p_path, 'w'), ensure_ascii=False, indent=0)
    subs = subscribers(month)
    json.dump({'read_at': today, 'support_month': month, 'dataset': 'tfxa-gt3x', 'states': subs}, open(os.path.join(ROOT, 'src', 'data', 'subscribers.json'), 'w'), indent=0)
    counts = {st: {'m': sum(1 for c in v['companies'] if c['t'] == 'M'), 'h': sum(1 for c in v['companies'] if c['t'] == 'H'), 'z': v['zips'],
                   's': subs.get(st, {}).get('total', 0), 'tr': subs.get(st, {}).get('tribal', 0)} for st, v in prov.items()}
    json.dump(counts, open(os.path.join(ROOT, 'src', 'data', 'state-counts.json'), 'w'), separators=(',', ':'))
    print(f'{n} rows, {len(prov)} states; {sum(s["total"] for s in subs.values())} subscribers claimed for {month}')
    if old is not None and old != prov: sys.exit(2)

if __name__ == '__main__':
    main()
