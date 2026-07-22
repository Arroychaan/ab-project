import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

// Ini adalah Catcher Route dinamis. Semua URL publik yang tidak ada foldernya akan ditangkap di sini.
export default async function DynamicPage({ params }) {
  const resolvedParams = await params;
  const slugPath = resolvedParams.slug.join("/");

  // Cari di database berdasarkan slug
  const page = await prisma.page.findUnique({
    where: { slug: slugPath },
  });

  if (!page) {
    notFound(); // 404 jika halaman tidak ada di database
  }

  // Parse data JSON
  const data = JSON.parse(page.data || "{}");

  // Render berdasarkan Layout yang dipilih oleh Admin
  if (page.layout === "HERO_IMAGE") {
    return (
      <div className="dynamic-page hero-layout">
        {/* Render custom CSS untuk Developer Mode */}
        {page.customCss && <style>{page.customCss}</style>}
        
        <div className="hero-section" style={{ backgroundImage: `url(${data.heroImage || '/hero-bg.webp'})`, padding: '100px 20px', color: 'white', textAlign: 'center' }}>
          <h1>{page.title}</h1>
          {page.subtitle && <p>{page.subtitle}</p>}
        </div>
        <div className="container" style={{ padding: '40px 20px', maxWidth: '1000px', margin: '0 auto' }}>
          {page.customHtml ? (
            <div className="dynamic-content-wrapper" dangerouslySetInnerHTML={{ __html: page.customHtml }} />
          ) : (
            <div className="dynamic-content-wrapper" dangerouslySetInnerHTML={{ __html: data.content }} />
          )}
        </div>
      </div>
    );
  }

  if (page.layout === "BLANK") {
    return (
      <div className="dynamic-page blank-layout">
        {page.customCss && <style>{page.customCss}</style>}
        {page.customHtml ? (
          <div className="dynamic-content-wrapper" dangerouslySetInnerHTML={{ __html: page.customHtml }} />
        ) : (
          <div className="dynamic-content-wrapper" dangerouslySetInnerHTML={{ __html: data.content }} />
        )}
      </div>
    );
  }

  // Default STANDARD layout
  return (
    <div className="dynamic-page standard-layout" style={{ backgroundColor: "#f8fafc", minHeight: "100vh" }}>
      {page.customCss && <style>{page.customCss}</style>}
      
      {/* Header Kecil */}
      <div style={{ backgroundColor: "#0d6e3f", color: "white", padding: "60px 20px", textAlign: "center" }}>
        <h1 style={{ fontSize: "36px", marginBottom: "12px" }}>{page.title}</h1>
        {page.subtitle && <p style={{ opacity: 0.9 }}>{page.subtitle}</p>}
      </div>

      <div style={{ padding: "40px 20px", maxWidth: "800px", margin: "-40px auto 40px", backgroundColor: "white", borderRadius: "12px", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }}>
        {page.customHtml ? (
          <div className="dynamic-content-wrapper" dangerouslySetInnerHTML={{ __html: page.customHtml }} />
        ) : (
          <div className="dynamic-content-wrapper" dangerouslySetInnerHTML={{ __html: data.content || "Konten belum ditambahkan." }} />
        )}
      </div>
    </div>
  );
}
