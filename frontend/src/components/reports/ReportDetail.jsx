const ReportDetail = ({ report, onEdit, onDelete }) => {
  if (!report) return null;

  return (
    <div className="bg-white rounded-lg shadow-md p-8">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{report.title}</h1>
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <span>📍 {report.location?.name}</span>
            <span>📅 {new Date(report.date).toLocaleDateString('id-ID')}</span>
            {report.author && <span>👤 {report.author.name}</span>}
          </div>
        </div>
        
        {(onEdit || onDelete) && (
          <div className="flex gap-2">
            {onEdit && (
              <button onClick={onEdit} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                Edit
              </button>
            )}
            {onDelete && (
              <button onClick={onDelete} className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition">
                Hapus
              </button>
            )}
          </div>
        )}
      </div>

      <div className="mb-6">
        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
          report.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
        }`}>
          {report.status === 'published' ? 'Published' : 'Draft'}
        </span>
        {report.isPublic !== undefined && (
          <span className={`ml-2 px-3 py-1 rounded-full text-sm font-semibold ${
            report.isPublic ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
          }`}>
            {report.isPublic ? 'Public' : 'Private'}
          </span>
        )}
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-3">Deskripsi</h2>
        <div className="prose max-w-none text-gray-700 whitespace-pre-wrap">{report.description}</div>
      </div>

      {report.attachments && report.attachments.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-3">Lampiran</h2>
          <div className="space-y-2">
            {report.attachments.map((attachment, index) => (
              <div key={index} className="flex items-center gap-2 text-blue-600">
                <span>📎</span>
                <a href={attachment} className="hover:underline">{attachment}</a>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="border-t pt-6 mt-6">
        <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
          <div>
            <span className="font-semibold">Dibuat:</span> {new Date(report.createdAt).toLocaleString('id-ID')}
          </div>
          <div>
            <span className="font-semibold">Diperbarui:</span> {new Date(report.updatedAt).toLocaleString('id-ID')}
          </div>
          {report.version && (
            <div>
              <span className="font-semibold">Versi:</span> {report.version}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReportDetail;
