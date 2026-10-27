import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'lifeline-documents', group: 'apply', order: 41,
  tool: { kind: 'mini:docs' },
  related: ['how-to-get-a-free-government-phone', 'national-verifier', 'lifeline-application-denied', 'lifeline-household-worksheet', 'lifeline-income-limits'],
  sources: ['usacDocs', 'cfr410', 'usacHowNv', 'usacVerification', 'fccLifelineArchive'],
  demarche: true,
  en: {
    slug: 'lifeline-documents', nav: 'Documents for Lifeline', card: 'Which papers prove a benefit, your income, your identity or your address for Lifeline, how recent they must be and how to send them.',
    title: 'Lifeline Documents Checklist: Proof of Benefit, Income, ID',
    description: 'Lifeline documents checklist: what proves SNAP or Medicaid, which income papers count, the 3-month pay stub rule, ID and address proof, and how to send copies.',
    h1: 'Lifeline documents: the proof the National Verifier accepts',
    intro: 'Say how you qualify: the checklist gives the document you need, what it must show and how recent it must be.',
    resume: (h) => `Most Lifeline applicants send no document at all: the National Verifier first checks government databases for your benefit, income, identity and address, and asks for paper only when one of those checks fails. When it does, the proof depends on the error. For a benefit such as SNAP or Medicaid, one document must show your name or that of the household member who receives it, the program name, the agency that issued it, and an issue date within the last ${h.R.docMonths} months or a future expiration date. For income, the accepted papers include last year’s tax return, a Social Security, veterans, pension or unemployment statement of benefits, or pay stubs; a document covering less than a year, such as pay stubs, must be of the same type and cover ${h.R.payStubMonths} consecutive months within the previous ${h.R.docMonths}. Identity errors need an unexpired official document with your name and date of birth or the last four digits of your Social Security number. Always send copies, never originals, with the cover sheet when you mail them, as ${h.src('usacDocs', 'USAC instructs')}.`,
    faqs: (h) => [
      { q: 'What must a SNAP or Medicaid letter show to be accepted?', a: `Four elements, as USAC lists them: your name or that of the person receiving SNAP, the program name, the agency that issued it, and a date within the last ${h.R.docMonths} months or a future expiration date. A paper missing the agency or the date does not meet the standard, and the application stays in manual review at the Lifeline Support Center until a complete document arrives.` },
      { q: 'How many pay stubs does Lifeline want?', a: `Enough to cover ${h.R.payStubMonths} consecutive months within the previous ${h.R.docMonths} months, all of the same type. Someone paid every two weeks therefore sends about six or seven stubs, someone paid weekly about thirteen. A yearly document such as last year’s tax return or a benefit statement replaces the stubs, because it already covers a full year of income.` },
      { q: 'My utility bill is in my name; can it prove I am alive and living at home?', a: 'A current water, electricity or waste removal bill is accepted as recent life activity, and a utility bill also resolves most address errors. For proof of life, phone and internet bills do not count as utility bills; for the address check, a phone bill from your own Lifeline company does not count. The enhanced Tribal benefit needs map coordinates instead.' },
      { q: 'Can a 17-year-old send documents to get Lifeline?', a: `Only an emancipated minor. Applicants must be at least ${h.R.minAge}, and the one exception is a minor declared emancipated, who sends a copy of the court document or certificate stating it. Other teenagers are part of their parent’s or guardian’s household, which may hold one Lifeline benefit of its own if it qualifies.` },
    ],
    body: (h) => `<h2>When a document is needed at all</h2>
<p>The National Verifier runs four automated checks: eligibility, identity, address and duplicates. Which benefits it confirms on its own depends on your state, as listed in ${h.src('usacVerification', 'USAC’s table of data sources')}. Public housing and the veterans pension are checked automatically everywhere USAC lists, Medicaid in every state and in most territories, SNAP only in some states, and income in Wisconsin alone. When a check fails, the application shows an error and waits for documents. The tool below tells you, for your state and benefit, whether to expect that step.</p>
<!--tool:mini:proof-->
<h2>Proof of a qualifying benefit</h2>
<p>For SNAP, Medicaid, SSI, Federal Public Housing Assistance, the Veterans and Survivors Pension or a Tribal program, ${h.src('usacDocs', 'USAC’s error resolution page')} asks for one document showing, at a minimum:</p>
<ul><li>your name, or the name of the household member who receives the benefit;</li><li>the name of the program;</li><li>the government or Tribal administrator, or the managed care organization, that issued it;</li><li>an issue date within the last ${h.R.docMonths} months, or a future expiration date matching the benefit period.</li></ul>
<p>Under ${h.src('cfr410', '47 CFR 54.410')}, this can be a statement of benefits for the current or prior year, a notice or letter of participation, or another official program document.</p>
<h2>Proof of income</h2>
<p>When you qualify on income, the household’s gross income must be at or below ${h.lim(1)} for one person or ${h.lim(4)} for four in the 48 states. The accepted documents are listed in both the rule and the USAC page:</p>
${h.table(['Document', 'Covers'], [
  ['Prior year’s state, federal or Tribal tax return', 'a full year'],
  ['Social Security, veterans or retirement statement of benefits', 'a full year or the benefit period'],
  ['Unemployment or workers’ compensation statement of benefits', 'the benefit period'],
  ['Federal or Tribal notice of participation in General Assistance', 'the period shown'],
  ['Divorce decree, child support award or other official income document', 'the period shown'],
  ['Current income statement from an employer or pay stubs', `${h.R.payStubMonths} consecutive months, same type`],
], 'Income documents accepted for Lifeline.', ['l', 'l'])}
<p>The stubs must all come from within the previous ${h.R.docMonths} months. Mixing a stub with a bank statement does not make up the ${h.R.payStubMonths} months, because the rule asks for the same type of document throughout.</p>
<h2>Identity, life and address errors</h2>
<p>Identity errors name what failed. An error on the last four digits of the Social Security number needs an official, unexpired document with your first name, last name and those four digits; an error on the date of birth needs one with your name and birth date. Accepted papers include a driver’s license, a birth certificate, a W-2 from the last two years, last year’s tax return, a Social Security card, a U.S. passport, a permanent resident card, a certificate of naturalization, military discharge papers or a government, military, state or Tribal ID.</p>
<p>A “proof of life” error asks for two documents: one with your date of birth and the last four digits of your Social Security number or your Tribal ID number, and one showing recent activity, such as a current utility bill, a pay stub, a lease statement or a notarized letter. Address errors are best resolved by dropping a pin on the National Verifier map; on paper, a driver’s license, a utility bill, a lease or an official letter also works. A duplicate address error is different: it calls for the ${h.a('lifeline-household-worksheet', 'household worksheet')}.</p>
<h2>How to send them</h2>
<p>Upload copies in the consumer portal, or have a company agent upload them in person, or mail copies with the completed cover sheet to the Lifeline Support Center, as ${h.src('usacHowNv', 'USAC explains')}. Never send originals. The ${h.src('fccLifelineArchive', 'FCC')} also reminds applicants that any document used must be dated within the past ${h.R.docMonths} months. If an application is refused after review, the ${h.a('lifeline-application-denied', 'denied application page')} explains the next steps.</p>`,
  },
});
