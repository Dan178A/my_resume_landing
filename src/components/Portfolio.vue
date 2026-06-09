<script setup lang="ts">
import { onMounted, ref } from 'vue'

interface GitHubRepo {
    id: number
    name: string
    description: string | null
    language: string | null
    html_url: string
}

const githubUsername = 'Dan178A'
const linkedInUrl = 'https://www.linkedin.com/in/daniel-alejandro-silva-rojas/'
const emailAddress = 'dsrglrm@gmail.com'
const avatarSrc = '/1699966173589.jpg'

const selectedRepos = ref<string[]>([
    'System_Stabilitation_Interpolation',
    'FlowNet_Video_Stabilization',
    'Socket-Communication-System',
    'Socket-File-Sharing-Protocol',
    'RealtimeVoiceAssistant',
    'Traffic_Simulation_Model'
])

const repos = ref<GitHubRepo[]>([])
const loading = ref(true)
const error = ref('')

const fetchRepositories = async (): Promise<void> => {
    try {
        // Agregamos ?per_page=100 para traer todos tus repositorios
        const response = await fetch(`https://api.github.com/users/${githubUsername}/repos?per_page=100`)

        if (!response.ok) {
            throw new Error(`Error al conectar con GitHub: ${response.status}`)
        }

        const data = (await response.json()) as GitHubRepo[]

        // Filtramos localmente basándonos en tu lista seleccionada
        repos.value = selectedRepos.value
            .map(name => data.find(repo => repo.name === name))
            .filter((repo): repo is GitHubRepo => repo !== undefined)

    } catch (err) {
        error.value = err instanceof Error ? err.message : 'Ocurrió un error inesperado.'
        console.error('Error al obtener repos:', err)
    } finally {
        loading.value = false
    }
}

onMounted(() => {
    fetchRepositories()
})
</script>

<template>
    <div class="portfolio-page">
        <section class="hero">
            <div class="hero__avatar-wrap">
                <img :src="avatarSrc" alt="Foto de perfil de Daniel Silva" class="hero__avatar" />
            </div>

            <h1 class="hero__name">Daniel Silva</h1>
            <p class="hero__title">Full Stack Developer</p>

            <div class="hero__socials" aria-label="Redes sociales">
                <a :href="`https://github.com/${githubUsername}`" target="_blank" rel="noopener noreferrer"
                    aria-label="GitHub">
                    <i class="fa-brands fa-github" aria-hidden="true"></i>
                </a>
                <a :href="linkedInUrl" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                    <i class="fa-brands fa-linkedin" aria-hidden="true"></i>
                </a>
            </div>

            <div class="hero__actions">
                <a href="https://wa.me/584142317561?text=Hola%20Daniel" class="btn btn--solid" target="_blank"
                    rel="noopener noreferrer">
                    WhatsApp
                </a>
                <a :href="`mailto:${emailAddress}`" class="btn btn--outline">Correo</a>
            </div>
        </section>

        <section class="projects" aria-labelledby="projects-title">
            <h2 id="projects-title">Proyectos Seleccionados</h2>

            <p v-if="loading" class="projects__status">Cargando proyectos...</p>
            <p v-else-if="error" class="projects__status projects__status--error">{{ error }}</p>

            <div v-else class="projects__grid">
                <article v-for="repo in repos" :key="repo.id" class="project-card">
                    <div class="project-card__content">
                        <h3>{{ repo.name }}</h3>
                        <p class="project-card__description">
                            {{ repo.description || 'Repositorio sin descripción disponible.' }}
                        </p>
                        <span v-if="repo.language" class="project-card__tag">{{ repo.language }}</span>
                    </div>

                    <a :href="repo.html_url" target="_blank" rel="noopener noreferrer" class="project-card__link">
                        Ver repositorio
                    </a>
                </article>
            </div>
        </section>
    </div>
</template>

