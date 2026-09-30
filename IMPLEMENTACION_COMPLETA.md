# Implementación completa del portafolio
Este documento concatena todos los archivos de texto del proyecto para revisión o copiado manual. `public/og-default.png` es un recurso binario y está incluido directamente en el paquete ZIP.

## `.env.example`

```dotenv
# Opcional. Úsalo si publicas con dominio personalizado.
# SITE_URL=https://www.ejemplo.com
# BASE_PATH=/
```

## `.github/workflows/deploy.yml`

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v7

      - name: Install, build and upload Astro site
        uses: withastro/action@v6
        with:
          package-manager: npm@latest

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v5
```

## `.gitignore`

```text
node_modules/
dist/
.astro/
.DS_Store
*.log
.env
.env.*
!.env.example
```

## `.nvmrc`

```text
22.12.0
```

## `astro.config.mjs`

```js
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

const repository = process.env.GITHUB_REPOSITORY;
const [owner, repo] = repository?.split('/') ?? [];

const inferredSite = owner ? `https://${owner}.github.io` : 'https://example.com';
const inferredBase = owner && repo && repo !== `${owner}.github.io` ? `/${repo}` : '/';

export default defineConfig({
  site: process.env.SITE_URL ?? inferredSite,
  base: process.env.BASE_PATH ?? inferredBase,
  output: 'static',
  trailingSlash: 'always',
  integrations: [sitemap()]
});
```

## `package.json`

```json
{
  "name": "portafolio-astro-jaeh",
  "version": "1.0.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "astro dev",
    "start": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "check": "astro check"
  },
  "dependencies": {
    "@astrojs/sitemap": "3.7.4",
    "astro": "7.3.5"
  },
  "devDependencies": {
    "@astrojs/check": "^0.9.6",
    "typescript": "^5.9.2"
  },
  "engines": {
    "node": ">=22.12.0"
  }
}
```

## `tsconfig.json`

```json
{
  "extends": "astro/tsconfigs/strict",
  "include": [".astro/types.d.ts", "**/*"],
  "exclude": ["dist"]
}
```

## `public/favicon.svg`

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" role="img" aria-label="JAEH">
  <rect width="64" height="64" rx="14" fill="#0B5CAD"/>
  <path d="M15 23h8l-8 9 8 9h-8L7 32l8-9Zm34 0h-8l8 9-8 9h8l8-9-8-9ZM28 45h-6l14-26h6L28 45Z" fill="#fff"/>
</svg>
```

## `src/data/portfolio.ts`

