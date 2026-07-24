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
  { name: "UNPARI", fullname: "Universitas PGRI Silampari", img: "/Logo-assets/unpari.svg" },
  { name: "UIN Gus Dur", fullname: "UIN K.H. Abdurrahman Wahid Pekalongan", img: "/Logo-assets/uin-gus-dur.png" },
  { name: "Universitas Tazkia", fullname: "Institut Agama Islam Tazkia", img: "/Logo-assets/tazkia.png" }
];

export default function UniversityMarquee() {
  return (
    <section className="uni-marquee-section">
      <div className="uni-marquee-header">
        <div className="uni-marquee-badge">
          <span className="uni-badge-dot"></span>
          ALUMNI KAMI MELANJUTKAN KE
        </div>
        <h2 className="uni-marquee-title">Perguruan Tinggi & Universitas Terkemuka</h2>
      </div>

      <div className="uni-marquee-container">
        <div className="uni-marquee-track">
          {/* Repeated 3 times for seamless endless loop */}
          {[...universities, ...universities, ...universities].map((uni, idx) => (
            <div className="uni-logo-item" key={idx} title={`${uni.name} - ${uni.fullname}`}>
              <img 
                src={uni.img} 
                alt={`Logo ${uni.name}`} 
                className="uni-logo-image" 
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
