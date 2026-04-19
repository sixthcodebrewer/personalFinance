export interface FinancialInput {
  monthlyIncome: number;
  incomeType: 'salaried' | 'variable';
  fixedExpenses: number;
  variableExpenses: number;
  liquidSavings: number;
  expenseAmount: number;
  paymentType: 'cash' | 'emi';
  interestRate: number;
  tenure: number;
  includeOpportunityCost: boolean;
}

export interface MetricSnapshot {
  savings: number;
  emiLoad: number;
  monthlyFreeCash: number;
  emergencyMonths: number;
}

export interface AnalysisResult {
  verdict: 'safe' | 'risky' | 'not-recommended';
  verdictMessage: string;
  before: MetricSnapshot;
  after: MetricSnapshot;
  monthlyEmi: number;
  totalEmiPaid: number;
  opportunityCost: {
    invested: number;
    futureValue: number;
    years: number;
  };
  reasons: string[];
  suggestion: string;
}
