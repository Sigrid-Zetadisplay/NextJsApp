"use client";

import { useState } from "react";
import useCrud from "@/hooks/useCrud";
import BlogPostForm from "@/components/BlogPostForm";

export default function BlogPage() {
  const {
    items: blogPosts,
    createItem,
    editItem,
    deleteItem,
  } = useCrud("/api/blog");

  const [showForm, setShowForm] = useState(false);
  const [newPost, setNewPost] = useState({
    title: "",
    category: "",
    content: "",
    author: "",
  });

  const [editId, setEditId] = useState(null);
  const [editPost, setEditPost] = useState(null);

  const handleChange = (setter) => (e) => {
    const { name, value } = e.target;
    setter((prev) => ({ ...prev, [name]: value }));
  };

  const handleNewSubmit = async (e) => {
    e.preventDefault();
    await createItem(newPost);
    setNewPost({ title: "", category: "", content: "", author: "" });
    setShowForm(false);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    await editItem(editId, editPost);
    setEditId(null);
    setEditPost(null);
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
        <BlogPostForm
          mode="create"
          formData={newPost}
          onChange={handleChange(setNewPost)}
          onSubmit={handleNewSubmit}
        />
      )}

      {editPost && (
        <BlogPostForm
          mode="edit"
          formData={editPost}
          onChange={handleChange(setEditPost)}
          onSubmit={handleEditSubmit}
          onCancel={() => {
            setEditId(null);
            setEditPost(null);
          }}
        />
      )}

      <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-yellow-500 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">


      {blogPosts.length === 0 ? (
        <p>No posts yet.</p>
      ) : (
        
        blogPosts.map((blogPost) => (
          <div
            key={blogPost._id}
            className="flex flex-col rounded-lg bg-white shadow-sm border border-yellow-500 max-w-96 p-6"
            >
            <div className="flex items-center gap-x-4 text-xs">
              <p className="text-gray-500">
                {new Date(blogPost.createdAt).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
              <p className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100">
                {blogPost.category}
              </p>
            </div>
            <div className="group relative">
              <h3 className="mt-3 text-lg/6 font-semibold text-gray-900 group-hover:text-gray-600">
                <span className="absolute inset-0" />
                {blogPost.title}
              </h3>
              <p className="mt-5 line-clamp-3 text-sm/6 text-gray-600">
                {blogPost.content}
              </p>
            </div>
            <div className="relative mt-8 flex items-center gap-x-4">
              <div className="text-sm/6">
                <p className="font-semibold text-gray-900">
                  <span className="absolute inset-0" />
                  By {blogPost.author}
                </p>
              </div>
            </div>
            <div className="mt-2 flex space-x-2">
              <button
                onClick={() => {
                  setEditId(blogPost._id);
                  setEditPost(blogPost);
                }}
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                >
                Edit
              </button>
              <button
                onClick={() => deleteItem(blogPost._id)}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
      </div>
    </div>
  );
}
