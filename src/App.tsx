import { useCallback, useEffect, useState } from "react"
import { MessageCircle, ShoppingBag } from "lucide-react"
import DishOrbitCarousel from "@/components/ui/dish-orbit-carousel"
import { AgeGate, CartSheet, MenuSheet, SearchSheet, type Cart } from "@/components/site/Overlays"
import { Business, CatalogIntro, ClubAndGifts, Footer, Hero, Recommender, Values } from "@/components/site/Sections"
import { IMAGES, wines, type Wine } from "@/data/wines"
import { waLink } from "@/lib/site"

export default function App() {
  const [cart, setCart] = useState<Cart>({})
  const [cartOpen, setCartOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [toast, setToast] = useState<string | null>(null)

  const add = useCallback((w: Wine) => {
    setCart((c) => ({ ...c, [w.id]: (c[w.id] ?? 0) + 1 }))
    setToast(w.label + " añadido al carrito")
    window.setTimeout(() => setToast(null), 2200)
  }, [])
  const setQty = (id: string, qty: number) =>
    setCart((c) => {
      const next = { ...c }
      if (qty <= 0) delete next[id]
      else next[id] = qty
      return next
    })
  const count = Object.values(cart).reduce((a, b) => a + b, 0)

  // Los botones flotantes se ocultan mientras el carrusel ocupa la pantalla, para no tapar la ficha.
  const [dockHidden, setDockHidden] = useState(false)
  useEffect(() => {
    const el = document.querySelector(".dsh-trk")
    if (!el) return
    const io = new IntersectionObserver(([e]) => setDockHidden(e.isIntersecting && e.intersectionRatio > 0.15), { threshold: [0, 0.15, 0.5] })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <>
      <AgeGate />
      <Hero cartCount={count} onCart={() => setCartOpen(true)} />

      <CatalogIntro />
      <DishOrbitCarousel
        dishes={wines}
        backdrop={IMAGES.cellar}
        round
        loop={false}
        labels={{
          region: "Catálogo de vinos",
          play: "Ver cata virtual",
          order: "Añadir al carrito",
          overview: "Descripción",
          ingredients: "Maridaje",
          likes: "reseñas",
          dislike: "No es para mí",
          search: "Buscar vinos",
          menu: "Menú",
          prev: "Vino anterior",
          next: "Vino siguiente",
          chooser: "Elegir un vino",
          details: "Detalles del vino",
          eyebrow: (i) => "#" + (i + 1) + " Selección TradeVino",
          rated: (r) => "Calificación " + r + " de 5",
          status: (i, n, name) => "Vino " + (i + 1) + " de " + n + ": " + name,
        }}
        onOrder={(d) => add(d as Wine)}
        onPlay={(d) => window.open(waLink("Hola, quiero reservar una cata virtual de " + (d as Wine).label + "."), "_blank")}
        onSearch={() => setSearchOpen(true)}
        onMenu={() => setMenuOpen(true)}
      />

      <Values />
      <Recommender onAdd={add} />
      <ClubAndGifts />
      <Business />
      <Footer />

      {/* Accesos rápidos flotantes */}
      <div className={"fixed bottom-5 right-5 z-[80] flex flex-col gap-3 transition duration-300 " + (dockHidden ? "pointer-events-none translate-y-4 opacity-0" : "")}>
        <a href={waLink("Hola TradeVino Global, necesito ayuda para elegir un vino.")} target="_blank" rel="noreferrer" aria-label="Escríbenos por WhatsApp" className="grid size-12 place-items-center rounded-full bg-[#25D366] text-white shadow-lg transition hover:scale-105">
          <MessageCircle className="size-6" />
        </a>
        <button onClick={() => setCartOpen(true)} aria-label="Abrir carrito" className="relative grid size-12 place-items-center rounded-full bg-primary text-primary-foreground shadow-lg transition hover:scale-105">
          <ShoppingBag className="size-5" />
          {count > 0 && <span className="absolute -right-1 -top-1 grid size-5 place-items-center rounded-full bg-foreground text-[10px] font-bold text-background">{count}</span>}
        </button>
      </div>

      <div role="status" aria-live="polite" className={"fixed bottom-6 left-1/2 z-[95] -translate-x-1/2 rounded-full bg-foreground px-5 py-2.5 text-sm text-background shadow-xl transition " + (toast ? "opacity-100" : "pointer-events-none translate-y-3 opacity-0")}>
        {toast}
      </div>

      <MenuSheet open={menuOpen} onClose={() => setMenuOpen(false)} />
      <SearchSheet open={searchOpen} onClose={() => setSearchOpen(false)} onAdd={add} />
      <CartSheet open={cartOpen} onClose={() => setCartOpen(false)} cart={cart} setQty={setQty} />
    </>
  )
}
