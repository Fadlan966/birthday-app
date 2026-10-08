// Ubah teks di sini
export const config = {
  name: 'Sayang',
  age: 19,
  message:
    'Terima kasih sudah menjadi bagian dari setiap cerita indah. Semoga hari ini dan seterusnya penuh bahagia!',
}

// File foto/video ada di folder: public/media/
// Untuk video, `poster` adalah gambar sampulnya.
export const moments = [
  { type: 'image', src: '/media/foto1.jpeg', caption: 'Bersama di perjalanan' },
  { type: 'video', src: '/media/video1.mp4', poster: '/media/video1.jpg', caption: 'Menyusuri perjalanan' },
  { type: 'image', src: '/media/foto2.jpeg', caption: 'Berkunjung ke museum' },
  { type: 'image', src: '/media/foto3.jpeg', caption: 'Berpose di depan gedung bersejarah' },
  { type: 'video', src: '/media/video2.mp4', poster: '/media/video2.jpg', caption: 'Malam yang seru' },
  { type: 'image', src: '/media/foto4.jpeg', caption: 'Bertemu kucing menggemaskan' },
  { type: 'image', src: '/media/foto5.jpeg', caption: 'Kucing yang manis' },
  { type: 'video', src: '/media/video3.mp4', poster: '/media/video3.jpg', caption: 'Bermain dengan si kucing' },
]
