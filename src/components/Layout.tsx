import React from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, LogOut, Bell } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface LayoutProps {
  children: React.ReactNode;
  navItems: {
    path: string;
    label: string;
    icon: React.ReactNode;
  }[];
}

const Layout: React.FC<LayoutProps> = ({ children, navItems }) => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-primary-500 text-white shadow-md">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            <motion.div 
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ repeat: Infinity, duration: 2, repeatDelay: 3 }}
            >
              <Heart size={28} className="text-danger-300" />
            </motion.div>
            <div>
              <h1 className="text-xl font-bold">Peduli Kesehatan Anak SD</h1>
              <p className="text-xs text-primary-100">Masa Depan Sehat, Prestasi Meningkat</p>
            </div>
          </Link>
          
          <div className="flex items-center gap-3">
            <button className="relative p-1.5 rounded-full bg-primary-400 hover:bg-primary-300 transition-colors">
              <Bell size={20} />
              <span className="absolute top-0 right-0 w-2 h-2 bg-danger-500 rounded-full"></span>
            </button>
            
            <div className="flex items-center">
              <div className="mr-2 text-right hidden sm:block">
                <p className="text-sm font-semibold">{currentUser?.nama}</p>
                <p className="text-xs opacity-75">{currentUser?.role === 'siswa' 
                  ? `Siswa Kelas ${currentUser?.kelas}` 
                  : currentUser?.role === 'guru' 
                    ? `Guru Kelas ${currentUser?.kelas}` 
                    : 'Admin'}
                </p>
              </div>
              <button
                onClick={handleLogout}
                className="p-1.5 rounded-full bg-primary-400 hover:bg-primary-300 transition-colors"
                title="Keluar"
              >
                <LogOut size={20} />
              </button>
            </div>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <nav className="w-16 md:w-64 bg-white shadow-md">
          <div className="py-6 px-2 md:px-4 flex flex-col h-full">
            <div className="mb-6 md:mb-8 text-center text-gray-800 hidden md:block">
              <h2 className="font-semibold">Menu Navigasi</h2>
            </div>
            
            <ul className="space-y-2 flex-1">
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`nav-link ${
                      location.pathname === item.path ? 'active' : ''
                    } ${
                      location.pathname.startsWith(item.path) && item.path !== '/' ? 'active' : ''
                    } flex md:flex-row flex-col items-center justify-center md:justify-start text-center md:text-left py-3`}
                  >
                    <div className="md:mr-3">{item.icon}</div>
                    <span className="text-xs md:text-sm mt-1 md:mt-0">{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
            
            <div className="mt-auto text-center text-xs text-gray-500 hidden md:block">
              <p>© 2025 Peduli Kesehatan Anak SD</p>
              <p>Versi 1.0.0</p>
            </div>
          </div>
        </nav>
        
        {/* Content */}
        <main className="flex-1 p-4 md:p-8 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;