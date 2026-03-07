const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions';
const MODEL = 'openrouter/free';

function corsHeaders(origin) {
  return {
    'Access-Control-Allow-Origin': origin || '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
  };
}

export default {
  async fetch(request, env, ctx) {
    const origin = request.headers.get('Origin') || '*';

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders(origin) });
    }

    if (request.method !== 'POST') {
      return new Response(JSON.stringify({ error: { message: 'Method not allowed' } }), {
        status: 405,
        headers: { 'Content-Type': 'application/json', ...corsHeaders(origin) },
      });
    }

    const key = env.OPENROUTER_API_KEY;
    if (!key) {
      return new Response(
        JSON.stringify({ error: { message: 'OPENROUTER_API_KEY not set. Run: npx wrangler secret put OPENROUTER_API_KEY' } }),
        { status: 500, headers: { 'Content-Type': 'application/json', ...corsHeaders(origin) } }
      );
    }

    let body;
    try {
      body = await request.json();
    } catch (e) {
      return new Response(
        JSON.stringify({ error: { message: 'Invalid JSON body' } }),
        { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders(origin) } }
      );
    }

    const res = await fetch(OPENROUTER_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + key,
        'HTTP-Referer': request.headers.get('Origin') || 'https://unlockgames.org',
      },
      body: JSON.stringify({
        model: body.model || MODEL,
        messages: body.messages || [],
      }),
    });

    const data = await res.json();
    return new Response(JSON.stringify(data), {
      status: res.status,
      headers: { 'Content-Type': 'application/json', ...corsHeaders(origin) },
    });
  },
};
