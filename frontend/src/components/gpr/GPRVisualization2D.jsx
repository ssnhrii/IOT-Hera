const GPRVisualization2D = ({ gprData }) => {
  return (
    <div className="bg-gray-100 rounded-lg p-8 text-center">
      <div className="text-6xl mb-4">📊</div>
      <h3 className="text-xl font-semibold text-gray-700 mb-2">
        Visualisasi 2D GPR
      </h3>
      <p className="text-gray-600">
        Fitur visualisasi 2D akan diimplementasikan dengan D3.js
      </p>
      {gprData && (
        <div className="mt-4 text-sm text-gray-500">
          <p>Scan ID: {gprData.scanId}</p>
          <p>Data Points: {gprData.dataPoints?.length || 0}</p>
        </div>
      )}
    </div>
  );
};

export default GPRVisualization2D;
