'use client';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection } from 'firebase/firestore';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { ContactSubmission } from '@/lib/types';
import { format } from 'date-fns';

export default function SubmissionsPage() {
  const firestore = useFirestore();
  const submissionsRef = useMemoFirebase(() => collection(firestore, 'contactFormSubmissions'), [firestore]);
  const { data: submissions, isLoading } = useCollection<ContactSubmission>(submissionsRef);
  
  const sortedSubmissions = submissions ? [...submissions].sort((a, b) => b.submissionDate.seconds - a.submissionDate.seconds) : [];

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>Contact Form Submissions</CardTitle>
          <CardDescription>Messages sent from your website's contact form.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {isLoading && Array.from({length: 3}).map((_, i) => <Skeleton key={i} className="h-24 w-full" />)}
          {!isLoading && sortedSubmissions.length === 0 && <p>No submissions yet.</p>}
          {!isLoading && sortedSubmissions.map(sub => (
            <div key={sub.id} className="border p-4 rounded-lg">
                <div className="flex justify-between items-center">
                    <p className="font-semibold">{sub.name} <span className="font-normal text-muted-foreground text-sm">&lt;{sub.email}&gt;</span></p>
                    <p className="text-xs text-muted-foreground">
                        {format(new Date(sub.submissionDate.seconds * 1000), 'PPP p')}
                    </p>
                </div>
                <p className="mt-2 text-sm">{sub.message}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
