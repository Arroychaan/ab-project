import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata({ params }) {
  try {
    const resolvedParams = await params;
    const slugPath = resolvedParams.slug.join("/");
    const page = await prisma.page.findUnique({
      where: { slug: slugPath },
    });
    if (!page) return { title: "Halaman Tidak Ditemukan" };
    return {
      title: `${page.title} | Al-Bahjah`,
      description: page.subtitle || page.title,
    };
  } catch (e) {
    return { title: "Al-Bahjah" };
  }
}

// Ini adalah Catcher Route dinamis untuk semua halaman publik CMS.
export default async function DynamicPage({ params }) {
  const resolvedParams = await params;
  const slugPath = resolvedParams.slug.join("/");

  let page = null;
  try {
    page = await prisma.page.findUnique({
      where: { slug: slugPath },
    });
  } catch (err) {
    console.error("Database query error in DynamicPage:", err);
  }

  if (!page) {
    notFound(); // 404 jika halaman tidak ditemukan
  }

  // Parse data JSON dengan aman
  let data = {};
  if (page.data) {
    try {
      data = typeof page.data === "string" ? JSON.parse(page.data) : page.data;
    } catch (err) {
      console.error("Failed to parse page.data JSON:", err);
      data = { content: typeof page.data === "string" ? page.data : "" };
    }
  }

  const rawHtml = page.customHtml || data.content || "";
  // Clean non-breaking spaces to avoid artificial word gaps in justified text
  const contentHtml = rawHtml.replace(/&nbsp;/g, " ");

  // Render berdasarkan Layout yang dipilih oleh Admin
  if (page.layout === "HERO_IMAGE") {
    return (
      <div className="dynamic-page hero-layout">
        {page.customCss && <style>{page.customCss}</style>}
        
        <div className="hero-section" style={{ position: "relative", padding: "140px 20px", color: "white", textAlign: "center", display: "flex", flexDirection: "column", justifyContent: "center", minHeight: "55vh" }}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, backgroundImage: `url(${data.heroImage || '/hero-bg.webp'})`, backgroundSize: "cover", backgroundPosition: "center", zIndex: 0 }} />
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.75) 100%)", zIndex: 1 }} />
          
          <div style={{ position: "relative", zIndex: 2, maxWidth: "1000px", margin: "0 auto", padding: "0 20px" }}>
            <h1 style={{ fontSize: "clamp(32px, 5vw, 52px)", fontWeight: "800", marginBottom: "16px", textShadow: "0 4px 12px rgba(0,0,0,0.4)", letterSpacing: "-0.5px", lineHeight: "1.2" }}>{page.title}</h1>
            {page.subtitle && <p style={{ fontSize: "clamp(16px, 2.5vw, 22px)", opacity: 0.95, textShadow: "0 2px 8px rgba(0,0,0,0.5)", fontWeight: "300", lineHeight: "1.6" }}>{page.subtitle}</p>}
          </div>
        </div>

        <div className="container" style={{ padding: "60px 20px 100px", maxWidth: "1140px", margin: "0 auto" }}>
          <div className="dynamic-content-wrapper" dangerouslySetInnerHTML={{ __html: contentHtml }} />
        </div>
      </div>
    );
  }

  if (page.layout === "BLANK") {
    return (
      <div className="dynamic-page blank-layout">
        {page.customCss && <style>{page.customCss}</style>}
        <div className="dynamic-content-wrapper" dangerouslySetInnerHTML={{ __html: contentHtml }} />
      </div>
    );
  }

  // Default STANDARD layout
  return (
    <div className="dynamic-page standard-layout" style={{ backgroundColor: "#f8fafc", minHeight: "100vh" }}>
      {page.customCss && <style>{page.customCss}</style>}
      
      {/* Premium Header */}
      <div style={{ background: "linear-gradient(135deg, #0d6e3f 0%, #0a5a33 100%)", color: "white", padding: "100px 20px 120px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, backgroundImage: "url('/design-assets/hero-pattern.png')", opacity: 0.06, pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: "1000px", margin: "0 auto", padding: "0 20px" }}>
          <h1 style={{ fontSize: "clamp(30px, 4vw, 44px)", fontWeight: "800", marginBottom: "12px", letterSpacing: "-0.5px" }}>{page.title}</h1>
          {page.subtitle && <p style={{ opacity: 0.92, fontSize: "clamp(15px, 2vw, 19px)", margin: "0 auto", lineHeight: "1.6", fontWeight: "300" }}>{page.subtitle}</p>}
        </div>
      </div>

      {/* Main Content Card Container */}
      <div style={{ padding: "56px 60px", width: "94%", maxWidth: "1140px", margin: "-60px auto 100px", backgroundColor: "white", borderRadius: "24px", boxShadow: "0 20px 50px rgba(15, 23, 42, 0.08)", position: "relative", zIndex: 2 }}>
        <div className="dynamic-content-wrapper" dangerouslySetInnerHTML={{ __html: contentHtml }} />
      </div>
    </div>
  );
}
