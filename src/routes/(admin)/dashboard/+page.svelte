<script lang="ts">
	import { page } from '$app/stores';
	import Logo from '$assets/logo.png';
</script>

<section>
	<h1>Welcome back, {$page.data.user.username}!</h1>
	<p>Here's your dashboard.</p>

	<img src={Logo} alt="SvelteKit + PocketBase" width="141" height="136" />
</section>

<style lang="postcss" scoped>
	section {
		@apply flex flex-col items-center justify-center my-12;
	}

	h1 {
		@apply text-4xl;
	}

	img {
		@apply mt-10;
	}
</style>
