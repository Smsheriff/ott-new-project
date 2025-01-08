import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js';
import { getDatabase, ref, child, get } from 'https://www.gstatic.com/firebasejs/11.1.0/firebase-database.js';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCdlgHLDEcQb2IJhReeObkq6VhfPfnC-Uk",
  authDomain: "movie-wave-c171b.firebaseapp.com",
  databaseURL: "https://movie-wave-c171b-default-rtdb.firebaseio.com", // Realtime Database URL
  projectId: "movie-wave-c171b",
  storageBucket: "movie-wave-c171b.appspot.com",
  messagingSenderId: "1073642279250",
  appId: "1:1073642279250:web:aeaaaa670899a84434aa8b",
  measurementId: "G-D4PR4H1M6N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

document.addEventListener('DOMContentLoaded', async () => {
  const trailerVideo = document.getElementById('trailer-video');
  const goBackBtn = document.getElementById('go-back-btn');

  // Fetch movie title from localStorage
  const movieTitle = localStorage.getItem('moviename');
  console.log('Movie Title from LocalStorage:', movieTitle); // Debugging log

  if (!movieTitle) {
    alert('Movie name not found in localStorage. Redirecting back.');
    window.history.back();
    return;
  }

  try {
    // Reference to the "Top 10 movies" in Realtime Database
    const dbRef = ref(db);
    const snapshot = await get(child(dbRef, 'Top 10 movies'));

    if (snapshot.exists()) {
      const moviesData = snapshot.val();
      console.log(moviesData)
      console.log('Movies Data:', moviesData); // Debugging log

      // Find the movie with the matching title
      const movie = moviesData.find(m => m.title === movieTitle);

      if (movie && movie.trailerUrl) {
        trailerVideo.src = movie.trailerUrl;
        document.getElementById('movie-title').innerText = `Trailer: ${movieTitle}`;
      } else {
        alert('Trailer URL not available for this movie.');
        window.history.back();
      }
    } else {
      console.error('No data available!');
      alert('Movie details not found.');
      // window.history.back();
    }
  } catch (error) {
    console.error('Error fetching trailer:', error);
    alert('Error loading trailer.');
    window.history.back();
  }

  // Go back to the previous page
  goBackBtn.addEventListener('click', () => {
    window.history.back();
  });
});
console.log('Baahubali: The Beginning')