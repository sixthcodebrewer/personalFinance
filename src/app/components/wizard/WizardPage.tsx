import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import {
  ChevronRight,
  ChevronLeft,
  Info,
  Briefcase,
  TrendingUp,
  CreditCard,
  Banknote,
  Calculator,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import { Navbar } from '../shared/Navbar';
import type { FinancialInput } from '../../types/financial';
import { analyzeFinancials, formatCurrencyFull, calculateEMI } from '../../utils/calculations';

const STEPS = [
  { id: 1, label: 'Income', icon: Briefcase },
  { id: 2, label: 'Expenses', icon: CreditCard },
  { id: 3, label: 'Savings', icon: Banknote },
  { id: 4, label: 'Decision', icon: Calculator },
];

const DEFAULT_DATA: FinancialInput = {
  monthlyIncome: 0,
  incomeType: 'salaried',
  fixedExpenses: 0,
  variableExpenses: 0,
  liquidSavings: 0,
  expenseAmount: 0,
  paymentType: 'cash',
  interestRate: 12,
  tenure: 12,
  includeOpportunityCost: true,
};

function parseNum(val: string): number {
  const n = parseFloat(val.replace(/,/g, ''));
  return isNaN(n) ? 0 : n;
}

function formatInputVal(val: number): string {
  if (val === 0) return '';
  return val.toLocaleString('en-IN');
}

interface InputFieldProps {
  label: string;
  value: number;
  onChange: (val: number) => void;
  placeholder?: string;
  helper?: string;
  prefix?: string;
  error?: string;
}

function RupeeInput({ label, value, onChange, placeholder, helper, error }: InputFieldProps) {
  const [focused, setFocused] = useState(false);
  const [rawVal, setRawVal] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^0-9.]/g, '');
    setRawVal(raw);
    onChange(parseNum(raw));
  };

  const displayVal = focused ? rawVal : value > 0 ? formatInputVal(value) : '';

  const handleFocus = () => {
    setFocused(true);
    setRawVal(value > 0 ? String(value) : '');
  };

  const handleBlur = () => {
    setFocused(false);
    setRawVal('');
  };

  return (
    <div>
      {label && (
        <label style={{ fontSize: '13px', fontWeight: 600, color: '#94A3B8', letterSpacing: '0.04em', display: 'block', marginBottom: '8px' }}>
          {label.toUpperCase()}
        </label>
      )}
      <div
        className="relative flex items-center rounded-xl transition-all duration-200"
        style={{
          background: '#0B1120',
          border: `1.5px solid ${error ? '#EF4444' : focused ? '#6366F1' : '#1E293B'}`,
          boxShadow: focused ? '0 0 0 3px rgba(99,102,241,0.15)' : 'none',
        }}
      >
        <span
          className="pl-4 pr-1 flex-shrink-0"
          style={{ fontSize: '20px', color: focused ? '#6366F1' : '#475569', fontWeight: 500 }}
        >
          ₹
        </span>
        <input
          type="text"
          inputMode="numeric"
          value={displayVal}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder || '0'}
          className="w-full py-4 pr-4 bg-transparent outline-none"
          style={{
            fontSize: '22px',
            fontWeight: 600,
            color: '#FFFFFF',
            caretColor: '#6366F1',
          }}
        />
      </div>
      {helper && !error && (
        <p style={{ fontSize: '12px', color: '#475569', marginTop: '6px' }}>{helper}</p>
      )}
      {error && (
        <p style={{ fontSize: '12px', color: '#EF4444', marginTop: '6px', display: 'flex', alignItems: 'center', gap: '4px' }}>
          <AlertCircle size={12} /> {error}
        </p>
      )}
    </div>
  );
}

interface SmallInputProps {
  label: string;
  value: number;
  onChange: (val: number) => void;
  suffix?: string;
  min?: number;
  max?: number;
}

