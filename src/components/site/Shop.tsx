import { useMemo, useState } from "react"
import { Heart, Plus, Search, SlidersHorizontal, Star, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { formatRD, wines, type Wine, type WineType } from "@/data/wines"

export type Filters = {
  types: WineType[]
  countries: string[]
  grapes: string[]
  vintages: string[]
  maxPrice: number
  offers: boolean
  favorites: boolean
}

export const PRICE_MAX = Math.ceil(Math.max(...wines.map((w) => w.price)) / 100) * 100
export const emptyFilters = (): Filters => ({ types: [], countries: [], grapes: [], vintages: [], maxPrice: PRICE_MAX, offers: false, favorites: false })

type Sort = "populares" | "precio-asc" | "precio-desc" | "valorados"

const uniq = (xs: string[]) => [...new Set(xs)].sort((a, b) => a.localeCompare(b, "es"))
const COUNTRIES = uniq(wines.map((w) => w.country))
const GRAPES = uniq(wines.flatMap((w) => w.grape.split(" · ")))
const VINTAGES = uniq(wines.map((w) => w.vintage))
const TYPES = (["Tinto", "Blanco", "Rosado", "Espumoso"] as WineType[]).filter((t) => wines.some((w) => w.type === t))

const toggle = <T,>(xs: T[], x: T) => (xs.includes(x) ? xs.filter((y) => y !== x) : [...xs, x])

type ShopProps = {
  query: string
  setQuery: (q: string) => void
  filters: Filters
  setFilters: (f: Filters) => void
  favorites: string[]
  toggleFav: (id: string) => void
  onOpen: (w: Wine) => void
  onAdd: (w: Wine) => void
}

export function Shop({ query, setQuery, filters, setFilters, favorites, toggleFav, onOpen, onAdd }: ShopProps) {
  const [sort, setSort] = useState<Sort>("populares")
  const [sheet, setSheet] = useState(false)

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    const list = wines.filter((w) => {
      if (q && ![w.name, w.grape, w.country, w.region, w.type, w.vintage].join(" ").toLowerCase().includes(q)) return false
      if (filters.types.length && !filters.types.includes(w.type)) return false
      if (filters.countries.length && !filters.countries.includes(w.country)) return false
      if (filters.grapes.length && !w.grape.split(" · ").some((g) => filters.grapes.includes(g))) return false
      if (filters.vintages.length && !filters.vintages.includes(w.vintage)) return false
      if (w.price > filters.maxPrice) return false
      if (filters.offers && !w.oldPrice) return false
      if (filters.favorites && !favorites.includes(w.id)) return false
      return true
    })
    const by: Record<Sort, (a: Wine, b: Wine) => number> = {
      populares: (a, b) => b.sales - a.sales,
      "precio-asc": (a, b) => a.price - b.price,
      "precio-desc": (a, b) => b.price - a.price,
      valorados: (a, b) => b.rating - a.rating,
    }
    return list.sort(by[sort])
  }, [query, filters, favorites, sort])

  const chips: { label: string; clear: () => void }[] = [
    ...(query ? [{ label: `“${query}”`, clear: () => setQuery("") }] : []),
    ...filters.types.map((t) => ({ label: t, clear: () => setFilters({ ...filters, types: toggle(filters.types, t) }) })),
    ...filters.countries.map((c) => ({ label: c, clear: () => setFilters({ ...filters, countries: toggle(filters.countries, c) }) })),
    ...filters.grapes.map((g) => ({ label: g, clear: () => setFilters({ ...filters, grapes: toggle(filters.grapes, g) }) })),
    ...filters.vintages.map((v) => ({ label: v, clear: () => setFilters({ ...filters, vintages: toggle(filters.vintages, v) }) })),
    ...(filters.maxPrice < PRICE_MAX ? [{ label: `Hasta ${formatRD(filters.maxPrice)}`, clear: () => setFilters({ ...filters, maxPrice: PRICE_MAX }) }] : []),
    ...(filters.offers ? [{ label: "Ofertas", clear: () => setFilters({ ...filters, offers: false }) }] : []),
    ...(filters.favorites ? [{ label: "Favoritos", clear: () => setFilters({ ...filters, favorites: false }) }] : []),
  ]
  const activeCount = chips.length

  const title = filters.favorites ? "Tus favoritos" : filters.offers ? "Ofertas" : filters.types.length === 1 ? `Vinos ${filters.types[0].toLowerCase()}s` : "Tienda"

  return (
    <section id="tienda" className="rule-top mx-auto max-w-7xl scroll-mt-28 px-4 py-20 sm:px-8">
      <p className="text-xs text-muted-foreground">Inicio / Tienda{filters.types.length === 1 ? ` / ${filters.types[0]}s` : ""}</p>
      <div className="mt-2 flex flex-wrap items-baseline gap-x-4">
        <h2 className="font-display text-5xl sm:text-6xl">{title}</h2>
        <span className="text-sm text-muted-foreground">{results.length} {results.length === 1 ? "resultado" : "resultados"}</span>
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-[250px_1fr]">
        <aside className="hidden lg:block">
          <FilterPanel filters={filters} setFilters={setFilters} />
        </aside>

        <div>
          <label className="mb-4 flex items-center gap-3 rounded-full border px-4 py-2.5 md:hidden">
            <Search className="size-4 text-muted-foreground" />
            <input id="shop-search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Buscar por vino, uva o país…" aria-label="Buscar vinos" className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground" />
          </label>
          <div className="mb-5 flex flex-wrap items-center gap-3">
            <button onClick={() => setSheet(true)} className="flex items-center gap-2 rounded-full border px-4 py-2 text-sm lg:hidden">
              <SlidersHorizontal className="size-4" /> Filtros{activeCount ? ` (${activeCount})` : ""}
            </button>
            <div className="flex flex-1 flex-wrap gap-2">
              {chips.map((c) => (
                <button key={c.label} onClick={c.clear} className="flex items-center gap-1.5 rounded-full bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground">
                  {c.label} <X className="size-3" />
                </button>
              ))}
              {activeCount > 1 && (
                <button onClick={() => { setFilters(emptyFilters()); setQuery("") }} className="px-2 text-xs text-muted-foreground underline underline-offset-4">Limpiar todo</button>
              )}
            </div>
            <label className="flex items-center gap-2 rounded-full border px-4 py-2 text-sm">
              <span className="text-muted-foreground">Ordenar:</span>
              <select value={sort} onChange={(e) => setSort(e.target.value as Sort)} className="bg-transparent outline-none [&>option]:bg-card">
                <option value="populares">Más vendidos</option>
                <option value="valorados">Mejor valorados</option>
                <option value="precio-asc">Precio: menor a mayor</option>
                <option value="precio-desc">Precio: mayor a menor</option>
              </select>
            </label>
          </div>

          {results.length === 0 ? (
            <div className="rounded-2xl border p-12 text-center text-muted-foreground">
              <p>No encontramos vinos con esos filtros.</p>
              <button onClick={() => { setFilters(emptyFilters()); setQuery("") }} className="mt-4 rounded-full border px-5 py-2 text-sm text-foreground">Ver todos los vinos</button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 xl:grid-cols-4">
              {results.map((w) => (
                <ProductCard key={w.id} wine={w} fav={favorites.includes(w.id)} onFav={() => toggleFav(w.id)} onOpen={() => onOpen(w)} onAdd={() => onAdd(w)} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Filtros en móvil */}
      <div className={cn("fixed inset-0 z-[90] lg:hidden", sheet ? "visible" : "invisible")}>
        <div onClick={() => setSheet(false)} className={cn("absolute inset-0 bg-black/60 transition-opacity", sheet ? "opacity-100" : "opacity-0")} />
        <div className={cn("absolute inset-x-0 bottom-0 max-h-[85svh] overflow-y-auto rounded-t-3xl border-t bg-card p-6 transition-transform duration-300", sheet ? "translate-y-0" : "translate-y-full")}>
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-display text-3xl">Filtros</h3>
            <button onClick={() => setSheet(false)} aria-label="Cerrar filtros" className="rounded-full p-2 hover:bg-white/10"><X className="size-5" /></button>
          </div>
          <FilterPanel filters={filters} setFilters={setFilters} />
          <button onClick={() => setSheet(false)} className="mt-6 w-full rounded-full bg-primary py-3 text-sm font-semibold text-primary-foreground">Ver {results.length} resultados</button>
        </div>
      </div>
    </section>
  )
}

function FilterPanel({ filters, setFilters }: { filters: Filters; setFilters: (f: Filters) => void }) {
  const chip = (on: boolean) => cn("rounded-full border px-3 py-1.5 text-xs transition", on ? "border-primary bg-primary text-primary-foreground" : "hover:bg-white/5")
  const head = "mb-3 mt-7 text-[11px] tracking-[0.3em] text-primary first:mt-0"
  return (
    <div>
      <p className={head}>TIPO</p>
      <div className="flex flex-wrap gap-2">
        {TYPES.map((t) => (
          <button key={t} className={chip(filters.types.includes(t))} onClick={() => setFilters({ ...filters, types: toggle(filters.types, t) })}>{t}</button>
        ))}
      </div>
      <p className={head}>PAÍS</p>
      <div className="space-y-2.5">
        {COUNTRIES.map((c) => (
          <label key={c} className="flex cursor-pointer items-center gap-2.5 text-sm">
            <input type="checkbox" checked={filters.countries.includes(c)} onChange={() => setFilters({ ...filters, countries: toggle(filters.countries, c) })} className="size-4 accent-[var(--color-primary)]" />
            {c} <span className="text-muted-foreground">({wines.filter((w) => w.country === c).length})</span>
          </label>
        ))}
      </div>
      <p className={head}>UVA</p>
      <div className="flex flex-wrap gap-2">
        {GRAPES.map((g) => (
          <button key={g} className={chip(filters.grapes.includes(g))} onClick={() => setFilters({ ...filters, grapes: toggle(filters.grapes, g) })}>{g}</button>
        ))}
      </div>
      <p className={head}>PRECIO MÁXIMO · {formatRD(filters.maxPrice)}</p>
      <input type="range" min={1000} max={PRICE_MAX} step={50} value={filters.maxPrice} onChange={(e) => setFilters({ ...filters, maxPrice: +e.target.value })} className="w-full accent-[var(--color-primary)]" aria-label="Precio máximo" />
      <p className={head}>AÑADA</p>
      <div className="flex flex-wrap gap-2">
        {VINTAGES.map((v) => (
          <button key={v} className={chip(filters.vintages.includes(v))} onClick={() => setFilters({ ...filters, vintages: toggle(filters.vintages, v) })}>{v}</button>
        ))}
      </div>
      <label className="mt-7 flex cursor-pointer items-center gap-2.5 text-sm">
        <input type="checkbox" checked={filters.offers} onChange={() => setFilters({ ...filters, offers: !filters.offers })} className="size-4 accent-[var(--color-primary)]" />
        Solo ofertas
      </label>
    </div>
  )
}

export function Stars({ value, className }: { value: number; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-0.5 text-primary", className)} aria-label={`Calificación ${value.toFixed(1)} de 5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} className="size-3" fill={value >= i - 0.25 ? "currentColor" : "none"} strokeWidth={1.5} />
      ))}
    </span>
  )
}

