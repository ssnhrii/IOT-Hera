import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import ReportList from '../components/reports/ReportList';
import ReportFilters from '../components/reports/ReportFilters';
import ReportForm from '../components/reports/ReportForm';
import ReportDetail from '../components/reports/ReportDetail';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';
import { reportService } from '../services/reportService';

const ReportsPage = () => {
  const { isAuthenticated } = useAuth();
  const [reports, setReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingReport, setEditingReport] = useState(null);
  const [filters, setFilters] = useState({
    search: '',
    location: '',
    startDate: '',
    endDate: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchReports();
  }, [filters]);

  const fetchReports = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await reportService.getReports(filters);
      setReports(response.reports || []);
    } catch (err) {
      setError('Gagal memuat laporan');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectReport = async (reportId) => {
    try {
      const report = await reportService.getReportById(reportId);
      setSelectedReport(report);
      setShowForm(false);
    } catch (err) {
      setError('Gagal memuat detail laporan');
      console.error(err);
    }
  };

  const handleCreateReport = () => {
    setEditingReport(null);
    setSelectedReport(null);
    setShowForm(true);
  };

  const handleEditReport = (report) => {
    setEditingReport(report);
    setSelectedReport(null);
    setShowForm(true);
  };

  const handleDeleteReport = async (reportId) => {
    if (!window.confirm('Yakin ingin menghapus laporan ini?')) return;
    
    try {
      await reportService.deleteReport(reportId);
      setSelectedReport(null);
      fetchReports();
    } catch (err) {
      setError('Gagal menghapus laporan');
      console.error(err);
    }
  };

  const handleSubmitReport = async (reportData) => {
    try {
      if (editingReport) {
        await reportService.updateReport(editingReport.id, reportData);
      } else {
        await reportService.createReport(reportData);
      }
      setShowForm(false);
      setEditingReport(null);
      fetchReports();
    } catch (err) {
      throw err;
    }
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingReport(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Laporan Kegiatan</h1>
            <p className="text-gray-600">
              {isAuthenticated 
                ? 'Kelola dan dokumentasikan operasi tanggap bencana'
                : 'Lihat laporan kegiatan tanggap bencana'
              }
            </p>
          </div>
          {isAuthenticated && !showForm && !selectedReport && (
            <button
              onClick={handleCreateReport}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              + Buat Laporan
            </button>
          )}
        </div>
      </div>

      {showForm ? (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-6">
            {editingReport ? 'Edit Laporan' : 'Buat Laporan Baru'}
          </h2>
          <ReportForm
            report={editingReport}
            onSubmit={handleSubmitReport}
            onCancel={handleCancelForm}
          />
        </div>
      ) : selectedReport ? (
        <div>
          <button
            onClick={() => setSelectedReport(null)}
            className="mb-4 text-blue-600 hover:underline"
          >
            ← Kembali ke daftar
          </button>
          <ReportDetail
            report={selectedReport}
            onEdit={isAuthenticated ? () => handleEditReport(selectedReport) : null}
            onDelete={isAuthenticated ? () => handleDeleteReport(selectedReport.id) : null}
          />
        </div>
      ) : (
        <>
          {/* Filters */}
          <div className="mb-6">
            <ReportFilters
              filters={filters}
              onFilterChange={setFilters}
            />
          </div>

          {/* Report List */}
          {loading ? (
            <div className="bg-white rounded-lg shadow-md p-12">
              <LoadingSpinner />
              <p className="text-center text-gray-600 mt-4">Memuat laporan...</p>
            </div>
          ) : error ? (
            <ErrorMessage message={error} />
          ) : (
            <ReportList
              reports={reports}
              onSelectReport={handleSelectReport}
            />
          )}
        </>
      )}
    </div>
  );
};

export default ReportsPage;
