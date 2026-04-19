import { TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router';

export function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-[#1E293B]"
      style={{ background: 'rgba(2, 6, 23, 0.85)', backdropFilter: 'blur(12px)' }}>
      <div className="max-w-[1200px] mx-auto px-6 h-16 flex items-center justify-between">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2.5 group"
        >
          <div className="w-8 h-8 rounded-lg bg-[#6366F1] flex items-center justify-center shadow-lg"
            style={{ boxShadow: '0 0 16px rgba(99,102,241,0.4)' }}>
            <TrendingUp size={16} className="text-white" />
          </div>
          <span className="text-white" style={{ fontSize: '15px', fontWeight: 600, letterSpacing: '-0.01em' }}>
            Financial Decision Analyzer
          </span>
        </button>
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/analyze')}
            className="px-4 py-2 rounded-lg text-[#94A3B8] hover:text-white transition-colors duration-200"
            style={{ fontSize: '14px', fontWeight: 500 }}
          >
            Analyze
          </button>
          <button
            onClick={() => navigate('/analyze')}
            className="px-4 py-2 rounded-lg bg-[#6366F1] hover:bg-[#5558E3] text-white transition-all duration-200"
            style={{ fontSize: '14px', fontWeight: 500 }}
          >
            Get Started
          </button>
        </div>
      </div>
    </nav>
  );
}
