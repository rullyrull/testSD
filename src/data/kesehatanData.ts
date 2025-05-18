import { DataKesehatan, Siswa, Guru, Admin, Notifikasi, LaporanKesehatan } from '../types';

// Data siswa contoh
export const siswaData: Siswa[] = [
  {
    id: '1',
    nama: 'Budi Santoso',
    nis: '12345',
    kelas: '6A',
    jenisKelamin: 'L',
    tanggalLahir: '2013-05-10',
    alamat: 'Jl. Melati No. 123, Jakarta',
    namaOrangTua: 'Agus Santoso',
    teleponOrangTua: '081234567890',
    username: 'siswa',
    role: 'siswa'
  },
  {
    id: '2',
    nama: 'Siti Nuraini',
    nis: '12346',
    kelas: '6A',
    jenisKelamin: 'P',
    tanggalLahir: '2013-07-15',
    alamat: 'Jl. Kenanga No. 45, Jakarta',
    namaOrangTua: 'Budi Nuraini',
    teleponOrangTua: '081234567891',
    username: 'siti',
    role: 'siswa'
  },
  {
    id: '3',
    nama: 'Doni Pratama',
    nis: '12347',
    kelas: '6B',
    jenisKelamin: 'L',
    tanggalLahir: '2013-03-20',
    alamat: 'Jl. Anggrek No. 78, Jakarta',
    namaOrangTua: 'Joko Pratama',
    teleponOrangTua: '081234567892',
    username: 'doni',
    role: 'siswa'
  },
  {
    id: '4',
    nama: 'Rina Fitriani',
    nis: '12348',
    kelas: '6B',
    jenisKelamin: 'P',
    tanggalLahir: '2013-11-05',
    alamat: 'Jl. Dahlia No. 90, Jakarta',
    namaOrangTua: 'Hendra Fitriani',
    teleponOrangTua: '081234567893',
    username: 'rina',
    role: 'siswa'
  }
];

// Data guru contoh
export const guruData: Guru[] = [
  {
    id: '1',
    nama: 'Ibu Dewi',
    nip: '98765',
    kelas: '6A',
    jenisKelamin: 'P',
    telepon: '087654321098',
    alamat: 'Jl. Cendana No. 45, Jakarta',
    username: 'guru',
    role: 'guru'
  },
  {
    id: '2',
    nama: 'Pak Hendra',
    nip: '98766',
    kelas: '6B',
    jenisKelamin: 'L',
    telepon: '087654321099',
    alamat: 'Jl. Beringin No. 32, Jakarta',
    username: 'hendra',
    role: 'guru'
  }
];

// Data admin contoh
export const adminData: Admin[] = [
  {
    id: '1',
    nama: 'Pak Agus',
    username: 'admin',
    role: 'admin'
  }
];

// Data kesehatan contoh
export const dataKesehatanList: DataKesehatan[] = [
  {
    id: '1',
    siswaId: '1',
    namaSiswa: 'Budi Santoso',
    kelas: '6A',
    tanggal: '2025-06-10',
    suhuTubuh: 36.8,
    beratBadan: 35.5,
    tinggiBadan: 145.0,
    keluhan: 'Saya merasa pusing dan batuk ringan sejak kemarin.',
    tanggapanGuru: 'Sebaiknya istirahat yang cukup dan banyak minum air putih. Jika berlanjut, perlu diperiksa ke dokter.',
    status: 'sudah_ditanggapi',
    timestamp: '2025-06-10T08:30:00Z'
  },
  {
    id: '2',
    siswaId: '1',
    namaSiswa: 'Budi Santoso',
    kelas: '6A',
    tanggal: '2025-06-09',
    suhuTubuh: 37.2,
    beratBadan: 35.5,
    tinggiBadan: 145.0,
    keluhan: 'Saya mulai merasa tidak enak badan.',
    tanggapanGuru: 'Perhatikan suhu tubuh, mungkin sedang tidak enak badan. Istirahat yang cukup.',
    status: 'sudah_ditanggapi',
    timestamp: '2025-06-09T08:45:00Z'
  },
  {
    id: '3',
    siswaId: '2',
    namaSiswa: 'Siti Nuraini',
    kelas: '6A',
    tanggal: '2025-06-10',
    suhuTubuh: 36.5,
    beratBadan: 32.0,
    tinggiBadan: 140.0,
    keluhan: 'Tidak ada keluhan, kondisi baik.',
    status: 'belum_ditanggapi',
    timestamp: '2025-06-10T08:50:00Z'
  },
  {
    id: '4',
    siswaId: '3',
    namaSiswa: 'Doni Pratama',
    kelas: '6B',
    tanggal: '2025-06-10',
    suhuTubuh: 36.7,
    beratBadan: 36.0,
    tinggiBadan: 148.0,
    keluhan: 'Saya mengalami sakit perut ringan sejak tadi pagi.',
    status: 'belum_ditanggapi',
    timestamp: '2025-06-10T08:15:00Z'
  }
];

