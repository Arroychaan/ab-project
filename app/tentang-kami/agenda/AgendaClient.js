"use client";

import { useState } from "react";
import Link from "next/link";

export default function AgendaClient({ pageData }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

  const content = pageData ? JSON.parse(pageData.data) : {
    agendas: [
      { time: "03:00 - 04:30", title: "Qiyamul Lail & Subuh Berjamaah", description: "Bangun pagi, mandi, shalat tahajjud berjamaah, dzikir/wirid Subuh, dan Shalat Subuh berjamaah." },
      { time: "04:30 - 06:00", title: "Halaqah Al-Qur'an Pagi", description: "Setoran hafalan baru (*ziyadah*) dan pengulangan hafalan (*muraja'ah*) bersama ustadz/ustadzah pengampu." },
      { time: "06:00 - 07:00", title: "Sarapan & Persiapan Sekolah", description: "Sarapan pagi, menjaga kebersihan asrama, dan bersiap memakai seragam sekolah formal." },
      { time: "07:00 - 12:00", title: "Sekolah Formal (SD/SMP/SMA)", description: "Kegiatan belajar mengajar mata pelajaran umum dan Diniyah (Dirosah Islamiyah) di kelas." },
      { time: "12:00 - 13:30", title: "ISHOMA & Dzuhur Berjamaah", description: "Istirahat, makan siang, dan pelaksanaan shalat Dzuhur berjamaah di masjid." },
      { time: "13:30 - 15:00", title: "Tafaqquh Fiddin / Kajian Kitab", description: "Pelajaran tambahan/kajian kitab kuning (Nahwu, Shorof, Fikih, Aqidah) bersama Asatidz." },
      { time: "15:00 - 16:00", title: "Ashar Berjamaah & Al-Ma'tsurat", description: "Shalat Ashar berjamaah dilanjutkan pembacaan wirid Al-Ma'tsurat sore." },
      { time: "16:00 - 17:00", title: "Ekstrakurikuler / Olahraga", description: "Kegiatan bebas, olahraga (futsal, memanah, bela diri), ekskul, atau bersih-bersih sore (mandi)." },
      { time: "17:00 - 18:00", title: "Persiapan Maghrib & Halaqah", description: "Makan malam (bagi sebagian jenjang), persiapan ke masjid, dan Halaqah Al-Qur'an Sore." },
      { time: "18:00 - 19:30", title: "Maghrib, Isya & Kajian Malam", description: "Shalat Maghrib, kajian malam singkat (Tausiyah), dilanjutkan Shalat Isya berjamaah." },
      { time: "19:30 - 21:00", title: "Belajar Mandiri (Mudzakarah)", description: "Belajar mengulang pelajaran sekolah, mengerjakan PR, atau setoran hafalan mandiri di asrama." },
      { time: "21:00 - 03:00", title: "Istirahat Malam (Tidur)", description: "Adab sebelum tidur, lampu dimatikan, dan istirahat total untuk persiapan bangun tahajjud." }
    ],
    closing: "Catatan: Jadwal di atas adalah gambaran umum rutinitas harian santri *boarding* tingkat SMP dan SMA. Terdapat penyesuaian jadwal khusus untuk jenjang SD dan pada hari libur (Ahad)."
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
              Agenda Harian Santri
            </h1>
            <p style={{ fontSize: "14px", color: "#666" }}>
              Rutinitas Harian Pembentukan Karakter Qur&apos;ani & Disiplin
            </p>
          </div>

          {/* Daily Schedule Timeline */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px", paddingLeft: "10px" }}>
            
            {content.agendas?.map((agenda, idx) => (
              <div key={idx} style={{ display: "flex", gap: "16px", borderLeft: "3px solid #0d6e3f", paddingLeft: "20px", position: "relative", paddingBottom: idx === content.agendas.length - 1 ? "0" : "15px" }}>
                <div style={{ 
                  position: "absolute", 
                  left: "-8px", 
                  top: "0", 
                  width: "13px", 
                  height: "13px", 
                  borderRadius: "50%", 
                  background: "#0d6e3f" 
                }}></div>
                <div style={{ fontWeight: "700", color: "#0d6e3f", minWidth: "110px", fontSize: "14.5px" }}>
                  {agenda.time}
                </div>
                <div style={{ fontSize: "14.5px", color: "#333" }}>
                  <strong style={{ color: "#0d6e3f" }}>{agenda.title}</strong>
                  <p style={{ fontSize: "13.5px", color: "#666", marginTop: "4px" }}>{agenda.description}</p>
                </div>
              </div>
            ))}

          </div>

          {/* Note */}
          <div style={{ background: "#eef6f2", padding: "16px 20px", borderRadius: "12px", border: "1px dashed #0d6e3f", marginTop: "10px" }}>
            <p style={{ fontSize: "13.5px", color: "#0d6e3f", fontStyle: "italic", margin: 0, fontWeight: "500", textAlign: "center" }}>
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
