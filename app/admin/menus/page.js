"use client";

import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";

export default function MenuBuilder() {
  const [menus, setMenus] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Form State
  const [label, setLabel] = useState("");
  const [url, setUrl] = useState("");
  const [order, setOrder] = useState(0);
  const [isDropdown, setIsDropdown] = useState(false);
  const [parentId, setParentId] = useState("");

  const fetchMenus = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/admin/menus");
      const data = await res.json();
      setMenus(data);
    } catch (e) {
      toast.error("Gagal mengambil menu");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMenus();
  }, []);

  const handleAddMenu = async (e) => {
    e.preventDefault();
    if (!label) return toast.error("Label tidak boleh kosong");
    
    try {
      const res = await fetch("/api/admin/menus", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          label,
          url: isDropdown ? "" : url,
          order: parseInt(order),
          isDropdown,
          parentId: parentId || null
        })
      });
      
      if (res.ok) {
        toast.success("Menu berhasil ditambahkan");
        setLabel(""); setUrl(""); setOrder(0); setIsDropdown(false); setParentId("");
        fetchMenus();
      } else {
        toast.error("Gagal menambah menu");
      }
    } catch (e) {
      toast.error("Terjadi kesalahan server");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Yakin ingin menghapus menu ini? Jika ini dropdown, semua sub-menu juga akan terhapus!")) return;
    try {
      const res = await fetch(`/api/admin/menus/${id}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Menu dihapus");
        fetchMenus();
      }
    } catch (e) {
      toast.error("Gagal menghapus menu");
    }
  };

  if (isLoading) return <div style={{ padding: "40px" }}>Memuat...</div>;

  return (
    <>
      <div className="adm-section-header">
        <div>
          <h2>Menu Builder</h2>
          <p>Atur navigasi publik (Header) secara dinamis sesuai urutan.</p>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "24px" }}>
        {/* Form Tambah Menu */}
        <div className="adm-card" style={{ height: "fit-content" }}>
          <h3 style={{ marginTop: 0, marginBottom: "20px" }}>Tambah Menu Baru</h3>
          <form onSubmit={handleAddMenu}>
            <div className="adm-form-group">
              <label>Tipe Menu</label>
              <select className="adm-input" value={isDropdown ? "dropdown" : "link"} onChange={(e) => setIsDropdown(e.target.value === "dropdown")}>
                <option value="link">Link Biasa</option>
                <option value="dropdown">Menu Dropdown (Banyak Cabang)</option>
              </select>
            </div>

            <div className="adm-form-group">
              <label>Label Menu (Teks di Header)</label>
              <input type="text" className="adm-input" value={label} onChange={e => setLabel(e.target.value)} placeholder="Misal: Pendaftaran" required />
            </div>

            {!isDropdown && (
              <div className="adm-form-group">
                <label>URL / Link Tujuan</label>
                <input type="text" className="adm-input" value={url} onChange={e => setUrl(e.target.value)} placeholder="Misal: /pendaftaran" />
                <small style={{ color: "#64748b", marginTop: "4px", display: "block" }}>Gunakan '/' untuk link halaman internal.</small>
              </div>
            )}

            <div className="adm-form-group">
              <label>Jadikan Sub-menu dari?</label>
              <select className="adm-input" value={parentId} onChange={(e) => setParentId(e.target.value)}>
                <option value="">-- Bukan Sub-menu (Menu Utama) --</option>
                {menus.filter(m => m.isDropdown).map(m => (
                  <option key={m.id} value={m.id}>{m.label}</option>
                ))}
              </select>
            </div>

            <div className="adm-form-group">
              <label>Urutan (Kecil ke Besar)</label>
              <input type="number" className="adm-input" value={order} onChange={e => setOrder(e.target.value)} />
            </div>

            <button type="submit" className="adm-btn adm-btn-primary" style={{ width: "100%" }}>
              + Tambah Menu
            </button>
          </form>
        </div>

        {/* List Menu */}
        <div className="adm-card">
          <h3 style={{ marginTop: 0, marginBottom: "20px" }}>Struktur Menu Saat Ini</h3>
          
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {menus.map(menu => (
              <div key={menu.id} style={{ border: "1px solid #e2e8f0", borderRadius: "8px", overflow: "hidden" }}>
                <div style={{ padding: "16px", backgroundColor: "#f8fafc", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <strong style={{ fontSize: "16px" }}>{menu.label}</strong>
                    <span style={{ marginLeft: "12px", fontSize: "12px", padding: "4px 8px", backgroundColor: menu.isDropdown ? "#e0e7ff" : "#dcfce7", color: menu.isDropdown ? "#4338ca" : "#166534", borderRadius: "12px", fontWeight: "600" }}>
                      {menu.isDropdown ? "DROPDOWN" : "LINK"}
                    </span>
                    <span style={{ marginLeft: "12px", fontSize: "12px", color: "#64748b" }}>Urutan: {menu.order}</span>
                    {!menu.isDropdown && <div style={{ fontSize: "13px", color: "#64748b", marginTop: "4px" }}>Link: {menu.url}</div>}
                  </div>
                  <button onClick={() => handleDelete(menu.id)} className="adm-btn adm-btn-secondary" style={{ color: "#ef4444", borderColor: "#fca5a5" }}>Hapus</button>
                </div>
                
                {/* Children */}
                {menu.isDropdown && menu.children && menu.children.length > 0 && (
                  <div style={{ padding: "12px 16px", borderTop: "1px solid #e2e8f0" }}>
                    {menu.children.map(child => (
                      <div key={child.id} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px dashed #e2e8f0" }}>
                        <div>
                          ↳ <strong>{child.label}</strong>
                          <span style={{ marginLeft: "12px", fontSize: "12px", color: "#64748b" }}>Urutan: {child.order} • Link: {child.url}</span>
                        </div>
                        <button onClick={() => handleDelete(child.id)} style={{ background: "none", border: "none", color: "#ef4444", cursor: "pointer", fontSize: "12px", fontWeight: "600" }}>Hapus</button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
            
            {menus.length === 0 && <div style={{ padding: "40px", textAlign: "center", color: "#64748b" }}>Belum ada menu yang dibuat.</div>}
          </div>
        </div>
      </div>
    </>
  );
}
