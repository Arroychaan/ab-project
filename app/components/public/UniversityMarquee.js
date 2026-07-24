"use client";

import React from "react";
import "./UniversityMarquee.css";

const universities = [
  { name: "UNISSULA", fullname: "Universitas Islam Sultan Agung", img: "/Logo-assets/unissula.png" },
  { name: "UNSRI", fullname: "Universitas Sriwijaya", img: "/Logo-assets/unsri.png" },
  { name: "IPB University", fullname: "Institut Pertanian Bogor", img: "/Logo-assets/ipb.png" },
  { name: "Telkom University", fullname: "Universitas Telkom", img: "/Logo-assets/telkom.png" },
  { name: "UGJ", fullname: "Universitas Swadaya Gunung Djati", img: "/Logo-assets/ugj.png" },
  { name: "UIN Syekh Nurjati", fullname: "UIN Siber Syekh Nurjati Cirebon", img: "/Logo-assets/uin-syekh-nurjati.png" },
  { name: "UNPARI", fullname: "Universitas PGRI Silampari", img: "/Logo-assets/unpari.png" },
  { name: "UIN Gus Dur", fullname: "UIN K.H. Abdurrahman Wahid Pekalongan", img: "/Logo-assets/uin-gus-dur.png" },
  { name: "Universitas Tazkia", fullname: "Institut Agama Islam Tazkia", img: "/Logo-assets/tazkia.png" }
];

export default function UniversityMarquee() {
  return (
    <section className="uni-marquee-section">
      <div className="uni-marquee-header">
        <span className="uni-marquee-badge">ALUMNI KAMI MELANJUTKAN KE</span>
        <h2 className="uni-marquee-title">Perguruan Tinggi & Universitas Terkemuka</h2>
        <p className="uni-marquee-desc">Lulusan Al-Bahjah telah tersebar di berbagai Perguruan Tinggi Negeri dan Swasta Favorit di Indonesia.</p>
      </div>

      <div className="uni-marquee-wrapper">
        <div className="uni-marquee-track">
          {/* Triple array loop to guarantee seamless infinite scroll on wide screens */}
          {[...universities, ...universities, ...universities].map((uni, idx) => (
            <div className="uni-logo-card" key={idx} title={`${uni.name} - ${uni.fullname}`}>
              <div className="uni-logo-img-wrapper">
                <img 
                  src={uni.img} 
                  alt={`Logo ${uni.name}`} 
                  className="uni-logo-img" 
                  loading="lazy"
                />
              </div>
              <div className="uni-logo-info">
                <span className="uni-logo-name">{uni.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
