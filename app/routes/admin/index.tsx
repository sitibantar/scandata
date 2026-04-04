import { createRoute } from 'honox/factory';

export default createRoute((c) => {
  return c.render(
    <html lang="id">
      <head>
        <title>Admin Login</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script src="https://cdn.tailwindcss.com"></script>
      </head>
      <body className="font-sans antialiased bg-slate-900">
        <div className="min-h-screen flex items-center justify-center p-6">
          <div className="w-full max-w-md bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/10 shadow-2xl">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500 rounded-2xl mb-4 shadow-lg shadow-blue-500/20">
                <span className="text-2xl text-white font-bold">SA</span>
              </div>
              <h1 className="text-2xl font-bold text-white tracking-tight">Scanner Admin</h1>
              <p className="text-slate-400 mt-2">Hanya untuk personel berwenang</p>
            </div>

            <form className="space-y-5">
              <input type="email" placeholder="Admin Email" className="w-full bg-white/5 border border-white/10 px-4 py-3 rounded-xl text-white outline-none focus:border-blue-500 transition" />
              <input type="password" placeholder="Admin Password" className="w-full bg-white/5 border border-white/10 px-4 py-3 rounded-xl text-white outline-none focus:border-blue-500 transition" />
              <button className="w-full bg-blue-500 text-white font-bold py-3.5 rounded-xl hover:bg-blue-400 transition shadow-xl shadow-blue-500/20">
                Akses Dashboard
              </button>
            </form>
          </div>
        </div>
      </body>
    </html>
  );
});