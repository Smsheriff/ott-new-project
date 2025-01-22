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

document.addEventListener('DOMContentLoaded',  () => {
  const trailerVideo = document.getElementById('trailer-video');
  const goBackBtn = document.getElementById('go-back-btn');

  const trailerUrl = localStorage.getItem("trailerLink");

  trailerVideo.src = trailerUrl;

  // Fetch movie title from localStorage
  const movieTitle = localStorage.getItem('moviename');
  console.log('Movie Title from LocalStorage:', movieTitle); // Debugging log

  const categoryName = localStorage.getItem("category")
  if (!movieTitle) {
    alert('Movie name not found , Redirecting back.');
    window.history.back();
    return;
  }
  // Go back to the previous page
  goBackBtn.addEventListener('click', () => {
    window.history.back();
  });
});
