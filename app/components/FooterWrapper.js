"use client";

import { usePathname } from "next/navigation";

export default function FooterWrapper({ children }) {
  const pathname = usePathname();

  // Sembunyikan footer di beranda ("/") dan di seluruh area admin
  if (pathname === "/" || pathname?.startsWith("/admin")) {
    return null;
  }

  return <>{children}</>;
}
