import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const HomePage = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">HERA</h1>
            <p className="text-2xl mb-4">Pemindai Cerdas Nusantara</p>
            <p className="text-xl mb-8 text-blue-100">
              Smart Scanner for Disaster Victim Detection
            </p>
            <p className="text-lg mb-8">
              Sistem deteksi korban bencana menggunakan teknologi Ground Penetrating Radar (GPR) 
              dan analisis AI untuk membantu operasi SAR di Indonesia
            </p>
          </div>
        </div>
      </section>

      {/* Public Services - 3 Fitur Utama untuk Guest */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Layanan Publik</h2>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* 1. Laporan Kegiatan */}
            <Link to="/reports" className="bg-gray-50 p-8 rounded-lg shadow-md hover:shadow-lg transition">
              <div className="text-blue-600 text-5xl mb-4 text-center">📋</div>
              <h3 className="text-2xl font-semibold mb-3 text-center">Laporan Kegiatan</h3>
              <p className="text-gray-600 mb-4 text-center">
                Lihat dokumentasi lengkap operasi tanggap bencana dan kegiatan SAR
              </p>
              <div className="text-center">
                <span className="text-blue-600 font-semibold">Lihat Laporan →</span>
              </div>
            </Link>

            {/* 2. Aduan Bantuan */}
            <Link to="/help-request" className="bg-red-50 p-8 rounded-lg shadow-md hover:shadow-lg transition border-2 border-red-200">
              <div className="text-red-600 text-5xl mb-4 text-center">🆘</div>
              <h3 className="text-2xl font-semibold mb-3 text-center">Aduan Bantuan</h3>
              <p className="text-gray-600 mb-4 text-center">
                Kirim permintaan bantuan darurat saat terjadi bencana. Tidak perlu login!
              </p>
              <div className="text-center">
                <span className="text-red-600 font-semibold">Kirim Aduan →</span>
              </div>
            </Link>

            {/* 3. Info Bencana BMKG */}
            <Link to="/bmkg" className="bg-orange-50 p-8 rounded-lg shadow-md hover:shadow-lg transition border-2 border-orange-200">
              <div className="text-orange-600 text-5xl mb-4 text-center">⚠️</div>
              <h3 className="text-2xl font-semibold mb-3 text-center">Info Bencana BMKG</h3>
              <p className="text-gray-600 mb-4 text-center">
                Informasi real-time tentang bencana alam dari BMKG. Update otomatis setiap 5 menit
              </p>
              <div className="text-center">
                <span className="text-orange-600 font-semibold">Lihat Info →</span>
              </div>
            </Link>
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
        <section className="py-16 bg-blue-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Petugas SAR?</h2>
            <p className="text-xl mb-8">
              Login untuk mengakses fitur GPR Visualization, AI Analysis, dan Management Laporan
            </p>
            <Link 
              to="/login" 
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition inline-block"
            >
              Login Petugas
            </Link>
          </div>
        </section>
      )}

      {/* Info Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">Tentang HERA</h2>
            <div className="prose max-w-none text-gray-700">
              <p className="text-lg mb-4">
                HERA (Pemindai Cerdas Nusantara) adalah sistem berbasis web yang mengintegrasikan 
                teknologi Ground Penetrating Radar (GPR) dengan analisis Artificial Intelligence (AI) 
                untuk membantu operasi Search and Rescue (SAR) dalam mendeteksi korban bencana.
              </p>
              <p className="text-lg mb-4">
                Sistem ini dirancang khusus untuk kondisi bencana di Indonesia seperti tanah longsor 
                dan banjir bandang, di mana korban mungkin tertimbun material dan sulit dideteksi 
                secara visual.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">24/7</div>
              <div className="text-gray-600">Monitoring</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">AI</div>
              <div className="text-gray-600">Powered Detection</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">Real-time</div>
              <div className="text-gray-600">BMKG Integration</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">Fast</div>
              <div className="text-gray-600">Response Time</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
