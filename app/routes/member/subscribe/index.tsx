import { createRoute } from 'honox/factory';
import { DashboardLayout } from '../../../components/DashboardLayout';

export default createRoute((c) => {
  return c.render(
    <DashboardLayout title="Upgrade Paket">
      <div className="mb-8">
        <h2 className="text-3xl font-black text-slate-900 tracking-tight">Upgrade ke Pro</h2>
        <p className="text-slate-500 mt-2">Aktifkan fitur lengkap untuk ekstraksi dokumen tanpa batas.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
        {/* Paket PRO Card */}
        <div className="bg-white p-8 rounded-3xl border-2 border-blue-500 shadow-xl relative">
          <div className="absolute top-0 right-0 bg-blue-500 text-white text-[10px] font-black px-4 py-1 rounded-bl-xl uppercase">Best Value</div>
          <h3 className="text-xl font-bold text-slate-800">Paket PRO</h3>
          <div className="my-4">
            <span className="text-4xl font-black text-blue-600">Rp 50.000</span>
            <span className="text-slate-400 font-medium">/bulan</span>
          </div>
          <ul className="space-y-3 mb-8 text-sm font-medium text-slate-600">
            <li>✅ Scan Tanpa Batas</li>
            <li>✅ Unlimited Templates</li>
            <li>✅ Full API Access</li>
          </ul>
          <button id="btnPay" onclick="handlePayment(50000, 'package_pro_monthly')" className="w-full py-4 rounded-xl bg-blue-600 text-white font-black shadow-lg hover:bg-blue-700 transition active:scale-95">Bayar Sekarang</button>
        </div>
      </div>

      {/* Modal QRIS */}
      <div id="paymentModal" className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] hidden items-center justify-center p-6">
        <div className="bg-white w-full max-w-sm rounded-3xl p-8 text-center shadow-2xl">
          <h3 className="text-xl font-bold mb-4">Scan untuk Membayar</h3>
          <div className="bg-slate-50 p-4 rounded-2xl mb-6 border border-slate-100 flex justify-center">
            {/* Menggunakan API QR eksternal untuk me-render string dari gopayData */}
            <img id="qrisImg" src="" alt="QRIS" className="w-48 h-48" />
          </div>
          <div className="bg-blue-50 p-3 rounded-xl mb-6 text-left">
            <p className="text-[10px] font-bold text-blue-400 uppercase">Order ID</p>
            <p id="orderIdText" className="text-sm font-mono font-bold text-blue-700"></p>
          </div>
          <button onclick="location.reload()" className="w-full py-3 bg-slate-900 text-white rounded-xl font-bold">Cek Status Pembayaran</button>
        </div>
      </div>

      <script dangerouslySetInnerHTML={{__html: `
        async function handlePayment(amt, pkgId) {
          const btn = document.getElementById('btnPay');
          btn.innerText = 'Menghubungkan...';
          btn.disabled = true;

          try {
            const res = await fetch('/api/member/subscribe', {
              method: 'POST',
              headers: { 
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
              },
              body: JSON.stringify({ amount: amt, package_id: pkgId })
            });
            const data = await res.json();
            
            if (data.status === 'success') {
              // Asumsi qr_data.qr_string atau qr_data.qr_url berisi data QR
              const qrSource = data.qr_data.qr_url || \`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=\${data.qr_data.qr_string}\`;
              document.getElementById('qrisImg').src = qrSource;
              document.getElementById('orderIdText').innerText = data.order_id;
              document.getElementById('paymentModal').style.display = 'flex';
            } else {
              alert(data.message);
            }
          } catch(e) {
            alert('Kesalahan jaringan');
          } finally {
            btn.innerText = 'Bayar Sekarang';
            btn.disabled = false;
          }
        }
      `}} />
    </DashboardLayout>
  );
});