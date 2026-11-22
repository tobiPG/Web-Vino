/** Datos de contacto de la tienda. Reemplazar por los reales. */
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
}

export const waLink = (text: string) => `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}`
