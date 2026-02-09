const AnalysisSummary = ({ summary }) => {
  if (!summary) return null;

  return (
    <div className="grid md:grid-cols-3 gap-4">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="text-4xl font-bold text-blue-600 mb-2">
          {summary.totalOrganic + summary.totalInorganic}
        </div>
        <div className="text-gray-600">Total Objek Terdeteksi</div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="text-4xl font-bold text-green-600 mb-2">
          {summary.totalOrganic}
        </div>
        <div className="text-gray-600">Objek Organik</div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="text-4xl font-bold text-gray-600 mb-2">
          {summary.totalInorganic}
        </div>
        <div className="text-gray-600">Objek Inorganik</div>
      </div>
    </div>
  );
};

export default AnalysisSummary;
