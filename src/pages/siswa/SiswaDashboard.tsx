import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Activity, Calendar, TrendingUp, MessageCircle, ArrowRight } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { getDataKesehatanBySiswaId, dataKesehatanList } from '../../data/kesehatanData';
import { DataKesehatan } from '../../types';
import { format } from 'date-fns';

const SiswaDashboard: React.FC = () => {
  const { currentUser } = useAuth();
  const [dataKesehatan, setDataKesehatan] = useState<DataKesehatan[]>([]);
  const [todayData, setTodayData] = useState<DataKesehatan | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    if (currentUser) {
      // Simulasi pengambilan data
      setTimeout(() => {
        const data = getDataKesehatanBySiswaId(currentUser.id);
        setDataKesehatan(data);
        
        // Cek apakah sudah mengisi data hari ini
        const today = format(new Date(), 'yyyy-MM-dd');
        const todayEntry = data.find(item => item.tanggal === today);
        setTodayData(todayEntry || null);
        
        setIsLoading(false);
      }, 1000);
    }
  }, [currentUser]);

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
              <p className="opacity-90">Jaga kesehatanmu untuk prestasi yang lebih baik</p>
            </div>
            <div className="mt-4 md:mt-0 flex items-center bg-white/20 rounded-lg px-3 py-2">
              <Calendar size={18} className="mr-2" />
              <span>{format(new Date(), 'EEEE, d MMMM yyyy')}</span>
            </div>
          </div>
        </div>
      </motion.div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Status Pengisian Data Hari Ini */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="card hover:shadow-lg"
        >
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-3">Status Hari Ini</h2>
              {todayData ? (
                <div>
                  <div className="bg-secondary-100 text-secondary-700 px-3 py-1 rounded-full inline-flex items-center mb-4">
                    <Activity size={16} className="mr-1" />
                    Data telah terisi
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-sm text-gray-500">Suhu Tubuh</p>
                      <p className="text-lg font-semibold">{todayData.suhuTubuh}°C</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-sm text-gray-500">Berat Badan</p>
                      <p className="text-lg font-semibold">{todayData.beratBadan} kg</p>
                    </div>
                  </div>
                  <Link 
                    to="/siswa/input-kesehatan"
                    className="text-primary-500 hover:text-primary-600 flex items-center text-sm font-medium"
                  >
                    Lihat detail lengkap
                    <ArrowRight size={16} className="ml-1" />
                  </Link>
                </div>
              ) : (
                <div>
                  <div className="bg-warning-100 text-warning-700 px-3 py-1 rounded-full inline-flex items-center mb-4">
                    <Activity size={16} className="mr-1" />
                    Belum ada data
                  </div>
                  <p className="text-gray-600 mb-4">
                    Kamu belum mengisi data kesehatan hari ini.
                  </p>
                  <Link 
                    to="/siswa/input-kesehatan"
                    className="btn-primary inline-flex items-center"
                  >
                    Isi Data Sekarang
                    <ArrowRight size={18} className="ml-2" />
                  </Link>
                </div>
              )}
            </div>
            <div className="bg-primary-100 p-3 rounded-full">
              <Activity size={24} className="text-primary-500" />
            </div>
          </div>
        </motion.div>
        
        {/* Riwayat Kesehatan */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="card hover:shadow-lg"
        >
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-3">Riwayat Kesehatan</h2>
              {dataKesehatan.length > 0 ? (
                <div>
                  <p className="text-gray-600 mb-4">
                    {dataKesehatan.length} catatan kesehatan telah direkam.
                  </p>
                  <div className="space-y-3 mb-4">
                    {dataKesehatan.slice(0, 3).map((data) => (
                      <div key={data.id} className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-primary-500 mr-2"></div>
                        <p className="text-sm text-gray-600">
                          {data.tanggal}: Suhu {data.suhuTubuh}°C
                        </p>
                      </div>
                    ))}
                  </div>
                  <Link 
                    to="/siswa/input-kesehatan"
                    className="text-primary-500 hover:text-primary-600 flex items-center text-sm font-medium"
                  >
                    Lihat riwayat lengkap
                    <ArrowRight size={16} className="ml-1" />
                  </Link>
                </div>
              ) : (
                <p className="text-gray-600">
                  Belum ada riwayat kesehatan yang direkam.
                </p>
              )}
            </div>
            <div className="bg-secondary-100 p-3 rounded-full">
              <TrendingUp size={24} className="text-secondary-500" />
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Keluhan dan Tanggapan */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="card hover:shadow-lg"
      >
        <div className="flex items-start justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-800">Keluhan Terbaru & Tanggapan</h2>
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
                  <div className="flex justify-between items-start">
                    <p className="text-gray-800 font-medium">{data.tanggal}</p>
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
                  <div className="mt-3">
                    <p className="text-gray-600 text-sm">
                      <span className="font-medium">Keluhan:</span> {data.keluhan}
                    </p>
                    {data.tanggapanGuru && (
                      <div className="mt-2 bg-gray-50 p-3 rounded-lg">
                        <p className="text-gray-600 text-sm">
                          <span className="font-medium">Tanggapan Guru:</span> {data.tanggapanGuru}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            
            <div className="mt-4 text-center">
              <Link 
                to="/siswa/keluhan"
                className="text-primary-500 hover:text-primary-600 flex items-center justify-center text-sm font-medium"
              >
                Lihat semua keluhan
                <ArrowRight size={16} className="ml-1" />
              </Link>
            </div>
          </div>
        ) : (
          <p className="text-gray-600">
            Belum ada keluhan yang direkam. Jika kamu memiliki keluhan kesehatan, silakan sampaikan melalui halaman Keluhan.
          </p>
        )}
      </motion.div>
      
      {/* Tips Kesehatan */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="bg-gradient-to-r from-secondary-500 to-secondary-600 rounded-2xl p-6 text-white shadow-lg"
      >
        <h2 className="text-lg font-semibold mb-3">Tips Kesehatan Hari Ini</h2>
        <p className="mb-4">
          Jangan lupa minum air minimal 8 gelas sehari untuk menjaga tubuh tetap terhidrasi dengan baik. Air membantu tubuhmu berfungsi dengan optimal!
        </p>
        <div className="flex justify-end">
          <div className="bg-white/20 rounded-lg px-3 py-1 text-sm">
            #JagaKesehatan
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SiswaDashboard;