# Anlix — Digital Solutions & Print

Landing page and dashboard for **Anlix Digital Solutions**, Maun, Botswana.

## Pages

| File | Description |
|------|-------------|
| `index.html` | Public landing page with services & contact |
| `dashboard.html` | Internal financial dashboard (post-login) |

## Services Listed

- Sublimation T-Shirt — P200/unit
- Wall Banner 3m×2.25m — P3,500
- Football Kit 18 Set — P4,800
- 3M Teardrop Banner (2-set) — P1,500
- Telescopic Banner 3m — P1,500
- Pull-Up Banner — P850
- Bucket Hat — P100/unit
- Aluminium Gazebo 3m×3m — P5,500
- Steel Gazebo 3m×3m — P4,500

## Deploy

### GitHub → Netlify (recommended)
1. Push this repo to GitHub
2. Go to [app.netlify.com](https://app.netlify.com) → **Add new site** → **Import from Git**
3. Select this repo — Netlify auto-detects `netlify.toml`
4. Deploy — no build command needed (pure HTML)

### GitHub → GitHub Pages
1. Push to GitHub
2. Settings → Pages → Source: **main branch / root**
3. Site live at `https://yourusername.github.io/anlix`

## Tech Stack
- Pure HTML/CSS/JS — zero build step, zero dependencies
- Fonts: Bebas Neue + DM Sans + JetBrains Mono (Google Fonts)
- Charts: Chart.js (CDN)
- Color tokens: `#070e18` bg · `#22d3ee` accent · `#34d399` green · `#f87171` red · `#fbbf24` amber

## Local Development
```bash
# Just open in browser — no server needed
open index.html

# Or use any static server
npx serve .
```
