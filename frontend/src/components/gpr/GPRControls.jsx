const GPRControls = ({ viewMode, onViewModeChange }) => {
  return (
    <div className="flex items-center justify-between">
      <h3 className="text-lg font-semibold">Kontrol Visualisasi</h3>
      
      <div className="flex gap-2">
        <button
          onClick={() => onViewModeChange('2D')}
          className={`px-4 py-2 rounded-lg font-medium transition ${
            viewMode === '2D'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          2D View
        </button>
        <button
          onClick={() => onViewModeChange('3D')}
          className={`px-4 py-2 rounded-lg font-medium transition ${
            viewMode === '3D'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          3D View
        </button>
      </div>
    </div>
  );
};

export default GPRControls;
