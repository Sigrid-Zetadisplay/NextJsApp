/** @format */

// /api/blog/route.js
import { dbConnect } from '@/lib/dbConnect';
import BlogPost from '@/models/blogPostSchema';

export async function GET() {
	try {
		await dbConnect();
		const blogPosts = await BlogPost.find({}).sort({ createdAt: -1 });
		return new Response(JSON.stringify({ success: true, data: blogPosts }), {
			status: 200,
			headers: { 'Content-Type': 'application/json' },
		});
	} catch (error) {
		return new Response(
			JSON.stringify({ success: false, error: error.message }),
			{
				status: 500,
				headers: { 'Content-Type': 'application/json' },
			}
		);
	}
}

export async function POST(request) {
	try {
		await dbConnect();
		const body = await request.json();
		const newBlogPost = await BlogPost.create(body);
		return new Response(JSON.stringify({ success: true, data: newBlogPost }), {
			status: 201,
			headers: { 'Content-Type': 'application/json' },
		});
	} catch (error) {
		return new Response(
			JSON.stringify({ success: false, error: error.message }),
			{
				status: 400,
				headers: { 'Content-Type': 'application/json' },
			}
		);
	}
}
