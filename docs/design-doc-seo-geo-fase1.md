# Fase 1 — SEO/GEO técnico del portfolio

> Design doc generado con `gs-office-hours`. Alcance decidido por Daniel el 2026-09-02.
> Alimenta la revisión `gs-autoplan` (CEO scope review + design review + eng review) antes de implementar.

## 1. El dolor (con ejemplo concreto)

Daniel eligió como ejemplo más concreto: **"repo privado = callejón sin salida"** — cuando alguien
entra a un proyecto privado, el único CTA es un link a GitHub que no lleva a ningún lado útil, y ahí
se corta el interés.

Auditando el repo (`my_resume_landing`, Vue 3 + `vite-ssg`) para diagnosticar esto apareció un
problema **más grave y anterior**: la grilla completa de proyectos (los ~12 cards, con nombre,
descripción y stack) **no se renderiza en el HTML pre-generado (SSR)**. La variable `loading`
(`src/components/Portfolio.vue`) arranca en `true` y solo pasa a `false` dentro de `onMounted`, un
hook que **no se ejecuta durante el build de `vite-ssg`**. Verificado corriendo `npm run build` y
leyendo `dist/index.html` directamente:

- El HTML pre-renderizado contiene literalmente el texto **"Cargando innovación..."** donde debería
  estar la lista de proyectos.
- Ningún nombre de proyecto individual (`Camara_OCR_Python`, `RealtimeVoiceAssistant`,
  `System_Stabilitation_Interpolation`, etc.) aparece en el HTML estático — 0 coincidencias.
- `robots.txt` invita explícitamente a GPTBot, ClaudeBot, PerplexityBot, OAI-SearchBot y
  Google-Extended (buena intención de GEO), pero la mayoría de esos crawlers **no ejecutan
  JavaScript**, así que hoy reciben un spinner en vez del portafolio.

Es decir: antes de llegar al problema de "el repo privado no convence", hay un problema previo — la
mayoría de los proyectos ni siquiera son visibles para buscadores e IA generativa.

Segundo hallazgo relacionado: el toggle de idioma (ES/EN) es 100% client-side
(`document.documentElement.lang` + `localStorage`, ver `useI18n.ts`), no existe una URL `/en`. El
`sitemap.xml` sin embargo declara `hreflang="en"` apuntando a la **misma URL** que la versión en
español — eso es inválido según las directrices de Google para hreflang y puede confundir al
indexador. En la práctica, el contenido en inglés es invisible para cualquier crawler.

## 2. Quién más tiene este problema / benchmark

Uso único de Daniel (portfolio personal), pero el patrón es común en freelancers/ingenieros con
trabajo bajo NDA. Hoy lo "resuelven" dejando el link roto o quitando el proyecto del portfolio —
ambas malas. El benchmark real es su propio CV/LinkedIn, que tampoco resuelve esto bien (LinkedIn no
permite case studies con capturas + arquitectura).

## 3. Alcance de la v1 (decidido por Daniel)

**Fase 1 = SEO/GEO técnico de todo el sitio. Sin páginas de proyecto todavía.**

