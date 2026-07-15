"use client";

import { usePathname } from "next/navigation";

export default function HeaderWrapper({ children }) {
  const pathname = usePathname();

  // Sembunyikan header publik di seluruh area admin
  if (pathname.startsWith("/admin")) {
    return null;
  }

  return <>{children}</>;
}
