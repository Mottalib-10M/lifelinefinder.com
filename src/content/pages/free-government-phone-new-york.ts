import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'free-government-phone-new-york', group: 'states', order: 64,
  tool: { kind: 'elig', props: { state: 'NY', size: 3, income: 34000, program: 'snap' } },
  mini: { kind: 'mini:statefacts' },
  related: ['lifeline-by-state', 'free-government-phone-providers', 'free-phone-with-food-stamps', 'lifeline-documents', 'free-government-phone-florida'],
  sources: ['usacEligibility', 'usacVerification', 'usacDocs', 'usacCompanies', 'usacDisbursements', 'cfr410'],
  demarche: true,
  en: {
    slug: 'free-government-phone-new-york', nav: 'New York', card: 'Lifeline in New York: second state by subscribers, SNAP proof that the National Verifier does not check on its own there, limits and companies by ZIP code.',
    title: 'Free Government Phone New York: Lifeline Limits 2026',
    description: 'Free government phone in New York: the 2026 Lifeline limits, why SNAP households there often need a benefit letter, and the companies listed for your ZIP code.',
    h1: 'Free government phone in New York: limits, proof and companies',
    intro: 'Enter your household, income or benefit: the checker gives the New York answer and tells you whether the National Verifier will confirm your benefit by itself.',
    resume: (h) => `New York is the second largest Lifeline state after California: for ${h.subsMonth}, companies claimed federal support for ${h.num(h.subs('NY'))} New York subscribers in USAC data. Applications go through the National Verifier, under the federal rules. A household qualifies through SNAP, Medicaid, SSI, Federal Public Housing Assistance or a Veterans or Survivors Pension, or with gross income at or below ${h.lim(1)} for one person, ${h.lim(3)} for three and ${h.lim(4)} for four in 2026. The discount is up to ${h.support('broadband')} a month, ${h.money(h.S.tribalMax)} on Tribal lands. One New York detail trips up many applicants: according to USAC’s table of data sources, the National Verifier confirms ${h.nvAuto('NY')} automatically in the state, but not SNAP or SSI. A household qualifying through SNAP should keep a recent benefit letter ready to upload.`,
    faqs: (h) => [
      { q: 'My SNAP case is open in New York. Why does the National Verifier want a letter?', a: `Because, in USAC’s table, SNAP is not among the data sources the National Verifier can query in New York. Your SNAP still qualifies you; you prove it with a document showing your name, the program, the agency that issued it and a date within the last ${h.R.docMonths} months, or a future expiration date. Upload a copy, never the original.` },
      { q: 'Does a NYCHA apartment count for Lifeline?', a: 'Federal Public Housing Assistance is a qualifying program, and USAC lists it among the benefits the National Verifier checks automatically in New York. The federal texts read for this page do not list which housing programs it covers, so ask your housing agency whether your assistance is federal public housing assistance and keep its letter in case a document is requested.' },
      { q: 'Are there more Lifeline companies upstate than in New York City?', a: `The count is driven by home phone service. USAC lists ${h.companyCount('NY', 'H')} home service companies in New York, many of them small telephone companies listed for a few upstate ZIP codes, against ${h.companyCount('NY', 'M')} mobile companies that cover most of the state. In the city, the choice is mostly among mobile companies; upstate, a local landline company may also appear.` },
    ],
    body: (h) => `<h2>What is checked automatically in New York</h2>
<p>When you apply, the National Verifier tries to confirm your eligibility against government data before asking for any paper. USAC’s ${h.src('usacVerification', 'table of automated data sources')} shows which benefits each state shares. For New York it lists ${h.nvAuto('NY')}. SNAP and SSI are absent, and so is income. In practice:</p>
<ul>
<li>a household on Medicaid, in public housing or receiving the Veterans Pension usually gets an answer at once;</li>
<li>a household on SNAP or SSI qualifies just the same, but is likely to be asked for a benefit letter dated within the last ${h.R.docMonths} months;</li>
<li>a household qualifying on income sends last year’s tax return, a benefit statement or three consecutive months of pay stubs.</li>
</ul>
<p>If one person in the household is on Medicaid and another on SNAP, choose Medicaid on the application: it is the one New York lets the National Verifier confirm without paperwork.</p>
<!--tool:mini:proof|{"st":${h.stIdx('NY')}}-->
<h2>New York limits with worked examples</h2>
<p>New York uses the column for the 48 states. A household of four in the Bronx with gross income of ${h.money(h.limN(4) - 2500)} a year qualifies on income, ${h.money(2500)} under the ${h.lim(4)} limit. A single adult in Buffalo earning ${h.money(h.limN(1) + 1200)} is ${h.money(1200)} above the ${h.lim(1)} limit and does not qualify on income, but if that adult is enrolled in Medicaid the income test no longer applies.</p>
${h.table(['Household', 'Yearly limit', 'Monthly equivalent'], [1, 2, 3, 4, 5, 6].map((n) => [`${n} ${n > 1 ? 'people' : 'person'}`, h.lim(n), h.money(Math.floor(h.limN(n) / 12))]), `135% of the 2026 guidelines, ${h.src('usacEligibility', 'USAC table')}.`, ['l', 'r', 'r'])}
<h2>Companies listed in New York</h2>
<p>The ${h.src('usacCompanies', 'USAC company list')} names ${h.companyCount('NY')} companies offering Lifeline in New York across ${h.num(h.zipsOf('NY'))} ZIP codes. The mobile companies each cover a large part of the state; the home service companies are mostly local, listed for a handful of ZIP codes. The table shows the companies listed for the most ZIP codes; it is a reading of USAC data, not a recommendation.</p>
${h.companyTable('NY', 8, 'Companies listed for the most New York ZIP codes, USAC data, sorted by coverage.')}
<p>For the list at your address, use the ${h.a('free-government-phone-providers', 'company finder')} with your ZIP code. If you already have Lifeline with one company and want another, the new company handles the switch, as described on the ${h.a('lifeline-transfer', 'transfer page')}.</p>
<h2>Keeping it in New York</h2>
<p>Three federal rules apply after enrollment. A free plan must be used at least once every ${h.R.nonUsageDays} days, or the company sends a ${h.R.cureDays}-day notice before ending it. Every year the National Verifier checks your eligibility again; New Yorkers whose benefit is not in the automatic list above are the ones most likely to receive a recertification request, with ${h.R.recertWindowDays} days to answer. And a move must be reported to the company, because the one-per-household check runs on the address. Compared with ${h.a('free-government-phone-florida', 'Florida')}, where SNAP is checked automatically, New York SNAP households have one more document to keep, nothing more.</p>`,
  },
});
