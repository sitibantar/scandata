import { createRoute } from 'honox/factory';

export const GET = createRoute(async (c) => {
  const user = c.get('user');
  if (!user) return c.json({ status: 'error', message: 'Akses ditolak' }, 401);
  const db = c.env.DB;

  const templates = await db.prepare('SELECT * FROM templates WHERE user_id = ? ORDER BY created_at DESC')
    .bind(user.id).all();
  
  return c.json({ status: 'success', data: templates.results });
});

export const POST = createRoute(async (c) => {
  const user = c.get('user');
  const { name, primary_key, foreign_key, shared_keys, additional_keys } = await c.req.json();
  const db = c.env.DB;
  const id = 'TPL-' + Date.now();

  try {
    await db.prepare(`
      INSERT INTO templates (id, user_id, name, primary_key, foreign_key, shared_keys, additional_keys)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).bind(id, user.id, name, primary_key, foreign_key, JSON.stringify(shared_keys || []), JSON.stringify(additional_keys || [])).run();

    return c.json({ status: 'success', message: 'Template berhasil dibuat' });
  } catch (err: any) {
    return c.json({ status: 'error', message: err.message }, 500);
  }
});