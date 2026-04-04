import { createRoute } from 'honox/factory'

export default createRoute(async (c) => {
  const db = c.env.DB
  
  // Fetch data user beserta total halaman yang pernah mereka scan (dari tabel scan_history)
  const { results: members } = await db.prepare(`
    SELECT 
      u.id, u.email, u.package_type, u.created_at,
      COALESCE(SUM(s.pages_scanned), 0) as total_scans
    FROM users u
    LEFT JOIN scan_history s ON u.id = s.user_id
    GROUP BY u.id
    ORDER BY u.created_at DESC
  `).all()

  return c.render(
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Members Management</h1>
      
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email User</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Paket</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total Halaman Scan</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tgl Daftar</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Aksi</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {members.map((member: any) => (
              <tr key={member.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">{member.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    member.package_type === 'pro' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {member.package_type.toUpperCase()}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{member.total_scans} Halaman</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(member.created_at).toLocaleDateString('id-ID')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-indigo-600 hover:text-indigo-900 mr-3">Edit</button>
                  <button className="text-red-600 hover:text-red-900">Ban</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>,
    { title: 'Manage Members' }
  )
})