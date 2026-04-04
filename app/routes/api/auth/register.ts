import { createRoute } from 'honox/factory';

export const POST = createRoute(async (c) => {
  const { name, email, password } = await c.req.json();
  const db = c.env.DB;

  // GENERATOR ID CUSTOM: SC + 6 digit angka & huruf kapital
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let randomPart = '';
  for (let i = 0; i < 6; i++) {
    randomPart += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  const customUserId = `SC${randomPart}`;

  try {
    // 1. Cek apakah email sudah ada
    const existing = await db.prepare('SELECT id FROM users WHERE email = ?').bind(email).first();
    if (existing) return c.json({ status: 'error', message: 'Email sudah terdaftar' }, 400);

    // 2. Simpan User menggunakan ID SCXXXXXX
    await db.prepare(
      'INSERT INTO users (id, name, email, password_hash, package_type) VALUES (?, ?, ?, ?, ?)'
    ).bind(customUserId, name, email, password, 'trial').run();

    // 3. Buat entri kuota trial
    await db.prepare(
      'INSERT INTO trial_usage (user_id, scan_count) VALUES (?, ?)'
    ).bind(customUserId, 0).run();

    return c.json({ status: 'success' });
  } catch (err: any) {
    return c.json({ status: 'error', message: err.message }, 500);
  }
});