'use client';
import { useCollection, useFirestore, setDocumentNonBlocking, useMemoFirebase } from '@/firebase';
import { collection, doc } from 'firebase/firestore';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { SocialLink } from '@/lib/types';
import { defaultSocialLinks } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';
import * as LucideIcons from 'lucide-react';
import { useEffect } from 'react';

const socialLinksSchema = z.object({
  links: z.array(z.object({
    id: z.string(),
    name: z.string(),
    url: z.string().url('Please enter a valid URL.').or(z.literal('')),
    icon: z.string(),
    placeholder: z.string(),
  }))
});

export default function SocialLinksAdminPage() {
  const firestore = useFirestore();
  const socialLinksRef = useMemoFirebase(() => collection(firestore, 'socialLinks'), [firestore]);
  const { data: socialLinks, isLoading } = useCollection<SocialLink>(socialLinksRef);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof socialLinksSchema>>({
    resolver: zodResolver(socialLinksSchema),
    defaultValues: { links: defaultSocialLinks },
  });

  const { fields } = useFieldArray({ control: form.control, name: "links" });

  useEffect(() => {
    if (socialLinks && socialLinks.length > 0) {
        const dbLinksMap = new Map(socialLinks.map(l => [l.id, l]));
        const combinedLinks = defaultSocialLinks.map(defaultLink => {
            const dbLink = dbLinksMap.get(defaultLink.id);
            return dbLink ? { ...defaultLink, ...dbLink } : defaultLink;
        });
        form.reset({ links: combinedLinks });
    } else {
        form.reset({ links: defaultSocialLinks });
    }
  }, [socialLinks, form]);


  const onSubmit = async (values: z.infer<typeof socialLinksSchema>) => {
    try {
      await Promise.all(values.links.map(link => {
        const linkRef = doc(firestore, 'socialLinks', link.id);
        const { placeholder, ...linkData } = link; // Omit placeholder
        return setDocumentNonBlocking(linkRef, linkData, { merge: true });
      }));
      toast({ title: 'Success!', description: 'Social links updated.' });
    } catch (error) {
      console.error(error);
      toast({ variant: 'destructive', title: 'Error', description: 'Could not update links.' });
    }
  };
  
  if(isLoading) {
      return (
          <div className="container mx-auto py-10">
              <Card>
                  <CardHeader>
                      <Skeleton className="h-8 w-64" />
                      <Skeleton className="h-4 w-96 mt-2" />
                  </CardHeader>
                  <CardContent className="space-y-6">
                      {Array.from({length: 3}).map((_, i) => (
                          <div key={i} className="flex items-center gap-4">
                              <Skeleton className="h-10 w-10 rounded-sm" />
                              <Skeleton className="h-10 flex-1" />
                          </div>
                      ))}
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
          <CardTitle>Manage Social Media Links</CardTitle>
          <CardDescription>Update the URLs for your social media profiles.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {fields.map((field, index) => {
                const Icon = (LucideIcons as any)[field.icon] || LucideIcons.Link;
                return (
                  <FormField
                    key={field.id}
                    control={form.control}
                    name={`links.${index}.url`}
                    render={({ field: renderField }) => (
                      <FormItem>
                        <FormLabel>{field.name}</FormLabel>
                        <div className="flex items-center gap-2">
                           <Icon className="h-5 w-5 text-muted-foreground" />
                           <FormControl>
                            <Input placeholder={field.placeholder} {...renderField} />
                           </FormControl>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                );
              })}
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? 'Saving...' : 'Save All Links'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}