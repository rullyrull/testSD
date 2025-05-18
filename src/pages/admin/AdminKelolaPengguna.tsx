import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Search, Filter, Pencil, Trash, ArrowUpDown, UserPlus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../../contexts/AuthContext';
import { getAllSiswa, getAllGuru, siswaData, guruData } from '../../data/kesehatanData';
import { Siswa, Guru } from '../../types';

type PenggunaType = 'siswa' | 'guru';

const AdminKelolaPengguna: React.FC = () => {
  const { currentUser } = useAuth();
  const [penggunaType, setPenggunaType] = useState<PenggunaType>('siswa');
  const [daftarSiswa, setDaftarSiswa] = useState<Siswa[]>([]);
  const [daftarGuru, setDaftarGuru] = useState<Guru[]>([]);
  const [filteredData, setFilteredData] = useState<(Siswa | Guru)[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'nama' | 'id'>('nama');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');
  const [filterKelas, setFilterKelas] = useState<string>('semua');
  
  // State untuk konfirmasi hapus
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteUser, setDeleteUser] = useState<Siswa | Guru | null>(null);
  
  useEffect(() => {
    // Simulasi pengambilan data
    setTimeout(() => {
      const siswa = getAllSiswa();
      const guru = getAllGuru();
      
      setDaftarSiswa(siswa);
      setDaftarGuru(guru);
      setFilteredData(siswa);
      setIsLoading(false);
    }, 1000);
  }, []);
  
  useEffect(() => {
    // Set data berdasarkan tipe pengguna yang dipilih
    const sourceData = penggunaType === 'siswa' ? daftarSiswa : daftarGuru;
    setFilteredData(sourceData);
    setFilterKelas('semua');
    setSearchTerm('');
  }, [penggunaType, daftarSiswa, daftarGuru]);
  
  useEffect(() => {
    // Filter dan sort data
    let filtered = penggunaType === 'siswa' ? [...daftarSiswa] : [...daftarGuru];
    
    // Filter berdasarkan kelas
    if (filterKelas !== 'semua') {
      filtered = filtered.filter(item => item.kelas === filterKelas);
    }
    
    // Filter berdasarkan kata kunci pencarian
    if (searchTerm) {
      const lowerCaseSearch = searchTerm.toLowerCase();
      filtered = filtered.filter(item => 
        item.nama.toLowerCase().includes(lowerCaseSearch) ||
        (penggunaType === 'siswa' && (item as Siswa).nis && (item as Siswa).nis.toLowerCase().includes(lowerCaseSearch)) ||
        (penggunaType === 'guru' && (item as Guru).nip && (item as Guru).nip.toLowerCase().includes(lowerCaseSearch))
      );
    }
    
    // Sort data
    filtered.sort((a, b) => {
      let valueA, valueB;
      
      if (sortBy === 'nama') {
        valueA = a.nama;
        valueB = b.nama;
      } else {
        valueA = penggunaType === 'siswa' ? (a as Siswa).nis : (a as Guru).nip;
        valueB = penggunaType === 'siswa' ? (b as Siswa).nis : (b as Guru).nip;
      }
      
      if (sortDir === 'asc') {
        return valueA.localeCompare(valueB);
      } else {
        return valueB.localeCompare(valueA);
      }
    });
    
    setFilteredData(filtered);
  }, [searchTerm, sortBy, sortDir, filterKelas, penggunaType]);
  
  const handleToggleSort = (field: 'nama' | 'id') => {
    if (sortBy === field) {
      // Toggle sort direction
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    } else {
      // Change sort field and reset direction to asc
      setSortBy(field);
      setSortDir('asc');
    }
  };
  
  const handleDeleteClick = (user: Siswa | Guru) => {
    setDeleteUser(user);
    setShowDeleteConfirm(true);
  };
  
  const handleConfirmDelete = () => {
    if (!deleteUser) return;
    
    // Simulasi penghapusan data
    if (penggunaType === 'siswa') {
      const newSiswaList = daftarSiswa.filter(siswa => siswa.id !== deleteUser.id);
      setDaftarSiswa(newSiswaList);
      setFilteredData(newSiswaList);
    } else {
      const newGuruList = daftarGuru.filter(guru => guru.id !== deleteUser.id);
      setDaftarGuru(newGuruList);
      setFilteredData(newGuruList);
    }
    
    toast.success(`${deleteUser.nama} berhasil dihapus`);
    setShowDeleteConfirm(false);
    setDeleteUser(null);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  // Dapatkan daftar kelas unik
  const kelasList = Array.from(new Set([
    ...daftarSiswa.map(siswa => siswa.kelas),
    ...daftarGuru.map(guru => guru.kelas)
  ])).sort();

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
              <h1 className="text-2xl font-bold mb-2">Kelola Pengguna</h1>
              <p className="opacity-90">Tambah, edit, atau hapus data pengguna sistem</p>
            </div>
            <div className="bg-white/20 p-3 rounded-full hidden md:block">
              <Users size={30} className="text-white" />
            </div>
          </div>
        </div>
      </motion.div>
      
      {/* Tombol Tambah Pengguna */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="flex justify-end"
      >
        <Link 
          to="/admin/tambah-pengguna"
          className="btn-primary flex items-center"
        >
          <UserPlus size={18} className="mr-2" />
          Tambah Pengguna Baru
        </Link>
      </motion.div>
      
      {/* Tab Filter Siswa/Guru */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
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
            Data Siswa
          </button>
          <button
            className={`flex-1 py-4 px-6 text-center ${
              penggunaType === 'guru' 
                ? 'bg-primary-500 text-white font-semibold' 
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
            onClick={() => setPenggunaType('guru')}
          >
            Data Guru
          </button>
        </div>
      </motion.div>
      
      {/* Filter dan Pencarian */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="card hover:shadow-lg"
      >
        <div className="flex flex-col md:flex-row gap-4 justify-between">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={`Cari nama atau ${penggunaType === 'siswa' ? 'NIS' : 'NIP'}...`}
              className="input pl-10 w-full"
            />
          </div>
          
          <div className="flex gap-2 items-center">
            <Filter size={18} className="text-gray-500" />
            <select
              value={filterKelas}
              onChange={(e) => setFilterKelas(e.target.value)}
              className="input py-2"
            >
              <option value="semua">Semua Kelas</option>
              {kelasList.map((kelas) => (
                <option key={kelas} value={kelas}>
                  Kelas {kelas}
                </option>
              ))}
            </select>
          </div>
        </div>
      </motion.div>
      
      {/* Tabel Pengguna */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="card hover:shadow-lg overflow-hidden"
      >
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-800">
              Daftar {penggunaType === 'siswa' ? 'Siswa' : 'Guru'}
            </h2>
            <p className="text-gray-600 text-sm mt-1">
              Total: {filteredData.length} {penggunaType === 'siswa' ? 'siswa' : 'guru'}
            </p>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  No
                </th>
                <th 
                  className="px-4 py-3.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleToggleSort('id')}
                >
                  <div className="flex items-center">
                    {penggunaType === 'siswa' ? 'NIS' : 'NIP'}
                    <ArrowUpDown size={14} className="ml-1" />
                  </div>
                </th>
                <th 
                  className="px-4 py-3.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleToggleSort('nama')}
                >
                  <div className="flex items-center">
                    Nama Lengkap
                    <ArrowUpDown size={14} className="ml-1" />
                  </div>
                </th>
                <th className="px-4 py-3.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Kelas
                </th>
                <th className="px-4 py-3.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {penggunaType === 'siswa' ? 'Jenis Kelamin' : 'Telepon'}
                </th>
                <th className="px-4 py-3.5 text-xs font-medium text-gray-500 uppercase tracking-wider text-center">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredData.map((user, index) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                    {index + 1}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-800">
                    {penggunaType === 'siswa' ? (user as Siswa).nis : (user as Guru).nip}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-800">
                    {user.nama}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                    {user.kelas}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                    {penggunaType === 'siswa' 
                      ? (user as Siswa).jenisKelamin === 'L' ? 'Laki-laki' : 'Perempuan'
                      : (user as Guru).telepon
                    }
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-center">
                    <div className="flex justify-center space-x-2">
                      <button
                        className="p-1.5 bg-primary-100 text-primary-600 rounded-lg hover:bg-primary-200"
                        title="Edit"
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        className="p-1.5 bg-danger-100 text-danger-600 rounded-lg hover:bg-danger-200"
                        title="Hapus"
                        onClick={() => handleDeleteClick(user)}
                      >
                        <Trash size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredData.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">
              Tidak ada {penggunaType === 'siswa' ? 'siswa' : 'guru'} yang sesuai dengan pencarian atau filter.
            </p>
          </div>
        )}
      </motion.div>
      
      {/* Modal Konfirmasi Hapus */}
      {showDeleteConfirm && deleteUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl shadow-xl max-w-md w-full"
          >
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Konfirmasi Hapus</h2>
              <p className="text-gray-600 mb-6">
                Apakah Anda yakin ingin menghapus data <span className="font-semibold">{deleteUser.nama}</span>? 
                Tindakan ini tidak dapat dibatalkan.
              </p>
              
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="btn-outline"
                >
                  Batal
                </button>
                <button
                  onClick={handleConfirmDelete}
                  className="btn-danger"
                >
                  Hapus
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default AdminKelolaPengguna;