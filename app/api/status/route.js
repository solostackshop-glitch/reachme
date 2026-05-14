import { Redis } from '@upstash/redis';

export async function GET() {
  try {
    const redis = new Redis({
      url: process.env.KV_REST_API_URL,
      token: process.env.KV_REST_API_TOKEN,
    });

    const data = await redis.get('connectivity');
    return Response.json(data || { status: 'unknown', updatedAt: null }, {
      headers: { 'Cache-Control': 'no-store' },
    });
  } catch (e) {
    return Response.json({ status: 'unknown', updatedAt: null, error: e.message });
  }
}
