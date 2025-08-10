/** @format */

// /api/football/route.js
import { dbConnect } from '@/lib/dbConnect';
import FootballPost from '@/models/footballPostSchema';

export async function GET() {
	try {
		await dbConnect();
		const footballPosts = await FootballPost.find({}).sort({ createdAt: -1 });
		return new Response(
			JSON.stringify({ success: true, data: footballPosts }),
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

export async function POST(request) {
	try {
		await dbConnect();
		const body = await request.json();
		const newFootballPost = await FootballPost.create(body);
		return new Response(
			JSON.stringify({ success: true, data: newFootballPost }),
			{
				status: 201,
				headers: { 'Content-Type': 'application/json' },
			}
		);
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
