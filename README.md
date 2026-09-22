# Mathilde Resto

Sitio web para restaurante desarrollado con React, TypeScript, Vite, Sass, Bootstrap y Firebase.

El proyecto simula una aplicación web real para un restaurante, combinando una interfaz pública para los clientes con un panel administrativo para gestionar la carta.

La aplicación utiliza Firebase Authentication para la autenticación de usuarios y Cloud Firestore como base de datos.

---

## Deployment disponible en Vercel y Firebase:

# Vercel:
https://restaurant-demo-nrnl0eeg4-pablo-gilabert-s-projects.vercel.app/

# Firebase:
https://restaurant-demo-25143.web.app/login

---

## Montando App

Descargar ZIP desde GitHub
En la carpeta del proyecto ejecutar "npm install"
Finalmente "npm run dev" para correr el proyecto

## Índice

- [Descripción](#descripción)
- [Características](#características)
- [Tecnologías](#tecnologías)
- [Arquitectura](#arquitectura)
- [Requisitos](#requisitos)
- [Instalación](#instalación)
- [Configuración de Firebase](#configuración-de-firebase)
- [Configuración de Authentication](#configuración-de-authentication)
- [Configuración de Firestore](#configuración-de-firestore)
- [Configuración de usuarios y roles](#configuración-de-usuarios-y-roles)
- [Reglas de seguridad](#reglas-de-seguridad)
- [Cómo ejecutar el proyecto](#cómo-ejecutar-el-proyecto)
- [Cómo probar el proyecto](#cómo-probar-el-proyecto)
- [Prueba del flujo administrativo](#prueba-del-flujo-administrativo)
- [Prueba de seguridad](#prueba-de-seguridad)
- [Scripts disponibles](#scripts-disponibles)
- [Build de producción](#build-de-producción)
- [SEO](#seo)
- [Accesibilidad](#accesibilidad)
- [Responsive Design](#responsive-design)
- [Modelo de datos](#modelo-de-datos)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Decisiones técnicas](#decisiones-técnicas)
- [Seguridad](#seguridad)
- [Estado del proyecto](#estado-del-proyecto)
- [Próximos pasos](#próximos-pasos)
- [Autor](#autor)

---

# Descripción

Mathilde Resto es una aplicación frontend desarrollada para representar el sitio web de un restaurante.

El proyecto cuenta con dos áreas principales:

### Área pública

Los visitantes pueden:

- Navegar por el sitio.
- Consultar la carta.
- Filtrar comidas por categoría.
- Consultar información del restaurante.
- Consultar información para realizar reservas.
- Acceder a los canales de contacto.
- Utilizar la aplicación desde dispositivos móviles.

### Área administrativa

Los usuarios autorizados pueden:

- Iniciar sesión.
- Acceder al panel administrativo.
- Crear comidas.
- Editar comidas.
- Ocultar comidas.
- Volver a mostrar comidas.
- Gestionar la disponibilidad de los productos.

El acceso administrativo está protegido mediante Firebase Authentication y roles almacenados en Firestore.

---

# Características

- React con TypeScript.
- Vite como herramienta de desarrollo y build.
- React Router para navegación.
- Sass / SCSS para estilos.
- Bootstrap para componentes y utilidades.
- Firebase Authentication.
- Cloud Firestore.
- Control de roles.
- Panel administrativo.
- Gestión de disponibilidad de comidas.
- Validación de datos.
- Manejo de estados de carga.
- Manejo de errores.
- Página 404.
- SEO básico.
- Diseño responsive.
- Accesibilidad.
- Navegación mediante teclado.
- Scroll automático entre rutas.
- Reglas de seguridad de Firestore.
- Arquitectura separada por responsabilidades.

---

# Tecnologías

| Tecnología | Uso |
|---|---|
| React | Construcción de la interfaz |
| TypeScript | Tipado estático |
| Vite | Desarrollo y build |
| React Router | Routing |
| Sass / SCSS | Estilos |
| Bootstrap | Utilidades y componentes |
| Firebase Authentication | Autenticación |
| Cloud Firestore | Persistencia de datos |
| Oxlint | Linting |

---

# Arquitectura

La aplicación está organizada separando las responsabilidades principales:

```text
src/
├── components/
│   ├── Footer/
│   ├── Header/
│   ├── Main/
│   ├── Navbar/
│   ├── ScrollToTop/
│   └── SEO/
│
├── context/
│   └── AuthContext.tsx
│
├── data/
│   └── categories.ts
│
├── firebase/
│   └── config.ts
│
├── pages/
│   ├── About/
│   ├── Admin/
│   ├── Home/
│   ├── Login/
│   ├── Menu/
│   ├── NotFound/
│   └── Reservations/
│
├── services/
│   └── meals.ts
│
├── styles/
│   ├── abstracts/
│   │   └── _variables.scss
│   ├── base/
│   │   ├── _global.scss
│   │   └── _reset.scss
│   └── main.scss
│
├── types/
│   └── meal.ts
│
├── App.tsx
└── main.tsx