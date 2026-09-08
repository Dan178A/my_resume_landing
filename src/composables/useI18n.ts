/* i18n ligero ES/EN sin dependencias */
import { computed, inject, ref, type InjectionKey, type Ref } from 'vue'

export type Lang = 'es' | 'en'

const STORAGE_KEY = 'portfolio-lang'

/* Por defecto inglés: la mayoría de clientes y reclutadores internacionales
   llegan en inglés. El español sigue disponible con el toggle y se respeta
   la preferencia guardada. */
/* El idioma lo manda la ruta (/ = en, /es = es): así cada versión se
   prerenderiza con su propio HTML, su propio lang y su propio canonical.

   Vive en un provide por instancia de app, no en un ref de módulo: vite-ssg
   renderiza las páginas en paralelo y un singleton haría que la última en
   fijarse pisara a las demás. */
export const LANG_KEY: InjectionKey<Ref<Lang>> = Symbol('lang')

export const createLangState = (l: Lang): Ref<Lang> => ref<Lang>(l)

/* Solo se usa si alguien monta un componente fuera de la app (tests). */
const fallbackLang = ref<Lang>('en')

export const savedLang = (): Lang | null => {
    try {
        const saved = localStorage.getItem(STORAGE_KEY)
        if (saved === 'es' || saved === 'en') return saved
    } catch { /* SSR / modo privado */ }
    return null
}

export const rememberLang = (l: Lang): void => {
    try { localStorage.setItem(STORAGE_KEY, l) } catch { /* noop */ }
}

/* Ruta canónica de cada idioma */
export const pathForLang = (l: Lang): string => (l === 'es' ? '/es' : '/')
export const langForPath = (path: string): Lang => (path.startsWith('/es') ? 'es' : 'en')

