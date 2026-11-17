import { NextResponse } from 'next/server'
import { createOrder, listOrders, updateOrderStatus } from '@/lib/store'
import { getDish } from '@/lib/dishes'

export const dynamic = 'force-dynamic'

// 允许跨域下单的站点：主站 + 精修预览站
// 浏览器跨域 POST 前先发 OPTIONS 预检，返回的 Allow-Origin 必须和请求来源一致，否则下单会被浏览器拦掉
const ALLOWED_ORIGINS = [
  'https://long-can-guan-cloudflare.netlify.app',
  'https://long-can-guan-polish-preview.netlify.app',
]

function corsHeaders(origin) {
  return {
    'Access-Control-Allow-Origin': ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0],
    'Access-Control-Allow-Methods': 'GET, POST, PATCH, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  }
}

function corsJson(req, data, init = {}) {
  return NextResponse.json(data, {
    ...init,
    headers: { ...corsHeaders(req.headers.get('origin')), ...(init.headers || {}) },
  })
}

// OPTIONS /api/orders — 跨域预检
// Netlify 站跨域调用本接口时，浏览器先发 OPTIONS 预检
export async function OPTIONS(req) {
  return new NextResponse(null, { status: 200, headers: corsHeaders(req.headers.get('origin')) })
}

// GET /api/orders — 后厨查单
export async function GET(req) {
  const orders = await listOrders(50)
  return corsJson(req, { ok: true, orders })
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
      return corsJson(req, { ok: false, error: 'empty order' }, { status: 400 })
    }
    const order = await createOrder({ items, remark: String(body.remark || '').slice(0, 200) })
    return corsJson(req, { ok: true, order })
  } catch (e) {
    return corsJson(req, { ok: false, error: String(e?.message || e) }, { status: 500 })
  }
}

// PATCH /api/orders — 后厨改状态
// body: { id, status: 'cooking' | 'done' }
export async function PATCH(req) {
  try {
    const body = await req.json()
    const status = body.status
    if (!['cooking', 'done'].includes(status)) {
      return corsJson(req, { ok: false, error: 'bad status' }, { status: 400 })
    }
    const order = await updateOrderStatus(body.id, status)
    if (!order) return corsJson(req, { ok: false, error: 'not found' }, { status: 404 })
    return corsJson(req, { ok: true, order })
  } catch (e) {
    return corsJson(req, { ok: false, error: String(e?.message || e) }, { status: 500 })
  }
}