// Data notifikasi contoh
export const notifikasiData: Notifikasi[] = [
  {
    id: '1',
    userId: '1', // ID Guru
    judul: 'Keluhan Baru',
    pesan: 'Budi Santoso melaporkan keluhan kesehatan baru',
    dibaca: false,
    tanggal: '2025-06-10T08:35:00Z',
    tipe: 'keluhan'
  },
  {
    id: '2',
    userId: '1', // ID Guru
    judul: 'Keluhan Baru',
    pesan: 'Siti Nuraini melaporkan keluhan kesehatan baru',
    dibaca: true,
    tanggal: '2025-06-10T08:55:00Z',
    tipe: 'keluhan'
  },
  {
    id: '3',
    userId: '2', // ID Siswa
    judul: 'Tanggapan Guru',
    pesan: 'Ibu Dewi telah menanggapi keluhan kesehatan Anda',
    dibaca: false,
    tanggal: '2025-06-10T10:15:00Z',
    tipe: 'info'
  }
];

// Data laporan kesehatan contoh
export const laporanKesehatanData: LaporanKesehatan[] = [
  {
    id: '1',
    bulan: 'Mei',
    tahun: 2025,
    kelas: '6A',
    jumlahSiswa: 30,
    jumlahKeluhan: 12,
    persentaseKehadiran: 95,
    masalahUmum: ['Pilek', 'Batuk', 'Demam']
  },
  {
    id: '2',
    bulan: 'Juni',
    tahun: 2025,
    kelas: '6A',
    jumlahSiswa: 30,
    jumlahKeluhan: 8,
    persentaseKehadiran: 97,
    masalahUmum: ['Pilek', 'Sakit perut']
  },
  {
    id: '3',
    bulan: 'Mei',
    tahun: 2025,
    kelas: '6B',
    jumlahSiswa: 28,
    jumlahKeluhan: 10,
    persentaseKehadiran: 94,
    masalahUmum: ['Batuk', 'Pusing', 'Alergi']
  }
];

// Helper function untuk mengambil data kesehatan siswa berdasarkan ID siswa
export const getDataKesehatanBySiswaId = (siswaId: string): DataKesehatan[] => {
  return dataKesehatanList.filter(data => data.siswaId === siswaId);
};

// Helper function untuk mengambil data kesehatan berdasarkan kelas
export const getDataKesehatanByKelas = (kelas: string): DataKesehatan[] => {
  return dataKesehatanList.filter(data => data.kelas === kelas);
};

// Helper function untuk mengambil daftar siswa berdasarkan kelas
export const getSiswaByKelas = (kelas: string): Siswa[] => {
  return siswaData.filter(siswa => siswa.kelas === kelas);
};

// Helper function untuk mendapatkan semua siswa
export const getAllSiswa = (): Siswa[] => {
  return siswaData;
};

// Helper function untuk mendapatkan semua guru
export const getAllGuru = (): Guru[] => {
  return guruData;
};