import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'lifeline-transfer', group: 'apply', order: 44,
  tool: { kind: 'mini:benefit' },
  related: ['free-government-phone-providers', 'lifeline-household-worksheet', 'lifeline-recertification', 'national-verifier', 'lifeline-scams'],
  sources: ['usacDocs', 'cfr401', 'cfr405', 'cfr410', 'cfr400', 'usacContinued', 'usacCompanies'],
  demarche: true,
  en: {
    slug: 'lifeline-transfer', nav: 'Switching Lifeline company', card: 'Moving your Lifeline benefit to another company: the benefit transfer, your consent, the rules that do not exist, and what you cannot transfer.',
    title: 'Lifeline Transfer: Switching Company Without Losing Benefit',
    description: 'Lifeline transfer explained: how a new company moves your benefit with your consent, the rules on timing, what you cannot transfer and what to report.',
    h1: 'Lifeline transfer: moving your benefit to another company',
    intro: 'The calculator shows what the benefit is worth over the months you choose, the amount that follows you from one company to the next.',
    resume: (h) => `Switching Lifeline company does not mean applying again. Your benefit is recorded in the National Lifeline Accountability Database, which holds one Lifeline service per household, so when you sign up with a second company the system first sees a duplicate. According to ${h.src('usacDocs', 'USAC')}, in the majority of cases the new company resolves that by obtaining your consent to transfer your benefit and completing a benefit transfer in the database; the old company then stops claiming support for you. The discount that moves with you is the same everywhere: up to ${h.support('broadband')} a month, or ${h.money(h.S.tribalMax)} on qualifying Tribal lands. Section 47 CFR 54.411 of the Lifeline rules is marked Reserved, and the eligibility, support and de-enrollment rules set no waiting period before a switch. What you cannot do is transfer the benefit to another person: Lifeline is non-transferable, and your household keeps one benefit. If you move, you must give the company your new address within ${h.R.moveNoticeDays} days.`,
    faqs: (h) => [
      { q: 'Do I need to cancel with my old company before switching?', a: `Not under the USAC description of the process. The new company asks for your consent and completes a benefit transfer in the national database, which ends the old company’s claim. You can also ask the old company to de-enroll you, which it must do within ${h.R.subscriberRequestBusinessDays} business days, but a separate cancellation is not required for the transfer itself. Your phone number and any device are separate matters with the old company.` },
      { q: 'Someone transferred my Lifeline without asking me. What can I do?', a: `A transfer requires your consent. If your benefit moved to a company you never chose, USAC says to call the Lifeline Support Center at ${h.R.supportCenterPhone} if you think it is fraud. You can also report it to the FCC Lifeline fraud tip line, ${h.R.fraudTipLine}, with as much detail as possible about the company and the people involved.` },
      { q: 'Can I give my Lifeline phone to my sister when I no longer need it?', a: 'No. Lifeline is a non-transferable service under the federal rules, and every form you sign states that you may not transfer your benefit to any other person. Your sister must qualify and apply on her own, and if she lives at your address and shares income and expenses with you, your household can only hold one benefit between you.' },
    ],
    body: (h) => `<h2>How a benefit transfer works</h2>
<p>The national database exists to detect and eliminate duplicative support, a term ${h.src('cfr400', '47 CFR 54.400')} defines as one subscriber receiving two Lifeline services at the same time, or two subscribers in a household doing so. When a second company tries to enroll you, the database returns a duplicate subscriber error. ${h.src('usacDocs', 'USAC’s error resolution page')} explains the usual outcome: the new company obtains your consent to transfer your Lifeline benefit and completes a benefit transfer in the database.</p>
<p>A company that receives notice from USAC that one of its subscribers is now served by another company must de-enroll that subscriber within ${h.R.deEnrollBusinessDays} business days, under ${h.src('cfr405', '47 CFR 54.405(e)(2)')}, and it stops being paid for you after the de-enrollment date. In practice you do not have to manage that step; it follows from the transfer.</p>
<h2>The rules that no longer limit a switch</h2>
<p>The section of the Lifeline rules numbered 54.411 is marked Reserved in the current Code of Federal Regulations: it contains no text and no rule in force. The sections on eligibility, support, usage and de-enrollment set no port freeze or minimum stay with a company either, so nothing in them ties you to a company for a set time. The same rules forbid companies to charge Lifeline customers a monthly number-portability charge, which matters if you keep your number.</p>
<p>Before you consent, compare offers by what they deliver after the discount. Each company must name itself on every material describing its Lifeline service and must say that Lifeline is a government assistance program, non-transferable and limited to one discount per household. The tool below shows how many companies USAC lists in your state.</p>
<!--tool:mini:statefacts-->
<p>The ${h.a('free-government-phone-providers', 'companies page')} narrows the list to your ZIP code, from ${h.src('usacCompanies', 'USAC open data')}.</p>
<h2>What does not transfer</h2>
<p><strong>The benefit to another person.</strong> Lifeline is a non-transferable service, and ${h.src('cfr410', '47 CFR 54.410')} requires every certification form to say that the subscriber may not transfer the benefit to anyone else. A relative who wants Lifeline applies in their own name; if they belong to your economic unit, the ${h.a('lifeline-household-worksheet', 'household rule')} gives your home one benefit in total.</p>
<p><strong>A second benefit.</strong> A household may not receive Lifeline from several companies at once. Keeping an old line while adding a new one is duplicative support and leads to de-enrollment.</p>
<p><strong>The device.</strong> Phones are not paid for by the program, so what happens to a handset when you leave is set by the old company’s own terms.</p>
<h2>Moves and changes you must report</h2>
<p>Switching often comes with a move. On the certification form you agreed to give your company your new address within ${h.R.moveNoticeDays} days, and to tell it within ${h.R.changeNoticeDays} days if you no longer qualify, for example because your income rose or the benefit you used ended. An address update can start a USAC ${h.src('usacContinued', 'continued eligibility check')} if the new address cannot be matched or is shared with another subscriber; you then have ${h.R.continuedEligibilityDays} days to answer, separately from the yearly ${h.a('lifeline-recertification', 'recertification')}.</p>`,
  },
});
