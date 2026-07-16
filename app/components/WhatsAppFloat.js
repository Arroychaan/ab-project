"use client";

import { useRef, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import lottie from "lottie-web";

export default function WhatsAppFloat() {
  const pathname = usePathname();
  const lottieRef = useRef(null);
  const animInstance = useRef(null);
  const [showPopup, setShowPopup] = useState(false);
  const [waLink, setWaLink] = useState("https://whatsapp.com/channel/0029VbBbIRWJkK74Ms899h1j");

  useEffect(() => {
    fetch("/api/public/settings")
      .then(res => res.json())
      .then(data => {
        if(data && data.wa_link) setWaLink(data.wa_link);
      })
      .catch(err => console.error(err));
  }, []);


  useEffect(() => {
    if (lottieRef.current && !animInstance.current) {
      animInstance.current = lottie.loadAnimation({
        container: lottieRef.current,
        renderer: "svg",
        loop: true,
        autoplay: true,
        path: "/Logo-assets/Whatsapp-icon.json",
      });
    }

    return () => {
      if (animInstance.current) {
        animInstance.current.destroy();
        animInstance.current = null;
      }
    };
  }, []);

  // Close popup on Escape key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") setShowPopup(false);
    };
    if (showPopup) {
      document.addEventListener("keydown", handleEsc);
    }
    return () => document.removeEventListener("keydown", handleEsc);
  }, [showPopup]);

  const handleOpen = () => setShowPopup(true);
  const handleClose = () => setShowPopup(false);
  const handleConfirm = () => {
    window.open(waLink, "_blank", "noopener,noreferrer");
    setShowPopup(false);
  };

  // Jangan tampilkan di halaman admin
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <>
      {/* Floating WhatsApp Button */}
      <button
        className="wa-float-btn"
        onClick={handleOpen}
        aria-label="WhatsApp Channel"
        title="Gabung Saluran WhatsApp Kami"
      >
        <div ref={lottieRef} className="wa-float-lottie" />
      </button>

      {/* Popup Overlay */}
      {showPopup && (
        <div className="wa-popup-overlay" onClick={handleClose}>
          <div className="wa-popup-card" onClick={(e) => e.stopPropagation()}>
            {/* Close button */}
            <button className="wa-popup-close" onClick={handleClose} aria-label="Tutup">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {/* Channel Logo */}
            <div className="wa-popup-logo">
              <img
                src="/Logo-assets/logo-channel-saluran.png"
                alt="Logo Saluran WhatsApp Al-Bahjah"
              />
            </div>

            {/* Info */}
            <h3 className="wa-popup-title">Saluran WhatsApp Resmi</h3>
            <p className="wa-popup-subtitle">Sekolah & Ponpes Al-Bahjah</p>

            {/* Verified Badge */}
            <div className="wa-popup-badge">
              <svg viewBox="0 0 24 24" fill="none" width="18" height="18">
                <circle cx="12" cy="12" r="10" fill="#0d6e3f" />
                <path d="M9 12l2 2 4-4" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>Saluran Resmi & Terverifikasi</span>
            </div>

            <p className="wa-popup-desc">
              Dapatkan informasi terkini seputar kegiatan, pengumuman, dan berita terbaru langsung dari saluran resmi Al-Bahjah. Saluran ini <strong>aman</strong>, <strong>resmi</strong>, dan selalu <strong>terupdate</strong>.
            </p>

            {/* Action Buttons */}
            <div className="wa-popup-actions">
              <button className="wa-popup-btn-confirm" onClick={handleConfirm}>
                <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.019-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.955 9.955 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18a8 8 0 01-4.106-1.126l-.294-.176-2.893.86.86-2.893-.176-.294A8 8 0 1112 20z" />
                </svg>
                Gabung Saluran
              </button>
              <button className="wa-popup-btn-cancel" onClick={handleClose}>
                Batal
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
