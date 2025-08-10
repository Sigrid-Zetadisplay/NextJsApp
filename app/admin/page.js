/** @format */

'use client';

import { useState } from 'react';
import useCrud from '@/hooks/useCrud';
import UserEditModal from '@/components/UserEditModal';
import Image from 'next/image';

export default function AdminDashboard() {
	const { items: users, error, editItem, deleteItem } = useCrud('/api/admin');
	const [selectedUser, setSelectedUser] = useState(null);
	const [modalOpen, setModalOpen] = useState(false);

	const handleEdit = (user) => {
		setSelectedUser(user);
		setModalOpen(true);
	};

	const handleDelete = (id) => {
		if (window.confirm('Are you sure you want to delete this user?')) {
			deleteItem(id);
		}
	};

	const handleSave = (form) => {
		editItem(selectedUser._id, form);
		setModalOpen(false);
	};

	const handleToggleAdmin = (user) => {
		editItem(user._id, {
			...user,
			role: user.role === 'admin' ? 'user' : 'admin',
		});
	};

	return (
		<div className="max-w-5xl mx-auto py-10">
			<h1 className="text-3xl font-bold mb-6">Admin User Management</h1>
			{error && <div className="text-red-600 mb-4">{error}</div>}
			<div className="overflow-x-auto">
				<table className="min-w-full bg-white border rounded shadow">
					<thead>
						<tr className="bg-gray-100 text-left">
							<th className="py-2 px-4 border-b text-left">Avatar</th>
							<th className="py-2 px-4 border-b text-left">First Name</th>
							<th className="py-2 px-4 border-b text-left">Last Name</th>
							<th className="py-2 px-4 border-b text-left">Email</th>
							<th className="py-2 px-4 border-b text-left">Role</th>
							<th className="py-2 px-4 border-b text-left">Actions</th>
						</tr>
					</thead>
					<tbody>
						{users && users.length > 0 ? (
							users.map((user) => (
								<tr
									key={user._id}
									className="hover:bg-gray-50">
									<td className="py-2 px-4 border-b text-left">
										{user.avatar ? (
											<Image
												src={user.avatar}
												alt="avatar"
												width={40}
												height={40}
												className="rounded-full object-cover border"
											/>
										) : (
											<div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-400">
												?
											</div>
										)}
									</td>
									<td className="py-2 px-4 border-b text-left">
										{user.firstName}
									</td>
									<td className="py-2 px-4 border-b text-left">
										{user.lastName}
									</td>
									<td className="py-2 px-4 border-b text-left">{user.email}</td>
									<td className="py-2 px-4 border-b text-left capitalize">
										{user.role}
									</td>
									<td className="py-2 px-4 border-b text-left flex gap-2">
										<button
											className={`px-2 py-1 rounded text-xs ${
												user.role === 'admin'
													? 'bg-green-600 text-white'
													: 'bg-gray-300 text-gray-700'
											}`}
											onClick={() => handleToggleAdmin(user)}>
											{user.role === 'admin' ? 'Revoke Admin' : 'Make Admin'}
										</button>
										<button
											className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
											onClick={() => handleEdit(user)}>
											Edit
										</button>
										<button
											className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
											onClick={() => handleDelete(user._id)}>
											Delete
										</button>
									</td>
								</tr>
							))
						) : (
							<tr>
								<td
									colSpan="6"
									className="text-center py-6 text-gray-500">
									No users found.
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
			<UserEditModal
				user={selectedUser}
				isOpen={modalOpen}
				onClose={() => setModalOpen(false)}
				onSave={handleSave}
			/>
		</div>
	);
}
