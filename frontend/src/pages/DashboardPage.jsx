import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import LoadingSpinner from '../components/common/LoadingSpinner';
import GPRVisualization2D from '../components/gpr/GPRVisualization2D';

const DashboardPage = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    pemindahanAktif: 2,
    korbanTerdeteksi: 12,
    aduanBantuan: 8,
    totalLaporan: 47
  });
  
  const [gprData, setGprData] = useState(null);
  const [depth, setDepth] = useState(5);
  const [sensitivity, setSensitivity] = useState(75);
  const [filterNoise, setFilterNoise] = useState(50);
  
  const [lokasiPemindahan, setLokasiPemindahan] = useState({
    lokasi: 'Cianjur, Jawa Barat',
    koordinat: '-6.8167, 107.1333',
    luas: '400m²'
  });
  
  const [waktuPemindahan, setWaktuPemindahan] = useState({
    mulai: '06 Feb 2026, 08:30',
    durasi: '2 jam 15 menit',
    status: 'Selesai'
  });

  const [deteksi, setDeteksi] = useState({
    terdeteksi: 2,
    organik: 2,
    anorganik: 0
  });
  
  const [kedalaman, setKedalaman] = useState({
    objek1: '1.2m',
    objek2: '2.37m',
    akurasi: '90%'
  });
  
  const [aiResults, setAiResults] = useState([
    {
      id: 1,
      objekId: 'REQ-008',
      klasifikasi: 'Manusia (Organik)',
      kedalaman: '2.5 meter',
      koordinat: '-6.8167, 107.1333',
      ukuranEstimasi: '1.70cm x 50cm',
      status: 'Prioritas Tinggi',
      confidence: 90,
      statusColor: 'red'
    },
    {
      id: 2,
      objekId: 'REQ-007',
      klasifikasi: 'Manusia (Organik)',
      kedalaman: '3.7 meter',
      koordinat: '-6.8166, 107.1336',
      ukuranEstimasi: '165cm x 45cm',
      status: 'Prioritas Sedang',
      confidence: 92,
      statusColor: 'yellow'
    }
  ]);

  const [laporanKegiatan, setLaporanKegiatan] = useState([
    {
      id: 'RPT-001',
      tanggal: '06 Feb 2026',
      lokasi: 'Cianjur, Jawa Barat',
      jenisRencana: 'Longsor',
      korban: '3 orang',
      status: 'Selesai',
      statusColor: 'green'
    },
    {
      id: 'RPT-002',
      tanggal: '04 Feb 2026',
      lokasi: 'Bojonegoro, Kaltim',
      jenisRencana: 'Banjir',
      korban: '2 orang',
      status: 'Selesai',
      statusColor: 'green'
    },
    {
      id: 'RPT-003',
      tanggal: '02 Feb 2026',
      lokasi: 'Lumajang, Jawa Timur',
      jenisRencana: 'Monitoring',
      korban: '-',
      status: 'Berlangsung',
      statusColor: 'yellow'
    }
  ]);
  
  const [aduanBantuanList, setAduanBantuanList] = useState([
    {
      id: 'REQ-008',
      judul: 'Longsor di Desa Cihodes',
      pelapor: 'Budi Santoso',
      telepon: '0812-3456-7890',
      lokasi: 'Desa Cihodes, Cianjur',
      waktu: '10 menit yang lalu',
      deskripsi: 'Terjadi longsor, diperkirakan 3 orang tertimbun. Butuh bantuan segera!',
      status: 'Baru',
      statusColor: 'red'
    },
    {
      id: 'REQ-007',
      judul: 'Banjir di Perumahan Griya Asri',
      pelapor: 'Siti Aminah',
      telepon: '0813-9876-5432',
      lokasi: 'Bojonegoro',
      waktu: '2 jam yang lalu',
      deskripsi: 'Air setinggi 2 meter, ada warga terjebak di lantai 2!',
      status: 'Proses',
      statusColor: 'yellow'
    },
    {
      id: 'REQ-006',
      judul: 'Evakuasi Korban Longsor',
      pelapor: 'Ahmad Yani',
      telepon: '0815-2468-1357',
      lokasi: 'Sukabumi',
      waktu: '1 hari yang lalu',
      deskripsi: 'Korban berhasil dievakuasi dengan bantuan HERA GPR!',
      status: 'Selesai',
      statusColor: 'green'
    }
  ]);
  
  const [bmkgData, setBmkgData] = useState([
    {
      id: 1,
      jenis: 'Peringatan Banjir',
      lokasi: 'Kalimantan Selatan',
      waktu: '5 jam yang lalu',
      deskripsi: 'Potensi banjir tinggi di wilayah Kalimantan dan sekitarnya.',
      tingkat: 'Siaga 2',
      tingkatColor: 'yellow'
    },
    {
      id: 2,
      jenis: 'Tanah Longsor',
      lokasi: 'Jawa Barat',
      waktu: '3 jam yang lalu',
      deskripsi: 'Longsor terjadi di daerah Cianjur. Tim SAR sedang bergerak.',
      tingkat: 'Darurat',
      tingkatColor: 'red'
    },
    {
      id: 3,
      jenis: 'Cuaca Ekstrem',
      lokasi: 'Sulawesi Tengah',
      waktu: '1 hari yang lalu',
      deskripsi: 'Angin kencang dan hujan lebat diprediksi hingga akhir pekan.',
      tingkat: 'Waspada',
      tingkatColor: 'blue'
    }
  ]);

  const [filterStatus, setFilterStatus] = useState('Semua');

  const filteredLaporan = laporanKegiatan.filter(laporan => {
    if (filterStatus === 'Semua') return true;
    return laporan.status === filterStatus;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Dashboard HERA</h1>
              <p className="text-sm text-gray-600">Sistem Pemindai Cerdas Nusantara</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Cari laporan, lokasi..."
                  className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-red-500 text-xl">🔔</span>
                <div className="text-right">
                  <div className="text-sm font-semibold">{user?.name || 'Admin'}</div>
                  <div className="text-xs text-gray-500">
                    {new Date().toLocaleDateString('id-ID', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })}, {new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Pemindahan Aktif</p>
                <p className="text-3xl font-bold text-gray-800">{stats.pemindahanAktif}</p>
                <p className="text-xs text-blue-600 mt-1">↑ 2 dari kemarin</p>
              </div>
              <div className="text-4xl">📍</div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Korban Terdeteksi</p>
                <p className="text-3xl font-bold text-gray-800">{stats.korbanTerdeteksi}</p>
                <p className="text-xs text-gray-500 mt-1">Bulan ini</p>
              </div>
              <div className="text-4xl">👥</div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Aduan Bantuan</p>
                <p className="text-3xl font-bold text-gray-800">{stats.aduanBantuan}</p>
                <p className="text-xs text-yellow-600 mt-1">↑ 3 baru</p>
              </div>
              <div className="text-4xl">⚠️</div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Laporan</p>
                <p className="text-3xl font-bold text-gray-800">{stats.totalLaporan}</p>
                <p className="text-xs text-gray-500 mt-1">Tahun 2026</p>
              </div>
              <div className="text-4xl">📋</div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - GPR Visualization */}
          <div className="lg:col-span-2 space-y-6">
            {/* GPR Visualization */}
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <span className="text-blue-600 text-xl">📡</span>
                  <h2 className="text-lg font-semibold">Visualisasi Data GPR</h2>
                </div>
                <div className="flex space-x-2">
                  <button className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 text-sm">
                    📥 Export Data
                  </button>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm">
                    ➕ Pemindaian Baru
                  </button>
                </div>
              </div>

              <div className="p-6">
                {/* GPR Display */}
                <div className="bg-gray-900 rounded-lg p-8 mb-6" style={{ minHeight: '300px' }}>
                  <div className="text-center text-white">
                    <div className="text-4xl mb-4">📡</div>
                    <h3 className="text-xl font-semibold mb-2">Radargram GPR</h3>
                    <p className="text-gray-400 text-sm">Visualisasi 2D data pemindaian sedimen radar</p>
                    
                    {/* Simulated GPR markers */}
                    <div className="relative mt-8" style={{ height: '150px' }}>
                      <div className="absolute" style={{ left: '30%', top: '40%' }}>
                        <div className="w-8 h-8 bg-red-500 rounded-full animate-pulse flex items-center justify-center">
                          <span className="text-white text-xs">📍</span>
                        </div>
                      </div>
                      <div className="absolute" style={{ left: '60%', top: '60%' }}>
                        <div className="w-8 h-8 bg-red-500 rounded-full animate-pulse flex items-center justify-center">
                          <span className="text-white text-xs">📍</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Controls */}
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <label className="text-sm font-medium text-gray-700">Kedalaman (m)</label>
                      <span className="text-sm text-gray-600">{depth}m</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      value={depth}
                      onChange={(e) => setDepth(e.target.value)}
                      className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <label className="text-sm font-medium text-gray-700">Sensitivitas</label>
                      <span className="text-sm text-gray-600">{sensitivity}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={sensitivity}
                      onChange={(e) => setSensitivity(e.target.value)}
                      className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <label className="text-sm font-medium text-gray-700">Filter Noise</label>
                      <span className="text-sm text-gray-600">{filterNoise}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={filterNoise}
                      onChange={(e) => setFilterNoise(e.target.value)}
                      className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* AI Analysis Results */}
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <span className="text-blue-600 text-xl">🤖</span>
                  <h2 className="text-lg font-semibold">Hasil Analisis AI</h2>
                </div>
                <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm">
                  🔄 Analisis Ulang
                </button>
              </div>

              <div className="p-6 space-y-4">
                {aiResults.map((result) => (
                  <div key={result.id} className="border rounded-lg p-4 hover:shadow-md transition">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="text-3xl">🚨</div>
                        <div>
                          <h3 className="font-semibold text-gray-800">
                            Objek #{result.id} - {result.klasifikasi.split(' ')[0]} Terdeteksi
                          </h3>
                          <p className="text-xs text-gray-500">{result.objekId}</p>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        result.statusColor === 'red' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        Confidence: {result.confidence}%
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3 text-sm mb-3">
                      <div>
                        <span className="text-gray-600">Klasifikasi:</span>
                        <span className="ml-2 font-medium">{result.klasifikasi}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Kedalaman:</span>
                        <span className="ml-2 font-medium">{result.kedalaman}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Koordinat:</span>
                        <span className="ml-2 font-medium">{result.koordinat}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Ukuran Estimasi:</span>
                        <span className="ml-2 font-medium">{result.ukuranEstimasi}</span>
                      </div>
                    </div>
                    
                    <div className="mb-3">
                      <span className={`px-3 py-1 rounded text-xs font-semibold ${
                        result.statusColor === 'red' ? 'bg-red-600 text-white' : 'bg-yellow-500 text-white'
                      }`}>
                        Status: {result.status}
                      </span>
                    </div>

                    <div className="flex space-x-2">
                      <button className="flex-1 px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-sm">
                        ✓ Lihat Peta
                      </button>
                      <button className="flex-1 px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm">
                        📥 Export Data
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Management Laporan Kegiatan */}
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <span className="text-blue-600 text-xl">📋</span>
                  <h2 className="text-lg font-semibold">Management Laporan Kegiatan</h2>
                </div>
                <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm">
                  ➕ Buat Laporan Baru
                </button>
              </div>

              <div className="p-6">
                {/* Filter */}
                <div className="mb-4 flex space-x-2">
                  {['Semua', 'Baru', 'Proses', 'Selesai'].map((status) => (
                    <button
                      key={status}
                      onClick={() => setFilterStatus(status)}
                      className={`px-4 py-2 rounded text-sm font-medium transition ${
                        filterStatus === status
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {status} ({status === 'Semua' ? laporanKegiatan.length : laporanKegiatan.filter(l => l.status === status).length})
                    </button>
                  ))}
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">ID</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Tanggal</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Lokasi</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Jenis Rencana</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Korban</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {filteredLaporan.map((laporan) => (
                        <tr key={laporan.id} className="hover:bg-gray-50">
                          <td className="px-4 py-3 text-sm font-medium">{laporan.id}</td>
                          <td className="px-4 py-3 text-sm">{laporan.tanggal}</td>
                          <td className="px-4 py-3 text-sm">{laporan.lokasi}</td>
                          <td className="px-4 py-3">
                            <span className={`px-2 py-1 rounded text-xs font-medium ${
                              laporan.jenisRencana === 'Longsor' ? 'bg-red-100 text-red-700' :
                              laporan.jenisRencana === 'Banjir' ? 'bg-blue-100 text-blue-700' :
                              'bg-yellow-100 text-yellow-700'
                            }`}>
                              {laporan.jenisRencana}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-sm">{laporan.korban}</td>
                          <td className="px-4 py-3">
                            <span className={`px-2 py-1 rounded text-xs font-medium ${
                              laporan.statusColor === 'green' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                            }`}>
                              {laporan.status}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex space-x-2">
                              <button className="text-blue-600 hover:text-blue-800">👁️</button>
                              <button className="text-green-600 hover:text-green-800">✏️</button>
                              <button className="text-red-600 hover:text-red-800">🗑️</button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Aduan Bantuan dari Guest */}
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <span className="text-orange-600 text-xl">🆘</span>
                  <h2 className="text-lg font-semibold">Aduan Bantuan dari Guest</h2>
                </div>
                <div className="flex space-x-2">
                  {['Semua (8)', 'Baru (3)', 'Proses (2)', 'Selesai (3)'].map((filter) => (
                    <button
                      key={filter}
                      className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-xs"
                    >
                      {filter}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                {aduanBantuanList.map((aduan) => (
                  <div
                    key={aduan.id}
                    className={`border-2 rounded-lg p-4 ${
                      aduan.statusColor === 'red' ? 'border-red-300 bg-red-50' :
                      aduan.statusColor === 'yellow' ? 'border-yellow-300 bg-yellow-50' :
                      'border-green-300 bg-green-50'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${
                        aduan.statusColor === 'red' ? 'bg-red-600 text-white' :
                        aduan.statusColor === 'yellow' ? 'bg-yellow-600 text-white' :
                        'bg-green-600 text-white'
                      }`}>
                        {aduan.id}
                      </span>
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${
                        aduan.statusColor === 'red' ? 'bg-red-200 text-red-800' :
                        aduan.statusColor === 'yellow' ? 'bg-yellow-200 text-yellow-800' :
                        'bg-green-200 text-green-800'
                      }`}>
                        {aduan.status}
                      </span>
                    </div>

                    <h3 className="font-semibold text-gray-800 mb-2">{aduan.judul}</h3>
                    
                    <div className="space-y-1 text-sm mb-3">
                      <div className="flex items-center space-x-2">
                        <span>👤</span>
                        <span className="text-gray-700">{aduan.pelapor}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span>📞</span>
                        <span className="text-gray-700">{aduan.telepon}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span>📍</span>
                        <span className="text-gray-700">{aduan.lokasi}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span>🕐</span>
                        <span className="text-blue-600 text-xs">{aduan.waktu}</span>
                      </div>
                    </div>

                    <p className="text-sm text-gray-600 mb-4 italic">"{aduan.deskripsi}"</p>

                    <div className="flex space-x-2">
                      {aduan.status === 'Baru' && (
                        <>
                          <button className="flex-1 px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-xs">
                            ✓ Terima
                          </button>
                          <button className="flex-1 px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700 text-xs">
                            ✗ Tolak
                          </button>
                        </>
                      )}
                      {aduan.status === 'Proses' && (
                        <>
                          <button className="flex-1 px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-xs">
                            👁️ Detail
                          </button>
                          <button className="flex-1 px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-xs">
                            ✓ Selesai
                          </button>
                        </>
                      )}
                      {aduan.status === 'Selesai' && (
                        <button className="w-full px-3 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 text-xs">
                          📄 Lihat Laporan
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Data Bencana BMKG */}
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <span className="text-orange-600 text-xl">🌊</span>
                  <h2 className="text-lg font-semibold">Data Bencana BMKG</h2>
                </div>
                <button className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 text-sm">
                  🔄 Refresh Data
                </button>
              </div>

              <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                {bmkgData.map((data) => (
                  <div
                    key={data.id}
                    className={`border-2 rounded-lg p-4 ${
                      data.tingkatColor === 'red' ? 'border-red-300 bg-red-50' :
                      data.tingkatColor === 'yellow' ? 'border-yellow-300 bg-yellow-50' :
                      'border-blue-300 bg-blue-50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-3xl">
                        {data.jenis.includes('Banjir') ? '🌊' : data.jenis.includes('Longsor') ? '⛰️' : '⛈️'}
                      </span>
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${
                        data.tingkatColor === 'red' ? 'bg-red-600 text-white' :
                        data.tingkatColor === 'yellow' ? 'bg-yellow-600 text-white' :
                        'bg-blue-600 text-white'
                      }`}>
                        {data.tingkat}
                      </span>
                    </div>

                    <h3 className="font-semibold text-gray-800 mb-2">{data.jenis}</h3>
                    
                    <div className="space-y-1 text-sm mb-3">
                      <div>
                        <span className="text-gray-600">Lokasi:</span>
                        <span className="ml-2 font-medium">{data.lokasi}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Waktu:</span>
                        <span className="ml-2 text-blue-600">{data.waktu}</span>
                      </div>
                    </div>

                    <p className="text-sm text-gray-600 mb-3">{data.deskripsi}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Info Panels */}
          <div className="space-y-6">
            {/* Lokasi Pemindahan */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center space-x-2 mb-4">
                <span className="text-green-600 text-xl">📍</span>
                <h3 className="font-semibold">Lokasi Pemindahan</h3>
              </div>
              <div className="space-y-3 text-sm">
                <div className="bg-gray-50 p-3 rounded">
                  <div className="text-gray-600 mb-1">Lokasi:</div>
                  <div className="font-semibold">{lokasiPemindahan.lokasi}</div>
                </div>
                <div className="bg-gray-50 p-3 rounded">
                  <div className="text-gray-600 mb-1">Koordinat:</div>
                  <div className="font-semibold">{lokasiPemindahan.koordinat}</div>
                </div>
                <div className="bg-gray-50 p-3 rounded">
                  <div className="text-gray-600 mb-1">Luas:</div>
                  <div className="font-semibold">{lokasiPemindahan.luas}</div>
                </div>
              </div>
            </div>

            {/* Waktu Pemindahan */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center space-x-2 mb-4">
                <span className="text-blue-600 text-xl">🕐</span>
                <h3 className="font-semibold">Waktu Pemindahan</h3>
              </div>
              <div className="space-y-3 text-sm">
                <div className="bg-gray-50 p-3 rounded">
                  <div className="text-gray-600 mb-1">Mulai:</div>
                  <div className="font-semibold">{waktuPemindahan.mulai}</div>
                </div>
                <div className="bg-gray-50 p-3 rounded">
                  <div className="text-gray-600 mb-1">Durasi:</div>
                  <div className="font-semibold">{waktuPemindahan.durasi}</div>
                </div>
                <div className="bg-gray-50 p-3 rounded">
                  <div className="text-gray-600 mb-1">Status:</div>
                  <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-semibold">
                    {waktuPemindahan.status}
                  </span>
                </div>
              </div>
            </div>

            {/* Deteksi */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center space-x-2 mb-4">
                <span className="text-purple-600 text-xl">🎯</span>
                <h3 className="font-semibold">Deteksi</h3>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center bg-gray-50 p-3 rounded">
                  <span className="text-gray-600">Objek Terdeteksi:</span>
                  <span className="font-bold text-lg">{deteksi.terdeteksi}</span>
                </div>
                <div className="flex justify-between items-center bg-gray-50 p-3 rounded">
                  <span className="text-gray-600">Organik:</span>
                  <span className="font-bold text-lg">{deteksi.organik}</span>
                </div>
                <div className="flex justify-between items-center bg-gray-50 p-3 rounded">
                  <span className="text-gray-600">Anorganik:</span>
                  <span className="font-bold text-lg">{deteksi.anorganik}</span>
                </div>
              </div>
            </div>

            {/* Kedalaman */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center space-x-2 mb-4">
                <span className="text-indigo-600 text-xl">📏</span>
                <h3 className="font-semibold">Kedalaman</h3>
              </div>
              <div className="space-y-3 text-sm">
                <div className="bg-gray-50 p-3 rounded">
                  <div className="text-gray-600 mb-1">Objek 1:</div>
                  <div className="font-semibold">{kedalaman.objek1}</div>
                </div>
                <div className="bg-gray-50 p-3 rounded">
                  <div className="text-gray-600 mb-1">Objek 2:</div>
                  <div className="font-semibold">{kedalaman.objek2}</div>
                </div>
                <div className="bg-gray-50 p-3 rounded">
                  <div className="text-gray-600 mb-1">Akurasi:</div>
                  <div className="font-semibold text-green-600">{kedalaman.akurasi}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
