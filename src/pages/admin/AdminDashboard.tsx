import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Users, Calendar, TrendingUp, MessageCircle, ArrowRight, Activity, School, UserCheck } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { getAllSiswa, getAllGuru, dataKesehatanList } from '../../data/kesehatanData';
import { DataKesehatan, Siswa, Guru } from '../../types';
import { format } from 'date-fns';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Title } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Title);

const AdminDashboard: React.FC = () => {
  const { currentUser } = useAuth();
  const [dataKesehatan, setDataKesehatan] = useState<DataKesehatan[]>([]);
  const [daftarSiswa, setDaftarSiswa] = useState<Siswa[]>([]);
  const [daftarGuru, setDaftarGuru] = useState<Guru[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [belumDitanggapi, setBelumDitanggapi] = useState<number>(0);
  
  useEffect(() => {
    // Simulasi pengambilan data
    setTimeout(() => {
      const kesehatanData = dataKesehatanList;
      const siswaData = getAllSiswa();
      const guruData = getAllGuru();
      
      setDataKesehatan(kesehatanData);
      setDaftarSiswa(siswaData);
      setDaftarGuru(guruData);
      
      // Hitung jumlah keluhan yang belum ditanggapi
      const belumTanggapi = kesehatanData.filter(data => 
        data.keluhan && 
        data.keluhan.length > 0 && 
        data.status === 'belum_ditanggapi'
      ).length;
      
      setBelumDitanggapi(belumTanggapi);
      setIsLoading(false);
    }, 1000);
  }, []);

  // Data untuk pie chart
  const pieData = {
    labels: ['6A', '6B', '5A', '5B'],
    datasets: [
      {
        data: [30, 28, 32, 27],
        backgroundColor: [
          'rgba(59, 130, 246, 0.7)',  // Biru
          'rgba(16, 185, 129, 0.7)',   // Hijau
          'rgba(245, 158, 11, 0.7)',   // Kuning
          'rgba(236, 72, 153, 0.7)',   // Merah Muda
        ],
        borderColor: [
          'rgba(59, 130, 246, 1)',
          'rgba(16, 185, 129, 1)',
          'rgba(245, 158, 11, 1)',
          'rgba(236, 72, 153, 1)',
        ],
        borderWidth: 1,
      },
    ],
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
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-2xl font-bold mb-2">Selamat Datang, {currentUser?.nama}!</h1>
              <p className="opacity-90">Pantau kesehatan seluruh siswa dengan mudah</p>
            </div>
            <div className="mt-4 md:mt-0 flex items-center bg-white/20 rounded-lg px-3 py-2">
              <Calendar size={18} className="mr-2" />
              <span>{format(new Date(), 'EEEE, d MMMM yyyy')}</span>
            </div>
          </div>
        </div>
      </motion.div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Siswa */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="card hover:shadow-lg"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Siswa</p>
              <h3 className="text-2xl font-bold text-gray-800 mt-1">{daftarSiswa.length}</h3>
            </div>
            <div className="bg-primary-100 p-3 rounded-full">
              <Users size={24} className="text-primary-500" />
            </div>
          </div>
          <div className="mt-4">
            <Link 
              to="/admin/kelola-pengguna"
              className="text-primary-500 hover:text-primary-600 flex items-center text-sm font-medium"
            >
              Kelola pengguna
              <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>
        </motion.div>
        
        {/* Total Guru */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="card hover:shadow-lg"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Guru</p>
              <h3 className="text-2xl font-bold text-gray-800 mt-1">{daftarGuru.length}</h3>
            </div>
            <div className="bg-secondary-100 p-3 rounded-full">
              <UserCheck size={24} className="text-secondary-500" />
            </div>
          </div>
          <div className="mt-4">
            <Link 
              to="/admin/kelola-pengguna"
              className="text-secondary-500 hover:text-secondary-600 flex items-center text-sm font-medium"
            >
              Kelola guru
              <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>
        </motion.div>
        
        {/* Total Kelas */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="card hover:shadow-lg"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Kelas</p>
              <h3 className="text-2xl font-bold text-gray-800 mt-1">4</h3>
            </div>
            <div className="bg-warning-100 p-3 rounded-full">
              <School size={24} className="text-warning-500" />
            </div>
          </div>
          <div className="mt-4">
            <Link 
              to="/admin/pengaturan"
              className="text-warning-500 hover:text-warning-600 flex items-center text-sm font-medium"
            >
              Pengaturan kelas
              <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>
        </motion.div>
        
        {/* Data Terekam */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="card hover:shadow-lg"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Data Kesehatan</p>
              <h3 className="text-2xl font-bold text-gray-800 mt-1">{dataKesehatan.length}</h3>
            </div>
            <div className="bg-danger-100 p-3 rounded-full">
              <Activity size={24} className="text-danger-500" />
            </div>
          </div>
          <div className="mt-4">
            <Link 
              to="/admin/laporan"
              className="text-danger-500 hover:text-danger-600 flex items-center text-sm font-medium"
            >
              Lihat laporan
              <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>
        </motion.div>
      </div>
      
      {/* Grafik dan Data Terbaru */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Distribusi Siswa Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="card hover:shadow-lg"
        >
          <h2 className="text-lg font-semibold text-gray-800 mb-6">Distribusi Siswa per Kelas</h2>
          <div className="h-64 flex justify-center">
            <Pie data={pieData} options={{ maintainAspectRatio: false }} />
          </div>
        </motion.div>
        
        {/* Jumlah Keluhan Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="card hover:shadow-lg"
        >
          <h2 className="text-lg font-semibold text-gray-800 mb-6">Jumlah Keluhan per Kelas</h2>
          <div className="h-64">
            <Bar 
              data={barData} 
              options={{ 
                maintainAspectRatio: false,
                scales: {
                  y: {
                    beginAtZero: true
                  }
                } 
              }} 
            />
          </div>
        </motion.div>
      </div>
      
      {/* Data Kesehatan Terbaru */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
        className="card hover:shadow-lg"
      >
        <div className="flex items-start justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-800">Data Kesehatan Terbaru</h2>
          <div className="bg-primary-100 p-3 rounded-full">
            <Activity size={24} className="text-primary-500" />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nama Siswa
                </th>
                <th className="px-4 py-3.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Kelas
                </th>
                <th className="px-4 py-3.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tanggal
                </th>
                <th className="px-4 py-3.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Suhu
                </th>
                <th className="px-4 py-3.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Berat
                </th>
                <th className="px-4 py-3.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tinggi
                </th>
                <th className="px-4 py-3.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {dataKesehatan.slice(0, 5).map((data) => (
                <tr key={data.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-800">
                    {data.namaSiswa}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                    {data.kelas}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
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
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span 
                      className={`px-2 py-1 text-xs rounded-full ${
                        data.suhuTubuh >= 37.5 
                          ? 'bg-danger-100 text-danger-700' 
                          : 'bg-secondary-100 text-secondary-700'
                      }`}
                    >
                      {data.suhuTubuh >= 37.5 ? 'Perhatikan' : 'Normal'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="mt-4 text-center">
          <Link 
            to="/admin/laporan"
            className="btn-primary"
          >
            Lihat Semua Data
          </Link>
        </div>
      </motion.div>
      
      {/* Keluhan Terbaru */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="card hover:shadow-lg"
      >
        <div className="flex items-start justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-800">Keluhan Terbaru</h2>
          <div className="bg-warning-100 p-3 rounded-full">
            <MessageCircle size={24} className="text-warning-500" />
          </div>
        </div>
        
        {dataKesehatan.some(data => data.keluhan && data.keluhan.length > 0) ? (
          <div>
            {dataKesehatan
              .filter(data => data.keluhan && data.keluhan.length > 0)
              .slice(0, 3)
              .map((data) => (
                <div key={data.id} className="border border-gray-200 rounded-lg p-4 mb-4 last:mb-0">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-medium text-gray-800">{data.namaSiswa}</p>
                      <p className="text-sm text-gray-500">Kelas {data.kelas} | {data.tanggal}</p>
                    </div>
                    <span 
                      className={`px-2 py-1 text-xs rounded-full ${
                        data.status === 'sudah_ditanggapi' 
                          ? 'bg-secondary-100 text-secondary-700' 
                          : 'bg-warning-100 text-warning-700'
                      }`}
                    >
                      {data.status === 'sudah_ditanggapi' ? 'Sudah ditanggapi' : 'Belum ditanggapi'}
                    </span>
                  </div>
                  <p className="text-gray-600">{data.keluhan}</p>
                  {data.tanggapanGuru && (
                    <div className="mt-2 bg-gray-50 p-3 rounded-lg">
                      <p className="text-gray-600 text-sm">
                        <span className="font-medium">Tanggapan:</span> {data.tanggapanGuru}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            
            <div className="mt-4 text-center">
              <Link 
                to="/admin/laporan"
                className="btn-warning"
              >
                Lihat Semua Keluhan
              </Link>
            </div>
          </div>
        ) : (
          <p className="text-gray-600">
            Belum ada keluhan dari siswa yang tercatat.
          </p>
        )}
      </motion.div>
    </div>
  );
};

export default AdminDashboard;