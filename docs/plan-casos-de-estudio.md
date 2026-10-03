# Plan: casos de estudio con la paleta de DropAudio

Estado: diseño aprobado internamente, sin implementar. Retomar desde aquí.

## Paleta (tomada de public/dropaudioccs-portafolio.html)
- Negro `#0C0B09`: fondo base
- Carbón `#16130D`: superficies elevadas
- Hueso `#FAF9F7`: texto principal · texto atenuado `#B5AC9C`
- Oro `#CDA860`: acento · oro profundo `#967337`: líneas y bordes
- Vino `#8A1F2B`: superficie secundaria · vino claro `#D36A76` para texto sobre fondo oscuro
- Categorías: web = oro, ai = vino claro, cv = hueso `#E6DCC8`, api = cobre `#C08A5B`
- Se aplica en todo el sitio remapeando los tokens de `src/assets/main.css` (`--color-accent`, `--cat-*`, `--grad-*`, `--win-dot-*`, bordes con rgba del oro).

## Tipografía
- Space Grotesk (la de DropAudio) para títulos y para el texto de los casos.
- JetBrains Mono solo para datos, stack y la decoración de terminal.

## Estructura
1. Quitar la sección `#flagship`: DropAudio pasa a ser el primer caso.
2. Nueva sección `#cases` ("Casos de estudio") con 4 casos a ancho completo, alternando el lado del video:
   ```
   [ tipo de proyecto     ]   [ video 16:10 en bucle ]
   [ Título grande        ]   [                      ]
   [ CIFRA ANTES → DESPUÉS]   [ chips de stack       ]
   [ Problema / Qué hice /]   [ enlaces              ]
   [ Resultado            ]
   ```
   En móvil: título, video y luego el texto.
   - **DropAudio CCS**: 102+ reseñas verificadas, 19 modelos, checkout en 3 monedas. Enlaces: en vivo, asesor, tablero del caso.
   - **Reel Studio**: "2 h → 15 min" por reel; IA local, análisis reanudable, deduplicación de fotogramas.
   - **Inspección industrial con cámara**: 5 años en producción, sin soporte técnico en sitio; 214K+ líneas, 77 % de los commits. Video: tramo recortado de `public/p03-camara-mapas_*.mp4`.
   - **Estabilización de video** (tesis + FlowNet): malla + flujo óptico + red que predice los pesos; PWC-Net destilado + trayectoria suavizada con QP.
   El elemento llamativo es la cifra grande en oro con una línea que se dibuja entre el antes y el después (una sola animación, respeta `prefers-reduced-motion`).
3. El resto de los proyectos va en una lista compacta "Más trabajo en GitHub" (filas, no tarjetas) que sigue abriendo el modal de detalle.

## Videos con HyperFrames (`npx hyperframes`, v0.8.114 disponible)
- Proyecto en `motion/` (fuera de `src/`), una composición por caso, 1280×800, 8 s, en bucle.
  - DropAudio: recomendador en 3 pasos → producto → checkout multimoneda.
  - Reel Studio: clips → puntuación por toma → guion → línea de tiempo de CapCut.
  - Estabilización: curva de trayectoria temblorosa contra la suavizada.
- Pasos: `lint` → `check` → `preview` → `render --quality looks` → ffmpeg a H.264 CRF 28 sin audio (<1 MB) + póster JPG.
- En la web: `<video muted loop playsinline preload="none" poster>`, se reproduce solo cuando está en pantalla (IntersectionObserver) y muestra solo el póster con movimiento reducido.
- Los mp4 actuales de `public/` pesan entre 2,6 y 4,8 MB: comprimirlos o recortarlos antes de hacer commit.
