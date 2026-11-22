import type { Dish } from "@/components/ui/dish-orbit-carousel"

/*
 * Catálogo de ejemplo de TradeVino Global.
 * Fotos reales de Unsplash (licencia libre) guardadas en /public/img.
 * Reemplazar por el inventario y las fotos reales de la tienda.
 */

export type WineType = "Tinto" | "Blanco" | "Rosado" | "Espumoso"
export type Taste = "intenso" | "suave" | "fresco" | "dulce"

export type Wine = {
  id: string
  name: string
  /** Línea fina y línea gruesa del carrusel. */
  line1: string
  line2: string
  type: WineType
  country: string
  region: string
  grape: string
  vintage: string
  price: number
  oldPrice?: number
  rating: number
  reviews: number
  stock: number
  abv: string
  temp: string
  aging: string
  notes: string[]
  description: string
  image: string
  alt: string
  badge?: string
  accent: string
  taste: Taste[]
  sales: number
}

const img = (f: string) => `/img/${f}`

export const IMAGES = {
  hero: img("hero-cellar.jpg"),
  vineyard: img("vineyard.jpg"),
  grapes: img("grapes.jpg"),
  toast: img("toast.jpg"),
  shelf: img("shelf.jpg"),
  cellarWall: img("cellar-wall.jpg"),
  tasting: img("tasting.jpg"),
  glassGrapes: img("glass-grapes.jpg"),
}

