import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const pagesCount = await prisma.page.count();
    const adminsCount = await prisma.user.count();
    const mediaCount = await prisma.mediaFile.count();

    return NextResponse.json({
      pages: pagesCount,
      admins: adminsCount,
      media: mediaCount,
    });
  } catch (error) {
    console.error("GET stats error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
