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
        nav: { flagship: 'Caso destacado', specialties: 'Especialidades', projects: 'Proyectos', stack: 'Stack', contact: 'Contacto' },
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
        flagship: {
            badge: 'En producción',
            role: 'Fundador & Arquitecto de Software',
            title: 'DropAudio CCS',
            tagline: 'Plataforma e-commerce completa en producción: tienda pública y panel de administración, construida de extremo a extremo.',
            pitch: 'Diseñé y desplegué DropAudio CCS de principio a fin — desde la arquitectura de datos con Supabase y RLS hasta la experiencia de compra — sobre Nuxt 3 y Vercel. No es una demo: es una tienda real operando.',
            live: 'Ver en vivo',
            demo: 'Probar el asesor',
            caseStudy: 'Caso de estudio',
            metrics: ['reseñas verificadas', 'modelos en catálogo', 'categorías de uso'],
            features: [
                { title: 'Recomendador de audio', desc: 'Asesor interactivo de 3 pasos que sugiere el IEM ideal según gustos y presupuesto.' },
                { title: 'Comparador técnico', desc: 'Comparación frente a frente de especificaciones entre modelos para decidir con datos.' },
                { title: 'Checkout multimoneda', desc: 'Pago propio en USDT, Zinli y Pago Móvil con tasas BCV/USDT en vivo.' },
                { title: 'Panel de administración', desc: 'Inventario, ventas, entregas, pedidos en tiempo real y catálogo PDF en un solo lugar.' },
            ],
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
        nav: { flagship: 'Case study', specialties: 'Specialties', projects: 'Projects', stack: 'Stack', contact: 'Contact' },
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
        flagship: {
            badge: 'In production',
            role: 'Founder & Software Architect',
            title: 'DropAudio CCS',
            tagline: 'A complete e-commerce platform in production: public storefront and admin panel, built end to end.',
            pitch: 'I designed and shipped DropAudio CCS end to end — from the Supabase data layer with RLS to the buying experience — on Nuxt 3 and Vercel. Not a demo: a real store in operation.',
            live: 'View live',
            demo: 'Try the advisor',
            caseStudy: 'Case study',
            metrics: ['verified reviews', 'catalogued models', 'use categories'],
            features: [
                { title: 'Audio recommender', desc: 'Interactive 3-step advisor that suggests the ideal IEM based on taste and budget.' },
                { title: 'Technical comparator', desc: 'Head-to-head spec comparison between models to decide with data.' },
                { title: 'Multi-currency checkout', desc: 'Custom payment in USDT, Zinli and Pago Móvil with live BCV/USDT rates.' },
                { title: 'Admin panel', desc: 'Inventory, sales, deliveries, real-time orders and a PDF catalog in one place.' },
            ],
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
