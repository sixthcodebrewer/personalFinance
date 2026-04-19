import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { motion } from 'motion/react';
import {
  ShieldCheck,
  AlertTriangle,
  XCircle,
  RefreshCw,
  ArrowLeft,
  TrendingUp,
  Wallet,
  BarChart3,
  DollarSign,
  CheckCircle2,
  Info,
  Zap,
} from 'lucide-react';
import { Navbar } from '../shared/Navbar';
import type { AnalysisResult, FinancialInput } from '../../types/financial';
import { formatCurrency, formatCurrencyFull } from '../../utils/calculations';

// Animated counter hook — removed (unused)

// Animated progress bar
function AnimatedBar({
  pct,
  color,
  delay = 0,
}: {
  pct: number;
  color: string;
  delay?: number;
}) {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setWidth(Math.min(100, Math.max(0, pct))), delay + 200);
    return () => clearTimeout(t);
  }, [pct, delay]);
  return (
    <div className="w-full h-2.5 rounded-full" style={{ background: '#1E293B' }}>
      <div
        className="h-full rounded-full"
        style={{
          width: `${width}%`,
          background: color,
          transition: 'width 1s cubic-bezier(0.34, 1.56, 0.64, 1)',
          boxShadow: `0 0 8px ${color}60`,
        }}
      />
    </div>
  );
}

const VERDICT_CONFIG = {
  safe: {
    color: '#22C55E',
    bg: 'rgba(34,197,94,0.06)',
    border: 'rgba(34,197,94,0.2)',
    glow: 'rgba(34,197,94,0.15)',
    icon: ShieldCheck,
    label: 'Safe to Proceed',
    emoji: '✅',
  },
  risky: {
    color: '#F59E0B',
    bg: 'rgba(245,158,11,0.06)',
    border: 'rgba(245,158,11,0.2)',
    glow: 'rgba(245,158,11,0.15)',
    icon: AlertTriangle,
    label: 'Proceed with Caution',
    emoji: '⚠️',
  },
  'not-recommended': {
    color: '#EF4444',
    bg: 'rgba(239,68,68,0.06)',
    border: 'rgba(239,68,68,0.2)',
    glow: 'rgba(239,68,68,0.15)',
    icon: XCircle,
    label: 'Not Recommended',
    emoji: '❌',
  },
};

function VerdictCard({ result }: { result: AnalysisResult }) {
  const cfg = VERDICT_CONFIG[result.verdict];
  const Icon = cfg.icon;
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative rounded-2xl p-8 text-center overflow-hidden"
      style={{
        background: cfg.bg,
        border: `1.5px solid ${cfg.border}`,
        boxShadow: `0 0 60px ${cfg.glow}, 0 32px 80px rgba(0,0,0,0.3)`,
      }}
    >
      {/* Background radial */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: `radial-gradient(ellipse 60% 50% at 50% 0%, ${cfg.glow} 0%, transparent 70%)` }}
      />

      <div className="relative">
        {/* Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.2 }}
          className="w-20 h-20 rounded-full mx-auto mb-5 flex items-center justify-center"
          style={{ background: `rgba(${result.verdict === 'safe' ? '34,197,94' : result.verdict === 'risky' ? '245,158,11' : '239,68,68'},0.15)`, boxShadow: `0 0 30px ${cfg.glow}` }}
        >
          <Icon size={36} style={{ color: cfg.color }} />
        </motion.div>

        {/* Verdict label */}
        <div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4"
          style={{ background: `rgba(${result.verdict === 'safe' ? '34,197,94' : result.verdict === 'risky' ? '245,158,11' : '239,68,68'},0.12)`, border: `1px solid ${cfg.border}` }}
        >
          <span style={{ fontSize: '12px', fontWeight: 700, color: cfg.color, letterSpacing: '0.08em' }}>
            VERDICT
          </span>
        </div>

        <h2 style={{ fontSize: '28px', fontWeight: 800, color: cfg.color, letterSpacing: '-0.02em', marginBottom: '12px' }}>
          {cfg.emoji} {cfg.label}
        </h2>
        <p style={{ fontSize: '17px', color: '#94A3B8', maxWidth: '500px', margin: '0 auto', lineHeight: 1.6 }}>
          {result.verdictMessage}
        </p>

        {result.verdict === 'not-recommended' && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-5 inline-flex items-center gap-2 px-4 py-2 rounded-lg"
            style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)' }}
          >
            <AlertTriangle size={14} style={{ color: '#EF4444' }} />
            <span style={{ fontSize: '13px', color: '#FCA5A5', fontWeight: 500 }}>
              This decision could lead to financial stress
            </span>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

