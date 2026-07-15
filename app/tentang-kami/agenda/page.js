import { prisma } from "@/lib/prisma";
import AgendaClient from "./AgendaClient";

export const metadata = {
  title: "Agenda Harian Santri | Al-Bahjah",
  description: "Rutinitas Harian Pembentukan Karakter Qur'ani & Disiplin",
};

export const revalidate = 60;

export default async function AgendaPage() {
  const pageData = await prisma.page.findUnique({
    where: { slug: "agenda" },
  });

  return <AgendaClient pageData={pageData} />;
}
