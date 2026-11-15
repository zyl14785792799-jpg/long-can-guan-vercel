import { NextResponse } from 'next/server'
import { createOrder, listOrders, updateOrderStatus } from '@/lib/store'
import { getDish } from '@/lib/dishes'

export const dynamic = 'force-dynamic'

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': 'https://long-can-guan-cloudflare.netlify.app',
  'Access-Control-Allow-Methods': 'GET, POST, PATCH, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
}

function corsJson(data, init = {}) {
  return NextResponse.json(data, {
    ...init,
    headers: { ...CORS_HEADERS, ...(init.headers || {}) },
  })
}

// OPTIONS /api/orders — 跨域预检
// Netlify 站 https://long-can-guan-cloudflare.netlify.app 跨域调用本接口时，浏览器先发 OPTIONS 预检
 export async function OPTIONS() {
  return new NextResponse(null, { status: 200, headers: CORS_HEADERS })
}

// GET /api/orders — 后厨查单
export async function GET() {
  const orders = await listOrders(50)
  return corsJson({ ok: true, orders })
}

// POST /api/orders — 顾客下单
// body: { items: [{ id, qty }], remark: string }
export async function POST(req) {
  try {
    const body = await req.json()
    const rawItems = Array.isArray(body.items) ? body.items : []
    const items = rawItems
      .map(it => {
        const dish = getDish(Number(it.id))
        if (!dish) return null
        const qty = Math.max(1, Math.min(99, Number(it.qty) || 1))
        return { id: dish.id, name: dish.name, qty }
      })
      .filter(Boolean)
    if (items.length === 0) {
      return corsJson({ ok: false, error: 'empty order' }, { status: 400 })
    }
    const order = await createOrder({ items, remark: String(body.remark || '').slice(0, 200) })
    return corsJson({ ok: true, order })
  } catch (e) {
    return corsJson({ ok: false, error: String(e?.message || e) }, { status: 500 })
  }
}

// PATCH /api/orders — 后厨改状态
// body: { id, status: 'cooking' | 'done' }
export async function PATCH(req) {
  try {
    const body = await req.json()
    const status = body.status
    if (!['cooking', 'done'].includes(status)) {
      return corsJson({ ok: false, error: 'bad status' }, { status: 400 })
    }
    const order = await updateOrderStatus(body.id, status)
    if (!order) return corsJson({ ok: false, error: 'not found' }, { status: 404 })
    return corsJson({ ok: true, order })
  } catch (e) {
    return corsJson({ ok: false, error: String(e?.message || e) }, { status: 500 })
  }
}
