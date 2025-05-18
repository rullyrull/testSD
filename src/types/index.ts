// Tipe data untuk User
export interface User {
  id: string;
  nama: string;
  username: string;
  password: string;
  role: 'siswa' | 'guru' | 'admin';
  kelas?: string;
  nis?: string;
  nip?: string;
}

// Tipe data untuk konteks autentikasi
export interface AuthContextType {
  currentUser: User | null;
  login: (username: string, password: string) => Promise<User>;
  logout: () => void;
}

// Tipe data untuk Data Kesehatan Siswa
export interface DataKesehatan {
  id: string;
  siswaId: string;
  namaSiswa: string;
  kelas: string;
  tanggal: string;
  suhuTubuh: number;
  beratBadan: number;
  tinggiBadan: number;
  keluhan: string;
  tanggapanGuru?: string;
  status: 'belum_ditanggapi' | 'sudah_ditanggapi';
  timestamp: string;
}

// Tipe data untuk laporan kesehatan
export interface LaporanKesehatan {
  id: string;
  bulan: string;
  tahun: number;
  kelas: string;
  jumlahSiswa: number;
  jumlahKeluhan: number;
  persentaseKehadiran: number;
  masalahUmum: string[];
}

// Tipe data untuk siswa
export interface Siswa {
  id: string;
  nama: string;
  nis: string;
  kelas: string;
  jenisKelamin: 'L' | 'P';
  tanggalLahir: string;
  alamat: string;
  namaOrangTua: string;
  teleponOrangTua: string;
  username: string;
  role: 'siswa';
}

// Tipe data untuk guru
export interface Guru {
  id: string;
  nama: string;
  nip: string;
  kelas: string;
  jenisKelamin: 'L' | 'P';
  telepon: string;
  alamat: string;
  username: string;
  role: 'guru';
}

// Tipe data untuk admin
export interface Admin {
  id: string;
  nama: string;
  username: string;
  role: 'admin';
}

// Tipe data untuk notifikasi
export interface Notifikasi {
  id: string;
  userId: string;
  judul: string;
  pesan: string;
  dibaca: boolean;
  tanggal: string;
  tipe: 'keluhan' | 'info' | 'pengumuman';
}