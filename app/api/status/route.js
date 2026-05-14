export const runtime = 'edge';

async function kvGet(key) {
  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(['GET', key]),
  });
  const data = await res.json();
  if (data.result) {
    return typeof data.result === 'string' ? JSON.parse(data.result) : data.result;
  }
  return null;
}

export async function GET() {
  try {
    const data = await kvGet('connectivity');
    return Response.json(data || { status: 'unknown', updatedAt: null });
  } catch (e) {
    return Response.json({ status: 'unknown', updatedAt: null, error: e.message });
  }
}
