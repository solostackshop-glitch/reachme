export async function GET() {
  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;

  if (!url || !token) {
    return Response.json({ status: 'unknown', updatedAt: null, error: 'Missing env vars' });
  }

  try {
    const res = await fetch(`${url}/get/connectivity`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: 'no-store',
    });
    const data = await res.json();
    if (data.result) {
      const parsed = typeof data.result === 'string' ? JSON.parse(data.result) : data.result;
      return Response.json(parsed, { headers: { 'Cache-Control': 'no-store' } });
    }
    return Response.json({ status: 'unknown', updatedAt: null }, { headers: { 'Cache-Control': 'no-store' } });
  } catch (e) {
    return Response.json({ status: 'unknown', updatedAt: null, error: e.message });
  }
}
