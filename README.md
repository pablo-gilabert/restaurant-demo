# Mathilde Resto

A responsive restaurant website built with React, TypeScript, Vite, Sass and Firebase. The project combines a public-facing restaurant experience with a protected administration panel used to manage the menu in real time.

The application was developed as a production-oriented frontend project, with a focus on maintainability, accessibility, responsive design, Firebase security and performance.

## Live deployments

- **Firebase Hosting:** https://restaurant-demo-25143.web.app/
- **Vercel preview:** https://restaurant-demo-nrnl0eeg4-pablo-gilabert-s-projects.vercel.app/

> Administrative credentials are intentionally not included in this repository.

## Main features

### Public website

- Home page with restaurant imagery and visual sections.
- Dynamic menu loaded from Cloud Firestore.
- Menu filtering by restaurant category.
- Category navigation supports horizontal scrolling, mouse dragging and touch swiping without interfering with normal category selection.
- Only meals marked as available are returned to public users.
- Prices are formatted in Argentine pesos.
- Meals with a price of `0` intentionally hide the price from customers.
- Restaurant information and embedded Google Maps location.
- Reservation section with direct WhatsApp integration.
- Custom 404 page.
- Route-based SEO titles and meta descriptions.
- Responsive navigation and layouts.
- Keyboard-friendly controls and visible focus states.
- Custom Mathilde favicon and Apple touch icon.

### Administration panel

Authenticated administrators can:

- Sign in and sign out with Firebase Authentication.
- Access a role-protected administration route.
- Search menu items by name, description, price, category or availability.
- Filter meals by availability.
- Sort meals alphabetically or by price.
- Create new meals.
- Edit existing meals.
- Hide a meal from the public menu without deleting its data.
- Restore hidden meals at any time.
- See loading, success and error states during asynchronous actions.

The shared create/edit form includes clear UX guidance:

- **Title:** required.
- **Description:** optional.
- **Price:** may be `0`; when it is `0`, the price is not displayed to customers.

Permanent deletion is intentionally disabled in the current project scope.

## Tech stack

| Technology | Purpose |
| --- | --- |
| React 19 | Component-based user interface |
| TypeScript | Static typing and safer application contracts |
| Vite 8 | Development server and production build |
| React Router | Client-side routing |
| Sass / SCSS | Modular responsive styling |
| Firebase Authentication | Administrator authentication |
| Cloud Firestore | Menu and user-role persistence |
| Firebase Hosting | Production hosting |
| Oxlint | Code linting |

## Architecture

The source code is organized by responsibility rather than keeping application logic inside page components.

```text
src/
├── assets/
│   └── img/
├── components/
│   ├── Footer/
│   ├── Header/
│   ├── Main/
│   ├── Navbar/
│   ├── ScrollToTop/
│   └── SEO/
├── context/
│   ├── AuthContext.ts
│   ├── AuthProvider.tsx
│   └── useAuth.ts
├── data/
│   └── categories.ts
├── firebase/
│   ├── app.ts
│   ├── auth.ts
│   └── db.ts
├── pages/
│   ├── About/
│   ├── Admin/
│   ├── Home/
│   ├── Login/
│   ├── Menu/
│   ├── NotFound/
│   └── Reservations/
├── services/
│   └── meals.ts
├── styles/
│   ├── abstracts/
│   │   ├── _mixins.scss
│   │   └── _variables.scss
│   ├── base/
│   │   ├── _global.scss
│   │   └── _reset.scss
│   └── main.scss
├── types/
│   └── meal.ts
├── App.tsx
└── main.tsx

public/
├── apple-touch-icon.png
├── favicon.ico
└── favicon.png
```

## Styling system

The SCSS architecture keeps shared rules centralized and avoids duplicating styles across components.

- `_variables.scss` contains fonts, colors, radii, transitions and layout values.
- `_mixins.scss` contains reusable container, typography, form-control and action-button rules.
- `_reset.scss` defines shared browser normalization and base element behavior.
- `_global.scss` defines the global visual foundation of the application.
- Component and page styles only contain rules specific to their own UI.

The base interface uses a `1.375rem` font size (22 px at the default browser root size), while fluid headings are capped at `2rem` (32 px).

Layouts are designed to remain usable from small mobile screens around 320 px through large desktop displays up to 1920 px and beyond.

## Authentication and authorization

Firebase Authentication manages the user session. Application roles are stored in Firestore under the authenticated user's UID.

```text
users/{uid}
└── role: "admin"
```

The authentication implementation is split into three modules so React Fast Refresh files only export the appropriate type of value:

- `AuthContext.ts` defines the context and role types.
- `AuthProvider.tsx` synchronizes Firebase session state and resolves the Firestore role.
- `useAuth.ts` exposes the typed consumer hook.

Firestore is dynamically imported by the authentication provider only when an authenticated user needs a role lookup.

## Firestore data model

Menu items are stored in the `comidas` collection.

```ts
type Meal = {
  id: string
  name: string
  description: string
  category: Category
  available: boolean
  price: number
}
```

The service layer validates Firestore records before exposing them to the UI. Invalid or malformed documents are ignored instead of being trusted blindly by the application.

The public menu queries only documents where:

```text
available == true
```

Administrators can access both visible and hidden meals.

## Firestore security rules

The repository includes `firestore.rules` and applies authorization at the database layer, not only in the React interface.

Current rules enforce the following behavior:

