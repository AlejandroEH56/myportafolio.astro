# Validación realizada

## Resultado

- Estructura de archivos revisada y consistente.
- `package.json` y `tsconfig.json` analizados como JSON válido.
- Workflow de GitHub Actions analizado como YAML válido.
- Todos los imports relativos de archivos `.astro`, `.ts` y `.mjs` apuntan a archivos existentes.
- No se detectaron enlaces internos absolutos que ignoren `base`.
- No se detectó en el proyecto el teléfono del CV, el correo en texto plano ni la ubicación granular `Cuauhtémoc`.
- Contrastes principales calculados para WCAG AA: texto principal/fondo 15.42:1; texto secundario/fondo 6.02:1; acento/fondo 6.32:1; botón blanco/acento 6.67:1; equivalentes de modo oscuro superiores a 8:1 para los pares principales.
- Las versiones de Astro y sitemap fueron contrastadas con fuentes actuales antes de generar la solución.
- El workflow usa la acción oficial `withastro/action` para GitHub Pages.

## Limitación del entorno de validación

No fue posible ejecutar `npm install`, `npm run check` ni `npm run build` porque el entorno de ejecución no pudo resolver `registry.npmjs.org` (`EAI_AGAIN`). Por esa razón no se generó un `package-lock.json` y no se afirma una compilación ejecutada que no ocurrió. El workflow fija explícitamente npm, por lo que no depende de un lockfile para detectar el gestor de paquetes. Al clonar el proyecto en un entorno con acceso a npm, ejecuta:

```bash
npm install
npm run check
npm run build
npm run preview
```

Después de `npm install`, versiona el `package-lock.json` generado para instalaciones reproducibles.