```ts
export type Experience = {
  role: string;
  organization: string;
  project: string;
  period: string;
  summary: string;
  highlights: readonly string[];
  technologies: readonly string[];
};

export type SkillGroup = {
  title: string;
  items: readonly string[];
};

export type Project = {
  title: string;
  organization: string;
  description: string;
  contributions: readonly string[];
  technologies: readonly string[];
  link?: string;
  linkLabel?: string;
};

export const portfolio = {
  person: {
    name: 'José Alejandro Estudillo Herrera',
    headline: 'Ingeniero en Sistemas Computacionales · Desarrollador PHP & Java',
    shortHeadline: 'Desarrollador Full Stack orientado a soluciones web institucionales',
    location: 'Ciudad de México, México',
    summary:
      'Ingeniero en Sistemas Computacionales con experiencia en desarrollo web, digitalización de procesos institucionales, arquitectura MVC, seguridad de aplicaciones e integración de APIs empresariales. Ha participado desde el análisis de requisitos hasta la implementación en entornos de producción.',
    keywords: [
      'Desarrollo Full Stack',
      'PHP',
      'Java',
      'CodeIgniter 4',
      'Bootstrap 5',
      'MySQL',
      'SQL Server',
      'OAuth2',
      'Microsoft Entra ID',
      'Microsoft Graph',
      'Arquitectura MVC',
      'Transformación Digital'
    ]
  },
  links: {
    github: 'https://github.com/JAEH056',
    linkedin: 'https://www.linkedin.com/in/alejandro-estudillo-h-424465371/',
    emailEncoded: 'YWxlamFuZHJvLmVzdHVkaWxsby5oQG91dGxvb2suY29t'
  },
  experience: [
    {
      role: 'Desarrollador Full Stack & Líder Técnico',
      organization: 'Instituto Tecnológico Superior de Huatusco (ITSH)',
      project: 'Sistema de Control de Residencias Profesionales',
      period: 'Agosto 2024 – Febrero 2026',
      summary:
        'Proyecto institucional enfocado en migrar el proceso de residencia profesional desde formatos físicos hacia un flujo digital validado.',
      highlights: [
        'Liderazgo en la definición del ciclo de vida del software y modelado de casos de uso para la digitalización del proceso.',
        'Diseño e implementación del backend con CodeIgniter 4 y PHP 8.3, con bases de datos MySQL y optimización de consultas SQL.',
        'Integración de Microsoft Entra ID mediante OAuth2 y autorización basada en roles para proteger información institucional.',
        'Desarrollo de middleware para el consumo seguro de Microsoft Graph API y gestión de datos estandarizados.',
        'Construcción de una interfaz responsiva con Bootstrap 5, jQuery y AJAX para mejorar la interacción sin recargas completas.'
      ],
      technologies: [
        'PHP 8.3',
        'CodeIgniter 4',
        'MySQL',
        'OAuth2',
        'Microsoft Entra ID',
        'Microsoft Graph API',
        'Bootstrap 5',
        'jQuery',
        'AJAX'
      ]
    }
  ] satisfies readonly Experience[],
  education: [
    {
      degree: 'Ingeniería en Sistemas Computacionales',
      institution: 'Instituto Tecnológico Superior de Huatusco',
      graduation: 'Junio 2026',
      note: 'En espera de entrega de título, según el CV proporcionado.'
    }
  ],
  skills: [
    {
      title: 'Backend',
      items: ['PHP 8.3', 'CodeIgniter 4', 'APIs RESTful', 'Microsoft Graph API', 'OAuth2', 'MySQL', 'SQL Server']
    },
    {
      title: 'Frontend',
      items: ['HTML5', 'CSS3', 'JavaScript ES6+', 'jQuery', 'Bootstrap 5']
    },
    {
      title: 'DevOps e infraestructura',
      items: ['Git', 'GitHub', 'Control de versiones', 'Despliegue LAMP', 'Entornos de producción']
    },
    {
      title: 'Procesos y calidad',
      items: ['SDLC', 'SCRUM', 'KANBAN', 'Incremental', 'Diseño orientado a objetos', 'Pruebas de usuario', 'PHPUnit']
    },
    {
      title: 'Colaboración',
      items: ['Gestión de requisitos', 'Entrevistas', 'Reporte de avance', 'Trabajo interdepartamental', 'Adaptabilidad con usuarios finales']
    }
  ] satisfies readonly SkillGroup[],
  projects: [
    {
      title: 'Sistema de Control de Residencias Profesionales',
      organization: 'Instituto Tecnológico Superior de Huatusco',
      description:
        'Digitalización del proceso institucional de residencias profesionales mediante una aplicación web con arquitectura MVC, control de acceso, integración de identidad y consumo de servicios empresariales.',
      contributions: [
        'Modelado del flujo digital a partir de requisitos y casos de uso.',
        'Backend en CodeIgniter 4 con persistencia MySQL y consultas SQL optimizadas.',
        'Autenticación y autorización con Microsoft Entra ID y OAuth2.',
        'Integración con Microsoft Graph API.',
        'Interfaz responsiva con Bootstrap 5 y comportamiento dinámico mediante jQuery/AJAX.'
      ],
      technologies: ['PHP 8.3', 'CodeIgniter 4', 'MySQL', 'Bootstrap 5', 'OAuth2', 'Microsoft Graph API']
    }
  ] satisfies readonly Project[],
  languages: [
    {
      language: 'Inglés',
      level: 'Intermedio',
      detail: 'Capacidad para leer documentación técnica.'
    }
  ],
  pending: [
    '[PENDIENTE: agregar logros cuantificables verificables.]',
    '[PENDIENTE: agregar enlaces públicos o repositorios de proyectos, si existen.]',
    '[PENDIENTE: agregar certificaciones o cursos cuando exista información verificable.]',
    '[PENDIENTE: confirmar si una versión pública del CV puede ofrecerse para descarga.]',
    '[PENDIENTE: agregar fotografía profesional o identidad visual propia, si se desea.]'
  ]
} as const;
```

## `src/styles/global.css`

