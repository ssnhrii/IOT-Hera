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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-12 px-4">
      <div className="container mx-auto max-w-md">
        <div className="bg-white rounded-lg shadow-xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Login Petugas</h1>
            <p className="text-gray-600">
              Masuk untuk mengakses fitur GPR dan AI Analysis
            </p>
          </div>
          
          <LoginForm />
          
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-600 text-center">
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
  );
};

export default LoginPage;
