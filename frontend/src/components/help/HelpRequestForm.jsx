import { useState } from 'react';
import { helpService } from '../../services/helpService';
import ErrorMessage from '../common/ErrorMessage';

const HelpRequestForm = ({ onSubmitSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    address: '',
    description: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [capturingLocation, setCapturingLocation] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const captureLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation tidak didukung oleh browser Anda');
      return;
    }

    setCapturingLocation(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setFormData(prev => ({
          ...prev,
          coordinates: {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }
        }));
        setCapturingLocation(false);
        alert('Lokasi berhasil ditangkap!');
      },
      (error) => {
        setCapturingLocation(false);
        alert('Gagal menangkap lokasi: ' + error.message);
      }
    );
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Nama wajib diisi';
    if (!formData.contact.trim()) newErrors.contact = 'Kontak wajib diisi';
    if (!formData.address.trim()) newErrors.address = 'Alamat wajib diisi';
    if (!formData.description.trim()) newErrors.description = 'Deskripsi darurat wajib diisi';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!validateForm()) return;

    try {
      setLoading(true);
      const response = await helpService.submitHelpRequest({
        requester: {
          name: formData.name,
          contact: formData.contact
        },
        location: {
          address: formData.address,
          coordinates: formData.coordinates
        },
        description: formData.description
      });
      
      if (onSubmitSuccess) {
        onSubmitSuccess(response.referenceNumber);
      }
    } catch (err) {
      setError(err.response?.data?.error?.message || 'Gagal mengirim aduan');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && <ErrorMessage message={error} type="error" />}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Nama Lengkap *</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
            errors.name ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Nama Anda"
        />
        {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Nomor Kontak (HP/WA) *</label>
        <input
          type="text"
          name="contact"
          value={formData.contact}
          onChange={handleChange}
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
            errors.contact ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="08xxxxxxxxxx"
        />
        {errors.contact && <p className="mt-1 text-sm text-red-600">{errors.contact}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Alamat Lokasi Darurat *</label>
        <textarea
          name="address"
          value={formData.address}
          onChange={handleChange}
          rows={3}
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
            errors.address ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Alamat lengkap lokasi kejadian"
        />
        {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address}</p>}
        
        <button
          type="button"
          onClick={captureLocation}
          disabled={capturingLocation}
          className="mt-2 text-sm text-blue-600 hover:underline disabled:text-gray-400"
        >
          {capturingLocation ? '📍 Menangkap lokasi...' : '📍 Tangkap Lokasi GPS'}
        </button>
        {formData.coordinates && (
          <p className="mt-1 text-xs text-green-600">
            ✓ Koordinat GPS ditangkap: {formData.coordinates.lat.toFixed(6)}, {formData.coordinates.lng.toFixed(6)}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Deskripsi Situasi Darurat *</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={5}
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
            errors.description ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Jelaskan situasi darurat dengan detail (jumlah korban, kondisi, bantuan yang dibutuhkan, dll)"
        />
        {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition disabled:bg-gray-400"
      >
        {loading ? 'Mengirim...' : '🆘 Kirim Aduan Darurat'}
      </button>
    </form>
  );
};

export default HelpRequestForm;
