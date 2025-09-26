export async function onRequest({ env, request }) {
  const origins = (env.ALLOWED_ORIGINS || 'https://clinxcode.com').split(',').map(s=>s.trim());
  const origin  = request.headers.get('Origin') || origins[0];
  const allow   = origins.includes(origin) ? origin : origins[0];

  if (request.method === 'OPTIONS') {
    return new Response('', {
      headers: {
        'Access-Control-Allow-Origin':  allow,
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Allow-Methods': 'GET,POST,OPTIONS'
      }
    });
  }

  const u = new URL('https://github.com/login/oauth/authorize');
  u.searchParams.set('client_id', env.GITHUB_CLIENT_ID);
  u.searchParams.set('scope', 'repo');
  return Response.redirect(u.toString(), 302);
}
