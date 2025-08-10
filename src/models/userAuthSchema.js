/** @format */

import mongoose from 'mongoose';

const userAuthSchema = new mongoose.Schema({
	firstName: {
		type: String,
		required: true,
	},
	lastName: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	avatar: {
		type: String, // URL or base64 string
		default: '',
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
	role: { type: String, default: 'user', enum: ['user', 'admin'] },
});

export default mongoose.models.UserAuth ||
	mongoose.model('UserAuth', userAuthSchema);
