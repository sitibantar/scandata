import { createRoute } from 'honox/factory';

export const GET = createRoute(async (c) => {
  const db = c.env.DB;

  try {
    const usersStat = await db.prepare(`
      SELECT 
        COUNT(id) as total_users,
        SUM(CASE WHEN package_type = 'pro' THEN 1 ELSE 0 END) as total_pro,
        SUM(CASE WHEN package_type = 'trial' THEN 1 ELSE 0 END) as total_trial
      FROM users
    `).first();

    const financeStat = await db.prepare(`
      SELECT 
        SUM(amount_paid) as total_revenue,
        COUNT(id) as successful_transactions
      FROM transactions 
      WHERE status = 'settlement'
    `).first();

    const templateStat = await db.prepare(`
      SELECT COUNT(id) as total_templates FROM templates
    `).first();

    return c.json({
      status: 'success',
      data: {
        users: usersStat,
        finance: financeStat,
        templates: templateStat
      }
    }, 200);

  } catch (error) {
    return c.json({ status: 'error', message: 'Gagal mengambil data statistik' }, 500);
  }
});