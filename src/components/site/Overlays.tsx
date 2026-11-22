import { useEffect, useMemo, useState } from "react"
import { Minus, Plus, Search, ShoppingBag, Trash2, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { SITE, waLink } from "@/lib/site"
import { formatRD, wines, type Wine } from "@/data/wines"

const AGE_KEY = "tvg-age-ok"

/** Verificación de mayoría de edad (+18), requisito del plan. */
export function AgeGate() {
  const [open, setOpen] = useState(false)
  const [denied, setDenied] = useState(false)
  useEffect(() => {
    try {
      if (localStorage.getItem(AGE_KEY) !== "1") setOpen(true)
    } catch {
      setOpen(true)
    }
  }, [])
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
  }, [open])
  if (!open) return null
  const accept = () => {
    try { localStorage.setItem(AGE_KEY, "1") } catch { /* sin almacenamiento */ }
    setOpen(false)
  }
  return (
    <div className="fixed inset-0 z-[100] grid place-items-center bg-[#2a0103]/90 p-4 backdrop-blur-md" role="dialog" aria-modal="true" aria-labelledby="age-title">
      <div className="w-full max-w-md rounded-2xl border bg-card p-8 text-center shadow-2xl">
        <p className="text-xs tracking-[0.35em] text-muted-foreground">BIENVENIDO A</p>
        <h2 id="age-title" className="mt-2 font-display text-5xl brand-gradient">TradeVino Global</h2>
        {denied ? (
          <p className="mt-6 text-sm leading-relaxed">
            Lo sentimos. La venta de bebidas alcohólicas es exclusiva para mayores de 18 años.
          </p>
        ) : (
          <>
            <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
              Para entrar debes confirmar que tienes 18 años o más. La venta de alcohol a menores de edad está prohibida en la República Dominicana.
            </p>
            <div className="mt-7 grid grid-cols-2 gap-3">
              <button onClick={() => setDenied(true)} className="rounded-full border px-4 py-3 text-sm transition hover:bg-white/5">
                Soy menor
              </button>
              <button onClick={accept} className="rounded-full bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition hover:brightness-110">
                Tengo 18 o más
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

function Sheet({ open, onClose, title, children }: { open: boolean; onClose: () => void; title: string; children: React.ReactNode }) {
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose()
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open, onClose])
  return (
    <div className={cn("fixed inset-0 z-[90] transition", open ? "visible" : "invisible")} aria-hidden={!open}>
      <div onClick={onClose} className={cn("absolute inset-0 bg-black/60 transition-opacity", open ? "opacity-100" : "opacity-0")} />
      <aside
        role="dialog"
        aria-label={title}
        className={cn(
          "absolute right-0 top-0 flex h-full w-full max-w-md flex-col border-l bg-card shadow-2xl transition-transform duration-300",
          open ? "translate-x-0" : "translate-x-full",
        )}
      >
        <header className="flex items-center justify-between border-b px-6 py-5">
          <h2 className="font-display text-3xl">{title}</h2>
          <button onClick={onClose} aria-label="Cerrar" className="rounded-full p-2 hover:bg-white/10"><X className="size-5" /></button>
        </header>
        <div className="flex-1 overflow-y-auto px-6 py-5">{children}</div>
      </aside>
    </div>
  )
}

export const NAV = [
  { href: "#inicio", label: "Inicio" },
  { href: "#catalogo", label: "Catálogo" },
  { href: "#recomendador", label: "Recomendador" },
  { href: "#club", label: "Club TradeVino" },
  { href: "#regalos", label: "Cajas de regalo" },
  { href: "#empresas", label: "Empresas" },
  { href: "#contacto", label: "Contacto" },
]

export function MenuSheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <Sheet open={open} onClose={onClose} title="Menú">
      <nav className="flex flex-col">
        {NAV.map((n) => (
          <a key={n.href} href={n.href} onClick={onClose} className="border-b py-4 font-display text-2xl transition hover:text-primary">
            {n.label}
          </a>
        ))}
      </nav>
      <p className="mt-8 text-xs text-muted-foreground">Venta exclusiva a mayores de 18 años · {SITE.domain}</p>
    </Sheet>
  )
}

