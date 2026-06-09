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
const portfolioUrl = 'https://daniel-silva-portfolio.vercel.app/'

const selectedRepos = ref<string[]>([
    'System_Stabilitation_Interpolation',
    'RealtimeVoiceAssistant',
    'Socket-Communication-System',
    'Socket-File-Sharing-Protocol',
    'Traffic_Simulation_Model',
    'FlowNet_Video_Stabilization',
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
    <!-- Fondos decorativos -->
    <div class="bg-blob bg-blob-top"></div>
    <div class="bg-blob bg-blob-bottom"></div>

    <section class="hero">
      <div class="hero__avatar-wrap">
        <div class="avatar-glow"></div>
        <img :src="avatarSrc" alt="Foto de perfil de Daniel Silva" class="hero__avatar" />
      </div>

      <h1 class="hero__name">
        <span class="text-gradient">Daniel Silva</span>
      </h1>
      <p class="hero__title">
        <span class="title-line"></span>
        Full Stack Developer
        <span class="title-line"></span>
      </p>

      <div class="hero__socials" aria-label="Redes sociales">
        <a :href="`https://github.com/${githubUsername}`" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
          <i class="fa-brands fa-github" aria-hidden="true"></i>
        </a>
        <a :href="linkedInUrl" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
          <i class="fa-brands fa-linkedin" aria-hidden="true"></i>
        </a>
      </div>

      <div class="hero__actions">
        <a href="https://wa.me/584142317561?text=Hola%20Daniel" class="btn btn--solid" target="_blank" rel="noopener noreferrer">
          <i class="fa-brands fa-whatsapp"></i> WhatsApp
        </a>
        <a :href="`mailto:${emailAddress}`" class="btn btn--outline">
          <i class="fa-regular fa-envelope"></i> Correo
        </a>
      </div>
    </section>

    <section class="projects" aria-labelledby="projects-title">
      <div class="section-header">
        <h2 id="projects-title">Proyectos Destacados</h2>
        <div class="header-decoration"></div>
      </div>

      <div v-if="loading" class="projects__status">
        <div class="spinner"></div>
        <p>Cargando innovación...</p>
      </div>
      <p v-else-if="error" class="projects__status projects__status--error">
        <i class="fa-solid fa-triangle-exclamation"></i> {{ error }}
      </p>

      <div v-else class="projects__grid">
        <article v-for="(repo, index) in repos" :key="repo.id" class="project-card" :style="{ animationDelay: `${index * 0.15}s` }">
          <div class="project-card__content">
            <div class="project-card__header">
              <h3>{{ repo.name }}</h3>
              <a :href="repo.html_url" target="_blank" rel="noopener noreferrer" class="project-card__icon" aria-label="Ver repositorio">
                <i class="fa-solid fa-arrow-up-right-from-square"></i>
              </a>
            </div>
            <p class="project-card__description">
              {{ repo.description || 'Explora el código fuente y la arquitectura de este proyecto directamente en GitHub.' }}
            </p>
            <div class="project-card__footer">
              <span v-if="repo.language" class="project-card__tag">
                <span class="tag-dot"></span> {{ repo.language }}
              </span>
            </div>
          </div>
        </article>
      </div>
    </section>
  </div>
</template>

<style scoped>
.portfolio-page {
  width: min(1200px, 90vw);
  margin: 0 auto;
  padding: 3rem 0 5rem;
  position: relative;
}

/* BLOB DECORATIVO FONDO */
.bg-blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(140px);
  z-index: -1;
  pointer-events: none;
  animation: pulse-blob 12s infinite alternate ease-in-out;
}

.bg-blob-top {
  top: -5%;
  left: -15%;
  width: 50vw;
  max-width: 600px;
  aspect-ratio: 1/1;
  background: rgba(245, 242, 235, 0.06); 
}

.bg-blob-bottom {
  bottom: 0%;
  right: -10%;
  width: 60vw;
  max-width: 600px;
  aspect-ratio: 1/1;
  background: rgba(0, 229, 255, 0.04); 
  animation-delay: -6s;
}

@keyframes pulse-blob {
  0% { transform: scale(1) translate(0, 0); opacity: 0.6; }
  100% { transform: scale(1.1) translate(30px, -30px); opacity: 0.9; }
}

/* HERO SECTION */
.hero {
  display: grid;
  justify-items: center;
  text-align: center;
  gap: 1.2rem;
  padding: 4rem 0 6rem;
}

.hero__avatar-wrap {
  width: 170px;
  aspect-ratio: 1 / 1;
  position: relative;
  margin-bottom: 0.5rem;
  animation: float-avatar 6s ease-in-out infinite;
}

.avatar-glow {
  position: absolute;
  inset: -8px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(245, 242, 235, 0.25) 0%, transparent 70%);
  z-index: 0;
  filter: blur(12px);
}

