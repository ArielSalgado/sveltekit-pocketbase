<script lang="ts">
	import type { ActionData } from './$types';
	import { applyAction, enhance } from '$app/forms';

	export let form: ActionData;
	let loading: boolean = false;
</script>

<section>
	<h1>Login</h1>

	<form
		method="post"
		action="?/login"
		use:enhance={() => {
			// Reset the errors on load
			form = null;

			// Set loading to true when the form is submitted
			loading = true;
			return async ({ result }) => {
				await applyAction(result);

				// Set loading to false when the request is done
				loading = false;
			};
		}}
	>
		<div>
			<label for="email">Email</label>
			<input type="email" name="email" placeholder="Enter your email" />
			<p>
				{#if form?.errors?.email}
					{form.errors.email[0]}
				{/if}
			</p>
		</div>

		<div>
			<label for="password">Password</label>
			<input type="password" name="password" placeholder="Enter your password" />
			<p>
				{#if form?.errors?.password}
					{form.errors.password[0]}
				{/if}
			</p>
		</div>

		<button type="submit">
			{#if loading}
				<svg
					class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
				>
					<circle
						class="opacity-25"
						cx="12"
						cy="12"
						r="10"
						stroke="currentColor"
						stroke-width="4"
					/>
					<path
						class="opacity-75"
						fill="currentColor"
						d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
					/>
				</svg>
				Processing...
			{:else}
				Login
			{/if}
		</button>

		{#if form?.notRegistered}
			<span>Please verify your account credentials.</span>
		{/if}
	</form>
</section>

<style lang="postcss" scoped>
	section {
		@apply max-w-xl flex flex-col items-center gap-y-2 mx-auto my-6;
	}

	h1 {
		@apply text-3xl font-bold text-center mb-1.5;
	}

	form {
		@apply w-full flex flex-col gap-y-4 px-8;
	}

	div {
		@apply w-full;
	}

	label {
		@apply block text-sm font-medium text-gray-700;
	}

	input {
		@apply w-full py-1.5 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent;
	}

	p {
		@apply h-3 text-sm italic text-orange-600/75;
	}

	button {
		@apply w-full inline-flex place-content-center items-center py-1.5 px-3 mt-3 border border-transparent rounded-md shadow-sm text-white bg-orange-600 hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent;
	}

	span {
		@apply h-3 text-sm text-center text-orange-600/75;
	}
</style>
