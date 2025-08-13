// src/app/api/pay/route.js
import { NextResponse } from "next/server";
import { headers } from "next/headers";

/** Entorno: deja false para pruebas; true para producción */
const USE_PROD = true;

// Tus claves (las mismas que venías usando)
const API_KEY_SBX    = "reimoVJyCgucLcJnIoqiuVclqcOfgLlG";
const SECRET_KEY_SBX = "EQf2IUVVVur72O24D96Mj7FmRTWBImRme2B233e9";
const API_KEY_PROD    = "FTeTnncaqPfPtMLjgOiUyeozsmKQkHvP";
const SECRET_KEY_PROD = "uaE2CRKtzehnrYr1T5IwtNQsJPrNQP3NeNWEeNsX";

const DLOCAL_BASE = USE_PROD ? "https://api.dlocalgo.com" : "https://api-sbx.dlocalgo.com";
const API  = (USE_PROD ? API_KEY_PROD : API_KEY_SBX).trim();
const SEC  = (USE_PROD ? SECRET_KEY_PROD : SECRET_KEY_SBX).trim();

// En prod: transferencia + tarjetas (sin efectivo). En sandbox: solo tarjetas.
const paymentType = USE_PROD
  ? "BANK_TRANSFER,CREDIT_CARD,DEBIT_CARD"
  : "CREDIT_CARD,DEBIT_CARD";

function appBase() {
  const h = headers();
  const proto = h.get("x-forwarded-proto") || "http";
  const host  = h.get("x-forwarded-host")  || h.get("host");
  return `${proto}://${host}`;
}

function buildPaymentData(base) {
  return {
    country: "AR",
    currency: "ARS",
    amount: 5999,
    order_id: `calistenia_${Date.now()}`,
    description: "PAQUETE COMPLETO DE CALISTENIA",
    success_url: `${base}/success`,
    back_url: `${base}/`,
    notification_url: `${base}/api/webhook`,
    payment_type: paymentType,
    // payer: { name:"Test", email:"test@example.com", document_type:"DNI", document:"12345678" }
  };
}

/** GET /api/pay
 *  - ?redirect=1  → crea el pago y REDIRIGE al checkout (para tu <a href="/api/pay?redirect=1">)
 *  - (sin query)  → ping de credenciales (útil para debug)
 */
export async function GET(req) {
  const url = new URL(req.url);
  if (url.searchParams.get("redirect") === "1") {
    const r = await fetch(`${DLOCAL_BASE}/v1/payments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API}:${SEC}`,
      },
      body: JSON.stringify(buildPaymentData(appBase())),
    });

    const txt = await r.text();
    let data; try { data = JSON.parse(txt); } catch { data = { raw: txt }; }

    if (!r.ok || !data?.redirect_url) {
      // si algo falla, responde JSON (no 405)
      return NextResponse.json(
        { ok:false, env: USE_PROD ? "prod" : "sandbox", status: r.status, error: data },
        { status: r.status || 502 }
      );
    }
    // ✅ redirige al checkout
    return NextResponse.redirect(data.redirect_url, 302);
  }

  // ping credenciales
  const r = await fetch(`${DLOCAL_BASE}/v1/me`, {
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${API}:${SEC}`,
    },
  });
  const txt = await r.text(); let body; try { body = JSON.parse(txt); } catch { body = { raw: txt }; }
  return NextResponse.json({ ok: r.ok, env: USE_PROD ? "prod" : "sandbox", status: r.status, body }, { status: r.status || 200 });
}

/** POST /api/pay → crea el pago y devuelve JSON (lo sigue usando tu botón mejorado si lo tienes) */
export async function POST() {
  const r = await fetch(`${DLOCAL_BASE}/v1/payments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API}:${SEC}`,
    },
    body: JSON.stringify(buildPaymentData(appBase())),
  });

  const txt = await r.text(); let json; try { json = JSON.parse(txt); } catch { json = { raw: txt }; }
  if (!r.ok) {
    return NextResponse.json(
      { success:false, env: USE_PROD ? "prod" : "sandbox", upstream_status:r.status, upstream_error:json },
      { status: r.status || 502 }
    );
  }

  return NextResponse.json({
    success: true,
    env: USE_PROD ? "prod" : "sandbox",
    payment_link: json.redirect_url,
    payment_id: json.id,
    status: json.status,
    created_with_api: true,
  });
}
