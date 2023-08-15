<script lang="ts">
	export let movie;
	export let movieApiUrl;

	let internalLikes = movie.likes;

	const patchMoviesUrl = `${movieApiUrl}/movies/${movie.sk}/likes`
	async function handleLike() {
		// Make a POST request with the input value
		const response = await fetch(patchMoviesUrl, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json'
			}
		});

		// Check if the request was successful
		if (response.ok) {
			internalLikes++;
		} else {
			console.error('Failed to submit the value');
		}
	}
</script>

<div class="movie">
	name: {movie.name}
	likes: {internalLikes}
	sk: {movie.sk}
	<button on:click={() => handleLike()}>
	like
	</button>
</div>

<style>
</style>
