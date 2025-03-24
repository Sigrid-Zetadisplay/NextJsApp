"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

const Navbar = () => {
  const { data: session } = useSession();

  return (
    <nav className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          MySite
        </Link>
        <div className="space-x-4">
          <Link href="/" className="hover:text-gray-400">
            Home
          </Link>

          {/* If user is logged in, show restricted links */}
          {session && (
            <>
              <Link href="/blog" className="hover:text-gray-400">
                Blog
              </Link>
              <Link href="/wine" className="hover:text-gray-400">
                Wine
              </Link>
              <Link href="/football" className="hover:text-gray-400">
                Football
              </Link>
              <Link href="/projects" className="hover:text-gray-400">
                My Projects
              </Link>

              {/* If admin, show Admin Dashboard link */}
              {session.user.role === "admin" && (
                <Link href="/admin" className="hover:text-gray-400">
                  Admin Dashboard
                </Link>
              )}

              <button onClick={() => signOut()} className="hover:text-gray-400">
                Logout
              </button>
            </>
          )}

          {/* If not logged in, maybe show a "Login" link, or do nothing 
              if you're handling that on the homepage. */}
          {!session && (
            <>
              {/* e.g., <Link href="/login">Login</Link> */}
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
