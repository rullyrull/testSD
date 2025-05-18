import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Home, Users, FileText, Settings, UserPlus } from 'lucide-react';

import Layout from '../components/Layout';
import AdminDashboard from '../pages/admin/AdminDashboard';
import AdminKelolaPengguna from '../pages/admin/AdminKelolaPengguna';
import AdminTambahPengguna from '../pages/admin/AdminTambahPengguna';
import AdminLaporan from '../pages/admin/AdminLaporan';
import AdminPengaturan from '../pages/admin/AdminPengaturan';
import NotFoundPage from '../pages/NotFoundPage';

const navItems = [
  {
    path: '/admin/dashboard',
    label: 'Beranda',
    icon: <Home size={20} />,
  },
  {
    path: '/admin/kelola-pengguna',
    label: 'Kelola Pengguna',
    icon: <Users size={20} />,
  },
  {
    path: '/admin/tambah-pengguna',
    label: 'Tambah Pengguna',
    icon: <UserPlus size={20} />,
  },
  {
    path: '/admin/laporan',
    label: 'Laporan',
    icon: <FileText size={20} />,
  },
  {
    path: '/admin/pengaturan',
    label: 'Pengaturan',
    icon: <Settings size={20} />,
  },
];

const AdminRoutes: React.FC = () => {
  return (
    <Layout navItems={navItems}>
      <Routes>
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="kelola-pengguna" element={<AdminKelolaPengguna />} />
        <Route path="tambah-pengguna" element={<AdminTambahPengguna />} />
        <Route path="laporan" element={<AdminLaporan />} />
        <Route path="pengaturan" element={<AdminPengaturan />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Layout>
  );
};

export default AdminRoutes;