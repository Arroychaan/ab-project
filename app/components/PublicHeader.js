"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function PublicHeader() {
  const [rootMenus, setRootMenus] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // Fetch menu dari API
    fetch("/api/public/menus")
      .then(res => res.json())
      .then(data => setRootMenus(data))
      .catch(err => console.error(err));
  }, []);

  // Tutup drawer jika pindah halaman
  useEffect(() => {
    setIsDrawerOpen(false);
  }, [pathname]);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-logo">
          <Link href="/">
            <img
              src="/Logo-assets/Logo-Albahjah.png?v=3"
              alt="Logo Al-Bahjah"
              className="navbar-logo-img"
              style={{ cursor: "pointer" }}
            />
          </Link>
        </div>

        <div className="navbar-links">
          {rootMenus.map((menu) => {
            const isActive = pathname === menu.url || (menu.url !== "/" && pathname.startsWith(menu.url));
            if (menu.isDropdown && menu.children?.length > 0) {
              return (
                <div key={menu.id} className="navbar-item dropdown">
                  <span className={`navbar-link-dropdown ${isActive ? "active" : ""}`}>
                    {menu.label}
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </span>
                  <div className="navbar-dropdown-menu">
                    {menu.children.map((child) => (
                      <Link key={child.id} href={child.url || "#"} className="navbar-dropdown-item">
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              );
            }

            return (
              <Link key={menu.id} href={menu.url || "#"} className={isActive ? "active" : ""}>
                {menu.label}
              </Link>
            );
          })}
        </div>

        <div className="navbar-actions">
          <a
            href="https://wa.me/6281318223521"
            target="_blank"
            rel="noopener noreferrer"
            className="navbar-cta"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            Hubungi Kami
          </a>

          {/* Hamburger Menu Button */}
          <button 
            className="navbar-hamburger" 
            onClick={() => setIsDrawerOpen(true)}
            aria-label="Buka Menu"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        </div>
      </nav>

      {/* ============ MOBILE DRAWER ============ */}
      <div className={`navbar-drawer-overlay ${isDrawerOpen ? "open" : ""}`} onClick={() => setIsDrawerOpen(false)} />
      <div className={`navbar-drawer ${isDrawerOpen ? "open" : ""}`}>
        <div className="navbar-drawer-header">
          <img src="/Logo-assets/Logo-Albahjah.png?v=3" alt="Logo" style={{ width: "40px", borderRadius: "8px" }} />
          <button className="navbar-drawer-close" onClick={() => setIsDrawerOpen(false)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
        <div className="navbar-drawer-links">
          {rootMenus.map((menu) => {
            if (menu.isDropdown && menu.children?.length > 0) {
              return (
                <div key={menu.id}>
                  <div style={{ color: "var(--text-light)", fontSize: "14px", fontWeight: "700", marginTop: "16px", paddingLeft: "16px" }}>
                    {menu.label.toUpperCase()}
                  </div>
                  {menu.children.map((child) => (
                    <Link key={child.id} href={child.url || "#"} style={{ paddingLeft: "24px", fontSize: "15px", display: "block", marginTop: "8px", textDecoration: "none", color: "var(--text)" }}>
                      {child.label}
                    </Link>
                  ))}
                  <div style={{ borderTop: "1px solid #e2e8f0", margin: "16px 0" }}></div>
                </div>
              );
            }

            return (
              <Link key={menu.id} href={menu.url || "#"} style={{ display: "block", fontSize: "15px", margin: "8px 0 8px 16px", textDecoration: "none", color: "var(--text)" }}>
                {menu.label}
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
