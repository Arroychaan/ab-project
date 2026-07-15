"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";

const pages = [
  {
    slug: "sambutan",
    title: "Sambutan Pengasuh",
    description: "Teks sambutan, foto, nama & jabatan Buya Yahya",
    icon: "💬",
    route: "/tentang-kami/sambutan",
  },
  {
    slug: "sejarah",
    title: "Sejarah & Profil Yayasan",
    description: "Narasi sejarah dan timeline perjalanan Al-Bahjah",
    icon: "🕰️",
    route: "/tentang-kami/sejarah",
  },
  {
    slug: "visi-misi",
    title: "Visi, Misi & 3 Pilar",
    description: "Visi, misi, dan tiga pilar pendidikan Al-Bahjah",
    icon: "👁️",
    route: "/tentang-kami/visi-misi",
  },
  {
    slug: "unit",
    title: "Profil Unit Pendidikan",
    description: "SDIQu, SMPIQu, SMAIQu — logo, tagline, deskripsi",
    icon: "🏫",
    route: "/tentang-kami/unit",
  },
  {
    slug: "agenda",
    title: "Agenda Harian Santri",
    description: "Timeline jadwal harian dari subuh hingga malam",
    icon: "📅",
    route: "/tentang-kami/agenda",
  },
];

export default function AdminDashboard() {
  const { data: session } = useSession();
  const [stats, setStats] = useState({ pages: 5, admins: 0, media: 0 });

  useEffect(() => {
    // Fetch stats from API (akan diimplementasi di Fase 2)
    async function fetchStats() {
      try {
        const res = await fetch("/api/admin/stats");
        if (res.ok) {
          const data = await res.json();
          setStats(data);
        }
      } catch {
        // Fallback to default stats
      }
    }
    fetchStats();
  }, []);

  return (
    <>
      {/* Welcome */}
      <div style={{ marginBottom: "28px" }}>
        <h1 style={{ fontSize: "24px", fontWeight: "700", color: "#1e293b", marginBottom: "4px" }}>
          Assalamu&apos;alaikum, {session?.user?.name || "Admin"} 👋
        </h1>
        <p style={{ fontSize: "14px", color: "#64748b" }}>
          Kelola konten website Al-Bahjah dari panel ini.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="adm-dashboard-grid">
        <div className="adm-stat-card">
          <div className="adm-stat-icon green">📄</div>
          <div className="adm-stat-info">
            <h3>{stats.pages}</h3>
            <p>Halaman Dikelola</p>
          </div>
        </div>
        <div className="adm-stat-card">
          <div className="adm-stat-icon blue">👥</div>
          <div className="adm-stat-info">
            <h3>{stats.admins}</h3>
            <p>Admin Terdaftar</p>
          </div>
        </div>
        <Link href="/admin/media" className="adm-stat-card" style={{ textDecoration: "none" }}>
          <div className="adm-stat-icon purple">🖼️</div>
          <div className="adm-stat-info">
            <h3 style={{ color: "#1e293b" }}>{stats.media}</h3>
            <p style={{ color: "#64748b" }}>File Media (Klik untuk Kelola)</p>
          </div>
        </Link>
      </div>

      {/* Pages List */}
      <div className="adm-section-header">
        <div>
          <h2>Kelola Halaman</h2>
          <p>Pilih halaman yang ingin diedit kontennya</p>
        </div>
      </div>

      <div className="adm-page-list">
        {pages.map((page) => (
          <Link
            key={page.slug}
            href={`/admin/edit/${page.slug}`}
            className="adm-page-card"
          >
            <div className="adm-page-card-left">
              <div className="adm-page-card-icon">{page.icon}</div>
              <div className="adm-page-card-info">
                <h3>{page.title}</h3>
                <p>{page.description}</p>
              </div>
            </div>
            <svg className="adm-page-card-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </Link>
        ))}
      </div>
    </>
  );
}
