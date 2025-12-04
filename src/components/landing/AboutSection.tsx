import Image from 'next/image';
import { personalData, skills } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

export function AboutSection() {
  return (
    <section id="about" className="py-16 md:py-24">
      <div className="container">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-8">
          <div className="lg:col-span-1">
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                {personalData.profilePhoto && (
                  <Image
                    src={personalData.profilePhoto.imageUrl}
                    alt={personalData.name}
                    width={400}
                    height={400}
                    className="h-auto w-full object-cover"
                    data-ai-hint={personalData.profilePhoto.imageHint}
                    priority
                  />
                )}
              </CardContent>
            </Card>
          </div>
          <div className="lg:col-span-2">
            <h2 className="font-headline text-3xl font-bold text-primary md:text-4xl">About Me</h2>
            <p className="mt-4 text-base text-foreground/80 md:text-lg">{personalData.bio}</p>

            <div className="mt-8">
              <h3 className="text-2xl font-semibold">My Skills</h3>
              <div className="mt-4 grid grid-cols-1 gap-x-8 gap-y-4 md:grid-cols-2">
                {skills.map((skill) => (
                  <div key={skill.name}>
                    <div className="mb-1 flex justify-between">
                      <span className="font-medium">{skill.name}</span>
                      <span className="text-sm text-muted-foreground">{skill.level}%</span>
                    </div>
                    <Progress value={skill.level} aria-label={`${skill.name} proficiency`} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