```css
:root {
  color-scheme: light;
  --bg: #f7f9fc;
  --surface: #ffffff;
  --surface-muted: #eef3f8;
  --text: #172033;
  --text-muted: #526079;
  --accent: #0b5cad;
  --accent-strong: #074780;
  --accent-soft: #dcecff;
  --border: #ccd6e3;
  --focus: #7c3aed;
  --button-text: #ffffff;
  --shadow: 0 18px 50px rgba(20, 43, 76, 0.08);
  --radius-sm: 0.75rem;
  --radius: 1.125rem;
  --radius-lg: 1.5rem;
  --max-width: 72rem;
  --header-height: 4.5rem;
}

html[data-theme='dark'] {
  color-scheme: dark;
  --bg: #0c1422;
  --surface: #121d2f;
  --surface-muted: #18263b;
  --text: #edf4ff;
  --text-muted: #b5c2d6;
  --accent: #6eb6ff;
  --accent-strong: #9dceff;
  --accent-soft: #173a5d;
  --border: #31445f;
  --focus: #ffd166;
  --button-text: #07111f;
  --shadow: 0 18px 50px rgba(0, 0, 0, 0.25);
}

* { box-sizing: border-box; }
html { scroll-behavior: smooth; scroll-padding-top: calc(var(--header-height) + 1.25rem); }
body {
  margin: 0;
  background: var(--bg);
  color: var(--text);
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  font-size: 1rem;
  line-height: 1.65;
  text-rendering: optimizeLegibility;
}

img, svg { display: block; max-width: 100%; }
a { color: inherit; }
button, a { -webkit-tap-highlight-color: transparent; }
button { font: inherit; }

:focus-visible {
  outline: 3px solid var(--focus);
  outline-offset: 3px;
  border-radius: 0.25rem;
}

::selection { background: var(--accent-soft); color: var(--text); }

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.skip-link {
  position: fixed;
  top: 0.75rem;
  left: 0.75rem;
  z-index: 1000;
  transform: translateY(-150%);
  padding: 0.75rem 1rem;
  background: var(--text);
  color: var(--bg);
  border-radius: var(--radius-sm);
  text-decoration: none;
}
.skip-link:focus { transform: translateY(0); }

.container { width: min(100% - 2rem, var(--max-width)); margin-inline: auto; }
.narrow { max-width: 42rem; }
.section { padding: 4.75rem 0; }
.stack { display: grid; gap: 1.25rem; }

.site-header {
  position: sticky;
  top: 0;
  z-index: 100;
  min-height: var(--header-height);
  border-bottom: 1px solid color-mix(in srgb, var(--border) 78%, transparent);
  background: color-mix(in srgb, var(--bg) 92%, transparent);
  backdrop-filter: blur(16px);
}
.header-inner {
  min-height: var(--header-height);
  display: grid;
  grid-template-columns: auto 1fr auto auto;
  align-items: center;
  gap: 0.75rem;
}
.brand {
  font-weight: 800;
  letter-spacing: -0.04em;
  text-decoration: none;
  color: var(--accent);
  font-size: 1.15rem;
}
.site-nav {
  display: none;
  position: absolute;
  top: calc(100% + 1px);
  left: 1rem;
  right: 1rem;
  padding: 0.75rem;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
}
.site-nav[data-open] { display: grid; }
.site-nav a {
  padding: 0.75rem;
  color: var(--text-muted);
  font-weight: 650;
  text-decoration: none;
  border-radius: 0.6rem;
}
.site-nav a:hover { color: var(--accent); background: var(--surface-muted); }
.icon-button {
  display: inline-grid;
  place-items: center;
  width: 2.7rem;
  height: 2.7rem;
  border: 1px solid var(--border);
  border-radius: 50%;
  background: var(--surface);
  color: var(--text);
  cursor: pointer;
}
.theme-icon-moon { display: none; }
html[data-theme='dark'] .theme-icon-sun { display: none; }
html[data-theme='dark'] .theme-icon-moon { display: block; }

.hero { padding-top: 5.75rem; }
.hero-grid { display: grid; gap: 2rem; align-items: center; }
.eyebrow {
  margin: 0 0 0.65rem;
  color: var(--accent);
  font-weight: 800;
  font-size: 0.78rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}
h1, h2, h3 { margin: 0; line-height: 1.15; letter-spacing: -0.035em; }
h1 { font-size: clamp(2.45rem, 9vw, 5.4rem); max-width: 12ch; }
h2 { font-size: clamp(2rem, 6vw, 3.15rem); }
h3 { font-size: 1.3rem; }
.hero-role { margin: 1.1rem 0 0; max-width: 42rem; color: var(--accent); font-size: clamp(1.15rem, 3vw, 1.45rem); font-weight: 750; }
.hero-summary { max-width: 45rem; margin: 1rem 0 0; color: var(--text-muted); font-size: 1.075rem; }
.hero-actions { display: flex; flex-wrap: wrap; gap: 0.75rem; margin-top: 1.75rem; }
.hero-location { display: flex; align-items: center; gap: 0.45rem; margin: 1.25rem 0 0; color: var(--text-muted); }
.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 2.85rem;
  padding: 0.65rem 1rem;
  border: 1px solid transparent;
  border-radius: 0.8rem;
  font-weight: 750;
  text-decoration: none;
}
.button-primary { background: var(--accent); color: var(--button-text); }
.button-primary:hover { background: var(--accent-strong); }
.button-secondary { border-color: var(--border); background: var(--surface); color: var(--text); }
.button-secondary:hover { border-color: var(--accent); color: var(--accent); }

.hero-panel {
  padding: 1.5rem;
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  background: linear-gradient(145deg, var(--surface), var(--surface-muted));
  box-shadow: var(--shadow);
}
.hero-panel > p { margin: 0.85rem 0 0.75rem; font-weight: 800; }
.hero-monogram {
  display: grid;
  place-items: center;
  width: 4.25rem;
  aspect-ratio: 1;
  border-radius: 1.2rem;
  background: var(--accent);
  color: var(--button-text);
  font-weight: 850;
  font-size: 1.25rem;
}
.keyword-list { display: flex; flex-wrap: wrap; gap: 0.55rem; padding: 0; margin: 0; list-style: none; }
.keyword-list li, .tag-list li {
  padding: 0.4rem 0.65rem;
  border: 1px solid var(--border);
  border-radius: 999px;
  background: var(--surface);
  color: var(--text-muted);
  font-size: 0.86rem;
  font-weight: 650;
}

.section-heading { max-width: 48rem; margin-bottom: 1.7rem; }
.section-heading > p:last-child { margin: 0.85rem 0 0; color: var(--text-muted); }
.about-grid { display: grid; gap: 1.5rem; }
.about-grid > p { margin: 0; color: var(--text-muted); font-size: 1.075rem; }
.about-points { display: grid; gap: 0.75rem; }
.about-points > div { display: grid; gap: 0.15rem; padding: 1rem; border-left: 3px solid var(--accent); background: var(--surface); }
.about-points span { color: var(--text-muted); }

.card {
  padding: 1.35rem;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--surface);
  box-shadow: var(--shadow);
}
.card p { color: var(--text-muted); }
.card-meta { display: flex; flex-wrap: wrap; justify-content: space-between; gap: 0.5rem 1rem; margin-bottom: 0.8rem; color: var(--text-muted); font-size: 0.9rem; }
.card-subtitle { margin: 0.4rem 0 0.9rem; font-weight: 700; color: var(--accent) !important; }
.card-kicker { margin: 0 0 0.55rem; color: var(--accent) !important; font-size: 0.8rem; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase; }
.detail-list { display: grid; gap: 0.55rem; padding-left: 1.25rem; margin: 1.15rem 0; color: var(--text-muted); }
.detail-list li::marker { color: var(--accent); }
.detail-list.compact { gap: 0.4rem; }
.tag-list { display: flex; flex-wrap: wrap; gap: 0.5rem; padding: 0; margin: 1rem 0 0; list-style: none; }
.education-card article + article { margin-top: 1.25rem; padding-top: 1.25rem; border-top: 1px solid var(--border); }

.skills-grid, .projects-grid { display: grid; gap: 1rem; }
.skill-group { padding: 1.2rem; border: 1px solid var(--border); border-radius: var(--radius); background: var(--surface); }
.skill-group h3 { margin-bottom: 0.85rem; }
.skill-group .tag-list { margin-top: 0; }
.language-card { margin-top: 1rem; }
.text-link { display: inline-flex; gap: 0.35rem; margin-top: 1rem; color: var(--accent); font-weight: 750; }

.contact-grid { display: grid; gap: 0.85rem; }
.contact-card {
  width: 100%;
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 0.9rem;
  padding: 1rem;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--surface);
  color: var(--text);
  text-decoration: none;
  text-align: left;
  cursor: pointer;
}
.contact-card:hover { border-color: var(--accent); transform: translateY(-2px); }
.contact-card strong, .contact-card small { display: block; }
.contact-card small { margin-top: 0.15rem; color: var(--text-muted); }
.contact-icon {
  display: grid;
  place-items: center;
  width: 2.55rem;
  aspect-ratio: 1;
  border-radius: 0.8rem;
  background: var(--accent-soft);
  color: var(--accent-strong);
  font-weight: 850;
}
.privacy-note { margin-top: 1rem; color: var(--text-muted); font-size: 0.88rem; }
.privacy-note code { color: var(--text); }

.error-page { min-height: 68vh; display: grid; align-items: center; }
.error-page h1 { max-width: none; font-size: clamp(2.3rem, 8vw, 4.5rem); }
.error-page p:not(.eyebrow) { color: var(--text-muted); }

.site-footer { padding: 1.5rem 0 2.5rem; border-top: 1px solid var(--border); }
.footer-inner { display: flex; flex-direction: column; gap: 0.45rem; color: var(--text-muted); font-size: 0.9rem; }
.footer-inner p { margin: 0; }
.footer-inner a { color: var(--accent); font-weight: 700; }

@media (min-width: 48rem) {
  .container { width: min(100% - 3rem, var(--max-width)); }
  .hero-grid { grid-template-columns: minmax(0, 1.55fr) minmax(18rem, 0.7fr); gap: 3rem; }
  .about-grid { grid-template-columns: 1.2fr 1fr; gap: 2rem; align-items: start; }
  .skills-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .contact-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  .contact-card { grid-template-columns: auto 1fr; }
  .contact-card > span:last-child { display: none; }
  .footer-inner { flex-direction: row; justify-content: space-between; align-items: center; }
}

@media (min-width: 64rem) {
  .header-inner { grid-template-columns: auto 1fr auto; }
  .menu-toggle { display: none; }
  .site-nav {
    display: flex;
    justify-content: flex-end;
    gap: 0.15rem;
    position: static;
    padding: 0;
    background: transparent;
    border: 0;
    border-radius: 0;
    box-shadow: none;
  }
  .site-nav a { padding: 0.5rem 0.65rem; font-size: 0.92rem; }
  .skills-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  .projects-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .card { padding: 1.6rem; }
}

@media (prefers-reduced-motion: no-preference) {
  .button, .contact-card, .site-nav a, .icon-button { transition: 160ms ease; }
}

@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, *::before, *::after { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; transition-duration: 0.01ms !important; }
}
```

