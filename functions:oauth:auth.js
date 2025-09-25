export async function onRequest({ env, request }) {
  const origins = (env.ALLOWED_ORIGINS || 'https://clinxcode.com').split(',').map(s=>s.trim());
  const origin = request.headers.get('Origin') || origins[0];
  const allow = origins.includes(origin) ? origin : origins[0];
  if (request.method === 'OPTIONS') {
    return new Response('', { headers: { 'Access-Control-Allow-Origin': allow, 'Access-Control-Allow-Headers': 'Content-Type, Authorization', 'Access-Control-Allow-Methods': 'GET,POST,OPTIONS' } });
  }
  const url = new URL('https://github.com/login/oauth/authorize');
  url.searchParams.set('client_id', env.Ov23liie6U56gCNxlgjZ);
  url.searchParams.set('scope', 'repo');
  return Response.redirect(url.toString(), 302);
}