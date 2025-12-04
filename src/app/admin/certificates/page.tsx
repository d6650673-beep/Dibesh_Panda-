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
import Image from 'next/image';

const certificateSchema = z.object({
  name: z.string().min(1, 'Certificate name is required.'),
  issuingOrganization: z.string().min(1, 'Issuing organization is required.'),
  year: z.string().min(4, 'Year is required.'),
  imageUrl: z.string().url('A valid image URL is required.'),
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
    defaultValues: { name: '', issuingOrganization: '', year: '', imageUrl: '', url: '' },
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
      form.reset({ name: '', issuingOrganization: '', year: '', imageUrl: '', url: '' });
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
    form.reset({ name: '', issuingOrganization: '', year: '', imageUrl: '', url: '' });
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
              <FormField control={form.control} name="year" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Year</FormLabel>
                    <FormControl><Input placeholder="e.g. 2025" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="imageUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Certificate Image URL</FormLabel>
                    <FormControl>
                      <Input placeholder="https://example.com/certificate.png" {...field} />
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {isLoading && Array.from({ length: 2 }).map((_, i) => <Skeleton key={i} className="h-64 w-full" />)}
            {certificates?.map(cert => (
                <Card key={cert.id} className="flex flex-col">
                    <div className="relative aspect-[4/3] w-full">
                        {cert.imageUrl ? (
                          <Image src={cert.imageUrl} alt={cert.name} layout="fill" objectFit="cover" className="rounded-t-lg" />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center rounded-t-lg bg-muted">
                            <span className="text-sm text-muted-foreground">No Image</span>
                          </div>
                        )}
                    </div>
                    <CardContent className="p-4 flex-1 flex flex-col">
                        <h3 className="font-bold">{cert.name}</h3>
                        <p className="text-sm text-muted-foreground">{cert.issuingOrganization} &bull; {cert.year}</p>
                    </CardContent>
                    <CardContent className="p-4 pt-0">
                        <div className="flex gap-2">
                            <Button variant="outline" size="sm" onClick={() => handleEdit(cert)}><Edit className="h-4 w-4 mr-2" /> Edit</Button>
                            <Button variant="destructive" size="sm" onClick={() => handleDelete(cert.id, cert.name)}><Trash2 className="h-4 w-4 mr-2" /> Delete</Button>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
      </div>
    </div>
  );
}
