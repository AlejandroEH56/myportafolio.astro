# Portafolio profesional — José Alejandro Estudillo Herrera

Portafolio estático construido con Astro para presentar experiencia, formación, habilidades y proyectos de forma rápida, accesible y mantenible. El contenido inicial proviene exclusivamente del CV proporcionado y evita publicar datos personales innecesarios.

## Tecnologías

- Astro 7
- TypeScript
- HTML semántico y CSS moderno
- `@astrojs/sitemap`
- GitHub Actions + GitHub Pages
- JavaScript mínimo, sin React/Vue/Svelte

## Requisitos

- Node.js `22.12.0` o superior en una versión compatible con Astro.
- npm 10 o superior recomendado.
- Git.

Comprueba tu versión:

```bash
node -v
npm -v
```

## Instalación

```bash
git clone https://github.com/[USUARIO_GITHUB]/[NOMBRE_REPOSITORIO].git
cd [NOMBRE_REPOSITORIO]
npm install
```

## Desarrollo local

```bash
npm run dev
```

Astro mostrará la dirección local, normalmente `http://localhost:4321`.

## Validación

```bash
npm run check
npm run build
```

## Vista previa de producción

```bash
npm run build
npm run preview
```

La vista previa usa los archivos generados en `dist/`.

## Estructura del contenido

La información editable está centralizada principalmente en:

```text
src/data/portfolio.ts
```

Ahí puedes agregar o modificar experiencia, formación, habilidades, proyectos, idiomas y enlaces sin rediseñar los componentes.

Para esta primera versión se eligió TypeScript en lugar de Content Collections porque el sitio tiene una sola página y un volumen pequeño de contenido estructurado. Esto aporta tipado y mantenimiento sencillo sin introducir archivos o capas innecesarias. Si el portafolio crece a muchos proyectos o artículos, Content Collections será una evolución natural.

## Privacidad

El sitio inicial:

- No publica el teléfono incluido en el CV.
- Generaliza la ubicación a `Ciudad de México, México`.
- No muestra el correo electrónico como texto plano. Se almacena codificado y se reconstruye al pulsar el botón de correo.
- No incluye el PDF del CV en `public/` ni ofrece descarga hasta confirmar que existe una versión apta para hacerse pública.

La codificación del correo solo reduce el scraping básico. Un enlace `mailto:` sigue pudiendo ser detectado por automatizaciones avanzadas cuando el usuario lo activa o al inspeccionar el código del sitio.

## Datos pendientes

No se inventaron elementos no presentes en el CV. Quedan como posibles ampliaciones:

- `[PENDIENTE: agregar logros cuantificables verificables.]`
- `[PENDIENTE: agregar enlaces públicos o repositorios de proyectos, si existen.]`
- `[PENDIENTE: agregar certificaciones o cursos cuando exista información verificable.]`
- `[PENDIENTE: confirmar si una versión pública del CV puede ofrecerse para descarga.]`
- `[PENDIENTE: agregar fotografía profesional o identidad visual propia, si se desea.]`

## Configuración de GitHub Pages

`astro.config.mjs` detecta automáticamente `GITHUB_REPOSITORY` durante GitHub Actions:

- Repositorio de usuario: `[USUARIO_GITHUB].github.io` → `base: '/'`.
- Repositorio de proyecto: por ejemplo `portafolio` → `base: '/portafolio'`.

De esta forma, los recursos y enlaces internos respetan el subdirectorio del repositorio cuando sea necesario.

### Repositorio de usuario

Si el repositorio se llama exactamente:

```text
[USUARIO_GITHUB].github.io
```

la URL será:

```text
https://[USUARIO_GITHUB].github.io/
```

### Repositorio de proyecto

Si el repositorio se llama, por ejemplo:

```text
portafolio
```

la URL será:

```text
https://[USUARIO_GITHUB].github.io/portafolio/
```

No agregues manualmente `/portafolio` a todos los recursos. Los componentes usan `import.meta.env.BASE_URL` y la configuración calcula el `base` correcto durante el despliegue.

## Crear el repositorio y publicar

1. Crea un repositorio en GitHub, por ejemplo `portafolio`.
2. No es necesario inicializarlo con README si ya tienes este proyecto local.
3. Desde la carpeta del proyecto ejecuta:

```bash
git init
git add .
git commit -m "feat: crear portafolio Astro"
git branch -M main
git remote add origin https://github.com/[USUARIO_GITHUB]/[NOMBRE_REPOSITORIO].git
git push -u origin main
```

