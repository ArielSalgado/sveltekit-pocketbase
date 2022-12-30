import { z } from 'zod';

export const RegisterSchema = z.object({
	username: z.string().min(3, { message: 'Username must be at least 3 characters' }),
	email: z.string().email({ message: 'Invalid email' }),
	birthday: z.coerce.date({ invalid_type_error: 'Birthday is invalid' }),
	password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
	passwordConfirm: z.string().min(6, { message: 'Password must be at least 6 characters' })
});

export const RegisterSchemaValidator = RegisterSchema.superRefine(
	({ passwordConfirm, password }, ctx) => {
		if (passwordConfirm !== password) {
			ctx.addIssue({
				code: 'custom',
				message: "The passwords don't match",
				path: ['passwordConfirm']
			});
		}
	}
);

export const LoginSchema = RegisterSchema.pick({ email: true, password: true });

export type RegisterSchemaT = z.infer<typeof RegisterSchema>;
export type LoginSchemaT = z.infer<typeof LoginSchema>;
