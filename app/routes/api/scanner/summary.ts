import { createRoute } from 'honox/factory';

export const POST = createRoute(async (c) => {
  const user = c.get('user');
  const { template_id, pages_scanned, status } = await c.req.json();
  const db = c.env.DB;

  if (status === 'success' && user.package_type === 'trial') {
    await db.prepare('UPDATE trial_usage SET scan_count = scan_count + 1 WHERE user_id = ?')
      .bind(user.id)
      .run();
  }

  await db.prepare('INSERT INTO scan_history (user_id, template_id, pages_scanned, created_at) VALUES (?, ?, ?, CURRENT_TIMESTAMP)')
    .bind(user.id, template_id, pages_scanned)
    .run();

  return c.json({ status: 'success', message: 'Summary diterima dan kuota disesuaikan' });
});