import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  plugins: [react()],
  server: {
    host: "0.0.0.0", // listen on all addresses
    port: 5173,      // or change if you want
  },
})
