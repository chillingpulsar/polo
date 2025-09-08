import { superValidate } from 'sveltekit-superforms';
import type { Actions, PageServerLoad } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import { contactUsSchema } from './(components)/(contact)/schema';
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async () => {
	return {
		contactUsForm: await superValidate(zod(contactUsSchema))
	};
};

export const actions: Actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, zod(contactUsSchema));

		if (!form.valid) {
			return fail(400, { form });
		}

		return { form, msg: 'Message sent successfully' };
	}
};
