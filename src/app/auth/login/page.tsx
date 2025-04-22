// src/app/auth/login/page.tsx
'use client';

import LoginForm from '@/components/auth/LoginForm';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <LoginForm />
      <p className="text-center mt-6 text-gray-600">
        Don't have an account?{' '}
        <Link href="/auth/signup" className="text-blue-600 hover:text-blue-800 font-medium">
          Sign up
        </Link>
      </p>
    </div>
  );
}