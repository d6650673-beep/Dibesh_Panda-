'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function AdminDashboard() {
  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>Welcome to the Admin Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Please select a section from the sidebar to manage your website's content.</p>
        </CardContent>
      </Card>
    </div>
  );
}
