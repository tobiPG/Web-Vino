import { useMemo, useState } from "react"
import {
  Building2, CalendarHeart, Clock, Gift, Hotel, Mail, MessageCircle,
  PackageCheck, ShieldCheck, ShoppingBag, Sparkles, Truck, UtensilsCrossed, Wine as WineIcon, Headset,
} from "lucide-react"
import { IMAGES, formatRD, wines, type Wine } from "@/data/wines"
import { SITE, waLink } from "@/lib/site"
import { NAV } from "./Overlays"

function SectionTitle({ kicker, title, children }: { kicker: string; title: string; children?: React.ReactNode }) {
  return (
    <div className="max-w-2xl">
      <p className="text-xs tracking-[0.35em] text-primary">{kicker}</p>
      <h2 className="mt-3 font-display text-5xl leading-[1.05] sm:text-6xl">{title}</h2>
      {children && <p className="mt-5 text-[15px] leading-relaxed text-muted-foreground">{children}</p>}
    </div>
  )
}

export function Hero({ cartCount, onCart }: { cartCount: number; onCart: () => void }) {
  return (
    <section id="inicio" className="relative min-h-svh overflow-hidden">
      <img src={IMAGES.hero} alt="" data-hide-on-error className="absolute inset-0 h-[58%] w-full object-cover" />
      <div className="absolute inset-0 h-[58%] bg-gradient-to-b from-[#5a1a10]/70 via-[#4a0a0c]/75 to-background" />
      <div className="absolute inset-x-0 bottom-0 h-[42%] bg-background" />

      <header className="rule-top relative z-10 mx-auto flex max-w-7xl items-center justify-between px-4 pt-8 sm:px-8">
        <a href="#inicio" className="font-display text-2xl tracking-wide">TradeVino</a>
        <nav className="hidden items-center gap-7 text-xs tracking-[0.2em] lg:flex">
          {NAV.slice(1).map((n) => (
            <a key={n.href} href={n.href} className="uppercase opacity-85 transition hover:text-primary hover:opacity-100">{n.label}</a>
          ))}
        </nav>
        <button onClick={onCart} className="relative rounded-full border bg-black/10 p-2.5 backdrop-blur transition hover:bg-white/10" aria-label="Abrir carrito">
          <ShoppingBag className="size-5" />
          {cartCount > 0 && (
            <span className="absolute -right-1 -top-1 grid size-5 place-items-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">{cartCount}</span>
          )}
        </button>
      </header>

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center px-4 pt-[14svh] text-center sm:px-8">
        <p className="text-xs tracking-[0.45em]">VINOS NACIONALES E IMPORTADOS</p>
        <h1 className="mt-4 font-display leading-[0.82] brand-gradient">
          <span className="block text-[22vw] sm:text-[15vw] lg:text-[12.5rem]">TradeVino</span>
          <span className="block text-[22vw] sm:text-[15vw] lg:text-[12.5rem]">Global</span>
        </h1>
        <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-muted-foreground">
          La confianza y el trato experto de una vinoteca, ahora en línea. Vinos selectos con garantía, compra segura y entrega a tu puerta en República Dominicana.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a href="#catalogo" className="rounded-full bg-primary px-7 py-3 text-sm font-semibold text-primary-foreground transition hover:brightness-110">Ver catálogo</a>
          <a href="#club" className="rounded-full border px-7 py-3 text-sm transition hover:bg-white/5">Unirme al Club TradeVino</a>
        </div>
      </div>

      <div className="relative z-10 mx-auto mt-14 grid max-w-7xl grid-cols-3 gap-3 px-4 pb-16 sm:gap-6 sm:px-8">
        {[IMAGES.grapes, IMAGES.toast, IMAGES.pour].map((src, i) => (
          <div key={i} className="aspect-[16/9] overflow-hidden bg-muted">
            <img src={src} alt="" data-hide-on-error loading="lazy" className="h-full w-full object-cover" />
          </div>
        ))}
      </div>
    </section>
  )
}

