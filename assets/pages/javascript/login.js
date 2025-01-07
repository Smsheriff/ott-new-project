// Import necessary Firebase modules
import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js';
import { getAuth, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js';
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/11.0.1/firebase-analytics.js';

// Firebase config object
const firebaseConfig = {
  apiKey: "AIzaSyCdlgHLDEcQb2IJhReeObkq6VhfPfnC-Uk",
  authDomain: "movie-wave-c171b.firebaseapp.com",
  projectId: "movie-wave-c171b",
  storageBucket: "movie-wave-c171b.firebasestorage.app",
  messagingSenderId: "1073642279250",
  appId: "1:1073642279250:web:aeaaaa670899a84434aa8b",
  measurementId: "G-D4PR4H1M6N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);  
const analytics = getAnalytics(app);

// Get references to form elements
const email = document.getElementById("email");
const password = document.getElementById("password");
const emailerror = document.getElementById("email-error");
const passworderror = document.getElementById("password-error");
const form = document.getElementById("form");
const btn = document.getElementById("login");
const minlength = 8;

// Validate email and password inputs
function validateInputs() {
    let isValid = true;
    emailerror.textContent = '';
    passworderror.textContent = '';

    // Validate email
    if (email.value.length === 0) {
        emailerror.textContent = "Email required";
        isValid = false;
    } else if (!validateEmail(email.value)) {
        emailerror.textContent = "Please enter a valid email";
        isValid = false;
    }

    // Validate password
    if (password.value.length === 0) {
        passworderror.textContent = "Password required";
        isValid = false;
    } else if (password.value.length < minlength) {
        passworderror.textContent = `Password must be at least ${minlength} characters long.`;
        isValid = false;
    }

    return isValid;
}

// Function to validate email format
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

// Toggle password visibility
const togglePassword = document.querySelector('#togglePassword');
togglePassword.addEventListener('click', function () {
    const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
    password.setAttribute('type', type);
    this.innerHTML = type === 'password' ? '<i class="fas fa-eye-slash"></i>' : '<i class="fas fa-eye"></i>';
});

// Clear error messages as user types
email.addEventListener("input", () => {
    emailerror.textContent = ''; 
});

password.addEventListener("input", () => {
    passworderror.textContent = ''; 
});

// Form submit event listener
form.addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevent form from submitting the traditional way

    // Validate inputs first
    if (!validateInputs()) {
        return;
    }

    const emailValue = email.value;
    const passwordValue = password.value;

    // Disable the login button during the request
    btn.disabled = true;
    btn.innerText = 'Logging in...';

    try {
        // Attempt to sign in using Firebase Authentication
        const userCredential = await signInWithEmailAndPassword(auth, emailValue, passwordValue);
        const user = userCredential.user;
        console.log('Login successful:', user);

        // Redirect to a different page (e.g., dashboard or home)
        window.location.href = "../html/home.html"; 
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;

        // Display error messages based on Firebase error codes
        if (errorCode === 'auth/wrong-password') {
            passworderror.textContent = 'Incorrect password';
        } else if (errorCode === 'auth/user-not-found') {
            emailerror.textContent = 'No account found with this email';
        } else {
            passworderror.textContent = 'Invalid email or password. Please try again.';
        }

        console.error('Error during login:', errorCode, errorMessage);
    } finally {
        // Reset the button state
        btn.disabled = false;
        btn.innerText = 'Login';
    }
});
