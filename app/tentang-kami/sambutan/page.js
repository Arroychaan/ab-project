import { prisma } from "@/lib/prisma";
import SambutanClient from "./SambutanClient";

export const metadata = {
  title: "Sambutan Pengasuh | Al-Bahjah",
  description: "Sambutan Khadimul Ummah LPD Al-Bahjah Cirebon",
};

export const revalidate = 60; // Revalidate every 60 seconds (ISR)

export default async function SambutanPage() {
  const pageData = await prisma.page.findUnique({
    where: { slug: "sambutan" },
  });

  return <SambutanClient pageData={pageData} />;
}
