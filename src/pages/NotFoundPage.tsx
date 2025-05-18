import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, FrownIcon } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-primary-50 p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md text-center bg-white p-8 rounded-2xl shadow-lg"
      >
        <motion.div 
          animate={{ 
            rotate: [0, 5, -5, 0],
            y: [0, -5, 0]
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 2,
            repeatDelay: 1
          }}
          className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <FrownIcon size={48} className="text-primary-600" />
        </motion.div>
        
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Halaman Tidak Ditemukan</h1>
        <p className="text-gray-600 mb-8">
          Halaman yang kamu cari tidak tersedia. Silakan kembali ke halaman sebelumnya.
        </p>
        
        <Link 
          to="/"
          className="btn-primary inline-flex items-center gap-2"
        >
          <ArrowLeft size={18} />
          Kembali ke Halaman Utama
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;