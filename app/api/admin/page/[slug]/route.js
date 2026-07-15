import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth"; // import the auth function from next-auth

export async function PUT(request, { params }) {
  try {
    const session = await auth();
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { slug } = await params;
    const body = await request.json();

    if (!body.title || !body.data) {
      return NextResponse.json({ error: "Title and Data are required" }, { status: 400 });
    }

    const updatedPage = await prisma.page.update({
      where: { slug: slug },
      data: {
        title: body.title,
        subtitle: body.subtitle || null,
        layout: body.layout || "STANDARD",
        data: body.data,
        customCss: body.customCss || null,
        customHtml: body.customHtml || null,
        lastEditBy: session.user.name || "Admin",
        updatedAt: new Date(),
      },
    });

    return NextResponse.json({ success: true, page: updatedPage }, { status: 200 });
  } catch (error) {
    if (error.code === 'P2025') {
      return NextResponse.json({ error: "Page not found" }, { status: 404 });
    }
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const session = await auth();
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { slug } = await params;
    
    await prisma.page.delete({
      where: { slug: slug },
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
