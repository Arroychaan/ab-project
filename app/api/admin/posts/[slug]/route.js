import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { auth } from "@/auth";

export async function GET(req, { params }) {
  try {
    const post = await prisma.post.findUnique({
      where: { slug: params.slug },
      include: {
        author: { select: { name: true } }
      }
    });

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json(post);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch post" }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const data = await req.json();
    const updatedPost = await prisma.post.update({
      where: { slug: params.slug },
      data: {
        title: data.title,
        slug: data.slug,
        content: data.content,
        thumbnail: data.thumbnail,
        published: data.published
      }
    });

    return NextResponse.json(updatedPost);
  } catch (error) {
    if (error.code === 'P2002') {
      return NextResponse.json({ error: "Slug sudah digunakan" }, { status: 400 });
    }
    return NextResponse.json({ error: "Failed to update post" }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    await prisma.post.delete({
      where: { slug: params.slug }
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete post" }, { status: 500 });
  }
}
