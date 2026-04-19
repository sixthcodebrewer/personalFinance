import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import {
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  Wallet,
  BarChart3,
  CheckCircle2,
  Zap,
  Star,
} from 'lucide-react';
import { Navbar } from '../shared/Navbar';

const features = [
  {
    icon: Wallet,
    title: 'Savings Impact',
    desc: 'See exactly how much your liquid savings will shrink and whether you stay above safe limits.',
    color: '#6366F1',
    bg: 'rgba(99,102,241,0.1)',
  },
  {
    icon: BarChart3,
    title: 'EMI Burden',
    desc: 'Understand your total EMI load as a % of income before committing to an installment plan.',
    color: '#818CF8',
    bg: 'rgba(129,140,248,0.1)',
  },
  {
    icon: TrendingUp,
    title: 'Cash Flow Health',
    desc: 'Know your monthly breathing room after all expenses and EMIs have been accounted for.',
    color: '#22C55E',
    bg: 'rgba(34,197,94,0.1)',
  },
  {
    icon: Zap,
    title: 'Opportunity Cost',
    desc: 'Discover the long-term wealth you could be building instead — the real cost of spending now.',
    color: '#F59E0B',
    bg: 'rgba(245,158,11,0.1)',
  },
];

const steps = [
  { num: '01', label: 'Enter your income & expenses' },
  { num: '02', label: 'Add your savings & planned purchase' },
  { num: '03', label: 'Get a clear, instant verdict' },
];

