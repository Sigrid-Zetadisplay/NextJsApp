"use client";

import Link from "next/link";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";
import { Menu, X } from "lucide-react"; // Optional icon library

const Navbar = () => {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        {/* Logo and title */}
        <div className="flex items-center space-x-3">
          <Image
            alt="Author profile picture"
            src="https://i.imghippo.com/files/cCe8948yAg.png"
            width={50}
            height={50}
            className="rounded-full"
          />
          <Link href="/" className="text-xl font-bold hover:text-gray-300">
            Dora The Wine Explorer
          </Link>
        </div>

        {/* Hamburger Menu for Mobile */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Nav links - desktop */}
        <div className="hidden md:flex space-x-4 items-center">
          <Link href="/" className="hover:text-gray-400">Home</Link>

          {session && (
            <>
              <Link href="/blog" className="hover:text-gray-400">Blog</Link>
              <Link href="/wine" className="hover:text-gray-400">Wine</Link>
              <Link href="/football" className="hover:text-gray-400">Football</Link>
              <Link href="/myProjects" className="hover:text-gray-400">My Projects</Link>
              {session.user?.role === 'admin' && (
                <Link href="/admin" className="hover:text-gray-400">Admin Dashboard</Link>
              )}
              <button onClick={() => signOut()} className="hover:text-gray-400">Logout</button>
            </>
          )}
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {isOpen && (
        <div className="md:hidden bg-gray-700 px-4 pb-4 space-y-2">
          <Link href="/" className="block hover:text-gray-300">Home</Link>
          {session && (
            <>
              <Link href="/blog" className="block hover:text-gray-300">Blog</Link>
              <Link href="/wine" className="block hover:text-gray-300">Wine</Link>
              <Link href="/football" className="block hover:text-gray-300">Football</Link>
              <Link href="/myProjects" className="block hover:text-gray-300">My Projects</Link>
              {session.user?.role === 'admin' && (
                <Link href="/admin" className="block hover:text-gray-300">Admin Dashboard</Link>
              )}
              <button onClick={() => signOut()} className="block hover:text-gray-300">Logout</button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
