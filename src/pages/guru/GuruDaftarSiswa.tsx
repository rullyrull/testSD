import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Search, Filter, Eye, ArrowUpDown } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { getSiswaByKelas, getDataKesehatanBySiswaId } from '../../data/kesehatanData';
import { Siswa, DataKesehatan } from '../../types';
import { format } from 'date-fns';

const GuruDaftarSiswa: React.FC = () => {
  const { currentUser } = useAuth();
  const [daftarSiswa, setDaftarSiswa] = useState<Siswa[]>([]);
  const [filteredSiswa, setFilteredSiswa] = useState<Siswa[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'nama' | 'nis'>('nama');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');
  
  // State untuk detail siswa
  const [selectedSiswa, setSelectedSiswa] = useState<Siswa | null>(null);
  const [dataSiswa, setDataSiswa] = useState<DataKesehatan[]>([]);
  const [isLoadingDetail, setIsLoadingDetail] = useState(false);
  
  useEffect(() => {
    if (currentUser) {
      // Simulasi pengambilan data
      setTimeout(() => {
        const kelas = currentUser.kelas || '6A';
        const siswaData = getSiswaByKelas(kelas);
        setDaftarSiswa(siswaData);
        setFilteredSiswa(siswaData);
        setIsLoading(false);
      }, 1000);
    }
  }, [currentUser]);
  
  useEffect(() => {
    // Filter dan sort data
    let filtered = [...daftarSiswa];
    
    // Filter berdasarkan kata kunci pencarian
    if (searchTerm) {
      const lowerCaseSearch = searchTerm.toLowerCase();
      filtered = filtered.filter(item => 
        item.nama.toLowerCase().includes(lowerCaseSearch) ||
        item.nis.toLowerCase().includes(lowerCaseSearch)
      );
    }
    
    // Sort data
    filtered.sort((a, b) => {
      const valueA = sortBy === 'nama' ? a.nama : a.nis;
      const valueB = sortBy === 'nama' ? b.nama : b.nis;
      
      if (sortDir === 'asc') {
        return valueA.localeCompare(valueB);
      } else {
        return valueB.localeCompare(valueA);
      }
    });
    
    setFilteredSiswa(filtered);
  }, [searchTerm, sortBy, sortDir, daftarSiswa]);
  
  const handleToggleSort = (field: 'nama' | 'nis') => {
    if (sortBy === field) {
      // Toggle sort direction
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    } else {
      // Change sort field and reset direction to asc
      setSortBy(field);
      setSortDir('asc');
    }
  };
  
  const handleViewDetail = (siswa: Siswa) => {
    setSelectedSiswa(siswa);
    setIsLoadingDetail(true);
    
    // Simulasi pengambilan data
    setTimeout(() => {
      const data = getDataKesehatanBySiswaId(siswa.id);
      setDataSiswa(data);
      setIsLoadingDetail(false);
    }, 1000);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

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
              <h1 className="text-2xl font-bold mb-2">Daftar Siswa</h1>
              <p className="opacity-90">Kelas {currentUser?.kelas} - Tahun Ajaran 2024/2025</p>
            </div>
            <div className="bg-white/20 p-3 rounded-full hidden md:block">
              <Users size={30} className="text-white" />
            </div>
          </div>
        </div>
      </motion.div>
      
      {/* Filter dan Pencarian */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
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
              placeholder="Cari nama atau NIS siswa..."
              className="input pl-10 w-full"
            />
          </div>
          
          <div className="flex gap-2 items-center">
            <Filter size={18} className="text-gray-500" />
            <select
              className="input py-2"
              onChange={(e) => {
                if (e.target.value === 'nama_asc') {
                  setSortBy('nama');
                  setSortDir('asc');
                } else if (e.target.value === 'nama_desc') {
                  setSortBy('nama');
                  setSortDir('desc');
                } else if (e.target.value === 'nis_asc') {
                  setSortBy('nis');
                  setSortDir('asc');
                } else if (e.target.value === 'nis_desc') {
                  setSortBy('nis');
                  setSortDir('desc');
                }
              }}
              value={`${sortBy}_${sortDir}`}
            >
              <option value="nama_asc">Nama (A-Z)</option>
              <option value="nama_desc">Nama (Z-A)</option>
              <option value="nis_asc">NIS (Terkecil)</option>
              <option value="nis_desc">NIS (Terbesar)</option>
            </select>
          </div>
        </div>
      </motion.div>
      
      {/* Daftar Siswa */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="card hover:shadow-lg overflow-hidden"
      >
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-800">Daftar Siswa Kelas {currentUser?.kelas}</h2>
            <p className="text-gray-600 text-sm mt-1">Total: {filteredSiswa.length} siswa</p>
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
                  onClick={() => handleToggleSort('nis')}
                >
                  <div className="flex items-center">
                    NIS
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
                  Jenis Kelamin
                </th>
                <th className="px-4 py-3.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Kontak Orang Tua
                </th>
                <th className="px-4 py-3.5 text-xs font-medium text-gray-500 uppercase tracking-wider text-right">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredSiswa.map((siswa, index) => (
                <tr key={siswa.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                    {index + 1}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-800">
                    {siswa.nis}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-800">
                    {siswa.nama}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                    {siswa.jenisKelamin === 'L' ? 'Laki-laki' : 'Perempuan'}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                    {siswa.teleponOrangTua}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-right">
                    <button
                      onClick={() => handleViewDetail(siswa)}
                      className="text-primary-600 hover:text-primary-800 font-medium flex items-center justify-end"
                    >
                      <Eye size={16} className="mr-1" />
                      Detail
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredSiswa.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">Tidak ada siswa yang sesuai dengan pencarian.</p>
          </div>
        )}
      </motion.div>
      
      {/* Modal Detail Siswa */}
      {selectedSiswa && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-auto"
          >
            <div className="p-6 border-b sticky top-0 bg-white z-10">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-800">
                  Detail Siswa: {selectedSiswa.nama}
                </h2>
                <button
                  onClick={() => setSelectedSiswa(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  &times;
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-4">Informasi Pribadi</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-500">Nama Lengkap</p>
                      <p className="font-medium">{selectedSiswa.nama}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">NIS</p>
                      <p className="font-medium">{selectedSiswa.nis}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Kelas</p>
                      <p className="font-medium">{selectedSiswa.kelas}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Jenis Kelamin</p>
                      <p className="font-medium">{selectedSiswa.jenisKelamin === 'L' ? 'Laki-laki' : 'Perempuan'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Tanggal Lahir</p>
                      <p className="font-medium">{selectedSiswa.tanggalLahir}</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-4">Informasi Kontak</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-500">Alamat</p>
                      <p className="font-medium">{selectedSiswa.alamat}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Nama Orang Tua</p>
                      <p className="font-medium">{selectedSiswa.namaOrangTua}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Telepon Orang Tua</p>
                      <p className="font-medium">{selectedSiswa.teleponOrangTua}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="border-t pt-6">
                <h3 className="text-lg font-medium text-gray-800 mb-4">Data Kesehatan</h3>
                
                {isLoadingDetail ? (
                  <div className="flex justify-center items-center h-32">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-500"></div>
                  </div>
                ) : dataSiswa.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Tanggal
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Suhu Tubuh
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Berat Badan
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Tinggi Badan
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Keluhan
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {dataSiswa.map((data) => (
                          <tr key={data.id} className="hover:bg-gray-50">
                            <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-800">
                              {data.tanggal}
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                              {data.suhuTubuh}°C
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                              {data.beratBadan} kg
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                              {data.tinggiBadan} cm
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-600">
                              {data.keluhan ? (
                                <div className="max-w-xs truncate" title={data.keluhan}>
                                  {data.keluhan}
                                </div>
                              ) : (
                                <span className="text-gray-400">-</span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500">Belum ada data kesehatan yang tercatat.</p>
                  </div>
                )}
              </div>
              
              <div className="mt-8 text-right">
                <button
                  onClick={() => setSelectedSiswa(null)}
                  className="btn-primary"
                >
                  Tutup
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default GuruDaftarSiswa;