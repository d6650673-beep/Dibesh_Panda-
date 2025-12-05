'use client';

import Link from 'next/link';
import { Menu, X, LogOut } from 'lucide-react';
import { useState, useEffect } from 'react';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Logo } from '@/components/Logo';
import { navLinks } from '@/lib/data';
import { cn } from '@/lib/utils';
import { useUser, useAuth } from '@/firebase';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const { user } = useUser();
  const auth = useAuth();
  const router = useRouter();

  const handleSignOut = () => {
    if (auth) {
      signOut(auth).then(() => {
        router.push('/admin/login');
      });
    }
  };

  useEffect(() => {
    setIsMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-300',
        isScrolled ? 'border-b border-border/60 bg-background/80 backdrop-blur-lg' : ''
      )}
    >
      <div className="container flex h-16 items-center justify-between">
        <Logo />
        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-foreground/60 transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-2 md:flex">
          {user && (
            <Button variant="outline" asChild>
              <Link href="/admin">Admin</Link>
            </Button>
          )}
        </div>
        {isMounted && (
            <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className="md:hidden">
                <Button variant="outline" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Open menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:max-w-xs">
                <div className="flex h-full flex-col">
                <div className="flex items-center justify-between border-b pb-4">
                    <Logo />
                    <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
                    <X className="h-5 w-5" />
                    <span className="sr-only">Close menu</span>
                    </Button>
                </div>
                <nav className="mt-8 flex flex-col items-start gap-6">
                    {navLinks.map((link) => (
                    <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setOpen(false)}
                        className="text-lg font-medium text-foreground/80 transition-colors hover:text-primary"
                    >
                        {link.label}
                    </Link>
                    ))}
                </nav>
                <div className="mt-auto pt-6">
                    {user ? (
                        <Button onClick={() => { handleSignOut(); setOpen(false); }} className="w-full">
                        <LogOut className="mr-2 h-4 w-4" /> Sign Out
                        </Button>
                    ) : (
                        <Button asChild className="w-full">
                        <Link href="/admin/login" onClick={() => setOpen(false)}>Admin Login</Link>
                        </Button>
                    )}
                </div>
                </div>
            </SheetContent>
            </Sheet>
        )}
      </div>
      <div className="h-0.5 w-full animated-gradient-line" />
    </header>
  );
}
