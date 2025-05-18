import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Home, Activity, MessageCircle, User } from 'lucide-react';

import Layout from '../components/Layout';
import SiswaDashboard from '../pages/siswa/SiswaDashboard';
import SiswaInputKesehatan from '../pages/siswa/SiswaInputKesehatan';
import SiswaKeluhan from '../pages/siswa/SiswaKeluhan';
import SiswaProfil from '../pages/siswa/SiswaProfil';
import NotFoundPage from '../pages/NotFoundPage';

const navItems = [
  {
    path: '/siswa/dashboard',
    label: 'Beranda',
    icon: <Home size={20} />,
  },
  {
    path: '/siswa/input-kesehatan',
    label: 'Input Kesehatan',
    icon: <Activity size={20} />,
  },
  {
    path: '/siswa/keluhan',
    label: 'Keluhan',
    icon: <MessageCircle size={20} />,
  },
  {
    path: '/siswa/profil',
    label: 'Profil',
    icon: <User size={20} />,
  },
];

const SiswaRoutes: React.FC = () => {
  return (
    <Layout navItems={navItems}>
      <Routes>
        <Route path="dashboard" element={<SiswaDashboard />} />
        <Route path="input-kesehatan" element={<SiswaInputKesehatan />} />
        <Route path="keluhan" element={<SiswaKeluhan />} />
        <Route path="profil" element={<SiswaProfil />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Layout>
  );
};

export default SiswaRoutes;