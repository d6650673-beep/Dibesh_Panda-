'use client';
import { useState } from 'react';
import { useCollection, useFirestore, addDocumentNonBlocking, updateDocumentNonBlocking, deleteDocumentNonBlocking, useMemoFirebase } from '@/firebase';
import { collection, doc } from 'firebase/firestore';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Certificate } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Trash2, Edit, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';
import * as LucideIcons from 'lucide-react';

const certificateSchema = z.object({
  icon: z.string().min(1, 'Icon name is required.'),
  name: z.string().min(1, 'Certificate name is required.'),
  issuingOrganization: z.string().min(1, 'Issuing organization is required.'),
  url: z.string().url('A valid credential URL is required.'),
});

export default function CertificatesAdminPage() {
  const firestore = useFirestore();
  const certificatesRef = useMemoFirebase(() => collection(firestore, 'certificates'), [firestore]);
  const { data: certificates, isLoading } = useCollection<Certificate>(certificatesRef);
  const { toast } = useToast();

  const [editingId, setEditingId] = useState<string | null>(null);

  const form = useForm<z.infer<typeof certificateSchema>>({
    resolver: zodResolver(certificateSchema),
    defaultValues: { icon: 'Award', name: '', issuingOrganization: '', url: '' },
  });

  const onSubmit = (values: z.infer<typeof certificateSchema>) => {
    try {
      if (editingId) {
        const docRef = doc(firestore, 'certificates', editingId);
        updateDocumentNonBlocking(docRef, values);
        toast({ title: 'Certificate updated!' });
        setEditingId(null);
      } else {
        addDocumentNonBlocking(certificatesRef, values);
        toast({ title: 'Certificate added!' });
      }
      form.reset();
    } catch (error) {
      toast({ variant: 'destructive', title: 'Error', description: 'Could not save certificate.' });
    }
  };

  const handleEdit = (certificate: Certificate) => {
    setEditingId(certificate.id);
    form.reset(certificate);
  };

  const handleDelete = (certificateId: string, certificateName: string) => {
    if (window.confirm(`Are you sure you want to delete "${certificateName}"?`)) {
      try {
        deleteDocumentNonBlocking(doc(firestore, 'certificates', certificateId));
        toast({ title: 'Certificate deleted.' });
      } catch (error) {
        toast({ variant: 'destructive', title: 'Error', description: 'Could not delete certificate.' });
      }
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    form.reset();
  };

  return (
    <div className="container mx-auto py-10">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>{editingId ? 'Edit Certificate' : 'Add New Certificate'}</CardTitle>
          <CardDescription>Add, edit, or remove your professional certificates and awards.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField control={form.control} name="name" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Certificate Name</FormLabel>
                    <FormControl><Input placeholder="e.g. Certified Cloud Practitioner" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField control={form.control} name="issuingOrganization" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Issuing Organization</FormLabel>
                    <FormControl><Input placeholder="e.g. Amazon Web Services" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="icon"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Icon Name (from Lucide)</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Award, Sparkles" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField control={form.control} name="url" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Credential URL</FormLabel>
                    <FormControl><Input placeholder="https://example.com/credential/123" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex gap-2">
                <Button type="submit">{editingId ? 'Update' : 'Add'}</Button>
                {editingId && <Button variant="ghost" onClick={cancelEdit}><X/></Button>}
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Existing Certificates</h2>
        {isLoading && Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-20 w-full" />)}
        {certificates?.map(cert => {
          const Icon = (LucideIcons as any)[cert.icon] || LucideIcons.HelpCircle;
          return (
            <Card key={cert.id} className="flex items-center p-4">
              <Icon className="h-8 w-8 mr-4 text-primary" />
              <div className="flex-1">
                <h3 className="font-bold">{cert.name}</h3>
                <p className="text-sm text-muted-foreground">{cert.issuingOrganization}</p>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon" onClick={() => handleEdit(cert)}><Edit className="h-4 w-4" /></Button>
                <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" onClick={() => handleDelete(cert.id, cert.name)}><Trash2 className="h-4 w-4" /></Button>
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  );
}
