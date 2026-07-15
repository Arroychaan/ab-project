import { prisma } from "@/lib/prisma";
import SejarahClient from "./SejarahClient";

export const metadata = {
  title: "Sejarah & Profil Yayasan | Al-Bahjah",
  description: "Perjalanan LPD Al-Bahjah Cirebon dari Masa ke Masa",
};

export const revalidate = 60; // Revalidate every 60 seconds (ISR)

export default async function SejarahPage() {
  const pageData = await prisma.page.findUnique({
    where: { slug: "sejarah" },
  });

  return <SejarahClient pageData={pageData} />;
}
