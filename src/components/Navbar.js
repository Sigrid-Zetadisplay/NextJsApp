"use client";

import Link from "next/link";
import Image from 'next/image';
import { useSession, signOut } from "next-auth/react";

const Navbar = () => {
  const { data: session } = useSession();

  return (
		<nav className="bg-gray-800 text-white">
			<div className="container mx-5  py-4 flex justify-between">
				{/* Left section with profile image + site title */}
				<div className="flex items-center space-x-3">
            <Image
              alt="Author profile picture"
              src="https://i.imghippo.com/files/cCe8948yAg.png"
              width={90}
              height={100}
              className="rounded-full"
            />
          <div className="">
            
          </div>
					<Link
						href="/"
						className="text-xl font-bold hover:text-gray-300">
						Dora The Wine Explorer
					</Link>
				</div>

				{/* Right nav links */}
				<div className="space-x-4 flex items-center">
					<Link
						href="/"
						className="hover:text-gray-400">
						Home
					</Link>

					{session && (
						<>
							<Link
								href="/blog"
								className="hover:text-gray-400">
								Blog
							</Link>
							<Link
								href="/wine"
								className="hover:text-gray-400">
								Wine
							</Link>
							<Link
								href="/football"
								className="hover:text-gray-400">
								Football
							</Link>
							<Link
								href="/myProjects"
								className="hover:text-gray-400">
								My Projects
							</Link>

							{session.user.role === 'admin' && (
								<Link
									href="/admin"
									className="hover:text-gray-400">
									Admin Dashboard
								</Link>
							)}

							<button
								onClick={() => signOut()}
								className="hover:text-gray-400">
								Logout
							</button>
						</>
					)}

					{!session && <>{/* Optional Login Link */}</>}
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
