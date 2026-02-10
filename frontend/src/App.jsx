import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import ProtectedRoute from './components/auth/ProtectedRoute';

// Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import GPRDashboard from './pages/GPRDashboard';
import AIAnalysisPage from './pages/AIAnalysisPage';
import ReportsPage from './pages/ReportsPage';
import HelpRequestPage from './pages/HelpRequestPage';
import BMKGPage from './pages/BMKGPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 flex flex-col">
          <Navbar />
          
          <main className="flex-grow">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/reports" element={<ReportsPage />} />
              <Route path="/help-request" element={<HelpRequestPage />} />
              <Route path="/bmkg" element={<BMKGPage />} />
              
              {/* Protected Routes (Petugas Only) */}
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute>
                    <DashboardPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/gpr" 
                element={
                  <ProtectedRoute>
                    <GPRDashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/ai-analysis" 
                element={
                  <ProtectedRoute>
                    <AIAnalysisPage />
                  </ProtectedRoute>
                } 
              />
            </Routes>
          </main>
          
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
