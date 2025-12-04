'use client'
import { useState } from 'react';
import { useCollection, useFirestore, addDocumentNonBlocking, updateDocumentNonBlocking, deleteDocumentNonBlocking, useMemoFirebase } from '@/firebase';
import { collection, doc } from 'firebase/firestore';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Service } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Trash2, Edit, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';
import * as LucideIcons from 'lucide-react';

const serviceSchema = z.object({
  icon: z.string().min(1, 'Icon name is required.'),
  title: z.string().min(1, 'Title is required.'),
  description: z.string().min(1, 'Description is required.'),
});

const iconList = Object.keys(LucideIcons).filter(key => key.endsWith('Icon') || /^[A-Z]/.test(key));

export default function ServicesAdminPage() {
  const firestore = useFirestore();
  const servicesRef = useMemoFirebase(() => collection(firestore, 'services'), [firestore]);
  const { data: services, isLoading } = useCollection<Service>(servicesRef);
  const { toast } = useToast();

  const [editingId, setEditingId] = useState<string | null>(null);

  const form = useForm<z.infer<typeof serviceSchema>>({
    resolver: zodResolver(serviceSchema),
    defaultValues: { icon: '', title: '', description: '' },
  });

  const onSubmit = (values: z.infer<typeof serviceSchema>) => {
    try {
      if (editingId) {
        const docRef = doc(firestore, 'services', editingId);
        updateDocumentNonBlocking(docRef, values);
        toast({ title: 'Service updated!' });
        setEditingId(null);
      } else {
        addDocumentNonBlocking(servicesRef, values);
        toast({ title: 'Service added!' });
      }
      form.reset();
    } catch (error) {
      toast({ variant: 'destructive', title: 'Error', description: 'Could not save service.' });
    }
  };

  const handleEdit = (service: Service) => {
    setEditingId(service.id);
    form.reset(service);
  };

  const handleDelete = (serviceId: string, serviceTitle: string) => {
    if (window.confirm(`Are you sure you want to delete "${serviceTitle}"?`)) {
      try {
        deleteDocumentNonBlocking(doc(firestore, 'services', serviceId));
        toast({ title: 'Service deleted.' });
      } catch (error) {
        toast({ variant: 'destructive', title: 'Error', description: 'Could not delete service.' });
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
          <CardTitle>{editingId ? 'Edit Service' : 'Add New Service'}</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="icon"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Icon Name (from Lucide)</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Code, Paintbrush" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField control={form.control} name="title" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl><Input placeholder="Service Title" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField control={form.control} name="description" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl><Textarea placeholder="Service description..." {...field} /></FormControl>
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
        <h2 className="text-2xl font-bold">Existing Services</h2>
        {isLoading && Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-20 w-full" />)}
        {services?.map(service => {
          const Icon = (LucideIcons as any)[service.icon] || LucideIcons.HelpCircle;
          return (
            <Card key={service.id} className="flex items-center p-4">
              <Icon className="h-8 w-8 mr-4 text-primary" />
              <div className="flex-1">
                <h3 className="font-bold">{service.title}</h3>
                <p className="text-sm text-muted-foreground">{service.description}</p>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon" onClick={() => handleEdit(service)}><Edit className="h-4 w-4" /></Button>
                <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" onClick={() => handleDelete(service.id, service.title)}><Trash2 className="h-4 w-4" /></Button>
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  );
}
