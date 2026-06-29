"use client";

import { useRef, useEffect, useState } from "react";

export default function Home() {
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch((err) => {
              console.log("Autoplay was prevented by browser policy:", err);
            });
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  return (
    <div className="app-container">
      {/* ============ NAVBAR ============ */}
      <nav className="navbar">
        <div className="navbar-logo">
          <img
            src="/Logo-assets/Logo-Albahjah.png?v=3"
            alt="Logo Al-Bahjah"
            className="navbar-logo-img"
          />
        </div>

        <div className="navbar-links">
          <a href="#" className="active">Beranda</a>
          <a href="#">Tentang Kami</a>
          <a href="#">Sekolah</a>
          <a href="#">Program</a>
          <a href="#">Berita</a>
          <a href="#">Kontak</a>
        </div>

        <button className="navbar-cta">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
          Diskusi Personal
        </button>
      </nav>

      {/* ============ HERO SECTION ============ */}
      <section className="hero">
        <div className="hero-container">
          <div className="hero-bg-left"></div>
          
          <div className="hero-left">
            <div className="hero-left-content">
              <h2>Al Bahjah <br />Cabang Cirebon 1</h2>
              <p>Membentuk generasi Qur&apos;ani, berakhlak mulia, berilmu dan berprestasi untuk masa depan yang lebih baik.</p>
              <button className="hero-btn">
                <span className="hero-btn-play-icon">
                  <svg viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>
                Kenal Lebih Dekat
              </button>
            </div>
          </div>
          
          <div className="hero-right">
            <div className="hero-video-frame">
              <video
                ref={videoRef}
                src="/design-assets/video-asset.mp4"
                muted={isMuted}
                loop
                playsInline
                autoPlay
                preload="none"
                aria-label="Video Al-Bahjah"
              />
              
              {/* Floating Mute/Unmute toggle button */}
              <button 
                className="video-mute-btn" 
                onClick={toggleMute}
                aria-label={isMuted ? "Unmute Video" : "Mute Video"}
                title={isMuted ? "Suarakan Video" : "Bisukan Video"}
              >
                {isMuted ? (
                  // Mute Icon
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M11 5L6 9H2v6h4l5 4V5z"/>
                    <line x1="23" y1="9" x2="17" y2="15"/>
                    <line x1="17" y1="9" x2="23" y2="15"/>
                  </svg>
                ) : (
                  // Unmute/Volume Up Icon
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M11 5L6 9H2v6h4l5 4V5z"/>
                    <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/>
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ============ SCHOOL SECTION ============ */}
      <section className="school-section">
        <h2 className="school-section-title">Pilih Tingkatan Sekolah yang Anda Cari</h2>
        <div className="school-section-divider">
          <span className="line"></span>
          <span className="dot"></span>
          <span className="line"></span>
        </div>

        <div className="school-cards">
          {/* SDIQU Card */}
          <div className="school-card sdiqu">
            <div className="school-card-logo">
              <img
                src="/Logo-assets/sd-iqu-logo.png?v=3"
                alt="Logo SDIQU"
              />
            </div>
            <p className="school-card-desc">
              Membangun dasar keimanan, akhlak mulia, dan semangat belajar sejak dini.
            </p>
            <button className="school-card-btn">
              Lihat Detail
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" />
                <path d="M12 5l7 7-7 7" />
              </svg>
            </button>
            <img
              src="/design-assets/bag-sd.png"
              alt="SD Deco"
              className="school-card-bg-illust"
            />
          </div>

          {/* SMPIQU Card */}
          <div className="school-card smpiqu">
            <div className="school-card-logo">
              <img
                src="/Logo-assets/smp-iqu-logo.png?v=3"
                alt="Logo SMPIQu"
              />
            </div>
            <p className="school-card-desc">
              Membentuk karakter Qur&apos;ani, berpikir kritis, dan siap menghadapi tantangan.
            </p>
            <button className="school-card-btn">
              Lihat Detail
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" />
                <path d="M12 5l7 7-7 7" />
              </svg>
            </button>
            <img
              src="/design-assets/masjid-smp.png"
              alt="SMP Deco"
              className="school-card-bg-illust"
            />
          </div>

          {/* SMAIQU Card */}
          <div className="school-card smaiqu">
            <div className="school-card-logo">
              <img
                src="/Logo-assets/sma-iqu-logo.png?v=3"
                alt="Logo SMAIQu"
              />
            </div>
            <p className="school-card-desc">
              Mempersiapkan generasi unggul untuk melanjutkan pendidikan dan berkontribusi bagi umat.
            </p>
            <button className="school-card-btn">
              Lihat Detail
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" />
                <path d="M12 5l7 7-7 7" />
              </svg>
            </button>
            <img
              src="/design-assets/piala-sma.png"
              alt="SMA Deco"
              className="school-card-bg-illust"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
