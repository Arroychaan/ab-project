"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";
import LivePreviewModal from "@/app/components/admin/LivePreviewModal";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

export default function CreatePageBuilder() {
  const router = useRouter();
  const [isDevMode, setIsDevMode] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  // Form states
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [slug, setSlug] = useState("");
  const [layout, setLayout] = useState("STANDARD");
  
  // Data JSON (Awam Mode)
  const [content, setContent] = useState("");
  const [heroImage, setHeroImage] = useState("");

  // Dev Mode
  const [customCss, setCustomCss] = useState("");
  const [customHtml, setCustomHtml] = useState("");

  const generateSlug = (text) => {
    return text.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    if (!slug) setSlug(generateSlug(e.target.value));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Susun JSON data
      const dataObj = { content, heroImage };

      const res = await fetch("/api/admin/page", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          subtitle,
          slug,
          layout,
          data: JSON.stringify(dataObj),
          customCss: isDevMode ? customCss : null,
          customHtml: isDevMode ? customHtml : null,
        }),
      });

      const json = await res.json();
      if (res.ok) {
        toast.success("Halaman berhasil dibuat!");
        router.push("/admin/pages");
      } else {
        toast.error(json.error || "Gagal membuat halaman");
      }
    } catch (e) {
      toast.error("Terjadi kesalahan sistem");
    } finally {
      setIsSubmitting(false);
    }
  };

  const quillModules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['link', 'image'],
      ['clean']
    ],
  };

  return (
    <>
      <div className="adm-section-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h2>Buat Halaman Baru</h2>
          <p>Rancang halaman publik dengan CMS Page Builder.</p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", backgroundColor: isDevMode ? "#1e293b" : "#f1f5f9", padding: "8px 16px", borderRadius: "20px", transition: "0.3s" }}>
          <span style={{ fontSize: "13px", fontWeight: "600", color: isDevMode ? "#94a3b8" : "#0d6e3f" }}>Mode Awam</span>
          <label style={{ position: "relative", display: "inline-block", width: "44px", height: "24px" }}>
            <input type="checkbox" checked={isDevMode} onChange={() => setIsDevMode(!isDevMode)} style={{ opacity: 0, width: 0, height: 0 }} />
            <span style={{ position: "absolute", cursor: "pointer", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: isDevMode ? "#3b82f6" : "#cbd5e1", borderRadius: "24px", transition: "0.4s" }}>
              <span style={{ position: "absolute", height: "18px", width: "18px", left: isDevMode ? "22px" : "3px", bottom: "3px", backgroundColor: "white", borderRadius: "50%", transition: "0.4s" }} />
            </span>
          </label>
          <span style={{ fontSize: "13px", fontWeight: "600", color: isDevMode ? "#38bdf8" : "#94a3b8" }}>Mode Developer ⚡</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="adm-card">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
          <div className="adm-form-group">
            <label>Judul Halaman (H1)</label>
            <input type="text" className="adm-input" value={title} onChange={handleTitleChange} required placeholder="Misal: Info Pendaftaran" />
          </div>
          <div className="adm-form-group">
            <label>URL (Slug)</label>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ color: "#64748b", fontWeight: "600" }}>albahjah.com/</span>
              <input type="text" className="adm-input" value={slug} onChange={e => setSlug(e.target.value)} required placeholder="info-pendaftaran" />
            </div>
          </div>
        </div>

        <div className="adm-form-group">
          <label>Sub-Judul (Opsional)</label>
          <input type="text" className="adm-input" value={subtitle} onChange={e => setSubtitle(e.target.value)} placeholder="Misal: Gelombang 1 Tahun 2026" />
        </div>

        <div className="adm-form-group">
          <label>Pilih Layout Desain</label>
          <select className="adm-input" value={layout} onChange={e => setLayout(e.target.value)}>
            <option value="STANDARD">Standard (Header Hijau Minimalis)</option>
            <option value="HERO_IMAGE">Hero Image (Gambar Besar di Atas)</option>
            <option value="BLANK">Blank Canvas (Kosong total, khusus Dev)</option>
          </select>
        </div>

        {layout === "HERO_IMAGE" && (
          <div className="adm-form-group">
            <label>URL Gambar Hero</label>
            <input type="text" className="adm-input" value={heroImage} onChange={e => setHeroImage(e.target.value)} placeholder="https://res.cloudinary.com/..." />
          </div>
        )}

        <hr style={{ border: 0, borderTop: "1px dashed #cbd5e1", margin: "32px 0" }} />

        {isDevMode ? (
          <div style={{ backgroundColor: "#0f172a", padding: "24px", borderRadius: "12px", color: "white" }}>
            <h3 style={{ marginTop: 0, color: "#38bdf8", display: "flex", alignItems: "center", gap: "8px" }}>
              ⚡ Developer Mode Active
            </h3>
            <p style={{ fontSize: "13px", color: "#94a3b8", marginBottom: "20px" }}>Anda memiliki kendali penuh atas kode sumber halaman ini. Custom HTML akan menimpa konten teks biasa.</p>
            
            <div className="adm-form-group">
              <label style={{ color: "#e2e8f0" }}>Custom CSS (&lt;style&gt;)</label>
              <textarea className="adm-input" style={{ fontFamily: "monospace", backgroundColor: "#1e293b", color: "#a5b4fc", border: "1px solid #334155" }} value={customCss} onChange={e => setCustomCss(e.target.value)} placeholder=".my-class { color: red; }" rows={5} />
            </div>

            <div className="adm-form-group">
              <label style={{ color: "#e2e8f0" }}>Raw HTML Body</label>
              <textarea className="adm-input" style={{ fontFamily: "monospace", backgroundColor: "#1e293b", color: "#86efac", border: "1px solid #334155" }} value={customHtml} onChange={e => setCustomHtml(e.target.value)} placeholder="<div class='my-class'>Hello World</div>" rows={10} />
            </div>
          </div>
        ) : (
          <div className="adm-form-group" style={{ paddingBottom: "40px" }}>
            <label>Konten Halaman (Visual Editor)</label>
            <div style={{ backgroundColor: "white", borderRadius: "8px" }}>
              <ReactQuill theme="snow" value={content} onChange={setContent} modules={quillModules} style={{ height: "300px" }} />
            </div>
          </div>
        )}

        <div style={{ marginTop: "48px", display: "flex", justifyContent: "flex-end", gap: "16px" }}>
          <button type="button" onClick={() => setIsPreviewOpen(true)} className="adm-btn" style={{ backgroundColor: "#10b981", color: "white", padding: "10px 24px", borderRadius: "8px", border: "none", cursor: "pointer", fontWeight: "600", display: "flex", alignItems: "center", gap: "8px", transition: "0.2s" }} onMouseOver={(e) => e.target.style.backgroundColor = "#059669"} onMouseOut={(e) => e.target.style.backgroundColor = "#10b981"}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
            Preview Halaman
          </button>
          <button type="button" onClick={() => router.push("/admin/pages")} className="adm-btn adm-btn-secondary">
            Batal
          </button>
          <button type="submit" disabled={isSubmitting} className="adm-btn adm-btn-primary">
            {isSubmitting ? "Menyimpan..." : "Simpan Halaman Baru"}
          </button>
        </div>
      </form>

      <LivePreviewModal 
        isOpen={isPreviewOpen} 
        onClose={() => setIsPreviewOpen(false)} 
        page={{ title, subtitle, layout, content, heroImage, customCss, customHtml }}
      />
    </>
  );
}