.hero__avatar {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
  position: relative;
  z-index: 1;
  border: 3px solid rgba(245, 242, 235, 0.85);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.4);
}

@keyframes float-avatar {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-12px); }
}

.hero__name {
  font-size: clamp(2.8rem, 8vw, 4.5rem);
  letter-spacing: -0.03em;
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: -0.2rem;
}

.text-gradient {
  background: linear-gradient(135deg, #ffffff 10%, var(--ivory) 50%, #9ca3af 90%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  display: inline-block;
}

.hero__title {
  color: var(--ivory-muted);
  text-transform: uppercase;
  letter-spacing: 0.25em;
  font-size: 0.95rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.title-line {
  width: 50px;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--ivory-muted), transparent);
}

.hero__socials {
  display: flex;
  gap: 1.25rem;
  margin: 1rem 0;
}

.hero__socials a {
  display: inline-grid;
  place-items: center;
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
  border: 1px solid rgba(245, 242, 235, 0.15);
  background: rgba(19, 39, 61, 0.5); 
  color: var(--ivory);
  font-size: 1.4rem;
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1); 
}

.hero__socials a:hover {
  transform: translateY(-8px) scale(1.1);
  border-color: var(--ivory);
  background: var(--ivory);
  color: var(--midnight-blue);
  box-shadow: 0 10px 25px rgba(245, 242, 235, 0.25);
}

.hero__actions {
  display: grid;
  gap: 1.2rem;
  width: min(100%, 420px);
  margin-top: 1rem;
}

.btn {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  gap: 0.75rem;
  border-radius: 999px;
  padding: 1rem 2rem;
  font-weight: 700;
  font-size: 1.05rem;
  letter-spacing: 0.02em;
  border: 1px solid transparent;
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.btn--solid {
  background: var(--ivory);
  color: var(--midnight-blue);
  box-shadow: 0 4px 15px rgba(245, 242, 235, 0.1);
}

.btn--solid:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 30px rgba(245, 242, 235, 0.3);
  background: #ffffff;
}

.btn--outline {
  border-color: rgba(245, 242, 235, 0.4);
  color: var(--ivory);
  background: transparent;
  backdrop-filter: blur(5px);
}

