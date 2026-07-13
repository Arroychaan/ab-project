"use client";

import { useState } from "react";
import Link from "next/link";

export default function Sambutan() {
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
          gap: "24px"
        }}>
          {/* Header */}
          <div style={{ textAlign: "center", borderBottom: "2px solid #e2f0e9", paddingBottom: "20px" }}>
            <h1 style={{ fontSize: "28px", color: "#0d6e3f", fontWeight: "700", marginBottom: "8px" }}>
              Sambutan Khadimul Ummah
            </h1>
            <p style={{ fontSize: "14px", color: "#666", fontStyle: "italic" }}>
              Lembaga Pengembangan Dakwah (LPD) Al-Bahjah
            </p>
          </div>

          {/* Body content with Photo */}
          <div style={{ display: "flex", flexDirection: "row", gap: "30px", flexWrap: "wrap", alignItems: "flex-start" }}>
            
            {/* Photo Column */}
            <div style={{ flex: "1", minWidth: "220px", display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" }}>
              <div style={{ 
                width: "200px", 
                height: "250px", 
                borderRadius: "16px", 
                overflow: "hidden", 
                boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
                border: "4px solid #fff",
                background: "#ddd" 
              }}>
                <img 
                  src="/buya-yahya.jpg" 
                  alt="Buya Yahya" 
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
              <div style={{ textAlign: "center" }}>
                <h3 style={{ fontSize: "16px", color: "#0d6e3f", fontWeight: "700" }}>Buya Yahya</h3>
                <p style={{ fontSize: "12.5px", color: "#777", fontWeight: "500" }}>Pengasuh LPD Al-Bahjah</p>
              </div>
            </div>

            {/* Text Column */}
            <div style={{ flex: "2", minWidth: "300px", display: "flex", flexDirection: "column", gap: "16px" }}>
              <p style={{ fontSize: "16px", color: "#0d6e3f", fontWeight: "600", fontStyle: "italic" }}>
                Assalamu&apos;alaikum Warahmatullahi Wabarakatuh
              </p>
              <p style={{ fontSize: "14.5px", color: "#444", lineHeight: "1.7" }}>
                Puji syukur kehadirat Allah SWT yang senantiasa melimpahkan taufiq dan hidayah-Nya. Shalawat serta salam semoga tercurah limpahkan kepada junjungan kita Nabi Besar Muhammad SAW, keluarga, sahabat, dan para pengikutnya hingga akhir zaman.
              </p>
              <p style={{ fontSize: "14.5px", color: "#444", lineHeight: "1.7" }}>
                LPD Al-Bahjah hadir dengan membawa visi dakwah dan tarbiyah yang kokoh berdasarkan manhaj Ahlus Sunnah wal Jama&apos;ah. Di unit pendidikan formal kami (SDIQu, SMPIQu, SMAIQu), kami berkomitmen untuk melahirkan para penghafal Al-Qur&apos;an yang tidak hanya unggul secara akademis, tetapi juga memiliki akhlak mulia dan kedalaman ilmu agama (*Tafaqquh Fiddin*).
              </p>
              <p style={{ fontSize: "14.5px", color: "#444", lineHeight: "1.7" }}>
                Kami mengajak para orang tua untuk bersama-sama mendidik putra-putri kita menjadi generasi tangguh penyambung lidah dakwah Baginda Nabi Muhammad SAW. Semoga ikhtiar mulia ini senantiasa diridhai dan dimudahkan oleh Allah SWT.
              </p>
              <p style={{ fontSize: "14.5px", color: "#0d6e3f", fontWeight: "600", fontStyle: "italic" }}>
                Wassalamu&apos;alaikum Warahmatullahi Wabarakatuh
              </p>
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
