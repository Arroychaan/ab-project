import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { v2 as cloudinary } from "cloudinary";

// Konfigurasi Cloudinary dari .env.local
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "demo",
  api_key: process.env.CLOUDINARY_API_KEY || "dummy_api_key",
  api_secret: process.env.CLOUDINARY_API_SECRET || "dummy_api_secret",
});

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
    const isVideo = file.type.startsWith("video/");

    if (!isImage && !isVideo) {
       return NextResponse.json({ error: "Hanya gambar dan video yang diperbolehkan" }, { status: 400 });
    }

    // Upload to Cloudinary using upload_stream
    const uploadResult = await new Promise((resolve, reject) => {
      const uploadOptions = {
        folder: "albahjah",
        resource_type: isVideo ? "video" : "image",
      };

      // Optimasi gambar jika image (resize max 1920 dan konversi otomatis ke webp)
      if (isImage) {
        uploadOptions.format = "webp";
        uploadOptions.transformation = [
          { width: 1920, crop: "limit" }, // Resize max width
          { quality: "auto" } // Auto optimize quality
        ];
      }

      const stream = cloudinary.uploader.upload_stream(
        uploadOptions,
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      
      stream.end(buffer);
    });

    // Save metadata to DB
    const media = await prisma.mediaFile.create({
      data: {
        filename: uploadResult.public_id, // Gunakan public_id Cloudinary sebagai referensi untuk menghapus nanti
        originalName: originalName,
        mimeType: file.type,
        size: uploadResult.bytes,
        path: uploadResult.secure_url, // URL publik dari Cloudinary
        width: uploadResult.width,
        height: uploadResult.height,
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

    // Hapus file dari Cloudinary
    if (media.filename) {
      try {
        const resourceType = media.mimeType.startsWith("video/") ? "video" : "image";
        await cloudinary.uploader.destroy(media.filename, { resource_type: resourceType });
      } catch (cloudError) {
        console.warn("Failed to delete file from Cloudinary:", cloudError);
      }
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
