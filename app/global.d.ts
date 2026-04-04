import {} from 'hono'
import type { Env as AppEnv } from './routes/_middleware'

type Head = {
  title?: string
}

declare module 'hono' {
  // Integrasikan Env yang sudah kita buat di _middleware.ts
  interface Env extends AppEnv {}

  // Deklarasi untuk fungsi c.render()
  interface ContextRenderer {
    (content: string | Promise<string>, head?: Head): Response | Promise<Response>
  }
}