<script setup lang="ts">
/* Landing premium: aurora bg, tilt 3D, spotlight, marquee, count-up, i18n */
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useI18n, type Lang } from '../composables/useI18n'
import { projectDetails, type ProjectDetail } from '../composables/projectDetails'

const { lang, t, toggleLang } = useI18n()

interface GitHubRepo {
    id: number
    name: string
    description: string | null
    language: string | null
    html_url: string
}

type Category = 'cv' | 'ai' | 'web' | 'api'

interface Project {
    name: string
    category: Category
    icon: string
    tech: string
    url?: string
    featured?: boolean
    desc: { es: string; en: string }
}

const githubUsername = 'Dan178A'
const linkedInUrl = 'https://www.linkedin.com/in/daniel-alejandro-silva-rojas/'
const emailAddress = 'dsrglrm@gmail.com'
const whatsappUrl = 'https://wa.me/584142317561?text=Hola%20Daniel'
const avatarSrc = '/1699966173589.jpg'
/* CV: 4 variantes (idioma × perfil). El visor combina el idioma activo con el perfil elegido. */
type CvProfile = 'fullstack' | 'backend'
const cvProfile = ref<CvProfile>('fullstack')
const cvFiles: Record<Lang, Record<CvProfile, string>> = {
    en: { fullstack: '/CV_Daniel_Silva_EN_FullStack.pdf', backend: '/CV_Daniel_Silva_EN_Backend-AI.pdf' },
    es: { fullstack: '/CV_Daniel_Silva_ES_FullStack.pdf', backend: '/CV_Daniel_Silva_ES_Backend-IA.pdf' },
}
const cvUrl = computed(() => cvFiles[lang.value][cvProfile.value])
const cvProfiles = computed(() => ([
    { id: 'fullstack' as const, label: t.value.hero.cvFullStack },
    { id: 'backend' as const, label: t.value.hero.cvBackend },
]))

