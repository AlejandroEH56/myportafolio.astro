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
    shortHeadline: 'Desarrollador Full Stack orientado a soluciones web',
    location: 'Ciudad de México, México',
    summary:
      'Ingeniero en Sistemas Computacionales con experiencia en desarrollo web, digitalización de procesos, arquitectura MVC, seguridad de aplicaciones e integración de APIs empresariales. Ha participado desde el análisis de requisitos hasta la implementación en entornos de producción.',
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
    github: 'https://github.com/AlejandroEH56',
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
      note: 'Titulado'//'En espera de entrega de título, según el CV proporcionado.'
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
      level: 'Intermedio (B1)',
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
