import { NextResponse } from 'next/server';
import cloudinary from '@/lib/cloudinary';
import { prisma } from '@/lib/prisma';

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get('file');

    if (!file) {
      return NextResponse.json({ error: 'No file found' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload to Cloudinary via stream
    const uploadResult = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: 'albahjah-media' },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      uploadStream.end(buffer);
    });

    // Save to DB
    const media = await prisma.mediaFile.create({
      data: {
        filename: uploadResult.public_id,
        originalName: file.name,
        mimeType: file.type,
        size: file.size,
        path: uploadResult.secure_url,
        width: uploadResult.width,
        height: uploadResult.height,
      }
    });

    return NextResponse.json(media);
  } catch (error) {
    console.error('Upload Error:', error);
    return NextResponse.json(
      { error: error.message || error.toString() || 'Upload failed' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const files = await prisma.mediaFile.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(files);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch media' }, { status: 500 });
  }
}
