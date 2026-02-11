import { useState, useEffect } from 'react';
import DisasterList from '../components/bmkg/DisasterList';
import DisasterFilters from '../components/bmkg/DisasterFilters';
import DisasterMap from '../components/bmkg/DisasterMap';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';
import { bmkgService } from '../services/bmkgService';

const BMKGPage = () => {
  const [disasters, setDisasters] = useState([]);
  const [filteredDisasters, setFilteredDisasters] = useState([]);
  const [filters, setFilters] = useState({
    type: '',
    severity: '',
    province: ''
  });
  const [view, setView] = useState('list'); // 'list' or 'map'
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  useEffect(() => {
    fetchDisasters();
    
    // Auto-refresh every 5 minutes
    const interval = setInterval(fetchDisasters, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    applyFilters();
  }, [disasters, filters]);

  const fetchDisasters = async () => {
    try {
      setError(null);
      const response = await bmkgService.getDisasters();
      setDisasters(response.disasters || []);
      setLastUpdated(response.lastUpdated || new Date().toISOString());
    } catch (err) {
      setError('Gagal memuat data bencana dari BMKG');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...disasters];

    if (filters.type) {
      filtered = filtered.filter(d => d.type === filters.type);
    }
    if (filters.severity) {
      filtered = filtered.filter(d => d.severity === filters.severity);
    }
    if (filters.province) {
      filtered = filtered.filter(d => 
        d.location?.province?.toLowerCase().includes(filters.province.toLowerCase())
      );
    }

    setFilteredDisasters(filtered);
  };

  const handleRefresh = () => {
    setLoading(true);
    fetchDisasters();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                Informasi Bencana BMKG
              </h1>
              <p className="text-gray-600">
                Data real-time bencana alam dari Badan Meteorologi, Klimatologi, dan Geofisika
              </p>
              {lastUpdated && (
                <p className="text-sm text-gray-500 mt-2">
                  Terakhir diperbarui: {new Date(lastUpdated).toLocaleString('id-ID')}
                </p>
              )}
            </div>
            <button
              onClick={handleRefresh}
              disabled={loading}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:bg-gray-400"
            >
              {loading ? 'Memuat...' : '🔄 Refresh'}
            </button>
          </div>
        </div>

        {/* View Toggle */}
        <div className="mb-6 flex gap-4">
          <button
            onClick={() => setView('list')}
            className={`px-6 py-2 rounded-lg font-semibold transition ${
              view === 'list'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            📋 Daftar
          </button>
          <button
            onClick={() => setView('map')}
            className={`px-6 py-2 rounded-lg font-semibold transition ${
              view === 'map'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            🗺️ Peta
          </button>
        </div>

        {/* Filters */}
        <div className="mb-6">
          <DisasterFilters
            filters={filters}
            onFilterChange={setFilters}
            disasters={disasters}
          />
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="text-2xl font-bold text-blue-600">
              {filteredDisasters.length}
            </div>
            <div className="text-sm text-gray-600">Total Bencana</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="text-2xl font-bold text-red-600">
              {filteredDisasters.filter(d => d.severity === 'extreme').length}
            </div>
            <div className="text-sm text-gray-600">Ekstrem</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="text-2xl font-bold text-orange-600">
              {filteredDisasters.filter(d => d.severity === 'high').length}
            </div>
            <div className="text-sm text-gray-600">Tinggi</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="text-2xl font-bold text-yellow-600">
              {filteredDisasters.filter(d => d.severity === 'medium').length}
            </div>
            <div className="text-sm text-gray-600">Sedang</div>
          </div>
        </div>

        {/* Content */}
        {loading && disasters.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12">
            <LoadingSpinner />
            <p className="text-center text-gray-600 mt-4">Memuat data bencana...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <div className="flex items-center space-x-3">
              <span className="text-red-600 text-2xl">❌</span>
              <div>
                <h3 className="font-semibold text-red-800">Terjadi Kesalahan</h3>
                <p className="text-red-600">{error}</p>
                <button 
                  onClick={handleRefresh}
                  className="mt-2 text-sm text-red-600 hover:underline"
                >
                  Coba Lagi
                </button>
              </div>
            </div>
          </div>
        ) : filteredDisasters.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Tidak Ada Data
            </h3>
            <p className="text-gray-600">
              {disasters.length === 0 
                ? 'Belum ada data bencana dari BMKG'
                : 'Tidak ada bencana yang sesuai dengan filter'
              }
            </p>
          </div>
        ) : (
          <>
            {view === 'list' ? (
              <DisasterList disasters={filteredDisasters} />
            ) : (
              <DisasterMap disasters={filteredDisasters} />
            )}
          </>
        )}

        {/* Info Section */}
        <div className="mt-8 bg-blue-50 rounded-lg p-6">
          <h3 className="font-semibold text-blue-900 mb-3">
            Tentang Data BMKG
          </h3>
          <ul className="space-y-2 text-sm text-blue-800">
            <li>✓ Data diperbarui otomatis setiap 5 menit</li>
            <li>✓ Sumber: Badan Meteorologi, Klimatologi, dan Geofisika (BMKG)</li>
            <li>✓ Mencakup gempa bumi, tsunami, banjir, tanah longsor, dan letusan gunung berapi</li>
            <li>✓ Informasi severity: Low, Medium, High, Extreme</li>
            <li>✓ Klik "Refresh" untuk memperbarui data secara manual</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BMKGPage;
