// app/page.js
"use client";
import { useState } from "react";
import { signIn } from "next-auth/react"; // next-auth client helper
import Image from "next/image";

export default function HomePage() {
  // Login State
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Signup State
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");

  // Handle login
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

  // Handle signup
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
    }
  };

  return (
    <>
      <main className="container mx-auto p-8 flex">
        <h1>Homepage</h1>
        <section className="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:px-8">
          <div className="relative w-48 h-12 mx-auto">
            <Image
              alt=""
              src="https://tailwindcss.com/plus-assets/img/logos/workcation-logo-indigo-600.svg"
              fill
              className="object-contain"
            />
          </div>
          <figure className="mt-10">
            <blockquote className="text-center text-xl/8 font-semibold text-gray-900 sm:text-2xl/9">
              <p>
                “Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo
                expedita voluptas culpa sapiente alias molestiae. Numquam
                corrupti in laborum sed rerum et corporis.”
              </p>
            </blockquote>
            <figcaption className="mt-10">
              <div className="relative w-20 h-20 mx-auto">
                <Image
                  alt=""
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  fill
                  className="object-cover rounded-full"
                />
              </div>
            </figcaption>
          </figure>
        </section>

        <div className="container flex-col justify-items-end">
          {/* Login Form */}
          <div className="m-10 sm:w-full sm:max-w-sm">
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

          {/* Signup Form */}
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
      </main>
    </>
  );
}
