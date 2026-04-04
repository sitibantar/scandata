import { createRoute } from 'honox/factory';
import { DashboardLayout } from '../../../components/DashboardLayout';

export default createRoute(async (c) => {
  return c.render(
    <DashboardLayout title="Templates">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900 hidden md:block">Template AI</h2>
        <p className="text-slate-500 mt-1">Atur struktur data yang akan diekstrak oleh AI.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Form Tambah Template */}
        <div className="w-full lg:w-1/3">
          <form id="tplForm" className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4" onsubmit="event.preventDefault(); submitTpl();">
            <h3 className="font-bold text-slate-800 mb-2">Buat Template Baru</h3>
            <input type="text" id="tplName" placeholder="Nama Template (cth: KTP)" className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-blue-500" required />
            <input type="text" id="pKey" placeholder="Primary Key (cth: NIK)" className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-blue-500" required />
            <input type="text" id="fKey" placeholder="Foreign Key (cth: No KK - Opsional)" className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-blue-500" />
            <textarea id="sKeys" placeholder="Shared Keys (Pisahkan dengan koma: Nama, Alamat, TTL)" className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-blue-500 h-24"></textarea>
            <button type="submit" id="btnSubmit" className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 transition shadow-lg shadow-blue-100">Simpan Template</button>
          </form>
        </div>

        {/* List Template dari Database */}
        <div className="w-full lg:w-2/3">
          <div id="tplList" className="grid grid-cols-1 gap-4">
            <div className="p-12 text-center text-slate-400 animate-pulse bg-white rounded-2xl border border-slate-100">Menghubungkan ke database...</div>
          </div>
        </div>
      </div>

      <script dangerouslySetInnerHTML={{__html: `
        const token = localStorage.getItem('token');
        
        async function loadTpls() {
          const res = await fetch('/api/member/templates', { headers: { 'Authorization': 'Bearer ' + token } });
          const result = await res.json();
          const list = document.getElementById('tplList');
          
          if (result.data.length === 0) {
            list.innerHTML = '<div class="bg-white p-10 rounded-2xl border border-dashed border-slate-200 text-center text-slate-400">Belum ada template.</div>';
          } else {
            list.innerHTML = result.data.map(t => \`
              <div class="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex justify-between items-center group">
                <div>
                  <h4 class="font-bold text-slate-900">\${t.name}</h4>
                  <p class="text-xs text-slate-500 mt-1">PK: \${t.primary_key} • FK: \${t.foreign_key || '-'}</p>
                </div>
                <div class="flex gap-2">
                   <button class="p-2 text-slate-400 hover:text-red-500 transition"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
                </div>
              </div>
            \`).join('');
          }
        }

        async function submitTpl() {
          const btn = document.getElementById('btnSubmit');
          btn.disabled = true; btn.innerText = 'Menyimpan...';
          
          const shared = document.getElementById('sKeys').value.split(',').map(s => s.trim()).filter(s => s !== '');
          
          const res = await fetch('/api/member/templates', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
            body: JSON.stringify({
              name: document.getElementById('tplName').value,
              primary_key: document.getElementById('pKey').value,
              foreign_key: document.getElementById('fKey').value,
              shared_keys: shared
            })
          });

          const resData = await res.json();
          if(resData.status === 'success') {
            document.getElementById('tplForm').reset();
            loadTpls();
          } else { alert(resData.message); }
          btn.disabled = false; btn.innerText = 'Simpan Template';
        }

        loadTpls();
      `}} />
    </DashboardLayout>
  );
});