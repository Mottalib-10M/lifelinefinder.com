import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'lifeline-phone', group: 'benefit', order: 21,
  tool: { kind: 'mini:mss' },
  related: ['lifeline-program', 'free-iphone-government', 'lifeline-non-usage', 'lifeline-transfer', 'free-internet-for-low-income'],
  sources: ['cfr408', 'cfr403', 'usacMss', 'fccMssNotice', 'fccWaiver', 'fccLifelineArchive', 'cfr407'],
  en: {
    slug: 'lifeline-phone', nav: 'Lifeline phones and plans', card: 'The minutes and data a Lifeline plan must include in 2026, what a device handed out with it must do, and why the phone itself is never paid for.',
    title: 'Lifeline Phone 2026: Plan Standards, Devices and Data Rules',
    description: 'Lifeline phone rules for 2026: the minutes and data a plan must include to earn the discount, what the device must do, and why the FCC never pays for the phone.',
    h1: 'Lifeline phone: what the plan and the device must offer',
    intro: 'Enter the minutes and data of a plan in the calculator above to see whether it earns the full federal discount, the voice-only amount or nothing.',
    resume: (h) => `A Lifeline phone is an ordinary phone used with a plan that carries the federal Lifeline discount. The discount pays for service, not hardware: the FCC states that it does not subsidize any phone or other device, so a handset that comes with a Lifeline plan is the company’s own offer. What the rules do control is the plan. To earn the full ${h.support('broadband')} a month, a mobile plan must include at least ${h.MSS.mobileDataGB} GB of data a month at ${h.MSS.mobileSpeed} speed or better; a home internet plan needs ${h.MSS.fixedDown}/${h.MSS.fixedUp} Mbps and ${h.num(h.MSS.fixedDataGB)} GB. A mobile plan that only meets the voice standard of ${h.num(h.MSS.mobileVoiceMinutes)} minutes earns ${h.support('voice')}, available through ${h.date(h.S.voiceOnlyUntil)}. These standards are frozen until ${h.date(h.MSS.until)} by an FCC waiver. When a company does hand out devices, they must be Wi-Fi enabled, and a mobile company must offer at least one that can work as a hotspot. A free plan must also be used once every ${h.R.nonUsageDays} days.`,
    faqs: (h) => [
      { q: 'Does a Lifeline phone have to work as a mobile hotspot?', a: 'Not every model. The rule says a mobile broadband company that provides devices must offer at least one device capable of being used as a hotspot, and all devices it provides must be Wi-Fi enabled. The company also may not add a separate tethering charge for data used below the minimum standard, so using the phone as a hotspot within that data costs nothing extra.' },
      { q: 'Can I put my Lifeline discount on a family plan?', a: `It depends on the company. The FCC rule allows companies to let subscribers apply the discount to family shared data plans, but does not require it. If yours does, the discount of up to ${h.support('broadband')} comes off the family plan’s bill. It stays one discount for one household, and the plan must still meet the minimum service standards.` },
      { q: 'Will Lifeline plans include more data in 2027?', a: `Not before ${h.date(h.MSS.until)}. The Wireline Competition Bureau paused the yearly increase of the data standards, so mobile plans stay at ${h.MSS.mobileDataGB} GB and home internet at ${h.num(h.MSS.fixedDataGB)} GB until then. The FCC is reviewing the standards and the way they are updated, so later levels depend on the outcome of that review.` },
      { q: 'Can a Lifeline company charge me a deposit or a monthly fee to keep my number?', a: 'A company may not collect a service deposit to start a voice-only Lifeline plan that has no extra toll charges, or when you choose toll limitation. No Lifeline plan may carry a monthly number-portability charge. Other fees depend on the plan: the rules require the discount to be applied, not the plan to be free.' },
    ],
    body: (h) => `<h2>The minimum service standards, in one table</h2>
<p>A company is reimbursed only for plans that meet the ${h.src('cfr408', 'minimum service standards')}. ${h.src('usacMss', 'USAC')} publishes the current levels, and the ${h.src('fccMssNotice', 'FCC notice')} of ${h.date(h.MSS.noticeDate)} confirmed them until ${h.date(h.MSS.until)}:</p>
${h.table(['Service', 'Standard', 'Support if met'], [
  ['Mobile voice', `${h.num(h.MSS.mobileVoiceMinutes)} minutes a month`, h.support('voice')],
  ['Mobile broadband', `${h.MSS.mobileSpeed} or better, ${h.MSS.mobileDataGB} GB a month`, h.support('broadband')],
  ['Home (fixed) broadband', `${h.MSS.fixedDown}/${h.MSS.fixedUp} Mbps, ${h.num(h.MSS.fixedDataGB)} GB a month`, h.support('broadband')],
  ['Home (fixed) voice only', 'no minimum standard', h.support('voice')],
], 'Lifeline minimum service standards and monthly support, outside Tribal lands.', ['l', 'l', 'r'])}
<p>A bundle that meets both the voice and the broadband standards earns ${h.support('broadband')}; a bundle that meets only the voice standard earns ${h.support('voice')}. On qualifying Tribal lands, up to ${h.money(h.S.tribalExtra)} more is added in every case. For mobile speed, the company must advertise as well as provide ${h.MSS.mobileSpeed} or better.</p>
<h2>Why voice-only plans still exist</h2>
<p>The 2016 reform planned to end support for voice-only service. That final step has been postponed every year since 2021, most recently by the ${h.src('fccWaiver', 'Bureau order')} of ${h.date(h.MSS.waiverDate)}, which keeps ${h.support('voice')} available through ${h.date(h.S.voiceOnlyUntil)} while the FCC reviews the program. Where a Census block has only one Lifeline company, voice support continues anyway. For a household that mostly calls, a voice plan of ${h.num(h.MSS.mobileVoiceMinutes)} minutes still carries a discount; for one that needs data, only a plan with at least ${h.MSS.mobileDataGB} GB earns the full amount.</p>
<h2>The device: what the company must and need not do</h2>
<p>The ${h.src('fccLifelineArchive', 'FCC')} is explicit that it does not subsidize hardware, including mobile phones a company provides; problems with a device go to the company. The rules on devices only apply when a company chooses to provide them. All such devices must be Wi-Fi enabled, and a mobile broadband company must offer at least one model that can work as a hotspot. A company may not charge extra for tethering on data used below the standard. Nothing in the rules requires a company to give a phone at all, or a particular brand.</p>
<p>So the cost of a phone is a separate decision from the discount. The calculator below shows what you pay over a year when a phone is bought and a plan is discounted:</p>
<!--tool:mini:iphone-->
<p>For example, a ${h.money(200)} phone used with a ${h.money(25)} plan costs ${h.money(200 + (25 - h.S.broadband) * 12)} over the first year: the full phone price plus ${h.money(25 - h.S.broadband)} a month of service. The ${h.a('free-iphone-government', 'iPhone page')} looks at offers of free smartphones.</p>
<h2>Plans the discount can go on</h2>
<p>Companies may let you apply the discount to any residential plan that meets the standards: fixed or mobile voice, broadband, or a bundle, including plans with caller ID, call waiting, voicemail or three-way calling, and family shared data plans if the company allows it. Under ${h.src('cfr403', '47 CFR 54.403')}, the company subtracts the support from the plan’s price and charges you the rest. Plans with no monthly fee carry one extra condition under ${h.src('cfr407', '47 CFR 54.407')}: use within every ${h.R.nonUsageDays} days, by a call, a text, data or answering a call, or the company must warn you and end service after ${h.R.cureDays} days. The ${h.a('lifeline-non-usage', 'non-usage page')} explains that rule, and the ${h.a('lifeline-transfer', 'transfer page')} covers moving your benefit to another company with a better plan.</p>`,
  },
});
