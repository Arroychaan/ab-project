"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";

export default function AIAssistant({ onApplyText, currentContent, isDevMode }) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [prompt, setPrompt] = useState("");

  const handleAction = async (action, text = currentContent, customContext = "") => {
    if (!text && action !== "generate" && action !== "generate_code") {
      toast.error("Editor masih kosong! Ketik sesuatu dulu untuk diproses AI.");
      return;
    }

    if ((action === "generate" || action === "generate_code") && !customContext) {
      toast.error("Tolong isi kolom instruksi AI terlebih dahulu.");
      return;
    }

    setIsProcessing(true);
    const toastId = toast.loading("AI Pejuang sedang berpikir...");

    try {
      const res = await fetch("/api/admin/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action,
          text: text || "Kosong",
          contextStr: customContext
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        onApplyText(data.result);
        toast.success("Berhasil! Hasil AI diterapkan.", { id: toastId });
        setPrompt("");
      } else {
        toast.error(data.error || "Gagal memproses", { id: toastId });
      }
    } catch (error) {
      toast.error("Terjadi kesalahan sistem", { id: toastId });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="ai-panel">
      <div className="ai-header">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: "24px", height: "24px", color: "#8b5cf6" }}>
          <path d="M12 2a2 2 0 0 1 2 2c0 1.1-.9 2-2 2s-2-.9-2-2a2 2 0 0 1 2-2z" />
          <path d="M19 9a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V9z" />
          <line x1="12" y1="15" x2="12" y2="22" />
          <line x1="8" y1="22" x2="16" y2="22" />
          <line x1="19" y1="11" x2="22" y2="11" />
          <line x1="2" y1="11" x2="5" y2="11" />
        </svg>
        <h3 style={{ color: "#334155" }}>
          {isDevMode ? "AI Code Agent (Mode Developer)" : "Asisten AI Pejuang"}
        </h3>
      </div>
      
      <p style={{ fontSize: "13px", color: "#64748b", marginBottom: "16px" }}>
        {isDevMode 
          ? "Saya siap menuliskan kode HTML/CSS murni untuk Anda. Cukup beri instruksi komponen apa yang ingin dibuat."
          : "Saya siap membantu merapikan kalimat, mengembangkan ide, atau menerjemahkan artikel Anda."}
      </p>

      {/* Input Prompt Kustom */}
      <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
        <input 
          type="text" 
          className="adm-input" 
          placeholder={isDevMode ? "Misal: Buat card donasi hijau dengan efek bayangan..." : "Misal: Buatkan kata pengantar untuk berita ini..."}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          disabled={isProcessing}
        />
        <button 
          type="button"
          className="adm-btn adm-btn-primary" 
          style={{ padding: "10px 16px", flexShrink: 0 }}
          onClick={() => handleAction(isDevMode ? "generate_code" : "generate", "", prompt)}
          disabled={isProcessing || !prompt.trim()}
        >
          {isProcessing ? "Proses..." : "Suruh AI"}
        </button>
      </div>

      {/* Quick Actions (Hanya di mode Visual/Awam) */}
      {!isDevMode && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
          <button type="button" className="adm-btn adm-btn-secondary" style={{ fontSize: "12px", padding: "6px 12px" }} onClick={() => handleAction("fix_grammar")} disabled={isProcessing}>
            ✨ Perbaiki EYD & Typo
          </button>
          <button type="button" className="adm-btn adm-btn-secondary" style={{ fontSize: "12px", padding: "6px 12px" }} onClick={() => handleAction("expand")} disabled={isProcessing}>
            📝 Kembangkan Paragraf
          </button>
          <button type="button" className="adm-btn adm-btn-secondary" style={{ fontSize: "12px", padding: "6px 12px" }} onClick={() => handleAction("rewrite_formal")} disabled={isProcessing}>
            👔 Ubah ke Formal
          </button>
          <button type="button" className="adm-btn adm-btn-secondary" style={{ fontSize: "12px", padding: "6px 12px" }} onClick={() => handleAction("translate_ar")} disabled={isProcessing}>
            🇸🇦 Terjemah ke Arab
          </button>
        </div>
      )}
    </div>
  );
}
