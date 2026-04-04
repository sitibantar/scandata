import { createRoute } from 'honox/factory';
import { verify } from 'hono/jwt';

export type Env = {
  Bindings: { DB: D1Database; JWT_SECRET: string; GOPAY_API_KEY: string; };
  Variables: { user: { id: string; package_type: string }; };
};

export default createRoute(async (c, next) => {
  const path = c.req.path;

  if (path.startsWith('/api/') && !path.startsWith('/api/auth/') && !path.startsWith('/api/webhook/')) {
    const authHeader = c.req.header('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return c.json({ status: 'error', message: 'Akses ditolak' }, 401);
    }

    const token = authHeader.split(' ')[1];
    try {
      const decoded = await verify(token, c.env.JWT_SECRET);
      c.set('user', decoded as { id: string; package_type: string });
    } catch (err) {
      return c.json({ status: 'error', message: 'Token tidak valid' }, 401);
    }
  }

  // WAJIB menggunakan return
  return await next();
});