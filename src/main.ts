import { ViteSSG } from 'vite-ssg'
import { createPinia } from 'pinia'

import App from './App.vue'
import { LANG_KEY, PAGE_KEY, createLangState, createPageState, langForPath, pageForPath } from './composables/useI18n'
import { initAnalytics } from './composables/useAnalytics'

// Dos rutas reales, una por idioma: vite-ssg prerenderiza cada una a su propio
// HTML (/ y /es) para que cada versión tenga contenido indexable, su idioma y
// su canonical, en vez de depender de un toggle en cliente.
export const createApp = ViteSSG(
  App,
  {
    routes: [
      { path: '/', component: App },
      { path: '/es', component: App },
      { path: '/services', component: App },
      { path: '/es/services', component: App },
    ],
  },
  ({ app, routePath, isClient }) => {
    app.use(createPinia())
    // El idioma se fija antes de renderizar y por instancia de app: durante el
    // prerender lo da vite-ssg en routePath, en el navegador la URL cargada.
    const path = isClient ? window.location.pathname : (routePath ?? '/')
    app.provide(LANG_KEY, createLangState(langForPath(path)))
    app.provide(PAGE_KEY, createPageState(pageForPath(path)))
    if (isClient) initAnalytics(langForPath(path))
  },
)
