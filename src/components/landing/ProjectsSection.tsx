import Image from 'next/image';
import Link from 'next/link';
import { projects } from '@/lib/data';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Github, ExternalLink } from 'lucide-react';

export function ProjectsSection() {
  return (
    <section id="projects" className="py-16 md:py-24">
      <div className="container">
        <div className="text-center">
          <h2 className="font-headline text-3xl font-bold text-primary md:text-4xl">My Projects</h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-foreground/80 md:text-lg">
            A selection of projects I've worked on.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <Card key={project.id} className="flex flex-col overflow-hidden">
              <CardHeader className="p-0">
                <div className="aspect-video overflow-hidden">
                  <Image
                    src={project.imageUrl}
                    alt={project.title}
                    width={600}
                    height={400}
                    className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                    data-ai-hint={project.imageHint}
                  />
                </div>
              </CardHeader>
              <div className="flex flex-1 flex-col p-6">
                <CardTitle>{project.title}</CardTitle>
                <CardDescription className="mt-2">{project.description}</CardDescription>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <Badge key={tech} variant="secondary">
                      {tech}
                    </Badge>
                  ))}
                </div>
                <CardFooter className="mt-auto p-0 pt-6">
                  <div className="flex w-full items-center justify-start gap-4">
                    {project.liveUrl && (
                      <Button variant="outline" asChild>
                        <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
                        </Link>
                      </Button>
                    )}
                    {project.githubUrl && (
                      <Button variant="ghost" asChild>
                        <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                          <Github className="mr-2 h-4 w-4" /> Source Code
                        </Link>
                      </Button>
                    )}
                  </div>
                </CardFooter>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
