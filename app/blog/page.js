"use client"; // Must be first line to use state, useEffect, etc.

import { useEffect, useState } from "react";

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [showForm, setShowForm] = useState(false); // Toggle for "Add New" form
  const [newPost, setNewPost] = useState({
    title: "",
    category: "",
    content: "",
    author: "",
  });

  const [editId, setEditId] = useState(null); // Track which post is being edited
  const [editPost, setEditPost] = useState({}); // Local state for editing a post

  // Fetch all posts
  const fetchPosts = () => {
    fetch("/api/blog")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setPosts(data.data);
        } else {
          console.error("Error fetching posts:", data.error);
        }
      })
      .catch((err) => console.error("Fetch error:", err));
  };

  // Load posts on mount
  useEffect(() => {
    fetchPosts();
  }, []);

  // Handle form input for creating a new post
  const handleNewPostChange = (e) => {
    const { name, value } = e.target;
    setNewPost((prev) => ({ ...prev, [name]: value }));
  };

  // Submit new post
  const handleNewPostSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPost),
      });
      const data = await res.json();
      if (data.success) {
        // Re-fetch or update local state
        setNewPost({ title: "", category: "", content: "", author: "" });
        setShowForm(false);
        fetchPosts();
      } else {
        console.error("Error creating post:", data.error);
      }
    } catch (error) {
      console.error("Request error:", error);
    }
  };

  // Handle Edit button
  const startEditing = (post) => {
    setEditId(post._id);
    setEditPost(post);
  };

  // Handle edit form change
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditPost((prev) => ({ ...prev, [name]: value }));
  };

  // Submit edit
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/blog/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editPost),
      });
      const data = await res.json();
      if (data.success) {
        setEditId(null);
        fetchPosts(); // refresh data
      } else {
        console.error("Error editing post:", data.error);
      }
    } catch (error) {
      console.error("Request error:", error);
    }
  };

  // Delete a post
  const deletePost = async (id) => {
    try {
      const res = await fetch(`/api/blog/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        fetchPosts();
      } else {
        console.error("Error deleting post:", data.error);
      }
    } catch (error) {
      console.error("Delete error:", error);
    }
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

      {/* Form to add new post */}
      {showForm && (
        <form className="mb-6 border p-4" onSubmit={handleNewPostSubmit}>
          <h2 className="text-xl font-semibold mb-2">Create a New Post</h2>
          <div className="mb-2">
            <label className="block mb-1">Title</label>
            <input
              name="title"
              value={newPost.title}
              onChange={handleNewPostChange}
              className="border w-full p-1"
              required
            />
          </div>
          <div className="mb-2">
            <label className="block mb-1">Category</label>
            <input
              name="category"
              value={newPost.category}
              onChange={handleNewPostChange}
              className="border w-full p-1"
              required
            />
          </div>
          <div className="mb-2">
            <label className="block mb-1">Content</label>
            <textarea
              name="content"
              value={newPost.content}
              onChange={handleNewPostChange}
              className="border w-full p-1"
              required
            />
          </div>
          <div className="mb-2">
            <label className="block mb-1">Author</label>
            <input
              name="author"
              value={newPost.author}
              onChange={handleNewPostChange}
              className="border w-full p-1"
              required
            />
          </div>
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
            {/* If we're editing this post, show edit form */}
            {editId === post._id ? (
              <form onSubmit={handleEditSubmit}>
                <div className="mb-2">
                  <label className="block mb-1">Title</label>
                  <input
                    name="title"
                    value={editPost.title}
                    onChange={handleEditChange}
                    className="border w-full p-1"
                    required
                  />
                </div>
                <div className="mb-2">
                  <label className="block mb-1">Category</label>
                  <input
                    name="category"
                    value={editPost.category}
                    onChange={handleEditChange}
                    className="border w-full p-1"
                    required
                  />
                </div>
                <div className="mb-2">
                  <label className="block mb-1">Content</label>
                  <textarea
                    name="content"
                    value={editPost.content}
                    onChange={handleEditChange}
                    className="border w-full p-1"
                    required
                  />
                </div>
                <div className="mb-2">
                  <label className="block mb-1">Author</label>
                  <input
                    name="author"
                    value={editPost.author}
                    onChange={handleEditChange}
                    className="border w-full p-1"
                    required
                  />
                </div>
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
                <h2 className="text-2xl font-semibold">{post.title}</h2>
                <p className="italic text-sm">Category: {post.category}</p>
                <p>{post.content}</p>
                <p className="text-sm mt-1">By {post.author}</p>
                <div className="mt-2 flex space-x-2">
                  <button
                    onClick={() => startEditing(post)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deletePost(post._id)}
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
