import { NextResponse } from "next/server";
import { auth } from "@/auth";
import OpenAI from "openai";

const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY || "sk-9c76227eab464a6d9d6d7033fd201033";

const openai = new OpenAI({
  baseURL: "https://api.deepseek.com/v1", // <-- Using v1 to be safe with OpenAI SDK
  apiKey: DEEPSEEK_API_KEY,
});

export async function POST(request) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { action, text, contextStr } = body;

    if (!action || !text) {
      return NextResponse.json({ error: "Action and text are required" }, { status: 400 });
    }

    let systemPrompt = "Anda adalah AI Pejuang Al-Bahjah yang sangat cerdas, sholeh, dan profesional, bertugas sebagai asisten di Admin Panel Website Yayasan Al-Bahjah di bawah asuhan Buya Yahya. Gunakan bahasa yang santun, Islami, dan sejuk.";
    
    switch (action) {
      case "fix_grammar":
        systemPrompt += " Tugas Anda: Perbaiki tata bahasa, Ejaan Yang Disempurnakan (EYD), dan keterbacaan teks berikut tanpa mengubah makna aslinya. Jika sudah baik, biarkan saja. Balas HANYA dengan teks yang sudah diperbaiki, berformat HTML yang sesuai (p, br, dll).";
        break;
      case "expand":
        systemPrompt += " Tugas Anda: Kembangkan dan elaborasi paragraf berikut menjadi lebih detail, informatif, dan profesional. Pertahankan gaya bahasa Islami yang sejuk khas Al-Bahjah. Balas HANYA dengan teks hasil ekspansi berformat HTML.";
        break;
      case "rewrite_formal":
        systemPrompt += " Tugas Anda: Tulis ulang teks berikut dengan gaya bahasa yang sangat formal, profesional, dan bernuansa dakwah Islami yang santun. Balas HANYA dengan teks yang ditulis ulang berformat HTML.";
        break;
      case "generate":
        systemPrompt += " Tugas Anda: Buatkan teks berdasarkan instruksi atau topik berikut. Buat sekreatif mungkin namun tetap sesuai dengan visi misi lembaga dakwah Islam Al-Bahjah. Balas HANYA dengan hasil teksnya berformat HTML.";
        break;
      case "translate_ar":
        systemPrompt += " Tugas Anda: Terjemahkan teks berikut ke dalam Bahasa Arab yang fasih (Fusha). Balas HANYA dengan teks Bahasa Arabnya beserta harakatnya agar mudah dibaca berformat HTML.";
        break;
      case "translate_en":
        systemPrompt += " Tugas Anda: Terjemahkan teks berikut ke Bahasa Inggris yang profesional. Balas HANYA dengan teks Bahasa Inggrisnya berformat HTML.";
        break;
      case "generate_code":
        systemPrompt += " Tugas Anda (Sebagai AI Developer Agent): Buatkan kode HTML & CSS murni (menggunakan inline style atau vanilla css) berdasarkan permintaan pengguna. Desain harus profesional, rapi, bernuansa modern, dan cocok untuk website pesantren. Balas HANYA dengan KODE HTML mentah (tanpa markdown blok ```html). JANGAN memberikan penjelasan apa pun. JANGAN membalas menggunakan markdown backticks. Langsung tag HTML nya saja.";
        break;
      case "custom":
        systemPrompt += ` Tugas Anda: ${contextStr}. Ikuti instruksi tersebut. Balas HANYA dengan hasil akhir teksnya (gunakan format HTML jika pantas, atau HTML murni jika diminta code).`;
        break;
      default:
        systemPrompt += " Tugas Anda: Bantu admin mengolah teks berikut.";
    }

    const completion = await openai.chat.completions.create({
      model: "deepseek-chat", // DeepSeek model 
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: text },
      ],
      temperature: 0.7,
      max_tokens: 1500,
    });

    const resultText = completion.choices[0].message.content.trim();

    return NextResponse.json({ success: true, result: resultText });

  } catch (error) {
    console.error("AI Assistant Error:", error);
    return NextResponse.json(
      { error: "Gagal memproses permintaan AI. Pastikan API key valid dan koneksi stabil." },
      { status: 500 }
    );
  }
}