## `src/components/SEO.astro`

```astro
---
interface Props {
  title: string;
  description: string;
  noindex?: boolean;
}

const { title, description, noindex = false } = Astro.props;
const canonical = new URL(Astro.url.pathname, Astro.site ?? Astro.url.origin);
const base = import.meta.env.BASE_URL;
const ogImage = new URL(`${base}og-default.png`, Astro.site ?? Astro.url.origin);
---

<title>{title}</title>
<meta name="description" content={description} />
<link rel="canonical" href={canonical} />
<meta name="robots" content={noindex ? 'noindex, nofollow' : 'index, follow'} />
<meta property="og:type" content="website" />
<meta property="og:locale" content="es_MX" />
<meta property="og:title" content={title} />
<meta property="og:description" content={description} />
<meta property="og:url" content={canonical} />
<meta property="og:image" content={ogImage} />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:image:alt" content="Portafolio profesional de José Alejandro Estudillo Herrera" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content={title} />
<meta name="twitter:description" content={description} />
<meta name="twitter:image" content={ogImage} />
<meta name="theme-color" content="#0B5CAD" />
```

## `src/components/Header.astro`

```astro
---
const base = import.meta.env.BASE_URL;
const items = [
  ['Sobre mí', 'sobre-mi'],
  ['Experiencia', 'experiencia'],
  ['Formación', 'formacion'],
  ['Habilidades', 'habilidades'],
  ['Proyectos', 'proyectos'],
  ['Contacto', 'contacto']
];
---

<header class="site-header" data-header>
  <div class="container header-inner">
    <a class="brand" href={`${base}#inicio`} aria-label="Ir al inicio">JAEH</a>

    <button class="icon-button menu-toggle" type="button" aria-expanded="false" aria-controls="site-navigation" data-menu-toggle>
      <span class="sr-only">Abrir menú de navegación</span>
      <svg aria-hidden="true" viewBox="0 0 24 24" width="22" height="22">
        <path d="M4 7h16M4 12h16M4 17h16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
      </svg>
    </button>

    <nav id="site-navigation" class="site-nav" aria-label="Navegación principal" data-nav>
      {items.map(([label, id]) => <a href={`${base}#${id}`}>{label}</a>)}
    </nav>

    <button class="icon-button theme-toggle" type="button" data-theme-toggle aria-label="Cambiar a modo oscuro">
      <svg class="theme-icon theme-icon-sun" aria-hidden="true" viewBox="0 0 24 24" width="20" height="20">
        <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="2" />
        <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
      </svg>
      <svg class="theme-icon theme-icon-moon" aria-hidden="true" viewBox="0 0 24 24" width="20" height="20">
        <path d="M20 15.2A8 8 0 0 1 8.8 4 8.5 8.5 0 1 0 20 15.2Z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" />
      </svg>
    </button>
  </div>
