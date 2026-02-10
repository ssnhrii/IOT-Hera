const GPRVisualization3D = ({ gprData }) => {
  return (
    <div className="bg-gray-100 rounded-lg p-8 text-center">
      <div className="text-6xl mb-4">🎮</div>
      <h3 className="text-xl font-semibold text-gray-700 mb-2">
        Visualisasi 3D GPR
      </h3>
      <p className="text-gray-600">
        Fitur visualisasi 3D akan diimplementasikan dengan Three.js
      </p>
      {gprData && (
        <div className="mt-4 text-sm text-gray-500">
          <p>Scan ID: {gprData.scanId}</p>
          <p>Dimensions: {gprData.dimensions?.width} x {gprData.dimensions?.height} x {gprData.dimensions?.depth}</p>
        </div>
      )}
    </div>
  );
};

export default GPRVisualization3D;
