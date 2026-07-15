import { prisma } from "@/lib/prisma";
import VisiMisiClient from "./VisiMisiClient";

export const metadata = {
  title: "Visi, Misi & 3 Pilar | Al-Bahjah",
  description: "Komitmen Keislaman dan Pendidikan Unggulan Al-Bahjah",
};

export const revalidate = 60;

export default async function VisiMisiPage() {
  const pageData = await prisma.page.findUnique({
    where: { slug: "visi-misi" },
  });

  return <VisiMisiClient pageData={pageData} />;
}
