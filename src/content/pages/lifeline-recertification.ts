import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'lifeline-recertification', group: 'apply', order: 42,
  tool: { kind: 'recert' },
  related: ['lifeline-non-usage', 'lifeline-documents', 'national-verifier', 'lifeline-household-worksheet', 'lifeline-application-denied'],
  sources: ['usacRecert', 'cfr410', 'cfr405', 'fccLifelineArchive', 'usacOptOut'],
  demarche: true,
  en: {
    slug: 'lifeline-recertification', nav: 'Annual recertification', card: 'Each year Lifeline checks that you still qualify. When the automatic check is enough, when you must answer within 60 days, and how.',
    title: 'Lifeline Recertification 2026: Deadline, Form and Methods',
    description: 'Lifeline recertification: an automatic check comes first; if it fails, you get 60 days to answer by mail, online or by phone menu. Calculator of your deadlines.',
    h1: 'Lifeline recertification: keeping the benefit each year',
    intro: 'Enter the date you enrolled or the date on your notice: the calendar gives your recertification window and the last day before de-enrollment.',
    resume: (h) => `Every Lifeline subscriber is recertified once a year, and for many nothing has to be done. The National Verifier first runs an automated check of government databases; if it confirms your eligibility, the recertification is complete and no letter needs an answer. If the check fails, USAC sends a letter or email in English and Spanish with a barcoded copy of FCC Form 5630, and you have ${h.R.recertWindowDays} days to recertify by mail, online or through an automated phone line. A subscriber whose eligibility was confirmed by a database the previous time but no longer appears in one must also send proof of eligibility, such as a benefit letter dated within ${h.R.docMonths} months or ${h.R.payStubMonths} months of pay stubs. Missing the window means automatic de-enrollment from the national database ${h.R.deEnrollBusinessDays} business days after it closes, as ${h.src('usacRecert', 'USAC’s recertification page')} explains. In Oregon and Texas, the state administrator handles the yearly check instead of the National Verifier.`,
    faqs: (h) => [
      { q: 'How do I know whether my recertification was automatic?', a: `If you receive no recertification letter, email or reminder call from USAC around the anniversary of your enrollment, the automated check most likely confirmed you. Your company can see your status in its recertification report, and the Lifeline Support Center at ${h.R.supportCenterPhone} can tell you whether you are in an open ${h.R.recertWindowDays}-day window.` },
      { q: 'Will I get a receipt after mailing Form 5630?', a: `No written receipt is sent when USAC receives a mailed form. You can call the Lifeline Support Center to check its status, or ask your company, which sees it in its reports. Once the recertification succeeds, USAC mails a notice confirming your continued eligibility. Recertifying online gives the result at once, which avoids the wait.` },
      { q: 'Can I recertify by phone?', a: 'Yes, if your letter only asks you to complete the form. Those subscribers can use an interactive voice response line, which takes about ten minutes and needs the Application ID printed on the recertification letter. Subscribers who must also send proof of eligibility cannot use the phone line and recertify online or by mail instead.' },
    ],
    body: (h) => `<h2>The two paths of a recertification</h2>
<p>The rule behind the yearly check is ${h.src('cfr410', '47 CFR 54.410(f)')}: eligibility is confirmed through eligibility or income databases first, and only when that fails does the subscriber have to sign a certification. In states served by the National Verifier, USAC runs the process; in Oregon and Texas, under the ${h.src('usacOptOut', 'state process')}, the state administrator does. The paths then split three ways:</p>
${h.table(['Result of the automated check', 'What you must do'], [
  ['Eligibility confirmed', 'Nothing'],
  ['Not confirmed, never confirmed by a database before', `Complete Form 5630 within ${h.R.recertWindowDays} days`],
  ['Not confirmed now, but confirmed by a database last time', `Complete Form 5630 and send proof of eligibility within ${h.R.recertWindowDays} days`],
], 'National Verifier recertification outcomes.', ['l', 'l'])}
<p>The third case can apply even when nothing changed in your life, because what triggers it is the database result, not a change you reported. The proof is the same as at enrollment, listed on the ${h.a('lifeline-documents', 'documents page')}.</p>
<h2>The ${h.R.recertWindowDays}-day window, day by day</h2>
<p>The window opens with the first mailing: a letter or email, with the barcoded form. During the ${h.R.recertWindowDays} days you may receive up to three prerecorded calls and a reminder postcard, which stop once you recertify. When the window closes without an answer, USAC notifies you by mail or email and de-enrolls you ${h.R.deEnrollBusinessDays} business days later; the company is told by an automated email. The calendar at the top places those dates on your own timeline.</p>
<p>The prerecorded calls are worth listening to rather than deleting. They tell you that it is time to recertify, give your deadline, and offer to continue straight away through the phone menu if your case allows it, or point you to the online portal or the mailed form. Companies may also contact you to say that USAC should have written to you and that you should answer USAC.</p>
<p>The ${h.src('cfr405', 'de-enrollment rule')} sets the same frame for every entity running a recertification: the subscriber must be told in writing, separate from the bill, that failing to respond triggers de-enrollment, and gets ${h.R.recertWindowDays} days to answer.</p>
<h2>Three ways to answer</h2>
<p><strong>Online.</strong> The letter gives the address of the National Verifier portal and instructions; the result appears immediately. <strong>By mail.</strong> Return the barcoded Form 5630, with copies of documents if asked; no receipt is sent, and USAC mails a confirmation after success. <strong>By phone menu.</strong> Only for subscribers asked to complete the form without documents; it takes about ten minutes with the Application ID from your letter.</p>
<h2>When your situation changed during the year</h2>
<p>Recertification is also the moment the household is checked again. If someone moved in or out and you can no longer certify that your household receives only one Lifeline service, the rule asks for a new ${h.a('lifeline-household-worksheet', 'household worksheet')}. If your income rose above the limit, ${h.lim(2)} for two people in the 48 states, and no one receives a qualifying benefit, the ${h.src('fccLifelineArchive', 'FCC')} asks you to contact your company to de-enroll rather than wait for the check, to avoid penalties. A company must act on a subscriber’s request within ${h.R.subscriberRequestBusinessDays} business days.</p>
<!--tool:mini:limit-->
<p>A recertification is separate from the usage rule: a free plan must still be used every ${h.R.nonUsageDays} days, as the ${h.a('lifeline-non-usage', 'non-usage page')} explains, and a successful recertification does not protect an unused line.</p>`,
  },
});
