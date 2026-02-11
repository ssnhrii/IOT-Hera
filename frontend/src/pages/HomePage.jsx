import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import HelpRequestModal from '../components/help/HelpRequestModal';

const HomePage = () => {
  const { isAuthenticated } = useAuth();
  const [showHelpModal, setShowHelpModal] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-6xl font-bold mb-6 text-gray-800">HERA</h1>
            <p className="text-3xl mb-4 text-gray-700">Pemindai Cerdas Nusantara</p>
            <p className="text-xl mb-6 text-gray-600">
              Smart Scanner for Disaster Victim Detection
            </p>
            <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Sistem deteksi korban bencana menggunakan teknologi Ground Penetrating Radar (GPR) 
              dan analisis AI untuk membantu operasi SAR di Indonesia. Deteksi cepat, akurat, dan real-time.
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowHelpModal(true)}
                className="bg-red-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-700 transition"
              >
                Aduan Bantuan
              </button>
              <Link 
                to="/bmkg" 
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                Lihat Bencana
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Help Request Modal */}
      <HelpRequestModal isOpen={showHelpModal} onClose={() => setShowHelpModal(false)} />

      {/* Cards Section - 4 Cards */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {/* Card 1 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
              <div className="h-48 bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                <span className="text-white text-6xl">📡</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-gray-800">Teknologi GPR</h3>
                <p className="text-gray-600 text-sm mb-3">
                  Ground Penetrating Radar untuk deteksi objek di bawah permukaan tanah
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Kedalaman hingga 10m</li>
                  <li>• Akurasi tinggi</li>
                  <li>• Real-time scanning</li>
                </ul>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
              <div className="h-48 bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
                <span className="text-white text-6xl">🤖</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-gray-800">Analisis AI</h3>
                <p className="text-gray-600 text-sm mb-3">
                  Artificial Intelligence untuk klasifikasi objek organik dan inorganik
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Deteksi otomatis</li>
                  <li>• Confidence score</li>
                  <li>• Prioritas tinggi</li>
                </ul>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
              <div className="h-48 bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center">
                <span className="text-white text-6xl">🆘</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-gray-800">Aduan Bantuan</h3>
                <p className="text-gray-600 text-sm mb-3">
                  Sistem pelaporan darurat untuk masyarakat tanpa perlu login
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Tanpa login</li>
                  <li>• Response cepat</li>
                  <li>• 24/7 monitoring</li>
                </ul>
              </div>
            </div>

            {/* Card 4 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
              <div className="h-48 bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
                <span className="text-white text-6xl">⚠️</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-gray-800">Data BMKG</h3>
                <p className="text-gray-600 text-sm mb-3">
                  Informasi bencana real-time dari BMKG untuk antisipasi dini
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Update real-time</li>
                  <li>• Multi bencana</li>
                  <li>• Tingkat bahaya</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Petugas Features - Hanya tampil jika sudah login */}
      {isAuthenticated && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Fitur Petugas</h2>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* Dashboard */}
              <Link to="/dashboard" className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition border-2 border-blue-200">
                <div className="text-blue-600 text-5xl mb-4 text-center">📊</div>
                <h3 className="text-2xl font-semibold mb-3 text-center">Dashboard</h3>
                <p className="text-gray-600 mb-4 text-center">
                  Dashboard lengkap dengan visualisasi GPR, AI Analysis, dan management laporan
                </p>
                <div className="text-center">
                  <span className="text-blue-600 font-semibold">Buka Dashboard →</span>
                </div>
              </Link>
              
              {/* GPR Visualization */}
              <Link to="/gpr" className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition">
                <div className="text-blue-600 text-5xl mb-4 text-center">📡</div>
                <h3 className="text-2xl font-semibold mb-3 text-center">Visualisasi GPR</h3>
                <p className="text-gray-600 mb-4 text-center">
                  Visualisasi data Ground Penetrating Radar dalam format 2D dan 3D interaktif
                </p>
                <div className="text-center">
                  <span className="text-blue-600 font-semibold">Buka GPR →</span>
                </div>
              </Link>

              {/* AI Analysis */}
              <Link to="/ai-analysis" className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition">
                <div className="text-blue-600 text-5xl mb-4 text-center">🤖</div>
                <h3 className="text-2xl font-semibold mb-3 text-center">Analisis AI</h3>
                <p className="text-gray-600 mb-4 text-center">
                  Deteksi otomatis objek organik dan inorganik menggunakan AI dengan confidence score
                </p>
                <div className="text-center">
                  <span className="text-blue-600 font-semibold">Lihat Analisis →</span>
                </div>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section untuk Guest */}
      {!isAuthenticated && (
        <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Petugas SAR atau Tim Tanggap Darurat?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Login untuk mengakses Dashboard lengkap, Visualisasi GPR, AI Analysis, dan Management Laporan
            </p>
            <Link 
              to="/login" 
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition inline-block shadow-lg"
            >
              Masuk Petugas →
            </Link>
          </div>
        </section>
      )}

      {/* Footer Info */}
      <section className="py-12 bg-gray-800 text-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl mb-3">📞</div>
              <h3 className="font-semibold mb-2">Kontak Darurat</h3>
              <p className="text-gray-300 text-sm">Hubungi: 112 (SAR Indonesia)</p>
            </div>
            <div>
              <div className="text-4xl mb-3">📧</div>
              <h3 className="font-semibold mb-2">Email</h3>
              <p className="text-gray-300 text-sm">info@hera.go.id</p>
            </div>
            <div>
              <div className="text-4xl mb-3">🌐</div>
              <h3 className="font-semibold mb-2">Kerjasama</h3>
              <p className="text-gray-300 text-sm">BMKG, BNPB, Basarnas</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Pertanyaan Umum</h2>
            
            <div className="space-y-4">
              {/* FAQ 1 */}
              <details className="bg-gray-50 rounded-lg p-6 cursor-pointer hover:bg-gray-100 transition">
                <summary className="font-semibold text-lg text-gray-800 flex justify-between items-center">
                  Bagaimana cara kerja sistem HERA?
                  <span className="text-blue-600">▼</span>
                </summary>
                <p className="mt-4 text-gray-600">
                  HERA menggunakan teknologi Ground Penetrating Radar (GPR) untuk memindai area bencana. 
                  Data GPR kemudian dianalisis menggunakan AI untuk mendeteksi dan mengklasifikasikan objek 
                  organik (korban) dan inorganik. Sistem memberikan lokasi, kedalaman, dan confidence score 
                  untuk setiap deteksi.
                </p>
              </details>

              {/* FAQ 2 */}
              <details className="bg-gray-50 rounded-lg p-6 cursor-pointer hover:bg-gray-100 transition">
                <summary className="font-semibold text-lg text-gray-800 flex justify-between items-center">
                  Siapa yang bisa menggunakan sistem ini?
                  <span className="text-blue-600">▼</span>
                </summary>
                <p className="mt-4 text-gray-600">
                  Sistem HERA terbuka untuk umum dengan akses terbatas. Masyarakat dapat melihat laporan 
                  kegiatan, mengirim aduan bantuan, dan melihat data bencana BMKG tanpa login. Untuk akses 
                  penuh (GPR, AI Analysis, Management), diperlukan akun petugas SAR.
                </p>
              </details>

              {/* FAQ 3 */}
              <details className="bg-gray-50 rounded-lg p-6 cursor-pointer hover:bg-gray-100 transition">
                <summary className="font-semibold text-lg text-gray-800 flex justify-between items-center">
                  Bagaimana cara mengirim aduan bantuan?
                  <span className="text-blue-600">▼</span>
                </summary>
                <p className="mt-4 text-gray-600">
                  Klik tombol "Aduan Bantuan" di halaman utama atau menu navigasi. Isi formulir dengan 
                  informasi lokasi, jenis bencana, dan deskripsi situasi. Tidak perlu login. Tim SAR akan 
                  segera merespon aduan Anda.
                </p>
              </details>

              {/* FAQ 4 */}
              <details className="bg-gray-50 rounded-lg p-6 cursor-pointer hover:bg-gray-100 transition">
                <summary className="font-semibold text-lg text-gray-800 flex justify-between items-center">
                  Seberapa akurat deteksi AI?
                  <span className="text-blue-600">▼</span>
                </summary>
                <p className="mt-4 text-gray-600">
                  Sistem AI HERA memiliki tingkat akurasi hingga 90-95% dalam kondisi ideal. Setiap deteksi 
                  dilengkapi dengan confidence score yang menunjukkan tingkat kepercayaan sistem. Deteksi 
                  dengan confidence tinggi (&gt;85%) diprioritaskan untuk verifikasi tim SAR.
                </p>
              </details>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
