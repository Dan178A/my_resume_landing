# Plan para conseguir chamba — noviembre 2026

Revisado el 2026-11-02 con tu cuenta de Upwork, tu sitio en vivo y ofertas públicas.
Nada de esto se envió ni se publicó. Todo lo que sale a terceros lo mandas tú.

> **Actualización:** descartaste CLIPS el 2026-11-02 por ser demasiado rebuscada. La prioridad ahora es la oferta de Supabase de Noruega. Connects disponibles: 108.

## 1. Hoy: conseguir la primera reseña

Upwork te da 10 Connects por cada tarea de perfil pendiente, y hoy tienes 8.

1. Completa **Other experiences** (+10) y **Video introduction** (+10). Con eso llegas a 28.
2. Graba un Loom de 1 a 2 minutos con el enfoque de abajo.
3. Envía la propuesta **CLIPS** (14 Connects).
4. Con los 14 restantes, aplica a la oferta de Supabase de Noruega si su costo te alcanza. Upwork lo muestra antes de enviar.

### Ofertas de Upwork

| Prioridad | Oferta | Pago | Por qué | Riesgo |
|---|---|---|---|---|
| 1 | [Fix our AI video clip pipeline](https://www.upwork.com/jobs/~022117432535354649206) | $500 fijo | Menos de 5 propuestas, 67 % de contratación, reseñas 5.0, posible proyecto siguiente. Reel Studio ya resuelve reanudación y respaldos. | Pide haber usado APIs de video/imagen con IA. Tu experiencia es con visión local. Dilo tal cual. Se cobra al funcionar la prueba. |
| 2 | [Senior Supabase / PostgreSQL Backend](https://www.upwork.com/jobs/~022117212682533446680) | $30–50/h, +6 meses | Es DropAudio casi exacto: Postgres, Supabase, TypeScript. | Ya tiene 50+ propuestas. |
| 3 | [On-call React / Node / AWS](https://www.upwork.com/jobs/~022117429481168454129) | $30–60 fijo, luego $15–20/h | Cliente con 97 % de contratación, 5.0, $33.9K gastados. Sirve solo para sumar una reseña. | Tarifa baja y pide Amplify + Elastic Beanstalk. Salta esta si no los has usado. |

**Evita** [Looking for a Full Stack Developer](https://www.upwork.com/jobs/~022117400576792509542): buscan a alguien que haga las entrevistas con clientes en nombre de sus desarrolladores. Es suplantación y puede costarte la cuenta.

### Propuesta CLIPS (revisa y ajusta)

> CLIPS
>
> Your pipeline has three separate problems: one-at-a-time generation, retries that can pay twice, and failures with no visible reason. I would fix them in that order of risk, starting with the double charge.
>
> 1. Give every clip a unique job key in Postgres, so a retry reuses a finished or in-flight result instead of paying again.
> 2. Run clips through a bounded worker pool, with concurrency set from Higgsfield's real rate limits.
> 3. Retry only temporary errors, with backoff, and save the failure reason where the app can show it.
> 4. Measure your current numbers first, then run the approved test batch against them.
>
> Something real I built: DropAudio Reel Studio, a Python and ffmpeg pipeline that transcribes footage, scores each take with vision models and assembles the edit. It cut a reel from about 2 hours to about 15 minutes. A crash costs one file, not the whole run, and it falls back to rules if the model fails.
> Code: https://github.com/Dan178A/dropaudio-reel-studio
>
> To be direct: it uses local models, so I have not used Higgsfield itself. The reliability work is the same, and I would confirm its limits in the first hour.
>
> Loom: [TU ENLACE]

**Loom:** enséñale Reel Studio 30 segundos, abre el código de la reanudación y explica los 4 pasos. Sin guion leído.

## 2. Esta semana: cambiar tu perfil de Upwork

- **Título actual:** Full-Stack & AI Engineer | Python, FastAPI, Supabase, Computer Vision
- **Título propuesto:** Senior Backend Engineer | Python, Supabase, Real-Time & AI Pipelines
- **Tarifa:** deja $35/h hasta tener 3 reseñas. Luego sube a $45.
- **Reseñas:** cambia "110+ verified reviews" por 120+, para que coincida con tu sitio.
- **Inglés:** dice Conversational y tu CV dice B2 profesional. Súbelo a Fluent solo si sostienes una llamada técnica completa.
- **Precio de las propuestas:** usa una sola regla: $35/h, o precio fijo calculado a esa tarifa.
- **Fijo sobre hora:** prefiere trabajos pequeños de alcance claro y menos de 15 propuestas. Con 0 reseñas, compites mal en los de 50+.

## 3. Esta semana: empleo remoto

Tu meta sigue siendo ≥ $2.500/mes. Aplica en inglés, con el CV de backend.

| Prioridad | Oferta | Pago | Encaje | Riesgo |
|---|---|---|---|---|
| 1 | [WiTi — Backend NestJS / AWS](https://www.getonbrd.com/jobs/programming/back-end-software-engineer-nestjs-cloud-native-aws-witi-remote) | No publicado | Publicada hoy: aplicas temprano. | Pide NestJS, Terraform y DynamoDB. |
| 2 | [Zaelot — Backend Python/Django](https://www.getonbrd.com/jobs/programming/backend-software-engineer-zaelot-remote-fbc2) | $4.000–6.500/mes | Python y PostgreSQL en producción, equipo en EE. UU. | Pide 4+ años de Django e inglés C1. |
| 3 | [Continuum — Full-Stack Node/React/AWS](https://www.getonbrd.com/jobs/programacion/fullstack-engineer-senior-node-js-react-aws-continuum-remote) | $3.000–3.600/mes | Empresa que ya tenías en seguimiento, horario de Chile. | 563 postulaciones. Tu front es Vue. |
| 4 | [Proxify — Senior Node/Nest](https://weworkremotely.com/remote-jobs/proxify-ab-senior-backend-developer-node-js-nest-js-4) | No visible | Marcada "Anywhere in the World". | No pude abrirla. Revisa la lista de países. |

Las de Get on Board dicen "anywhere in the world", pero ninguna nombra a Venezuela. Pregunta esto antes de hacer una prueba técnica:

> Quick check before we continue: I'm based in Venezuela and work as an independent contractor. Can you pay contractors there, and through which method?

## 4. Cobros: corrección del reporte

| Herramienta | Estado para ti |
|---|---|
| **Wise** | **No sirve.** Venezuela está en su lista oficial de países no soportados. Usarla desde aquí puede restringir la cuenta. |
| **Contra** | Sin confirmar. Ofrece Payoneer, PayPal y cripto, pero no pude ver su lista por país. Confírmalo antes de pagar Pro o cerrar un cliente allí. |
| **Stripe** | No encontré confirmación de pagos a Venezuela. No lo prometas a un cliente. |
| **Deel** | Su blog menciona Payoneer, PayPal y stablecoins para Venezuela, pero no es una lista oficial. Revísalo en tu panel de retiro. |
| **Upwork** | Antes del primer contrato, confirma tu método de retiro en Get Paid. |
| **Sanciones** | OFAC viene aflojando licencias en 2026, pero no hallé nada claro sobre contratistas individuales. Si una empresa duda, que lo revise su área legal. |

## 5. Otras correcciones al reporte

- **Upwork no cobra 10 % fijo:** fuentes de terceros indican 0–15 % variable desde 2025. El porcentaje se ve antes de enviar la propuesta.
- **Upwork sí permite clientes propios:** tiene Direct Contracts. Terceros reportan 5 % en plan Basic y 0 % en Plus.
- **Tu perfil de Upwork es público:** el reporte decía que era privado. No pude verificar si Google lo indexa.
- **Los Connects cuestan más de lo que dice:** te han cobrado de 9 a 27 por propuesta, no de 4 a 16.
- **BEON y Revelo:** no encontré si aceptan Venezuela. Pregúntalo antes de invertir en sus procesos.
- **Cifras de mercado:** no verifiqué el 250 % ni los rangos salariales. No las uses en mensajes a clientes.

## 6. Aparecer

- **Tu sitio funciona:** carga, tiene sitemap, robots y llms.txt, y ya habla de contratista W-8BEN y EOR. No hay que tocarlo ahora.
- **Google:** mi búsqueda por nombre y dominio no lo mostró. Esa prueba es limitada. Entra a Google Search Console, envía el sitemap y pide indexar la portada.
- **"Daniel Silva" es un nombre muy común:** usa siempre "Daniel Silva Rojas" en LinkedIn, GitHub y Contra, con enlace a danielsilvarojas.dev.
- **LinkedIn:** ya tienes 6 posts preparados en `Claude outputs/linkedin/`. Si no están publicados, saca dos por semana.
- **Contra:** crea el perfil solo cuando confirmes el cobro. Reusa el título propuesto arriba.

## 7. Desde la semana 2: contacto directo

No esperes al mes 3, porque no dependes de reseñas. Envía **10 mensajes por semana**, no 30, a CTOs o fundadores de SaaS de 20 a 150 personas con una vacante backend abierta hace más de 30 días, o con funciones en tiempo real.

> Subject: Real-time backend at [Company]
>
> Hi [Name], I saw [Company] has had a backend role open since [month], and that [specific detail].
>
> I replaced HTTP polling with full-duplex WebSockets on an industrial system: latency went from 200–500 ms to 1–10 ms, and bandwidth dropped by up to 95%.
>
> If [specific problem] is on your roadmap, I could cover it as a contractor while you hire. Worth a 15-minute call?
>
> Daniel Silva Rojas
> https://www.danielsilvarojas.dev

Seguimiento: día 3, día 7 y cierre el día 14. Mantén todo caso de cliente genérico y no menciones clientes ni datos del NDA.

## 8. Plataformas fuera de Upwork (revisado 2026-11-02)

| Prioridad | Plataforma | Tipo | Cobro desde Venezuela | Nota |
|---|---|---|---|---|
| 1 | Get on Board | Empleo | Lo define cada empresa | Sin comisión y con salario en USD. Ya tiene ofertas listas en la sección 3. |
| 2 | Workana | Freelance LATAM | PayPal o Payoneer, mínimo $50. Su ayuda lista AirTM vía Payoneer para Venezuela. | Proyectos más baratos. Terceros reportan 20 % que baja con cada cliente. |
| 3 | Lemon.io, Arc.dev, Proxify | Redes con evaluación técnica | Sin confirmar | Se aplica una vez, sin pagar por propuesta. Las tarifas son mejores. Pregunta por Venezuela primero. |
| 4 | Fiverr | Servicios publicados (gigs) | Payoneer, sin confirmar para Venezuela | 20 %. Sirve para que te encuentren: 2 gigs concretos, como auditoría de RLS en Supabase o tiempo real con WebSockets. |
| 5 | Toptal | Red élite | Sin confirmar | Proceso largo y difícil. Mejor después. |

Descartadas por ahora: Freelancer.com, por ser subasta a la baja, y Torre, sin ofertas backend en su página de Venezuela.

## 9. Cómo medir si funciona

| Semana | Objetivo |
|---|---|
| 1 | CLIPS enviada, perfil actualizado, 3 empleos aplicados, Search Console listo |
| 2 | 3 propuestas de Upwork y 10 mensajes directos |
| 3 | Revisar: propuestas vistas, respuestas, entrevistas |

**Regla:** si tras 5 propuestas nuevas ninguna se ha visto, no compres más Connects. Cambia el título y las dos primeras líneas de la propuesta.

## Fuentes

- [Wise: países soportados](https://wise.com/help/articles/2978049/which-countries-can-i-use-wise-in)
- [Contra: métodos de retiro](https://help.contra.com/en/articles/10008642-payout-methods-on-contra)
- [Deel: cobrar desde Venezuela](https://www.deel.com/es/blog/stablecoin-cobrar-en-dolares-desde-venezuela/)
- [OFAC: acción del 16 de octubre de 2026](https://ofac.treasury.gov/recent-actions/20261016)
- [Upwork fees 2026 (tercero)](https://golance.com/blogs/upwork-fees-explained-2026)
- [Stripe: pagos transfronterizos](https://docs.stripe.com/connect/cross-border-payouts)
