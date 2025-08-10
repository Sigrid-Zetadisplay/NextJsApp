/** @format */

// app/myProjects/page.js

'use client';

import { useSession } from 'next-auth/react';
import { useState } from 'react';
import useCrud from '@/hooks/useCrud';
import MyProjectsForm from '@/components/MyProjectsForm';

export default function MyProjectsPage() {
	const { data: session } = useSession();
	const [showForm, setShowForm] = useState(false);
	const { createItem } = useCrud('/api/myProjects');

	return (
		<div className="container mx-auto p-8">
			<div className="flex justify-between items-center mb-6">
				<h1 className="text-3xl font-bold">MyProjects</h1>
				{session?.user?.role === 'admin' && (
					<button
						onClick={() => setShowForm((prev) => !prev)}
						className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
						{showForm ? 'Cancel' : 'Add New Post'}
					</button>
				)}
			</div>
			{/* Admin-only add form placeholder */}
			{showForm && session?.user?.role === 'admin' && (
				<div className="p-6 bg-white border rounded shadow text-center">
					<MyProjectsForm
						onSubmit={async (form) => {
							await createItem(form);
							setShowForm(false);
						}}
						onCancel={() => setShowForm(false)}
					/>
				</div>
			)}
		</div>
	);
}
