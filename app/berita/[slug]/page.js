import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await prisma.post.findUnique({ where: { slug } });
  if (!post) return { title: "Berita Tidak Ditemukan" };

  return {
    title: `${post.title} | Al-Bahjah`,
    description: post.content.replace(/<[^>]+>/g, '').substring(0, 150) + "...",
  };
}

export default async function SinglePostPage({ params }) {
  const { slug } = await params;
  
  const post = await prisma.post.findUnique({
    where: { slug },
    include: { author: { select: { name: true } } }
  });

  if (!post || !post.published) {
    notFound();
  }

  return (
    <div style={{ backgroundColor: "#f8fafc", minHeight: "100vh", paddingBottom: "60px" }}>
      <div style={{ paddingTop: "120px", maxWidth: "800px", margin: "0 auto", padding: "120px 20px 20px" }}>
        
        <Link href="/berita" style={{ color: "#0d6e3f", textDecoration: "none", fontSize: "14px", fontWeight: "500", display: "inline-block", marginBottom: "24px" }}>
          ← Kembali ke Indeks Berita
        </Link>

        <h1 style={{ fontSize: "36px", color: "#1e293b", margin: "0 0 16px 0", lineHeight: 1.3 }}>
          {post.title}
        </h1>
        
        <div style={{ display: "flex", gap: "16px", color: "#64748b", fontSize: "14px", marginBottom: "32px", borderBottom: "1px solid #e2e8f0", paddingBottom: "24px" }}>
          <span>👤 Oleh: <strong>{post.author?.name || "Admin"}</strong></span>
          <span>📅 {new Date(post.createdAt).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</span>
        </div>

        {post.thumbnail && (
          <img 
            src={post.thumbnail} 
            alt={post.title} 
            style={{ width: "100%", height: "auto", borderRadius: "12px", marginBottom: "40px", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }} 
          />
        )}

        {/* Gunakan quill styling untuk merender HTML */}
        <div 
          className="ql-editor"
          style={{ padding: 0, backgroundColor: "transparent", fontSize: "17px", lineHeight: 1.7, color: "#334155" }}
          dangerouslySetInnerHTML={{ __html: post.content }} 
        />
        
      </div>
    </div>
  );
}
