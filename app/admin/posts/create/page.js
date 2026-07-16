"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import dynamic from "next/dynamic";
import AIAssistant from "@/app/components/admin/AIAssistant";
import "react-quill-new/dist/quill.snow.css";
import Link from "next/link";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

export default function CreatePost() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    thumbnail: "",
    content: "",
    published: true,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const generateSlug = (text) => {
    return text.toString().toLowerCase().trim()
      .replace(/\s+/g, '-')
      .replace(/[^\w\-]+/g, '')
      .replace(/\-\-+/g, '-');
  };

  const handleTitleChange = (e) => {
    const title = e.target.value;
    setFormData({ ...formData, title, slug: generateSlug(title) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.slug || !formData.content) {
      toast.error("Judul, Slug, dan Konten harus diisi!");
      return;
    }

    setIsSubmitting(true);
    const toastId = toast.loading("Menyimpan berita...");

    try {
      const res = await fetch("/api/admin/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success("Berita berhasil diterbitkan!", { id: toastId });
        router.push("/admin/posts");
        router.refresh();
      } else {
        toast.error(data.error || "Gagal menyimpan", { id: toastId });
      }
    } catch (error) {
      toast.error("Terjadi kesalahan sistem", { id: toastId });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="adm-section-header">
        <Link href="/admin/posts" className="adm-btn" style={{ marginBottom: "16px", display: "inline-block" }}>
          ← Kembali
        </Link>
        <h2>Tulis Berita Baru</h2>
        <p>Gunakan visual editor untuk menulis berita yang menarik.</p>
      </div>

      <form onSubmit={handleSubmit} className="adm-card" style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
          <div className="adm-form-group">
            <label>Judul Berita</label>
            <input 
              type="text" 
              placeholder="Contoh: Penerimaan Santri Baru 2026"
              value={formData.title} 
              onChange={handleTitleChange} 
              required
            />
          </div>
          
          <div className="adm-form-group">
            <label>Slug URL (Otomatis)</label>
            <input 
              type="text" 
              value={formData.slug} 
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })} 
              required
            />
            <small style={{ color: "#64748b", marginTop: "4px", display: "block" }}>
              Link: /berita/{formData.slug || "..."}
            </small>
          </div>
        </div>

        <div className="adm-form-group">
          <label>URL Gambar Thumbnail (Opsional)</label>
          <input 
            type="text" 
            placeholder="Paste URL gambar dari Media Library..."
            value={formData.thumbnail} 
            onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })} 
          />
          {formData.thumbnail && (
            <img src={formData.thumbnail} alt="Preview" style={{ marginTop: "12px", height: "150px", borderRadius: "8px", objectFit: "cover" }} />
          )}
        </div>

        <hr style={{ border: 0, borderTop: "1px dashed #cbd5e1", margin: "16px 0" }} />

        <AIAssistant 
          isDevMode={false} 
          currentContent={formData.content}
          onApplyText={(text) => setFormData({ ...formData, content: text })}
        />

        <div className="adm-form-group" style={{ flex: 1, minHeight: "400px", display: "flex", flexDirection: "column" }}>
          <label>Isi Konten Berita</label>
          <div style={{ flex: 1, border: "1px solid #e2e8f0", borderRadius: "8px", background: "white" }}>
            <ReactQuill 
              theme="snow"
              value={formData.content}
              onChange={(content) => setFormData({ ...formData, content })}
              style={{ height: "calc(100% - 42px)" }}
            />
          </div>
        </div>

        <div className="adm-form-group" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <input 
            type="checkbox" 
            id="published" 
            checked={formData.published} 
            onChange={(e) => setFormData({ ...formData, published: e.target.checked })} 
          />
          <label htmlFor="published" style={{ margin: 0, fontWeight: "normal", cursor: "pointer" }}>
            Publikasikan Segera (Jika tidak dicentang, akan disimpan sebagai Draft)
          </label>
        </div>

        <div style={{ marginTop: "10px", display: "flex", justifyContent: "flex-end" }}>
          <button type="submit" className="adm-btn adm-btn-primary" disabled={isSubmitting} style={{ padding: "10px 24px" }}>
            {isSubmitting ? "Menyimpan..." : "Simpan Berita"}
          </button>
        </div>
      </form>
    </>
  );
}
