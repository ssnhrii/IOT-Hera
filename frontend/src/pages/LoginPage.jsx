import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import LoginForm from '../components/auth/LoginForm';

const LoginPage = () => {
  const { isAuthenticated } = useAuth();

  // Redirect if already logged in
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        <div className="bg-gray-200 rounded-lg p-8">
          <div className="bg-white rounded-lg p-8 shadow-lg">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-gray-800 mb-2">Login Petugas</h1>
              <p className="text-sm text-gray-600">
                Masuk untuk mengakses fitur GPR dan AI Analysis
              </p>
            </div>
            
            <LoginForm />
            
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Bukan petugas? 
                <a href="/" className="text-blue-600 hover:underline ml-1">
                  Kembali ke beranda
                </a>
              </p>
            </div>
          </div>
          
          <div className="mt-6 text-center text-sm text-gray-600">
            <p>Sistem ini hanya untuk petugas SAR yang berwenang</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