</header>

<script is:inline>
  (() => {
    const menuButton = document.querySelector('[data-menu-toggle]');
    const nav = document.querySelector('[data-nav]');
    const themeButton = document.querySelector('[data-theme-toggle]');

    if (menuButton && nav) {
      const closeMenu = () => {
        menuButton.setAttribute('aria-expanded', 'false');
        nav.removeAttribute('data-open');
        const label = menuButton.querySelector('.sr-only');
        if (label) label.textContent = 'Abrir menú de navegación';
      };

      menuButton.addEventListener('click', () => {
        const expanded = menuButton.getAttribute('aria-expanded') === 'true';
        menuButton.setAttribute('aria-expanded', String(!expanded));
        nav.toggleAttribute('data-open', !expanded);
        const label = menuButton.querySelector('.sr-only');
        if (label) label.textContent = expanded ? 'Abrir menú de navegación' : 'Cerrar menú de navegación';
      });

      nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
      document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') closeMenu();
      });
    }

    if (themeButton) {
      const setLabel = () => {
        const current = document.documentElement.dataset.theme;
        themeButton.setAttribute('aria-label', current === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro');
      };

      setLabel();
      themeButton.addEventListener('click', () => {
        const current = document.documentElement.dataset.theme;
        const next = current === 'dark' ? 'light' : 'dark';
        document.documentElement.dataset.theme = next;
        localStorage.setItem('theme', next);
        setLabel();
      });
    }
  })();
