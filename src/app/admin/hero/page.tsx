'use client';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { doc, setDoc } from 'firebase/firestore';
import { useFirestore, useDoc, setDocumentNonBlocking, useMemoFirebase } from '@/firebase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { HeroData } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';

const heroSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  title: z.string().min(1, 'Title is required'),
  introduction: z.string().min(1, 'Introduction is required'),
  cvUrl: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  hireMeButtonText: z.string().min(1, 'Button text is required'),
});

export default function HeroAdminPage() {
  const { toast } = useToast();
  const firestore = useFirestore();

  const heroRef = useMemoFirebase(() => doc(firestore, 'content/hero'), [firestore]);
  const { data: heroData, isLoading } = useDoc<HeroData>(heroRef);

  const form = useForm<z.infer<typeof heroSchema>>({
    resolver: zodResolver(heroSchema),
    defaultValues: {
      name: '',
      title: '',
      introduction: '',
      cvUrl: '',
      hireMeButtonText: 'Hire Me',
    },
  });

  useEffect(() => {
    if (heroData) {
      form.reset(heroData);
    }
  }, [heroData, form]);

  const onSubmit = async (values: z.infer<typeof heroSchema>) => {
    try {
      setDocumentNonBlocking(heroRef, values, { merge: true });
      toast({
        title: 'Success!',
        description: 'Hero section has been updated.',
      });
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Could not update hero section.',
      });
    }
  };

  if (isLoading) {
    return (
        <div className="container mx-auto py-10">
            <Card>
                <CardHeader>
                    <Skeleton className="h-8 w-48" />
                </CardHeader>
                <CardContent className="space-y-6">
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-24 w-full" />
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-24" />
                </CardContent>
            </Card>
        </div>
    )
  }

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>Edit Hero Section</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title / Headline</FormLabel>
                    <FormControl>
                      <Input placeholder="Your Professional Title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="introduction"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Introduction</FormLabel>
                    <FormControl>
                      <Textarea placeholder="A short introduction about yourself" {...field} rows={4}/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="cvUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CV Download URL</FormLabel>
                    <FormControl>
                      <Input placeholder="https://example.com/your-cv.pdf" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="hireMeButtonText"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hire Me Button Text</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Hire Me" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? 'Saving...' : 'Save Changes'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
