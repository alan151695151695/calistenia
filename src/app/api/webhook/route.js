// src/app/api/webhook/route.js
import { NextResponse } from "next/server";

// ===== Configuración Meta Conversions API =====
const META_PIXEL_ID = "2703267366549389"; // <- tu Pixel ID
const META_ACCESS_TOKEN =
  "EAAOv6tJB7hYBPPwAkgEfMNBo6oJNB4BO7D5ZCLE4qEcBokmYcIT35Kvto4b7tnV3OmZBsGnfOzg1dwQwZC4WFeF39kBTWBbZBVRuJNDDWZCMU3y3Ub590VJEGoZAb1PQIex8kUZAua6W1ZAtx4NBCedbU2vq7AqZBL66dRf3Us5mJAPA31EAnPZASy6UmsZCQgP0snegwZDZD"; // <- token CAPI
const META_TEST_EVENT_CODE = ""; // opcional (Test Events)

async function sendMetaPurchase({ value, currency, orderId, eventSourceUrl }) {
  const url = `https://graph.facebook.com/v17.0/${META_PIXEL_ID}/events?access_token=${META_ACCESS_TOKEN}`;

  const payload = {
    data: [
      {
        event_name: "Purchase",
        event_time: Math.floor(Date.now() / 1000),
        action_source: "website",
        event_source_url: eventSourceUrl || "",
        // event_id: orderId, // descomenta si luego usas deduplicación
        custom_data: {
          currency: currency || "ARS",
          value: Number(value) || 0,
          order_id: orderId || "",
        },
      },
    ],
  };

  if (META_TEST_EVENT_CODE) payload.test_event_code = META_TEST_EVENT_CODE;

  const r = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const txt = await r.text();
  let json;
  try {
    json = JSON.parse(txt);
  } catch {
    json = { raw: txt };
  }
  console.log("Meta CAPI response:", r.status, json);
  return { ok: r.ok, status: r.status, body: json };
}
// =============================================

export async function POST(req) {
  const body = await req.json().catch(() => ({}));
  console.log("Webhook dLocal recibido:", body);

  // Campos típicos (ajusta si tu payload difiere)
  const status = (
    body?.status ||
    body?.event?.status ||
    body?.payment?.status ||
    ""
  )
    .toString()
    .toUpperCase();

  const amount =
    body?.amount ?? body?.payment?.amount ?? body?.transaction?.amount ?? 0;
  const currency = body?.currency ?? body?.payment?.currency ?? "ARS";
  const paymentId = body?.id ?? body?.payment_id ?? body?.payment?.id ?? "";
  const orderId = body?.order_id ?? body?.payment?.order_id ?? paymentId;

  // URL opcional para el evento (tu /success)
  const proto = req.headers.get("x-forwarded-proto") || "http";
  const host =
    req.headers.get("x-forwarded-host") || req.headers.get("host") || "";
  const eventSourceUrl = host ? `${proto}://${host}/success` : "";

  if (status === "APPROVED") {
    await sendMetaPurchase({
      value: amount,
      currency,
      orderId,
      eventSourceUrl,
    });
  } else {
    console.log("Estado no aprobado; no se envía Purchase a Meta:", status);
  }

  // siempre 200 para que dLocal marque entregado
  return NextResponse.json({ ok: true });
}

export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
