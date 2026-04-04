import { createRoute } from 'honox/factory';
import { sign } from 'hono/jwt';

export const POST = createRoute(async (c) => {
  const { email, password } = await c.req.json();
  const db = c.env.DB;

  // 1. Ambil data user dari database D1
  const user = await db.prepare('SELECT id, password_hash, package_type FROM users WHERE email = ?')
    .bind(email)
    .first<{ id: string, password_hash: string, package_type: string }>();

  if (!user || user.password_hash !== password) {
    return c.json({ status: 'error', message: 'Email atau password salah' }, 401);
  }

  // 2. Buat Payload JWT
  const payload = {
    id: user.id,
    package_type: user.package_type,
    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 // Token kedaluwarsa dalam 24 jam
  };

  // 3. Tanda tangani Token
  const token = await sign(payload, c.env.JWT_SECRET);

  return c.json({
    status: 'success',
    token: token,
    package_type: user.package_type
  });
});