"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";

// Fetch by slug only
async function fetchPostBySlug(slug) {
  const res = await fetch(`/api/football?slug=${encodeURIComponent(slug)}`, {
    cache: "no-store",
  });
  if (!res.ok) return null;
  const data = await res.json();
  return Array.isArray(data) ? data[0] : data; // support either array or single
}

// --- Comments API helpers (optional) ---
async function fetchComments(postId) {
  const res = await fetch(`/api/comments?postId=${encodeURIComponent(postId)}`, {
    cache: "no-store",
  });
  if (!res.ok) return [];
  return await res.json();
}

async function createComment(payload) {
  const res = await fetch("/api/comments", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to post comment");
  return await res.json();
}

function Comments({ postId }) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ author: "", text: "" });
  const [posting, setPosting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      const data = await fetchComments(postId);
      if (mounted) {
        setComments(Array.isArray(data) ? data : []);
        setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, [postId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.text.trim()) {
      setError("Please write a comment.");
      return;
    }
    try {
      setPosting(true);
      const optimistic = {
        _id: `temp-${Date.now()}`,
        postId,
        author: form.author?.trim() || "Anonymous",
        text: form.text.trim(),
        createdAt: new Date().toISOString(),
      };
      setComments((prev) => [optimistic, ...prev]);
      setForm({ author: "", text: "" });

      const saved = await createComment({
        postId,
        author: optimistic.author,
        text: optimistic.text,
        entity: "football",
      });

      setComments((prev) => {
        const withoutTemp = prev.filter((c) => c._id !== optimistic._id);
        return [saved, ...withoutTemp];
      });
    } catch (err) {
      console.error(err);
      setError("Could not submit comment. (Is /api/comments implemented?)");
      setComments((prev) => prev.filter((c) => !c._id?.startsWith("temp-")));
    } finally {
      setPosting(false);
    }
  };

  return (
    <section className="mt-12">
      <h3 className="text-xl font-semibold mb-4">Comments</h3>

      <form onSubmit={handleSubmit} className="mb-8 space-y-3">
        <div className="flex gap-3 max-sm:flex-col">
          <input
            type="text"
            name="author"
            placeholder="Name (optional)"
            value={form.author}
            onChange={(e) => setForm((p) => ({ ...p, author: e.target.value }))}
            className="w-60 max-sm:w-full rounded-md border border-gray-300 px-3 py-2"
          />
          <textarea
            name="text"
            placeholder="Write your comment…"
            value={form.text}
            onChange={(e) => setForm((p) => ({ ...p, text: e.target.value }))}
            className="flex-1 rounded-md border border-gray-300 px-3 py-2 min-h-[90px]"
          />
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button
          type="submit"
          disabled={posting}
          className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-60"
        >
          {posting ? "Posting…" : "Post comment"}
        </button>
      </form>

      {loading ? (
        <p className="text-gray-600">Loading comments…</p>
      ) : comments.length === 0 ? (
        <p className="text-gray-600">No comments yet. Be the first!</p>
      ) : (
        <ul className="space-y-4">
          {comments.map((c) => (
            <li key={c._id} className="rounded-xl border border-gray-200 p-4">
              <div className="mb-1 text-sm text-gray-500">
                <span className="font-medium text-gray-700">
                  {c.author || "Anonymous"}
                </span>{" "}
                •{" "}
                <time dateTime={c.createdAt}>
                  {new Date(c.createdAt).toLocaleString()}
                </time>
              </div>
              <p className="whitespace-pre-wrap">{c.text}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default function FootballPostPage({ params }) {
  const slug = useMemo(() => params?.slug ?? "", [params?.slug]);
  const [post, setPost] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      const data = await fetchPostBySlug(slug);
      if (mounted) {
        setPost(data);
        setNotFound(!data);
        setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, [slug]);

  if (loading) {
    return (
      <div className="container mx-auto p-8">
        <p className="text-gray-600">Loading article…</p>
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="container mx-auto p-8">
        <div className="rounded-xl border border-gray-200 p-6">
          <h1 className="text-2xl font-semibold mb-2">Article not found</h1>
          <p className="text-gray-700 mb-4">
            We couldn’t find that football post. It may have been removed or the link is incorrect.
          </p>
          <Link href="/football" className="text-blue-600 hover:underline">
            ← Back to Football
          </Link>
        </div>
      </div>
    );
  }

  const cover = post?.image?.trim()
    ? `/api/image-proxy?url=${encodeURIComponent(post.image)}`
    : null;

  return (
    <div className="container mx-auto p-8">
      <nav className="mb-6 text-sm">
        <Link href="/football" className="text-blue-600 hover:underline">
          Football
        </Link>
        <span className="text-gray-400"> / </span>
        <span className="text-gray-700">{post?.title || "Article"}</span>
      </nav>

      <header className="mb-8">
        {post?.category ? (
          <span className="mb-3 inline-block rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
            {post.category}
          </span>
        ) : null}
        <h1 className="text-3xl font-bold tracking-tight">{post?.title}</h1>
        <div className="mt-2 text-sm text-gray-600">
          {post?.author ? (
            <>
              By <span className="font-medium text-gray-700">{post.author}</span>
            </>
          ) : null}
          {post?.createdAt ? (
            <>
              {" "}•{" "}
              <time dateTime={post.createdAt}>
                {new Date(post.createdAt).toLocaleString()}
              </time>
            </>
          ) : null}
        </div>
      </header>

      {cover ? (
        <div className="relative mb-8 h-64 w-full overflow-hidden rounded-2xl">
          <Image
            src={cover}
            alt={post.title}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        </div>
      ) : null}

      <article className="prose max-w-none prose-headings:scroll-mt-24">
        <p className="whitespace-pre-wrap text-gray-900 leading-relaxed">
          {post?.content}
        </p>
      </article>

      {post?._id ? <Comments postId={post._id} /> : null}
    </div>
  );
}