Las páginas de case-study para proyectos privados (idea original: página completa con capturas +
README estilizado en vez del link al repo si es privado; link normal si es público; "si quieren ver
el código, que me escriban") quedan como **Fase 2**, ya decidida en forma —rutas propias con diseño
cuidado vía `ui-ux-pro-max`, no el modal actual reciclado— pero fuera de esta entrega.

### No-goals explícitos de esta fase
- No se construyen páginas/rutas nuevas por proyecto.
- No se escribe contenido enriquecido tipo README para los ~10 proyectos que todavía no lo tienen en
  `projectDetails.ts`.
- No hay rediseño visual general del sitio.
- No se implementa un sitio bilingüe con URLs reales (`/en`) — se decide en Fase 2; en esta fase solo
  se corrige lo que hoy es **incorrecto** (el hreflang falso).

## 4. Enfoque elegido y por qué

Arreglar primero lo que le impide a Google/IA generativa **ver lo que ya existe**, antes de invertir
en contenido nuevo (páginas de proyecto). Priorizado por impacto:

**P0 — Renderizar la grilla de proyectos en SSR.**
No bloquear el render con `loading`: los ~12 proyectos ya están definidos localmente (nombre,
categoría, descripción, tech) y `repoUrl`/`repoTag` ya tienen fallback sin la API de GitHub
(`p.url ?? apiRepos.value.get(...)?.html_url ?? github.com/${user}/${p.name}`). La grilla puede
pintarse de inmediato con esos datos locales; el fetch a la API de GitHub pasa a ser un enriquecimiento
progresivo (mejora el tag de lenguaje) sin bloquear el contenido. Cambio acotado en
`Portfolio.vue` — sin nuevas dependencias.

**P0 — Quitar el hreflang falso.**
`sitemap.xml` no debe declarar una versión `en` en una URL que en realidad sirve el mismo HTML en
español. Se deja `x-default` únicamente hasta que exista una URL `/en` real (Fase 2/3).

**P1 — Enriquecer structured data (GEO).**
El `@graph` JSON-LD ya es sólido (Person/WebSite/ProfilePage con `sameAs`, `knowsAbout`, `worksFor`).
Se agrega: `ContactPoint` explícito, `FAQPage` con preguntas tipo "¿Daniel Silva está disponible para
trabajo remoto?" / "¿En qué stack trabaja?" (estas responden directamente al patrón de consulta que
usan ChatGPT/Perplexity), y `mainEntityOfPage` en los proyectos ya narrados en `llms.txt`.

**P1 — Completar `llms.txt`.**
Ya es fuerte (contacto, roles, skills, 4 proyectos destacados). Se agregan los proyectos restantes
en una línea cada uno y una nota explícita: "los repos marcados privados se comparten bajo pedido —
escribir a dsrglrm@gmail.com" — esto empuja exactamente el resultado que Daniel busca (que le
escriban) sin necesitar páginas nuevas todavía.

**P2 — Notas, no cambios en esta fase.**
`dist/` local estaba desactualizado (build roto de una corrida anterior, HTML vacío) pero está en
`.gitignore` — no afecta producción. Se verificó que `npm run build` limpio sí prerenderiza
correctamente (`data-server-rendered="true"`, título y contenido presentes). El bundle es liviano
(~181 KB JS / ~49 KB CSS), performance no es prioridad ahora.

## 5. Señal de éxito (elegida por Daniel, a una semana de publicado)

1. Google Search Console indexa las páginas/URLs sin errores y muestra impresiones.
2. Preguntarle a ChatGPT/Perplexity/Gemini "¿quién es Daniel Silva, ingeniero de software?" da una
   respuesta correcta y bien representada (nombre completo, stack, disponibilidad remota, DropAudio
   CCS).

## 6. Siguiente paso

Este doc es el input para la revisión automática (`gs-autoplan`: CEO scope review + design review +
engineering review) antes de tocar código.

## 7. Resultado de la revisión (`gs-autoplan`: CEO scope review + engineering review)

**Modo:** HOLD SCOPE — es un fix de algo roto (SSR no renderiza) + limpieza técnica sobre código
existente, no una feature nueva. Se aceptó el alcance de la Fase 1 tal cual, con foco en dejarlo sin
huecos en vez de expandirlo. El design review no aplicó (no hay UI nueva en esta fase, se reutiliza
el diseño existente).

**Hallazgo adicional que forzó el eng review (auto-resuelto, confirmado con Daniel):** al destrabar
el render del grid, dos proyectos apuntaban a un nombre de repo que no coincide con el real —
`extract-rif` (el repo público real es `extract_rif`) y `Web_SorteosEDJ` (el repo público real es
`SorteosEDJ`). Sin corregirlo, esos dos se habrían visto como "Privado" (mal etiquetados) incluso
siendo públicos. Se verificó contra la API pública de GitHub (`api.github.com/users/Dan178A/repos`)
y se corrigieron los nombres.

**Edge case real (data flow):** `visOf()` depende de `apiRepos`, que solo se llena tras el fetch en
`onMounted` — un hook que **no corre durante el build SSR**. Antes del fix esto quedaba oculto porque
nada se renderizaba; al destrabar el grid, sin más cambios, los 7 proyectos realmente públicos se
habrían mostrado como "Privado" en el HTML estático (justo el problema que esta fase busca resolver,
en la dirección contraria). Se agregó `knownPublicRepos`, un set estático con los repos ya
confirmados públicos, como fuente de verdad disponible en SSR — el fetch a la API sigue corriendo en
cliente solo para enriquecer el tag de lenguaje, ya no es responsable de la visibilidad inicial.

