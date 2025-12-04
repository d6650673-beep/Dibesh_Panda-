'use client';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection } from 'firebase/firestore';
import type { Certificate } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import Image from 'next/image';
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
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
          {isLoading &&
            Array.from({ length: 2 }).map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <Skeleton className="aspect-video w-full" />
                <CardContent className="p-6">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="mt-2 h-4 w-1/2" />
                </CardContent>
              </Card>
            ))}
          {!isLoading && certificates?.map((certificate) => {
            const cardContent = (
              <Card key={certificate.id} className="group flex h-full flex-col overflow-hidden transition-all duration-300 hover:shadow-primary/20 hover:shadow-2xl hover:-translate-y-2">
                <div className="relative aspect-video w-full">
                   {certificate.imageUrl ? (
                    <Image
                      src={certificate.imageUrl}
                      alt={certificate.name}
                      layout="fill"
                      objectFit="cover"
                      className="transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-muted">
                        <span className="text-sm text-muted-foreground">No Image</span>
                    </div>
                  )}
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-lg font-bold">{certificate.name}</h3>
                  <p className="text-sm text-muted-foreground">{certificate.issuingOrganization} &bull; {certificate.year}</p>
                </div>
              </Card>
            );

            return certificate.url ? (
              <Link href={certificate.url} key={certificate.id} target="_blank" rel="noopener noreferrer" className="flex">
                {cardContent}
              </Link>
            ) : (
              <div key={certificate.id} className="flex">{cardContent}</div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