/* Caso destacado: DropAudio CCS */
const dropUrl = 'https://dropaudioccs.com'
const dropDemoUrl = 'https://dropaudioccs.com/asesorate'
const dropBoardUrl = '/dropaudioccs-portafolio.html'
const flagStack = ['Nuxt 3', 'Vue 3 · SSR', 'Supabase', 'PostgreSQL · RLS', 'Vercel', 'Web Push', 'Tailwind']
const flagMetricDefs = [{ n: 94, suffix: '+' }, { n: 19, suffix: '' }, { n: 6, suffix: '' }]
const flagIcons = ['fa-solid fa-wand-magic-sparkles', 'fa-solid fa-code-compare', 'fa-solid fa-wallet', 'fa-solid fa-gauge-high']
const flagMetrics = computed(() => flagMetricDefs.map((d, i) => ({ ...d, label: t.value.flagship.metrics[i] })))
const flagFeatures = computed(() => t.value.flagship.features.map((f, i) => ({ icon: flagIcons[i], ...f })))
const flagValues = ref(flagMetricDefs.map(m => m.n))
let flagAnimated = false
const animateFlagStats = () => {
    if (flagAnimated) return
    flagAnimated = true
    if (reducedMotion) { flagValues.value = flagMetricDefs.map(m => m.n); return }
    flagValues.value = flagMetricDefs.map(() => 0)
    const dur = 1200
    const start = performance.now()
    const tick = (now: number) => {
        const p = Math.min((now - start) / dur, 1)
        const e = 1 - Math.pow(1 - p, 3)
        flagValues.value = flagMetricDefs.map(m => Math.round(m.n * e))
        if (p < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
}

/* Proyectos curados: metadata local bilingüe, enriquecida con la API de GitHub */
const projects: Project[] = [
    {
        name: 'DropAudio CCS', category: 'web', icon: 'fa-solid fa-headphones', tech: 'Nuxt 3 · Supabase',
        url: 'https://dropaudioccs.com', featured: true,
        desc: {
            es: 'E-commerce completo en producción con panel de administración: catálogo, checkout multimoneda, recomendador de audio y entregas en tiempo real.',
            en: 'Complete e-commerce in production with an admin panel: catalog, multi-currency checkout, audio recommender and real-time deliveries.',
        },
    },
    {
        name: 'System_Stabilitation_Interpolation', category: 'cv', icon: 'fa-solid fa-video', tech: 'Python · OpenCV',
        desc: {
            es: 'Sistema de estabilización de video para dispositivos móviles usando mallas de movimiento e interpolación — tesis de grado.',
            en: 'Video stabilization system for mobile devices using motion meshes and interpolation — undergraduate thesis.',
        },
    },
    {
        name: 'FlowNet_Video_Stabilization', category: 'cv', icon: 'fa-solid fa-wave-square', tech: 'Python · PyTorch',
        desc: {
            es: 'Estabilización de video con deep learning: estimación global de movimiento destilada a partir de optical flow.',
            en: 'Deep learning video stabilization: global motion estimation distilled from optical flow.',
        },
    },
    {
        name: 'Camara_OCR_Python', category: 'cv', icon: 'fa-solid fa-camera', tech: 'Python · OCR',
        desc: {
            es: 'Monitoreo industrial por cámara con OCR para verificar la limpieza de coke en refinerías.',
            en: 'Industrial camera monitoring with OCR to verify coke cleanliness in refineries.',
        },
    },
    {
        name: 'RealtimeVoiceAssistant', category: 'ai', icon: 'fa-solid fa-microphone-lines', tech: 'Rust · Python · Gemini',
        desc: {
            es: 'Asistente de voz conversacional en tiempo real: transcripción, NLP y síntesis de voz con Gemini Live.',
            en: 'Real-time conversational voice assistant: transcription, NLP and speech synthesis with Gemini Live.',
        },
    },
    {
        name: 'Traffic_Simulation_Model', category: 'ai', icon: 'fa-solid fa-traffic-light', tech: 'Python',
        desc: {
            es: 'Modelo macroscópico de simulación de tráfico vehicular: interacción entre vehículos y semáforos en intersecciones.',
            en: 'Macroscopic traffic simulation model: interaction between vehicles and traffic signals at intersections.',
        },
    },
    {
        name: 'cyrpto_chart', category: 'ai', icon: 'fa-solid fa-chart-line', tech: 'JS · Python',
        desc: {
            es: 'Gráficos de criptomonedas con la API de CoinGecko, Highcharts y regresión lineal dinámica.',
            en: 'Crypto charting with the CoinGecko API, Highcharts and dynamic linear regression.',
        },
    },
    {
        name: 'SorteosEDJ', category: 'web', icon: 'fa-solid fa-ticket', tech: 'Nuxt 3 · TypeScript',
        desc: {
            es: 'Plataforma de sorteos en producción construida con Nuxt 3: gestión de rifas, participantes y resultados.',
            en: 'Production raffle platform built with Nuxt 3: raffle, participant and results management.',
        },
    },
    {
        name: 'Sistema-Rifa-JS', category: 'web', icon: 'fa-solid fa-gift', tech: 'JavaScript',
        desc: {
            es: 'Sistema de rifas con exportación a Excel, persistencia en LocalStorage y visualización con gráficos.',
            en: 'Raffle system with Excel export, LocalStorage persistence and chart visualization.',
        },
    },
    {
        name: 'cashea_clone', category: 'web', icon: 'fa-solid fa-mobile-screen-button', tech: 'React Native · Expo',
        desc: {
            es: 'Clon móvil de la app Cashea construido con React Native y Expo.',
            en: 'Mobile clone of the Cashea app built with React Native and Expo.',
        },
    },
    {
        name: 'extract_rif', category: 'api', icon: 'fa-solid fa-file-invoice', tech: 'FastAPI · PaddleOCR',
        desc: {
            es: 'Microservicio HTTP que extrae datos estructurados del RIF (SENIAT) desde PDF o imagen con OCR de doble motor.',
            en: 'HTTP microservice extracting structured RIF (SENIAT) data from PDFs or images with a dual-engine OCR pipeline.',
        },
    },
    {
        name: 'bolsa-valores-caracas-api', category: 'api', icon: 'fa-solid fa-building-columns', tech: 'FastAPI · Selenium',
        desc: {
            es: 'API pública en FastAPI con datos de las acciones listadas en la Bolsa de Valores de Caracas.',
            en: 'Public FastAPI serving data on stocks listed on the Caracas Stock Exchange.',
        },
    },
    {
        name: 'Socket-Communication-System', category: 'api', icon: 'fa-solid fa-network-wired', tech: 'Python · Sockets',
        desc: {
            es: 'Sistema de comunicación cliente-servidor sobre sockets TCP con protocolo propio.',
            en: 'Client-server communication system over TCP sockets with a custom protocol.',
        },
    },
]

const categories: { id: Category | 'all'; color: string }[] = [
    { id: 'all', color: 'var(--color-text)' },
    { id: 'cv', color: 'var(--cat-cv)' },
    { id: 'ai', color: 'var(--cat-ai)' },
    { id: 'web', color: 'var(--cat-web)' },
    { id: 'api', color: 'var(--cat-api)' },
]

const categoryLabel = (id: Category | 'all'): string => {
    if (id === 'all') return t.value.projects.all
    return t.value.specialties[id].title
}

const activeFilter = ref<Category | 'all'>('all')
const filteredProjects = computed(() =>
    activeFilter.value === 'all' ? projects : projects.filter(p => p.category === activeFilter.value),
)

/* Enriquecimiento opcional con la API de GitHub */
const apiRepos = ref<Map<string, GitHubRepo>>(new Map())

const repoUrl = (p: Project): string =>
    p.url ?? apiRepos.value.get(p.name)?.html_url ?? `https://github.com/${githubUsername}/${p.name}`
const repoTag = (p: Project): string => apiRepos.value.get(p.name)?.language ?? p.tech

/* Repos confirmados públicos manualmente (verificado contra la API de GitHub):
   evita que la grilla los muestre como "Privado" en SSR o antes de que resuelva
   el fetch de enriquecimiento, que solo corre en el cliente. */
const knownPublicRepos = new Set([
    'System_Stabilitation_Interpolation',
    'FlowNet_Video_Stabilization',
    'RealtimeVoiceAssistant',
    'Traffic_Simulation_Model',
    'SorteosEDJ',
    'extract_rif',
    'Socket-Communication-System',
])

/* Visibilidad del repo: override manual, público conocido, o público si la API de GitHub lo devuelve */
type Vis = 'public' | 'private' | 'live'
const visOf = (p: Project): Vis => {
    const ov = projectDetails[p.name]?.visibility
    if (ov) return ov
    return (knownPublicRepos.has(p.name) || apiRepos.value.has(p.name)) ? 'public' : 'private'
}
const visMeta: Record<Vis, { icon: string; label: { es: string; en: string } }> = {
    public: { icon: 'fa-brands fa-github', label: { es: 'Público', en: 'Public' } },
    private: { icon: 'fa-solid fa-lock', label: { es: 'Privado', en: 'Private' } },
    live: { icon: 'fa-solid fa-circle-nodes', label: { es: 'En vivo', en: 'Live' } },
}

/* Detalle del proyecto para el modal: enriquecido si existe, o sintetizado desde la card */
const activeProject = ref<Project | null>(null)
const activeDetail = computed<ProjectDetail | null>(() => {
    const p = activeProject.value
    if (!p) return null
    const rich = projectDetails[p.name]
    if (rich) return rich
    return {
        whatThis: { es: p.desc.es, en: p.desc.en },
        stack: { language: p.tech },
        oneLiner: { es: p.desc.es, en: p.desc.en },
    }
})
const hasRichDetail = (p: Project): boolean => projectDetails[p.name] !== undefined
const openDetail = (p: Project) => {
    activeProject.value = p
    document.body.style.overflow = 'hidden'
}
const closeDetail = () => {
    activeProject.value = null
    document.body.style.overflow = ''
}

const specialtyList = computed(() => ([
    { id: 'cv' as const, icon: 'fa-solid fa-video', count: '10+', ...t.value.specialties.cv },
    { id: 'ai' as const, icon: 'fa-solid fa-brain', count: '6+', ...t.value.specialties.ai },
    { id: 'web' as const, icon: 'fa-solid fa-layer-group', count: '12+', ...t.value.specialties.web },
    { id: 'api' as const, icon: 'fa-solid fa-server', count: '8+', ...t.value.specialties.api },
]))

/* Stats con count-up */
const statDefs = computed(() => ([
    { n: 5, suffix: '+', label: t.value.stats.years },
    { n: 60, suffix: '+', label: t.value.stats.repos },
    { n: 4, suffix: '', label: t.value.stats.areas },
    { n: 1, suffix: '', label: t.value.stats.thesis },
]))
const statValues = ref(statDefs.value.map(s => s.n))
let statsAnimated = false

const animateStats = () => {
    if (statsAnimated) return
    statsAnimated = true
    if (reducedMotion) {
        statValues.value = statDefs.value.map(s => s.n)
        return
    }
    statValues.value = statDefs.value.map(() => 0)
    const duration = 1200
    const start = performance.now()
    const tick = (now: number) => {
        const p = Math.min((now - start) / duration, 1)
        const eased = 1 - Math.pow(1 - p, 3)
        statValues.value = statDefs.value.map(s => Math.round(s.n * eased))
        if (p < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
}

/* Palabra rotativa del hero */
const wordIndex = ref(0)
let wordTimer: ReturnType<typeof setInterval> | undefined
const currentWord = computed(() => t.value.hero.words[wordIndex.value % t.value.hero.words.length])

/* Marquee de stack */
const marqueeTop = [
    { icon: 'fa-brands fa-python', name: 'Python' },
    { icon: 'fa-solid fa-code', name: 'TypeScript' },
    { icon: 'fa-brands fa-rust', name: 'Rust' },
    { icon: 'fa-brands fa-vuejs', name: 'Vue 3' },
    { icon: 'fa-solid fa-mountain', name: 'Nuxt 3' },
    { icon: 'fa-brands fa-react', name: 'React Native' },
    { icon: 'fa-solid fa-bolt', name: 'Vite' },
    { icon: 'fa-solid fa-fire', name: 'PyTorch' },
    { icon: 'fa-solid fa-eye', name: 'OpenCV' },
]
const marqueeBottom = [
    { icon: 'fa-solid fa-gauge-high', name: 'FastAPI' },
    { icon: 'fa-brands fa-node-js', name: 'Node.js' },
    { icon: 'fa-solid fa-network-wired', name: 'gRPC' },
    { icon: 'fa-solid fa-database', name: 'Redis' },
    { icon: 'fa-solid fa-robot', name: 'Gemini API' },
    { icon: 'fa-solid fa-text-width', name: 'PaddleOCR' },
    { icon: 'fa-brands fa-aws', name: 'AWS Amplify' },
    { icon: 'fa-solid fa-caret-up', name: 'Vercel' },
    { icon: 'fa-brands fa-docker', name: 'Docker' },
]

/* Interacciones premium: reveal, spotlight y tilt */
/* Reloj en vivo de la barra de menú */
const clock = ref('--:--:--')
let clockTimer: ReturnType<typeof setInterval> | undefined
const tickClock = () => {
    clock.value = new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
}

/* Nombre de archivo retro por proyecto */
const fileExt: Record<Category, string> = { cv: '.py', ai: '.exe', web: '.vue', api: '.sh' }
const fileName = (p: Project): string =>
    p.name.toLowerCase().replace(/[^a-z0-9]+/g, '_') + fileExt[p.category]

/* Visor de CV en modal */
const showCv = ref(false)

const openCv = () => {
    showCv.value = true
    document.body.style.overflow = 'hidden'
}

const closeCv = () => {
    showCv.value = false
    document.body.style.overflow = ''
}

const onKeydown = (e: KeyboardEvent) => {
    if (e.key !== 'Escape') return
    if (showCv.value) closeCv()
    if (activeProject.value) closeDetail()
}

let reducedMotion = false
let observer: IntersectionObserver | undefined

const onCardMove = (e: MouseEvent) => {
    if (reducedMotion) return
    const card = e.currentTarget as HTMLElement
    const rect = card.getBoundingClientRect()
    card.style.setProperty('--mx', `${e.clientX - rect.left}px`)
    card.style.setProperty('--my', `${e.clientY - rect.top}px`)
}

const onTiltMove = (e: MouseEvent) => {
    if (reducedMotion) return
    const card = e.currentTarget as HTMLElement
    const rect = card.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width - 0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5
    card.style.setProperty('--ry', `${px * 8}deg`)
    card.style.setProperty('--rx', `${-py * 8}deg`)
}

const onTiltLeave = (e: MouseEvent) => {
    const card = e.currentTarget as HTMLElement
    card.style.setProperty('--rx', '0deg')
    card.style.setProperty('--ry', '0deg')
}

onMounted(async () => {
    reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.addEventListener('keydown', onKeydown)
    tickClock()
    clockTimer = setInterval(tickClock, 1000)

    /* Reveal on scroll */
    observer = new IntersectionObserver(
        entries => {
            for (const entry of entries) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible')
                    if ((entry.target as HTMLElement).dataset.stats !== undefined) animateStats()
                    if ((entry.target as HTMLElement).dataset.flagstats !== undefined) animateFlagStats()
                    observer?.unobserve(entry.target)
                }
            }
        },
        { threshold: 0.15 },
    )
    document.querySelectorAll('.reveal').forEach(el => observer?.observe(el))

    /* Rotación de palabras */
    if (!reducedMotion) {
        wordTimer = setInterval(() => { wordIndex.value++ }, 2600)
    }

    try {
        const res = await fetch(`https://api.github.com/users/${githubUsername}/repos?per_page=100`)
        if (res.ok) {
            const data = (await res.json()) as GitHubRepo[]
            apiRepos.value = new Map(data.map(r => [r.name, r]))
        }
    } catch { /* la metadata local + knownPublicRepos cubren el fallback */ }
})

onBeforeUnmount(() => {
    observer?.disconnect()
    if (wordTimer) clearInterval(wordTimer)
    window.removeEventListener('keydown', onKeydown)
    if (clockTimer) clearInterval(clockTimer)
    document.body.style.overflow = ''
})
</script>

<template>
  <div class="portfolio-page">
    <!-- FONDO PREMIUM -->
    <div class="bg-aurora" aria-hidden="true">
      <div class="bg-blob bg-blob--1"></div>
      <div class="bg-blob bg-blob--2"></div>
      <div class="bg-blob bg-blob--3"></div>
      <div class="bg-grid"></div>
    </div>

    <!-- NAV -->
    <nav class="nav" aria-label="Principal">
      <a href="#hero" class="nav__brand">daniel@dev<span class="nav__brand-dot">:~$</span></a>
      <div class="nav__links">
        <a href="#impact">{{ t.nav.impact }}</a>
        <a href="#experience">{{ t.nav.experience }}</a>
        <a href="#projects">{{ t.nav.projects }}</a>
        <a href="#education">{{ t.nav.education }}</a>
        <a href="#stack">{{ t.nav.stack }}</a>
        <a href="#contact">{{ t.nav.contact }}</a>
      </div>
      <div class="nav__right">
        <span class="nav__clock" aria-hidden="true">{{ clock }}</span>
        <button class="nav__lang" @click="toggleLang" :aria-label="lang === 'es' ? 'Switch to English' : 'Cambiar a español'">
          <i class="fa-solid fa-globe" aria-hidden="true"></i> {{ lang === 'es' ? 'EN' : 'ES' }}
        </button>
      </div>
    </nav>

    <!-- HERO -->
    <section id="hero" class="hero">
      <span class="hero__badge">
        <span class="badge-dot" aria-hidden="true"></span>
        {{ t.hero.available }}
      </span>

      <div class="hero__avatar-wrap">
        <div class="avatar-ring" aria-hidden="true"></div>
        <div class="avatar-glow" aria-hidden="true"></div>
        <img :src="avatarSrc" alt="Foto de perfil de Daniel Silva" class="hero__avatar" width="170" height="170" />
      </div>

      <h1 class="hero__name"><span class="text-gradient-animated">Daniel Silva</span></h1>

      <p class="hero__title">
        <span class="title-line" aria-hidden="true"></span>
        {{ t.hero.role }}
        <span class="title-line" aria-hidden="true"></span>
      </p>

      <p class="hero__rotator" aria-live="polite">
        <span class="hero__prompt" aria-hidden="true">&gt;</span>
        {{ t.hero.wordsPrefix }}
        <Transition name="word-flip" mode="out-in">
          <span :key="currentWord" class="hero__word">{{ currentWord }}</span>
        </Transition>
        <span class="term-cursor" aria-hidden="true"></span>
      </p>

      <p class="hero__tagline">{{ t.hero.tagline }}</p>

      <div class="hero__socials" aria-label="Redes sociales">
        <a :href="`https://github.com/${githubUsername}`" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
          <i class="fa-brands fa-github" aria-hidden="true"></i>
        </a>
        <a :href="linkedInUrl" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
          <i class="fa-brands fa-linkedin" aria-hidden="true"></i>
        </a>
      </div>

      <div class="hero__actions">
        <a href="#projects" class="btn btn--gradient">
          <i class="fa-solid fa-code" aria-hidden="true"></i> {{ t.hero.ctaProjects }}
        </a>
        <button class="btn btn--outline btn--cv" @click="openCv">
          <i class="fa-solid fa-file-lines" aria-hidden="true"></i> {{ t.hero.ctaCV }}
        </button>
        <a href="#contact" class="btn btn--outline">
          <i class="fa-regular fa-comments" aria-hidden="true"></i> {{ t.hero.ctaContact }}
        </a>
      </div>

      <ul class="stats reveal" data-stats aria-label="Estadísticas">
        <li v-for="(s, i) in statDefs" :key="s.label" class="stats__item" :style="{ '--reveal-delay': `${i * 60}ms` }">
          <span class="stats__value">{{ statValues[i] }}{{ s.suffix }}</span>
          <span class="stats__label">{{ s.label }}</span>
        </li>
      </ul>

      <a href="#specialties" class="hero__scroll" :aria-label="t.hero.scroll">
        <span class="scroll-mouse" aria-hidden="true"><span class="scroll-wheel"></span></span>
        {{ t.hero.scroll }}
      </a>
    </section>

    <!-- IMPACT / WHY HIRE ME -->
    <section id="impact" class="section" aria-labelledby="impact-title">
      <div class="section-header reveal">
        <span class="section-cmd" aria-hidden="true">$ git log --oneline --stat</span>
        <h2 id="impact-title">{{ t.impact.title }}</h2>
        <p class="section-subtitle">{{ t.impact.subtitle }}</p>
        <div class="header-decoration" aria-hidden="true"></div>
      </div>
      <div class="impact__grid">
        <article
          v-for="(it, i) in t.impact.items" :key="it.icon"
          class="impact-card reveal" :style="{ '--reveal-delay': `${i * 80}ms` }"
          @mousemove="onCardMove"
        >
          <span class="impact-card__ic" aria-hidden="true"><i :class="it.icon"></i></span>
          <span class="impact-card__metric">{{ it.metric }}</span>
          <h3 class="impact-card__label">{{ it.label }}</h3>
          <p class="impact-card__desc">{{ it.desc }}</p>
        </article>
      </div>
    </section>

    <!-- FLAGSHIP CASE STUDY -->
    <section id="flagship" class="section" aria-labelledby="flagship-title">
      <div class="section-header reveal">
        <span class="section-cmd" aria-hidden="true">$ ./deploy dropaudioccs --prod</span>
        <h2 id="flagship-title">{{ t.flagship.title }}</h2>
        <p class="section-subtitle">{{ t.flagship.tagline }}</p>
        <div class="header-decoration" aria-hidden="true"></div>
      </div>

      <article class="flagship reveal" data-cat="web" @mousemove="onCardMove">
        <div class="win-bar">
          <span class="win-bar__dots" aria-hidden="true"><i></i><i></i><i></i></span>
          <span class="win-bar__file">dropaudioccs.com</span>
          <span class="flagship__live"><span class="badge-dot" aria-hidden="true"></span> {{ t.flagship.badge }}</span>
        </div>

        <div class="flagship__body">
          <div class="flagship__intro">
            <span class="flagship__role"><i class="fa-solid fa-crown" aria-hidden="true"></i> {{ t.flagship.role }}</span>
            <p class="flagship__pitch">{{ t.flagship.pitch }}</p>
            <div class="flagship__actions">
              <a :href="dropUrl" target="_blank" rel="noopener noreferrer" class="btn btn--gradient">
                <i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i> {{ t.flagship.live }}
              </a>
              <a :href="dropBoardUrl" target="_blank" rel="noopener noreferrer" class="btn btn--outline">
                <i class="fa-solid fa-object-group" aria-hidden="true"></i> {{ t.flagship.caseStudy }}
              </a>
              <a :href="dropDemoUrl" target="_blank" rel="noopener noreferrer" class="btn btn--outline">
                <i class="fa-solid fa-wand-magic-sparkles" aria-hidden="true"></i> {{ t.flagship.demo }}
              </a>
            </div>
            <ul class="flagship__metrics reveal" data-flagstats aria-label="Métricas del proyecto">
              <li v-for="(m, i) in flagMetrics" :key="m.label">
                <span class="flagship__metric-val">{{ flagValues[i] }}{{ m.suffix }}</span>
                <span class="flagship__metric-label">{{ m.label }}</span>
              </li>
            </ul>
          </div>

          <div class="flagship__features">
            <div v-for="f in flagFeatures" :key="f.title" class="flagship__feature">
              <span class="flagship__feature-ic" aria-hidden="true"><i :class="f.icon"></i></span>
              <div class="flagship__feature-txt">
                <h3>{{ f.title }}</h3>
                <p>{{ f.desc }}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="flagship__stack" aria-label="Stack">
          <span v-for="s in flagStack" :key="s" class="flagship__tag">{{ s }}</span>
        </div>
      </article>
    </section>

    <!-- EXPERIENCE TIMELINE -->
    <section id="experience" class="section" aria-labelledby="experience-title">
      <div class="section-header reveal">
        <span class="section-cmd" aria-hidden="true">$ cat experience.log</span>
        <h2 id="experience-title">{{ t.experience.title }}</h2>
        <p class="section-subtitle">{{ t.experience.subtitle }}</p>
        <div class="header-decoration" aria-hidden="true"></div>
      </div>
      <ol class="timeline">
        <li
          v-for="(job, i) in t.experience.items" :key="job.company"
          class="tl-item reveal" :data-cat="job.accent" :style="{ '--reveal-delay': `${i * 90}ms` }"
        >
          <span class="tl-node" aria-hidden="true"></span>
          <div class="tl-card" @mousemove="onCardMove">
            <div class="tl-card__head">
              <div>
                <h3 class="tl-card__role">{{ job.role }}</h3>
                <p class="tl-card__company">{{ job.company }} · <span>{{ job.location }}</span></p>
              </div>
              <span class="tl-card__period">{{ job.period }}</span>
            </div>
            <ul class="tl-card__bullets">
              <li v-for="(b, bi) in job.bullets" :key="bi"><i class="fa-solid fa-angle-right" aria-hidden="true"></i> {{ b }}</li>
            </ul>
            <div class="tl-card__tags">
              <span v-for="tg in job.tags" :key="tg" class="tl-tag">{{ tg }}</span>
            </div>
          </div>
        </li>
      </ol>
    </section>

    <!-- SPECIALTIES -->
    <section id="specialties" class="section" aria-labelledby="specialties-title">
      <div class="section-header reveal">
        <span class="section-cmd" aria-hidden="true">$ cat {{ t.nav.specialties.toLowerCase() }}.md</span>
        <h2 id="specialties-title">{{ t.specialties.title }}</h2>
        <p class="section-subtitle">{{ t.specialties.subtitle }}</p>
        <div class="header-decoration" aria-hidden="true"></div>
      </div>

      <div class="specialties__grid">
        <article
          v-for="(sp, i) in specialtyList" :key="sp.id"
          class="specialty-card reveal" :data-cat="sp.id"
          :style="{ '--reveal-delay': `${i * 80}ms` }"
          @mousemove="onTiltMove" @mouseleave="onTiltLeave"
        >
          <div class="win-bar">
            <span class="win-bar__dots" aria-hidden="true"><i></i><i></i><i></i></span>
            <span class="win-bar__file">{{ sp.id }}.sys</span>
          </div>
          <div class="specialty-card__inner">
            <div class="specialty-card__top">
              <div class="specialty-card__icon" aria-hidden="true"><i :class="sp.icon"></i></div>
              <span class="specialty-card__count">{{ sp.count }}</span>
            </div>
            <h3>{{ sp.title }}</h3>
            <p>{{ sp.desc }}</p>
          </div>
        </article>
      </div>
    </section>

    <!-- PROJECTS -->
    <section id="projects" class="section" aria-labelledby="projects-title">
      <div class="section-header reveal">
        <span class="section-cmd" aria-hidden="true">$ ls {{ t.nav.projects.toLowerCase() }}/</span>
        <h2 id="projects-title">{{ t.projects.title }}</h2>
        <p class="section-subtitle">{{ t.projects.subtitle }}</p>
        <div class="header-decoration" aria-hidden="true"></div>
      </div>

      <div class="filters reveal" role="group" aria-label="Filtrar proyectos">
        <button
          v-for="c in categories" :key="c.id"
          class="filters__chip" :class="{ 'filters__chip--active': activeFilter === c.id }"
          :style="{ '--chip-accent': c.color }"
          @click="activeFilter = c.id"
        >
          <span class="tag-dot" :style="{ background: c.color }" aria-hidden="true"></span>
          {{ categoryLabel(c.id) }}
        </button>
      </div>

      <TransitionGroup tag="div" name="card-shuffle" class="projects__grid">
        <article
          v-for="p in filteredProjects" :key="p.name"
          class="project-card project-card--clickable" :data-cat="p.category"
          role="button" tabindex="0"
          :aria-label="`${t.projects.detail}: ${p.name.replace(/[_-]/g, ' ')}`"
          @mousemove="onCardMove"
          @click="openDetail(p)"
          @keydown.enter.prevent="openDetail(p)"
          @keydown.space.prevent="openDetail(p)"
        >
          <div class="win-bar">
            <span class="win-bar__dots" aria-hidden="true"><i></i><i></i><i></i></span>
            <span class="win-bar__file">{{ fileName(p) }}</span>
            <span class="project-card__vis" :data-vis="visOf(p)">
              <i :class="visMeta[visOf(p)].icon" aria-hidden="true"></i>
              {{ visMeta[visOf(p)].label[lang] }}
            </span>
          </div>
          <div class="project-card__content">
            <div class="project-card__header">
              <div class="project-card__badge" :data-cat="p.category" aria-hidden="true">
                <i :class="p.icon"></i>
              </div>
              <h3>{{ p.name.replace(/[_-]/g, ' ') }}</h3>
              <a :href="repoUrl(p)" target="_blank" rel="noopener noreferrer" class="project-card__icon" :aria-label="`${t.projects.viewRepo}: ${p.name}`" @click.stop>
                <i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i>
              </a>
            </div>
            <p class="project-card__description">{{ p.desc[lang] || t.projects.fallback }}</p>
            <div class="project-card__footer">
              <span class="project-card__tag">
                <span class="tag-dot" :style="{ background: `var(--cat-${p.category})` }" aria-hidden="true"></span>
                {{ repoTag(p) }}
              </span>
              <span class="project-card__more">{{ t.projects.detail }} <i class="fa-solid fa-arrow-right" aria-hidden="true"></i></span>
            </div>
          </div>
        </article>
      </TransitionGroup>
    </section>

    <!-- EDUCATION & CERTIFICATIONS -->
    <section id="education" class="section" aria-labelledby="education-title">
      <div class="section-header reveal">
        <span class="section-cmd" aria-hidden="true">$ cat education.md</span>
        <h2 id="education-title">{{ t.education.title }}</h2>
        <p class="section-subtitle">{{ t.education.subtitle }}</p>
        <div class="header-decoration" aria-hidden="true"></div>
      </div>
      <div class="edu__grid">
        <article class="edu-card reveal" @mousemove="onCardMove">
          <div class="win-bar">
            <span class="win-bar__dots" aria-hidden="true"><i></i><i></i><i></i></span>
            <span class="win-bar__file">education.db</span>
          </div>
          <div class="edu-card__body">
            <h3 class="edu-card__title"><i class="fa-solid fa-graduation-cap" aria-hidden="true"></i> {{ t.education.degreesTitle }}</h3>
            <ul class="edu-list">
              <li v-for="d in t.education.degrees" :key="d.title">
                <span class="edu-list__main">{{ d.title }}</span>
                <span class="edu-list__sub">{{ d.school }}</span>
                <span class="edu-list__meta">{{ d.period }}</span>
              </li>
            </ul>
            <h3 class="edu-card__title edu-card__title--lang"><i class="fa-solid fa-language" aria-hidden="true"></i> {{ t.education.langTitle }}</h3>
            <p class="edu-lang">{{ t.education.languages }}</p>
          </div>
        </article>

        <article class="edu-card reveal" :style="{ '--reveal-delay': '90ms' }" @mousemove="onCardMove">
          <div class="win-bar">
            <span class="win-bar__dots" aria-hidden="true"><i></i><i></i><i></i></span>
            <span class="win-bar__file">certifications.db</span>
          </div>
          <div class="edu-card__body">
            <h3 class="edu-card__title"><i class="fa-solid fa-certificate" aria-hidden="true"></i> {{ t.education.certsTitle }}</h3>
            <ul class="cert-list">
              <li v-for="c in t.education.certs" :key="c">
                <i class="fa-solid fa-award" aria-hidden="true"></i> {{ c }}
              </li>
            </ul>
          </div>
        </article>
      </div>
    </section>

    <!-- STACK (marquee) -->
    <section id="stack" class="section" aria-labelledby="stack-title">
      <div class="section-header reveal">
        <span class="section-cmd" aria-hidden="true">$ which --all</span>
        <h2 id="stack-title">{{ t.stack.title }}</h2>
        <p class="section-subtitle">{{ t.stack.subtitle }}</p>
        <div class="header-decoration" aria-hidden="true"></div>
      </div>

      <div class="marquee reveal" aria-label="Tecnologías">
        <div class="marquee__track">
          <span v-for="(item, idx) in [...marqueeTop, ...marqueeTop]" :key="idx" class="marquee__chip">
            <i :class="item.icon" aria-hidden="true"></i> {{ item.name }}
          </span>
        </div>
      </div>
      <div class="marquee marquee--reverse reveal" aria-hidden="true">
        <div class="marquee__track">
          <span v-for="(item, idx) in [...marqueeBottom, ...marqueeBottom]" :key="idx" class="marquee__chip">
            <i :class="item.icon" aria-hidden="true"></i> {{ item.name }}
          </span>
        </div>
      </div>
    </section>

    <!-- CONTACT -->
    <section id="contact" class="section contact" aria-labelledby="contact-title">
      <div class="contact__card reveal">
        <div class="win-bar contact__winbar">
          <span class="win-bar__dots" aria-hidden="true"><i></i><i></i><i></i></span>
          <span class="win-bar__file">{{ t.nav.contact.toLowerCase() }}.md</span>
        </div>
        <div class="contact__glow" aria-hidden="true"></div>
        <h2 id="contact-title">{{ t.contact.title }}</h2>
        <p>{{ t.contact.subtitle }}</p>
        <div class="contact__actions">
          <a :href="whatsappUrl" class="btn btn--gradient" target="_blank" rel="noopener noreferrer">
            <i class="fa-brands fa-whatsapp" aria-hidden="true"></i> {{ t.contact.whatsapp }}
          </a>
          <a :href="linkedInUrl" class="btn btn--outline" target="_blank" rel="noopener noreferrer">
            <i class="fa-brands fa-linkedin" aria-hidden="true"></i> LinkedIn
          </a>
          <a :href="`mailto:${emailAddress}`" class="btn btn--outline">
            <i class="fa-regular fa-envelope" aria-hidden="true"></i> {{ t.contact.email }}
          </a>
        </div>
        <button class="contact__cv" @click="openCv">
          <i class="fa-solid fa-file-lines" aria-hidden="true"></i> {{ t.hero.ctaCV }} · PDF
        </button>
      </div>
    </section>

    <footer class="footer">
      <p>© {{ new Date().getFullYear() }} · {{ t.footer }}</p>
    </footer>

    <!-- VISOR DE CV -->
    <Teleport to="body">
      <Transition name="cv-modal">
        <div v-if="showCv" class="cv-overlay" @click.self="closeCv" role="dialog" aria-modal="true" :aria-label="t.hero.cvTitle">
          <div class="cv-panel">
            <header class="cv-panel__bar">
              <h3><i class="fa-solid fa-file-lines" aria-hidden="true"></i> {{ t.hero.cvTitle }}</h3>
              <div class="cv-panel__actions">
                <a :href="cvUrl" download class="cv-panel__btn cv-panel__btn--accent">
                  <i class="fa-solid fa-file-arrow-down" aria-hidden="true"></i>
                  <span class="cv-panel__btn-label">{{ t.hero.cvDownload }}</span>
                </a>
                <button class="cv-panel__btn" @click="closeCv" :aria-label="t.hero.cvClose">
                  <i class="fa-solid fa-xmark" aria-hidden="true"></i>
                </button>
              </div>
            </header>
            <div class="cv-panel__profiles" role="group" :aria-label="t.hero.cvProfile">
              <span class="cv-panel__profiles-label" aria-hidden="true">{{ t.hero.cvProfile }}:</span>
              <button
                v-for="p in cvProfiles" :key="p.id"
                class="cv-seg" :class="{ 'cv-seg--active': cvProfile === p.id }"
                :aria-pressed="cvProfile === p.id"
                @click="cvProfile = p.id"
              >{{ p.label }}</button>
              <span class="cv-panel__lang-hint" aria-hidden="true">{{ lang === 'es' ? 'ES' : 'EN' }}</span>
            </div>
            <iframe :src="cvUrl" class="cv-panel__frame" :title="t.hero.cvTitle"></iframe>
            <p class="cv-panel__fallback">
              {{ t.hero.cvFallback }}
              <a :href="cvUrl" download>{{ t.hero.cvDownload }}</a>
            </p>
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- MODAL DE DETALLE DE PROYECTO -->
    <Teleport to="body">
      <Transition name="cv-modal">
        <div
          v-if="activeProject && activeDetail"
          class="detail-overlay" @click.self="closeDetail"
          role="dialog" aria-modal="true" :aria-label="activeProject.name"
        >
          <div class="detail-panel">
            <header class="detail-panel__bar">
              <div class="detail-panel__title">
                <span class="detail-panel__ic" :data-cat="activeProject.category" aria-hidden="true"><i :class="activeProject.icon"></i></span>
                <div>
                  <h3>{{ activeProject.name.replace(/[_-]/g, ' ') }}</h3>
                  <span class="detail-panel__vis" :data-vis="visOf(activeProject)">
                    <i :class="visMeta[visOf(activeProject)].icon" aria-hidden="true"></i>
                    {{ visMeta[visOf(activeProject)].label[lang] }}
                  </span>
                </div>
              </div>
              <div class="detail-panel__actions">
                <a :href="repoUrl(activeProject)" target="_blank" rel="noopener noreferrer" class="detail-panel__btn">
                  <i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i>
                  <span class="detail-panel__btn-label">{{ visOf(activeProject) === 'live' ? 'Live' : t.projects.viewRepo }}</span>
                </a>
                <button class="detail-panel__btn" @click="closeDetail" :aria-label="t.detail.close">
                  <i class="fa-solid fa-xmark" aria-hidden="true"></i>
                </button>
              </div>
            </header>

            <div class="detail-panel__body">
              <p v-if="!hasRichDetail(activeProject)" class="detail-note">
                <i class="fa-solid fa-circle-info" aria-hidden="true"></i> {{ t.detail.pending }}
              </p>

              <section class="detail-block">
                <h4>{{ t.detail.whatThis }}</h4>
                <p>{{ activeDetail.whatThis[lang] }}</p>
              </section>

              <section v-if="activeDetail.stack" class="detail-block">
                <h4>{{ t.detail.stack }}</h4>
                <ul class="detail-stack">
                  <li v-if="activeDetail.stack.language"><span>{{ t.detail.language }}</span> {{ activeDetail.stack.language }}</li>
                  <li v-if="activeDetail.stack.runtime"><span>{{ t.detail.runtime }}</span> {{ activeDetail.stack.runtime }}</li>
                  <li v-if="activeDetail.stack.libs && activeDetail.stack.libs.length"><span>{{ t.detail.libs }}</span> {{ activeDetail.stack.libs.join(' · ') }}</li>
                </ul>
              </section>

              <section v-if="activeDetail.tree" class="detail-block">
                <h4>{{ t.detail.structure }}</h4>
                <pre class="detail-code">{{ activeDetail.tree }}</pre>
              </section>

              <section v-if="activeDetail.howItFits" class="detail-block">
                <h4>{{ t.detail.howItFits }}</h4>
                <p>{{ activeDetail.howItFits[lang] }}</p>
              </section>

              <section v-if="activeDetail.practice" class="detail-block">
                <h4>{{ t.detail.practice }}</h4>
                <p>{{ activeDetail.practice[lang] }}</p>
              </section>

              <section v-if="activeDetail.components && activeDetail.components.length" class="detail-block">
                <h4>{{ t.detail.components }}</h4>
                <ul class="detail-list">
                  <li v-for="c in activeDetail.components" :key="c.name">
                    <code>{{ c.name }}</code> — {{ c.desc[lang] }}
                  </li>
                </ul>
              </section>

              <section v-if="activeDetail.run" class="detail-block">
                <h4>{{ t.detail.run }}</h4>
                <pre class="detail-code">{{ activeDetail.run }}</pre>
              </section>

              <section v-if="activeDetail.requirements && activeDetail.requirements.length" class="detail-block">
                <h4>{{ t.detail.requirements }}</h4>
                <ul class="detail-list">
                  <li v-for="(r, i) in activeDetail.requirements" :key="i">{{ r[lang] }}</li>
                </ul>
              </section>

              <section class="detail-block detail-block--oneliner">
                <h4>{{ t.detail.oneLiner }}</h4>
                <p>{{ activeDetail.oneLiner[lang] }}</p>
              </section>

              <section v-if="activeDetail.ask && activeDetail.ask.length" class="detail-block">
                <h4>{{ t.detail.ask }}</h4>
                <ul class="detail-list detail-list--ask">
                  <li v-for="(q, i) in activeDetail.ask" :key="i"><i class="fa-solid fa-angle-right" aria-hidden="true"></i> {{ q }}</li>
                </ul>
              </section>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style scoped>
.portfolio-page {
  width: min(1200px, 90vw);
  margin: 0 auto;
  padding: var(--space-4) 0 var(--space-12);
  position: relative;
}

/* ===== FONDO AURORA ===== */
.bg-aurora {
  position: fixed;
  inset: 0;
  z-index: -1;
  overflow: hidden;
  pointer-events: none;
}

.bg-blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(120px);
  animation: drift 18s infinite alternate ease-in-out;
  will-change: transform;
}

.bg-blob--1 {
  top: -10%;
  left: -10%;
  width: 45vw;
  max-width: 620px;
  aspect-ratio: 1;
  background: rgba(57, 255, 136, 0.09);
}

.bg-blob--2 {
  bottom: -15%;
  right: -10%;
  width: 50vw;
  max-width: 680px;
  aspect-ratio: 1;
  background: rgba(255, 121, 198, 0.09);
  animation-delay: -6s;
}

.bg-blob--3 {
  top: 40%;
  left: 55%;
  width: 30vw;
  max-width: 420px;
  aspect-ratio: 1;
  background: rgba(57, 255, 136, 0.05);
  animation-delay: -12s;
}

@keyframes drift {
  0% { transform: translate(0, 0) scale(1); }
  100% { transform: translate(60px, -50px) scale(1.15); }
}

.bg-grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(215, 254, 224, 0.025) 1px, transparent 1px),
    linear-gradient(90deg, rgba(215, 254, 224, 0.025) 1px, transparent 1px);
  background-size: 56px 56px;
  mask-image: radial-gradient(ellipse 90% 60% at 50% 0%, black 40%, transparent 100%);
  -webkit-mask-image: radial-gradient(ellipse 90% 60% at 50% 0%, black 40%, transparent 100%);
}

