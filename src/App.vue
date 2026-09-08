<script setup lang="ts">
import { useHead } from '@unhead/vue'
import './assets/main.css'
import Portfolio from './components/Portfolio.vue'
import { useI18n } from './composables/useI18n'

const SITE = 'https://my-resume-landing.vercel.app'

/* main.ts ya fijó el idioma a partir de la ruta antes de renderizar.
   Los metadatos se leen una sola vez, sin computed: durante el prerender un
   valor reactivo se serializaría con el idioma de la última página renderizada
   y las dos versiones saldrían con el mismo head. */
const { lang } = useI18n()

const seo = {
  en: {
    title: 'Daniel Silva — Industrial Systems & Real-Time Software Engineer | Freelance & Remote',
    description:
      'Daniel Silva (Daniel Alejandro Silva Rojas) — software and systems engineer with 5 years and 4 production systems: real-time telemetry (1–10 ms), industrial IoT hardware control, offline-first architecture and applied AI. Rust, Python, TypeScript, Vue/Nuxt. Available for freelance projects and senior remote roles worldwide.',
    social:
      '5 years, 4 production systems: real-time telemetry at 1–10 ms, industrial IoT hardware control, offline-first architecture and applied AI. Available for freelance projects and senior remote roles.',
    locale: 'en_US',
    altLocale: 'es_ES',
    path: '/',
  },
  es: {
    title: 'Daniel Silva — Ingeniero de Software Industrial y Sistemas en Tiempo Real | Freelance y Remoto',
    description:
      'Daniel Silva (Daniel Alejandro Silva Rojas) — ingeniero de software y sistemas con 5 años y 4 sistemas en producción: telemetría en tiempo real (1–10 ms), control de hardware IoT industrial, arquitectura offline-first e IA aplicada. Rust, Python, TypeScript, Vue/Nuxt. Disponible para proyectos freelance y roles remotos senior.',
    social:
      '5 años, 4 sistemas en producción: telemetría en tiempo real a 1–10 ms, control de hardware IoT industrial, arquitectura offline-first e IA aplicada. Disponible para proyectos freelance y roles remotos senior.',
    locale: 'es_ES',
    altLocale: 'en_US',
    path: '/es',
  },
} as const

const meta = seo[lang.value]
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
