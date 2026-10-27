import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'lifeline-scams', group: 'apply', order: 46,
  tool: { kind: 'mini:scam' },
  mini: { kind: 'mini:iphone' },
  related: ['free-iphone-government', 'national-verifier', 'how-to-get-a-free-government-phone', 'free-government-phone-providers', 'lifeline-transfer'],
  sources: ['fccLifelineArchive', 'usacHowNv', 'cfr405', 'cfr410', 'usacDocs'],
  demarche: true,
  en: {
    slug: 'lifeline-scams', nav: 'Lifeline scams', card: 'The warning signs of a fake Lifeline offer, drawn from the FCC rules: fees, phone sign-ups, cash or iPhone promises, and where to report them.',
    title: 'Lifeline Scams: 7 Warning Signs of a Fake Free Phone Offer',
    description: 'Lifeline scams: seven warning signs of a fake free government phone offer, drawn from the FCC rules, what a real application asks for and how to report fraud.',
    h1: 'Lifeline scams: how to tell a fake free phone offer',
    intro: 'Answer three questions about the offer you received: the tool compares it with what the Lifeline rules allow.',
    resume: (h) => `A real Lifeline application asks for personal information, which is exactly what makes the program attractive to scammers. The rules draw clear lines. Eligibility is decided by the National Verifier, or by the state in Oregon and Texas, not by a website collecting forms. Company agents may help you apply only in person and must have you sign yourself; USAC states they cannot accept an application by phone. The FCC does not subsidize phones, so no one can promise a government-paid iPhone. The benefit is a discount of up to ${h.support('broadband')} a month off a plan, or ${h.money(h.S.tribalMax)} on Tribal lands, never cash. And no rule charges a fee to apply. An offer that asks you to pay, takes your Social Security number over an unsolicited call or text, or promises cash or a new flagship phone breaks at least one of these lines. The FCC runs a Lifeline fraud tip line at ${h.R.fraudTipLine}.`,
    faqs: (h) => [
      { q: 'Is it normal for a Lifeline application to ask for my Social Security number?', a: 'Yes, but only the last four digits, together with your date of birth, to confirm your identity; Tribal members without a Social Security number can give a Tribal ID number. That request is normal on the National Verifier or with an in-person company agent. A stranger asking for the full number, by text or an unsolicited call, is not following the official process.' },
      { q: 'Someone enrolled me in Lifeline without my consent. What can I do?', a: `Call the Lifeline Support Center at ${h.R.supportCenterPhone} to find out which company claims you, and report it to the FCC fraud tip line at ${h.R.fraudTipLine}. A duplicate enrollment can also block your own application, since only one benefit is allowed per household; the support center can explain how to resolve it.` },
      { q: 'Can a company make me pay to switch my Lifeline to it?', a: 'The rules set no fee to apply for or move the Lifeline benefit. A company may charge for its own plan above the discount or sell a phone on its own terms, which it must disclose, but a payment demanded just to obtain or transfer the benefit is a warning sign worth reporting.' },
    ],
    body: (h) => `<h2>Seven warning signs</h2>
<ol>
<li><strong>A fee to apply or to “unlock” the benefit.</strong> The National Verifier is free and no rule charges for an application.</li>
<li><strong>An application taken by phone.</strong> The ${h.src('usacHowNv', 'USAC instructions')} say companies cannot accept applications by phone; agents work in person and you sign yourself.</li>
<li><strong>A promise of a free new iPhone paid by the government.</strong> The ${h.src('fccLifelineArchive', 'FCC')} states it does not subsidize any hardware, including phones handed out by companies.</li>
<li><strong>Cash, gift cards or a check.</strong> Lifeline is a discount on a phone or internet bill and never a payment to you.</li>
<li><strong>A request for your full Social Security number by text or email.</strong> The application uses the last four digits, on the official system or with an agent in person.</li>
<li><strong>“You were pre-approved” before any check.</strong> Only the National Verifier, or the state in Oregon and Texas, decides eligibility, after checking data or documents.</li>
<li><strong>Pressure to sign several people at one address.</strong> One benefit per household is the rule, and the application warns that false statements can lead to fines, imprisonment, de-enrollment or a ban from the program.</li>
</ol>
<!--tool:mini:iphone-->
<h2>What a real application looks like</h2>
<p>Under ${h.src('cfr410', '47 CFR 54.410')}, every application form must tell you that Lifeline is a federal benefit, that false statements can be punished, that only one Lifeline service is available per household, what a household is, and that the benefit cannot be transferred to someone else. It asks for your full name, your residential address and whether it is permanent or temporary, your date of birth, the last four digits of your Social Security number or a Tribal ID, and the program or income that qualifies you. Under ${h.src('cfr405', '47 CFR 54.405')}, every company must say in its materials that the service is a Lifeline service and a government assistance program.</p>
<p>So a legitimate path always has two recognizable parts: an eligibility check by the National Verifier or your state, and an enrollment with a company that USAC lists for your area. The ${h.a('free-government-phone-providers', 'company finder')} shows those companies from USAC data; a business not on the list for your state cannot enroll you in Lifeline there.</p>
<h2>Fraud that targets the program, not only you</h2>
<p>Some schemes use real people’s identities to claim support for subscribers who never asked for service. USAC requires company employees and enrollment representatives to register for a representative ID before they can enroll anyone, and an enrollment needs your own signature and certifications. If you find that you are enrolled with a company you never chose, or your application is refused because someone at your address “already has Lifeline”, that may be the sign. The ${h.a('lifeline-application-denied', 'page on refused applications')} explains how a duplicate is cleared.</p>
<h2>How to report it</h2>
<p>The FCC Enforcement Bureau keeps a Lifeline fraud tip line at ${h.R.fraudTipLine} and asks for as much detail as possible: names, contact details, the company used. For a problem with your own application or account, the Lifeline Support Center answers at ${h.R.supportCenterPhone}. Keep a note of the date, the number that called you and what was asked. And before giving personal information to anyone about Lifeline, check your eligibility yourself with the ${h.a('lifeline-eligibility', 'checker')}: nothing you type there is sent anywhere.</p>`,
  },
});
