// app/api/blog/[id]/route.js
import { dbConnect } from '@/lib/dbConnect';
import BlogPost from '@/models/blogPostSchema';

// PUT: edit an existing post
export async function PUT(request, { params }) {
  try {
    await dbConnect();
    const body = await request.json();
    const { id } = params;

    const updatedPost = await BlogPost.findByIdAndUpdate(id, body, {
      new: true, // return the updated doc
      runValidators: true,
    });

    if (!updatedPost) {
      return new Response(JSON.stringify({ success: false, error: 'Post not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ success: true, data: updatedPost }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

// DELETE: remove a post
export async function DELETE(request, { params }) {
    try {
      await dbConnect();
      const { id } = params;
  
      // Proceed with your database operation
      const deletedPost = await BlogPost.findByIdAndDelete(id);
      if (!deletedPost) {
        return new Response(JSON.stringify({ success: false, error: 'Not found' }), {
          status: 404,
          headers: { 'Content-Type': 'application/json' },
        });
      }
  
      return new Response(JSON.stringify({ success: true, data: deletedPost }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (error) {
      return new Response(JSON.stringify({ success: false, error: error.message }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  }
