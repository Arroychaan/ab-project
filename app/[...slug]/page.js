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
        
        <div className="hero-section" style={{ position: "relative", padding: "160px 20px", color: "white", textAlign: "center", display: "flex", flexDirection: "column", justifyContent: "center", minHeight: "60vh" }}>
          {/* Background image with overlay */}
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, backgroundImage: `url(${data.heroImage || '/hero-bg.webp'})`, backgroundSize: "cover", backgroundPosition: "center", zIndex: 0 }} />
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.7) 100%)", zIndex: 1 }} />
          
          <div style={{ position: "relative", zIndex: 2, maxWidth: "900px", margin: "0 auto" }}>
            <h1 style={{ fontSize: "52px", fontWeight: "800", marginBottom: "20px", textShadow: "0 4px 12px rgba(0,0,0,0.4)", letterSpacing: "-1px", lineHeight: "1.2" }}>{page.title}</h1>
            {page.subtitle && <p style={{ fontSize: "22px", opacity: 0.95, textShadow: "0 2px 8px rgba(0,0,0,0.5)", fontWeight: "300", lineHeight: "1.6" }}>{page.subtitle}</p>}
          </div>
        </div>
        <div className="container" style={{ padding: "80px 20px", maxWidth: "900px", margin: "0 auto" }}>
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
      
      {/* Premium Header */}
      <div style={{ background: "linear-gradient(135deg, #0d6e3f 0%, #0a5a33 100%)", color: "white", padding: "100px 20px 120px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, backgroundImage: "url('/design-assets/hero-pattern.png')", opacity: 0.05, pointerEvents: "none" }} />
        <h1 style={{ fontSize: "42px", fontWeight: "700", marginBottom: "16px", position: "relative", zIndex: 1, letterSpacing: "-0.5px" }}>{page.title}</h1>
        {page.subtitle && <p style={{ opacity: 0.9, fontSize: "18px", maxWidth: "600px", margin: "0 auto", position: "relative", zIndex: 1, lineHeight: "1.6" }}>{page.subtitle}</p>}
      </div>

      <div style={{ padding: "50px 50px", maxWidth: "850px", margin: "-70px auto 80px", backgroundColor: "white", borderRadius: "24px", boxShadow: "0 20px 40px rgba(0, 0, 0, 0.08)", position: "relative", zIndex: 2 }}>
        {page.customHtml ? (
          <div className="dynamic-content-wrapper" dangerouslySetInnerHTML={{ __html: page.customHtml }} />
        ) : (
          <div className="dynamic-content-wrapper" dangerouslySetInnerHTML={{ __html: data.content || "Konten belum ditambahkan." }} />
        )}
      </div>
    </div>
  );
}
