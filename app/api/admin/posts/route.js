import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { auth } from "@/auth";

export async function GET(req) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const posts = await prisma.post.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        author: {
          select: { name: true }
        }
      }
    });
    return NextResponse.json(posts);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 });
  }
}

export async function POST(req) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const data = await req.json();
    
    // Get authorId from session email
    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    });

    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    const newPost = await prisma.post.create({
      data: {
        title: data.title,
        slug: data.slug,
        content: data.content,
        thumbnail: data.thumbnail || null,
        published: data.published ?? true,
        authorId: user.id
      }
    });

    return NextResponse.json(newPost);
  } catch (error) {
    console.error(error);
    // Usually P2002 means unique constraint failed (slug)
    if (error.code === 'P2002') {
      return NextResponse.json({ error: "Slug sudah digunakan" }, { status: 400 });
    }
    return NextResponse.json({ error: "Failed to create post" }, { status: 500 });
  }
}
