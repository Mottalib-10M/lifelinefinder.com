import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'lifeline-application-denied', group: 'apply', order: 48,
  tool: { kind: 'elig', props: { state: 'PA', size: 3, income: 38000, program: 'none' } },
  mini: { kind: 'mini:household' },
  related: ['national-verifier', 'lifeline-documents', 'lifeline-household-worksheet', 'lifeline-scams', 'how-to-get-a-free-government-phone'],
  sources: ['usacDocs', 'usacVerification', 'cfr400', 'cfr409', 'usacEligibility'],
  demarche: true,
  en: {
    slug: 'lifeline-application-denied', nav: 'Application refused', card: 'Why a Lifeline application is refused or stuck: income over the limit, duplicate subscriber, shared address, identity, age, address not found, and the fix for each.',
    title: 'Lifeline Application Denied: Reasons and Fixes in 2026',
    description: 'Lifeline application denied or stuck: the usual National Verifier errors, from income over the limit to a duplicate address, and the document that fixes each.',
    h1: 'Lifeline application denied: find the reason, then the fix',
    intro: 'Check your figures again first: the checker shows whether the refusal comes from the rules or from a step you can fix.',
    resume: (h) => `Most Lifeline refusals are not final decisions about your eligibility but errors the National Verifier could not resolve on its own. USAC lists them with the documents that clear them. The application can stop because your identity did not match, your address was not found by the Postal Service check, someone at your address already has Lifeline, you are under ${h.R.minAge} without being an emancipated minor, or your benefit or income could not be confirmed in a database. Each has a fix: an unexpired ID showing your date of birth and the last four digits of your Social Security number, a pin dropped on your home on a map, the household worksheet, a court document, or a benefit letter dated within ${h.R.docMonths} months. A real refusal on the rules happens when no one in the household receives a qualifying benefit and income is above 135% of the poverty guidelines, ${h.lim(3)} a year for three people in 2026. The checker above tells you which case you are in.`,
    faqs: (h) => [
      { q: 'The National Verifier says I already have Lifeline, but I do not. Why?', a: 'That is the duplicate subscriber error: the database shows a Lifeline benefit under your identity, often from an old enrollment you forgot or one made without your consent. If you want to switch, a company can obtain your consent and transfer the benefit. If you think it is fraud, call the Lifeline Support Center, which can tell you which company claims you.' },
      { q: 'My roommate has Lifeline. Am I refused because of the shared address?', a: 'Not necessarily. Lifeline allows one benefit per household, and a household means people who share income and expenses. If you and your roommate keep your money separate, complete the household worksheet to show you are a separate economic household; the application can then go ahead at the same address.' },
      { q: 'I was a few dollars over the income limit. Can I apply again later?', a: `Yes. The rules read for this page set no waiting period. If your income drops, if the household grows, or if someone in it starts receiving SNAP, Medicaid, SSI, public housing assistance or a Veterans Pension, apply again. The limits are also updated each year with the new poverty guidelines; in 2026 the limit for one person is ${h.lim(1)}.` },
    ],
    body: (h) => `<h2>Errors and their fixes</h2>
<p>USAC’s page on ${h.src('usacDocs', 'resolving application errors')} gives the documents for each error. Send copies, never originals; by mail, add the cover sheet.</p>
${h.table(['Error', 'What it means', 'What fixes it'], [
  ['Identity: Social Security digits or date of birth', 'The identity check found no match', 'Unexpired document with your name and the last four digits, or your date of birth: driver’s license, passport, Social Security card, W-2, tax return'],
  ['Address not found', 'The Postal Service check does not know the address', 'Online, a pin on your home; by mail, a map or a utility bill, lease or ID with the address'],
  ['Duplicate address', 'Another subscriber at the same address', 'Household worksheet showing a separate economic unit'],
  ['Duplicate subscriber', 'You already have Lifeline somewhere', 'Consent to a transfer, or a call to the support center if it is fraud'],
  [`Under ${h.R.minAge}`, 'Applicant is a minor', 'Court document or certificate of emancipation'],
  ['Eligibility not confirmed', 'No database found the benefit or income', 'Benefit letter within the last year, or income proof'],
  ['Proof of life', 'The applicant may be listed as deceased', 'One document with date of birth and SSN digits, and one showing activity in the last three months'],
], 'From USAC’s list of National Verifier errors and accepted documents.', ['l', 'l', 'l'])}
<p>Identity and address errors are usually the quickest to clear, because one document or a pin on a map is enough. Before sending anything, check that your name, date of birth and address are typed exactly as they appear on your ID and your mail.</p>
<h2>A refusal on the rules</h2>
<p>If every check passed and the answer is still no, the cause is eligibility itself. Under ${h.src('cfr409', '47 CFR 54.409')} you qualify only through a listed benefit or through income at or below 135% of the guidelines. Look at the household again: a dependent child on Medicaid, or a spouse receiving SSI, qualifies the whole household. Check that you counted gross income, before taxes, for all members, and that you counted every person who shares income and expenses with you, as defined in ${h.src('cfr400', '47 CFR 54.400')}. A larger household has a higher limit:</p>
${h.table(['Household', 'Limit', 'Limit one person larger'], [1, 2, 3, 4, 5].map((n) => [`${n} ${n > 1 ? 'people' : 'person'}`, h.lim(n), h.lim(n + 1)]), `2026 limits, ${h.src('usacEligibility', 'USAC table')}.`, ['l', 'r', 'r'])}
<!--tool:mini:household-->
<h2>Shared addresses and the household question</h2>
<p>Shelters, group homes and shared apartments produce many duplicate address errors. The FCC treats residents of group living facilities as separate households, and roommates who keep separate finances are separate households too. The ${h.a('lifeline-household-worksheet', 'household worksheet page')} walks through the questions; the tool above counts how many Lifeline benefits your address can hold.</p>
<h2>Who to call</h2>
<p>The Lifeline Support Center answers at ${h.R.supportCenterPhone} and can tell you which error stopped your application and which documents are missing. A company agent can also look at the error with you in person. Be wary of anyone who asks for money to fix an application: the process has no fee, as the ${h.a('lifeline-scams', 'scams page')} explains. Once the error is cleared, your application continues where it stopped; the ${h.a('national-verifier', 'National Verifier page')} explains what happens next.</p>`,
  },
});
