import React, { createContext, useState, useContext, useEffect } from 'react';
import { User, AuthContextType } from '../types';

// Buat context untuk authentication
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component untuk authentication
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Cek jika user sudah login berdasarkan data dari localStorage
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Fungsi login
  const login = (username: string, password: string): Promise<User> => {
    return new Promise((resolve, reject) => {
      // Simulasi panggilan API login
      // Dalam implementasi nyata, ini akan menjadi panggilan API ke backend
      setTimeout(() => {
        // Data contoh user, dalam implementasi nyata akan berasal dari API
        const users = [
          { id: '1', nama: 'Budi Santoso', username: 'siswa', password: 'siswa123', role: 'siswa', kelas: '6A', nis: '12345' },
          { id: '2', nama: 'Ibu Dewi', username: 'guru', password: 'guru123', role: 'guru', kelas: '6A', nip: '98765' },
          { id: '3', nama: 'Pak Agus', username: 'admin', password: 'admin123', role: 'admin' },
        ];

        const user = users.find(u => u.username === username && u.password === password);
        
        if (user) {
          // Simpan user di state
          setCurrentUser(user);
          // Simpan user di localStorage untuk persistensi
          localStorage.setItem('currentUser', JSON.stringify(user));
          resolve(user);
        } else {
          reject(new Error('Username atau password salah'));
        }
      }, 1000);
    });
  };

  // Fungsi logout
  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
  };

  const value = {
    currentUser,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// Hook untuk menggunakan AuthContext
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth harus digunakan dalam AuthProvider');
  }
  return context;
};