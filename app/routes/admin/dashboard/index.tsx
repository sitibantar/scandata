import { createRoute } from 'honox/factory'
import { DashboardLayout } from '../../../components/DashboardLayout'

export default createRoute(async (c) => {
  // Simulasi Data Server
  const formattedRevenue = "Rp 15.450.000";
  const totalUsers = 124;
  const totalScans = 8540;

  return c.render(
    <DashboardLayout title="Admin Summary" role="admin">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6 xl:grid-cols-3 2xl:gap-7.5">
        
        {/* Card 1: Revenue */}
        <div className="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="mt-4 flex items-end justify-between">
            <div>
              <h4 className="text-title-md font-bold text-black dark:text-white">
                {formattedRevenue}
              </h4>
              <span className="text-sm font-medium">Total Pendapatan (GoPay)</span>
            </div>
            <span className="flex items-center gap-1 text-sm font-medium text-meta-3 text-green-500">
              +4.3% ↗
            </span>
          </div>
        </div>

        {/* Card 2: Users */}
        <div className="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="mt-4 flex items-end justify-between">
            <div>
              <h4 className="text-title-md font-bold text-black dark:text-white">
                {totalUsers}
              </h4>
              <span className="text-sm font-medium">Member Pro Aktif</span>
            </div>
          </div>
        </div>

        {/* Card 3: Scans */}
        <div className="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="mt-4 flex items-end justify-between">
            <div>
              <h4 className="text-title-md font-bold text-black dark:text-white">
                {totalScans}
              </h4>
              <span className="text-sm font-medium">Halaman Dokumen Diproses</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabel Transaksi Terbaru gaya TailAdmin */}
      <div className="mt-8 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="py-6 px-4 md:px-6 xl:px-7.5 border-b border-stroke dark:border-strokedark">
          <h4 className="text-xl font-semibold text-black dark:text-white">Riwayat Transaksi Terbaru</h4>
        </div>
        <div className="p-6 text-center text-sm">
          <p>Tabel riwayat webhook GoPay dimuat di sini...</p>
        </div>
      </div>
    </DashboardLayout>
  )
})