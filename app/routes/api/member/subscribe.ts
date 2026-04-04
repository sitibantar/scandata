import { createRoute } from 'honox/factory';

export const POST = createRoute(async (c) => {
  const user = c.get('user');
  if (!user) return c.json({ status: 'error', message: 'Akses ditolak' }, 401);

  const { package_id, amount } = await c.req.json();
  const db = c.env.DB;
  
  const orderId = `ORD-${Date.now()}-${user.id.slice(0, 4)}`;

  try {
    // Integrasi asli ke GoPay Gateway sesuai config Anda
    const gopayRes = await fetch("https://gopay-api.pages.dev/trx", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${c.env.GOPAY_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ order_id: orderId, amount: amount })
    });

    const gopayData = await gopayRes.json();

    // Simpan ke database D1
    await db.prepare(
      'INSERT INTO transactions (id, user_id, amount, status) VALUES (?, ?, ?, ?)'
    ).bind(orderId, user.id, amount, 'pending').run();

    return c.json({
      status: 'success',
      qr_data: gopayData, // Data asli dari gateway (mengandung QR string/URL)
      order_id: orderId
    });

  } catch (err) {
    return c.json({ status: 'error', message: 'Gagal menghubungkan ke gateway pembayaran' }, 500);
  }
});