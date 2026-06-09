<script setup lang="ts">
import './assets/main.css'
import Portfolio from './components/Portfolio.vue'
import { Analytics } from '@vercel/analytics/vue'
</script>

<template>
  <Analytics />
  <Portfolio />
</template>
