import type { Lang, Page } from './useI18n'

/* JSON-LD que cambia por URL. Lo común (Person, WebSite, proyectos) vive en
   index.html; aquí va lo que depende de la página y del idioma: el nodo de la
   página (url + inLanguage correctos) y un FAQPage cuyas preguntas están en el
   idioma de esa URL y tratan del contenido de esa página. */

const SITE = 'https://www.danielsilvarojas.dev'
const PERSON = { '@id': `${SITE}/#person` }

type QA = [question: string, answer: string]

const pricingEn: QA = [
  'How much does a software performance and architecture audit cost?',
  'Between $800 and $2,500 USD for a 1–3 week engagement, depending on system size. It covers latency, memory-leak and concurrency diagnosis, a map of single points of failure, a refactor roadmap prioritized by impact versus cost, and a handover session with your team. Larger options are a custom system built end to end (from $3,000 USD per project, 3–12 weeks) and a fractional systems engineer retainer ($1,800–3,500 USD per month at 10–20 h/week). Landing pages with SEO, GEO and AEO start at $300 USD. Hourly rate is $35–65 USD depending on the work.',
]

const pricingEs: QA = [
  '¿Cuánto cuesta una auditoría de rendimiento y arquitectura de software?',
  'Entre $800 y $2.500 USD por un trabajo de 1 a 3 semanas, según el tamaño del sistema. Incluye diagnóstico de latencia, fugas de memoria y concurrencia, un mapa de puntos únicos de falla, una hoja de ruta de refactor priorizada por impacto frente a costo y una sesión de traspaso con tu equipo. Las opciones mayores son un sistema a medida de punta a punta (desde $3.000 USD por proyecto, 3 a 12 semanas) y un ingeniero de sistemas fraccional ($1.800–3.500 USD al mes, 10–20 h/semana). Las landings con SEO, GEO y AEO parten de $300 USD. La tarifa por hora es de $35–65 USD según el trabajo.',
]

const hireEn: QA = [
  'Where can I hire a freelance real-time systems engineer who overlaps US hours?',
  'Daniel Silva works 100% remote from Caracas, Venezuela, with working hours that overlap the Americas, and contracts through Deel, Payoneer or crypto. He takes freelance engagements in industrial IoT, real-time telemetry, offline-first architecture, computer vision and OCR, and backend data pipelines, and is also open to senior full-time remote roles in the US, Canada, Europe and LATAM.',
]

const contactEs: QA = [
  '¿Cómo lo contacto?',
  'Por correo a dsrglrm@gmail.com, WhatsApp al +58 414-231-7561, o LinkedIn (daniel-alejandro-silva-rojas). Responde en menos de 24 horas y la primera llamada de 30 minutos no tiene costo.',
]

const faqs: Record<Page, Record<Lang, QA[]>> = {
  home: {
    en: [
      [
        'Who can build industrial IoT software that runs unattended in the field?',
        'Daniel Silva builds exactly this kind of system. His industrial hardware-control application coordinates networked equipment with no technical support present on site: it starts with zero manual setup by the operator, and every network boundary has an explicit timeout so a disconnected machine never freezes the interface. It has been in real field use for five years.',
      ],
      [
        'How do you cut real-time latency when HTTP polling is too slow?',
        'By replacing polling with a full-duplex WebSocket architecture. On an industrial Digital Twin telemetry system, Daniel Silva took end-to-end latency from 200–500 ms down to 1–10 ms while reducing bandwidth by up to 95%, because the server pushes state changes instead of the client asking repeatedly for data that has not changed.',
      ],
      [
        'Can a plant system keep working with no internet and sync later?',
        'Yes, with an offline-first architecture. Daniel Silva has shipped a desktop ecosystem that runs 100% offline on plant floors and reconciles bidirectionally with the cloud when connectivity returns, using per-endpoint sync state, connectivity detection and retries, so no field work is lost. It ships as a self-contained installer that resolves its own dependencies.',
      ],
      hireEn,
    ],
    es: [
      [
        '¿Quién puede construir un sistema industrial offline-first en Latinoamérica?',
        'Daniel Silva construye este tipo de sistemas desde Caracas, Venezuela, trabajando 100% remoto. Ha llevado a producción un ecosistema de escritorio que opera sin conexión en planta y sincroniza de forma bidireccional con la nube al recuperar conectividad, además de un sistema de control de hardware IoT industrial en uso real en campo desde hace cinco años.',
      ],
      [
        '¿Cómo se reduce la latencia de un sistema de telemetría industrial?',
        'Reemplazando el polling HTTP por una arquitectura WebSocket full-duplex. En un Digital Twin industrial de monitoreo estructural, Daniel Silva llevó la latencia de 200–500 ms a 1–10 ms y redujo el ancho de banda hasta en un 95%, porque el servidor empuja los cambios de estado en lugar de que el cliente pregunte una y otra vez por datos que no cambiaron.',
      ],
      [
        '¿Puedo ver el código de sus sistemas de producción?',
        'Los cuatro sistemas de producción son repositorios privados de cliente bajo confidencialidad, por lo que se describe la arquitectura y las decisiones técnicas, nunca datos del negocio. El código abierto disponible está en github.com/Dan178A y la arquitectura de los sistemas privados se puede recorrer en una llamada.',
      ],
      contactEs,
    ],
  },
  services: {
    en: [pricingEn, hireEn],
    es: [pricingEs, contactEs],
  },
}

export function pageStructuredData(lang: Lang, page: Page, url: string, name: string) {
  const pageNode = {
    '@type': page === 'home' ? 'ProfilePage' : 'WebPage',
    '@id': `${url}#webpage`,
    url,
    name,
    inLanguage: lang,
    isPartOf: { '@id': `${SITE}/#website` },
    about: PERSON,
    ...(page === 'home' ? { mainEntity: PERSON } : {}),
  }
  const faqNode = {
    '@type': 'FAQPage',
    '@id': `${url}#faq`,
    inLanguage: lang,
    mainEntity: faqs[page][lang].map(([q, a]) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  }
  return { '@context': 'https://schema.org', '@graph': [pageNode, faqNode] }
}