const messages = {
    es: {
        nav: { flagship: 'Caso destacado', impact: 'Impacto', systems: 'Sistemas', experience: 'Experiencia', services: 'Servicios', specialties: 'Especialidades', projects: 'Proyectos', education: 'Formación', stack: 'Stack', contact: 'Contacto' },
        hero: {
            role: 'Ingeniero de Software y Sistemas · Tiempo Real e IoT Industrial',
            available: 'Disponible para proyectos freelance y roles remotos',
            wordsPrefix: 'Construyo',
            words: ['Sistemas en Tiempo Real', 'IoT Industrial', 'Arquitectura Offline-First', 'IA Aplicada'],
            tagline: 'Diseño y construyo el software del que dependen operaciones industriales: telemetría en tiempo real, control de hardware en red y sistemas que siguen funcionando cuando la red no. Cinco años, cuatro sistemas en producción, ~3.000 commits.',
            ctaProjects: 'Ver sistemas',
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
            years: 'Años enviando a producción',
            systems: 'Sistemas en producción',
            commits: 'Commits en 5 años',
            remote: 'Remoto · LATAM ⇄ NA/UE',
        },
        impact: {
            title: '¿Por qué contratar a Daniel Silva?',
            subtitle: 'Resultados medibles en sistemas de producción, no demos.',
            items: [
                { icon: 'fa-solid fa-gauge-high', metric: '1–10 ms', label: 'Latencia en tiempo real', desc: 'Reemplacé polling HTTP por una arquitectura WebSocket full-duplex: de 200–500 ms a 1–10 ms y hasta −95% de ancho de banda.' },
                { icon: 'fa-solid fa-industry', metric: '77%', label: 'Arquitecto en solitario', desc: 'De 681 commits en el sistema de control de hardware industrial: 5 años, 398 archivos, versión 12 en uso real en campo.' },
                { icon: 'fa-solid fa-plug-circle-xmark', metric: '100%', label: 'Operación offline', desc: 'Ecosistema offline-first con sincronización bidireccional nube↔local: la planta trabaja sin internet y reconcilia al volver.' },
                { icon: 'fa-solid fa-rocket', metric: '0 → prod', label: 'Fundador técnico', desc: 'DropAudio CCS de cero a producción: Nuxt 3 + Supabase, checkout multimoneda y 102+ reseñas verificadas.' },
            ],
        },
        systems: {
            title: 'Sistemas en producción',
            subtitle: 'Cuatro sistemas construidos en paralelo durante cinco años. Trabajo de cliente bajo confidencialidad: describo arquitectura y decisiones, nunca datos del negocio.',
            note: 'Repositorios privados (código de cliente / NDA). Puedo explicar arquitectura, decisiones y trade-offs en una llamada.',
            items: [
                {
                    name: 'Control de hardware IoT industrial',
                    period: '2022 — 2026 · 5 años',
                    role: 'Autor principal y arquitecto',
                    pitch: 'Aplicación de escritorio para operar cámaras de inspección industrial de forma coordinada desde dos equipos en red, sin soporte técnico presente en campo.',
                    metrics: ['524 de 681 commits (77%)', '398 archivos · 214k+ líneas', 'v12 en uso real'],
                    bullets: [
                        'Arquitectura dual-PC: el mismo ejecutable se relanza y asume su rol (servidor o cliente) sin configuración manual del operador.',
                        'Transferencia de imágenes por chunks con reconstrucción y manejo de cortes; timeouts explícitos en toda frontera de red para que una cámara apagada no congele la interfaz.',
                        'Mapas interactivos con blitting sobre matplotlib embebido en Qt: zoom y paneo fluidos sobre datos geométricos en vivo.',
                        'De monolito a librería modular sin detener la entrega, con suite pytest/pytest-qt e instalador Windows versionado.',
                    ],
                    stack: ['Python', 'PyQt5', 'OpenCV', 'Socket.IO', 'matplotlib', 'pytest', 'PyInstaller'],
                },
                {
                    name: 'Plataforma web industrial',
                    period: '2022 — 2026 · 4 años',
                    role: 'Fundador del repositorio · punto de integración',
                    pitch: 'Plataforma completa de inspección y analítica industrial: del "chasis" inicial del repositorio al producto en producción, integrando el trabajo de un equipo de ~14 personas.',
                    metrics: ['~2.000 commits', '~14 colaboradores integrados', '11+ ramas de integración'],
                    bullets: [
                        'Stack completo sin delegar: Nuxt/Vue en el frontend, Express/TypeScript en el backend, Sequelize/MySQL en datos y despliegue en AWS.',
                        'Motor analítico de fisuras y visualizaciones 2D/3D (Highcharts, D3, Three.js) sobre geometría de activos industriales.',
                        'Chatbot de voz en tiempo real: WebSocket, captura y síntesis de audio, detección de hablante y modo en vivo con auto-recuperación.',
                        'Responsable del ciclo feature→producción: versionado continuo, pruebas de rendimiento de consultas, build y despliegue.',
                    ],
                    stack: ['Nuxt/Vue', 'TypeScript', 'Express', 'MySQL', 'Three.js', 'WebSockets', 'AWS'],
                },
                {
                    name: 'Ecosistema offline-first',
                    period: '2023 — 2026 · 3 años',
                    role: 'Autor principal desde el origen',
                    pitch: 'Cliente de escritorio que opera 100% offline en planta y sincroniza de forma bidireccional con la nube cuando hay conectividad.',
                    metrics: ['~250 commits', '~845 archivos', 'Instaladores autocontenidos'],
                    bullets: [
                        'Sincronización nube↔local con estados por endpoint, detección de conectividad y reintentos: cero pérdida de trabajo en campo.',
                        'Orquestador en Python que levanta base de datos portable, servicios Node/TypeScript y API, todo empaquetado en un instalador que resuelve sus propias dependencias.',
                        'Pipeline propio de transcripción y síntesis de audio con IA (FastAPI/Uvicorn) integrado al producto.',
                        'CI/CD con GitHub Actions, tests con aislamiento de configuración y pooling de conexiones a base de datos.',
                    ],
                    stack: ['Python', 'FastAPI', 'Node/TS', 'MariaDB', 'S3', 'GitHub Actions', 'PyInstaller'],
                },
                {
                    name: 'Análisis de series de tiempo industriales',
                    period: '2024 — 2026 · 2 años',
                    role: 'Autor principal',
                    pitch: 'Herramienta que detecta automáticamente ciclos térmicos y puntos clave de gradiente en series de sensores, sustituyendo el análisis manual en hoja de cálculo.',
                    metrics: ['Pipeline parametrizable por CLI', 'Salidas JSON · Excel · PNG', 'Exploración de port a Rust'],
                    bullets: [
                        'Detección de picos y valles con SciPy sobre señal suavizada, e interpolación de datos defectuosos para que la detección no se rompa.',
                        'Procesamiento con Polars y adaptación del pipeline a dos cambios de formato de la fuente sin reescribirlo.',
                        'Salidas listas para ingeniería: JSON estructurado por ciclo, tabla Excel y gráfica marcada.',
                        'Exploración de reescritura en Rust (calamine + polars) documentada y archivada como referencia.',
                    ],
                    stack: ['Python', 'Polars', 'NumPy', 'SciPy', 'matplotlib', 'Rust'],
                },
            ],
        },
        services: {
            title: 'Trabajemos juntos',
            subtitle: 'Tres formas de contratarme. Alcance y precio claros desde la primera llamada.',
            rate: 'Tarifa por hora: $45–65 USD · Presupuesto cerrado por alcance · Contrato vía Deel, Payoneer o cripto',
            from: 'Desde',
            cta: 'Solicitar propuesta',
            items: [
                {
                    icon: 'fa-solid fa-magnifying-glass-chart',
                    name: 'Auditoría de rendimiento y arquitectura',
                    price: '$1.500 USD',
                    meta: '1 – 2 semanas',
                    desc: 'Reviso tu sistema y te digo exactamente qué lo está frenando y en qué orden arreglarlo.',
                    points: ['Diagnóstico de latencia, fugas de memoria y concurrencia', 'Mapa de puntos únicos de fallo', 'Roadmap de refactor priorizado por impacto/costo', 'Sesión de traspaso con tu equipo'],
                },
                {
                    icon: 'fa-solid fa-cubes',
                    name: 'Sistema a medida, de cero a producción',
                    price: '$6.000 USD',
                    meta: 'Por proyecto · 6 – 12 semanas',
                    desc: 'Diseño, construyo y entrego el sistema completo: integración de hardware, tiempo real, offline-first, instaladores y pruebas.',
                    points: ['Arquitectura y prototipo funcional en las primeras 2 semanas', 'Suite de pruebas y documentación técnica', 'Empaquetado y despliegue (escritorio o web)', 'Código y traspaso completo: sin dependencia de mí'],
                },
                {
                    icon: 'fa-solid fa-handshake-angle',
                    name: 'Ingeniero de sistemas fraccional',
                    price: '$3.500 USD',
                    meta: 'Al mes · 20 h/semana · Mínimo 3 meses',
                    desc: 'Me hago cargo de un sistema tuyo de forma continua: features, releases y salud de la arquitectura.',
                    points: ['Ownership real, no tickets sueltos', 'Demo y reporte semanal', 'Horario solapado con América', 'Escalable a dedicación completa'],
                },
            ],
            howTitle: 'Cómo trabajo',
            how: ['Asíncrono por defecto, con una llamada semanal fija.', 'Entrego software que se ejecuta, no diapositivas.', 'Todo lo que construyo queda con pruebas y documentación.', 'Si el alcance cambia, se cotiza antes, no después.'],
        },
        experience: {
            title: '¿Dónde ha trabajado Daniel Silva?',
            subtitle: 'Cinco años enviando software a producción. Los roles se solapan a propósito: Ea2technology es un contrato part-time y, en paralelo, llevo consultoría independiente y mi propio producto.',
            present: 'Presente',
            items: [
                {
                    role: 'Lead Performance & Systems Engineer', company: 'Ea2technology', location: 'Canadá · Remoto · Contrato part-time', period: 'Jul 2021 — Presente', accent: 'cv',
                    bullets: [
                        'Diseñé y desplegué un Digital Twin industrial de telemetría para monitoreo estructural en tiempo real, procesando datos de sensores de alta frecuencia para anticipar fallos críticos.',
                        'Diseñé una arquitectura WebSocket full-duplex de baja latencia que reemplazó el polling HTTP: de 200–500 ms a 1–10 ms y hasta −95% de ancho de banda.',
                        'Construí una aplicación de escritorio para control remoto coordinado de hardware IoT industrial entre equipos en red, pensada para operar sin supervisión y con red poco fiable.',
                        'Levanté un ecosistema offline-first con sincronización bidireccional que permite operar 100% sin conexión y reconciliar automáticamente al restablecerse.',
                        'Integré un pipeline de transcripción y síntesis de audio con IA en la plataforma.',
                        'Lideré la migración de monolitos legacy a microservicios cloud-native en AWS, optimizando pipelines intensivos con C++ y Rust.',
                    ],
                    tags: ['Rust', 'C++', 'AWS', 'WebSockets', 'IoT', 'Offline-first'],
                },
                {
                    role: 'Consultor de Rendimiento & Ingeniero de Algoritmos', company: 'Freelance · Independiente', location: 'Remoto · Industrial / Marítimo · Por proyecto', period: 'Ene 2023 — Presente', accent: 'ai',
                    bullets: [
                        'Motores de estabilización de video de alto rendimiento con optical flow e interpolación matricial (Python, NumPy, SciPy, OpenCV).',
                        'Estimación global de movimiento con FlowNet (arquitecturas profundas destiladas), combinando matemática clásica con machine learning.',
                        'Pipelines de series de tiempo para detectar ciclos y puntos de inflexión en datos de sensores industriales (Polars, SciPy), parametrizables por CLI.',
                        'Auditorías de stack: fugas de memoria, concurrencia y latencia, con roadmaps de refactor en Rust, C++ y Python (PyO3).',
                    ],
                    tags: ['Python', 'OpenCV', 'PyTorch', 'Rust', 'Polars', 'PyO3'],
                },
                {
                    role: 'Fundador & Arquitecto de Software', company: 'DropAudio CCS', location: 'dropaudioccs.com · Producto propio', period: 'Jun 2021 — Presente', accent: 'web',
                    bullets: [
                        'Diseñé y lancé a producción un e-commerce completo (Nuxt 3 SSR + Supabase/PostgreSQL con RLS) en Vercel, con 102+ reseñas verificadas.',
                        'Desarrollé un recomendador interactivo de 3 pasos y un comparador técnico que redujeron la fricción de compra.',
                        'Implementé un checkout multimoneda propio (USDT, Zinli, Pago Móvil) con tasas en vivo y Web Push automatizado vía pg_cron.',
                        'Construí una arquitectura resiliente con catálogo de respaldo y SEO técnico (JSON-LD, sitemap, PWA).',
                    ],
                    tags: ['Nuxt 3', 'Supabase', 'PostgreSQL', 'Vercel', 'Web Push'],
                },
                {
                    role: 'Especialista de Soporte IT', company: 'RenéDessés de Venezuela', location: 'Caracas, Venezuela · Tiempo completo', period: 'Ene — Sep 2021', accent: 'api',
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
            tagline: 'Producto propio en producción: tienda pública y panel de administración, construidos de extremo a extremo.',
            pitch: 'El sistema industrial demuestra cómo trabajo bajo restricciones; DropAudio demuestra que también sé llevar un producto entero al mercado — de la arquitectura de datos con Supabase y RLS a la experiencia de compra, sobre Nuxt 3 y Vercel. No es una demo: es una tienda real operando.',
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
            title: '¿En qué se especializa Daniel Silva?',
            subtitle: 'Cuatro frentes, un mismo estándar de ingeniería.',
            cv: {
                title: 'Visión Industrial & OCR',
                desc: 'Estabilización de video con deep learning y optical flow (tesis de grado), OCR industrial para lectura de paneles en planta y extracción de documentos con pipelines de doble motor.',
            },
            ai: {
                title: 'Tiempo Real & IA Aplicada',
                desc: 'Asistentes de voz conversacionales (Rust + Python), transcripción y síntesis en streaming, WebSockets full-duplex y detección de eventos sobre datos de sensores.',
            },
            web: {
                title: 'Plataformas Full-Stack',
                desc: 'Productos completos con Vue 3 y Nuxt 3: e-commerce con panel de administración, plataformas industriales con visualización 2D/3D y despliegues en AWS, Vercel y edge.',
            },
            api: {
                title: 'Backend, APIs & Datos',
                desc: 'Microservicios con FastAPI y gRPC, pipelines de datos con Polars/pandas, sincronización offline-first, Redis y APIs públicas consumidas por terceros.',
            },
        },
        projects: {
            title: '¿Qué proyectos ha construido Daniel Silva?',
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
            title: '¿Con qué tecnologías trabaja Daniel Silva?',
            subtitle: 'Herramientas que uso a diario.',
        },
        contact: {
            title: '¿Tienes un sistema que arreglar o construir?',
            subtitle: 'Respondo en menos de 24 horas. Primera llamada de 30 minutos sin costo para revisar tu caso.',
            whatsapp: 'WhatsApp',
            email: 'Correo',
        },
        form: {
            title: 'Cuéntame qué necesitas',
            subtitle: 'Responde en menos de 24 horas. Si prefieres, escríbeme directo por WhatsApp.',
            name: 'Nombre',
            namePh: 'Tu nombre',
            email: 'Correo',
            emailPh: 'tucorreo@empresa.com',
            company: 'Empresa (opcional)',
            companyPh: 'Nombre de tu empresa',
            service: 'Qué necesitas',
            servicePh: 'Elige una opción',
            other: 'Otra cosa / todavía no lo sé',
            budget: 'Presupuesto (opcional)',
            budgetPh: 'Prefiero conversarlo',
            budgets: ['Menos de $2.000', '$2.000 – $5.000', '$5.000 – $10.000', 'Más de $10.000', 'Retainer mensual'],
            message: 'Cuéntame del proyecto',
            messagePh: 'Qué sistema tienes o quieres construir, en qué estado está y para cuándo lo necesitas.',
            send: 'Enviar solicitud',
            sending: 'Enviando…',
            sent: '¡Listo! Recibí tu mensaje y te respondo en menos de 24 horas.',
            error: 'No se pudo enviar. Escríbeme directo a dsrglrm@gmail.com o por WhatsApp.',
            required: 'Este campo es obligatorio',
            invalidEmail: 'Escribe un correo válido',
            tooShort: 'Cuéntame un poco más (mínimo 20 caracteres)',
            whatsapp: 'Prefiero WhatsApp',
            privacy: 'Tus datos solo se usan para responderte. Nada de listas de correo.',
        },
        footer: 'Diseñado y construido por Daniel Silva',
    },
    en: {
        nav: { flagship: 'Case study', impact: 'Impact', systems: 'Systems', experience: 'Experience', services: 'Services', specialties: 'Specialties', projects: 'Projects', education: 'Education', stack: 'Stack', contact: 'Contact' },
        hero: {
            role: 'Software & Systems Engineer · Real-Time and Industrial IoT',
            available: 'Available for freelance projects and remote roles',
            wordsPrefix: 'I build',
            words: ['Real-Time Systems', 'Industrial IoT', 'Offline-First Architecture', 'Applied AI'],
            tagline: 'I design and ship the software industrial operations depend on: real-time telemetry, networked hardware control, and systems that keep working when the network does not. Five years, four production systems, ~3,000 commits.',
            ctaProjects: 'See the systems',
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
            years: 'Years shipping to production',
            systems: 'Systems in production',
            commits: 'Commits over 5 years',
            remote: 'Remote · LATAM ⇄ NA/EU',
        },
        impact: {
            title: 'Why hire Daniel Silva?',
            subtitle: 'Measurable results in production systems, not demos.',
            items: [
                { icon: 'fa-solid fa-gauge-high', metric: '1–10 ms', label: 'Real-time latency', desc: 'Replaced HTTP polling with a full-duplex WebSocket architecture: from 200–500 ms down to 1–10 ms and up to −95% bandwidth.' },
                { icon: 'fa-solid fa-industry', metric: '77%', label: 'Sole architect', desc: 'Of 681 commits in the industrial hardware-control system: 5 years, 398 files, version 12 in real field use.' },
                { icon: 'fa-solid fa-plug-circle-xmark', metric: '100%', label: 'Offline operation', desc: 'Offline-first ecosystem with bidirectional cloud↔local sync: the plant works with no internet and reconciles when it returns.' },
                { icon: 'fa-solid fa-rocket', metric: '0 → prod', label: 'Technical founder', desc: 'DropAudio CCS from zero to production: Nuxt 3 + Supabase, multi-currency checkout and 102+ verified reviews.' },
            ],
        },
        systems: {
            title: 'Systems in production',
            subtitle: 'Four systems built in parallel over five years. Client work under confidentiality: I describe architecture and decisions, never business data.',
            note: 'Private repositories (client code / NDA). I can walk through architecture, decisions and trade-offs on a call.',
            items: [
                {
                    name: 'Industrial IoT hardware control',
                    period: '2022 — 2026 · 5 years',
                    role: 'Principal author and architect',
                    pitch: 'Desktop application to operate industrial inspection cameras from two networked machines in a coordinated way, with no technical support present in the field.',
                    metrics: ['524 of 681 commits (77%)', '398 files · 214k+ lines', 'v12 in real field use'],
                    bullets: [
                        'Dual-PC architecture: the same executable relaunches itself and assumes its role (server or client) with zero manual setup by the operator.',
                        'Chunked image transfer with reassembly and connection-drop handling; explicit timeouts at every network boundary so a powered-off camera never freezes the UI.',
                        'Interactive maps with blitting on matplotlib embedded in Qt: smooth zoom and pan over live geometric data.',
                        'Refactored from monolith to modular library without stopping delivery, with a pytest/pytest-qt suite and a versioned Windows installer.',
                    ],
                    stack: ['Python', 'PyQt5', 'OpenCV', 'Socket.IO', 'matplotlib', 'pytest', 'PyInstaller'],
                },
                {
                    name: 'Industrial web platform',
                    period: '2022 — 2026 · 4 years',
                    role: 'Repository founder · integration point',
                    pitch: 'Full inspection and analytics platform for industrial assets: from the initial repository "chassis" to a product in production, integrating the work of a ~14-person team.',
                    metrics: ['~2,000 commits', '~14 contributors integrated', '11+ integration branches'],
                    bullets: [
                        'Owned the entire stack: Nuxt/Vue frontend, Express/TypeScript backend, Sequelize/MySQL data layer and AWS deployment.',
                        'Crack-analytics engine and 2D/3D visualization (Highcharts, D3, Three.js) over industrial asset geometry.',
                        'Real-time voice chatbot: WebSocket, audio capture and synthesis, speaker detection and live mode with auto-recovery.',
                        'Owned the feature→production cycle: continuous versioning, query performance testing, build and deploy.',
                    ],
                    stack: ['Nuxt/Vue', 'TypeScript', 'Express', 'MySQL', 'Three.js', 'WebSockets', 'AWS'],
                },
                {
                    name: 'Offline-first ecosystem',
                    period: '2023 — 2026 · 3 years',
                    role: 'Principal author since day one',
                    pitch: 'Desktop client that runs 100% offline on plant floors and syncs bidirectionally with the cloud whenever connectivity returns.',
                    metrics: ['~250 commits', '~845 files', 'Self-contained installers'],
                    bullets: [
                        'Cloud↔local sync with per-endpoint state, connectivity detection and retries: zero lost work in the field.',
                        'Python orchestrator that brings up a portable database, Node/TypeScript services and the API, all packaged in an installer that resolves its own dependencies.',
                        'Custom AI audio transcription and synthesis pipeline (FastAPI/Uvicorn) integrated into the product.',
                        'CI/CD with GitHub Actions, tests with configuration isolation and database connection pooling.',
                    ],
                    stack: ['Python', 'FastAPI', 'Node/TS', 'MariaDB', 'S3', 'GitHub Actions', 'PyInstaller'],
                },
                {
                    name: 'Industrial time-series analysis',
                    period: '2024 — 2026 · 2 years',
                    role: 'Principal author',
                    pitch: 'Tool that automatically detects thermal cycles and key gradient points in sensor series, replacing manual spreadsheet analysis.',
                    metrics: ['CLI-parameterized pipeline', 'JSON · Excel · PNG outputs', 'Rust port exploration'],
                    bullets: [
                        'Peak and valley detection with SciPy over a smoothed signal, plus interpolation of faulty readings so detection never breaks.',
                        'Polars-based processing, with the pipeline adapted to two source-format changes without a rewrite.',
                        'Engineering-ready outputs: structured JSON per cycle, an Excel table and an annotated plot.',
                        'Documented Rust rewrite exploration (calamine + polars), archived as reference.',
                    ],
                    stack: ['Python', 'Polars', 'NumPy', 'SciPy', 'matplotlib', 'Rust'],
                },
            ],
        },
        services: {
            title: 'Work with me',
            subtitle: 'Three ways to hire me. Clear scope and price from the first call.',
            rate: 'Hourly rate: $45–65 USD · Fixed-scope quotes available · Contracting via Deel, Payoneer or crypto',
            from: 'From',
            cta: 'Request a proposal',
            items: [
                {
                    icon: 'fa-solid fa-magnifying-glass-chart',
                    name: 'Performance & architecture audit',
                    price: '$1,500 USD',
                    meta: '1 – 2 weeks',
                    desc: 'I review your system and tell you exactly what is slowing it down and in what order to fix it.',
                    points: ['Latency, memory-leak and concurrency diagnosis', 'Map of single points of failure', 'Refactor roadmap prioritized by impact/cost', 'Handover session with your team'],
                },
                {
                    icon: 'fa-solid fa-cubes',
                    name: 'Custom system, zero to production',
                    price: '$6,000 USD',
                    meta: 'Per project · 6 – 12 weeks',
                    desc: 'I design, build and deliver the whole system: hardware integration, real-time, offline-first, installers and tests.',
                    points: ['Architecture and working prototype in the first 2 weeks', 'Test suite and technical documentation', 'Packaging and deployment (desktop or web)', 'Full code handover: no lock-in to me'],
                },
                {
                    icon: 'fa-solid fa-handshake-angle',
                    name: 'Fractional systems engineer',
                    price: '$3,500 USD',
                    meta: 'Per month · 20 h/week · 3-month minimum',
                    desc: 'I take ongoing ownership of one of your systems: features, releases and architectural health.',
                    points: ['Real ownership, not scattered tickets', 'Weekly demo and written report', 'Overlapping hours with the Americas', 'Scalable to full-time'],
                },
            ],
            howTitle: 'How I work',
            how: ['Async by default, with one fixed weekly call.', 'I deliver software that runs, not slides.', 'Everything I build ships with tests and documentation.', 'If scope changes, it gets quoted before, not after.'],
        },
        experience: {
            title: 'Where has Daniel Silva worked?',
            subtitle: 'Five years shipping software to production. The roles overlap by design: Ea2technology is a part-time contract, and alongside it I run independent consulting and my own product.',
            present: 'Present',
            items: [
                {
                    role: 'Lead Performance & Systems Engineer', company: 'Ea2technology', location: 'Canada · Remote · Part-time contract', period: 'Jul 2021 — Present', accent: 'cv',
                    bullets: [
                        'Designed and deployed an industrial Digital Twin telemetry system for real-time structural monitoring, processing high-frequency sensor data to anticipate critical failures.',
                        'Designed a low-latency, full-duplex WebSocket architecture that replaced HTTP polling: from 200–500 ms to 1–10 ms and up to −95% bandwidth.',
                        'Built a desktop application for coordinated remote control of industrial IoT hardware across networked machines, designed for zero-supervision operation under unreliable networks.',
                        'Built an offline-first ecosystem with bidirectional sync, enabling 100%-offline operation and automatic reconciliation once connectivity is restored.',
                        'Integrated an AI-based audio transcription and synthesis pipeline into the platform.',
                        'Led the migration of legacy monoliths to cloud-native microservices on AWS, optimizing compute-intensive pipelines with C++ and Rust.',
                    ],
                    tags: ['Rust', 'C++', 'AWS', 'WebSockets', 'IoT', 'Offline-first'],
                },
                {
                    role: 'Software Performance Consultant & Algorithm Engineer', company: 'Freelance · Independent', location: 'Remote · Industrial / Maritime · Per project', period: 'Jan 2023 — Present', accent: 'ai',
                    bullets: [
                        'High-performance video stabilization engines with optical flow and matrix interpolation (Python, NumPy, SciPy, OpenCV).',
                        'Global motion estimation with FlowNet (distilled deep architectures), combining classical math with machine learning.',
                        'Time-series pipelines that detect cycles and inflection points in industrial sensor data (Polars, SciPy), configurable via CLI.',
                        'Stack audits: memory leaks, concurrency and latency, delivering refactor roadmaps in Rust, C++ and Python (PyO3).',
                    ],
                    tags: ['Python', 'OpenCV', 'PyTorch', 'Rust', 'Polars', 'PyO3'],
                },
                {
                    role: 'Founder & Software Architect', company: 'DropAudio CCS', location: 'dropaudioccs.com · Own product', period: 'Jun 2021 — Present', accent: 'web',
                    bullets: [
                        'Designed and shipped a complete e-commerce platform (Nuxt 3 SSR + Supabase/PostgreSQL with RLS) to production on Vercel, with 102+ verified reviews.',
                        'Built an interactive 3-step recommender and a technical comparator that reduced purchase friction.',
                        'Implemented a custom multi-currency checkout (USDT, Zinli, Pago Móvil) with live rates and automated Web Push via pg_cron.',
                        'Built a resilient architecture with a backup catalog and technical SEO (JSON-LD, sitemap, PWA).',
                    ],
                    tags: ['Nuxt 3', 'Supabase', 'PostgreSQL', 'Vercel', 'Web Push'],
                },
                {
                    role: 'IT Support Specialist', company: 'RenéDessés de Venezuela', location: 'Caracas, Venezuela · Full-time', period: 'Jan — Sep 2021', accent: 'api',
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
            tagline: 'My own product in production: public storefront and admin panel, built end to end.',
            pitch: 'The industrial systems show how I work under constraints; DropAudio shows I can also take a whole product to market — from the Supabase data layer with RLS to the buying experience, on Nuxt 3 and Vercel. Not a demo: a real store in operation.',
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
            title: 'What does Daniel Silva specialize in?',
            subtitle: 'Four fronts, one engineering standard.',
            cv: {
                title: 'Industrial Vision & OCR',
                desc: 'Video stabilization with deep learning and optical flow (undergraduate thesis), industrial OCR for reading plant panels, and document extraction with dual-engine pipelines.',
            },
            ai: {
                title: 'Real-Time & Applied AI',
                desc: 'Conversational voice assistants (Rust + Python), streaming transcription and synthesis, full-duplex WebSockets and event detection over sensor data.',
            },
            web: {
                title: 'Full-Stack Platforms',
                desc: 'Complete products with Vue 3 and Nuxt 3: e-commerce with admin panel, industrial platforms with 2D/3D visualization, and deployments on AWS, Vercel and the edge.',
            },
            api: {
                title: 'Backend, APIs & Data',
                desc: 'Microservices with FastAPI and gRPC, data pipelines with Polars/pandas, offline-first synchronization, Redis and public APIs consumed by third parties.',
            },
        },
        projects: {
            title: 'What has Daniel Silva built?',
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
            title: 'Which technologies does Daniel Silva work with?',
            subtitle: 'Tools I use every day.',
        },
        contact: {
            title: 'Got a system to fix or build?',
            subtitle: 'I reply within 24 hours. First 30-minute call is free to review your case.',
            whatsapp: 'WhatsApp',
            email: 'Email',
        },
        form: {
            title: 'Tell me what you need',
            subtitle: 'I reply within 24 hours. If you prefer, message me directly on WhatsApp.',
            name: 'Name',
            namePh: 'Your name',
            email: 'Email',
            emailPh: 'you@company.com',
            company: 'Company (optional)',
            companyPh: 'Your company name',
            service: 'What you need',
            servicePh: 'Pick an option',
            other: 'Something else / not sure yet',
            budget: 'Budget (optional)',
            budgetPh: "I'd rather discuss it",
            budgets: ['Under $2,000', '$2,000 – $5,000', '$5,000 – $10,000', 'Over $10,000', 'Monthly retainer'],
            message: 'Tell me about the project',
            messagePh: 'What system you have or want to build, where it stands and when you need it.',
            send: 'Send request',
            sending: 'Sending…',
            sent: 'Got it! Your message reached me and I reply within 24 hours.',
            error: "Couldn't send. Email me at dsrglrm@gmail.com or reach out on WhatsApp.",
            required: 'This field is required',
            invalidEmail: 'Enter a valid email',
            tooShort: 'Tell me a bit more (20 characters minimum)',
            whatsapp: 'I prefer WhatsApp',
            privacy: 'Your details are only used to reply to you. No mailing lists.',
        },
        footer: 'Designed and built by Daniel Silva',
    },
} as const

export function useI18n() {
    const lang = inject(LANG_KEY, fallbackLang)
    const t = computed(() => messages[lang.value])
    return { lang, t }
}
