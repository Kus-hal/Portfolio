# Video source

Two HTML compositions, `launch.html` (vertical, 20 s) and `reel.html` (landscape, 15 s), rendered
frame by frame in headless Chrome and encoded with FFmpeg. Every frame is a pure function of time
(`window.renderAt(t)`), so renders are deterministic. Colours, fonts and the photo match the site.

This folder has its own `package.json`, so the video tooling never touches the site's dependencies.

## Render

```bash
npm install
npm run stills
npm run render
```

- `npm run stills` writes review stills to `../work/stills/`.
- `npm run render` writes `../brag.mp4`, `../showreel.mp4` and their posters.
- `node render.mjs --encode` re-encodes from existing frames, e.g. after an audio change.
- Append `launch` or `reel` to any command to render only that video.

**Requirements:**
- Google Chrome. Set `CHROME_PATH` if it isn't in the default Windows location.
- FFmpeg ships via `ffmpeg-static`.

## Music (not committed)

Put these tracks in `../music/`:

- `happy-beats-business-moves-vol-9-by-ende-dot-app.mp3` (launch video)
- `happy-beats-business-moves-vol-11-by-ende-dot-app.mp3` (showreel)

They come from the [latent-spaces/brag](https://github.com/latent-spaces/brag) skill
(`skills/brag/assets/music/`). Its README says their licence must be verified. **Check ende.app's terms
before posting the videos publicly.** They're kept out of git for the same reason.
