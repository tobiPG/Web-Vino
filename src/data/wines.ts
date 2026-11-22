import type { Dish } from "@/components/ui/dish-orbit-carousel"

/*
 * Catálogo de ejemplo de TradeVino Global.
 * Cada vino reutiliza la forma `Dish` del carrusel:
 *   title / subtitle  -> línea fina (tipo/uva) y línea gruesa (nombre)
 *   chef / kitchen    -> línea de la casa y origen + añada
 *   ingredients       -> pestaña "Maridaje": uva, notas y comidas
 *   likes             -> número de reseñas
 * Reemplazar por el inventario real (Google Sheets / WooCommerce).
 */

export type Wine = Dish & {
  id: string
  type: "Tinto" | "Blanco" | "Rosado" | "Espumoso"
  country: string
  grape: string
  vintage: string
  price: number
  /** Etiquetas usadas por el recomendador. */
  pairsWith: Array<"carnes" | "pescados" | "pastas" | "quesos" | "postres" | "aperitivo">
  taste: Array<"intenso" | "suave" | "fresco" | "dulce">
}

/** Fotos de Unsplash (licencia libre). Se recortan en círculo dentro del carrusel. */
const u = (id: string, w = 700) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&h=${w}&q=80`

export const IMAGES = {
  hero: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&w=2000&q=80",
  cellar: "https://images.unsplash.com/photo-1504279577054-acfeccf8fc52?auto=format&fit=crop&w=1600&q=70",
  grapes: "https://images.unsplash.com/photo-1423483641154-5411ec9c0ddf?auto=format&fit=crop&w=1200&q=75",
  toast: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1200&q=75",
  bottles: "https://images.unsplash.com/photo-1474722883778-792e7990302f?auto=format&fit=crop&w=1200&q=75",
  pour: "https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?auto=format&fit=crop&w=1200&q=75",
}

export const wines: Wine[] = [
  {
    id: "malbec-reserva",
    type: "Tinto",
    country: "Argentina",
    grape: "Malbec",
    vintage: "2021",
    price: 1850,
    title: "Malbec",
    subtitle: "Reserva",
    label: "Malbec Reserva",
    eyebrow: "#1 Más vendido · Argentina",
    image: u("1510812431401-41d2bd2722f3"),
    alt: "Dos copas de vino tinto",
    rating: 4.8,
    chef: "Selección TradeVino",
    kitchen: "Mendoza, Argentina · Añada 2021",
    description: "Ciruela madura, violeta y un toque de vainilla tras 12 meses en roble. Taninos suaves y final largo. RD$ 1,850.",
    likes: 214,
    ingredients: ["Malbec 100%", "Carnes a la parrilla", "Chivo guisado", "Quesos curados", "14% vol."],
    accent: "#b23a48",
    pairsWith: ["carnes", "quesos"],
    taste: ["intenso"],
  },
  {
    id: "tempranillo-crianza",
    type: "Tinto",
    country: "España",
    grape: "Tempranillo",
    vintage: "2019",
    price: 2100,
    title: "Rioja",
    subtitle: "Crianza",
    label: "Rioja Crianza",
    eyebrow: "#2 Favorito de la casa · España",
    image: u("1553361371-9b22f78e8b1d"),
    alt: "Vino tinto sirviéndose en una copa",
    rating: 4.7,
    chef: "Selección TradeVino",
    kitchen: "La Rioja, España · Añada 2019",
    description: "Cereza, especias dulces y cuero fino. Elegante y equilibrado, ideal para la mesa del domingo. RD$ 2,100.",
    likes: 176,
    ingredients: ["Tempranillo", "Cordero", "Embutidos", "Pastas con salsa roja", "13.5% vol."],
    accent: "#c2703d",
    pairsWith: ["carnes", "pastas", "quesos"],
    taste: ["intenso", "suave"],
  },
  {
    id: "sauvignon-blanc",
    type: "Blanco",
    country: "Chile",
    grape: "Sauvignon Blanc",
    vintage: "2023",
    price: 1250,
    title: "Blanco",
    subtitle: "Sauvignon",
    label: "Sauvignon Blanc",
    eyebrow: "#3 Fresco del Pacífico · Chile",
    image: u("1566995541428-f2246c17cda1"),
    alt: "Copa de vino blanco frío",
    rating: 4.5,
    chef: "Selección TradeVino",
    kitchen: "Valle de Casablanca, Chile · Añada 2023",
    description: "Cítricos, maracuyá y hierba recién cortada. Vibrante y fresco, perfecto para el clima del Caribe. RD$ 1,250.",
    likes: 132,
    ingredients: ["Sauvignon Blanc", "Mariscos", "Ceviche", "Pescado a la plancha", "12.5% vol."],
    accent: "#d8c46a",
    pairsWith: ["pescados", "aperitivo"],
    taste: ["fresco"],
  },
  {
    id: "rose-provenza",
    type: "Rosado",
    country: "Francia",
    grape: "Garnacha · Cinsault",
    vintage: "2023",
    price: 1950,
    title: "Rosé",
    subtitle: "Provenza",
    label: "Rosé de Provenza",
    eyebrow: "#4 Para la terraza · Francia",
    image: u("1558001373-7b93ee48ffa0"),
    alt: "Copas de vino rosado al atardecer",
    rating: 4.6,
    chef: "Selección TradeVino",
    kitchen: "Provenza, Francia · Añada 2023",
    description: "Fresa silvestre, pomelo y un fondo mineral. Seco, ligero y muy elegante. RD$ 1,950.",
    likes: 98,
    ingredients: ["Garnacha", "Cinsault", "Ensaladas", "Sushi", "Tapas", "12.5% vol."],
    accent: "#e79aa6",
    pairsWith: ["pescados", "aperitivo"],
    taste: ["fresco", "suave"],
  },
  {
    id: "cava-brut",
    type: "Espumoso",
    country: "España",
    grape: "Macabeo · Xarel·lo · Parellada",
    vintage: "NV",
    price: 1650,
    title: "Espumoso",
    subtitle: "Cava Brut",
    label: "Cava Brut",
    eyebrow: "#5 Para celebrar · España",
    image: u("1543418219-44e30b057fea"),
    alt: "Brindis con copas de espumoso",
    rating: 4.4,
    chef: "Selección TradeVino",
    kitchen: "Penedès, España · Método tradicional",
    description: "Burbuja fina, manzana verde y pan tostado. El brindis perfecto para bodas, cumpleaños y eventos. RD$ 1,650.",
    likes: 121,
    ingredients: ["Macabeo", "Xarel·lo", "Parellada", "Aperitivos", "Postres ligeros", "11.5% vol."],
    accent: "#e8d7a8",
    pairsWith: ["aperitivo", "postres", "pescados"],
    taste: ["fresco", "dulce"],
  },
  {
    id: "cabernet-maipo",
    type: "Tinto",
    country: "Chile",
    grape: "Cabernet Sauvignon",
    vintage: "2020",
    price: 1450,
    title: "Cabernet",
    subtitle: "Sauvignon",
    label: "Cabernet Maipo",
    eyebrow: "#6 Mejor precio-calidad · Chile",
    image: u("1474722883778-792e7990302f"),
    alt: "Botellas de vino tinto en una cava",
    rating: 4.5,
    chef: "Selección TradeVino",
    kitchen: "Valle del Maipo, Chile · Añada 2020",
    description: "Cassis, pimiento asado y cacao. Estructurado y redondo, un clásico que nunca falla. RD$ 1,450.",
    likes: 188,
    ingredients: ["Cabernet Sauvignon", "Churrasco", "Hamburguesas", "Lasaña", "13.5% vol."],
    accent: "#8e3b5a",
    pairsWith: ["carnes", "pastas"],
    taste: ["intenso"],
  },
]

/** Botella ilustrada (estilo del plan de comercio) por si una foto no carga. */
function bottleSvg(fill: string, label: string) {
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 245 245">` +
    `<circle cx="122.5" cy="122.5" r="118" fill="#5a0a10"/>` +
    `<circle cx="122.5" cy="122.5" r="104" fill="none" stroke="${label}" stroke-opacity=".35" stroke-width="1.5"/>` +
    `<path d="M112 34h21v34c0 10 22 22 22 46v86c0 8-6 12-13 12h-39c-7 0-13-4-13-12v-86c0-24 22-36 22-46z" fill="${fill}"/>` +
    `<rect x="112" y="30" width="21" height="14" rx="2" fill="#c9a24a"/>` +
    `<rect x="93" y="132" width="59" height="44" rx="3" fill="${label}"/>` +
    `<path d="M104 146h37M108 156h29M112 165h21" stroke="#5a0a10" stroke-opacity=".55" stroke-width="2" stroke-linecap="round"/>` +
    `<path d="M101 104c2-12 8-18 11-22" stroke="#fff" stroke-opacity=".25" stroke-width="5" stroke-linecap="round" fill="none"/>` +
    `</svg>`
  return "data:image/svg+xml;utf8," + encodeURIComponent(svg)
}

const FALLBACK_BY_TYPE: Record<Wine["type"], string> = {
  Tinto: bottleSvg("#2a0d14", "#efe6d6"),
  Blanco: bottleSvg("#9fae5a", "#efe6d6"),
  Rosado: bottleSvg("#d98a95", "#efe6d6"),
  Espumoso: bottleSvg("#2f4a2c", "#e8d7a8"),
}

/** URL de imagen -> ilustración de respaldo. */
export const IMAGE_FALLBACKS: Record<string, string> = Object.fromEntries(
  wines.map((w) => [w.image, FALLBACK_BY_TYPE[w.type]]),
)

export const formatRD = (n: number) => "RD$ " + n.toLocaleString("es-DO")
