<script setup lang="ts">
import { useHead } from '@unhead/vue'
import './assets/main.css'
import Portfolio from './components/Portfolio.vue'
import { useI18n, usePage, pathForLang } from './composables/useI18n'

const SITE = 'https://www.danielsilvarojas.dev'

/* main.ts ya fijó el idioma a partir de la ruta antes de renderizar.
   Los metadatos se leen una sola vez, sin computed: durante el prerender un
   valor reactivo se serializaría con el idioma de la última página renderizada
   y las dos versiones saldrían con el mismo head. */
const { lang } = useI18n()
const page = usePage()

const seo = {
  en: {
    title: 'Daniel Silva — Senior Backend Engineer (Full-Stack) | Node.js · TypeScript · Python · Rust | Remote',
    description:
      'Daniel Silva (Daniel Alejandro Silva Rojas) — Senior Backend Engineer with full-stack delivery and 5+ years in production: real-time systems and WebSockets (1–10 ms latency), microservices on AWS, PostgreSQL, Docker and CI/CD. Node.js/TypeScript, Python, Rust, C++, Vue/Nuxt. Open to full-time remote roles; hireable as a contractor (W-8BEN) or via EOR.',
    social:
      'Senior Backend Engineer (full-stack), 5+ years in production: real-time systems at 1–10 ms, AWS microservices, PostgreSQL. Node.js/TypeScript, Python, Rust. Open to full-time remote roles.',
    locale: 'en_US',
    altLocale: 'es_ES',
    path: '/',
  },
  es: {
    title: 'Daniel Silva — Senior Backend Engineer (Full-Stack) | Node.js · TypeScript · Python · Rust | Remoto',
    description:
      'Daniel Silva (Daniel Alejandro Silva Rojas) — Senior Backend Engineer con entrega full-stack y 5+ años en producción: sistemas en tiempo real y WebSockets (1–10 ms), microservicios en AWS, PostgreSQL, Docker y CI/CD. Node.js/TypeScript, Python, Rust, C++, Vue/Nuxt. Disponible para roles remotos a tiempo completo.',
    social:
      'Senior Backend Engineer (full-stack), 5+ años en producción: tiempo real a 1–10 ms, microservicios en AWS, PostgreSQL. Node.js/TypeScript, Python, Rust. Disponible para roles remotos.',
    locale: 'es_ES',
    altLocale: 'en_US',
    path: '/es',
  },
} as const

const servicesSeo = {
  en: {
    title: 'Daniel Silva — Freelance Real-Time & Industrial Systems Engineer | Services and Rates',
    description: 'Freelance services by Daniel Silva: performance and architecture audits, custom real-time and offline-first systems, fractional systems engineering and landing pages with SEO/GEO. Clear scope and rates; paid via Deel, Payoneer or crypto.',
  },
  es: {
    title: 'Daniel Silva — Ingeniero Freelance de Sistemas en Tiempo Real e Industriales | Servicios y tarifas',
    description: 'Servicios freelance de Daniel Silva: auditorías de rendimiento y arquitectura, sistemas a medida en tiempo real y offline-first, ingeniero de sistemas fraccional y landings con SEO/GEO. Alcance y tarifas claras; pago vía Deel, Payoneer o cripto.',
  },
} as const

const base = seo[lang.value]
const meta = page.value === 'services'
  ? { ...base, ...servicesSeo[lang.value], social: servicesSeo[lang.value].description, path: pathForLang(lang.value, 'services') }
  : base
const canonical = SITE + meta.path

useHead({
  htmlAttrs: { lang: lang.value },
  title: meta.title,
  link: [{ rel: 'canonical', href: canonical }],
  meta: [
    { name: 'description', content: meta.description },
    { property: 'og:title', content: meta.title },
    { property: 'og:description', content: meta.social },
    { property: 'og:url', content: canonical },
    { property: 'og:locale', content: meta.locale },
    { property: 'og:locale:alternate', content: meta.altLocale },
    { name: 'twitter:title', content: meta.title },
    { name: 'twitter:description', content: meta.social },
  ],
})
</script>

<template>
  <Portfolio />
</template>
