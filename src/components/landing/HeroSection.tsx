'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, FileText } from 'lucide-react';
import { useDoc } from '@/firebase';
import { doc } from 'firebase/firestore';
import { useFirestore, useMemoFirebase } from '@/firebase/provider';
import type { HeroData } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';

export function HeroSection() {
  const firestore = useFirestore();
  const heroRef = useMemoFirebase(() => doc(firestore, 'content', 'hero'), [firestore]);
  const { data: heroData, isLoading } = useDoc<HeroData>(heroRef);

  return (
    <section id="home" className="relative overflow-hidden">
      <div className="container flex min-h-[calc(100vh-4rem)] items-center justify-center py-20 text-center">
        <div className="relative z-10 max-w-3xl">
          <div className="mb-4 inline-block rounded-full bg-secondary px-4 py-1 text-sm font-medium text-secondary-foreground">
            {isLoading ? <Skeleton className="h-6 w-32" /> : <span className="font-headline">{heroData?.name}</span>}
          </div>
          <h1 className="font-headline text-4xl font-bold tracking-tight text-primary sm:text-5xl md:text-6xl lg:text-7xl">
            {isLoading ? <Skeleton className="mx-auto mt-2 h-14 w-3/4" /> : heroData?.title}
          </h1>
          {isLoading ? (
            <div className="mt-6 space-y-2 text-lg text-foreground/80 md:text-xl">
                <Skeleton className="mx-auto h-5 w-full" />
                <Skeleton className="mx-auto h-5 w-2/3" />
            </div>
          ) : (
            <p className="mt-6 text-lg text-foreground/80 md:text-xl">
              {heroData?.introduction}
            </p>
          )}
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" asChild>
              <Link href="#contact">
                {heroData?.hireMeButtonText || 'Hire Me'} <ArrowRight className="ml-2" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href={heroData?.cvUrl || '#'} target="_blank" rel="noopener noreferrer" aria-disabled={!heroData?.cvUrl}>
                <FileText className="mr-2" /> Download CV
              </Link>
            </Button>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 -z-10 h-full w-full bg-background [background:radial-gradient(125%_125%_at_50%_10%,hsl(var(--background))_40%,hsl(var(--primary))_100%)] dark:[background:radial-gradient(125%_125%_at_50%_10%,hsl(var(--background))_40%,hsl(var(--primary)/0.5)_100%)]"></div>
    </section>
  );
}