</script>
```

## `src/components/Hero.astro`

```astro
---
import { portfolio } from '../data/portfolio';
---

<section class="hero section" id="inicio" aria-labelledby="hero-title">
  <div class="container hero-grid">
    <div class="hero-copy">
      <p class="eyebrow">Portafolio profesional</p>
      <h1 id="hero-title">{portfolio.person.name}</h1>
      <p class="hero-role">{portfolio.person.shortHeadline}</p>
      <p class="hero-summary">{portfolio.person.summary}</p>
      <div class="hero-actions" aria-label="Acciones principales">
        <a class="button button-primary" href="#proyectos">Ver proyectos</a>
        <a class="button button-secondary" href="#contacto">Contacto</a>
      </div>
      <p class="hero-location">
        <svg aria-hidden="true" viewBox="0 0 24 24" width="18" height="18">
          <path d="M12 21s6-5.2 6-11a6 6 0 1 0-12 0c0 5.8 6 11 6 11Z" fill="none" stroke="currentColor" stroke-width="2" />
          <circle cx="12" cy="10" r="2" fill="none" stroke="currentColor" stroke-width="2" />
        </svg>
        {portfolio.person.location}
      </p>
    </div>

    <aside class="hero-panel" aria-label="Especialización profesional">
      <span class="hero-monogram" aria-hidden="true">&lt;/&gt;</span>
      <p>Especialización</p>
      <ul class="keyword-list" role="list">
        {portfolio.person.keywords.slice(0, 6).map((keyword) => <li>{keyword}</li>)}
      </ul>
    </aside>
  </div>
</section>
```

## `src/components/Section.astro`

```astro
---
interface Props {
  id: string;
  eyebrow?: string;
  title: string;
  intro?: string;
}

const { id, eyebrow, title, intro } = Astro.props;
---

<section class="section" id={id} aria-labelledby={`${id}-title`}>
  <div class="container">
    <header class="section-heading">
      {eyebrow && <p class="eyebrow">{eyebrow}</p>}
      <h2 id={`${id}-title`}>{title}</h2>
      {intro && <p>{intro}</p>}
    </header>
    <slot />
  </div>
</section>
```

## `src/components/ExperienceCard.astro`

```astro
---
import type { Experience } from '../data/portfolio';
interface Props { experience: Experience }
const { experience } = Astro.props;
---

