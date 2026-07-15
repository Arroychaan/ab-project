"use client";

import "./admin.css";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { SessionProvider } from "next-auth/react";
import AdminSidebar from "@/app/components/admin/AdminSidebar";
import AdminHeader from "@/app/components/admin/AdminHeader";

function AdminLayoutInner({ children }) {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Login page renders without sidebar/header
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  // Loading state
  if (status === "loading") {
    return (
      <div className="adm-layout" style={{ justifyContent: "center", alignItems: "center" }}>
        <div style={{ textAlign: "center", color: "#64748b" }}>
          <div style={{
            width: "40px", height: "40px", border: "3px solid #e2e8f0",
            borderTopColor: "#0d6e3f", borderRadius: "50%",
            animation: "spin 0.8s linear infinite", margin: "0 auto 16px"
          }} />
          <p style={{ fontSize: "14px" }}>Memuat...</p>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      </div>
    );
  }

  return (
    <div className="adm-layout">
      <AdminSidebar
        isMobileOpen={isMobileOpen}
        onCloseMobile={() => setIsMobileOpen(false)}
        userRole={session?.user?.role}
      />

      <div className="adm-main">
        <AdminHeader
          user={session?.user}
          onToggleSidebar={() => setIsMobileOpen(!isMobileOpen)}
        />
        <main className="adm-content">
          {children}
        </main>
      </div>
    </div>
  );
}

export default function AdminLayout({ children }) {
  return (
    <SessionProvider>
      <AdminLayoutInner>{children}</AdminLayoutInner>
    </SessionProvider>
  );
}
