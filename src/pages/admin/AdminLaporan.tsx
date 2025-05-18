import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileText, BarChart, Download, Calendar, Printer, ChevronDown, ChevronUp } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { dataKesehatanList, laporanKesehatanData } from '../../data/kesehatanData';
import { DataKesehatan, LaporanKesehatan } from '../../types';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement } from 'chart.js';
import { Bar } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend);

const AdminLaporan: React.FC = () => {
  const { currentUser } = useAuth();
  const [dataKesehatan, setDataKesehatan] = useState<DataKesehatan[]>([]);
  const [laporanKesehatan, setLaporanKesehatan] = useState<LaporanKesehatan[]>([]);
  const [expandedKelas, setExpandedKelas] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [periode, setPeriode] = useState('bulanan');
  const [filterTahun, setFilterTahun] = useState('2025');
  
  useEffect(() => {
    // Simulasi pengambilan data
    setTimeout(() => {
      setDataKesehatan(dataKesehatanList);
      setLaporanKesehatan(laporanKesehatanData);
      setIsLoading(false);
    }, 1000);
  }, []);

  const toggleKelas = (kelas: string) => {
    if (expandedKelas.includes(kelas)) {
      setExpandedKelas(expandedKelas.filter(k => k !== kelas));
    } else {
      setExpandedKelas([...expandedKelas, kelas]);
    }
  };

  // Data untuk bar chart
  const barData = {
    labels: ['6A', '6B', '5A', '5B'],
    datasets: [
      {
        label: 'Jumlah Keluhan',
        data: [12, 8, 10, 14],
        backgroundColor: 'rgba(245, 158, 11, 0.7)',
        borderColor: 'rgba(245, 158, 11, 1)',
        borderWidth: 1,
      },
      {
        label: 'Suhu Normal',
        data: [28, 26, 30, 25],
        backgroundColor: 'rgba(16, 185, 129, 0.7)',
        borderColor: 'rgba(16, 185, 129, 1)',
        borderWidth: 1,
      },
      {
        label: 'Suhu Tinggi',
        data: [2, 2, 2, 2],
        backgroundColor: 'rgba(236, 72, 153, 0.7)',
        borderColor: 'rgba(236, 72, 153, 1)',
        borderWidth: 1,
      }
    ],
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
              <h1 className="text-2xl font-bold mb-2">Laporan Kesehatan</h1>
              <p className="opacity-90">Rekap data kesehatan seluruh kelas</p>
            </div>
            <div className="bg-white/20 p-3 rounded-full hidden md:block">
              <FileText size={30} className="text-white" />
            </div>
          </div>
        </div>
      </motion.div>
      
      {/* Filter Periode */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="card hover:shadow-lg"
      >
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center">
            <Calendar size={20} className="text-gray-500 mr-2" />
            <h2 className="text-lg font-semibold text-gray-800">Periode Laporan</h2>
          </div>
          
          <div className="flex flex-wrap gap-4">
            <div className="flex gap-2">
              <select
                value={periode}
                onChange={(e) => setPeriode(e.target.value)}
                className="input py-2"
              >
                <option value="harian">Harian</option>
                <option value="mingguan">Mingguan</option>
                <option value="bulanan">Bulanan</option>
                <option value="semesteran">Semesteran</option>
              </select>
            </div>
            
            <div className="flex gap-2">
              <select
                value={filterTahun}
                onChange={(e) => setFilterTahun(e.target.value)}
                className="input py-2"
              >
                <option value="2025">2025</option>
                <option value="2024">2024</option>
              </select>
            </div>
            
            <button className="btn-outline flex items-center">
              <Download size={16} className="mr-1" />
              Unduh Laporan
            </button>
            
            <button className="btn-outline flex items-center">
              <Printer size={16} className="mr-1" />
              Cetak
            </button>
          </div>
        </div>
      </motion.div>
      
      {/* Ringkasan Laporan */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-6"
      >
        <div className="card hover:shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Jumlah Siswa</h3>
            <div className="bg-primary-100 rounded-full p-2">
              <Users size={20} className="text-primary-500" />
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-800">117</p>
          <p className="text-sm text-gray-500 mt-1">Total siswa keseluruhan</p>
        </div>
        
        <div className="card hover:shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Rata-rata Suhu</h3>
            <div className="bg-danger-100 rounded-full p-2">
              <ThermometerIcon size={20} className="text-danger-500" />
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-800">36.8°C</p>
          <p className="text-sm text-gray-500 mt-1">Suhu tubuh rata-rata</p>
        </div>
        
        <div className="card hover:shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Keluhan</h3>
            <div className="bg-warning-100 rounded-full p-2">
              <MessageCircle size={20} className="text-warning-500" />
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-800">44</p>
          <p className="text-sm text-gray-500 mt-1">Total keluhan bulan ini</p>
        </div>
        
        <div className="card hover:shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Kehadiran</h3>
            <div className="bg-secondary-100 rounded-full p-2">
              <CheckCircle size={20} className="text-secondary-500" />
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-800">95%</p>
          <p className="text-sm text-gray-500 mt-1">Tingkat kehadiran keseluruhan</p>
        </div>
      </motion.div>
      
      {/* Grafik Perbandingan Kelas */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="card hover:shadow-lg"
      >
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-800">Perbandingan Data Antar Kelas</h2>
            <p className="text-gray-600 text-sm mt-1">Data kesehatan dari semua kelas</p>
          </div>
          <div className="bg-primary-100 p-3 rounded-full">
            <BarChart size={24} className="text-primary-500" />
          </div>
        </div>
        
        <div className="h-80">
          <Bar 
            data={barData} 
            options={{ 
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: 'top' as const,
                },
                title: {
                  display: false,
                },
              },
            }} 
          />
        </div>
      </motion.div>
      
      {/* Tabel Rekap per Kelas */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="space-y-6"
      >
        {['6A', '6B', '5A', '5B'].map((kelas) => (
          <div key={kelas} className="card hover:shadow-lg">
            <button 
              onClick={() => toggleKelas(kelas)}
              className="flex items-center justify-between w-full"
            >
              <div className="flex items-center">
                <School size={20} className="text-primary-500 mr-2" />
                <h2 className="text-lg font-semibold text-gray-800">Kelas {kelas}</h2>
              </div>
              {expandedKelas.includes(kelas) ? (
                <ChevronUp size={20} className="text-gray-500" />
              ) : (
                <ChevronDown size={20} className="text-gray-500" />
              )}
            </button>
            
            {expandedKelas.includes(kelas) && (
              <div className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500">Jumlah Siswa</p>
                    <p className="text-xl font-semibold">{kelas === '6A' ? 30 : kelas === '6B' ? 28 : kelas === '5A' ? 32 : 27}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500">Suhu Rata-rata</p>
                    <p className="text-xl font-semibold">36.8°C</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500">Keluhan</p>
                    <p className="text-xl font-semibold">{kelas === '6A' ? 12 : kelas === '6B' ? 8 : kelas === '5A' ? 10 : 14}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500">Kehadiran</p>
                    <p className="text-xl font-semibold">{kelas === '6A' ? 97 : kelas === '6B' ? 94 : kelas === '5A' ? 96 : 93}%</p>
                  </div>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Bulan
                        </th>
                        <th className="px-4 py-3.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Jumlah Siswa
                        </th>
                        <th className="px-4 py-3.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Jumlah Keluhan
                        </th>
                        <th className="px-4 py-3.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          % Kehadiran
                        </th>
                        <th className="px-4 py-3.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Masalah Umum
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {laporanKesehatan
                        .filter(laporan => laporan.kelas === kelas)
                        .map((laporan) => (
                          <tr key={laporan.id} className="hover:bg-gray-50">
                            <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-800">
                              {laporan.bulan} {laporan.tahun}
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                              {laporan.jumlahSiswa}
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                              {laporan.jumlahKeluhan}
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                              {laporan.persentaseKehadiran}%
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-600">
                              {laporan.masalahUmum.join(', ')}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default AdminLaporan;