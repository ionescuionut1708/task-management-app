'use client';

import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const NavBar = () => {
  const { user, logout } = useAuth();
  const router = useRouter();

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/auth/login');
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  if (!isMounted) {
    return (
      <nav className="bg-blue-600 text-white shadow-md">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="text-xl font-bold">Task Manager</div>
          <div className="flex items-center space-x-4"></div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          Task Manager
        </Link>
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <span className="hidden md:inline">{user.email}</span>
              <button
                onClick={handleLogout}
                className="bg-white text-blue-600 px-4 py-1 rounded hover:bg-gray-100 transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/auth/login"
                className="bg-white text-blue-600 px-4 py-1 rounded hover:bg-gray-100 transition-colors"
              >
                Login
              </Link>
              <Link
                href="/auth/signup"
                className="bg-transparent border border-white px-4 py-1 rounded hover:bg-blue-700 transition-colors"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;