import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../globals.css';
import { AuthContextProvider } from '@/context/AuthContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Task Management App - Authentication',
  description: 'Login or sign up to manage your tasks',
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={inter.className}>
      {children}
    </div>
  );
}