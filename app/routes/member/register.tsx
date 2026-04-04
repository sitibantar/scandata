import { createRoute } from 'honox/factory';

export default createRoute((c) => {
  return c.render(
    <html lang="id">
      <head>
        <title>Daftar Akun - Scanner Pro</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script src="https://cdn.tailwindcss.com"></script>
      </head>
      <body className="bg-slate-50 font-sans antialiased">
        <div className="min-h-screen flex items-center justify-center p-6">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-slate-100">
            <h1 className="text-3xl font-bold text-slate-900 text-center mb-8">Buat Akun</h1>
            
            {/* onsubmit langsung menahan aksi default form */}
            <form id="regForm" className="space-y-5" onsubmit="event.preventDefault(); submitRegister();">
              <input type="text" id="name" name="name" required className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500" placeholder="Nama Lengkap" />
              <input type="email" id="email" name="email" required className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500" placeholder="Email" />
              <input type="password" id="pass" name="password" required className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500" placeholder="Password" />
              
              <button type="submit" id="btnSubmit" className="w-full bg-blue-600 text-white font-bold py-3.5 rounded-xl hover:bg-blue-700 transition">Daftar Sekarang</button>
            </form>

            <div className="mt-8 text-center border-t border-slate-100 pt-6">
              <p className="text-slate-600">Sudah punya akun? <a href="/member/login" className="text-blue-600 font-semibold hover:underline">Masuk</a></p>
            </div>

            <script dangerouslySetInnerHTML={{ __html: `
              async function submitRegister() {
                const btn = document.getElementById('btnSubmit');
                btn.innerText = 'Memproses...';
                btn.disabled = true;
                
                const data = {
                  name: document.getElementById('name').value,
                  email: document.getElementById('email').value,
                  password: document.getElementById('pass').value
                };

                try {
                  const res = await fetch('/api/auth/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                  });

                  const result = await res.json();
                  if (result.status === 'success') {
                    alert('Pendaftaran Berhasil! Silakan Login.');
                    window.location.href = '/member/login';
                  } else {
                    alert('Gagal: ' + result.message);
                    btn.innerText = 'Daftar Sekarang';
                    btn.disabled = false;
                  }
                } catch(e) {
                  alert('Terjadi kesalahan jaringan.');
                  btn.innerText = 'Daftar Sekarang';
                  btn.disabled = false;
                }
              }
            `}} />
          </div>
        </div>
      </body>
    </html>
  );
});