**Resultado verificado tras el fix (build limpio + inspección de `dist/index.html`):**
- 0 apariciones de "Cargando innovación..." — el grid completo (13 proyectos) está en el HTML
  pre-renderizado.
- Conteo de visibilidad en SSR: 1 `live` (DropAudio CCS), 7 `public`, 5 `private` — coincide 1:1 con
  lo confirmado por Daniel (Camara_OCR_Python, cyrpto_chart, Sistema-Rifa-JS, cashea_clone y
  bolsa-valores-caracas-api son privados/eliminados a propósito).
- `type-check` (vue-tsc) y `vitest run` pasan sin errores nuevos (hay un error de test preexistente
  y no relacionado: `window.matchMedia` no está mockeado en jsdom — ya existía antes de este cambio,
  no se tocó en esta fase).
- El `@graph` JSON-LD de `index.html` sigue siendo JSON válido con las 4 preguntas de `FAQPage` y el
  `contactPoint` agregados.

**Diferido a Fase 2 (registrado, no descartado):** páginas de case-study por proyecto privado (con
capturas + README estilizado), sitio bilingüe con URL `/en` real, separar el "slug de repo" del
"nombre para mostrar" como una limpieza de arquitectura menor (hoy siguen acoplados en el mismo campo
`name`, funciona pero es un acoplamiento a tener en cuenta si se agregan más proyectos).

**Status:** DONE.

## 8. Addendum — riesgo de confidencialidad en Camara_OCR_Python (fuera de plan, corregido)

Daniel detectó que la entrada `Camara_OCR_Python` en `projectDetails.ts` nombraba a un cliente
(VIAAC) y describía en detalle la arquitectura de su sistema de inspección (nombres de clases
internas, protocolo/puerto de integración por UDP, estructura exacta de las hojas del Excel de
datos) — expuesto tanto en el código fuente del repo público `my_resume_landing` como, en texto
plano, dentro del bundle de JavaScript que se sirve a cualquier visitante.

Se reescribió la entrada para quedarse en un nivel general: qué hace la herramienta y qué problema
resuelve, sin nombrar al cliente ni describir la integración/protocolo/esquema de datos internos. Se
fijó `visibility: 'private'` explícito (antes dependía solo de la detección automática). Verificado
con `grep` sobre el `dist/` final (HTML + JS ya compilados): 0 apariciones de los términos sensibles
(`OcrListener`, `DrumDataManager`, `InspectionFileManager`, nombres de hojas del Excel, puerto UDP).
Las 2 menciones de "VIAAC" que quedan en el sitio son el nombre del cliente en la sección de
experiencia laboral (currículum), no relacionadas con este hallazgo — es información normal de un CV,
no interna de ningún sistema.

De paso, usando los README reales que Daniel adjuntó, se completaron las entradas README-style de
`projectDetails.ts` para 5 proyectos que antes solo tenían la descripción corta de la card:
`Socket-Communication-System`, `extract_rif`, `System_Stabilitation_Interpolation`,
`RealtimeVoiceAssistant` y `Traffic_Simulation_Model`. Esto sigue siendo contenido para el modal
existente (no páginas nuevas — eso sigue siendo Fase 2), pero como el modal ahora es SSR-friendly
gracias a la Fase 1, este contenido ya mejora directamente lo que ve un buscador/IA generativa aunque
el usuario nunca haga clic para abrirlo.

## 9. CEO review del estado actual (`gs-ceo-review`, 2026-09-02)

**Pregunta que originó esta revisión:** ¿puede hoy una IA, scraper o crawler leer la página a la
perfección? Se verificó de forma empírica sobre `dist/index.html` (el HTML que de verdad se sirve,
sin ejecutar JS) en vez de asumir.

**Mode:** HOLD SCOPE para lo ya implementado (Fase 1 completa, verificada bulletproof en la revisión
anterior) + SELECTIVE EXPANSION para cerrar el hallazgo nuevo de esta sección — se presentan
alternativas para elegir, no se decide en silencio.

### Los 3 desafíos más fuertes

