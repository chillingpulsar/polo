import { z } from 'zod';

export const bookingSchema = z.object({
	event: z.enum(['debut', 'birthday', 'anniversary', 'corporate', 'wedding', 'farewell'], {
		message: 'Must enter a valid event.'
	}),
	email: z.string().email({ message: 'Must enter a valid email.' }),
	phone_number: z.string().min(11, { message: 'Must enter a valid phone number.' }),
	base_rate: z.enum(['10-15', '20-30', '30-40', '40-50', '50-60', '60-80'], {
		message: 'Must enter a valid base rate.'
	}),
	date: z.string().min(1, { message: 'Must enter a valid date.' }),
	time: z.string().min(1, { message: 'Must enter a valid time.' }),
	add_ons: z.array(z.string()).optional(),
	total_price: z.number()
});

export type BookingSchema = z.infer<typeof bookingSchema>;
