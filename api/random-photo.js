// api/random-photo.js

// Keep this list as the single source of truth for the pool.
const IMAGES = [
  "https://raw.githubusercontent.com/your-username/readme-assets/main/images/1.jpg",
  "https://raw.githubusercontent.com/your-username/readme-assets/main/images/2.jpg",
  "https://raw.githubusercontent.com/your-username/readme-assets/main/images/3.jpg",
];

// A safe, always-available fallback in case IMAGES is ever empty
// (e.g. someone clears the array by mistake in a future edit).
const FALLBACK_IMAGE =
  "https://raw.githubusercontent.com/your-username/readme-assets/main/images/1.jpg";

function pickRandom(list) {
  if (!Array.isArray(list) || list.length === 0) return null;
  const index = Math.floor(Math.random() * list.length);
  return list[index];
}

export default function handler(req, res) {
  try {
    const chosen = pickRandom(IMAGES) || FALLBACK_IMAGE;

    // Prevent GitHub's camo proxy / browsers from caching the redirect target,
    // so repeat visits have a real chance of getting a different image.
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "0");

    return res.redirect(302, chosen);
  } catch (err) {
    // Last-resort safety net: never let this endpoint 500 out and
    // leave a broken image icon on the README. Always resolve to *something*.
    console.error("random-photo handler error:", err);
    try {
      res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
      return res.redirect(302, FALLBACK_IMAGE);
    } catch {
      // If even the redirect fails, respond with a minimal valid response
      // instead of an unhandled crash.
      res.statusCode = 302;
      res.setHeader("Location", FALLBACK_IMAGE);
      return res.end();
    }
  }
}
