import "./globals.css";
import WhatsAppFloat from "./components/WhatsAppFloat";
import PublicHeader from "./components/PublicHeader";
import HeaderWrapper from "./components/HeaderWrapper";

export const metadata = {
  title: "IQU - Islamic Quran University",
  description: "Sekolah & Ponpes Al-Bahjah Cabang Cirebon 1 (Pusat)",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>
        <HeaderWrapper>
          <PublicHeader />
        </HeaderWrapper>
        {children}
        <WhatsAppFloat />
      </body>
    </html>
  );
}