/* ===== NAV ===== */
.nav {
  position: sticky;
  top: var(--space-3);
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
  padding: var(--space-3) var(--space-6);
  border-radius: var(--radius-full);
  background: var(--nav-bg);
  backdrop-filter: blur(16px);
  border: var(--card-border);
  box-shadow: var(--shadow-1);
}

.nav__brand {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: var(--text-lg);
  letter-spacing: -0.02em;
}

.nav__brand-dot { color: var(--color-accent); }

.nav__links {
  display: none;
  gap: var(--space-6);
  font-size: var(--text-sm);
  font-weight: 500;
  color: var(--color-text-muted);
}

.nav__links a {
  position: relative;
  padding: var(--space-2);
  transition: color var(--duration-fast) ease;
}

.nav__links a::after {
  content: '';
  position: absolute;
  left: 50%;
  bottom: 0;
  width: 0;
  height: 2px;
  background: var(--grad-accent);
  border-radius: 2px;
  transition: width var(--duration-base) ease, left var(--duration-base) ease;
}

.nav__links a:hover { color: var(--color-text); }
.nav__links a:hover::after { width: 100%; left: 0; }

.nav__right {
  display: flex;
  align-items: center;
  gap: var(--space-3);
}

.nav__clock {
  display: none;
  font-size: var(--text-xs);
  color: var(--color-accent);
  letter-spacing: 0.08em;
  font-variant-numeric: tabular-nums;
  text-shadow: 0 0 10px rgba(57, 255, 136, 0.4);
}

