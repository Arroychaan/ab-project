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
    { id: 'faq', label: '7. Tanya Jawab (FAQ)' },
    { id: 'tutorial_page', label: '8. Praktik: Buat Halaman Jadi!' }
  ];

  return (
    <div className="adm-help-modal-overlay" onClick={onClose}>
      <div className="adm-help-modal-container" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '1000px', height: '90vh' }}>
        <div className="adm-help-modal-header" style={{ background: 'linear-gradient(90deg, #166534 0%, #15803d 100%)', color: 'white' }}>
          <div>
            <h2 style={{ color: 'white' }}>📚 Panduan Utama Admin Panel</h2>
            {/* <p style={{ margin: "4px 0 0 0", fontSize: "14px", color: "#dcfce7" }}>
              Dokumentasi komprehensif, langkah demi langkah, untuk mengelola sistem informasi Albahjah.
            </p> */}
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
                <p>Selamat datang di Pusat Kontrol Website Albahjah. Halaman ini adalah layar utama setelah Anda berhasil masuk (login).</p>
                <img src="/guide/screenshot-dashboard.jpg" alt="Dashboard" className="adm-guide-img" onError={(e) => { e.target.style.display = 'none'; }} />
                
                <div style={{ background: "#f8fafc", padding: "20px", borderRadius: "8px", border: "1px solid #e2e8f0" }}>
                  <h4 style={{ marginTop: 0 }}>Navigasi Menu Utama (Sidebar Kiri):</h4>
                  <img src="/guide/step/sidebar.jpg" alt="Sidebar" className="adm-guide-img" style={{ maxWidth: '200px' }} onError={(e) => { e.target.style.display = 'none'; }} />
                  <ul>
                    <li><strong>📊 Dashboard:</strong> Melihat jumlah total halaman, berita, dan file media yang ada di web.</li>
                    <li><strong>📄 Halaman (Pages):</strong> Mengatur halaman utama yang statis (contoh: Profil, Kontak).</li>
                    <li><strong>📰 Berita (Posts):</strong> Pusat publikasi artikel, kajian, informasi kegiatan, berurutan.</li>
                    <li><strong>🖼️ Media Library:</strong> Lemari arsip digital. Semua aset visual WAJIB disimpan di sini.</li>
                    <li><strong>⚙️ Pengaturan Website & Manajemen Admin:</strong> Menu master untuk Super Admin.</li>
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
                  <h4 style={{ marginTop: 0, color: "#1e3a8a" }}>Langkah-langkah Membuat Halaman Baru:</h4>
                  <ol style={{ color: "#1e40af", paddingLeft: "16px" }}>
                    <li style={{ marginBottom: "12px" }}>
                      <strong>Klik menu Halaman</strong> di sidebar kiri, lalu klik tombol biru <strong>+ Buat Halaman Baru</strong>.
                      <img src="/guide/step/btn-create-page.jpg" alt="Tombol Buat Halaman" className="adm-guide-img" onError={(e) => { e.target.style.display = 'none'; }} />
                    </li>
                    <li style={{ marginBottom: "12px" }}>
                      <strong>Isi Judul Halaman dan Sub-Judul:</strong> Tulis judul yang jelas. URL Slug akan otomatis terisi menyesuaikan judul.
                      <img src="/guide/step/form-page-top.jpg" alt="Form Judul Halaman" className="adm-guide-img" onError={(e) => { e.target.style.display = 'none'; }} />
                    </li>
                    <li style={{ marginBottom: "12px" }}>
                      <strong>Pilih Layout Desain:</strong> "Standard" untuk tampilan minimalis hijau, atau "Hero Image" jika Anda ingin ada gambar besar di paling atas.
                      <img src="/guide/step/form-page-layout.jpg" alt="Dropdown Layout" className="adm-guide-img" onError={(e) => { e.target.style.display = 'none'; }} />
                    </li>
                    <li style={{ marginBottom: "12px" }}>
                      <strong>Preview Halaman:</strong> Sebelum menyimpan, klik tombol <strong>👁️ Preview Halaman</strong> di bawah untuk mensimulasikan hasil akhir yang akan dilihat oleh pengunjung (bisa dilihat versi Desktop maupun Mobile).
                      <img src="/guide/step/preview-modal-mobile.jpg" alt="Live Preview Halaman" className="adm-guide-img" style={{ maxWidth: '400px' }} onError={(e) => { e.target.style.display = 'none'; }} />
                    </li>
                  </ol>
                </div>

                <div style={{ background: "#fef2f2", padding: "16px", borderRadius: "8px", borderLeft: "4px solid #ef4444" }}>
                  <h4 style={{ marginTop: 0, color: "#b91c1c" }}>⚠️ Mode Developer ⚡ (Peringatan Keras!)</h4>
                  <p style={{ color: "#7f1d1d", marginBottom: "10px" }}>
                    Di pojok kanan atas, terdapat toggle Mode Developer. Hanya nyalakan jika Anda adalah Web Developer yang mengerti HTML/CSS. <strong>Menyalakan ini akan mengabaikan ketikan Anda di Visual Editor.</strong>
                  </p>
                  <img src="/guide/step/dev-toggle.jpg" alt="Developer Toggle" className="adm-guide-img" onError={(e) => { e.target.style.display = 'none'; }} />
                </div>
              </div>
            )}

            {activeTab === 'posts' && (
              <div className="adm-help-tab-content">
                <h3>3. Manajemen Berita & Publikasi Secara Detil</h3>
                <p>Berita yang baik memiliki Gambar Thumbnail, Judul yang memikat, dan konten yang rapi.</p>
                
                <div style={{ background: "#fdf4ff", padding: "20px", borderRadius: "8px", border: "1px solid #f5d0fe", marginBottom: "24px" }}>
                  <h4 style={{ marginTop: 0, color: "#701a75" }}>Langkah Menulis Berita Baru</h4>
                  <ol style={{ color: "#86198f", paddingLeft: "16px" }}>
                    <li style={{ marginBottom: "12px" }}>
                      Buka menu <strong>Berita</strong>, klik <strong>+ Tulis Berita Baru</strong>, dan masukkan Judul Berita.
                    </li>
                    <li style={{ marginBottom: "12px" }}>
                      <strong>URL Gambar Thumbnail:</strong> Paste (tempelkan) URL gambar dari Media Library ke kolom ini agar berita Anda memiliki gambar sampul.
                      <img src="/guide/step/form-post-thumbnail.jpg" alt="Input Thumbnail" className="adm-guide-img" onError={(e) => { e.target.style.display = 'none'; }} />
                    </li>
                    <li style={{ marginBottom: "12px" }}>
                      <strong>Isi Konten Berita:</strong> Tulis selengkap-lengkapnya di Visual Editor. (Pelajari ikon editor di tab "Panduan Visual Editor").
                    </li>
                    <li style={{ marginBottom: "12px" }}>
                      <strong>Publikasi:</strong> Jangan lupa pastikan checkbox "Publikasikan Segera" dicentang sebelum menekan tombol Simpan, kecuali Anda ingin menyimpannya sebagai Draft.
                      <img src="/guide/step/post-publish.jpg" alt="Checkbox Publikasi" className="adm-guide-img" onError={(e) => { e.target.style.display = 'none'; }} />
                    </li>
                  </ol>
                </div>
              </div>
            )}

            {activeTab === 'editor' && (
              <div className="adm-help-tab-content">
                <h3>4. Panduan Visual Editor (Menggunakan React Quill)</h3>
                <p>Visual Editor adalah alat Anda untuk memformat teks. Anda TIDAK BOLEH mem-paste file gambar langsung ke kotak putih besar ini.</p>

                <img src="/guide/step/editor-toolbar.jpg" alt="Toolbar Editor" className="adm-guide-img" onError={(e) => { e.target.style.display = 'none'; }} />

                <div style={{ background: "white", padding: "20px", borderRadius: "8px", border: "1px solid #e2e8f0" }}>
                  <ul style={{ listStyleType: "none", padding: 0 }}>
                    <li style={{ marginBottom: "16px", paddingBottom: "16px", borderBottom: "1px solid #f1f5f9" }}>
                      <strong>Dropdown Header:</strong> Gunakan ini untuk membuat sub-judul di dalam artikel (Heading 2 atau 3). <em>Sangat penting untuk SEO Google!</em>
                    </li>
                    <li style={{ marginBottom: "16px", paddingBottom: "16px", borderBottom: "1px solid #f1f5f9" }}>
                      <strong>B, I, U, S:</strong> Untuk teks <strong>Bold</strong>, <em>Italic</em>, Underline, dan Strikethrough.
                    </li>
                    <li style={{ marginBottom: "16px", paddingBottom: "16px", borderBottom: "1px solid #f1f5f9" }}>
                      <strong>🔗 Ikon Link (Tautan):</strong> Membuat teks bisa di-klik mengarah ke website lain.
                    </li>
                    <li style={{ marginBottom: "16px", paddingBottom: "16px", borderBottom: "1px solid #f1f5f9" }}>
                      <strong>🖼️ Ikon Gambar (Picture):</strong> Menyisipkan foto di TENGAH teks. Klik ikon ini, lalu <strong>Paste URL gambar</strong> dari Media Library.
                    </li>
                    <li>
                      <strong>Tx (Clean Formatting):</strong> Alat pembersih. Blok teks yang formatnya kacau akibat copy-paste dari Word/Web lain, lalu klik ini untuk mereset formatnya.
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'media' && (
              <div className="adm-help-tab-content">
                <h3>5. Panduan Lengkap Media Library & Aturan Upload</h3>
                
                <div style={{ background: "#fffbeb", padding: "20px", borderRadius: "8px", border: "1px solid #fde68a", marginBottom: "24px", borderLeft: "6px solid #d97706" }}>
                  <h4 style={{ marginTop: 0, color: "#92400e" }}>⚠️ ATURAN MUTLAK ⚠️</h4>
                  <p style={{ color: "#92400e", marginBottom: 0 }}>
                    Setiap gambar <strong>WAJIB</strong> diunggah melalui menu Media Library agar tersimpan di server Cloudinary. Dilarang keras paste gambar langsung ke dalam artikel teks karena akan menghancurkan performa web.
                  </p>
                </div>
                
                <div style={{ background: "#f0fdfa", padding: "20px", borderRadius: "8px", border: "1px solid #99f6e4" }}>
                  <ol style={{ color: "#115e59", paddingLeft: "16px" }}>
                    <li style={{ marginBottom: "12px", fontSize: "16px" }}>
                      Masuk ke menu <strong>Media Library</strong>, klik area unggah kotak putus-putus atau tarik file Anda (maks. 5MB) ke area tersebut. Tunggu hingga selesai 100%.
                      <img src="/guide/step/media-upload.jpg" alt="Area Upload" className="adm-guide-img" onError={(e) => { e.target.style.display = 'none'; }} />
                    </li>
                    <li style={{ marginBottom: "12px", fontSize: "16px" }}>
                      Gambar Anda akan muncul di Galeri Media. <strong>Klik tombol "Copy URL"</strong> di bawah gambar tersebut untuk menyalin Tautan internet gambar Anda.
                      <img src="/guide/step/media-card.jpg" alt="Tombol Copy URL" className="adm-guide-img" style={{ maxWidth: '300px' }} onError={(e) => { e.target.style.display = 'none'; }} />
                    </li>
                    <li style={{ marginBottom: "12px", fontSize: "16px" }}>
                      Pergi ke halaman pembuatan Berita/Halaman, lalu paste URL tersebut ke kolom yang sesuai (Kolom Thumbnail, Kolom Hero, atau prompt Ikon Picture di Visual Editor).
                    </li>
                  </ol>
                </div>
              </div>
            )}

            {activeTab === 'users' && (
              <div className="adm-help-tab-content">
                <h3>6. Manajemen Admin & Setting (Khusus Super Admin)</h3>
                
                <div style={{ background: "#faf5ff", padding: "20px", borderRadius: "8px", border: "1px solid #e9d5ff", marginBottom: "20px" }}>
                  <h4 style={{ marginTop: 0, color: "#6b21a8" }}>Cara Mengganti Pengaturan Global</h4>
                  <img src="/guide/screenshot-settings.jpg" alt="Settings" className="adm-guide-img" onError={(e) => { e.target.style.display = 'none'; }} />
                  <p style={{ color: "#7e22ce" }}>Di menu ini Anda bisa merubah identitas web (Nama, SEO Deskripsi, WhatsApp, Teks Footer). Untuk Logo, ingat untuk mengupload gambar logonya ke Media Library dulu, baru paste URL-nya ke kolom Logo URL di sini.</p>
                </div>

                <div style={{ background: "#fdf4ff", padding: "20px", borderRadius: "8px", border: "1px solid #f5d0fe" }}>
                  <h4 style={{ marginTop: 0, color: "#86198f" }}>Manajemen Akun Admin (Users)</h4>
                  <img src="/guide/screenshot-users.jpg" alt="Users" className="adm-guide-img" onError={(e) => { e.target.style.display = 'none'; }} />
                  <ul style={{ color: "#86198f" }}>
                    <li style={{ marginBottom: "12px" }}><strong>ADMIN:</strong> Hanya bisa menulis berita, mengatur halaman, dan upload media.</li>
                    <li style={{ marginBottom: "12px" }}><strong>SUPER ADMIN:</strong> Punya kendali tak terbatas.</li>
                    <li style={{ marginBottom: "12px" }}>Klik ikon <strong>Tong Sampah Merah</strong> untuk mencabut/menghapus akses admin yang sudah tidak bekerja.</li>
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'faq' && (
              <div className="adm-help-tab-content">
                <h3>7. Tanya Jawab Cepat (FAQ & Troubleshooting)</h3>
                <div style={{ marginBottom: "20px" }}>
                  <h4 style={{ color: "#0f172a", borderBottom: "2px solid #e2e8f0", paddingBottom: "8px" }}>Q: Halaman sudah saya ubah dan simpan, kenapa belum berubah di web publik?</h4>
                  <p>A: Browser sering menyimpan <em>cache</em> (memori sementara). Tekan <strong>CTRL + SHIFT + R</strong> (Windows) atau <strong>CMD + SHIFT + R</strong> (Mac) untuk menyegarkan tampilan (hard refresh).</p>
                </div>
                <div style={{ marginBottom: "20px" }}>
                  <h4 style={{ color: "#0f172a", borderBottom: "2px solid #e2e8f0", paddingBottom: "8px" }}>Q: Loading upload gambar mutar terus?</h4>
                  <p>A: Pastikan file tidak lebih dari 5MB, formatnya valid (JPG/PNG), dan cek koneksi internet Anda.</p>
                </div>
                <div style={{ marginBottom: "20px" }}>
                  <h4 style={{ color: "#0f172a", borderBottom: "2px solid #e2e8f0", paddingBottom: "8px" }}>Q: Saya salah ketik/hapus teks panjang, bisa dikembalikan?</h4>
                  <p>A: Selama Anda BELUM mengklik Simpan, tekan <strong>CTRL + Z</strong> (Undo) di keyboard untuk membatalkan kesalahan tersebut.</p>
                </div>
              </div>
            )}

            {activeTab === 'tutorial_page' && (
              <div className="adm-help-tab-content">
                <h3>8. Tutorial Praktik: Membuat Halaman "Sejarah Yayasan" Sampai Jadi!</h3>
                <p style={{ fontSize: "16px" }}>Mari kita praktikkan semua teori sebelumnya dalam <strong>satu studi kasus nyata</strong>. Kita akan membuat halaman "Sejarah Yayasan" yang memiliki banner atas (Hero Image), format judul yang rapi, dan sebuah foto pendiri di tengah teks. Ikuti langkah demi langkah di bawah ini:</p>
                
                <div style={{ background: "#f0fdfa", padding: "24px", borderRadius: "8px", border: "1px solid #5eead4", marginTop: "24px" }}>
                  
                  <h4 style={{ color: "#0f766e", marginTop: 0, fontSize: "18px" }}>Langkah 1: Siapkan Gambar Anda di Media Library</h4>
                  <p>Sebelum menyentuh menu Halaman, kita <strong>WAJIB</strong> mengupload gambar-gambar yang akan dipakai. Kita butuh 2 gambar: 1 untuk Banner Atas (ukuran memanjang/landscape), dan 1 untuk foto pendiri (bebas).</p>
                  <img src="/guide/step/media-upload.jpg" alt="Upload Media" className="adm-guide-img" onError={(e) => { e.target.style.display = 'none'; }} />
                  <ul style={{ color: "#115e59", paddingLeft: "20px" }}>
                    <li>Masuk menu <strong>Media Library</strong>, klik area putus-putus, dan upload kedua foto Anda.</li>
                    <li>Setelah terupload, klik tombol <strong>Copy URL</strong> di bawah gambar Banner. (<em>Ingat, sekarang URL banner sudah ada di dalam "clipboard" memori laptop Anda</em>).</li>
                  </ul>
                  <img src="/guide/step/media-card.jpg" alt="Copy URL Media" className="adm-guide-img" style={{ maxWidth: '300px' }} onError={(e) => { e.target.style.display = 'none'; }} />

                  <h4 style={{ color: "#0f766e", marginTop: "32px", fontSize: "18px" }}>Langkah 2: Mulai Buat Halaman Baru</h4>
                  <p>Masuk ke menu <strong>Halaman (Pages)</strong> di kiri, lalu klik tombol biru <strong>+ Buat Halaman Baru</strong> di kanan atas.</p>
                  <img src="/guide/step/btn-create-page.jpg" alt="Klik Buat Halaman" className="adm-guide-img" onError={(e) => { e.target.style.display = 'none'; }} />
                  <ul style={{ color: "#115e59", paddingLeft: "20px" }}>
                    <li>Pada kolom <strong>Judul Halaman</strong>, ketik: <code>Sejarah Yayasan Albahjah</code></li>
                    <li>Biarkan kolom Slug otomatis terisi (akan menjadi <code>sejarah-yayasan-albahjah</code>).</li>
                    <li>Pada kolom <strong>Sub-judul</strong>, ketik: <code>Mengenal lebih dekat rekam jejak perjuangan dakwah.</code></li>
                  </ul>
                  <img src="/guide/step/form-page-top.jpg" alt="Isi Form Judul" className="adm-guide-img" onError={(e) => { e.target.style.display = 'none'; }} />

                  <h4 style={{ color: "#0f766e", marginTop: "32px", fontSize: "18px" }}>Langkah 3: Atur Layout & Masukkan Gambar Banner</h4>
                  <ul style={{ color: "#115e59", paddingLeft: "20px" }}>
                    <li>Karena kita ingin tampilan mewah dengan gambar besar di atas, ubah <strong>Pilih Layout</strong> menjadi <code>Hero Image</code>.</li>
                    <li>Tiba-tiba, akan muncul kolom baru bernama <strong>URL Gambar Hero</strong>.</li>
                    <li>Klik kanan di dalam kolom tersebut, lalu pilih <strong>Paste</strong> (atau tekan CTRL+V). URL banner yang Anda copy dari Media Library di Langkah 1 akan masuk ke sini!</li>
                  </ul>
                  <img src="/guide/step/form-page-layout.jpg" alt="Pilih Layout" className="adm-guide-img" onError={(e) => { e.target.style.display = 'none'; }} />

                  <h4 style={{ color: "#0f766e", marginTop: "32px", fontSize: "18px" }}>Langkah 4: Menulis Konten di Visual Editor</h4>
                  <p>Sekarang gulir (scroll) ke bawah menuju kotak putih besar (Visual Editor). Mari mulai menulis.</p>
                  <ul style={{ color: "#115e59", paddingLeft: "20px" }}>
                    <li>Ketik: <code>Awal Mula Berdirinya Yayasan</code>. Blok teks ini, lalu klik tombol panah <strong>Normal</strong> di Toolbar atas, ubah menjadi <strong>Heading 2</strong>. Teks akan membesar. Ini bagus untuk SEO.</li>
                    <li>Tekan <em>Enter</em>. Mulailah mengetik paragraf pertama cerita Anda: <code>Yayasan Albahjah didirikan pada tahun...</code>.</li>
                  </ul>
                  <img src="/guide/step/editor-toolbar.jpg" alt="Toolbar Editor" className="adm-guide-img" onError={(e) => { e.target.style.display = 'none'; }} />

                  <h4 style={{ color: "#0f766e", marginTop: "32px", fontSize: "18px" }}>Langkah 5: Menyelipkan Foto Pendiri di Tengah Cerita</h4>
                  <p>Kita ingin menaruh foto pendiri di bawah paragraf pertama.</p>
                  <ul style={{ color: "#115e59", paddingLeft: "20px" }}>
                    <li><strong>Buka tab baru di browser Anda</strong> (biarkan halaman ketikan ini tetap terbuka). Di tab baru itu, masuk ke panel admin Albahjah lagi, lalu ke <strong>Media Library</strong>.</li>
                    <li>Cari foto pendiri yang sudah di-upload di Langkah 1. Klik tombol <strong>Copy URL</strong> di bawah foto tersebut.</li>
                    <li>Kembali ke tab halaman ketikan Anda. Taruh kursor di baris baru setelah paragraf pertama.</li>
                    <li>Klik ikon <strong>Gambar (Picture)</strong> di toolbar atas editor. Akan muncul kotak meminta URL.</li>
                    <li><strong>Paste</strong> URL foto pendiri tersebut ke dalam kotak, lalu klik <strong>Simpan/Insert</strong>. Foto akan langsung muncul di dalam editor Anda!</li>
                  </ul>

                  <h4 style={{ color: "#0f766e", marginTop: "32px", fontSize: "18px" }}>Langkah 6: Cek Preview & Simpan Sukses!</h4>
                  <ul style={{ color: "#115e59", paddingLeft: "20px" }}>
                    <li>Gulir ke bawah, klik tombol <strong>👁️ Preview Halaman</strong>.</li>
                    <li>Pastikan tampilan di mode "Desktop" maupun "Mobile View" sudah terlihat bagus dan pas.</li>
                  </ul>
                  <img src="/guide/step/btn-preview-page.jpg" alt="Tombol Preview" className="adm-guide-img" style={{ maxWidth: '300px' }} onError={(e) => { e.target.style.display = 'none'; }} />
                  <img src="/guide/step/preview-modal.jpg" alt="Tampilan Preview Modal" className="adm-guide-img" onError={(e) => { e.target.style.display = 'none'; }} />
                  <ul style={{ color: "#115e59", paddingLeft: "20px" }}>
                    <li>Jika sudah yakin, tutup modal preview, lalu klik tombol biru besar <strong>Simpan Halaman</strong> (atau Simpan Perubahan).</li>
                    <li><strong>SELESAI! TARRRAAA! 🎉</strong> Halaman Anda telah berhasil dibuat. Anda akan dikembalikan ke tabel daftar halaman, dan Anda bisa mengeklik tombol <strong>Lihat Web</strong> (ikon mata) di tabel tersebut untuk melihat hasil karya Anda yang sudah live di internet.</li>
                  </ul>

                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
