'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { User } from 'lucide-react';
import { useEffect, useState } from 'react';

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const [firstName, setFirstName] = useState<string | null>(null);

  useEffect(() => {
    const storedName = localStorage.getItem('user_first_name');
    setFirstName(storedName);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user_first_name');
    setFirstName(null);
    router.push('/account/login'); // Redirect to login page
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Menu', path: '/menu' },
    { name: 'Cart', path: '/cart' },
  ];
  console.log('//////////Stored first name:', firstName); // Debugging line to check the stored name

  return (
    <nav className="w-full bg-gray-800 text-white px-6 py-4 shadow flex justify-between items-center">
      <ul className="flex gap-6">
        {navLinks.map(link => (
          <li key={link.name}>
            <Link
              href={link.path}
              className={`hover:underline ${
                pathname === link.path ? 'font-bold underline' : ''
              }`}
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
       
      <div className="flex gap-4 items-center">
        {firstName ? (
          <>
            <span className="text-sm md:text-base">Hello, {firstName}</span>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
            >
              Logout
            </button>
          </>
        ) : (
          <Link href="/account/login" title="Login">
            <User className="w-6 h-6 hover:text-gray-300" />
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;