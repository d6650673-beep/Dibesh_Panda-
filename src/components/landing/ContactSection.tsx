import { ContactForm } from '@/components/landing/ContactForm';
import { socialLinks } from '@/lib/data';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Mail, Phone } from 'lucide-react';

export function ContactSection() {
  return (
    <section id="contact" className="bg-secondary py-16 md:py-24">
      <div className="container">
        <div className="text-center">
          <h2 className="font-headline text-3xl font-bold text-primary md:text-4xl">Get In Touch</h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-foreground/80 md:text-lg">
            Have a project in mind or just want to say hello? Feel free to reach out.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-12">
          <div className="lg:col-span-2">
            <ContactForm />
          </div>
          <div className="flex flex-col gap-8">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Mail className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Email</h3>
                <p className="text-muted-foreground">Drop me a line anytime</p>
                <a href="mailto:contact@example.com" className="font-medium text-primary hover:underline">
                  contact@example.com
                </a>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Phone className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Phone</h3>
                <p className="text-muted-foreground">Let's have a chat</p>
                <a href="tel:+123456789" className="font-medium text-primary hover:underline">
                  +1 (234) 567-89
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold">On Social Media</h3>
              <div className="mt-2 flex gap-2">
                {socialLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <Button key={link.name} variant="outline" size="icon" asChild>
                      <Link href={link.url} target="_blank" rel="noopener noreferrer">
                        <Icon className="h-5 w-5" />
                        <span className="sr-only">{link.name}</span>
                      </Link>
                    </Button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