@media (min-width: 640px) {
  .nav__clock { display: inline; }
}

.nav__lang {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  min-height: 44px;
  padding: var(--space-2) var(--space-4);
  border-radius: var(--btn-radius);
  border: 1px solid var(--color-border);
  font-size: var(--text-sm);
  font-weight: 600;
  transition: all var(--duration-base) ease;
}

.nav__lang:hover {
  border-color: var(--color-accent);
  color: var(--color-accent);
  box-shadow: 0 0 15px rgba(57, 255, 136, 0.2);
}

/* ===== HERO ===== */
.hero {
  display: grid;
  justify-items: center;
  text-align: center;
  gap: var(--space-4);
  padding: var(--space-16) 0 var(--space-16);
}

.hero__badge {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-4);
  border-radius: var(--radius-full);
  border: 1px solid rgba(57, 255, 136, 0.3);
  background: rgba(57, 255, 136, 0.08);
  color: var(--emerald-400);
  font-size: var(--text-xs);
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.badge-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--emerald-400);
  animation: pulse-dot 2s infinite;
}

@keyframes pulse-dot {
  0%, 100% { box-shadow: 0 0 0 0 rgba(57, 255, 136, 0.5); }
  50% { box-shadow: 0 0 0 7px rgba(57, 255, 136, 0); }
}

