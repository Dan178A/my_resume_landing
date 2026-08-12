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
        nav: { flagship: 'Caso destacado', impact: 'Impacto', experience: 'Experiencia', specialties: 'Especialidades', projects: 'Proyectos', education: 'Formación', stack: 'Stack', contact: 'Contacto' },
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
            cvProfile: 'Perfil',
            cvFullStack: 'Full Stack',
            cvBackend: 'Backend & IA',
            scroll: 'Desliza para explorar',
        },
        stats: {
            years: 'Años de experiencia',
            repos: 'Repositorios públicos',
            areas: 'Áreas de especialidad',
            thesis: 'Tesis en estabilización de video',
        },
        impact: {
            title: 'Por qué contratarme',
            subtitle: 'Resultados medibles en sistemas de producción, no demos.',
            items: [
                { icon: 'fa-solid fa-gauge-high', metric: '1–10 ms', label: 'Latencia en tiempo real', desc: 'Rediseñé dashboards con una arquitectura WebSocket full-duplex: de 200–500 ms a 1–10 ms y hasta −95% de ancho de banda.' },
                { icon: 'fa-solid fa-industry', metric: '24/7', label: 'Digital Twin industrial', desc: 'Sistema de telemetría que predice la deformación de coke drums en una refinería a partir de sensores de alta frecuencia.' },
                { icon: 'fa-solid fa-rocket', metric: '0 → prod', label: 'Fundador técnico', desc: 'DropAudio CCS de cero a producción: Nuxt 3 + Supabase, checkout multimoneda y 94+ reseñas verificadas.' },
                { icon: 'fa-solid fa-eye', metric: 'CV · ML', label: 'Visión por computadora', desc: 'Motores de estabilización de video (optical flow + FlowNet) para el sector marítimo/petrolero.' },
            ],
        },
        experience: {
            title: 'Experiencia',
            subtitle: 'Cinco años enviando software a producción en paralelo a mi formación.',
            present: 'Presente',
            items: [
                {
                    role: 'Lead Performance & Systems Engineer', company: 'Ea2technology', location: 'Canadá · Remoto', period: 'Jul 2021 — Presente', accent: 'cv',
                    bullets: [
                        'Diseñé y desplegué un Digital Twin industrial (telemetría) para monitorear en tiempo real la deformación de coke drums en una refinería, previniendo fallos estructurales críticos.',
                        'Diseñé una arquitectura WebSocket full-duplex de baja latencia que reemplazó el polling HTTP: de 200–500 ms a 1–10 ms y hasta −95% de ancho de banda.',
                        'Lideré la migración de monolitos legacy a microservicios cloud-native en AWS, optimizando pipelines intensivos con C++ y Rust (memory safety y máxima concurrencia).',
                        'Dirigí el diseño UI/UX técnico end-to-end en Figma, conectando el rendimiento de bajo nivel con interfaces intuitivas para operadores.',
                    ],
                    tags: ['Rust', 'C++', 'AWS', 'WebSockets', 'Figma'],
                },
                {
                    role: 'Fundador & Arquitecto de Software', company: 'DropAudio CCS', location: 'dropaudioccs.com', period: 'Jun 2021 — Presente', accent: 'web',
                    bullets: [
                        'Diseñé y lancé a producción un e-commerce completo (Nuxt 3 SSR + Supabase/PostgreSQL con RLS) en Vercel, con 94+ reseñas verificadas.',
                        'Desarrollé un recomendador interactivo de 3 pasos y un comparador técnico que redujeron la fricción de compra y aumentaron la conversión.',
                        'Implementé un checkout multimoneda propio (USDT, Zinli, Pago Móvil) con tasas BCV/USDT en vivo y Web Push automatizado vía pg_cron.',
                        'Construí una arquitectura resiliente con catálogo de respaldo y SEO/GEO técnico (JSON-LD, sitemap, PWA).',
                    ],
                    tags: ['Nuxt 3', 'Supabase', 'PostgreSQL', 'Vercel', 'Web Push'],
                },
                {
                    role: 'Consultor de Rendimiento & Ingeniero de Algoritmos', company: 'Freelance · VIAAC', location: 'Remoto · Marítimo/Petróleo', period: 'Ene 2023 — Presente', accent: 'ai',
                    bullets: [
                        'Desarrollé motores de estabilización de video de alto rendimiento con optical flow e interpolación matricial (Python, NumPy, SciPy, OpenCV).',
                        'Implementé estimación global de movimiento con FlowNet (arquitecturas profundas destiladas), combinando matemática clásica con machine learning.',
                        'Diseñé sistemas de comunicación TCP/WebSocket con protocolos propios de transferencia de archivos para entornos de alta frecuencia.',
                        'Realicé auditorías de stack (fugas de memoria, concurrencia, latencia) con roadmaps de refactor en Rust, C++ y Python (PyO3).',
                    ],
                    tags: ['Python', 'OpenCV', 'PyTorch', 'Rust', 'PyO3'],
                },
                {
                    role: 'Especialista de Soporte IT', company: 'RenéDessés de Venezuela', location: 'Caracas, Venezuela', period: 'Ene — Sep 2021', accent: 'api',
                    bullets: [
                        'Mantuve equipos, software y servidores Apache/Linux.',
                        'Instalé y administré redes empresariales, incluyendo infraestructura Cisco.',
                    ],
                    tags: ['Linux', 'Apache', 'Cisco'],
                },
            ],
        },
        education: {
            title: 'Formación & Certificaciones',
            subtitle: 'Título universitario cursado en paralelo a la experiencia profesional.',
            degreesTitle: 'Educación',
            degrees: [
                { title: 'Licenciatura en Ciencias de la Computación (B.Sc.)', school: 'LUZ-IUTA · Universidad del Zulia', period: 'Graduación Abr 2025' },
                { title: 'TSU en Informática', school: 'LUZ-IUTA · Universidad del Zulia', period: '2018 — 2021' },
            ],
            certsTitle: 'Certificaciones',
            certs: [
                'Vue.js 2 Profesional — Platzi (2024)',
                'TypeScript: Tipos y Funciones Avanzadas — Platzi (2024)',
                'Fundamentos de TypeScript — Platzi (2024)',
                'Optimización Web — Platzi (2024)',
                'Python: NumPy y Pandas — Platzi (2024)',
                'Introducción a la IA Generativa — Duke University / Coursera (2025)',
            ],
            langTitle: 'Idiomas',
            languages: 'Español (nativo) · Inglés B2 profesional',
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
            detail: 'Ver detalle',
        },
        detail: {
            whatThis: 'Qué es',
            stack: 'Stack',
            language: 'Lenguaje',
            runtime: 'Framework / runtime',
            libs: 'Librerías notables',
            structure: 'Cómo está organizado',
            howItFits: 'Cómo encaja todo',
            practice: 'Qué hace en la práctica',
            components: 'Componentes principales',
            run: 'Cómo ejecutarlo',
            requirements: 'Requisitos',
            oneLiner: 'En una frase',
            ask: 'Prueba a preguntar',
            pending: 'El desglose completo de este proyecto está en preparación. Mientras tanto, aquí va el resumen y el enlace al repositorio.',
            close: 'Cerrar',
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
        nav: { flagship: 'Case study', impact: 'Impact', experience: 'Experience', specialties: 'Specialties', projects: 'Projects', education: 'Education', stack: 'Stack', contact: 'Contact' },
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
            cvProfile: 'Profile',
            cvFullStack: 'Full Stack',
            cvBackend: 'Backend & AI',
            scroll: 'Scroll to explore',
        },
        stats: {
            years: 'Years of experience',
            repos: 'Public repositories',
            areas: 'Specialty areas',
            thesis: 'Thesis on video stabilization',
        },
        impact: {
            title: 'Why hire me',
            subtitle: 'Measurable results in production systems, not demos.',
            items: [
                { icon: 'fa-solid fa-gauge-high', metric: '1–10 ms', label: 'Real-time latency', desc: 'Redesigned dashboards with a full-duplex WebSocket architecture: from 200–500 ms down to 1–10 ms and up to −95% bandwidth.' },
                { icon: 'fa-solid fa-industry', metric: '24/7', label: 'Industrial Digital Twin', desc: 'Telemetry system that predicts coke-drum deformation in a refinery from high-frequency sensor data.' },
                { icon: 'fa-solid fa-rocket', metric: '0 → prod', label: 'Technical founder', desc: 'DropAudio CCS from zero to production: Nuxt 3 + Supabase, multi-currency checkout and 94+ verified reviews.' },
                { icon: 'fa-solid fa-eye', metric: 'CV · ML', label: 'Computer vision', desc: 'Video stabilization engines (optical flow + FlowNet) for the maritime/oil sector.' },
            ],
        },
        experience: {
            title: 'Experience',
            subtitle: 'Five years shipping software to production alongside my degree.',
            present: 'Present',
            items: [
                {
                    role: 'Lead Performance & Systems Engineer', company: 'Ea2technology', location: 'Canada · Remote', period: 'Jul 2021 — Present', accent: 'cv',
                    bullets: [
                        'Designed and deployed an industrial Digital Twin (telemetry) for real-time monitoring of coke-drum deformation in a refinery, preventing critical structural failures.',
                        'Designed a low-latency, full-duplex WebSocket architecture that replaced HTTP polling: from 200–500 ms to 1–10 ms and up to −95% bandwidth.',
                        'Led the migration of legacy monoliths to cloud-native microservices on AWS, optimizing compute-intensive pipelines with C++ and Rust (memory safety, max concurrency).',
                        'Led end-to-end technical UI/UX design in Figma, connecting low-level performance with intuitive operator interfaces.',
                    ],
                    tags: ['Rust', 'C++', 'AWS', 'WebSockets', 'Figma'],
                },
                {
                    role: 'Founder & Software Architect', company: 'DropAudio CCS', location: 'dropaudioccs.com', period: 'Jun 2021 — Present', accent: 'web',
                    bullets: [
                        'Designed and shipped a complete e-commerce platform (Nuxt 3 SSR + Supabase/PostgreSQL with RLS) to production on Vercel, with 94+ verified reviews.',
                        'Built an interactive 3-step recommender and a technical comparator that reduced purchase friction and increased conversion.',
                        'Implemented a custom multi-currency checkout (USDT, Zinli, Pago Móvil) with live BCV/USDT rates and automated Web Push via pg_cron.',
                        'Built a resilient architecture with a backup catalog and technical SEO/GEO (JSON-LD, sitemap, PWA).',
                    ],
                    tags: ['Nuxt 3', 'Supabase', 'PostgreSQL', 'Vercel', 'Web Push'],
                },
                {
                    role: 'Software Performance Consultant & Algorithm Engineer', company: 'Freelance · VIAAC', location: 'Remote · Maritime/Oil', period: 'Jan 2023 — Present', accent: 'ai',
                    bullets: [
                        'Built high-performance video stabilization engines with optical flow and matrix interpolation (Python, NumPy, SciPy, OpenCV).',
                        'Implemented global motion estimation with FlowNet (distilled deep architectures), combining classical math with machine learning.',
                        'Designed TCP/WebSocket communication systems with custom file-transfer protocols for high-frequency environments.',
                        'Ran stack audits (memory leaks, concurrency, latency) delivering refactoring roadmaps in Rust, C++ and Python (PyO3).',
                    ],
                    tags: ['Python', 'OpenCV', 'PyTorch', 'Rust', 'PyO3'],
                },
                {
                    role: 'IT Support Specialist', company: 'RenéDessés de Venezuela', location: 'Caracas, Venezuela', period: 'Jan — Sep 2021', accent: 'api',
                    bullets: [
                        'Maintained equipment, software and Apache/Linux servers.',
                        'Installed and administered enterprise networks, including Cisco infrastructure.',
                    ],
                    tags: ['Linux', 'Apache', 'Cisco'],
                },
            ],
        },
        education: {
            title: 'Education & Certifications',
            subtitle: 'University degree completed in parallel with professional experience.',
            degreesTitle: 'Education',
            degrees: [
                { title: 'Bachelor\'s Degree in Computer Science', school: 'LUZ-IUTA · University of Zulia', period: 'Graduated Apr 2025' },
                { title: 'Associate Degree (TSU) in IT', school: 'LUZ-IUTA · University of Zulia', period: '2018 — 2021' },
            ],
            certsTitle: 'Certifications',
            certs: [
                'Vue.js 2 Professional — Platzi (2024)',
                'TypeScript: Advanced Types & Functions — Platzi (2024)',
                'TypeScript Fundamentals — Platzi (2024)',
                'Web Optimization — Platzi (2024)',
                'Python: NumPy & Pandas — Platzi (2024)',
                'Introduction to Generative AI — Duke University / Coursera (2025)',
            ],
            langTitle: 'Languages',
            languages: 'Spanish (native) · English B2 professional',
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
            detail: 'View detail',
        },
        detail: {
            whatThis: 'What this is',
            stack: 'Stack',
            language: 'Language',
            runtime: 'Framework / runtime',
            libs: 'Notable libraries',
            structure: "How it's organized",
            howItFits: 'How it fits together',
            practice: 'What it does in practice',
            components: 'Main components',
            run: 'How to run it',
            requirements: 'Requirements',
            oneLiner: 'In one sentence',
            ask: 'Try asking',
            pending: "A full breakdown of this project is in progress. Meanwhile, here is the summary and a link to the repository.",
            close: 'Close',
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
