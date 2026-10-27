/** llms.txt (RECETTE §21), generated at build from the page registry: always in sync with the site. */
import { PAGES } from '../lib/guides';
import { SITE_URL, LAST_UPDATED, SITE_NAMES } from '../data/site-config';
import { route } from '../i18n/routes';
import { GROUPS_ORDER, groupLabel } from '../i18n/nav';
import params from '../data/params-2026.json';

const words = (iso: string) => new Date(iso.slice(0, 10) + 'T12:00:00Z').toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
export function GET() {
  const lines = [
    `# ${SITE_NAMES.en}`,
    '',
    `> Free Lifeline checker for US households: eligibility from state, household size, income and benefits (SNAP, Medicaid, SSI, public housing, veterans pension, Tribal programs) under 47 CFR 54.409 and the 2026 USAC income table (135% of HHS poverty guidelines, Alaska and Hawaii separate), the $${params.support.broadband} monthly discount ($${params.support.tribalMax} on Tribal lands), approved companies by state and ZIP code from USAC open data, documents, recertification, non-usage, transfers, scams, the end of the Affordable Connectivity Program, and state pages. Independent site, not the FCC, USAC or a phone company; it takes no application. Tools run in the browser. Published by Radif Partners. Last updated ${words(LAST_UPDATED)}.`,
    '',
    '## Data',
    `- Rules: 47 CFR Part 54 Subpart E (eCFR), FCC orders and notices, usac.org pages, HHS 2026 poverty guidelines; retrieved ${words(params.retrieved_at)}.`,
    '- Companies and subscribers: USAC open data (public domain), Lifeline Companies Near Me and Lifeline Disbursements.',
    '',
    `- [Lifeline eligibility checker](${SITE_URL}${route('home', 'en')}): state, household, income and benefits to the 2026 answer`,
    '',
    ...GROUPS_ORDER.flatMap((g) => [`## ${groupLabel(g)}`, ...PAGES.filter((p) => p.group === g).map((p) => `- [${p.en.nav}](${SITE_URL}${route(p.id, 'en')}): ${p.en.card}`), '']),
    '## About',
    `- [Method and sources](${SITE_URL}${route('method', 'en')})`,
    `- [About](${SITE_URL}${route('about', 'en')})`,
  ];
  return new Response(lines.join('\n') + '\n', { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
