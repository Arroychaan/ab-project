import "./globals.css";

export const metadata = {
  title: "IQU - Islamic Quran University",
  description: "Al Bahjah Cabang Cirebon 1",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>
        {children}
      </body>
    </html>
  );
}
