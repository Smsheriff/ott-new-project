document.addEventListener('DOMContentLoaded', () => {
    const movieDetailsSection = document.getElementById('movie-details-section');
    const selectedMovie = JSON.parse(localStorage.getItem('selectedMovie'));
  
    if (!selectedMovie) {
      movieDetailsSection.innerHTML = `<p>No movie details found. Please select a movie from the main page.</p>`;
      return;
    }
  
    const movieHTML = `
      <div class="movie-details-container">
        <img src="${selectedMovie.PosterImage}" alt="${selectedMovie.title}" class="movie-poster">
        <div class="movie-info">
          <h1>${selectedMovie.title}</h1>
          <p>${selectedMovie.description}</p>
          <p><strong>Genre:</strong> ${selectedMovie.genre}</p>
          <p><strong>Release Date:</strong> ${selectedMovie.releaseDate}</p>
          <p><strong>Duration:</strong> ${selectedMovie.duration} mins</p>
          <p><strong>Language:</strong> ${selectedMovie.language}</p>
          <p><strong>Rating:</strong> ⭐ ${selectedMovie.rating}</p>
          <button onclick="startWatching()">Watch Now</button>
        </div>
      </div>
    `;
  
    movieDetailsSection.innerHTML = movieHTML;
  });
  
  function startWatching() {
    alert('Redirecting to watch the movie...');
  }
  
  