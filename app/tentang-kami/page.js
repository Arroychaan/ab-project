"use client";

import Link from "next/link";

export default function TentangKami() {
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
          <Link href="/tentang-kami" className="active">Tentang Kami</Link>
          <a href="#">Sekolah</a>
          <a href="#">Program</a>
          <a href="#">Berita</a>
          <a href="#">Kontak</a>
        </div>

        <button className="navbar-cta">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
          Hubungi Kami
        </button>
      </nav>

      {/* ============ CONTENT SECTION ============ */}
      <section style={{ 
        padding: "80px 20px", 
        display: "flex", 
        flexDirection: "column", 
        alignItems: "center", 
        justifyContent: "center",
        minHeight: "60vh",
        textAlign: "center",
        background: "#f4faf7",
        margin: "24px 60px",
        borderRadius: "24px",
        position: "relative",
        overflow: "hidden"
      }}>
        {/* Decorative background similar to hero */}
        <div style={{
          position: "absolute",
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundImage: "url('/design-assets/hero-pattern.png')",
          backgroundRepeat: "repeat",
          backgroundSize: "200px",
          opacity: 0.04,
          pointerEvents: "none"
        }}></div>

        <h1 style={{ 
          fontSize: "36px", 
          color: "#0d6e3f", 
          fontWeight: "700", 
          marginBottom: "16px",
          zIndex: 2
        }}>
          Tentang Kami
        </h1>
        
        <p style={{ 
          fontSize: "16px", 
          color: "#555", 
          maxWidth: "600px", 
          lineHeight: "1.6",
          marginBottom: "32px",
          zIndex: 2
        }}>
          Halaman Tentang Kami sedang dalam tahap pengembangan. Di sini nantinya Anda akan menemukan informasi lengkap mengenai sejarah, visi, misi, dan nilai-nilai luhur dari Sekolah & Ponpes Al-Bahjah.
        </p>

        <Link href="/" className="hero-btn" style={{ textDecoration: "none", zIndex: 2 }}>
          Kembali ke Beranda
        </Link>
      </section>
    </div>
  );
}
