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
- [Apache Server / XAMPP](https://apachefriends.org) (Para el despliegue local en servidor web)
- [AWS S3](https://aws.amazon.com/es/s3/) (Para el despliegue en producción)

## ⚙️ Requisitos Previos

Para ejecutar este proyecto de manera local, necesitas tener instalado:
- Node.js (v18 o superior)
- Angular CLI (`npm install -g @angular/cli`)
- Un Token de acceso válido (Bearer Token) de la [API de TMDB](https://www.themoviedb.org/settings/api).

## 💻 Instalación y Uso Local (Desarrollo)

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/tu-usuario/cinema-uveg.git
   cd cinema-uveg
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Ejecutar el servidor de desarrollo**
   ```bash
   ng serve
   ```
   Accede a `http://localhost:4200` en tu navegador.

## 📦 Despliegue Local en Servidor Apache (XAMPP)

Debido a que Angular es una SPA, requiere configuraciones especiales de enrutamiento (`base-href`) y reescritura de URLs para que Apache no genere errores 404 al recargar las páginas. Sigue estos pasos para desplegarlo correctamente:

### 1. Compilar el proyecto con la ruta base
Ejecuta la compilación de producción especificando el nombre exacto de la carpeta que contendrá la app en tu servidor Apache (en este caso, `CinemaUVEG`):
```bash
ng build --base-href /CinemaUVEG/
```
Esto creará los archivos de producción optimizados en la ruta `dist/cinema-uveg/browser/`.

### 2. Copiar archivos al directorio web de Apache
1. Limpia cualquier contenido previo en el directorio de despliegue.
2. Crea una carpeta llamada `CinemaUVEG` en la ruta correspondiente a tu sistema operativo:
   - **XAMPP (Windows):** `C:\xampp\htdocs\CinemaUVEG\`
   - **Apache (Linux):** `/var/www/html/CinemaUVEG/`
3. Copia **todo** el contenido que se generó dentro de tu carpeta `dist/...` y pégalo dentro de la carpeta `CinemaUVEG` recién creada.

### 3. Configurar el archivo `.htaccess` (Enrutamiento SPA)
Para solucionar el problema de recarga de páginas en Apache, crea un archivo llamado exactamente `.htaccess` (sin extensión `.txt`) en la raíz de la carpeta `CinemaUVEG` (junto al archivo `index.html`) e introduce las siguientes reglas de reescritura:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /CinemaUVEG/
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-dir
  RewriteRule . /CinemaUVEG/index.html [L]
</IfModule>
```

### 4. Habilitar modificaciones en Apache (`httpd.conf`)
Asegúrate de que Apache permita el uso de archivos `.htaccess`. En el panel de control de XAMPP, ve a **Config -> Apache (httpd.conf)**, busca la directiva `<Directory "C:/xampp/htdocs">` y cambia la opción:
```apache
AllowOverride None
```
por:
```apache
AllowOverride All
```
Reinicia el servicio de Apache desde el panel de control.

### 5. Acceso al proyecto
Una vez configurado, abre tu navegador y accede a la aplicación a través de la URL local (ajusta el puerto si tu Apache corre en uno distinto al estándar, por ejemplo `:8080`):
```text
http://localhost:8080/CinemaUVEG/
```
