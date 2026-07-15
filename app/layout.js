import "./globals.css";
import WhatsAppFloat from "./components/WhatsAppFloat";
import PublicHeader from "./components/PublicHeader";
import HeaderWrapper from "./components/HeaderWrapper";
import Footer from "./components/Footer";

export const metadata = {
  title: "IQU - Islamic Quran University",
  description: "Sekolah & Ponpes Al-Bahjah Cabang Cirebon 1 (Pusat)",
};

import { Toaster } from "react-hot-toast";

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <HeaderWrapper>
          <PublicHeader />
        </HeaderWrapper>
        {children}
        <Footer />
        <WhatsAppFloat />
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
