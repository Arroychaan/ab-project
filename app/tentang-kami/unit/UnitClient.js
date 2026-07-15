"use client";

import { useState } from "react";
import Link from "next/link";

export default function UnitClient({ pageData }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

  const content = pageData ? JSON.parse(pageData.data) : {
    units: [
      {
        logo: "/Logo-assets/sd-iqu-logo.png",
        name: "SDIQu (SD Islam Qur'ani) Al-Bahjah",
        quote: "Membangun dasar keimanan, akhlak mulia, dan semangat belajar sejak dini.",
        description: "Fokus utama jenjang sekolah dasar adalah membentuk karakter dasar, penanaman adab harian, pengenalan ibadah praktis, dan pencapaian hafalan Al-Qur'an juz-juz awal secara lancar serta tajwid yang benar dalam suasana belajar yang menyenangkan."
      },
      {
        logo: "/Logo-assets/smp-iqu-logo.png",
        name: "SMPIQu (SMP Islam Qur'ani) Al-Bahjah",
        quote: "Membentuk karakter Qur'ani, berpikir kritis, dan siap menghadapi tantangan.",
        description: "Santri mulai memasuki kehidupan asrama secara penuh (boarding). Kurikulum dirancang untuk memperkuat hafalan Al-Qur'an menuju target 15-20 Juz, pendalaman dasar bahasa Arab lisan & tulisan, serta pengenalan dini kajian kitab kuning bersama pengajar berpengalaman."
      },
      {
        logo: "/Logo-assets/sma-iqu-logo.png",
        name: "SMAIQu (SMA Islam Qur'ani) Al-Bahjah",
        quote: "Mempersiapkan generasi unggul untuk melanjutkan pendidikan dan berkontribusi bagi umat.",
        description: "Merupakan jenjang pemantapan hafalan Al-Qur'an 30 Juz secara mutqin, pendalaman kajian kitab kuning tingkat menengah, pelatihan kepemimpinan (Qiyadah), serta persiapan intensif menuju jenjang perguruan tinggi nasional maupun internasional (Timur Tengah)."
      }
    ]
  };

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
              {pageData?.title || "Profil Unit Pendidikan"}
            </h1>
            <p style={{ fontSize: "14px", color: "#666" }}>
              {pageData?.subtitle || "Jenjang Pendidikan Formal di Sekolah & Ponpes Al-Bahjah Cirebon"}
            </p>
          </div>

          {/* Unit List */}
          <div style={{ display: "flex", flexDirection: "column", gap: "30px" }}>
            
            {content.units?.map((unit, idx) => (
              <div key={idx} style={{ background: "#fff", padding: "24px", borderRadius: "16px", border: "1px solid #e2f0e9", display: "flex", gap: "20px", flexWrap: "wrap" }}>
                <div style={{ flex: "1", minWidth: "120px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                  <img src={unit.logo} alt={`${unit.name} Logo`} style={{ width: "90px", objectFit: "contain" }} />
                </div>
                <div style={{ flex: "4", minWidth: "250px" }}>
                  <h3 style={{ fontSize: "18px", color: "#0d6e3f", fontWeight: "700", marginBottom: "6px" }}>
                    {unit.name}
                  </h3>
                  <p style={{ fontSize: "14px", color: "#666", marginBottom: "12px", fontStyle: "italic" }}>
                    &ldquo;{unit.quote}&rdquo;
                  </p>
                  <p style={{ fontSize: "14px", color: "#444", lineHeight: "1.6" }}>
                    {unit.description}
                  </p>
                </div>
              </div>
            ))}

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
