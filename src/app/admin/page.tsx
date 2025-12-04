import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

export default function AdminDashboard() {
  return (
    <div className="container mx-auto py-10">
      <header className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-primary">Admin Dashboard</h1>
        <Button asChild>
          <Link href="/">Back to Site</Link>
        </Button>
      </header>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle>Content Management</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Edit Hero, About, Projects, and Services sections.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>View Submissions</CardTitle>
          </CardHeader>
          <CardContent>
            <p>See messages from the contact form.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Analytics</CardTitle>
          </CardHeader>
          <CardContent>
            <p>View website traffic and user engagement.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Manage social media links and other settings.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
