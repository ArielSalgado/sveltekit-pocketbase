<script lang="ts">
	import SvelteLogo from '$assets/svelte.png';
	import PocketBaseLogo from '$assets/pocketbase.png';
</script>

<section>
	<span>
		<img src={SvelteLogo} alt="Svelte" width="100" height="100" />
		<h1>X</h1>
		<img src={PocketBaseLogo} alt="PocketBase" width="110" height="110" />
	</span>
	<h2>
		<a href="https://kit.svelte.dev/" target="blank">SvelteKit</a>
		<p>x</p>
		<a href="https://pocketbase.io/" target="blank">PocketBase</a>
	</h2>
	<div>
		<h3>
			This app uses Sveltekit, PocketBase, Tailwind and Zod for data validation. <br /> The template
			have the following features:
		</h3>
		<ul>
			<li>User registration</li>
			<li>User login</li>
			<li>User logout</li>
		</ul>
	</div>
</section>

<style lang="postcss" scoped>
	section {
		@apply container mx-auto flex flex-col items-center justify-center my-10;
	}

	span {
		@apply flex flex-row items-center gap-x-4 mb-3;
	}

	h1 {
		@apply text-6xl font-bold;
	}

	h2 {
		@apply flex flex-row text-2xl gap-x-2;
	}

	h2 > a {
		@apply hover:text-orange-600 hover:underline hover:underline-offset-2;
	}

	h3 {
		@apply text-xl;
	}

	div {
		@apply max-w-3xl mt-10 flex flex-col text-left items-center rounded-lg bg-gray-100 p-6 shadow-lg;
	}

	ul {
		@apply list-inside text-left mt-4;
	}

	li {
		@apply list-disc;
	}
</style>
