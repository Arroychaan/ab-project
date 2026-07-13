"use client";

import { useState } from "react";
import Link from "next/link";

export default function VisiMisi() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

  return (
    <div className="app-container">
      {/* ============ NAVBAR ============ */}
      <nav className="navbar">
        <div className="navbar-logo">
          <Link href="/">
            <img
              src="/Logo-assets/Logo-Albahjah.png?v=3"
              alt="Logo Al-Bahjah"
              className="navbar-logo-img"
              style={{ cursor: "pointer" }}
            />
          </Link>
        </div>

        <div className="navbar-links">
          <Link href="/">Beranda</Link>
          
          {/* Dropdown Tentang Kami */}
          <div className="navbar-item dropdown">
            <span className="navbar-link-dropdown active">
              Tentang Kami
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M6 9l6 6 6-6" />
              </svg>
            </span>
            <div className="navbar-dropdown-menu">
              <Link href="/tentang-kami/sambutan" className="navbar-dropdown-item">Sambutan Pengasuh</Link>
              <Link href="/tentang-kami/sejarah" className="navbar-dropdown-item">Sejarah & Profil Yayasan</Link>
              <Link href="/tentang-kami/visi-misi" className="navbar-dropdown-item">Visi, Misi & 3 Pilar</Link>
              <Link href="/tentang-kami/unit" className="navbar-dropdown-item">Profil Unit Pendidikan</Link>
              <Link href="/tentang-kami/agenda" className="navbar-dropdown-item">Agenda Harian Santri</Link>
            </div>
          </div>

          <a href="#">Sekolah</a>
          <a href="#">Program</a>
          <a href="#">Berita</a>
          <a href="#">Kontak</a>
        </div>

        <div className="navbar-actions">
          <a
            href="https://wa.me/6281318223521"
            target="_blank"
            rel="noopener noreferrer"
            className="navbar-cta"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            Hubungi Kami
          </a>

          {/* Hamburger Menu Button */}
          <button 
            className="navbar-hamburger" 
            onClick={() => setIsDrawerOpen(true)}
            aria-label="Buka Menu"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        </div>
      </nav>

      {/* ============ MOBILE DRAWER ============ */}
      <div 
        className={`navbar-drawer-overlay ${isDrawerOpen ? "open" : ""}`} 
        onClick={() => setIsDrawerOpen(false)}
      />
      <div className={`navbar-drawer ${isDrawerOpen ? "open" : ""}`}>
        <div className="navbar-drawer-header">
          <img
            src="/Logo-assets/Logo-Albahjah.png?v=3"
            alt="Logo Al-Bahjah"
            className="navbar-drawer-logo"
          />
          <button 
            className="navbar-drawer-close" 
            onClick={() => setIsDrawerOpen(false)}
            aria-label="Tutup Menu"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="navbar-drawer-links">
          <Link href="/" className="navbar-drawer-link" onClick={() => setIsDrawerOpen(false)}>
            Beranda
          </Link>
          
          {/* Accordion Tentang Kami */}
          <div>
            <button 
              className={`navbar-drawer-accordion-btn active ${isAccordionOpen ? "open" : ""}`}
              onClick={() => setIsAccordionOpen(!isAccordionOpen)}
            >
              Tentang Kami
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>
            <div className={`navbar-drawer-accordion-content ${isAccordionOpen ? "open" : ""}`}>
              <Link href="/tentang-kami/sambutan" className="navbar-drawer-sublink" onClick={() => setIsDrawerOpen(false)}>
                Sambutan Pengasuh
              </Link>
              <Link href="/tentang-kami/sejarah" className="navbar-drawer-sublink" onClick={() => setIsDrawerOpen(false)}>
                Sejarah & Profil Yayasan
              </Link>
              <Link href="/tentang-kami/visi-misi" className="navbar-drawer-sublink" onClick={() => setIsDrawerOpen(false)}>
                Visi, Misi & 3 Pilar
              </Link>
              <Link href="/tentang-kami/unit" className="navbar-drawer-sublink" onClick={() => setIsDrawerOpen(false)}>
                Profil Unit Pendidikan
              </Link>
              <Link href="/tentang-kami/agenda" className="navbar-drawer-sublink" onClick={() => setIsDrawerOpen(false)}>
                Agenda Harian Santri
              </Link>
            </div>
          </div>

          <a href="#" className="navbar-drawer-link" onClick={() => setIsDrawerOpen(false)}>Sekolah</a>
          <a href="#" className="navbar-drawer-link" onClick={() => setIsDrawerOpen(false)}>Program</a>
          <a href="#" className="navbar-drawer-link" onClick={() => setIsDrawerOpen(false)}>Berita</a>
          <a href="#" className="navbar-drawer-link" onClick={() => setIsDrawerOpen(false)}>Kontak</a>
        </div>
      </div>

      {/* ============ CONTENT SECTION ============ */}
      <section style={{ 
        padding: "50px 24px",
        minHeight: "calc(100vh - 85px)",
        background: "#fff",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        position: "relative",
        overflowY: "auto"
      }}>
        <div style={{
          maxWidth: "900px",
          width: "100%",
          background: "#f4faf7",
          padding: "40px",
          borderRadius: "24px",
          boxShadow: "0 10px 30px rgba(13, 110, 63, 0.03)",
          position: "relative",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          gap: "32px"
        }}>
          {/* Header */}
          <div style={{ textAlign: "center", borderBottom: "2px solid #e2f0e9", paddingBottom: "20px" }}>
            <h1 style={{ fontSize: "28px", color: "#0d6e3f", fontWeight: "700", marginBottom: "8px" }}>
              Visi, Misi & 3 Pilar Utama
            </h1>
            <p style={{ fontSize: "14px", color: "#666" }}>
              Komitmen Keislaman dan Pendidikan Unggulan Al-Bahjah
            </p>
          </div>

          {/* Visi & Misi */}
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div style={{ background: "#fff", padding: "24px", borderRadius: "16px", border: "1px solid #e2f0e9" }}>
              <h3 style={{ fontSize: "18px", color: "#0d6e3f", fontWeight: "700", marginBottom: "10px" }}>Visi</h3>
              <p style={{ fontSize: "15px", color: "#333", lineHeight: "1.7", fontWeight: "500", fontStyle: "italic" }}>
                &ldquo;Membentuk generasi Qur&apos;ani, berakhlak mulia, berilmu dan berprestasi untuk masa depan umat yang lebih baik.&rdquo;
              </p>
            </div>

            <div style={{ background: "#fff", padding: "24px", borderRadius: "16px", border: "1px solid #e2f0e9" }}>
              <h3 style={{ fontSize: "18px", color: "#0d6e3f", fontWeight: "700", marginBottom: "12px" }}>Misi</h3>
              <ul style={{ paddingLeft: "20px", display: "flex", flexDirection: "column", gap: "10px", color: "#444", fontSize: "14.5px", lineHeight: "1.6" }}>
                <li>Menyelenggarakan sistem pendidikan terpadu yang memadukan kurikulum agama dan umum secara seimbang.</li>
                <li>Menumbuhkan kecintaan terhadap Al-Qur&apos;an melalui program tahfidz yang terstruktur dan berkualitas.</li>
                <li>Membina karakter santri dengan adab Islami dan keteladanan akhlak mulia baginda Nabi Muhammad SAW.</li>
                <li>Mendorong prestasi akademis dan non-akademis santri di tingkat nasional maupun internasional.</li>
              </ul>
            </div>
          </div>

          {/* 3 Pilar Al-Bahjah */}
          <div style={{ borderTop: "2px solid #e2f0e9", paddingTop: "24px" }}>
            <h2 style={{ fontSize: "20px", color: "#0d6e3f", fontWeight: "700", textAlign: "center", marginBottom: "20px" }}>
              3 Pilar Pendidikan Al-Bahjah
            </h2>
            
            <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
              
              {/* Pilar 1 */}
              <div style={{ flex: "1", minWidth: "240px", background: "#fff", padding: "20px", borderRadius: "16px", border: "1px solid #e2f0e9" }}>
                <div style={{ fontSize: "24px", marginBottom: "10px" }}>📖</div>
                <h4 style={{ fontSize: "16px", color: "#0d6e3f", fontWeight: "700", marginBottom: "8px" }}>Tahfidzul Qur&apos;an</h4>
                <p style={{ fontSize: "13.5px", color: "#555", lineHeight: "1.6" }}>
                  Membina santri agar hafal Al-Qur&apos;an 30 Juz secara mutqin, tartil, serta memahami dasar-dasar tajwid dan makhorijul huruf dengan baik.
                </p>
              </div>

              {/* Pilar 2 */}
              <div style={{ flex: "1", minWidth: "240px", background: "#fff", padding: "20px", borderRadius: "16px", border: "1px solid #e2f0e9" }}>
                <div style={{ fontSize: "24px", marginBottom: "10px" }}>📚</div>
                <h4 style={{ fontSize: "16px", color: "#0d6e3f", fontWeight: "700", marginBottom: "8px" }}>Tafaqquh Fiddin</h4>
                <p style={{ fontSize: "13.5px", color: "#555", lineHeight: "1.6" }}>
                  Membekali santri dengan pemahaman fikih, akidah, hadits, dan bahasa Arab (alat) melalui kajian kitab-kitab khazanah keislaman Ahlus Sunnah wal Jama&apos;ah.
                </p>
              </div>

              {/* Pilar 3 */}
              <div style={{ flex: "1", minWidth: "240px", background: "#fff", padding: "20px", borderRadius: "16px", border: "1px solid #e2f0e9" }}>
                <div style={{ fontSize: "24px", marginBottom: "10px" }}>🤝</div>
                <h4 style={{ fontSize: "16px", color: "#0d6e3f", fontWeight: "700", marginBottom: "8px" }}>Akhlakul Karimah</h4>
                <p style={{ fontSize: "13.5px", color: "#555", lineHeight: "1.6" }}>
                  Mengutamakan keteladanan adab dalam keseharian santri, melatih khidmah (pengabdian) kepada sesama, dan berbakti kepada orang tua (*birrul walidain*).
                </p>
              </div>

            </div>
          </div>

          {/* Action button */}
          <div style={{ display: "flex", justifyContent: "center", marginTop: "15px" }}>
            <Link href="/" className="hero-btn" style={{ textDecoration: "none" }}>
              Kembali ke Beranda
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