4. En GitHub abre `Settings > Pages`.
5. En `Build and deployment > Source`, selecciona `GitHub Actions`.
6. Abre la pestaña `Actions` y verifica el workflow `Deploy to GitHub Pages`.

## Publicar actualizaciones

Después de editar el contenido:

```bash
npm run check
npm run build
git add .
git commit -m "content: actualizar portafolio"
git push
```

Cada `push` a `main` activa `.github/workflows/deploy.yml`. GitHub Actions compila el sitio y publica el nuevo artefacto en GitHub Pages.

## Dominio personalizado

Si más adelante usas un dominio propio, configura las variables de entorno del build:

```text
SITE_URL=https://www.tudominio.com
BASE_PATH=/
```

También necesitarás configurar DNS y, según tu estrategia, un archivo `public/CNAME` con el dominio correspondiente.

## SEO

El proyecto incluye:

- `title` y `description`.
- URL canónica.
- Open Graph y Twitter Card.
- Imagen social `public/og-default.png`.
- `robots.txt` generado como endpoint estático.
- Sitemap generado por `@astrojs/sitemap`.
- Página `404` con `noindex`.

## Accesibilidad

Se incluye:

- HTML semántico.
- Enlace “Saltar al contenido”.
- Estados de foco visibles.
- Navegación usable con teclado.
- Menú móvil con `aria-expanded` y cierre con `Escape`.
- Contraste diseñado para WCAG 2.2 AA en modo claro y oscuro.
- Compatibilidad con `prefers-reduced-motion`.
- Botones y enlaces con etiquetas accesibles.

## Rendimiento

- Salida completamente estática.
- No se utilizan frameworks cliente.
- JavaScript limitado al menú, tema y botón de correo.
- No se cargan fuentes externas.
- No se cargan iconos desde CDN.
- No existen imágenes de contenido pesadas en la versión inicial.

## Problemas frecuentes

### El sitio funciona localmente pero faltan estilos o recursos en GitHub Pages

Causa habitual: rutas absolutas que ignoran el subdirectorio del repositorio.

Solución: usa `import.meta.env.BASE_URL` para recursos y enlaces internos, como ya hacen los componentes de este proyecto.

### GitHub Pages muestra 404

Verifica:

1. `Settings > Pages > Source` está en `GitHub Actions`.
2. La rama principal se llama `main` o adapta el workflow.
3. El workflow terminó correctamente.
4. Si es repositorio de proyecto, entra a `https://[USUARIO_GITHUB].github.io/[NOMBRE_REPOSITORIO]/`.

### Error de permisos en el workflow

El workflow necesita:

```yaml
permissions:
  contents: read
  pages: write
  id-token: write
```

No elimines estos permisos del archivo de despliegue.

### El workflow no detecta el gestor de paquetes

Este proyecto fija `package-manager: npm@latest` en `withastro/action`, por lo que el despliegue no depende de detectar un lockfile. Aun así, después de ejecutar `npm install` localmente conviene versionar el `package-lock.json` generado para obtener instalaciones reproducibles.

### El sitemap apunta a `example.com` al compilar localmente

Es normal: fuera de GitHub Actions no existe `GITHUB_REPOSITORY`. Para probar una URL real de producción localmente puedes ejecutar el build con `SITE_URL` y `BASE_PATH` definidos en tu entorno.

### La página 404 no respeta algunas rutas profundas

GitHub Pages sirve `404.html` para rutas inexistentes. Este portafolio es una sola página y no depende de rutas cliente, por lo que no requiere hacks de SPA.

## Personalización visual

Los tokens principales están en `src/styles/global.css`:

```css
--bg
--surface
--text
--text-muted
--accent
--border
--focus
```

Modifica primero esas variables antes de cambiar reglas individuales.

## Publicar el CV

No copies el PDF original a `public/` sin revisar antes qué datos contiene. Cuando exista una versión pública, una forma segura de habilitar la descarga es:

1. Eliminar o anonimizar teléfono, domicilio y otros datos innecesarios.
2. Guardar la versión pública como `public/cv-jose-alejandro-estudillo.pdf`.
3. Agregar un enlace con `href={`${import.meta.env.BASE_URL}cv-jose-alejandro-estudillo.pdf`}` en el componente correspondiente.
4. Probar que la URL funcione tanto en raíz como en un repositorio de proyecto.

## Licencia

El código puede publicarse con la licencia que prefieras. No se incluye una licencia por defecto para no asumir tus condiciones de reutilización.
