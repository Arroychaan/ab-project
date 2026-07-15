"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { toast } from "react-hot-toast";

export default function PostsList() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      const res = await fetch("/api/admin/posts");
      const data = await res.json();
      if (Array.isArray(data)) setPosts(data);
    } catch (e) {
      toast.error("Gagal memuat berita");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDelete = async (slug) => {
    if (!confirm("Yakin ingin menghapus berita ini secara permanen?")) return;
    
    const toastId = toast.loading("Menghapus...");
    try {
      const res = await fetch(`/api/admin/posts/${slug}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Berita berhasil dihapus!", { id: toastId });
        setPosts(posts.filter((p) => p.slug !== slug));
      } else {
        toast.error("Gagal menghapus berita", { id: toastId });
      }
    } catch (e) {
      toast.error("Terjadi kesalahan sistem", { id: toastId });
    }
  };

  return (
    <>
      <div className="adm-section-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h2>Berita & Artikel</h2>
          <p>Kelola semua publikasi berita sekolah atau pesantren.</p>
        </div>
        <Link href="/admin/posts/create" className="adm-btn adm-btn-primary">
          + Tulis Berita Baru
        </Link>
      </div>

      <div className="adm-card">
        {isLoading ? (
          <p>Memuat daftar berita...</p>
        ) : posts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>
            Belum ada berita yang diterbitkan.
          </div>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #e2e8f0", textAlign: "left" }}>
                <th style={{ padding: "12px 16px" }}>Judul Berita</th>
                <th style={{ padding: "12px 16px" }}>Status</th>
                <th style={{ padding: "12px 16px" }}>Penulis</th>
                <th style={{ padding: "12px 16px" }}>Tanggal</th>
                <th style={{ padding: "12px 16px", textAlign: "right" }}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.id} style={{ borderBottom: "1px solid #e2e8f0" }}>
                  <td style={{ padding: "12px 16px" }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      {post.thumbnail ? (
                        <div style={{ width: '40px', height: '40px', borderRadius: '4px', backgroundImage: `url(${post.thumbnail})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
                      ) : (
                        <div style={{ width: '40px', height: '40px', borderRadius: '4px', backgroundColor: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', color: '#94a3b8' }}>No IMG</div>
                      )}
                      <div>
                        <strong>{post.title}</strong>
                        <div style={{ fontSize: '12px', color: '#64748b' }}>/berita/{post.slug}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: "12px 16px" }}>
                    {post.published ? (
                      <span style={{ background: '#dcfce7', color: '#166534', padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: '500' }}>Publik</span>
                    ) : (
                      <span style={{ background: '#fef3c7', color: '#92400e', padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: '500' }}>Draft</span>
                    )}
                  </td>
                  <td style={{ padding: "12px 16px", color: "#475569" }}>
                    {post.author?.name || "Admin"}
                  </td>
                  <td style={{ padding: "12px 16px", color: "#475569" }}>
                    {new Date(post.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </td>
                  <td style={{ padding: "12px 16px", textAlign: "right" }}>
                    <div style={{ display: "flex", gap: "8px", justifyContent: "flex-end" }}>
                      <Link href={`/berita/${post.slug}`} target="_blank" className="adm-btn" style={{ fontSize: "13px", padding: "6px 12px" }}>Lihat</Link>
                      <Link href={`/admin/posts/${post.slug}`} className="adm-btn" style={{ fontSize: "13px", padding: "6px 12px" }}>Edit</Link>
                      <button onClick={() => handleDelete(post.slug)} className="adm-btn" style={{ fontSize: "13px", padding: "6px 12px", color: "#ef4444" }}>Hapus</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
