import { z } from 'zod';

export const bookingsSchema = z.object({
	id: z.string(),
	transaction_id: z.string(),
	mobile_number: z.string(),
	booking_date: z.string(),
	booking_time: z.string(),
	booked_event: z.string(),
	base_rate: z.string(),
	add_ons: z.string(),
	total_price: z.string(),
	created_at: z.string()
});

export type BookingsSchema = z.output<typeof bookingsSchema>;
