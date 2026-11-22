import { Heart, Home, Menu, Search, ShoppingBag, Store, Wine as WineIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { SITE } from "@/lib/site"
import { formatRD } from "@/data/wines"

export type Category = "Tinto" | "Blanco" | "Rosado" | "Ofertas" | null

export function PromoBar() {
  return (
    <div className="bg-primary px-4 py-2 text-center text-[12.5px] font-semibold text-primary-foreground">
      Entrega gratis en Santo Domingo desde {formatRD(SITE.freeShippingFrom)}
      <span className="hidden sm:inline"> · Club TradeVino: 10% en tu primera caja con el código BIENVENIDO10</span>
    </div>
  )
}

const CATS: { label: string; cat?: Category; href?: string }[] = [
  { label: "Tintos", cat: "Tinto" },
  { label: "Blancos", cat: "Blanco" },
  { label: "Rosados", cat: "Rosado" },
  { label: "Ofertas", cat: "Ofertas" },
  { label: "Destacados", href: "#destacados" },
  { label: "Recomendador", href: "#recomendador" },
  { label: "Club", href: "#club" },
  { label: "Regalos", href: "#regalos" },
  { label: "Empresas", href: "#empresas" },
]

type HeaderProps = {
  query: string
  setQuery: (q: string) => void
  favCount: number
  cartCount: number
  onCart: () => void
  onFavorites: () => void
  onCategory: (c: Category) => void
  onMenu: () => void
}

export function Header({ query, setQuery, favCount, cartCount, onCart, onFavorites, onCategory, onMenu }: HeaderProps) {
  const goShop = () => document.getElementById("tienda")?.scrollIntoView({ behavior: "smooth" })
  return (
    <header className="sticky top-0 z-[70] border-b bg-[#3a0205]/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3.5 sm:gap-6 sm:px-8">
        <button onClick={onMenu} className="rounded-full p-2 hover:bg-white/10 lg:hidden" aria-label="Abrir menú"><Menu className="size-5" /></button>
        <a href="#inicio" className="shrink-0 font-display text-2xl sm:text-[28px]">TradeVino <span className="hidden sm:inline">Global</span></a>
        <form
          role="search"
          onSubmit={(e) => { e.preventDefault(); goShop() }}
          className="hidden flex-1 items-center gap-3 rounded-full border px-4 py-2.5 md:flex"
        >
          <Search className="size-4 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={goShop}
            placeholder="Busca por vino, uva, país o región…"
            aria-label="Buscar vinos"
            className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
        </form>
        <div className="ml-auto flex items-center gap-2.5 md:ml-0">
          <button
            onClick={() => { goShop(); window.setTimeout(() => document.getElementById("shop-search")?.focus(), 500) }}
            aria-label="Buscar vinos"
            className="grid size-10 place-items-center rounded-full border transition hover:bg-white/10 md:hidden"
          >
            <Search className="size-[18px]" />
          </button>
          <IconButton label="Favoritos" count={favCount} onClick={onFavorites}><Heart className="size-[18px]" /></IconButton>
          <IconButton label="Carrito" count={cartCount} onClick={onCart}><ShoppingBag className="size-[18px]" /></IconButton>
        </div>
      </div>
      <nav className="hidden border-t lg:block" aria-label="Categorías">
        <div className="mx-auto flex max-w-7xl gap-8 px-8 py-3 text-[11.5px] tracking-[0.2em]">
          {CATS.map((c) =>
            c.cat ? (
              <button key={c.label} onClick={() => onCategory(c.cat!)} className={cn("uppercase transition hover:text-primary", c.cat === "Ofertas" && "text-primary")}>{c.label}</button>
            ) : (
              <a key={c.label} href={c.href} className="uppercase transition hover:text-primary">{c.label}</a>
            ),
          )}
        </div>
      </nav>
    </header>
  )
}

function IconButton({ label, count, onClick, children }: { label: string; count: number; onClick: () => void; children: React.ReactNode }) {
  return (
    <button onClick={onClick} aria-label={label} className="relative grid size-10 place-items-center rounded-full border transition hover:bg-white/10">
      {children}
      {count > 0 && <span className="absolute -right-1 -top-1 grid size-[18px] place-items-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">{count}</span>}
    </button>
  )
}

/** Barra de navegación inferior, solo en móvil. */
export function MobileNav({ cartCount, onCart, onFavorites }: { cartCount: number; onCart: () => void; onFavorites: () => void }) {
  const item = "flex flex-col items-center gap-1 text-[10px]"
  return (
    <nav className="fixed inset-x-0 bottom-0 z-[75] grid grid-cols-5 border-t bg-[#2f0104]/97 px-1 pb-[max(10px,env(safe-area-inset-bottom))] pt-2.5 backdrop-blur md:hidden" aria-label="Navegación principal">
      <a href="#inicio" className={item}><Home className="size-5" />Inicio</a>
      <a href="#tienda" className={item}><Store className="size-5" />Tienda</a>
      <button onClick={onFavorites} className={item}><Heart className="size-5" />Favoritos</button>
      <a href="#club" className={item}><WineIcon className="size-5" />Club</a>
      <button onClick={onCart} className={cn(item, "relative")}>
        <ShoppingBag className="size-5" />Carrito
        {cartCount > 0 && <span className="absolute right-[22%] -top-1 grid size-4 place-items-center rounded-full bg-primary text-[9px] font-bold text-primary-foreground">{cartCount}</span>}
      </button>
    </nav>
  )
}
