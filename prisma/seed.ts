import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // ── Create default Super Admin ──
  const adminEmail = process.env.ADMIN_EMAIL || "admin@albahjah.com";
  const adminPassword = process.env.ADMIN_PASSWORD || "albahjah2026";
  const adminName = process.env.ADMIN_NAME || "Administrator";

  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail },
  });

  if (!existingAdmin) {
    const hashedPassword = await hash(adminPassword, 12);
    await prisma.user.create({
      data: {
        name: adminName,
        email: adminEmail,
        password: hashedPassword,
        role: "SUPER_ADMIN",
      },
    });
    console.log(`✅ Super Admin created: ${adminEmail}`);
  } else {
    console.log(`⚠️  Admin already exists: ${adminEmail}`);
  }

  // ── Seed initial page content ──
  const pagesData = [
    {
      slug: "sambutan",
      title: "Sambutan Khadimul Ummah",
      subtitle: "Lembaga Pengembangan Dakwah (LPD) Al-Bahjah",
      data: JSON.stringify({
        photo: { src: "/buya-yahya.jpg", alt: "Buya Yahya" },
        personName: "Buya Yahya",
        personTitle: "Pengasuh LPD Al-Bahjah",
        greeting: "Assalamu'alaikum Warahmatullahi Wabarakatuh",
        paragraphs: [
          "Puji syukur kehadirat Allah SWT yang senantiasa melimpahkan taufiq dan hidayah-Nya. Shalawat serta salam semoga tercurah limpahkan kepada junjungan kita Nabi Besar Muhammad SAW, keluarga, sahabat, dan para pengikutnya hingga akhir zaman.",
          "LPD Al-Bahjah hadir dengan membawa visi dakwah dan tarbiyah yang kokoh berdasarkan manhaj Ahlus Sunnah wal Jama'ah. Di unit pendidikan formal kami (SDIQu, SMPIQu, SMAIQu), kami berkomitmen untuk melahirkan para penghafal Al-Qur'an yang tidak hanya unggul secara akademis, tetapi juga memiliki akhlak mulia dan kedalaman ilmu agama (Tafaqquh Fiddin).",
          "Kami mengajak para orang tua untuk bersama-sama mendidik putra-putri kita menjadi generasi tangguh penyambung lidah dakwah Baginda Nabi Muhammad SAW. Semoga ikhtiar mulia ini senantiasa diridhai dan dimudahkan oleh Allah SWT.",
        ],
        closing: "Wassalamu'alaikum Warahmatullahi Wabarakatuh",
      }),
    },
    {
      slug: "sejarah",
      title: "Sejarah & Profil Yayasan",
      subtitle: "Perjalanan LPD Al-Bahjah Cirebon dari Masa ke Masa",
      data: JSON.stringify({
        intro: "Lembaga Pengembangan Dakwah (LPD) Al-Bahjah Cirebon didirikan oleh Buya Yahya (K.H. Yahya Zainul Ma'arif) dengan tujuan utama menyebarkan dakwah Islam yang rahmatan lil 'alamin, serta membangun sistem tarbiyah yang berlandaskan keluhuran budi pekerti (akhlakul karimah) dan pemahaman agama yang mendalam.",
        timeline: [
          { badge: "Masa Awal", title: "Majelis Taklim & Dakwah Keliling", description: "Perjalanan dimulai dari majelis-majelis taklim kecil dan dakwah dari satu masjid ke masjid lain di wilayah Cirebon dan sekitarnya oleh Buya Yahya untuk membangun fondasi keimanan umat." },
          { badge: "Pendirian LPD", title: "Peresmian LPD Al-Bahjah Cirebon 1 (Pusat)", description: "Seiring bertambahnya jumlah jemaah dan kebutuhan akan pendidikan Islam yang terstruktur, didirikanlah kompleks pusat Al-Bahjah di Sendang, Sumber, Cirebon sebagai wadah dakwah, sosial, dan tarbiyah." },
          { badge: "Pendidikan Formal", title: "SDIQu, SMPIQu, & SMAIQu Al-Bahjah", description: "Membuka pintu pendidikan formal berkonsep berasrama (boarding) berbasis Al-Qur'an untuk melahirkan generasi mutafaqqih fiddin yang ahli sains dan teknologi serta hafal Al-Qur'an 30 Juz." },
        ],
        closing: "Kini, LPD Al-Bahjah Cirebon telah tumbuh menjadi salah satu pusat rujukan pendidikan Islam terbaik di Jawa Barat dengan ribuan santri aktif dan puluhan cabang LPD Al-Bahjah di seluruh pelosok Nusantara.",
      }),
    },
    {
      slug: "visi-misi",
      title: "Visi, Misi & 3 Pilar Utama",
      subtitle: "Komitmen Keislaman dan Pendidikan Unggulan Al-Bahjah",
      data: JSON.stringify({
        visi: "Membentuk generasi Qur'ani, berakhlak mulia, berilmu dan berprestasi untuk masa depan umat yang lebih baik.",
        misi: [
          "Menyelenggarakan sistem pendidikan terpadu yang memadukan kurikulum agama dan umum secara seimbang.",
          "Menumbuhkan kecintaan terhadap Al-Qur'an melalui program tahfidz yang terstruktur dan berkualitas.",
          "Membina karakter santri dengan adab Islami dan keteladanan akhlak mulia baginda Nabi Muhammad SAW.",
          "Mendorong prestasi akademis dan non-akademis santri di tingkat nasional maupun internasional.",
        ],
        pilar: [
          { emoji: "📖", title: "Tahfidzul Qur'an", description: "Membina santri agar hafal Al-Qur'an 30 Juz secara mutqin, tartil, serta memahami dasar-dasar tajwid dan makhorijul huruf dengan baik." },
          { emoji: "📚", title: "Tafaqquh Fiddin", description: "Membekali santri dengan pemahaman fikih, akidah, hadits, dan bahasa Arab (alat) melalui kajian kitab-kitab khazanah keislaman Ahlus Sunnah wal Jama'ah." },
          { emoji: "🤝", title: "Akhlakul Karimah", description: "Mengutamakan keteladanan adab dalam keseharian santri, melatih khidmah (pengabdian) kepada sesama, dan berbakti kepada orang tua (birrul walidain)." },
        ],
      }),
    },
    {
      slug: "unit",
      title: "Profil Unit Pendidikan",
      subtitle: "Jenjang Pendidikan Formal di Sekolah & Ponpes Al-Bahjah Cirebon",
      data: JSON.stringify({
        units: [
          { logo: "/Logo-assets/sd-iqu-logo.png", name: "SDIQu (SD Islam Qur'ani) Al-Bahjah", tagline: "Membangun dasar keimanan, akhlak mulia, dan semangat belajar sejak dini.", description: "Fokus utama jenjang sekolah dasar adalah membentuk karakter dasar, penanaman adab harian, pengenalan ibadah praktis, dan pencapaian hafalan Al-Qur'an juz-juz awal secara lancar serta tajwid yang benar dalam suasana belajar yang menyenangkan." },
          { logo: "/Logo-assets/smp-iqu-logo.png", name: "SMPIQu (SMP Islam Qur'ani) Al-Bahjah", tagline: "Membentuk karakter Qur'ani, berpikir kritis, dan siap menghadapi tantangan.", description: "Santri mulai memasuki kehidupan asrama secara penuh (boarding). Kurikulum dirancang untuk memperkuat hafalan Al-Qur'an menuju target 15-20 Juz, pendalaman dasar bahasa Arab lisan & tulisan, serta pengenalan dini kajian kitab kuning bersama pengajar berpengalaman." },
          { logo: "/Logo-assets/sma-iqu-logo.png", name: "SMAIQu (SMA Islam Qur'ani) Al-Bahjah", tagline: "Mempersiapkan generasi unggul untuk melanjutkan pendidikan dan berkontribusi bagi umat.", description: "Merupakan jenjang pemantapan hafalan Al-Qur'an 30 Juz secara mutqin, pendalaman kajian kitab kuning tingkat menengah, pelatihan kepemimpinan (Qiyadah), serta persiapan intensif menuju jenjang perguruan tinggi nasional maupun internasional (Timur Tengah)." },
        ],
      }),
    },
    {
      slug: "agenda",
      title: "Agenda Harian Santri",
      subtitle: "Rutinitas Harian Pembentukan Karakter Qur'ani & Disiplin",
      data: JSON.stringify({
        scheduleItems: [
          { time: "03:00 - 04:30", title: "Qiyamul Lail & Subuh Berjamaah", description: "Bangun pagi, mandi, shalat tahajjud berjamaah, dzikir/wirid Subuh, dan Shalat Subuh berjamaah." },
          { time: "04:30 - 06:00", title: "Halaqah Al-Qur'an Pagi", description: "Setoran hafalan baru (ziyadah) dan pengulangan hafalan (muraja'ah) bersama ustadz/ustadzah pengampu." },
          { time: "06:00 - 07:00", title: "Sarapan & Persiapan Sekolah", description: "Sarapan pagi, menjaga kebersihan asrama, dan bersiap memakai seragam sekolah formal." },
          { time: "07:00 - 12:00", title: "KBM Kurikulum Formal & Diniyah", description: "Kegiatan belajar mengajar mata pelajaran nasional yang diintegrasikan dengan materi keagamaan sekolah." },
          { time: "12:00 - 13:00", title: "Makan Siang & Shalat Dzuhur", description: "Makan siang bersama dan Shalat Dzuhur berjamaah di masjid pondok." },
          { time: "13:00 - 15:00", title: "KBM Siang & Istirahat (Qailulah)", description: "Melanjutkan kelas formal atau istirahat tidur siang sejenak sesuai sunnah baginda Nabi." },
          { time: "15:00 - 17:00", title: "Shalat Ashar & Halaqah Sore", description: "Shalat Ashar berjamaah dilanjutkan pengulangan hafalan (muraja'ah) untuk memantapkan ingatan." },
          { time: "17:00 - 19:30", title: "Mandi, Maghrib Berjamaah & Kajian", description: "Mandi sore, makan malam, Shalat Maghrib berjamaah, dan mendengarkan kajian kitab bersama ustadz." },
          { time: "19:30 - 21:00", title: "Shalat Isya & Istirahat Malam", description: "Shalat Isya berjamaah, belajar mandiri/menyelesaikan tugas sekolah, lalu tidur malam maksimal pukul 21:30." },
        ],
      }),
    },
  ];

  for (const page of pagesData) {
    const existing = await prisma.page.findUnique({
      where: { slug: page.slug },
    });

    if (!existing) {
      await prisma.page.create({ data: page });
      console.log(`✅ Page seeded: ${page.slug}`);
    } else {
      console.log(`⚠️  Page already exists: ${page.slug}`);
    }
  }

  console.log("\n🎉 Seeding complete!");
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
