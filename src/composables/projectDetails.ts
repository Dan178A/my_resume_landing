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
        /* Privado a propósito: es trabajo de consultoría industrial para un cliente.
           Este resumen es deliberadamente general — sin nombre de cliente, sin el
           protocolo/puerto de integración con el sistema del cliente, y sin la
           estructura exacta de sus datos — para no exponer nada bajo confidencialidad.
           Si quieres el detalle técnico completo, escríbeme. */
        visibility: 'private',
        whatThis: {
            es: 'Aplicación de escritorio en Python que asiste inspecciones industriales de equipos cilíndricos (tambores) en refinerías: ayuda a ubicar la cámara y visualizar deformaciones antes de una inspección real, combinando datos de geometría con lecturas de cámara/OCR.',
            en: 'A Python desktop app that assists industrial inspections of cylindrical refinery equipment (drums): it helps position the camera and visualize deformations ahead of a real inspection, combining geometry data with camera/OCR input.',
        },
        stack: {
            language: 'Python',
            runtime: 'PyQt5 + Matplotlib + OpenCV',
            libs: ['pandas', 'numpy', 'matplotlib', 'PyQt5', 'openpyxl', 'cv2'],
        },
        tree: `app.py             controlador principal de la interfaz y lógica de actualización
Layout/             UI de PyQt5 (diseño + carga de la ventana principal)
Maps/               visualización: mapa radial del tambor y corte vertical
ocr_core/           captura de cámara, segmentación OCR y regiones de interés
requirements.txt    dependencias del entorno`,
        howItFits: {
            es: 'La app carga datos de geometría e inspección (soldaduras, dimensiones) y construye dos vistas sincronizadas: un mapa radial desenrollado del tambor y un corte vertical. También puede recibir lecturas externas de un módulo de cámara/OCR para mover la vista automáticamente, como si el usuario la estuviera controlando.',
            en: 'The app loads geometry and inspection data (welds, dimensions) and builds two synced views: an unrolled radial map of the drum and a vertical section. It can also receive external camera/OCR readings to move the view automatically, as if the user were controlling it.',
        },
        practice: {
            es: 'Asiste la inspección de tambores industriales mostrando dónde están las soldaduras, qué zonas tienen mayor deformación y hacia dónde apuntar la cámara, recorriendo automáticamente las zonas más críticas. Combina visualización geométrica 2D con integración de cámara/OCR para guiar la inspección en tiempo real. Desarrollado como parte de una consultoría de ingeniería para el sector industrial — los detalles del cliente y de la integración quedan fuera de este resumen; escríbeme si quieres una demo o el detalle técnico completo.',
            en: 'It assists industrial drum inspections by showing where welds are, which zones show the most deformation, and where to aim the camera, auto-scanning the most critical zones. It combines 2D geometric visualization with camera/OCR integration to guide inspection in real time. Built as part of an industrial engineering consulting engagement — client and integration details are out of scope for this summary; reach out for a demo or the full technical breakdown.',
        },
        components: [
            { name: 'app.py', desc: { es: 'Orquesta la interfaz, la carga de datos y la actualización de las vistas.', en: 'Orchestrates the UI, data loading and view updates.' } },
            { name: 'Maps/mapaRadio.py', desc: { es: 'Mapa radial del tambor con distintos modos de visualización.', en: 'Radial drum map with several visualization modes.' } },
            { name: 'Maps/corteVertical.py', desc: { es: 'Perfil vertical y cálculo de deformación (strain).', en: 'Vertical profile and strain computation.' } },
            { name: 'ocr_core/camara.py', desc: { es: 'Captura de cámara en un hilo separado (RTSP, MJPEG o webcam local).', en: 'Camera capture on a separate thread (RTSP, MJPEG or local webcam).' } },
        ],
        oneLiner: {
            es: 'Herramienta de apoyo a inspección industrial: visualización técnica de equipos cilíndricos, cálculo de deformación y guiado de cámara asistido por OCR.',
            en: 'Industrial-inspection support tool: technical visualization of cylindrical equipment, deformation computation and OCR-assisted camera guidance.',
        },
        ask: [
            '¿Puedes contarme más sobre cómo funciona la visualización geométrica?',
            '¿Cómo se integra la lectura por cámara/OCR con el resto del sistema?',
        ],
    },

    'Socket-Communication-System': {
        whatThis: {
            es: 'Utilidad de escritorio para Windows que verifica la conectividad WebSocket entre dos computadoras en la misma red local: una actúa de Server y la otra de Client, e intercambian un mensaje de prueba mostrando el resultado con un indicador visual.',
            en: 'A Windows desktop utility that verifies WebSocket connectivity between two computers on the same LAN: one acts as Server and the other as Client, exchanging a test message and showing the result with a visual indicator.',
        },
        stack: {
            language: 'Python',
            runtime: 'PyQt5 + python-socketio',
            libs: ['eventlet', 'websocket-client', 'scapy', 'manuf'],
        },
        tree: `main.py                     punto de entrada; conecta la UI con la lógica de conexión
Server_Env.py                servidor Socket.IO (rol "Server")
Client_Env.py                cliente Socket.IO (rol "Client")
Manager_server_client.py     fábrica que instancia Client o Server según el rol
ip_utils.py                  detección de IP local / utilidades de red (Windows)
socket_ui.py / socket.ui     UI generada con Qt Designer`,
        howItFits: {
            es: 'En modo Server, levanta un servidor Socket.IO local y se conecta a sí mismo como cliente para confirmar que la pila de sockets funciona (autoprueba local). En modo Client, se conecta directamente a la IP del otro equipo y envía un mensaje de prueba real. Un ícono verde indica que la ruta probada respondió correctamente; uno rojo, que falló.',
            en: "In Server mode it spins up a local Socket.IO server and immediately connects to itself as a client to confirm the local socket stack works (a local self-test). In Client mode it connects directly to the other machine's IP and sends a real test message. A green icon means the tested route responded correctly; red means it failed.",
        },
        practice: {
            es: 'Resuelve un problema muy concreto de soporte técnico: confirmar rápido si dos computadoras en la misma LAN pueden hablar entre sí por WebSocket, sin abrir una consola. Incluye detección automática de IP local y escaneo de equipos vecinos en la subred, y se empaqueta como .exe con cx_Freeze para distribuirlo sin depender de un entorno Python.',
            en: "It solves a very concrete troubleshooting problem: quickly confirming whether two computers on the same LAN can talk to each other over WebSocket, without opening a console. It includes local IP auto-detection and neighboring-device scanning on the subnet, and packages as a standalone .exe with cx_Freeze.",
        },
        components: [
            { name: 'Server_Env.py', desc: { es: 'Servidor Socket.IO, corre en un hilo aparte para no bloquear la UI.', en: 'Socket.IO server, runs on a separate thread so it never blocks the UI.' } },
            { name: 'Client_Env.py', desc: { es: 'Cliente Socket.IO con reconexión automática.', en: 'Socket.IO client with automatic reconnection.' } },
            { name: 'ip_utils.py', desc: { es: 'Detección de IP local y equipos vecinos vía netsh/ctypes (Windows).', en: 'Local IP and neighboring-device detection via netsh/ctypes (Windows).' } },
        ],
        run: `git clone https://github.com/Dan178A/Socket-Communication-System.git
cd Socket-Communication-System
pip install -r requirements.txt
python main.py`,
        requirements: [
            { es: 'Windows 10/11 (usa netsh y ctypes.windll para detectar interfaces de red).', en: 'Windows 10/11 (uses netsh and ctypes.windll to detect network interfaces).' },
        ],
        oneLiner: {
            es: 'Utilidad de escritorio para Windows que verifica en un clic si dos computadoras en la misma LAN pueden comunicarse por WebSocket.',
            en: 'A Windows desktop utility that checks in one click whether two computers on the same LAN can talk over WebSocket.',
        },
        ask: [
            '¿Cómo diferencia la autoprueba local de una conexión real entre equipos?',
            '¿Cómo funciona el empaquetado a .exe con cx_Freeze?',
        ],
    },

    'extract_rif': {
        whatThis: {
            es: 'Microservicio HTTP (FastAPI) que extrae datos estructurados de un RIF venezolano (SENIAT) desde un PDF o imagen, combinando lectura de texto nativo con un pipeline de OCR de dos motores (PaddleOCR + Tesseract como respaldo).',
            en: 'An HTTP microservice (FastAPI) that extracts structured data from a Venezuelan RIF (SENIAT tax ID) from a PDF or image, combining native text extraction with a dual-engine OCR pipeline (PaddleOCR + Tesseract as fallback).',
        },
        stack: {
            language: 'Python',
            runtime: 'FastAPI + Uvicorn',
            libs: ['pdfplumber', 'pypdfium2', 'PaddleOCR (PP-OCRv4)', 'pytesseract', 'OpenCV (headless)', 'Pillow', 'numpy'],
        },
        tree: `app.py             FastAPI: endpoints, pipeline OCR, pre/post-procesamiento
parser.py           extracción de campos por regex tolerante a errores de OCR
rif_validation.py   dígito verificador del RIF (módulo 11 SENIAT)
ocr_utils.py        calidad de OCR, detección de basura, escala/DPI
tests/              suite pytest (unitarias + integración)
static/             UI web para probar la extracción sin código`,
        howItFits: {
            es: 'Si el PDF trae texto nativo, se lee directo con pdfplumber sin OCR. Si el texto sale vacío o corrupto, se renderiza la página a ~300 DPI y entra al pipeline OCR: PaddleOCR como motor primario, con reintento en Tesseract si la confianza es baja. Si no se detecta un RIF válido, se reintenta rotando la imagen 90°/180°/270°. Un fallo interno nunca tumba el servicio: siempre responde 200 con status=ERROR y el detalle, para que el cliente reciba un JSON parseable.',
            en: "If the PDF carries native text, it's read directly with pdfplumber, no OCR needed. If the text comes out empty or corrupt, the page is rendered at ~300 DPI and enters the OCR pipeline: PaddleOCR as the primary engine, falling back to Tesseract when confidence is low. If no valid RIF is detected, it retries rotating the image 90°/180°/270°. An internal failure never takes the service down: it always responds 200 with status=ERROR and a detail message, so the client always gets parseable JSON.",
        },
        practice: {
            es: 'Resuelve un problema operativo real: convertir comprobantes de RIF (fotos de celular, escaneos de baja calidad, PDFs con y sin texto) en datos estructurados y confiables, sin intervención manual. La fiabilidad ante fallos y la validación por dígito verificador (módulo 11) lo hacen apto para un flujo de producción, no solo una prueba de concepto.',
            en: "It solves a real operational problem: turning RIF documents (phone photos, low-quality scans, PDFs with and without text) into reliable structured data with no manual step. Failure resilience and check-digit validation (SENIAT's modulo-11 rule) make it fit for a production flow, not just a proof of concept.",
        },
        components: [
            { name: 'app.py', desc: { es: 'Endpoints FastAPI y orquestación del pipeline OCR.', en: 'FastAPI endpoints and OCR pipeline orchestration.' } },
            { name: 'parser.py', desc: { es: 'Regex tolerantes a errores típicos de OCR para extraer cada campo.', en: 'OCR-error-tolerant regex to extract each field.' } },
            { name: 'rif_validation.py', desc: { es: 'Dígito verificador del RIF (módulo 11 SENIAT), módulo puro.', en: 'RIF check digit (SENIAT modulo-11), a pure module.' } },
        ],
        run: `docker compose up --build
# o local, sin Docker:
python -m venv venv && source venv/bin/activate
pip install -r requirements.txt
uvicorn app:app --host 0.0.0.0 --port 8080`,
        requirements: [
            { es: 'Docker (recomendado), o Python 3.11 + tesseract-ocr instalado en el sistema.', en: 'Docker (recommended), or Python 3.11 + tesseract-ocr installed on the system.' },
        ],
        oneLiner: {
            es: 'Microservicio que convierte comprobantes de RIF (PDF o imagen) en JSON estructurado, con OCR de doble motor y respuesta 100% fiable ante fallos.',
            en: 'A microservice that turns RIF documents (PDF or image) into structured JSON, with dual-engine OCR and a fail-safe response contract.',
        },
        ask: [
            '¿Cómo decide el pipeline cuándo usar Tesseract en vez de PaddleOCR?',
            '¿Cómo garantiza que un fallo interno nunca tumbe el servicio?',
        ],
    },

    'System_Stabilitation_Interpolation': {
        whatThis: {
            es: 'Sistema de estabilización de video para dispositivos móviles (trabajo de grado, Universidad del Zulia) que combina estimación de movimiento por malla, interpolación y una red neuronal que predice los pesos adaptativos del algoritmo, con una interfaz web para subir un video, elegir el método y comparar el resultado antes/después.',
            en: 'A video stabilization system for mobile devices (undergraduate thesis, University of Zulia) combining mesh-based motion estimation, interpolation and a neural network that predicts the algorithm\'s adaptive weights, with a web interface to upload a video, pick a method and compare before/after.',
        },
        stack: {
            language: 'Python',
            runtime: 'FastAPI (backend) + HTML/JS (frontend)',
            libs: ['OpenCV', 'scikit-learn (MLPRegressor)', 'NumPy'],
        },
        tree: `stabilizer.py         motor de estabilización (clase Stabilizer)
run.py                 lanzador de la aplicación web
ml/                     entrenamiento del modelo de pesos adaptativos (MLPRegressor)
backend/app.py          API FastAPI (upload, progreso en vivo por SSE, resultados, video)
backend/metrics.py      cálculo de MSE / RMSE / PSNR / SSIM
frontend/index.html     interfaz web de dos paneles`,
        howItFits: {
            es: 'La estabilización sigue 4 pasos: se coloca una malla sobre el video y se rastrea su movimiento (flujo óptico), se minimiza una función de energía por el método de Jacobi para decidir cómo debe moverse cada vértice, se interpola y deforma cada fotograma siguiendo esa trayectoria, y se recorta/reescala al tamaño original. Los pesos adaptativos de la función de energía —que en la tesis original eran solo una propuesta teórica— ahora los predice un MLPRegressor entrenado a partir del modelo lineal del paper como maestro.',
            en: "Stabilization follows 4 steps: a mesh is laid over the video and its motion is tracked via optical flow, an energy function is minimized with the Jacobi method to decide how each vertex should move, each frame is warped by interpolation to follow that trajectory, and the result is cropped/rescaled back to the original size. The energy function's adaptive weights — a theoretical proposal in the original thesis, never actually implemented — are now predicted by an MLPRegressor trained against the paper's linear model as a teacher.",
        },
        practice: {
            es: 'Moderniza un proyecto que originalmente era solo línea de comandos: agrega una interfaz web funcional con progreso en vivo y comparación interactiva antes/después, implementa de verdad los pesos adaptativos por IA que la tesis proponía pero el código no tenía, y optimiza el rendimiento (resolución reducida, límite de fotogramas, extracción de descriptores vectorizada).',
            en: 'It modernizes a project that was originally command-line only: adds a working web interface with live progress and an interactive before/after comparison, actually implements the AI-predicted adaptive weights the thesis proposed but the original code lacked, and optimizes performance (reduced-resolution processing, frame limits, vectorized descriptor extraction).',
        },
        components: [
            { name: 'stabilizer.py', desc: { es: 'Motor de estabilización: malla, flujo óptico, minimización de energía.', en: 'Stabilization engine: mesh, optical flow, energy minimization.' } },
            { name: 'ml/train_adaptive_weights.py', desc: { es: 'Entrena el MLPRegressor que predice los pesos adaptativos.', en: 'Trains the MLPRegressor that predicts adaptive weights.' } },
            { name: 'backend/metrics.py', desc: { es: 'Calcula MSE, RMSE, PSNR y SSIM para comparar original vs. estabilizado.', en: 'Computes MSE, RMSE, PSNR and SSIM to compare original vs. stabilized.' } },
        ],
        run: `python -m venv venv
venv\\Scripts\\activate        # Windows
# source venv/bin/activate   # Linux / Mac
pip install -r requirements.txt
python run.py`,
        requirements: [
            { es: 'ffmpeg instalado (recomendado) para reproducir el video estabilizado en el navegador.', en: 'ffmpeg installed (recommended) to play the stabilized video back in the browser.' },
        ],
        oneLiner: {
            es: 'Estabilizador de video con interfaz web: malla + flujo óptico + interpolación, con los pesos adaptativos del algoritmo predichos por una red neuronal.',
            en: "A video stabilizer with a web UI: mesh + optical flow + interpolation, with the algorithm's adaptive weights predicted by a neural network.",
        },
        ask: [
            '¿Cómo entrena el modelo que predice los pesos adaptativos?',
            '¿Qué mide cada métrica (MSE, PSNR, SSIM) y por qué esas cuatro?',
        ],
    },

    'FlowNet_Video_Stabilization': {
        whatThis: {
            es: 'Estabilización de video con estimaciones de movimiento global de cámara destiladas con deep learning: una red de flujo óptico calcula el movimiento, se convierte en una trayectoria afín de cámara, se suaviza con optimización cuadrática (QP) y se refina con una pasada fotométrica multi-escala.',
            en: "Video stabilization using deep, distilled global camera-motion estimates: an optical-flow network computes the motion, it's converted into an affine camera path, smoothed with quadratic-programming (QP) optimization, and refined with a multi-scale photometric pass.",
        },
        stack: {
            language: 'Python',
            runtime: 'PyTorch (CUDA)',
            libs: ['PWC-Net (destilado)', 'DCT (compresión del flujo)', 'grid_sample (warping)'],
        },
        tree: `stabilizeVideo.py       punto de entrada CLI
GlobalFlowNets/           red de movimiento global destilada (PWC-Net) + modelo preentrenado
Stabilizers/              pipeline de estabilización: GNetAffine → MSPhotometric
PathStabilizers/          suavizado QP de la trayectoria de cámara
Utils/                    DCT, afines, recorte, E/S de video`,
        howItFits: {
            es: 'El flujo pasa por 5 etapas: (1) una variante destilada de PWC-Net estima el flujo óptico denso entre fotogramas y lo comprime con una parametrización DCT; (2) los coeficientes afines por fotograma se acumulan en una trayectoria de cámara; (3) un optimizador QP suaviza esa trayectoria garantizando un solapamiento mínimo configurable; (4) los coeficientes se invierten y aplican con grid_sample para deformar cada fotograma; (5) un refinamiento fotométrico multi-escala elimina el temblor residual que la trayectoria afín no logra modelar. El modelo preentrenado viene incluido en el repo, así que no hace falta entrenar nada.',
            en: "The pipeline runs 5 stages: (1) a distilled PWC-Net variant estimates dense optical flow between frames and compresses it with a DCT-based parameterization; (2) per-frame affine coefficients are accumulated into a camera path; (3) a QP optimizer smooths that path while guaranteeing a configurable minimum frame overlap; (4) the coefficients are inverted and applied via grid_sample to warp each frame; (5) a multi-scale photometric refinement removes residual jitter the affine path can't model. The pretrained model ships with the repo, so no training is required.",
        },
        practice: {
            es: 'A diferencia de un estabilizador clásico basado solo en malla e interpolación, aquí el movimiento global de la cámara lo estima una red neuronal (no un tracker de features clásico), y se combina una corrección geométrica (trayectoria afín + QP) con una corrección fotométrica de bajo orden para el temblor que la geometría sola no explica. Corre en GPU (CUDA) y no necesita entrenamiento para estabilizar videos nuevos: el modelo de flujo ya viene entrenado.',
            en: "Unlike a classic mesh-and-interpolation stabilizer, here the global camera motion is estimated by a neural network (not a classic feature tracker), combining a geometric correction (affine path + QP) with a low-order photometric correction for jitter geometry alone can't explain. It runs on GPU (CUDA) and needs no training to stabilize new videos — the flow model ships already trained.",
        },
        components: [
            { name: 'GlobalFlowNets/GlobalPWCNets.py', desc: { es: 'Fábrica del modelo de flujo óptico destilado (PWC-Net).', en: 'Factory for the distilled optical-flow model (PWC-Net).' } },
            { name: 'PathStabilizers/StdPathStabilizerQP.py', desc: { es: 'Suaviza la trayectoria de cámara con optimización cuadrática.', en: 'Smooths the camera path via quadratic-programming optimization.' } },
            { name: 'Stabilizers/MSPhotometric.py', desc: { es: 'Refinamiento fotométrico multi-escala para el temblor residual.', en: 'Multi-scale photometric refinement for residual jitter.' } },
        ],
        run: `git clone https://github.com/Dan178A/FlowNet_Video_Stabilization.git
cd FlowNet_Video_Stabilization
pip install -r requirements.txt
python stabilizeVideo.py --inpVideoPath inputs/sample.avi --outVideoPath outputs/estabilizado.avi`,
        requirements: [
            { es: 'GPU con CUDA (el modelo corre en modo .cuda()) — CUDA 12.4, o ajusta la instalación de PyTorch a tu versión.', en: 'CUDA-capable GPU (the model runs in .cuda() mode) — CUDA 12.4, or adjust the PyTorch install to your version.' },
        ],
        oneLiner: {
            es: 'Estabilización de video con movimiento global de cámara estimado por deep learning, trayectoria afín suavizada por QP y refinamiento fotométrico multi-escala.',
            en: 'Video stabilization with deep-learning global camera-motion estimation, QP-smoothed affine path and multi-scale photometric refinement.',
        },
        ask: [
            '¿Por qué destilar PWC-Net en vez de usar un tracker de features clásico?',
            '¿Cómo se combina la corrección geométrica (afín) con la fotométrica?',
        ],
    },

    'RealtimeVoiceAssistant': {
        whatThis: {
            es: 'Asistente de voz conversacional en tiempo real que combina transcripción, procesamiento de lenguaje natural y síntesis de voz con Gemini 2.5 Flash, con componentes críticos de audio en Rust para baja latencia y comunicación por WebSocket.',
            en: 'A real-time conversational voice assistant combining transcription, natural-language processing and speech synthesis with Gemini 2.5 Flash, with critical audio components in Rust for low latency and WebSocket communication.',
        },
        stack: {
            language: 'Rust · Python',
            runtime: 'FastAPI + WebSocket',
            libs: ['google-genai (Gemini 2.5 Flash)', 'google-cloud-texttospeech', 'Web Speech API'],
        },
        tree: `src/main.rs / audio.rs   procesamiento de audio crítico en Rust
main.py                   backend FastAPI — modo transcripción en frontend
test.py                    backend FastAPI — modo audio binario a Gemini
index.html / test.html     frontends (STT en navegador / audio binario)
Cargo.toml                 configuración de Rust`,
        howItFits: {
            es: 'En el modo rápido, el navegador transcribe con Web Speech API y envía texto por WebSocket; el servidor busca contexto (RAG simulado), Gemini genera la respuesta en streaming y el navegador la lee con TTS. En el modo híbrido, el navegador envía audio binario real y Gemini transcribe directamente, con Rust acelerando el procesamiento crítico para mantener respuestas por debajo de 100ms.',
            en: 'In fast mode, the browser transcribes via the Web Speech API and sends text over WebSocket; the server retrieves context (a simulated RAG step), Gemini streams the response, and the browser reads it back via TTS. In the hybrid mode, the browser sends real binary audio and Gemini transcribes it directly, with Rust accelerating the critical processing to keep responses under 100ms.',
        },
        practice: {
            es: 'Demuestra cómo combinar un componente de sistemas de bajo nivel (Rust, sin garbage collection, seguro en memoria) con un LLM en streaming para lograr una conversación de voz que se sienta natural: sin reactivación manual, con detección de idioma automática y respuesta continua.',
            en: 'It shows how to combine a low-level systems component (Rust, no garbage collection, memory-safe) with a streaming LLM to get a voice conversation that feels natural: no manual re-activation, automatic language detection, continuous back-and-forth.',
        },
        components: [
            { name: 'main.py', desc: { es: 'Backend FastAPI del modo rápido: WebSocket, contexto y streaming de Gemini.', en: 'FastAPI backend for the fast mode: WebSocket, context and Gemini streaming.' } },
            { name: 'test.py', desc: { es: 'Backend del modo híbrido: recibe audio binario y lo transcribe con Gemini.', en: 'Hybrid-mode backend: receives binary audio and transcribes it via Gemini.' } },
            { name: 'src/audio.rs', desc: { es: 'Decodificación y análisis de frecuencia de audio de baja latencia.', en: 'Low-latency audio decoding and frequency analysis.' } },
        ],
        run: `git clone https://github.com/Dan178A/RealtimeVoiceAssistant.git
cd RealtimeVoiceAssistant
pip install -r requirements.txt
python main.py`,
        requirements: [
            { es: 'Una GEMINI_API_KEY de Google Cloud (Gemini + Text-to-Speech habilitados).', en: 'A Google Cloud GEMINI_API_KEY (Gemini + Text-to-Speech enabled).' },
        ],
        oneLiner: {
            es: 'Asistente de voz en tiempo real con Gemini 2.5 Flash, streaming y componentes de audio críticos en Rust para respuestas por debajo de 100ms.',
            en: 'A real-time voice assistant powered by Gemini 2.5 Flash, streaming responses, with critical audio components in Rust for sub-100ms latency.',
        },
        ask: [
            '¿Qué parte hace Rust y qué parte Python, y por qué se dividió así?',
            '¿Cómo funciona el streaming de la respuesta de Gemini en el navegador?',
        ],
    },

    'Traffic_Simulation_Model': {
        whatThis: {
            es: 'Modelo macroscópico de simulación de tráfico vehicular en una intersección: señales de tráfico con temporizador, generación aleatoria de vehículos por carril y dirección, y estadísticas de flujo en tiempo real.',
            en: 'A macroscopic vehicle-traffic simulation model at an intersection: timer-driven traffic signals, random vehicle generation by lane and direction, and real-time flow statistics.',
        },
        stack: {
            language: 'Python',
            runtime: 'Pygame',
            libs: ['matplotlib', 'scipy', 'numpy', 'pandas'],
        },
        howItFits: {
            es: 'Las señales de tráfico tienen tiempos de luz verde, amarilla y roja controlados por un temporizador. Los vehículos se generan aleatoriamente (tipo, carril y si van a girar) y se mueven según las señales y las condiciones de la intersección. El modelo cuenta el tiempo transcurrido y el total de vehículos que cruzaron, útil para evaluar el rendimiento del sistema de señalización.',
            en: "Traffic signals have timer-driven green/yellow/red phases. Vehicles are generated randomly (type, lane, and whether they'll turn) and move according to the signals and intersection conditions. The model tracks elapsed time and total vehicles that crossed, useful for evaluating how well the signal system performs.",
        },
        practice: {
            es: 'Es un enfoque macroscópico: no simula el comportamiento individual de cada conductor, sino el flujo agregado de vehículos por carril y dirección frente a un cruce semaforizado — el tipo de modelo que se usa para planificación y gestión de tráfico.',
            en: "It's a macroscopic approach: instead of simulating each driver individually, it models the aggregate flow of vehicles by lane and direction at a signaled intersection — the kind of model used for traffic planning and management.",
        },
        run: `pip install pygame matplotlib scipy numpy pandas
python simulation.py`,
        oneLiner: {
            es: 'Simulación macroscópica de tráfico vehicular en una intersección semaforizada, con generación aleatoria de vehículos y estadísticas de flujo.',
            en: 'A macroscopic traffic simulation at a signaled intersection, with random vehicle generation and flow statistics.',
        },
        ask: [
            '¿Cómo decide el modelo cuándo un vehículo puede girar?',
            '¿Qué estadísticas guarda la simulación y para qué sirven?',
        ],
    },
}
