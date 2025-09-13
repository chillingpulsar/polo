import { superValidate } from 'sveltekit-superforms';
import type { PageServerLoad } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import { adminLoginSchema } from './schema';
import { fail, type Actions } from '@sveltejs/kit';

export const load: PageServerLoad = async () => {
	return {
		adminLoginForm: await superValidate(zod(adminLoginSchema))
	};
};

export const actions: Actions = {
	adminLoginEvent: async ({ request, locals: { supabase } }) => {
		const form = await superValidate(request, zod(adminLoginSchema));

		if (!form.valid) return fail(400, { form });

		const { error } = await supabase.auth.signInWithPassword({
			email: form.data.email,
			password: form.data.password
		});

		if (error) return fail(401, { form, msg: error.message });

		return { form, msg: 'Logged in successfully' };
	}
};
