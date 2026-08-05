"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { toast } from "react-hot-toast";

export default function PagesList() {
  const [pages, setPages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPages = async () => {
    try {
      const res = await fetch("/api/admin/page");
      const data = await res.json();
      if (res.ok && Array.isArray(data)) {
        setPages(data);
      } else {
        toast.error(data.error || "Gagal mengambil daftar halaman");
      }
    } catch (e) {
      toast.error("Gagal mengambil daftar halaman");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPages();
  }, []);

  const handleDelete = async (slug) => {
    if (!confirm(`Yakin ingin menghapus halaman '/${slug}'? Data tidak bisa dikembalikan!`)) return;
    try {
      const res = await fetch(`/api/admin/page/${slug}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Halaman berhasil dihapus");
        fetchPages();
      } else {
        toast.error("Gagal menghapus halaman");
      }
    } catch (e) {
      toast.error("Terjadi kesalahan server");
    }
  };

  if (isLoading) return <div style={{ padding: "40px" }}>Memuat halaman...</div>;

  return (
    <>
      <div className="adm-section-header">
        <div>
          <h2>Dynamic Pages (CMS)</h2>
          <p>Kelola semua halaman kustom website Anda.</p>
        </div>
        <Link href="/admin/pages/create" className="adm-btn adm-btn-primary">
          + Buat Halaman Baru
        </Link>
      </div>

      {/* Seksi Pintasan Cepat Halaman Institusi Sekolah */}
      <div className="adm-card" style={{ background: "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)", border: "1px solid #bbf7d0", marginBottom: "28px", padding: "20px 24px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
          <div>
            <h3 style={{ margin: 0, color: "#166534", fontSize: "16px", display: "flex", alignItems: "center", gap: "8px" }}>
              🏫 Halaman Khusus Institusi Sekolah (SDIQu, SMPIQu, SMAIQu)
            </h3>
            <p style={{ margin: "4px 0 0 0", fontSize: "13px", color: "#15803d" }}>
              Pintasan cepat untuk merakit dan mengedit halaman utama jenjang sekolah Al-Bahjah Cirebon.
            </p>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "16px" }}>
          {[
            { slug: "sdiqu", name: "SDIQu Al-Bahjah", desc: "Sekolah Dasar Islam Qur'ani", color: "#16a34a", logo: "/Logo-assets/sd-iqu-logo.png" },
            { slug: "smpiqu", name: "SMPIQu Al-Bahjah", desc: "SMP Islam Qur'ani Boarding", color: "#2563eb", logo: "/Logo-assets/smp-iqu-logo.png" },
            { slug: "smaiqu", name: "SMAIQu Al-Bahjah", desc: "SMA Islam Qur'ani Boarding", color: "#7c3aed", logo: "/Logo-assets/sma-iqu-logo.png" },
          ].map((item) => (
            <div key={item.slug} style={{ backgroundColor: "white", padding: "16px", borderRadius: "12px", border: "1px solid #cbd5e1", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px" }}>
              <img src={item.logo} alt={item.name} style={{ width: "40px", height: "40px", objectFit: "contain" }} onError={(e) => { e.target.style.display = "none"; }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <h4 style={{ margin: 0, fontSize: "14px", color: "#1e293b" }}>{item.name}</h4>
                <span style={{ fontSize: "12px", color: "#64748b" }}>/{item.slug}</span>
              </div>
              <div style={{ display: "flex", gap: "6px" }}>
                <a href={`/${item.slug}`} target="_blank" rel="noopener noreferrer" className="adm-btn adm-btn-secondary" style={{ padding: "6px 10px", fontSize: "12px" }} title="Lihat Web">
                  👁️
                </a>
                <Link href={`/admin/pages/${item.slug}`} className="adm-btn adm-btn-primary" style={{ padding: "6px 12px", fontSize: "12px", backgroundColor: item.color, borderColor: item.color }}>
                  ✏️ Rakit
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="adm-card">
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
          <thead>
            <tr style={{ borderBottom: "2px solid #e2e8f0", color: "#64748b", fontSize: "14px" }}>
              <th style={{ padding: "16px 8px" }}>Judul Halaman</th>
              <th style={{ padding: "16px 8px" }}>URL (Slug)</th>
              <th style={{ padding: "16px 8px" }}>Layout</th>
              <th style={{ padding: "16px 8px" }}>Tgl Dibuat</th>
              <th style={{ padding: "16px 8px", textAlign: "right" }}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {pages.map((page) => (
              <tr key={page.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                <td style={{ padding: "16px 8px", fontWeight: "600", color: "#1e293b" }}>{page.title}</td>
                <td style={{ padding: "16px 8px", color: "#3b82f6" }}>/{page.slug}</td>
                <td style={{ padding: "16px 8px" }}>
                  <span style={{ backgroundColor: "#f1f5f9", padding: "4px 8px", borderRadius: "8px", fontSize: "12px", fontWeight: "600" }}>
                    {page.layout}
                  </span>
                </td>
                <td style={{ padding: "16px 8px", color: "#64748b", fontSize: "14px" }}>
                  {new Date(page.createdAt).toLocaleDateString("id-ID")}
                </td>
                <td style={{ padding: "16px 8px", textAlign: "right" }}>
                  <div style={{ display: "flex", gap: "8px", justifyContent: "flex-end" }}>
                    <a href={`/${page.slug}`} target="_blank" rel="noopener noreferrer" className="adm-btn adm-btn-secondary" style={{ padding: "6px 12px", fontSize: "12px" }}>
                      Lihat
                    </a>
                    <Link href={`/admin/pages/${page.slug}`} className="adm-btn adm-btn-primary" style={{ padding: "6px 12px", fontSize: "12px", backgroundColor: "#3b82f6", boxShadow: "none" }}>
                      Edit
                    </Link>
                    <button onClick={() => handleDelete(page.slug)} className="adm-btn adm-btn-secondary" style={{ padding: "6px 12px", fontSize: "12px", color: "#ef4444", borderColor: "#fca5a5" }}>
                      Hapus
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {pages.length === 0 && (
              <tr>
                <td colSpan="5" style={{ padding: "40px", textAlign: "center", color: "#64748b" }}>
                  Belum ada halaman yang dibuat. Silakan buat halaman baru.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
