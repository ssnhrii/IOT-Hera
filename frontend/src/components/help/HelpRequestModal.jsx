import { useState } from 'react';
import { helpService } from '../../services/helpService';

const HelpRequestModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    disasterType: '',
    location: '',
    description: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [capturingLocation, setCapturingLocation] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const captureLocation = () => {
    if (!navigator.geolocation) {
      setError('Browser tidak mendukung geolocation');
      return;
    }

    setCapturingLocation(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords = `${position.coords.latitude.toFixed(6)}, ${position.coords.longitude.toFixed(6)}`;
        setFormData(prev => ({ ...prev, location: coords }));
        setCapturingLocation(false);
      },
      (err) => {
        setError('Gagal menangkap lokasi: ' + err.message);
        setCapturingLocation(false);
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await helpService.submitHelpRequest({
        requester: {
          name: formData.name,
          contact: formData.contact
        },
        disasterType: formData.disasterType,
        location: {
          address: formData.location
        },
        description: formData.description
      });
      
      setSuccess(true);
      setTimeout(() => {
        onClose();
        setSuccess(false);
        setFormData({ name: '', contact: '', disasterType: '', location: '', description: '' });
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.error?.message || 'Gagal mengirim aduan');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-6">Modal Form Aduan Bantuan</h2>

          {success ? (
            <div className="text-center py-8">
              <div className="text-6xl mb-4">✅</div>
              <h3 className="text-xl font-semibold text-green-600 mb-2">Aduan Berhasil Dikirim!</h3>
              <p className="text-gray-600">Tim SAR akan segera merespon aduan Anda</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                  {error}
                </div>
              )}

              {/* Nama */}
              <div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Nama Lengkap"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Kontak */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <input
                  type="tel"
                  name="contact"
                  value={formData.contact}
                  onChange={handleChange}
                  placeholder="Nomor Telepon / WhatsApp"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Jenis Bencana */}
              <div className="bg-gray-50 p-4 rounded-lg flex space-x-4">
                <select
                  name="disasterType"
                  value={formData.disasterType}
                  onChange={handleChange}
                  required
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Pilih Jenis Bencana</option>
                  <option value="longsor">Tanah Longsor</option>
                  <option value="banjir">Banjir</option>
                  <option value="gempa">Gempa Bumi</option>
                  <option value="kebakaran">Kebakaran</option>
                  <option value="lainnya">Lainnya</option>
                </select>
              </div>

              {/* Lokasi dengan Map Icon */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex space-x-4">
                  <div className="flex-shrink-0 w-32 h-32 bg-gray-200 rounded-lg flex items-center justify-center">
                    <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <button
                      type="button"
                      onClick={captureLocation}
                      disabled={capturingLocation}
                      className="mb-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:bg-gray-100 text-sm"
                    >
                      {capturingLocation ? '📍 Menangkap...' : '📍 Tambah Lokasi'}
                    </button>
                    <textarea
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="Alamat lengkap atau koordinat GPS"
                      required
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Deskripsi */}
              <div>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Deskripsi situasi darurat (jumlah korban, kondisi, bantuan yang dibutuhkan)"
                  required
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Buttons */}
              <div className="flex space-x-4 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 disabled:bg-gray-400 font-medium"
                >
                  {loading ? 'Mengirim...' : 'Kirim Sinyal'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default HelpRequestModal;
