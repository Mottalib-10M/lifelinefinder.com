import { definePage } from '../../lib/guide-types';

type Nv = Record<string, { auto: string[]; unclear?: string[] }>;

export default definePage({
  id: 'free-phone-with-food-stamps', group: 'qualify', order: 5,
  tool: { kind: 'elig', props: { state: 'IL', size: 3, income: 45000, program: 'snap' } },
  related: ['free-phone-with-medicaid', 'lifeline-eligibility', 'free-tablet-with-ebt', 'lifeline-documents', 'how-to-get-a-free-government-phone'],
  sources: ['cfr409', 'cfr400', 'usacEligibility', 'usacVerification', 'usacDocs'],
  demarche: true,
  en: {
    slug: 'free-phone-with-food-stamps', nav: 'Free phone with food stamps', card: 'SNAP qualifies a household for Lifeline at any income, but only some states confirm it automatically. The list, and the letter to keep.',
    title: 'Free Phone With Food Stamps: SNAP and Lifeline in 2026',
    description: 'Free phone with food stamps: SNAP qualifies a household for Lifeline at any income. See which states confirm SNAP automatically and which SNAP letter to send.',
    h1: 'Free phone with food stamps: using SNAP to get Lifeline',
    intro: 'SNAP is already selected in the checker above. Choose your state to see whether the National Verifier will find your SNAP case on its own.',
    resume: (h) => {
      const nv = h.P.nv as Nv;
      const auto = Object.keys(nv).filter((s) => nv[s].auto.includes('snap')).length;
      return `Food stamps, now called the Supplemental Nutrition Assistance Program or SNAP, qualify a household for Lifeline under 47 CFR 54.409 without any income test. If you, a dependent or anyone in your household receives SNAP, the household can get up to ${h.support('broadband')} a month off one phone or internet plan, ${h.money(h.S.tribalMax)} on qualifying Tribal lands, even with an income above the ${h.lim(3)} limit for three people. Puerto Rico’s Nutrition Assistance Program, and those of American Samoa and the Northern Mariana Islands, count the same way. The catch is the proof. Unlike Medicaid, which USAC matches through a federal connection everywhere, SNAP is matched only through state data: USAC’s table shows an automatic SNAP check in ${auto} states and territories, among them Florida, Georgia, Pennsylvania and Washington, while California, New York, Illinois, Ohio and most others need a copy of a SNAP letter dated within the last ${h.R.docMonths} months. Oregon and Texas use their own state process.`;
    },
    faqs: (h) => [
      { q: 'Can I use my EBT card as proof of SNAP for Lifeline?', a: `Only if it carries everything USAC asks for: your name or the name of the household member who receives SNAP, the name of the program, the agency that issued it, and an issue date within the last ${h.R.docMonths} months or a future expiration date. Most benefit cards lack one of these, so a recent SNAP approval or renewal letter is the safer document to upload.` },
      { q: 'Does WIC count like SNAP for Lifeline?', a: 'Not for the regular federal benefit. WIC is not one of the five federal programs named in the Lifeline rule. It does count in two narrower cases: for a survivor of domestic violence seeking emergency support, where WIC shows financial hardship, and for California LifeLine, the state program, which lists WIC among its qualifying programs. Otherwise a WIC household qualifies on income or through another program.' },
      { q: 'Does the SNAP case have to be in my name?', a: 'No. The rule covers benefits received by the applicant, by one or more dependents, or by the household. If your spouse holds the SNAP case for the household, you can apply in your own name and name SNAP as the program. A document may show the name of the person who receives the benefit, which USAC calls the benefit qualifying person.' },
      { q: 'Which states check SNAP for Lifeline automatically?', a: `USAC lists an automatic SNAP check in ${h.list(Object.keys(h.P.nv as Nv).filter((s) => (h.P.nv as Nv)[s].auto.includes('snap')).map((s) => h.stateName(s)))}. Everywhere else, apart from the state processes of Oregon and Texas, plan on uploading a SNAP letter.` },
    ],
    body: (h) => {
      const nv = h.P.nv as Nv;
      const auto = Object.keys(nv).filter((s) => nv[s].auto.includes('snap')).map((s) => h.stateName(s));
      const unclear = Object.keys(nv).filter((s) => nv[s].unclear?.includes('snap')).map((s) => h.stateName(s));
      return `<h2>SNAP replaces the income test</h2>
<p>Under the ${h.src('cfr409', 'FCC qualification rule')}, receiving SNAP is enough on its own. A household of three in Chicago earning ${h.money(45000)} is ${h.money(45000 - h.limN(3))} over the income limit for three, yet it qualifies if the mother’s SNAP case covers the household. The SNAP case opens the door; the address decides how many benefits fit behind it. For Lifeline, the ${h.src('cfr400', 'household')} is everyone at your address who shares income and expenses, and that economic unit holds one benefit, however many of its members appear on the SNAP case.</p>
<p>Two more cases show the edges. A man in Atlanta who receives SNAP alone but rents a room from a family and keeps his money separate is his own household: Georgia matches SNAP automatically, and the family’s own Lifeline account at the same address does not block him once he fills in the household worksheet. A grandmother on SNAP who lives with her son’s family and shares the groceries is part of their household instead, so her SNAP qualifies all of them, for a single benefit.</p>
<p>${h.src('usacEligibility', 'USAC')} keeps a list of the names SNAP goes by in each state. CalFresh in California, for instance, is SNAP. On the application you select SNAP, whatever the local name of the program.</p>
<h2>States where SNAP is confirmed without a document</h2>
<p>The National Verifier confirms SNAP only where a state has signed a data agreement with USAC. According to the ${h.src('usacVerification', 'table of automated data sources')}, these are: ${h.list(auto)}. For ${h.list(unclear)}, the table does not say clearly whether SNAP is matched, so keep a letter ready. In the remaining states and territories, a SNAP application always ends in a manual review. Check yours here:</p>
<!--tool:mini:proof|{"st":${h.stIdx('IL')},"p":0}-->
<p>If your household also receives Medicaid, compare: Medicaid is matched automatically almost everywhere, so in ${h.stateName('IL')} or ${h.stateName('CA')} naming Medicaid can save the upload. The ${h.a('free-phone-with-medicaid', 'Medicaid page')} explains that route.</p>
<h2>The SNAP letter to keep</h2>
<p>When SNAP is not matched, the ${h.src('usacDocs', 'manual review')} needs a copy of a document showing four elements: the name of the person receiving SNAP, the program name, the agency that issued the letter, and a date within the last ${h.R.docMonths} months or an expiration date in the future. An approval notice, a renewal notice or a benefit statement from your SNAP office normally fits. Online, you upload a copy in the National Verifier; by mail, you send a copy with the cover sheet. A notice that is fourteen months old and shows no future expiration date is refused even if your case is still open, so ask your office for a fresh one before you apply.</p>
<h2>Food stamps, tablets and two benefits</h2>
<p>SNAP gives access to one Lifeline discount per household, on one service: a mobile plan, home internet, or a bundle. It does not add a second benefit for a tablet or a second phone in the same household. The FCC does not pay for devices, so a tablet offered with a plan is the company’s own offer; what remains of federal device help is explained on the ${h.a('free-tablet-with-ebt', 'EBT tablet page')}.</p>
<h2>Keeping the benefit when SNAP changes</h2>
<p>Lifeline is renewed every year, starting with an automated data check. In a state with an automatic SNAP match, an open case usually carries you through the yearly check. If your SNAP case closes, you are no longer eligible through it: see whether your income now fits under the limit, ${h.lim(2)} for two people or ${h.lim(4)} for four, or whether someone receives another qualifying benefit, and tell your company if no route remains. The ${h.a('how-to-get-a-free-government-phone', 'application guide')} shows the steps from start to finish.</p>`;
    },
  },
});
