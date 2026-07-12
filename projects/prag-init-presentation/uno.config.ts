import { defineConfig } from 'unocss'

export default defineConfig({
  shortcuts: {
    'slide-title': 'text-5xl font-bold leading-tight',
    'slide-kicker': 'text-sm uppercase tracking-widest opacity-70',
    'glass-panel': 'rounded-lg bg-white/80 backdrop-blur border border-blue-600/40',
    'motion-card': 'transition duration-300 ease-out hover:-translate-y-1',
  },
})
