import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js';
import { getFirestore, collection, setDoc, doc } from 'https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js';
import { getDatabase, ref, set, get } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";
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

const realDb = getDatabase(app);

// Fetch the movie data
fetch('../json/data.json')
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
     
    });
  })
  .catch((error) => console.error('Error loading JSON:', error.message));


let allMoviesData = await getData();

async function getData(){
  let dbRef = await ref(realDb);
  let resposne = await get(dbRef);

  let data = await resposne.val();

  return data;
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
          <button class="watch-button" data-movie-id="${movie.id}">Watch</button>
          <button class="watchlist-btn" data-movie-id="${movie.id}"><i class="fa-solid fa-plus"></i></button>
        </div>
      </div>
    `;
    carouselContainer.appendChild(movieCard);

    // Add event listener to the watch button
    movieCard.querySelector('.watch-button').addEventListener('click', () => {
      localStorage.setItem('selectedMovie', JSON.stringify(movie)); 
      localStorage.setItem("category",categoryName)
     
      
      window.location.href = 'details.html'; 
    });

    // Add event listener for the watchlist button
    movieCard.querySelector('.watchlist-btn').addEventListener('click', () => {
      // Fetch watchlist from localStorage
      let watchlist = JSON.parse(localStorage.getItem('watchlist')) || {};
      
      

      // Check if movie is already in watchlist
      if(Object.keys(watchlist).length === 0){
        watchlist[categoryName] = movie;
        localStorage.setItem('watchlist', JSON.stringify(watchlist));
      }
      else if(watchlist[categoryName] != undefined && watchlist[categoryName][movie] != undefined && watchlist[categoryName][movie][id] != undefined ) {
            localStorage.setItem('watchlist', JSON.stringify(watchlist));
      }
      else{
        watchlist[categoryName] = movie // Add movie to watchlist
            localStorage.setItem('watchlist', JSON.stringify(watchlist));
      }
      

      // Redirect to watchlist page
      window.location.href = '../html/watchlist.html';
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

  const flattenedMovies = Array.isArray(movies[0]) ? movies.flat() : movies;

  // Event listener for the "previous" button
  prevButton.addEventListener('click', () => {
    currentIndex = Math.max(0, currentIndex - 1);
    updateCarousel();
    toggleButtons();
  });

  // Event listener for the "next" button
  nextButton.addEventListener('click', () => {
    currentIndex = Math.min(currentIndex + 1, flattenedMovies.length - 5); 
    updateCarousel();
    toggleButtons();
  });

  // Function to toggle button visibility
  function toggleButtons() {
    prevButton.style.display = currentIndex === 0 ? 'none' : 'block';
    nextButton.style.display =
      currentIndex === flattenedMovies.length - 5 ? 'none' : 'block';
  }
  toggleButtons();

  // Update carousel position on window resize
  window.addEventListener('resize', updateCarousel);
}







// DOM Elements
const searchBox = document.getElementById('search-box');
const searchDropdown = document.getElementById('search-dropdown');

// Event listener for search box input
searchBox.addEventListener('input', () => {
  const searchTerm = searchBox.value.toLowerCase().trim();
  searchDropdown.innerHTML = ''; // Clear previous results
  searchDropdown.style.display = 'none';

  if (searchTerm === '') return;

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
        localStorage.setItem('selectedMovie', JSON.stringify(movie)); 

        window.location.href = `../../../assets/pages/html/details.html`;
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

// Hide the dropdown when clicking outside
document.addEventListener('click', (e) => {
  if (!e.target.closest('.right-container')) {
    searchDropdown.style.display = 'none';
  }
});



