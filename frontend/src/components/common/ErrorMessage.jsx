const ErrorMessage = ({ message, onRetry, type = 'error' }) => {
  const typeStyles = {
    error: 'bg-red-50 border-red-500 text-red-800',
    warning: 'bg-yellow-50 border-yellow-500 text-yellow-800',
    info: 'bg-blue-50 border-blue-500 text-blue-800'
  };

  const icons = {
    error: '❌',
    warning: '⚠️',
    info: 'ℹ️'
  };

  return (
    <div className={`${typeStyles[type]} border-l-4 p-4 rounded-lg`}>
      <div className="flex items-start">
        <div className="text-2xl mr-3">{icons[type]}</div>
        <div className="flex-1">
          <h3 className="font-semibold mb-1">
            {type === 'error' ? 'Terjadi Kesalahan' : type === 'warning' ? 'Peringatan' : 'Informasi'}
          </h3>
          <p className="text-sm">{message}</p>
          {onRetry && (
            <button
              onClick={onRetry}
              className="mt-3 text-sm font-semibold underline hover:no-underline"
            >
              Coba Lagi
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ErrorMessage;
