'use client';

import { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

function SubmitButton({ isSubmitting }: { isSubmitting: boolean }) {
  return (
    <Button type="submit" disabled={isSubmitting} className="w-full">
      {isSubmitting ? 'Sending...' : 'Send Message'}
    </Button>
  );
}

export function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!formRef.current) {
      setIsSubmitting(false);
      return;
    }

    emailjs
      .sendForm(
        'service_y5sibpg', // Your Service ID
        'template_xyayy5v', // Your Template ID
        formRef.current,
        'vOgy-4DFySh9qeSrn' // Your Public Key
      )
      .then(
        () => {
          toast({
            title: 'Success!',
            description: 'Your message has been sent.',
          });
          formRef.current?.reset();
        },
        (error) => {
          toast({
            variant: 'destructive',
            title: 'Error',
            description: 'Failed to send message. Please try again.',
          });
          console.error('EmailJS Error:', error.text);
        }
      )
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <Card>
      <CardContent className="p-6">
        <form ref={formRef} onSubmit={sendEmail} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="from_name">Name</Label>
              <Input id="from_name" name="from_name" placeholder="Your Name" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="from_email">Email</Label>
              <Input id="from_email" name="from_email" type="email" placeholder="your@email.com" required />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea id="message" name="message" placeholder="How can I help you?" rows={5} required />
          </div>
          <div>
            <SubmitButton isSubmitting={isSubmitting} />
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
