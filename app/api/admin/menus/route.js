import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { auth } from "@/auth";

export async function GET() {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const menus = await prisma.menu.findMany({
    orderBy: { order: "asc" },
    include: {
      children: { orderBy: { order: "asc" } },
    },
  });
  return NextResponse.json(menus);
}

export async function POST(req) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const data = await req.json();
    const newMenu = await prisma.menu.create({
      data: {
        label: data.label,
        url: data.url,
        parentId: data.parentId || null,
        order: data.order || 0,
        isDropdown: data.isDropdown || false,
      },
    });
    return NextResponse.json(newMenu);
  } catch (error) {
    return NextResponse.json({ error: "Failed to create menu" }, { status: 500 });
  }
}
