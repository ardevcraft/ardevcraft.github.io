# AR Rahman Portfolio — Next.js

Converted from the original Nuxt/Vue portfolio into a maintainable **Next.js 16 App Router + TypeScript** project.

The site content is intentionally stored in static JSON files so profile/project/experience updates do not require editing React components.

## Stack

- Next.js 16.3.4
- React 19
- TypeScript
- App Router
- Tabler Icons React
- Plain responsive CSS (no CSS framework dependency)
- Static export (`output: 'export'`)

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Production build

```bash
npm run build
npm start
```

`npm run build` generates a fully static website in `out/`. `npm start` serves that directory locally.

## Content management

All editable portfolio content is under `data/`. All current and legacy project entries are merged into the single `projects.json` source:

```text
data/
├── about.json
├── achievements.json
├── education.json
├── experiences.json
├── hobbies.json
├── profile.json
├── projects.json
├── settings.json
├── site.json
├── support.json
├── technologies.json
└── ui.json
```

### Update profile/social links

Edit `data/profile.json`.

### Add a project

Add an object to `data/projects.json`:

```json
{
  "key": "example",
  "title": {
    "en": "Example Project",
    "bn": "Example Project"
  },
  "description": {
    "en": "Project description",
    "bn": "Project description"
  },
  "types": ["mobile"],
  "cover": "/projects/example.png",
  "links": {
    "github": "https://github.com/example",
    "live": "https://example.com",
    "playstore": ""
  },
  "technologies": ["Flutter", "Dart"]
}
```

Then place the image inside `public/projects/`.

Supported project filters are currently:

- `mobile`
- `web`
- `backend`
- `iot`
- `package`

### Add a technology

Edit `data/technologies.json`. Technology cards and project/experience badges are generated from this file.

## Localization

Localized values use this simple shape:

```json
{
  "en": "English text",
  "bn": "বাংলা লেখা"
}
```

No i18n framework is required. The selected language is persisted in `localStorage`.

## Theme

Light/dark mode is persisted in `localStorage` and falls back to the device theme on the first visit.

## Resume

The original `public/resume.pdf` is preserved. `/resume` provides fullscreen, close/back, and download controls.

## Missing images from the original archive

The original project data references:

- `/projects/grc.jpg`
- `/projects/ccr.jpg`

Those files were not present in the uploaded archive. The Next.js version keeps the original paths and displays a graceful fallback card when an image is missing. Add the two files under `public/projects/` later to restore the covers without changing any React code.

## Static hosting

Because the project uses Next.js static export, the generated `out/` directory can be deployed to static hosting such as GitHub Pages, Netlify, Cloudflare Pages, or a normal web server.
