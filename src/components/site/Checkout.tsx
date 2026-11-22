import { useEffect, useMemo, useState } from "react"
import { Building2, Check, CreditCard, Lock, MessageCircle, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { formatRD } from "@/data/wines"
import { SITE, waLink } from "@/lib/site"
import { cartTotals, type Cart } from "@/lib/cart"

type Pay = "tarjeta" | "transferencia" | "whatsapp"
const PAY: { id: Pay; title: string; sub: string; icon: typeof CreditCard }[] = [
  { id: "tarjeta", title: "Tarjeta", sub: "Azul · CardNet", icon: CreditCard },
  { id: "transferencia", title: "Transferencia", sub: "Bancos locales", icon: Building2 },
  { id: "whatsapp", title: "WhatsApp", sub: "Confirmar con un asesor", icon: MessageCircle },
]

function ageFrom(date: string) {
  const d = new Date(date + "T00:00:00")
  if (isNaN(d.getTime())) return -1
  const now = new Date()
  let a = now.getFullYear() - d.getFullYear()
  if (now.getMonth() < d.getMonth() || (now.getMonth() === d.getMonth() && now.getDate() < d.getDate())) a--
  return a
}

export function Checkout({ open, onClose, cart, onDone }: { open: boolean; onClose: () => void; cart: Cart; onDone: () => void }) {
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({ name: "", phone: "", address: "", city: "Santo Domingo", birth: "", slot: "Mañana · 9:00 a. m. – 1:00 p. m.", notes: "" })
  const [pay, setPay] = useState<Pay>("tarjeta")
  const [gift, setGift] = useState(false)
  const [giftMsg, setGiftMsg] = useState("")
  const [coupon, setCoupon] = useState("")
  const [applied, setApplied] = useState("")
  const [touched, setTouched] = useState(false)
  const [order, setOrder] = useState("")

  const t = useMemo(() => cartTotals(cart, applied, gift), [cart, applied, gift])
  const age = ageFrom(form.birth)
  const errors = {
    name: form.name.trim().length < 3 ? "Escribe tu nombre completo" : "",
    phone: form.phone.replace(/\D/g, "").length < 10 ? "Teléfono de 10 dígitos" : "",
    address: form.address.trim().length < 8 ? "Escribe la dirección de entrega" : "",
    birth: !form.birth ? "Requerida para verificar tu edad" : age < 18 ? "Debes ser mayor de 18 años para comprar" : "",
  }
  const valid = !Object.values(errors).some(Boolean)

  useEffect(() => {
    if (!open) return
    setStep(1); setTouched(false); setOrder("")
    document.body.style.overflow = "hidden"
    return () => { document.body.style.overflow = "" }
  }, [open])

  if (!open) return null

  const field = (k: keyof typeof form) => ({ value: form[k], onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setForm({ ...form, [k]: e.target.value }) })
  const inputCls = "w-full rounded-xl border bg-transparent px-4 py-3 text-sm outline-none transition focus:border-primary [&>option]:bg-card"
  const Err = ({ k }: { k: keyof typeof errors }) => (touched && errors[k] ? <p className="mt-1 text-xs text-[#ff9b9b]">{errors[k]}</p> : null)

  const submit = () => {
    const id = "TV-" + Date.now().toString().slice(-6)
    const lines = t.lines.map((l) => `• ${l.qty} x ${l.wine.name} ${l.wine.vintage}${l.format === "caja" ? " (caja de 6)" : ""}: ${formatRD(l.total)}`).join("\n")
    const msg =
      `Hola TradeVino Global, este es mi pedido ${id}:\n${lines}\n` +
      `Subtotal: ${formatRD(t.subtotal)}\n` +
      (t.discount ? `Descuento (${applied.toUpperCase()}): -${formatRD(t.discount)}\n` : "") +
      (gift ? `Caja de regalo: ${formatRD(t.giftCost)}${giftMsg ? ` · Mensaje: "${giftMsg}"` : ""}\n` : "") +
      `Entrega: ${t.shipping ? formatRD(t.shipping) : "Gratis"}\nTotal: ${formatRD(t.total)}\n\n` +
      `Nombre: ${form.name}\nTeléfono: ${form.phone}\nDirección: ${form.address}, ${form.city}\nHorario: ${form.slot}\n` +
      (form.notes ? `Notas: ${form.notes}\n` : "") +
      `Pago: ${PAY.find((p) => p.id === pay)!.title}\nConfirmo que soy mayor de 18 años.`
    setOrder(id)
    setStep(3)
    window.open(waLink(msg), "_blank")
    onDone()
  }

  return (
    <div className="fixed inset-0 z-[95] overflow-y-auto bg-background" role="dialog" aria-modal="true" aria-label="Finalizar compra">
      <div className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-4 sm:px-8">
          <span className="font-display text-2xl">TradeVino Global</span>
          <ol className="ml-auto hidden items-center gap-6 text-sm sm:flex">
            {["Datos y entrega", "Pago", "Confirmación"].map((s, i) => (
              <li key={s} className="flex items-center gap-2">
                <span className={cn("grid size-7 place-items-center rounded-full border text-xs", step > i + 1 ? "border-primary bg-primary text-primary-foreground" : step === i + 1 ? "border-primary text-primary" : "")}>
                  {step > i + 1 ? <Check className="size-3.5" /> : i + 1}
                </span>
                <span className={step === i + 1 ? "" : "text-muted-foreground"}>{s}</span>
              </li>
            ))}
          </ol>
          <button onClick={onClose} aria-label="Cerrar" className="ml-auto rounded-full border p-2 hover:bg-white/10 sm:ml-4"><X className="size-5" /></button>
        </div>
      </div>

      {step === 3 ? (
        <div className="mx-auto max-w-xl px-4 py-20 text-center">
          <div className="mx-auto grid size-16 place-items-center rounded-full bg-primary text-primary-foreground"><Check className="size-8" /></div>
          <h2 className="mt-6 font-display text-5xl">¡Pedido enviado!</h2>
          <p className="mt-4 text-muted-foreground">Tu número de pedido es <b className="text-foreground">{order}</b>. Se abrió WhatsApp con el detalle: envía el mensaje y un asesor te confirmará la entrega{pay === "tarjeta" ? " y te enviará el enlace de pago seguro (Azul / CardNet)" : pay === "transferencia" ? " y los datos para la transferencia" : ""}.</p>
          <button onClick={onClose} className="mt-8 rounded-full bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground">Seguir comprando</button>
        </div>
      ) : (
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-8 sm:px-8 lg:grid-cols-[1.35fr_1fr] lg:py-12">
          <div className="rounded-3xl border bg-card p-6 sm:p-8">
            {step === 1 ? (
              <>
                <h2 className="font-display text-4xl">Datos de entrega</h2>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <label className="block"><span className="mb-1.5 block text-[11px] tracking-[0.15em] text-muted-foreground">NOMBRE COMPLETO</span><input className={inputCls} autoComplete="name" {...field("name")} /><Err k="name" /></label>
                  <label className="block"><span className="mb-1.5 block text-[11px] tracking-[0.15em] text-muted-foreground">TELÉFONO</span><input className={inputCls} type="tel" autoComplete="tel" placeholder="809-000-0000" {...field("phone")} /><Err k="phone" /></label>
                  <label className="block sm:col-span-2"><span className="mb-1.5 block text-[11px] tracking-[0.15em] text-muted-foreground">DIRECCIÓN</span><input className={inputCls} autoComplete="street-address" placeholder="Calle, número, sector" {...field("address")} /><Err k="address" /></label>
                  <label className="block"><span className="mb-1.5 block text-[11px] tracking-[0.15em] text-muted-foreground">CIUDAD</span>
                    <select className={inputCls} {...field("city")}>{["Santo Domingo", "Santiago", "Punta Cana", "La Romana", "Puerto Plata", "Otra"].map((c) => <option key={c}>{c}</option>)}</select>
                  </label>
                  <label className="block"><span className="mb-1.5 flex items-center gap-2 text-[11px] tracking-[0.15em] text-muted-foreground">FECHA DE NACIMIENTO <span className="rounded-full bg-primary px-2 py-0.5 text-[9px] font-bold text-primary-foreground">+18</span></span><input className={inputCls} type="date" {...field("birth")} /><Err k="birth" /></label>
                  <label className="block sm:col-span-2"><span className="mb-1.5 block text-[11px] tracking-[0.15em] text-muted-foreground">HORARIO DE ENTREGA</span>
                    <select className={inputCls} {...field("slot")}>{["Mañana · 9:00 a. m. – 1:00 p. m.", "Tarde · 2:00 – 6:00 p. m.", "Noche · 6:00 – 9:00 p. m."].map((s) => <option key={s}>{s}</option>)}</select>
                  </label>
                  <label className="block sm:col-span-2"><span className="mb-1.5 block text-[11px] tracking-[0.15em] text-muted-foreground">NOTAS PARA LA ENTREGA (OPCIONAL)</span><textarea rows={2} className={inputCls} {...field("notes")} /></label>
                </div>
                <button onClick={() => { setTouched(true); if (valid) setStep(2) }} className="mt-7 w-full rounded-full bg-primary py-3.5 text-sm font-semibold text-primary-foreground transition hover:brightness-110">Continuar al pago</button>
              </>
            ) : (
              <>
                <h2 className="font-display text-4xl">Método de pago</h2>
                <div className="mt-6 grid gap-3 sm:grid-cols-3" role="radiogroup" aria-label="Método de pago">
                  {PAY.map(({ id, title, sub, icon: Icon }) => (
                    <button key={id} role="radio" aria-checked={pay === id} onClick={() => setPay(id)} className={cn("rounded-2xl border p-4 text-left transition", pay === id ? "border-primary bg-primary/10" : "hover:bg-white/5")}>
                      <Icon className="size-5 text-primary" strokeWidth={1.5} />
                      <p className="mt-2 text-sm font-semibold">{title}</p>
                      <p className="text-xs text-muted-foreground">{sub}</p>
                    </button>
                  ))}
                </div>
                <label className="mt-6 flex cursor-pointer items-start gap-3 text-sm">
                  <input type="checkbox" checked={gift} onChange={() => setGift(!gift)} className="mt-0.5 size-4 accent-[var(--color-primary)]" />
                  <span>Es un regalo: añadir caja elegante y mensaje personalizado (+{formatRD(350)})</span>
                </label>
                {gift && <input className={cn(inputCls, "mt-3")} placeholder="Tu mensaje para la tarjeta" value={giftMsg} onChange={(e) => setGiftMsg(e.target.value)} />}
                <div className="mt-7 flex gap-3">
                  <button onClick={() => setStep(1)} className="rounded-full border px-6 py-3.5 text-sm hover:bg-white/5">Atrás</button>
                  <button onClick={submit} className="flex flex-1 items-center justify-center gap-2 rounded-full bg-primary py-3.5 text-sm font-semibold text-primary-foreground transition hover:brightness-110">
                    <Lock className="size-4" /> Confirmar pedido · {formatRD(t.total)}
                  </button>
                </div>
                <p className="mt-3 text-center text-xs text-muted-foreground">Al confirmar se abrirá WhatsApp con tu pedido para que un asesor lo valide.</p>
              </>
            )}
          </div>

          <aside className="h-fit rounded-3xl border bg-card p-6 sm:p-8">
            <h3 className="font-display text-3xl">Tu pedido</h3>
            <ul className="mt-4 divide-y divide-[var(--color-border)]">
              {t.lines.map((l) => (
                <li key={l.key} className="flex items-center gap-3 py-3">
                  <img src={l.wine.image} alt="" className="size-14 rounded-lg object-cover" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold">{l.wine.name}</p>
                    <p className="text-xs text-muted-foreground">{l.qty} × {l.format === "caja" ? "caja de 6" : "botella"}</p>
                  </div>
                  <span className="text-sm">{formatRD(l.total)}</span>
                </li>
              ))}
            </ul>
            <form onSubmit={(e) => { e.preventDefault(); setApplied(coupon) }} className="mt-4 flex gap-2">
              <input value={coupon} onChange={(e) => setCoupon(e.target.value)} placeholder="Código de descuento" className={inputCls} />
              <button className="rounded-xl border px-4 text-sm hover:bg-white/5">Aplicar</button>
            </form>
            {applied && <p className={cn("mt-2 text-xs", t.couponValid ? "text-primary" : "text-[#ff9b9b]")}>{t.couponValid ? "Cupón aplicado" : "Cupón no válido"}</p>}
            <dl className="mt-5 space-y-2.5 border-t pt-5 text-sm">
              <div className="flex justify-between"><dt className="text-muted-foreground">Subtotal</dt><dd>{formatRD(t.subtotal)}</dd></div>
              {t.discount > 0 && <div className="flex justify-between text-primary"><dt>Descuento</dt><dd>-{formatRD(t.discount)}</dd></div>}
              {gift && <div className="flex justify-between"><dt className="text-muted-foreground">Caja de regalo</dt><dd>{formatRD(t.giftCost)}</dd></div>}
              <div className="flex justify-between"><dt className="text-muted-foreground">Entrega</dt><dd className={t.shipping ? "" : "text-primary"}>{t.shipping ? formatRD(t.shipping) : "Gratis"}</dd></div>
              {t.shipping > 0 && <p className="text-xs text-muted-foreground">Te faltan {formatRD(SITE.freeShippingFrom - t.subtotal)} para la entrega gratis.</p>}
            </dl>
            <div className="mt-4 flex items-baseline justify-between border-t pt-4"><span>Total</span><span className="font-display text-4xl">{formatRD(t.total)}</span></div>
          </aside>
        </div>
      )}
    </div>
  )
}
