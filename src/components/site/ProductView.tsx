import { useEffect, useState } from "react"
import { Check, Heart, Minus, Play, Plus, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { CASE_DISCOUNT, CASE_SIZE, IMAGES, formatRD, type Wine } from "@/data/wines"
import { waLink } from "@/lib/site"
import type { Format } from "@/lib/cart"
import { Stars } from "./Shop"

type Props = {
  wine: Wine | null
  onClose: () => void
  fav: boolean
  onFav: () => void
  onAdd: (w: Wine, format: Format, qty: number) => void
}

export function ProductView({ wine, onClose, fav, onFav, onAdd }: Props) {
  const [img, setImg] = useState(0)
  const [format, setFormat] = useState<Format>("botella")
  const [qty, setQty] = useState(1)

  useEffect(() => {
    setImg(0); setFormat("botella"); setQty(1)
    if (!wine) return
    document.body.style.overflow = "hidden"
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose()
    window.addEventListener("keydown", onKey)
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", onKey) }
  }, [wine, onClose])

  if (!wine) return null
  const w = wine
  const gallery = [w.image, IMAGES.vineyard, IMAGES.tasting]
  const casePrice = w.price * CASE_SIZE * (1 - CASE_DISCOUNT)
  const unit = format === "caja" ? casePrice : w.price
  const lowStock = w.stock <= 10

  return (
    <div className="fixed inset-0 z-[92] overflow-y-auto bg-black/70 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label={w.name} onClick={onClose}>
      <div className="mx-auto my-0 min-h-full max-w-6xl bg-background sm:my-8 sm:min-h-0 sm:rounded-3xl sm:border" onClick={(e) => e.stopPropagation()}>
        <div className="sticky top-0 z-10 flex justify-end p-3 sm:p-4">
          <button onClick={onClose} aria-label="Cerrar" className="rounded-full border bg-background/80 p-2.5 backdrop-blur hover:bg-white/10"><X className="size-5" /></button>
        </div>
        <div className="-mt-14 grid gap-8 p-5 pt-0 sm:p-10 sm:pt-2 lg:grid-cols-2 lg:gap-14">
          <div>
            <div className="aspect-[4/5] overflow-hidden rounded-2xl bg-muted">
              <img src={gallery[img]} alt={img === 0 ? w.alt : ""} className="h-full w-full object-cover" />
            </div>
            <div className="mt-3 grid grid-cols-4 gap-3">
              {gallery.map((g, i) => (
                <button key={g} onClick={() => setImg(i)} aria-label={`Foto ${i + 1}`} className={cn("aspect-square overflow-hidden rounded-xl border-2", img === i ? "border-primary" : "border-transparent opacity-70 hover:opacity-100")}>
                  <img src={g} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
              <a href={waLink(`Hola, quiero reservar una cata virtual del ${w.name} ${w.vintage}.`)} target="_blank" rel="noreferrer" className="grid aspect-square place-items-center rounded-xl border text-center text-xs hover:bg-white/5">
                <span><Play className="mx-auto mb-1 size-5 text-primary" />Cata virtual</span>
              </a>
            </div>
          </div>

          <div className="pt-2 lg:pt-12">
            <p className="text-xs text-muted-foreground">Inicio / {w.type}s / {w.country}</p>
            <p className="mt-5 text-xs tracking-[0.3em] text-primary">{w.region.toUpperCase()} · {w.country.toUpperCase()}</p>
            <h2 className="mt-2 font-display text-5xl leading-[1.02] sm:text-6xl">{w.name} {w.vintage}</h2>
            <div className="mt-3 flex items-center gap-2"><Stars value={w.rating} /><span className="text-sm text-muted-foreground">{w.rating.toFixed(1)} · {w.reviews} reseñas</span></div>

            <div className="mt-6 flex flex-wrap items-center gap-4">
              <span className="font-display text-5xl text-primary">{formatRD(w.price)}</span>
              {w.oldPrice && (
                <>
                  <span className="text-muted-foreground line-through">{formatRD(w.oldPrice)}</span>
                  <span className="rounded-full bg-primary px-2.5 py-1 text-[11px] font-bold text-primary-foreground">-{Math.round((1 - w.price / w.oldPrice) * 100)}%</span>
                </>
              )}
            </div>
            <p className="mt-5 text-[15px] leading-relaxed text-muted-foreground">{w.description}</p>

            <div className="mt-6 grid grid-cols-2 gap-3" role="radiogroup" aria-label="Formato">
              <FormatOption on={format === "botella"} onClick={() => setFormat("botella")} title="Botella" sub={formatRD(w.price)} />
              <FormatOption on={format === "caja"} onClick={() => setFormat("caja")} title={`Caja de ${CASE_SIZE}`} sub={`${formatRD(casePrice / CASE_SIZE)} c/u · -${CASE_DISCOUNT * 100}%`} />
            </div>

            <div className="mt-5 flex items-center gap-3">
              <div className="flex items-center gap-4 rounded-full border px-4 py-3">
                <button onClick={() => setQty(Math.max(1, qty - 1))} aria-label="Menos"><Minus className="size-4" /></button>
                <span className="w-5 text-center text-sm">{qty}</span>
                <button onClick={() => setQty(qty + 1)} aria-label="Más"><Plus className="size-4" /></button>
              </div>
              <button onClick={() => { onAdd(w, format, qty); onClose() }} className="flex-1 rounded-full bg-primary py-3.5 text-sm font-semibold text-primary-foreground transition hover:brightness-110">
                Añadir al carrito · {formatRD(unit * qty)}
              </button>
              <button onClick={onFav} aria-label={fav ? "Quitar de favoritos" : "Añadir a favoritos"} aria-pressed={fav} className="grid size-12 shrink-0 place-items-center rounded-full border hover:bg-white/10">
                <Heart className={cn("size-5", fav && "fill-primary text-primary")} />
              </button>
            </div>
            <p className={cn("mt-3 flex items-center gap-1.5 text-xs", lowStock ? "text-primary" : "text-muted-foreground")}>
              <Check className="size-3.5" /> {lowStock ? `¡Últimas ${w.stock} unidades!` : `En stock (${w.stock} unidades)`} · Entrega rápida con empaque protegido
            </p>

            <p className="mb-1 mt-8 text-xs tracking-[0.3em] text-primary">FICHA TÉCNICA</p>
            <dl className="divide-y divide-[var(--color-border)] border-y text-sm">
              {[
                ["Tipo", w.type],
                ["Uva", w.grape],
                ["País / región", `${w.country}, ${w.region}`],
                ["Añada", w.vintage],
                ["Crianza", w.aging],
                ["Graduación", w.abv],
                ["Temperatura de servicio", w.temp],
                ["Formato", "750 ml"],
              ].map(([k, v]) => (
                <div key={k} className="grid grid-cols-[42%_1fr] py-2.5"><dt className="text-muted-foreground">{k}</dt><dd>{v}</dd></div>
              ))}
            </dl>
            <p className="mb-3 mt-7 text-xs tracking-[0.3em] text-primary">NOTAS DE CATA</p>
            <ul className="flex flex-wrap gap-2">{w.notes.map((n) => <li key={n} className="rounded-full bg-white/10 px-3 py-1 text-xs">{n}</li>)}</ul>
          </div>
        </div>
      </div>
    </div>
  )
}

function FormatOption({ on, onClick, title, sub }: { on: boolean; onClick: () => void; title: string; sub: string }) {
  return (
    <button role="radio" aria-checked={on} onClick={onClick} className={cn("rounded-2xl border p-4 text-left transition", on ? "border-primary bg-primary/10" : "hover:bg-white/5")}>
      <p className="text-sm font-semibold">{title}</p>
      <p className="mt-0.5 text-xs text-muted-foreground">{sub}</p>
    </button>
  )
}
