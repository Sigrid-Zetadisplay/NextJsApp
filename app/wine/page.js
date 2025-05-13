/** @format */

"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import useCrud from "@/hooks/useCrud";
import WineForm from "@/components/WineForm";
import Image from "next/image";

export default function WinePage() {
  const { data: session } = useSession();
  const {
    items: wines,
    createItem,
    editItem,
    deleteItem,
  } = useCrud("/api/wine");

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
        <h1 className="text-3xl font-bold">Wine Page</h1>
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
        <WineForm
          mode="create"
          formData={newPost}
          onChange={handleChange(setNewPost)}
          onSubmit={handleNewSubmit}
        />
      )}

      {/* Admin-only form for editing existing wine posts */}
      {editPost && session?.user?.role === "admin" && (
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
        // Grid container for wine cards
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3 mt-8">
          {wines.map((wine) => (
            <div
              key={wine._id}
              className="flex flex-col rounded-lg bg-white shadow-sm border border-purple-600 max-w-96 p-6"
            >
              {/* (Optional) If you have an image property for wine items, you could do: 
                  <div className="h-48 w-full bg-gray-100 overflow-hidden rounded-t-md">
                    <img
                      src={wine.image || '/default-post.jpg'}
                      alt={wine.title || 'Wine Image'}
                      className="object-cover w-full h-full"
                    />
                  </div>
              */}
              <div className="border-b border-purple-600 pb-4 mb-4 text-center">
                <p className="text-sm uppercase relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-slate-500 hover:bg-gray-100">
                  {wine.category || "Uncategorized"}
                </p>
                <h2 className="mt-4 text-2xl font-bold text-slate-800">
                  {wine.title || "Untitled"}
                </h2>
                {wine.image?.trim() ? (
                  <Image
                    src={wine.image}
                    alt={wine.title}
                    width={90}
                    height={100}
                    className="mt-4 object-cover rounded-md mx-auto"
                  />
                ) : null}
              </div>

              <div className="flex-1 text-slate-500">
                <p className="text-sm whitespace-pre-wrap">{wine.content}</p>
                <p className="text-sm mt-5 font-semibold text-slate-500">
                  By {wine.author || "Unknown"}
                </p>
              </div>

              {/* Admin-only Edit/Delete actions */}
              {session?.user?.role === "admin" && (
                <div className="mt-6 flex justify-between">
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
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
