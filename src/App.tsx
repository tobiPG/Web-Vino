import { useCallback, useEffect, useMemo, useState } from "react"
import { MessageCircle } from "lucide-react"
import DishOrbitCarousel from "@/components/ui/dish-orbit-carousel"
import { AgeGate, CartSheet, MenuSheet } from "@/components/site/Overlays"
import { Header, MobileNav, PromoBar, type Category } from "@/components/site/Header"
import { Shop, emptyFilters, type Filters } from "@/components/site/Shop"
import { ProductView } from "@/components/site/ProductView"
import { Checkout } from "@/components/site/Checkout"
import { Business, Club, FeaturedIntro, Footer, Gifts, Hero, Recommender } from "@/components/site/Sections"
import { IMAGES, toDish, wines, type Wine } from "@/data/wines"
import { waLink } from "@/lib/site"
import { cartCount, lineKey, type Cart, type Format } from "@/lib/cart"

const FAV_KEY = "tvg-favs"
const readFavs = (): string[] => {
  try { return JSON.parse(localStorage.getItem(FAV_KEY) ?? "[]") } catch { return [] }
}

export default function App() {
  const [cart, setCart] = useState<Cart>({})
  const [favorites, setFavorites] = useState<string[]>(readFavs)
  const [query, setQuery] = useState("")
  const [filters, setFilters] = useState<Filters>(emptyFilters)
  const [product, setProduct] = useState<Wine | null>(null)
  const [cartOpen, setCartOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [checkoutOpen, setCheckoutOpen] = useState(false)
  const [toast, setToast] = useState<string | null>(null)

  useEffect(() => {
    try { localStorage.setItem(FAV_KEY, JSON.stringify(favorites)) } catch { /* sin almacenamiento */ }
  }, [favorites])

  const notify = (msg: string) => {
    setToast(msg)
    window.setTimeout(() => setToast(null), 2200)
  }
  const add = useCallback((w: Wine, format: Format = "botella", qty = 1) => {
    const key = lineKey(w.id, format)
    setCart((c) => ({ ...c, [key]: (c[key] ?? 0) + qty }))
    notify(`${w.name}${format === "caja" ? " (caja de 6)" : ""} añadido al carrito`)
  }, [])
  const setQty = (key: string, qty: number) =>
    setCart((c) => {
      const next = { ...c }
      if (qty <= 0) delete next[key]
      else next[key] = qty
      return next
    })
  const toggleFav = (id: string) => setFavorites((f) => (f.includes(id) ? f.filter((x) => x !== id) : [...f, id]))
  const closeProduct = useCallback(() => setProduct(null), [])

  const scrollToShop = () => document.getElementById("tienda")?.scrollIntoView({ behavior: "smooth" })
  const onCategory = (c: Category) => {
    setFilters({ ...emptyFilters(), types: c && c !== "Ofertas" ? [c] : [], offers: c === "Ofertas" })
    scrollToShop()
  }
  const showFavorites = () => {
    setFilters({ ...emptyFilters(), favorites: true })
    setQuery("")
    scrollToShop()
  }

  // Alto del encabezado fijo, para que el carrusel se fije justo debajo.
  const [hdr, setHdr] = useState(0)
  useEffect(() => {
    const el = document.querySelector("header")
    if (!el) return
    const ro = new ResizeObserver(() => setHdr(Math.round(el.getBoundingClientRect().height)))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  // En móvil la barra inferior ocupa ~66px: el carrusel se ajusta al espacio libre.
  const [mobile, setMobile] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)")
    const on = () => setMobile(mq.matches)
    on()
    mq.addEventListener("change", on)
    return () => mq.removeEventListener("change", on)
  }, [])

  const count = cartCount(cart)
  const dishes = useMemo(() => wines.map(toDish), [])

  // El botón de WhatsApp se oculta mientras el carrusel ocupa la pantalla, para no tapar la ficha.
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
      <PromoBar />
      <Header
        query={query}
        setQuery={setQuery}
        favCount={favorites.length}
        cartCount={count}
        onCart={() => setCartOpen(true)}
        onFavorites={showFavorites}
        onCategory={onCategory}
        onMenu={() => setMenuOpen(true)}
      />
      <main>
        <Hero onShop={scrollToShop} />

        <FeaturedIntro />
        <DishOrbitCarousel
          dishes={dishes}
          backdrop={IMAGES.shelf}
          round
          loop={false}
          stickyTop={hdr}
          height={`calc(100svh - ${hdr + (mobile ? 66 : 0)}px)`}
          labels={{
            region: "Vinos destacados",
            play: "Ver ficha completa",
            order: "Añadir al carrito",
            overview: "Descripción",
            ingredients: "Notas de cata",
            likes: "reseñas",
            dislike: "No es para mí",
            search: "Buscar vinos",
            menu: "Menú",
            prev: "Vino anterior",
            next: "Vino siguiente",
            chooser: "Elegir un vino",
            details: "Detalles del vino",
            rated: (r) => "Calificación " + r + " de 5",
            status: (i, n, name) => "Vino " + (i + 1) + " de " + n + ": " + name,
          }}
          onOrder={(_, i) => add(wines[i])}
          onPlay={(_, i) => setProduct(wines[i])}
          onSearch={scrollToShop}
          onMenu={() => setMenuOpen(true)}
        />

        <Shop
          query={query}
          setQuery={setQuery}
          filters={filters}
          setFilters={setFilters}
          favorites={favorites}
          toggleFav={toggleFav}
          onOpen={setProduct}
          onAdd={(w) => add(w)}
        />
        <Recommender onAdd={(w) => add(w)} onOpen={setProduct} />
        <Club />
        <Gifts />
        <Business />
      </main>
      <Footer />

      <a
        href={waLink("Hola TradeVino Global, necesito ayuda para elegir un vino.")}
        target="_blank"
        rel="noreferrer"
        aria-label="Escríbenos por WhatsApp"
        className={"fixed bottom-5 right-5 z-[80] hidden size-12 place-items-center rounded-full bg-[#25D366] text-white shadow-lg transition hover:scale-105 md:grid " + (dockHidden ? "pointer-events-none translate-y-4 opacity-0" : "")}
      >
        <MessageCircle className="size-6" />
      </a>

      <div role="status" aria-live="polite" className={"fixed bottom-24 left-1/2 z-[96] -translate-x-1/2 whitespace-nowrap rounded-full bg-foreground px-5 py-2.5 text-sm text-background shadow-xl transition md:bottom-6 " + (toast ? "opacity-100" : "pointer-events-none translate-y-3 opacity-0")}>
        {toast}
      </div>

      <MobileNav cartCount={count} onCart={() => setCartOpen(true)} onFavorites={showFavorites} />
      <MenuSheet open={menuOpen} onClose={() => setMenuOpen(false)} />
      <CartSheet open={cartOpen} onClose={() => setCartOpen(false)} cart={cart} setQty={setQty} onCheckout={() => { setCartOpen(false); setCheckoutOpen(true) }} />
      <ProductView wine={product} onClose={closeProduct} fav={!!product && favorites.includes(product.id)} onFav={() => product && toggleFav(product.id)} onAdd={add} />
      <Checkout open={checkoutOpen} onClose={() => setCheckoutOpen(false)} cart={cart} onDone={() => setCart({})} />
    </>
  )
}
