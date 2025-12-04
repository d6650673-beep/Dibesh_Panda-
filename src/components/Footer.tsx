'use client';
import Link from 'next/link';
import { Logo } from '@/components/Logo';
import { Button } from '@/components/ui/button';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection } from 'firebase/firestore';
import type { SocialLink } from '@/lib/types';
import * as LucideIcons from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';


export function Footer() {
  const currentYear = new Date().getFullYear();
  const firestore = useFirestore();
  const socialLinksRef = useMemoFirebase(() => collection(firestore, 'socialLinks'), [firestore]);
  const { data: socialLinks, isLoading } = useCollection<SocialLink>(socialLinksRef);

  return (
    <footer className="border-t bg-card">
      <div className="container py-8">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <Logo />
          <div className="flex gap-2">
            {isLoading && Array.from({length: 3}).map((_, i) => <Skeleton key={i} className="h-10 w-10 rounded-full" />)}
            {!isLoading && socialLinks?.map((link) => {
              const Icon = (LucideIcons as any)[link.icon] || LucideIcons.Link;
              return (
                <Button key={link.id} variant="ghost" size="icon" asChild>
                  <Link href={link.url} target="_blank" rel="noopener noreferrer">
                    <Icon className="h-5 w-5" />
                    <span className="sr-only">{link.name}</span>
                  </Link>
                </Button>
              );
            })}
          </div>
        </div>
        <div className="mt-6 border-t pt-6 text-center text-sm text-muted-foreground">
          <p>&copy; {currentYear} Firebase Folio. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
