/** @format */

import { dbConnect } from '@/lib/dbConnect';
import MyProjects from '@/models/myProjects';

export async function GET() {
	try {
		await dbConnect();
		const myProjectsPosts = await MyProjects.find({}).sort({ createdAt: -1 });
		return new Response(
			JSON.stringify({ success: true, data: myProjectsPosts }),
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
