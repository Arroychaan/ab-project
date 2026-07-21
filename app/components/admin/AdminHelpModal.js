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
    { id: 'editor', label: '4. Panduan Visual Editor' },
    { id: 'media', label: '5. Panduan Lengkap Media & Upload' },
    { id: 'users', label: '6. Manajemen Admin & Setting' },
    { id: 'faq', label: '7. Tanya Jawab (FAQ)' }
  ];

  return (
    <div className="adm-help-modal-overlay" onClick={onClose}>
      <div className="adm-help-modal-container" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '1000px', height: '90vh' }}>
        <div className="adm-help-modal-header" style={{ background: 'linear-gradient(90deg, #166534 0%, #15803d 100%)', color: 'white' }}>
          <div>
            <h2 style={{ color: 'white' }}>📚 Buku Panduan Utama & Lengkap Admin Panel</h2>
            <p style={{ margin: "4px 0 0 0", fontSize: "14px", color: "#dcfce7" }}>
              Dokumentasi komprehensif, langkah demi langkah, untuk mengelola sistem informasi Albahjah.
            </p>
          </div>
          <button onClick={onClose} className="adm-help-close-btn" style={{ color: 'white' }} title="Tutup Panduan">&times;</button>
        </div>

        <div className="adm-help-modal-body">
          <div className="adm-help-sidebar" style={{ width: '260px' }}>
            <ul>
              {tabs.map((tab) => (
                <li 
                  key={tab.id} 
                  className={activeTab === tab.id ? 'active' : ''}
                  onClick={() => setActiveTab(tab.id)}
                  style={{ fontSize: '14px' }}
                >
                  {tab.label}
                </li>
              ))}
            </ul>
          </div>

          <div className="adm-help-content" style={{ padding: '32px 40px' }}>
            {activeTab === 'dashboard' && (
              <div className="adm-help-tab-content">
                <h3>1. Pengenalan Dashboard Secara Mendalam</h3>
                <p>Selamat datang di Pusat Kontrol Website Albahjah. Dashboard ini dirancang secara khusus untuk memberikan informasi yang paling relevan pada pandangan pertama. Halaman ini adalah layar utama setelah Anda berhasil masuk (login).</p>
                
                <img src="/guide/screenshot-dashboard.jpg" alt="Dashboard" className="adm-guide-img" onError={(e) => { e.target.style.display = 'none'; }} />
                
                <div style={{ background: "#f8fafc", padding: "20px", borderRadius: "8px", border: "1px solid #e2e8f0" }}>
                  <h4 style={{ marginTop: 0 }}>Navigasi Menu Utama (Sidebar Kiri):</h4>
                  <ul>
                    <li><strong>📊 Dashboard:</strong> Menampilkan analitik dasar. Anda bisa melihat secara real-time berapa total Halaman statis yang Anda miliki, berapa jumlah Berita yang telah diterbitkan, dan berapa banyak file gambar (Media) yang memakan ruang di server Cloudinary Anda.</li>
                    <li><strong>📄 Halaman (Pages):</strong> Mengatur fondasi struktural website. Halaman statis tidak seperti artikel berita, mereka adalah bagian tetap dari situs (misal: "Sejarah Yayasan", "Profil Pengasuh", "Kontak", "Visi Misi"). </li>
                    <li><strong>📰 Berita (Posts):</strong> Pusat publikasi artikel, kajian, informasi kegiatan, pengumuman jadwal, dan press release. Konten di sini akan muncul dengan tanggal dan nama penulis, berurutan dari yang terbaru ke terlama (kronologis).</li>
                    <li><strong>🖼️ Media Library:</strong> Lemari arsip digital Anda. Semua aset visual (foto kegiatan, banner pendaftaran, foto tokoh, poster kajian) HARUS disimpan di sini sebelum dapat ditampilkan ke publik.</li>
                    <li><strong>⚙️ Pengaturan Website (Hanya Super Admin):</strong> Panel kendali master. Digunakan untuk merubah identitas inti website seperti Nama Situs, Logo utama, Deskripsi Situs (untuk Google SEO), dan informasi kontak yang muncul di bagian paling bawah (Footer) website.</li>
                    <li><strong>👥 Manajemen Admin (Hanya Super Admin):</strong> Menu untuk mendaftarkan staff baru atau menghapus akses staff lama yang sudah tidak bertugas.</li>
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'pages' && (
              <div className="adm-help-tab-content">
                <h3>2. Manajemen Halaman (Pages) Secara Terperinci</h3>
                <p>Mengelola Halaman membutuhkan kehati-hatian karena halaman statis biasanya terhubung langsung dengan menu utama website di bagian navigasi atas.</p>
                
                <img src="/guide/screenshot-pages.jpg" alt="Daftar Halaman" className="adm-guide-img" onError={(e) => { e.target.style.display = 'none'; }} />
                
                <div style={{ background: "#eff6ff", padding: "20px", borderRadius: "8px", border: "1px solid #bfdbfe", marginBottom: "24px" }}>
                  <h4 style={{ marginTop: 0, color: "#1e3a8a" }}>Penjelasan Detail Form "Buat Halaman Baru"</h4>
                  <ol style={{ color: "#1e40af", paddingLeft: "16px" }}>
                    <li style={{ marginBottom: "12px" }}>
                      <strong>Judul Halaman (H1):</strong><br/>
                      Ini adalah nama resmi halaman yang akan tercetak paling besar di layar pengunjung. <em>Tips: Buatlah jelas dan singkat, maksimal 3-5 kata (Contoh: "Info Pendaftaran Santri Baru").</em>
                    </li>
                    <li style={{ marginBottom: "12px" }}>
                      <strong>URL (Slug):</strong><br/>
                      Slug adalah tautan unik (link) untuk halaman tersebut. Saat Anda mengetik Judul, slug akan terbuat secara otomatis (mengubah huruf kecil dan spasi menjadi tanda hubung). Anda <strong>bisa merubahnya</strong> jika ingin link yang lebih pendek. <br/>
                      <em>Contoh: Judul "Info Pendaftaran Santri Baru 2026", Slug bisa Anda perpendek jadi "info-pendaftaran". URL akhirnya akan menjadi albahjah.com/info-pendaftaran. Jangan pernah memakai spasi atau simbol aneh pada slug!</em>
                    </li>
                    <li style={{ marginBottom: "12px" }}>
                      <strong>Sub-Judul (Opsional):</strong><br/>
                      Teks tambahan yang muncul sedikit lebih kecil di bawah judul utama. Berguna untuk penjelasan tambahan. (Contoh: "Gelombang 1 dan 2 Tahun Ajaran 2026/2027"). Boleh dikosongkan.
                    </li>
                    <li style={{ marginBottom: "12px" }}>
                      <strong>Pilih Layout Desain:</strong>
                      <ul style={{ marginTop: "8px" }}>
                        <li><strong>Standard:</strong> Tampilan klasik formal Albahjah. Menghasilkan kotak header berwarna hijau dengan judul putih di atas teks Anda. Paling cocok untuk artikel biasa dan halaman profil.</li>
                        <li><strong>Hero Image:</strong> Halaman akan menampilkan sebuah gambar banner raksasa (full width) dari ujung ke ujung layar di bagian atas. Jika Anda memilih ini, kolom <strong>URL Gambar Hero</strong> akan muncul dan wajib diisi!</li>
                        <li><strong>Blank Canvas:</strong> Dinding kosong. Khusus untuk developer yang ingin merancang halaman dengan kode HTML dari nol tanpa *template* apapun.</li>
                      </ul>
                    </li>
                  </ol>
                </div>

                <img src="/guide/screenshot-page-create.jpg" alt="Buat Halaman" className="adm-guide-img" onError={(e) => { e.target.style.display = 'none'; }} />

                <div style={{ background: "#fef2f2", padding: "16px", borderRadius: "8px", borderLeft: "4px solid #ef4444" }}>
                  <h4 style={{ marginTop: 0, color: "#b91c1c" }}>⚠️ Mode Developer ⚡ (Peringatan Keras!)</h4>
                  <p style={{ color: "#7f1d1d", marginBottom: 0 }}>
                    Toggle "Mode Developer" di sudut kanan atas hanya diperuntukkan bagi Web Developer atau Programmer. 
                    Saat diaktifkan, Anda bisa menyuntikkan kode CSS dan HTML murni. <strong>Kode yang ditulis di Mode Developer akan mengabaikan, menutupi, dan menghilangkan apapun yang Anda tulis di Mode Awam (Visual Editor).</strong> Jika Anda tidak mengerti kode, jangan pernah menyalakan toggle ini!
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'posts' && (
              <div className="adm-help-tab-content">
                <h3>3. Manajemen Berita & Publikasi Secara Detil</h3>
                <p>Bagian ini sangat krusial karena Berita adalah nyawa dan wajah aktivitas harian institusi Anda di internet. Berita yang baik memiliki Gambar Thumbnail, Judul yang memikat, dan konten yang rapi.</p>
                
                <img src="/guide/screenshot-posts.jpg" alt="Daftar Berita" className="adm-guide-img" onError={(e) => { e.target.style.display = 'none'; }} />
                
                <div style={{ background: "#fdf4ff", padding: "20px", borderRadius: "8px", border: "1px solid #f5d0fe", marginBottom: "24px" }}>
                  <h4 style={{ marginTop: 0, color: "#701a75" }}>Penjelasan Detail Form "Tulis Berita Baru"</h4>
                  <ol style={{ color: "#86198f", paddingLeft: "16px" }}>
                    <li style={{ marginBottom: "12px" }}>
                      <strong>Judul Berita:</strong><br/>
                      Gunakan teknik penulisan judul yang menarik dan mengandung kata kunci pencarian (SEO). <br/>
                      <em>Tips Baik: "Kajian Rutin Tafsir Al-Jalalain Bersama Buya Yahya - Juli 2026"</em><br/>
                      <em>Tips Buruk: "Kajian Hari Ini"</em>
                    </li>
                    <li style={{ marginBottom: "12px" }}>
                      <strong>URL Gambar Thumbnail (Penting!):</strong><br/>
                      Ini adalah foto sampul/wajah artikel Anda yang akan tampil di halaman depan website, serta akan muncul jika berita tersebut dibagikan ke WhatsApp atau Facebook! <br/>
                      1. Upload gambar utama ke Media Library terlebih dahulu.<br/>
                      2. Copy URL gambar tersebut.<br/>
                      3. Paste URL di kolom Thumbnail ini.<br/>
                      Sebuah *preview* kotak gambar akan langsung muncul di bawah kolom jika URL Anda valid. Pastikan gambar berukuran persegi panjang (Landscape) agar tidak terpotong.
                    </li>
                    <li style={{ marginBottom: "12px" }}>
                      <strong>Isi Konten Berita:</strong><br/>
                      Tulis selengkap-lengkapnya di sini menggunakan Visual Editor. 
                    </li>
                    <li style={{ marginBottom: "12px" }}>
                      <strong>Kotak Centang (Checkbox) Publikasi:</strong><br/>
                      Jika Anda sedang menulis berita panjang dan ingin melanjutkan besok, <strong>HILANGKAN</strong> centang pada "Publikasikan Segera", lalu klik Simpan. Berita akan berstatus <strong>Draft</strong> dan tidak akan terlihat oleh publik sampai Anda mengedit dan mencentangnya kembali.
                    </li>
                  </ol>
                </div>

                <img src="/guide/screenshot-post-create.jpg" alt="Buat Berita" className="adm-guide-img" onError={(e) => { e.target.style.display = 'none'; }} />
              </div>
            )}

            {activeTab === 'editor' && (
              <div className="adm-help-tab-content">
                <h3>4. Panduan Visual Editor (Menggunakan React Quill)</h3>
                <p>Visual Editor adalah alat Anda untuk memformat teks. Ini adalah kotak besar tempat Anda menulis isi artikel atau halaman. Berikut adalah penjelasan ikon-ikon pada toolbar bagian atas (dari kiri ke kanan):</p>

                <div style={{ background: "white", padding: "20px", borderRadius: "8px", border: "1px solid #e2e8f0" }}>
                  <ul style={{ listStyleType: "none", padding: 0 }}>
                    <li style={{ marginBottom: "16px", paddingBottom: "16px", borderBottom: "1px solid #f1f5f9" }}>
                      <strong>Dropdown Header (Normal, Heading 1, 2, 3):</strong><br/>
                      Gunakan ini untuk membuat sub-judul di dalam artikel. "Normal" untuk paragraf teks biasa. Gunakan Heading 2 untuk sub-judul besar, dan Heading 3 untuk bagian yang lebih kecil di bawahnya. <em>Sangat penting untuk SEO Google!</em>
                    </li>
                    <li style={{ marginBottom: "16px", paddingBottom: "16px", borderBottom: "1px solid #f1f5f9" }}>
                      <strong>B (Bold), I (Italic), U (Underline), S (Strikethrough):</strong><br/>
                      Blok teks yang ingin diberi efek penekanan (ditebalkan, dimiringkan, digarisbawahi, atau dicoret), lalu klik salah satu ikon ini.
                    </li>
                    <li style={{ marginBottom: "16px", paddingBottom: "16px", borderBottom: "1px solid #f1f5f9" }}>
                      <strong>Daftar Angka & Titik (Numbered List & Bullet List):</strong><br/>
                      Gunakan ini untuk menjabarkan rincian agar mudah dibaca.
                    </li>
                    <li style={{ marginBottom: "16px", paddingBottom: "16px", borderBottom: "1px solid #f1f5f9" }}>
                      <strong>🔗 Ikon Link (Tautan):</strong><br/>
                      Membuat kata bisa di-klik dan mengarah ke website lain. Cara pakainya: Blok kata (misal: "Klik Disini"), lalu klik ikon Link, lalu masukkan URL tujuannya (misal: "https://google.com").
                    </li>
                    <li style={{ marginBottom: "16px", paddingBottom: "16px", borderBottom: "1px solid #f1f5f9" }}>
                      <strong>🖼️ Ikon Gambar (Picture):</strong><br/>
                      Menyisipkan foto di TENGAH teks. Anda tidak boleh mengupload gambar langsung dari sini! Anda harus meng-klik ikon ini, lalu mem-paste URL gambar dari <strong>Media Library</strong> yang sudah Anda copy sebelumnya.
                    </li>
                    <li>
                      <strong>Tx (Tx Bergaris miring) / Clean Formatting:</strong><br/>
                      Alat pembersih. Jika Anda melakukan copy-paste teks dari Microsoft Word atau website lain, kadang formatnya menjadi kacau. Blok teks yang kacau tersebut, lalu klik ikon ini untuk menghapus semua formatnya agar kembali menjadi teks murni.
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'media' && (
              <div className="adm-help-tab-content">
                <h3>5. Panduan Lengkap Media Library & Aturan Upload</h3>
                
                <div style={{ background: "#fffbeb", padding: "20px", borderRadius: "8px", border: "1px solid #fde68a", marginBottom: "24px", borderLeft: "6px solid #d97706" }}>
                  <h4 style={{ marginTop: 0, color: "#92400e" }}>⚠️ ATURAN MUTLAK (DILARANG MELANGGAR) ⚠️</h4>
                  <p style={{ color: "#92400e", marginBottom: 0, fontSize: "16px" }}>
                    Jika Anda membuat berita/halaman, <strong>JANGAN PERNAH MENARIK FILE GAMBAR LANGSUNG DARI LAPTOP KE DALAM KOTAK TEKS VISUAL EDITOR!</strong> 
                    <br/><br/>
                    <strong>MENGAPA?</strong><br/>
                    Jika Anda melakukannya, gambar tersebut akan diubah menjadi teks panjang jutaan karakter (Base64) yang akan menghancurkan database server kita! Setiap gambar <strong>WAJIB</strong> diunggah (upload) terlebih dahulu melalui menu <strong>Media Library</strong>, baru setelah itu Anda bisa mengambil Tautan/URL-nya untuk dipasang di artikel.
                  </p>
                </div>

                <img src="/guide/screenshot-media.jpg" alt="Media Library" className="adm-guide-img" onError={(e) => { e.target.style.display = 'none'; }} />
                
                <div style={{ background: "#f0fdfa", padding: "20px", borderRadius: "8px", border: "1px solid #99f6e4" }}>
                  <h4 style={{ marginTop: 0, color: "#0f766e" }}>Tutorial Step-by-Step Cara Mengunggah dan Menggunakan Gambar Secara Benar:</h4>
                  <ol style={{ color: "#115e59", paddingLeft: "16px" }}>
                    <li style={{ marginBottom: "12px", fontSize: "16px" }}>
                      Siapkan gambar Anda di laptop. Pastikan formatnya JPG, PNG, atau WebP. Dan usahakan ukurannya tidak melebihi 2 Megabyte agar website tetap ringan.
                    </li>
                    <li style={{ marginBottom: "12px", fontSize: "16px" }}>
                      Masuk ke menu <strong>Media Library</strong> di sisi kiri.
                    </li>
                    <li style={{ marginBottom: "12px", fontSize: "16px" }}>
                      Klik area putih putus-putus bertuliskan "Klik atau tarik file gambar ke sini", lalu pilih foto Anda.
                    </li>
                    <li style={{ marginBottom: "12px", fontSize: "16px" }}>
                      Perhatikan progress bar. Gambar sedang dikirim ke <strong>Cloudinary</strong> (Server khusus optimasi gambar tingkat dunia). Jangan tutup halaman hingga proses sukses 100%.
                    </li>
                    <li style={{ marginBottom: "12px", fontSize: "16px" }}>
                      Setelah sukses, gambar Anda akan muncul di bagian "Galeri Media" di bawahnya.
                    </li>
                    <li style={{ marginBottom: "12px", fontSize: "16px", background: "#ccfbf1", padding: "8px", borderRadius: "4px" }}>
                      <strong>Langkah Terpenting:</strong> Di bawah setiap gambar di galeri tersebut, terdapat deretan teks URL dan tombol <strong>"Copy URL"</strong>. Klik tombol "Copy URL" tersebut. Ini berarti Anda sudah menyalin alamat internet dari gambar tersebut.
                    </li>
                    <li style={{ marginBottom: "12px", fontSize: "16px" }}>
                      Sekarang pergilah ke tempat Anda ingin meletakkan gambar tersebut (misal: ke halaman Buat Berita).
                    </li>
                    <li style={{ marginBottom: "12px", fontSize: "16px" }}>
                      Pilih apakah Anda ingin gambar itu menjadi sampul (Paste di <strong>kolom Thumbnail</strong>) ATAU menjadi gambar di tengah teks (Klik <strong>Ikon Picture</strong> di Visual Editor, lalu Paste URL di kotak yang muncul).
                    </li>
                  </ol>
                </div>
              </div>
            )}

            {activeTab === 'users' && (
              <div className="adm-help-tab-content">
                <h3>6. Manajemen Admin & Setting (Khusus Super Admin)</h3>
                <p>Bagian ini memberikan panduan kepada pemegang kunci utama (Super Admin) untuk memodifikasi pengaturan fundamental situs.</p>
                
                <div style={{ background: "#faf5ff", padding: "20px", borderRadius: "8px", border: "1px solid #e9d5ff", marginBottom: "20px" }}>
                  <h4 style={{ marginTop: 0, color: "#6b21a8" }}>Cara Mengganti Pengaturan Global (Settings)</h4>
                  <ul style={{ color: "#7e22ce" }}>
                    <li style={{ marginBottom: "12px" }}><strong>Nama Website:</strong> Akan muncul di tab browser pengunjung.</li>
                    <li style={{ marginBottom: "12px" }}><strong>Deskripsi Website:</strong> Sangat penting untuk Google Search. Tulis satu paragraf pendek (maksimal 160 karakter) yang menjelaskan siapa/apa institusi ini. Google akan membaca ini.</li>
                    <li style={{ marginBottom: "12px" }}><strong>URL Logo:</strong> Jika Anda ingin mengganti logo situs, upload logo format PNG Transparan (tanpa background) ke Media Library, lalu paste (tempel) URL-nya di sini! Jangan asal tulis teks.</li>
                    <li style={{ marginBottom: "12px" }}><strong>Teks Footer:</strong> Tulisan hak cipta paling bawah (contoh: "Copyright © 2026 Albahjah. Hak Cipta Dilindungi.").</li>
                  </ul>
                </div>

                <div style={{ background: "#fdf4ff", padding: "20px", borderRadius: "8px", border: "1px solid #f5d0fe" }}>
                  <h4 style={{ marginTop: 0, color: "#86198f" }}>Manajemen Akun Admin (Users)</h4>
                  <p style={{ color: "#a21caf" }}>
                    Menjaga keamanan situs dimulai dari mengontrol siapa yang memiliki akses login.
                  </p>
                  <ul style={{ color: "#86198f" }}>
                    <li style={{ marginBottom: "12px" }}><strong>Mendaftarkan Staff Baru:</strong> Masukkan Nama Lengkap asli (agar mudah dikenali), Alamat Email yang valid, dan Password yang kuat (minimal kombinasi huruf dan angka).</li>
                    <li style={{ marginBottom: "12px" }}><strong>Pemilihan Peran (Role):</strong>
                      <ul style={{ marginTop: "8px", background: "white", padding: "12px 12px 12px 24px", borderRadius: "6px" }}>
                        <li><strong>ADMIN BIASA:</strong> Berikan peran ini kepada staff operasional, divisi redaksi, atau jurnalis internal. Mereka hanya bisa menulis berita, mengatur halaman, dan upload foto. Mereka TIDAK AKAN bisa melihat tombol Pengaturan Website dan Manajemen Admin!</li>
                        <li><strong>SUPER ADMIN:</strong> Berikan hanya kepada pimpinan IT atau Ketua Yayasan. Punya kendali tak terbatas.</li>
                      </ul>
                    </li>
                    <li style={{ marginBottom: "12px" }}><strong>Cabut Akses:</strong> Jika ada staff yang dimutasi/berhenti, segera hapus akun mereka demi keamanan! Cukup tekan tombol ikon Tong Sampah Merah di tabel daftar user sebelah kanannya. Ingat, Super Admin tidak akan pernah bisa tidak sengaja menghapus akun dirinya sendiri.</li>
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'faq' && (
              <div className="adm-help-tab-content">
                <h3>7. Tanya Jawab Cepat (FAQ & Troubleshooting)</h3>
                
                <div style={{ marginBottom: "20px" }}>
                  <h4 style={{ color: "#0f172a", borderBottom: "2px solid #e2e8f0", paddingBottom: "8px" }}>Q: Saya mengubah halaman, kenapa belum berubah saat dilihat di publik?</h4>
                  <p>A: Pastikan Anda telah mengklik tombol "Simpan Perubahan" di paling bawah. Kadang-kadang browser menyimpan <em>cache</em>. Cobalah segarkan (refresh) halaman website publik Anda atau tekan kombinasi keyboard <strong>CTRL + SHIFT + R</strong> (Windows) atau <strong>CMD + SHIFT + R</strong> (Mac) untuk memaksa pemuatan ulang penuh dari server.</p>
                </div>

                <div style={{ marginBottom: "20px" }}>
                  <h4 style={{ color: "#0f172a", borderBottom: "2px solid #e2e8f0", paddingBottom: "8px" }}>Q: Saya mencoba upload gambar, tapi loadingnya mutar terus. Mengapa?</h4>
                  <p>A: Cek koneksi internet Anda. Kedua, pastikan ukuran file gambar Anda tidak terlalu besar (tidak boleh lebih dari 5MB). Ketiga, pastikan tipe file adalah JPG atau PNG yang valid (bukan file PDF atau Word yang diubah namanya ekstensi nya).</p>
                </div>

                <div style={{ marginBottom: "20px" }}>
                  <h4 style={{ color: "#0f172a", borderBottom: "2px solid #e2e8f0", paddingBottom: "8px" }}>Q: Saya tidak sengaja menghapus teks di Visual Editor, bisa dikembalikan?</h4>
                  <p>A: Selama Anda BELUM menekan tombol Simpan Perubahan, Anda cukup menekan tombol keyboard <strong>CTRL + Z</strong> (Undo) untuk membatalkan kesalahan ketik/hapus tersebut.</p>
                </div>

                <div style={{ marginBottom: "20px" }}>
                  <h4 style={{ color: "#0f172a", borderBottom: "2px solid #e2e8f0", paddingBottom: "8px" }}>Q: Tulisan di web publik terlihat kacau formatnya (besar kecil, warna aneh). Kenapa?</h4>
                  <p>A: Ini terjadi jika Anda melakukan copy-paste langsung teks dari sumber lain (seperti Ms. Word atau Website berita lain). Sumber asal membawa "kode tersembunyi". Cara mengatasinya: Edit artikel, blok teks yang kacau, lalu tekan ikon penghapus berlabel <strong>Tx (Clean Formatting)</strong> di toolbar Visual Editor, lalu simpan ulang.</p>
                </div>

                <div style={{ marginBottom: "20px" }}>
                  <h4 style={{ color: "#0f172a", borderBottom: "2px solid #e2e8f0", paddingBottom: "8px" }}>Q: Saya admin biasa, kenapa saya tidak bisa mengganti Logo web?</h4>
                  <p>A: Demi keamanan struktur web, perubahan global hanya diperbolehkan untuk akun berstatus SUPER ADMIN. Hubungi tim IT atau pimpinan Anda yang memiliki akses Super Admin untuk melakukan penggantian logo.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
