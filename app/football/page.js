"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import useCrud from "@/hooks/useCrud";
import FootballPostForm from "@/components/FootballPostForm";
import Image from "next/image";

export default function FootballPage() {
  const { data: session } = useSession();
  const {
    items: footballPosts,
    createItem,
    editItem,
    deleteItem,
  } = useCrud("/api/football");

  const [showForm, setShowForm] = useState(false);
  const [newPost, setNewPost] = useState({
    title: "",
    category: "",
    content: "",
    author: "",
    image: "",
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
    setNewPost({ title: "", category: "", content: "", image: "", author: "" });
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
        <h1 className="text-3xl font-bold">Football Page</h1>
        {/* Only show Add New Post button if user is an admin */}
        {session?.user?.role === "admin" && (
          <button
            onClick={() => setShowForm((prev) => !prev)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            {showForm ? "Cancel" : "Add New Post"}
          </button>
        )}
      </div>

      {/* Admin-only form for creating new wine posts */}
      {showForm && session?.user?.role === "admin" && (
        <FootballPostForm
          mode="create"
          formData={newPost}
          onChange={handleChange(setNewPost)}
          onSubmit={handleNewSubmit}
        />
      )}

      {/* Admin-only form for editing existing wine posts */}
      {editPost && session?.user?.role === "admin" && (
        <FootballPostForm
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

      {footballPosts.length === 0 ? (
        <p>No posts yet.</p>
      ) : (
        footballPosts.map((footballPost) => (
          <div key={footballPost._id} className="border p-4 mb-4">
            <p className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100">
              {footballPost.category}
            </p>
            <h2 className="text-2xl font-semibold">{footballPost.title}</h2>
            <p>{footballPost.content}</p>
            {footballPost.image?.trim() ? (
              <Image
                src={`/api/image-proxy?url=${encodeURIComponent(
                  footballPost.image
                )}`}
                alt={footballPost.title}
                width={200}
                height={100}
                className="mt-4 object-cover rounded-md"
              />
            ) : null}
            <p className="text-sm mt-1">By {footballPost.author}</p>

            {/* Admin-only Edit/Delete actions */}
            {session?.user?.role === "admin" && (
              <div className="mt-2 flex space-x-2">
                <button
                  onClick={() => {
                    setEditId(footballPost._id);
                    setEditPost(footballPost);
                  }}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteItem(footballPost._id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}
