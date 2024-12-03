// Fetch the movie data
fetch('../json/carsoel.json')
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .then((data) => {
    // Initialize a variable to store all movies
    const allMovies = data;

    // Create the custom carousel based on the data
    Object.keys(allMovies).forEach((category) => {
      createCustomCarousel(category, allMovies[category]);
    });

    // Set up the search functionality
    const searchInput = document.getElementById('search-input');
    const dropdownBox = document.getElementById('dropdown-box');

    searchInput.addEventListener('input', function () {
      const query = searchInput.value.toLowerCase();

      // Check if the query is a single letter for A-Z filtering
      if (query.length === 1 && /^[a-z]$/.test(query)) {
        // Filter movies whose title starts with the given letter
        const filteredMovies = [];
        Object.keys(allMovies).forEach((category) => {
          const movies = allMovies[category].filter(movie =>
            movie.title.toLowerCase().startsWith(query)
          );

          filteredMovies.push(...movies);
        });

        // Display the filtered movies in the dropdown
        dropdownBox.innerHTML = '';
        filteredMovies.forEach((movie) => {
          const movieItem = document.createElement('div');
          movieItem.textContent = movie.title;
          movieItem.classList.add('search-item');

          // Add event listener to navigate to the detailed page on click
          movieItem.addEventListener('click', () => {
            window.location.href = `/OTT-Project/assets/pages/html/moviepage.html`; // Redirect to detailed movie page
          });

          dropdownBox.appendChild(movieItem);
        });

        // Show or hide the dropdown based on results
        dropdownBox.style.display = filteredMovies.length > 0 ? 'block' : 'none';
      } else if (query.length > 1) {
        // Handle normal search for longer queries
        const filteredMovies = [];
        Object.keys(allMovies).forEach((category) => {
          const movies = allMovies[category].filter(movie =>
            movie.title.toLowerCase().includes(query) || movie.description.toLowerCase().includes(query)
          );

          filteredMovies.push(...movies);
        });

        dropdownBox.innerHTML = '';
        filteredMovies.forEach((movie) => {
          const movieItem = document.createElement('div');
          movieItem.textContent = movie.title;
          movieItem.classList.add('search-item');

          movieItem.addEventListener('click', () => {
            window.location.href = `/OTT-Project/assets/pages/html/moviepage.html`;
          });

          dropdownBox.appendChild(movieItem);
        });

        dropdownBox.style.display = filteredMovies.length > 0 ? 'block' : 'none';
      } else {
        // Hide dropdown when input is empty
        dropdownBox.innerHTML = '';
        dropdownBox.style.display = 'none';
      }
    });
  })
  .catch((error) => console.error('Error loading JSON:', error.message));

// Function to create the carousel for each category
function createCustomCarousel(categoryName, movies) {
  const mainWrapper = document.getElementById('custom-carousel-wrapper');

  if (!mainWrapper) {
    console.error('No element with ID "custom-carousel-wrapper" found.');
    return;
  }

  const categoryWrapper = document.createElement('div');
  categoryWrapper.classList.add('custom-carousel-section');

  const title = document.createElement('h2');
  title.textContent = categoryName.replace(/-/g, ' ').toUpperCase();
  categoryWrapper.appendChild(title);

  const carouselContainer = document.createElement('div');
  carouselContainer.classList.add('custom-carousel-track');
  categoryWrapper.appendChild(carouselContainer);

  // Create movie cards
  movies.forEach((movie) => {
    const movieCard = document.createElement('div');
    movieCard.classList.add('custom-movie-card');
    movieCard.innerHTML = `
      <div class="image-wrapper-1">
        <img src="${movie.bannerImage}" alt="${movie.title}">
        <div class="movie-details">
          <h3>${movie.title}</h3>
          <p>${movie.description}</p>
          <p><strong>Genre:</strong> ${movie.genre}</p>
          <p><strong>Release Date:</strong> ${movie.releaseDate}</p>
          <p><strong>Duration:</strong> ${movie.duration} mins</p>
          <p><strong>Language:</strong> ${movie.language}</p>
          <p><strong>Rating:</strong> ⭐ ${movie.rating}</p>
          <button class="watch-button">Watch</button>
        </div>
      </div>
    `;
    carouselContainer.appendChild(movieCard);

    // Add an event listener to redirect to a big page when the movie card is clicked
    movieCard.addEventListener('click', () => {
      window.location.href = `/movie-details.html?id=${movie.id}`; // Navigate to the movie details page
    });
  });

  const prevButton = document.createElement('button');
  prevButton.textContent = '←';
  prevButton.classList.add('custom-carousel-btn', 'custom-prev-btn');

  const nextButton = document.createElement('button');
  nextButton.textContent = '→';
  nextButton.classList.add('custom-carousel-btn', 'custom-next-btn');

  categoryWrapper.appendChild(prevButton);
  categoryWrapper.appendChild(nextButton);

  mainWrapper.appendChild(categoryWrapper);

  let currentIndex = 0;
  const updateCarousel = () => {
    const offset = -(carouselContainer.firstElementChild.offsetWidth + 20) * currentIndex;
    carouselContainer.style.transform = `translateX(${offset}px)`;
  };

  // Event listener for the "previous" button
  prevButton.addEventListener('click', () => {
    currentIndex = Math.max(0, currentIndex - 1);
    updateCarousel();
  });

  // Event listener for the "next" button
  nextButton.addEventListener('click', () => {
    currentIndex = Math.min(currentIndex + 1, movies.length - 1);  // Fixed length check
    updateCarousel();
  });

  // Update carousel position on window resize
  window.addEventListener('resize', updateCarousel);
}







// Grab the icon and dropdown elements
const searchIcon = document.getElementById('search-icon');
const dropdownBox = document.getElementById('dropdown-box');

// Toggle dropdown visibility and adjust position dynamically
searchIcon.addEventListener('click', () => {
  const isVisible = dropdownBox.style.display === 'block';

  if (!isVisible) {
    const iconRect = searchIcon.getBoundingClientRect(); // Get position of the icon
    const dropdownWidth = dropdownBox.offsetWidth;

    // Calculate left position to avoid overflowing to the right
    let leftPosition = iconRect.left + window.scrollX;

    // Move the dropdown to the left by a fixed amount (e.g., 20px)
    leftPosition -= 650;  // Adjust this value to your preference

    // If it overflows to the right, move it left
    if (leftPosition + dropdownWidth > window.innerWidth) {
      leftPosition = window.innerWidth - dropdownWidth - 10;
    }

    // Update the dropdown position
    dropdownBox.style.left = `${leftPosition}px`;
    dropdownBox.style.top = `${iconRect.bottom + window.scrollY}px`;

    dropdownBox.style.display = 'block'; // Show the dropdown
  } else {
    dropdownBox.style.display = 'none'; // Hide the dropdown
  }
});

// Close dropdown when clicking outside
document.addEventListener('click', (e) => {
  if (!e.target.closest('.search-container')) {
    dropdownBox.style.display = 'none';
  }
});
