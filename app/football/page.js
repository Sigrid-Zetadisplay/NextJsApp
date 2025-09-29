"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";
import useCrud from "@/hooks/useCrud";
import FootballPostForm from "@/components/FootballPostForm";

export default function FootballPage() {
  const { data: session } = useSession();
  const {
    items: footballPosts = [],
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
    slug: "", // recommend storing a slug on each post for clean URLs
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
    setNewPost({ title: "", category: "", content: "", image: "", author: "", slug: "" });
    setShowForm(false);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    await editItem(editId, editPost);
    setEditId(null);
    setEditPost(null);
  };

  const excerpt = (text = "", max = 160) =>
    text.length > max ? text.slice(0, max).trimEnd() + "…" : text;

  return (
    <div className="container mx-auto p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Football</h1>

        {session?.user?.role === "admin" && (
          <button
            onClick={() => setShowForm((prev) => !prev)}
            className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 transition-colors"
          >
            {showForm ? "Cancel" : "Add New Post"}
          </button>
        )}
      </div>

      {/* Admin: Create */}
      {showForm && session?.user?.role === "admin" && (
        <div className="mb-10">
          <FootballPostForm
            mode="create"
            formData={newPost}
            onChange={handleChange(setNewPost)}
            onSubmit={handleNewSubmit}
          />
        </div>
      )}

      {/* Admin: Edit */}
      {editPost && session?.user?.role === "admin" && (
        <div className="mb-10">
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
        </div>
      )}

      {/* List */}
      {footballPosts.length === 0 ? (
        <p className="text-gray-600">No posts yet.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {footballPosts.map((post) => {
            const href = `/football/${post.slug || post._id}`;
            return (
              <article
                key={post._id}
                className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow"
              >
                <Link href={href} className="block">
                  {/* Image */}
                  {post.image?.trim() ? (
                    <div className="relative h-48 w-full">
                      <Image
                        src={`/api/image-proxy?url=${encodeURIComponent(post.image)}`}
                        alt={post.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                  ) : (
                    <div className="h-48 w-full bg-gray-100" />
                  )}

                  {/* Content */}
                  <div className="p-5">
                    <div className="mb-3 flex items-center gap-2">
                      {post.category ? (
                        <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
                          {post.category}
                        </span>
                      ) : null}
                    </div>

                    <h2 className="mb-2 line-clamp-2 text-xl font-semibold leading-snug group-hover:underline">
                      {post.title}
                    </h2>

                    <p className="mb-3 text-sm text-gray-700">
                      {excerpt(post.content, 160)}
                    </p>

                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>By {post.author || "Unknown"}</span>
                      <span className="inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                        Read more <span aria-hidden>→</span>
                      </span>
                    </div>
                  </div>
                </Link>

                {/* Admin actions */}
                {session?.user?.role === "admin" && (
                  <div className="absolute right-3 top-3 z-10 flex gap-2">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setEditId(post._id);
                        setEditPost(post);
                        window?.scrollTo?.({ top: 0, behavior: "smooth" });
                      }}
                      className="rounded-md bg-yellow-500 px-3 py-1 text-xs font-medium text-white hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={async (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        await deleteItem(post._id);
                      }}
                      className="rounded-md bg-red-500 px-3 py-1 text-xs font-medium text-white hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
