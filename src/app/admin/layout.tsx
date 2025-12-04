'use client';

import { useUser, useAuth } from '@/firebase';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Home, User, Layers, Package, Mail, BookText, Phone, LogOut, Sparkles, Award } from 'lucide-react';
import { Sidebar, SidebarProvider, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';
import Link from 'next/link';
import { Logo } from '@/components/Logo';
import { usePathname } from 'next/navigation';
import { signOut } from 'firebase/auth';

const adminNavLinks = [
    { href: '/admin/hero', label: 'Hero', icon: Home },
    { href: '/admin/about', label: 'About', icon: User },
    { href: '/admin/skills', label: 'Skills', icon: Award },
    { href: '/admin/services', label: 'Services', icon: Layers },
    { href: '/admin/projects', label: 'Projects', icon: Package },
    { href: '/admin/submissions', label: 'Submissions', icon: Mail },
    { href: '/admin/social', label: 'Social Links', icon: BookText },
    { href: '/admin/contact', label: 'Contact', icon: Phone }
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, isUserLoading } = useUser();
  const auth = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push('/login');
    }
  }, [user, isUserLoading, router]);

  const handleSignOut = () => {
    if (auth) {
      signOut(auth);
    }
  };

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
        <SidebarContent className="flex flex-col p-2">
           <div className="p-2 mb-4">
            <Logo />
          </div>
          <SidebarMenu className="flex-1">
            {adminNavLinks.map((link) => {
              const Icon = link.icon;
              return (
                <SidebarMenuItem key={link.href}>
                  <Link href={link.href}>
                    <SidebarMenuButton
                      isActive={pathname.startsWith(link.href)}
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
          <SidebarMenu>
            <SidebarMenuItem>
                <SidebarMenuButton onClick={handleSignOut} tooltip={{children: 'Log Out'}}>
                    <LogOut />
                    <span>Log Out</span>
                </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>
      <main className="flex-1">
        <div className="p-4 sm:p-6">{children}</div>
      </main>
    </SidebarProvider>
  );
}
