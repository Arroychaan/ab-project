"use client";

import { signOut } from "next-auth/react";

export default function AdminHeader({ user, title, subtitle, onToggleSidebar }) {
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
    </header>
  );
}
