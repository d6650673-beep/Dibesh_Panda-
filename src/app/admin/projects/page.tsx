'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useCollection, useFirestore, addDocumentNonBlocking, updateDocumentNonBlocking, deleteDocumentNonBlocking, useMemoFirebase } from '@/firebase';
import { collection, doc } from 'firebase/firestore';
import { Project } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Trash2, Edit, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';
import Image from 'next/image';

const projectSchema = z.object({
  title: z.string().min(1, 'Title is required.'),
  description: z.string().min(1, 'Description is required.'),
  tech: z.string().min(1, 'At least one technology is required.'), // comma separated
  imageUrl: z.string().url('A valid image URL is required.'),
  imageHint: z.string().optional(),
  liveUrl: z.string().url().optional().or(z.literal('')),
  githubUrl: z.string().url().optional().or(z.literal('')),
});

type ProjectFormValues = z.infer<typeof projectSchema>;

export default function ProjectsAdminPage() {
  const firestore = useFirestore();
  const projectsRef = useMemoFirebase(() => collection(firestore, 'projects'), [firestore]);
  const { data: projects, isLoading } = useCollection<Project>(projectsRef);
  const { toast } = useToast();

  const [editingId, setEditingId] = useState<string | null>(null);

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: { title: '', description: '', tech: '', imageUrl: '', imageHint: '', liveUrl: '', githubUrl: '' },
  });

  const onSubmit = (values: ProjectFormValues) => {
    const projectData = { ...values, tech: values.tech.split(',').map(t => t.trim()).filter(Boolean) };
    try {
      if (editingId) {
        updateDocumentNonBlocking(doc(firestore, 'projects', editingId), projectData);
        toast({ title: 'Project updated!' });
        setEditingId(null);
      } else {
        addDocumentNonBlocking(projectsRef, projectData);
        toast({ title: 'Project added!' });
      }
      form.reset();
    } catch (error) {
      toast({ variant: 'destructive', title: 'Error', description: 'Could not save project.' });
    }
  };

  const handleEdit = (project: Project) => {
    setEditingId(project.id);
    form.reset({ ...project, tech: project.tech.join(', ') });
  };

  const handleDelete = (id: string, title: string) => {
    if (window.confirm(`Delete "${title}"?`)) {
      try {
        deleteDocumentNonBlocking(doc(firestore, 'projects', id));
        toast({ title: 'Project deleted.' });
      } catch (error) {
        toast({ variant: 'destructive', title: 'Error', description: 'Could not delete project.' });
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
          <CardTitle>{editingId ? 'Edit Project' : 'Add New Project'}</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField name="title" control={form.control} render={({ field }) => ( <FormItem><FormLabel>Title</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem> )} />
              <FormField name="description" control={form.control} render={({ field }) => ( <FormItem><FormLabel>Description</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem> )} />
              <FormField name="tech" control={form.control} render={({ field }) => ( <FormItem><FormLabel>Technologies (comma-separated)</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem> )} />
              <FormField name="imageUrl" control={form.control} render={({ field }) => ( <FormItem><FormLabel>Image URL</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem> )} />
              <FormField name="imageHint" control={form.control} render={({ field }) => ( <FormItem><FormLabel>Image Hint (for AI)</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem> )} />
              <FormField name="liveUrl" control={form.control} render={({ field }) => ( <FormItem><FormLabel>Live URL</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem> )} />
              <FormField name="githubUrl" control={form.control} render={({ field }) => ( <FormItem><FormLabel>GitHub URL</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem> )} />
              <div className="flex gap-2">
                <Button type="submit">{editingId ? 'Update Project' : 'Add Project'}</Button>
                {editingId && <Button variant="ghost" onClick={cancelEdit}><X/></Button>}
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Existing Projects</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {isLoading && Array.from({length: 3}).map((_, i) => <Skeleton key={i} className="h-80 w-full" />)}
          {projects?.map(project => (
            <Card key={project.id} className="flex flex-col">
              <Image src={project.imageUrl} alt={project.title} width={400} height={250} className="aspect-video w-full rounded-t-lg object-cover" />
              <CardHeader>
                <CardTitle>{project.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-1">
                <p className="text-sm text-muted-foreground">{project.description}</p>
              </CardContent>
              <CardContent>
                 <div className="flex flex-wrap gap-2">
                    {project.tech.map(t => <span key={t} className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded-full">{t}</span>)}
                 </div>
              </CardContent>
              <CardContent className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => handleEdit(project)}><Edit className="h-4 w-4 mr-2" /> Edit</Button>
                <Button variant="destructive" size="sm" onClick={() => handleDelete(project.id, project.title)}><Trash2 className="h-4 w-4 mr-2" /> Delete</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
