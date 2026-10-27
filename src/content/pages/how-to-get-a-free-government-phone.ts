import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'how-to-get-a-free-government-phone', group: 'apply', order: 40,
  tool: { kind: 'steps' },
  mini: { kind: 'elig', props: { state: 'OH', size: 1, income: 18000, program: 'none' } },
  related: ['national-verifier', 'lifeline-documents', 'free-government-phone-providers', 'lifeline-application-denied', 'lifeline-scams'],
  sources: ['usacHowNv', 'fccLifelineArchive', 'usacDocs', 'usacOptOut', 'cfr410'],
  demarche: true,
  en: {
    slug: 'how-to-get-a-free-government-phone', nav: 'How to apply', card: 'The three official ways to apply for Lifeline, what each step asks of you, how long it takes and the moment you choose a company.',
    title: 'Free Government Phone Application: 5 Steps to Lifeline',
    description: 'Free government phone application in five steps: check eligibility, apply online, by mail or with a company, send proof if asked, pick a company, renew yearly.',
    h1: 'How to get a free government phone, step by step',
    intro: 'The timeline shows each official step from application to the first yearly check; change the start date to yours.',
    resume: (h) => `Getting a free government phone means applying for the federal Lifeline benefit and then choosing a company that offers a Lifeline plan. The application goes to the National Verifier, the system USAC runs for the FCC, except in Oregon and Texas, which use their own process. There are three ways in: online on the consumer portal, by mailing the official paper form to the Lifeline Support Center, or in person with a company agent, who must have you sign the application yourself and cannot take it by phone. The system checks your identity, address and benefit or income against government data; when a check fails, it asks for a copy of a document dated within the last ${h.R.docMonths} months. Once approved, you contact a company in your area, which enrolls you. The benefit is up to ${h.support('broadband')} a month, ${h.money(h.S.tribalMax)} on Tribal lands, and must be renewed every year.`,
    faqs: (h) => [
      { q: 'How long does a Lifeline application take?', a: `When the databases confirm everything, the answer is immediate and you can enroll the same day. When a document is needed, an upload is reviewed by the Lifeline Support Center, while a mailed application or mailed documents take ${h.R.mailReviewBusinessDays[0]} to ${h.R.mailReviewBusinessDays[1]} business days of review plus mail time, and the decision comes back by U.S. mail.` },
      { q: 'Can someone else fill in my Lifeline application for me?', a: 'A company agent can guide you through it, in person, but you must initial and sign the application yourself; the USAC instructions say agents cannot sign for you and cannot accept an application by phone. A family member can help you read and fill in the form, as long as the answers are yours and true.' },
      { q: 'Do I need a phone number or email to apply?', a: 'Not to apply by mail: the paper form and the decision travel by U.S. mail. The online portal works from any computer or mobile device, so a library computer is enough. If you have no permanent address, the application asks whether your address is permanent or temporary, so a shelter or temporary address can be given and kept up to date.' },
      { q: 'Who do I call if my application is stuck?', a: `The Lifeline Support Center, run by USAC, at ${h.R.supportCenterPhone}. It can tell you whether documents are missing and how to send them. Keep your application number at hand when you call, and never pay anyone who offers to speed up a decision.` },
    ],
    body: (h) => `<h2>Step 1: check that you qualify</h2>
<p>Before giving anyone your details, check the rule on your own figures. You qualify if someone in your household receives SNAP, Medicaid, SSI, Federal Public Housing Assistance or a Veterans or Survivors Pension, or if gross household income is at or below 135% of the poverty guidelines, ${h.lim(1)} for one person in 2026. The checker below takes thirty seconds and stays in your browser.</p>
<!--tool:elig|{"state":"OH","size":1,"income":18000,"program":"none"}-->
<h2>Step 2: choose how to apply</h2>
<p>The ${h.src('usacHowNv', 'USAC instructions for the National Verifier')} give three routes, and the result is the same whichever you choose:</p>
<ul>
<li><strong>Online, on your own.</strong> The consumer portal works on a computer or phone. You enter your name, date of birth, the last four digits of your Social Security number or a Tribal ID number, your address and your benefit, and upload documents if asked. After approval you contact a company to enroll.</li>
<li><strong>By mail.</strong> You fill in the official application form, and the household worksheet if others live at your address, initial each certification and sign. USAC suggests capital letters, black ink, and copies of your proof of identity and eligibility in the envelope. The decision comes by mail.</li>
<li><strong>With a company agent, in person.</strong> The agent uses the National Verifier on a tablet or computer, asks you the questions and uploads documents, but you sign. Agents cannot sign for you or take the application by phone.</li>
</ul>
<p>In Oregon and Texas the National Verifier is not used: you apply through the ${h.src('usacOptOut', 'state process')}, usually with the company you choose. The ${h.a('free-government-phone-texas', 'Texas page')} describes that route.</p>
<h2>Step 3: send proof only if asked</h2>
<p>The National Verifier first tries to confirm your identity, address and eligibility through government data. Proof is needed only when a check fails. For a benefit, the document must show your name or that of the household member, the program, the agency that issued it and a date within the last ${h.R.docMonths} months or a future expiration date. For income, last year’s tax return or a benefit statement covers a year; pay stubs must cover three consecutive months. Send copies, never originals. The ${h.a('lifeline-documents', 'documents page')} lists everything accepted.</p>
<h2>Step 4: choose a company and enroll</h2>
<p>Approval does not give you a phone: it makes you eligible. You then pick an approved company in your area; the ${h.a('free-government-phone-providers', 'company finder')} lists them by ZIP code from USAC data. The company enrolls you in the National Lifeline Accountability Database, which also checks that nobody else at your address already has the benefit. Compare data, any monthly charge above the discount and the phone offered: the ${h.src('fccLifelineArchive', 'FCC')} reminds consumers that it does not subsidize phones, so a handset is the company’s own offer.</p>
<h2>Step 5: keep the benefit</h2>
<p>Three obligations follow. If your plan is free, use it at least once every ${h.R.nonUsageDays} days. Answer the yearly recertification within ${h.R.recertWindowDays} days if one is requested; many households are renewed automatically. And tell your company if you stop qualifying, for example when income rises or a benefit ends, or if someone else in your household already gets Lifeline. The ${h.a('lifeline-recertification', 'recertification calendar')} computes your dates, and the ${h.a('lifeline-application-denied', 'page on refused applications')} explains what to do if the answer is no.</p>`,
  },
});
