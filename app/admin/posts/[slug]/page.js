"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import dynamic from "next/dynamic";
import AIAssistant from "@/app/components/admin/AIAssistant";
import "react-quill-new/dist/quill.snow.css";
import Link from "next/link";
import { use } from "react";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

export default function EditPost({ params }) {
  const router = useRouter();
  const resolvedParams = use(params);
  const { slug } = resolvedParams;

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    thumbnail: "",
    content: "",
    published: true,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/admin/posts/${slug}`);
        const data = await res.json();
        if (res.ok) {
          setFormData({
            title: data.title,
            slug: data.slug,
            thumbnail: data.thumbnail || "",
            content: data.content,
            published: data.published,
          });
        } else {
          toast.error("Berita tidak ditemukan");
          router.push("/admin/posts");
        }
      } catch (e) {
        toast.error("Gagal memuat berita");
      } finally {
        setIsLoading(false);
      }
    };
    fetchPost();
  }, [slug, router]);

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
    const toastId = toast.loading("Memperbarui berita...");

    try {
      const res = await fetch(`/api/admin/posts/${slug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success("Berita berhasil diperbarui!", { id: toastId });
        // Jika slug berubah, redirect ke slug baru
        if (data.slug !== slug) {
          router.push(`/admin/posts/${data.slug}`);
        } else {
          router.push("/admin/posts");
        }
      } else {
        let errorMessage = `Gagal memperbarui (${res.status})`;
        try {
          errorMessage = data.error || errorMessage;
        } catch {
          errorMessage = errorMessage;
        }
        toast.error(errorMessage, { id: toastId });
      }
    } catch (error) {
      toast.error(error.message || error.toString() || "Terjadi kesalahan sistem", { id: toastId });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) return <p>Memuat editor...</p>;

  return (
    <>
      <div className="adm-section-header">
        <Link href="/admin/posts" className="adm-btn" style={{ marginBottom: "16px", display: "inline-block" }}>
          ← Kembali
        </Link>
        <h2>Edit Berita</h2>
      </div>

      <form onSubmit={handleSubmit} className="adm-card" style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
          <div className="adm-form-group">
            <label>Judul Berita</label>
            <input 
              type="text" 
              value={formData.title} 
              onChange={handleTitleChange} 
              required
            />
          </div>
          
          <div className="adm-form-group">
            <label>Slug URL</label>
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
            Publikasikan (Hilangkan centang untuk menjadikan Draft)
          </label>
        </div>

        <div style={{ marginTop: "10px", display: "flex", justifyContent: "flex-end" }}>
          <button type="submit" className="adm-btn adm-btn-primary" disabled={isSubmitting} style={{ padding: "10px 24px" }}>
            {isSubmitting ? "Menyimpan..." : "Perbarui Berita"}
          </button>
        </div>
      </form>
    </>
  );
}
