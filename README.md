# readme-photo-randomizer

Serves a random image redirect (`/api/random-photo`) meant to be embedded in
a GitHub profile README as an `<img>` source, so the photo appears random on
each view.

## Usage

1. Edit `api/random-photo.js`:
   - Replace the URLs in `IMAGES` with your own image URLs.
   - Set `FALLBACK_IMAGE` to an image you're confident will always exist.
2. Deploy to Vercel.
3. In your profile README, use:
   ```md
   <img src="https://YOUR-PROJECT.vercel.app/api/random-photo" width="300" />
   ```
