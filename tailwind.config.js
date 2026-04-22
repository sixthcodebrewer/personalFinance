/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary brand — indigo
        primary: {
          50:  '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',   // ← main brand indigo (matches glow & CTA)
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
          950: '#1e1b4b',
        },
        // Navy surface scale — background → elevated cards
        navy: {
          950: '#080d1a',   // ← page background
          900: '#0e1527',   // ← nav / secondary surface
          800: '#141d35',   // ← cards, glass panels
          700: '#1b2540',   // ← elevated cards, popovers
          600: '#1e2a4a',
          500: '#253356',
        },
        // Lavender / text accents
        lavender: {
          DEFAULT: '#c0c1ff',
          muted:   '#9a99c0',
          dim:     '#64648a',
        },
        // Semantic
        success: {
          50:  '#f0fdf4',
          500: '#22c55e',
          600: '#16a34a',
        },
        destructive: {
          50:  '#fef2f2',
          500: '#ef4444',
          600: '#dc2626',
        },
        warning: {
          50:  '#fffbeb',
          500: '#f59e0b',
          600: '#d97706',
        },
      },

      fontFamily: {
        sans:  ['DM Sans', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
        mono:  ['JetBrains Mono', 'Fira Code', 'monospace'],
      },

      fontSize: {
        xs:   ['0.75rem',  { lineHeight: '1rem',    letterSpacing: '0.05em' }],
        sm:   ['0.875rem', { lineHeight: '1.25rem' }],
        base: ['1rem',     { lineHeight: '1.5rem'  }],
        lg:   ['1.125rem', { lineHeight: '1.75rem' }],
        xl:   ['1.25rem',  { lineHeight: '1.75rem' }],
        '2xl':['1.5rem',   { lineHeight: '2rem'    }],
        '3xl':['1.875rem', { lineHeight: '2.25rem' }],
        '4xl':['2.25rem',  { lineHeight: '2.5rem'  }],
        '5xl':['3rem',     { lineHeight: '1.05'    }],
        '6xl':['3.75rem',  { lineHeight: '1'       }],
        '7xl':['4.5rem',   { lineHeight: '1'       }],
        '8xl':['6rem',     { lineHeight: '1'       }],
        '9xl':['8rem',     { lineHeight: '1'       }],
      },

      fontWeight: {
        normal:    '400',
        medium:    '500',
        semibold:  '600',
        bold:      '700',
        extrabold: '800',   // ← used on hero headline
        black:     '900',
      },

      letterSpacing: {
        tightest: '-0.04em',
        tighter:  '-0.03em',  // ← hero h1
        tight:    '-0.02em',  // ← h2
        normal:   '0em',
        wide:     '0.025em',
        wider:    '0.1em',
        widest:   '0.2em',
      },

      spacing: {
        '18':  '4.5rem',
        '88':  '22rem',
        '112': '28rem',
        '128': '32rem',
      },

      borderRadius: {
        'xl':  '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
        'pill':'9999px',
      },

      boxShadow: {
        'glow':      '0 0 20px rgba(99, 102, 241, 0.25)',
        'glow-md':   '0 0 32px rgba(99, 102, 241, 0.32)',
        'glow-lg':   '0 0 56px rgba(99, 102, 241, 0.45)',
        'card':      '0 4px 24px rgba(0, 0, 0, 0.3)',
        'card-lg':   '0 8px 40px rgba(0, 0, 0, 0.4)',
        'inner-glow':'inset 0 0 20px rgba(99, 102, 241, 0.1)',
      },

      backgroundImage: {
        'glow-radial':
          'radial-gradient(ellipse at center, rgba(99,102,241,0.22) 0%, rgba(99,102,241,0.06) 45%, transparent 70%)',
        'indigo-gradient':
          'linear-gradient(135deg, #c0c1ff 0%, #6366f1 100%)',
        'card-gradient':
          'linear-gradient(135deg, rgba(14,21,39,0.8) 0%, rgba(27,37,64,0.6) 100%)',
        'border-gradient':
          'linear-gradient(90deg, transparent, rgba(192,193,255,0.2), transparent)',
      },

      backdropBlur: {
        xs: '2px',
        sm: '8px',
        md: '16px',
        lg: '24px',
      },

      animation: {
        'fade-in':    'fadeIn 0.5s ease-in-out',
        'slide-up':   'slideUp 0.3s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float':      'float 3s ease-in-out infinite',
        'spin-slow':  'spin 20s linear infinite',
        'spin-slow-reverse': 'spin 15s linear infinite reverse',
        'breathe':    'breathe 6s ease-in-out infinite',
        'pulse-dot':  'pulseDot 2.4s ease-in-out infinite',
        'glow-pulse': 'glowPulse 4s ease-in-out infinite',
      },

      keyframes: {
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%':   { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)',    opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)'   },
          '50%':      { transform: 'translateY(-10px)' },
        },
        breathe: {
          '0%, 100%': { opacity: '1',  transform: 'scale(1)'    },
          '50%':      { opacity: '0.7',transform: 'scale(1.06)' },
        },
        pulseDot: {
          '0%, 100%': { opacity: '1',  transform: 'scale(1)'    },
          '50%':      { opacity: '0.4',transform: 'scale(0.75)' },
        },
        glowPulse: {
          '0%, 100%': { opacity: '0.6' },
          '50%':      { opacity: '1'   },
        },
      },
    },
  },
  plugins: [],
}