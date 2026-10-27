import { definePage } from '../../lib/guide-types';

type H = { ACP: { monthly: number; tribal: number }; S: { broadband: number; tribalMax: number } };
const cmp = (h: H, bill: number, tribal: boolean) => {
  const acp = Math.min(bill, tribal ? h.ACP.tribal : h.ACP.monthly);
  const life = Math.min(bill, tribal ? h.S.tribalMax : h.S.broadband);
  return { acp, life, payAcp: bill - acp, payLife: bill - life, lost: (acp - life) * 12 };
};

export default definePage({
  id: 'lifeline-vs-acp', group: 'benefit', order: 26,
  tool: { kind: 'mini:acp' },
  related: ['affordable-connectivity-program', 'lifeline-program', 'free-internet-for-low-income', 'lifeline-eligibility'],
  sources: ['usacAcp', 'fccAcpArchive', 'cfr403', 'cfr409', 'usacMss', 'fccLifelineArchive'],
  en: {
    slug: 'lifeline-vs-acp', nav: 'Lifeline vs ACP', card: 'Lifeline against the Affordable Connectivity Program, line by line: amounts, devices, Tribal support, status, and the dollar gap on your bill.',
    title: 'Lifeline vs ACP: Side-by-Side Comparison and Your Bill Gap',
    description: 'Lifeline vs ACP compared line by line: $9.25 against $30 a month, Tribal support, devices, status since June 2024, and the yearly gap on your own internet bill.',
    h1: 'Lifeline vs ACP: the two programs compared',
    intro: 'Type your monthly internet bill and say whether you live on Tribal lands: the calculator compares the two discounts on that exact bill.',
    resume: (h) => {
      const c = cmp(h, 50, false), t = cmp(h, 80, true);
      return `Lifeline and the Affordable Connectivity Program were two different federal discounts, and only Lifeline still exists. The ACP paid up to ${h.money(h.ACP.monthly)} a month toward internet service, ${h.money(h.ACP.tribal)} on qualifying Tribal lands, and up to ${h.money(h.ACP.device)} once toward a computer or tablet; it ended on ${h.date(h.ACP.ended)} when Congress provided no further funding. Lifeline pays up to ${h.support('broadband')} a month on phone, internet or bundled service, ${h.money(h.S.tribalMax)} on Tribal lands, and nothing toward any device. On a $50 internet bill, the ACP left ${h.money(c.payAcp)} to pay and Lifeline leaves ${h.money(c.payLife)}, a loss of ${h.money(c.lost)} a year. On an $80 bill on Tribal lands, the gap is ${h.money(t.lost)} a year. Lifeline also covers mobile phone plans and, through ${h.date(h.S.voiceOnlyUntil)}, voice-only service at ${h.support('voice')}, which the ACP never did, and it asks for income at or below 135% of the poverty guidelines or a qualifying benefit.`;
    },
    faqs: (h) => [
      { q: 'Which pays more, Lifeline or the ACP?', a: `The ACP paid more, up to ${h.money(h.ACP.monthly)} a month against ${h.support('broadband')} for Lifeline, or ${h.money(h.ACP.tribal)} against ${h.money(h.S.tribalMax)} on Tribal lands. The comparison is now theoretical: the ACP ended on ${h.date(h.ACP.ended)}, so the only federal monthly discount a low-income household can receive for phone or internet service today is Lifeline.` },
      { q: `What replaced the ${h.money(h.ACP.tribal)} ACP Tribal discount?`, a: `Nothing replaced it; what remains is Lifeline’s enhanced Tribal benefit, a separate program. It adds up to ${h.money(h.S.tribalExtra)} a month to the standard ${h.support('broadband')}, for a total of up to ${h.money(h.S.tribalMax)}, for eligible residents of qualifying Tribal lands. That is ${h.money(h.ACP.tribal - h.S.tribalMax)} a month less than the ACP Tribal amount, on a bill of ${h.money(h.ACP.tribal)} or more.` },
      { q: 'Why does Lifeline cover phone plans when the ACP did not?', a: `Under the Lifeline rules, voice telephony is still named as the supported service, and Lifeline can be applied to fixed or mobile voice plans. It now favors broadband, paying ${h.support('broadband')} on plans that meet the data standard and ${h.support('voice')} on voice-only plans. The ACP was created as a broadband discount for internet service, plus a computer or tablet discount, and never paid toward a phone line.` },
    ],
    body: (h) => {
      const rows = [20, 30, 50, 80].map((b) => { const c = cmp(h, b, false); return [h.money(b), h.money(c.payAcp), h.money(c.payLife), h.money(c.lost)]; });
      const tr = [50, 80, 100].map((b) => { const c = cmp(h, b, true); return [h.money(b), h.money(c.payAcp), h.money(c.payLife), h.money(c.lost)]; });
      return `<h2>The two programs, line by line</h2>
<p>The figures below come from ${h.src('usacAcp', 'USAC’s ACP page')} and the ${h.src('fccAcpArchive', 'archived FCC ACP page')} for the ACP, and from ${h.src('cfr403', '47 CFR 54.403')} and the ${h.src('usacMss', 'USAC support table')} for Lifeline.</p>
${h.table(['', 'Affordable Connectivity Program', 'Lifeline'], [
  ['Status', `ended ${h.date(h.ACP.ended)}`, 'running in 2026'],
  ['Internet discount per month', `up to ${h.money(h.ACP.monthly)}`, `up to ${h.support('broadband')}`],
  ['On qualifying Tribal lands', `up to ${h.money(h.ACP.tribal)}`, `up to ${h.money(h.S.tribalMax)}`],
  ['Voice-only phone service', 'not covered', `${h.support('voice')} through ${h.date(h.S.voiceOnlyUntil)}`],
  ['Computer or tablet', `one discount up to ${h.money(h.ACP.device)}`, 'nothing, hardware is not subsidized'],
  ['Limit', 'one service and one device discount per household', 'one benefit per household'],
  ['Funding', 'funding from Congress, not renewed', 'universal service support'],
], 'Federal phone and internet discounts compared.', ['l', 'l', 'l'])}
<p>Two lines explain most of the confusion. Both programs were administered by USAC, and USAC built the ACP on the framework of Lifeline. And the FCC itself published a joint set of ACP and Lifeline questions and answers. The money, the rules and the end date were nonetheless different.</p>
<h2>What the change costs on your bill</h2>
<p>Because each discount is capped at the bill itself, the gap depends on what you pay. These rows use the same formula as the calculator at the top, with the standard amounts:</p>
${h.table(['Monthly bill', 'You paid with the ACP', 'You pay with Lifeline', 'Support lost per year'], rows, 'Standard amounts, outside Tribal lands.', ['l', 'r', 'r', 'r'])}
<p>On a small plan, the loss is limited because the ACP could never take off more than the bill. On qualifying Tribal lands the enhanced amounts change the picture:</p>
${h.table(['Monthly bill', 'You paid with the ACP', 'You pay with Lifeline', 'Support lost per year'], tr, 'Enhanced Tribal amounts.', ['l', 'r', 'r', 'r'])}
<h2>Eligibility: the part that did not carry over</h2>
<p>Former ACP households often assume they are already in Lifeline. They are not: an ACP enrollment never created a Lifeline account. Lifeline has its own test under ${h.src('cfr409', '47 CFR 54.409')}: gross household income at or below ${h.lim(1)} for one person or ${h.lim(4)} for four in the 48 states, or a household member receiving SNAP, Medicaid, SSI, Federal Public Housing Assistance or a Veterans or Survivors Pension. The checker below runs that test with your figures.</p>
<!--tool:elig|{"state":"OH","size":4,"income":42000,"program":"none"}-->
<p>If your household qualifies, the application goes through the National Verifier, or through the state in Oregon and Texas, and the discount then goes on the service you pick. The ${h.a('lifeline-eligibility', 'eligibility page')} details each route, and the ${h.a('affordable-connectivity-program', 'ACP page')} tells how the old program wound down.</p>
<h2>Choosing the service for the smaller discount</h2>
<p>With one ${h.support('broadband')} discount per household instead of ${h.money(h.ACP.monthly)}, the choice of service matters more than it did. A household whose ACP credit went on home internet can keep it there; the plan must reach ${h.MSS.fixedDown}/${h.MSS.fixedUp} Mbps and ${h.num(h.MSS.fixedDataGB)} GB a month. A household where everyone relies on phones may get more from a mobile plan with at least ${h.MSS.mobileDataGB} GB of data. The ${h.a('free-internet-for-low-income', 'home internet page')} shows the bill for each case, and the ${h.src('fccLifelineArchive', 'FCC Lifeline page')} confirms the discount works on wireline or wireless service.</p>`;
    },
  },
});
