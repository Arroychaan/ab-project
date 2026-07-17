import { NextResponse } from 'next/server';
import cloudinary from '@/lib/cloudinary';
import { prisma } from '@/lib/prisma';

export async function DELETE(req, { params }) {
  try {
    const { id } = await params;

    const media = await prisma.mediaFile.findUnique({
      where: { id }
    });

    if (!media) {
      return NextResponse.json({ error: 'Media not found' }, { status: 404 });
    }

    // Delete from Cloudinary
    await cloudinary.uploader.destroy(media.filename);

    // Delete from DB
    await prisma.mediaFile.delete({
      where: { id }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete Error:', error);
    return NextResponse.json(
      { error: error.message || error.toString() || 'Failed to delete media' },
      { status: 500 }
    );
  }
}
