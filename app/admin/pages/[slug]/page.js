"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { use } from "react";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

export default function EditPageBuilder({ params }) {
  const router = useRouter();
  const resolvedParams = use(params);
  const { slug } = resolvedParams;

  const [isLoading, setIsLoading] = useState(true);
  const [isDevMode, setIsDevMode] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form states
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [layout, setLayout] = useState("STANDARD");
  
  // Data JSON (Awam Mode)
  const [content, setContent] = useState("");
  const [heroImage, setHeroImage] = useState("");

  // Dev Mode
  const [customCss, setCustomCss] = useState("");
  const [customHtml, setCustomHtml] = useState("");

  useEffect(() => {
    // Ambil data halaman berdasarkan slug
    const fetchPage = async () => {
      try {
        const res = await fetch("/api/admin/page");
        const pages = await res.json();
        const page = pages.find(p => p.slug === slug);

        if (page) {
          setTitle(page.title);
          setSubtitle(page.subtitle || "");
          setLayout(page.layout);
          setCustomCss(page.customCss || "");
          setCustomHtml(page.customHtml || "");

          if (page.customCss || page.customHtml) {
            setIsDevMode(true);
          }

          const parsedData = JSON.parse(page.data || "{}");
          setContent(parsedData.content || parsedData.intro || JSON.stringify(parsedData, null, 2));
          setHeroImage(parsedData.heroImage || "");
        } else {
          toast.error("Halaman tidak ditemukan");
          router.push("/admin/pages");
        }
      } catch (e) {
        toast.error("Gagal memuat halaman");
      } finally {
        setIsLoading(false);
      }
    };
    fetchPage();
  }, [slug, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const dataObj = { content, heroImage };

      const res = await fetch(`/api/admin/page/${slug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          subtitle,
          layout,
          data: JSON.stringify(dataObj),
          customCss: isDevMode ? customCss : null,
          customHtml: isDevMode ? customHtml : null,
        }),
      });

      if (res.ok) {
        toast.success("Perubahan halaman disimpan!");
        router.push("/admin/pages");
      } else {
        toast.error("Gagal menyimpan halaman");
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

  if (isLoading) return <div style={{ padding: "40px" }}>Memuat halaman...</div>;

  return (
    <>
      <div className="adm-section-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h2>Edit Halaman</h2>
          <p>Mengedit halaman <strong>/{slug}</strong></p>
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
        <div className="adm-form-group">
          <label>Judul Halaman (H1)</label>
          <input type="text" className="adm-input" value={title} onChange={e => setTitle(e.target.value)} required />
        </div>

        <div className="adm-form-group">
          <label>Sub-Judul (Opsional)</label>
          <input type="text" className="adm-input" value={subtitle} onChange={e => setSubtitle(e.target.value)} />
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
            <input type="text" className="adm-input" value={heroImage} onChange={e => setHeroImage(e.target.value)} />
          </div>
        )}

        <hr style={{ border: 0, borderTop: "1px dashed #cbd5e1", margin: "32px 0" }} />

        {isDevMode ? (
          <div style={{ backgroundColor: "#0f172a", padding: "24px", borderRadius: "12px", color: "white" }}>
            <h3 style={{ marginTop: 0, color: "#38bdf8", display: "flex", alignItems: "center", gap: "8px" }}>
              ⚡ Developer Mode Active
            </h3>
            <p style={{ fontSize: "13px", color: "#94a3b8", marginBottom: "20px" }}>Anda memiliki kendali penuh atas kode sumber halaman ini.</p>
            
            <div className="adm-form-group">
              <label style={{ color: "#e2e8f0" }}>Custom CSS (&lt;style&gt;)</label>
              <textarea className="adm-input" style={{ fontFamily: "monospace", backgroundColor: "#1e293b", color: "#a5b4fc", border: "1px solid #334155" }} value={customCss} onChange={e => setCustomCss(e.target.value)} rows={5} />
            </div>

            <div className="adm-form-group">
              <label style={{ color: "#e2e8f0" }}>Raw HTML Body</label>
              <textarea className="adm-input" style={{ fontFamily: "monospace", backgroundColor: "#1e293b", color: "#86efac", border: "1px solid #334155" }} value={customHtml} onChange={e => setCustomHtml(e.target.value)} rows={10} />
            </div>
          </div>
        ) : (
          <div className="adm-form-group" style={{ paddingBottom: "40px" }}>
            <label>Konten Halaman (Visual Editor)</label>
            <div style={{ backgroundColor: "white", borderRadius: "8px" }}>
              <ReactQuill theme="snow" value={content} onChange={setContent} modules={quillModules} style={{ height: "400px" }} />
            </div>
          </div>
        )}

        <div style={{ marginTop: "48px", display: "flex", justifyContent: "flex-end", gap: "16px" }}>
          <button type="button" onClick={() => router.push("/admin/pages")} className="adm-btn adm-btn-secondary">
            Batal
          </button>
          <button type="submit" disabled={isSubmitting} className="adm-btn adm-btn-primary">
            {isSubmitting ? "Menyimpan..." : "Simpan Perubahan"}
          </button>
        </div>
      </form>
    </>
  );
}
