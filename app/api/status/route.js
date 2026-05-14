export const runtime = 'edge';

async function kvGet(key) {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  const res = await fetch(`${url}/get/${key}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await res.json();
  return data.result ? JSON.parse(data.result) : null;
}

export async function GET() {
  try {
    const data = await kvGet('connectivity');
    return Response.json(data || { status: 'unknown', updatedAt: null });
  } catch (e) {
    return Response.json({ status: 'unknown', updatedAt: null });
  }
}