function ProductCard({ wine: w, fav, onFav, onOpen, onAdd }: { wine: Wine; fav: boolean; onFav: () => void; onOpen: () => void; onAdd: () => void }) {
  return (
    <article className="group relative flex flex-col rounded-2xl border bg-card p-2.5 transition hover:border-primary/60 sm:p-3">
      <button onClick={onOpen} className="relative block aspect-[4/5] overflow-hidden rounded-xl bg-muted" aria-label={`Ver ${w.name}`}>
        <img src={w.image} alt={w.alt} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
        {w.badge && <span className="absolute left-2.5 top-2.5 rounded-full bg-primary px-2.5 py-1 text-[10px] font-bold text-primary-foreground">{w.badge}</span>}
      </button>
      <button onClick={onFav} aria-label={fav ? "Quitar de favoritos" : "Añadir a favoritos"} aria-pressed={fav} className="absolute right-5 top-5 grid size-8 place-items-center rounded-full bg-black/40 backdrop-blur transition hover:bg-black/60">
        <Heart className={cn("size-4", fav && "fill-primary text-primary")} />
      </button>
      <div className="flex flex-1 flex-col px-1 pb-1 pt-3">
        <button onClick={onOpen} className="text-left text-[14.5px] font-semibold leading-snug hover:text-primary">{w.name}</button>
        <p className="mt-0.5 text-xs text-muted-foreground">{w.country} · {w.vintage}</p>
        <div className="mt-1.5 flex items-center gap-1.5"><Stars value={w.rating} /><span className="text-[11px] text-muted-foreground">{w.rating.toFixed(1)}</span></div>
        <div className="mt-auto flex items-end justify-between gap-2 pt-3">
          <div>
            {w.oldPrice && <p className="text-[11px] text-muted-foreground line-through">{formatRD(w.oldPrice)}</p>}
            <p className="font-display text-xl text-primary sm:text-2xl">{formatRD(w.price)}</p>
          </div>
          <button onClick={onAdd} aria-label={`Añadir ${w.name} al carrito`} className="grid size-9 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground transition hover:brightness-110">
            <Plus className="size-4" />
          </button>
        </div>
      </div>
    </article>
  )
}