export function SearchSheet({ open, onClose, onAdd }: { open: boolean; onClose: () => void; onAdd: (w: Wine) => void }) {
  const [q, setQ] = useState("")
  const [type, setType] = useState<"Todos" | Wine["type"]>("Todos")
  const results = useMemo(() => {
    const s = q.trim().toLowerCase()
    return wines.filter(
      (w) =>
        (type === "Todos" || w.type === type) &&
        (!s || [w.label, w.grape, w.country, w.kitchen, w.type].join(" ").toLowerCase().includes(s)),
    )
  }, [q, type])
  return (
    <Sheet open={open} onClose={onClose} title="Buscar vinos">
      <label className="flex items-center gap-3 rounded-full border px-4 py-3">
        <Search className="size-4 text-muted-foreground" />
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Uva, país, nombre…" className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground" />
      </label>
      <div className="mt-4 flex flex-wrap gap-2">
        {(["Todos", "Tinto", "Blanco", "Rosado", "Espumoso"] as const).map((t) => (
          <button key={t} onClick={() => setType(t)} className={cn("rounded-full border px-3 py-1.5 text-xs transition", type === t ? "bg-primary text-primary-foreground" : "hover:bg-white/5")}>
            {t}
          </button>
        ))}
      </div>
      <ul className="mt-6 space-y-3">
        {results.map((w) => (
          <li key={w.id} className="flex items-center gap-4 rounded-xl border p-3">
            <img src={w.image} alt="" className="size-14 rounded-full object-cover" />
            <div className="min-w-0 flex-1">
              <p className="truncate font-semibold">{w.label}</p>
              <p className="truncate text-xs text-muted-foreground">{w.grape} · {w.country} · {w.vintage}</p>
              <p className="mt-1 text-sm text-primary">{formatRD(w.price)}</p>
            </div>
            <button onClick={() => onAdd(w)} aria-label={"Añadir " + w.label} className="rounded-full bg-primary p-2 text-primary-foreground"><Plus className="size-4" /></button>
          </li>
        ))}
        {results.length === 0 && <li className="text-sm text-muted-foreground">No encontramos vinos con esa búsqueda.</li>}
      </ul>
    </Sheet>
  )
}

export type Cart = Record<string, number>

export function CartSheet({ open, onClose, cart, setQty }: { open: boolean; onClose: () => void; cart: Cart; setQty: (id: string, qty: number) => void }) {
  const items = wines.filter((w) => cart[w.id])
  const total = items.reduce((s, w) => s + w.price * cart[w.id], 0)
  const message =
    "Hola TradeVino Global, quiero hacer este pedido:\n" +
    items.map((w) => `• ${cart[w.id]} x ${w.label} ${w.vintage} (${formatRD(w.price)})`).join("\n") +
    `\nTotal: ${formatRD(total)}\nConfirmo que soy mayor de 18 años.`
  return (
    <Sheet open={open} onClose={onClose} title="Tu carrito">
      {items.length === 0 ? (
        <div className="grid place-items-center gap-3 py-16 text-center text-muted-foreground">
          <ShoppingBag className="size-10 opacity-60" />
          <p className="text-sm">Tu carrito está vacío. Explora el catálogo y añade tus vinos favoritos.</p>
        </div>
      ) : (
        <div className="flex h-full flex-col">
          <ul className="space-y-3">
            {items.map((w) => (
              <li key={w.id} className="flex items-center gap-4 rounded-xl border p-3">
                <img src={w.image} alt="" className="size-14 rounded-full object-cover" />
                <div className="min-w-0 flex-1">
                  <p className="truncate font-semibold">{w.label}</p>
                  <p className="text-xs text-muted-foreground">{formatRD(w.price)} c/u</p>
                  <div className="mt-2 flex items-center gap-2">
                    <button onClick={() => setQty(w.id, cart[w.id] - 1)} aria-label="Quitar uno" className="rounded-full border p-1"><Minus className="size-3" /></button>
                    <span className="w-6 text-center text-sm">{cart[w.id]}</span>
                    <button onClick={() => setQty(w.id, cart[w.id] + 1)} aria-label="Añadir uno" className="rounded-full border p-1"><Plus className="size-3" /></button>
                  </div>
                </div>
                <button onClick={() => setQty(w.id, 0)} aria-label="Eliminar" className="rounded-full p-2 text-muted-foreground hover:bg-white/10"><Trash2 className="size-4" /></button>
              </li>
            ))}
          </ul>
          <div className="mt-6 border-t pt-5">
            <div className="flex items-baseline justify-between">
              <span className="text-sm text-muted-foreground">Total</span>
              <span className="font-display text-3xl">{formatRD(total)}</span>
            </div>
            <a href={waLink(message)} target="_blank" rel="noreferrer" className="mt-5 block rounded-full bg-primary py-3 text-center text-sm font-semibold text-primary-foreground transition hover:brightness-110">
              Confirmar pedido por WhatsApp
            </a>
            <p className="mt-3 text-center text-xs text-muted-foreground">
              Pago seguro con tarjeta (Azul / CardNet). Entregas rápidas con empaque protegido.
            </p>
          </div>
        </div>
      )}
    </Sheet>
  )
}
