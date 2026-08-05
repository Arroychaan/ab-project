"use client";

import { toast } from "react-hot-toast";

export const INSTITUTION_PRESETS = {
  sdiqu: {
    title: "SDIQu Al-Bahjah Cirebon",
    subtitle: "Sekolah Dasar Islam Qur'ani — Membangun Dasar Keimanan & Akhlak Mulia Sejak Dini",
    heroImage: "/design-assets/bag-sd.png",
    html: `<h2><strong>Selamat Datang di SDIQu Al-Bahjah Cirebon</strong></h2>
<p>SDIQu (Sekolah Dasar Islam Qur'ani) Al-Bahjah Cirebon 1 adalah jenjang pendidikan dasar terpadu yang memadukan Kurikulum Merdeka Nasional dengan kurikulum khas Diniyah Pesantren Al-Bahjah.</p>

<h2><strong>Program Unggulan SDIQu</strong></h2>
<p>1. <strong>Tahfidzul Qur'an:</strong> Target hafalan Al-Qur'an Juz 30, 29, dan 28 secara mutqin dengan tajwid yang lancar.</p>
<p>2. <strong>Pembiasaan Adab & Akhlak:</strong> Penanaman ibadah praktis harian, doa-doa sunnah, dan adab santri Islami.</p>
<p>3. <strong>Bahasa Arab & Inggris Dasar:</strong> Pengenalan mufrodat (kosakata) dan percakapan harian.</p>
<p>4. <strong>Pembelajaran Akademik Terpadu:</strong> Penguatan sains, matematika, dan literasi yang berbasis nilai-nilai keislaman.</p>

<h2><strong>Fasilitas Unggulan</strong></h2>
<p>• Ruang Kelas Ber-AC & Multimedia</p>
<p>• Masjid & Ruang Tahfidz yang Nyaman</p>
<p>• Lapangan Olahraga & Area Bermain Terbuka</p>
<p>• Perpustakaan Digital & Pojok Baca</p>

<h2><strong>Informasi Pendaftaran (PPDB SDIQu)</strong></h2>
<p>Untuk informasi pendaftaran murid baru (PPDB SDIQu Al-Bahjah), silakan hubungi Sekretariat Pendaftaran di WhatsApp resmi kami.</p>`
  },
  smpiqu: {
    title: "SMPIQu Al-Bahjah Cirebon",
    subtitle: "Sekolah Menengah Pertama Islam Qur'ani — Boarding School Berbasis Tahfidz & Kitab Kuning",
    heroImage: "/design-assets/masjid-smp.png",
    html: `<h2><strong>Selamat Datang di SMPIQu Al-Bahjah Cirebon</strong></h2>
<p>SMPIQu (Sekolah Menengah Pertama Islam Qur'ani) Al-Bahjah Cirebon 1 adalah lembaga pendidikan berasrama (boarding school) yang dirancang untuk membina santri memasuki usia remaja dengan pondasi agama yang kokoh.</p>

<h2><strong>Program Unggulan SMPIQu</strong></h2>
<p>1. <strong>Tahfidz Intensif:</strong> Program akselerasi hafalan Al-Qur'an menuju target 15 - 20 Juz.</p>
<p>2. <strong>Dirasah Islamiyah & Kitab Turats:</strong> Pendalaman dasar-dasar Fikih, Akidah, Hadits, dan Nahwu-Shorof.</p>
<p>3. <strong>Penguasaan Bahasa Arab & Inggris:</strong> Pembiasaan bilingual lisan dan tulisan di lingkungan asrama.</p>
<p>4. <strong>Prestasi Akademik & Sains:</strong> Penguatan KBM sains dan teknologi untuk persiapan olimpiade.</p>

<h2><strong>Kehidupan Asrama (Boarding Life)</strong></h2>
<p>Santri didampingi oleh Murabbi/Murabbiyah berpengalaman selama 24 jam dengan rutinitas shalat berjamaah, halaqah Qur'an subuh & sore, serta kajian adab dan karakter.</p>

<h2><strong>Informasi Pendaftaran (PPDB SMPIQu)</strong></h2>
<p>Pendaftaran Santri Baru (PPDB SMPIQu Al-Bahjah) dibuka setiap tahun ajaran baru. Hubungi panitia PPDB melalui Kontak Resmi Al-Bahjah.</p>`
  },
  smaiqu: {
    title: "SMAIQu Al-Bahjah Cirebon",
    subtitle: "Sekolah Menengah Atas Islam Qur'ani — Generasi Mutafaqqih Fiddin & Berdaya Saing Global",
    heroImage: "/design-assets/piala-sma.png",
    html: `<h2><strong>Selamat Datang di SMAIQu Al-Bahjah Cirebon</strong></h2>
<p>SMAIQu (Sekolah Menengah Atas Islam Qur'ani) Al-Bahjah Cirebon 1 merupakan jenjang pemantapan dan kawah candradimuka bagi santri untuk melahirkan lulusan yang hafal Al-Qur'an 30 Juz mutqin, berakhlak mulia, dan siap berkiprah di perguruan tinggi ternama.</p>

<h2><strong>Program Unggulan SMAIQu</strong></h2>
<p>1. <strong>Khatam Tahfidz 30 Juz:</strong> Pemantapan dan ujian tasmi' hafalan 30 Juz Al-Qur'an secara mutqin.</p>
<p>2. <strong>Kajian Kitab Kuning Lanjutan:</strong> Pendalaman Fikih Al-Mahalli, Hadits, dan Bahasa Arab Tingkat Lanjut.</p>
<p>3. <strong>Bimbingan Masuk PTN & Luar Negeri:</strong> Program intensif persiapan SNBT, PTN Favorit, dan Beasiswa Timur Tengah (Al-Azhar Mesir, Yaman, dll).</p>
<p>4. <strong>Kepemimpinan & Organisasi Santri:</strong> Pelatihan Qiyadah (Organisasi Santri Al-Bahjah) dan Khidmah Masyarakat.</p>

<h2><strong>Informasi Pendaftaran & Kelulusan (PPDB SMAIQu)</strong></h2>
<p>Pendaftaran Santri Baru (PPDB SMAIQu) dapat dilakukan secara online maupun offline melalui Sekretariat Al-Bahjah Pusat.</p>`
  }
};

