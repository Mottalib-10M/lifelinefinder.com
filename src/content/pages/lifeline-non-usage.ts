import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'lifeline-non-usage', group: 'apply', order: 43,
  tool: { kind: 'mini:nonusage' },
  related: ['lifeline-recertification', 'lifeline-phone', 'lifeline-transfer', 'free-government-phone'],
  sources: ['cfr407', 'cfr405', 'fccLifelineArchive', 'usacMss'],
  demarche: true,
  en: {
    slug: 'lifeline-non-usage', nav: 'Non-usage rule', card: 'A free Lifeline line must be used at least once every 30 days. What counts as use, the 15-day notice and how to keep the line alive.',
    title: 'Lifeline Non-Usage Rule: 30 Days, Then a 15-Day Notice',
    description: 'Lifeline non-usage rule: a free line unused for 30 days gets a 15-day notice, then is cut. What counts as use, what does not, and a counter for your own dates.',
    h1: 'Lifeline non-usage: how to keep a free line active',
    intro: 'Enter how many days ago you last made a call, sent a text or used data: the counter shows where you stand and how long you have left.',
    resume: (h) => `A Lifeline line that costs you nothing each month must be used at least once every ${h.R.nonUsageDays} days. If ${h.R.nonUsageDays} consecutive days pass without usage, the company must send you a notice in clear language giving you ${h.R.cureDays} more days; if you still do not use the line during that period, service ends and you are de-enrolled from Lifeline. In practice the line is safe for up to ${h.R.nonUsageDays + h.R.cureDays} days without use, but no longer. Usage is defined in ${h.src('cfr407', '47 CFR 54.407')}: making a call, using data, sending a text, buying extra minutes or data from the company, answering a call from someone other than the company, or answering the company to confirm you want to keep the service. The rule exists because the company is paid the ${h.support('broadband')} monthly support only for subscribers who used the service in the last ${h.R.nonUsageDays} days. It does not apply to a plan for which you pay a monthly fee to the company, whatever the amount.`,
    faqs: (h) => [
      { q: 'Does an incoming call from my Lifeline company count as usage?', a: `No. Answering an incoming call counts only when it comes from someone other than the company or its agent or representative. A reminder call from the company does not reset the ${h.R.nonUsageDays}-day count unless you respond to it and confirm that you want to keep receiving Lifeline, which the rule lists separately as usage. Any outbound call, text or data use also counts.` },
      { q: 'Does the non-usage rule apply if I pay a few dollars a month?', a: `No. The rule covers only Lifeline service for which the company does not assess and collect a monthly fee from you. If you pay a monthly charge, even a small one after the ${h.support('broadband')} discount, the company is paid for your line whether or not you use it in a given month, and the ${h.R.nonUsageDays}-day rule does not apply.` },
      { q: 'Does a new Lifeline phone count as used once it is delivered?', a: 'Not until you activate it. The company receives no support for a free Lifeline line until the subscriber activates the service in the way the company specifies, such as completing an outbound call. Delivery alone is not activation, so make a first call or send a text when the phone arrives, then keep using it regularly.' },
    ],
    body: (h) => `<h2>The timeline from the last use</h2>
<p>The rule in ${h.src('cfr405', '47 CFR 54.405(e)(3)')} runs in two stages. First, ${h.R.nonUsageDays} consecutive days without usage. Second, a notice from the company, in clear and easily understood language, saying that failing to use the service within ${h.R.cureDays} days will end it. Use the line at any point during the notice and the count starts again from zero. The table shows where a subscriber stands after different gaps:</p>
${h.table(['Days since last use', 'Status', 'Days left'], [10, h.R.nonUsageDays - 1, h.R.nonUsageDays + 5, h.R.nonUsageDays + h.R.cureDays].map((d) => [d, d < h.R.nonUsageDays ? 'Active' : d < h.R.nonUsageDays + h.R.cureDays ? 'Notice period' : 'Service can be ended', Math.max(0, h.R.nonUsageDays + h.R.cureDays - d)]), 'Non-usage timeline for free Lifeline service.', ['r', 'l', 'r'])}
<p>The counter at the top gives the same answer for your own number of days. Each company reports to the FCC, once a year and month by month, how many subscribers it de-enrolled for non-usage.</p>
<h2>What counts as usage, and what does not</h2>
<p>The list in ${h.src('cfr407', '47 CFR 54.407(c)(2)')} is short and precise. Any one of these, done by the subscriber, keeps the line active:</p>
<ul><li>completing an outbound call, or using data;</li><li>buying minutes or data from the company to add to the plan;</li><li>answering an incoming call from anyone other than the company, its agent or its representative;</li><li>responding to direct contact from the company and confirming you want to keep Lifeline;</li><li>sending a text message.</li></ul>
<p>Some everyday actions are not on that list. A call from the company itself does not count unless you confirm you want to keep the service. Receiving a text is not listed. A phone left switched on in a drawer, receiving nothing, uses nothing. Using data does count, as long as it is data from the Lifeline service itself.</p>
<h2>Which lines the rule covers</h2>
<p>The rule applies only where the company does not charge and collect a monthly fee, which the ${h.src('fccLifelineArchive', 'FCC Lifeline page')} sums up the same way: if your provider does not charge you each month, use the service at least once every ${h.R.nonUsageDays} days. Many free mobile plans fall in that category because their price equals the ${h.support('broadband')} discount. Home internet or a mobile plan for which you pay the balance after the discount is not covered. The value of a free line over time, the support you would lose if it were cut, shows in the calculator below.</p>
<!--tool:mini:benefit-->
<h2>Simple habits that keep a free line safe</h2>
<p>Make one outbound call or send one text at a fixed date each month, for example on the day a benefit is paid. Keep the company’s customer line, printed on its materials, and answer its direct contact when it asks whether you want to keep the service. If you know you will be away from the phone for weeks, use it the day before you leave and again as soon as you are back, so the gap stays under ${h.R.nonUsageDays} days and no notice is needed. And keep the line separate from your annual check: passing ${h.a('lifeline-recertification', 'recertification')} does not protect an unused line, and a used line does not exempt you from recertifying. Mobile plans must also meet the data standard of ${h.MSS.mobileDataGB} GB listed on the ${h.src('usacMss', 'USAC standards page')}, so there is data to use.</p>`,
  },
});
