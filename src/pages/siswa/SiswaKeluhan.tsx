import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Clock, Send, RefreshCw } from 'lucide-react';
import { toast } from 'react-toastify';
import { useAuth } from '../../contexts/AuthContext';
import { getDataKesehatanBySiswaId, dataKesehatanList } from '../../data/kesehatanData';
import { DataKesehatan } from '../../types';
import { format } from 'date-fns';

const SiswaKeluhan: React.FC = () => {
  const { currentUser } = useAuth();
  const [dataKeluhan, setDataKeluhan] = useState<DataKesehatan[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [keluhanBaru, setKeluhanBaru] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  useEffect(() => {
    if (currentUser) {
      // Simulasi pengambilan data
      setTimeout(() => {
        const data = getDataKesehatanBySiswaId(currentUser.id)
          .filter(item => item.keluhan && item.keluhan.length > 0);
        setDataKeluhan(data);
        setIsLoading(false);
      }, 1000);
    }
  }, [currentUser]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Validasi input
    if (!keluhanBaru.trim()) {
      toast.error('Keluhan tidak boleh kosong');
      setIsSubmitting(false);
      return;
    }
    
    // Simulasi pengiriman data
    setTimeout(() => {
      const today = format(new Date(), 'yyyy-MM-dd');
      const todayData = dataKeluhan.find(item => item.tanggal === today);
      
      if (todayData) {
        // Update keluhan yang sudah ada
        const updatedData = dataKeluhan.map(item => {
          if (item.id === todayData.id) {
            return {
              ...item,
              keluhan: keluhanBaru,
              status: 'belum_ditanggapi',
              timestamp: new Date().toISOString()
            };
          }
          return item;
        });
        
        setDataKeluhan(updatedData);
        toast.success('Keluhan berhasil diperbarui');
      } else {
        // Buat keluhan baru
        const newKeluhan: DataKesehatan = {
          id: Date.now().toString(),
          siswaId: currentUser?.id || '',
          namaSiswa: currentUser?.nama || '',
          kelas: currentUser?.kelas || '',
          tanggal: today,
          suhuTubuh: 36.8,
          beratBadan: 35.0,
          tinggiBadan: 140.0,
          keluhan: keluhanBaru,
          status: 'belum_ditanggapi',
          timestamp: new Date().toISOString()
        };
        
        setDataKeluhan([newKeluhan, ...dataKeluhan]);
        toast.success('Keluhan berhasil dikirim');
      }
      
      setKeluhanBaru('');
      setIsSubmitting(false);
    }, 1500);
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
        <div className="bg-gradient-to-r from-warning-500 to-warning-600 rounded-2xl p-6 text-white shadow-lg">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-2xl font-bold mb-2">Keluhan Kesehatan</h1>
              <p className="opacity-90">Sampaikan jika kamu memiliki keluhan kesehatan</p>
            </div>
            <div className="mt-4 md:mt-0 flex items-center bg-white/20 rounded-lg px-3 py-2">
              <Clock size={18} className="mr-2" />
              <span>{format(new Date(), 'EEEE, d MMMM yyyy')}</span>
            </div>
          </div>
        </div>
      </motion.div>
      
      {/* Form Keluhan Baru */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="card hover:shadow-lg"
      >
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-800">Sampaikan Keluhan</h2>
            <p className="text-gray-600 text-sm mt-1">Ceritakan jika kamu memiliki masalah kesehatan</p>
          </div>
          <div className="bg-warning-100 p-3 rounded-full">
            <MessageCircle size={24} className="text-warning-500" />
          </div>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="keluhan" className="block text-sm font-medium text-gray-600 mb-1">
              Keluhan Kesehatan
            </label>
            <textarea
              id="keluhan"
              value={keluhanBaru}
              onChange={(e) => setKeluhanBaru(e.target.value)}
              className="input w-full h-32"
              placeholder="Tuliskan keluhan kesehatanmu di sini..."
              required
            ></textarea>
            <p className="text-xs text-gray-500 mt-1">
              Misalnya: "Saya merasa pusing dan mual sejak tadi pagi, dan belum membaik hingga sekarang."
            </p>
          </div>
          
          <div className="flex gap-3 justify-end">
            <button
              type="button"
              onClick={() => setKeluhanBaru('')}
              className="btn-outline flex items-center"
              disabled={isSubmitting}
            >
              <RefreshCw size={16} className="mr-1" />
              Reset
            </button>
            
            <button
              type="submit"
              className="btn-warning flex items-center"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                  Mengirim...
                </>
              ) : (
                <>
                  <Send size={16} className="mr-1" />
                  Kirim Keluhan
                </>
              )}
            </button>
          </div>
        </form>
      </motion.div>
      
      {/* Riwayat Keluhan */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="card hover:shadow-lg"
      >
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-800">Riwayat Keluhan</h2>
            <p className="text-gray-600 text-sm mt-1">Keluhan yang telah kamu sampaikan sebelumnya</p>
          </div>
        </div>
        
        {dataKeluhan.length > 0 ? (
          <div className="space-y-4">
            {dataKeluhan.map((data) => (
              <div key={data.id} className="border border-gray-200 rounded-lg p-4">
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
                  <p className="text-gray-600">
                    <span className="font-medium">Keluhan:</span> {data.keluhan}
                  </p>
                  {data.tanggapanGuru && (
                    <div className="mt-4 bg-gray-50 p-3 rounded-lg">
                      <p className="text-gray-600">
                        <span className="font-medium">Tanggapan Guru:</span> {data.tanggapanGuru}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">Belum ada riwayat keluhan.</p>
            <p className="text-gray-500 text-sm mt-1">
              Gunakan form di atas untuk menyampaikan keluhan kesehatan.
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default SiswaKeluhan;