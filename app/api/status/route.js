import { kv } from '@vercel/kv';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const data = await kv.get('connectivity');
    return Response.json(data || { status: 'unknown', updatedAt: null }, {
      headers: { 'Cache-Control': 'no-store, max-age=0' },
    });
  } catch (e) {
    return Response.json({ status: 'unknown', updatedAt: null, error: e.message });
  }
}
