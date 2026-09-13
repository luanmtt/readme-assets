// api/random-photo.js

// Keep this list as the single source of truth for the pool.
const IMAGES = [
  "https://raw.githubusercontent.com/luanmtt/readme-assets/main/pics/1.jpg",
  "https://raw.githubusercontent.com/luanmtt/readme-assets/main/pics/2.jpg",
  "https://raw.githubusercontent.com/luanmtt/readme-assets/main/pics/3.jpg",
  "https://raw.githubusercontent.com/luanmtt/readme-assets/main/pics/4.jpg",
  "https://raw.githubusercontent.com/luanmtt/readme-assets/main/pics/5.jpg",
  "https://raw.githubusercontent.com/luanmtt/readme-assets/main/pics/6.jpg",
  "https://raw.githubusercontent.com/luanmtt/readme-assets/main/pics/7.jpg",
  "https://raw.githubusercontent.com/luanmtt/readme-assets/main/pics/8.jpg",
  "https://raw.githubusercontent.com/luanmtt/readme-assets/main/pics/9.jpg",
  "https://raw.githubusercontent.com/luanmtt/readme-assets/main/pics/10.jpg",
  "https://raw.githubusercontent.com/luanmtt/readme-assets/main/pics/11.jpg",
  "https://raw.githubusercontent.com/luanmtt/readme-assets/main/pics/12.jpg",
];


// A safe, always-available fallback in case IMAGES is ever empty
// (e.g. someone clears the array by mistake in a future edit).
const FALLBACK_IMAGE =
  "https://raw.githubusercontent.com/luanmtt/readme-assets/main/fallback.jpg";


function pickRandom(list) {
  if (!Array.isArray(list) || list.length === 0) return null;
  const index = Math.floor(Math.random() * list.length);
  return list[index];
}

function toResizedUrl(originalUrl) {
  const encoded = encodeURIComponent(originalUrl);
  return `https://wsrv.nl/?url=${encoded}&w=1600&q=80&output=jpg`;
}


export default function handler(req, res) {
  try {

    const chosen = pickRandom(IMAGES) || FALLBACK_IMAGE;

    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "0");

    return res.redirect(302, toResizedUrl(chosen));

  } catch (err) {

    console.error("random-photo handler error:", err);
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");

    return res.redirect(302, toResizedUrl(FALLBACK_IMAGE));

  }
}
