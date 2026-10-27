import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'national-verifier', group: 'apply', order: 47,
  tool: { kind: 'mini:proof', props: { st: 0 } },
  mini: { kind: 'elig', props: { state: 'GA', size: 2, income: 25000, program: 'snap' } },
  related: ['how-to-get-a-free-government-phone', 'lifeline-documents', 'lifeline-application-denied', 'lifeline-by-state', 'lifeline-household-worksheet'],
  sources: ['usacVerification', 'usacHowNv', 'usacOptOut', 'usacDocs', 'cfr410'],
  demarche: true,
  en: {
    slug: 'national-verifier', nav: 'National Verifier', card: 'What the National Verifier checks, which databases it reads in your state, when it asks for documents and the separate continued eligibility check.',
    title: 'National Verifier: How Lifeline Checks Your Eligibility',
    description: 'National Verifier explained: the identity, address and benefit checks behind a Lifeline decision, databases read in each state and when a document is needed.',
    h1: 'The National Verifier: what it checks and when it asks for proof',
    intro: 'Pick your state and benefit: the tool tells you whether the National Verifier can confirm it on its own or will ask for a document.',
    resume: (h) => `The National Verifier is the system the FCC set up and USAC runs to decide who qualifies for Lifeline and to recertify subscribers every year. It is used in every state and territory except Oregon and Texas. When you apply, online, by mail or with a company agent in person, it runs three checks. Identity goes through a third-party identity verification using your name, date of birth and the last four digits of your Social Security number. Address goes through the U.S. Postal Service address matching service, along with a search for another Lifeline benefit at the same address. Eligibility goes through computer matching agreements: federal connections with HUD for public housing assistance, the Centers for Medicare and Medicaid Services for Medicaid and Veterans Affairs for the pension, plus whatever state databases each state shares. When a check finds nothing, you upload or mail a document, dated within the last ${h.R.docMonths} months for a benefit.`,
    faqs: (h) => [
      { q: 'Why did the National Verifier not find my SNAP benefit?', a: 'In many states SNAP is not connected to the National Verifier at all. USAC’s table lists, state by state, which programs have automated data sources; California, New York and Illinois, for example, check Medicaid, public housing and the Veterans Pension, but not SNAP. Your SNAP still qualifies you: upload a recent benefit letter showing your name, the program, the agency and a date.' },
      { q: 'Is income ever checked automatically?', a: 'Rarely. In most states the USAC table lists income among the manual verifications, so a household qualifying on income alone should plan to send last year’s tax return, a benefit statement or three consecutive months of pay stubs. Choosing a qualifying benefit instead, when someone in the household has one, usually makes the application faster.' },
      { q: 'What is the continued eligibility check?', a: `A separate check from the yearly recertification. USAC runs it when a subscriber may have died, when a new address failed the address check or matches another subscriber, or when there is reason to believe the subscriber no longer qualifies. You get ${h.R.continuedEligibilityDays} days to answer online or by mail, and USAC de-enrolls within ${h.R.deEnrollBusinessDays} business days after the window closes.` },
    ],
    body: (h) => `<h2>The three automatic checks</h2>
<p>According to USAC’s page on ${h.src('usacVerification', 'eligibility verification')}, the National Verifier checks your information against databases the moment the application is submitted:</p>
<ul>
<li><strong>Identity</strong>, through third-party identity verification. A mismatch on the last four digits of the Social Security number or the date of birth produces an error you fix with an unexpired document showing them, such as a driver’s license, a passport, a W-2 or a Social Security card.</li>
<li><strong>Address</strong>, through the Postal Service address matching service. An address it cannot find is fixed online by dropping a pin on a map of your home, or by mail with a map or another proof of address.</li>
<li><strong>Duplicates</strong>: another Lifeline benefit for the same person or at the same address. A shared address is resolved with the ${h.a('lifeline-household-worksheet', 'household worksheet')}.</li>
</ul>
<p>Then comes eligibility: your benefit, through computer matching agreements, or your income, which in most states needs a document.</p>
<h2>Which benefits each state shares</h2>
<p>USAC has federal data connections for three programs: HUD for Federal Public Housing Assistance, the Centers for Medicare and Medicaid Services for Medicaid, and Veterans Affairs for the Veterans and Survivors Pension. SNAP and SSI depend on what each state shares. In Georgia, the National Verifier confirms ${h.nvAuto('GA')}; in Illinois, ${h.nvAuto('IL')}; in Michigan, ${h.nvAuto('MI')}. The tool at the top gives the answer for every state and benefit, read from USAC’s table.</p>
${h.table(['State', 'Checked automatically'], ['CA', 'FL', 'GA', 'IL', 'MI', 'NY', 'OH', 'PA'].map((st) => [h.stateName(st), h.nvAuto(st)]), `Programs with automated data sources, from the ${h.src('usacVerification', 'USAC table')}. Everything else is verified with a document.`, ['l', 'l'])}
<p>Oregon and Texas do not appear: as ${h.src('usacOptOut', 'opt-out states')} they use their own state databases and process.</p>
<!--tool:elig|{"state":"GA","size":2,"income":25000,"program":"snap"}-->
<h2>When a document is needed</h2>
<p>If a check fails, the application shows an error and asks for a copy. A benefit document must show your name or that of the household member who qualifies you, the program, the agency or managed care organization that issued it, and a date within the last ${h.R.docMonths} months or a future expiration date. Income documents cover a full year, like a tax return or an annual benefit statement, or else three consecutive months, like pay stubs. Upload them through the consumer portal or mail them with the cover sheet to the Lifeline Support Center; mailed documents take ${h.R.mailReviewBusinessDays[0]} to ${h.R.mailReviewBusinessDays[1]} business days to review. The ${h.a('lifeline-documents', 'documents page')} gives the full list.</p>
<h2>After approval: recertification and continued eligibility</h2>
<p>Approval lasts a year. The National Verifier then recertifies you, automatically when its databases still confirm your benefit, otherwise with a request you have ${h.R.recertWindowDays} days to answer. Separately, USAC may open a continued eligibility check at any time if a subscriber may have died, if a new address fails the address check or duplicates another, or if there is reason to believe the subscriber no longer qualifies. That check gives ${h.R.continuedEligibilityDays} days to answer, with an initial notice and a final notice by email or mail, and de-enrollment ${h.R.deEnrollBusinessDays} business days after the deadline. If a decision goes against you, the ${h.a('lifeline-application-denied', 'page on refused applications')} lists the usual errors and their fixes.</p>`,
  },
});
