import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Search, CheckCircle, Send, Filter } from 'lucide-react';
import { toast } from 'react-toastify';
import { useAuth } from '../../contexts/AuthContext';
import { getDataKesehatanByKelas, dataKesehatanList } from '../../data/kesehatanData';
import { DataKesehatan } from '../../types';

const GuruKeluhan: React.FC = () => {
  const { currentUser } = useAuth();
  const [dataKeluhan, setDataKeluhan] = useState<DataKesehatan[]>([]);
  const [filteredData, setFilteredData] = useState<DataKesehatan[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'semua' | 'belum_ditanggapi' | 'sudah_ditanggapi'>('semua');
  
  // State untuk tanggapan guru
  const [selectedKeluhan, setSelectedKeluhan] = useState<DataKesehatan | null>(null);
  const [tanggapan, setTanggapan] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  useEffect(() => {
    if (currentUser) {
      // Simulasi pengambilan data
      setTimeout(() => {
        const kelas = currentUser.kelas || '6A';
        const data = getDataKesehatanByKelas(kelas).filter(item => item.keluhan && item.keluhan.length > 0);
        setDataKeluhan(data);
        setFilteredData(data);
        setIsLoading(false);
      }, 1000);
    }
  }, [currentUser]);
  
  useEffect(() => {
    // Filter dan pencarian data
    let filtered = dataKeluhan;
    
    // Filter berdasarkan status
    if (filterStatus !== 'semua') {
      filtered = filtered.filter(item => item.status === filterStatus);
    }
    
    // Filter berdasarkan kata kunci pencarian
    if (searchTerm) {
      const lowerCaseSearch = searchTerm.toLowerCase();
      filtered = filtered.filter(item => 
        item.namaSiswa.toLowerCase().includes(lowerCaseSearch) ||
        item.keluhan.toLowerCase().includes(lowerCaseSearch)
      );
    }
    
    setFilteredData(filtered);
  }, [searchTerm, filterStatus, dataKeluhan]);
  
  const handleTanggapi = (keluhan: DataKesehatan) => {
    setSelectedKeluhan(keluhan);
    setTanggapan(keluhan.tanggapanGuru || '');
  };
  
  const handleSubmitTanggapan = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedKeluhan) return;
    
    setIsSubmitting(true);
    
    // Validasi input
    if (!tanggapan.trim()) {
      toast.error('Tanggapan tidak boleh kosong');
      setIsSubmitting(false);
      return;
    }
    
    // Simulasi pengiriman data
    setTimeout(() => {
      // Update data keluhan
      const updatedData = dataKeluhan.map(item => {
        if (item.id === selectedKeluhan.id) {
          return {
            ...item,
            tanggapanGuru: tanggapan,
            status: 'sudah_ditanggapi'
          };
        }
        return item;
      });
      
      setDataKeluhan(updatedData);
      setFilteredData(updatedData);
      setSelectedKeluhan(null);
      setTanggapan('');
      setIsSubmitting(false);
      toast.success('Tanggapan berhasil dikirim');
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
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold mb-2">Keluhan Siswa</h1>
              <p className="opacity-90">Pantau dan tanggapi keluhan kesehatan siswa kelas {currentUser?.kelas}</p>
            </div>
            <div className="bg-white/20 p-3 rounded-full hidden md:block">
              <MessageCircle size={30} className="text-white" />
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
              placeholder="Cari nama siswa atau keluhan..."
              className="input pl-10 w-full"
            />
          </div>
          
          <div className="flex gap-2 items-center">
            <Filter size={18} className="text-gray-500" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
              className="input py-2"
            >
              <option value="semua">Semua Status</option>
              <option value="belum_ditanggapi">Belum Ditanggapi</option>
              <option value="sudah_ditanggapi">Sudah Ditanggapi</option>
            </select>
          </div>
        </div>
      </motion.div>
      
      {/* Daftar Keluhan */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="space-y-6"
      >
        {filteredData.length > 0 ? (
          filteredData.map((keluhan) => (
            <div 
              key={keluhan.id} 
              className="card hover:shadow-lg border-l-4 border-l-warning-500"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{keluhan.namaSiswa}</h3>
                  <p className="text-sm text-gray-500">
                    Tanggal: {keluhan.tanggal} | Suhu: {keluhan.suhuTubuh}°C
                  </p>
                </div>
                <span 
                  className={`px-2 py-1 text-xs rounded-full ${
                    keluhan.status === 'sudah_ditanggapi' 
                      ? 'bg-secondary-100 text-secondary-700' 
                      : 'bg-warning-100 text-warning-700'
                  }`}
                >
                  {keluhan.status === 'sudah_ditanggapi' ? 'Sudah ditanggapi' : 'Belum ditanggapi'}
                </span>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <p className="text-gray-800">{keluhan.keluhan}</p>
              </div>
              
              {keluhan.tanggapanGuru && (
                <div className="bg-secondary-50 p-4 rounded-lg mb-4 border-l-4 border-l-secondary-500">
                  <p className="text-sm font-medium text-gray-600 mb-1">Tanggapan Guru:</p>
                  <p className="text-gray-800">{keluhan.tanggapanGuru}</p>
                </div>
              )}
              
              <div className="flex justify-end">
                <button
                  onClick={() => handleTanggapi(keluhan)}
                  className={`${
                    keluhan.status === 'sudah_ditanggapi' 
                      ? 'btn-outline' 
                      : 'btn-warning'
                  } flex items-center`}
                >
                  {keluhan.status === 'sudah_ditanggapi' ? (
                    <>
                      <CheckCircle size={16} className="mr-1" />
                      Edit Tanggapan
                    </>
                  ) : (
                    <>
                      <MessageCircle size={16} className="mr-1" />
                      Tanggapi
                    </>
                  )}
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="card hover:shadow-lg text-center py-8">
            <MessageCircle size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-600">
              {searchTerm || filterStatus !== 'semua'
                ? 'Tidak ada keluhan yang sesuai dengan filter atau pencarian'
                : 'Belum ada keluhan dari siswa'}
            </p>
          </div>
        )}
      </motion.div>
      
      {/* Modal Tanggapan */}
      {selectedKeluhan && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-auto"
          >
            <div className="p-6 border-b">
              <h2 className="text-xl font-semibold text-gray-800">
                Tanggapan untuk {selectedKeluhan.namaSiswa}
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Tanggal: {selectedKeluhan.tanggal}
              </p>
            </div>
            
            <div className="p-6">
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-600 mb-2">Keluhan Siswa:</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-800">{selectedKeluhan.keluhan}</p>
                </div>
              </div>
              
              <form onSubmit={handleSubmitTanggapan}>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-600 mb-2">
                    Tanggapan Anda:
                  </label>
                  <textarea
                    value={tanggapan}
                    onChange={(e) => setTanggapan(e.target.value)}
                    className="input w-full h-32"
                    placeholder="Tuliskan tanggapan atau saran untuk siswa..."
                    required
                  ></textarea>
                </div>
                
                <div className="flex gap-3 justify-end">
                  <button
                    type="button"
                    onClick={() => setSelectedKeluhan(null)}
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
                        Mengirim...
                      </>
                    ) : (
                      <>
                        <Send size={16} className="mr-1" />
                        Kirim Tanggapan
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default GuruKeluhan;