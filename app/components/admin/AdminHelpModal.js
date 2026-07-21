"use client";

import { useState } from 'react';
import Image from 'next/image';

export default function AdminHelpModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('dashboard');

  if (!isOpen) return null;

  const tabs = [
    { id: 'dashboard', label: '1. Pengenalan Dashboard' },
    { id: 'pages', label: '2. Manajemen Halaman (Pages)' },
    { id: 'posts', label: '3. Manajemen Berita (Posts)' },
    { id: 'media', label: '4. Cara Upload Gambar' },
    { id: 'users', label: '5. Manajemen Admin & Setting' }
  ];

  return (
    <div className="adm-help-modal-overlay" onClick={onClose}>
      <div className="adm-help-modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="adm-help-modal-header">
          <div>
            <h2>📚 Tutorial Lengkap Penggunaan Admin Panel</h2>
            <p style={{ margin: "4px 0 0 0", fontSize: "14px", color: "#64748b" }}>
              Panduan step-by-step mengelola konten website Albahjah
            </p>
          </div>
          <button onClick={onClose} className="adm-help-close-btn" title="Tutup Panduan">&times;</button>
        </div>

        <div className="adm-help-modal-body">
          <div className="adm-help-sidebar">
            <ul>
              {tabs.map((tab) => (
                <li 
                  key={tab.id} 
                  className={activeTab === tab.id ? 'active' : ''}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.label}
                </li>
              ))}
            </ul>
          </div>

          <div className="adm-help-content">
            {activeTab === 'dashboard' && (
              <div className="adm-help-tab-content">
                <h3>1. Pengenalan Dashboard</h3>
                <p>Selamat datang di Admin Panel Albahjah! Ini adalah halaman utama tempat Anda bisa melihat ringkasan singkat statistik website Anda.</p>
                
                <img src="/guide/screenshot-dashboard.jpg" alt="Dashboard" className="adm-guide-img" onError={(e) => { e.target.style.display = 'none'; }} />
                
                <div style={{ background: "#f8fafc", padding: "16px", borderRadius: "8px", border: "1px solid #e2e8f0" }}>
                  <h4>Fungsi Menu di Sebelah Kiri (Sidebar):</h4>
                  <ul>
                    <li><strong>📊 Dashboard:</strong> Melihat jumlah total halaman, berita, dan file media yang ada di web.</li>
                    <li><strong>📄 Halaman (Pages):</strong> Mengatur halaman utama yang statis (contoh: Profil, Kontak, Info Pendaftaran).</li>
                    <li><strong>📰 Berita (Posts):</strong> Mengatur artikel atau pengumuman yang terus bertambah dari waktu ke waktu.</li>
                    <li><strong>🖼️ Media Library:</strong> Tempat Anda WAJIB mengunggah (upload) gambar sebelum memasukkannya ke artikel/halaman.</li>
                    <li><strong>⚙️ Pengaturan Website:</strong> (Hanya untuk Super Admin) Mengubah nama web, logo, dan teks footer.</li>
                    <li><strong>👥 Manajemen Admin:</strong> (Hanya untuk Super Admin) Menambah atau menghapus akun admin lain.</li>
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'pages' && (
              <div className="adm-help-tab-content">
                <h3>2. Cara Membuat & Memodifikasi Halaman</h3>
                <p>Halaman (Pages) digunakan untuk konten yang tidak sering berubah, seperti halaman <strong>Visi Misi, Sejarah, atau Info Pendaftaran</strong>.</p>
                
                <img src="/guide/screenshot-pages.jpg" alt="Daftar Halaman" className="adm-guide-img" onError={(e) => { e.target.style.display = 'none'; }} />
                
                <div style={{ background: "#eff6ff", padding: "16px", borderRadius: "8px", border: "1px solid #bfdbfe", marginBottom: "20px" }}>
                  <h4 style={{ marginTop: 0, color: "#1e3a8a" }}>Langkah-langkah Membuat Halaman Baru:</h4>
                  <ol style={{ color: "#1e40af" }}>
                    <li>Klik menu <strong>Halaman</strong> di sidebar kiri.</li>
                    <li>Klik tombol biru <strong>+ Buat Halaman Baru</strong> di pojok kanan atas.</li>
                    <li>Isi <strong>Judul Halaman</strong> (misal: "Sejarah Yayasan"). URL Slug akan otomatis terbuat (misal: sejarah-yayasan).</li>
                    <li>Pilih <strong>Layout Desain</strong> yang diinginkan:
                      <ul style={{ marginTop: "8px" }}>
                        <li><em>Standard:</em> Tampilan bersih dengan header judul minimalis berwarna hijau. Sangat cocok untuk halaman informasi teks.</li>
                        <li><em>Hero Image:</em> Menampilkan gambar banner besar di bagian atas halaman. Jika memilih ini, Anda wajib memasukkan <strong>URL Gambar Hero</strong> (lihat tab "Cara Upload Gambar").</li>
                      </ul>
                    </li>
                  </ol>
                </div>

                <img src="/guide/screenshot-page-create.jpg" alt="Buat Halaman" className="adm-guide-img" onError={(e) => { e.target.style.display = 'none'; }} />

                <h4>Visual Editor vs Developer Mode</h4>
                <p>Di bagian bawah form halaman, Anda akan melihat editor teks (Visual Editor). Cara penggunaannya persis seperti Microsoft Word (Bisa <strong>Bold</strong>, <em>Italic</em>, membuat daftar/bullet, dll).</p>
                
                <p style={{ background: "#fef2f2", padding: "12px", borderRadius: "6px", borderLeft: "4px solid #ef4444" }}>
                  <strong>Mode Developer ⚡:</strong> Di pojok kanan atas form, terdapat toggle (tombol geser). Jika Anda adalah seorang Web Developer dan ingin mendesain halaman menggunakan kode <strong>HTML & CSS murni</strong>, Anda bisa menyalakan fitur ini. Namun, peringatan: kode HTML khusus akan menimpa (menggantikan) apa pun yang Anda tulis di Visual Editor awam!
                </p>
              </div>
            )}

            {activeTab === 'posts' && (
              <div className="adm-help-tab-content">
                <h3>3. Cara Menulis Berita & Artikel</h3>
                <p>Gunakan menu <strong>Berita</strong> untuk mengelola konten dinamis seperti artikel kajian, berita harian, pengumuman, atau artikel blog.</p>
                
                <img src="/guide/screenshot-posts.jpg" alt="Daftar Berita" className="adm-guide-img" onError={(e) => { e.target.style.display = 'none'; }} />
                
                <h4>Langkah-langkah Menulis Berita Baru:</h4>
                <ol>
                  <li>Buka menu <strong>Berita</strong> di sidebar kiri, lalu klik <strong>+ Tulis Berita Baru</strong>.</li>
                  <li>Masukkan <strong>Judul Berita</strong> (misal: "Penerimaan Santri Baru 2026"). Slug URL akan dibuat otomatis.</li>
                  <li>Di kolom <strong>URL Gambar Thumbnail</strong>, paste (tempelkan) URL gambar yang akan menjadi gambar sampul artikel Anda. Pastikan gambar sudah diupload ke Media Library terlebih dahulu! (Cara upload dijelaskan di Tab 4).</li>
                  <li>Tulis isi artikel Anda dengan lengkap di kotak <strong>Visual Editor</strong>.</li>
                </ol>

                <img src="/guide/screenshot-post-create.jpg" alt="Buat Berita" className="adm-guide-img" onError={(e) => { e.target.style.display = 'none'; }} />
                
                <div style={{ background: "#f0fdf4", padding: "16px", borderRadius: "8px", border: "1px solid #bbf7d0", marginTop: "20px" }}>
                  <h4 style={{ marginTop: 0, color: "#166534" }}>Tips Menambahkan Gambar di Tengah Teks:</h4>
                  <p style={{ color: "#15803d", marginBottom: 0 }}>
                    Jika Anda ingin menyisipkan foto/gambar di tengah-tengah paragraf berita Anda: <br/>
                    1. Klik ikon <strong>Picture/Gambar</strong> pada deretan menu di atas Visual Editor.<br/>
                    2. Akan muncul kotak kecil (prompt) yang meminta URL gambar.<br/>
                    3. Paste (tempel) URL gambar dari Media Library Anda ke sana, lalu simpan.
                  </p>
                </div>

                <p style={{ marginTop: "20px" }}>
                  <strong>Penting:</strong> Di bagian paling bawah, terdapat kotak centang (checkbox) <em>Publikasikan Segera</em>. 
                  Jika dicentang, berita akan langsung bisa dibaca publik. Jika tidak dicentang, berita akan tersimpan sebagai <strong>Draft</strong>.
                </p>
              </div>
            )}

            {activeTab === 'media' && (
              <div className="adm-help-tab-content">
                <h3>4. Cara Upload Gambar yang BENAR!</h3>
                
                <div style={{ background: "#fffbeb", padding: "16px", borderRadius: "8px", border: "1px solid #fde68a", marginBottom: "20px" }}>
                  <h4 style={{ marginTop: 0, color: "#92400e" }}>⚠️ PERHATIAN SANGAT PENTING ⚠️</h4>
                  <p style={{ color: "#92400e", marginBottom: 0 }}>
                    <strong>DILARANG KERAS</strong> melakukan <em>Copy-Paste</em> file gambar secara langsung dari komputer Anda ke dalam Visual Editor teks! Hal ini akan menyebabkan database jebol dan website menjadi sangat lambat karena gambar disandikan menjadi teks panjang (base64).
                  </p>
                </div>

                <p>Anda diwajibkan untuk selalu menggunakan <strong>Media Library</strong> untuk mengelola foto. Sistem ini terhubung dengan <em>Cloudinary</em>, yang memastikan gambar Anda dioptimasi dan dimuat dengan sangat cepat di website.</p>

                <img src="/guide/screenshot-media.jpg" alt="Media Library" className="adm-guide-img" onError={(e) => { e.target.style.display = 'none'; }} />
                
                <h4>Langkah Step-by-Step Upload Gambar:</h4>
                <ol>
                  <li>Buka menu <strong>Media Library</strong> di sidebar sebelah kiri.</li>
                  <li>Di bagian atas, Anda akan melihat area kotak dengan garis putus-putus. Klik area tersebut untuk memilih file gambar dari laptop/HP Anda, <strong>ATAU</strong> Anda bisa langsung menarik (drag and drop) file foto ke area tersebut.</li>
                  <li>Tunggu beberapa detik. Akan muncul tulisan "Sedang mengunggah..." dan bar hijau. Biarkan hingga proses selesai 100% dan muncul notifikasi sukses.</li>
                  <li>Gambar yang baru saja diupload akan muncul di daftar galeri di bawahnya.</li>
                  <li>Lihat di bawah foto tersebut, terdapat tulisan URL biru yang panjang (contoh: <code>https://res.cloudinary.com/....jpg</code>) dan tombol <strong>Copy URL</strong>.</li>
                  <li>Klik tombol <strong>Copy URL</strong> tersebut. Notifikasi "URL tersalin!" akan muncul.</li>
                </ol>

                <h4>Di mana Saya Mem-paste URL Gambar Tersebut?</h4>
                <p>Setelah Anda meng-copy URL dari Media Library, Anda bisa menempelkannya (paste) ke tempat-tempat ini:</p>
                <ul>
                  <li><strong>Thumbnail Berita:</strong> Paste di kolom "URL Gambar Thumbnail" saat membuat Berita.</li>
                  <li><strong>Banner Halaman:</strong> Paste di kolom "URL Gambar Hero" saat membuat Halaman dengan layout Hero Image.</li>
                  <li><strong>Di dalam Artikel Teks:</strong> Paste pada kotak dialog (prompt) yang muncul saat Anda menekan tombol ikon Gambar di Visual Editor.</li>
                  <li><strong>Pengaturan Logo Web:</strong> Paste di pengaturan Logo saat mengganti logo web.</li>
                </ul>
              </div>
            )}

            {activeTab === 'users' && (
              <div className="adm-help-tab-content">
                <h3>5. Manajemen Admin & Setting (Super Admin)</h3>
                <p>Tab ini khusus untuk pemilik akun dengan peran <strong>SUPER ADMIN</strong>.</p>
                
                <h4>Pengaturan Website (Settings)</h4>
                <ul>
                  <li>Di menu ini, Anda bisa mengubah <strong>Nama Website</strong>, deskripsi global (untuk SEO), URL Logo, dan Nomor WhatsApp kontak utama.</li>
                  <li>Anda juga bisa mengedit <strong>Teks Footer</strong> (hak cipta) dan Link Sosial Media.</li>
                  <li>Untuk mengganti logo, Anda harus mengupload logo baru ke Media Library terlebih dahulu, lalu copy URL-nya dan paste ke kolom Logo di Pengaturan ini.</li>
                </ul>

                <h4>Manajemen Admin (Users)</h4>
                <ul>
                  <li>Di menu Users, Anda bisa melihat siapa saja yang memiliki akses login ke Panel Admin ini.</li>
                  <li>Anda bisa <strong>menambahkan Admin baru</strong> dengan mengisi form pendaftaran (Nama, Email, dan Password).</li>
                  <li>Ada dua level peran (Role):
                    <ol>
                      <li><strong>ADMIN:</strong> Bisa menambah/mengedit Halaman, Berita, dan Upload Media. Tidak bisa menghapus admin lain.</li>
                      <li><strong>SUPER ADMIN:</strong> Memiliki akses tak terbatas, termasuk menghapus dan mengelola admin lain, serta mengganti pengaturan inti website.</li>
                    </ol>
                  </li>
                  <li>Untuk menghapus admin yang sudah tidak bekerja, klik tombol tong sampah merah di sebelah nama admin tersebut (Super Admin tidak bisa menghapus dirinya sendiri).</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
