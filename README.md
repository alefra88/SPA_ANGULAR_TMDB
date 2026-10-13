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
- [Apache HTTP Server](https://apache.org) (Para el despliegue local nativo en Windows como servicio)
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

## 📦 Despliegue Local en Servidor Apache HTTP (Windows Nativo)

Debido a que Angular es una SPA, el enrutamiento interno lo gestiona JavaScript en el navegador. Para desplegar el proyecto usando un dominio local personalizado en el puerto web estándar (80), es obligatorio configurar la reescritura de URLs en Apache y resolver los conflictos de puertos de Windows. Sigue estos pasos para lograrlo:

### 1. Modificar el archivo `hosts` de Windows
Para mapear el dominio personalizado de forma local, abre el archivo `C:\Windows\System32\drivers\etc\hosts` como **Administrador** y añade la siguiente línea al final:
```text
127.0.0.1       ://cinemauveg.com
```

### 2. Liberar el Puerto 80 en Windows
Por defecto, Windows suele reservar el puerto 80 para servicios internos del sistema (PID 4 / `http.sys`). Para liberarlo permanentemente y permitir que Apache tome el control, ejecuta este comando en una terminal de **Símbolo del sistema (CMD) como Administrador**:
```cmd
REG ADD "HKLM\SYSTEM\CurrentControlSet\Services\HTTP" /v Start /t REG_DWORD /d 4 /f
```
*Nota: Es estrictamente necesario reiniciar la computadora después de ejecutar este comando para aplicar la liberación.*

### 3. Configurar Apache (`httpd.conf`)
Abre el archivo de configuración global de tu servidor Apache (usualmente ubicado en `C:\Apache24\conf\httpd.conf`) y realiza los siguientes ajustes:

1. Asegúrate de que el servidor escuche el puerto web estándar:
   ```apache
   Listen 80
   ```
2. Añade la configuración del dominio virtual (`VirtualHost`) al final del archivo para apuntar directamente al directorio físico de tu aplicación:
   ```apache
   <VirtualHost *:80>
       ServerName ://cinemauveg.com
       DocumentRoot "C:/Apache24/htdocs/CinemaUVEG"
       
       <Directory "C:/Apache24/htdocs/CinemaUVEG">
           Options Indexes FollowSymLinks
           AllowOverride All
           Require all granted
       </Directory>
   </VirtualHost>
   ```

### 4. Compilar y Desplegar la SPA de Angular
1. Compila la aplicación manteniendo la ruta base raíz, dado que el dominio virtual apuntará directamente a la carpeta del proyecto:
   ```bash
   ng build --base-href /
   ```
2. Ve a la carpeta `dist/cinema-uveg/browser/` y copia **todo** su contenido.
3. Pégalo dentro del directorio web que definiste en el paso anterior: `C:\Apache24\htdocs\CinemaUVEG\`.

### 5. Configurar el archivo `.htaccess` (Enrutamiento SPA)
Para evitar errores 404 cuando los usuarios recarguen páginas o accedan a rutas secundarias internas, crea un archivo llamado exactamente `.htaccess` (sin extensión `.txt`) en la raíz de la carpeta `CinemaUVEG` (junto al `index.html`) con las siguientes reglas de reescritura:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-dir
  RewriteRule . /index.html [L]
</IfModule>
```

### 6. Reiniciar el Servicio y Probar
Abre el gestor de servicios de Windows ejecutando `services.msc`, busca el servicio de **Apache** y dale a **Reiniciar**. 

Abre una pestaña en **Modo Incógnito** e ingresa a tu aplicación mediante la URL limpia de producción local:
```text
http://://cinemauveg.com
```
