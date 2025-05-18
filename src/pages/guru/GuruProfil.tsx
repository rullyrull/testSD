import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, MapPin, Save, UserCircle, Key } from 'lucide-react';
import { toast } from 'react-toastify';
import { useAuth } from '../../contexts/AuthContext';

const GuruProfil: React.FC = () => {
  const { currentUser } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // State untuk form password baru
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Validasi input
    if (!oldPassword || !newPassword || !confirmPassword) {
      toast.error('Semua kolom harus diisi');
      setIsSubmitting(false);
      return;
    }
    
    // Validasi password lama
    if (oldPassword !== 'guru123') {
      toast.error('Password lama tidak sesuai');
      setIsSubmitting(false);
      return;
    }
    
    // Validasi password baru dan konfirmasi
    if (newPassword !== confirmPassword) {
      toast.error('Password baru dan konfirmasi tidak cocok');
      setIsSubmitting(false);
      return;
    }
    
    // Simulasi proses ganti password
    setTimeout(() => {
      toast.success('Password berhasil diubah');
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setShowPasswordForm(false);
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl p-6 text-white shadow-lg">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="bg-white/30 rounded-full p-4">
              <UserCircle size={60} strokeWidth={1.5} />
            </div>
            <div>
              <h1 className="text-2xl font-bold mb-2">Profil Saya</h1>
              <p className="opacity-90">Lihat dan kelola informasi pribadi Anda</p>
            </div>
          </div>
        </div>
      </motion.div>
      
      {/* Informasi Guru */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="card hover:shadow-lg"
      >
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-800">Informasi Pribadi</h2>
            <p className="text-gray-600 text-sm mt-1">Detail informasi pribadi Anda</p>
          </div>
          <div className="bg-primary-100 p-3 rounded-full">
            <User size={24} className="text-primary-500" />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-3">Data Diri</h3>
            
            <div className="space-y-4">
              <div className="flex gap-3">
                <User className="text-gray-400 flex-shrink-0 mt-0.5" size={18} />
                <div>
                  <p className="text-sm text-gray-500">Nama Lengkap</p>
                  <p className="font-medium">{currentUser?.nama || 'Ibu Dewi'}</p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <Mail className="text-gray-400 flex-shrink-0 mt-0.5" size={18} />
                <div>
                  <p className="text-sm text-gray-500">NIP</p>
                  <p className="font-medium">{currentUser?.nip || '98765'}</p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <User className="text-gray-400 flex-shrink-0 mt-0.5" size={18} />
                <div>
                  <p className="text-sm text-gray-500">Wali Kelas</p>
                  <p className="font-medium">{currentUser?.kelas || '6A'}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-3">Informasi Kontak</h3>
            
            <div className="space-y-4">
              <div className="flex gap-3">
                <Phone className="text-gray-400 flex-shrink-0 mt-0.5" size={18} />
                <div>
                  <p className="text-sm text-gray-500">Telepon</p>
                  <p className="font-medium">087654321098</p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <MapPin className="text-gray-400 flex-shrink-0 mt-0.5" size={18} />
                <div>
                  <p className="text-sm text-gray-500">Alamat</p>
                  <p className="font-medium">Jl. Cendana No. 45, Jakarta</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
      
      {/* Ganti Password */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="card hover:shadow-lg"
      >
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-800">Ubah Password</h2>
            <p className="text-gray-600 text-sm mt-1">Ganti password akun Anda secara berkala untuk keamanan</p>
          </div>
          <div className="bg-warning-100 p-3 rounded-full">
            <Key size={24} className="text-warning-500" />
          </div>
        </div>
        
        {!showPasswordForm ? (
          <div className="text-center py-4">
            <button 
              onClick={() => setShowPasswordForm(true)}
              className="btn-primary"
            >
              Ubah Password
            </button>
          </div>
        ) : (
          <form onSubmit={handleChangePassword}>
            <div className="space-y-4 mb-6">
              <div>
                <label htmlFor="oldPassword" className="block text-sm font-medium text-gray-600 mb-1">
                  Password Lama
                </label>
                <input
                  id="oldPassword"
                  type="password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  className="input w-full"
                  placeholder="Masukkan password lama"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-600 mb-1">
                  Password Baru
                </label>
                <input
                  id="newPassword"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="input w-full"
                  placeholder="Masukkan password baru"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-600 mb-1">
                  Konfirmasi Password Baru
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="input w-full"
                  placeholder="Masukkan kembali password baru"
                  required
                />
              </div>
            </div>
            
            <div className="flex gap-3 justify-end">
              <button
                type="button"
                onClick={() => setShowPasswordForm(false)}
                className="btn-outline"
                disabled={isSubmitting}
              >
                Batal
              </button>
              
              <button
                type="submit"
                className="btn-primary flex items-center"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                    Memproses...
                  </>
                ) : (
                  <>
                    <Save size={16} className="mr-1" />
                    Simpan Perubahan
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </motion.div>
    </div>
  );
};

export default GuruProfil;