import { TrendingUp, Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import { Button } from '../ui/button';
import { cn } from '../../utils/cn';

export function Navbar() {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-secondary-800 bg-secondary-950/90 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2.5 group transition-transform hover:scale-105"
          aria-label="Navigate to home"
        >
          <div className="w-8 h-8 rounded-lg bg-primary-500 flex items-center justify-center shadow-glow">
            <TrendingUp size={16} className="text-white" />
          </div>
          <span className="text-white text-sm sm:text-base font-semibold tracking-tight">
            Drishti
          </span>
        </button>
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-3">
          <Button
            variant="ghost"
            onClick={() => navigate('/analyze')}
            className="text-muted-foreground hover:text-white"
          >
            Analyze
          </Button>
          <Button
            variant="default"
            onClick={() => navigate('/analyze')}
            size="sm"
            className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 shadow-glow hover:shadow-glow-lg transform hover:-translate-y-0.5 transition-all duration-200"
          >
            Get Started
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden text-muted-foreground hover:text-white"
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </Button>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          "md:hidden fixed inset-0 z-40 transition-all duration-300",
          isMobileMenuOpen 
            ? 'opacity-100 pointer-events-auto' 
            : 'opacity-0 pointer-events-none'
        )}
      >
        <div className="absolute inset-0 bg-secondary-950/95 backdrop-blur-xl" />
        <div
          className={cn(
            "relative flex flex-col items-center justify-center h-full transition-all duration-300 transform",
            isMobileMenuOpen ? 'translate-y-0' : 'translate-y-4'
          )}
        >
          <nav className="flex flex-col items-center gap-8">
            <Button
              variant="ghost"
              size="lg"
              onClick={() => {
                navigate('/analyze');
                setIsMobileMenuOpen(false);
              }}
              className="text-xl text-muted-foreground hover:text-white"
            >
              Analyze
            </Button>
            <Button
              variant="default"
              size="lg"
              onClick={() => {
                navigate('/analyze');
                setIsMobileMenuOpen(false);
              }}
              className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 shadow-glow hover:shadow-glow-lg transform hover:-translate-y-0.5 transition-all duration-200"
            >
              Get Started
            </Button>
          </nav>
        </div>
      </div>
    </nav>
  );
}
