/** @format */

// app/api/admin/[id]/route.js

import { dbConnect } from '@/lib/dbConnect';
import UserAuth from '@/models/userAuthSchema';
import { hashPassword } from '@/lib/hashPassword';

// Get user by id
export async function GET(_, { params }) {
	try {
		await dbConnect();
		const user = await UserAuth.findById(params.id).select('-password');
		if (!user) {
			return new Response(
				JSON.stringify({ success: false, error: 'User not found' }),
				{
					status: 404,
					headers: { 'Content-Type': 'application/json' },
				}
			);
		}
		return new Response(JSON.stringify({ success: true, data: user }), {
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

// Update user by id
export async function PUT(request, { params }) {
	try {
		await dbConnect();
		const body = await request.json();
		// If password is provided and not blank, hash it
		if (body.password && body.password.trim() !== '') {
			body.password = await hashPassword(body.password);
		} else {
			delete body.password;
		}
		// Only update avatar if a non-empty value is provided
		if (typeof body.avatar !== 'undefined' && body.avatar === '') {
			// If avatar is explicitly set to empty string, allow removal
		} else if (!body.avatar) {
			// If avatar is missing or falsy (but not empty string), do not update
			delete body.avatar;
		}
		const updatedUser = await UserAuth.findByIdAndUpdate(params.id, body, {
			new: true,
			runValidators: true,
			select: '-password',
		});
		if (!updatedUser) {
			return new Response(
				JSON.stringify({ success: false, error: 'User not found' }),
				{
					status: 404,
					headers: { 'Content-Type': 'application/json' },
				}
			);
		}
		return new Response(JSON.stringify({ success: true, data: updatedUser }), {
			status: 200,
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

// Delete user by id
export async function DELETE(_, { params }) {
	try {
		await dbConnect();
		const deletedUser = await UserAuth.findByIdAndDelete(params.id);
		if (!deletedUser) {
			return new Response(
				JSON.stringify({ success: false, error: 'User not found' }),
				{
					status: 404,
					headers: { 'Content-Type': 'application/json' },
				}
			);
		}
		return new Response(JSON.stringify({ success: true, data: {} }), {
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
