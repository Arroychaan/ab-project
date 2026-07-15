import { prisma } from "@/lib/prisma";
import EditClient from "./EditClient";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  return {
    title: `Edit ${slug} | Admin Panel`,
  };
}

export default async function EditPage({ params }) {
  const { slug } = await params;
  
  const pageData = await prisma.page.findUnique({
    where: { slug: slug },
  });

  if (!pageData) {
    return notFound();
  }

  return <EditClient slug={slug} pageData={pageData} />;
}
