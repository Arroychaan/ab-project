import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { hash } from "bcryptjs";

// Hanya SUPER_ADMIN yang boleh mengakses route ini
async function checkSuperAdmin() {
  const session = await auth();
  if (!session?.user) {
    return { error: "Unauthorized", status: 401 };
  }
  if (session.user.role !== "SUPER_ADMIN") {
    return { error: "Forbidden: Membutuhkan akses SUPER_ADMIN", status: 403 };
  }
  return { user: session.user };
}

export async function GET() {
  try {
    const authCheck = await checkSuperAdmin();
    if (authCheck.error) return NextResponse.json({ error: authCheck.error }, { status: authCheck.status });

    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ success: true, users });
  } catch (error) {
    console.error("GET users error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const authCheck = await checkSuperAdmin();
    if (authCheck.error) return NextResponse.json({ error: authCheck.error }, { status: authCheck.status });

    const body = await request.json();
    const { name, email, password, role } = body;

    if (!name || !email || !password) {
      return NextResponse.json({ error: "Nama, email, dan password wajib diisi" }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json({ error: "Email sudah digunakan" }, { status: 400 });
    }

    const hashedPassword = await hash(password, 12);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: role === "SUPER_ADMIN" ? "SUPER_ADMIN" : "ADMIN",
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      }
    });

    return NextResponse.json({ success: true, user: newUser }, { status: 201 });
  } catch (error) {
    console.error("POST users error:", error);
    return NextResponse.json({ error: "Gagal membuat admin baru" }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const authCheck = await checkSuperAdmin();
    if (authCheck.error) return NextResponse.json({ error: authCheck.error }, { status: authCheck.status });

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Missing user ID" }, { status: 400 });
    }

    // Jangan izinkan super admin menghapus dirinya sendiri
    if (id === authCheck.user.id) {
      return NextResponse.json({ error: "Tidak dapat menghapus akun Anda sendiri" }, { status: 400 });
    }

    await prisma.user.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE users error:", error);
    return NextResponse.json({ error: "Gagal menghapus admin" }, { status: 500 });
  }
}
