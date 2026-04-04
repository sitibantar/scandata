import { createRoute } from 'honox/factory';
import { jwt } from 'hono/jwt';

export default createRoute(async (c, next) => {
  // Pengecekan rahasia (secret)
  if (!c.env.JWT_SECRET) {
    return c.json({ status: 'error', message: 'Server Secret tidak dikonfigurasi' }, 500);
  }

  // Middleware JWT Hono
  const jwtMiddleware = jwt({
    secret: c.env.JWT_SECRET,
    alg: 'HS256'
  });

  return await jwtMiddleware(c, next);
});