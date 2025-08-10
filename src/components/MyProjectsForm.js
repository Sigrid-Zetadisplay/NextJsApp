/** @format */

'use client';
import { useState } from 'react';

export default function MyProjectsForm({ onSubmit, onCancel }) {
	const [form, setForm] = useState({
		title: '',
		category: '',
		description: '',
		technologies: '',
		github: '',
		demo: '',
		image: '',
		author: '',
		content: '',
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setForm((prev) => ({ ...prev, [name]: value }));
	};

	const handleImage = (e) => {
		const file = e.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setForm((prev) => ({ ...prev, image: reader.result }));
			};
			reader.readAsDataURL(file);
		}
	};

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				onSubmit(form);
			}}
			className="space-y-4 text-left">
			<div>
				<label className="block font-medium">Project Title</label>
				<input
					name="title"
					value={form.title}
					onChange={handleChange}
					className="w-full border rounded px-2 py-1"
					required
				/>
			</div>
			<div>
				<label className="block font-medium">Category</label>
				<input
					name="category"
					value={form.category}
					onChange={handleChange}
					className="w-full border rounded px-2 py-1"
					placeholder="e.g. Web App, API, Portfolio"
					required
				/>
			</div>
			<div>
				<label className="block font-medium">Short Description</label>
				<input
					name="description"
					value={form.description}
					onChange={handleChange}
					className="w-full border rounded px-2 py-1"
					required
				/>
			</div>
			<div>
				<label className="block font-medium">Technologies Used</label>
				<input
					name="technologies"
					value={form.technologies}
					onChange={handleChange}
					className="w-full border rounded px-2 py-1"
					placeholder="e.g. React, Node.js, MongoDB"
				/>
			</div>
			<div>
				<label className="block font-medium">GitHub Link</label>
				<input
					name="github"
					value={form.github}
					onChange={handleChange}
					className="w-full border rounded px-2 py-1"
					placeholder="https://github.com/your-repo"
					type="url"
				/>
			</div>
			<div>
				<label className="block font-medium">Live Demo Link</label>
				<input
					name="demo"
					value={form.demo}
					onChange={handleChange}
					className="w-full border rounded px-2 py-1"
					placeholder="https://your-demo.com"
					type="url"
				/>
			</div>
			<div>
				<label className="block font-medium">Project Image</label>
				<input
					name="image"
					type="file"
					accept="image/*"
					onChange={handleImage}
					className="w-full"
				/>
				{form.image && (
					<img
						src={form.image}
						alt="preview"
						className="mt-2 w-32 h-20 object-cover rounded"
					/>
				)}
			</div>
			<div>
				<label className="block font-medium">Author</label>
				<input
					name="author"
					value={form.author}
					onChange={handleChange}
					className="w-full border rounded px-2 py-1"
				/>
			</div>
			<div>
				<label className="block font-medium">
					Detailed Content / Documentation
				</label>
				<textarea
					name="content"
					value={form.content}
					onChange={handleChange}
					className="w-full border rounded px-2 py-1 min-h-[120px]"
				/>
			</div>
			<div className="flex gap-2 justify-end">
				<button
					type="button"
					onClick={onCancel}
					className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
					Cancel
				</button>
				<button
					type="submit"
					className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
					Save
				</button>
			</div>
		</form>
	);
}
