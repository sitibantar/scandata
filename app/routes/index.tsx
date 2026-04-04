import { createRoute } from 'honox/factory';

export default createRoute((c) => {
  return c.render(
    <html lang="id">
      <head>
        <title>SaaS Scanner Pro</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script src="https://cdn.tailwindcss.com"></script>
      </head>
      <body className="bg-slate-50 font-sans text-slate-800 antialiased">
        
        {/* Navbar */}
        <nav className="border-b border-slate-200 bg-white py-4">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-6">
            <h1 className="text-2xl font-bold text-blue-600">SaaS Scanner</h1>
            <div className="flex gap-4">
              <a href="/member/login" className="font-medium text-slate-600 hover:text-blue-600 py-2">Login</a>
              <a href="/member/register" className="rounded-lg bg-blue-600 px-5 py-2 font-medium text-white hover:bg-blue-700 transition">Mulai Gratis</a>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <header className="mx-auto max-w-4xl py-24 text-center px-6">
          <span className="mb-4 inline-block rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700">🚀 Rilis v1.0 - Dukungan Desktop & Android</span>
          <h2 className="mb-6 text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
            Ubah Kertas Menjadi Data dalam Detik
          </h2>
          <p className="mx-auto mb-10 max-w-2xl text-lg text-slate-600">
            Pemindai pintar berbasis AI. Privasi terjamin karena data diproses sepenuhnya di perangkat lokal Anda (Zero Data Retention).
          </p>
          <div className="flex justify-center gap-4">
            <a href="/member/register" className="rounded-lg bg-blue-600 px-8 py-3.5 text-lg font-semibold text-white shadow-lg hover:bg-blue-700 transition">Coba Gratis Sekarang</a>
          </div>
        </header>

      </body>
    </html>
  );
});