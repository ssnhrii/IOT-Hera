import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-semibold mb-4">HERA</h3>
            <p className="text-gray-400 text-sm">
              Pemindai Cerdas Nusantara - Sistem deteksi korban bencana menggunakan 
              teknologi GPR dan AI untuk membantu operasi SAR di Indonesia.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Menu Cepat</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition">
                  Beranda
                </Link>
              </li>
              <li>
                <Link to="/reports" className="text-gray-400 hover:text-white transition">
                  Laporan Kegiatan
                </Link>
              </li>
              <li>
                <Link to="/help-request" className="text-gray-400 hover:text-white transition">
                  Aduan Bantuan
                </Link>
              </li>
              <li>
                <Link to="/bmkg" className="text-gray-400 hover:text-white transition">
                  Info Bencana BMKG
                </Link>
              </li>
            </ul>
          </div>

          {/* Features */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Fitur</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>📡 Visualisasi GPR 2D/3D</li>
              <li>🤖 Analisis AI</li>
              <li>📋 Manajemen Laporan</li>
              <li>🆘 Aduan Darurat</li>
              <li>⚠️ Integrasi BMKG</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Kontak Darurat</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>📞 Hotline: 112</li>
              <li>📧 Email: info@hera.go.id</li>
              <li>🏢 BNPB Indonesia</li>
              <li>🌐 www.bnpb.go.id</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm text-gray-400">
          <p>
            &copy; {currentYear} HERA - Pemindai Cerdas Nusantara. All rights reserved.
          </p>
          <p className="mt-2">
            Dikembangkan untuk mendukung operasi SAR dan tanggap bencana di Indonesia
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
