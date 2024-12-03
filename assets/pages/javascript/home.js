// Fetching JSON Data
fetch('../json/movies.json')
  .then(response => response.json())
  .then(data => {
    const movies = data.movies_slide; // Access the movies_slide array
    initializeCarousel(movies);
  })
  .catch(error => console.error('Error loading JSON:', error));

// Initialize Carousel
function initializeCarousel(movies) {
  const carouselContainer = document.querySelector('.carousel-container');
  const prevButton = document.getElementById('prev');
  const nextButton = document.getElementById('next');

  let currentIndex = 0;
  let isAnimating = false; // Prevent rapid button clicks

  // Create and load movie cards into the carousel
  movies.forEach(movie => {
    const movieCard = createMovieCard(movie);
    carouselContainer.appendChild(movieCard);
  });

  // Event Listeners for navigation buttons
  nextButton.addEventListener('click', () => {
    moveToNext(movies.length, carouselContainer);
  });

  prevButton.addEventListener('click', () => {
    moveToPrev(movies.length, carouselContainer);
  });

  // Handle window resize to adjust the carousel
  window.addEventListener('resize', () => {
    updateCarousel(currentIndex, carouselContainer);
  });

  // Initialize the carousel position
  updateCarousel(currentIndex, carouselContainer);

  // Functions
  function createMovieCard(movie) {
    const movieCard = document.createElement('div');
    movieCard.classList.add('movie-card');
  
    movieCard.innerHTML = `
      <div class="image-wrapper">
        <img src="${movie.bannerImage}" alt="${movie.title}" class="movie-banner">
      </div>
      <div class="movie-info">
        <h3>${movie.title}</h3>
        <p>${movie.description}</p>
        <p><strong>Genre:</strong> ${movie.genre}</p>
        <p><strong>Release Date:</strong> ${movie.releaseDate}</p>
        <p><strong>Duration:</strong> ${movie.duration} mins</p>
        <p><strong>Language:</strong> ${movie.language}</p>
        <p><strong>Rating:</strong> ⭐ ${movie.rating}</p>
        <button class="play-button">
        <i class="fa-regular fa-circle-play" style="color: #c62fc1; font-size: 50px"></i>
       </button>
      </div>
    `;
    return movieCard;
  }
  

  function moveToNext(totalMovies, container) {
    if (isAnimating) return;
    isAnimating = true;
    currentIndex = (currentIndex + 1) % totalMovies; // Loop back to the start
    updateCarousel(currentIndex, container);
    setTimeout(() => (isAnimating = false), 500); // Match transition duration
  }

  function moveToPrev(totalMovies, container) {
    if (isAnimating) return;
    isAnimating = true;
    currentIndex = (currentIndex - 1 + totalMovies) % totalMovies; // Loop to the end
    updateCarousel(currentIndex, container);
    setTimeout(() => (isAnimating = false), 500); // Match transition duration
  }

  function updateCarousel(index, container) {
    const slideWidth = container.firstElementChild.offsetWidth; // Get dynamic slide width
    const offset = -index * slideWidth; // Calculate offset
    container.style.transform = `translateX(${offset}px)`; // Apply offset
  }
}
