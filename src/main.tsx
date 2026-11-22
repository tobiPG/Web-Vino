import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import App from "./App"
import { IMAGE_FALLBACKS } from "@/data/wines"
import "./index.css"

// Si una foto remota no carga, se sustituye por la botella ilustrada.
document.addEventListener(
  "error",
  (e) => {
    const img = e.target
    if (!(img instanceof HTMLImageElement)) return
    const src = img.getAttribute("src") ?? ""
    const fb = IMAGE_FALLBACKS[src]
    if (fb) img.src = fb
    else img.style.visibility = "hidden"
  },
  true,
)

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
