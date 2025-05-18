import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Home, Users, MessageCircle, FileText, User } from 'lucide-react';

import Layout from '../components/Layout';
import GuruDashboard from '../pages/guru/GuruDashboard';
import GuruDaftarSiswa from '../pages/guru/GuruDaftarSiswa';
import GuruKeluhan from '../pages/guru/GuruKeluhan';
import GuruLaporan from '../pages/guru/GuruLaporan';
import GuruProfil from '../pages/guru/GuruProfil';
import NotFoundPage from '../pages/NotFoundPage';

const navItems = [
  {
    path: '/guru/dashboard',
    label: 'Beranda',
    icon: <Home size={20} />,
  },
  {
    path: '/guru/daftar-siswa',
    label: 'Daftar Siswa',
    icon: <Users size={20} />,
  },
  {
    path: '/guru/keluhan',
    label: 'Keluhan',
    icon: <MessageCircle size={20} />,
  },
  {
    path: '/guru/laporan',
    label: 'Laporan',
    icon: <FileText size={20} />,
  },
  {
    path: '/guru/profil',
    label: 'Profil',
    icon: <User size={20} />,
  },
];

const GuruRoutes: React.FC = () => {
  return (
    <Layout navItems={navItems}>
      <Routes>
        <Route path="dashboard" element={<GuruDashboard />} />
        <Route path="daftar-siswa" element={<GuruDaftarSiswa />} />
        <Route path="keluhan" element={<GuruKeluhan />} />
        <Route path="laporan" element={<GuruLaporan />} />
        <Route path="profil" element={<GuruProfil />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Layout>
  );
};

export default GuruRoutes;