.hero__avatar-wrap {
  width: 176px;
  aspect-ratio: 1 / 1;
  position: relative;
  margin: var(--space-2) 0;
  animation: float-avatar 6s ease-in-out infinite;
}

/* Anillo conic-gradient rotatorio */
.avatar-ring {
  position: absolute;
  inset: -6px;
  border-radius: 50%;
  background: conic-gradient(from 0deg, var(--cyan-400), var(--violet-400), var(--emerald-400), var(--cyan-400));
  animation: spin-ring 6s linear infinite;
  filter: saturate(1.2);
}

.avatar-ring::after {
  content: '';
  position: absolute;
  inset: 4px;
  border-radius: 50%;
  background: var(--color-bg);
}

@keyframes spin-ring {
  100% { transform: rotate(360deg); }
}

.avatar-glow {
  position: absolute;
  inset: -20px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(57, 255, 136, 0.3) 0%, transparent 70%);
  filter: blur(18px);
  z-index: 0;
}

.hero__avatar {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
  position: relative;
  z-index: 1;
  border: 4px solid var(--color-bg);
  box-shadow: var(--shadow-2);
}

@keyframes float-avatar {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-12px); }
}

.hero__name {
  font-size: var(--text-hero);
  letter-spacing: -0.03em;
  font-weight: 700;
}

/* Gradiente de texto animado */
.text-gradient-animated {
  background: var(--grad-text);
  background-size: 220% auto;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  display: inline-block;
  animation: text-shimmer 6s linear infinite;
}

@keyframes text-shimmer {
  0% { background-position: 0% center; }
  100% { background-position: 220% center; }
}

.hero__title {
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.25em;
  font-size: var(--text-sm);
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: var(--space-4);
}

.title-line {
  width: 50px;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--color-text-muted), transparent);
}

/* Rotador de especialidades */
.hero__rotator {
  font-family: var(--font-display);
  font-size: var(--text-md);
  color: var(--color-text-muted);
  min-height: 1.8em;
}

.hero__prompt {
  color: var(--color-accent);
  font-weight: 700;
  margin-right: 0.3ch;
  text-shadow: 0 0 10px rgba(57, 255, 136, 0.5);
}

.hero__word {
  display: inline-block;
  margin-left: 0.4ch;
  font-weight: 600;
  background: var(--grad-accent);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.word-flip-enter-active { transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1); }
.word-flip-leave-active { transition: all 0.2s ease-in; }
.word-flip-enter-from { opacity: 0; transform: translateY(14px); }
.word-flip-leave-to { opacity: 0; transform: translateY(-14px); }

.hero__tagline {
  max-width: 60ch;
  color: var(--color-text-muted);
  font-size: var(--text-md);
  line-height: 1.7;
}

.hero__socials {
  display: flex;
  gap: var(--space-4);
  margin: var(--space-2) 0;
}

.hero__socials a {
  display: inline-grid;
  place-items: center;
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
  border: 1px solid var(--color-border);
  background: var(--color-glass);
  color: var(--color-text);
  font-size: var(--text-lg);
  transition: all var(--duration-slow) var(--ease-spring);
}

.hero__socials a:hover {
  transform: translateY(-8px) scale(1.1);
  border-color: var(--color-accent);
  color: var(--color-accent);
  box-shadow: 0 10px 25px rgba(57, 255, 136, 0.25);
}

.hero__actions {
  display: grid;
  gap: var(--space-4);
  width: min(100%, 640px);
  margin-top: var(--space-2);
}

/* Botón CV con acento */
.btn--cv {
  border-color: rgba(57, 255, 136, 0.4);
  color: var(--color-accent);
}

.btn--cv:hover {
  background: rgba(57, 255, 136, 0.08);
  border-color: var(--color-accent);
  box-shadow: 0 0 20px rgba(57, 255, 136, 0.2);
}

/* ===== BOTONES ===== */
.btn {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  gap: var(--space-3);
  min-height: 48px;
  border-radius: var(--btn-radius);
  padding: var(--btn-pad);
  font-weight: 700;
  font-size: var(--text-base);
  letter-spacing: 0.02em;
  border: 1px solid transparent;
  transition: all var(--duration-base) ease;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.btn:active { transform: scale(0.97); }

.btn--gradient {
  background: var(--grad-accent);
  color: var(--blue-950);
  box-shadow: 0 4px 20px rgba(57, 255, 136, 0.3);
}

/* Barrido de brillo */
.btn--gradient::after {
  content: '';
  position: absolute;
  top: 0;
  left: -80%;
  width: 50%;
  height: 100%;
  background: linear-gradient(105deg, transparent, rgba(255, 255, 255, 0.45), transparent);
  transform: skewX(-20deg);
  animation: shine 4s infinite;
}

@keyframes shine {
  0%, 60% { left: -80%; }
  100% { left: 160%; }
}

.btn--gradient:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 35px rgba(57, 255, 136, 0.45);
}

.btn--outline {
  border-color: var(--color-border-strong);
  color: var(--color-text);
  background: transparent;
  backdrop-filter: blur(5px);
}

.btn--outline:hover {
  background: rgba(215, 254, 224, 0.1);
  border-color: var(--color-text);
  transform: translateY(-3px);
}

/* ===== STATS ===== */
.stats {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-4);
  margin-top: var(--space-12);
  width: min(100%, 760px);
}

.stats__item {
  display: grid;
  gap: var(--space-1);
  padding: var(--space-4) var(--space-2);
  border-radius: var(--card-radius);
  background: var(--card-bg);
  border: var(--card-border);
  backdrop-filter: blur(16px);
  transition: transform var(--duration-base) ease, box-shadow var(--duration-base) ease;
}

.stats__item:hover {
  transform: translateY(-4px);
  box-shadow: var(--glow-cv);
}

.stats__value {
  font-family: var(--font-display);
  font-size: var(--text-xl);
  font-weight: 700;
  background: var(--grad-accent);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  font-variant-numeric: tabular-nums;
}

.stats__label {
  font-size: var(--text-xs);
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

/* Indicador de scroll */
.hero__scroll {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-2);
  margin-top: var(--space-8);
  font-size: var(--text-xs);
  color: var(--ivory-600);
  text-transform: uppercase;
  letter-spacing: 0.15em;
  transition: color var(--duration-base) ease;
}

.hero__scroll:hover { color: var(--color-accent); }

.scroll-mouse {
  width: 26px;
  height: 42px;
  border: 2px solid var(--ivory-600);
  border-radius: 14px;
  display: flex;
  justify-content: center;
  padding-top: 7px;
}

.scroll-wheel {
  width: 4px;
  height: 9px;
  border-radius: 2px;
  background: var(--color-accent);
  animation: scroll-hint 1.8s infinite ease-out;
}

@keyframes scroll-hint {
  0% { opacity: 1; transform: translateY(0); }
  70% { opacity: 0; transform: translateY(12px); }
  100% { opacity: 0; transform: translateY(0); }
}

/* ===== SECCIONES ===== */
.section { padding: var(--space-16) 0 var(--space-8); }

.section-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: var(--space-2);
  margin-bottom: var(--space-12);
}

.section-cmd {
  font-size: var(--text-sm);
  color: var(--ivory-600);
  letter-spacing: 0.05em;
}

.section-header h2 {
  font-size: var(--text-2xl);
  font-weight: 700;
  letter-spacing: -0.02em;
}

.section-subtitle {
  color: var(--color-text-muted);
  font-size: var(--text-md);
}

.header-decoration {
  width: 70px;
  height: 4px;
  margin-top: var(--space-2);
  background: var(--grad-accent);
  border-radius: 2px;
  box-shadow: 0 0 15px rgba(57, 255, 136, 0.5);
}

/* ===== SPECIALTIES (tilt 3D + glow) ===== */
.specialties__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 260px), 1fr));
  gap: var(--space-6);
  perspective: 1000px;
}

.specialty-card {
  --rx: 0deg;
  --ry: 0deg;
  overflow: hidden;
  border-radius: var(--card-radius);
  background: var(--card-bg);
  border: var(--card-border);
  backdrop-filter: blur(16px);
  transform: rotateX(var(--rx)) rotateY(var(--ry));
  transform-style: preserve-3d;
  transition: transform var(--duration-fast) ease-out, box-shadow var(--duration-base) ease, border-color var(--duration-base) ease;
  will-change: transform;
}

.specialty-card__inner {
  padding: var(--space-8) var(--space-6);
  display: grid;
  gap: var(--space-3);
  transform: translateZ(24px);
}

.specialty-card[data-cat='cv']:hover { box-shadow: var(--glow-cv); border-color: rgba(57, 255, 136, 0.35); }
.specialty-card[data-cat='ai']:hover { box-shadow: var(--glow-ai); border-color: rgba(255, 121, 198, 0.35); }
.specialty-card[data-cat='web']:hover { box-shadow: var(--glow-web); border-color: rgba(57, 255, 136, 0.35); }
.specialty-card[data-cat='api']:hover { box-shadow: var(--glow-api); border-color: rgba(255, 180, 84, 0.35); }

