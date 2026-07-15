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
      setPages(data);
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
