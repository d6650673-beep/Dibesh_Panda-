import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { personalData } from '@/lib/data';
import { ArrowRight, FileText } from 'lucide-react';

export function HeroSection() {
  return (
    <section id="home" className="relative overflow-hidden">
      <div className="container flex min-h-[calc(100vh-4rem)] items-center justify-center py-20 text-center">
        <div className="relative z-10 max-w-3xl">
          <div className="mb-4 inline-block rounded-full bg-secondary px-4 py-1 text-sm font-medium text-secondary-foreground">
            <span className="font-headline">{personalData.name}</span>
          </div>
          <h1 className="font-headline text-4xl font-bold tracking-tight text-primary sm:text-5xl md:text-6xl lg:text-7xl">
            {personalData.title}
          </h1>
          <p className="mt-6 text-lg text-foreground/80 md:text-xl">
            {personalData.introduction}
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" asChild>
              <Link href="#contact">
                Hire Me <ArrowRight className="ml-2" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="#">
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
