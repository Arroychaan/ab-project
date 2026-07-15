import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const menus = await prisma.menu.findMany({
      where: { parentId: null },
      orderBy: { order: "asc" },
      include: {
        children: {
          orderBy: { order: "asc" },
        },
      },
    });
    return NextResponse.json(menus);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch menus" }, { status: 500 });
  }
}
