import Link from 'next/link';
import { Logo } from '@/components/Logo';
import { socialLinks } from '@/lib/data';
import { Button } from '@/components/ui/button';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-card">
      <div className="container py-8">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <Logo />
          <div className="flex gap-2">
            {socialLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Button key={link.name} variant="ghost" size="icon" asChild>
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
