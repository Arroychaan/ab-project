"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  {
    label: "MENU UTAMA",
    items: [
      { href: "/admin", icon: "dashboard", label: "Dashboard" },
      { href: "/admin/media", icon: "media", label: "Media Library" },
      { href: "/admin/users", icon: "users", label: "Kelola Admin" },
    ],
  },
  {
    label: "KELOLA HALAMAN",
    items: [
      { href: "/admin/edit/sambutan", icon: "sambutan", label: "Sambutan Pengasuh" },
      { href: "/admin/edit/sejarah", icon: "sejarah", label: "Sejarah & Profil" },
      { href: "/admin/edit/visi-misi", icon: "visi", label: "Visi, Misi & Pilar" },
      { href: "/admin/edit/unit", icon: "unit", label: "Unit Pendidikan" },
      { href: "/admin/edit/agenda", icon: "agenda", label: "Agenda Santri" },
    ],
  },
];

const icons = {
  dashboard: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  ),
  media: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <polyline points="21 15 16 10 5 21" />
    </svg>
  ),
  users: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  sambutan: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  ),
  sejarah: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  ),
  visi: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
  unit: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  ),
  agenda: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  ),
};

export default function AdminSidebar({ isMobileOpen, onCloseMobile }) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Overlay */}
      <div
        className={`adm-sidebar-overlay ${isMobileOpen ? "visible" : ""}`}
        onClick={onCloseMobile}
      />

      {/* Sidebar */}
      <aside className={`adm-sidebar ${isMobileOpen ? "mobile-open" : ""}`}>
        {/* Brand */}
        <div className="adm-sidebar-brand">
          <img src="/Logo-assets/Logo-Albahjah.png?v=3" alt="Al-Bahjah" />
          <div className="adm-sidebar-brand-text">
            <h2>Al-Bahjah</h2>
            <span>Admin Panel</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="adm-sidebar-nav">
          {navItems.map((section) => (
            <div key={section.label}>
              <div className="adm-sidebar-label">{section.label}</div>
              {section.items.map((item) => {
                const isActive =
                  item.href === "/admin"
                    ? pathname === "/admin"
                    : pathname.startsWith(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`adm-sidebar-link ${isActive ? "active" : ""}`}
                    onClick={onCloseMobile}
                  >
                    {icons[item.icon]}
                    {item.label}
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div className="adm-sidebar-footer">
          <Link href="/" className="adm-sidebar-link" target="_blank">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
            Lihat Website
          </Link>
        </div>
      </aside>
    </>
  );
}