.specialty-card__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.specialty-card__icon {
  display: inline-grid;
  place-items: center;
  width: 3.5rem;
  height: 3.5rem;
  border-radius: var(--radius-md);
  font-size: var(--text-lg);
  color: var(--blue-950);
  animation: icon-bob 3.5s ease-in-out infinite;
}

@keyframes icon-bob {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-5px) rotate(3deg); }
}

.specialty-card[data-cat='cv'] .specialty-card__icon { background: linear-gradient(135deg, var(--cyan-400), var(--cyan-600)); box-shadow: 0 6px 18px rgba(57, 255, 136, 0.35); }
.specialty-card[data-cat='ai'] .specialty-card__icon { background: linear-gradient(135deg, var(--violet-400), #d1479b); box-shadow: 0 6px 18px rgba(255, 121, 198, 0.35); }
.specialty-card[data-cat='web'] .specialty-card__icon { background: linear-gradient(135deg, var(--emerald-400), #19d968); box-shadow: 0 6px 18px rgba(57, 255, 136, 0.35); }
.specialty-card[data-cat='api'] .specialty-card__icon { background: linear-gradient(135deg, var(--amber-400), #e08c2a); box-shadow: 0 6px 18px rgba(255, 180, 84, 0.35); }

.specialty-card__count {
  font-family: var(--font-display);
  font-size: var(--text-lg);
  font-weight: 700;
  color: var(--color-text-muted);
  opacity: 0.6;
}

.specialty-card h3 { font-size: var(--text-lg); }

.specialty-card p {
  color: var(--color-text-muted);
  font-size: var(--text-sm);
  line-height: 1.7;
}

/* ===== FILTROS ===== */
.filters {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: var(--space-3);
  margin-bottom: var(--space-12);
}

.filters__chip {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  min-height: 44px;
  padding: var(--space-2) var(--space-4);
  border-radius: var(--radius-full);
  border: 1px solid var(--color-border);
  background: var(--chip-bg);
  color: var(--color-text-muted);
  font-size: var(--text-sm);
  font-weight: 600;
  transition: all var(--duration-base) ease;
}

.filters__chip:hover {
  color: var(--color-text);
  border-color: var(--color-border-strong);
  transform: translateY(-2px);
}

.filters__chip--active {
  color: var(--color-text);
  border-color: var(--chip-accent, var(--color-accent));
  box-shadow: 0 0 14px rgba(57, 255, 136, 0.18);
}

/* ===== PROJECTS (spotlight + borde animado) ===== */
.projects__status {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-6);
  color: var(--color-text-muted);
  padding: var(--space-16) 0;
  font-size: var(--text-md);
  letter-spacing: 0.05em;
  text-transform: uppercase;
  font-weight: 600;
}

.spinner {
  width: 48px;
  height: 48px;
  border: 4px solid rgba(215, 254, 224, 0.05);
  border-top-color: var(--color-accent);
  border-right-color: var(--violet-400);
  border-radius: 50%;
  animation: spin 1s infinite cubic-bezier(0.55, 0.15, 0.45, 0.85);
}

@keyframes spin { 100% { transform: rotate(360deg); } }

.projects__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 320px), 1fr));
  gap: var(--space-8);
  position: relative;
}

/* Transición al filtrar */
.card-shuffle-enter-active { transition: all 0.4s var(--ease-smooth); }
.card-shuffle-leave-active { transition: all 0.25s ease-in; position: absolute; opacity: 0; }
.card-shuffle-enter-from { opacity: 0; transform: translateY(30px) scale(0.95); }
.card-shuffle-move { transition: transform 0.4s var(--ease-smooth); }

.project-card {
  --mx: 50%;
  --my: 50%;
  background: var(--card-bg);
  backdrop-filter: blur(16px);
  border: var(--card-border);
  border-radius: var(--card-radius);
  position: relative;
  transition: transform var(--duration-slow) var(--ease-smooth), box-shadow var(--duration-slow) ease, border-color var(--duration-base) ease;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

/* Spotlight que sigue el cursor */
.project-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(360px circle at var(--mx) var(--my), rgba(57, 255, 136, 0.08), transparent 65%);
  opacity: 0;
  transition: opacity var(--duration-base) ease;
  pointer-events: none;
  z-index: 0;
}

.project-card:hover::before { opacity: 1; }

/* Borde conic animado en hover */
.project-card::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: var(--card-radius);
  padding: 1.5px;
  background: var(--grad-border);
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  opacity: 0;
  transition: opacity var(--duration-base) ease;
  pointer-events: none;
  animation: border-spin 5s linear infinite;
}

@keyframes border-spin {
  100% { --border-angle: 360deg; }
}

.project-card:hover {
  transform: translateY(-10px) scale(1.015);
  box-shadow: var(--shadow-3);
  border-color: transparent;
}

.project-card:hover::after { opacity: 1; }

.project-card[data-cat='cv']:hover { box-shadow: var(--shadow-3), var(--glow-cv); }
.project-card[data-cat='ai']:hover { box-shadow: var(--shadow-3), var(--glow-ai); }
.project-card[data-cat='web']:hover { box-shadow: var(--shadow-3), var(--glow-web); }
.project-card[data-cat='api']:hover { box-shadow: var(--shadow-3), var(--glow-api); }

.project-card__content {
  padding: var(--space-8) var(--space-6);
  display: flex;
  flex-direction: column;
  height: 100%;
  position: relative;
  z-index: 1;
}

.project-card__header {
  display: flex;
  align-items: flex-start;
  gap: var(--space-4);
  margin-bottom: var(--space-4);
}

/* Badge de icono por proyecto */
.project-card__badge {
  display: inline-grid;
  place-items: center;
  width: 3rem;
  height: 3rem;
  flex-shrink: 0;
  border-radius: var(--radius-md);
  font-size: var(--text-md);
  color: var(--blue-950);
  transition: transform var(--duration-base) var(--ease-spring);
}

.project-card:hover .project-card__badge {
  transform: scale(1.12) rotate(-6deg);
}

.project-card__badge[data-cat='cv'] { background: linear-gradient(135deg, var(--cyan-400), var(--cyan-600)); box-shadow: 0 5px 15px rgba(57, 255, 136, 0.3); }
.project-card__badge[data-cat='ai'] { background: linear-gradient(135deg, var(--violet-400), #d1479b); box-shadow: 0 5px 15px rgba(255, 121, 198, 0.3); }
.project-card__badge[data-cat='web'] { background: linear-gradient(135deg, var(--emerald-400), #19d968); box-shadow: 0 5px 15px rgba(57, 255, 136, 0.3); }
.project-card__badge[data-cat='api'] { background: linear-gradient(135deg, var(--amber-400), #e08c2a); box-shadow: 0 5px 15px rgba(255, 180, 84, 0.3); }

.project-card__header h3 {
  font-size: var(--text-lg);
  font-weight: 700;
  line-height: 1.3;
  flex: 1;
}

.project-card__icon {
  color: var(--color-text-muted);
  font-size: var(--text-base);
  width: 44px;
  height: 44px;
  flex-shrink: 0;
  border-radius: 50%;
  background: rgba(215, 254, 224, 0.05);
  transition: all var(--duration-slow) var(--ease-spring);
  display: flex;
  align-items: center;
  justify-content: center;
}

.project-card__icon:hover {
  background: var(--grad-accent);
  color: var(--blue-950);
  transform: rotate(15deg) scale(1.15);
}

.project-card__description {
  color: var(--color-text-muted);
  font-size: var(--text-base);
  line-height: 1.6;
  margin-bottom: var(--space-8);
  flex-grow: 1;
}

.project-card__footer {
  border-top: 1px solid var(--color-border);
  padding-top: var(--space-4);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-2);
}

.project-card__tag {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-4);
  border-radius: var(--radius-full);
  background: var(--chip-bg);
  border: 1px solid var(--color-border);
  font-size: var(--text-xs);
  font-weight: 600;
  letter-spacing: 0.03em;
}

.project-card__cat {
  font-size: var(--text-xs);
  color: var(--ivory-600);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-weight: 600;
}

.tag-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--color-accent);
  box-shadow: 0 0 10px rgba(57, 255, 136, 0.6);
  flex-shrink: 0;
}

/* ===== MARQUEE STACK ===== */
.marquee {
  overflow: hidden;
  padding: var(--space-3) 0;
  mask-image: linear-gradient(90deg, transparent, black 12%, black 88%, transparent);
  -webkit-mask-image: linear-gradient(90deg, transparent, black 12%, black 88%, transparent);
}

.marquee__track {
  display: flex;
  gap: var(--space-4);
  width: max-content;
  animation: marquee 28s linear infinite;
}

.marquee--reverse .marquee__track {
  animation-direction: reverse;
}

.marquee:hover .marquee__track {
  animation-play-state: paused;
}

@keyframes marquee {
  100% { transform: translateX(-50%); }
}

.marquee__chip {
  display: inline-flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-3) var(--space-6);
  border-radius: var(--radius-full);
  border: 1px solid var(--color-border);
  background: var(--card-bg);
  backdrop-filter: blur(10px);
  font-family: var(--font-display);
  font-size: var(--text-base);
  font-weight: 600;
  white-space: nowrap;
  transition: all var(--duration-base) ease;
}

.marquee__chip i { color: var(--color-accent); font-size: var(--text-md); }

.marquee--reverse .marquee__chip i { color: var(--violet-400); }

.marquee__chip:hover {
  border-color: var(--color-accent);
  box-shadow: var(--glow-cv);
  transform: translateY(-3px);
}

/* ===== CONTACT ===== */
.contact__card {
  text-align: center;
  padding: var(--space-16) var(--space-6);
  border-radius: var(--card-radius);
  background: var(--card-bg);
  border: var(--card-border);
  backdrop-filter: blur(16px);
  display: grid;
  justify-items: center;
  gap: var(--space-4);
  position: relative;
  overflow: hidden;
}

.contact__winbar {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  border-radius: var(--card-radius) var(--card-radius) 0 0;
}

.contact__glow {
  position: absolute;
  top: -60%;
  left: 50%;
  transform: translateX(-50%);
  width: 70%;
  aspect-ratio: 2/1;
  background: radial-gradient(ellipse, rgba(57, 255, 136, 0.12), transparent 70%);
  filter: blur(30px);
  animation: glow-breathe 5s ease-in-out infinite alternate;
  pointer-events: none;
}

@keyframes glow-breathe {
  0% { opacity: 0.5; transform: translateX(-50%) scale(1); }
  100% { opacity: 1; transform: translateX(-50%) scale(1.15); }
}

.contact__card h2 {
  font-size: var(--text-2xl);
  letter-spacing: -0.02em;
  position: relative;
}

.contact__card > p {
  color: var(--color-text-muted);
  max-width: 50ch;
  position: relative;
}

.contact__actions {
  display: grid;
  gap: var(--space-4);
  width: min(100%, 640px);
  margin-top: var(--space-4);
  position: relative;
}

.contact__cv {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  min-height: 44px;
  padding: var(--space-2) var(--space-4);
  margin-top: var(--space-2);
  color: var(--color-text-muted);
  font-size: var(--text-sm);
  font-weight: 600;
  letter-spacing: 0.04em;
  border-bottom: 1px dashed var(--color-border-strong);
  transition: all var(--duration-base) ease;
  position: relative;
}

.contact__cv:hover {
  color: var(--color-accent);
  border-bottom-color: var(--color-accent);
}

/* ===== VISOR DE CV ===== */
.cv-overlay {
  position: fixed;
  inset: 0;
  z-index: 100;
  display: grid;
  place-items: center;
  padding: var(--space-4);
  background: rgba(4, 12, 20, 0.55);
  backdrop-filter: blur(10px);
}

.cv-panel {
  width: min(900px, 100%);
  height: min(88vh, 1100px);
  display: flex;
  flex-direction: column;
  border-radius: var(--card-radius);
  background: var(--color-glass-deep);
  border: 1px solid var(--color-border-strong);
  box-shadow: var(--shadow-3), var(--glow-cv);
  overflow: hidden;
}

.cv-panel__bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
  padding: var(--space-3) var(--space-4);
  border-bottom: 1px solid var(--color-border);
  background: var(--nav-bg);
}

