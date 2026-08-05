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
    {
      slug: "sdiqu",
      title: "SDIQu Al-Bahjah Cirebon",
      subtitle: "Sekolah Dasar Islam Qur'ani — Membangun Dasar Keimanan & Akhlak Mulia Sejak Dini",
      layout: "HERO_IMAGE",
      data: JSON.stringify({
        heroImage: "/design-assets/bag-sd.png",
        content: "<h2><strong>Selamat Datang di SDIQu Al-Bahjah Cirebon</strong></h2><p>SDIQu (Sekolah Dasar Islam Qur'ani) Al-Bahjah Cirebon 1 adalah jenjang pendidikan dasar terpadu yang memadukan Kurikulum Merdeka Nasional dengan kurikulum khas Diniyah Pesantren Al-Bahjah.</p><p></p><h2><strong>Program Unggulan SDIQu</strong></h2><p>1. <strong>Tahfidzul Qur'an:</strong> Target hafalan Al-Qur'an Juz 30, 29, dan 28 secara mutqin dengan tajwid yang lancar.</p><p>2. <strong>Pembiasaan Adab & Akhlak:</strong> Penanaman ibadah praktis harian, doa-doa sunnah, dan adab santri Islami.</p><p>3. <strong>Bahasa Arab & Inggris Dasar:</strong> Pengenalan mufrodat (kosakata) dan percakapan harian.</p><p>4. <strong>Pembelajaran Akademik Terpadu:</strong> Penguatan sains, matematika, dan literasi yang berbasis nilai-nilai keislaman.</p><p></p><h2><strong>Fasilitas Unggulan</strong></h2><p>• Ruang Kelas Ber-AC & Multimedia</p><p>• Masjid & Ruang Tahfidz yang Nyaman</p><p>• Lapangan Olahraga & Area Bermain Terbuka</p><p>• Perpustakaan Digital & Pojok Baca</p><p></p><h2><strong>Informasi Pendaftaran</strong></h2><p>Untuk informasi pendaftaran murid baru (PPDB SDIQu Al-Bahjah), silakan hubungi Sekretariat Pendaftaran di WhatsApp resmi kami.</p>",
      }),
    },
    {
      slug: "smpiqu",
      title: "SMPIQu Al-Bahjah Cirebon",
      subtitle: "Sekolah Menengah Pertama Islam Qur'ani — Boarding School Berbasis Tahfidz & Kitab Kuning",
      layout: "HERO_IMAGE",
      data: JSON.stringify({
        heroImage: "/design-assets/masjid-smp.png",
        content: "<h2><strong>Selamat Datang di SMPIQu Al-Bahjah Cirebon</strong></h2><p>SMPIQu (Sekolah Menengah Pertama Islam Qur'ani) Al-Bahjah Cirebon 1 adalah lembaga pendidikan berasrama (boarding school) yang dirancang untuk membina santri memasuki usia remaja dengan pondasi agama yang kokoh.</p><p></p><h2><strong>Program Unggulan SMPIQu</strong></h2><p>1. <strong>Tahfidz Intensif:</strong> Program akselerasi hafalan Al-Qur'an menuju target 15 - 20 Juz.</p><p>2. <strong>Dirasah Islamiyah & Kitab Turats:</strong> Pendalaman dasar-dasar Fikih, Akidah, Hadits, dan Nahwu-Shorof.</p><p>3. <strong>Penguasaan Bahasa Arab & Inggris:</strong> Pembiasaan bilingual lisan dan tulisan di lingkungan asrama.</p><p>4. <strong>Prestasi Akademik & Sains:</strong> Penguatan KBM sains dan teknologi untuk persiapan olimpiade.</p><p></p><h2><strong>Kehidupan Asrama (Boarding Life)</strong></h2><p>Santri didampingi oleh Murabbi/Murabbiyah berpengalaman selama 24 jam dengan rutinitas shalat berjamaah, halaqah Qur'an subuh & sore, serta kajian adab dan karakter.</p><p></p><h2><strong>Informasi Pendaftaran</strong></h2><p>Pendaftaran Santri Baru (PPDB SMPIQu Al-Bahjah) dibuka setiap tahun ajaran baru. Hubungi panitia PPDB melalui Kontak Resmi Al-Bahjah.</p>",
      }),
    },
    {
      slug: "smaiqu",
      title: "SMAIQu Al-Bahjah Cirebon",
      subtitle: "Sekolah Menengah Atas Islam Qur'ani — Generasi Mutafaqqih Fiddin & Berdaya Saing Global",
      layout: "HERO_IMAGE",
      data: JSON.stringify({
        heroImage: "/design-assets/piala-sma.png",
        content: "<h2><strong>Selamat Datang di SMAIQu Al-Bahjah Cirebon</strong></h2><p>SMAIQu (Sekolah Menengah Atas Islam Qur'ani) Al-Bahjah Cirebon 1 merupakan jenjang pemantapan dan kawah candradimuka bagi santri untuk melahirkan lulusan yang hafal Al-Qur'an 30 Juz mutqin, berakhlak mulia, dan siap berkiprah di perguruan tinggi ternama.</p><p></p><h2><strong>Program Unggulan SMAIQu</strong></h2><p>1. <strong>Khatam Tahfidz 30 Juz:</strong> Pemantapan dan ujian tasmi' hafalan 30 Juz Al-Qur'an secara mutqin.</p><p>2. <strong>Kajian Kitab Kuning Lanjutan:</strong> Pendalaman Fikih Al-Mahalli, Hadits, dan Bahasa Arab Tingkat Lanjut.</p><p>3. <strong>Bimbingan Masuk PTN & Luar Negeri:</strong> Program intensif persiapan SNBT, PTN Favorit, dan Beasiswa Timur Tengah (Al-Azhar Mesir, Yaman, dll).</p><p>4. <strong>Kepemimpinan & Organisasi Santri:</strong> Pelatihan Qiyadah (Organisasi Santri Al-Bahjah) dan Khidmah Masyarakat.</p><p></p><h2><strong>Informasi Pendaftaran & Kelulusan</strong></h2><p>Pendaftaran Santri Baru (PPDB SMAIQu) dapat dilakukan secara online maupun offline melalui Sekretariat Al-Bahjah Pusat.</p>",
      }),
    },
    {
      slug: "sekolah",
      title: "Jenjang Sekolah & Pendidikan",
      subtitle: "Pendidikan Terpadu Berbasis Al-Qur'an dan Akhlak Mulia",
      layout: "STANDARD",
      data: JSON.stringify({
        content: "<h2><strong>Lembaga Pendidikan Al-Bahjah Cirebon</strong></h2><p>LPD Al-Bahjah Cirebon menyelenggarakan pendidikan formal dari tingkat Sekolah Dasar hingga Sekolah Menengah Atas berasrama:</p><p></p><h3><strong>1. SDIQu Al-Bahjah (SD Islam Qur'ani)</strong></h3><p>Membangun dasar keimanan, karakter Islami, dan hafalan juz awal sejak usia dini. <a href='/sdiqu'>Lihat Selengkapnya &rarr;</a></p><p></p><h3><strong>2. SMPIQu Al-Bahjah (SMP Islam Qur'ani)</strong></h3><p>Boarding school berbasis tahfidz intensif dan pendalaman kitab kuning dasar. <a href='/smpiqu'>Lihat Selengkapnya &rarr;</a></p><p></p><h3><strong>3. SMAIQu Al-Bahjah (SMA Islam Qur'ani)</strong></h3><p>Pemantapan hafalan 30 Juz Al-Qur'an mutqin, kitab turats, dan persiapan perguruan tinggi nasional maupun internasional. <a href='/smaiqu'>Lihat Selengkapnya &rarr;</a></p>",
      }),
    },
    {
      slug: "program",
      title: "Program Unggulan Pesantren",
      subtitle: "Program Pendidikan & Tarbiyah Al-Bahjah Cirebon 1",
      layout: "STANDARD",
      data: JSON.stringify({
        content: "<h2><strong>Program Unggulan Al-Bahjah</strong></h2><p>1. <strong>Tahfidzul Qur'an Mutqin:</strong> Program bimbingan hafalan Al-Qur'an dengan sistem sanad dan tartil.</p><p>2. <strong>Tafaqquh Fiddin (Kajian Kitab Kuning):</strong> Pembekalan ilmu fikih, akidah, hadits, dan bahasa Arab berbasis kitab Ahlus Sunnah wal Jama'ah.</p><p>3. <strong>Pendidikan Akhlak & Adab Santri:</strong> Pembiasaan amalan sunnah, wirid, qiyamul lail, dan kepemimpinan Islami.</p><p>4. <strong>Ekstrakurikuler & Bahasa:</strong> Pramuka, panahan, beladiri, serta pengembangan bahasa Arab & Inggris.</p>",
      }),
    },
    {
      slug: "kontak",
      title: "Hubungi Kami",
      subtitle: "Lembaga Pengembangan Dakwah & Pendidikan Al-Bahjah Cirebon 1 (Pusat)",
      layout: "STANDARD",
      data: JSON.stringify({
        content: "<h2><strong>Alamat & Kontak Resmi</strong></h2><p><strong>Alamat:</strong> Jl. Pangeran Cakrabuana No.179, Blok Karanganyar, Kelurahan Sendang, Kecamatan Sumber, Kabupaten Cirebon, Jawa Barat 45611</p><p><strong>WhatsApp Sekretariat:</strong> +62 813-1822-3521</p><p><strong>Saluran Resmi WhatsApp:</strong> <a href='https://whatsapp.com/channel/0029VbBbIRWJkK74Ms899h1j' target='_blank'>Gabung Saluran WA Al-Bahjah</a></p><p><strong>Instagram:</strong> <a href='https://instagram.com/albahjahcirebon1' target='_blank'>@albahjahcirebon1</a></p>",
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

async function seedMenus() {
  const existingMenus = await prisma.menu.count();
  if (existingMenus > 0) {
    console.log(`⚠️  Menus already exist. Skipping menu seed.`);
    return;
  }

  // Root menus
  const beranda = await prisma.menu.create({ data: { label: "Beranda", url: "/", order: 1 } });
  
  const tentangKami = await prisma.menu.create({ 
    data: { label: "Tentang Kami", isDropdown: true, order: 2 } 
  });
  
  // Tentang Kami Dropdowns
  await prisma.menu.create({ data: { label: "Sambutan Pengasuh", url: "/sambutan", parentId: tentangKami.id, order: 1 } });
  await prisma.menu.create({ data: { label: "Sejarah & Profil Yayasan", url: "/sejarah", parentId: tentangKami.id, order: 2 } });
  await prisma.menu.create({ data: { label: "Visi, Misi & 3 Pilar", url: "/visi-misi", parentId: tentangKami.id, order: 3 } });
  await prisma.menu.create({ data: { label: "Profil Unit Pendidikan", url: "/unit", parentId: tentangKami.id, order: 4 } });
  await prisma.menu.create({ data: { label: "Agenda Harian Santri", url: "/agenda", parentId: tentangKami.id, order: 5 } });

  // Other root menus
  await prisma.menu.create({ data: { label: "Sekolah", url: "/sekolah", order: 3 } });
  await prisma.menu.create({ data: { label: "Program", url: "/program", order: 4 } });
  await prisma.menu.create({ data: { label: "Berita", url: "/berita", order: 5 } });
  await prisma.menu.create({ data: { label: "Kontak", url: "/kontak", order: 6 } });

  console.log(`✅ Initial Menus seeded successfully!`);
}

main()
  .then(seedMenus)
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