1. **El contenido más valioso para GEO es invisible para cualquier crawler.** Las 8 fichas
   README-style en `projectDetails.ts` (DropAudio CCS, Camara_OCR_Python, Socket-Communication-System,
   extract_rif, System_Stabilitation_Interpolation, RealtimeVoiceAssistant, Traffic_Simulation_Model,
   FlowNet_Video_Stabilization) viven dentro de un modal con `v-if="activeProject"`, que es `false`
   hasta que un humano hace clic. Verificado con `grep` sobre `dist/index.html`: 0 apariciones de
   "PWC-Net", "Resend", "pdfplumber", "python-socketio", "MLPRegressor", "grid_sample" — y 0
   apariciones de las clases `detail-panel`/`detail-overlay` en sí. Un crawler que no ejecuta JS (la
   mayoría de los bots de IA) o que no simula el clic nunca ve ese contenido, por bueno que sea. Lo
   que SÍ es visible: la descripción corta de cada card, la sección "Caso destacado" (DropAudio CCS,
   siempre renderizada), y todo el JSON-LD (Person/WebSite/ProfilePage/FAQPage/ContactPoint).
2. **Nada de esto está desplegado todavía.** Todo el trabajo de esta sesión vive sin comittear en el
   repo local. Hasta que se haga commit + push a `main` (repo conectado a
   `github.com/Dan178A/my_resume_landing`, con Vercel desplegando desde ahí), el sitio en producción
   sigue exactamente como estaba antes de empezar — cero efecto real todavía.
3. **`knownPublicRepos` es una foto fija, no una fuente de verdad viva.** Se calculó una sola vez
   contra la API de GitHub el 2026-09-02. Si en el futuro Daniel privatiza uno de esos 7 repos, el
   sitio lo seguirá anunciando como "Público" indefinidamente y sin ningún aviso — es un fallo
   silencioso a 6 meses vista. Aceptable para un sitio personal de bajo riesgo, pero debe quedar
   escrito, no asumido.

### Alternativas de implementación para cerrar el hallazgo #1 (elegir una)

| Opción | Qué hace | Esfuerzo | Riesgo |
|---|---|---|---|
| **A. Solo structured data** | Agregar cada ficha como `SoftwareSourceCode`/`CreativeWork` en el JSON-LD del `<head>`. Sin cambios visuales. | S | Ninguno — es exactamente el patrón que ya funcionó con FAQPage/ContactPoint. |
| **B. Contenido SSR oculto visualmente** | Renderizar el detalle en el DOM siempre (SSR-safe), colapsado con CSS hasta el clic — patrón de acordeón, aceptado por Google si el contenido oculto es el mismo que se muestra al interactuar. | M | Bajo, pero es complejidad que la Opción C vuelve redundante. |
| **C. Páginas dedicadas por proyecto (Fase 2 ya acordada)** | Rutas propias prerenderizadas por proyecto, con capturas y el README estilizado — resuelve esto Y el problema original ("repo privado = callejón sin salida") Y da URLs compartibles. | L/XL | El de siempre: más superficie, necesita pasada de diseño (`ui-ux-pro-max`). |

**Recomendación:** hacer A ahora — es barato, no toca nada visual y usa el mismo patrón que ya
funcionó. Tratar B como innecesaria (si C se construye, B queda redundante). Mantener C como el
objetivo real de Fase 2 cuando haya tiempo para la pasada de diseño.

### Accepted scope
Todo lo implementado hasta ahora (Fase 1 completa + 8 fichas de contenido) se mantiene — ya pasó su
propia revisión bulletproof.

### Deferred (con motivo)
- Opción C (páginas dedicadas): Fase 2, requiere diseño y las 4 fichas de contenido restantes.
- Revalidación periódica de `knownPublicRepos`: aceptado como riesgo de bajo impacto por ahora,
  documentado para no olvidarlo.

### NOT in scope
Rediseño general del sitio, CMS, o sitio bilingüe con URLs reales — siguen fuera, sin cambios desde
la Fase 1.

### Status: DONE_WITH_CONCERNS
Fase 1 es sólida y verificada. La preocupación real y accionable es el hallazgo #1 (contenido rico
invisible a crawlers) — sin resolver todavía, en espera de que Daniel elija A/B/C. El desbloqueo más
urgente en la práctica sigue siendo el #2: nada de esto existe en producción hasta que se despliegue.
