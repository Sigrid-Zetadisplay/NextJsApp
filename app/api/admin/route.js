// /api/admin/route.js
import { dbConnect } from '@/lib/dbConnect';
import UserAuth from '@/models/userAuthSchema';

export async function GET() {
  try {
    await dbConnect();
    const userAuth = await UserAuth.find({});
    return new Response(JSON.stringify({ success: true, data: userAuth }), {
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
    const newUserauth = await UserAuth.create(body);
    return new Response(JSON.stringify({ success: true, data: newUserauth }), {
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
