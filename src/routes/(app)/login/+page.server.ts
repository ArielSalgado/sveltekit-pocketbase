import type { Actions } from './$types';
import { redirect } from '@sveltejs/kit';
import { ZodError } from 'zod';
import { LoginSchema, type LoginSchemaT } from '$utils/zod';
import delay from 'delay';

export const actions = {
	login: async ({ request, locals }) => {
		// Get the form data
		const formData = Object.fromEntries(await request.formData());

		// Simulate a slow connection
		await delay(2000);

		try {
			// Validate the form data
			const data: LoginSchemaT = LoginSchema.parse(formData);

			// Log the user in
			await locals.pb.collection('users').authWithPassword(data.email, data.password);
		} catch (err: unknown) {
			// If the error is a ZodError, return the errors
			if (err instanceof ZodError) {
				const { fieldErrors: errors } = err.flatten();
				return {
					errors: errors
				};
			} else {
				// Otherwise, return that the user is not registered
				return {
					notRegistered: true
				};
			}
		}

		// Redirect to the dashboard
		throw redirect(303, '/dashboard');
	}
} satisfies Actions;