<style scoped>
.portfolio-page {
    width: min(1080px, 92vw);
    margin: 0 auto;
    padding: 2.5rem 0 4rem;
}

.hero {
    display: grid;
    justify-items: center;
    text-align: center;
    gap: 1rem;
    padding: 1.25rem 0 3rem;
}

.hero__avatar-wrap {
    width: 148px;
    aspect-ratio: 1 / 1;
    border-radius: 999px;
    padding: 4px;
    border: 1px solid var(--border-soft);
    background: linear-gradient(160deg, rgba(245, 242, 235, 0.18), rgba(19, 39, 61, 0.95));
    box-shadow: var(--shadow-soft);
}

.hero__avatar {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 999px;
}

.hero__name {
    font-size: clamp(2rem, 7vw, 3.1rem);
    letter-spacing: -0.02em;
}

.hero__title {
    color: var(--ivory-muted);
    text-transform: uppercase;
    letter-spacing: 0.15em;
    font-size: 0.87rem;
}

.hero__socials {
    display: flex;
    gap: 1rem;
}

.hero__socials a {
    display: inline-grid;
    place-items: center;
    width: 2.75rem;
    height: 2.75rem;
    border-radius: 999px;
    border: 1px solid rgba(245, 242, 235, 0.25);
    color: var(--ivory);
    transition: transform 0.2s ease, border-color 0.2s ease;
}

.hero__socials a:hover {
    transform: translateY(-2px);
    border-color: rgba(245, 242, 235, 0.55);
}

.hero__socials i {
    font-size: 1.2rem;
}

.hero__actions {
    display: grid;
    gap: 0.85rem;
    width: min(100%, 360px);
}

.btn {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    border-radius: 999px;
    padding: 0.85rem 1.25rem;
    font-weight: 700;
    border: 1px solid transparent;
    transition: transform 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease;
}

.btn:hover {
    transform: translateY(-2px);
}

.btn--solid {
    background: var(--ivory);
    color: var(--midnight-blue);
}

.btn--solid:hover {
    box-shadow: 0 8px 24px rgba(245, 242, 235, 0.2);
}

.btn--outline {
    border-color: rgba(245, 242, 235, 0.35);
    color: var(--ivory);
    background: transparent;
}

.btn--outline:hover {
    background: rgba(245, 242, 235, 0.08);
}

.projects {
    padding-top: 1rem;
}

.projects h2 {
    font-size: clamp(1.35rem, 4vw, 2rem);
    margin-bottom: 1.25rem;
}

.projects__status {
    color: var(--ivory-muted);
    padding: 1rem 0;
}

.projects__status--error {
    color: #ffb4b4;
}

.projects__grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1rem;
}

.project-card {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-radius: var(--radius);
    background: var(--midnight-light);
    border: 1px solid rgba(245, 242, 235, 0.12);
    overflow: hidden;
    transition: transform 0.22s ease, border-color 0.22s ease;
}

.project-card:hover {
    transform: translateY(-4px);
    border-color: rgba(245, 242, 235, 0.35);
}

.project-card__content {
    padding: 1.25rem;
}

.project-card h3 {
    font-size: 1.1rem;
    margin-bottom: 0.7rem;
}

.project-card__description {
    color: var(--ivory-muted);
    margin-bottom: 1rem;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.project-card__tag {
    display: inline-block;
    padding: 0.3rem 0.7rem;
    border-radius: 999px;
    border: 1px solid rgba(245, 242, 235, 0.18);
    color: var(--ivory);
    font-size: 0.78rem;
}

.project-card__link {
    display: inline-flex;
    justify-content: center;
    padding: 0.95rem 1rem;
    border-top: 1px solid rgba(245, 242, 235, 0.1);
    font-weight: 600;
}

@media (min-width: 700px) {
    .hero__actions {
        grid-template-columns: 1fr 1fr;
        width: min(100%, 420px);
    }

    .portfolio-page {
        padding-top: 3rem;
    }
}
</style>