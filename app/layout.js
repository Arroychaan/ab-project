import "./globals.css";
import WhatsAppFloat from "./components/WhatsAppFloat";
import PublicHeader from "./components/PublicHeader";
import HeaderWrapper from "./components/HeaderWrapper";
import Footer from "./components/Footer";

import FooterWrapper from "./components/FooterWrapper";

import NextTopLoader from "nextjs-toploader";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "Sekolah & Ponpes Al-Bahjah Cirebon 1",
  description: "Membentuk generasi Qur'ani, berakhlak mulia, berilmu dan berprestasi untuk masa depan yang lebih baik.",
  icons: {
    icon: "/Logo-assets/icon-albahjah-pusat.svg",
    shortcut: "/Logo-assets/icon-albahjah-pusat.svg",
    apple: "/Logo-assets/icon-albahjah-pusat.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <head>
        <link rel="icon" href="/Logo-assets/icon-albahjah-pusat.svg" type="image/svg+xml" />
      </head>
      <body style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <NextTopLoader 
          color="#10b981" 
          initialPosition={0.1}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={false}
          easing="ease"
          speed={200}
          shadow="0 0 10px #10b981,0 0 5px #10b981"
        />
        <HeaderWrapper>
          <PublicHeader />
        </HeaderWrapper>
        {children}
        <FooterWrapper>
          <Footer />
        </FooterWrapper>
        <WhatsAppFloat />
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
