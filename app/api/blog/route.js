
import { dbConnect } from '@/lib/dbConnect';
import BlogPost from '@/models/blogPostSchema';

// GET: fetch all posts
export async function GET() {
  try {
    await dbConnect();
    const posts = await BlogPost.find({});
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

// POST: create a new post
export async function POST(request) {
  try {
    await dbConnect();
    const body = await request.json(); // parse the JSON body

    const newPost = await BlogPost.create(body);
    return new Response(JSON.stringify({ success: true, data: newPost }), {
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