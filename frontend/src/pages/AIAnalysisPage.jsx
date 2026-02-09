import { useState, useEffect } from 'react';
import AIAnalysisResults from '../components/ai/AIAnalysisResults';
import AnalysisSummary from '../components/ai/AnalysisSummary';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';
import { aiService } from '../services/aiService';
import { gprService } from '../services/gprService';

const AIAnalysisPage = () => {
  const [scans, setScans] = useState([]);
  const [selectedScan, setSelectedScan] = useState(null);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [analyzing, setAnalyzing] = useState(false);
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
      setError('Gagal memuat daftar scan');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectScan = async (scanId) => {
    try {
      setLoading(true);
      setError(null);
      setSelectedScan(scanId);
      
      // Try to fetch existing analysis
      const result = await aiService.getAnalysis(scanId);
      setAnalysisResult(result);
    } catch (err) {
      // No analysis found yet
      setAnalysisResult(null);
      console.log('No analysis found for this scan');
    } finally {
      setLoading(false);
    }
  };

  const handleAnalyze = async () => {
    if (!selectedScan) return;
    
    try {
      setAnalyzing(true);
      setError(null);
      
      // Trigger analysis
      await aiService.analyzeGPR(selectedScan);
      
      // Fetch the result
      const result = await aiService.getAnalysis(selectedScan);
      setAnalysisResult(result);
    } catch (err) {
      setError('Gagal melakukan analisis AI');
      console.error(err);
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">AI Analysis</h1>
        <p className="text-gray-600">
          Analisis otomatis deteksi objek organik dan inorganik dari data GPR
        </p>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Sidebar - Scan Selection */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Pilih Scan</h2>
            
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

        {/* Main Content */}
        <div className="lg:col-span-3">
          {!selectedScan ? (
            <div className="bg-white rounded-lg shadow-md p-12 text-center">
              <div className="text-6xl mb-4">🤖</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                Pilih Scan untuk Analisis
              </h3>
              <p className="text-gray-600">
                Pilih scan dari daftar di sebelah kiri untuk melihat atau memulai analisis AI
              </p>
            </div>
          ) : loading ? (
            <div className="bg-white rounded-lg shadow-md p-12">
              <LoadingSpinner />
              <p className="text-center text-gray-600 mt-4">Memuat data analisis...</p>
            </div>
          ) : !analysisResult ? (
            <div className="bg-white rounded-lg shadow-md p-12 text-center">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                Belum Ada Analisis
              </h3>
              <p className="text-gray-600 mb-6">
                Scan ini belum dianalisis. Klik tombol di bawah untuk memulai analisis AI.
              </p>
              <button
                onClick={handleAnalyze}
                disabled={analyzing}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:bg-gray-400"
              >
                {analyzing ? 'Menganalisis...' : 'Mulai Analisis AI'}
              </button>
            </div>
          ) : (
            <>
              {/* Summary */}
              <div className="mb-6">
                <AnalysisSummary summary={analysisResult.summary} />
              </div>

              {/* Results */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">Hasil Deteksi</h2>
                  <button
                    onClick={handleAnalyze}
                    disabled={analyzing}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition disabled:bg-gray-400"
                  >
                    {analyzing ? 'Menganalisis...' : 'Analisis Ulang'}
                  </button>
                </div>
                
                <AIAnalysisResults 
                  detectedObjects={analysisResult.detectedObjects || []} 
                />
              </div>

              {/* Analysis Info */}
              <div className="bg-white rounded-lg shadow-md p-6 mt-6">
                <h3 className="text-lg font-semibold mb-4">Informasi Analisis</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <span className="text-gray-600">Analysis ID:</span>
                    <span className="ml-2 font-semibold text-sm">
                      {analysisResult.analysisId}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">Waktu Analisis:</span>
                    <span className="ml-2 font-semibold">
                      {new Date(analysisResult.timestamp).toLocaleString('id-ID')}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">Processing Time:</span>
                    <span className="ml-2 font-semibold">
                      {analysisResult.summary?.processingTime || 0}s
                    </span>
                  </div>
                </div>
              </div>
            </>
          )}

          {error && (
            <div className="mt-6">
              <ErrorMessage message={error} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIAnalysisPage;
