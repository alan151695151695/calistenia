"use client";
import React from "react";

export function Button({
  children,
  className = "",
  asChild = false,
  size = "default",
  disabled = false,
  onClick,
  // Datos para el pixel (edítalos si quieres)
  pixelAmount = 5999,
  pixelCurrency = "ARS",
  pixelContentName = "PAQUETE COMPLETO DE CALISTENIA",
  ...props
}) {
  const [busy, setBusy] = React.useState(false);

  // Inyectamos un onClick que:
  // - Si el href apunta a /api/pay (con o sin ?redirect=1), dispara Pixel
  // - Hace POST /api/pay y abre el payment_link devuelto
  const enhanceOnClick = (origOnClick, childProps) => async (e) => {
    const href = childProps?.href;
    const target = childProps?.target;

    const isPayLink =
      typeof href === "string" && href.includes("/api/pay"); // /api/pay o /api/pay?redirect=1

    if (isPayLink) {
      e.preventDefault();

      try {
        if (typeof window !== "undefined" && window.fbq) {
          window.fbq("track", "InitiateCheckout", {
            value: pixelAmount,
            currency: pixelCurrency,
            content_name: pixelContentName,
          });
        }
      } catch {}

      setBusy(true);
      try {
        const r = await fetch("/api/pay", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: "{}",
        });
        const j = await r.json();
        const link = j?.payment_link;

        if (link) {
          if (target === "_blank") window.open(link, "_blank", "noopener");
          else window.location.assign(link);
        } else {
          // Fallback: si por alguna razón no vino link, dejamos que navegue al href original (GET)
          window.location.assign(href);
        }
      } catch (err) {
        console.error("Error creando pago:", err);
        // Fallback a GET
        window.location.assign(href);
      } finally {
        setBusy(false);
      }
      return;
    }

    // No es link de pago: comportamiento normal
    origOnClick?.(e);
    onClick?.(e);
  };

  // asChild: clona al hijo (<a>) para pasarle className y onClick
  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, {
      className: [children.props.className, className].filter(Boolean).join(" "),
      onClick: enhanceOnClick(children.props.onClick, children.props),
      "aria-disabled": disabled ? true : undefined,
      ...props,
    });
  }

  // Botón normal
  return (
    <button
      className={className}
      disabled={disabled || busy}
      onClick={enhanceOnClick(onClick, {})}
      {...props}
    >
      {children}
    </button>
  );
}

export const buttonVariants = () => "";
