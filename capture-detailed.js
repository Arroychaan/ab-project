const puppeteer = require('puppeteer');
const fs = require('fs');

// Ensure directory exists
if (!fs.existsSync('public/guide/step')) {
  fs.mkdirSync('public/guide/step', { recursive: true });
}

(async () => {
  console.log("Memulai Puppeteer untuk Screenshot Detail...");
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });

  try {
    console.log("Login...");
    await page.goto('http://localhost:3000/admin/login');
    await page.waitForSelector('input[type="email"]');
    await page.type('input[type="email"]', 'admin@albahjah.com');
    await page.type('input[type="password"]', 'albahjah2026');
    await page.click('button[type="submit"]');
    await page.waitForNavigation({ waitUntil: 'networkidle0' });

    // 1. DASHBOARD & SIDEBAR
    console.log("Capture Dashboard & Sidebar...");
    const sidebar = await page.$('.adm-sidebar');
    if (sidebar) await sidebar.screenshot({ path: 'public/guide/step/sidebar.jpg', type: 'jpeg', quality: 80 });
    
    // 2. PAGES
    console.log("Capture Pages...");
    await page.goto('http://localhost:3000/admin/pages');
    await page.waitForSelector('table', { timeout: 5000 }).catch(() => {});
    const btnCreatePage = await page.$('.adm-btn-primary');
    if (btnCreatePage) await btnCreatePage.screenshot({ path: 'public/guide/step/btn-create-page.jpg', type: 'jpeg', quality: 80 });

    // CREATE PAGE
    console.log("Capture Create Page Steps...");
    await page.goto('http://localhost:3000/admin/pages/create');
    await page.waitForSelector('input[type="text"]', { timeout: 5000 }).catch(() => {});
    
    // Screenshot bagian atas form (Judul, Slug, Subjudul)
    const formTop = await page.$('.adm-card > div:nth-child(1)');
    if (formTop) await formTop.screenshot({ path: 'public/guide/step/form-page-top.jpg', type: 'jpeg', quality: 80 });
    
    // Screenshot Dropdown Layout
    const layoutSelect = await page.$('.adm-card > div:nth-child(3)');
    if (layoutSelect) await layoutSelect.screenshot({ path: 'public/guide/step/form-page-layout.jpg', type: 'jpeg', quality: 80 });

    // Screenshot Tombol Preview Halaman
    const previewBtn = await page.evaluateHandle(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      return buttons.find(b => b.innerText.includes('Preview Halaman'));
    });
    if (previewBtn) await previewBtn.asElement().screenshot({ path: 'public/guide/step/btn-preview-page.jpg', type: 'jpeg', quality: 80 });

    // Klik Tombol Preview Halaman
    if (previewBtn) {
      await previewBtn.asElement().click();
      await new Promise(r => setTimeout(r, 1000));
      // Capture Preview Modal Container
      const previewModal = await page.evaluateHandle(() => {
        return Array.from(document.querySelectorAll('div')).find(div => div.innerText && div.innerText.includes('Live Preview') && div.innerText.includes('Mobile View'));
      });
      if (previewModal) await previewModal.asElement().screenshot({ path: 'public/guide/step/preview-modal.jpg', type: 'jpeg', quality: 80 });
      // Klik Mobile Toggle
      const mobileBtn = await page.evaluateHandle(() => {
        const buttons = Array.from(document.querySelectorAll('button'));
        return buttons.find(b => b.innerText.includes('Mobile View'));
      });
      if (mobileBtn) await mobileBtn.asElement().click();
      await new Promise(r => setTimeout(r, 1000));
      if (previewModal) await previewModal.asElement().screenshot({ path: 'public/guide/step/preview-modal-mobile.jpg', type: 'jpeg', quality: 80 });
      // Close Modal
      const closeBtn = await page.evaluateHandle(() => {
        const buttons = Array.from(document.querySelectorAll('button'));
        return buttons.find(b => b.innerText === '×');
      });
      if (closeBtn) await closeBtn.asElement().click();
      await new Promise(r => setTimeout(r, 500));
    }

    // Screenshot Developer Mode Toggle (ada di adm-section-header)
    const devToggle = await page.$('.adm-section-header > div:nth-child(2)');
    if (devToggle) await devToggle.screenshot({ path: 'public/guide/step/dev-toggle.jpg', type: 'jpeg', quality: 80 });

    // 3. POSTS
    console.log("Capture Posts & Editor...");
    await page.goto('http://localhost:3000/admin/posts/create');
    await page.waitForSelector('.ql-editor', { timeout: 5000 }).catch(() => {});

    // Screenshot Kolom Thumbnail
    const thumbnailInput = await page.$('.adm-card > div:nth-child(2)');
    if (thumbnailInput) await thumbnailInput.screenshot({ path: 'public/guide/step/form-post-thumbnail.jpg', type: 'jpeg', quality: 80 });

    // Screenshot Toolbar Editor
    const toolbar = await page.$('.ql-toolbar');
    if (toolbar) await toolbar.screenshot({ path: 'public/guide/step/editor-toolbar.jpg', type: 'jpeg', quality: 80 });

    // Screenshot Checkbox Publikasi & Tombol Simpan
    const publishBox = await page.$('.adm-card > div:nth-child(5)');
    if (publishBox) await publishBox.screenshot({ path: 'public/guide/step/post-publish.jpg', type: 'jpeg', quality: 80 });

    // 4. MEDIA LIBRARY
    console.log("Capture Media Library...");
    await page.goto('http://localhost:3000/admin/media');
    await new Promise(r => setTimeout(r, 2000));
    
    // Screenshot Area Upload
    const uploadArea = await page.$('.adm-card:first-of-type');
    if (uploadArea) await uploadArea.screenshot({ path: 'public/guide/step/media-upload.jpg', type: 'jpeg', quality: 80 });

    // Screenshot Galeri & Tombol Copy URL (jika ada gambar, ambil satu card)
    const mediaCard = await page.$('.adm-card:last-of-type > div > div:first-child');
    if (mediaCard) await mediaCard.screenshot({ path: 'public/guide/step/media-card.jpg', type: 'jpeg', quality: 80 });

    // 5. SETTINGS & USERS
    console.log("Capture Settings & Users...");
    await page.goto('http://localhost:3000/admin/settings');
    await page.waitForSelector('.adm-card', { timeout: 5000 }).catch(() => {});
    await page.screenshot({ path: 'public/guide/screenshot-settings.jpg', type: 'jpeg', quality: 80 });

    await page.goto('http://localhost:3000/admin/users');
    await page.waitForSelector('table', { timeout: 5000 }).catch(() => {});
    await page.screenshot({ path: 'public/guide/screenshot-users.jpg', type: 'jpeg', quality: 80 });

    console.log("Screenshot detail selesai.");
  } catch (error) {
    console.error("Error saat capture detail:", error);
  } finally {
    await browser.close();
  }
})();
