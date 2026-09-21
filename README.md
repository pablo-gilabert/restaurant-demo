# Mathilde Resto

Sitio web para restaurante desarrollado con React, TypeScript, Vite, Sass, Bootstrap y Firebase.

El proyecto está pensado como una aplicación frontend moderna para presentar la carta del restaurante, gestionar el contenido desde un panel administrativo y ofrecer información y canales de contacto para reservas.

## Características

- Página de inicio con presentación visual del restaurante.
- Carta dinámica conectada a Firestore.
- Categorías de comidas.
- Visualización pública únicamente de comidas disponibles.
- Panel de administración protegido mediante Firebase Authentication.
- Creación y edición de comidas.
- Activación y desactivación de disponibilidad.
- Validación de datos antes de guardar información en Firestore.
- Control de roles mediante una colección `users`.
- Reglas de seguridad de Firestore.
- Página de inicio de sesión y cierre de sesión.
- Página de reservas mediante WhatsApp.
- Página de información y ubicación del restaurante.
- Página 404 para rutas inexistentes.
- Navegación con React Router.
- Scroll automático al cambiar de ruta.
- SEO básico mediante títulos y meta descriptions por página.
- Diseño responsive.
- Consideraciones de accesibilidad en navegación, formularios, mensajes y controles.
- Arquitectura separada por componentes, páginas, servicios, contexto, tipos y estilos.

## Tecnologías

- React 19
- TypeScript
- Vite
- React Router
- Sass / SCSS
- Bootstrap
- Firebase
  - Authentication
  - Firestore
- Oxlint

## Arquitectura

La aplicación utiliza una estructura organizada por responsabilidades:

```text
src/
├── components/
│   ├── Footer/
│   ├── Header/
│   ├── Main/
│   ├── Navbar/
│   ├── ScrollToTop/
│   └── SEO/
├── context/
│   └── AuthContext.tsx
├── data/
│   └── categories.ts
├── firebase/
│   └── config.ts
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
│   │   └── _variables.scss
│   ├── base/
│   │   ├── _global.scss
│   │   └── _reset.scss
│   └── main.scss
├── types/
│   └── meal.ts
├── App.tsx
└── main.tsx