<script setup>
import { ref, onMounted } from 'vue'

// --- CONFIGURACIÓN PERSONALIZABLE ---
const githubUsername = 'TU_USUARIO_DE_GITHUB'
const emailAddress = 'tu-correo@email.com'
const whatsappNumber = '584120000000' // Código de país + número sin espacios
const linkedinUrl = 'https://linkedin.com/in/tu-perfil'

// Lista de los nombres exactos de los repositorios que quieres que se vean
const selectedRepos = [
  'sistema-estabilizacion',
  'websocket-architecture',
  'high-performance-api'
]
// ------------------------------------

const repos = ref([])
const loading = ref(true)
const error = ref(null)

const fetchGitHubProjects = async () => {
  try {
    const response = await fetch(`https://api.github.com/users/${githubUsername}/repos?sort=updated&per_page=100`)
    if (!response.ok) throw new Error('No se pudo conectar con GitHub')
    const data = await response.json()
    
    // Filtramos los repositorios para que coincidan exactamente con tu selección
    repos.value = data.filter(repo => selectedRepos.includes(repo.name))
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchGitHubProjects()
})
</script>

<template>
  <div class="portfolio-container">
    <header class="hero-section">
      <div class="hero-content">
        <div class="profile-frame">
          <img src="/avatar.jpg" alt="Foto de Perfil" class="profile-img" />
        </div>
        <h1 class="dev-name">Daniel Silva</h1>
        <p class="dev-title">Full Stack Developer</p>
        
        <div class="social-links">
          <a :href="`https://github.com/${githubUsername}`" target="_blank" aria-label="GitHub" class="social-icon">
            <i class="fab fa-github"></i> GitHub
          </a>
          <a :href="linkedinUrl" target="_blank" aria-label="LinkedIn" class="social-icon">
            <i class="fab fa-linkedin"></i> LinkedIn
          </a>
        </div>

        <div class="cta-container">
          <a :href="`https://wa.me/${whatsappNumber}?text=Hola%20Daniel,%20vi%20tu%20portafolio%20y%20me%20gustaría%20conversar.`" 
             target="_blank" 
             class="cta-btn whatsapp-btn">
            <i class="fab fa-whatsapp"></i> Contactar por WhatsApp
          </a>
          <a :href="`mailto:${emailAddress}?subject=Oportunidad%20o%20Proyecto`" 
             class="cta-btn email-btn">
            <i class="far fa-envelope"></i> Enviar Correo
          </a>
        </div>
      </div>
    </header>

    <main class="projects-section">
      <h2 class="section-title">Proyectos Seleccionados</h2>
      
      <div v-if="loading" class="status-msg">Cargando la arquitectura de proyectos...</div>
      <div v-else-if="error" class="status-msg error">{{ error }}</div>
      
      <div v-else class="projects-grid">
        <article v-for="repo in repos" :key="repo.id" class="project-card">
          <div class="card-body">
            <h3 class="repo-title">{{ repo.name.replace(/-/g, ' ') }}</h3>
            <p class="repo-description">
              {{ repo.description || 'Sin descripción disponible en el repositorio.' }}
            </p>
            <div class="repo-tech" v-if="repo.language">
              <span class="tech-tag">{{ repo.language }}</span>
            </div>
          </div>
          <div class="card-footer">
            <a :href="repo.html_url" target="_blank" class="repo-link">
              Ver Repositorio <i class="fas fa-arrow-right"></i>
            </a>
          </div>
        </article>
      </div>
    </main>
  </div>
</template>

<style scoped>
.portfolio-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

/* --- HERO SECTION --- */
.hero-section {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 4rem 1rem;
  border-bottom: 1px solid var(--midnight-lighter);
}

.profile-frame {
  width: 160px;
  height: 160px;
  margin: 0 auto 1.5rem;
  border-radius: 50%;
  padding: 4px;
  background: linear-gradient(135deg, var(--ivory), var(--midnight-lighter));
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
}

.profile-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
  background-color: var(--midnight-blue);
}

.dev-name {
  font-size: 2.8rem;
  font-weight: 800;
  color: var(--ivory);
  letter-spacing: -0.03em;
  margin-bottom: 0.5rem;
}

.dev-title {
  font-size: 1.2rem;
  color: var(--ivory-muted);
  text-transform: uppercase;
  letter-spacing: 0.15em;
  margin-bottom: 1.5rem;
}

.social-links {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin-bottom: 2.5rem;
}

.social-icon {
  font-size: 0.95rem;
  color: var(--ivory-muted);
  transition: color 0.3s ease;
}

.social-icon:hover {
  color: var(--ivory);
}

/* --- CALL TO ACTION (CTAs) --- */
.cta-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

@media (min-width: 640px) {
  .cta-container {
    flex-direction: row;
    justify-content: center;
  }
}

.cta-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 0.85rem 2rem;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 8px;
  width: 100%;
  max-width: 280px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.whatsapp-btn {
  background-color: var(--ivory);
  color: var(--midnight-blue);
}

.email-btn {
  background-color: transparent;
  color: var(--ivory);
  border: 2px solid var(--midnight-lighter);
}

.cta-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

.email-btn:hover {
  background-color: var(--midnight-lighter);
}

/* --- PROJECTS SECTION --- */
.projects-section {
  padding: 4rem 1rem;
}

.section-title {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 2.5rem;
  text-align: center;
}

/* Grid Responsivo Inteligente */
.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
}

.project-card {
  background-color: var(--midnight-lighter);
  border: 1px solid rgba(245, 242, 235, 0.05);
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: transform 0.3s ease, border-color 0.3s ease;
}

.project-card:hover {
  transform: translateY(-4px);
  border-color: rgba(245, 242, 235, 0.2);
}

.card-body {
  padding: 2rem;
}

.repo-title {
  font-size: 1.3rem;
  color: var(--ivory);
  margin-bottom: 0.75rem;
  text-transform: capitalize;
}

.repo-description {
  color: var(--ivory-muted);
  font-size: 0.95rem;
  margin-bottom: 1.5rem;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  color: var(--ivory);
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
}

.card-footer {
  padding: 1.5rem 2rem;
  border-top: 1px solid rgba(245, 242, 235, 0.05);
}

.repo-link {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--ivory);
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.status-msg {
  text-align: center;
  color: var(--ivory-muted);
  padding: 3rem;
}
</style>