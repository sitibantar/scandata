import { createRoute } from 'honox/factory';

export const POST = createRoute(async (c) => {
  const body = await c.req.json();
  const { transaction_status, amount, custom_order_id } = body;
  const db = c.env.DB;

  if (transaction_status === 'settlement') {
    await db.prepare(
      "UPDATE transactions SET status = 'settlement', amount_paid = ? WHERE id = ?"
    ).bind(amount, custom_order_id).run();

    const trx = await db.prepare("SELECT user_id FROM transactions WHERE id = ?")
      .bind(custom_order_id)
      .first<{ user_id: string }>();

    if (trx) {
      await db.prepare(
        "UPDATE users SET package_type = 'pro' WHERE id = ?"
      ).bind(trx.user_id).run();
      
      await db.prepare("DELETE FROM trial_usage WHERE user_id = ?")
        .bind(trx.user_id).run();
    }

    return c.json({ message: 'Webhook processed successfully' }, 200);
  }

  return c.json({ message: 'Status not settlement, ignored' }, 200);
});