import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import SiswaRoutes from './routes/SiswaRoutes';
import GuruRoutes from './routes/GuruRoutes';
import AdminRoutes from './routes/AdminRoutes';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen font-sans">
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<LoginPage />} />
            
            <Route 
              path="/siswa/*" 
              element={
                <ProtectedRoute requiredRole="siswa">
                  <SiswaRoutes />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/guru/*" 
              element={
                <ProtectedRoute requiredRole="guru">
                  <GuruRoutes />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/admin/*" 
              element={
                <ProtectedRoute requiredRole="admin">
                  <AdminRoutes />
                </ProtectedRoute>
              } 
            />
            
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
          
          <ToastContainer 
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;