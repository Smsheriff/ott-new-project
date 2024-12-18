

// Import necessary Firebase modules
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

// Fetching JSON Data from a local file
fetch('../json/movies.json')
  .then(response => {
    if (!response.ok) throw new Error('Failed to load JSON data');
    return response.json();
  })
  .then(data => {
    if (Array.isArray(data.movies_slide)) {
      saveMoviesToFirestore(data.movies_slide);
      initializeCarousel(data.movies_slide);
    } else {
      console.error("Invalid data format:", data);
    }
  })
  .catch(error => console.error('Error loading JSON:', error));

// Save Movies Data to Firestore
async function saveMoviesToFirestore(movies) {
  const moviesRef = collection(db, 'movies_slide');
  try {
    for (const movie of movies) {
      const movieDocRef = doc(moviesRef, movie.id); // Use movie ID as the document ID
      await setDoc(movieDocRef, movie);
      console.log(`Movie ${movie.title} saved successfully.`);
    }
  } catch (error) {
    console.error("Error saving movie to Firestore: ", error);
  }
}

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 0) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}












      function initializeCarousel(movies) {
  const carouselContainer = document.querySelector('.carousel-container');
  const prevButton = document.getElementById('prev');
  const nextButton = document.getElementById('next');

  if (!carouselContainer || !prevButton || !nextButton) {
    console.error("Carousel elements not found!");
    return;
  }

  let currentIndex = 0; // Start from the first slide
  let isAnimating = false;

  // Create and load movie cards into the carousel
  movies.forEach(movie => {
    const movieCard = createMovieCard(movie);
    carouselContainer.appendChild(movieCard);
  });

  // Duplicate slides for infinite loop effect
  movies.forEach(movie => {
    const duplicateCard = createMovieCard(movie);
    carouselContainer.appendChild(duplicateCard);
  });

  // Set the initial position
  updateCarousel(currentIndex, carouselContainer);

  // Event Listeners for navigation buttons
  nextButton.addEventListener('click', () => {
    if (!isAnimating) {
      moveToNext(movies.length, carouselContainer);
    }
  });

  prevButton.addEventListener('click', () => {
    if (!isAnimating) {
      moveToPrev(movies.length, carouselContainer);
    }
  });

  // Auto-loop functionality
  let autoSlideInterval = setInterval(() => {
    moveToNext(movies.length, carouselContainer);
  }, 4000); // Auto-move every 4 seconds

  // Pause auto-loop on hover
  carouselContainer.addEventListener('mouseover', () => clearInterval(autoSlideInterval));
  carouselContainer.addEventListener('mouseout', () => {
    autoSlideInterval = setInterval(() => {
      moveToNext(movies.length, carouselContainer);
    }, 4000);
  });

  // Functions to create movie cards and manage carousel transitions
  function createMovieCard(movie) {
    const movieCard = document.createElement('div');
    movieCard.classList.add('movie-card');
    movieCard.innerHTML = `<div class="image-wrapper">
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
        <button class="prime-play-button" onclick="playTrailer('${movie.trailerUrl}')">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="prime-play-icon">
            <path d="M8 5v14l11-7z" fill="currentColor"></path>
          </svg> Play
        </button>
      </div>
   
    `;
    return movieCard;
  }

  function moveToNext(totalMovies, container) {
    if (isAnimating) return;
    isAnimating = true;
    currentIndex++;
    updateCarousel(currentIndex, container);

    setTimeout(() => {
      if (currentIndex === totalMovies) {
        currentIndex = 0; // Reset to the first slide
        container.style.transition = 'none'; // Disable transition for instant move
        updateCarousel(currentIndex, container);
        setTimeout(() => {
          container.style.transition = 'transform 0.5s ease-in-out'; // Re-enable transition
        });
      }
      isAnimating = false;
    }, 500); // Match the transition duration
  }

  function moveToPrev(totalMovies, container) {
    if (isAnimating) return;
    isAnimating = true;
    currentIndex--;
    if (currentIndex < 0) {
      currentIndex = totalMovies - 1; // Move to the last slide
      container.style.transition = 'none'; // Disable transition for instant move
      updateCarousel(currentIndex, container);
      setTimeout(() => {
        container.style.transition = 'transform 0.5s ease-in-out'; // Re-enable transition
      });
    }
    updateCarousel(currentIndex, container);
    isAnimating = false;
  }

  function updateCarousel(index, container) {
    const slideWidth = container.firstElementChild.offsetWidth; // Get dynamic slide width
    const offset = -index * slideWidth; // Calculate offset
    container.style.transform = `translateX(${offset}px)`; // Apply offset
  }
}
