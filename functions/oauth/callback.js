export async function onRequest({ env, request }) {
  const origins = (env.ALLOWED_ORIGINS || 'https://clinxcode.com').split(',').map(s => s.trim());
  const origin  = request.headers.get('Origin') || origins[0];
  const allow   = origins.includes(origin) ? origin : origins[0];

  const code = new URL(request.url).searchParams.get('code');
  if (!code) {
    return new Response(JSON.stringify({ error: 'missing code' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': allow }
    });
  }

  const body = new URLSearchParams({
    client_id:     env.GITHUB_CLIENT_ID,
    client_secret: env.GITHUB_CLIENT_SECRET,
    code
  });

  const r = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: { 'Accept': 'application/json' },
    body
  });
  const data = await r.json();

  return new Response(JSON.stringify({ token: data.access_token, provider: 'github' }), {
    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': allow }
  });
}
