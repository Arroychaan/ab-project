import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { auth } from "@/auth";

export async function DELETE(req, { params }) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { id } = params;
    
    // Hapus child menus dulu jika ini dropdown
    await prisma.menu.deleteMany({
      where: { parentId: id }
    });

    // Hapus parent menu
    await prisma.menu.delete({
      where: { id }
    });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete menu" }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { id } = params;
    const data = await req.json();
    
    const updated = await prisma.menu.update({
      where: { id },
      data: {
        label: data.label,
        url: data.url,
        order: parseInt(data.order || 0)
      }
    });
    
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update menu" }, { status: 500 });
  }
}
