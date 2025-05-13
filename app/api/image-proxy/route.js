// app/api/image-proxy/route.js

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get('url');

  if (!url) {
    return new Response(JSON.stringify({ error: 'Missing image URL' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const imageResponse = await fetch(url);

    if (!imageResponse.ok) {
      return new Response(JSON.stringify({ error: 'Failed to fetch image' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const contentType = imageResponse.headers.get('content-type');
    const imageBuffer = await imageResponse.arrayBuffer();

    return new Response(imageBuffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=86400',
      },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Proxy error', details: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
