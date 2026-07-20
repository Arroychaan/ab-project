"use client";

import { useState, useEffect, useRef } from "react";
import { toast } from "react-hot-toast";

export default function MediaManager() {
  const [files, setFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  const fetchMedia = async () => {
    try {
      const res = await fetch("/api/admin/media");
      const data = await res.json();
      if (Array.isArray(data)) setFiles(data);
    } catch (e) {
      toast.error("Gagal memuat galeri");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    const toastId = toast.loading("Mengunggah gambar...");

    try {
      const res = await fetch("/api/admin/media", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        toast.success("Gambar berhasil diunggah!", { id: toastId });
        fetchMedia(); // Refresh list
      } else {
        let errorMessage = `Upload failed (${res.status})`;
        try {
          const errorData = await res.json();
          errorMessage = errorData.error || errorMessage;
        } catch {
          errorMessage = await res.text() || errorMessage;
        }
        toast.error(errorMessage, { id: toastId });
      }
    } catch (e) {
      toast.error(e.message || e.toString() || "Terjadi kesalahan sistem", { id: toastId });
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Hapus gambar ini permanen?")) return;
    const toastId = toast.loading("Menghapus...");
    try {
      const res = await fetch(`/api/admin/media/${id}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Dihapus!", { id: toastId });
        setFiles(files.filter(f => f.id !== id));
      } else {
        let errorMessage = `Gagal menghapus (${res.status})`;
        try {
          const errorData = await res.json();
          errorMessage = errorData.error || errorMessage;
        } catch {
          errorMessage = await res.text() || errorMessage;
        }
        toast.error(errorMessage, { id: toastId });
      }
    } catch (e) {
      toast.error(e.message || e.toString() || "Error", { id: toastId });
    }
  };

  const copyUrl = (url) => {
    navigator.clipboard.writeText(url);
    toast.success("URL Gambar disalin!");
  };

  return (
    <>
      <div className="adm-section-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h2>Galeri Media</h2>
          <p>Unggah dan kelola gambar untuk website Anda.</p>
        </div>
        <div>
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleUpload} 
            style={{ display: 'none' }} 
            accept="image/*"
          />
          <button 
            className="adm-btn adm-btn-primary" 
            onClick={() => fileInputRef.current.click()}
            disabled={isUploading}
          >
            {isUploading ? "Mengunggah..." : "+ Unggah Gambar Baru"}
          </button>
        </div>
      </div>

      <div className="adm-card">
        {isLoading ? (
          <p>Memuat galeri...</p>
        ) : files.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>
            Belum ada media yang diunggah.
          </div>
        ) : (
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", 
            gap: "20px" 
          }}>
            {files.map((file) => (
              <div key={file.id} style={{ 
                border: "1px solid #e2e8f0", 
                borderRadius: "12px", 
                overflow: "hidden",
                display: "flex",
                flexDirection: "column"
              }}>
                <div style={{ 
                  height: "150px", 
                  backgroundColor: "#f1f5f9",
                  backgroundImage: `url(${file.path})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center"
                }} />
                <div style={{ padding: "12px", display: "flex", flexDirection: "column", gap: "8px", flex: 1, backgroundColor: "white" }}>
                  <p style={{ fontSize: "12px", color: "#64748b", margin: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {file.originalName}
                  </p>
                  <div style={{ display: "flex", gap: "8px", marginTop: "auto" }}>
                    <button 
                      type="button"
                      onClick={() => copyUrl(file.path)} 
                      className="adm-btn" 
                      style={{ flex: 1, padding: "6px", fontSize: "12px", backgroundColor: "#f1f5f9", color: "#334155" }}
                    >
                      Copy URL
                    </button>
                    <button 
                      type="button"
                      onClick={() => handleDelete(file.id)} 
                      className="adm-btn" 
                      style={{ padding: "6px", fontSize: "12px", backgroundColor: "#fef2f2", color: "#ef4444" }}
                    >
                      Hapus
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
