/* Casos de estudio: los proyectos que más dicen de cómo trabajo, contados como
   problema → qué construí → resultado. Las cifras salen de projectDetails.ts y
   de llms.txt; no agregar números que no estén respaldados ahí. */

import type { Bilingual } from './projectDetails'

export interface CaseLink {
    label: Bilingual
    href: string
    icon: string
}

export interface CaseStudy {
    id: string
    /* Nombre del proyecto en `projects` / `projectDetails`, para abrir el detalle. */
    project?: string
    cat: 'cv' | 'ai' | 'web' | 'api'
    kind: Bilingual
    title: Bilingual
    /* La cifra protagonista: opcionalmente un "antes" y siempre un "después". */
    outcome: { from?: string; to: string | Bilingual; label: Bilingual }
    problem: Bilingual
    built: Bilingual
    result: Bilingual
    facts: Bilingual[]
    stack: string[]
    links: CaseLink[]
    media: { src: Bilingual; poster: Bilingual; alt: Bilingual }
}

export const caseStudies: CaseStudy[] = [
    {
        id: 'dropaudio',
        project: 'DropAudio CCS',
        cat: 'web',
        kind: { es: 'Producto propio, en producción', en: 'My own product, in production' },
        title: { es: 'DropAudio CCS', en: 'DropAudio CCS' },
        outcome: { to: '102+', label: { es: 'reseñas verificadas de clientes reales', en: 'verified reviews from real customers' } },
        problem: {
            es: 'Un distribuidor de audio en Venezuela vendía por WhatsApp y hojas de cálculo: sin catálogo navegable, con precios en tres monedas que cambian a diario y entregas coordinadas a mano.',
            en: 'An audio distributor in Venezuela sold through WhatsApp and spreadsheets: no browsable catalog, prices in three currencies that change daily, and deliveries coordinated by hand.',
        },
        built: {
            es: 'Una sola app en Nuxt 3 y Supabase con la tienda pública y el panel de administración: recomendador de audífonos en 3 pasos, comparador técnico, checkout en USDT, Zinli y Pago Móvil con tasas BCV en vivo, inventario, entregas por km y avisos push.',
            en: 'A single Nuxt 3 and Supabase app covering the public store and the admin panel: a 3-step headphone recommender, a technical comparator, checkout in USDT, Zinli and Pago Móvil with live BCV rates, inventory, per-km deliveries and push alerts.',
        },
        result: {
            es: 'La tienda opera a diario. Si Supabase cae, el catálogo de respaldo sigue vendiendo y el checkout igual arma el pedido por WhatsApp.',
            en: 'The store runs every day. If Supabase goes down, the backup catalog keeps selling and checkout still builds the order over WhatsApp.',
        },
        facts: [
            { es: '19 modelos en catálogo', en: '19 models in the catalog' },
            { es: 'Escritura protegida con RLS e is_admin()', en: 'Writes locked down with RLS and is_admin()' },
            { es: 'Recordatorios de entrega con pg_cron y Web Push', en: 'Delivery reminders via pg_cron and Web Push' },
        ],
        stack: ['Nuxt 3', 'Supabase', 'PostgreSQL', 'Tailwind', 'Vercel', 'Web Push'],
        links: [
            { label: { es: 'Ver la tienda', en: 'Visit the store' }, href: 'https://dropaudioccs.com', icon: 'fa-solid fa-arrow-up-right-from-square' },
            { label: { es: 'Probar el asesor', en: 'Try the advisor' }, href: 'https://dropaudioccs.com/asesorate', icon: 'fa-solid fa-wand-magic-sparkles' },
            { label: { es: 'Tablero de diseño', en: 'Design board' }, href: '/dropaudioccs-portafolio', icon: 'fa-solid fa-object-group' },
        ],
        media: {
            src: { es: '/cases/dropaudio.es.mp4', en: '/cases/dropaudio.en.mp4' }, poster: { es: '/cases/dropaudio.es.jpg', en: '/cases/dropaudio.en.jpg' },
            alt: { es: 'Animación del recomendador de DropAudio: tres preguntas, un audífono sugerido y el pago en tres monedas.', en: 'DropAudio recommender animation: three questions, a suggested headphone and checkout in three currencies.' },
        },
    },
    {
        id: 'reel-studio',
        project: 'dropaudio-reel-studio',
        cat: 'ai',
        kind: { es: 'Herramienta interna con IA local', en: 'Internal tool with local AI' },
        title: { es: 'DropAudio Reel Studio', en: 'DropAudio Reel Studio' },
        outcome: { from: '2 h', to: '15 min', label: { es: 'de edición por cada reel', en: 'of editing per reel' } },
        problem: {
            es: 'Cada reel de la tienda exigía revisar a mano todo lo grabado en el teléfono para encontrar las tomas usables. Eran unas dos horas por pieza.',
            en: 'Every reel for the store meant manually reviewing all the phone footage to find usable takes. About two hours per piece.',
        },
        built: {
            es: 'Una app de escritorio que transcribe con faster-whisper, describe y puntúa cada toma con modelos de visión que corren en la misma máquina, escribe el guion y entrega el proyecto armado en CapCut a 1080×1920.',
            en: 'A desktop app that transcribes with faster-whisper, describes and scores each take with vision models running on the same machine, writes the script and delivers the assembled 1080×1920 CapCut project.',
        },
        result: {
            es: 'El montaje baja a unos 15 minutos y casi todo corre sin supervisión. El material nunca sale de la computadora.',
            en: 'Editing drops to about 15 minutes, mostly unattended. Footage never leaves the computer.',
        },
        facts: [
            { es: 'Fotogramas estáticos descartados antes de llamar al modelo', en: 'Static frames skipped before any model call' },
            { es: 'Análisis reanudable: un corte cuesta un archivo, no la corrida', en: 'Resumable analysis: a crash costs one file, not the run' },
            { es: 'Guion por reglas como respaldo si el modelo falla', en: 'Rule-based script fallback if the model fails' },
        ],
        stack: ['Python', 'faster-whisper', 'Ollama', 'pyCapCut', 'ffmpeg', 'PyInstaller'],
        links: [
            { label: { es: 'Ver el código', en: 'View the code' }, href: 'https://github.com/Dan178A/dropaudio-reel-studio', icon: 'fa-brands fa-github' },
        ],
        media: {
            src: { es: '/cases/reel-studio.es.mp4', en: '/cases/reel-studio.en.mp4' }, poster: { es: '/cases/reel-studio.es.jpg', en: '/cases/reel-studio.en.jpg' },
            alt: { es: 'Animación del flujo de Reel Studio: tomas puntuadas, guion y línea de tiempo de CapCut.', en: 'Reel Studio pipeline animation: scored takes, script and CapCut timeline.' },
        },
    },
    {
        id: 'monitoring',
        /* Genérico a propósito: trabajo para un cliente bajo confidencialidad. No nombrar
           cliente, sector, equipo inspeccionado ni cifras del código, y no mostrar capturas
           ni dibujos del sistema, sin autorización escrita del cliente. */
        cat: 'cv',
        kind: { es: 'Sistema industrial para un cliente', en: 'Industrial system for a client' },
        title: { es: 'Monitoreo industrial con control de cámaras en red', en: 'Industrial monitoring with networked camera control' },
        outcome: { to: { es: '5 años', en: '5 years' }, label: { es: 'operando en planta, sin soporte técnico en sitio', en: 'running on the plant floor, with no on-site tech support' } },
        problem: {
            es: 'Operar cámaras industriales repartidas entre dos equipos en red, en un lugar donde nadie puede ir a reiniciar nada si algo se cuelga.',
            en: 'Operating industrial cameras split across two networked machines, somewhere nobody can go restart anything if it hangs.',
        },
        built: {
            es: 'Una app de escritorio en Python donde el mismo ejecutable asume su rol en cada equipo sin configuración manual, transfiere las imágenes por bloques y pone un timeout explícito en cada frontera de red.',
            en: 'A Python desktop app where the same executable takes its role on each machine with no manual setup, transfers images in chunks and puts an explicit timeout on every network boundary.',
        },
        result: {
            es: 'Una cámara apagada ya no congela la interfaz. El sistema lleva cinco años en uso real y se distribuye con instalador versionado.',
            en: 'A powered-off camera no longer freezes the interface. The system has been in real use for five years and ships with a versioned installer.',
        },
        facts: [
            { es: 'Rol automático al arrancar: servidor o cliente', en: 'Automatic role at startup: server or client' },
            { es: 'Transferencia de imágenes por bloques con reensamblado', en: 'Chunked image transfer with reassembly' },
            { es: 'Pruebas automatizadas con pytest', en: 'Automated tests with pytest' },
        ],
        stack: ['Python', 'PyQt5', 'OpenCV', 'TCP', 'pytest'],
        links: [],
        media: {
            src: { es: '/cases/monitoring.es.mp4', en: '/cases/monitoring.en.mp4' }, poster: { es: '/cases/monitoring.es.jpg', en: '/cases/monitoring.en.jpg' },
            alt: { es: 'Animación: dos equipos en red controlan cámaras y cada enlace tiene su propio timeout.', en: 'Animation: two networked machines control cameras and every link has its own timeout.' },
        },
    },
    {
        id: 'stabilization',
        project: 'FlowNet_Video_Stabilization',
        cat: 'cv',
        kind: { es: 'Investigación aplicada', en: 'Applied research' },
        title: { es: 'Estabilización de video', en: 'Video stabilization' },
        outcome: { to: '2 enfoques', label: { es: 'clásico y con deep learning, comparables lado a lado', en: 'classic and deep learning, comparable side by side' } },
        problem: {
            es: 'El video grabado con el teléfono tiembla. Mi tesis de grado proponía pesos adaptativos predichos por IA, pero el código original solo corría por consola y no los implementaba.',
            en: 'Handheld phone video shakes. My undergraduate thesis proposed AI-predicted adaptive weights, but the original code only ran from the command line and did not implement them.',
        },
        built: {
            es: 'Dos estabilizadores: uno por malla, flujo óptico e interpolación, con una red que predice sus pesos y una interfaz web de antes y después; y otro que estima el movimiento de cámara con un PWC-Net destilado y suaviza la trayectoria con optimización cuadrática.',
            en: 'Two stabilizers: one using a mesh, optical flow and interpolation, with a network predicting its weights and a before/after web UI; and one that estimates camera motion with a distilled PWC-Net and smooths the path with quadratic programming.',
        },
        result: {
            es: 'Los resultados se miden con MSE, RMSE, PSNR y SSIM, y la versión con GPU estabiliza videos nuevos sin reentrenar.',
            en: 'Results are measured with MSE, RMSE, PSNR and SSIM, and the GPU version stabilizes new videos without retraining.',
        },
        facts: [
            { es: 'Progreso en vivo por SSE desde FastAPI', en: 'Live progress over SSE from FastAPI' },
            { es: 'Corrección geométrica y fotométrica combinadas', en: 'Geometric and photometric correction combined' },
            { es: 'Tesis de grado, Universidad del Zulia', en: 'Undergraduate thesis, University of Zulia' },
        ],
        stack: ['Python', 'PyTorch', 'OpenCV', 'scikit-learn', 'FastAPI', 'CUDA'],
        links: [
            { label: { es: 'Código con deep learning', en: 'Deep learning code' }, href: 'https://github.com/Dan178A/FlowNet_Video_Stabilization', icon: 'fa-brands fa-github' },
            { label: { es: 'Código de la tesis', en: 'Thesis code' }, href: 'https://github.com/Dan178A/System_Stabilitation_Interpolation', icon: 'fa-brands fa-github' },
        ],
        media: {
            src: { es: '/cases/stabilization.es.mp4', en: '/cases/stabilization.en.mp4' }, poster: { es: '/cases/stabilization.es.jpg', en: '/cases/stabilization.en.jpg' },
            alt: { es: 'Animación: la trayectoria temblorosa de la cámara se convierte en una curva suave.', en: 'Animation: the shaky camera path turns into a smooth curve.' },
        },
    },
]
