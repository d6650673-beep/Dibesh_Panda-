'use client';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection } from 'firebase/firestore';
import type { Skill } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';
import * as LucideIcons from 'lucide-react';

export function SkillsSection() {
  const firestore = useFirestore();
  const skillsRef = useMemoFirebase(() => collection(firestore, 'skills'), [firestore]);
  const { data: skills, isLoading } = useCollection<Skill>(skillsRef);

  return (
    <section id="skills" className="py-16 md:py-24 bg-secondary">
      <div className="container">
        <div className="text-center">
            <h2 className="font-headline text-3xl font-bold md:text-4xl">
                 <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">My Skills</span>
            </h2>
             <div className="mx-auto mt-2 h-1.5 w-24 rounded-full bg-gradient-to-r from-primary to-accent" />
        </div>
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
            {isLoading && Array.from({length: 4}).map((_, i) => (
                <Card key={i}>
                    <CardContent className="p-6">
                        <div className="flex items-center gap-4">
                            <Skeleton className="h-8 w-8 rounded-md" />
                            <Skeleton className="h-6 flex-1" />
                            <Skeleton className="h-6 w-12" />
                        </div>
                        <Skeleton className="mt-4 h-2 w-full" />
                    </CardContent>
                </Card>
            ))}
            {skills?.sort((a,b) => b.level - a.level).map(skill => {
                const Icon = (LucideIcons as any)[skill.icon] || LucideIcons.Code;
                return (
                    <Card key={skill.id}>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-3">
                                    <Icon className="h-6 w-6 text-primary" />
                                    <h3 className="font-semibold">{skill.name}</h3>
                                </div>
                                <span className="text-sm font-medium text-muted-foreground">{skill.level}%</span>
                            </div>
                            <Progress value={skill.level} className="h-2" />
                        </CardContent>
                    </Card>
                )
            })}
        </div>
      </div>
    </section>
  );
}