export default function InstitutionTemplatePresets({ onSelectPreset }) {
  const applyPreset = (key) => {
    const preset = INSTITUTION_PRESETS[key];
    if (!preset) return;
    if (confirm(`Gunakan template preset "${preset.title}"? Konten editor akan diisi otomatis dengan struktur template ini.`)) {
      onSelectPreset(preset);
      toast.success(`Template ${preset.title} berhasil dimuat!`);
    }
  };

  return (
    <div style={{ backgroundColor: "#f8fafc", padding: "16px 20px", borderRadius: "12px", border: "1px solid #e2e8f0", marginBottom: "24px" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
        <div>
          <span style={{ fontSize: "13px", fontWeight: "700", color: "#0d6e3f", textTransform: "uppercase", letterSpacing: "0.5px" }}>
            🚀 Preset Template Institusi (1-Klik Rakit)
          </span>
          <p style={{ margin: "2px 0 0 0", fontSize: "12px", color: "#64748b" }}>
            Muat struktur konten awal secara otomatis untuk halaman SDIQu, SMPIQu, atau SMAIQu.
          </p>
        </div>

        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          <button
            type="button"
            className="adm-btn"
            style={{ fontSize: "12px", padding: "6px 12px", backgroundColor: "#16a34a", color: "white", border: "none" }}
            onClick={() => applyPreset("sdiqu")}
          >
            + Load SDIQu Template
          </button>
          <button
            type="button"
            className="adm-btn"
            style={{ fontSize: "12px", padding: "6px 12px", backgroundColor: "#2563eb", color: "white", border: "none" }}
            onClick={() => applyPreset("smpiqu")}
          >
            + Load SMPIQu Template
          </button>
          <button
            type="button"
            className="adm-btn"
            style={{ fontSize: "12px", padding: "6px 12px", backgroundColor: "#7c3aed", color: "white", border: "none" }}
            onClick={() => applyPreset("smaiqu")}
          >
            + Load SMAIQu Template
          </button>
        </div>
      </div>
    </div>
  );
}
