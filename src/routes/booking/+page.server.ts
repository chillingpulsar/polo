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
	bookingEvent: async ({ request }) => {
		const form = await superValidate(request, zod(bookingSchema));

		if (!form.valid) return fail(400, { form });

		console.log(form.data);

		return { form, msg: 'Event booked successfully' };
	}
};