<article class="card experience-card">
  <div class="card-meta">
    <span>{experience.period}</span>
    <span>{experience.organization}</span>
  </div>
  <h3>{experience.role}</h3>
  <p class="card-subtitle">{experience.project}</p>
  <p>{experience.summary}</p>
  <ul class="detail-list">
    {experience.highlights.map((item) => <li>{item}</li>)}
  </ul>
  <ul class="tag-list" aria-label="Tecnologías utilizadas">
    {experience.technologies.map((technology) => <li>{technology}</li>)}
  </ul>
</article>
```

## `src/components/ProjectCard.astro`

```astro
---
import type { Project } from '../data/portfolio';
interface Props { project: Project }
const { project } = Astro.props;
---

<article class="card project-card">
  <p class="card-kicker">Proyecto institucional</p>
  <h3>{project.title}</h3>
  <p class="card-subtitle">{project.organization}</p>
  <p>{project.description}</p>
  <ul class="detail-list compact">
    {project.contributions.map((item) => <li>{item}</li>)}
  </ul>
  <ul class="tag-list" aria-label="Tecnologías del proyecto">
    {project.technologies.map((technology) => <li>{technology}</li>)}
  </ul>
  {project.link && project.linkLabel && (
    <a class="text-link" href={project.link} target="_blank" rel="noopener noreferrer">
      {project.linkLabel}
      <span aria-hidden="true">↗</span>
    </a>
  )}
</article>
```

## `src/components/Skills.astro`

```astro
---
import type { SkillGroup } from '../data/portfolio';
interface Props { groups: readonly SkillGroup[] }
const { groups } = Astro.props;
---

<div class="skills-grid">
  {groups.map((group) => (
    <article class="skill-group">
      <h3>{group.title}</h3>
      <ul class="tag-list">
        {group.items.map((item) => <li>{item}</li>)}
      </ul>
    </article>
  ))}
</div>
```

## `src/components/ContactLinks.astro`

```astro
---
import { portfolio } from '../data/portfolio';
---

<div class="contact-grid">
  <a class="contact-card" href={portfolio.links.github} target="_blank" rel="noopener noreferrer">
    <span class="contact-icon" aria-hidden="true">GH</span>
    <span>
      <strong>GitHub</strong>
      <small>Repositorios y actividad de desarrollo</small>
    </span>
    <span aria-hidden="true">↗</span>
  </a>

  <a class="contact-card" href={portfolio.links.linkedin} target="_blank" rel="noopener noreferrer">
    <span class="contact-icon" aria-hidden="true">in</span>
    <span>
      <strong>LinkedIn</strong>
      <small>Perfil y trayectoria profesional</small>
    </span>
    <span aria-hidden="true">↗</span>
  </a>

  <button class="contact-card contact-button" type="button" data-email={portfolio.links.emailEncoded}>
    <span class="contact-icon" aria-hidden="true">@</span>
    <span>
      <strong>Correo</strong>
      <small>Abrir la aplicación de correo configurada</small>
    </span>
    <span aria-hidden="true">→</span>
  </button>
</div>

<p class="privacy-note">El correo se reconstruye únicamente al activar el botón para evitar exponerlo directamente como texto en la página. Un enlace <code>mailto:</code> no impide por completo el scraping automatizado.</p>

<script is:inline>
  document.querySelectorAll('[data-email]').forEach((button) => {
    button.addEventListener('click', () => {
      const encoded = button.getAttribute('data-email');
      if (!encoded) return;
      try {
        const address = atob(encoded);
        window.location.href = `mailto:${address}`;
      } catch {
        button.setAttribute('aria-label', 'No fue posible abrir el correo');
      }
    });
  });
</script>
```

## `src/components/Footer.astro`

```astro
---
const year = new Date().getFullYear();
const base = import.meta.env.BASE_URL;
---

<footer class="site-footer">
  <div class="container footer-inner">
    <p>© {year} José Alejandro Estudillo Herrera.</p>
    <a href={`${base}#inicio`}>Volver al inicio ↑</a>
  </div>
</footer>
```

## `src/layouts/BaseLayout.astro`

```astro
---
import SEO from '../components/SEO.astro';
import Header from '../components/Header.astro';
import Footer from '../components/Footer.astro';
import '../styles/global.css';

interface Props {
  title: string;
  description: string;
  noindex?: boolean;
}

const { title, description, noindex = false } = Astro.props;
const base = import.meta.env.BASE_URL;
---

