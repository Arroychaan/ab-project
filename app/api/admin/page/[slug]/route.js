import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth"; // import the auth function from next-auth

export async function PUT(request, { params }) {
  try {
    // Check authentication
    const session = await auth();
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { slug } = await params;
    const body = await request.json();

    // Validate fields
    if (!body.title || !body.data) {
      return NextResponse.json({ error: "Title and Data are required" }, { status: 400 });
    }

    // Update in database
    const updatedPage = await prisma.page.update({
      where: { slug: slug },
      data: {
        title: body.title,
        subtitle: body.subtitle || null,
        data: body.data,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json({ success: true, page: updatedPage }, { status: 200 });
  } catch (error) {
    console.error(`Error updating page [${params.slug}]:`, error);
    
    // Check if error is due to page not found
    if (error.code === 'P2025') {
      return NextResponse.json({ error: "Page not found" }, { status: 404 });
    }

    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
