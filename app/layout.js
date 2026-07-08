import "./globals.css";
import WhatsAppFloat from "./components/WhatsAppFloat";

export const metadata = {
  title: "IQU - Islamic Quran University",
  description: "Sekolah & Ponpes Al-Bahjah Cabang Cirebon 1 (Pusat)",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>
        {children}
        <WhatsAppFloat />
      </body>
    </html>
  );
}
