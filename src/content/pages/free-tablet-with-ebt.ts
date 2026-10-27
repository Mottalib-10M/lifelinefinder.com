import { definePage } from '../../lib/guide-types';

const NV = (P: unknown) => Object.entries((P as { nv: Record<string, { auto: string[] }> }).nv);

export default definePage({
  id: 'free-tablet-with-ebt', group: 'benefit', order: 23,
  tool: { kind: 'mini:tablet' },
  related: ['free-phone-with-food-stamps', 'affordable-connectivity-program', 'free-iphone-government', 'lifeline-documents', 'free-internet-for-low-income'],
  sources: ['usacAcp', 'fccAcpArchive', 'fccLifelineArchive', 'cfr409', 'usacVerification', 'usacDocs'],
  en: {
    slug: 'free-tablet-with-ebt', nav: 'Free tablet with EBT', card: 'The federal tablet discount ended with the ACP in 2024. What a SNAP household still gets from Lifeline, and what it does not.',
    title: 'Free Tablet With EBT in 2026: The Device Discount Has Ended',
    description: 'Free tablet with EBT: the $100 ACP device discount ended in June 2024. SNAP still qualifies you for Lifeline, which pays toward service, never toward a tablet.',
    h1: 'Free tablet with EBT: what a SNAP household gets in 2026',
    intro: 'Enter the price of the tablet you have in mind: the calculator compares the federal help that existed until 2024 with what exists today.',
    resume: (h) => `There is no federal tablet discount in 2026. The only federal program that paid toward a tablet was the Affordable Connectivity Program, which gave a one-time discount of up to ${h.money(h.ACP.device)} on a laptop, desktop computer or tablet bought through a participating provider, provided the household paid more than ${h.money(h.ACP.deviceCopayMin)} and less than ${h.money(h.ACP.deviceCopayMax)} toward it. That discount disappeared with the program, which stopped enrolling on ${h.date(h.ACP.enrollmentFreeze)} and ended on ${h.date(h.ACP.ended)} for lack of new funding from Congress, as ${h.src('usacAcp', 'USAC records')}. What a SNAP household keeps is Lifeline: receiving SNAP qualifies the whole household whatever its income, and Lifeline takes up to ${h.support('broadband')} a month off a phone or internet plan, ${h.money(h.S.broadband * 12)} a year. The FCC states that Lifeline does not subsidize any hardware, so a tablet offered alongside it is the company’s own offer, not a benefit paid by your EBT eligibility.`,
    faqs: (h) => [
      { q: 'Does my SNAP card itself qualify me for anything tablet-related?', a: `Your SNAP participation qualifies your household for Lifeline, a monthly discount of up to ${h.support('broadband')} on phone or internet service. It does not open any device discount, because the only federal one belonged to the Affordable Connectivity Program, which ended on ${h.date(h.ACP.ended)}. A company may still sell or give a tablet with its plan, on terms it sets itself.` },
      { q: 'Was the old ACP tablet discount limited to one device per family?', a: `Yes. The Affordable Connectivity Program allowed one monthly service discount and one device discount per household. The device discount was up to ${h.money(h.ACP.device)} on a laptop, desktop or tablet from a participating provider, with a household contribution of more than ${h.money(h.ACP.deviceCopayMin)} and less than ${h.money(h.ACP.deviceCopayMax)}. Both discounts ended with the program on ${h.date(h.ACP.ended)}.` },
      { q: 'Can a family with SNAP get both a Lifeline phone and a Lifeline tablet plan?', a: `No. Lifeline allows one benefit per household, meaning one discounted service, whether it is a mobile phone plan, a data plan used on a tablet or home internet. The household chooses which service gets the ${h.support('broadband')}. A second discounted line at the same address is possible only for a separate economic unit that does not share income and expenses.` },
    ],
    body: (h) => {
      const snapAuto = NV(h.P).filter(([, v]) => v.auto.includes('snap')).length;
      const all = NV(h.P).length;
      return `<h2>What the ACP device discount was, in numbers</h2>
<p>From the start of the Affordable Connectivity Program until its end, an enrolled household could receive one device discount of up to ${h.money(h.ACP.device)} toward a laptop, desktop computer or tablet. The ${h.src('fccAcpArchive', 'archived FCC page')} sets two conditions: the device had to come from a participating provider, and the household had to contribute more than ${h.money(h.ACP.deviceCopayMin)} and less than ${h.money(h.ACP.deviceCopayMax)} of the price. The program was limited to one monthly service discount and one device discount per household.</p>
<p>The contribution rule shaped which devices qualified: the discount never covered the whole price, and the household’s own share had to stay within that band. Today the calculator above shows any tablet at its full price, since no federal program has replaced the device discount.</p>
<h2>The timeline that ended the free tablet</h2>
<p>The end came in three steps. New enrollments were frozen on ${h.date(h.ACP.enrollmentFreeze)}. The FCC then issued formal notice that ${h.month(h.ACP.lastFullMonth)} would be the final fully funded month. The program then ended on ${h.date(h.ACP.ended)} because Congress did not provide additional funding. A household that had not bought its device by then lost the chance to use the discount.</p>
<p>The FCC later warned that some providers had not updated their marketing and that some websites kept collecting personal information for ACP enrollment. Any offer in 2026 that presents a tablet as an ACP or EBT benefit relies on a program that no longer exists, and the FCC asks consumers to file a complaint when they see one.</p>
<h2>What SNAP still gets you: Lifeline</h2>
<p>SNAP is one of the qualifying programs listed in ${h.src('cfr409', '47 CFR 54.409')}, alongside Medicaid, Supplemental Security Income, Federal Public Housing Assistance and the Veterans and Survivors Pension. If anyone in your household receives it, the household qualifies without an income test. The benefit is a discount of up to ${h.support('broadband')} a month on a plan meeting the broadband standard, which can be a mobile data plan used on a tablet if the company offers one, or home internet shared by every device in the house.</p>
<p>Whether you must send a document depends on your state. In ${snapAuto} of the ${all} states and territories on ${h.src('usacVerification', 'USAC’s table of automated sources')}, the National Verifier confirms SNAP automatically; elsewhere you upload a letter or notice. Pick your state below to see which case applies.</p>
<!--tool:mini:proof-->
<p>When a document is needed, ${h.src('usacDocs', 'USAC asks for one')} that shows your name or that of the household member who receives SNAP, the name of the program, the agency that issued it, and an issue date within the last ${h.R.docMonths} months or a future expiration date. The ${h.a('lifeline-documents', 'documents checklist')} lists every accepted proof, and the ${h.a('free-phone-with-food-stamps', 'food stamps page')} covers the SNAP route in detail.</p>
<h2>Using the discount for a tablet you already own</h2>
<p>The most direct way to connect a tablet with Lifeline is to apply the discount to a service the tablet can use: home internet reaching ${h.MSS.fixedDown}/${h.MSS.fixedUp} Mbps, or a mobile plan with at least ${h.MSS.mobileDataGB} GB of data. Ask a company in writing whether its plan works with a device you bring, and whether a tablet it supplies has a price, a contract or a return condition. The ${h.a('free-internet-for-low-income', 'home internet page')} shows the bill with the discount.</p>`;
    },
  },
});
