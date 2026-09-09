# 🎬 Cinema UVEG

Cinema UVEG es una Single Page Application (SPA) desarrollada con **Angular 17+** y **TypeScript**. Este proyecto consume la API pública de **The Movie Database (TMDB)** para mostrar un catálogo dinámico de películas con distintas categorías y detalles en profundidad.

El proyecto fue desarrollado como parte del módulo de Programación Web Multiplataforma de la Universidad Virtual del Estado de Guanajuato (UVEG).

## 🚀 Características Principales

- **Arquitectura Moderna:** Construida 100% con Componentes Standalone (sin `NgModules`).
- **Reactividad con Signals:** Uso intensivo de la nueva API de Angular (`signal`, `effect()`, `input()`, `output()`) para el manejo del estado local, eliminando la dependencia excesiva de RxJS.
- **Diseño UI/UX:** Interfaz responsiva y estilizada con **Tailwind CSS**. Incluye un modal de detalles con efecto visual *Glassmorphism* (`backdrop-blur`).
- **Navegación Dinámica:** Catálogo interactivo que permite alternar entre:
  - Mejor Valoradas (`top_rated`)
  - Populares (`popular`)
  - En Cines (`now_playing`)
  - Próximos Estrenos (`upcoming`)
- **Manejo de Errores Global:** Implementación de un `HttpInterceptor` funcional para capturar errores de la API (401, 404, 500) y notificar al usuario.

## 🛠️ Tecnologías Utilizadas

- [Angular CLI](https://github.com/angular/angular-cli) versión 17+
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [TMDB API](https://developer.themoviedb.org/docs)
- [AWS S3](https://aws.amazon.com/es/s3/) (Para el despliegue en producción)

## ⚙️ Requisitos Previos

Para ejecutar este proyecto de manera local, necesitas tener instalado:
- Node.js (v18 o superior)
- Angular CLI (`npm install -g @angular/cli`)
- Un Token de acceso válido (Bearer Token) de la [API de TMDB](https://www.themoviedb.org/settings/api).

## 💻 Instalación y Uso Local

1. **Clonar el repositorio**
   ```bash
   git clone [https://github.com/tu-usuario/cinema-uveg.git](https://github.com/tu-usuario/cinema-uveg.git)
   cd cinema-uveg