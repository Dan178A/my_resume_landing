/* Detalle enriquecido por proyecto (tipo README) para el modal a pantalla completa.
   Todos los campos salvo `oneLiner` y `whatThis` son opcionales: el modal solo
   renderiza las secciones que existan, para no mostrar información inventada. */

export type Visibility = 'public' | 'private' | 'live'

export interface Bilingual { es: string; en: string }

export interface DetailComponent {
    name: string
    desc: Bilingual
}

export interface ProjectDetail {
    /* Si se define, sobrescribe la detección automática (repo público vs privado). */
    visibility?: Visibility
    whatThis: Bilingual
    stack?: { language?: string; runtime?: string; libs?: string[] }
    tree?: string
    howItFits?: Bilingual
    practice?: Bilingual
    components?: DetailComponent[]
    run?: string
    requirements?: Bilingual[]
    oneLiner: Bilingual
    ask?: string[]
}

export const projectDetails: Record<string, ProjectDetail> = {
    'DropAudio CCS': {
        visibility: 'live',
        whatThis: {
            es: 'Tienda de e-commerce y panel de gestión para DropAudio CCS, distribuidor especialista en audio KZ (IEMs, DACs y accesorios) en Venezuela. Una sola app cubre la tienda pública (catálogo, carrito, checkout, fichas SEO) y un panel de administración completo (inventario, ventas, entregas, pedidos web, reseñas, cotizaciones, catálogo PDF y avisos push).',
            en: 'E-commerce store and management panel for DropAudio CCS, a specialist KZ audio distributor (IEMs, DACs and accessories) in Venezuela. A single app covers the public store (catalog, cart, checkout, SEO pages) and a full admin panel (inventory, sales, deliveries, web orders, reviews, quotes, PDF catalog and push alerts).',
        },
        stack: {
            language: 'TypeScript',
            runtime: 'Nuxt 3 (Vue 3, SSR/Nitro)',
            libs: ['Supabase (Postgres + Auth + Storage + Realtime, RLS)', 'Tailwind CSS', 'Resend', 'Web Push (VAPID)', 'Vitest', 'Vercel'],
        },
        tree: `pages/            Landing (index, brand, productos/[slug]) y panel admin/*
components/        landing/ (NavBar, ProductCard, ProductModal, CartDrawer, Reviews) · brand/
composables/       useStore (Supabase) · useCart · useMoney · useWhatsapp · usePush · fallbackData
utils/             business.ts (precios, márgenes, totales — con pruebas)
server/api/        notify-order · rates · distance · import-kz · review/[token]
supabase/          schema.sql · orders.sql · reviews.sql · push-notifications.sql · functions/
test/              Pruebas Vitest (business, useMoney)`,
        howItFits: {
            es: 'La landing pública lee el catálogo desde Supabase con RLS; la escritura queda restringida a administradores mediante lista blanca e is_admin(). El checkout registra el pedido, avisa por correo (Resend) y arma el enlace de WhatsApp. Un cron (pg_cron) dispara una Edge Function que envía recordatorios de entrega por Web Push.',
            en: 'The public landing reads the catalog from Supabase with RLS; writes are restricted to admins via an allowlist and is_admin(). Checkout records the order, notifies by email (Resend) and builds the WhatsApp link. A pg_cron job triggers an Edge Function that sends delivery reminders via Web Push.',
        },
        practice: {
            es: 'Resuelve una operación real de venta: catálogo filtrable por uso, recomendador de audio en 3 pasos, comparador técnico frente a frente, checkout multimoneda (USDT, Zinli, Pago Móvil) con tasas BCV/USDT en vivo y un panel que gestiona inventario, ventas, entregas por km y reseñas. Arquitectura resiliente: si Supabase falla, cae a un catálogo de respaldo y el checkout igual genera el enlace de WhatsApp.',
            en: 'It runs a real sales operation: catalog filterable by use case, a 3-step audio recommender, a head-to-head technical comparator, multi-currency checkout (USDT, Zinli, Pago Móvil) with live BCV/USDT rates, and a panel managing inventory, sales, deliveries by distance and reviews. Resilient by design: if Supabase fails, it falls back to a backup catalog and checkout still generates the WhatsApp link.',
        },
        components: [
            { name: 'composables/useStore.ts', desc: { es: 'Capa de acceso a Supabase para catálogo, pedidos y realtime.', en: 'Supabase access layer for catalog, orders and realtime.' } },
            { name: 'utils/business.ts', desc: { es: 'Lógica pura de precios, márgenes y totales, cubierta por pruebas.', en: 'Pure pricing/margin/total logic, covered by tests.' } },
            { name: 'server/api/notify-order', desc: { es: 'Endpoint que envía el correo del pedido con Resend.', en: 'Endpoint that sends the order email via Resend.' } },
            { name: 'supabase/functions/delivery-reminders', desc: { es: 'Edge Function de recordatorios de entrega (Web Push + pg_cron).', en: 'Delivery-reminder Edge Function (Web Push + pg_cron).' } },
        ],
        oneLiner: {
            es: 'Plataforma e-commerce completa (tienda + panel) en producción sobre Nuxt 3 y Supabase, con recomendador de audio, checkout multimoneda y operación resiliente.',
            en: 'A complete e-commerce platform (store + panel) in production on Nuxt 3 and Supabase, with an audio recommender, multi-currency checkout and resilient operation.',
        },
        ask: [
            '¿Cómo funciona la arquitectura de respaldo cuando Supabase no responde?',
            '¿Cómo se calcula el km de entrega y el neto real de una venta?',
            '¿Cómo está asegurada la escritura del panel con RLS e is_admin()?',
        ],
    },

    'Camara_OCR_Python': {
        whatThis: {
            es: 'Aplicación de escritorio en Python para preparar y visualizar inspecciones de tambores industriales de coque, con foco en ayudar a ubicar la cámara y revisar deformaciones del tambor antes de una inspección real. Carga un Excel con datos de soldaduras y geometría, dibuja un mapa radial y un corte vertical, y puede actualizarse con valores recibidos por OCR para mover la vista automáticamente.',
            en: 'A Python desktop app to prepare and visualize inspections of industrial coke drums, focused on helping position the camera and review drum deformations before a real inspection. It loads an Excel of weld and geometry data, draws a radial map and a vertical section, and can update from OCR readings to move the view automatically.',
        },
        stack: {
            language: 'Python',
            runtime: 'PyQt5 + Matplotlib + OpenCV',
            libs: ['pandas', 'numpy', 'matplotlib', 'PyQt5', 'openpyxl', 'screeninfo', 'cv2'],
        },
        tree: `app.py                     controlador principal de la interfaz y lógica de actualización
Layout/                    UI de PyQt5
  main_window.ui           diseño de la ventana principal
  main_window.py           carga del .ui en Python
Maps/                      gráficos del sistema
  mapaRadio.py             mapa radial del tambor y scopes/fotos
  corteVertical.py         corte vertical y cálculo de strain
  engiMap.py               variante de mapa de ingeniería
ocr_core/                  base OCR/cámara/utilidades de ROI
  camara.py                captura de cámara y reconexión
  motores.py               segmentación y base para motores OCR
  rois.py                  guardado/carga de regiones de interés
  config.py                carga de configuración general
viaac_custom_library/      utilidades propias del sistema
  blit_manager.py          redibujado eficiente en Matplotlib
  testing.py               script de generación de datos de prueba
requirements.txt           dependencias del entorno
README.md                  explicación funcional del proyecto`,
        howItFits: {
            es: 'app.py crea la ventana (Layout/main_window.py), carga el Excel con DrumDataManager e InspectionFileManager y construye dos vistas: MapaRadio para la vista desenrollada del tambor y CvMap para el corte vertical. Al cambiar azimut, elevación, unidades o rango, el controlador llama a Update_Graphs() y sincroniza ambos gráficos. Recibe lecturas OCR por UDP mediante OcrListener y usa esos valores para mover los controles como si el usuario los hubiera girado.',
            en: 'app.py builds the window (Layout/main_window.py), loads the Excel with DrumDataManager and InspectionFileManager and builds two views: MapaRadio for the unrolled drum view and CvMap for the vertical section. When azimuth, elevation, units or range change, the controller calls Update_Graphs() and syncs both charts. It receives OCR readings over UDP via OcrListener and uses them to move the controls as if the user had turned them.',
        },
        practice: {
            es: 'Asiste la inspección de tambores de coque mostrando dónde están las soldaduras, qué zonas tienen mayor bulging/deformación y hacia dónde apuntar la cámara. Trabaja con un Excel con hojas DATA, SV, SH y SWOL de las que extrae dimensiones, soldaduras y parámetros geométricos; con eso calcula la posición de cámara, dibuja el estado del tambor y recorre automáticamente las zonas más deformadas. Dos ideas fuertes: visualización geométrica (mapa radial + corte vertical) e integración OCR para controlar la vista en tiempo real.',
            en: 'It assists coke-drum inspection by showing where welds are, which zones have the most bulging/deformation and where to aim the camera. It works with an Excel containing DATA, SV, SH and SWOL sheets from which it extracts dimensions, welds and geometry; with that it computes camera position, draws the drum state and auto-scans the most deformed zones. Two strong ideas: geometric visualization (radial map + vertical section) and OCR integration to drive the view in real time.',
        },
        components: [
            { name: 'app.py', desc: { es: 'Centro de orquestación: slots de UI, carga del Excel, actualización de gráficos, unidades, seguimiento OCR y posicionamiento del brazo/cámara.', en: 'Orchestration center: UI slots, Excel loading, chart updates, units, OCR tracking and arm/camera positioning.' } },
            { name: 'Maps/mapaRadio.py', desc: { es: 'Mapa radial del tambor, con señales para clicks, scopes y modos outward, strain, bulge y White.', en: 'Radial drum map, with signals for clicks, scopes and outward/strain/bulge/White modes.' } },
            { name: 'Maps/corteVertical.py', desc: { es: 'Perfil vertical y cálculo de strain; muestra inspecciones previas y compara condiciones.', en: 'Vertical profile and strain computation; shows previous inspections and compares conditions.' } },
            { name: 'ocr_core/camara.py', desc: { es: 'Captura de cámara en un hilo separado, con soporte RTSP, MJPEG o webcam local.', en: 'Camera capture on a separate thread, supporting RTSP, MJPEG or local webcam.' } },
            { name: 'ocr_core/motores.py', desc: { es: 'Segmenta pantallas en dígitos e interfaz base para motores OCR.', en: 'Segments screens into digits and a base interface for OCR engines.' } },
            { name: 'ocr_core/rois.py', desc: { es: 'Define y persiste regiones de interés por pantalla/campo.', en: 'Defines and persists regions of interest per screen/field.' } },
            { name: 'viaac_custom_library/blit_manager.py', desc: { es: 'Optimiza el refresco de Matplotlib para una UI más fluida.', en: 'Optimizes Matplotlib refresh for a smoother UI.' } },
        ],
        run: `python -m venv venv
venv\\Scripts\\activate        # Windows
# source venv/bin/activate   # Linux / Mac
pip install -r requirements.txt
python app.py`,
        requirements: [
            { es: 'Un Excel con las hojas esperadas por DrumDataManager (DATA, SV, SH, SWOL).', en: 'An Excel with the sheets expected by DrumDataManager (DATA, SV, SH, SWOL).' },
            { es: 'Un archivo de inspección o una inspección temporal generada automáticamente.', en: 'An inspection file or an auto-generated temporary inspection.' },
            { es: 'Opcional: config.json y el puente OCR por UDP en el puerto 5005.', en: 'Optional: config.json and the OCR UDP bridge on port 5005.' },
        ],
        oneLiner: {
            es: 'Herramienta de apoyo a inspección industrial que combina lectura de datos de tambor, visualización técnica 2D, cálculo de deformación y entrada por OCR para guiar la cámara.',
            en: 'An industrial-inspection support tool combining drum-data reading, 2D technical visualization, deformation computation and OCR input to guide the camera.',
        },
        ask: [
            '¿Puedes explicarme cómo funciona app.py paso a paso?',
            '¿Qué espera exactamente el Excel en las hojas DATA, SV, SH y SWOL?',
            '¿Cómo se conecta el OCR del otro repo con este proyecto por UDP?',
        ],
    },
}
