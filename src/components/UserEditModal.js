/** @format */

'use client';
import React, { useState } from 'react';
import Image from 'next/image';

export default function UserEditModal({ user, isOpen, onClose, onSave }) {
	const [form, setForm] = useState({
		firstName: user?.firstName || '',
		lastName: user?.lastName || '',
		email: user?.email || '',
		role: user?.role || 'user',
		password: '',
		avatar: user?.avatar || '',
	});

	// Update form state on prop change
	React.useEffect(() => {
		setForm({
			firstName: user?.firstName || '',
			lastName: user?.lastName || '',
			email: user?.email || '',
			role: user?.role || 'user',
			password: '',
			avatar: user?.avatar || '',
		});
	}, [user]);

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
			<div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
				<h2 className="text-xl font-bold mb-4">Edit User</h2>
				<form
					onSubmit={(e) => {
						e.preventDefault();
						onSave(form);
					}}
					className="space-y-4">
					<div className="flex flex-col items-center gap-2">
						<label className="block text-sm font-medium">Avatar</label>
						{form.avatar && (
							<Image
								src={form.avatar}
								alt="avatar preview"
								width={64}
								height={64}
								className="w-16 h-16 rounded-full object-cover border"
							/>
						)}
						<input
							type="file"
							accept="image/*"
							className="mt-1"
							onChange={(e) => {
								const file = e.target.files[0];
								if (file) {
									const reader = new FileReader();
									reader.onloadend = () => {
										setForm((f) => ({ ...f, avatar: reader.result }));
									};
									reader.readAsDataURL(file);
								}
							}}
						/>
					</div>
					<div>
						<label className="block text-sm font-medium">First Name</label>
						<input
							className="w-full border rounded px-2 py-1"
							value={form.firstName}
							onChange={(e) =>
								setForm((f) => ({ ...f, firstName: e.target.value }))
							}
							required
						/>
					</div>
					<div>
						<label className="block text-sm font-medium">Last Name</label>
						<input
							className="w-full border rounded px-2 py-1"
							value={form.lastName}
							onChange={(e) =>
								setForm((f) => ({ ...f, lastName: e.target.value }))
							}
							required
						/>
					</div>
					<div>
						<label className="block text-sm font-medium">Email</label>
						<input
							className="w-full border rounded px-2 py-1"
							value={form.email}
							onChange={(e) =>
								setForm((f) => ({ ...f, email: e.target.value }))
							}
							required
							type="email"
						/>
					</div>
					<div>
						<label className="block text-sm font-medium">Role</label>
						<select
							className="w-full border rounded px-2 py-1"
							value={form.role}
							onChange={(e) =>
								setForm((f) => ({ ...f, role: e.target.value }))
							}>
							<option value="user">User</option>
							<option value="admin">Admin</option>
						</select>
					</div>
					<div>
						<label className="block text-sm font-medium">
							Password{' '}
							<span className="text-xs text-gray-500">
								(leave blank to keep unchanged)
							</span>
						</label>
						<input
							className="w-full border rounded px-2 py-1"
							value={form.password}
							onChange={(e) =>
								setForm((f) => ({ ...f, password: e.target.value }))
							}
							type="password"
							autoComplete="new-password"
							placeholder="New password"
						/>
					</div>
					<div className="flex justify-end gap-2 mt-4">
						<button
							type="button"
							className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
							onClick={onClose}>
							Cancel
						</button>
						<button
							type="submit"
							className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
							Save
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