export const wines: Wine[] = [
  {
    id: "montepulciano",
    name: "Montepulciano d'Abruzzo",
    line1: "Montepulciano",
    line2: "d'Abruzzo",
    type: "Tinto",
    country: "Italia",
    region: "Abruzzo",
    grape: "Montepulciano",
    vintage: "2020",
    price: 1650,
    oldPrice: 1890,
    rating: 4.6,
    reviews: 142,
    stock: 24,
    abv: "13.5% vol.",
    temp: "16–18 °C",
    aging: "6 meses en roble",
    notes: ["Cereza negra", "Ciruela", "Especias suaves", "Taninos redondos"],
    description: "Tinto italiano jugoso y amable: cereza negra, ciruela y un toque especiado. Fácil de disfrutar en cualquier momento.",
    image: img("b-montepulciano.jpg"),
    alt: "Botella de Montepulciano d'Abruzzo sobre fondo negro",
    badge: "Oferta",
    accent: "#b23a48",
    taste: ["suave", "intenso"],
    sales: 310,
  },
  {
    id: "pinot-noir",
    name: "Pinot Noir Reserva",
    line1: "Pinot Noir",
    line2: "Reserva",
    type: "Tinto",
    country: "Chile",
    region: "Valle de Elqui",
    grape: "Pinot Noir",
    vintage: "2013",
    price: 2250,
    rating: 4.8,
    reviews: 96,
    stock: 9,
    abv: "13.5% vol.",
    temp: "14–16 °C",
    aging: "10 meses en barrica francesa",
    notes: ["Frambuesa", "Cereza", "Tierra húmeda", "Final elegante"],
    description: "Pinot Noir de altura, delicado y aromático: frambuesa, cereza y notas terrosas con una acidez muy fresca.",
    image: img("b-pinot.jpg"),
    alt: "Botella de Pinot Noir junto a una copa de vino tinto",
    badge: "Premium",
    accent: "#9b3550",
    taste: ["suave", "fresco"],
    sales: 180,
  },
  {
    id: "cabernet",
    name: "Cabernet Sauvignon",
    line1: "Cabernet",
    line2: "Sauvignon",
    type: "Tinto",
    country: "Estados Unidos",
    region: "Texas",
    grape: "Cabernet Sauvignon",
    vintage: "2019",
    price: 2450,
    rating: 4.7,
    reviews: 74,
    stock: 15,
    abv: "14.2% vol.",
    temp: "16–18 °C",
    aging: "14 meses en roble americano",
    notes: ["Cassis", "Mora", "Cacao", "Vainilla"],
    description: "Cabernet estructurado y profundo: cassis, mora y cacao, con un final largo de vainilla y especias.",
    image: img("b-cabernet.jpg"),
    alt: "Botella de Cabernet Sauvignon en una cava",
    badge: "Nuevo",
    accent: "#8e3b5a",
    taste: ["intenso"],
    sales: 140,
  },
  {
    id: "malbec",
    name: "Malbec Reserva",
    line1: "Malbec",
    line2: "Reserva",
    type: "Tinto",
    country: "Argentina",
    region: "Mendoza",
    grape: "Malbec",
    vintage: "2021",
    price: 1850,
    rating: 4.8,
    reviews: 214,
    stock: 30,
    abv: "14% vol.",
    temp: "16–18 °C",
    aging: "12 meses en roble",
    notes: ["Ciruela madura", "Violeta", "Vainilla", "Taninos suaves"],
    description: "Ciruela madura, violeta y un toque de vainilla tras 12 meses en roble. Taninos suaves y final largo.",
    image: img("b-malbec.jpg"),
    alt: "Vino tinto Malbec sirviéndose en una copa",
    badge: "Más vendido",
    accent: "#c2703d",
    taste: ["intenso", "suave"],
    sales: 420,
  },
  {
    id: "nimes",
    name: "Costières de Nîmes",
    line1: "Costières",
    line2: "de Nîmes",
    type: "Tinto",
    country: "Francia",
    region: "Ródano",
    grape: "Garnacha · Syrah",
    vintage: "2020",
    price: 1550,
    rating: 4.4,
    reviews: 58,
    stock: 18,
    abv: "13.5% vol.",
    temp: "15–17 °C",
    aging: "Crianza en depósito",
    notes: ["Frutos rojos", "Pimienta", "Garriga", "Fresco y ligero"],
    description: "Tinto del sur de Francia, ligero y especiado: frutos rojos, pimienta y hierbas mediterráneas.",
    image: img("b-nimes.jpg"),
    alt: "Botella de vino tinto francés junto a una copa",
    accent: "#a8454f",
    taste: ["suave", "fresco"],
    sales: 120,
  },
  {
    id: "sauvignon-blanc",
    name: "Sauvignon Blanc",
    line1: "Sauvignon",
    line2: "Blanc",
    type: "Blanco",
    country: "Chile",
    region: "Valle de Casablanca",
    grape: "Sauvignon Blanc",
    vintage: "2023",
    price: 1250,
    rating: 4.5,
    reviews: 132,
    stock: 26,
    abv: "12.5% vol.",
    temp: "8–10 °C",
    aging: "Sin barrica",
    notes: ["Cítricos", "Maracuyá", "Hierba fresca", "Acidez viva"],
    description: "Cítricos, maracuyá y hierba recién cortada. Vibrante y fresco, perfecto para el clima del Caribe.",
    image: img("b-blanco.jpg"),
    alt: "Copa de vino blanco",
    accent: "#d8c46a",
    taste: ["fresco"],
    sales: 260,
  },
  {
    id: "rose",
    name: "Rosé de Provenza",
    line1: "Rosé",
    line2: "Provenza",
    type: "Rosado",
    country: "Francia",
    region: "Provenza",
    grape: "Garnacha · Cinsault",
    vintage: "2023",
    price: 1950,
    rating: 4.6,
    reviews: 98,
    stock: 12,
    abv: "12.5% vol.",
    temp: "8–10 °C",
    aging: "Sin barrica",
    notes: ["Fresa silvestre", "Pomelo", "Mineral", "Seco"],
    description: "Fresa silvestre, pomelo y un fondo mineral. Seco, ligero y muy elegante.",
    image: img("b-rose.jpg"),
    alt: "Copas de vino rosado",
    accent: "#e79aa6",
    taste: ["fresco", "suave", "dulce"],
    sales: 150,
  },
]

export const CASE_SIZE = 6
export const CASE_DISCOUNT = 0.1

export const formatRD = (n: number) => "RD$ " + Math.round(n).toLocaleString("es-DO")

/** Adapta un vino a la forma que espera el carrusel orbital. */
export function toDish(w: Wine, i: number): Dish {
  return {
    title: w.line1,
    subtitle: w.line2,
    label: w.name,
    eyebrow: `#${i + 1} ${w.type} · ${w.country}`,
    image: w.image,
    alt: w.alt,
    rating: w.rating,
    chef: formatRD(w.price),
    kitchen: `${w.region}, ${w.country} · Añada ${w.vintage}`,
    description: w.description,
    likes: w.reviews,
    ingredients: [w.grape, ...w.notes, w.abv],
    accent: w.accent,
  }
}
