import { definePage } from '../../lib/guide-types';

const STATES = ['CA', 'TX', 'FL', 'NY', 'PA', 'OH'];

export default definePage({
  id: 'free-internet-for-low-income', group: 'benefit', order: 24,
  tool: { kind: 'mini:internet' },
  related: ['lifeline-eligibility', 'lifeline-vs-acp', 'free-government-phone-providers', 'lifeline-income-limits', 'free-tablet-with-ebt'],
  sources: ['cfr403', 'cfr408', 'usacMss', 'fccMssNotice', 'fccLifelineArchive', 'usacCompanies', 'usacEligibility'],
  en: {
    slug: 'free-internet-for-low-income', nav: 'Internet for low-income homes', card: 'Lifeline also discounts home internet: the speed and data a plan must offer, what the bill looks like and which companies are designated.',
    title: 'Free Internet for Low-Income Homes: Lifeline Rules for 2026',
    description: 'Free internet for low-income homes: Lifeline takes up to $9.25 off a home plan that reaches 25/3 Mbps and 1,280 GB. Bill calculator, rules and company counts.',
    h1: 'Free internet for low-income households: Lifeline at home',
    intro: 'Type your current internet bill: the calculator shows the bill after the Lifeline discount and the minimum the plan must deliver.',
    resume: (h) => `Lifeline is the federal discount that still applies to home internet in 2026. It takes up to ${h.support('broadband')} a month off a fixed broadband plan, or up to ${h.money(h.S.tribalMax)} on qualifying Tribal lands, and it is paid to the company, which must reduce your bill by that amount. To earn the discount, a home plan must meet the fixed broadband minimum service standard: at least ${h.MSS.fixedDown} Mbps down and ${h.MSS.fixedUp} Mbps up with ${h.num(h.MSS.fixedDataGB)} GB of data a month, figures that stay in force until ${h.date(h.MSS.until)}. A household qualifies with income at or below ${h.lim(2)} for two people or ${h.lim(4)} for four in the 48 states, or through SNAP, Medicaid, SSI, public housing or a veterans pension. A $50 home plan therefore costs ${h.money(50 - h.S.broadband)} after Lifeline, ${h.money(h.S.broadband * 12)} saved over a year. Internet is free only where a company sets a plan price at or under the discount, which the rules allow but do not require.`,
    faqs: (h) => [
      { q: 'Does Lifeline home internet have to be unlimited?', a: `No. The standard requires ${h.num(h.MSS.fixedDataGB)} GB of data a month on a fixed plan, along with speeds of at least ${h.MSS.fixedDown} Mbps down and ${h.MSS.fixedUp} Mbps up. A plan below any of those three figures does not earn the ${h.support('broadband')} broadband discount. A plan above them, including an unlimited one, qualifies just the same, and the discount stays the same amount.` },
      { q: 'Can I use Lifeline on internet and keep a separate phone plan at full price?', a: `Yes. Lifeline is one discount per household, applied to the service you choose. Many households put it on home internet, used by every device in the house, and pay their mobile phone plan without any discount. You cannot split the ${h.support('broadband')} between two companies or two services, and you cannot hold a second Lifeline account at the same time.` },
      { q: 'Do people in a shelter or group home qualify for internet discounts?', a: 'They can. The FCC explains that Lifeline support is available to eligible low-income residents of group living facilities as separate households, so living at a shared address does not by itself block the benefit. The household worksheet is used when several Lifeline subscribers appear at the same address, to show that each one is a separate economic unit.' },
    ],
    body: (h) => `<h2>The bill, before and after the discount</h2>
<p>The discount is a fixed amount, so its weight depends on your bill. On a $30 plan, ${h.support('broadband')} is almost a third of the price; on a $70 plan, it is closer to an eighth. Here is the arithmetic for three common bill levels, using the standard amount and the Tribal amount of ${h.src('cfr403', '47 CFR 54.403')}:</p>
${h.table(['Monthly bill', 'After Lifeline', 'On Tribal lands', 'Saved per year'],
  [30, 50, 70].map((b) => [h.money(b), h.money(b - h.S.broadband), h.money(Math.max(0, b - h.S.tribalMax)), h.money(h.S.broadband * 12)]),
  'Home internet bill with the standard and the Tribal Lifeline discount.', ['l', 'r', 'r', 'r'])}
<p>The company may not keep part of the support: it is reimbursed for the reduction it gives you, and the reimbursement cannot exceed what it charges customers who do not have Lifeline. That is why an offer at a price equal to the discount comes out at zero.</p>
<h2>What a home plan must deliver</h2>
<p>Home internet earns the discount only when it meets the fixed broadband standard of ${h.src('cfr408', '47 CFR 54.408')}, updated each year. The ${h.src('fccMssNotice', 'FCC public notice of July 29, 2026')} kept the figures at ${h.MSS.fixedDown}/${h.MSS.fixedUp} Mbps and ${h.num(h.MSS.fixedDataGB)} GB a month until ${h.date(h.MSS.until)}. Mobile broadband has its own, much lower threshold of ${h.MSS.mobileDataGB} GB a month, with no speed figure beyond ${h.MSS.mobileSpeed} or better.</p>
<p>Under the Lifeline rules, a company may apply the discount to any residential plan that meets these levels, including family shared data plans and plans with extra calling features. The ${h.src('usacMss', 'USAC standards page')} adds that companies designated only for Lifeline must offer broadband, and companies that also receive High Cost support must offer it where they sell broadband commercially. A bundle of home internet and a phone line earns ${h.support('broadband')} when the internet part meets the standard.</p>
<h2>Who offers Lifeline home service in your state</h2>
<p>Mobile companies are designated across whole states, while home phone and internet companies are designated where their network runs, which is why the count differs so much. USAC’s ${h.src('usacCompanies', 'Companies Near Me data')}, read on ${h.providersReadAt}, list these numbers for six large states:</p>
${h.table(['State', 'Home phone or internet companies', 'Mobile companies'],
  STATES.map((st) => [h.stateName(st), h.companyCount(st, 'H'), h.companyCount(st, 'M')]),
  'Companies designated for Lifeline, by type of service (USAC open data).', ['l', 'r', 'r'])}
<p>A company in the list is designated for Lifeline in part of the state; it does not mean that its network reaches your street. The ${h.a('free-government-phone-providers', 'companies page')} finds the companies listed for your ZIP code, with the type of service each one offers.</p>
<h2>Checking eligibility first</h2>
<p>The income ceiling is 135% of the federal poverty guidelines, read from the ${h.src('usacEligibility', 'USAC income table')}. Enter your household below to see where you stand; if you are over it, a benefit such as SNAP or Medicaid still qualifies you, as the ${h.a('lifeline-eligibility', 'eligibility page')} explains.</p>
<!--tool:mini:limit-->
<p>Households that relied on the larger internet discount of the Affordable Connectivity Program until ${h.date(h.ACP.ended)} will find the difference worked out on the ${h.a('lifeline-vs-acp', 'Lifeline versus ACP page')}.</p>`,
  },
});