function DashboardPreview() {
  return (
    <div
      className="relative w-full max-w-[520px] mx-auto"
      style={{ perspective: '1000px' }}
    >
      <motion.div
        initial={{ opacity: 0, y: 40, rotateX: 8 }}
        animate={{ opacity: 1, y: 0, rotateX: 4 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Main card */}
        <div
          className="rounded-2xl border border-[#1E293B] overflow-hidden"
          style={{
            background: '#0F172A',
            boxShadow: '0 32px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(99,102,241,0.1)',
          }}
        >
          {/* Verdict Banner */}
          <div
            className="px-6 py-5 flex items-center gap-3 border-b border-[#1E293B]"
            style={{ background: 'rgba(34,197,94,0.05)' }}
          >
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: 'rgba(34,197,94,0.15)' }}
            >
              <ShieldCheck size={20} style={{ color: '#22C55E' }} />
            </div>
            <div>
              <div style={{ fontSize: '11px', fontWeight: 600, color: '#22C55E', letterSpacing: '0.08em' }}>
                VERDICT
              </div>
              <div style={{ fontSize: '15px', fontWeight: 600, color: '#FFFFFF' }}>
                ✅ Safe to Proceed
              </div>
            </div>
            <div className="ml-auto">
              <span
                className="px-3 py-1 rounded-full text-xs"
                style={{ background: 'rgba(34,197,94,0.15)', color: '#22C55E', fontWeight: 600 }}
              >
                SAFE
              </span>
            </div>
          </div>

          {/* Metrics Grid */}
          <div className="p-5 grid grid-cols-2 gap-3">
            {[
              { label: 'Emergency Fund', val: '7.2 months', pct: 72, color: '#22C55E' },
              { label: 'EMI Load', val: '22% of income', pct: 22, color: '#6366F1' },
              { label: 'Monthly Balance', val: '₹18,500', pct: 65, color: '#818CF8' },
              { label: 'Opportunity Cost', val: '₹1L → ₹3.1L', pct: 55, color: '#F59E0B' },
            ].map((m) => (
              <div
                key={m.label}
                className="rounded-xl p-3.5"
                style={{ background: '#0B1120', border: '1px solid #1E293B' }}
              >
                <div style={{ fontSize: '11px', color: '#94A3B8', fontWeight: 500, marginBottom: '4px' }}>
                  {m.label}
                </div>
                <div style={{ fontSize: '13px', color: '#FFFFFF', fontWeight: 600, marginBottom: '8px' }}>
                  {m.val}
                </div>
                <div className="w-full h-1.5 rounded-full" style={{ background: '#1E293B' }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${m.pct}%` }}
                    transition={{ duration: 1, delay: 0.8 }}
                    className="h-full rounded-full"
                    style={{ background: m.color }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Before/After */}
          <div className="px-5 pb-5">
            <div
              className="rounded-xl overflow-hidden"
              style={{ border: '1px solid #1E293B' }}
            >
              <div
                className="grid grid-cols-3 px-4 py-2"
                style={{ background: '#060D1A', borderBottom: '1px solid #1E293B' }}
              >
                {['Metric', 'Before', 'After'].map((h) => (
                  <div key={h} style={{ fontSize: '11px', color: '#475569', fontWeight: 600 }}>
                    {h}
                  </div>
                ))}
              </div>
              {[
                { metric: 'Savings', before: '₹3.2L', after: '₹2.7L' },
                { metric: 'Free Cash', before: '₹24K', after: '₹18.5K' },
              ].map((row) => (
                <div
                  key={row.metric}
                  className="grid grid-cols-3 px-4 py-2.5"
                  style={{ borderBottom: '1px solid #0F172A' }}
                >
                  <div style={{ fontSize: '12px', color: '#94A3B8' }}>{row.metric}</div>
                  <div style={{ fontSize: '12px', color: '#FFFFFF', fontWeight: 500 }}>{row.before}</div>
                  <div style={{ fontSize: '12px', color: '#22C55E', fontWeight: 500 }}>{row.after}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Floating badge */}
        <motion.div
          className="absolute -top-4 -right-4 rounded-xl px-4 py-2.5 flex items-center gap-2"
          style={{
            background: '#312E81',
            border: '1px solid rgba(129,140,248,0.3)',
            boxShadow: '0 8px 24px rgba(99,102,241,0.3)',
          }}
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Star size={14} style={{ color: '#818CF8' }} />
          <span style={{ fontSize: '12px', color: '#C7D2FE', fontWeight: 600 }}>AI-Powered Analysis</span>
        </motion.div>

        {/* Floating metric chip */}
        <motion.div
          className="absolute -bottom-4 -left-4 rounded-xl px-4 py-2.5"
          style={{
            background: '#0F172A',
            border: '1px solid #1E293B',
            boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
          }}
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        >
          <div style={{ fontSize: '11px', color: '#94A3B8', fontWeight: 500 }}>Opportunity Cost</div>
          <div style={{ fontSize: '14px', color: '#F59E0B', fontWeight: 700 }}>₹1L → ₹3.1L in 10y</div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen" style={{ background: '#020617', color: '#FFFFFF' }}>
      <Navbar />

      {/* Hero */}
      <section
        className="relative pt-32 pb-24 px-6 overflow-hidden"
        style={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}
      >
        {/* Background elements */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(ellipse 80% 50% at 50% -10%, rgba(99,102,241,0.15) 0%, transparent 70%)`,
          }}
        />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(#818CF8 1px, transparent 1px), linear-gradient(90deg, #818CF8 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />

        <div className="max-w-[1200px] mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
                  style={{
                    background: 'rgba(99,102,241,0.1)',
                    border: '1px solid rgba(99,102,241,0.2)',
                  }}
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-[#6366F1] animate-pulse" />
                  <span style={{ fontSize: '13px', color: '#818CF8', fontWeight: 500 }}>
                    Smart Financial Decision Making
                  </span>
                </div>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                style={{
                  fontSize: 'clamp(36px, 5vw, 58px)',
                  fontWeight: 800,
                  lineHeight: 1.1,
                  letterSpacing: '-0.03em',
                  marginBottom: '20px',
                }}
              >
                Can You Really
                <span
                  style={{
                    display: 'block',
                    background: 'linear-gradient(135deg, #818CF8 0%, #6366F1 50%, #4F46E5 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  Afford This?
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                style={{
                  fontSize: '18px',
                  color: '#94A3B8',
                  lineHeight: 1.7,
                  marginBottom: '36px',
                  maxWidth: '460px',
                }}
              >
                Before you spend, check how this decision impacts your savings, EMI burden,
                monthly cash flow, and long-term wealth — in seconds.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <button
                  onClick={() => navigate('/analyze')}
                  className="group flex items-center justify-center gap-3 px-8 py-4 rounded-xl text-white transition-all duration-300"
                  style={{
                    background: 'linear-gradient(135deg, #6366F1 0%, #4F46E5 100%)',
                    boxShadow: '0 8px 32px rgba(99,102,241,0.4)',
                    fontSize: '16px',
                    fontWeight: 600,
                  }}
                >
                  Analyze My Decision
                  <ArrowRight
                    size={18}
                    className="group-hover:translate-x-1 transition-transform duration-200"
                  />
                </button>
                <button
                  onClick={() => navigate('/analyze')}
                  className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl transition-all duration-200"
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: '#94A3B8',
                    fontSize: '16px',
                    fontWeight: 500,
                  }}
                >
                  See how it works
                </button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="flex items-center gap-6 mt-10"
              >
                {[
                  { val: '50K+', label: 'Decisions Analyzed' },
                  { val: '4 Steps', label: 'Quick Setup' },
                  { val: '100%', label: 'Free to Use' },
                ].map((s) => (
                  <div key={s.label}>
                    <div style={{ fontSize: '20px', fontWeight: 700, color: '#FFFFFF' }}>{s.val}</div>
                    <div style={{ fontSize: '12px', color: '#475569', fontWeight: 500 }}>{s.label}</div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right - Dashboard Preview */}
            <div className="hidden lg:block">
              <DashboardPreview />
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-6 border-t border-[#0F172A]">
        <div className="max-w-[1200px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <div style={{ fontSize: '13px', color: '#6366F1', fontWeight: 600, letterSpacing: '0.08em', marginBottom: '12px' }}>
              HOW IT WORKS
            </div>
            <h2 style={{ fontSize: '32px', fontWeight: 700, color: '#FFFFFF', letterSpacing: '-0.02em' }}>
              Three steps to clarity
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative p-6 rounded-2xl"
                style={{ background: '#0F172A', border: '1px solid #1E293B' }}
              >
                <div
                  style={{
                    fontSize: '48px',
                    fontWeight: 800,
                    color: 'rgba(99,102,241,0.15)',
                    lineHeight: 1,
                    marginBottom: '12px',
                    letterSpacing: '-0.04em',
                  }}
                >
                  {step.num}
                </div>
                <div style={{ fontSize: '16px', fontWeight: 600, color: '#FFFFFF' }}>{step.label}</div>
                {i < steps.length - 1 && (
                  <div
                    className="hidden md:block absolute top-1/2 -right-3 -translate-y-1/2"
                    style={{ color: '#1E293B', zIndex: 10 }}
                  >
                    <ArrowRight size={20} style={{ color: '#334155' }} />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6">
        <div className="max-w-[1200px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <div style={{ fontSize: '13px', color: '#6366F1', fontWeight: 600, letterSpacing: '0.08em', marginBottom: '12px' }}>
              WHAT WE ANALYZE
            </div>
            <h2 style={{ fontSize: '32px', fontWeight: 700, color: '#FFFFFF', letterSpacing: '-0.02em' }}>
              Complete financial picture
            </h2>
            <p style={{ fontSize: '16px', color: '#94A3B8', marginTop: '12px', maxWidth: '500px', margin: '12px auto 0' }}>
              We don't just give you a number. We give you a full breakdown of every financial consequence.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="p-6 rounded-2xl group hover:border-[#2D3748] transition-all duration-300"
                  style={{ background: '#0F172A', border: '1px solid #1E293B' }}
                >
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                    style={{ background: f.bg }}
                  >
                    <Icon size={20} style={{ color: f.color }} />
                  </div>
                  <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#FFFFFF', marginBottom: '8px' }}>
                    {f.title}
                  </h3>
                  <p style={{ fontSize: '14px', color: '#64748B', lineHeight: 1.6 }}>{f.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Verdict preview */}
      <section className="py-20 px-6">
        <div className="max-w-[1200px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl p-10 text-center"
            style={{
              background: 'linear-gradient(135deg, #0F172A 0%, #1E1B4B 100%)',
              border: '1px solid rgba(99,102,241,0.2)',
            }}
          >
            <div style={{ fontSize: '13px', color: '#818CF8', fontWeight: 600, letterSpacing: '0.08em', marginBottom: '16px' }}>
              CLEAR VERDICTS
            </div>
            <h2 style={{ fontSize: '28px', fontWeight: 700, color: '#FFFFFF', marginBottom: '12px' }}>
              No confusing jargon. Just a clear verdict.
            </h2>
            <p style={{ fontSize: '16px', color: '#94A3B8', maxWidth: '500px', margin: '0 auto 32px' }}>
              You'll get one of three verdicts — with full reasoning, a comparison table, and actionable advice.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              {[
                { label: '✅  Safe', color: '#22C55E', bg: 'rgba(34,197,94,0.1)', border: 'rgba(34,197,94,0.2)' },
                { label: '⚠️  Risky', color: '#F59E0B', bg: 'rgba(245,158,11,0.1)', border: 'rgba(245,158,11,0.2)' },
                { label: '❌  Not Recommended', color: '#EF4444', bg: 'rgba(239,68,68,0.1)', border: 'rgba(239,68,68,0.2)' },
              ].map((v) => (
                <div
                  key={v.label}
                  className="px-6 py-3 rounded-xl"
                  style={{
                    background: v.bg,
                    border: `1px solid ${v.border}`,
                    color: v.color,
                    fontSize: '15px',
                    fontWeight: 600,
                  }}
                >
                  {v.label}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6">
        <div className="max-w-[600px] mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 style={{ fontSize: '36px', fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.02em', marginBottom: '16px' }}>
              Think before you spend.
            </h2>
            <p style={{ fontSize: '18px', color: '#94A3B8', marginBottom: '32px' }}>
              It only takes 2 minutes. Your future self will thank you.
            </p>
            <button
              onClick={() => navigate('/analyze')}
              className="group inline-flex items-center gap-3 px-10 py-4 rounded-xl text-white transition-all duration-300"
              style={{
                background: 'linear-gradient(135deg, #6366F1 0%, #4F46E5 100%)',
                boxShadow: '0 12px 40px rgba(99,102,241,0.5)',
                fontSize: '17px',
                fontWeight: 600,
              }}
            >
              Start Your Analysis
              <ArrowRight
                size={20}
                className="group-hover:translate-x-1 transition-transform duration-200"
              />
            </button>
            <div className="flex items-center justify-center gap-6 mt-8">
              {['No signup required', 'Instant results', 'Completely free'].map((t) => (
                <div key={t} className="flex items-center gap-1.5">
                  <CheckCircle2 size={14} style={{ color: '#6366F1' }} />
                  <span style={{ fontSize: '13px', color: '#64748B' }}>{t}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#0F172A] py-8 px-6">
        <div className="max-w-[1200px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-[#6366F1] flex items-center justify-center">
              <TrendingUp size={12} className="text-white" />
            </div>
            <span style={{ fontSize: '13px', color: '#475569', fontWeight: 500 }}>
              Financial Decision Analyzer
            </span>
          </div>
          <p style={{ fontSize: '13px', color: '#334155' }}>
            © 2026 · Think before you spend
          </p>
        </div>
      </footer>
    </div>
  );
}
