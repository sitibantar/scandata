import { createRoute } from 'honox/factory';
import { DashboardLayout } from '../../../components/DashboardLayout';

export default createRoute((c) => {
  return c.render(
    <DashboardLayout title="API Keys">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900 hidden md:block">Manajemen API</h2>
        <p className="text-slate-500 mt-1 text-sm md:text-base">Gunakan kredensial ini untuk menghubungkan aplikasi Flutter Anda.</p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 mb-6">
        <label className="block text-sm font-bold text-slate-700 mb-2">Secret Bearer Token (JWT)</label>
        <div className="flex bg-slate-50 border border-slate-200 rounded-xl overflow-hidden p-1 gap-1">
          <input type="password" id="api-token" readOnly className="w-full bg-transparent px-3 py-2 text-slate-500 outline-none font-mono text-sm" placeholder="Memuat token asli Anda..." />
          
          {/* Tombol Copy Baru */}
          <button id="btnCopy" className="flex items-center gap-2 bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-lg font-bold text-sm shadow-sm hover:bg-slate-50 transition" onClick="copyToken()">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
            <span id="copyText">Salin</span>
          </button>

          <button id="btnToggle" className="bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-lg font-bold text-sm shadow-sm hover:bg-slate-50 transition" onClick="toggleToken()">
            Lihat
          </button>
        </div>
        <p className="text-xs text-red-500 mt-2 font-medium">⚠️ Jangan bagikan token ini kepada siapapun.</p>
      </div>

      <script dangerouslySetInnerHTML={{__html: `
        const realToken = localStorage.getItem('token');
        const inputField = document.getElementById('api-token');
        
        if (realToken) {
          inputField.value = realToken;
        } else {
          inputField.value = "Token tidak ditemukan. Silakan login ulang.";
          inputField.type = "text";
          inputField.classList.add("text-red-500");
          document.getElementById('btnCopy').disabled = true;
        }

        function toggleToken() {
          const btn = document.getElementById('btnToggle');
          if (inputField.type === 'password') {
            inputField.type = 'text';
            btn.innerText = 'Tutup';
          } else {
            inputField.type = 'password';
            btn.innerText = 'Lihat';
          }
        }

        // Fungsi Copy ke Clipboard
        function copyToken() {
          if (!realToken) return;
          
          navigator.clipboard.writeText(realToken).then(() => {
            const btn = document.getElementById('btnCopy');
            const span = document.getElementById('copyText');
            const originalHTML = btn.innerHTML;
            
            // Efek visual sukses
            btn.classList.add('bg-green-50', 'text-green-600', 'border-green-200');
            btn.classList.remove('text-slate-700', 'bg-white');
            span.innerText = 'Tersalin!';
            
            // Kembalikan ke semula setelah 2 detik
            setTimeout(() => {
              btn.classList.remove('bg-green-50', 'text-green-600', 'border-green-200');
              btn.classList.add('text-slate-700', 'bg-white');
              span.innerText = 'Salin';
            }, 2000);
          });
        }
      `}} />
    </DashboardLayout>
  );
});