export function CatalogIntro() {
  return (
    <div id="catalogo" className="rule-top mx-auto max-w-7xl px-4 pb-6 pt-24 sm:px-8">
      <SectionTitle kicker="CATÁLOGO DIGITAL 24 HORAS" title="Nuestra selección">
        Desliza para recorrer la bodega. Cada etiqueta muestra país, uva, añada y maridaje para que elijas con confianza.
      </SectionTitle>
    </div>
  )
}

const VALUES = [
  { icon: ShieldCheck, title: "Vinos selectos con garantía", text: "Cada botella llega de bodegas e importadores verificados y se guarda en almacén con temperatura controlada." },
  { icon: PackageCheck, title: "Compra segura y sencilla", text: "Pago protegido con Azul y CardNet, con verificación de mayoría de edad en cada pedido." },
  { icon: Clock, title: "Catálogo digital 24 horas", text: "Explora y pide cuando quieras, desde el móvil o la computadora." },
  { icon: Sparkles, title: "Recomendador personalizado", text: "Te sugerimos el vino ideal según tu gusto, tu comida y tu presupuesto." },
  { icon: Truck, title: "Entregas rápidas", text: "Empaque protegido para que cada botella llegue perfecta." },
  { icon: Headset, title: "Atención experta", text: "Te acompañamos antes, durante y después de la compra por WhatsApp y chat." },
]

