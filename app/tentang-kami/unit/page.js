import { prisma } from "@/lib/prisma";
import UnitClient from "./UnitClient";

export const metadata = {
  title: "Profil Unit Pendidikan | Al-Bahjah",
  description: "Jenjang Pendidikan Formal di Sekolah & Ponpes Al-Bahjah Cirebon",
};

export const revalidate = 60;

export default async function UnitPage() {
  const pageData = await prisma.page.findUnique({
    where: { slug: "unit" },
  });

  return <UnitClient pageData={pageData} />;
}
