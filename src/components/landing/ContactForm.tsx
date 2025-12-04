'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { useEffect } from 'react';
import { submitContact, type ContactFormState } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? 'Sending...' : 'Send Message'}
    </Button>
  );
}

export function ContactForm() {
  const initialState: ContactFormState = { message: '', success: false };
  const [state, formAction] = useFormState(submitContact, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state.message) {
      if (state.success) {
        toast({
          title: 'Success!',
          description: state.message,
        });
      } else {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: state.message,
        });
      }
    }
  }, [state, toast]);

  return (
    <Card>
      <CardContent className="p-6">
        <form action={formAction} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" placeholder="Your Name" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" placeholder="your@email.com" required />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea id="message" name="message" placeholder="How can I help you?" rows={5} required />
          </div>
          <div>
            <SubmitButton />
          </div>
          {state.issues && (
            <div className="text-sm text-destructive">
              <ul>
                {state.issues.map((issue) => (
                  <li key={issue}>- {issue}</li>
                ))}
              </ul>
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  );
}
