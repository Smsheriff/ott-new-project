// document.addEventListener('DOMContentLoaded', () => {
//     const rentMovieDetails = document.getElementById('rent-movie-details');
//     const selectedMovie = JSON.parse(localStorage.getItem('selectedMovie'));
  
//     if (!selectedMovie) {
//       rentMovieDetails.innerHTML = `<p>No movie details found.</p>`;
//       return;
//     }
  
//     rentMovieDetails.innerHTML = `
//       <h1>Rent Movie - ${selectedMovie.title}</h1>
//       <img src="${selectedMovie.PosterImage}" alt="${selectedMovie.title}" class="movie-poster">
//       <p><strong>Description:</strong> ${selectedMovie.description}</p>
//       <p><strong>Year:</strong> ${selectedMovie.releaseDate}</p>
//       <p><strong>Duration:</strong> ${selectedMovie.duration}</p>
//     `;
  
//     const durationSelect = document.getElementById('duration');
//     const priceElement = document.getElementById('price');
  
//     durationSelect.addEventListener('change', () => {
//       const price = durationSelect.value === '1' ? 3.99 : 7.99;
//       priceElement.textContent = `Price: $${price.toFixed(2)}`;
//     });
  
//     const paymentForm = document.getElementById('payment-form');
//     paymentForm.addEventListener('submit', (event) => {
//       event.preventDefault();
  
//       alert('Rental successful! Confirmation email sent.');
//       window.location.href = 'movie-player.html'; // Redirect to movie player after payment
//     });
//   });
  


