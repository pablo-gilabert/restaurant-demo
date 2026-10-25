# Maison Aster — Editorial Fine-Dining Experience (Demo)

A refined, bilingual restaurant website and **browser-only restaurant management demo** built with React, TypeScript, Vite, and SweetAlert2. The interface is designed to evoke the restraint, sophistication, and hospitality associated with fine dining; **Maison Aster is not claimed to hold Michelin stars**.

## Visual direction
- Editorial large-scale typography (Cormorant Garamond and DM Sans), generous white space, cinematic hero composition, deep charcoal and ivory themes, champagne details.
- Spanish and English across the public pages, reservations, login, and administration.
- Dark mode by default, with light mode and persistent language preferences.
- Responsive layouts, keyboard focus states, semantic heading hierarchy and responsive navigation.

## Features
- Editorial landing page with dynamic signature menu picks (based on the shared demo catalog).
- Restaurant menu with category navigation, localized item names and descriptions, prices, and availability.
- Table booking simulator with day-specific hours, selectable available slots, 90-minute duration and 30-minute slot intervals.
- Browser-local administrator panel for managing bookings, deposits, cancellations, customer notes, menu items, prices, and daily table capacity.
- SweetAlert2 modal forms, confirmations and notices.
- Demo login with **visible credentials** and one-click access.
- WhatsApp contact link, location map, route-specific metadata, and a custom 404 page.

## Demo credentials
- **Email:** `admin@demo.mathilde`
- **Password:** `Demo2026!`
- **Login:** `/login` or `/admin/login`
- **Admin:** `/admin/turnos`, `/admin/carta`, `/admin/horarios`

These credentials are intentionally public. **This is not real security or authorization.**

## Data and persistence
The initial sample catalog, reservations, and opening hours live in `src/data/DemoSeed.ts`. `src/context/DemoContext.tsx` implements all local CRUD operations. The only persistent data storage is the browser's **`localStorage`**: menu data, booking data, opening hours, demo sign-in, theme, and language. There is no Firebase, Firestore, server database or API used by these workflows.

Changes remain after refreshes in the **same browser profile** but are not shared between browsers, devices, or users. The admin can reset demo data. Public reservations are simulations: they do not contact the restaurant, send emails or collect payment. Do not enter real guest information.

## Photography and rights
The redesigned public site uses **local AI-generated food and restaurant imagery included in /public/ai**, generated for the demo. This is a visual concept for a portfolio, and the images do not depict Maison Aster, its actual cuisine or premises. The packaged assets work offline and do not depend on external image CDNs. All brand, contact and image content in this demo is fictional portfolio material.

Photo URLs used by the site are in `src/styles/Luxe.css` and `src/pages/AdminLogin/AdminLogin.module.css`.

## Technology
React 19 · TypeScript 6 · Vite 8 · React Router 7 · CSS Modules · CSS custom properties · SweetAlert2 · localStorage

## Local development
```bash
npm install
npm run typecheck
npm run lint
npm run build
npm run dev
```

## Deployment
A `vercel.json` SPA rewrite is included so direct navigation to React Router pages works on Vercel. Build command: `npm run build`. Output directory: `dist`. No environment variables or backend credentials are required.

## Files to preserve / replace
This archive is a **complete standalone source tree**. Keep your existing `.git/` directory to preserve commit history. If you are merging into a previously cloned folder, remove legacy original-photo and Sass paths listed in `INSTALLATION.md` before copying the archive. Then copy all files from this archive onto the project root. Regenerate `package-lock.json` with `npm install` because the archive intentionally excludes a stale lockfile.

## Portfolio notice
This is a fictional booking and administration experience. Branding and location references appear as part of a design demo. No Michelin accreditation is asserted. Do not use the mock login for real authentication or store actual personal information in a browser-only demo.
