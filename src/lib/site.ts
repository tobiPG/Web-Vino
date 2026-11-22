/** Datos de la tienda. Los marcados como "ejemplo" deben reemplazarse por los reales. */
export const SITE = {
  name: "TradeVino Global",
  legal: "TradeVino Global, S.R.L.",
  domain: "tradevinoglobal.com",
  // Número de WhatsApp Business en formato internacional, sin "+" ni espacios (pendiente).
  whatsapp: "18090000000",
  email: "ventas@tradevinoglobal.com",
  instagram: "https://instagram.com/",
  facebook: "https://facebook.com/",
  tiktok: "https://tiktok.com/",
  // Ejemplo: entrega gratis desde este monto y costo de envío por debajo.
  freeShippingFrom: 5000,
  shippingCost: 250,
}

/** Cupones de ejemplo (código -> porcentaje de descuento). */
export const COUPONS: Record<string, number> = {
  BIENVENIDO10: 0.1,
}

/** Planes del Club TradeVino (precios de ejemplo). */
export const CLUB_PLANS = [
  {
    id: "descubre",
    name: "Descubre",
    price: 2900,
    perks: ["2 botellas seleccionadas al mes", "Fichas de cata", "5% de descuento en la tienda", "Puntos por cada compra"],
  },
  {
    id: "conocedor",
    name: "Conocedor",
    price: 4500,
    featured: true,
    perks: ["3 botellas premium al mes", "1 cata virtual al mes", "10% de descuento en la tienda", "Puntos dobles y referidos"],
  },
  {
    id: "reserva",
    name: "Reserva",
    price: 7900,
    perks: ["4 botellas de colección al mes", "Catas privadas", "15% de descuento en la tienda", "Acceso anticipado a lanzamientos"],
  },
]

export const waLink = (text: string) => `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}`