function SmallNumberInput({ label, value, onChange, suffix, min, max }: SmallInputProps) {
  const [focused, setFocused] = useState(false);

  return (
    <div>
      <label style={{ fontSize: '12px', fontWeight: 600, color: '#94A3B8', letterSpacing: '0.04em', display: 'block', marginBottom: '6px' }}>
        {label.toUpperCase()}
      </label>
      <div
        className="relative flex items-center rounded-xl transition-all duration-200"
        style={{
          background: '#0B1120',
          border: `1.5px solid ${focused ? '#6366F1' : '#1E293B'}`,
          boxShadow: focused ? '0 0 0 3px rgba(99,102,241,0.15)' : 'none',
        }}
      >
        <input
          type="number"
          value={value || ''}
          onChange={(e) => {
            const v = parseFloat(e.target.value);
            if (isNaN(v)) { onChange(0); return; }
            if (min !== undefined && v < min) { onChange(min); return; }
            if (max !== undefined && v > max) { onChange(max); return; }
            onChange(v);
          }}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder="0"
          className="w-full py-3 pl-4 bg-transparent outline-none"
          style={{ fontSize: '16px', fontWeight: 600, color: '#FFFFFF' }}
        />
        {suffix && (
          <span className="pr-4" style={{ fontSize: '14px', color: '#475569', whiteSpace: 'nowrap' }}>
            {suffix}
          </span>
        )}
      </div>
    </div>
  );
}

function ToggleGroup({
  options,
  value,
  onChange,
}: {
  options: { label: string; value: string; icon?: React.ReactNode }[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex gap-2 flex-wrap">
      {options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl transition-all duration-200"
          style={{
            background: value === opt.value ? '#6366F1' : '#0B1120',
            border: `1.5px solid ${value === opt.value ? '#6366F1' : '#1E293B'}`,
            color: value === opt.value ? '#FFFFFF' : '#94A3B8',
            fontSize: '14px',
            fontWeight: 600,
            boxShadow: value === opt.value ? '0 4px 16px rgba(99,102,241,0.3)' : 'none',
          }}
        >
          {opt.icon}
          {opt.label}
        </button>
      ))}
    </div>
  );
}

