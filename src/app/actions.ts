'use server';

import { z } from 'zod';
import { summarizeContactForm, type ContactFormInput } from '@/ai/flows/contact-form-summary';

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

    // In a real application, you would save this data to Firestore.
    // e.g., await addDoc(collection(db, "contacts"), { ...input, createdAt: serverTimestamp() });
    console.log('Form data submitted:', input);

    const { summary } = await summarizeContactForm(input);
    console.log('AI Summary:', summary);
    // This summary could be used for an admin email notification.

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