- Public users can read only available meals.
- Administrators can read all meals.
- Only administrators can create meals.
- Only administrators can update meals.
- Submitted meal data is validated by Firestore rules.
- The category cannot be changed through an update operation.
- Meal deletion is disabled.
- Authenticated users can only read their own role document.
- Client-side writes to the `users` collection are disabled.

This prevents a modified frontend client from bypassing the intended administrative restrictions.

## Performance optimizations

The production build includes several optimizations intended to reduce initial loading cost and improve browser caching.

### Route-level code splitting

Application pages are loaded with `React.lazy` and `Suspense`, so each route does not need to be included in the initial application bundle.

### Vendor chunk splitting

`vite.config.ts` separates large third-party dependencies into cacheable production chunks, including:

- React and React DOM.
- React Router.
- Firebase Authentication.
- Cloud Firestore.
- Other vendor dependencies.

This avoids a single oversized JavaScript bundle and allows browsers to cache stable dependencies independently from application code.

### Firebase service splitting

Firebase initialization is separated into `app.ts`, `auth.ts` and `db.ts`. Firestore is therefore not eagerly loaded by modules that only require authentication.

### Image optimization

The Mathilde brand image was converted from PNG to lossless WebP while preserving its original resolution and visual data. Gallery images use lazy loading where appropriate.

## UX and accessibility details

The interface includes:

- Semantic HTML landmarks and headings.
- Labels associated with form fields.
- `aria-live`, `role="status"` and `role="alert"` for asynchronous feedback.
- `aria-busy` on actions that are being persisted.
- Keyboard-visible focus styles.
- Focus restoration when the admin create/edit view is closed.
- Descriptive alternative text for meaningful images.
- Lazy-loaded images and map iframe.
- Clear form placeholders and helper text in the administration panel.
- Pointer-aware category navigation distinguishes clicks/taps from drag gestures to prevent accidental selections while scrolling.
- Disabled action states during writes to avoid duplicate submissions.

## SEO

A lightweight reusable `SEO` component updates:

- The document title.
- The page description meta tag.

Each public route provides its own title and description.

The HTML entry point also contains the default restaurant metadata and theme color.

## Favicon

The browser favicon uses the existing Mathilde visual identity: the word **Mathilde** in white over the project's dark green background.

Files are stored in `public/` and referenced directly from `index.html`:

- `favicon.ico`
- `favicon.png`
- `apple-touch-icon.png`

## Local installation

### Requirements

- Node.js compatible with the dependencies defined in `package.json`.
- npm.
- A Firebase project when reproducing the backend configuration independently.

### Install dependencies

```bash
npm install
```

### Start the development server

```bash
npm run dev
```

Vite will print the local development URL in the terminal.

## Available scripts

```bash
npm run dev
```

Starts the Vite development server.

```bash
npm run lint
```

Runs Oxlint across the project.

```bash
npm run build
```

Runs the TypeScript project build followed by the optimized Vite production build.

```bash
npm run preview
```

Serves the generated production build locally for final verification.

## Firebase setup

The current demo already points to its configured Firebase project. To create an independent production environment for another restaurant or deployment:

1. Create a Firebase project.
2. Enable **Email/Password** in Firebase Authentication.
3. Create a Cloud Firestore database.
4. Deploy the included `firestore.rules`.
5. Create a user through Firebase Authentication.
6. Create a Firestore document using that Authentication UID as the document id.
7. Add `role: "admin"` to that document.
8. Configure Firebase Hosting if Firebase will be used for deployment.
9. Replace the Firebase client configuration in `src/firebase/app.ts` with the target project's configuration.

Do not store administrator passwords in the repository.

## Production build and Firebase deployment

Create the production files:

```bash
npm run build
```

Deploy only the generated website when Firestore rules have not changed:

```bash
firebase deploy --only hosting
```

Deploy Hosting and configured Firebase resources when rules or other Firebase configuration also changed:

```bash
firebase deploy
```

The Firebase Hosting rewrite in `firebase.json` sends unknown routes to `index.html`, allowing React Router routes to work correctly after a browser refresh.

## Development decisions

Some implementation choices are intentional:

- Menu items are hidden instead of deleted to preserve data and allow quick restoration.
- Category changes are disabled for existing meals and enforced again by Firestore rules.
- Public users receive only available meals from Firestore instead of downloading hidden records and filtering them only in the browser.
- Authentication authorization is verified through both the UI role and database security rules.
- A single shared form handles both creating and editing meals to reduce duplicated component logic.
- Categories are maintained from a shared typed source so UI options and TypeScript types stay synchronized.
- Firebase services are split to reduce unnecessary initial JavaScript work.
- Reusable SCSS rules are centralized in variables, mixins, reset and global files.
- Third-party UI frameworks are intentionally avoided; the current interface is implemented with project-owned SCSS.

## Current project status

Implemented and working:

- Public restaurant website.
- Responsive layouts.
- Dynamic Firestore menu.
- Category filtering.
- Firebase Authentication.
- Role-based administration access.
- Meal creation and editing.
- Availability management.
- Search, filter and sorting controls in the admin panel.
- Firestore validation and security rules.
- Firebase Hosting configuration.
- Vercel deployment compatibility.
- SEO metadata.
- Accessibility improvements.
- Route and vendor code splitting.
- Optimized brand asset.
- Custom favicon.
- Admin form UX guidance.

## Author

**Pablo Hernán Gilabert**

Frontend development project built as a real-world restaurant website and administration workflow.
