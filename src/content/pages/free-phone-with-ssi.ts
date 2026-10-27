import { definePage } from '../../lib/guide-types';

type Nv = Record<string, { auto: string[] }>;

export default definePage({
  id: 'free-phone-with-ssi', group: 'qualify', order: 8,
  tool: { kind: 'elig', props: { state: 'FL', size: 1, income: 12000, program: 'ssi' } },
  related: ['free-phone-for-seniors', 'free-phone-with-medicaid', 'lifeline-documents', 'lifeline-application-denied', 'lifeline-eligibility'],
  sources: ['cfr409', 'cfr410', 'usacEligibility', 'usacVerification', 'usacDocs', 'usacHowNv'],
  demarche: true,
  en: {
    slug: 'free-phone-with-ssi', nav: 'Free phone with SSI', card: 'SSI qualifies you for Lifeline, but only two states match it automatically. The SSI letter that works, and SSI against SSDI.',
    title: 'Free Phone With SSI: Lifeline for Supplemental Security',
    description: 'Free phone with SSI: Supplemental Security Income qualifies you for Lifeline, but most states cannot confirm it automatically. The letter to send, and SSDI.',
    h1: 'Free phone with SSI: qualifying for Lifeline through SSI',
    intro: 'SSI is already selected in the checker above. Choose your state to see whether the National Verifier will ask you for an SSI letter.',
    resume: (h) => {
      const nv = h.P.nv as Nv;
      const auto = Object.keys(nv).filter((s) => nv[s].auto.includes('ssi')).map((s) => h.stateName(s));
      return `Supplemental Security Income (SSI) is one of the five federal programs that qualify a household for Lifeline under 47 CFR 54.409, so an SSI recipient qualifies without any income test and can get up to ${h.support('broadband')} a month off one phone or internet plan, or up to ${h.money(h.S.tribalMax)} on qualifying Tribal lands. The benefit can be received by you, a dependent or anyone in your household: a child receiving SSI qualifies the parents’ household too. The practical difficulty is proof. USAC’s table of automated data sources shows SSI matched automatically in only ${auto.length} states, ${h.list(auto)}. Everywhere else the National Verifier cannot see your SSI and asks for a copy of a letter that shows your name, the program, the issuing agency and a date within the last ${h.R.docMonths} months. Oregon and Texas run their own state process. SSI is not the same as Social Security disability or retirement benefits, which do not appear in the program list and count only as income, compared with the ${h.lim(1)} limit for one person.`;
    },
    faqs: (h) => [
      { q: 'Does SSDI count like SSI for Lifeline?', a: `No. Social Security Disability Insurance is not one of the programs named in the Lifeline rule; only Supplemental Security Income is. An SSDI recipient qualifies through income, ${h.lim(1)} a year for one person and ${h.lim(2)} for two in 2026, or through Medicaid, SNAP or another listed program. A Social Security statement of benefits is accepted as proof of that income.` },
      { q: 'Why did the National Verifier not find my SSI?', a: `Because in most states it has no data connection that shows SSI. USAC’s table lists an automatic SSI match only in ${h.stateName('MI')} and ${h.stateName('WI')}; elsewhere SSI sits in the column of manual verifications. The fix is simple: upload or mail a copy of a recent SSI letter that shows your name, the program name, the issuing agency and a date within the last ${h.R.docMonths} months.` },
      { q: 'Can my child’s SSI qualify our whole household?', a: 'Yes. The rule counts benefits received by the applicant, by one or more of the applicant’s dependents, or by the household. A parent whose child receives SSI applies in the parent’s own name and names SSI as the program. The supporting letter may show the child’s name, as the person who receives the benefit, rather than the parent’s.' },
      { q: 'Should I mail my SSI letter or upload it?', a: `Uploading is faster. USAC says documents submitted online during business hours, 9 a.m. to 9 p.m. Eastern time, are reviewed within minutes, while a decision on mailed documents arrives by mail within ${h.R.mailReviewBusinessDays[0]} to ${h.R.mailReviewBusinessDays[1]} business days. If you mail it, include the completed cover sheet, and always send a copy, never the original letter.` },
    ],
    body: (h) => `<h2>SSI qualifies you: the rule and the amount</h2>
<p>The ${h.src('cfr409', 'qualification rule')} lists Supplemental Security Income next to Medicaid, SNAP, Federal Public Housing Assistance and the Veterans and Survivors Pension Benefit. Receiving any one of them is enough, and your income is not compared with the limit. The benefit then works as for everyone: one discount per household, on a mobile plan, a home phone line, home internet or a bundle, worth up to ${h.support('broadband')} a month, or ${h.support('voice')} for a voice-only plan.</p>
<h2>Why SSI usually needs a letter</h2>
<p>The National Verifier confirms programs through data connections. For Medicaid, public housing and the VA pension, USAC has federal connections that work in every state. For SSI it relies on state connections, and the ${h.src('usacVerification', 'USAC table')} shows only two. Here is how the same SSI recipient fares in three places:</p>
<!--tool:mini:proof|{"st":${h.stIdx('FL')},"p":2}-->
<p>In ${h.stateName('FL')}, the National Verifier checks ${h.nvAuto('FL')} on its own, so an SSI application goes to manual review. In ${h.stateName('MI')}, where it checks ${h.nvAuto('MI')}, the same application can be approved at once. In ${h.stateName('TX')}, the state process handles it. A Florida SSI recipient who is also enrolled in Medicaid can name Medicaid instead and skip the upload, since Medicaid is matched there.</p>
<h2>The SSI letter that passes manual review</h2>
<p>USAC’s ${h.src('usacDocs', 'document rules')} ask for a copy that shows four elements: your name, or the name of the household member who receives SSI; the name of the program, Supplemental Security Income; the agency that issued it; and an issue date within the last ${h.R.docMonths} months, or a future expiration date that covers the benefit period. An award letter or a benefit notice from the past year normally meets them. An old award letter from several years ago, even if your SSI never stopped, does not.</p>
<p>You can send it in three ways described on the ${h.src('usacHowNv', 'USAC page on applying')}: upload it yourself in the consumer portal, have a company representative upload it while helping you in person, or mail a copy with the cover sheet to the Lifeline Support Center. If the identity check also fails, the same review asks for a document showing your date of birth or the last four digits of your Social Security number.</p>
<h2>SSI, SSDI and retirement benefits</h2>
<p>Of SSI, Social Security disability benefits and Social Security retirement benefits, only SSI is a Lifeline program. Social Security retirement and disability benefits are income under the ${h.src('cfr410', 'eligibility rule')}, which lists a Social Security statement of benefits among the accepted proofs of income. Two examples:</p>
<p><strong>A woman in Tampa receiving ${h.money(1000)} a month of SSI.</strong> She qualifies through SSI. Her SSI letter, dated within the last ${h.R.docMonths} months, is her proof.</p>
<p><strong>A man in Tampa receiving ${h.money(1500)} a month of SSDI and no SSI.</strong> His yearly income is ${h.money(1500 * 12)}, ${h.money(h.limN(1) - 1500 * 12)} under the one-person limit of ${h.lim(1)}. He qualifies on income and proves it with his statement of benefits. Had he received ${h.money(1900)} a month, ${h.money(1900 * 12)} a year, he would be over the limit and would need Medicaid, SNAP or another listed program.</p>
<h2>If the application is refused</h2>
<p>If an SSI application is refused after manual review, compare your copy with the four elements above before trying again: a missing date or a missing name is enough to fail. The ${h.a('lifeline-application-denied', 'denied application page')} explains the common error messages, and the ${h.a('free-phone-for-seniors', 'seniors page')} covers older SSI recipients living with family.</p>`,
  },
});
