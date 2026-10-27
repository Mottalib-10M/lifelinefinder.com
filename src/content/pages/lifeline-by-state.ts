import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'lifeline-by-state', group: 'states', order: 65,
  tool: { kind: 'mini:statefacts' },
  mini: { kind: 'mini:proof' },
  related: ['free-government-phone-providers', 'free-government-phone-california', 'free-government-phone-texas', 'free-government-phone-florida', 'free-government-phone-new-york'],
  sources: ['usacDisbursements', 'usacCompanies', 'usacVerification', 'usacOptOut', 'usacEligibility'],
  en: {
    slug: 'lifeline-by-state', nav: 'Lifeline by state', card: 'Every state and territory in one table: subscribers claimed, companies listed, ZIP codes covered, where to apply and which benefits are checked automatically.',
    title: 'Lifeline by State 2026: Subscribers, Companies, Checks',
    description: 'Lifeline by state: subscribers in each state and territory, companies and ZIP codes listed by USAC, where to apply and which benefits are checked for you.',
    h1: 'Lifeline by state: the numbers for all 56 states and territories',
    intro: 'Pick a state: the tool shows its subscribers, its companies and the office that handles applications, from USAC open data.',
    resume: (h) => `Lifeline is a federal program with the same rules everywhere, but it does not look the same from one state to the next. For ${h.subsMonth}, companies claimed federal support for ${h.num(h.subsTotal)} subscribers across the states and territories, according to USAC’s disbursement data. California alone accounts for ${h.num(h.subs('CA'))}, followed by New York with ${h.num(h.subs('NY'))} and Michigan with ${h.num(h.subs('MI'))}. Four things change by state: the number of companies approved, from a handful in small territories to ${h.companyCount('TX')} in Texas; the office that takes applications, which is the National Verifier except in Oregon and Texas; the benefits the National Verifier can confirm without paperwork, which depend on the data each state shares; and the share of subscribers on Tribal lands, who receive up to ${h.money(h.S.tribalMax)} instead of ${h.support('broadband')}. The income limits differ only for Alaska and Hawaii. The table below gives every figure, state by state.`,
    faqs: (h) => [
      { q: 'Why does Oklahoma have so many Tribal Lifeline subscribers?', a: `Because the FCC rules count the former reservations in Oklahoma as Tribal lands, so most Oklahoma subscribers receive the enhanced amount. For ${h.subsMonth}, ${h.num(h.subsTribal('OK'))} of the ${h.num(h.subs('OK'))} Oklahoma subscribers claimed were at the Tribal rate, by far the largest number in the country. The enhanced benefit adds ${h.money(h.S.tribalExtra)} a month to the standard ${h.support('broadband')}.` },
      { q: 'Do the subscriber counts include people who just enrolled?', a: 'They count the subscribers for whom companies claimed support in the support month shown. Companies can file or revise claims for several months afterwards, so the most recent months are incomplete; this site shows the latest month that looked complete when the data was read, and the counts can still move slightly.' },
      { q: 'Are the income limits the same in Puerto Rico and Guam?', a: `Yes. Under the USAC table, the District of Columbia and the territories use the same column as the 48 contiguous states: ${h.lim(1)} for one person and ${h.lim(4)} for four in 2026. Only Alaska and Hawaii have their own, higher limits, because their poverty guidelines are higher.` },
    ],
    body: (h) => {
      const rows = [...h.states].sort((a, b) => h.subs(b) - h.subs(a)).map((st) => [h.stateName(st), h.subs(st), h.subsTribal(st), h.companyCount(st), h.zipsOf(st), h.optOut(st) ? 'State process' : 'National Verifier']);
      return `<h2>Where the subscribers are</h2>
<p>The ${h.src('usacDisbursements', 'USAC disbursement data')} show the number of subscribers for whom companies claimed Lifeline support each month. The concentration is striking: the top five, California, New York, Michigan, Pennsylvania and Puerto Rico, account for ${h.pct((h.subs('CA') + h.subs('NY') + h.subs('MI') + h.subs('PA') + h.subs('PR')) / h.subsTotal)} of all subscribers. Puerto Rico, with ${h.num(h.subs('PR'))}, has more Lifeline subscribers than Texas or Florida. At the other end, the Virgin Islands and Guam count a few hundred each.</p>
<p>These figures do not measure need. They reflect how many companies are active in a state, how actively they enroll, whether a state program adds to the federal one, and how easily the National Verifier can confirm benefits there. Two neighboring states with similar incomes can have very different counts.</p>
<!--tool:mini:proof|{"st":${h.stIdx('MI')}}-->
<h2>Who checks your application</h2>
<p>In ${h.states.length - 2} of the ${h.states.length} states and territories the National Verifier decides eligibility. Oregon and Texas, listed by USAC as ${h.src('usacOptOut', 'opt-out states')}, run their own process; the federal rules still apply. Where the National Verifier works, the paperwork depends on the data each state shares. USAC’s ${h.src('usacVerification', 'table of data sources')} shows, for example, that it confirms ${h.nvAuto('MI')} automatically in Michigan, but only ${h.nvAuto('CA')} in California. A benefit missing from your state’s list still qualifies you; you just send a copy of a benefit letter. The tool above gives the answer for any state and benefit.</p>
<h2>All states and territories</h2>
${h.table(['State or territory', `Subscribers, ${h.subsMonth}`, 'Tribal rate', 'Companies', 'ZIP codes', 'Apply through'], rows, `Subscribers from the ${h.src('usacDisbursements', 'USAC disbursement data')}; companies and ZIP codes from the ${h.src('usacCompanies', 'USAC company list')}, read on ${h.providersReadAt}.`, ['l', 'r', 'r', 'r', 'r', 'l'])}
<h2>Reading the table</h2>
<p>“Companies” counts the companies USAC lists for the state, mobile and home service together; a company listed under several brand names counts once. “ZIP codes” counts the ZIP codes where at least one company is listed. A high company count does not mean better plans: in Texas most of the ${h.companyCount('TX')} companies are local home phone providers listed for very few ZIP codes, while the mobile companies number ${h.companyCount('TX', 'M')}. The ${h.a('free-government-phone-providers', 'company finder')} narrows the list to your ZIP code.</p>
<p>“Tribal rate” counts the subscribers claimed at the enhanced amount for residents of Tribal lands. Oklahoma leads with ${h.num(h.subsTribal('OK'))}, then Arizona with ${h.num(h.subsTribal('AZ'))} and Washington with ${h.num(h.subsTribal('WA'))}; in Alaska, ${h.num(h.subsTribal('AK'))} of ${h.num(h.subs('AK'))} subscribers are at the Tribal rate. The ${h.a('tribal-lifeline', 'Tribal Lifeline page')} explains who qualifies for it.</p>
<p>Four states have their own page: ${h.a('free-government-phone-california', 'California')}, with its own state program and income table; ${h.a('free-government-phone-texas', 'Texas')}, with its own application; ${h.a('free-government-phone-florida', 'Florida')} and ${h.a('free-government-phone-new-york', 'New York')}, with the benefits checked automatically there.</p>`;
    },
  },
});
