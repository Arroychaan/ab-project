"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function EditClient({ slug, pageData }) {
  const router = useRouter();
  const [title, setTitle] = useState(pageData?.title || "");
  const [subtitle, setSubtitle] = useState(pageData?.subtitle || "");
  const [dataStr, setDataStr] = useState(
    pageData?.data ? JSON.stringify(JSON.parse(pageData.data), null, 2) : "{}"
  );
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // AI Assistant States
  const [aiInput, setAiInput] = useState("");
  const [aiOutput, setAiOutput] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [aiAction, setAiAction] = useState("fix_grammar");
  const [aiCustomContext, setAiCustomContext] = useState("");

  const handleAiProcess = async () => {
    if (!aiInput.trim()) {
      alert("Masukkan teks yang ingin diproses oleh AI.");
      return;
    }
    setAiLoading(true);
    setAiOutput("");
    
    try {
      const res = await fetch("/api/admin/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: aiAction,
          text: aiInput,
          contextStr: aiAction === "custom" ? aiCustomContext : "",
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setAiOutput(data.result);
    } catch (err) {
      alert("AI Error: " + err.message);
    } finally {
      setAiLoading(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // Validate JSON
      let parsedData;
      try {
        parsedData = JSON.parse(dataStr);
      } catch (err) {
        throw new Error("Format Data JSON tidak valid. Harap periksa kembali.");
      }

      const res = await fetch(`/api/admin/page/${slug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          subtitle,
          data: JSON.stringify(parsedData), // simpan sebagai string JSON
        }),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Gagal menyimpan data");

      setSuccess(true);
      router.refresh();
      
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
      
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="adm-section-header" style={{ marginBottom: "20px" }}>
        <div>
          <h2>Edit Halaman: {slug}</h2>
          <p>Ubah konten halaman secara langsung (Format JSON untuk struktur)</p>
        </div>
        <Link href="/admin" className="adm-btn adm-btn-secondary">
          Kembali
        </Link>
      </div>

      {error && (
        <div style={{ padding: "12px 16px", background: "#fee2e2", color: "#b91c1c", borderRadius: "8px", marginBottom: "20px", fontSize: "14px", border: "1px solid #f87171" }}>
          <strong>Error:</strong> {error}
        </div>
      )}

      {success && (
        <div style={{ padding: "12px 16px", background: "#dcfce7", color: "#15803d", borderRadius: "8px", marginBottom: "20px", fontSize: "14px", border: "1px solid #4ade80" }}>
          ✅ Berhasil menyimpan perubahan! Halaman publik telah diperbarui.
        </div>
      )}

      <form onSubmit={handleSave} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        
        {/* Title */}
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <label style={{ fontSize: "14px", fontWeight: "600", color: "#1e293b" }}>Judul Halaman (H1)</label>
          <input 
            type="text" 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={{ padding: "12px 16px", borderRadius: "10px", border: "1px solid #cbd5e1", fontSize: "15px", outline: "none" }}
            className="adm-input"
          />
        </div>

        {/* Subtitle */}
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <label style={{ fontSize: "14px", fontWeight: "600", color: "#1e293b" }}>Sub-Judul / Deskripsi Singkat</label>
          <input 
            type="text" 
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            style={{ padding: "12px 16px", borderRadius: "10px", border: "1px solid #cbd5e1", fontSize: "15px", outline: "none" }}
            className="adm-input"
          />
        </div>

        {/* AI Assistant Toolkit */}
        <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "12px", padding: "20px", display: "flex", flexDirection: "column", gap: "16px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{ fontSize: "20px" }}>🤖</span>
            <h3 style={{ fontSize: "16px", fontWeight: "700", color: "#1e293b", margin: 0 }}>DeepSeek AI Assistant</h3>
          </div>
          <p style={{ fontSize: "13px", color: "#64748b", margin: 0 }}>
            Ketik teks yang ingin diolah, pilih aksi, lalu hasil olahan AI bisa disalin ke dalam JSON Editor di bawah.
          </p>
          
          <div style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>
            <div style={{ flex: 1, minWidth: "250px", display: "flex", flexDirection: "column", gap: "8px" }}>
              <label style={{ fontSize: "13px", fontWeight: "600", color: "#334155" }}>Teks Mentah:</label>
              <textarea 
                value={aiInput}
                onChange={(e) => setAiInput(e.target.value)}
                placeholder="Paste paragraf di sini..."
                rows={5}
                style={{ padding: "12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "14px", resize: "vertical", outline: "none" }}
              />
            </div>

            <div style={{ flex: 1, minWidth: "250px", display: "flex", flexDirection: "column", gap: "8px" }}>
              <label style={{ fontSize: "13px", fontWeight: "600", color: "#334155" }}>Hasil dari AI:</label>
              <textarea 
                value={aiOutput}
                readOnly
                placeholder="Hasil akan muncul di sini..."
                rows={5}
                style={{ padding: "12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "14px", background: "#f1f5f9", resize: "vertical", outline: "none" }}
              />
            </div>
          </div>

          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", alignItems: "center" }}>
            <select 
              value={aiAction} 
              onChange={(e) => setAiAction(e.target.value)}
              style={{ padding: "10px 14px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "14px", outline: "none", background: "#fff" }}
            >
              <option value="fix_grammar">✨ Perbaiki Tata Bahasa</option>
              <option value="expand">📝 Kembangkan Paragraf</option>
              <option value="rewrite_formal">🔄 Tulis Ulang (Sangat Formal)</option>
              <option value="generate">📖 Generate Teks Baru</option>
              <option value="translate_ar">🌐 Terjemahkan ke B. Arab</option>
              <option value="translate_en">🌐 Terjemahkan ke B. Inggris</option>
              <option value="custom">✏️ Custom Instruksi...</option>
            </select>

            {aiAction === "custom" && (
              <input 
                type="text" 
                value={aiCustomContext}
                onChange={(e) => setAiCustomContext(e.target.value)}
                placeholder="Cth: Buat agar terdengar lebih ramah"
                style={{ padding: "10px 14px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "14px", outline: "none", flex: 1, minWidth: "200px" }}
              />
            )}

            <button 
              type="button" 
              onClick={handleAiProcess}
              disabled={aiLoading}
              className="adm-btn"
              style={{ background: "#0ea5e9", color: "#fff", opacity: aiLoading ? 0.7 : 1 }}
            >
              {aiLoading ? "Memproses..." : "Tanya AI 🚀"}
            </button>
            
            {aiOutput && (
              <button 
                type="button"
                onClick={() => { navigator.clipboard.writeText(aiOutput); alert("Disalin!"); }}
                className="adm-btn adm-btn-secondary"
                style={{ padding: "8px 14px", fontSize: "13px" }}
              >
                📋 Copy Hasil
              </button>
            )}
          </div>
        </div>

        {/* JSON Data Editor */}
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <label style={{ fontSize: "14px", fontWeight: "600", color: "#1e293b" }}>
              Struktur Konten (Format JSON)
            </label>
            <span style={{ fontSize: "12px", color: "#0ea5e9", background: "#e0f2fe", padding: "4px 8px", borderRadius: "6px", fontWeight: "600" }}>
              ✅ AI Assistant Terintegrasi
            </span>
          </div>
          
          <p style={{ fontSize: "13px", color: "#64748b", margin: 0 }}>
            Ubah teks, URL gambar, atau susunan teks secara langsung melalui JSON ini. Pastikan format tanda kutip dan koma valid.
          </p>
          
          <textarea 
            value={dataStr}
            onChange={(e) => setDataStr(e.target.value)}
            rows={20}
            required
            style={{ 
              padding: "16px", 
              borderRadius: "10px", 
              border: "1px solid #cbd5e1", 
              fontSize: "14px", 
              fontFamily: "monospace",
              background: "#1e1e1e",
              color: "#d4d4d4",
              outline: "none",
              resize: "vertical",
              lineHeight: "1.5"
            }}
            className="adm-input"
          />
        </div>

        {/* Submit */}
        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "10px" }}>
          <button 
            type="submit" 
            disabled={loading}
            className="adm-btn adm-btn-primary"
            style={{ opacity: loading ? 0.7 : 1, minWidth: "150px" }}
          >
            {loading ? "Menyimpan..." : "Simpan Perubahan"}
          </button>
        </div>

      </form>
    </div>
  );
}
