import { CASE_DISCOUNT, CASE_SIZE, wines, type Wine } from "@/data/wines"
import { COUPONS, SITE } from "@/lib/site"

/** Clave de línea: "<id>" para botella suelta, "<id>|caja" para caja de 6. */
export type Cart = Record<string, number>
export type Format = "botella" | "caja"

export const lineKey = (id: string, f: Format) => (f === "caja" ? `${id}|caja` : id)

export type Line = { key: string; wine: Wine; format: Format; qty: number; unit: number; total: number; bottles: number }

export function cartLines(cart: Cart): Line[] {
  return Object.entries(cart).flatMap(([key, qty]) => {
    const [id, f] = key.split("|")
    const wine = wines.find((w) => w.id === id)
    if (!wine || qty <= 0) return []
    const format: Format = f === "caja" ? "caja" : "botella"
    const unit = format === "caja" ? wine.price * CASE_SIZE * (1 - CASE_DISCOUNT) : wine.price
    return [{ key, wine, format, qty, unit, total: unit * qty, bottles: qty * (format === "caja" ? CASE_SIZE : 1) }]
  })
}

export function cartTotals(cart: Cart, coupon = "", gift = false) {
  const lines = cartLines(cart)
  const subtotal = lines.reduce((s, l) => s + l.total, 0)
  const rate = COUPONS[coupon.trim().toUpperCase()] ?? 0
  const discount = subtotal * rate
  const giftCost = gift ? 350 : 0
  const shipping = subtotal === 0 || subtotal >= SITE.freeShippingFrom ? 0 : SITE.shippingCost
  return { lines, subtotal, discount, giftCost, shipping, total: subtotal - discount + giftCost + shipping, couponValid: rate > 0 }
}

export const cartCount = (cart: Cart) => cartLines(cart).reduce((s, l) => s + l.bottles, 0)
