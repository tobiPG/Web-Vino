import { useEffect, useState } from "react"
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { SITE } from "@/lib/site"
import { formatRD } from "@/data/wines"
import { cartTotals, type Cart } from "@/lib/cart"

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
          <p className="mt-6 text-sm leading-relaxed">Lo sentimos. La venta de bebidas alcohólicas es exclusiva para mayores de 18 años.</p>
        ) : (
          <>
            <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
              Para entrar debes confirmar que tienes 18 años o más. La venta de alcohol a menores de edad está prohibida en la República Dominicana.
            </p>
            <div className="mt-7 grid grid-cols-2 gap-3">
              <button onClick={() => setDenied(true)} className="rounded-full border px-4 py-3 text-sm transition hover:bg-white/5">Soy menor</button>
              <button onClick={accept} className="rounded-full bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition hover:brightness-110">Tengo 18 o más</button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export function Sheet({ open, onClose, title, children, footer }: { open: boolean; onClose: () => void; title: string; children: React.ReactNode; footer?: React.ReactNode }) {
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose()
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open, onClose])
  return (
    <div className={cn("fixed inset-0 z-[90] transition", open ? "visible" : "invisible")} aria-hidden={!open}>
      <div onClick={onClose} className={cn("absolute inset-0 bg-black/60 transition-opacity", open ? "opacity-100" : "opacity-0")} />
      <aside role="dialog" aria-label={title} className={cn("absolute right-0 top-0 flex h-full w-full max-w-md flex-col border-l bg-card shadow-2xl transition-transform duration-300", open ? "translate-x-0" : "translate-x-full")}>
        <header className="flex items-center justify-between border-b px-6 py-5">
          <h2 className="font-display text-3xl">{title}</h2>
          <button onClick={onClose} aria-label="Cerrar" className="rounded-full p-2 hover:bg-white/10"><X className="size-5" /></button>
        </header>
        <div className="flex-1 overflow-y-auto px-6 py-5">{children}</div>
        {footer && <div className="border-t px-6 py-5">{footer}</div>}
      </aside>
    </div>
  )
}

export const NAV = [
  { href: "#inicio", label: "Inicio" },
  { href: "#destacados", label: "Destacados" },
  { href: "#tienda", label: "Tienda" },
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
          <a key={n.href} href={n.href} onClick={onClose} className="border-b py-4 font-display text-2xl transition hover:text-primary">{n.label}</a>
        ))}
      </nav>
      <p className="mt-8 text-xs text-muted-foreground">Venta exclusiva a mayores de 18 años · {SITE.domain}</p>
    </Sheet>
  )
}

export function CartSheet({ open, onClose, cart, setQty, onCheckout }: { open: boolean; onClose: () => void; cart: Cart; setQty: (key: string, qty: number) => void; onCheckout: () => void }) {
  const t = cartTotals(cart)
  const missing = SITE.freeShippingFrom - t.subtotal
  return (
    <Sheet
      open={open}
      onClose={onClose}
      title="Tu carrito"
      footer={
        t.lines.length > 0 && (
          <>
            <div className="mb-1 h-1.5 overflow-hidden rounded-full bg-white/10">
              <div className="h-full bg-primary transition-all" style={{ width: `${Math.min(100, (t.subtotal / SITE.freeShippingFrom) * 100)}%` }} />
            </div>
            <p className="mb-4 text-xs text-muted-foreground">{missing > 0 ? `Te faltan ${formatRD(missing)} para la entrega gratis` : "¡Tienes entrega gratis!"}</p>
            <div className="flex items-baseline justify-between">
              <span className="text-sm text-muted-foreground">Subtotal</span>
              <span className="font-display text-3xl">{formatRD(t.subtotal)}</span>
            </div>
            <button onClick={onCheckout} className="mt-4 w-full rounded-full bg-primary py-3.5 text-sm font-semibold text-primary-foreground transition hover:brightness-110">Finalizar compra</button>
            <p className="mt-3 text-center text-xs text-muted-foreground">Pago seguro con Azul / CardNet · Verificación de edad +18</p>
          </>
        )
      }
    >
      {t.lines.length === 0 ? (
        <div className="grid place-items-center gap-3 py-16 text-center text-muted-foreground">
          <ShoppingBag className="size-10 opacity-60" />
          <p className="text-sm">Tu carrito está vacío. Explora la tienda y añade tus vinos favoritos.</p>
        </div>
      ) : (
        <ul className="space-y-3">
          {t.lines.map((l) => (
            <li key={l.key} className="flex items-center gap-4 rounded-xl border p-3">
              <img src={l.wine.image} alt="" className="size-16 rounded-lg object-cover" />
              <div className="min-w-0 flex-1">
                <p className="truncate font-semibold">{l.wine.name}</p>
                <p className="text-xs text-muted-foreground">{l.format === "caja" ? "Caja de 6" : "Botella"} · {formatRD(l.unit)}</p>
                <div className="mt-2 flex items-center gap-2">
                  <button onClick={() => setQty(l.key, l.qty - 1)} aria-label="Quitar uno" className="rounded-full border p-1"><Minus className="size-3" /></button>
                  <span className="w-6 text-center text-sm">{l.qty}</span>
                  <button onClick={() => setQty(l.key, l.qty + 1)} aria-label="Añadir uno" className="rounded-full border p-1"><Plus className="size-3" /></button>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <span className="text-sm">{formatRD(l.total)}</span>
                <button onClick={() => setQty(l.key, 0)} aria-label="Eliminar" className="rounded-full p-1.5 text-muted-foreground hover:bg-white/10"><Trash2 className="size-4" /></button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </Sheet>
  )
}
