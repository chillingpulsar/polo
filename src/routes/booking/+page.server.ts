import { zod } from 'sveltekit-superforms/adapters';
import type { Actions, PageServerLoad } from './$types';
import { bookingSchema } from './schema';
import { superValidate } from 'sveltekit-superforms';
import { fail } from '@sveltejs/kit';
import { join } from 'path';
import { readFileSync } from 'fs';
import { addOns, baseRates } from '$lib';
import { parsePrice } from '$lib/utils';

const generateHTMLTemplate = <T extends Record<string, string>>(data: T, path: string): string => {
	const templatePath = join(process.cwd(), path);
	let template = readFileSync(templatePath, 'utf-8');

	Object.entries(data).forEach(([key, value]) => {
		template = template.replace(RegExp(`{{${key}}}`, 'g'), value);
	});

	return template;
};

export const load: PageServerLoad = async () => {
	return {
		bookingForm: await superValidate(zod(bookingSchema))
	};
};

export const actions: Actions = {
	bookingEvent: async ({ request, locals }) => {
		const form = await superValidate(request, zod(bookingSchema));

		if (!form.valid) return fail(400, { form });

		const calculateTotal = () => {
			if (form.data.add_ons || form.data.base_rate) {
				const addOnsPrice = addOns.find((addOn) => addOn.id === form.data.add_ons)?.price;
				const baseRatePrice = baseRates.find(
					(baseRate) => baseRate.id === form.data.base_rate
				)?.price;

				const addOnsParsed = addOnsPrice ? parsePrice(addOnsPrice) : 0;
				const baseRateParsed = baseRatePrice ? parsePrice(baseRatePrice) : 0;

				return addOnsParsed + baseRateParsed;
			}

			return 0;
		};

		const emailContent = generateHTMLTemplate(
			{
				...form.data,
				totalPrice: calculateTotal().toLocaleString(),
				transaction_id: crypto.randomUUID()
			},
			'src/lib/mailing-templates/success-booking/success-booking.html'
		);

		const { success, error } = await locals.sendMail({
			to: form.data.email,
			html: emailContent,
			subject: `${form.data.event} Event Booking Confirmation`
		});

		if (!success) return fail(401, { form, error });
		return { form, msg: 'Booked successfully please check your email for the details.' };
	}
};
