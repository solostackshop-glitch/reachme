import { kv } from '@vercel/kv';

export const runtime = 'edge';

export async function GET() {
  try {
    const data = await kv.get('connectivity');
    return Response.json(data || { status: 'unknown', updatedAt: null });
  } catch (e) {
    return Response.json({ status: 'unknown', updatedAt: null });
  }
}
