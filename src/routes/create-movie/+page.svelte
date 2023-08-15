<script lang="ts">
	import { goto } from '$app/navigation';
	import type { PageData } from './$types';
	export let data: PageData;
	let movieName = '';

	const createMoviesUrl = `${data.url}/movies`;
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
	<title>Create Movie</title>
	<meta name="description" content="Create Movie" />
</svelte:head>

<div class="text-column">
	<h1>Create Movie</h1>

	<p>Please enter the name of the movie bellow:</p>

	<form class="input-container" on:submit|preventDefault={handleSubmit}>
		<label for="movieName">Movie</label>
		<input type="text" id="movieName" bind:value={movieName} required />
		<button type="submit">Submit</button>
	</form>
</div>

<style>
	.input-container {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 10px;
	}
	button,
	input[type='submit'] {
		cursor: pointer;
		padding: 10px;
		border: none;
		background-color: #007bff;
		color: white;
		font-size: 16px;
		transition: background-color 0.3s;
	}
	button:hover,
	input[type='submit']:hover {
		background-color: #0056b3;
	}
	input[type='text'] {
		padding: 10px;
		width: 100%;
		border: 1px solid #ccc;
	}
</style>
