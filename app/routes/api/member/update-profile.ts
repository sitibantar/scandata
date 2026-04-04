import { createRoute } from 'honox/factory';

export const POST = createRoute(async (c) => {
  // Middleware JWT otomatis meletakkan data user di sini
  const user = c.get('user');
  if (!user) return c.json({ status: 'error', message: 'Akses ditolak' }, 401);

  const { name, password } = await c.req.json();
  const db = c.env.DB;

  try {
    // Jika user mengisi password, update nama & password
    if (password && password.trim() !== '') {
      await db.prepare('UPDATE users SET name = ?, password_hash = ? WHERE id = ?')
        .bind(name, password, user.id).run();
    } 
    // Jika password kosong, update nama saja
    else if (name && name.trim() !== '') {
      await db.prepare('UPDATE users SET name = ? WHERE id = ?')
        .bind(name, user.id).run();
    }

    return c.json({ status: 'success', message: 'Profil berhasil diperbarui!' });
  } catch (error) {
    return c.json({ status: 'error', message: 'Terjadi kesalahan pada database' }, 500);
  }
});