<!doctype html>
<html lang="es" data-theme="light">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width" />
    <meta name="generator" content={Astro.generator} />
    <link rel="icon" type="image/svg+xml" href={`${base}favicon.svg`} />
    <SEO {title} {description} {noindex} />
    <script is:inline>
      (() => {
        const saved = localStorage.getItem('theme');
        const preferred = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        document.documentElement.dataset.theme = saved === 'dark' || saved === 'light' ? saved : preferred;
      })();
    </script>
  </head>
  <body>
    <a class="skip-link" href="#contenido">Saltar al contenido</a>
    <Header />
    <main id="contenido">
      <slot />
    </main>
    <Footer />
  </body>
</html>
```

## `src/pages/index.astro`

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import Hero from '../components/Hero.astro';
import Section from '../components/Section.astro';
import ExperienceCard from '../components/ExperienceCard.astro';
import ProjectCard from '../components/ProjectCard.astro';
import Skills from '../components/Skills.astro';
import ContactLinks from '../components/ContactLinks.astro';
import { portfolio } from '../data/portfolio';

const title = `${portfolio.person.name} | Portafolio profesional`;
const description = 'Portafolio profesional de José Alejandro Estudillo Herrera: desarrollo Full Stack, PHP, CodeIgniter, seguridad OAuth2, APIs empresariales y soluciones web institucionales.';
---

<BaseLayout {title} {description}>
  <Hero />

  <Section
    id="sobre-mi"
    eyebrow="Perfil"
    title="Sobre mí"
    intro="Desarrollo soluciones web con enfoque en procesos institucionales, seguridad, integración de servicios y mantenibilidad."
  >
    <div class="about-grid">
      <p>{portfolio.person.summary}</p>
      <div class="about-points">
        <div>
          <strong>Enfoque</strong>
          <span>Desarrollo web y transformación digital</span>
        </div>
        <div>
          <strong>Arquitectura</strong>
          <span>MVC, APIs RESTful e integración de identidad</span>
        </div>
        <div>
          <strong>Entrega</strong>
          <span>Del análisis de requisitos a producción</span>
        </div>
      </div>
    </div>
  </Section>

  <Section id="experiencia" eyebrow="Trayectoria" title="Experiencia profesional">
    <div class="stack">
      {portfolio.experience.map((experience) => <ExperienceCard {experience} />)}
    </div>
  </Section>

  <Section id="formacion" eyebrow="Educación" title="Formación académica">
    <div class="card education-card">
      {portfolio.education.map((item) => (
        <article>
          <p class="card-kicker">{item.graduation}</p>
          <h3>{item.degree}</h3>
          <p class="card-subtitle">{item.institution}</p>
          <p>{item.note}</p>
        </article>
      ))}
    </div>
  </Section>

  <Section
    id="habilidades"
    eyebrow="Stack"
    title="Habilidades y tecnologías"
    intro="Tecnologías y prácticas mencionadas explícitamente en el CV proporcionado."
  >
    <Skills groups={portfolio.skills} />
    <div class="language-card card">
      <h3>Idiomas</h3>
      {portfolio.languages.map((item) => (
        <p><strong>{item.language} — {item.level}.</strong> {item.detail}</p>
      ))}
    </div>
  </Section>

  <Section
    id="proyectos"
    eyebrow="Trabajo destacado"
    title="Proyectos"
    intro="El CV documenta un proyecto institucional. No se agregaron proyectos adicionales sin evidencia."
  >
    <div class="projects-grid">
      {portfolio.projects.map((project) => <ProjectCard {project} />)}
    </div>
  </Section>

  <Section
    id="contacto"
    eyebrow="Contacto"
    title="Conversemos"
    intro="Puedes consultar mi actividad profesional o iniciar contacto mediante los siguientes canales."
  >
    <ContactLinks />
  </Section>
</BaseLayout>
```

## `src/pages/404.astro`

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
const base = import.meta.env.BASE_URL;
---

<BaseLayout title="Página no encontrada | José Alejandro Estudillo Herrera" description="La página solicitada no existe." noindex={true}>
  <section class="section error-page">
    <div class="container narrow">
      <p class="eyebrow">Error 404</p>
      <h1>Página no encontrada</h1>
      <p>La dirección puede haber cambiado o no existir.</p>
      <a class="button button-primary" href={base}>Volver al portafolio</a>
    </div>
  </section>
</BaseLayout>
```

## `src/pages/robots.txt.ts`

```ts
import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site }) => {
  const origin = site ?? new URL('https://example.com');
  const sitemap = new URL(`${import.meta.env.BASE_URL}sitemap-index.xml`, origin);

  return new Response(`User-agent: *\nAllow: /\nSitemap: ${sitemap.href}\n`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' }
  });
};
```

## `README.md`

```md
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
```
