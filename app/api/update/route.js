export const runtime = 'edge';

async function kvSet(key, value) {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  const res = await fetch(`${url}/set/${key}/${encodeURIComponent(JSON.stringify(value))}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
}

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

  await kvSet('connectivity', {
    status,
    updatedAt: new Date().toISOString(),
  });

  return Response.json({ ok: true, status });
}
