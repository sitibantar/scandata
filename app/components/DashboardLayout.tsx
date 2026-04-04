import type { FC } from 'hono/jsx';

export const DashboardLayout: FC<{ title: string; children: any }> = ({ title, children }) => {
  // SVG Icons
  const HomeIcon = <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>;
  const ProjectIcon = <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" /></svg>;
  const DocIcon = <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>;
  const CodeIcon = <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>;
  const UserIcon = <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>;

  return (
    <html lang="id">
      <head>
        <title>{title} - Scanner Pro</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
        <script src="https://cdn.tailwindcss.com"></script>
        <style dangerouslySetInnerHTML={{__html: `
          body { padding-bottom: 80px; }
          @media (min-width: 768px) { body { padding-bottom: 0; padding-left: 16rem; } }
        `}} />
      </head>
      <body className="bg-slate-50 font-sans antialiased text-slate-800">
        
        {/* DESKTOP SIDEBAR */}
        <aside className="hidden md:flex flex-col w-64 h-screen fixed top-0 left-0 bg-white border-r border-slate-200 z-50">
          <div className="p-6 border-b border-slate-100">
            <h1 className="text-2xl font-black text-blue-600 tracking-tight">Scanner<span className="text-slate-800">Pro</span></h1>
          </div>
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            <a href="/member/dashboard" className="flex items-center gap-3 p-3 rounded-xl hover:bg-blue-50 text-slate-600 hover:text-blue-600 transition font-medium">{HomeIcon} Dashboard</a>
            
            {/* INI MENU PROJECT YANG KETINGGALAN */}
            <a href="/member/projects" className="flex items-center gap-3 p-3 rounded-xl hover:bg-blue-50 text-slate-600 hover:text-blue-600 transition font-medium">{ProjectIcon} Projects</a>
            
            <a href="/member/templates" className="flex items-center gap-3 p-3 rounded-xl hover:bg-blue-50 text-slate-600 hover:text-blue-600 transition font-medium">{DocIcon} Templates</a>
            <a href="/member/api-management" className="flex items-center gap-3 p-3 rounded-xl hover:bg-blue-50 text-slate-600 hover:text-blue-600 transition font-medium">{CodeIcon} API Keys</a>
            <a href="/member/settings" className="flex items-center gap-3 p-3 rounded-xl hover:bg-blue-50 text-slate-600 hover:text-blue-600 transition font-medium">{UserIcon} Profil</a>
          </nav>
        </aside>

        {/* MOBILE HEADER */}
        <header className="md:hidden bg-white border-b border-slate-200 p-4 sticky top-0 z-40 shadow-sm flex justify-center items-center">
          <h1 className="text-xl font-black text-blue-600 tracking-tight">{title}</h1>
        </header>

        {/* KONTEN UTAMA */}
        <main className="p-4 md:p-8 max-w-5xl mx-auto">
          {children}
        </main>

        {/* STICKY BOTTOM NAV MOBILE */}
        <nav className="md:hidden fixed bottom-0 left-0 w-full bg-white border-t border-slate-200 flex justify-between items-center h-16 z-50 shadow-[0_-4px_10px_rgba(0,0,0,0.03)] px-2 pb-safe">
          <a href="/member/dashboard" className="flex flex-col items-center justify-center w-full h-full text-slate-400 hover:text-blue-600 active:text-blue-600 transition">
            {HomeIcon}
            <span className="text-[9px] font-semibold mt-1">Home</span>
          </a>
          
          {/* MENU PROJECT DI MOBILE */}
          <a href="/member/projects" className="flex flex-col items-center justify-center w-full h-full text-slate-400 hover:text-blue-600 active:text-blue-600 transition">
            {ProjectIcon}
            <span className="text-[9px] font-semibold mt-1">Projects</span>
          </a>

          <a href="/member/templates" className="flex flex-col items-center justify-center w-full h-full text-slate-400 hover:text-blue-600 active:text-blue-600 transition">
            {DocIcon}
            <span className="text-[9px] font-semibold mt-1">Template</span>
          </a>
          <a href="/member/api-management" className="flex flex-col items-center justify-center w-full h-full text-slate-400 hover:text-blue-600 active:text-blue-600 transition">
            {CodeIcon}
            <span className="text-[9px] font-semibold mt-1">API</span>
          </a>
          <a href="/member/settings" className="flex flex-col items-center justify-center w-full h-full text-slate-400 hover:text-blue-600 active:text-blue-600 transition">
            {UserIcon}
            <span className="text-[9px] font-semibold mt-1">Profil</span>
          </a>
        </nav>

      </body>
    </html>
  );
};