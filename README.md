<div align="center">

<img src="public/1699966173589.jpg" width="120" height="120" style="border-radius:50%;object-fit:cover;" alt="Daniel Silva" />

# Daniel Silva — Portfolio & Resume Landing

**Ingeniero de Software Full Stack & IA** · Visión por computadora · Sistemas en tiempo real · Web end-to-end

[![Live Demo](https://img.shields.io/badge/🔴_LIVE_DEMO-my--resume--landing.vercel.app-00c896?style=for-the-badge)](https://my-resume-landing.vercel.app/)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Daniel_Silva-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/daniel-alejandro-silva-rojas/)
[![GitHub](https://img.shields.io/badge/GitHub-Dan178A-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Dan178A)
[![Email](https://img.shields.io/badge/Email-dsrglrm%40gmail.com-EA4335?style=for-the-badge&logo=gmail&logoColor=white)](mailto:dsrglrm@gmail.com)

![Vue 3](https://img.shields.io/badge/Vue.js-3.5-4FC08D?style=flat-square&logo=vuedotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=flat-square&logo=vite&logoColor=white)
![Pinia](https://img.shields.io/badge/State-Pinia-FFD24C?style=flat-square&logo=vuedotjs&logoColor=black)
![Vue Router](https://img.shields.io/badge/Router-Vue_Router-4FC08D?style=flat-square&logo=vuedotjs&logoColor=white)
![Vitest](https://img.shields.io/badge/Tested_with-Vitest-6E9F18?style=flat-square&logo=vitest&logoColor=white)
![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000000?style=flat-square&logo=vercel&logoColor=white)

**[🇪🇸 Leer en Español](#-español)** &nbsp;·&nbsp; **[🇬🇧 Read in English](#-english)**

</div>

<br/>

<div align="center">
  <img src="screencapture-my-resume-landing-vercel-app-2026-09-01-12_27_30.png" alt="Preview del portafolio de Daniel Silva" width="820" />
</div>

<br/>

---

## 🇪🇸 Español

### ✨ Sobre el proyecto

Este repositorio contiene el código fuente de mi **portafolio / landing de currículum**: una single-page application construida con **Vue 3 + Vite + TypeScript** y pre-renderizada con **vite-ssg** para SEO real, que sirve como carta de presentación técnica. No es una plantilla genérica: todo el contenido (experiencia, proyectos, stack) se gestiona como datos tipados en TypeScript, con soporte bilingüe **ES/EN** nativo, animaciones cuidadas (aurora background, tilt 3D, spotlight, marquee, count-up), un caso de estudio en profundidad de mi proyecto insignia (**DropAudio CCS**, e-commerce en producción) y un visor de CV con 4 variantes (idioma × perfil).

> 5+ años enviando software a producción en paralelo a mi formación universitaria: visión por computadora aplicada a la industria, asistentes de IA en tiempo real y plataformas web de extremo a extremo.

### 🚀 Demo en vivo

**[my-resume-landing.vercel.app →](https://my-resume-landing.vercel.app/)**

### 🧩 Características

| | |
|---|---|
| 🌐 **i18n propio (ES/EN)** | Sistema de traducción ligero sin dependencias, con detección automática de idioma del navegador y persistencia en `localStorage`. |
| 📄 **CV multi-perfil** | Visor de PDF embebido con 4 combinaciones (Español/Inglés × Full Stack/Backend & IA). |
| 🏆 **Caso de estudio destacado** | Sección dedicada a DropAudio CCS con métricas animadas (count-up), features y enlaces a demo en vivo. |
| 🗂️ **Proyectos filtrables** | Catálogo de 13 proyectos con filtro por categoría (Computer Vision, IA, Web, APIs) y modal de detalle enriquecido (arquitectura, stack, cómo ejecutarlo). |
| 🔌 **Enriquecimiento con la API de GitHub** | Los proyectos públicos consultan metadata en vivo (lenguaje, URL) desde la API de GitHub, con fallback a datos locales si la API falla o el repo es privado. |
| ⚡ **Rendimiento y SEO** | Pre-renderizado estático (`vite-ssg`), JSON-LD estructurado, sitemap, `robots.txt` y `llms.txt` para motores de búsqueda y agentes de IA. |
| 🎨 **UI premium** | Fondo tipo aurora, efecto tilt 3D en tarjetas, spotlight cursor-aware, marquee de tecnologías y animaciones de conteo respetando `prefers-reduced-motion`. |

### 🛠️ Stack tecnológico

**Frontend**
`Vue 3` · `TypeScript` · `Vite 8` · `vite-ssg` (SSG) · `Pinia` · `Vue Router` · `Font Awesome`

**Testing & tooling**
`Vitest` · `@vue/test-utils` · `vue-tsc` · `jsdom`

**Contenido representado en el portafolio** (mi stack real de trabajo)
`Python` · `Rust` · `C++` · `Nuxt 3` · `Supabase / PostgreSQL` · `FastAPI` · `gRPC` · `PyTorch` · `OpenCV` · `Redis` · `AWS` · `Docker` · `Vercel`

### 📁 Estructura del proyecto

```
my_resume_landing/
├── public/                       # Estáticos: CVs (PDF), avatar, robots.txt, sitemap.xml, llms.txt
├── src/
│   ├── assets/main.css           # Estilos globales y variables de diseño
│   ├── components/
│   │   └── Portfolio.vue         # Landing principal: hero, impacto, experiencia, proyectos, contacto
│   ├── composables/
│   │   ├── useI18n.ts            # Sistema i18n ligero ES/EN (sin dependencias)
│   │   └── projectDetails.ts     # Contenido enriquecido por proyecto para el modal de detalle
│   ├── router/index.ts
│   ├── stores/counter.ts
│   ├── __tests__/App.spec.ts     # Pruebas con Vitest
│   ├── App.vue
│   └── main.ts
├── index.html                    # Meta tags, Open Graph, JSON-LD (SEO/GEO)
├── vite.config.ts / vitest.config.ts
└── package.json
```

### ⚙️ Instalación y uso local

Requisitos: Node.js `^20.19.0` o `>=22.12.0`.

```bash
# 1. Clonar el repositorio
git clone https://github.com/Dan178A/my_resume_landing.git
cd my_resume_landing

# 2. Instalar dependencias
npm install

# 3. Levantar el entorno de desarrollo
npm run dev

# 4. Compilar para producción (type-check + build estático)
npm run build

# 5. Previsualizar el build de producción
npm run preview

# 6. Correr las pruebas unitarias
npm run test:unit
```

### 📌 Proyectos destacados dentro del portafolio

| Proyecto | Stack | Categoría |
|---|---|---|
| **[DropAudio CCS](https://dropaudioccs.com)** — e-commerce en producción con panel de administración, checkout multimoneda y recomendador de audio | Nuxt 3 · Supabase · PostgreSQL | Web |
| **RealtimeVoiceAssistant** — asistente de voz conversacional en tiempo real con Gemini Live | Rust · Python · Gemini | IA |
| **System_Stabilitation_Interpolation** — tesis de grado: estabilización de video con mallas de movimiento | Python · OpenCV | Computer Vision |
| **FlowNet_Video_Stabilization** — estabilización de video con deep learning (optical flow) | Python · PyTorch | Computer Vision |
| **Camara_OCR_Python** — monitoreo industrial por cámara con OCR para inspección de tambores de coque | Python · OCR | Computer Vision |
| **extract-rif** — microservicio que extrae datos estructurados de documentos fiscales | FastAPI · PaddleOCR | API |
| **bolsa-valores-caracas-api** — API pública con datos de la Bolsa de Valores de Caracas | FastAPI · Selenium | API |

*El detalle completo, con arquitectura, decisiones técnicas y capturas, está disponible en la sección "Proyectos" del [portafolio en vivo](https://my-resume-landing.vercel.app/).*

### 👨‍💻 Sobre mí

**Ingeniero de Software Senior — Full Stack & IA**, con sede en Caracas, Venezuela, disponible para roles remotos.

- **Lead Performance & Systems Engineer** en Ea2technology (Canadá, remoto) — Digital Twin industrial y arquitectura WebSocket full-duplex que redujo la latencia de 200–500 ms a 1–10 ms.
- **Fundador & Arquitecto de Software** de DropAudio CCS — e-commerce en producción sobre Nuxt 3 + Supabase, con 94+ reseñas verificadas.
- **Consultor de Rendimiento & Ingeniero de Algoritmos** (freelance, sector marítimo/petrolero) — motores de estabilización de video con optical flow y FlowNet.
- **B.Sc. en Ciencias de la Computación** — LUZ-IUTA, Universidad del Zulia.

### 📬 Contacto

[![WhatsApp](https://img.shields.io/badge/WhatsApp-Escríbeme-25D366?style=for-the-badge&logo=whatsapp&logoColor=white)](https://wa.me/584142317561)
[![Email](https://img.shields.io/badge/Email-dsrglrm%40gmail.com-EA4335?style=for-the-badge&logo=gmail&logoColor=white)](mailto:dsrglrm@gmail.com)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Conectemos-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/daniel-alejandro-silva-rojas/)

<br/>

---

## 🇬🇧 English

### ✨ About the project

This repository holds the source code of my **portfolio / resume landing page**: a single-page application built with **Vue 3 + Vite + TypeScript** and pre-rendered with **vite-ssg** for real SEO, serving as my technical calling card. It's not a generic template — every piece of content (experience, projects, tech stack) is managed as typed TypeScript data, with native **ES/EN** bilingual support, polished animations (aurora background, 3D tilt, cursor-aware spotlight, marquee, count-up stats), an in-depth case study of my flagship project (**DropAudio CCS**, a live e-commerce platform), and a multi-profile resume viewer (4 combinations).

> 5+ years shipping software to production alongside my degree: computer vision applied to industry, real-time AI assistants, and end-to-end web platforms.

### 🚀 Live demo

**[my-resume-landing.vercel.app →](https://my-resume-landing.vercel.app/)**

### 🧩 Features

| | |
|---|---|
| 🌐 **Custom i18n (ES/EN)** | Lightweight, dependency-free translation system with automatic browser-language detection and `localStorage` persistence. |
| 📄 **Multi-profile resume** | Embedded PDF viewer with 4 combinations (Spanish/English × Full Stack/Backend & AI). |
| 🏆 **Flagship case study** | A dedicated section for DropAudio CCS with animated count-up metrics, feature highlights and links to the live demo. |
| 🗂️ **Filterable project catalog** | 13 curated projects filterable by category (Computer Vision, AI, Web, APIs) with a rich detail modal (architecture, stack, how to run it). |
| 🔌 **GitHub API enrichment** | Public projects fetch live metadata (language, URL) from the GitHub API, falling back to local data if the API fails or the repo is private. |
| ⚡ **Performance & SEO** | Static pre-rendering (`vite-ssg`), structured JSON-LD, sitemap, `robots.txt` and `llms.txt` for search engines and AI agents. |
| 🎨 **Premium UI** | Aurora-style background, 3D tilt on cards, cursor-aware spotlight, tech marquee, and count-up animations that respect `prefers-reduced-motion`. |

### 🛠️ Tech stack

**Frontend**
`Vue 3` · `TypeScript` · `Vite 8` · `vite-ssg` (SSG) · `Pinia` · `Vue Router` · `Font Awesome`

**Testing & tooling**
`Vitest` · `@vue/test-utils` · `vue-tsc` · `jsdom`

**Represented throughout the portfolio content** (my day-to-day stack)
`Python` · `Rust` · `C++` · `Nuxt 3` · `Supabase / PostgreSQL` · `FastAPI` · `gRPC` · `PyTorch` · `OpenCV` · `Redis` · `AWS` · `Docker` · `Vercel`

### 📁 Project structure

```
my_resume_landing/
├── public/                       # Static assets: resumes (PDF), avatar, robots.txt, sitemap.xml, llms.txt
├── src/
│   ├── assets/main.css           # Global styles & design tokens
│   ├── components/
│   │   └── Portfolio.vue         # Main landing: hero, impact, experience, projects, contact
│   ├── composables/
│   │   ├── useI18n.ts            # Lightweight, dependency-free ES/EN i18n
│   │   └── projectDetails.ts     # Rich per-project content for the detail modal
│   ├── router/index.ts
│   ├── stores/counter.ts
│   ├── __tests__/App.spec.ts     # Vitest unit tests
│   ├── App.vue
│   └── main.ts
├── index.html                    # Meta tags, Open Graph, JSON-LD (SEO/GEO)
├── vite.config.ts / vitest.config.ts
└── package.json
```

### ⚙️ Local setup

Requirements: Node.js `^20.19.0` or `>=22.12.0`.

```bash
# 1. Clone the repository
git clone https://github.com/Dan178A/my_resume_landing.git
cd my_resume_landing

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev

# 4. Build for production (type-check + static build)
npm run build

# 5. Preview the production build
npm run preview

# 6. Run unit tests
npm run test:unit
```

### 📌 Featured projects inside the portfolio

| Project | Stack | Category |
|---|---|---|
| **[DropAudio CCS](https://dropaudioccs.com)** — production e-commerce with an admin panel, multi-currency checkout and an audio recommender | Nuxt 3 · Supabase · PostgreSQL | Web |
| **RealtimeVoiceAssistant** — real-time conversational voice assistant with Gemini Live | Rust · Python · Gemini | AI |
| **System_Stabilitation_Interpolation** — undergraduate thesis: video stabilization with motion meshes | Python · OpenCV | Computer Vision |
| **FlowNet_Video_Stabilization** — deep-learning video stabilization (optical flow) | Python · PyTorch | Computer Vision |
| **Camara_OCR_Python** — industrial camera monitoring with OCR for coke-drum inspection | Python · OCR | Computer Vision |
| **extract-rif** — microservice extracting structured data from fiscal documents | FastAPI · PaddleOCR | API |
| **bolsa-valores-caracas-api** — public API serving Caracas Stock Exchange data | FastAPI · Selenium | API |

*Full details — architecture, technical decisions and screenshots — are available in the "Projects" section of the [live portfolio](https://my-resume-landing.vercel.app/).*

### 👨‍💻 About me

**Senior Software Engineer — Full Stack & AI**, based in Caracas, Venezuela, available for remote roles.

- **Lead Performance & Systems Engineer** at Ea2technology (Canada, remote) — industrial Digital Twin and a full-duplex WebSocket architecture that cut latency from 200–500 ms to 1–10 ms.
- **Founder & Software Architect** of DropAudio CCS — a production e-commerce platform on Nuxt 3 + Supabase with 94+ verified reviews.
- **Software Performance Consultant & Algorithm Engineer** (freelance, maritime/oil sector) — video stabilization engines using optical flow and FlowNet.
- **B.Sc. in Computer Science** — LUZ-IUTA, University of Zulia.

### 📬 Contact

[![WhatsApp](https://img.shields.io/badge/WhatsApp-Message_me-25D366?style=for-the-badge&logo=whatsapp&logoColor=white)](https://wa.me/584142317561)
[![Email](https://img.shields.io/badge/Email-dsrglrm%40gmail.com-EA4335?style=for-the-badge&logo=gmail&logoColor=white)](mailto:dsrglrm@gmail.com)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Let's_connect-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/daniel-alejandro-silva-rojas/)

<br/>

---

<div align="center">

Diseñado y construido por **Daniel Silva** · Designed and built by **Daniel Silva**

*Código de portafolio personal — disponible para consulta y referencia técnica.*
*Personal portfolio code — available for review and technical reference.*

</div>
