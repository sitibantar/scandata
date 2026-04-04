import { createApp } from 'honox/server'
import { logger } from 'hono/logger'

const app = createApp()

// Logger murni bawaan Hono
app.use('*', logger())

app.get('/favicon.ico', (c) => c.body(null, 204))

// Tangkap dan muntahkan error APA ADANYA ke console
app.onError((err, c) => {
  console.error("=== RAW ERROR DUMP ===");
  console.error(err); 
  return c.text(err.message || 'Internal Server Error', err instanceof Error && (err as any).status ? (err as any).status : 500);
})

export default app