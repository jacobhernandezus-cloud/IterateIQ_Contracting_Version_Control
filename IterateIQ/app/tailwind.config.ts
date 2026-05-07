import type { Config } from 'tailwindcss';

/**
 * IterateIQ Tailwind config.
 * All tokens map directly to IterateIQ/DESIGN.md sections 2-6.
 * Do not introduce new color, spacing, or type values without updating DESIGN.md first.
 */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Brand
        navy: {
          DEFAULT: '#142338',
          deep: '#0f1f30',
          light: '#1e3a5f',
        },
        amber: {
          DEFAULT: '#FF8C00',
          soft: '#FFB347',
          wash: '#FFF8F0',
          dark: '#E07B00',
        },
        cream: {
          DEFAULT: '#FAF8F4',
          dark: '#EFE9DD',
        },

        // Surface
        surface: {
          DEFAULT: '#FFFFFF',
          muted: '#F8FAFC',
          sunken: '#F0F4F8',
        },
        border: {
          DEFAULT: '#E8ECF0',
          strong: '#CBD5E1',
        },
        ink: '#1a1a2e',

        // Text
        text: {
          primary: '#1a1a2e',
          secondary: '#4B5563',
          muted: '#6B7280',
          faint: '#9CA3AF',
        },

        // Semantic states
        success: {
          DEFAULT: '#16a34a',
          light: '#F0FDF4',
          dark: '#15803d',
        },
        warning: {
          DEFAULT: '#f59e0b',
          light: '#FFFBEB',
          dark: '#92400e',
        },
        danger: {
          DEFAULT: '#dc2626',
          light: '#FEF2F2',
          dark: '#991b1b',
        },
        info: {
          DEFAULT: '#0ea5e9',
          light: '#EFF6FF',
          dark: '#0284c7',
        },
        // Review purple — DESIGN.md §10
        review: {
          light: '#F3E8FF',
          dark: '#7c3aed',
        },
      },

      fontFamily: {
        body: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Geologica', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },

      fontSize: {
        xxs: ['9px', { lineHeight: '12px', letterSpacing: '0.13em' }],
        xs: ['11px', { lineHeight: '14px' }],
        sm: ['12px', { lineHeight: '16px' }],
        base: ['13px', { lineHeight: '18px' }],
        md: ['14px', { lineHeight: '20px' }],
        lg: ['17px', { lineHeight: '22px' }],
        xl: ['20px', { lineHeight: '26px' }],
        '2xl': ['22px', { lineHeight: '28px' }],
        '3xl': ['28px', { lineHeight: '34px' }],
      },

      borderRadius: {
        sm: '6px',
        md: '8px',
        lg: '10px',
        xl: '14px',
        '2xl': '20px',
      },

      boxShadow: {
        card: '0 4px 18px rgba(0,0,0,0.06)',
        'card-hover': '0 4px 22px rgba(0,0,0,0.09)',
        amber: '0 4px 16px rgba(255,140,0,0.12)',
        modal: '0 24px 64px rgba(0,0,0,0.30)',
        'focus-amber': '0 0 0 3px rgba(255,140,0,0.10)',
      },

      keyframes: {
        'fade-slide-in': {
          from: { opacity: '0', transform: 'translateY(-4px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-slide-in': 'fade-slide-in 180ms ease-out',
      },
    },
  },
  plugins: [],
} satisfies Config;
