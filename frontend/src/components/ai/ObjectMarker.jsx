const ObjectMarker = ({ object, onClick }) => {
  return (
    <div
      onClick={() => onClick && onClick(object)}
      className={`cursor-pointer p-2 rounded-full ${
        object.type === 'organic' ? 'bg-green-500' : 'bg-gray-500'
      } text-white text-xs font-bold hover:scale-110 transition`}
      title={`${object.type} - ${(object.confidence * 100).toFixed(0)}%`}
    >
      {object.type === 'organic' ? '🟢' : '⚫'}
    </div>
  );
};

export default ObjectMarker;
