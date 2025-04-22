// src/app/auth/signup/page.tsx
'use client';

import SignupForm from '@/components/auth/SignupForm';
import Link from 'next/link';

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <SignupForm />
      <p className="text-center mt-6 text-gray-600">
        Already have an account?{' '}
        <Link href="/auth/login" className="text-blue-600 hover:text-blue-800 font-medium">
          Log in
        </Link>
      </p>
    </div>
  );
}