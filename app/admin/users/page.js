"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function UsersManagementPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Form State
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", password: "", role: "ADMIN" });
  const [formLoading, setFormLoading] = useState(false);

  useEffect(() => {
    if (status === "loading") return;
    if (status === "unauthenticated" || session?.user?.role !== "SUPER_ADMIN") {
      router.replace("/admin");
      return;
    }
    fetchUsers();
  }, [status, session, router]);

  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/admin/users");
      const data = await res.json();
      if (res.ok) {
        setUsers(data.users);
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError("Gagal memuat data admin");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (res.ok) {
        setSuccess(`Admin ${data.user.name} berhasil ditambahkan!`);
        setIsAdding(false);
        setFormData({ name: "", email: "", password: "", role: "ADMIN" });
        fetchUsers();
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError("Terjadi kesalahan saat menyimpan data.");
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async (id, name) => {
    if (id === session?.user?.id) {
      alert("Anda tidak dapat menghapus akun Anda sendiri.");
      return;
    }
    
    if (!confirm(`Yakin ingin menghapus admin "${name}"? Tindakan ini tidak bisa dibatalkan.`)) return;

    try {
      const res = await fetch(`/api/admin/users?id=${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      
      if (res.ok) {
        setSuccess(`Admin ${name} berhasil dihapus.`);
        setUsers(users.filter(u => u.id !== id));
      } else {
        alert(data.error || "Gagal menghapus admin");
      }
    } catch (err) {
      alert("Terjadi kesalahan saat menghapus");
    }
  };

  if (status === "loading" || loading) {
    return <div style={{ padding: "40px", textAlign: "center", color: "#64748b" }}>Memuat data...</div>;
  }

  if (session?.user?.role !== "SUPER_ADMIN") {
    return null; // Will be redirected by useEffect
  }

  return (
    <>
      <div className="adm-section-header">
        <div>
          <h2>Manajemen Admin</h2>
          <p>Kelola akses admin website. Fitur ini HANYA dapat diakses oleh SUPER ADMIN.</p>
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

      {success && (
        <div style={{ padding: "12px 16px", background: "#dcfce3", color: "#0d6e3f", borderRadius: "8px", marginBottom: "20px", fontSize: "14px" }}>
          {success}
        </div>
      )}

      {/* Form Tambah Admin */}
      <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "12px", overflow: "hidden", marginBottom: "30px" }}>
        <div 
          style={{ padding: "16px 20px", background: "#f8fafc", borderBottom: "1px solid #e2e8f0", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer" }}
          onClick={() => setIsAdding(!isAdding)}
        >
          <h3 style={{ margin: 0, fontSize: "15px", color: "#1e293b", fontWeight: "600" }}>➕ Tambah Admin Baru</h3>
          <span style={{ transform: isAdding ? "rotate(180deg)" : "rotate(0deg)", transition: "0.2s" }}>▼</span>
        </div>

        {isAdding && (
          <form onSubmit={handleSubmit} style={{ padding: "20px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" }}>
              <div className="adm-form-group">
                <label>Nama Lengkap</label>
                <input 
                  type="text" 
                  required 
                  className="adm-input" 
                  value={formData.name} 
                  onChange={(e) => setFormData({...formData, name: e.target.value})} 
                  placeholder="Misal: Ustadz Ahmad"
                />
              </div>
              <div className="adm-form-group">
                <label>Email Akses</label>
                <input 
                  type="email" 
                  required 
                  className="adm-input" 
                  value={formData.email} 
                  onChange={(e) => setFormData({...formData, email: e.target.value})} 
                  placeholder="admin@albahjah.com"
                />
              </div>
              <div className="adm-form-group">
                <label>Password Rahasia</label>
                <input 
                  type="text" 
                  required 
                  className="adm-input" 
                  value={formData.password} 
                  onChange={(e) => setFormData({...formData, password: e.target.value})} 
                  placeholder="Minimal 6 karakter"
                  minLength={6}
                />
              </div>
              <div className="adm-form-group">
                <label>Hak Akses (Role)</label>
                <select 
                  className="adm-input" 
                  value={formData.role} 
                  onChange={(e) => setFormData({...formData, role: e.target.value})}
                >
                  <option value="ADMIN">ADMIN (Hanya Bisa Edit Konten & Media)</option>
                  <option value="SUPER_ADMIN">SUPER ADMIN (Bisa Tambah/Hapus Admin)</option>
                </select>
              </div>
            </div>
            
            <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
              <button type="button" className="adm-btn adm-btn-secondary" onClick={() => setIsAdding(false)}>Batal</button>
              <button type="submit" className="adm-btn adm-btn-primary" disabled={formLoading}>
                {formLoading ? "Menyimpan..." : "Simpan Admin"}
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Tabel Admin */}
      <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "12px", overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px", textAlign: "left" }}>
          <thead>
            <tr style={{ background: "#f8fafc", borderBottom: "1px solid #e2e8f0" }}>
              <th style={{ padding: "16px 20px", color: "#64748b", fontWeight: "600" }}>Nama</th>
              <th style={{ padding: "16px 20px", color: "#64748b", fontWeight: "600" }}>Email</th>
              <th style={{ padding: "16px 20px", color: "#64748b", fontWeight: "600" }}>Role Akses</th>
              <th style={{ padding: "16px 20px", color: "#64748b", fontWeight: "600", textAlign: "right" }}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} style={{ borderBottom: "1px solid #e2e8f0" }}>
                <td style={{ padding: "16px 20px", fontWeight: "500", color: "#1e293b" }}>{user.name}</td>
                <td style={{ padding: "16px 20px", color: "#475569" }}>{user.email}</td>
                <td style={{ padding: "16px 20px" }}>
                  <span style={{ 
                    padding: "4px 10px", 
                    borderRadius: "6px", 
                    fontSize: "12px", 
                    fontWeight: "600",
                    background: user.role === "SUPER_ADMIN" ? "#e0e7ff" : "#f1f5f9",
                    color: user.role === "SUPER_ADMIN" ? "#4338ca" : "#475569"
                  }}>
                    {user.role}
                  </span>
                </td>
                <td style={{ padding: "16px 20px", textAlign: "right" }}>
                  <button 
                    onClick={() => handleDelete(user.id, user.name)}
                    disabled={user.id === session?.user?.id}
                    style={{ 
                      padding: "6px 12px", 
                      borderRadius: "6px", 
                      fontSize: "12px", 
                      fontWeight: "600",
                      background: user.id === session?.user?.id ? "#f1f5f9" : "#fee2e2",
                      color: user.id === session?.user?.id ? "#94a3b8" : "#b91c1c",
                      border: "none",
                      cursor: user.id === session?.user?.id ? "not-allowed" : "pointer"
                    }}
                  >
                    {user.id === session?.user?.id ? "Akun Anda" : "Hapus"}
                  </button>
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan={4} style={{ padding: "30px", textAlign: "center", color: "#64748b" }}>Belum ada data admin</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
