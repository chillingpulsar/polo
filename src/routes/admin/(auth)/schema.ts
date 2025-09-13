import { z } from 'zod';

export const adminLoginSchema = z.object({
	email: z.string().email({ message: 'Must enter a valid email.' }),
	password: z.string().min(1, { message: 'Must enter a valid password.' })
});

export type AdminLoginSchema = z.infer<typeof adminLoginSchema>;
