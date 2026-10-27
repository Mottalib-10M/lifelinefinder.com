import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'lifeline-household-worksheet', group: 'apply', order: 45,
  tool: { kind: 'mini:household' },
  related: ['lifeline-eligibility', 'lifeline-documents', 'free-phone-for-homeless', 'lifeline-transfer', 'lifeline-income-limits'],
  sources: ['cfr400', 'cfr410', 'usacDocs', 'usacHowNv', 'fccLifelineArchive', 'cfr405'],
  demarche: true,
  en: {
    slug: 'lifeline-household-worksheet', nav: 'Household worksheet', card: 'One Lifeline per household, not per person. Who counts as a household, when the worksheet is required and how its answers are read.',
    title: 'Lifeline Household Worksheet: One Benefit per Household',
    description: 'Lifeline household worksheet: who counts as one household, when the form is needed at a shared address, worked examples for roommates, couples, adult children.',
    h1: 'Lifeline household worksheet: one benefit per household',
    intro: 'Enter how many separate households live at your address and how many Lifeline accounts already exist there: the tool shows what is still possible.',
    resume: (h) => `Lifeline allows one benefit per household, and the household is defined by money, not by the front door. Under ${h.src('cfr400', '47 CFR 54.400(h)')}, a household is any person or group living together at the same address as one economic unit, related or not, and an economic unit is every adult, meaning anyone ${h.R.minAge} or older, who contributes to and shares in the household’s income and expenses. An adult with no or minimal income supported by someone else belongs to that person’s household, and children under ${h.R.minAge} belong to their parents’ or guardians’. The household worksheet is the form that proves there is more than one economic unit at an address: under ${h.src('cfr410', '47 CFR 54.410(g)')} it is required when you share an address with an existing Lifeline subscriber in the national database. Each separate unit may then hold its own benefit of up to ${h.support('broadband')} a month, and its income test is applied to its own members only: ${h.lim(1)} for one person, ${h.lim(2)} for two.`,
    faqs: (h) => [
      { q: 'Do I fill in the household worksheet if I live alone in a single-family house?', a: 'No. The worksheet is triggered by an address match: the rule requires it when the national database or the National Verifier shows that another Lifeline subscriber already uses your address. A person living alone at an address with no other subscriber completes only the application, though the form still asks you to certify that your household gets one Lifeline service.' },
      { q: 'My adult son lives with me but pays his own bills. Is he a separate household?', a: `He can be. An adult who keeps his own income and pays his own expenses, without sharing them with you, is a separate economic unit even under your roof, so each of you may qualify and hold a benefit after the worksheet. If he has little or no income and you support him, the rule counts him in your household, with one benefit for both.` },
      { q: 'What happens if two Lifeline accounts are found in one household?', a: `That is duplicative support. Once USAC notifies a company that more than one member of a household receives Lifeline, the company must de-enroll the subscriber within ${h.R.deEnrollBusinessDays} business days. The FCC asks a household with more than one Lifeline service to choose one and de-enroll from the others, and false statements on the forms can bring fines or a bar from the program.` },
    ],
    body: (h) => `<h2>When the worksheet is required</h2>
<p>The worksheet answers one error: the duplicate address. When you apply, the National Verifier compares your address with every enrolled subscriber. If it finds one, ${h.src('usacDocs', 'USAC’s error resolution page')} says you must prove you are an independent economic household by submitting a Household Worksheet. Without it, the application cannot go further. People applying by mail can send it with the application form, as ${h.src('usacHowNv', 'USAC recommends')}, to avoid a round trip.</p>
<p>The form is the one provided by the FCC’s Wireline Competition Bureau; a state that uses its own Lifeline forms may replace it with a state version. It comes back at recertification only if your household changed in a way that stops you from certifying that it receives one Lifeline service. Companies mark in the national database that you completed it, and only when your address is in fact shared with another subscriber.</p>
<h2>What the questions test</h2>
<p>The ${h.src('fccLifelineArchive', 'FCC')} describes the worksheet as a set of questions about your household that determine whether there is more than one household at your address. What the answers are measured against is the economic unit of the rule: the adults who contribute to and share in the income and expenses, and anyone they support. The logic is simple. Shared money means one household. Separate money means separate households, even in one apartment. The FCC adds that residents of group living facilities can receive Lifeline as separate households.</p>
<p>Income follows the same line. The figure that counts toward the limit is the gross income of all members of your own household, under ${h.src('cfr400', '54.400(f)')}, so a roommate’s salary does not count against you when your budgets are separate.</p>
<h2>Worked examples</h2>
${h.table(['Situation at one address', 'Households', 'Benefits possible'], [
  ['Two roommates, separate rent shares and groceries', '2', '2'],
  ['Married couple sharing all expenses', '1', '1'],
  ['Parent and child aged 15', '1', '1'],
  [`Parent and child aged ${h.R.minAge + 4} with a job, separate budgets`, '2', '2'],
  [`Parent and child aged ${h.R.minAge + 2} with no income, supported by the parent`, '1', '1'],
  ['Three unrelated adults in a shelter, each on their own', '3', '3'],
], 'Applying the household definition of 47 CFR 54.400(h). Each household must also qualify on its own.', ['l', 'r', 'r'])}
<p>Each line still needs eligibility: a separate household must pass the income test with its own members, or have a member who receives a qualifying benefit. The checker below runs that test for one household at a time.</p>
<!--tool:elig|{"state":"NY","size":1,"income":19000,"program":"none"}-->
<h2>Signing the forms honestly</h2>
<p>Every Lifeline certification, under ${h.src('cfr410', '47 CFR 54.410(d)')}, makes you acknowledge that only one Lifeline service is available per household, that a household may not receive benefits from several companies, and that violating the one-per-household limit leads to de-enrollment. The household is also told that false statements can bring fines, imprisonment or a bar from the program. If a member moves in or out later, tell your company within ${h.R.changeNoticeDays} days when it affects your eligibility, and expect a new worksheet at recertification if the change affects who shares your address. Moving your benefit to another company is covered on the ${h.a('lifeline-transfer', 'transfer page')}. The ${h.src('cfr405', 'de-enrollment rule')} leaves companies ${h.R.deEnrollBusinessDays} business days to act once a duplicate is found.</p>`,
  },
});
