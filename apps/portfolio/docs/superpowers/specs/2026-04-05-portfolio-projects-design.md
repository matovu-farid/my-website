# Portfolio Projects Page Redesign

## Summary

Redesign the `/projects` page to showcase GitHub projects with curated descriptions, images from READMEs, search, category filtering, pagination, and a ranking system that highlights the most impressive work.

## Approach

Curated TypeScript data file with client-side search and pagination. No API calls needed. Images sourced from GitHub raw URLs where available.

## Project Selection (15 projects, ranked)

### Featured (Top 6)

1. **Rishi** — Cross-platform book reader with TTS, Tauri monorepo
2. **Maria** — Production crypto trading bot, Effect.js, Docker Swarm (private repo)
3. **AI Scraping Ecosystem** — Dashboard + npm package + serverless backend (3 repos grouped)
4. **CaseMedInsurance** — Mobile insurance app on Google Play Store (Flutter/Firebase)
5. **Painter** — Drawing/painting app on Play Store (Flutter)
6. **Apartment Manager** — Property management app (Ruby on Rails)

### Remaining (paginated)

7. Book Reader — Desktop EPUB reader (Electron/React/TypeScript)
8. Proxy Service — Dockerized OpenAI TTS proxy (TypeScript/Docker/nginx)
9. Realtime Analytics — Search analytics dashboard (Ruby on Rails)
10. RC-Textfield — Published React component library (npm)
11. Pearl of Africa Tour — Tourism website (HTML/CSS/JS)
12. Case Dashboard — Insurance admin dashboard (Firebase)
13. Sophie Website — Cleaning services website (T3 stack)
14. Stocks App — Stock price viewer (React/Redux)
15. Space Travellers — SpaceX API booking app (React/Redux)

## Categories

- **AI & Automation** — Maria, Scrap Platform, Scrap NPM Package, SLS-Scrap
- **Cross-Platform Apps** — Rishi, Book Reader, CaseMedInsurance, Painter
- **Web Applications** — Apartment Manager, Realtime Analytics, Pearl of Africa Tour, Case Dashboard, Sophie Website, Stocks App, Space Travellers
- **Developer Tools** — RC-Textfield, Proxy Service

## Page Layout (`/projects`)

1. Hero section — heading + brief intro
2. Featured grid — 6 large cards (2 cols desktop, 1 col mobile)
3. Search + category filter bar — text input + category pill buttons
4. All projects grid — smaller cards, 3 cols desktop, 6 per page
5. Pagination controls — previous / page numbers / next

## Data Structure

```typescript
interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  category: "ai-automation" | "cross-platform" | "web-apps" | "dev-tools";
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  imageUrl?: string;
  rank: number;
  featured: boolean;
}
```

## Components

### ProjectCard (enhanced)
- Image with fallback gradient
- Tech tags
- Category badge
- GitHub + live URL links (GitHub hidden for private repos)
- Featured variant (larger)

### ProjectSearch (new)
- Text input filtering by title, description, technologies
- Debounced input

### CategoryFilter (new)
- Pill buttons: All, AI & Automation, Cross-Platform Apps, Web Applications, Developer Tools
- Active state styling

### Pagination (new)
- Previous / numbered pages / Next
- 6 items per page

## Files

| File | Action |
|------|--------|
| `src/data/projects.ts` | Create |
| `src/app/projects/page.tsx` | Rewrite |
| `src/components/project-card.tsx` | Enhance |
| `src/components/project-search.tsx` | Create |
| `src/components/category-filter.tsx` | Create |
| `src/components/pagination.tsx` | Create |

## Images

Projects with README screenshots (use raw GitHub URLs):
- Rishi: `./screenshots/library.png`, `./screenshots/book.png`
- CaseMedInsurance: `./assets/images/splash.png`
- Painter: `./assets/image.png`
- Pearl of Africa Tour: `./assets/screenshot.png`
- Space Travellers: absolute GitHub user-content URLs
- Case Dashboard: `./app_screenshot.png`
- Stocks App: `./screenshot.PNG`

For relative paths, construct raw GitHub URL: `https://raw.githubusercontent.com/matovu-farid/{repo}/main/{path}`
