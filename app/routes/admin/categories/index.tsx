import { createRoute } from 'honox/factory'

export default createRoute(async (c) => {
  const db = c.env.DB
  
  // Fetch daftar kategori dari D1
  const { results: categories } = await db.prepare("SELECT * FROM categories ORDER BY created_at DESC").all()

  return c.render(
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Category Management</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Form Tambah Kategori */}
        <div className="bg-white p-6 rounded-lg shadow-sm h-fit">
          <h2 className="text-lg font-semibold mb-4">Tambah Kategori Baru</h2>
          <form action="/api/admin/categories" method="POST" className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Nama Kategori</label>
              <input 
                type="text" 
                name="name" 
                className="mt-1 w-full border p-2 rounded" 
                placeholder="Cth: Dokumen Kependudukan" 
                required 
              />
            </div>
            <button type="submit" className="w-full bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
              Simpan Kategori
            </button>
          </form>
        </div>

        {/* List Kategori */}
        <div className="md:col-span-2 bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Daftar Kategori</h2>
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama Kategori</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {categories.map((cat: any) => (
                <tr key={cat.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{cat.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-red-600 hover:text-red-900">Hapus</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>,
    { title: 'Manage Categories' }
  )
})