.cv-panel__bar h3 {
  font-size: var(--text-base);
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
}

.cv-panel__bar h3 i { color: var(--color-accent); }

.cv-panel__actions {
  display: flex;
  gap: var(--space-2);
}

.cv-panel__btn {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  min-width: 44px;
  min-height: 44px;
  justify-content: center;
  padding: var(--space-2) var(--space-3);
  border-radius: var(--radius-sm);
  border: 1px solid var(--color-border);
  color: var(--color-text-muted);
  font-size: var(--text-sm);
  font-weight: 600;
  transition: all var(--duration-fast) ease;
}

.cv-panel__btn:hover {
  color: var(--color-text);
  border-color: var(--color-border-strong);
  background: rgba(215, 254, 224, 0.06);
}

.cv-panel__btn--accent {
  color: var(--color-accent);
  border-color: rgba(57, 255, 136, 0.35);
}

.cv-panel__btn--accent:hover {
  color: var(--color-accent);
  border-color: var(--color-accent);
  box-shadow: 0 0 14px rgba(57, 255, 136, 0.2);
}

.cv-panel__frame {
  flex: 1;
  width: 100%;
  border: none;
  background: #fff;
}

.cv-panel__fallback {
  padding: var(--space-2) var(--space-4);
  font-size: var(--text-xs);
  color: var(--ivory-600);
  text-align: center;
}

.cv-panel__fallback a {
  color: var(--color-accent);
  text-decoration: underline;
}

/* Transición del modal: scale + fade desde el trigger */
.cv-modal-enter-active { transition: opacity 0.25s ease-out; }
.cv-modal-leave-active { transition: opacity 0.18s ease-in; }
.cv-modal-enter-active .cv-panel { transition: transform 0.3s var(--ease-spring), opacity 0.25s ease-out; }
.cv-modal-leave-active .cv-panel { transition: transform 0.18s ease-in, opacity 0.18s ease-in; }
.cv-modal-enter-from, .cv-modal-leave-to { opacity: 0; }
.cv-modal-enter-from .cv-panel { transform: scale(0.92) translateY(24px); opacity: 0; }
.cv-modal-leave-to .cv-panel { transform: scale(0.95) translateY(12px); opacity: 0; }

@media (max-width: 640px) {
  .cv-overlay { padding: 0; }
  .cv-panel { width: 100%; height: 100dvh; border-radius: 0; }
  .cv-panel__btn-label { display: none; }
}

/* ===== FLAGSHIP CASE STUDY ===== */
.flagship {
  position: relative;
  background: var(--card-bg);
  backdrop-filter: blur(16px);
  border: var(--card-border);
  border-radius: var(--card-radius);
  overflow: hidden;
  box-shadow: var(--shadow-2), var(--glow-web);
}

/* Borde cónico animado permanente (sutil) */
.flagship::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: var(--card-radius);
  padding: 1.5px;
  background: var(--grad-border);
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  animation: border-spin 6s linear infinite;
  opacity: 0.55;
  pointer-events: none;
}

/* Spotlight que sigue el cursor */
.flagship::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(520px circle at var(--mx) var(--my), rgba(57, 255, 136, 0.09), transparent 60%);
  opacity: 0;
  transition: opacity var(--duration-base) ease;
  pointer-events: none;
  z-index: 0;
}
.flagship:hover::before { opacity: 1; }

.flagship__live {
  margin-left: auto;
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  font-size: var(--text-xs);
  color: var(--color-accent);
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.flagship__body {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-8);
  padding: var(--space-8) var(--space-6);
}

.flagship__role {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  font-size: var(--text-sm);
  font-weight: 700;
  color: var(--amber-400);
  padding: var(--space-1) var(--space-3);
  border: 1px solid rgba(255, 180, 84, 0.3);
  border-radius: var(--radius-full);
  background: rgba(255, 180, 84, 0.08);
}

.flagship__pitch {
  margin-top: var(--space-4);
  color: var(--color-text);
  font-size: var(--text-md);
  line-height: 1.7;
  max-width: 48ch;
}

.flagship__actions {
  margin-top: var(--space-6);
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
}

.flagship__metrics {
  margin-top: var(--space-8);
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-4);
}
.flagship__metrics li { display: flex; flex-direction: column; gap: 2px; }
.flagship__metric-val {
  font-family: var(--font-display);
  font-size: var(--text-2xl);
  font-weight: 800;
  line-height: 1;
  background: var(--grad-text);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
.flagship__metric-label { font-size: var(--text-xs); color: var(--color-text-muted); }

.flagship__features {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-3);
  align-content: start;
}
.flagship__feature {
  display: flex;
  gap: var(--space-3);
  align-items: flex-start;
  padding: var(--space-4);
  background: var(--chip-bg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  transition: border-color var(--duration-base) ease, transform var(--duration-base) var(--ease-smooth);
}
.flagship__feature:hover { border-color: var(--color-border-strong); transform: translateY(-3px); }
.flagship__feature-ic {
  flex: none;
  width: 40px;
  height: 40px;
  display: grid;
  place-items: center;
  border-radius: var(--radius-md);
  color: var(--color-accent);
  background: rgba(57, 255, 136, 0.1);
  border: 1px solid var(--color-border-strong);
  font-size: 1rem;
}
.flagship__feature-txt h3 { font-size: var(--text-base); color: var(--color-text); margin: 0 0 2px; }
.flagship__feature-txt p { font-size: var(--text-sm); color: var(--color-text-muted); line-height: 1.5; margin: 0; }

.flagship__stack {
  position: relative;
  z-index: 1;
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
  padding: var(--space-4) var(--space-6) var(--space-6);
  border-top: 1px solid var(--color-border);
}
.flagship__tag {
  font-family: var(--font-display);
  font-size: var(--text-xs);
  color: var(--color-text-muted);
  padding: var(--space-1) var(--space-3);
  background: rgba(14, 26, 18, 0.6);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-full);
}

@media (min-width: 860px) {
  .flagship__body { grid-template-columns: 1.05fr 1fr; align-items: start; }
}
@media (max-width: 460px) {
  .flagship__metrics { grid-template-columns: 1fr 1fr; }
}

@media (prefers-reduced-motion: reduce) {
  .flagship::after { animation: none; }
}

/* ===== PROJECT CARD: visibilidad + hint de detalle ===== */
.project-card--clickable { cursor: pointer; }
.project-card--clickable:focus-visible { outline: none; box-shadow: var(--focus-ring); }

.project-card__vis {
  margin-left: auto;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 0.68rem;
  font-family: var(--font-display);
  letter-spacing: 0.03em;
  padding: 2px 8px;
  border-radius: var(--radius-full);
  border: 1px solid var(--color-border);
}
.project-card__vis[data-vis='public'] { color: var(--emerald-400); border-color: rgba(57, 255, 136, 0.35); background: rgba(57, 255, 136, 0.08); }
.project-card__vis[data-vis='private'] { color: var(--ivory-400); background: rgba(120, 120, 120, 0.1); }
.project-card__vis[data-vis='live'] { color: var(--cyan-400); border-color: rgba(107, 229, 253, 0.35); background: rgba(107, 229, 253, 0.08); }

.project-card__more {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: var(--text-xs);
  font-family: var(--font-display);
  color: var(--color-accent);
  transition: gap var(--duration-base) var(--ease-smooth);
}
.project-card:hover .project-card__more { gap: 10px; }

/* ===== MODAL DE DETALLE DE PROYECTO ===== */
.detail-overlay {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: grid;
  place-items: center;
  padding: var(--space-6);
  background: var(--color-glass-deep);
  backdrop-filter: blur(8px);
}
.detail-panel {
  width: min(860px, 100%);
  max-height: 88dvh;
  display: flex;
  flex-direction: column;
  background: linear-gradient(160deg, var(--blue-800) 0%, var(--blue-950) 100%);
  border: 1px solid var(--color-border-strong);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-3), var(--glow-web);
  overflow: hidden;
}
.detail-panel__bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
  padding: var(--space-4) var(--space-6);
  border-bottom: 1px solid var(--color-border);
  background: var(--win-bar-bg);
}
.detail-panel__title { display: flex; align-items: center; gap: var(--space-3); min-width: 0; }
.detail-panel__ic {
  flex: none;
  width: 42px;
  height: 42px;
  display: grid;
  place-items: center;
  border-radius: var(--radius-md);
  background: rgba(57, 255, 136, 0.1);
  border: 1px solid var(--color-border-strong);
  color: var(--color-accent);
}
.detail-panel__ic[data-cat='cv'] { color: var(--cat-cv); border-color: rgba(107, 229, 253, 0.4); background: rgba(107, 229, 253, 0.1); }
.detail-panel__ic[data-cat='ai'] { color: var(--cat-ai); border-color: rgba(255, 121, 198, 0.4); background: rgba(255, 121, 198, 0.1); }
.detail-panel__ic[data-cat='api'] { color: var(--cat-api); border-color: rgba(255, 180, 84, 0.4); background: rgba(255, 180, 84, 0.1); }
.detail-panel__title h3 {
  font-size: var(--text-lg);
  color: var(--color-text);
  margin: 0;
  text-transform: capitalize;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.detail-panel__vis {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 0.68rem;
  font-family: var(--font-display);
  color: var(--color-text-muted);
}
.detail-panel__vis[data-vis='public'] { color: var(--emerald-400); }
.detail-panel__vis[data-vis='live'] { color: var(--cyan-400); }
.detail-panel__actions { display: flex; gap: var(--space-2); flex: none; }
.detail-panel__btn {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-3);
  border: 1px solid var(--color-border);
  border-radius: var(--btn-radius);
  background: transparent;
  color: var(--color-text);
  font-family: var(--font-body);
  font-size: var(--text-sm);
  cursor: pointer;
  transition: border-color var(--duration-base) ease, background var(--duration-base) ease;
}
.detail-panel__btn:hover { border-color: var(--color-border-strong); background: rgba(57, 255, 136, 0.08); }
.detail-panel__body {
  padding: var(--space-6);
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
}
.detail-note {
  display: flex;
  gap: var(--space-2);
  align-items: flex-start;
  padding: var(--space-3) var(--space-4);
  font-size: var(--text-sm);
  color: var(--amber-400);
  background: rgba(255, 180, 84, 0.08);
  border: 1px solid rgba(255, 180, 84, 0.25);
  border-radius: var(--radius-md);
}
.detail-block h4 {
  font-family: var(--font-display);
  font-size: var(--text-sm);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--color-accent);
  margin: 0 0 var(--space-2);
}
.detail-block > p { color: var(--color-text); font-size: var(--text-base); line-height: 1.7; margin: 0; }
.detail-block--oneliner > p {
  padding: var(--space-4);
  border-left: 3px solid var(--color-accent);
  background: rgba(57, 255, 136, 0.05);
  border-radius: 0 var(--radius-md) var(--radius-md) 0;
  font-style: italic;
}
.detail-stack { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: var(--space-2); }
.detail-stack li { font-size: var(--text-sm); color: var(--color-text); }
.detail-stack li span {
  display: inline-block;
  min-width: 150px;
  color: var(--color-text-muted);
  font-family: var(--font-display);
  font-size: var(--text-xs);
}
.detail-code {
  margin: 0;
  padding: var(--space-4);
  background: var(--blue-950);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  font-family: var(--font-display);
  font-size: var(--text-xs);
  line-height: 1.6;
  color: var(--ivory-100);
  white-space: pre;
  overflow-x: auto;
}
.detail-list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: var(--space-2); }
.detail-list li { font-size: var(--text-sm); color: var(--color-text); line-height: 1.6; }
.detail-list code {
  font-family: var(--font-display);
  color: var(--cyan-400);
  background: rgba(107, 229, 253, 0.08);
  padding: 1px 5px;
  border-radius: 4px;
}
.detail-list--ask li { color: var(--color-text-muted); }
.detail-list--ask i { color: var(--color-accent); margin-right: 4px; }

