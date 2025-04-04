"use client";

import { useState } from "react";
import useCrud from "@/hooks/useCrud";
import WineForm from "@/components/WineForm";

export default function WinePage() {
  const { items: wines, createItem, editItem, deleteItem } = useCrud("/api/wine");

  const [showForm, setShowForm] = useState(false);
  const [newPost, setNewPost] = useState({ title: "", category: "", content: "", author: "" });

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
        <h1 className="text-3xl font-bold">Wine Page</h1>
        <button
          onClick={() => setShowForm((prev) => !prev)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          {showForm ? "Cancel" : "Add New Post"}
        </button>
      </div>

      {showForm && (
        <WineForm
          mode="create"
          formData={newPost}
          onChange={handleChange(setNewPost)}
          onSubmit={handleNewSubmit}
        />
      )}

      {editPost && (
        <WineForm
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

      {wines.length === 0 ? (
        <p>No posts yet.</p>
      ) : (
        wines.map((wine) => (
          <div key={wine._id} className="border p-4 mb-4">
            <h2 className="text-2xl font-semibold">{wine.title}</h2>
            <p className="italic text-sm">Category: {wine.category}</p>
            <p>{wine.content}</p>
            <p className="text-sm mt-1">By {wine.author}</p>
            <div className="mt-2 flex space-x-2">
              <button
                onClick={() => {
                  setEditId(wine._id);
                  setEditPost(wine);
                }}
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => deleteItem(wine._id)}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
