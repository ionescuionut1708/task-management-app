// src/app/page.tsx
'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import NavBar from '@/components/ui/NavBar';

export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (user) {
        router.push('/dashboard');
      }
    }
  }, [user, loading, router]);

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <div className="container mx-auto px-4 py-16 flex flex-col items-center">
        <h1 className="text-4xl font-bold text-center mb-6">Welcome to Task Manager</h1>
        <p className="text-xl text-gray-600 text-center max-w-2xl mb-10">
          A simple application to help you manage your tasks efficiently. Sign in to create and manage your tasks.
        </p>
        <div className="flex gap-4">
          <button
            onClick={() => router.push('/auth/login')}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Log In
          </button>
          <button
            onClick={() => router.push('/auth/signup')}
            className="bg-gray-100 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}