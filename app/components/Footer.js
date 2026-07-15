import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function Footer() {
  const settingsDb = await prisma.webSetting.findMany();
  const settings = settingsDb.reduce((acc, curr) => {
    acc[curr.key] = curr.value;
    return acc;
  }, {});

  const logoUrl = settings.logo_url || "/Logo-assets/Logo-Albahjah.png?v=3";
  const address = settings.address || "Jl. Pangeran Cakrabuana No.179, Blok Karanganyar, Kelurahan Sendang, Kecamatan Sumber, Kabupaten Cirebon, Jawa Barat 45611";
  const copyright = settings.copyright || `© ${new Date().getFullYear()} Sekolah & Ponpes Al-Bahjah Cirebon 1`;
  const igLink = settings.ig_link || "https://instagram.com/albahjah";
  const waLink = settings.wa_link || "https://whatsapp.com/channel/0029VbBbIRWJkK74Ms899h1j";
  const waNumber = settings.wa_number || "+62 813-1822-3521";

  return (
    <footer style={{ backgroundColor: "#064e3b", color: "#ecfdf5", paddingTop: "60px", paddingBottom: "20px", marginTop: "auto" }}>
      <div className="container" style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 20px" }}>
        
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "40px", paddingBottom: "40px", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
          
          {/* Kolom 1: Logo & Alamat */}
          <div>
            <div style={{ backgroundColor: "white", padding: "12px", borderRadius: "8px", display: "inline-block", marginBottom: "20px" }}>
              <img src={logoUrl} alt="Logo Al-Bahjah" style={{ height: "50px", objectFit: "contain" }} />
            </div>
            <p style={{ lineHeight: "1.7", opacity: 0.9, fontSize: "14px" }}>
              {address}
            </p>
          </div>

          {/* Kolom 2: Navigasi */}
          <div>
            <h3 style={{ fontSize: "18px", marginBottom: "20px", color: "white" }}>Tautan Cepat</h3>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
              <li><Link href="/" style={{ color: "#a7f3d0", textDecoration: "none", fontSize: "15px" }}>Beranda</Link></li>
              <li><Link href="/berita" style={{ color: "#a7f3d0", textDecoration: "none", fontSize: "15px" }}>Berita & Artikel</Link></li>
              <li><Link href="/admin/login" style={{ color: "#a7f3d0", textDecoration: "none", fontSize: "15px" }}>Login Admin</Link></li>
            </ul>
          </div>

          {/* Kolom 3: Kontak & Sosial Media */}
          <div>
            <h3 style={{ fontSize: "18px", marginBottom: "20px", color: "white" }}>Hubungi Kami</h3>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "16px" }}>
              <li style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: "20px", height: "20px", color: "#34d399" }}>
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
                <span style={{ opacity: 0.9 }}>{waNumber}</span>
              </li>
              <li style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <a href={igLink} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: "12px", color: "inherit", textDecoration: "none" }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: "20px", height: "20px", color: "#34d399" }}>
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                  <span style={{ opacity: 0.9 }}>Instagram Al-Bahjah</span>
                </a>
              </li>
              <li style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <a href={waLink} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: "12px", color: "inherit", textDecoration: "none" }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: "20px", height: "20px", color: "#34d399" }}>
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                  </svg>
                  <span style={{ opacity: 0.9 }}>Saluran WhatsApp</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div style={{ paddingTop: "20px", textAlign: "center", fontSize: "14px", opacity: 0.7 }}>
          <p>{copyright}</p>
        </div>

      </div>
    </footer>
  );
}
