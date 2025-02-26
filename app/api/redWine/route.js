
import { dbConnect } from '@/lib/dbConnect';
import RedWine from '@/models/redWineSchema';


export async function GET(req) {
  try {
    await dbConnect();
    // If connected, this query should succeed
    const posts = await RedWine.find({}); 
    return new Response(JSON.stringify({ success: true, data: posts }), {
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