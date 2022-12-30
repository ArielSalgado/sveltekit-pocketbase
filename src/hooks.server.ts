import { redirect, type Handle } from '@sveltejs/kit';
import PocketBase from 'pocketbase';

export const handle = (async ({ event, resolve }) => {
	event.locals.pb = new PocketBase('http://127.0.0.1:8090');
	event.locals.pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '');

	if (event.locals.pb.authStore.isValid) {
		event.locals.user = structuredClone(event.locals.pb.authStore.model);
	} else {
		event.locals.user = undefined;
	}

	if (event.url.pathname.startsWith('/dashboard')) {
		if (!event.locals.user) {
			throw redirect(303, '/');
		}
	}

	const response = await resolve(event);
	response.headers.set('set-cookie', event.locals.pb.authStore.exportToCookie());
	return response;
}) satisfies Handle;
