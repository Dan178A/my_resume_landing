/* Google Analytics 4, solo en el navegador y solo si hay un ID de medición.
   - VITE_GA_ID=G-XXXXXXXXXX en .env.local y en Vercel > Settings > Environment Variables.
   - En localhost, tests y prerender no se carga nada y track() no hace nada.
   Las conversiones se registran por delegación: cualquier enlace o botón con
   data-track="<evento>" envía ese evento al hacer clic; los enlaces a WhatsApp,
   correo y LinkedIn se detectan solos. En GA4 conviene marcar book_call y
   generate_lead como "eventos clave". */

type Params = Record<string, string | number | boolean | undefined>

declare global {
    interface Window {
        dataLayer?: unknown[]
        gtag?: (...args: unknown[]) => void
    }
}

/* El ID de medición es público (va en el HTML de cualquier sitio con GA4).
   VITE_GA_ID lo sobrescribe; en localhost no se carga para no ensuciar los datos. */
const gaId = (import.meta.env.VITE_GA_ID as string | undefined) || 'G-EBRMXZDL31'
const isLocalHost = (h: string) => h === 'localhost' || h === '127.0.0.1' || h.endsWith('.localhost')
let ready = false

export const track = (event: string, params: Params = {}) => {
    if (!ready || !window.gtag) return
    window.gtag('event', event, params)
}

const autoEvent = (href: string): string | undefined => {
    if (href.includes('wa.me/')) return 'whatsapp_click'
    if (href.startsWith('mailto:')) return 'email_click'
    if (href.includes('linkedin.com/')) return 'linkedin_click'
    if (href.includes('github.com/')) return 'github_click'
    return undefined
}

const onClick = (e: MouseEvent) => {
    const el = (e.target as Element | null)?.closest<HTMLElement>('a, button')
    if (!el) return
    const href = el instanceof HTMLAnchorElement ? el.href : ''
    const event = el.dataset.track ?? autoEvent(href)
    if (!event) return
    track(event, {
        link_url: href || undefined,
        location: el.closest('section[id], nav, .mobile-cta')?.id || el.closest('nav, .mobile-cta')?.className.split(' ')[0],
    })
}

export const initAnalytics = (lang: string) => {
    if (ready || !gaId || typeof window === 'undefined' || isLocalHost(window.location.hostname)) return
    window.dataLayer = window.dataLayer || []
    window.gtag = function gtag() {
        // gtag exige el objeto arguments, no un array
        // eslint-disable-next-line prefer-rest-params
        window.dataLayer!.push(arguments)
    }
    window.gtag('js', new Date())
    window.gtag('config', gaId, { site_language: lang })

    const s = document.createElement('script')
    s.async = true
    s.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(gaId)}`
    document.head.appendChild(s)

    document.addEventListener('click', onClick, { capture: true })
    ready = true
}
