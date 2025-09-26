export async function onRequest({ env, request }) {
  const origins = (env.ALLOWED_ORIGINS || 'https://clinxcode.com').split(',').map(s=>s.trim());
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
    client_id:     env.Ov23liie6U56gCNxlgjZ,
    client_secret: env.986fe05965c5b99c94a3c6d0b028b866d64a5ee1,
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

