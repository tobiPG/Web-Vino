import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import App from "./App"
import "./index.css"

// Si una imagen no carga, se oculta en lugar de mostrar el ícono de imagen rota.
document.addEventListener(
  "error",
  (e) => {
    if (e.target instanceof HTMLImageElement) e.target.style.visibility = "hidden"
  },
  true,
)

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
