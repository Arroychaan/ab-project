### API Error Handling Rule
- When writing or modifying Next.js API Routes, ensure the `catch (error)` block does not just return a generic message like `"Terjadi kesalahan"` or `"Upload failed"`. Instead, always return `error.message` or `error.toString()` (e.g., `NextResponse.json({ error: error.message }, { status: 500 })`) so that issues are easy to debug in production.
- On the frontend/client side, when catching an error from an API, display the actual error message to the user using a toast or error UI, rather than just a static fallback message.
