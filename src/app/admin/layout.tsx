'use client';

import { useUser } from '@/firebase';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Sparkles } from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, isUserLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push('/login');
    }
  }, [user, isUserLoading, router]);

  if (isUserLoading || !user) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background">
        <div className="flex items-center gap-2 text-lg font-semibold text-primary">
          <Sparkles className="h-6 w-6 animate-spin" />
          <span>Loading Admin...</span>
        </div>
        <p className="mt-2 text-sm text-muted-foreground">Just a moment...</p>
      </div>
    );
  }

  return <div>{children}</div>;
}
