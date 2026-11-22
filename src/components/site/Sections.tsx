import { useMemo, useState } from "react"
import { Building2, CalendarHeart, Check, Gift, Headset, Hotel, Mail, MessageCircle, ShieldCheck, Truck, UtensilsCrossed, Lock } from "lucide-react"
import { cn } from "@/lib/utils"
import { IMAGES, formatRD, wines, type Taste, type Wine, type WineType } from "@/data/wines"
import { CLUB_PLANS, SITE, waLink } from "@/lib/site"
import { Stars } from "./Shop"

function SectionTitle({ kicker, title, children, center }: { kicker: string; title: string; children?: React.ReactNode; center?: boolean }) {
  return (
    <div className={cn("max-w-2xl", center && "mx-auto text-center")}>
      <p className="text-xs tracking-[0.35em] text-primary">{kicker}</p>
      <h2 className="mt-3 font-display text-5xl leading-[1.05] sm:text-6xl">{title}</h2>
      {children && <p className="mt-5 text-[15px] leading-relaxed text-muted-foreground">{children}</p>}
    </div>
  )
}

const TRUST = [
  { icon: Lock, title: "Pago seguro", text: "Azul y CardNet" },
  { icon: Truck, title: "Entrega rápida", text: "Empaque protegido" },
  { icon: ShieldCheck, title: "Garantía de calidad", text: "Almacén con temperatura controlada" },
  { icon: Headset, title: "Asesoría por WhatsApp", text: "Antes, durante y después" },
]

