import { createRoute } from 'honox/factory';

// Endpoint untuk MENGAMBIL data (GET)
export const GET = createRoute(async (c) => {
  const user = c.get('user');
  if (!user) return c.json({ status: 'error', message: 'Akses ditolak' }, 401);
  
  const db = c.env.DB;
  
  // Ambil senarai template milik pengguna ini
  const templates = await db.prepare('SELECT id, name FROM templates WHERE user_id = ?').bind(user.id).all();
  
  // Ambil senarai projek berserta nama template yang digunakan
  const projects = await db.prepare(`
    SELECT p.id, p.name, t.name as template_name, p.created_at 
    FROM projects p 
    LEFT JOIN templates t ON p.template_id = t.id 
    WHERE p.user_id = ? ORDER BY p.created_at DESC
  `).bind(user.id).all();

  return c.json({ status: 'success', templates: templates.results, projects: projects.results });
});

// Endpoint untuk MENYIMPAN projek baharu (POST)
export const POST = createRoute(async (c) => {
  const user = c.get('user');
  if (!user) return c.json({ status: 'error', message: 'Akses ditolak' }, 401);

  const { name, template_id } = await c.req.json();
  const db = c.env.DB;
  const projectId = 'PRJ-' + Date.now(); // ID Unik

  try {
    await db.prepare('INSERT INTO projects (id, user_id, template_id, name) VALUES (?, ?, ?, ?)')
      .bind(projectId, user.id, template_id, name).run();
    return c.json({ status: 'success', message: 'Projek berjaya dicipta' });
  } catch (error) {
    return c.json({ status: 'error', message: 'Gagal menyimpan ke pangkalan data' }, 500);
  }
});