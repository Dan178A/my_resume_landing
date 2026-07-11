/* i18n ligero ES/EN sin dependencias */
import { computed, ref } from 'vue'

export type Lang = 'es' | 'en'

const STORAGE_KEY = 'portfolio-lang'

const detectLang = (): Lang => {
    try {
        const saved = localStorage.getItem(STORAGE_KEY)
        if (saved === 'es' || saved === 'en') return saved
    } catch { /* SSR / privacy mode */ }
    return navigator.language?.startsWith('es') ? 'es' : 'en'
}

const lang = ref<Lang>(detectLang())

const messages = {
    es: {
        nav: { specialties: 'Especialidades', projects: 'Proyectos', stack: 'Stack', contact: 'Contacto' },
        hero: {
            role: 'Ingeniero de Software · Full Stack & IA',
            available: 'Disponible para proyectos',
            wordsPrefix: 'Especialista en',
            words: ['Visión por Computadora', 'IA en Tiempo Real', 'Full-Stack Web', 'Backend & APIs'],
            tagline: 'Construyo sistemas que ven, escuchan y escalan: visión por computadora aplicada a la industria, asistentes de IA en tiempo real y plataformas web de extremo a extremo.',
            ctaProjects: 'Ver proyectos',
            ctaContact: 'Hablemos',
            ctaCV: 'Ver CV',
            cvTitle: 'Mi Currículum',
            cvDownload: 'Descargar PDF',
            cvClose: 'Cerrar',
            cvFallback: 'Si el visor no carga, descarga el PDF directamente.',
            scroll: 'Desliza para explorar',
        },
        stats: {
            years: 'Años de experiencia',
            repos: 'Repositorios públicos',
            areas: 'Áreas de especialidad',
            thesis: 'Tesis en estabilización de video',
        },
        specialties: {
            title: 'Especialidades',
            subtitle: 'Cuatro frentes, un mismo estándar de ingeniería.',
            cv: {
                title: 'Visión por Computadora',
                desc: 'Estabilización de video con deep learning y optical flow (tesis de grado), OCR industrial para monitoreo en refinerías y extracción de documentos fiscales con pipelines de doble motor.',
            },
            ai: {
                title: 'IA en Tiempo Real',
                desc: 'Asistentes de voz conversacionales con Gemini Live (Rust + Python), síntesis y transcripción de voz en streaming, chatbots y modelos de forecasting.',
            },
            web: {
                title: 'Full-Stack Web',
                desc: 'Plataformas completas con Vue 3 y Nuxt 3: e-commerce con panel de administración, sistemas de sorteos en producción, despliegues en AWS Amplify, Vercel y edge.',
            },
            api: {
                title: 'Backend & APIs',
                desc: 'Microservicios con FastAPI y gRPC, scraping de datos financieros, Redis, y APIs públicas consumidas por terceros.',
            },
        },
        projects: {
            title: 'Proyectos Destacados',
            subtitle: 'Selección curada de mi trabajo en GitHub.',
            all: 'Todos',
            loading: 'Cargando innovación...',
            fallback: 'Explora el código fuente y la arquitectura de este proyecto directamente en GitHub.',
            viewRepo: 'Ver repositorio',
        },
        stack: {
            title: 'Stack Tecnológico',
            subtitle: 'Herramientas que uso a diario.',
        },
        contact: {
            title: '¿Trabajamos juntos?',
            subtitle: 'Disponible para proyectos, posiciones remotas y colaboraciones.',
            whatsapp: 'WhatsApp',
            email: 'Correo',
        },
        footer: 'Diseñado y construido por Daniel Silva',
    },
    en: {
        nav: { specialties: 'Specialties', projects: 'Projects', stack: 'Stack', contact: 'Contact' },
        hero: {
            role: 'Software Engineer · Full Stack & AI',
            available: 'Available for projects',
            wordsPrefix: 'Specialized in',
            words: ['Computer Vision', 'Real-Time AI', 'Full-Stack Web', 'Backend & APIs'],
            tagline: 'I build systems that see, listen, and scale: computer vision applied to industry, real-time AI assistants, and end-to-end web platforms.',
            ctaProjects: 'View projects',
            ctaContact: "Let's talk",
            ctaCV: 'View Resume',
            cvTitle: 'My Resume',
            cvDownload: 'Download PDF',
            cvClose: 'Close',
            cvFallback: "If the viewer doesn't load, download the PDF directly.",
            scroll: 'Scroll to explore',
        },
        stats: {
            years: 'Years of experience',
            repos: 'Public repositories',
            areas: 'Specialty areas',
            thesis: 'Thesis on video stabilization',
        },
        specialties: {
            title: 'Specialties',
            subtitle: 'Four fronts, one engineering standard.',
            cv: {
                title: 'Computer Vision',
                desc: 'Video stabilization with deep learning and optical flow (undergraduate thesis), industrial OCR for refinery monitoring, and fiscal document extraction with dual-engine pipelines.',
            },
            ai: {
                title: 'Real-Time AI',
                desc: 'Conversational voice assistants with Gemini Live (Rust + Python), streaming speech synthesis and transcription, chatbots and forecasting models.',
            },
            web: {
                title: 'Full-Stack Web',
                desc: 'Complete platforms with Vue 3 and Nuxt 3: e-commerce with admin panel, raffle systems in production, deployments on AWS Amplify, Vercel and the edge.',
            },
            api: {
                title: 'Backend & APIs',
                desc: 'Microservices with FastAPI and gRPC, financial data scraping, Redis, and public APIs consumed by third parties.',
            },
        },
        projects: {
            title: 'Featured Projects',
            subtitle: 'A curated selection of my work on GitHub.',
            all: 'All',
            loading: 'Loading innovation...',
            fallback: 'Explore the source code and architecture of this project directly on GitHub.',
            viewRepo: 'View repository',
        },
        stack: {
            title: 'Tech Stack',
            subtitle: 'Tools I use every day.',
        },
        contact: {
            title: 'Shall we work together?',
            subtitle: 'Available for projects, remote positions, and collaborations.',
            whatsapp: 'WhatsApp',
            email: 'Email',
        },
        footer: 'Designed and built by Daniel Silva',
    },
} as const

export function useI18n() {
    const t = computed(() => messages[lang.value])
    const toggleLang = () => {
        lang.value = lang.value === 'es' ? 'en' : 'es'
        try { localStorage.setItem(STORAGE_KEY, lang.value) } catch { /* noop */ }
        document.documentElement.lang = lang.value
    }
    return { lang, t, toggleLang }
}
