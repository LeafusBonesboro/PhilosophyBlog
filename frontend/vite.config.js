import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/FantasyFootballOptimizer/',  // Set this to match your repository name
  plugins: [react()],
})
