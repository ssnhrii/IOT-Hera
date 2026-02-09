const ReportList = ({ reports, onSelectReport }) => {
  if (!reports || reports.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-12 text-center">
        <div className="text-6xl mb-4">📋</div>
        <h3 className="text-xl font-semibold text-gray-700 mb-2">Belum Ada Laporan</h3>
        <p className="text-gray-600">Belum ada laporan kegiatan yang tersedia</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {reports.map((report) => (
        <div
          key={report.id}
          onClick={() => onSelectReport(report.id)}
          className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition cursor-pointer"
        >
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-xl font-semibold text-gray-800">{report.title}</h3>
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
              report.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
            }`}>
              {report.status === 'published' ? 'Published' : 'Draft'}
            </span>
          </div>
          
          <p className="text-gray-600 mb-3 line-clamp-2">{report.description}</p>
          
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span>📍 {report.location?.name || 'Unknown'}</span>
            <span>📅 {new Date(report.date).toLocaleDateString('id-ID')}</span>
            {report.author && <span>👤 {report.author.name}</span>}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReportList;
