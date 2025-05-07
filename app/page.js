// app/page.js
"use client";
import { useState, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { HeroSection } from "@/components/HeroHomePage";

export default function HomePage() {
  const { data: session, status } = useSession();

  // Login State
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Signup State
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");

  // Blog Posts
  const [posts, setPosts] = useState({
    wine: null,
    blog: null,
    football: null,
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    const result = await signIn("credentials", {
      redirect: false,
      email: loginEmail,
      password: loginPassword,
    });
    if (result.error) {
      alert("Login failed: " + result.error);
    } else {
      alert("Logged in successfully!");
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName,
        lastName,
        email: signupEmail,
        password: signupPassword,
      }),
    });
    const data = await res.json();
    if (!data.success) {
      alert("Signup failed: " + data.error);
    } else {
      alert("Signup successful! You can now login.");
      setFirstName("");
      setLastName("");
      setSignupEmail("");
      setSignupPassword("");
    }
  };

  useEffect(() => {
    if (session) {
      const fetchPosts = async () => {
        const [wine, blog, football] = await Promise.all([
          fetch("/api/wine/latest").then((res) => res.json()),
          fetch("/api/blog/latest").then((res) => res.json()),
          fetch("/api/football/latest").then((res) => res.json()),
        ]);
        setPosts({ wine, blog, football });
      };
      fetchPosts();
    }
  }, [session]);

  if (status === "loading") return <div>Loading...</div>;

  return (
    <main className="container m-10">
      <div className="mx-auto m-5 flex justify-around">
        <div>
          <HeroSection session={session} />
        </div>

        {!session && (
          <div className="flex flex-wrap justify-center">
            <div className="m-10 py-3 sm:w-full sm:max-w-sm">
              <h2 className="text-xl font-semibold mb-2">Login</h2>
              <form onSubmit={handleLogin}>
                <input
                  type="email"
                  placeholder="Email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="border p-1 mb-2 block w-full"
                  required
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="border p-1 mb-2 block w-full"
                  required
                />
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-3 py-1 rounded w-full"
                >
                  Login
                </button>
              </form>
            </div>

            <div className="m-10 mt-20 sm:w-full sm:max-w-sm">
              <h2 className="text-xl font-semibold mb-2">Sign Up</h2>
              <form onSubmit={handleSignup}>
                <input
                  type="text"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="border p-1 mb-2 block w-full"
                  required
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="border p-1 mb-2 block w-full"
                  required
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={signupEmail}
                  onChange={(e) => setSignupEmail(e.target.value)}
                  className="border p-1 mb-2 block w-full"
                  required
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={signupPassword}
                  onChange={(e) => setSignupPassword(e.target.value)}
                  className="border p-1 mb-2 block w-full"
                  required
                />
                <button
                  type="submit"
                  className="bg-green-500 text-white px-3 py-1 rounded w-full"
                >
                  Sign Up
                </button>
              </form>
            </div>
          </div>
        )}
      </div>

      {session && (
        <section className="mt-16">
          <h2 className="text-3xl font-bold mb-8 text-gray-800">
            Latest Posts
          </h2>

          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {Object.entries(posts).map(([key, post]) =>
              post ? (
                <div
                  key={key}
                  className="flex flex-col md:flex-row bg-white shadow-md border border-slate-200 rounded-lg overflow-hidden"
                >
                  <div className="md:w-2/5 bg-gray-100">
                    <Image
                      src={
                        post.image ||
                        "https://i.imghippo.com/files/cCe8948yAg.png"
                      }
                      alt={post.title || "Post Image"}
                      width={200}
                      height={100}
                      className="h-full w-full object-cover md:rounded-l-lg"
                    />
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div
                      className={`mb-3 w-fit px-3 py-1 rounded-full text-xs font-medium text-white ${
                        key === "blog"
                          ? "bg-yellow-500"
                          : key === "wine"
                          ? "bg-purple-600"
                          : key === "football"
                          ? "bg-red-600"
                          : "bg-teal-600"
                      }`}
                    >
                      {key.toUpperCase()}
                    </div>

                    <h3 className="text-lg font-semibold text-slate-800 mb-2">
                      {post.title || "Untitled"}
                    </h3>

                    <p className="text-slate-600 text-sm leading-relaxed mb-4">
                      {post.summary ||
                        post.content?.slice(0, 100) ||
                        "No content available"}
                      ...
                    </p>

                    <Link
                      href={`/${key}/${post.slug}`}
                      className="text-sm font-semibold text-slate-800 hover:underline flex items-center"
                    >
                      Read More
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="ml-2 h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              ) : (
                <div
                  key={key}
                  className="p-6 bg-white border border-gray-200 rounded-lg text-center text-gray-500"
                >
                  No {key} post available.
                </div>
              )
            )}
          </div>
        </section>
      )}
    </main>
  );
}
