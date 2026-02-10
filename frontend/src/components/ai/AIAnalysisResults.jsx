import { useState } from 'react';

const AIAnalysisResults = ({ detectedObjects }) => {
  const [filter, setFilter] = useState('all');

  const filteredObjects = detectedObjects.filter(obj => {
    if (filter === 'all') return true;
    return obj.type === filter;
  });

  return (
    <div>
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
            filter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Semua ({detectedObjects.length})
        </button>
        <button
          onClick={() => setFilter('organic')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
            filter === 'organic' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Organik ({detectedObjects.filter(o => o.type === 'organic').length})
        </button>
        <button
          onClick={() => setFilter('inorganic')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
            filter === 'inorganic' ? 'bg-gray-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Inorganik ({detectedObjects.filter(o => o.type === 'inorganic').length})
        </button>
      </div>

      {filteredObjects.length === 0 ? (
        <p className="text-gray-500 text-center py-8">Tidak ada objek terdeteksi</p>
      ) : (
        <div className="space-y-3">
          {filteredObjects.map((obj, index) => (
            <div
              key={obj.objectId || index}
              className={`p-4 rounded-lg border-2 ${
                obj.type === 'organic' ? 'bg-green-50 border-green-500' : 'bg-gray-50 border-gray-500'
              }`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-semibold">
                    {obj.type === 'organic' ? '🟢 Organik' : '⚫ Inorganik'}
                  </h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Lokasi: ({obj.location?.x?.toFixed(2)}, {obj.location?.y?.toFixed(2)}, {obj.location?.z?.toFixed(2)})
                  </p>
                  <p className="text-sm text-gray-600">
                    Ukuran: {obj.dimensions?.width?.toFixed(2)} x {obj.dimensions?.height?.toFixed(2)} x {obj.dimensions?.depth?.toFixed(2)}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-blue-600">
                    {(obj.confidence * 100).toFixed(0)}%
                  </div>
                  <div className="text-xs text-gray-500">Confidence</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AIAnalysisResults;