function Tooltip({ text }: { text: string }) {
  const [show, setShow] = useState(false);
  return (
    <div className="relative inline-block">
      <button
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        className="ml-2 inline-flex items-center"
      >
        <Info size={14} style={{ color: '#475569' }} />
      </button>
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50 w-56 rounded-lg px-3 py-2"
            style={{ background: '#1E293B', border: '1px solid #334155' }}
          >
            <p style={{ fontSize: '12px', color: '#94A3B8', lineHeight: 1.5 }}>{text}</p>
            <div
              className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0"
              style={{ borderLeft: '5px solid transparent', borderRight: '5px solid transparent', borderTop: '5px solid #1E293B' }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Step components

function Step1({ data, onChange }: { data: FinancialInput; onChange: (d: Partial<FinancialInput>) => void }) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  return (
    <div className="space-y-8">
      <div>
        <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#FFFFFF', marginBottom: '6px' }}>
          What's your monthly income?
        </h2>
        <p style={{ fontSize: '14px', color: '#64748B' }}>
          Enter your take-home pay after taxes and deductions.
        </p>
      </div>

      <RupeeInput
        label="Monthly Income"
        value={data.monthlyIncome}
        onChange={(v) => {
          onChange({ monthlyIncome: v });
          setErrors((e) => ({ ...e, income: '' }));
        }}
        placeholder="e.g. 75,000"
        helper="Your take-home monthly income"
        error={errors.income}
      />

      <div>
        <label style={{ fontSize: '13px', fontWeight: 600, color: '#94A3B8', letterSpacing: '0.04em', display: 'block', marginBottom: '10px' }}>
          INCOME TYPE
        </label>
        <ToggleGroup
          options={[
            { label: 'Salaried', value: 'salaried', icon: <Briefcase size={15} /> },
            { label: 'Variable / Freelance', value: 'variable', icon: <TrendingUp size={15} /> },
          ]}
          value={data.incomeType}
          onChange={(v) => onChange({ incomeType: v as 'salaried' | 'variable' })}
        />
        {data.incomeType === 'variable' && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-3 p-3 rounded-lg flex items-start gap-2"
            style={{ background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.15)' }}
          >
            <Info size={14} style={{ color: '#F59E0B', marginTop: '2px', flexShrink: 0 }} />
            <p style={{ fontSize: '12px', color: '#D97706' }}>
              For variable income, we recommend entering your average monthly income over the last 6 months.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}

function Step2({ data, onChange }: { data: FinancialInput; onChange: (d: Partial<FinancialInput>) => void }) {
  const total = data.fixedExpenses + data.variableExpenses;
  const surplus = data.monthlyIncome - total;

  return (
    <div className="space-y-8">
      <div>
        <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#FFFFFF', marginBottom: '6px' }}>
          What are your monthly expenses?
        </h2>
        <p style={{ fontSize: '14px', color: '#64748B' }}>
          Include rent, utilities, groceries, subscriptions — everything you spend on.
        </p>
      </div>

      <div className="space-y-5">
        <RupeeInput
          label="Fixed Expenses"
          value={data.fixedExpenses}
          onChange={(v) => onChange({ fixedExpenses: v })}
          placeholder="e.g. 25,000"
          helper="Rent, loan EMIs, insurance, subscriptions"
        />
        <RupeeInput
          label="Variable Expenses"
          value={data.variableExpenses}
          onChange={(v) => onChange({ variableExpenses: v })}
          placeholder="e.g. 15,000"
          helper="Groceries, dining, fuel, entertainment"
        />
      </div>

      {/* Live summary */}
      <motion.div
        animate={{ opacity: total > 0 ? 1 : 0.5 }}
        className="rounded-xl p-4"
        style={{ background: '#0B1120', border: '1px solid #1E293B' }}
      >
        <div style={{ fontSize: '12px', color: '#475569', fontWeight: 600, marginBottom: '12px', letterSpacing: '0.04em' }}>
          LIVE SUMMARY
        </div>
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: 'Total Expenses', val: formatCurrencyFull(total), color: '#EF4444' },
            { label: 'Monthly Income', val: data.monthlyIncome > 0 ? formatCurrencyFull(data.monthlyIncome) : '—', color: '#94A3B8' },
            {
              label: 'Monthly Surplus',
              val: data.monthlyIncome > 0 ? formatCurrencyFull(Math.abs(surplus)) : '—',
              color: surplus < 0 ? '#EF4444' : surplus > 0 ? '#22C55E' : '#94A3B8',
              prefix: surplus < 0 ? '-' : surplus > 0 ? '+' : '',
            },
          ].map((item) => (
            <div key={item.label}>
              <div style={{ fontSize: '11px', color: '#475569', marginBottom: '4px' }}>{item.label}</div>
              <div style={{ fontSize: '16px', fontWeight: 700, color: item.color }}>
                {item.prefix || ''}{item.val}
              </div>
            </div>
          ))}
        </div>
        {total > 0 && data.monthlyIncome > 0 && (
          <div className="mt-3">
            <div className="flex justify-between mb-1">
              <span style={{ fontSize: '11px', color: '#475569' }}>Expense ratio</span>
              <span style={{ fontSize: '11px', color: total / data.monthlyIncome > 0.8 ? '#EF4444' : '#94A3B8' }}>
                {((total / data.monthlyIncome) * 100).toFixed(0)}% of income
              </span>
            </div>
            <div className="w-full h-1.5 rounded-full" style={{ background: '#1E293B' }}>
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${Math.min(100, (total / data.monthlyIncome) * 100)}%`,
                  background: total / data.monthlyIncome > 0.8 ? '#EF4444' : total / data.monthlyIncome > 0.6 ? '#F59E0B' : '#6366F1',
                }}
              />
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}

function Step3({ data, onChange }: { data: FinancialInput; onChange: (d: Partial<FinancialInput>) => void }) {
  const totalExpenses = data.fixedExpenses + data.variableExpenses;
  const emergencyMonths = totalExpenses > 0 ? data.liquidSavings / totalExpenses : 0;

  return (
    <div className="space-y-8">
      <div>
        <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#FFFFFF', marginBottom: '6px' }}>
          How much do you have saved?
        </h2>
        <p style={{ fontSize: '14px', color: '#64748B' }}>
          This helps us calculate your financial safety cushion.
        </p>
      </div>

      <div>
        <div className="flex items-center mb-2">
          <label style={{ fontSize: '13px', fontWeight: 600, color: '#94A3B8', letterSpacing: '0.04em' }}>
            LIQUID SAVINGS
          </label>
          <Tooltip text="Money you can access instantly — savings account, FD, liquid mutual funds. Exclude investments locked for long periods." />
        </div>
        <div style={{ marginTop: '8px' }}>
          <RupeeInput
            label=""
            value={data.liquidSavings}
            onChange={(v) => onChange({ liquidSavings: v })}
            placeholder="e.g. 2,00,000"
            helper="Bank balance + FD + liquid mutual funds"
          />
        </div>
      </div>

      {/* Emergency fund indicator */}
      {data.liquidSavings > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl p-5"
          style={{ background: '#0B1120', border: '1px solid #1E293B' }}
        >
          <div style={{ fontSize: '12px', color: '#475569', fontWeight: 600, marginBottom: '12px', letterSpacing: '0.04em' }}>
            EMERGENCY FUND CHECK
          </div>
          <div className="flex items-end justify-between mb-3">
            <div>
              <div style={{ fontSize: '28px', fontWeight: 800, color: emergencyMonths >= 6 ? '#22C55E' : emergencyMonths >= 3 ? '#F59E0B' : '#EF4444' }}>
                {totalExpenses > 0 ? `${emergencyMonths.toFixed(1)} months` : 'N/A'}
              </div>
              <div style={{ fontSize: '12px', color: '#475569', marginTop: '2px' }}>
                of expenses covered
              </div>
            </div>
            <div
              className="px-3 py-1.5 rounded-lg"
              style={{
                background: emergencyMonths >= 6 ? 'rgba(34,197,94,0.1)' : emergencyMonths >= 3 ? 'rgba(245,158,11,0.1)' : 'rgba(239,68,68,0.1)',
                border: `1px solid ${emergencyMonths >= 6 ? 'rgba(34,197,94,0.2)' : emergencyMonths >= 3 ? 'rgba(245,158,11,0.2)' : 'rgba(239,68,68,0.2)'}`,
              }}
            >
              <span style={{ fontSize: '12px', fontWeight: 600, color: emergencyMonths >= 6 ? '#22C55E' : emergencyMonths >= 3 ? '#F59E0B' : '#EF4444' }}>
                {emergencyMonths >= 6 ? '✅ Healthy' : emergencyMonths >= 3 ? '⚠️ Moderate' : '❌ Low'}
              </span>
            </div>
          </div>
          <div className="w-full h-2 rounded-full" style={{ background: '#1E293B' }}>
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{
                width: `${Math.min(100, (emergencyMonths / 6) * 100)}%`,
                background: emergencyMonths >= 6 ? '#22C55E' : emergencyMonths >= 3 ? '#F59E0B' : '#EF4444',
              }}
            />
          </div>
          <div className="flex justify-between mt-1.5">
            <span style={{ fontSize: '10px', color: '#334155' }}>0 months</span>
            <span style={{ fontSize: '10px', color: '#334155' }}>6 months (recommended)</span>
          </div>
        </motion.div>
      )}
    </div>
  );
}

function Step4({
  data,
  onChange,
}: {
  data: FinancialInput;
  onChange: (d: Partial<FinancialInput>) => void;
}) {
  const emi = data.paymentType === 'emi'
    ? calculateEMI(data.expenseAmount, data.interestRate, data.tenure)
    : 0;
  const totalPaid = emi * data.tenure;
  const interest = totalPaid - data.expenseAmount;
  const monthlyBalance = data.monthlyIncome - data.fixedExpenses - data.variableExpenses - emi;
  const savingsAfter = data.paymentType === 'cash'
    ? data.liquidSavings - data.expenseAmount
    : data.liquidSavings;
  const emiLoad = data.monthlyIncome > 0 ? (emi / data.monthlyIncome) * 100 : 0;

  return (
    <div className="space-y-8">
      <div>
        <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#FFFFFF', marginBottom: '6px' }}>
          What are you planning to buy?
        </h2>
        <p style={{ fontSize: '14px', color: '#64748B' }}>
          Tell us about the expense you're considering.
        </p>
      </div>

      <RupeeInput
        label="Expense Amount"
        value={data.expenseAmount}
        onChange={(v) => onChange({ expenseAmount: v })}
        placeholder="e.g. 50,000"
        helper="Total cost of the purchase"
      />

      <div>
        <label style={{ fontSize: '13px', fontWeight: 600, color: '#94A3B8', letterSpacing: '0.04em', display: 'block', marginBottom: '10px' }}>
          PAYMENT TYPE
        </label>
        <ToggleGroup
          options={[
            { label: 'Cash / One-time', value: 'cash', icon: <Banknote size={15} /> },
            { label: 'EMI / Loan', value: 'emi', icon: <CreditCard size={15} /> },
          ]}
          value={data.paymentType}
          onChange={(v) => onChange({ paymentType: v as 'cash' | 'emi' })}
        />
      </div>

      {/* EMI fields */}
      <AnimatePresence>
        {data.paymentType === 'emi' && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div
              className="rounded-xl p-5 space-y-5"
              style={{ background: '#0B1120', border: '1px solid #1E293B' }}
            >
              <div style={{ fontSize: '12px', fontWeight: 600, color: '#475569', letterSpacing: '0.06em' }}>
                EMI DETAILS
              </div>
              <div className="grid grid-cols-2 gap-5">
                <SmallNumberInput
                  label="Interest Rate"
                  value={data.interestRate}
                  onChange={(v) => onChange({ interestRate: v })}
                  suffix="% p.a."
                  min={0}
                  max={60}
                />
                <SmallNumberInput
                  label="Tenure"
                  value={data.tenure}
                  onChange={(v) => onChange({ tenure: v })}
                  suffix="months"
                  min={1}
                  max={360}
                />
              </div>

              {data.expenseAmount > 0 && data.tenure > 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="grid grid-cols-3 gap-3 pt-2 border-t border-[#1E293B]"
                >
                  {[
                    { label: 'Monthly EMI', val: formatCurrencyFull(emi), color: '#818CF8' },
                    { label: 'Total Paid', val: formatCurrencyFull(totalPaid), color: '#94A3B8' },
                    { label: 'Total Interest', val: formatCurrencyFull(interest), color: interest > 0 ? '#F59E0B' : '#94A3B8' },
                  ].map((item) => (
                    <div key={item.label}>
                      <div style={{ fontSize: '11px', color: '#475569', marginBottom: '3px' }}>{item.label}</div>
                      <div style={{ fontSize: '15px', fontWeight: 700, color: item.color }}>{item.val}</div>
                    </div>
                  ))}
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Opportunity Cost Toggle */}
      <div className="flex items-center justify-between p-4 rounded-xl" style={{ background: '#0B1120', border: '1px solid #1E293B' }}>
        <div>
          <div style={{ fontSize: '14px', fontWeight: 600, color: '#FFFFFF', marginBottom: '2px' }}>
            Include Opportunity Cost
          </div>
          <div style={{ fontSize: '12px', color: '#475569' }}>
            Show how much this money could grow if invested instead
          </div>
        </div>
        <button
          onClick={() => onChange({ includeOpportunityCost: !data.includeOpportunityCost })}
          className="relative w-12 h-6 rounded-full transition-all duration-300 flex-shrink-0"
          style={{ background: data.includeOpportunityCost ? '#6366F1' : '#1E293B' }}
        >
          <div
            className="absolute top-0.5 w-5 h-5 rounded-full bg-white transition-all duration-300"
            style={{ left: data.includeOpportunityCost ? '26px' : '2px', boxShadow: '0 1px 4px rgba(0,0,0,0.3)' }}
          />
        </button>
      </div>

      {/* Real-time preview */}
      {data.expenseAmount > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl p-4"
          style={{ background: '#0B1120', border: '1px solid #1E293B' }}
        >
          <div style={{ fontSize: '12px', color: '#475569', fontWeight: 600, marginBottom: '12px', letterSpacing: '0.04em' }}>
            QUICK PREVIEW
          </div>
          <div className="grid grid-cols-3 gap-3">
            {[
              {
                label: data.paymentType === 'emi' ? 'Monthly Burden' : 'Savings After',
                val: data.paymentType === 'emi'
                  ? (emiLoad > 0 ? `${emiLoad.toFixed(0)}% load` : '—')
                  : (data.liquidSavings > 0 ? formatCurrencyFull(Math.max(0, savingsAfter)) : '—'),
                color: data.paymentType === 'emi'
                  ? (emiLoad > 40 ? '#EF4444' : emiLoad > 30 ? '#F59E0B' : '#22C55E')
                  : (savingsAfter < 0 ? '#EF4444' : savingsAfter < data.liquidSavings * 0.3 ? '#F59E0B' : '#22C55E'),
              },
              {
                label: 'Monthly Balance',
                val: data.monthlyIncome > 0 ? formatCurrencyFull(Math.abs(monthlyBalance)) : '—',
                color: monthlyBalance < 0 ? '#EF4444' : '#22C55E',
              },
              {
                label: 'EMI',
                val: data.paymentType === 'emi' && emi > 0 ? formatCurrencyFull(emi) : 'N/A',
                color: '#818CF8',
              },
            ].map((item) => (
              <div key={item.label}>
                <div style={{ fontSize: '11px', color: '#475569', marginBottom: '3px' }}>{item.label}</div>
                <div style={{ fontSize: '14px', fontWeight: 700, color: item.color }}>{item.val}</div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}

// Stepper
function Stepper({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex items-center justify-center mb-10">
      {STEPS.map((step, i) => {
        const Icon = step.icon;
        const isCompleted = current > step.id;
        const isActive = current === step.id;
        return (
          <div key={step.id} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300"
                style={{
                  background: isCompleted ? '#6366F1' : isActive ? 'rgba(99,102,241,0.15)' : '#0B1120',
                  border: `2px solid ${isCompleted ? '#6366F1' : isActive ? '#6366F1' : '#1E293B'}`,
                  boxShadow: isActive ? '0 0 0 4px rgba(99,102,241,0.1)' : 'none',
                }}
              >
                {isCompleted ? (
                  <CheckCircle2 size={16} style={{ color: '#FFFFFF' }} />
                ) : (
                  <Icon size={15} style={{ color: isActive ? '#6366F1' : '#334155' }} />
                )}
              </div>
              <span
                className="mt-1.5 hidden sm:block"
                style={{
                  fontSize: '11px',
                  fontWeight: 600,
                  color: isActive ? '#818CF8' : isCompleted ? '#6366F1' : '#334155',
                  letterSpacing: '0.02em',
                }}
              >
                {step.label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div
                className="w-12 sm:w-20 h-0.5 mx-1 mb-4 transition-all duration-500"
                style={{ background: current > step.id ? '#6366F1' : '#1E293B' }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

// Validation
function validateStep(step: number, data: FinancialInput): string | null {
  if (step === 1 && data.monthlyIncome <= 0) return 'Please enter your monthly income to continue.';
  if (step === 2 && data.fixedExpenses <= 0 && data.variableExpenses <= 0)
    return 'Please enter at least one expense amount.';
  if (step === 4 && data.expenseAmount <= 0)
    return 'Please enter the amount you plan to spend.';
  return null;
}

export function WizardPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [data, setData] = useState<FinancialInput>(DEFAULT_DATA);
  const [error, setError] = useState<string | null>(null);
  const [direction, setDirection] = useState(1);

  const updateData = useCallback((updates: Partial<FinancialInput>) => {
    setData((prev) => ({ ...prev, ...updates }));
    setError(null);
  }, []);

  const handleNext = () => {
    const err = validateStep(step, data);
    if (err) { setError(err); return; }
    if (step < 4) {
      setDirection(1);
      setStep((s) => s + 1);
      setError(null);
    } else {
      const result = analyzeFinancials(data);
      navigate('/results', { state: { data, result } });
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setDirection(-1);
      setStep((s) => s - 1);
      setError(null);
    }
  };

  const stepContent = {
    1: <Step1 data={data} onChange={updateData} />,
    2: <Step2 data={data} onChange={updateData} />,
    3: <Step3 data={data} onChange={updateData} />,
    4: <Step4 data={data} onChange={updateData} />,
  };

  return (
    <div
      className="min-h-screen pt-16"
      style={{ background: '#020617' }}
    >
      <Navbar />

      {/* BG glow */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(99,102,241,0.08) 0%, transparent 70%)' }}
      />

      <div className="max-w-[640px] mx-auto px-4 py-12 relative">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 style={{ fontSize: '28px', fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.02em', marginBottom: '8px' }}>
            Analyze Your Decision
          </h1>
          <p style={{ fontSize: '15px', color: '#475569' }}>
            Step {step} of {STEPS.length} — {STEPS[step - 1].label}
          </p>
        </div>

        {/* Stepper */}
        <Stepper current={step} total={STEPS.length} />

        {/* Card */}
        <div
          className="rounded-2xl p-8 relative overflow-hidden"
          style={{
            background: '#0F172A',
            border: '1px solid #1E293B',
            boxShadow: '0 32px 80px rgba(0,0,0,0.3)',
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: direction * 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -30 }}
              transition={{ duration: 0.25 }}
            >
              {stepContent[step as keyof typeof stepContent]}
            </motion.div>
          </AnimatePresence>

          {/* Error */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="mt-4 flex items-center gap-2 p-3 rounded-lg"
                style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)' }}
              >
                <AlertCircle size={14} style={{ color: '#EF4444', flexShrink: 0 }} />
                <p style={{ fontSize: '13px', color: '#FCA5A5' }}>{error}</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-[#1E293B]">
            <button
              onClick={handleBack}
              disabled={step === 1}
              className="flex items-center gap-2 px-5 py-3 rounded-xl transition-all duration-200"
              style={{
                background: step === 1 ? 'transparent' : '#0B1120',
                border: `1.5px solid ${step === 1 ? 'transparent' : '#1E293B'}`,
                color: step === 1 ? '#334155' : '#94A3B8',
                fontSize: '14px',
                fontWeight: 600,
                cursor: step === 1 ? 'not-allowed' : 'pointer',
              }}
            >
              <ChevronLeft size={16} />
              Back
            </button>

            <div className="flex items-center gap-2">
              {STEPS.map((s) => (
                <div
                  key={s.id}
                  className="rounded-full transition-all duration-300"
                  style={{
                    width: step === s.id ? '20px' : '6px',
                    height: '6px',
                    background: step === s.id ? '#6366F1' : step > s.id ? '#312E81' : '#1E293B',
                  }}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="flex items-center gap-2 px-6 py-3 rounded-xl text-white transition-all duration-200"
              style={{
                background: step === 4
                  ? 'linear-gradient(135deg, #6366F1 0%, #4F46E5 100%)'
                  : '#6366F1',
                boxShadow: '0 4px 16px rgba(99,102,241,0.3)',
                fontSize: '14px',
                fontWeight: 600,
              }}
            >
              {step === 4 ? (
                <>
                  <Calculator size={16} />
                  Analyze Now
                </>
              ) : (
                <>
                  Next
                  <ChevronRight size={16} />
                </>
              )}
            </button>
          </div>
        </div>

        {/* Bottom hint */}
        <p className="text-center mt-6" style={{ fontSize: '13px', color: '#334155' }}>
          Your data stays private — we don't store or share anything.
        </p>
      </div>
    </div>
  );
}