function ComparisonTable({ result }: { result: AnalysisResult }) {
  const rows = [
    {
      metric: 'Liquid Savings',
      before: formatCurrencyFull(result.before.savings),
      after: formatCurrencyFull(Math.max(0, result.after.savings)),
      worse: result.after.savings < result.before.savings,
    },
    {
      metric: 'EMI Load',
      before: result.before.emiLoad > 0 ? `${result.before.emiLoad.toFixed(0)}%` : 'Nil',
      after: result.after.emiLoad > 0 ? `${result.after.emiLoad.toFixed(1)}%` : 'Nil',
      worse: result.after.emiLoad > result.before.emiLoad,
    },
    {
      metric: 'Monthly Free Cash',
      before: formatCurrencyFull(Math.max(0, result.before.monthlyFreeCash)),
      after: formatCurrencyFull(Math.abs(result.after.monthlyFreeCash)),
      afterNegative: result.after.monthlyFreeCash < 0,
      worse: result.after.monthlyFreeCash < result.before.monthlyFreeCash,
    },
    {
      metric: 'Emergency Fund',
      before: `${result.before.emergencyMonths.toFixed(1)} months`,
      after: `${result.after.emergencyMonths.toFixed(1)} months`,
      worse: result.after.emergencyMonths < result.before.emergencyMonths,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="rounded-2xl overflow-hidden"
      style={{ background: '#0F172A', border: '1px solid #1E293B' }}
    >
      <div className="px-6 py-4 border-b border-[#1E293B]">
        <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#FFFFFF' }}>
          Before vs After
        </h3>
        <p style={{ fontSize: '13px', color: '#475569', marginTop: '2px' }}>
          How this purchase changes your financial picture
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr style={{ background: '#060D1A' }}>
              {['Metric', 'Before', 'After Purchase'].map((h, i) => (
                <th
                  key={h}
                  className="px-6 py-3"
                  style={{
                    fontSize: '11px',
                    color: '#475569',
                    fontWeight: 700,
                    letterSpacing: '0.06em',
                    textAlign: i === 0 ? 'left' : 'right',
                    borderBottom: '1px solid #1E293B',
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <motion.tr
                key={row.metric}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.05 }}
                style={{ borderBottom: i < rows.length - 1 ? '1px solid #0B1120' : 'none' }}
              >
                <td className="px-6 py-4">
                  <span style={{ fontSize: '14px', color: '#94A3B8', fontWeight: 500 }}>{row.metric}</span>
                </td>
                <td className="px-6 py-4 text-right">
                  <span style={{ fontSize: '14px', color: '#FFFFFF', fontWeight: 600 }}>{row.before}</span>
                </td>
                <td className="px-6 py-4 text-right">
                  <span
                    style={{
                      fontSize: '14px',
                      fontWeight: 700,
                      color: (row as any).afterNegative
                        ? '#EF4444'
                        : row.worse
                        ? '#F59E0B'
                        : '#22C55E',
                    }}
                  >
                    {(row as any).afterNegative ? '−' : ''}{row.after}
                  </span>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}

function MetricCards({
  result,
  showOpportunityCost,
}: {
  result: AnalysisResult;
  showOpportunityCost: boolean;
}) {
  const emergencyPct = (result.after.emergencyMonths / 6) * 100;
  const emiPct = result.after.emiLoad;
  const balancePct = result.before.monthlyFreeCash > 0
    ? (Math.max(0, result.after.monthlyFreeCash) / result.before.monthlyFreeCash) * 100
    : 0;

  const emergencyColor =
    result.after.emergencyMonths >= 6
      ? '#22C55E'
      : result.after.emergencyMonths >= 3
      ? '#F59E0B'
      : '#EF4444';
  const emiColor = emiPct > 40 ? '#EF4444' : emiPct > 30 ? '#F59E0B' : '#6366F1';
  const balanceColor = result.after.monthlyFreeCash < 0 ? '#EF4444' : result.after.monthlyFreeCash < result.before.monthlyFreeCash * 0.3 ? '#F59E0B' : '#22C55E';

  const cards = [
    {
      icon: ShieldCheck,
      iconColor: emergencyColor,
      iconBg: `rgba(${result.after.emergencyMonths >= 6 ? '34,197,94' : result.after.emergencyMonths >= 3 ? '245,158,11' : '239,68,68'},0.1)`,
      label: 'Emergency Fund',
      value: `${result.after.emergencyMonths.toFixed(1)} months`,
      sub: 'remaining after purchase',
      showBar: true,
      pct: emergencyPct,
      barColor: emergencyColor,
      barLabel: `${Math.min(100, emergencyPct).toFixed(0)}% of 6-month goal`,
    },
    {
      icon: BarChart3,
      iconColor: emiColor,
      iconBg: `rgba(${emiPct > 40 ? '239,68,68' : emiPct > 30 ? '245,158,11' : '99,102,241'},0.1)`,
      label: 'EMI Load',
      value: result.after.emiLoad > 0 ? `${result.after.emiLoad.toFixed(1)}% of income` : 'No EMI',
      sub: result.after.emiLoad > 0 ? (emiPct > 40 ? 'Exceeds safe limit' : emiPct > 30 ? 'Approaching limit' : 'Within safe zone') : 'Cash payment',
      showBar: result.after.emiLoad > 0,
      pct: emiPct,
      barColor: emiColor,
      barLabel: 'Safe limit: 40%',
    },
    {
      icon: Wallet,
      iconColor: balanceColor,
      iconBg: `rgba(${result.after.monthlyFreeCash < 0 ? '239,68,68' : '34,197,94'},0.1)`,
      label: 'Monthly Balance',
      value: result.after.monthlyFreeCash < 0
        ? `−${formatCurrencyFull(Math.abs(result.after.monthlyFreeCash))}`
        : formatCurrencyFull(result.after.monthlyFreeCash),
      sub: result.after.monthlyFreeCash < 0 ? 'Cash flow turns negative' : 'left each month',
      showBar: result.before.monthlyFreeCash > 0,
      pct: balancePct,
      barColor: balanceColor,
      barLabel: `vs ${formatCurrencyFull(result.before.monthlyFreeCash)} before`,
    },
  ];

  if (showOpportunityCost && result.opportunityCost.invested > 0) {
    cards.push({
      icon: TrendingUp,
      iconColor: '#F59E0B',
      iconBg: 'rgba(245,158,11,0.1)',
      label: 'Opportunity Cost',
      value: `${formatCurrency(result.opportunityCost.invested)} → ${formatCurrency(result.opportunityCost.futureValue)}`,
      sub: `in ${result.opportunityCost.years} years at 12% p.a.`,
      showBar: true,
      pct: (result.opportunityCost.invested / result.opportunityCost.futureValue) * 100,
      barColor: '#F59E0B',
      barLabel: 'Potential growth if invested',
    });
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, i) => {
        const Icon = card.icon;
        return (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.08 }}
            className="rounded-2xl p-5"
            style={{ background: '#0F172A', border: '1px solid #1E293B' }}
          >
            <div className="flex items-center justify-between mb-4">
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center"
                style={{ background: card.iconBg }}
              >
                <Icon size={17} style={{ color: card.iconColor }} />
              </div>
            </div>
            <div style={{ fontSize: '11px', color: '#475569', fontWeight: 600, letterSpacing: '0.04em', marginBottom: '6px' }}>
              {card.label.toUpperCase()}
            </div>
            <div style={{ fontSize: '18px', fontWeight: 800, color: card.iconColor, letterSpacing: '-0.02em', marginBottom: '3px' }}>
              {card.value}
            </div>
            <div style={{ fontSize: '12px', color: '#334155', marginBottom: card.showBar ? '12px' : '0' }}>
              {card.sub}
            </div>
            {card.showBar && (
              <div>
                <AnimatedBar pct={card.pct} color={card.barColor} delay={i * 100} />
                <div style={{ fontSize: '10px', color: '#334155', marginTop: '5px' }}>
                  {card.barLabel}
                </div>
              </div>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}

function ReasonCards({ reasons, verdict }: { reasons: string[]; verdict: string }) {
  const icons = [CheckCircle2, Info, Zap];
  const verdictColor = verdict === 'safe' ? '#22C55E' : verdict === 'risky' ? '#F59E0B' : '#EF4444';
  const verdictBg = verdict === 'safe' ? 'rgba(34,197,94,0.06)' : verdict === 'risky' ? 'rgba(245,158,11,0.06)' : 'rgba(239,68,68,0.06)';
  const verdictBorder = verdict === 'safe' ? 'rgba(34,197,94,0.15)' : verdict === 'risky' ? 'rgba(245,158,11,0.15)' : 'rgba(239,68,68,0.15)';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="rounded-2xl overflow-hidden"
      style={{ background: '#0F172A', border: '1px solid #1E293B' }}
    >
      <div className="px-6 py-4 border-b border-[#1E293B]">
        <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#FFFFFF' }}>
          Why This Verdict?
        </h3>
        <p style={{ fontSize: '13px', color: '#475569', marginTop: '2px' }}>
          Key factors that drove this analysis
        </p>
      </div>
      <div className="p-4 space-y-3">
        {reasons.map((reason, i) => {
          const Icon = icons[i] || CheckCircle2;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + i * 0.1 }}
              className="flex items-start gap-3 p-4 rounded-xl"
              style={{ background: verdictBg, border: `1px solid ${verdictBorder}` }}
            >
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                style={{ background: `rgba(${verdict === 'safe' ? '34,197,94' : verdict === 'risky' ? '245,158,11' : '239,68,68'},0.15)` }}
              >
                <Icon size={14} style={{ color: verdictColor }} />
              </div>
              <p style={{ fontSize: '14px', color: '#CBD5E1', lineHeight: 1.6 }}>{reason}</p>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

function SuggestionCard({ suggestion, verdict }: { suggestion: string; verdict: string }) {
  const verdictColor = verdict === 'safe' ? '#22C55E' : verdict === 'risky' ? '#F59E0B' : '#EF4444';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="rounded-2xl p-6"
      style={{
        background: 'linear-gradient(135deg, #0F172A 0%, #1A1040 100%)',
        border: '1px solid rgba(99,102,241,0.2)',
      }}
    >
      <div className="flex items-start gap-4">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.2)' }}
        >
          <DollarSign size={18} style={{ color: '#818CF8' }} />
        </div>
        <div>
          <div style={{ fontSize: '13px', color: '#6366F1', fontWeight: 700, letterSpacing: '0.06em', marginBottom: '8px' }}>
            💡 SUGGESTED ACTION
          </div>
          <p style={{ fontSize: '15px', color: '#CBD5E1', lineHeight: 1.7 }}>{suggestion}</p>
        </div>
      </div>
    </motion.div>
  );
}

export function ResultsPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as { data: FinancialInput; result: AnalysisResult } | null;

  if (!state || !state.result) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center" style={{ background: '#020617' }}>
        <Navbar />
        <div className="text-center px-6">
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔍</div>
          <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#FFFFFF', marginBottom: '8px' }}>
            No analysis found
          </h2>
          <p style={{ fontSize: '15px', color: '#475569', marginBottom: '24px' }}>
            Please complete the wizard to see your results.
          </p>
          <button
            onClick={() => navigate('/analyze')}
            className="px-6 py-3 rounded-xl text-white"
            style={{ background: '#6366F1', fontSize: '15px', fontWeight: 600 }}
          >
            Start Analysis
          </button>
        </div>
      </div>
    );
  }

  const { data, result } = state;

  return (
    <div className="min-h-screen pt-16" style={{ background: '#020617' }}>
      <Navbar />

      {/* BG glow */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(ellipse 70% 40% at 50% -5%, ${
            result.verdict === 'safe'
              ? 'rgba(34,197,94,0.05)'
              : result.verdict === 'risky'
              ? 'rgba(245,158,11,0.05)'
              : 'rgba(239,68,68,0.05)'
          } 0%, transparent 70%)`,
        }}
      />

      <div className="max-w-[1100px] mx-auto px-4 py-10 relative space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.02em' }}>
              Your Financial Analysis
            </h1>
            <p style={{ fontSize: '14px', color: '#475569', marginTop: '2px' }}>
              Based on the details you provided
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/analyze')}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all duration-200"
              style={{
                background: '#0F172A',
                border: '1px solid #1E293B',
                color: '#94A3B8',
                fontSize: '14px',
                fontWeight: 600,
              }}
            >
              <ArrowLeft size={15} />
              Adjust Inputs
            </button>
            <button
              onClick={() => navigate('/analyze')}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-white transition-all duration-200"
              style={{
                background: '#6366F1',
                fontSize: '14px',
                fontWeight: 600,
                boxShadow: '0 4px 16px rgba(99,102,241,0.3)',
              }}
            >
              <RefreshCw size={15} />
              Recalculate
            </button>
          </div>
        </div>

        {/* Verdict Card */}
        <VerdictCard result={result} />

        {/* Summary chips */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap gap-3"
        >
          {[
            {
              label: 'Purchase Amount',
              val: formatCurrencyFull(data.expenseAmount),
              icon: '💰',
            },
            {
              label: 'Payment Type',
              val: data.paymentType === 'emi'
                ? `EMI — ${formatCurrencyFull(result.monthlyEmi)}/mo`
                : 'One-time Cash',
              icon: '💳',
            },
            {
              label: 'Monthly Income',
              val: formatCurrencyFull(data.monthlyIncome),
              icon: '📊',
            },
          ].map((chip) => (
            <div
              key={chip.label}
              className="px-4 py-2 rounded-xl flex items-center gap-2"
              style={{ background: '#0F172A', border: '1px solid #1E293B' }}
            >
              <span style={{ fontSize: '14px' }}>{chip.icon}</span>
              <span style={{ fontSize: '12px', color: '#475569' }}>{chip.label}:</span>
              <span style={{ fontSize: '13px', color: '#FFFFFF', fontWeight: 600 }}>{chip.val}</span>
            </div>
          ))}
        </motion.div>

        {/* Metric Cards */}
        <MetricCards result={result} showOpportunityCost={data.includeOpportunityCost} />

        {/* Before vs After */}
        <ComparisonTable result={result} />

        {/* Why verdict */}
        <ReasonCards reasons={result.reasons} verdict={result.verdict} />

        {/* Suggestion */}
        <SuggestionCard suggestion={result.suggestion} verdict={result.verdict} />

        {/* Bottom CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex items-center justify-center gap-4 pt-2 pb-8"
        >
          <button
            onClick={() => navigate('/analyze')}
            className="flex items-center gap-2 px-6 py-3 rounded-xl transition-all duration-200"
            style={{
              background: '#0F172A',
              border: '1px solid #1E293B',
              color: '#94A3B8',
              fontSize: '15px',
              fontWeight: 600,
            }}
          >
            <ArrowLeft size={16} />
            Adjust Inputs
          </button>
          <button
            onClick={() => navigate('/analyze')}
            className="flex items-center gap-2 px-6 py-3 rounded-xl text-white transition-all duration-200"
            style={{
              background: 'linear-gradient(135deg, #6366F1 0%, #4F46E5 100%)',
              boxShadow: '0 8px 24px rgba(99,102,241,0.35)',
              fontSize: '15px',
              fontWeight: 600,
            }}
          >
            <RefreshCw size={16} />
            Analyze Another Decision
          </button>
        </motion.div>
      </div>
    </div>
  );
}