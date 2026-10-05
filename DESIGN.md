# DESIGN.md — Portafolio de Daniel Silva

El objetivo del sitio es uno: que un cliente que puede pagar agende una llamada, y que un reclutador encuentre el CV en un clic. Cada decisión de diseño se mide contra eso.

## Paleta (DropAudio CCS)

Los tokens viven en `src/assets/main.css`. En componentes se usan siempre variables, nunca hex sueltos.

| Rol | Token | Valor |
|---|---|---|
| Fondo | `--color-bg` | `#0C0B09` |
| Superficie | `--color-bg-raised` | `#16130D` |
| Texto | `--color-text` | `#FAF9F7` |
| Texto secundario | `--color-text-muted` | `#BDB4A4` |
| Acento (oro) | `--color-accent` | `#CDA860` |
| Vino (detalle) | `--violet-400` | `#D36A76` |
| Cobre | `--amber-400` | `#C08A5B` |

Transparencias: `rgba(var(--accent-rgb), 0.3)`. Canales disponibles: `--accent-rgb`, `--wine-rgb`, `--bg-rgb`, `--bone-rgb`, `--copper-rgb`, `--raised-rgb`, `--text-rgb`.

Categorías de proyecto: web = oro, ai = vino, cv = hueso, api = cobre (`--cat-*`).

Un solo acento por vista. El oro es para la acción principal y las cifras; el vino solo para detalles (antes/después, alertas).

## Tipografía

- **Space Grotesk** (`--font-display`): títulos, el texto de los casos, el hero y los paquetes.
- **JetBrains Mono** (`--font-mono` / `--font-body`): datos, stack, etiquetas técnicas. No usarla en párrafos largos nuevos.
- Sin mayúsculas con tracking para etiquetas. Sin degradados en texto salvo cifras de resultado.
- Cuerpo mínimo 16 px.

## Layout

- Contenedor: `min(1200px, 90vw)`.
- Puntos de corte: **640, 720, 768, 900 px**. No agregar nuevos sin motivo.
- Hero alineado a la izquierda, video de fondo a la derecha con velo; el texto nunca queda sobre líneas del video.
- Orden de secciones: hero → impacto → casos → servicios → sistemas → experiencia → proyectos → formación → stack → contacto.
- Tarjetas solo cuando la tarjeta es la interacción (proyectos, paquetes).

## Conversión

- La acción principal en todo el sitio es **Agendar llamada** (`bookingHref`). Usa `VITE_BOOKING_URL` (Cal.com/Calendly); sin ella cae a WhatsApp con el mensaje escrito.
- Aparece en: nav (escritorio), hero, contacto y barra fija en móvil.
- Precios por rango y visibles (sección servicios, `useI18n.ts` → `services`). Si cambian, actualizar también `public/llms.txt` y el JSON-LD de `index.html`.
- No se publican testimonios que la persona no haya escrito o aprobado.
- Medición: Google Analytics 4 (`src/composables/useAnalytics.ts`, variable `VITE_GA_ID`). Eventos: `book_call` (cualquier `data-track="book_call"`), `generate_lead` (formulario enviado), `cv_open`, `whatsapp_click`, `email_click`, `linkedin_click`, `github_click`. Toda acción nueva de conversión lleva `data-track`.

## Movimiento

- Un solo momento con movimiento por vista: el video del hero y los videos de casos/proyectos (HyperFrames, `motion/`).
- Videos en español e inglés según la URL; se reproducen solo a la vista y se respetan `prefers-reduced-motion` (queda el póster).
- Sin cursores parpadeantes, palabras rotando, anillos girando ni puntos pulsando.

## Videos (HyperFrames)

- Fuente: `motion/build.py` genera `motion/<caso>/<es|en>/index.html` y `motion/hero/index.html`.
- Flujo: `npx hyperframes check` → `npx hyperframes render --quality looks` → ffmpeg a H.264 CRF 27 sin audio → `public/cases/<caso>.<lang>.mp4` + póster `.jpg`.
- Paleta y textos de los videos siguen este documento.
