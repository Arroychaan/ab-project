"use client";

import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";

export default function WebSettingsPage() {
  const [formData, setFormData] = useState({
    logo_url: "",
    wa_number: "",
    wa_link: "",
    ig_link: "",
    address: "",
    copyright: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch("/api/admin/settings");
        const data = await res.json();
        setFormData({
          logo_url: data.logo_url || "",
          wa_number: data.wa_number || "",
          wa_link: data.wa_link || "",
          ig_link: data.ig_link || "",
          address: data.address || "",
          copyright: data.copyright || "",
        });
      } catch (error) {
        toast.error("Gagal memuat pengaturan");
      } finally {
        setIsLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    const toastId = toast.loading("Menyimpan pengaturan...");

    try {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        toast.success("Pengaturan berhasil disimpan!", { id: toastId });
      } else {
        let errorMessage = `Gagal menyimpan (${res.status})`;
        try {
          const errorData = await res.json();
          errorMessage = errorData.error || errorMessage;
        } catch {
          errorMessage = await res.text() || errorMessage;
        }
        toast.error(errorMessage, { id: toastId });
      }
    } catch (error) {
      toast.error(error.message || error.toString() || "Terjadi kesalahan sistem", { id: toastId });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) return <p>Memuat...</p>;

  return (
    <>
      <div className="adm-section-header">
        <h2>Pengaturan Global (Web Settings)</h2>
        <p>Sesuaikan Logo, Kontak, dan Footer website Anda tanpa perlu mengubah kode.</p>
      </div>

      <form onSubmit={handleSave} className="adm-card" style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
          
          {/* Identitas */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <h3 style={{ fontSize: "16px", borderBottom: "1px solid #e2e8f0", paddingBottom: "8px", marginBottom: "4px" }}>Identitas & Logo</h3>
            
            <div className="adm-form-group">
              <label>URL Logo Utama</label>
              <input 
                type="text" 
                name="logo_url"
                placeholder="Paste URL dari Galeri Media..."
                value={formData.logo_url} 
                onChange={handleChange} 
              />
              {formData.logo_url && (
                <div style={{ padding: "10px", background: "#f8fafc", borderRadius: "8px", marginTop: "10px", display: "inline-block" }}>
                  <img src={formData.logo_url} alt="Logo Preview" style={{ height: "40px", objectFit: "contain" }} />
                </div>
              )}
            </div>
            
            <div className="adm-form-group">
              <label>Teks Copyright Footer</label>
              <input 
                type="text" 
                name="copyright"
                placeholder="© 2026 Al-Bahjah Cirebon..."
                value={formData.copyright} 
                onChange={handleChange} 
              />
            </div>
          </div>

          {/* Kontak & Alamat */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <h3 style={{ fontSize: "16px", borderBottom: "1px solid #e2e8f0", paddingBottom: "8px", marginBottom: "4px" }}>Kontak & Sosial Media</h3>
            
            <div className="adm-form-group">
              <label>Alamat Lengkap</label>
              <textarea 
                name="address"
                placeholder="Jl. Pangeran Cakrabuana..."
                value={formData.address} 
                onChange={handleChange} 
                style={{ height: "80px", padding: "10px", borderRadius: "8px", border: "1px solid #cbd5e1", fontFamily: "inherit" }}
              />
            </div>

            <div className="adm-form-group">
              <label>Nomor Telepon / WhatsApp</label>
              <input 
                type="text" 
                name="wa_number"
                placeholder="+62 813-XXXX-XXXX"
                value={formData.wa_number} 
                onChange={handleChange} 
              />
            </div>

            <div className="adm-form-group">
              <label>Link Tujuan WhatsApp (Tombol Floating)</label>
              <input 
                type="text" 
                name="wa_link"
                placeholder="https://wa.me/62813..."
                value={formData.wa_link} 
                onChange={handleChange} 
              />
            </div>

            <div className="adm-form-group">
              <label>Link Instagram</label>
              <input 
                type="text" 
                name="ig_link"
                placeholder="https://instagram.com/albahjah..."
                value={formData.ig_link} 
                onChange={handleChange} 
              />
            </div>
          </div>

        </div>

        <div style={{ marginTop: "16px", display: "flex", justifyContent: "flex-end", borderTop: "1px solid #e2e8f0", paddingTop: "20px" }}>
          <button type="submit" className="adm-btn adm-btn-primary" disabled={isSaving} style={{ padding: "10px 32px" }}>
            {isSaving ? "Menyimpan..." : "Simpan Pengaturan"}
          </button>
        </div>
      </form>
    </>
  );
}
