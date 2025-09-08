import { z } from 'zod';

export const contactUsSchema = z.object({
	full_name: z.string().min(1, { message: 'Full name is required' }),
	email: z.string().email({ message: 'Invalid email address' }),
	your_subject: z.string().min(1, { message: 'Subject is required' }),
	message: z.string().min(1, { message: 'Message is required' })
});

export type ContactUsSchema = z.infer<typeof contactUsSchema>;
