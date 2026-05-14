import { kv } from '@vercel/kv';

export const dynamic = 'force-dynamic';

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

  try {
    const payload = { status, updatedAt: new Date().toISOString() };
    await kv.set('connectivity', payload);
    const readback = await kv.get('connectivity');
    return Response.json({ ok: true, status, wrote: payload, readback });
  } catch (e) {
    return Response.json({ error: e.message }, { status: 500 });
  }
}
