
import Link from 'next/link';

const Navbar = () => {
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
          <Link href="/blog" className="hover:text-gray-400">
            Blog
          </Link>
          <Link href="/wine" className="hover:text-gray-400">
            Wine
          </Link>
          <Link href="/wine" className="hover:text-gray-400">
            Football
          </Link>
          <Link href="/wine" className="hover:text-gray-400">
            My Projects
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
