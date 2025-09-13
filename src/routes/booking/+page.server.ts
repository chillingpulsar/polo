import { zod } from 'sveltekit-superforms/adapters';
import type { Actions, PageServerLoad } from './$types';
import { bookingSchema } from './schema';
import { superValidate } from 'sveltekit-superforms';
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async () => {
	return {
		bookingForm: await superValidate(zod(bookingSchema))
	};
};

export const actions: Actions = {
	bookingEvent: async ({ request, locals }) => {
		const form = await superValidate(request, zod(bookingSchema));

		if (!form.valid) return fail(400, { form });

		const htmlTemplate = `
			<!doctype html>
			<html lang="en">
				<head>
					<meta charset="UTF-8" />
					<meta name="viewport" content="width=device-width, initial-scale=1.0" />
					<title>Booking Confirmation</title>
					<style>
						body {
							font-family: Arial, sans-serif;
							line-height: 1.6;
							color: #333;
							max-width: 600px;
							margin: 0 auto;
							padding: 20px;
						}
						.header {
							background-color: #f4f4f4;
							padding: 20px;
							border-radius: 8px;
							margin-bottom: 20px;
						}
						.content {
							background-color: #fff;
							padding: 20px;
							border: 1px solid #ddd;
							border-radius: 8px;
						}
						.booking-details {
							background-color: #f9f9f9;
							padding: 15px;
							border-radius: 5px;
							margin: 15px 0;
						}
						.booking-details p {
							margin: 8px 0;
						}
						.highlight {
							font-weight: bold;
							color: #2c5aa0;
						}
					</style>
				</head>
				<body>
					<div class="header">
						<h1>🎉 Event Booking Confirmation</h1>
					</div>

					<div class="content">
						<h2>Hello, ${form.data.email}!</h2>
						<p>Your event has been booked successfully. Here are your booking details:</p>

						<div class="booking-details">
							<p><span class="highlight">Event Type:</span>${form.data.event} </p>
							<p><span class="highlight">Date:</span> ${form.data.date}</p>
							<p><span class="highlight">Time:</span> ${form.data.time}</p>
							<p><span class="highlight">Base Rate:</span> ${form.data.base_rate} guests</p>
							<p><span class="highlight">Phone Number:</span> ${form.data.phone_number}</p>
							<p><span class="highlight">Add-ons:</span> ${form.data.add_ons}</p>
							<p><span class="highlight">Total Price:</span> ${form.data.total_price.toLocaleString()} Php</p>
						</div>

						<p>Please proceed to the site on your booked date and provide the transaction id.</p>

						<p>Thank you for choosing our venue!</p>

						<p>Transaction ID: ${crypto.randomUUID()}</p>
					</div>
				</body>
			</html>
		`;

		const { success, error } = await locals.sendMail({
			to: form.data.email,
			html: htmlTemplate,
			subject: `${form.data.event} Event Booking Confirmation`
		});

		if (!success) return fail(401, { form, error });
		return { form, msg: 'Booked successfully please check your email for the details.' };
	}
};
