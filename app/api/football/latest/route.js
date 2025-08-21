/** @format */

// /app/api/blog/latest/route.js
import { dbConnect } from '@/lib/dbConnect';
import FootballPost from '@/models/footballPostSchema';

export async function GET() {
	try {
		await dbConnect();
		const latestPost = await FootballPost.findOne({}).sort({ createdAt: -1 });

		if (!latestPost) {
			return new Response(
				JSON.stringify({ success: false, error: 'No blog post found' }),
				{
					status: 404,
					headers: { 'Content-Type': 'application/json' },
				}
			);
		}

		return new Response(
			JSON.stringify({
				   title: latestPost.title,
				   summary: latestPost.summary || latestPost.content?.slice(0, 120),
				   slug: latestPost.slug || latestPost._id,
				   image: latestPost.image || '',
				   createdAt: latestPost.createdAt,
			}),
			{
				status: 200,
				headers: { 'Content-Type': 'application/json' },
			}
		);
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
