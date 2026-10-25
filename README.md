# Mathilde Resto — Local-First Restaurant Management Demo

A bilingual restaurant portfolio application built with **React 19, TypeScript, Vite, Sass and SweetAlert2**. Its sample menu, administrator account, opening hours and reservations are supplied by code and stored exclusively in the browser. No backend, cloud database, or external authentication service is required.

**Portfolio project:** All customer names, prices, menu items and reservations are fictional demo data. Creating a reservation does not contact Mathilde Resto. Do not enter real customer information.

## Features

- Responsive restaurant home page with the original brand photography, galleries and location map.
- Spanish/English text throughout the public pages and administration; Spanish by default.
- Light/dark themes; dark by default.
- Food catalog with editable bilingual names, descriptions, categories, prices and availability.
- Public booking simulator with available time slots and customer contact fields.
- Administration login with visible sample credentials and a one-click demo sign-in.
- Booking dashboard: filter bookings by date and status, and manage guests, notes, deposits and reservation status.
- Schedule editor for open/closed days, daily opening hours and table capacity.
- SweetAlert2 modal forms, confirmation dialogs and notices.
- Existing WhatsApp reservation shortcut retained as a separate external contact option.
- Responsive navigation, 404 page and route-specific SEO metadata.

## Demo administrator

- **Email:** `admin@demo.mathilde`
- **Password:** `Demo2026!`
- **Login routes:** `/login`, `/admin/login`
- **Administration routes:** `/admin/turnos`, `/admin/carta`, `/admin/horarios`

The administrator account is defined as a constant in `src/context/DemoContext.tsx`. **This is not secure authentication.** Any visitor can inspect the credentials and edit the local demo data. Do not use this system in production with real customer or business data.

## Browser-only data model

| File | Responsibility |
| --- | --- |
| `src/data/DemoSeed.ts` | Initial sample meals, fictional bookings and opening hours |
| `src/data/DemoTypes.ts` | Typed menu, reservation and schedule contracts |
| `src/context/DemoContext.tsx` | Local database, demo sign-in and CRUD actions |
| `src/lib/Reservations.ts` | Booking duration, capacity and overlap checks |
| `src/lib/Dialogs.ts` | SweetAlert2 dialogs and HTML escaping helpers |
| `src/context/DisplayContext.tsx` | Locale and theme preferences |
| `src/i18n/Translations.ts` | Translations for Spanish and English |

The initial data is hardcoded in `DemoSeed.ts`. The application uses **only `localStorage`** to persist its sample menu, hours, reservations, demo session, language and theme. Values survive a refresh and browser restart in the same browser profile. Data is not shared across devices, browsers or users.

To restore the original sample data, use **Reset demo** in the administration panel. Resetting does not change the administrator credentials or locale/theme settings. Browser storage can also be cleared manually from Developer Tools. The demo's data and session storage keys are:

- `mathilde-portfolio-database-v1`
- `mathilde-portfolio-admin-session-v1`
- `mathilde-demo-language`
- `mathilde-demo-theme`

A table booking uses one table for 90 minutes, with selectable 30-minute start intervals and configurable table capacity. This is an illustrative scheduling model and does not implement real transactional capacity management.

## Run locally

```bash
npm install
npm run typecheck
npm run lint
npm run build
npm run dev
```

The previous cloud integration and its unused source files have been removed. Dependencies are managed through `package.json` and `package-lock.json`. If you apply this cleanup as a patch to an older checkout, delete the obsolete files listed in the accompanying chat instructions, then run `npm install` to regenerate the lockfile and prune unused packages.

## Deployment

This client-side React Router application builds to `dist/`. The repository's Vercel SPA rewrite (`vercel.json`) serves the app routes from `index.html`. Static demo data is stored in each visitor's browser: **it is not synced across visitors** and must not be relied upon for actual table reservations.

## Stack

React 19 · TypeScript · Vite · React Router · Sass · SweetAlert2 · Browser `localStorage`