.btn--outline:hover {
  background: rgba(245, 242, 235, 0.1);
  border-color: var(--ivory);
  transform: translateY(-3px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

/* PROJECTS SECTION */
.projects {
  padding-top: 2rem;
}

.section-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 4rem;
}

.projects h2 {
  font-size: clamp(2rem, 5vw, 2.7rem);
  font-weight: 800;
  color: var(--ivory);
  margin-bottom: 0.5rem;
  letter-spacing: -0.02em;
}

.header-decoration {
  width: 70px;
  height: 4px;
  background: linear-gradient(90deg, transparent, var(--ivory), transparent);
  border-radius: 2px;
  box-shadow: 0 0 15px rgba(245, 242, 235, 0.5);
}

.projects__status {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  color: var(--ivory-muted);
  padding: 4rem 0;
  font-size: 1.2rem;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  font-weight: 600;
}

.spinner {
  width: 48px;
  height: 48px;
  border: 4px solid rgba(245, 242, 235, 0.05);
  border-top-color: var(--ivory);
  border-right-color: var(--ivory);
  border-radius: 50%;
  animation: spin 1s infinite cubic-bezier(0.55, 0.15, 0.45, 0.85);
}

@keyframes spin {
  100% { transform: rotate(360deg); }
}

.projects__status--error {
  color: #ffb4b4;
  flex-direction: row;
  justify-content: center;
  background: rgba(255, 180, 180, 0.05);
  padding: 2rem;
  border-radius: 16px;
  border: 1px solid rgba(255, 180, 180, 0.2);
}

.projects__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(45vh, 1fr));
  gap: 2.5rem;
}

/* CARDS CON GLASSMORPHISM AVANZADO */
.project-card {
  background: linear-gradient(145deg, rgba(19, 39, 61, 0.5) 0%, rgba(10, 27, 45, 0.8) 100%);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(245, 242, 235, 0.08);
  border-radius: 20px;
  position: relative;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  animation: fadeUp 0.8s ease-out backwards;
  display: flex;
  flex-direction: column;
}

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(40px); }
  to { opacity: 1; transform: translateY(0); }
}

.project-card::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 20px;
  padding: 2px;
  background: linear-gradient(135deg, rgba(245, 242, 235, 0.3), transparent 40%, rgba(245, 242, 235, 0.1));
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  opacity: 0;
  transition: opacity 0.4s ease;
  pointer-events: none;
}

.project-card:hover {
  transform: translateY(-12px) scale(1.02);
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5), 0 0 30px rgba(245, 242, 235, 0.05);
  background: linear-gradient(145deg, rgba(25, 45, 68, 0.8) 0%, rgba(10, 27, 45, 0.95) 100%);
  border-color: transparent; 
}

.project-card:hover::before {
  opacity: 1;
}

.project-card__content {
  padding: 2.5rem 2rem;
  display: flex;
  flex-direction: column;
  height: 100%;
  position: relative;
  z-index: 1;
}

.project-card__header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 1.2rem;
}

.project-card__header h3 {
  font-size: 1.4rem;
  font-weight: 700;
  line-height: 1.3;
  color: var(--ivory);
  flex: 1;
}

.project-card__icon {
  color: var(--ivory-muted);
  font-size: 1.25rem;
  padding: 0.6rem;
  border-radius: 50%;
  background: rgba(245, 242, 235, 0.05);
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  display: flex;
  align-items: center;
  justify-content: center;
}

.project-card__icon:hover {
  background: var(--ivory);
  color: var(--midnight-blue);
  transform: rotate(15deg) scale(1.15);
  box-shadow: 0 5px 15px rgba(245, 242, 235, 0.3);
}

.project-card__description {
  color: var(--ivory-muted);
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 2.5rem;
  flex-grow: 1;
  display: -webkit-box;
  line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
text-align: justify;
}

.project-card__footer {
  border-top: 1px solid rgba(245, 242, 235, 0.08);
  padding-top: 1.5rem;
  display: flex;
  align-items: center;
}

.project-card__tag {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 999px;
  background: rgba(19, 39, 61, 0.8);
  border: 1px solid rgba(245, 242, 235, 0.1);
  color: var(--ivory);
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 0.03em;
  box-shadow: inset 0 2px 5px rgba(0,0,0,0.2);
}

.tag-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #00e5ff; 
  box-shadow: 0 0 10px rgba(0, 229, 255, 0.8);
}

/* RESPONSIVE */
@media (min-width: 768px) {
  .hero__actions {
    grid-template-columns: 1fr 1fr;
    width: min(100%, 460px);
  }
}
</style>
