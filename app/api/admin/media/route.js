import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import path from "path";
import fs from "fs/promises";
import sharp from "sharp";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const media = await prisma.mediaFile.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ success: true, media });
  } catch (error) {
    console.error("GET media error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const session = await auth();
    if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const formData = await request.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const originalName = file.name;
    const isImage = file.type.startsWith("image/");
    
    // Create uploads dir if it doesn't exist
    const uploadsDir = path.join(process.cwd(), "public", "uploads");
    await fs.mkdir(uploadsDir, { recursive: true });

    let finalFilename = `${Date.now()}-${originalName.replace(/\s+/g, "-")}`;
    let finalPath = path.join(uploadsDir, finalFilename);
    let publicPath = `/uploads/${finalFilename}`;
    let mimeType = file.type;
    let size = buffer.length;
    let width = null;
    let height = null;

    if (isImage) {
      // Process with sharp for images (resize max 1920px wide, convert to webp for optimization)
      finalFilename = `${Date.now()}-${path.parse(originalName).name.replace(/\s+/g, "-")}.webp`;
      finalPath = path.join(uploadsDir, finalFilename);
      publicPath = `/uploads/${finalFilename}`;
      mimeType = "image/webp";
      
      const processedImage = await sharp(buffer)
        .resize(1920, 1920, { fit: "inside", withoutEnlargement: true })
        .webp({ quality: 80 })
        .toFile(finalPath);
        
      size = processedImage.size;
      width = processedImage.width;
      height = processedImage.height;
    } else {
      // For videos or other files, just save directly
      await fs.writeFile(finalPath, buffer);
    }

    // Save metadata to DB
    const media = await prisma.mediaFile.create({
      data: {
        filename: finalFilename,
        originalName: originalName,
        mimeType: mimeType,
        size: size,
        path: publicPath,
        width: width,
        height: height,
      },
    });

    return NextResponse.json({ success: true, media }, { status: 201 });
  } catch (error) {
    console.error("POST media error:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const session = await auth();
    if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Missing media ID" }, { status: 400 });
    }

    const media = await prisma.mediaFile.findUnique({
      where: { id },
    });

    if (!media) {
      return NextResponse.json({ error: "Media not found" }, { status: 404 });
    }

    // Delete file from disk
    const filePath = path.join(process.cwd(), "public", media.path);
    try {
      await fs.unlink(filePath);
    } catch (fsError) {
      console.warn("Failed to delete file from disk:", fsError);
    }

    // Delete from DB
    await prisma.mediaFile.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE media error:", error);
    return NextResponse.json({ error: "Deletion failed" }, { status: 500 });
  }
}
