import { useState } from 'react';

const ReportForm = ({ report, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: report?.title || '',
    description: report?.description || '',
    location: report?.location?.name || '',
    date: report?.date ? new Date(report.date).toISOString().split('T')[0] : '',
    isPublic: report?.isPublic !== undefined ? report.isPublic : true,
    status: report?.status || 'draft'
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Judul wajib diisi';
    if (!formData.description.trim()) newErrors.description = 'Deskripsi wajib diisi';
    if (!formData.location.trim()) newErrors.location = 'Lokasi wajib diisi';
    if (!formData.date) newErrors.date = 'Tanggal wajib diisi';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setLoading(true);
      await onSubmit({ ...formData, location: { name: formData.location } });
    } catch (error) {
      setErrors({ submit: error.response?.data?.error?.message || 'Gagal menyimpan laporan' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {errors.submit && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 text-red-700">{errors.submit}</div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Judul Laporan *</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
            errors.title ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Contoh: Operasi SAR Banjir Bandang Desa X"
        />
        {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Lokasi *</label>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
            errors.location ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Contoh: Desa Sukamaju, Kec. Cianjur, Jawa Barat"
        />
        {errors.location && <p className="mt-1 text-sm text-red-600">{errors.location}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Tanggal Kegiatan *</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
            errors.date ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.date && <p className="mt-1 text-sm text-red-600">{errors.date}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Deskripsi Kegiatan *</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={8}
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
            errors.description ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Jelaskan detail kegiatan operasi SAR..."
        />
        {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>

        <div className="flex items-center">
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              name="isPublic"
              checked={formData.isPublic}
              onChange={handleChange}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="ml-2 text-sm font-medium text-gray-700">Tampilkan ke publik</span>
          </label>
        </div>
      </div>

      <div className="flex gap-4 pt-4">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:bg-gray-400"
        >
          {loading ? 'Menyimpan...' : report ? 'Update Laporan' : 'Buat Laporan'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-3 border border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition"
        >
          Batal
        </button>
      </div>
    </form>
  );
};

export default ReportForm;
