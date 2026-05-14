export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get('status');
  const key = searchParams.get('key');

  if (!process.env.UPDATE_KEY || key !== process.env.UPDATE_KEY) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!['wifi', 'data'].includes(status)) {
    return Response.json({ error: 'Invalid status. Use wifi or data.' }, { status: 400 });
  }

  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;

  if (!url || !token) {
    return Response.json({ error: 'Missing env vars', url: !!url, token: !!token }, { status: 500 });
  }

  const value = JSON.stringify({ status, updatedAt: new Date().toISOString() });

  try {
    const res = await fetch(`${url}/set/connectivity`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(value),
    });
    const result = await res.json();
    return Response.json({ ok: true, status, upstash: result });
  } catch (e) {
    return Response.json({ error: e.message }, { status: 500 });
  }
}
