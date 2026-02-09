import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import HelpRequestForm from '../components/help/HelpRequestForm';
import HelpRequestList from '../components/help/HelpRequestList';
import HelpRequestDetail from '../components/help/HelpRequestDetail';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';

const HelpRequestPage = () => {
  const { isAuthenticated } = useAuth();
  const [view, setView] = useState('form'); // 'form', 'list', 'detail'
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [referenceNumber, setReferenceNumber] = useState(null);

  const handleSubmitSuccess = (refNumber) => {
    setReferenceNumber(refNumber);
  };

  const handleViewList = () => {
    setView('list');
    setReferenceNumber(null);
  };

  const handleSelectRequest = (request) => {
    setSelectedRequest(request);
    setView('detail');
  };

  const handleBackToList = () => {
    setSelectedRequest(null);
    setView('list');
  };

  const handleBackToForm = () => {
    setReferenceNumber(null);
    setView('form');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            {isAuthenticated ? 'Manajemen Aduan Bantuan' : 'Aduan Bantuan Darurat'}
          </h1>
          <p className="text-gray-600">
            {isAuthenticated 
              ? 'Kelola dan tanggapi permintaan bantuan darurat'
              : 'Ajukan permintaan bantuan saat terjadi bencana'
            }
          </p>
        </div>

        {/* Navigation for Petugas */}
        {isAuthenticated && (
          <div className="mb-6 flex gap-4">
            <button
              onClick={() => setView('form')}
              className={`px-6 py-2 rounded-lg font-semibold transition ${
                view === 'form'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              Form Aduan
            </button>
            <button
              onClick={handleViewList}
              className={`px-6 py-2 rounded-lg font-semibold transition ${
                view === 'list' || view === 'detail'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              Daftar Aduan
            </button>
          </div>
        )}

        {/* Content */}
        {view === 'form' && (
          <>
            {referenceNumber ? (
              <div className="max-w-2xl mx-auto">
                <div className="bg-green-50 border-2 border-green-500 rounded-lg p-8 text-center">
                  <div className="text-6xl mb-4">✅</div>
                  <h2 className="text-2xl font-bold text-green-800 mb-4">
                    Aduan Berhasil Dikirim!
                  </h2>
                  <p className="text-gray-700 mb-6">
                    Nomor referensi Anda:
                  </p>
                  <div className="bg-white border-2 border-green-500 rounded-lg p-4 mb-6">
                    <p className="text-3xl font-bold text-green-600">
                      {referenceNumber}
                    </p>
                  </div>
                  <p className="text-gray-600 mb-6">
                    Simpan nomor referensi ini untuk melacak status aduan Anda.
                    Tim kami akan segera menindaklanjuti permintaan bantuan Anda.
                  </p>
                  <button
                    onClick={handleBackToForm}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                  >
                    Ajukan Aduan Lain
                  </button>
                </div>
              </div>
            ) : (
              <div className="max-w-2xl mx-auto">
                <div className="bg-white rounded-lg shadow-md p-8">
                  <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
                    <div className="flex">
                      <div className="text-2xl mr-3">⚠️</div>
                      <div>
                        <h3 className="font-semibold text-red-800 mb-1">
                          Untuk Situasi Darurat
                        </h3>
                        <p className="text-sm text-red-700">
                          Gunakan form ini untuk melaporkan situasi darurat yang memerlukan 
                          bantuan segera. Isi semua informasi dengan lengkap dan akurat.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <HelpRequestForm onSubmitSuccess={handleSubmitSuccess} />
                </div>
              </div>
            )}
          </>
        )}

        {view === 'list' && isAuthenticated && (
          <HelpRequestList onSelectRequest={handleSelectRequest} />
        )}

        {view === 'detail' && isAuthenticated && selectedRequest && (
          <div>
            <button
              onClick={handleBackToList}
              className="mb-4 text-blue-600 hover:underline"
            >
              ← Kembali ke daftar
            </button>
            <HelpRequestDetail
              request={selectedRequest}
              onUpdate={handleBackToList}
            />
          </div>
        )}

        {/* Info Section for Guests */}
        {!isAuthenticated && view === 'form' && !referenceNumber && (
          <div className="max-w-2xl mx-auto mt-8">
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="font-semibold text-blue-900 mb-3">
                Informasi Penting
              </h3>
              <ul className="space-y-2 text-sm text-blue-800">
                <li>✓ Tidak perlu login untuk mengajukan aduan</li>
                <li>✓ Anda akan mendapat nomor referensi setelah submit</li>
                <li>✓ Simpan nomor referensi untuk tracking</li>
                <li>✓ Tim kami akan menghubungi Anda secepatnya</li>
                <li>✓ Pastikan nomor kontak yang Anda berikan aktif</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HelpRequestPage;
