'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex min-h-[calc(100vh-8rem)] flex-col items-center justify-center gap-4 text-center">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-6xl">404</h1>
        <p className="text-xl text-muted-foreground md:text-2xl">
          Oops! Page Not Found.
        </p>
      </div>
      <p className="max-w-md text-muted-foreground">
        The page you are looking for might have been moved or doesn't exist.
      </p>
      <Button asChild>
        <Link href="/">
          <Home className="mr-2 h-4 w-4" />
          Go Back Home
        </Link>
      </Button>
    </div>
  );
}
