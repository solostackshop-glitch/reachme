import { kv } from '@vercel/kv';

export const runtime = 'edge';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get('status');
  const key = searchParams.get('key');

  // Check secret key
  if (!process.env.UPDATE_KEY || key !== process.env.UPDATE_KEY) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Validate status value
  if (!['wifi', 'data'].includes(status)) {
    return Response.json({ error: 'Invalid status. Use wifi or data.' }, { status: 400 });
  }

  await kv.set('connectivity', {
    status,
    updatedAt: new Date().toISOString(),
  });

  return Response.json({ ok: true, status });
}
