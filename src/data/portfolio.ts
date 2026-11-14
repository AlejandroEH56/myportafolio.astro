export type Experience = {
  role: string;
  organization: string;
  project: string;
  projectType?: string;
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

const technicalSkills = [
  { title: 'Backend', items: ['PHP 8.3', 'Laravel 12', 'CodeIgniter 4', 'APIs REST'] },
  { title: 'Frontend', items: ['HTML5', 'CSS3', 'JavaScript', 'jQuery', 'Bootstrap 5'] },
  { title: 'Datos e infraestructura', items: ['MySQL', 'SQL Server', 'Git', 'GitHub', 'LAMP'] },
  { title: 'Identidad y pruebas', items: ['Microsoft Entra ID', 'Microsoft Graph', 'OAuth 2.0', 'PHPUnit'] }
] as const satisfies readonly SkillGroup[];

const lefic = {
  role: 'Desarrollador Junior',
  organization: 'Telemática LEFIC',
  project: 'Módulo de reportes y sistema de inventarios',
  period: 'Julio de 2026 – Actualidad',
  summary: 'Desarrollo de funcionalidades para el seguimiento de la carga de imágenes y la gestión de bienes.',
  highlights: [
    'Desarrollé en PHP 8.3 nativo un módulo de reportes con consultas para medir el avance de la carga de imágenes a nivel general, por grupo y por usuario. Incorporé gráficas y exportación de resultados.',
    'Amplié un sistema de inventarios en Laravel 12 con edición de registros y un flujo de baja de bienes que incluyó análisis de requisitos, baja lógica en base de datos y carga masiva de evidencias.',
    'Mejoré los formularios de inventario con ayudas por campo, validación durante la captura y mensajes de error para facilitar la corrección de datos.',
    'Elaboré documentación técnica de los módulos desarrollados y las mejoras implementadas.'
  ],
  technologies: ['PHP 8.3', 'Laravel 12', 'SQL']
} as const satisfies Experience;

const itsh = {
  role: 'Desarrollador Full Stack & Líder Técnico',
  organization: 'Instituto Tecnológico Superior de Huatusco (ITSH)',
  project: 'Sistema de Control de Residencias Profesionales',
  projectType: 'Proyecto institucional',
  period: 'Agosto de 2024 – Febrero de 2026',
  summary:
    'Proyecto institucional enfocado en migrar el proceso de residencia profesional desde formatos físicos hacia un flujo digital validado.',
  highlights: [
    'Modelé casos de uso para digitalizar el proceso de residencias profesionales y desarrollé el backend con PHP 8.3 y CodeIgniter 4.',
    'Integré Microsoft Entra ID para la autenticación con OAuth 2.0, implementé control de acceso por roles (RBAC) y desarrollé middleware para consumir Microsoft Graph API.',
    'Desarrollé una interfaz adaptable con Bootstrap 5 e incorporé interacciones dinámicas con jQuery y AJAX.'
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
} as const satisfies Experience;

export const portfolio = {
  person: {
    name: 'José Alejandro Estudillo Herrera',
    headline: 'Ingeniero en Sistemas Computacionales | Desarrollador de software',
    location: 'Cuauhtémoc, CDMX',
    about: {
      intro: 'Desarrollo soluciones web con enfoque en procesos institucionales, seguridad, integración de servicios y mantenibilidad.',
      detail: 'He desarrollado reportes de avance con gráficas y exportación, flujos de inventario con bajas y evidencias, y aplicaciones institucionales con control de acceso e integración de servicios Microsoft.',
      points: [
        { title: 'Enfoque', detail: 'Desarrollo web y transformación digital' },
        { title: 'Arquitectura', detail: 'MVC, APIs RESTful e integración de identidad' },
        { title: 'Entrega', detail: 'Del análisis de requisitos a producción' }
      ]
    },
    summary:
      'Ingeniero en Sistemas Computacionales con experiencia en desarrollo web con PHP, Laravel y CodeIgniter. He desarrollado módulos de reportes e inventarios y participado en la digitalización de procesos institucionales, desde el análisis de requisitos hasta el despliegue en producción.',
    keywords: [
      'Desarrollo Full Stack',
      'PHP',
      'Laravel 12',
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
    github: 'https://github.com/AlejandroEH56',
    linkedin: 'https://www.linkedin.com/in/alejandro-estudillo-h-424465371/',
    emailEncoded: 'YWxlamFuZHJvLmVzdHVkaWxsby5oQG91dGxvb2suY29t'
  },
  experience: [
    lefic,
    itsh
  ] satisfies readonly Experience[],
  education: [
    {
      degree: 'Ingeniería en Sistemas Computacionales',
      institution: itsh.organization,
      graduation: 'Egreso en junio de 2026',
      note: 'Título pendiente de entrega.'
    }
  ],
  skills: technicalSkills,
  projects: [
    {
      title: itsh.project,
      organization: itsh.organization,
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
      level: 'Intermedio (B1)',
      detail: 'Capacidad para leer documentación técnica.'
    }
  ]
} as const;
