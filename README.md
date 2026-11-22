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
- `src/components/site/`: encabezado y navegación móvil, portada, tienda con filtros, ficha de cada vino,
  carrito, pago en pasos con verificación +18, recomendador, planes del Club, regalos, empresas.
- `src/data/wines.ts`: catálogo **de ejemplo** (reemplazar por el inventario real).
- `public/img/`: fotos reales de Unsplash (licencia Unsplash). Reemplazar por las fotos de los productos.
- `src/lib/site.ts`: WhatsApp, correo, redes, envío gratis, cupones y precios del Club (**valores de ejemplo**).
- `src/lib/cart.ts`: carrito (botella o caja de 6), totales, cupones y envío.

¿Por qué `components/ui`? Es la carpeta que shadcn CLI usa por defecto (`components.json`);
mantenerla permite agregar más componentes con `npx shadcn add ...` sin reconfigurar rutas.
