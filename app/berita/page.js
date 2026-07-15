import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Head from "next/head";

export const metadata = {
  title: "Berita & Artikel | Al-Bahjah",
  description: "Dapatkan informasi terbaru, artikel, dan pengumuman dari pondok pesantren Al-Bahjah.",
};

export default async function BeritaPage() {
  const posts = await prisma.post.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
    include: { author: { select: { name: true } } }
  });

  return (
    <div style={{ backgroundColor: "#f8fafc", minHeight: "100vh" }}>
      <div style={{ backgroundColor: "#0d6e3f", color: "white", padding: "60px 20px", textAlign: "center", paddingTop: "140px" }}>
        <h1 style={{ fontSize: "36px", marginBottom: "12px", maxWidth: "800px", margin: "0 auto" }}>Berita & Artikel Terkini</h1>
        <p style={{ opacity: 0.9, maxWidth: "600px", margin: "12px auto 0" }}>Ikuti terus informasi pendaftaran, kegiatan santri, dan tausiyah terbaru.</p>
      </div>

      <div style={{ padding: "40px 20px", maxWidth: "1100px", margin: "0 auto" }}>
        {posts.length === 0 ? (
          <div style={{ textAlign: "center", padding: "40px", backgroundColor: "white", borderRadius: "12px" }}>
            <p style={{ color: "#64748b" }}>Belum ada berita yang dipublikasikan.</p>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "24px" }}>
            {posts.map(post => (
              <Link href={`/berita/${post.slug}`} key={post.id} style={{ textDecoration: "none", color: "inherit" }}>
                <div style={{ backgroundColor: "white", borderRadius: "12px", overflow: "hidden", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)", transition: "transform 0.2s", display: "flex", flexDirection: "column", height: "100%" }} className="hover-lift">
                  {post.thumbnail ? (
                    <div style={{ height: "200px", backgroundImage: `url(${post.thumbnail})`, backgroundSize: "cover", backgroundPosition: "center" }} />
                  ) : (
                    <div style={{ height: "200px", backgroundColor: "#e2e8f0", display: "flex", alignItems: "center", justifyContent: "center", color: "#94a3b8" }}>Tanpa Gambar</div>
                  )}
                  <div style={{ padding: "20px", display: "flex", flexDirection: "column", flex: 1 }}>
                    <h3 style={{ fontSize: "18px", margin: "0 0 10px 0", color: "#1e293b", lineHeight: 1.4 }}>{post.title}</h3>
                    <div style={{ marginTop: "auto", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "13px", color: "#64748b", borderTop: "1px solid #f1f5f9", paddingTop: "12px" }}>
                      <span>👤 {post.author?.name || "Admin"}</span>
                      <span>📅 {new Date(post.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
      
      <style>{`
        .hover-lift:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);
        }
      `}</style>
    </div>
  );
}
