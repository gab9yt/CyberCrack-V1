"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import AuthForm from '@/components/auth/auth-form';
import { Skeleton } from '@/components/ui/skeleton';

export default function WelcomePage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.replace('/hub');
    }
  }, [user, loading, router]);

  if (loading || user) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-black">
        <div className="w-full max-w-md space-y-4 p-4">
            <Skeleton className="h-10 w-full bg-primary/20" />
            <Skeleton className="h-10 w-full bg-primary/20" />
            <Skeleton className="h-10 w-full bg-primary/20" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <h1 className="mb-8 text-center text-4xl font-bold text-glow md:text-6xl font-headline animate-pulse">
          CYBER-CRACK
        </h1>
        <AuthForm />
      </div>
    </div>
  );
}