export function Hero({ onShop }: { onShop: () => void }) {
  const picks = ["cabernet", "montepulciano", "pinot-noir"].map((id) => wines.find((w) => w.id === id)!)
  return (
    <section id="inicio" className="relative overflow-hidden">
      <img src={IMAGES.hero} alt="" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 pb-14 pt-14 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:pb-20 lg:pt-20">
        <div>
          <p className="text-xs tracking-[0.4em] text-primary">VINOS NACIONALES E IMPORTADOS</p>
          <h1 className="mt-5 font-display text-[15vw] leading-[0.92] sm:text-7xl lg:text-[6.5rem]">
            Vinos que cuentan <span className="brand-gradient">su origen</span>
          </h1>
          <p className="mt-6 max-w-lg text-[15px] leading-relaxed text-muted-foreground">
            La confianza y el trato experto de una vinoteca, ahora en línea. Etiquetas seleccionadas de Argentina, Chile, España, Francia, Italia y más, entregadas en tu puerta en República Dominicana.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button onClick={onShop} className="rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground transition hover:brightness-110">Comprar ahora</button>
            <a href="#club" className="rounded-full border bg-background/30 px-7 py-3.5 text-sm backdrop-blur transition hover:bg-white/10">Unirme al Club TradeVino</a>
          </div>
        </div>
        <div className="relative mx-auto flex h-[380px] w-full max-w-[460px] items-end justify-center gap-3 sm:h-[480px]">
          {picks.map((w, i) => (
            <div
              key={w.id}
              className={cn(
                "overflow-hidden rounded-t-full border-2 border-[#efe6d6]/25 shadow-2xl",
                i === 1 ? "z-10 h-full w-[38%]" : "h-[78%] w-[30%]",
              )}
            >
              <img src={w.image} alt={w.alt} className="h-full w-full object-cover" />
            </div>
          ))}
        </div>
      </div>

      <div className="relative border-y bg-background/70 backdrop-blur">
        <div className="mx-auto grid max-w-7xl grid-cols-2 lg:grid-cols-4">
          {TRUST.map(({ icon: Icon, title, text }, i) => (
            <div key={title} className={cn("flex items-start gap-3 px-4 py-5 sm:px-8", i % 2 === 0 && "border-r", i === 1 && "lg:border-r", i < 2 && "border-b lg:border-b-0")}>
              <Icon className="mt-0.5 size-5 shrink-0 text-primary" strokeWidth={1.5} />
              <div><p className="text-sm font-semibold">{title}</p><p className="text-xs text-muted-foreground">{text}</p></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function FeaturedIntro() {
  return (
    <div id="destacados" className="rule-top mx-auto max-w-7xl scroll-mt-28 px-4 pb-6 pt-20 sm:px-8">
      <SectionTitle kicker="SELECCIÓN DE LA CASA" title="Destacados del mes">
        Desliza para recorrer la bodega. Cada etiqueta muestra país, uva, añada y notas de cata para que elijas con confianza.
      </SectionTitle>
    </div>
  )
}

type Kind = "Todos" | WineType

export function Recommender({ onAdd, onOpen }: { onAdd: (w: Wine) => void; onOpen: (w: Wine) => void }) {
  const [taste, setTaste] = useState<Taste>("intenso")
  const [kind, setKind] = useState<Kind>("Todos")
  const [budget, setBudget] = useState(2000)
  const pick = useMemo(() => {
    return wines
      .map((w) => ({ w, s: (w.taste.includes(taste) ? 2 : 0) + (kind === "Todos" || w.type === kind ? 3 : -5) + (w.price <= budget ? 1.5 : -3) + w.rating / 10 }))
      .sort((a, b) => b.s - a.s)[0].w
  }, [taste, kind, budget])

  const chip = (active: boolean) => "rounded-full border px-4 py-2 text-sm capitalize transition " + (active ? "border-primary bg-primary text-primary-foreground" : "hover:bg-white/5")

  return (
    <section id="recomendador" className="rule-top mx-auto max-w-7xl scroll-mt-28 px-4 py-20 sm:px-8">
      <div className="grid gap-12 lg:grid-cols-2">
        <div>
          <SectionTitle kicker="RECOMENDADOR DE VINOS" title="¿No sabes cuál elegir?">
            Cuéntanos qué estilo te gusta, qué tipo de vino prefieres y cuánto quieres invertir. Te sugerimos la botella ideal.
          </SectionTitle>
          <div className="mt-10 space-y-7">
            <div>
              <p className="mb-3 text-xs tracking-[0.25em] text-muted-foreground">ESTILO</p>
              <div className="flex flex-wrap gap-2">
                {(["intenso", "suave", "fresco", "dulce"] as Taste[]).map((t) => <button key={t} className={chip(taste === t)} onClick={() => setTaste(t)}>{t}</button>)}
              </div>
            </div>
            <div>
              <p className="mb-3 text-xs tracking-[0.25em] text-muted-foreground">TIPO DE VINO</p>
              <div className="flex flex-wrap gap-2">
                {(["Todos", "Tinto", "Blanco", "Rosado"] as Kind[]).map((k) => <button key={k} className={chip(kind === k)} onClick={() => setKind(k)}>{k}</button>)}
              </div>
            </div>
            <div>
              <p className="mb-3 text-xs tracking-[0.25em] text-muted-foreground">PRESUPUESTO MÁXIMO · {formatRD(budget)}</p>
              <input type="range" min={1200} max={2500} step={50} value={budget} onChange={(e) => setBudget(+e.target.value)} className="w-full accent-[var(--color-primary)]" aria-label="Presupuesto máximo" />
            </div>
          </div>
        </div>
        <div className="relative overflow-hidden rounded-3xl border bg-card">
          <div className="grid sm:grid-cols-[0.8fr_1fr]">
            <button onClick={() => onOpen(pick)} className="aspect-[4/5] overflow-hidden sm:aspect-auto" aria-label={`Ver ${pick.name}`}>
              <img src={pick.image} alt={pick.alt} className="h-full w-full object-cover" />
            </button>
            <div className="p-7 sm:p-8">
              <p className="text-xs tracking-[0.3em] text-primary">TE RECOMENDAMOS</p>
              <h3 className="mt-4 font-display text-4xl leading-tight">{pick.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{pick.region}, {pick.country} · {pick.vintage}</p>
              <div className="mt-2 flex items-center gap-2"><Stars value={pick.rating} /><span className="text-xs text-muted-foreground">{pick.rating.toFixed(1)}</span></div>
              <p className="mt-4 font-display text-3xl text-primary">{formatRD(pick.price)}</p>
              <p className="mt-4 text-sm leading-relaxed">{pick.description}</p>
              <ul className="mt-4 flex flex-wrap gap-2">{[pick.grape, ...pick.notes.slice(0, 3)].map((x) => <li key={x} className="rounded-full bg-white/10 px-3 py-1 text-xs">{x}</li>)}</ul>
              <button onClick={() => onAdd(pick)} className="mt-7 rounded-full bg-primary px-7 py-3 text-sm font-semibold text-primary-foreground transition hover:brightness-110">Añadir al carrito</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export function Club() {
  return (
    <section id="club" className="rule-top relative scroll-mt-28 overflow-hidden">
      <img src={IMAGES.cellarWall} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-15" />
      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-8">
        <SectionTitle center kicker="CLUB TRADEVINO" title="Elige tu plan mensual">
          Una selección curada de vinos nacionales e importados cada mes, con catas virtuales y puntos por compras y referidos. Cancela cuando quieras.
        </SectionTitle>
        <div className="mx-auto mt-14 grid max-w-5xl gap-5 md:grid-cols-3 md:items-center">
          {CLUB_PLANS.map((p) => (
            <article key={p.id} className={cn("rounded-3xl border p-8", p.featured ? "border-2 border-primary bg-gradient-to-b from-[#6a0f16] to-card md:scale-105" : "bg-card/80 backdrop-blur")}>
              <p className="flex items-center gap-2 text-xs tracking-[0.3em] text-primary">
                {p.name.toUpperCase()}
                {p.featured && <span className="rounded-full bg-primary px-2 py-0.5 text-[9px] font-bold tracking-wider text-primary-foreground">MÁS ELEGIDO</span>}
              </p>
              <p className="mt-4 font-display text-5xl">{formatRD(p.price)}<span className="font-sans text-sm text-muted-foreground"> /mes</span></p>
              <ul className="mt-6 space-y-3 text-sm">
                {p.perks.map((perk) => <li key={perk} className="flex gap-2.5"><Check className="mt-0.5 size-4 shrink-0 text-primary" />{perk}</li>)}
              </ul>
              <a
                href={waLink(`Hola, quiero suscribirme al plan ${p.name} del Club TradeVino (${formatRD(p.price)}/mes).`)}
                target="_blank"
                rel="noreferrer"
                className={cn("mt-8 block rounded-full py-3 text-center text-sm font-semibold transition", p.featured ? "bg-primary text-primary-foreground hover:brightness-110" : "border hover:bg-white/5")}
              >
                Elegir {p.name}
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export function Gifts() {
  return (
    <section id="regalos" className="rule-top mx-auto max-w-7xl scroll-mt-28 px-4 py-20 sm:px-8">
      <div className="grid overflow-hidden rounded-3xl border bg-card lg:grid-cols-2">
        <img src={IMAGES.toast} alt="Brindis con copas de vino tinto" loading="lazy" className="h-72 w-full object-cover lg:h-full" />
        <div className="p-8 sm:p-12">
          <Gift className="size-7 text-primary" strokeWidth={1.5} />
          <h3 className="mt-4 font-display text-5xl">Cajas de regalo</h3>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">Listas para cumpleaños, aniversarios y fiestas: vino, copas y descorchador con empaque elegante y mensaje personalizado.</p>
          <ul className="mt-6 space-y-2.5 text-sm">
            {["Caja Dúo: dos botellas a elección", "Caja Celebración: vino y dos copas", "Accesorios: copas y descorchadores", "Regalos corporativos con tu marca"].map((x) => (
              <li key={x} className="flex gap-2.5"><Check className="mt-0.5 size-4 shrink-0 text-primary" />{x}</li>
            ))}
          </ul>
          <a href={waLink("Hola, quiero armar una caja de regalo.")} target="_blank" rel="noreferrer" className="mt-8 inline-block rounded-full bg-primary px-7 py-3 text-sm font-semibold text-primary-foreground transition hover:brightness-110">Armar mi caja</a>
        </div>
      </div>
    </section>
  )
}

const SEGMENTS = [
  { icon: UtensilsCrossed, title: "Restaurantes", text: "Carta de vinos a la medida y precios por volumen." },
  { icon: Hotel, title: "Hoteles", text: "Abastecimiento recurrente para habitaciones, bares y eventos." },
  { icon: CalendarHeart, title: "Eventos", text: "Bodas, galas y eventos corporativos con asesoría de nuestros expertos." },
  { icon: Building2, title: "Regalos corporativos", text: "Cajas personalizadas con tu marca para clientes y equipos." },
]

export function Business() {
  return (
    <section id="empresas" className="rule-top relative scroll-mt-28 overflow-hidden">
      <img src={IMAGES.tasting} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-25" />
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/60" />
      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-8">
        <SectionTitle kicker="VENTAS CORPORATIVAS" title="TradeVino para empresas">
          Un gestor de cuenta dedicado, precios por caja y entregas programadas para tu negocio.
        </SectionTitle>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SEGMENTS.map(({ icon: Icon, title, text }) => (
            <div key={title} className="rounded-2xl border bg-background/60 p-6 backdrop-blur">
              <Icon className="size-6 text-primary" strokeWidth={1.5} />
              <h3 className="mt-4 font-semibold">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
            </div>
          ))}
        </div>
        <a href={waLink("Hola, quiero una cotización corporativa de TradeVino Global.")} target="_blank" rel="noreferrer" className="mt-10 inline-block rounded-full bg-primary px-7 py-3 text-sm font-semibold text-primary-foreground transition hover:brightness-110">Solicitar cotización</a>
      </div>
    </section>
  )
}

export function Footer() {
  return (
    <footer id="contacto" className="rule-top">
      <div className="mx-auto max-w-7xl px-4 pb-28 pt-20 sm:px-8 md:pb-10">
        <h2 className="text-center font-display text-[17vw] leading-none brand-gradient sm:text-[9rem]">TradeVino Global</h2>
        <div className="mt-14 grid gap-10 text-sm sm:grid-cols-3">
          <div>
            <p className="text-xs tracking-[0.3em] text-primary">CONTACTO</p>
            <a href={waLink("Hola TradeVino Global")} target="_blank" rel="noreferrer" className="mt-4 flex items-center gap-2 hover:text-primary"><MessageCircle className="size-4" /> WhatsApp Business</a>
            <a href={"mailto:" + SITE.email} className="mt-2 flex items-center gap-2 hover:text-primary"><Mail className="size-4" /> {SITE.email}</a>
          </div>
          <div>
            <p className="text-xs tracking-[0.3em] text-primary">SÍGUENOS</p>
            <div className="mt-4 flex flex-wrap gap-3">
              {[["Instagram", SITE.instagram], ["Facebook", SITE.facebook], ["TikTok", SITE.tiktok]].map(([name, href]) => (
                <a key={name} href={href} target="_blank" rel="noreferrer" className="rounded-full border px-4 py-2 text-xs font-semibold hover:bg-white/10">{name}</a>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs tracking-[0.3em] text-primary">PAGOS SEGUROS</p>
            <div className="mt-4 flex flex-wrap gap-2 text-xs">
              {["Azul", "CardNet", "Visa", "Mastercard"].map((p) => <span key={p} className="rounded-md border px-3 py-1.5">{p}</span>)}
            </div>
          </div>
        </div>
        <div className="mt-14 flex flex-col justify-between gap-3 border-t pt-6 text-xs text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} {SITE.legal} · {SITE.domain} · República Dominicana</p>
          <p>Venta exclusiva a mayores de 18 años. Disfruta con moderación. Fotos: Unsplash.</p>
        </div>
      </div>
    </footer>
  )
}

