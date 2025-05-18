import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileText, BarChart, Download, Calendar, Printer } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { getDataKesehatanByKelas, laporanKesehatanData } from '../../data/kesehatanData';
import { DataKesehatan, LaporanKesehatan } from '../../types';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement } from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend);

const GuruLaporan: React.FC = () => {
  const { currentUser } = useAuth();
  const [dataKesehatan, setDataKesehatan] = useState<DataKesehatan[]>([]);
  const [laporanKesehatan, setLaporanKesehatan] = useState<LaporanKesehatan[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [periode, setPeriode] = useState('bulanan');
  
  useEffect(() => {
    if (currentUser) {
      // Simulasi pengambilan data
      setTimeout(() => {
        const kelas = currentUser.kelas || '6A';
        const kesehatanData = getDataKesehatanByKelas(kelas);
        const laporan = laporanKesehatanData.filter(data => data.kelas === kelas);
        
        setDataKesehatan(kesehatanData);
        setLaporanKesehatan(laporan);
        setIsLoading(false);
      }, 1000);
    }
  }, [currentUser]);

  // Bar chart data untuk jumlah keluhan per bulan
  const barData = {
    labels: ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni'],
    datasets: [
      {
        label: 'Jumlah Keluhan',
        data: [8, 10, 6, 9, 12, 8],
        backgroundColor: 'rgba(245, 158, 11, 0.7)',
        borderColor: 'rgba(245, 158, 11, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Line chart data untuk trend suhu tubuh rata-rata
  const lineData = {
    labels: ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni'],
    datasets: [
      {
        label: 'Suhu Tubuh Rata-rata (°C)',
        data: [36.6, 36.7, 36.8, 36.7, 36.9, 36.8],
        borderColor: 'rgba(59, 130, 246, 1)',
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        tension: 0.3,
      },
    ],
  };
  
  // Line chart data untuk trend berat dan tinggi badan rata-rata
  const beratTinggiData = {
    labels: ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni'],
    datasets: [
      {
        label: 'Berat Badan Rata-rata (kg)',
        data: [34.2, 34.5, 34.7, 35.0, 35.2, 35.5],
        borderColor: 'rgba(16, 185, 129, 1)',
        backgroundColor: 'rgba(16, 185, 129, 0.2)',
        tension: 0.3,
        yAxisID: 'y',
      },
      {
        label: 'Tinggi Badan Rata-rata (cm)',
        data: [140.0, 140.5, 141.0, 141.5, 142.0, 142.5],
        borderColor: 'rgba(236, 72, 153, 1)',
        backgroundColor: 'rgba(236, 72, 153, 0.2)',
        tension: 0.3,
        yAxisID: 'y1',
      },
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
              <p className="opacity-90">Kelas {currentUser?.kelas} - Tahun Ajaran 2024/2025</p>
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
          
          <div className="flex gap-4">
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
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <div className="card hover:shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Jumlah Siswa</h3>
            <div className="bg-primary-100 rounded-full p-2">
              <Users size={20} className="text-primary-500" />
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-800">30</p>
          <p className="text-sm text-gray-500 mt-1">Total siswa kelas {currentUser?.kelas}</p>
        </div>
        
        <div className="card hover:shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Keluhan</h3>
            <div className="bg-warning-100 rounded-full p-2">
              <MessageCircle size={20} className="text-warning-500" />
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-800">8</p>
          <p className="text-sm text-gray-500 mt-1">Jumlah keluhan bulan ini</p>
        </div>
        
        <div className="card hover:shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Kehadiran</h3>
            <div className="bg-secondary-100 rounded-full p-2">
              <CheckCircle size={20} className="text-secondary-500" />
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-800">97%</p>
          <p className="text-sm text-gray-500 mt-1">Tingkat kehadiran bulan ini</p>
        </div>
      </motion.div>
      
      {/* Grafik Keluhan */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="card hover:shadow-lg"
      >
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-800">Tren Keluhan per Bulan</h2>
            <p className="text-gray-600 text-sm mt-1">Jumlah keluhan yang tercatat selama 6 bulan terakhir</p>
          </div>
          <div className="bg-warning-100 p-3 rounded-full">
            <BarChart size={24} className="text-warning-500" />
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
      
      {/* Grafik Suhu Tubuh */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="card hover:shadow-lg"
      >
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-800">Tren Suhu Tubuh Rata-rata</h2>
            <p className="text-gray-600 text-sm mt-1">Suhu tubuh rata-rata siswa selama 6 bulan terakhir</p>
          </div>
          <div className="bg-primary-100 p-3 rounded-full">
            <TrendingUp size={24} className="text-primary-500" />
          </div>
        </div>
        
        <div className="h-80">
          <Line 
            data={lineData} 
            options={{ 
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: 'top' as const,
                },
              },
              scales: {
                y: {
                  min: 36,
                  max: 38,
                  title: {
                    display: true,
                    text: 'Suhu Tubuh (°C)'
                  }
                }
              }
            }} 
          />
        </div>
      </motion.div>
      
      {/* Grafik Berat dan Tinggi Badan */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="card hover:shadow-lg"
      >
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-800">Tren Berat dan Tinggi Badan</h2>
            <p className="text-gray-600 text-sm mt-1">Perkembangan berat dan tinggi badan rata-rata</p>
          </div>
          <div className="bg-secondary-100 p-3 rounded-full">
            <Activity size={24} className="text-secondary-500" />
          </div>
        </div>
        
        <div className="h-80">
          <Line 
            data={beratTinggiData} 
            options={{ 
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: 'top' as const,
                },
              },
              scales: {
                y: {
                  type: 'linear',
                  display: true,
                  position: 'left',
                  title: {
                    display: true,
                    text: 'Berat Badan (kg)'
                  }
                },
                y1: {
                  type: 'linear',
                  display: true,
                  position: 'right',
                  grid: {
                    drawOnChartArea: false,
                  },
                  title: {
                    display: true,
                    text: 'Tinggi Badan (cm)'
                  }
                },
              }
            }} 
          />
        </div>
      </motion.div>
      
      {/* Tabel Rekap Bulanan */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="card hover:shadow-lg"
      >
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-800">Rekap Bulanan</h2>
            <p className="text-gray-600 text-sm mt-1">Laporan bulanan kesehatan siswa</p>
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
              {laporanKesehatan.map((laporan) => (
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
      </motion.div>
    </div>
  );
};

export default GuruLaporan;