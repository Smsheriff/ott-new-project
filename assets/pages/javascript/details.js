// document.addEventListener('DOMContentLoaded', () => {
//     const movieDetailsSection = document.getElementById('movie-details-section');
//     const selectedMovie = JSON.parse(localStorage.getItem('selectedMovie'));
  
//     if (!selectedMovie) {
//       movieDetailsSection.innerHTML = `<p>No movie details found. Please select a movie from the main page.</p>`;
//       return;
//     }
  
//     const movieHTML = `
//       <div class="movie-details-container">
//         <img src="${selectedMovie.PosterImage}" alt="${selectedMovie.title}" class="movie-poster">
//         <div class="movie-info">
//           <h1>${selectedMovie.title}</h1>
//           <p>${selectedMovie.description}</p>
//           <p><strong>Genre:</strong> ${selectedMovie.genre}</p>
//           <p><strong>Release Date:</strong> ${selectedMovie.releaseDate}</p>
//           <p><strong>Duration:</strong> ${selectedMovie.duration} mins</p>
//           <p><strong>Language:</strong> ${selectedMovie.language}</p>
//           <p><strong>Rating:</strong> ⭐ ${selectedMovie.rating}</p>
//           <button onclick="startWatching()">Watch Now</button>
//         </div>
//       </div>
//     `;
  
//     movieDetailsSection.innerHTML = movieHTML;
//   });
  
//   function startWatching() {
//     alert('Redirecting to watch the movie...');
//   }
  

document.addEventListener('DOMContentLoaded', () => {
  const movieDetailsSection = document.getElementById('movie-details-section');

  // Fetch movie details from localStorage
  const selectedMovie = JSON.parse(localStorage.getItem('selectedMovie'));

  // Check if movie details are available
  if (!selectedMovie) {
    movieDetailsSection.innerHTML = `<p>No movie details found. Please select a movie from the main page.</p>`;
    return;
  }

  // Create HTML for displaying movie details
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
        <button id="watch-now-btn">Rent Now</button>
      </div>
    </div>
  `;

  movieDetailsSection.innerHTML = movieHTML;

  // Add event listener to "Watch Now" button
  const watchNowBtn = document.getElementById('watch-now-btn');
  watchNowBtn.addEventListener('click', () => {
    // Redirect to the rent page with movie details
    window.location.href = 'rent.html'; // Replace with your rent page path
  });
});

  