import type { FinancialInput, AnalysisResult } from '../types/financial';

export function formatCurrency(amount: number): string {
  const abs = Math.abs(amount);
  const sign = amount < 0 ? '-' : '';
  if (abs >= 10000000) return `${sign}₹${(abs / 10000000).toFixed(2)}Cr`;
  if (abs >= 100000) return `${sign}₹${(abs / 100000).toFixed(1)}L`;
  if (abs >= 1000) return `${sign}₹${(abs / 1000).toFixed(0)}K`;
  return `${sign}₹${abs.toLocaleString('en-IN')}`;
}

export function formatCurrencyFull(amount: number): string {
  const sign = amount < 0 ? '-' : '';
  return `${sign}₹${Math.abs(amount).toLocaleString('en-IN')}`;
}

export function calculateEMI(principal: number, annualRate: number, tenureMonths: number): number {
  if (principal <= 0 || tenureMonths <= 0) return 0;
  if (annualRate === 0) return Math.round(principal / tenureMonths);
  const r = annualRate / 12 / 100;
  const emi = (principal * r * Math.pow(1 + r, tenureMonths)) / (Math.pow(1 + r, tenureMonths) - 1);
  return Math.round(emi);
}

export function analyzeFinancials(data: FinancialInput): AnalysisResult {
  const {
    monthlyIncome,
    fixedExpenses,
    variableExpenses,
    liquidSavings,
    expenseAmount,
    paymentType,
    interestRate,
    tenure,
    includeOpportunityCost,
  } = data;

  const totalMonthlyExpenses = fixedExpenses + variableExpenses;
  const monthlyFreeCashBefore = monthlyIncome - totalMonthlyExpenses;
  const monthlyEmi = paymentType === 'emi' ? calculateEMI(expenseAmount, interestRate, tenure) : 0;
  const totalEmiPaid = monthlyEmi * tenure;

  const emergencyMonthsBefore = totalMonthlyExpenses > 0 ? liquidSavings / totalMonthlyExpenses : 0;

  const savingsAfter = paymentType === 'cash' ? liquidSavings - expenseAmount : liquidSavings;
  const monthlyFreeCashAfter = monthlyFreeCashBefore - monthlyEmi;
  const emergencyMonthsAfter =
    totalMonthlyExpenses > 0 ? Math.max(0, savingsAfter) / totalMonthlyExpenses : 0;
  const emiLoadAfter = monthlyIncome > 0 ? (monthlyEmi / monthlyIncome) * 100 : 0;

  const years = 10;
  const futureValue = Math.round(expenseAmount * Math.pow(1.12, years));

  const reasons: string[] = [];
  let verdict: 'safe' | 'risky' | 'not-recommended' = 'safe';

  const dangerFlags = {
    emergencyDangerous: emergencyMonthsAfter < 3,
    emiTooHigh: emiLoadAfter > 40,
    cashFlowNegative: monthlyFreeCashAfter < 0,
    savingsInsufficient: paymentType === 'cash' && savingsAfter < 0,
  };

  const riskyFlags = {
    emergencyLow: emergencyMonthsAfter >= 3 && emergencyMonthsAfter < 6,
    emiModerate: emiLoadAfter > 30 && emiLoadAfter <= 40,
    cashFlowReduced:
      monthlyFreeCashBefore > 0 &&
      monthlyFreeCashAfter < monthlyFreeCashBefore * 0.4 &&
      monthlyFreeCashAfter >= 0,
    savingsHeavy:
      paymentType === 'cash' && savingsAfter >= 0 && expenseAmount > liquidSavings * 0.5,
  };

  if (Object.values(dangerFlags).some(Boolean)) {
    verdict = 'not-recommended';
    if (dangerFlags.emergencyDangerous)
      reasons.push(
        `Your emergency fund drops to just ${emergencyMonthsAfter.toFixed(1)} months — well below the recommended 6 months`
      );
    if (dangerFlags.emiTooHigh)
      reasons.push(
        `Your EMI burden reaches ${emiLoadAfter.toFixed(0)}% of income — exceeding the safe 40% threshold`
      );
    if (dangerFlags.cashFlowNegative)
      reasons.push(
        `Your monthly cash flow turns negative (${formatCurrency(monthlyFreeCashAfter)}), leaving no buffer for unexpected costs`
      );
    if (dangerFlags.savingsInsufficient)
      reasons.push(
        `This expense exceeds your current liquid savings, leaving you with no financial safety net`
      );
  } else if (Object.values(riskyFlags).some(Boolean)) {
    verdict = 'risky';
    if (riskyFlags.emergencyLow)
      reasons.push(
        `Your safety net drops to ${emergencyMonthsAfter.toFixed(1)} months — below the recommended 6 months`
      );
    if (riskyFlags.emiModerate)
      reasons.push(
        `Your EMI load rises to ${emiLoadAfter.toFixed(0)}% of income — approaching the risky zone`
      );
    if (riskyFlags.cashFlowReduced) {
      const reduction = ((1 - monthlyFreeCashAfter / monthlyFreeCashBefore) * 100).toFixed(0);
      reasons.push(`Your free monthly cash reduces by ${reduction}%, limiting financial flexibility`);
    }
    if (riskyFlags.savingsHeavy && !riskyFlags.emergencyLow)
      reasons.push(
        `This expense uses over 50% of your liquid savings, significantly reducing your cushion`
      );
  } else {
    reasons.push(`Your emergency fund stays healthy at ${emergencyMonthsAfter.toFixed(1)} months`);
    if (monthlyFreeCashAfter > 0)
      reasons.push(`You'll have ${formatCurrency(monthlyFreeCashAfter)} in free cash each month`);
    if (paymentType === 'emi' && emiLoadAfter <= 30)
      reasons.push(`EMI burden of ${emiLoadAfter.toFixed(0)}% stays well within safe limits`);
    else if (paymentType === 'cash')
      reasons.push(`Cash payment keeps your monthly obligations unchanged`);
  }

  if (includeOpportunityCost && expenseAmount >= 10000 && reasons.length < 3) {
    reasons.push(
      `${formatCurrency(expenseAmount)} invested could grow to ${formatCurrency(futureValue)} in ${years} years at 12% p.a.`
    );
  }

  const verdictMessages = {
    safe: 'This purchase looks financially manageable based on your current situation.',
    risky: 'This purchase may strain your financial safety net.',
    'not-recommended': 'This decision could significantly impact your financial stability.',
  };

  let suggestion = '';
  if (verdict === 'safe') {
    suggestion =
      "You're well-positioned to proceed. Keep monitoring your monthly cash flow and maintain your emergency fund above 6 months for long-term financial health.";
  } else if (verdict === 'risky') {
    const bufferNeeded = Math.max(0, (6 - emergencyMonthsAfter) * totalMonthlyExpenses);
    if (bufferNeeded > 0 && monthlyFreeCashBefore > 0) {
      const monthsToSave = Math.ceil(bufferNeeded / (monthlyFreeCashBefore * 0.4));
      suggestion = `Consider waiting ${monthsToSave}–${monthsToSave + 2} months and building an additional ${formatCurrencyFull(Math.round(bufferNeeded))} buffer before making this purchase. This will keep your financial safety net intact.`;
    } else {
      suggestion =
        'Consider reducing the expense amount, choosing a longer EMI tenure to lower monthly payments, or building up savings before proceeding.';
    }
  } else {
    suggestion =
      "It's advisable to strengthen your financial position first — focus on building a 6-month emergency fund and reducing liabilities before taking on this expense.";
  }

  return {
    verdict,
    verdictMessage: verdictMessages[verdict],
    before: {
      savings: liquidSavings,
      emiLoad: 0,
      monthlyFreeCash: monthlyFreeCashBefore,
      emergencyMonths: emergencyMonthsBefore,
    },
    after: {
      savings: savingsAfter,
      emiLoad: emiLoadAfter,
      monthlyFreeCash: monthlyFreeCashAfter,
      emergencyMonths: emergencyMonthsAfter,
    },
    monthlyEmi,
    totalEmiPaid,
    opportunityCost: { invested: expenseAmount, futureValue, years },
    reasons: reasons.slice(0, 3),
    suggestion,
  };
}
