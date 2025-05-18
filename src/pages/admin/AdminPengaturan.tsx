import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings, Save, RefreshCw, School, Clock, Bell, CalendarCheck } from 'lucide-react';
import { toast } from 'react-toastify';
import { useAuth } from '../../contexts/AuthContext';

interface KelasSettings {
  id: string;
  nama: string;
  tingkat: string;
  aktif: boolean;
}

const AdminPengaturan: React.FC = () => {
  const { currentUser } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // State untuk pengaturan aplikasi
  const [appSettings, setAppSettings] = useState({
    namaSekolah: 'SDN Contoh 01',
    alamatSekolah: 'Jl. Pendidikan No. 123, Jakarta',
    teleponSekolah: '021-1234567',
    emailSekolah: 'sdn01@example.com',
    tahunAjaran: '2024/2025',
    semester: 'Genap',
    waktuInput: {
      mulai: '07:00',
      selesai: '09:00'
    },
    notifikasi: {
      guruKeluhan: true,
      siswaResponse: true,
      adminReport: true
    }
  });
  
  // State untuk pengaturan kelas
  const [kelasList, setKelasList] = useState<KelasSettings[]>([
    { id: '1', nama: '6A', tingkat: '6', aktif: true },
    { id: '2', nama: '6B', tingkat: '6', aktif: true },
    { id: '3', nama: '5A', tingkat: '5', aktif: true },
    { id: '4', nama: '5B', tingkat: '5', aktif: true }
  ]);
  
  // State untuk tambah kelas baru
  const [newKelas, setNewKelas] = useState({
    nama: '',
    tingkat: '6'
  });
  
  const handleAppSettingsChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setAppSettings({
        ...appSettings,
        [parent]: {
          ...appSettings[parent as keyof typeof appSettings],
          [child]: type === 'checkbox' 
            ? (e.target as HTMLInputElement).checked 
            : value
        }
      });
    } else {
      setAppSettings({
        ...appSettings,
        [name]: type === 'checkbox' 
          ? (e.target as HTMLInputElement).checked 
          : value
      });
    }
  };
  
  const handleToggleKelas = (id: string) => {
    setKelasList(
      kelasList.map(kelas => 
        kelas.id === id ? { ...kelas, aktif: !kelas.aktif } : kelas
      )
    );
  };
  
  const handleNewKelasChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewKelas({
      ...newKelas,
      [name]: value
    });
  };
  
  const handleAddKelas = () => {
    if (!newKelas.nama.trim()) {
      toast.error('Nama kelas tidak boleh kosong');
      return;
    }
    
    const newId = (parseInt(kelasList[kelasList.length - 1]?.id || '0') + 1).toString();
    
    setKelasList([
      ...kelasList,
      {
        id: newId,
        nama: newKelas.nama,
        tingkat: newKelas.tingkat,
        aktif: true
      }
    ]);
    
    setNewKelas({
      nama: '',
      tingkat: '6'
    });
    
    toast.success(`Kelas ${newKelas.nama} berhasil ditambahkan`);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulasi penyimpanan pengaturan
    setTimeout(() => {
      toast.success('Pengaturan berhasil disimpan');
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
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold mb-2">Pengaturan Sistem</h1>
              <p className="opacity-90">Konfigurasi aplikasi Peduli Kesehatan Anak SD</p>
            </div>
            <div className="bg-white/20 p-3 rounded-full hidden md:block">
              <Settings size={30} className="text-white" />
            </div>
          </div>
        </div>
      </motion.div>
      
      <form onSubmit={handleSubmit}>
        {/* Pengaturan Umum */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="card hover:shadow-lg"
        >
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-800">Pengaturan Umum</h2>
              <p className="text-gray-600 text-sm mt-1">Informasi dasar dan pengaturan aplikasi</p>
            </div>
            <div className="bg-primary-100 p-3 rounded-full">
              <School size={24} className="text-primary-500" />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="namaSekolah" className="block text-sm font-medium text-gray-600 mb-1">
                Nama Sekolah
              </label>
              <input
                type="text"
                id="namaSekolah"
                name="namaSekolah"
                value={appSettings.namaSekolah}
                onChange={handleAppSettingsChange}
                className="input w-full"
              />
            </div>
            
            <div>
              <label htmlFor="tahunAjaran" className="block text-sm font-medium text-gray-600 mb-1">
                Tahun Ajaran
              </label>
              <input
                type="text"
                id="tahunAjaran"
                name="tahunAjaran"
                value={appSettings.tahunAjaran}
                onChange={handleAppSettingsChange}
                className="input w-full"
              />
            </div>
            
            <div>
              <label htmlFor="alamatSekolah" className="block text-sm font-medium text-gray-600 mb-1">
                Alamat Sekolah
              </label>
              <textarea
                id="alamatSekolah"
                name="alamatSekolah"
                value={appSettings.alamatSekolah}
                onChange={handleAppSettingsChange}
                className="input w-full"
                rows={2}
              ></textarea>
            </div>
            
            <div>
              <label htmlFor="semester" className="block text-sm font-medium text-gray-600 mb-1">
                Semester
              </label>
              <select
                id="semester"
                name="semester"
                value={appSettings.semester}
                onChange={handleAppSettingsChange}
                className="input w-full"
              >
                <option value="Ganjil">Ganjil</option>
                <option value="Genap">Genap</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="teleponSekolah" className="block text-sm font-medium text-gray-600 mb-1">
                Telepon Sekolah
              </label>
              <input
                type="text"
                id="teleponSekolah"
                name="teleponSekolah"
                value={appSettings.teleponSekolah}
                onChange={handleAppSettingsChange}
                className="input w-full"
              />
            </div>
            
            <div>
              <label htmlFor="emailSekolah" className="block text-sm font-medium text-gray-600 mb-1">
                Email Sekolah
              </label>
              <input
                type="email"
                id="emailSekolah"
                name="emailSekolah"
                value={appSettings.emailSekolah}
                onChange={handleAppSettingsChange}
                className="input w-full"
              />
            </div>
          </div>
        </motion.div>
        
        {/* Pengaturan Waktu dan Notifikasi */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="card hover:shadow-lg"
        >
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-800">Pengaturan Waktu & Notifikasi</h2>
              <p className="text-gray-600 text-sm mt-1">Konfigurasi waktu input dan pengaturan notifikasi</p>
            </div>
            <div className="bg-secondary-100 p-3 rounded-full">
              <Clock size={24} className="text-secondary-500" />
            </div>
          </div>
          
          <h3 className="text-md font-medium text-gray-700 mb-3">Waktu Input Data Kesehatan</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="waktuInput.mulai" className="block text-sm font-medium text-gray-600 mb-1">
                Waktu Mulai
              </label>
              <input
                type="time"
                id="waktuInput.mulai"
                name="waktuInput.mulai"
                value={appSettings.waktuInput.mulai}
                onChange={handleAppSettingsChange}
                className="input w-full"
              />
            </div>
            
            <div>
              <label htmlFor="waktuInput.selesai" className="block text-sm font-medium text-gray-600 mb-1">
                Waktu Selesai
              </label>
              <input
                type="time"
                id="waktuInput.selesai"
                name="waktuInput.selesai"
                value={appSettings.waktuInput.selesai}
                onChange={handleAppSettingsChange}
                className="input w-full"
              />
            </div>
          </div>
          
          <h3 className="text-md font-medium text-gray-700 mb-3">Pengaturan Notifikasi</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-3">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="notifikasi.guruKeluhan"
                name="notifikasi.guruKeluhan"
                checked={appSettings.notifikasi.guruKeluhan}
                onChange={handleAppSettingsChange}
                className="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
              />
              <label htmlFor="notifikasi.guruKeluhan" className="ml-2 block text-sm text-gray-700">
                Notifikasi Guru untuk Keluhan Baru
              </label>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="notifikasi.siswaResponse"
                name="notifikasi.siswaResponse"
                checked={appSettings.notifikasi.siswaResponse}
                onChange={handleAppSettingsChange}
                className="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
              />
              <label htmlFor="notifikasi.siswaResponse" className="ml-2 block text-sm text-gray-700">
                Notifikasi Siswa untuk Tanggapan
              </label>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="notifikasi.adminReport"
                name="notifikasi.adminReport"
                checked={appSettings.notifikasi.adminReport}
                onChange={handleAppSettingsChange}
                className="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
              />
              <label htmlFor="notifikasi.adminReport" className="ml-2 block text-sm text-gray-700">
                Notifikasi Admin untuk Laporan Mingguan
              </label>
            </div>
          </div>
        </motion.div>
        
        {/* Pengaturan Kelas */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="card hover:shadow-lg"
        >
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-800">Pengaturan Kelas</h2>
              <p className="text-gray-600 text-sm mt-1">Kelola daftar kelas yang tersedia</p>
            </div>
            <div className="bg-warning-100 p-3 rounded-full">
              <CalendarCheck size={24} className="text-warning-500" />
            </div>
          </div>
          
          {/* Daftar Kelas */}
          <div className="space-y-4 mb-6">
            <h3 className="text-md font-medium text-gray-700 mb-3">Daftar Kelas</h3>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Nama Kelas
                    </th>
                    <th className="px-4 py-3.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tingkat
                    </th>
                    <th className="px-4 py-3.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-4 py-3.5 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {kelasList.map((kelas) => (
                    <tr key={kelas.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-800">
                        Kelas {kelas.nama}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                        {kelas.tingkat}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span 
                          className={`px-2 py-1 text-xs rounded-full ${
                            kelas.aktif
                              ? 'bg-secondary-100 text-secondary-700'
                              : 'bg-gray-100 text-gray-500'
                          }`}
                        >
                          {kelas.aktif ? 'Aktif' : 'Tidak Aktif'}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-right">
                        <button
                          type="button"
                          onClick={() => handleToggleKelas(kelas.id)}
                          className={`text-xs ${
                            kelas.aktif
                              ? 'text-danger-600 hover:text-danger-700'
                              : 'text-secondary-600 hover:text-secondary-700'
                          } font-medium`}
                        >
                          {kelas.aktif ? 'Nonaktifkan' : 'Aktifkan'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          {/* Tambah Kelas Baru */}
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-md font-medium text-gray-700 mb-3">Tambah Kelas Baru</h3>
            
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <label htmlFor="nama" className="block text-sm font-medium text-gray-600 mb-1">
                  Nama Kelas
                </label>
                <input
                  type="text"
                  id="nama"
                  name="nama"
                  value={newKelas.nama}
                  onChange={handleNewKelasChange}
                  className="input w-full"
                  placeholder="Contoh: 6C"
                />
              </div>
              
              <div className="flex-1">
                <label htmlFor="tingkat" className="block text-sm font-medium text-gray-600 mb-1">
                  Tingkat
                </label>
                <select
                  id="tingkat"
                  name="tingkat"
                  value={newKelas.tingkat}
                  onChange={handleNewKelasChange}
                  className="input w-full"
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                </select>
              </div>
              
              <div className="flex items-end">
                <button
                  type="button"
                  onClick={handleAddKelas}
                  className="btn-secondary"
                >
                  Tambah Kelas
                </button>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Tombol Aksi */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex gap-3 justify-end"
        >
          <button
            type="button"
            onClick={() => window.location.reload()}
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
                Menyimpan...
              </>
            ) : (
              <>
                <Save size={16} className="mr-1" />
                Simpan Pengaturan
              </>
            )}
          </button>
        </motion.div>
      </form>
    </div>
  );
};

export default AdminPengaturan;