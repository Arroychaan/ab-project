"use client";

import { useRef, useMemo, useCallback } from "react";
import { toast } from "react-hot-toast";

/**
 * Custom hook untuk ReactQuill yang menangani upload gambar ke Cloudinary
 * alih-alih menyisipkan gambar sebagai Base64.
 */
export function useQuillImageUpload() {
  const quillRef = useRef(null);

  const imageHandler = useCallback(() => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) return;

      // Validasi ukuran (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Ukuran gambar terlalu besar! Maksimal 5MB.");
        return;
      }

      const toastId = toast.loading("Mengunggah gambar...");

      try {
        const formData = new FormData();
        formData.append("file", file);

        const res = await fetch("/api/admin/media", {
          method: "POST",
          body: formData,
        });

        const data = await res.json();

        if (!res.ok) {
          toast.error(data.error || "Gagal mengunggah gambar", { id: toastId });
          return;
        }

        // Ambil URL gambar dari response
        const imageUrl = data.path || data.url;

        // Sisipkan gambar ke editor menggunakan URL (bukan Base64)
        const quill = quillRef.current?.getEditor?.();
        if (quill) {
          const range = quill.getSelection(true);
          quill.insertEmbed(range.index, "image", imageUrl);
          quill.setSelection(range.index + 1);
        }

        toast.success("Gambar berhasil disisipkan!", { id: toastId });
      } catch (error) {
        toast.error(error.message || "Gagal mengunggah gambar", { id: toastId });
      }
    };
  }, []);

  const quillModules = useMemo(() => ({
    toolbar: {
      container: [
        [{ 'header': [1, 2, 3, 4, false] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ 'align': [] }],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        ['link', 'image'],
        ['clean']
      ],
      handlers: {
        image: imageHandler,
      },
    },
  }), [imageHandler]);

  return { quillRef, quillModules };
}
