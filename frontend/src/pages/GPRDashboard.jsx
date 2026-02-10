import { useState, useEffect } from 'react';
import GPRVisualization2D from '../components/gpr/GPRVisualization2D';
import GPRVisualization3D from '../components/gpr/GPRVisualization3D';
import GPRControls from '../components/gpr/GPRControls';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';
import { gprService } from '../services/gprService';

const GPRDashboard = () => {
  const [scans, setScans] = useState([]);
  const [selectedScan, setSelectedScan] = useState(null);
  const [gprData, setGprData] = useState(null);
  const [viewMode, setViewMode] = useState('2D'); // '2D' or '3D'
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchScans();
  }, []);

  const fetchScans = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await gprService.getScans();
      setScans(response.scans || []);
    } catch (err) {
      setError('Gagal memuat daftar scan GPR');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectScan = async (scanId) => {
    try {
      setLoading(true);
      setError(null);
      const data = await gprService.getScanById(scanId);
      setGprData(data);
      setSelectedScan(scanId);
    } catch (err) {
      setError('Gagal memuat data GPR');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">GPR Dashboard</h1>
        <p className="text-gray-600">
          Visualisasi dan analisis data Ground Penetrating Radar
        </p>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Sidebar - Scan List */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Daftar Scan</h2>
            
            {loading && scans.length === 0 ? (
              <LoadingSpinner />
            ) : error && scans.length === 0 ? (
              <ErrorMessage message={error} />
            ) : scans.length === 0 ? (
              <p className="text-gray-500 text-sm">Belum ada data scan</p>
            ) : (
              <div className="space-y-2">
                {scans.map((scan) => (
                  <button
                    key={scan.scanId}
                    onClick={() => handleSelectScan(scan.scanId)}
                    className={`w-full text-left p-3 rounded-lg transition ${
                      selectedScan === scan.scanId
                        ? 'bg-blue-100 border-2 border-blue-500'
                        : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent'
                    }`}
                  >
                    <div className="font-semibold text-sm">{scan.scanId}</div>
                    <div className="text-xs text-gray-600">
                      {scan.location?.name || 'Unknown Location'}
                    </div>
                    <div className="text-xs text-gray-500">
                      {new Date(scan.createdAt).toLocaleDateString('id-ID')}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Main Content - Visualization */}
        <div className="lg:col-span-3">
          {!selectedScan ? (
            <div className="bg-white rounded-lg shadow-md p-12 text-center">
              <div className="text-6xl mb-4">📡</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                Pilih Scan GPR
              </h3>
              <p className="text-gray-600">
                Pilih scan dari daftar di sebelah kiri untuk melihat visualisasi
              </p>
            </div>
          ) : loading ? (
            <div className="bg-white rounded-lg shadow-md p-12">
              <LoadingSpinner />
              <p className="text-center text-gray-600 mt-4">Memuat data GPR...</p>
            </div>
          ) : error ? (
            <div className="bg-white rounded-lg shadow-md p-12">
              <ErrorMessage message={error} />
            </div>
          ) : (
            <>
              {/* Controls */}
              <div className="bg-white rounded-lg shadow-md p-4 mb-6">
                <GPRControls 
                  viewMode={viewMode}
                  onViewModeChange={setViewMode}
                />
              </div>

              {/* Visualization */}
              <div className="bg-white rounded-lg shadow-md p-6">
                {viewMode === '2D' ? (
                  <GPRVisualization2D gprData={gprData} />
                ) : (
                  <GPRVisualization3D gprData={gprData} />
                )}
              </div>

              {/* Metadata */}
              {gprData?.metadata && (
                <div className="bg-white rounded-lg shadow-md p-6 mt-6">
                  <h3 className="text-lg font-semibold mb-4">Informasi Scan</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <span className="text-gray-600">Lokasi:</span>
                      <span className="ml-2 font-semibold">
                        {gprData.metadata.location?.name || 'N/A'}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600">Tanggal:</span>
                      <span className="ml-2 font-semibold">
                        {new Date(gprData.metadata.timestamp).toLocaleString('id-ID')}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600">Equipment:</span>
                      <span className="ml-2 font-semibold">
                        {gprData.metadata.equipment || 'N/A'}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600">Frequency:</span>
                      <span className="ml-2 font-semibold">
                        {gprData.metadata.frequency || 'N/A'} MHz
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default GPRDashboard;
