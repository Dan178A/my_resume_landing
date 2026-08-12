import { ViteSSG } from 'vite-ssg'
import { createPinia } from 'pinia'

import App from './App.vue'

// ViteSSG prerenderiza la app a HTML estático en el build, de modo que crawlers
// y lectores de IA (que no ejecutan JavaScript) reciban el contenido completo.
export const createApp = ViteSSG(
  App,
  { routes: [{ path: '/', component: App }] },
  ({ app }) => {
    app.use(createPinia())
  },
)
