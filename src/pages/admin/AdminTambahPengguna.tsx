import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { UserPlus, Save, UserCircle, RefreshCw } from 'lucide-react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

type PenggunaType = 'siswa' | 'guru' | 'admin';

const AdminTambahPengguna: React.FC = () => {
  const navigate = useNavigate();
  const [penggunaType, setPenggunaType] = useState<PenggunaType>('siswa');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form siswa
  const [formSiswa, setFormSiswa] = useState({
    nama: '',
    nis: '',
    kelas: '6A',
    jenisKelamin: 'L',
    tanggalLahir: '',
    alamat: '',
    namaOrangTua: '',
    teleponOrangTua: '',
    username: '',
    password: '',
    konfirmasiPassword: ''
  });
  
  // Form guru
  const [formGuru, setFormGuru] = useState({
    nama: '',
    nip: '',
    kelas: '6A',
    jenisKelamin: 'L',
    telepon: '',
    alamat: '',
    username: '',
    password: '',
    konfirmasiPassword: ''
  });
  
  // Form admin
  const [formAdmin, setFormAdmin] = useState({
    nama: '',
    username: '',
    password: '',
    konfirmasiPassword: ''
  });
  
  const handleSiswaChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormSiswa({
      ...formSiswa,
      [name]: value
    });
  };
  
  const handleGuruChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormGuru({
      ...formGuru,
      [name]: value
    });
  };
  
  const handleAdminChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormAdmin({
      ...formAdmin,
      [name]: value
    });
  };
  
  const validateForm = (): boolean => {
    if (penggunaType === 'siswa') {
      // Validasi form siswa
      if (!formSiswa.nama || !formSiswa.nis || !formSiswa.kelas || !formSiswa.username || !formSiswa.password) {
        toast.error('Semua kolom wajib harus diisi');
        return false;
      }
      
      if (formSiswa.password !== formSiswa.konfirmasiPassword) {
        toast.error('Password dan konfirmasi password tidak cocok');
        return false;
      }
    } else if (penggunaType === 'guru') {
      // Validasi form guru
      if (!formGuru.nama || !formGuru.nip || !formGuru.kelas || !formGuru.username || !formGuru.password) {
        toast.error('Semua kolom wajib harus diisi');
        return false;
      }
      
      if (formGuru.password !== formGuru.konfirmasiPassword) {
        toast.error('Password dan konfirmasi password tidak cocok');
        return false;
      }
    } else {
      // Validasi form admin
      if (!formAdmin.nama || !formAdmin.username || !formAdmin.password) {
        toast.error('Semua kolom wajib harus diisi');
        return false;
      }
      
      if (formAdmin.password !== formAdmin.konfirmasiPassword) {
        toast.error('Password dan konfirmasi password tidak cocok');
        return false;
      }
    }
    
    return true;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulasi proses penyimpanan data
    setTimeout(() => {
      let message = '';
      
      if (penggunaType === 'siswa') {
        message = `Siswa ${formSiswa.nama} berhasil ditambahkan`;
      } else if (penggunaType === 'guru') {
        message = `Guru ${formGuru.nama} berhasil ditambahkan`;
      } else {
        message = `Admin ${formAdmin.nama} berhasil ditambahkan`;
      }
      
      toast.success(message);
      setIsSubmitting(false);
      navigate('/admin/kelola-pengguna');
    }, 1500);
  };
  
  const handleReset = () => {
    if (penggunaType === 'siswa') {
      setFormSiswa({
        nama: '',
        nis: '',
        kelas: '6A',
        jenisKelamin: 'L',
        tanggalLahir: '',
        alamat: '',
        namaOrangTua: '',
        teleponOrangTua: '',
        username: '',
        password: '',
        konfirmasiPassword: ''
      });
    } else if (penggunaType === 'guru') {
      setFormGuru({
        nama: '',
        nip: '',
        kelas: '6A',
        jenisKelamin: 'L',
        telepon: '',
        alamat: '',
        username: '',
        password: '',
        konfirmasiPassword: ''
      });
    } else {
      setFormAdmin({
        nama: '',
        username: '',
        password: '',
        konfirmasiPassword: ''
      });
    }
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl p-6 text-white shadow-lg">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold mb-2">Tambah Pengguna Baru</h1>
              <p className="opacity-90">Tambahkan data pengguna baru ke sistem</p>
            </div>
            <div className="bg-white/20 p-3 rounded-full hidden md:block">
              <UserPlus size={30} className="text-white" />
            </div>
          </div>
        </div>
      </motion.div>
      
      {/* Tab Filter Tipe Pengguna */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-white rounded-lg shadow-md overflow-hidden"
      >
        <div className="flex">
          <button
            className={`flex-1 py-4 px-6 text-center ${
              penggunaType === 'siswa' 
                ? 'bg-primary-500 text-white font-semibold' 
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
            onClick={() => setPenggunaType('siswa')}
          >
            Siswa
          </button>
          <button
            className={`flex-1 py-4 px-6 text-center ${
              penggunaType === 'guru' 
                ? 'bg-primary-500 text-white font-semibold' 
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
            onClick={() => setPenggunaType('guru')}
          >
            Guru
          </button>
          <button
            className={`flex-1 py-4 px-6 text-center ${
              penggunaType === 'admin' 
                ? 'bg-primary-500 text-white font-semibold' 
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
            onClick={() => setPenggunaType('admin')}
          >
            Admin
          </button>
        </div>
      </motion.div>
      
      {/* Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="card hover:shadow-lg"
      >
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-800">
              Form Tambah {penggunaType === 'siswa' ? 'Siswa' : penggunaType === 'guru' ? 'Guru' : 'Admin'}
            </h2>
            <p className="text-gray-600 text-sm mt-1">
              Lengkapi data di bawah ini untuk menambahkan pengguna baru
            </p>
          </div>
          <div className="bg-primary-100 p-3 rounded-full">
            <UserCircle size={24} className="text-primary-500" />
          </div>
        </div>
        
        <form onSubmit={handleSubmit}>
          {/* Form Siswa */}
          {penggunaType === 'siswa' && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <label htmlFor="nama" className="block text-sm font-medium text-gray-600 mb-1">
                    Nama Lengkap <span className="text-danger-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="nama"
                    name="nama"
                    value={formSiswa.nama}
                    onChange={handleSiswaChange}
                    className="input w-full"
                    placeholder="Masukkan nama lengkap"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="nis" className="block text-sm font-medium text-gray-600 mb-1">
                    NIS <span className="text-danger-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="nis"
                    name="nis"
                    value={formSiswa.nis}
                    onChange={handleSiswaChange}
                    className="input w-full"
                    placeholder="Masukkan NIS"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="kelas" className="block text-sm font-medium text-gray-600 mb-1">
                    Kelas <span className="text-danger-500">*</span>
                  </label>
                  <select
                    id="kelas"
                    name="kelas"
                    value={formSiswa.kelas}
                    onChange={handleSiswaChange}
                    className="input w-full"
                    required
                  >
                    <option value="6A">6A</option>
                    <option value="6B">6B</option>
                    <option value="5A">5A</option>
                    <option value="5B">5B</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="jenisKelamin" className="block text-sm font-medium text-gray-600 mb-1">
                    Jenis Kelamin <span className="text-danger-500">*</span>
                  </label>
                  <select
                    id="jenisKelamin"
                    name="jenisKelamin"
                    value={formSiswa.jenisKelamin}
                    onChange={handleSiswaChange}
                    className="input w-full"
                    required
                  >
                    <option value="L">Laki-laki</option>
                    <option value="P">Perempuan</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="tanggalLahir" className="block text-sm font-medium text-gray-600 mb-1">
                    Tanggal Lahir
                  </label>
                  <input
                    type="date"
                    id="tanggalLahir"
                    name="tanggalLahir"
                    value={formSiswa.tanggalLahir}
                    onChange={handleSiswaChange}
                    className="input w-full"
                  />
                </div>
                
                <div>
                  <label htmlFor="namaOrangTua" className="block text-sm font-medium text-gray-600 mb-1">
                    Nama Orang Tua
                  </label>
                  <input
                    type="text"
                    id="namaOrangTua"
                    name="namaOrangTua"
                    value={formSiswa.namaOrangTua}
                    onChange={handleSiswaChange}
                    className="input w-full"
                    placeholder="Masukkan nama orang tua"
                  />
                </div>
                
                <div>
                  <label htmlFor="teleponOrangTua" className="block text-sm font-medium text-gray-600 mb-1">
                    Telepon Orang Tua
                  </label>
                  <input
                    type="text"
                    id="teleponOrangTua"
                    name="teleponOrangTua"
                    value={formSiswa.teleponOrangTua}
                    onChange={handleSiswaChange}
                    className="input w-full"
                    placeholder="Masukkan nomor telepon"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label htmlFor="alamat" className="block text-sm font-medium text-gray-600 mb-1">
                    Alamat
                  </label>
                  <textarea
                    id="alamat"
                    name="alamat"
                    value={formSiswa.alamat}
                    onChange={handleSiswaChange}
                    className="input w-full h-20"
                    placeholder="Masukkan alamat lengkap"
                  ></textarea>
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-6 mb-6">
                <h3 className="text-md font-semibold text-gray-800 mb-4">
                  Informasi Akun
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="username" className="block text-sm font-medium text-gray-600 mb-1">
                      Username <span className="text-danger-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="username"
                      name="username"
                      value={formSiswa.username}
                      onChange={handleSiswaChange}
                      className="input w-full"
                      placeholder="Masukkan username"
                      required
                    />
                  </div>
                  
                  <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="password" className="block text-sm font-medium text-gray-600 mb-1">
                        Password <span className="text-danger-500">*</span>
                      </label>
                      <input
                        type="password"
                        id="password"
                        name="password"
                        value={formSiswa.password}
                        onChange={handleSiswaChange}
                        className="input w-full"
                        placeholder="Masukkan password"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="konfirmasiPassword" className="block text-sm font-medium text-gray-600 mb-1">
                        Konfirmasi Password <span className="text-danger-500">*</span>
                      </label>
                      <input
                        type="password"
                        id="konfirmasiPassword"
                        name="konfirmasiPassword"
                        value={formSiswa.konfirmasiPassword}
                        onChange={handleSiswaChange}
                        className="input w-full"
                        placeholder="Masukkan kembali password"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
          
          {/* Form Guru */}
          {penggunaType === 'guru' && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <label htmlFor="nama" className="block text-sm font-medium text-gray-600 mb-1">
                    Nama Lengkap <span className="text-danger-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="nama"
                    name="nama"
                    value={formGuru.nama}
                    onChange={handleGuruChange}
                    className="input w-full"
                    placeholder="Masukkan nama lengkap"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="nip" className="block text-sm font-medium text-gray-600 mb-1">
                    NIP <span className="text-danger-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="nip"
                    name="nip"
                    value={formGuru.nip}
                    onChange={handleGuruChange}
                    className="input w-full"
                    placeholder="Masukkan NIP"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="kelas" className="block text-sm font-medium text-gray-600 mb-1">
                    Wali Kelas <span className="text-danger-500">*</span>
                  </label>
                  <select
                    id="kelas"
                    name="kelas"
                    value={formGuru.kelas}
                    onChange={handleGuruChange}
                    className="input w-full"
                    required
                  >
                    <option value="6A">6A</option>
                    <option value="6B">6B</option>
                    <option value="5A">5A</option>
                    <option value="5B">5B</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="jenisKelamin" className="block text-sm font-medium text-gray-600 mb-1">
                    Jenis Kelamin <span className="text-danger-500">*</span>
                  </label>
                  <select
                    id="jenisKelamin"
                    name="jenisKelamin"
                    value={formGuru.jenisKelamin}
                    onChange={handleGuruChange}
                    className="input w-full"
                    required
                  >
                    <option value="L">Laki-laki</option>
                    <option value="P">Perempuan</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="telepon" className="block text-sm font-medium text-gray-600 mb-1">
                    Telepon
                  </label>
                  <input
                    type="text"
                    id="telepon"
                    name="telepon"
                    value={formGuru.telepon}
                    onChange={handleGuruChange}
                    className="input w-full"
                    placeholder="Masukkan nomor telepon"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label htmlFor="alamat" className="block text-sm font-medium text-gray-600 mb-1">
                    Alamat
                  </label>
                  <textarea
                    id="alamat"
                    name="alamat"
                    value={formGuru.alamat}
                    onChange={handleGuruChange}
                    className="input w-full h-20"
                    placeholder="Masukkan alamat lengkap"
                  ></textarea>
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-6 mb-6">
                <h3 className="text-md font-semibold text-gray-800 mb-4">
                  Informasi Akun
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="username" className="block text-sm font-medium text-gray-600 mb-1">
                      Username <span className="text-danger-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="username"
                      name="username"
                      value={formGuru.username}
                      onChange={handleGuruChange}
                      className="input w-full"
                      placeholder="Masukkan username"
                      required
                    />
                  </div>
                  
                  <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="password" className="block text-sm font-medium text-gray-600 mb-1">
                        Password <span className="text-danger-500">*</span>
                      </label>
                      <input
                        type="password"
                        id="password"
                        name="password"
                        value={formGuru.password}
                        onChange={handleGuruChange}
                        className="input w-full"
                        placeholder="Masukkan password"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="konfirmasiPassword" className="block text-sm font-medium text-gray-600 mb-1">
                        Konfirmasi Password <span className="text-danger-500">*</span>
                      </label>
                      <input
                        type="password"
                        id="konfirmasiPassword"
                        name="konfirmasiPassword"
                        value={formGuru.konfirmasiPassword}
                        onChange={handleGuruChange}
                        className="input w-full"
                        placeholder="Masukkan kembali password"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
          
          {/* Form Admin */}
          {penggunaType === 'admin' && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <label htmlFor="nama" className="block text-sm font-medium text-gray-600 mb-1">
                    Nama Lengkap <span className="text-danger-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="nama"
                    name="nama"
                    value={formAdmin.nama}
                    onChange={handleAdminChange}
                    className="input w-full"
                    placeholder="Masukkan nama lengkap"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-gray-600 mb-1">
                    Username <span className="text-danger-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={formAdmin.username}
                    onChange={handleAdminChange}
                    className="input w-full"
                    placeholder="Masukkan username"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-600 mb-1">
                    Password <span className="text-danger-500">*</span>
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formAdmin.password}
                    onChange={handleAdminChange}
                    className="input w-full"
                    placeholder="Masukkan password"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="konfirmasiPassword" className="block text-sm font-medium text-gray-600 mb-1">
                    Konfirmasi Password <span className="text-danger-500">*</span>
                  </label>
                  <input
                    type="password"
                    id="konfirmasiPassword"
                    name="konfirmasiPassword"
                    value={formAdmin.konfirmasiPassword}
                    onChange={handleAdminChange}
                    className="input w-full"
                    placeholder="Masukkan kembali password"
                    required
                  />
                </div>
              </div>
            </>
          )}
          
          <div className="border-t border-gray-200 pt-6 flex gap-3 justify-end">
            <button
              type="button"
              onClick={handleReset}
              className="btn-outline flex items-center"
              disabled={isSubmitting}
            >
              <RefreshCw size={16} className="mr-1" />
              Reset
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
                  Simpan
                </>
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default AdminTambahPengguna;