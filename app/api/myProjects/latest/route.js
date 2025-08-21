/** @format */

import { dbConnect } from '@/lib/dbConnect';
import MyProjects from '@/models/myProjects';

export async function GET() {
	try {
		await dbConnect();
		const latestPost = await MyProjects.findOne({}).sort({ createdAt: -1 });

		if (!latestPost) {
			return new Response(
				JSON.stringify({ success: false, error: 'No MyProjects post found' }),
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
