<script setup lang="ts">
import { computed } from 'vue'
import { useHead } from '@unhead/vue'
import './assets/main.css'
import Portfolio from './components/Portfolio.vue'
import { useI18n } from './composables/useI18n'

const { lang } = useI18n()

// El default de unhead (createHead) impone htmlAttrs.lang = "en" durante el
// prerender de vite-ssg, pisando el lang="es" del template. Declararlo aquí
// gana sobre el default y reacciona al toggle ES/EN del cliente.
useHead({
  htmlAttrs: { lang: computed(() => lang.value) },
})
</script>

<template>
  <Portfolio />
</template>
