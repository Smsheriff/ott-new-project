import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCdlgHLDEcQb2IJhReeObkq6VhfPfnC-Uk",
  authDomain: "movie-wave-c171b.firebaseapp.com",
  projectId: "movie-wave-c171b",
  storageBucket: "movie-wave-c171b.appspot.com",
  messagingSenderId: "1073642279250",
  appId: "1:1073642279250:web:aeaaaa670899a84434aa8b",
  measurementId: "G-D4PR4H1M6N",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
emailjs.init("KwWbISNEsnBNCyjRa");

let userEmail = localStorage.getItem("mail");
let movieName = localStorage.getItem("moviename");

if (movieName) {
  document.getElementById("movie-title").innerText = movieName;
} else {
  console.error("Movie name not found in localStorage");
}

// Check if user is logged in
onAuthStateChanged(auth, (user) => {
  if (user) {
    userEmail = localStorage.getItem("mail");
  } else {
    alert("User not logged in. Redirecting to login page.");
    window.location.href = "login.html";
  }
});

// Update price dynamically
const durationSelect = document.getElementById("duration");
const priceDisplay = document.getElementById("price-value");

const calculatePrice = (duration) => {
  switch (duration) {
    case "1":
      return 99.00;
    case "3":
      return 120.00;
    case "7":
      return 299.00;
    default:
      return 0.0;
  }
};

durationSelect.addEventListener("change", () => {
  const duration = durationSelect.value;
  const price = calculatePrice(duration);
  priceDisplay.textContent = price.toFixed(2);
});

// Form submission with validation
document.getElementById("rental-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const duration = durationSelect.value;
  const cardNumber = document.getElementById("card-number").value;
  const expiry = document.getElementById("expiry").value;
  const cvv = document.getElementById("cvv").value;

  let isValid = true;
  document.querySelectorAll(".error").forEach((span) => (span.innerText = ""));

  if (!duration) {
    document.getElementById("duration-error").innerText = "Please select a rental duration.";
    isValid = false;
  }
  if (!/^\d{16}$/.test(cardNumber)) {
    document.getElementById("card-error").innerText = "Invalid card number. Enter 16 digits.";
    isValid = false;
  }
  if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiry)) {
    document.getElementById("expiry-error").innerText = "Invalid expiry date. Use MM/YY format.";
    isValid = false;
  }
  if (!/^\d{3,4}$/.test(cvv)) {
    document.getElementById("cvv-error").innerText = "Invalid CVV. Enter 3 or 4 digits.";
    isValid = false;
  }

  if (!isValid) return;

  const price = calculatePrice(duration);

  try {
    await addDoc(collection(db, "transactions"), {
      email: userEmail,
      movieName: movieName,
      duration: duration,
      price: price,
      status: "Processing",
      timestamp: serverTimestamp(),
    });

    const emailParams = {
      movieTitle: movieName || "Unknown",
      duration: `${duration} Days`,
      price: `$${price}`,
      user_email: userEmail,
    };

    emailjs
      .send("service_11aquyr", "template_lur98gk", emailParams)
      .then(() => {
        alert("Rental confirmed! Check your email.");
        setTimeout(() => window.location.href = "./home.html", 5000);
      })
      .catch(() => {
        alert("Rental confirmed, but email failed.");
      });
  } catch (error) {
    alert("Error processing rental. Try again.");
  }
});
