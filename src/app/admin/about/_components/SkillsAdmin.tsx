'use client';
import { useState } from 'react';
import { useCollection, useFirestore, addDocumentNonBlocking, updateDocumentNonBlocking, deleteDocumentNonBlocking, useMemoFirebase } from '@/firebase';
import { collection, doc } from 'firebase/firestore';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Skill } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Trash2, Edit, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';

const skillSchema = z.object({
  name: z.string().min(1, 'Skill name is required.'),
  level: z.number().min(0).max(100, 'Level must be between 0 and 100.'),
});

export function SkillsAdmin() {
  const firestore = useFirestore();
  const skillsRef = useMemoFirebase(() => collection(firestore, 'skills'), [firestore]);
  const { data: skills, isLoading } = useCollection<Skill>(skillsRef);
  const { toast } = useToast();

  const [editingSkillId, setEditingSkillId] = useState<string | null>(null);

  const form = useForm<z.infer<typeof skillSchema>>({
    resolver: zodResolver(skillSchema),
    defaultValues: { name: '', level: 50 },
  });

  const handleAddNewSkill = (values: z.infer<typeof skillSchema>) => {
    try {
      addDocumentNonBlocking(skillsRef, values);
      toast({ title: 'Skill added!', description: `${values.name} has been added.` });
      form.reset();
    } catch (error) {
      toast({ variant: 'destructive', title: 'Error', description: 'Could not add skill.' });
    }
  };

  const handleUpdateSkill = (skillId: string, values: z.infer<typeof skillSchema>) => {
    try {
      const skillDocRef = doc(firestore, 'skills', skillId);
      updateDocumentNonBlocking(skillDocRef, values);
      toast({ title: 'Skill updated!', description: `${values.name} has been updated.` });
      setEditingSkillId(null);
      form.reset();
    } catch (error) {
      toast({ variant: 'destructive', title: 'Error', description: 'Could not update skill.' });
    }
  };

  const handleDeleteSkill = (skillId: string, skillName: string) => {
    if (window.confirm(`Are you sure you want to delete the skill "${skillName}"?`)) {
      try {
        const skillDocRef = doc(firestore, 'skills', skillId);
        deleteDocumentNonBlocking(skillDocRef);
        toast({ title: 'Skill deleted!', description: `${skillName} has been removed.` });
      } catch (error) {
        toast({ variant: 'destructive', title: 'Error', description: 'Could not delete skill.' });
      }
    }
  };
  
  const startEditing = (skill: Skill) => {
    setEditingSkillId(skill.id);
    form.reset({ name: skill.name, level: skill.level });
  };
  
  const cancelEditing = () => {
    setEditingSkillId(null);
    form.reset({ name: '', level: 50 });
  }

  const sortedSkills = skills ? [...skills].sort((a, b) => b.level - a.level) : [];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Manage Skills</CardTitle>
        <CardDescription>Add, edit, or delete your skills.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(editingSkillId ? (values) => handleUpdateSkill(editingSkillId, values) : handleAddNewSkill)}
            className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Skill Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. React" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="level"
              render={({ field }) => (
                <FormItem className="w-full flex-1">
                  <FormLabel>Proficiency: {field.value}%</FormLabel>
                  <FormControl>
                    <Slider
                      min={0}
                      max={100}
                      step={5}
                      value={[field.value]}
                      onValueChange={(vals) => field.onChange(vals[0])}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-2 pt-8">
              <Button type="submit">{editingSkillId ? 'Update Skill' : 'Add Skill'}</Button>
              {editingSkillId && <Button variant="ghost" onClick={cancelEditing}><X className="h-4 w-4"/></Button>}
            </div>
          </form>
        </Form>
        <div className="space-y-4">
          {isLoading && Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-12 w-full" />)}
          {sortedSkills.map((skill) => (
            <div key={skill.id} className="flex items-center justify-between rounded-lg border p-3">
              <div className="flex-1">
                <p className="font-medium">{skill.name}</p>
                <p className="text-sm text-muted-foreground">{skill.level}% Proficiency</p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" onClick={() => startEditing(skill)}>
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" onClick={() => handleDeleteSkill(skill.id, skill.name)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
