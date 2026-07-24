"use client";

import React from "react";
import "./UniversityMarquee.css";

const universities = [
  { name: "UNISSULA", img: "unissula.png" },
  { name: "UNSRI", img: "unsri.png" },
  { name: "IPB", img: "ipb.png" },
  { name: "Telkom University", img: "telkom.png" },
  { name: "UGJ", img: "ugj.png" },
  { name: "UIN Syekh Nurjati", img: "uin-syekh-nurjati.png" },
  { name: "UNPARI Palembang", img: "unpari.png" },
  { name: "UIN Gus Dur Pekalongan", img: "uin-gus-dur.png" },
  { name: "Universitas Tazkia Bogor", img: "tazkia.png" }
];

export default function UniversityMarquee() {
  return (
    <section className="marquee-section">
      <div className="marquee-header">
        <p className="marquee-subtitle">ALUMNI KAMI MELANJUTKAN KE</p>
        <h2 className="marquee-title">Perguruan Tinggi Terbaik</h2>
      </div>
      
      <div className="marquee-container">
        <div className="marquee-track">
          {/* Duplicating the list to create an infinite loop effect */}
          {[...universities, ...universities].map((uni, index) => (
            <div key={index} className="marquee-logo-card">
              <img 
                src={`/Logo-assets/${uni.img}`} 
                alt={`Logo ${uni.name}`}
                className="marquee-real-logo"
                onError={(e) => {
                  // Fallback if image doesn't exist yet
                  e.target.style.display = 'none';
                  e.target.nextElementSibling.style.display = 'flex';
                }}
              />
              <div className="marquee-fallback-content" style={{ display: 'none' }}>
                <div className="marquee-logo-icon">🎓</div>
                <span className="marquee-logo-text">{uni.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
