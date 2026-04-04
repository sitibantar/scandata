import { createRoute } from 'honox/factory';

export const GET = createRoute(async (c) => {
  const user = c.get('user');
  if (!user) return c.json({ status: 'error', message: 'Unauthorized' }, 401);
  
  const db = c.env.DB;

  try {
    // Ambil data paket
    const userData = await db.prepare('SELECT package_type FROM users WHERE id = ?').bind(user.id).first<{package_type: string}>();
    
    // Ambil data penggunaan
    const usage = await db.prepare('SELECT scan_count FROM trial_usage WHERE user_id = ?').bind(user.id).first<{scan_count: number}>();

    return c.json({
      status: 'success',
      package: userData?.package_type || 'trial',
      scan_count: usage?.scan_count || 0,
      limit: userData?.package_type === 'pro' ? 'Unlimited' : 2
    });
  } catch (err: any) {
    return c.json({ status: 'error', message: err.message }, 500);
  }
});