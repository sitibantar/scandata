import { createRoute } from 'honox/factory';
import { DashboardLayout } from '../../../components/DashboardLayout';

export default createRoute((c) => {
  return c.render(
    <DashboardLayout title="Pengaturan">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900 hidden md:block">Profil Akun</h2>
        <p className="text-slate-500 mt-1 text-sm md:text-base">Perbarui nama tampilan atau ubah kata sandi Anda.</p>
      </div>

      <form id="profileForm" className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-5" onsubmit="event.preventDefault(); saveProfile();">
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">Nama Lengkap</label>
          <input type="text" id="newName" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition" placeholder="Masukkan nama baru..." />
        </div>
        
        <div className="pt-4 border-t border-slate-100">
          <label className="block text-sm font-bold text-slate-700 mb-2">Password Baru <span className="text-slate-400 font-normal">(Opsional)</span></label>
          <input type="password" id="newPass" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition" placeholder="Kosongkan jika tidak ingin diubah" />
        </div>

        <button type="submit" id="btnSave" className="w-full md:w-auto bg-blue-600 text-white font-bold py-3 px-8 rounded-xl hover:bg-blue-700 transition shadow-lg shadow-blue-200">
          Simpan Perubahan
        </button>
      </form>

      <script dangerouslySetInnerHTML={{__html: `
        async function saveProfile() {
          const btn = document.getElementById('btnSave');
          btn.innerText = 'Menyimpan...';
          
          const token = localStorage.getItem('token');
          const data = {
            name: document.getElementById('newName').value,
            password: document.getElementById('newPass').value
          };

          const res = await fetch('/api/member/update-profile', {
            method: 'POST',
            headers: { 
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(data)
          });

          const result = await res.json();
          alert(result.message);
          btn.innerText = 'Simpan Perubahan';
          if(data.password) document.getElementById('newPass').value = '';
        }
      `}} />
    </DashboardLayout>
  );
});