@media (max-width: 560px) {
  .detail-overlay { padding: 0; }
  .detail-panel { max-height: 100dvh; height: 100dvh; border-radius: 0; }
  .detail-panel__btn-label { display: none; }
}

/* ===== IMPACT / WHY HIRE ME ===== */
.impact__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 250px), 1fr));
  gap: var(--space-6);
}

.impact-card {
  --mx: 50%;
  --my: 50%;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  padding: var(--space-8) var(--space-6);
  border-radius: var(--card-radius);
  background: var(--card-bg);
  border: var(--card-border);
  backdrop-filter: blur(16px);
  transition: transform var(--duration-base) var(--ease-smooth), box-shadow var(--duration-base) ease, border-color var(--duration-base) ease;
}

.impact-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(300px circle at var(--mx) var(--my), rgba(57, 255, 136, 0.08), transparent 65%);
  opacity: 0;
  transition: opacity var(--duration-base) ease;
  pointer-events: none;
}

.impact-card:hover {
  transform: translateY(-6px);
  border-color: var(--color-border-strong);
  box-shadow: var(--shadow-2), var(--glow-web);
}

.impact-card:hover::before { opacity: 1; }

.impact-card__ic {
  display: inline-grid;
  place-items: center;
  width: 3rem;
  height: 3rem;
  border-radius: var(--radius-md);
  font-size: var(--text-md);
  color: var(--color-accent);
  background: rgba(57, 255, 136, 0.1);
  border: 1px solid var(--color-border-strong);
  position: relative;
  z-index: 1;
}

.impact-card__metric {
  font-family: var(--font-display);
  font-size: var(--text-2xl);
  font-weight: 800;
  line-height: 1.1;
  background: var(--grad-text);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  position: relative;
  z-index: 1;
}

.impact-card__label {
  font-size: var(--text-base);
  color: var(--color-text);
  position: relative;
  z-index: 1;
}

.impact-card__desc {
  font-size: var(--text-sm);
  color: var(--color-text-muted);
  line-height: 1.6;
  position: relative;
  z-index: 1;
}

/* ===== EXPERIENCE TIMELINE ===== */
.timeline {
  list-style: none;
  position: relative;
  margin: 0;
  padding: 0 0 0 var(--space-8);
}

.timeline::before {
  content: '';
  position: absolute;
  top: 6px;
  bottom: 6px;
  left: 7px;
  width: 2px;
  background: linear-gradient(180deg, var(--color-accent), var(--cyan-400), rgba(57, 255, 136, 0.1));
}

.tl-item {
  position: relative;
  padding-bottom: var(--space-8);
}
.tl-item:last-child { padding-bottom: 0; }

.tl-node {
  position: absolute;
  left: calc(-1 * var(--space-8) + 1px);
  top: 6px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--color-bg);
  border: 3px solid var(--color-accent);
  box-shadow: 0 0 12px rgba(57, 255, 136, 0.5);
}
.tl-item[data-cat='cv'] .tl-node { border-color: var(--cat-cv); box-shadow: 0 0 12px rgba(107, 229, 253, 0.5); }
.tl-item[data-cat='ai'] .tl-node { border-color: var(--cat-ai); box-shadow: 0 0 12px rgba(255, 121, 198, 0.5); }
.tl-item[data-cat='web'] .tl-node { border-color: var(--cat-web); box-shadow: 0 0 12px rgba(57, 255, 136, 0.5); }
.tl-item[data-cat='api'] .tl-node { border-color: var(--cat-api); box-shadow: 0 0 12px rgba(255, 180, 84, 0.5); }

.tl-card {
  --mx: 50%;
  --my: 50%;
  position: relative;
  overflow: hidden;
  padding: var(--space-6);
  border-radius: var(--card-radius);
  background: var(--card-bg);
  border: var(--card-border);
  backdrop-filter: blur(16px);
  transition: transform var(--duration-base) var(--ease-smooth), border-color var(--duration-base) ease, box-shadow var(--duration-base) ease;
}
.tl-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(360px circle at var(--mx) var(--my), rgba(57, 255, 136, 0.06), transparent 65%);
  opacity: 0;
  transition: opacity var(--duration-base) ease;
  pointer-events: none;
}
.tl-card:hover { transform: translateX(4px); border-color: var(--color-border-strong); box-shadow: var(--shadow-2); }
.tl-card:hover::before { opacity: 1; }

.tl-card__head {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: space-between;
  gap: var(--space-2);
  margin-bottom: var(--space-4);
  position: relative;
  z-index: 1;
}
.tl-card__role { font-size: var(--text-lg); color: var(--color-text); }
.tl-card__company { font-size: var(--text-sm); color: var(--color-accent); font-weight: 600; margin-top: 2px; }
.tl-card__company span { color: var(--color-text-muted); font-weight: 400; }
.tl-card__period {
  font-family: var(--font-display);
  font-size: var(--text-xs);
  color: var(--ivory-600);
  letter-spacing: 0.04em;
  white-space: nowrap;
  padding: var(--space-1) var(--space-3);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-full);
}

.tl-card__bullets { list-style: none; padding: 0; margin: 0 0 var(--space-4); display: flex; flex-direction: column; gap: var(--space-2); position: relative; z-index: 1; }
.tl-card__bullets li { font-size: var(--text-sm); color: var(--color-text-muted); line-height: 1.6; padding-left: 1.4em; text-indent: -1.4em; }
.tl-card__bullets i { color: var(--color-accent); margin-right: 0.5em; }

.tl-card__tags { display: flex; flex-wrap: wrap; gap: var(--space-2); position: relative; z-index: 1; }
.tl-tag {
  font-family: var(--font-display);
  font-size: var(--text-xs);
  color: var(--color-text-muted);
  padding: var(--space-1) var(--space-3);
  background: rgba(14, 26, 18, 0.6);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-full);
}

/* ===== EDUCATION & CERTIFICATIONS ===== */
.edu__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-6);
}
@media (min-width: 780px) {
  .edu__grid { grid-template-columns: 1fr 1fr; }
}

.edu-card {
  overflow: hidden;
  border-radius: var(--card-radius);
  background: var(--card-bg);
  border: var(--card-border);
  backdrop-filter: blur(16px);
  transition: transform var(--duration-base) var(--ease-smooth), border-color var(--duration-base) ease, box-shadow var(--duration-base) ease;
}
.edu-card:hover { transform: translateY(-4px); border-color: var(--color-border-strong); box-shadow: var(--shadow-2), var(--glow-cv); }

.edu-card__body { padding: var(--space-6); }

.edu-card__title {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-size: var(--text-base);
  color: var(--color-accent);
  margin-bottom: var(--space-4);
}
.edu-card__title--lang { margin-top: var(--space-6); }
.edu-card__title i { font-size: var(--text-md); }

.edu-list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: var(--space-4); }
.edu-list li { display: flex; flex-direction: column; gap: 2px; padding-left: var(--space-4); border-left: 2px solid var(--color-border-strong); }
.edu-list__main { font-size: var(--text-base); color: var(--color-text); font-weight: 600; }
.edu-list__sub { font-size: var(--text-sm); color: var(--color-text-muted); }
.edu-list__meta { font-family: var(--font-display); font-size: var(--text-xs); color: var(--ivory-600); letter-spacing: 0.04em; }

.edu-lang { font-size: var(--text-sm); color: var(--color-text); }

.cert-list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: var(--space-3); }
.cert-list li {
  display: flex;
  align-items: flex-start;
  gap: var(--space-3);
  font-size: var(--text-sm);
  color: var(--color-text-muted);
  line-height: 1.5;
}
.cert-list i { color: var(--amber-400); margin-top: 3px; flex: none; }

/* ===== CV PROFILE SELECTOR ===== */
.cv-panel__profiles {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  flex-wrap: wrap;
  padding: var(--space-2) var(--space-4);
  border-bottom: 1px solid var(--color-border);
  background: rgba(6, 10, 8, 0.6);
}
.cv-panel__profiles-label {
  font-size: var(--text-xs);
  color: var(--ivory-600);
  text-transform: uppercase;
  letter-spacing: 0.08em;
}
.cv-seg {
  min-height: 36px;
  padding: var(--space-1) var(--space-4);
  border-radius: var(--radius-sm);
  border: 1px solid var(--color-border);
  color: var(--color-text-muted);
  font-family: var(--font-display);
  font-size: var(--text-xs);
  font-weight: 600;
  letter-spacing: 0.03em;
  transition: all var(--duration-fast) ease;
}
.cv-seg:hover { color: var(--color-text); border-color: var(--color-border-strong); }
.cv-seg--active {
  color: var(--blue-950);
  background: var(--grad-accent);
  border-color: transparent;
  box-shadow: 0 0 14px rgba(57, 255, 136, 0.3);
}
.cv-panel__lang-hint {
  margin-left: auto;
  font-family: var(--font-display);
  font-size: var(--text-xs);
  color: var(--color-accent);
  border: 1px solid var(--color-border-strong);
  border-radius: var(--radius-sm);
  padding: 2px 8px;
}

/* ===== FOOTER ===== */
.footer {
  text-align: center;
  padding-top: var(--space-12);
  color: var(--ivory-600);
  font-size: var(--text-sm);
}

/* ===== RESPONSIVE ===== */
@media (min-width: 768px) {
  .nav__links { display: flex; }
  .hero__actions, .contact__actions { grid-template-columns: repeat(3, 1fr); }
  .stats { grid-template-columns: repeat(4, 1fr); }
}
</style>
