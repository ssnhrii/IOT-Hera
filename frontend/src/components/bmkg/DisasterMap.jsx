const DisasterMap = ({ disasters }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-8 text-center">
      <div className="text-6xl mb-4">🗺️</div>
      <h3 className="text-xl font-semibold text-gray-700 mb-2">
        Peta Bencana
      </h3>
      <p className="text-gray-600 mb-4">
        Fitur peta interaktif akan diimplementasikan dengan Leaflet
      </p>
      {disasters && disasters.length > 0 && (
        <p className="text-sm text-gray-500">
          {disasters.length} bencana akan ditampilkan di peta
        </p>
      )}
    </div>
  );
};

export default DisasterMap;
