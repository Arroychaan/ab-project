import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { auth } from "@/auth";

export async function GET(req) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const pages = await prisma.page.findMany({
      orderBy: { createdAt: "desc" }
    });
    return NextResponse.json(pages);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch pages" }, { status: 500 });
  }
}

export async function POST(req) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const data = await req.json();
    
    // Check jika slug sudah dipakai
    const existing = await prisma.page.findUnique({ where: { slug: data.slug } });
    if (existing) {
      return NextResponse.json({ error: "Slug (URL) sudah digunakan!" }, { status: 400 });
    }

    const newPage = await prisma.page.create({
      data: {
        slug: data.slug,
        title: data.title,
        subtitle: data.subtitle || null,
        layout: data.layout || "STANDARD",
        data: data.data || "{}",
        customCss: data.customCss || null,
        customHtml: data.customHtml || null,
        lastEditBy: session.user?.name || "Admin",
      }
    });

    return NextResponse.json(newPage);
  } catch (error) {
    return NextResponse.json({ error: "Failed to create page" }, { status: 500 });
  }
}
