const DisasterList = ({ disasters }) => {
  if (!disasters || disasters.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-12 text-center">
        <div className="text-6xl mb-4">⚠️</div>
        <h3 className="text-xl font-semibold text-gray-700 mb-2">Tidak Ada Data Bencana</h3>
        <p className="text-gray-600">Belum ada informasi bencana dari BMKG</p>
      </div>
    );
  }

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'extreme': return 'bg-red-100 border-red-500 text-red-800';
      case 'high': return 'bg-orange-100 border-orange-500 text-orange-800';
      case 'medium': return 'bg-yellow-100 border-yellow-500 text-yellow-800';
      default: return 'bg-blue-100 border-blue-500 text-blue-800';
    }
  };

  return (
    <div className="space-y-4">
      {disasters.map((disaster, index) => (
        <div
          key={disaster.id || index}
          className={`rounded-lg border-l-4 p-6 ${getSeverityColor(disaster.severity)}`}
        >
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-xl font-semibold">{disaster.title}</h3>
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase">
              {disaster.severity}
            </span>
          </div>
          
          <p className="mb-3">{disaster.description}</p>
          
          <div className="flex items-center gap-4 text-sm">
            <span>📍 {disaster.location?.province}, {disaster.location?.city}</span>
            <span>📅 {new Date(disaster.timestamp).toLocaleString('id-ID')}</span>
            <span>🏷️ {disaster.type}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DisasterList;
