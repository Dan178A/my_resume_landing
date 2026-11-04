# Postulaciones preparadas — 2026-11-04

Ninguna está enviada. Revisa, ajusta y envía tú desde Get on Board.
Datos usados: solo lo que ya está en tu llms.txt, CV y tu borrador de Interfell. Nada inventado.

> Ya enviadas antes (no repetir): SugarShan (WebRTC/LiveKit, 2 nov, sin leer), Vetclaims, Zaelot, JustInsurance, Niuro Web App Full-Stack, Niuro AI Back-end, Continuum, WiTi, BC Tecnología, etc.

---

## 1. AI Engineer — Vixiees (vía Interfell) · $5.000–6.000/mes · 59 postulantes

Link: https://www.getonbrd.com/jobs/machine-learning-ai/ai-engineer-interfell-remote
Estado: **borrador ya creado en Get on Board, "POR ENVIAR"**. Solo falta enviarlo.

Tu borrador ya es bueno. Cambios sugeridos (opcionales):

**a) Reemplazar el párrafo "To be direct…" por:**

> To be direct: I have not shipped the Vercel AI SDK in production yet. My LLM work calls provider APIs directly from Python and TypeScript (streaming, tool calls, fallbacks), which is the layer the AI SDK wraps, so I expect to be productive with it in days, not weeks. I use Claude and Claude Code daily. Evaluation, tracing, fallbacks, and cost and latency control are problems I already work on in production.

**b) Añadir una línea al bloque "Relevant to this role" sobre seguridad de agentes (lo piden explícitamente):**

> - Guardrails for autonomous actions: in industrial systems that drive real hardware unattended, I design explicit timeouts at every network boundary, safe fallbacks and audit logs, the same discipline agents that take actions need.

**c) Expectativa salarial:** 5.000 está bien (piso del rango). Si quieres, sube a **5.500**: estás dentro del rango y tu perfil cubre los opcionales (voz en tiempo real, STT/TTS).

---

## 2. Senior AI Engineer — Niuro · sin salario publicado (Niuro suele pagar $4.000–5.000) · 55 postulantes

Link: https://www.getonbrd.com/jobs/machine-learning-ai/senior-ai-engineer-niuro-remote-b1c5
Elegibilidad: Sudamérica ✅ · Requisito: 5+ años ✅, Python/FastAPI ✅, AWS ✅, CI/CD ✅ · **Inglés C1 ⚠️ (tienes B2)**

### Perfil / carta (en inglés)

> Senior Software Engineer with 5 years building and operating production systems, focused on real-time backends and applied AI. Python (FastAPI) and TypeScript in production, deployed on AWS with CI/CD.
>
> What maps directly to this role:
>
> - Production AI services: built and operated an AI audio transcription pipeline (FastAPI) inside an offline-first industrial ecosystem with bidirectional cloud↔local sync, self-contained installers and CI/CD on GitHub Actions. Principal author since inception.
> - LLM integration with deterministic scaffolding: real-time voice assistant streaming LLM responses (Gemini Live) over WebSocket with Rust components; LLM content pipelines with resumable runs and rule-based fallback when the model fails.
> - Stabilizing systems under load: replaced HTTP polling with a full-duplex WebSocket architecture, cutting latency from 200–500 ms to 1–10 ms and bandwidth by up to 95%. Performance audits that took a 12–14 h point-cloud job down to 5 h.
> - Cloud and operations: NestJS and Docker services with GitLab CI, GitHub Actions and AWS CodePipeline; AWS (EC2, S3, RDS) migration to cloud-native microservices.
> - OCR / document AI: FastAPI + PaddleOCR microservice extracting structured data from documents (relevant to Textract / Document Intelligence work).
>
> I work best exactly where this role sits: inheriting a system that is fragile in production, finding the root cause, and making it boring and reliable without a rewrite.
>
> Based in Caracas, Venezuela. Fully remote, available immediately, five years working daily in English with a Canada-based team.

### ¿Por qué Niuro? (si lo preguntan)

> I want to own AI systems after the demo stage: debugging, stabilizing and operating them for real users. Niuro's model of embedding senior LATAM engineers with US companies, with the admin handled, lets me focus on exactly that.

**Expectativa salarial sugerida:** 4.500 USD.

---

## 3. AI Engineering Lead — Niuro · $5.500–6.000/mes · solo 18 postulantes (apuesta)

Link: https://www.getonbrd.com/jobs/programacion/ai-engineering-lead-niuro-remote
⚠️ Piden **8+ años** (tienes 5) e **inglés C1** (tienes B2). Pocas probabilidades, pero hay muy pocos postulantes y el puesto calza con lo que haces a diario (Claude Code, agentes en paralelo, revisión de código generado por IA). Envíala solo si te sientes cómodo con eso.
Requisito "macOS professional experience": **no lo pongas si no lo tienes**.

### Perfil / carta (en inglés)

> I'm applying knowing I'm below your 8-year bar, so I'll make the case with evidence.
>
> For 5 years I've been the principal author and integration point on production systems where failures are expensive: desktop software driving networked industrial hardware unattended, an offline-first ecosystem that reconciles with the cloud, and a web platform where I was the repository founder and integration point for a ~14-person team (~2,000 commits).
>
> Relevant to this role:
>
> - Agentic development as daily practice: I run Claude Code daily across parallel sessions, review AI-generated diffs and tests directly before anything merges, and keep handoffs recoverable.
> - Concurrency and root causes: I diagnose latency, memory-leak and concurrency problems for a living (offered as a paid audit). Example: a full-duplex WebSocket redesign took latency from 200–500 ms to 1–10 ms.
> - Systems languages: Rust, C++ and Python (PyO3) performance work; Git, shell and CLI every day.
> - Release verification: versioned Windows installers, automated tests and CI/CD for software that has to run on a plant floor with no support on site.
>
> I can walk you through real repositories and a live demo on a call.
>
> Based in Caracas, Venezuela. Fully remote, available immediately.

**Expectativa salarial sugerida:** 5.500 USD.

---

## Descartadas (y por qué)

- **SugarShan** — es la misma oferta a la que ya postulaste el 2 nov (aún sin leer; última respuesta de la empresa hace 3 meses).
- **Hostop Founding GTM Engineer** — es un puesto de ventas outbound (pide 5 años como SDR/BDR); no es tu perfil.
- **Niuro Senior Forward Deployed Engineer** — exige viajar a EE. UU. con visa B1/B2 o ESTA vigente. Si tienes visa, avísame y la preparo.
