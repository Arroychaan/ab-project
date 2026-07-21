"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";
import AdminHelpModal from "./AdminHelpModal";

export default function AdminHeader({ user, title, subtitle, onToggleSidebar }) {
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "AD";

  const roleLabel = user?.role === "SUPER_ADMIN" ? "Super Admin" : "Admin";

  return (
    <header className="adm-header">
      <div className="adm-header-left">
        {/* Mobile hamburger */}
        <button className="adm-hamburger" onClick={onToggleSidebar} aria-label="Toggle Menu">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>

        <div>
          <h1>{title || "Dashboard"}</h1>
          {subtitle && <p>{subtitle}</p>}
        </div>
      </div>

      <div className="adm-header-right">
        <button 
          className="adm-help-trigger-btn" 
          onClick={() => setIsHelpOpen(true)}
          title="Bantuan & Panduan"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
            <line x1="12" y1="17" x2="12.01" y2="17"></line>
          </svg>
          <span style={{ marginLeft: "8px", fontWeight: "600", fontSize: "14px" }}>Bantuan</span>
        </button>

        <div className="adm-user-info">
          <div className="adm-user-avatar">{initials}</div>
          <div>
            <div className="adm-user-name">{user?.name || "Admin"}</div>
            <div className="adm-user-role">{roleLabel}</div>
          </div>
        </div>

        <button
          className="adm-logout-btn"
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
        >
          Logout
        </button>
      </div>

      <AdminHelpModal isOpen={isHelpOpen} onClose={() => setIsHelpOpen(false)} />
    </header>
  );
}
