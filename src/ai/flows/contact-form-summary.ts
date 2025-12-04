'use server';

/**
 * @fileOverview Summarizes contact form submissions using GenAI.
 *
 * - summarizeContactForm - A function that handles the summarization of contact form submissions.
 * - ContactFormInput - The input type for the summarizeContactForm function.
 * - ContactFormOutput - The return type for the summarizeContactForm function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ContactFormInputSchema = z.object({
  name: z.string().describe('The name of the person submitting the form.'),
  email: z.string().email().describe('The email address of the person submitting the form.'),
  message: z.string().describe('The message content from the contact form.'),
});
export type ContactFormInput = z.infer<typeof ContactFormInputSchema>;

const ContactFormOutputSchema = z.object({
  summary: z.string().describe('A brief summary of the contact form submission.'),
});
export type ContactFormOutput = z.infer<typeof ContactFormOutputSchema>;

export async function summarizeContactForm(input: ContactFormInput): Promise<ContactFormOutput> {
  return summarizeContactFormFlow(input);
}

const prompt = ai.definePrompt({
  name: 'contactFormSummaryPrompt',
  input: {schema: ContactFormInputSchema},
  output: {schema: ContactFormOutputSchema},
  prompt: `Summarize the following contact form submission in one sentence:\n\nName: {{{name}}}\nEmail: {{{email}}}\nMessage: {{{message}}}`,
});

const summarizeContactFormFlow = ai.defineFlow(
  {
    name: 'summarizeContactFormFlow',
    inputSchema: ContactFormInputSchema,
    outputSchema: ContactFormOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