export function Values() {
  return (
    <section className="rule-top mx-auto max-w-7xl px-4 py-24 sm:px-8">
      <SectionTitle kicker="PROPUESTA DE VALOR" title="Una vinoteca de confianza, en línea" />
      <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border bg-[var(--color-border)] sm:grid-cols-2 lg:grid-cols-3">
        {VALUES.map(({ icon: Icon, title, text }) => (
          <div key={title} className="bg-background p-7">
            <Icon className="size-6 text-primary" strokeWidth={1.5} />
            <h3 className="mt-5 text-lg font-semibold">{title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

type Taste = Wine["taste"][number]
type Food = Wine["pairsWith"][number]

export function Recommender({ onAdd }: { onAdd: (w: Wine) => void }) {
  const [taste, setTaste] = useState<Taste>("intenso")
  const [food, setFood] = useState<Food>("carnes")
  const [budget, setBudget] = useState(2000)
  const pick = useMemo(() => {
    const scored = wines
      .map((w) => ({ w, s: (w.taste.includes(taste) ? 2 : 0) + (w.pairsWith.includes(food) ? 2 : 0) + (w.price <= budget ? 1.5 : -3) + w.rating / 10 }))
      .sort((a, b) => b.s - a.s)
    return scored[0].w
  }, [taste, food, budget])

  const chip = (active: boolean) =>
    "rounded-full border px-4 py-2 text-sm capitalize transition " + (active ? "bg-primary text-primary-foreground" : "hover:bg-white/5")

  return (
    <section id="recomendador" className="rule-top mx-auto max-w-7xl px-4 py-24 sm:px-8">
      <div className="grid gap-12 lg:grid-cols-2">
        <div>
          <SectionTitle kicker="RECOMENDADOR DE VINOS" title="¿No sabes cuál elegir?">
            Cuéntanos qué te gusta, qué vas a comer y cuánto quieres invertir. Te sugerimos la botella ideal.
          </SectionTitle>
          <div className="mt-10 space-y-7">
            <div>
              <p className="mb-3 text-xs tracking-[0.25em] text-muted-foreground">TU GUSTO</p>
              <div className="flex flex-wrap gap-2">
                {(["intenso", "suave", "fresco", "dulce"] as Taste[]).map((t) => (
                  <button key={t} className={chip(taste === t)} onClick={() => setTaste(t)}>{t}</button>
                ))}
              </div>
            </div>
            <div>
              <p className="mb-3 text-xs tracking-[0.25em] text-muted-foreground">LA COMIDA</p>
              <div className="flex flex-wrap gap-2">
                {(["carnes", "pescados", "pastas", "quesos", "postres", "aperitivo"] as Food[]).map((f) => (
                  <button key={f} className={chip(food === f)} onClick={() => setFood(f)}>{f}</button>
                ))}
              </div>
            </div>
            <div>
              <p className="mb-3 text-xs tracking-[0.25em] text-muted-foreground">PRESUPUESTO MÁXIMO · {formatRD(budget)}</p>
              <input type="range" min={1200} max={2500} step={50} value={budget} onChange={(e) => setBudget(+e.target.value)} className="w-full accent-[var(--color-primary)]" />
            </div>
          </div>
        </div>
        <div className="relative overflow-hidden rounded-3xl border bg-card p-8 sm:p-10">
          <div className="absolute -right-24 -top-24 size-72 rounded-full opacity-30 blur-2xl" style={{ background: pick.accent }} />
          <p className="relative text-xs tracking-[0.3em] text-primary">TE RECOMENDAMOS</p>
          <div className="relative mt-6 flex items-center gap-6">
            <img src={pick.image} alt={pick.alt} className="size-32 shrink-0 rounded-full object-cover ring-4 ring-white/10 sm:size-40" />
            <div>
              <h3 className="font-display text-4xl leading-tight">{pick.label}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{pick.kitchen}</p>
              <p className="mt-3 font-display text-3xl text-primary">{formatRD(pick.price)}</p>
            </div>
          </div>
          <p className="relative mt-6 text-sm leading-relaxed">{pick.description.replace(/ RD\$.*$/, "")}</p>
          <ul className="relative mt-5 flex flex-wrap gap-2">
            {pick.ingredients?.map((x) => <li key={x} className="rounded-full bg-white/10 px-3 py-1 text-xs">{x}</li>)}
          </ul>
          <button onClick={() => onAdd(pick)} className="relative mt-8 rounded-full bg-primary px-7 py-3 text-sm font-semibold text-primary-foreground transition hover:brightness-110">
            Añadir al carrito
          </button>
        </div>
      </div>
    </section>
  )
}

export function ClubAndGifts() {
  return (
    <section className="rule-top mx-auto max-w-7xl px-4 py-24 sm:px-8">
      <div className="grid gap-6 lg:grid-cols-2">
        <article id="club" className="group relative overflow-hidden rounded-3xl border">
          <img src={IMAGES.bottles} alt="" data-hide-on-error loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-40 transition duration-700 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/30" />
          <div className="relative flex min-h-[480px] flex-col justify-end p-8 sm:p-10">
            <WineIcon className="size-7 text-primary" strokeWidth={1.5} />
            <h3 className="mt-4 font-display text-5xl">Club TradeVino</h3>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
              Suscripción mensual con una selección curada de vinos nacionales e importados, fichas de cata, acceso a catas virtuales y puntos por cada compra y referido.
            </p>
            <ul className="mt-6 grid gap-2 text-sm">
              <li>· 2 o 3 botellas al mes, elegidas por nuestros expertos</li>
              <li>· Catas virtuales exclusivas para miembros</li>
              <li>· Programa de puntos y referidos</li>
            </ul>
            <a href={waLink("Hola, quiero información sobre el Club TradeVino.")} target="_blank" rel="noreferrer" className="mt-8 w-fit rounded-full bg-primary px-7 py-3 text-sm font-semibold text-primary-foreground transition hover:brightness-110">
              Quiero unirme
            </a>
          </div>
        </article>
        <article id="regalos" className="group relative overflow-hidden rounded-3xl border">
          <img src={IMAGES.toast} alt="" data-hide-on-error loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-40 transition duration-700 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/30" />
          <div className="relative flex min-h-[480px] flex-col justify-end p-8 sm:p-10">
            <Gift className="size-7 text-primary" strokeWidth={1.5} />
            <h3 className="mt-4 font-display text-5xl">Cajas de regalo</h3>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
              Cajas listas para regalar en cumpleaños, aniversarios y fiestas: vino, copas y descorchador con empaque elegante y mensaje personalizado.
            </p>
            <ul className="mt-6 grid gap-2 text-sm">
              <li>· Caja Duo: dos botellas a elección</li>
              <li>· Caja Celebración: espumoso y dos copas</li>
              <li>· Accesorios: copas y descorchadores</li>
            </ul>
            <a href={waLink("Hola, quiero armar una caja de regalo.")} target="_blank" rel="noreferrer" className="mt-8 w-fit rounded-full border px-7 py-3 text-sm transition hover:bg-white/5">
              Armar mi caja
            </a>
          </div>
        </article>
      </div>
    </section>
  )
}

const SEGMENTS = [
  { icon: UtensilsCrossed, title: "Restaurantes", text: "Carta de vinos a la medida y precios por volumen." },
  { icon: Hotel, title: "Hoteles", text: "Abastecimiento recurrente para habitaciones, bares y eventos." },
  { icon: CalendarHeart, title: "Eventos", text: "Bodas, galas y eventos corporativos con asesoría de maridaje." },
  { icon: Building2, title: "Regalos corporativos", text: "Cajas personalizadas con tu marca para clientes y equipos." },
]

export function Business() {
  return (
    <section id="empresas" className="rule-top relative overflow-hidden">
      <img src={IMAGES.cellar} alt="" data-hide-on-error loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-25" />
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/60" />
      <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-8">
        <SectionTitle kicker="VENTAS CORPORATIVAS" title="TradeVino para empresas">
          Un gestor de cuenta dedicado, precios por volumen y entregas programadas para tu negocio.
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
        <a href={waLink("Hola, quiero una cotización corporativa de TradeVino Global.")} target="_blank" rel="noreferrer" className="mt-10 inline-block rounded-full bg-primary px-7 py-3 text-sm font-semibold text-primary-foreground transition hover:brightness-110">
          Solicitar cotización
        </a>
      </div>
    </section>
  )
}

export function Footer() {
  return (
    <footer id="contacto" className="rule-top">
      <div className="mx-auto max-w-7xl px-4 pb-10 pt-20 sm:px-8">
        <h2 className="text-center font-display text-[17vw] leading-none brand-gradient sm:text-[9rem]">TradeVino Global</h2>
        <div className="mt-14 grid gap-10 text-sm sm:grid-cols-3">
          <div>
            <p className="text-xs tracking-[0.3em] text-primary">CONTACTO</p>
            <a href={waLink("Hola TradeVino Global")} target="_blank" rel="noreferrer" className="mt-4 flex items-center gap-2 hover:text-primary"><MessageCircle className="size-4" /> WhatsApp Business</a>
            <a href={"mailto:" + SITE.email} className="mt-2 flex items-center gap-2 hover:text-primary"><Mail className="size-4" /> {SITE.email}</a>
          </div>
          <div>
            <p className="text-xs tracking-[0.3em] text-primary">SÍGUENOS</p>
            <div className="mt-4 flex gap-3">
              {[["Instagram", SITE.instagram], ["Facebook", SITE.facebook], ["TikTok", SITE.tiktok]].map(([name, href]) => (
                <a key={name} href={href} target="_blank" rel="noreferrer" className="rounded-full border px-4 py-2 text-xs font-semibold hover:bg-white/10">{name}</a>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs tracking-[0.3em] text-primary">PAGOS SEGUROS</p>
            <div className="mt-4 flex flex-wrap gap-2 text-xs">
              {["Azul", "CardNet", "Visa", "Mastercard"].map((p) => (
                <span key={p} className="rounded-md border px-3 py-1.5">{p}</span>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-14 flex flex-col justify-between gap-3 border-t pt-6 text-xs text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} {SITE.legal} · {SITE.domain} · República Dominicana</p>
          <p>Venta exclusiva a mayores de 18 años. Disfruta con moderación.</p>
        </div>
      </div>
    </footer>
  )
}
