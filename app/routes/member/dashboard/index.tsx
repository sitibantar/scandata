import { createRoute } from 'honox/factory';
import { DashboardLayout } from '../../../components/DashboardLayout';

export default createRoute(async (c) => {
  return c.render(
    <DashboardLayout title="Dashboard">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900 hidden md:block">Ringkasan Statistik</h2>
        <p className="text-slate-500 mt-1">Pantau kuota dan status akun Anda secara real-time.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card Kuota */}
        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
          <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Scan Terpakai</p>
          <div className="flex items-baseline gap-2">
             <h3 id="scanCount" className="text-5xl font-black text-blue-600">--</h3>
             <p className="text-slate-400 font-bold">/ <span id="scanLimit">--</span></p>
          </div>
        </div>

        {/* Card Paket */}
        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-between">
          <div>
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Tipe Akun</p>
            <h3 id="pkgType" className="text-2xl font-black text-slate-800 uppercase tracking-tighter">Memuat...</h3>
          </div>
          <a href="/member/subscribe" className="mt-4 inline-block text-center bg-slate-900 text-white font-bold py-3 rounded-2xl hover:bg-slate-800 transition text-sm">Upgrade Ke Pro</a>
        </div>
      </div>

      <script dangerouslySetInnerHTML={{__html: `
        const token = localStorage.getItem('token');
        if (!token) window.location.href = '/member/login';

        async function loadDash() {
          try {
            const res = await fetch('/api/member/dashboard', {
              headers: { 'Authorization': 'Bearer ' + token }
            });
            
            const result = await res.json();
            
            if (result.status === 'success') {
              document.getElementById('scanCount').innerText = result.scan_count;
              document.getElementById('scanLimit').innerText = result.limit;
              document.getElementById('pkgType').innerText = result.package;
            } else {
              console.error('API Error:', result.message);
              document.getElementById('pkgType').innerText = "Gagal Memuat";
            }
          } catch (e) {
            console.error('Fetch Error:', e);
          }
        }
        loadDash();
      `}} />
    </DashboardLayout>
  );
});