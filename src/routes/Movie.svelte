<script lang="ts">
	export let movie;
	export let movieApiUrl;

	let internalLikes = movie.likes;

	const patchMoviesUrl = `${movieApiUrl}/movies/${movie.sk}/likes`;
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

<div class="card-container">
	<div class="title">{movie.name}</div>
	<div class="likes">Likes: {internalLikes}</div>
	<div class="buttons">
		<button on:click={() => handleLike()}>Like</button>
	  </div>
</div>

<style>
	.card-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 300px;
		height: 200px;
		border: 1px solid #ccc;
		padding: 20px;
		margin: auto;
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
	}
	.title {
		text-align: center;
		font-size: 24px;
		margin-bottom: 10px;
	}
	.likes {
		font-size: 18px;
		margin: 10px 0;
	}
	.buttons {
		display: flex;
		gap: 10px;
	}
	button {
		cursor: pointer;
		padding: 10px;
		border: none;
		background-color: #007bff;
		color: white;
		font-size: 16px;
		transition: background-color 0.3s;
	}
	button:hover {
		background-color: #0056b3;
	}
</style>
