import Link from 'next/link';
import { Sparkles } from 'lucide-react';

export function Logo() {
  return (
    <Link
      href="/"
      className="group inline-flex items-center gap-2 text-xl font-bold text-primary transition-colors hover:text-primary/80 md:text-2xl"
    >
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground transition-transform group-hover:scale-110">
        <Sparkles className="h-5 w-5" />
      </div>
      <span className="font-headline">Dibesh portfolio</span>
    </Link>
  );
}
