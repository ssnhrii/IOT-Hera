import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    logout();
    setMobileMenuOpen(false);
  };

  const navLinkClass = (path) => `
    px-3 py-2 rounded-md text-sm font-medium transition
    ${isActive(path) 
      ? 'bg-blue-700 text-white' 
      : 'text-blue-100 hover:bg-blue-700 hover:text-white'
    }
  `;

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="text-2xl">📡</div>
            <div>
              <h1 className="text-xl font-bold">HERA</h1>
              <p className="text-xs text-blue-100">Pemindai Cerdas Nusantara</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <Link to="/" className={navLinkClass('/')}>
              Beranda
            </Link>
            <Link to="/reports" className={navLinkClass('/reports')}>
              Laporan
            </Link>
            <Link to="/help-request" className={navLinkClass('/help-request')}>
              Aduan Bantuan
            </Link>
            <Link to="/bmkg" className={navLinkClass('/bmkg')}>
              Info BMKG
            </Link>
            
            {isAuthenticated && (
              <>
                <Link to="/dashboard" className={navLinkClass('/dashboard')}>
                  Dashboard
                </Link>
                <Link to="/gpr" className={navLinkClass('/gpr')}>
                  GPR
                </Link>
                <Link to="/ai-analysis" className={navLinkClass('/ai-analysis')}>
                  AI Analysis
                </Link>
              </>
            )}
          </div>

          {/* User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <div className="text-sm">
                  <div className="font-semibold">{user?.name}</div>
                  <div className="text-xs text-blue-100">{user?.role}</div>
                </div>
                <button
                  onClick={handleLogout}
                  className="bg-blue-700 hover:bg-blue-800 px-4 py-2 rounded-md text-sm font-medium transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="bg-blue-700 hover:bg-blue-800 px-4 py-2 rounded-md text-sm font-medium transition"
              >
                Login Petugas
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-md hover:bg-blue-700"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col space-y-2">
              <Link to="/" className={navLinkClass('/')} onClick={() => setMobileMenuOpen(false)}>
                Beranda
              </Link>
              <Link to="/reports" className={navLinkClass('/reports')} onClick={() => setMobileMenuOpen(false)}>
                Laporan
              </Link>
              <Link to="/help-request" className={navLinkClass('/help-request')} onClick={() => setMobileMenuOpen(false)}>
                Aduan Bantuan
              </Link>
              <Link to="/bmkg" className={navLinkClass('/bmkg')} onClick={() => setMobileMenuOpen(false)}>
                Info BMKG
              </Link>
              
              {isAuthenticated && (
                <>
                  <Link to="/dashboard" className={navLinkClass('/dashboard')} onClick={() => setMobileMenuOpen(false)}>
                    Dashboard
                  </Link>
                  <Link to="/gpr" className={navLinkClass('/gpr')} onClick={() => setMobileMenuOpen(false)}>
                    GPR Dashboard
                  </Link>
                  <Link to="/ai-analysis" className={navLinkClass('/ai-analysis')} onClick={() => setMobileMenuOpen(false)}>
                    AI Analysis
                  </Link>
                </>
              )}

              <div className="pt-4 border-t border-blue-500">
                {isAuthenticated ? (
                  <>
                    <div className="px-3 py-2 text-sm">
                      <div className="font-semibold">{user?.name}</div>
                      <div className="text-xs text-blue-100">{user?.role}</div>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-3 py-2 rounded-md text-sm font-medium bg-blue-700 hover:bg-blue-800 transition"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <Link
                    to="/login"
                    className="block px-3 py-2 rounded-md text-sm font-medium bg-blue-700 hover:bg-blue-800 transition"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Login Petugas
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
