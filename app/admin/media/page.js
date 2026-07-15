"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function MediaLibraryPage() {
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const fetchMedia = async () => {
    try {
      const res = await fetch("/api/admin/media");
      const data = await res.json();
      if (res.ok) {
        setMedia(data.media);
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError("Gagal memuat galeri media");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  const handleUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError("");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/admin/media", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (res.ok) {
        // Reload media list
        fetchMedia();
      } else {
        setError(data.error || "Gagal mengupload file");
      }
    } catch (err) {
      setError("Terjadi kesalahan saat upload");
    } finally {
      setUploading(false);
      // Reset input
      e.target.value = "";
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Yakin ingin menghapus media ini? Tindakan ini tidak bisa dibatalkan.")) return;
    
    try {
      const res = await fetch(`/api/admin/media?id=${id}`, {
        method: "DELETE",
      });
      
      if (res.ok) {
        setMedia(media.filter(m => m.id !== id));
      } else {
        const data = await res.json();
        alert(data.error || "Gagal menghapus file");
      }
    } catch (err) {
      alert("Terjadi kesalahan saat menghapus");
    }
  };

  const formatSize = (bytes) => {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
  };

  const copyToClipboard = (url) => {
    navigator.clipboard.writeText(url);
    alert("URL berhasil disalin: " + url);
  };

  return (
    <>
      <div className="adm-section-header">
        <div>
          <h2>Media Library</h2>
          <p>Kelola gambar dan video untuk digunakan di halaman website.</p>
        </div>
        <Link href="/admin" className="adm-btn adm-btn-secondary">
          Kembali ke Dashboard
        </Link>
      </div>

      {error && (
        <div style={{ padding: "12px 16px", background: "#fee2e2", color: "#b91c1c", borderRadius: "8px", marginBottom: "20px", fontSize: "14px" }}>
          {error}
        </div>
      )}

      {/* Upload Zone */}
      <div style={{ 
        border: "2px dashed #cbd5e1", 
        borderRadius: "16px", 
        padding: "40px", 
        textAlign: "center",
        marginBottom: "30px",
        background: "#f8fafc"
      }}>
        <div style={{ fontSize: "36px", marginBottom: "10px" }}>☁️</div>
        <h3 style={{ fontSize: "16px", fontWeight: "600", marginBottom: "5px" }}>Upload Media Baru</h3>
        <p style={{ fontSize: "14px", color: "#64748b", marginBottom: "20px" }}>
          Mendukung JPG, PNG, GIF, MP4. Gambar akan otomatis dioptimasi menjadi WebP.
        </p>
        <label className="adm-btn adm-btn-primary" style={{ cursor: "pointer", display: "inline-block" }}>
          {uploading ? "Mengupload..." : "Pilih File"}
          <input 
            type="file" 
            style={{ display: "none" }} 
            onChange={handleUpload} 
            accept="image/*,video/mp4" 
            disabled={uploading}
          />
        </label>
      </div>

      {/* Gallery Grid */}
      {loading ? (
        <div style={{ textAlign: "center", padding: "40px", color: "#64748b" }}>Memuat galeri...</div>
      ) : media.length === 0 ? (
        <div style={{ textAlign: "center", padding: "40px", color: "#64748b", border: "1px solid #e2e8f0", borderRadius: "16px" }}>
          Belum ada media yang diupload.
        </div>
      ) : (
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", 
          gap: "20px" 
        }}>
          {media.map((item) => (
            <div key={item.id} style={{ 
              border: "1px solid #e2e8f0", 
              borderRadius: "12px", 
              overflow: "hidden",
              background: "#fff",
              display: "flex",
              flexDirection: "column"
            }}>
              {/* Thumbnail */}
              <div style={{ height: "160px", background: "#f1f5f9", position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
                {item.mimeType.startsWith("image/") ? (
                  <img 
                    src={item.path} 
                    alt={item.originalName}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                ) : (
                  <div style={{ fontSize: "40px" }}>🎥</div>
                )}
              </div>

              {/* Info & Actions */}
              <div style={{ padding: "12px", display: "flex", flexDirection: "column", gap: "10px", flex: 1 }}>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: "13px", fontWeight: "600", color: "#334155", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", margin: 0, marginBottom: "4px" }}>
                    {item.originalName}
                  </p>
                  <p style={{ fontSize: "12px", color: "#64748b", margin: 0 }}>
                    {formatSize(item.size)} • {item.width ? `${item.width}x${item.height}` : item.mimeType}
                  </p>
                </div>
                
                <div style={{ display: "flex", gap: "8px" }}>
                  <button 
                    onClick={() => copyToClipboard(item.path)}
                    style={{ flex: 1, padding: "6px", fontSize: "12px", background: "#f1f5f9", color: "#475569", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "500" }}
                  >
                    Copy URL
                  </button>
                  <button 
                    onClick={() => handleDelete(item.id)}
                    style={{ padding: "6px 12px", fontSize: "12px", background: "#fee2e2", color: "#b91c1c", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "500" }}
                  >
                    Hapus
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
