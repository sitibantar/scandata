import { createRoute } from 'honox/factory';
import { DashboardLayout } from '../../../components/DashboardLayout';

export default createRoute(async (c) => {
  return c.render(
    <DashboardLayout title="Projects">
      <div className="mb-6 flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 hidden md:block">Manajemen Project</h2>
          <p className="text-slate-500 mt-1 text-sm md:text-base">Kelola ruang kerja hasil ekstraksi dokumen Anda.</p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Form Pembuatan Project */}
        <div className="w-full lg:w-1/3">
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm sticky top-24">
            <h3 className="text-lg font-bold text-slate-800 mb-5">Buat Project Baru</h3>
            
            <form id="projectForm" className="space-y-4" onsubmit="event.preventDefault(); submitProject();">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Nama Project <span className="text-red-500">*</span></label>
                <input type="text" id="projectName" placeholder="Misal: Sensus RT 04" className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500 transition text-sm" required />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Gunakan Template <span className="text-red-500">*</span></label>
                <select id="templateId" className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500 transition text-sm bg-white" required>
                  <option value="">-- Memuat Template... --</option>
                </select>
              </div>
              
              <button type="submit" id="btnSubmit" className="w-full bg-blue-600 text-white font-bold py-3.5 rounded-xl hover:bg-blue-700 transition shadow-lg mt-2">
                Simpan Project
              </button>
            </form>
          </div>
        </div>

        {/* Daftar Project Langsung dari Database */}
        <div className="w-full lg:w-2/3">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 bg-slate-50/50">
              <h3 className="text-lg font-bold text-slate-800">Daftar Project Anda</h3>
            </div>
            
            <div id="projectsList" className="divide-y divide-slate-100">
              <div className="p-12 text-center text-slate-500 font-medium animate-pulse">
                Menyambung ke pangkalan data...
              </div>
            </div>
            
          </div>
        </div>

      </div>

      {/* Skrip Pengambil Data Pangkalan Data (Tanpa Mockup) */}
      <script dangerouslySetInnerHTML={{__html: `
        const token = localStorage.getItem('token');
        if (!token) window.location.href = '/member/login';

        async function loadDatabaseData() {
          try {
            const res = await fetch('/api/member/projects', {
              headers: { 'Authorization': 'Bearer ' + token }
            });
            const data = await res.json();
            
            if (data.status === 'success') {
              // 1. Masukkan data ke dropdown Template
              const sel = document.getElementById('templateId');
              if (data.templates.length === 0) {
                sel.innerHTML = '<option value="">(Belum ada template, buat dahulu)</option>';
              } else {
                sel.innerHTML = '<option value="">-- Pilih Template --</option>' + 
                  data.templates.map(t => \`<option value="\${t.id}">\${t.name}</option>\`).join('');
              }
              
              // 2. Masukkan data ke senarai Project
              const list = document.getElementById('projectsList');
              if (data.projects.length === 0) {
                list.innerHTML = '<div class="p-12 text-center text-slate-500">Belum ada project yang dibuat.</div>';
              } else {
                list.innerHTML = data.projects.map(p => \`
                  <div class="p-6 hover:bg-slate-50 transition flex justify-between items-center gap-4">
                    <div>
                      <h4 class="text-base font-bold text-slate-900">\${p.name}</h4>
                      <div class="text-xs text-slate-500 mt-1 font-medium">
                        Template: <span class="text-blue-600">\${p.template_name || 'Tidak diketahui'}</span> • \${new Date(p.created_at).toLocaleDateString()}
                      </div>
                    </div>
                    <button class="text-sm font-semibold text-blue-600 bg-blue-50 border border-blue-100 hover:bg-blue-600 hover:text-white px-5 py-2.5 rounded-xl transition">Buka</button>
                  </div>
                \`).join('');
              }
            }
          } catch (e) {
            document.getElementById('projectsList').innerHTML = '<div class="p-6 text-red-500">Gagal mengambil data dari server.</div>';
          }
        }

        async function submitProject() {
          const btn = document.getElementById('btnSubmit');
          btn.innerText = 'Menyimpan...';
          btn.disabled = true;
          
          const payload = {
            name: document.getElementById('projectName').value,
            template_id: document.getElementById('templateId').value
          };

          const res = await fetch('/api/member/projects', {
            method: 'POST',
            headers: { 
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(payload)
          });
          
          const result = await res.json();
          if (result.status === 'success') {
            document.getElementById('projectName').value = '';
            loadDatabaseData(); // Kemas kini senarai projek serta-merta!
          } else {
            alert(result.message);
          }
          
          btn.innerText = 'Simpan Project';
          btn.disabled = false;
        }

        // Muat data sebaik sahaja halaman dibuka
        loadDatabaseData();
      `}} />
    </DashboardLayout>
  );
});