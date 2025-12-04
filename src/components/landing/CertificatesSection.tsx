'use client';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection } from 'firebase/firestore';
import type { Certificate } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import * as LucideIcons from 'lucide-react';
import Link from 'next/link';

export function CertificatesSection() {
  const firestore = useFirestore();
  const certificatesRef = useMemoFirebase(() => collection(firestore, 'certificates'), [firestore]);
  const { data: certificates, isLoading } = useCollection<Certificate>(certificatesRef);

  return (
    <section id="certificates" className="bg-secondary py-16 md:py-24">
      <div className="container">
        <div className="text-center">
          <h2 className="font-headline text-3xl font-bold text-primary md:text-4xl">Certificates & Awards</h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-foreground/80 md:text-lg">
            A collection of my professional certifications and recognitions.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {isLoading &&
            Array.from({ length: 4 }).map((_, i) => (
              <Card key={i}>
                <CardHeader>
                  <Skeleton className="mx-auto h-12 w-12 rounded-full" />
                  <Skeleton className="mx-auto mt-4 h-6 w-3/4" />
                </CardHeader>
                <CardContent className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                </CardContent>
              </Card>
            ))}
          {!isLoading && certificates?.map((certificate) => {
            const Icon = (LucideIcons as any)[certificate.icon] || LucideIcons.Award;
            const cardContent = (
              <Card className="flex h-full flex-col text-center transition-transform hover:scale-105 hover:shadow-lg">
                <CardHeader>
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <Icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="pt-4">{certificate.name}</CardTitle>
                </CardHeader>
                <CardContent className="flex-1">
                  <p className="text-muted-foreground">{certificate.issuingOrganization}</p>
                </CardContent>
              </Card>
            );

            return certificate.url ? (
              <Link href={certificate.url} key={certificate.id} target="_blank" rel="noopener noreferrer">
                {cardContent}
              </Link>
            ) : (
              <div key={certificate.id}>{cardContent}</div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
