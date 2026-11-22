# TradeVino Global — tienda en línea

Sitio web de TradeVino Global, S.R.L. (vinos nacionales e importados, República Dominicana),
basado en el *Plan de comercio electrónico*. React + Vite + TypeScript + Tailwind v4 con estructura shadcn.

```bash
git clone https://github.com/tobiPG/Web-Vino.git
cd Web-Vino
npm install
npm run dev
```

## Estructura

- `src/components/ui/dish-orbit-carousel.tsx`: carrusel orbital (GSAP + ScrollTrigger). Es el catálogo.
  Cambios respecto al original: prop `labels` (textos en español), prop `round` (recorta fotos en círculo),
  `onSearch`/`onMenu`, y la fuente Outfit viene de `@fontsource-variable/outfit`.
- `src/components/site/`: verificación +18, hero, recomendador, Club TradeVino, cajas de regalo, empresas, carrito.
- `src/data/wines.ts`: catálogo **de ejemplo** (reemplazar por el inventario real) e imágenes de Unsplash.
- `src/lib/site.ts`: WhatsApp, correo y redes (**pendiente: número real de WhatsApp Business**).

¿Por qué `components/ui`? Es la carpeta que shadcn CLI usa por defecto (`components.json`);
mantenerla permite agregar más componentes con `npx shadcn add ...` sin reconfigurar rutas.
