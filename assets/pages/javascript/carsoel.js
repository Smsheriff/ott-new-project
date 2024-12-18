import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js';
import { getFirestore, collection, setDoc, doc } from 'https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js';
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/11.0.1/firebase-analytics.js';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCdlgHLDEcQb2IJhReeObkq6VhfPfnC-Uk",
  authDomain: "movie-wave-c171b.firebaseapp.com",
  projectId: "movie-wave-c171b",
  storageBucket: "movie-wave-c171b.appspot.com",
  messagingSenderId: "1073642279250",
  appId: "1:1073642279250:web:aeaaaa670899a84434aa8b",
  measurementId: "G-D4PR4H1M6N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const analytics = getAnalytics(app);

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

    // Create the custom carousel and save movies to Firestore
    Object.keys(allMovies).forEach((category) => {
      const movies = allMovies[category];
      createCustomCarousel(category, movies);
      saveMoviesToFirestore(category, movies); // Save movies in Firestore
    });
  })
  .catch((error) => console.error('Error loading JSON:', error.message));

// Function to save movies to Firestore
async function saveMoviesToFirestore(categoryName, movies) {
  const collectionRef = collection(db, categoryName); // Create collection for each category
  try {
    for (const movie of movies) {
      const docRef = doc(collectionRef, movie.id); // Use movie ID as document ID
      await setDoc(docRef, movie);
      console.log(`Movie "${movie.title}" saved to Firestore in category "${categoryName}".`);
    }
  } catch (error) {
    console.error(`Error saving movies to Firestore for category "${categoryName}":`, error);
  }
}

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
        <img src="${movie.bannerImage}" style="width:100%;" alt="${movie.title}">
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

  const flattenedMovies = Array.isArray(movies[0]) ? movies.flat() : movies;

  // Event listener for the "previous" button
  prevButton.addEventListener('click', () => {
    currentIndex = Math.max(0, currentIndex - 1);
    updateCarousel();
    toggleButtons();
  });

  // Event listener for the "next" button
  nextButton.addEventListener('click', () => {
    currentIndex = Math.min(currentIndex + 1, flattenedMovies.length - 5); // Use the flattened array's length
    updateCarousel();
    toggleButtons();
  });

  // Function to toggle button visibility
  function toggleButtons() {
    // Hide the left button if at the first movie
    prevButton.style.display = currentIndex === 0 ? 'none' : 'block';

    // Hide the right button if at the last visible set of movies
    nextButton.style.display =
      currentIndex === flattenedMovies.length - 5 ? 'none' : 'block';
  }

  // Initial call to set button visibility
  toggleButtons();

  // Update carousel position on window resize
  window.addEventListener('resize', updateCarousel);
}

















let allMoviesData = {}; // To store all movies from JSON

// Fetch movies from JSON
fetch('../json/carsoel.json')
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .then((data) => {
    allMoviesData = data; // Store the fetched data globally
  })
  .catch((error) => console.error('Error loading JSON:', error.message));

// DOM Elements
const searchBox = document.getElementById('search-box');
const searchBtn = document.getElementById('search-btn');
const searchDropdown = document.getElementById('search-dropdown');

// Event listener for search box input
searchBox.addEventListener('input', () => {
  const searchTerm = searchBox.value.toLowerCase().trim();
  searchDropdown.innerHTML = ''; // Clear previous results
  searchDropdown.style.display = 'none';

  if (searchTerm === '') return; // Exit if the input is empty

  // Find matching movies
  const matchedMovies = [];
  Object.keys(allMoviesData).forEach((category) => {
    const matches = allMoviesData[category].filter((movie) =>
      movie.title.toLowerCase().startsWith(searchTerm)
    );
    matchedMovies.push(...matches);
  });

  // Display matched movies
  if (matchedMovies.length > 0) {
    matchedMovies.forEach((movie) => {
      const item = document.createElement('div');
      item.classList.add('dropdown-item');
      item.textContent = movie.title;
      item.addEventListener('click', () => {
        // Redirect to movie details page
        window.location.href = `/assets/pages/html/moviepage.html?id=${movie.id}`;
      });
      searchDropdown.appendChild(item);
    });
    searchDropdown.style.display = 'block';
  } else {
    const noResults = document.createElement('div');
    noResults.classList.add('no-results');
    noResults.textContent = 'No movies found.';
    searchDropdown.appendChild(noResults);
    searchDropdown.style.display = 'block';
  }
});

// Event listener for the search button
searchBtn.addEventListener('click', () => {
  const searchTerm = searchBox.value.trim(); // Get the search term
  if (searchTerm) {
    // Redirect to search-results page with the query parameter
    window.location.href = `/assets/pages/html/moviepage.html?query=${encodeURIComponent(
      searchTerm
    )}`;
  }
});

// Hide the dropdown when clicking outside
document.addEventListener('click', (e) => {
  if (!e.target.closest('.right-container')) {
    searchDropdown.style.display = 'none';
  }
});



