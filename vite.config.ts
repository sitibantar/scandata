import { defineConfig } from 'vite'
import honox from 'honox/vite'
import pages from '@hono/vite-cloudflare-pages'

export default defineConfig({
  plugins: [
    honox(),
    pages() // Adapter wajib agar bisa berjalan di Cloudflare Edge
  ],
  server: {
    port: 3000 // Port default untuk mode development
  }
})