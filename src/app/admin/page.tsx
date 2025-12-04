import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookText, Home, Layers, Mail, Package, User } from 'lucide-react';
import Link from 'next/link';

const managementPages = [
    { href: '/admin/hero', title: 'Hero Section', icon: Home, description: 'Edit the main hero section.' },
    { href: '/admin/about', title: 'About Section', icon: User, description: 'Update your bio and skills.' },
    { href: '/admin/services', title: 'Services', icon: Layers, description: 'Manage the services you offer.' },
    { href: '/admin/projects', title: 'Projects', icon: Package, description: 'Add, edit, or remove projects.' },
    { href: '/admin/submissions', title: 'Submissions', icon: Mail, description: 'View contact form messages.' },
    { href: '/admin/social', title: 'Social Links', icon: BookText, description: 'Manage your social media links.'}
]

export default function AdminDashboard() {
  return (
    <div className="container mx-auto py-10">
      <header className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-primary">Admin Dashboard</h1>
        <Button asChild>
          <Link href="/">Back to Site</Link>
        </Button>
      </header>
       <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {managementPages.map((page) => {
          const Icon = page.icon;
          return (
            <Link href={page.href} key={page.href} className="block hover:no-underline">
              <Card className="flex h-full flex-col transition-all hover:shadow-lg hover:-translate-y-1">
                <CardHeader className="flex-row items-center gap-4 space-y-0">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="h-6 w-6" />
                  </div>
                  <CardTitle>{page.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{page.description}</CardDescription>
                </CardContent>
              </Card>
            </Link>
          )
        })}
      </div>
    </div>
  );
}
