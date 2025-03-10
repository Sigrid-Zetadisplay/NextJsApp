"use client";

import { useState } from "react";
import useCrud from "@/hooks/useCrud";

export default function BlogPage() {
  // CRUD logic from the hook
  const { items: posts, createItem, editItem, deleteItem } = useCrud("/api/blog");

  // Add new post form
  const [showForm, setShowForm] = useState(false);
  const [newPost, setNewPost] = useState({ title: "", category: "", content: "", author: "" });

  const handleNewPostChange = (e) => {
    const { name, value } = e.target;
    setNewPost((prev) => ({ ...prev, [name]: value }));
  };

  const handleNewPostSubmit = async (e) => {
    e.preventDefault();
    await createItem(newPost);
    setShowForm(false);
    setNewPost({ title: "", category: "", content: "", author: "" });
  };

  // Editing state
  const [editId, setEditId] = useState(null);
  const [editPost, setEditPost] = useState({});

  const startEditing = (post) => {
    setEditId(post._id);
    setEditPost(post);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditPost((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    await editItem(editId, editPost);
    setEditId(null);
    setEditPost({});
  };

  const handleDelete = async (id) => {
    await deleteItem(id);
  };

  return (
    <div className="container mx-auto p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Blog Page</h1>
        <button
          onClick={() => setShowForm((prev) => !prev)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          {showForm ? "Cancel" : "Add New Post"}
        </button>
      </div>

      {showForm && (
        <form className="mb-6 border p-4" onSubmit={handleNewPostSubmit}>
          <h2 className="text-xl font-semibold mb-2">Create a New Post</h2>
          {/* Title */}
          <label className="block mb-1">Title</label>
          <input
            name="title"
            value={newPost.title}
            onChange={handleNewPostChange}
            className="border w-full p-1 mb-2"
            required
          />

          {/* Category */}
          <label className="block mb-1">Category</label>
          <input
            name="category"
            value={newPost.category}
            onChange={handleNewPostChange}
            className="border w-full p-1 mb-2"
            required
          />

          {/* Content */}
          <label className="block mb-1">Content</label>
          <textarea
            name="content"
            value={newPost.content}
            onChange={handleNewPostChange}
            className="border w-full p-1 mb-2"
            required
          />

          {/* Author */}
          <label className="block mb-1">Author</label>
          <input
            name="author"
            value={newPost.author}
            onChange={handleNewPostChange}
            className="border w-full p-1 mb-2"
            required
          />

          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
          >
            Create Post
          </button>
        </form>
      )}

      {posts.length === 0 ? (
        <p>No posts yet.</p>
      ) : (
        posts.map((post) => (
          <div key={post._id} className="border p-4 mb-4">
            {/* Edit Mode */}
            {editId === post._id ? (
              <form onSubmit={handleEditSubmit}>
                <label className="block mb-1">Title</label>
                <input
                  name="title"
                  value={editPost.title}
                  onChange={handleEditChange}
                  className="border w-full p-1 mb-2"
                  required
                />

                <label className="block mb-1">Category</label>
                <input
                  name="category"
                  value={editPost.category}
                  onChange={handleEditChange}
                  className="border w-full p-1 mb-2"
                  required
                />

                <label className="block mb-1">Content</label>
                <textarea
                  name="content"
                  value={editPost.content}
                  onChange={handleEditChange}
                  className="border w-full p-1 mb-2"
                  required
                />

                <label className="block mb-1">Author</label>
                <input
                  name="author"
                  value={editPost.author}
                  onChange={handleEditChange}
                  className="border w-full p-1 mb-2"
                  required
                />

                <button
                  type="submit"
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditId(null)}
                  className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded ml-2"
                >
                  Cancel
                </button>
              </form>
            ) : (
              <>
                {/* Display Mode */}
                <h2 className="text-2xl font-semibold">{post.title}</h2>
                <p className="italic text-sm">Category: {post.category}</p>
                <p>{post.content}</p>
                <p className="text-sm mt-1">By {post.author}</p>
                <div className="mt-2 flex space-x-2">
                  <button
                    onClick={() => {
                      setEditId(post._id);
                      setEditPost(post);
                    }}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(post._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))
      )}
    </div>
  );
}
