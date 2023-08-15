<script lang="ts">
	import { goto } from '$app/navigation';
	import type { PageData } from "./$types";
	export let data: PageData;
	let movieName = '';

	const createMoviesUrl = `${data.url}/movies`
	async function handleSubmit() {
		// Make a POST request with the input value
		const response = await fetch(createMoviesUrl, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ name: movieName })
		});

		// Check if the request was successful
		if (response.ok) {
			goto('/');
		} else {
			console.error('Failed to submit the value');
		}
	}
</script>

<svelte:head>
	<title>About</title>
	<meta name="description" content="Create Movie" />
</svelte:head>

<div class="text-column">
	<h1>Create Movie</h1>

	<p>Please enter the name of the movie bellow:</p>

	<form on:submit|preventDefault={handleSubmit}>
		<input type="text" id="movieName" bind:value={movieName} required />
		<button type="submit">Submit</button>
	</form>
</div>
