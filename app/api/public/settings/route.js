import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const settings = await prisma.webSetting.findMany();
    // Convert array of {key, value} to object {key: value}
    const settingsObj = settings.reduce((acc, curr) => {
      acc[curr.key] = curr.value;
      return acc;
    }, {});
    
    // Default values if empty
    if (!settingsObj.logo_url) settingsObj.logo_url = "/Logo-assets/Logo-Albahjah.png?v=3";
    if (!settingsObj.wa_link) settingsObj.wa_link = "https://whatsapp.com/channel/0029VbBbIRWJkK74Ms899h1j";
    
    return NextResponse.json(settingsObj);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 });
  }
}
