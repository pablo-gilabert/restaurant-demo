# Maison Aster — Editorial Fine-Dining Experience (Demo)

A refined, bilingual restaurant website and **browser-only restaurant management demo** built with React, TypeScript, Vite, and SweetAlert2. The interface is designed to evoke the restraint, sophistication, and hospitality associated with fine dining; **Maison Aster is not claimed to hold Michelin stars**.

## Complete offline food catalog

- **143 products** restored from the supplied Firestore `comidas` JSON export, across **23 categories**. These are hardcoded in `src/data/ImportedMeals.ts` and require **no Firebase SDK, API, server, or Firestore connection**.
- Original document IDs, Spanish names/descriptions, categories and visibility are retained. **All prices are fictional, stable, randomly generated ARS sample amounts**, grouped by category; the original Firestore export had `0` for all prices. These amounts are not official or current prices. The administrator can edit them locally. Setting a product price to **ARS 0 hides only the amount from the public menu**, leaving the item visible if its availability remains enabled.
- Complete English translations were added for catalog names and supplied descriptions. When a source description was blank, it remains blank in both languages.
- Two Firestore documents lacked a category: `croissantChocolateDonas` was assigned to **Desayunos** and `filetMerluzaRomana` to **Elaborados**. Four menu titles containing the old restaurant name were rebranded as **Maison Aster**, while their document IDs were preserved.
- **Existing visitors:** the one-time catalog migration in `src/context/DemoContext.tsx` adds missing imported items to the existing `localStorage` catalog while keeping saved bookings, edited meals, schedule and login state. It deduplicates by original ID and normalized Spanish name. Previously modified items take precedence where names match. A separate one-time price upgrade fills zero prices of matching imported products without touching existing nonzero prices, reservations, hours, theme or session. It cannot distinguish a previously manually hidden ARS 0 from a default zero, but **subsequent ARS 0 edits will remain hidden**. Later deletions are respected because catalog import only runs once per browser.
- **Fresh visitors:** the initial catalog consists of exactly the 143 restored products. **Reset demo** in the admin panel restores this catalog and the fictional sample reservations; the reset operation clears any current demo reservations and menu edits.

## Visual direction
- Editorial large-scale typography (Cormorant Garamond and DM Sans), generous white space, cinematic hero composition, deep charcoal and ivory themes, champagne details.
- Spanish and English across the public pages, reservations, login, and administration.
- Dark mode by default, with light mode and persistent language preferences.
- Responsive layouts, keyboard focus states, semantic heading hierarchy and responsive navigation.

## Features
- Editorial landing page with dynamic signature menu picks (based on the shared demo catalog).
- Restaurant menu with category navigation, localized item names and descriptions, prices, and availability.
- Advanced **administrator catalog filters**, combining the existing search field with alphabetical ordering (A–Z / Z–A), price ordering (ascending / descending) and selection from all 23 categories. Filtering and sorting happen immediately in the browser without changing the stored catalog.
- Table booking simulator with day-specific hours, selectable available slots, 90-minute duration and 30-minute slot intervals.
- Browser-local administrator panel for managing bookings, deposits, cancellations, customer notes, menu items, prices, and daily table capacity.
- SweetAlert2 modal forms, confirmations and notices.
- Demo login with **visible credentials** and one-click access.
- Fictional demo contact link and location card, route-specific metadata, and a custom 404 page.

## Administrator catalog search and filters

Open **Administration → Menu & pricing** (`/admin/carta`) to manage the sample catalog. The toolbar contains four controls that can be used together:

| Control | Behavior |
| --- | --- |
| Search | Filters by matching text in Spanish names, English names and category, without case sensitivity. |
| Alphabetical order | Sorts names from A to Z (default) or Z to A according to the active language. |
| Price order | Optional ascending or descending order by numeric price; when enabled, this takes precedence over alphabetical sorting. |
| Category | Select one of the 23 categories or show all products. |

**All four controls are combinable.** When two products have the same price, alphabetical order acts as a tiebreaker. Results react immediately to edits and the selected display language. Search and filters are presentation-only UI state: they do not change, delete, or reset product information in `localStorage`.

The **Price (ARS)** editor accepts zero. Setting a dish's price to **ARS 0 hides its price from the public menu** while keeping the dish visible as long as its availability is enabled. All imported demonstration prices are illustrative, not official restaurant prices.

## Demo credentials
- **Email:** `admin@demo.maisonaster`
- **Password:** `Demo2026!`
- **Login:** `/login` or `/admin/login`
- **Admin:** `/admin/turnos`, `/admin/carta`, `/admin/horarios`

These credentials are intentionally public. **This is not real security or authorization.**

## Data and persistence
The restored food catalog lives in `src/data/ImportedMeals.ts`; `src/data/DemoSeed.ts` composes it with fictional sample reservations and opening hours. `src/context/DemoContext.tsx` implements all local CRUD operations. The only persistent data storage is the browser's **`localStorage`**: menu data, booking data, opening hours, demo sign-in, theme, and language. There is no Firebase, Firestore, server database or API used by these workflows.

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
