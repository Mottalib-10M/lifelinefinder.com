import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'lifeline-income-limits', group: 'qualify', order: 3,
  tool: { kind: 'mini:limit' },
  related: ['lifeline-eligibility', 'lifeline-documents', 'free-phone-with-food-stamps', 'lifeline-for-survivors', 'free-government-phone'],
  sources: ['usacEligibility', 'hhsFpg', 'cfr400', 'cfr409', 'cfr410', 'usacDocs'],
  en: {
    slug: 'lifeline-income-limits', nav: 'Lifeline income limits', card: 'The 2026 Lifeline income limits by household size, per year, per month and per week, for the 48 states, Alaska and Hawaii.',
    title: 'Lifeline Income Limits 2026: Yearly and Monthly Table',
    description: 'Lifeline income limits 2026: 135% of the poverty guidelines by household size, yearly, monthly and weekly, for the 48 states, Alaska and Hawaii, with examples.',
    h1: 'Lifeline income limits for 2026, by household size',
    intro: 'Pick your area, type your household size and gross yearly income: the calculator above shows the 2026 limit and how far you are from it.',
    resume: (h) => `The Lifeline income limit is 135% of the federal poverty guidelines published by HHS, applied to the gross yearly income of everyone in the household. For 2026, USAC’s table sets it at ${h.lim(1)} for one person, ${h.lim(2)} for two, ${h.lim(3)} for three and ${h.lim(4)} for four in the 48 contiguous states, DC and the territories, plus ${h.money(h.P.income135.contiguous.add)} for each person beyond eight. Alaska and Hawaii have their own, higher tables: ${h.lim(1, 'alaska')} and ${h.lim(1, 'hawaii')} for one person. Divided by twelve, the one-person limit is about ${h.money(Math.floor(h.limN(1) / 12))} a month, and the limit for four about ${h.money(Math.floor(h.limN(4) / 12))}. Income is gross income as the Internal Revenue Code defines it, before taxes and deductions. A household at or under the line qualifies on income alone; a household over it can still qualify if someone receives SNAP, Medicaid, SSI, Federal Public Housing Assistance or a Veterans or Survivors Pension, because those programs bypass the income test entirely.`,
    faqs: (h) => [
      { q: 'Is the Lifeline income limit based on gross or take-home pay?', a: `Gross. The FCC definition uses gross income under section 61 of the Internal Revenue Code, received by all members of the household from whatever source, unless the tax code specifically excludes it. So you compare the total before taxes, insurance or retirement deductions with the limit. A worker taking home ${h.money(1500)} a month may be well above that on paper.` },
      { q: 'What is the Lifeline income limit for a family of four in Alaska?', a: `For 2026 it is ${h.lim(4, 'alaska')} of gross yearly household income, against ${h.lim(4)} in the 48 contiguous states and ${h.lim(4, 'hawaii')} in Hawaii. That is about ${h.money(Math.floor(h.limN(4, 'alaska') / 12))} a month. Each additional person in Alaska adds ${h.money(h.P.income135.alaska.add)} to the limit, from the ninth person onward in USAC’s table.` },
      { q: 'Can I prove my income with pay stubs instead of a tax return?', a: `Yes. Pay stubs are accepted, but because they do not cover a full year you must send the same type of document for ${h.R.payStubMonths} consecutive months within the previous ${h.R.docMonths} months. A prior year tax return, a Social Security or Veterans Administration statement of benefits, a pension statement or an unemployment benefit statement are other accepted proofs.` },
      { q: 'Why are the Alaska and Hawaii Lifeline limits higher?', a: `Because HHS publishes separate poverty guidelines for Alaska and Hawaii, and Lifeline applies the same 135% to each table. The one-person guideline is ${h.fpg(1, 'alaska')} in Alaska and ${h.fpg(1, 'hawaii')} in Hawaii, against ${h.fpg(1)} elsewhere. DC and the territories, including Puerto Rico and Guam, use the table of the 48 contiguous states.` },
    ],
    body: (h) => {
      const rows = [1, 2, 3, 4, 5, 6].map((n) => [`${n} ${n > 1 ? 'people' : 'person'}`, h.lim(n), h.money(Math.floor(h.limN(n) / 12)), h.money(Math.floor(h.limN(n) / 52))]);
      return `<h2>The 2026 table, from the poverty guideline to the limit</h2>
<p>Each figure is the ${h.src('hhsFpg', 'HHS poverty guideline')} for the household size taken at 135%. For one person in the 48 states the guideline is ${h.fpg(1)}, which gives ${h.lim(1)}; for four it is ${h.fpg(4)}, which gives ${h.lim(4)}. The guidelines appeared in ${h.FPG.published} and USAC notes they are adjusted every year, so the table below is the one in force for 2026:</p>
${h.limitTable(8, `135% of the 2026 poverty guidelines, gross yearly household income, as published by ${h.src('usacEligibility', 'USAC')}.`)}
<p>Above eight people, add the last line once per person. A household of ten in the 48 states therefore has a limit of ${h.lim(10)}, and in Alaska ${h.lim(10, 'alaska')}.</p>
<h2>The same limits per month and per week</h2>
<p>Most people know their monthly pay better than their yearly total. The official limit is yearly, but dividing it helps you see where you stand before you gather documents:</p>
${h.table(['Household', 'Per year', 'Per month', 'Per week'], rows, 'Lifeline limits in the 48 states, DC and territories, 2026; monthly and weekly figures rounded down.', ['l', 'r', 'r', 'r'])}
<p>A one-person household paid ${h.money(400)} a week earns ${h.money(400 * 52)} a year: ${h.limN(1) >= 400 * 52 ? `under the line by ${h.money(h.limN(1) - 400 * 52)}` : `over the line by ${h.money(400 * 52 - h.limN(1))}`}.</p>
<h2>Whose income is added up</h2>
<p>The ${h.src('cfr400', 'FCC definition')} counts all members of the household, which means every adult at the address who shares income and expenses, not only the person applying. Two adult roommates who keep separate money are two households, each compared with the one-person limit. A couple sharing bills is one household of two, compared with ${h.lim(2)}. Children under ${h.R.minAge} living with a parent are counted in the parent’s household size, which raises the limit by about ${h.money(h.P.income135.contiguous.add)} per child.</p>
<p>Proof follows the ${h.src('cfr410', 'eligibility rule')}: a yearly document such as a tax return, or documents covering ${h.R.payStubMonths} consecutive months. The calculator below shows which proof fits your case:</p>
<!--tool:mini:docs-->
<h2>Three households close to the line</h2>
<p><strong>Two adults in Anchorage earning $36,000 together.</strong> The Alaska limit for two is ${h.lim(2, 'alaska')}, so they are ${h.money(h.limN(2, 'alaska') - 36000)} under it. In Ohio the same income would be over the ${h.lim(2)} limit by ${h.money(36000 - h.limN(2))}.</p>
<p><strong>A family of five in Texas earning $53,000.</strong> The limit for five is ${h.lim(5)}, so the family is ${h.money(53000 - h.limN(5))} over and cannot qualify on income. If one parent receives SNAP, the income no longer matters: the ${h.a('free-phone-with-food-stamps', 'food stamps route')} applies.</p>
<p><strong>A single parent with two children in Hawaii earning $42,000.</strong> The Hawaii limit for three is ${h.lim(3, 'hawaii')}, which leaves ${h.money(h.limN(3, 'hawaii') - 42000)} of room.</p>
<h2>A higher limit only for survivors</h2>
<p>One case uses another ceiling. A survivor of domestic violence or human trafficking who asks to separate a phone line from an abuser’s plan can get emergency support for ${h.S.survivorMonths} months with household income up to ${h.S.survivorIncomePct}% of the guidelines, ${h.lim200(1)} for one person and ${h.lim200(2)} for two. That route has its own conditions, explained on the ${h.a('lifeline-for-survivors', 'survivor benefit page')}. For everyone else, the 135% table above is the only income test, and the ${h.a('lifeline-documents', 'documents page')} explains how to prove it.</p>`;
    },
  },
});
