import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'free-phone-for-homeless', group: 'qualify', order: 11,
  tool: { kind: 'elig', props: { state: 'WA', size: 1, income: 0, program: 'none' } },
  mini: { kind: 'mini:nonusage' },
  related: ['lifeline-household-worksheet', 'lifeline-application-denied', 'lifeline-documents', 'free-government-phone', 'lifeline-non-usage'],
  sources: ['cfr410', 'cfr400', 'usacDocs', 'fccLifelineArchive', 'usacEligibility'],
  demarche: true,
  en: {
    slug: 'free-phone-for-homeless', nav: 'Without a permanent address', card: 'Lifeline without a permanent home: temporary addresses, shelters as separate households, address errors and the documents that clear them.',
    title: 'Free Phone for Homeless People: Lifeline Without an Address',
    description: 'Free phone for homeless people: Lifeline accepts a temporary address, counts shelter residents as separate households and offers fixes for an unknown address.',
    h1: 'Free phone without a permanent address: how Lifeline handles it',
    intro: 'No income or a benefit is enough: the checker confirms it, and the page explains what to write in the address field.',
    resume: (h) => `Having no permanent home does not exclude anyone from Lifeline. The federal application form must ask whether your residential address is permanent or temporary, under 47 CFR 54.410, so a shelter, a relative’s home where you are staying or another temporary address can be given, along with a separate billing address if you get mail elsewhere. Eligibility is the same as for everyone: a benefit such as SNAP, Medicaid or SSI, or gross income at or below ${h.lim(1)} a year for one person in 2026, which a person with no income meets. The FCC treats residents of group living facilities as separate households, so several shelter residents can each have Lifeline at one address. Two steps need care: the Postal Service address check, which may not find a shelter or an informal address and has its own fixes, and keeping the address up to date, since the rules ask you to report a move within ${h.R.moveNoticeDays} days.`,
    faqs: (h) => [
      { q: 'Can I get Lifeline if I have no income at all?', a: `Yes. Zero income is below every limit, ${h.lim(1)} for one person in 2026. Proving it is the harder part when no database confirms it: a benefit letter is the simplest route if you receive SNAP, Medicaid or SSI. Otherwise, the accepted income documents include a federal or Tribal notice of participation in General Assistance and other official documents stating income.` },
      { q: 'Ten of us live in the same shelter. Can we all get Lifeline?', a: 'Yes, as long as each person qualifies. The FCC states that Lifeline support is available to eligible subscribers living in group living facilities as separate households. The National Verifier may flag the shared address as a duplicate; each applicant then completes the household worksheet to show that he or she is a separate economic unit.' },
      { q: 'What happens to my Lifeline if I move between shelters?', a: `You keep it, as long as you give the company the new address within ${h.R.moveNoticeDays} days, as every applicant certifies on the form. If the new address fails the address check or matches another subscriber, USAC may open a continued eligibility check, and you then have ${h.R.continuedEligibilityDays} days to answer, so make sure the company can still reach you.` },
    ],
    body: (h) => `<h2>What to write in the address fields</h2>
<p>Under ${h.src('cfr410', '47 CFR 54.410')}, every Lifeline application asks for your full residential address, whether it is permanent or temporary, and your billing address if it differs. In practice:</p>
<ul>
<li><strong>Residential address</strong>: where you actually stay, a shelter, transitional housing, or a friend’s or relative’s home. Tick “temporary” if you do not expect to stay.</li>
<li><strong>Billing address</strong>: where mail reaches you, such as a shelter mail service or a relative’s address. Notices, including the yearly recertification, go there or by email.</li>
</ul>
<p>The residential address is the one the one-per-household check runs on; the billing address only has to reach you.</p>
<h2>When the address cannot be found</h2>
<p>The National Verifier checks addresses against the Postal Service. A shelter, a camp or an address without a standard number may fail that check. USAC’s list of ${h.src('usacDocs', 'error fixes')} gives several ways through it. Online, the application asks you to drop a pin on a map at the place where you live. By mail, you can send a printed map with a pin, any map with your location circled, or even a hand-drawn map naming the nearest crossroads or mile markers, landmarks and distances. A letter from a government agency or a confirmation from the local post office that the address takes deliveries also works.</p>
<h2>Proving eligibility without paperwork at hand</h2>
<p>If you receive SNAP, Medicaid, SSI, Federal Public Housing Assistance or a Veterans Pension, choose that benefit on the application: in many states the National Verifier confirms Medicaid and housing assistance automatically, and the checker above shows the answer. If you qualify on income, which with no income is certain, you need a document: a benefit statement, a notice of participation in General Assistance, or another official document that states income. Identity documents follow the same rule as for anyone else: an unexpired ID showing your date of birth and, if asked, a document with the last four digits of your Social Security number.</p>
<h2>An example from start to finish</h2>
<p>Take a man of fifty staying at a shelter in Seattle, with no income and enrolled in Medicaid. On the application he gives the shelter as a temporary residential address and his sister’s house as the billing address. Medicaid is among the programs the National Verifier checks automatically in Washington, so the eligibility answer can come at once. The shelter address triggers a duplicate address error, because other residents already have Lifeline there; he completes the household worksheet, which shows he shares no income or expenses with them. He then chooses a company listed for the shelter’s ZIP code and receives a discount of up to ${h.support('broadband')} a month, which on many plans means paying nothing.</p>
<h2>Keeping the phone working</h2>
<p>A free Lifeline plan must be used at least once every ${h.R.nonUsageDays} days: a call, a text, data use or answering a call counts. After ${h.R.nonUsageDays} days without use, the company sends a notice and ends the service if you do not use it within ${h.R.cureDays} days. If your phone is lost or broken, contact the company before the period runs out. The tool below counts your days.</p>
<!--tool:mini:nonusage-->
<p>Two more obligations matter on the move. Report a new address within ${h.R.moveNoticeDays} days, and answer the yearly recertification within ${h.R.recertWindowDays} days if it comes, which is easier if your billing address or email reliably reaches you. If an application stops on a shared or unknown address, the ${h.a('lifeline-application-denied', 'page on refused applications')} and the ${h.a('lifeline-household-worksheet', 'household worksheet page')} give the next steps.</p>`,
  },
});
