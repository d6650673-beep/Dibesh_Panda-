'use client';

import { useUser } from '@/firebase';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Sparkles, Home, User, Layers, Package, Mail, BookText, Phone } from 'lucide-react';
import { Sidebar, SidebarProvider, SidebarTrigger, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';
import Link from 'next/link';
import { Logo } from '@/components/Logo';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';

const adminNavLinks = [
    { href: '/admin/hero', label: 'Hero', icon: Home },
    { href: '/admin/about', label: 'About', icon: User },
    { href: '/admin/services', label: 'Services', icon: Layers },
    { href: '/admin/projects', label: 'Projects', icon: Package },
    { href: '/admin/submissions', label: 'Submissions', icon: Mail },
    { href: '/admin/social', label: 'Social Links', icon: BookText },
    { href: '/admin/contact', label: 'Contact', icon: Phone }
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, isUserLoading } = useUser();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push('/login');
    }
  }, [user, isUserLoading, router]);

  if (isUserLoading || !user) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background">
        <div className="flex items-center gap-2 text-lg font-semibold text-primary">
          <Sparkles className="h-6 w-6 animate-spin" />
          <span>Loading Admin...</span>
        </div>
        <p className="mt-2 text-sm text-muted-foreground">Just a moment...</p>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <Sidebar side="left" variant="sidebar" collapsible="icon">
        <SidebarContent className="p-2">
           <div className="p-2 mb-4">
            <Logo />
          </div>
          <SidebarMenu>
            {adminNavLinks.map((link) => {
              const Icon = link.icon;
              return (
                <SidebarMenuItem key={link.href}>
                  <Link href={link.href}>
                    <SidebarMenuButton
                      isActive={pathname === link.href}
                      tooltip={{ children: link.label }}
                    >
                      <Icon />
                      <span>{link.label}</span>
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>
      <main className="flex-1">
        <header className="flex h-14 items-center justify-between border-b bg-background px-4">
           <SidebarTrigger className="md:hidden" />
           <h1 className="text-xl font-semibold">Admin Dashboard</h1>
            <Button asChild size="sm">
              <Link href="/">Back to Site</Link>
            </Button>
        </header>
        <div className="p-4 sm:p-6">{children}</div>
      </main>
    </SidebarProvider>
  );
}
