import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Activity, Calendar, Save, RefreshCw } from 'lucide-react';
import { toast } from 'react-toastify';
import { useAuth } from '../../contexts/AuthContext';
import { getDataKesehatanBySiswaId, dataKesehatanList } from '../../data/kesehatanData';
import { DataKesehatan } from '../../types';
import { format } from 'date-fns';

const SiswaInputKesehatan: React.FC = () => {
  const { currentUser } = useAuth();
  const [dataKesehatan, setDataKesehatan] = useState<DataKesehatan[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  
  // State form
  const [suhuTubuh, setSuhuTubuh] = useState('36.8');
  const [beratBadan, setBeratBadan] = useState('35.0');
  const [tinggiBadan, setTinggiBadan] = useState('140.0');
  const [keluhan, setKeluhan] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  useEffect(() => {
    if (currentUser) {
      // Simulasi pengambilan data
      setTimeout(() => {
        const data = getDataKesehatanBySiswaId(currentUser.id);
        setDataKesehatan(data);
        setIsLoading(false);
        
        // Cek apakah sudah mengisi data hari ini
        const today = format(new Date(), 'yyyy-MM-dd');
        const todayEntry = data.find(item => item.tanggal === today);
        if (todayEntry) {
          // Jika sudah ada data hari ini, isi form dengan data tersebut
          setSuhuTubuh(todayEntry.suhuTubuh.toString());
          setBeratBadan(todayEntry.beratBadan.toString());
          setTinggiBadan(todayEntry.tinggiBadan.toString());
          setKeluhan(todayEntry.keluhan || '');
        }
      }, 1000);
    }
  }, [currentUser]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Validasi input
    if (!suhuTubuh || !beratBadan || !tinggiBadan) {
      toast.error('Semua kolom data kesehatan harus diisi');
      setIsSubmitting(false);
      return;
    }
    
    // Validasi nilai
    const suhuNum = parseFloat(suhuTubuh);
    const beratNum = parseFloat(beratBadan);
    const tinggiNum = parseFloat(tinggiBadan);
    
    if (suhuNum < 35 || suhuNum > 42) {
      toast.error('Suhu tubuh harus antara 35°C dan 42°C');
      setIsSubmitting(false);
      return;
    }
    
    if (beratNum < 20 || beratNum > 100) {
      toast.error('Berat badan harus antara 20kg dan 100kg');
      setIsSubmitting(false);
      return;
    }
    
    if (tinggiNum < 100 || tinggiNum > 200) {
      toast.error('Tinggi badan harus antara 100cm dan 200cm');
      setIsSubmitting(false);
      return;
    }
    
    // Simulasi pengiriman data
    setTimeout(() => {
      const today = format(new Date(), 'yyyy-MM-dd');
      const todayEntry = dataKesehatan.find(item => item.tanggal === today);
      
      // Buat atau update data
      if (todayEntry) {
        // Update data yang sudah ada
        const updatedData = dataKesehatan.map(item => {
          if (item.id === todayEntry.id) {
            return {
              ...item,
              suhuTubuh: suhuNum,
              beratBadan: beratNum,
              tinggiBadan: tinggiNum,
              keluhan,
              timestamp: new Date().toISOString()
            };
          }
          return item;
        });
        
        setDataKesehatan(updatedData);
        toast.success('Data kesehatan berhasil diperbarui');
      } else {
        // Buat data baru
        const newDataKesehatan: DataKesehatan = {
          id: Date.now().toString(),
          siswaId: currentUser?.id || '',
          namaSiswa: currentUser?.nama || '',
          kelas: currentUser?.kelas || '',
          tanggal: today,
          suhuTubuh: suhuNum,
          beratBadan: beratNum,
          tinggiBadan: tinggiNum,
          keluhan,
          status: 'belum_ditanggapi',
          timestamp: new Date().toISOString()
        };
        
        setDataKesehatan([newDataKesehatan, ...dataKesehatan]);
        toast.success('Data kesehatan berhasil disimpan');
      }
      
      setIsSubmitting(false);
      setShowForm(false);
    }, 1500);
  };
  
  const handleReset = () => {
    setSuhuTubuh('36.8');
    setBeratBadan('35.0');
    setTinggiBadan('140.0');
    setKeluhan('');
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
              <h1 className="text-2xl font-bold mb-2">Input Data Kesehatan</h1>
              <p className="opacity-90">Catat kesehatanmu hari ini untuk hidup lebih sehat</p>
            </div>
            <div className="mt-4 md:mt-0 flex items-center bg-white/20 rounded-lg px-3 py-2">
              <Calendar size={18} className="mr-2" />
              <span>{format(new Date(), 'EEEE, d MMMM yyyy')}</span>
            </div>
          </div>
        </div>
      </motion.div>
      
      {/* Form Input Kesehatan */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="card hover:shadow-lg"
      >
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-800">Data Kesehatan Hari Ini</h2>
            <p className="text-gray-600 text-sm mt-1">Isikan data kesehatanmu hari ini dengan jujur.</p>
          </div>
          <div className="bg-primary-100 p-3 rounded-full">
            <Activity size={24} className="text-primary-500" />
          </div>
        </div>
        
        {!showForm && (
          <div>
            {dataKesehatan.some(data => data.tanggal === format(new Date(), 'yyyy-MM-dd')) ? (
              <div>
                <div className="bg-secondary-100 text-secondary-700 px-3 py-1 rounded-full inline-flex items-center mb-4">
                  <Activity size={16} className="mr-1" />
                  Data telah terisi
                </div>
                
                {dataKesehatan
                  .filter(data => data.tanggal === format(new Date(), 'yyyy-MM-dd'))
                  .map((data) => (
                    <div key={data.id} className="border border-gray-200 rounded-lg p-4 mb-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <p className="text-sm text-gray-500">Suhu Tubuh</p>
                          <p className="text-lg font-semibold">{data.suhuTubuh}°C</p>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <p className="text-sm text-gray-500">Berat Badan</p>
                          <p className="text-lg font-semibold">{data.beratBadan} kg</p>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <p className="text-sm text-gray-500">Tinggi Badan</p>
                          <p className="text-lg font-semibold">{data.tinggiBadan} cm</p>
                        </div>
                      </div>
                      
                      {data.keluhan && (
                        <div className="mt-4">
                          <p className="text-sm text-gray-500 mb-1">Keluhan:</p>
                          <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">{data.keluhan}</p>
                        </div>
                      )}
                      
                      <div className="mt-6 text-right">
                        <button 
                          onClick={() => setShowForm(true)}
                          className="btn-outline"
                        >
                          Edit Data
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            ) : (
              <div className="text-center py-4">
                <div className="bg-warning-100 text-warning-700 px-3 py-1 rounded-full inline-flex items-center mb-4">
                  <Activity size={16} className="mr-1" />
                  Belum ada data
                </div>
                <p className="text-gray-600 mb-6">
                  Kamu belum mengisi data kesehatan hari ini.
                </p>
                <button 
                  onClick={() => setShowForm(true)}
                  className="btn-primary"
                >
                  Isi Data Sekarang
                </button>
              </div>
            )}
          </div>
        )}
        
        {showForm && (
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label htmlFor="suhuTubuh" className="block text-sm font-medium text-gray-600 mb-1">
                  Suhu Tubuh (°C)
                </label>
                <input
                  id="suhuTubuh"
                  type="number"
                  value={suhuTubuh}
                  onChange={(e) => setSuhuTubuh(e.target.value)}
                  className="input w-full"
                  step="0.1"
                  min="35"
                  max="42"
                  placeholder="36.8"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">Normal: 36.5°C - 37.5°C</p>
              </div>
              
              <div>
                <label htmlFor="beratBadan" className="block text-sm font-medium text-gray-600 mb-1">
                  Berat Badan (kg)
                </label>
                <input
                  id="beratBadan"
                  type="number"
                  value={beratBadan}
                  onChange={(e) => setBeratBadan(e.target.value)}
                  className="input w-full"
                  step="0.1"
                  min="20"
                  max="100"
                  placeholder="35.0"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="tinggiBadan" className="block text-sm font-medium text-gray-600 mb-1">
                  Tinggi Badan (cm)
                </label>
                <input
                  id="tinggiBadan"
                  type="number"
                  value={tinggiBadan}
                  onChange={(e) => setTinggiBadan(e.target.value)}
                  className="input w-full"
                  step="0.1"
                  min="100"
                  max="200"
                  placeholder="140.0"
                  required
                />
              </div>
            </div>
            
            <div className="mb-6">
              <label htmlFor="keluhan" className="block text-sm font-medium text-gray-600 mb-1">
                Keluhan Kesehatan (opsional)
              </label>
              <textarea
                id="keluhan"
                value={keluhan}
                onChange={(e) => setKeluhan(e.target.value)}
                className="input w-full h-24"
                placeholder="Jika ada keluhan kesehatan, tuliskan di sini..."
              ></textarea>
              <p className="text-xs text-gray-500 mt-1">
                Contoh: sakit kepala, batuk, pilek, dsb.
              </p>
            </div>
            
            <div className="flex gap-3 justify-end">
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
                    Menyimpan...
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
        )}
      </motion.div>
      
      {/* Riwayat Kesehatan */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="card hover:shadow-lg"
      >
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-800">Riwayat Kesehatan</h2>
            <p className="text-gray-600 text-sm mt-1">Catatan kesehatanmu beberapa hari terakhir.</p>
          </div>
        </div>
        
        {dataKesehatan.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tanggal
                  </th>
                  <th className="px-4 py-3.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Suhu Tubuh
                  </th>
                  <th className="px-4 py-3.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Berat Badan
                  </th>
                  <th className="px-4 py-3.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tinggi Badan
                  </th>
                  <th className="px-4 py-3.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Keluhan
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {dataKesehatan.map((data) => (
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
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
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
            <p className="text-gray-500">Belum ada riwayat kesehatan.</p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default SiswaInputKesehatan;