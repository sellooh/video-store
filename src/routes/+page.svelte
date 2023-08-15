<script lang="ts">
	import type { PageData } from "./$types";
	import Movie from './Movie.svelte';

	export let data: PageData;

	const listMoviesUrl = `${data.url}/movies`
	const moviesPromise = fetch(listMoviesUrl).then(response => response.json());
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<h1>Video Store</h1>

	{#await moviesPromise then movies}
		<ul>
			{#each movies as movie}
				<li>
					<Movie movie={movie} movieApiUrl={data.url} />
				</li>
			{/each}
		</ul>
	{/await}
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}

	h1 {
		width: 100%;
	}

	.welcome {
		display: block;
		position: relative;
		width: 100%;
		height: 0;
		padding: 0 0 calc(100% * 495 / 2048) 0;
	}

	.welcome img {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		display: block;
	}
</style>
