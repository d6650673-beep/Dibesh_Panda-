'use server';

import { z } from 'zod';
import { summarizeContactForm, type ContactFormInput } from '@/ai/flows/contact-form-summary';
import { getFirestore } from 'firebase-admin/firestore';
import { initializeServerApp } from '@/firebase/server';
import { collection, serverTimestamp } from 'firebase/firestore';


const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  email: z.string().email('Please enter a valid email address.'),
  message: z.string().min(10, 'Message must be at least 10 characters long.'),
});

export type ContactFormState = {
  message: string;
  fields?: Record<string, string>;
  issues?: string[];
  success: boolean;
};

export async function submitContact(
  prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const validatedFields = contactSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    message: formData.get('message'),
  });

  if (!validatedFields.success) {
    const { errors } = validatedFields.error;
    return {
      message: 'Please fix the errors below.',
      issues: errors.map((e) => e.message),
      fields: {
        name: formData.get('name') as string,
        email: formData.get('email') as string,
        message: formData.get('message') as string,
      },
      success: false,
    };
  }

  try {
    const input: ContactFormInput = validatedFields.data;
    
    // Use server-side initialization
    const app = await initializeServerApp();
    const firestore = getFirestore(app);

    await firestore.collection("contactFormSubmissions").add({ 
        ...input, 
        submissionDate: serverTimestamp() 
    });

    // We aren't awaiting this, it can run in the background
    summarizeContactForm(input).then(({ summary }) => {
      console.log('AI Summary:', summary);
      // This summary could be used for an admin email notification, etc.
    });

    return {
      message: `Thanks, ${input.name}! Your message has been received.`,
      success: true,
    };
  } catch (error) {
    console.error('Error submitting contact form:', error);
    return {
      message: 'An unexpected error occurred. Please try again.',
      success: false,
    };
  }
}
