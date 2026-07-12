import { fileURLToPath, URL } from 'node:url'

export default {
  resolve: {
    alias: {
      '@fix-webm-duration/fix': fileURLToPath(new URL('./shims/fix-webm-duration.ts', import.meta.url)),
    },
  },
}
