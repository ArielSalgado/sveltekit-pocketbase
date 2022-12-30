import type { Actions } from './$types';
import { error, redirect } from '@sveltejs/kit';
import { ZodError } from 'zod';
import { RegisterSchemaValidator, type RegisterSchemaT } from '$utils/zod';
import delay from 'delay';

export const actions = {
	register: async ({ request, locals }) => {
		// Get the form data
		const formData = Object.fromEntries(await request.formData());

		// Simulate a slow connection
		await delay(2000);

		try {
			// Validate the form data
			const data: RegisterSchemaT = RegisterSchemaValidator.parse(formData);

			// Create the user
			await locals.pb.collection('users').create({ ...data });
		} catch (err: unknown) {
			// If the error is a ZodError, return the errors
			if (err instanceof ZodError) {
				const { fieldErrors: errors } = err.flatten();
				return {
					errors: errors
				};
			} else {
				// Otherwise, throw a 500 error
				throw error(500, 'Something went wrong logging in.');
			}
		}

		// Redirect to the login page
		throw redirect(303, '/login');
	}
} satisfies Actions;
