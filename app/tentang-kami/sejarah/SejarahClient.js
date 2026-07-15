"use client";

import { useState } from "react";
import Link from "next/link";

export default function SejarahClient({ pageData }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

  const content = pageData ? JSON.parse(pageData.data) : {
    intro: "Lembaga Pengembangan Dakwah (LPD) Al-Bahjah Cirebon didirikan oleh Buya Yahya...",
    timeline: [],
    closing: ""
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
              {pageData?.title || "Sejarah & Profil Yayasan"}
            </h1>
            <p style={{ fontSize: "14px", color: "#666", fontStyle: "italic" }}>
              {pageData?.subtitle || "Perjalanan LPD Al-Bahjah Cirebon dari Masa ke Masa"}
            </p>
          </div>

          {/* Intro */}
          <div style={{ background: "#fff", padding: "24px", borderRadius: "16px", borderLeft: "5px solid #0d6e3f" }}>
            <p style={{ fontSize: "15px", color: "#444", lineHeight: "1.7", margin: 0 }}>
              {content.intro}
            </p>
          </div>

          {/* Timeline Section */}
          <div style={{ marginTop: "16px" }}>
            <h2 style={{ fontSize: "20px", color: "#1e293b", fontWeight: "700", marginBottom: "20px", display: "flex", alignItems: "center", gap: "10px" }}>
              <span style={{ background: "#0d6e3f", color: "#fff", width: "32px", height: "32px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px" }}>
                ⏳
              </span>
              Timeline Perjalanan
            </h2>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "20px", position: "relative" }}>
              
              {/* Vertical line */}
              <div style={{ position: "absolute", left: "23px", top: "10px", bottom: "10px", width: "2px", background: "#d1e8dc", zIndex: 1 }} />

              {content.timeline?.map((item, idx) => (
                <div key={idx} style={{ display: "flex", gap: "20px", position: "relative", zIndex: 2 }}>
                  <div style={{ 
                    width: "48px", 
                    height: "48px", 
                    borderRadius: "50%", 
                    background: "#0d6e3f", 
                    color: "#fff",
                    display: "flex", 
                    alignItems: "center", 
                    justifyContent: "center",
                    fontWeight: "700",
                    flexShrink: 0,
                    border: "4px solid #f4faf7"
                  }}>
                    {idx + 1}
                  </div>
                  <div style={{ background: "#fff", padding: "20px", borderRadius: "16px", flex: "1", boxShadow: "0 4px 15px rgba(0,0,0,0.03)", border: "1px solid #e2f0e9" }}>
                    <span style={{ display: "inline-block", background: "#d1e8dc", color: "#0d6e3f", fontSize: "11px", fontWeight: "600", padding: "4px 10px", borderRadius: "20px", marginBottom: "8px" }}>
                      {item.badge}
                    </span>
                    <h3 style={{ fontSize: "17px", color: "#1e293b", fontWeight: "700", marginBottom: "8px" }}>
                      {item.title}
                    </h3>
                    <p style={{ fontSize: "14px", color: "#555", lineHeight: "1.6", margin: 0 }}>
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Closing Summary */}
          <div style={{ background: "linear-gradient(135deg, #0d6e3f, #15803d)", color: "#fff", padding: "24px", borderRadius: "16px", marginTop: "16px", textAlign: "center" }}>
            <p style={{ fontSize: "15px", lineHeight: "1.7", margin: 0, fontWeight: "500" }}>
              {content.closing}
            </p>
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
