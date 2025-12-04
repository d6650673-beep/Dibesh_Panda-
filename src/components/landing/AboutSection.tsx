'use client';
import Image from 'next/image';
import { useDoc, useFirestore, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import type { AboutData } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

function AboutContent() {
  const firestore = useFirestore();
  const aboutRef = useMemoFirebase(() => doc(firestore, 'content', 'about'), [firestore]);
  const { data: aboutData, isLoading: isLoadingAbout } = useDoc<AboutData>(aboutRef);

  return (
    <div className="grid grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-8">
      <div className="lg:col-span-1">
        <Card className="overflow-hidden">
          <CardContent className="p-0">
            {isLoadingAbout || !aboutData?.profilePhotoUrl ? (
              <Skeleton className="aspect-square w-full" />
            ) : (
              <Image
                src={aboutData.profilePhotoUrl}
                alt="Profile Photo"
                width={400}
                height={400}
                className="h-auto w-full object-cover"
                priority
              />
            )}
          </CardContent>
        </Card>
      </div>
      <div className="lg:col-span-2">
        <h2 className="font-headline text-3xl font-bold text-primary md:text-4xl">About Me</h2>
        {isLoadingAbout ? (
          <div className="mt-4 space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </div>
        ) : (
          <p className="mt-4 text-base text-foreground/80 md:text-lg">{aboutData?.bio}</p>
        )}
      </div>
    </div>
  );
}


export function AboutSection() {
  return (
    <section id="about" className="py-16 md:py-24">
      <div className="container">
        <AboutContent />
      </div>
    </section>
  );
}
