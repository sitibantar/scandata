import { createRoute } from 'honox/factory';

export default createRoute((c) => {
  return c.render(
    <html lang="id">
      <head>
        <title>Login Member</title>
        <script src="https://cdn.tailwindcss.com"></script>
      </head>
      <body className="bg-slate-50 flex items-center justify-center min-h-screen">
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-slate-100">
          <h1 className="text-2xl font-bold mb-6 text-center">Login Member</h1>
          <form id="logForm" className="space-y-4">
            <input type="email" id="email" required className="w-full px-4 py-3 border rounded-xl" placeholder="Email" />
            <input type="password" id="pass" required className="w-full px-4 py-3 border rounded-xl" placeholder="Password" />
            <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold">Masuk</button>
          </form>
          <script dangerouslySetInnerHTML={{ __html: `
            document.getElementById('logForm').addEventListener('submit', async (e) => {
              e.preventDefault();
              const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  email: document.getElementById('email').value,
                  password: document.getElementById('pass').value
                })
              });
              const result = await res.json();
              if (result.status === 'success') {
                localStorage.setItem('token', result.token);
                window.location.href = '/member/projects';
              } else {
                alert(result.message);
              }
            });
          `}} />
        </div>
      </body>
    </html>
  );
});