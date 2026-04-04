import { createRoute } from 'honox/factory';

export const POST = createRoute(async (c) => {
  const user = c.get('user');
  const { template_id } = await c.req.json();
  const db = c.env.DB;

  // 1. GATEKEEPER: Cek Kuota Trial
  if (user.package_type === 'trial') {
    const usage = await db.prepare('SELECT scan_count FROM trial_usage WHERE user_id = ?')
      .bind(user.id)
      .first<{ scan_count: number }>();

    if (usage && usage.scan_count >= 2) {
      return c.json({ status: 'error', message: 'Kuota trial habis. Silakan upgrade ke Paket Pro.' }, 403);
    }
  }

  // 2. Ambil data Template dari D1
  const template = await db.prepare('SELECT * FROM templates WHERE id = ? AND user_id = ?')
    .bind(template_id, user.id)
    .first<{ primary_key: string, foreign_key: string, shared_keys: string, additional_keys: string }>();

  if (!template) {
    return c.json({ status: 'error', message: 'Template tidak ditemukan' }, 404);
  }

  // 3. KOMPILASI PROMPT
  const sharedKeys = JSON.parse(template.shared_keys || '[]');
  const additionalKeys = JSON.parse(template.additional_keys || '[]');
  
  const compiledPrompt = `
Anda adalah sistem ekstraksi data yang presisi. Ekstrak teks dari gambar dokumen berikut ke dalam format JSON.
Struktur data yang wajib diikuti:
- Primary Key: ${template.primary_key}
- Foreign Key: ${template.foreign_key || 'Tidak ada'}
- Shared Keys (berlaku untuk semua data): ${sharedKeys.join(', ')}
- Additional Keys: ${additionalKeys.join(', ')}
Kembalikan HANYA array JSON murni, tanpa teks pembuka, tanpa format markdown.
  `;

  // 4. Tentukan batas halaman
  const allowedPages = user.package_type === 'trial' ? 2 : 40;

  return c.json({
    status: 'success',
    prompt: compiledPrompt,
    allowedPages: allowedPages
  });
});