'use client';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection } from 'firebase/firestore';
import type { Service } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import * as LucideIcons from 'lucide-react';

export function ServicesSection() {
  const firestore = useFirestore();
  const servicesRef = useMemoFirebase(() => collection(firestore, 'services'), [firestore]);
  const { data: services, isLoading } = useCollection<Service>(servicesRef);

  return (
    <section id="services" className="bg-secondary py-16 md:py-24">
      <div className="container">
        <div className="text-center">
          <h2 className="font-headline text-3xl font-bold text-primary md:text-4xl">What I Do</h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-foreground/80 md:text-lg">
            I offer a range of services to help you achieve your digital goals.
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
          {!isLoading && services?.map((service) => {
            const Icon = (LucideIcons as any)[service.icon] || LucideIcons.HelpCircle;
            return (
              <Card key={service.id} className="text-center transition-transform hover:scale-105 hover:shadow-lg">
                <CardHeader>
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <Icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="pt-4">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{service.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
