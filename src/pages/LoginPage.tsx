import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { Heart, School, BookOpen, User, Lock, ArrowRight } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username || !password) {
      toast.error('Silakan isi semua kolom');
      return;
    }
    
    setIsLoading(true);
    
    try {
      const user = await login(username, password);
      
      // Arahkan pengguna ke halaman yang sesuai berdasarkan peran
      if (user.role === 'siswa') {
        navigate('/siswa/dashboard');
      } else if (user.role === 'guru') {
        navigate('/guru/dashboard');
      } else if (user.role === 'admin') {
        navigate('/admin/dashboard');
      }
      
      toast.success(`Selamat datang, ${user.nama}!`);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('Terjadi kesalahan saat login');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-100 to-primary-50 flex flex-col justify-center items-center p-4">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white rounded-2xl shadow-lg overflow-hidden"
      >
        <div className="bg-primary-500 p-6 text-white text-center">
          <motion.div 
            className="flex justify-center mb-4"
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <Heart size={50} className="text-danger-300 drop-shadow-md" />
          </motion.div>
          <h1 className="text-2xl font-bold">Peduli Kesehatan Anak SD</h1>
          <p className="text-primary-100 mt-2">Masa Depan Sehat, Prestasi Meningkat</p>
        </div>
        
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">Masuk ke Akun Anda</h2>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="username" className="block text-sm font-medium text-gray-600 mb-1">
                Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User size={18} className="text-gray-400" />
                </div>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="input pl-10 w-full"
                  placeholder="Masukkan username"
                />
              </div>
            </div>
            
            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium text-gray-600 mb-1">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock size={18} className="text-gray-400" />
                </div>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input pl-10 w-full"
                  placeholder="Masukkan password"
                />
              </div>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              disabled={isLoading}
              className="btn-primary w-full flex items-center justify-center gap-2"
            >
              {isLoading ? 'Memproses...' : 'Masuk'}
              {!isLoading && <ArrowRight size={18} />}
            </motion.button>
          </form>
          
          <div className="mt-8 grid grid-cols-3 gap-4 text-center text-sm">
            <div className="flex flex-col items-center">
              <div className="bg-primary-100 p-2 rounded-full">
                <School size={24} className="text-primary-600" />
              </div>
              <p className="mt-2 text-gray-600">Akses Siswa</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-secondary-100 p-2 rounded-full">
                <BookOpen size={24} className="text-secondary-600" />
              </div>
              <p className="mt-2 text-gray-600">Akses Guru</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-warning-100 p-2 rounded-full">
                <User size={24} className="text-warning-600" />
              </div>
              <p className="mt-2 text-gray-600">Akses Admin</p>
            </div>
          </div>
          
          <div className="mt-6 text-center text-xs text-gray-500">
            <p>
              Demo login: <br />
              <span className="bg-gray-100 p-1 rounded">Username: siswa, Password: siswa123</span>
              <br />
              <span className="bg-gray-100 p-1 rounded">Username: guru, Password: guru123</span>
              <br />
              <span className="bg-gray-100 p-1 rounded">Username: admin, Password: admin123</span>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;