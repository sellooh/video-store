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
		<ul class="movies-list">
			{#each movies as movie}
				<li class="movies-item">
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

	.movies-list {
		list-style: none;
		padding: 0;
	}

	.movies-list .movies-item {
		margin-bottom: 1rem;
	}
</style>
