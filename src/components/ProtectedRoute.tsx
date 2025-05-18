import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole: 'siswa' | 'guru' | 'admin';
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requiredRole 
}) => {
  const { currentUser } = useAuth();

  if (!currentUser) {
    // Pengguna belum login, arahkan ke halaman login
    return <Navigate to="/login" replace />;
  }

  if (currentUser.role !== requiredRole) {
    // Pengguna tidak memiliki peran yang tepat, arahkan ke halaman login
    return <Navigate to="/login" replace />;
  }

  // Pengguna sudah login dan memiliki peran yang tepat
  return <>{children}</>;
};

export default ProtectedRoute;