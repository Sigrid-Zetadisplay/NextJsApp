// /api/wine/route.js
import { dbConnect } from '@/lib/dbConnect';
import Wine from '@/models/wineSchema';

export async function GET() {
  try {
    await dbConnect();
    const winePosts = await Wine.find({});
    return new Response(JSON.stringify({ success: true, data: winePosts }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function POST(request) {
  try {
    await dbConnect();
    const body = await request.json();
    const newWinePost = await Wine.create(body);
    return new Response(JSON.stringify({ success: true, data: newWinePost }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
